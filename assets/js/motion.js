/* ============================================================
   SevenHours · 动效系统（苹果官网式产品动效）
   1) 聚光灯卡片      —— 光标跟随的径向高光 + 边缘描边
   2) 横向钉住画廊    —— 纵向滚动驱动横向位移（sticky pin）
   3) 幕帘转场        —— 开屏 + 区块两片对开
   4) 文字逐字入场    —— 按字拆分，逐字上浮
   另含：首屏视差、顶部滚动进度
   全部动效在 prefers-reduced-motion 下自动关闭
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     0. 工具：滚动订阅（rAF 节流 + 定时器兜底）
     正常情况 rAF 先触发；后台标签页 / 无头环境里 rAF 被节流时，
     兜底定时器仍然保证滚动驱动动效不会卡住。
     ========================================================== */
  const scrollSubs = [];
  let ticking = false;
  function fireScroll() {
    for (const fn of scrollSubs) {
      try { fn(); }
      catch (e) { window.__motionError = String((e && e.message) || e); }  // 静默失败最难查，留个可观测的痕迹
    }
  }
  function onScrollFrame() {
    if (ticking) return;
    ticking = true;
    let done = false;
    const run = () => { if (done) return; done = true; ticking = false; fireScroll(); };
    requestAnimationFrame(run);
    setTimeout(run, 48);
  }
  window.addEventListener('scroll', onScrollFrame, { passive: true });
  window.addEventListener('resize', onScrollFrame, { passive: true });

  /* ==========================================================
     1. 顶部滚动进度条
     ========================================================== */
  (function progressBar() {
    if (reduced) return;
    const bar = document.createElement('div');
    bar.className = 'progress';
    document.body.appendChild(bar);
    scrollSubs.push(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
    });
  })();

  /* ==========================================================
     2. 幕帘转场 · 开屏
     ========================================================== */
  (function introCurtain() {
    // 三个主页面（入口页 / 旅拍 / 理疗）都开屏；作品页直接进入，避免等待
    if (reduced || !document.querySelector('.hero,.hub-hero,.wl-hero')) return;
    const el = document.createElement('div');
    el.className = 'curtain-intro';
    el.innerHTML = '<i class="t"></i><i class="b"></i><span class="mark">SEVEN HOURS</span>';
    document.body.appendChild(el);

    let opened = false;
    const remove = () => { if (el.isConnected) el.remove(); };
    const open = () => {
      if (opened) return;
      opened = true;
      el.classList.add('open');
      setTimeout(remove, 1400);
    };
    // 正常路径：等首屏绘制完再拉开
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(open, 300)));
    } else {
      setTimeout(open, 300);
    }
    // 兜底：幕帘只是装饰，绝不能因为它挡住内容。
    // rAF 在后台标签页 / 无头环境会被节流甚至完全不触发，所以必须给时间上限。
    setTimeout(open, 1500);
    setTimeout(remove, 3200);
  })();

  /* ==========================================================
     3. 文字逐字入场
     ========================================================== */
  function splitChars(el) {
    if (!el || el.dataset.splitDone) return;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const t = n.nodeValue;
          if (!t || !t.trim()) return;
          const frag = document.createDocumentFragment();
          for (const ch of t) {
            if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); continue; }
            const s = document.createElement('span');
            s.className = 'c';
            s.textContent = ch;
            frag.appendChild(s);
          }
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          walk(n);
        }
      });
    };
    walk(el);
    [...el.querySelectorAll('.c')].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 28)));
    el.dataset.splitDone = '1';
  }

  (function initSplit() {
    const targets = $$('[data-split]');
    if (!targets.length || reduced) return;
    targets.forEach(splitChars);
    const delay = window.__DSH_INTRO || 0;
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const inHero = !!el.closest('.hero');
        const wait = inHero ? delay : 0;
        if (wait) setTimeout(() => el.classList.add('in'), wait);
        else el.classList.add('in');
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .15 });
    targets.forEach((el) => io.observe(el));
  })();

  /* ==========================================================
     4. 聚光灯卡片
     ========================================================== */
  (function initSpotlight() {
    if (reduced) return;
    const sel = '.card,.price,.equip-col,.way,.car-feat,.hub-card,.wl-card,.bundle';
    $$(sel).forEach((el) => {
      if (el.classList.contains('spot')) return;
      el.classList.add('spot');
      const g = document.createElement('i');
      g.className = 'glow';
      el.insertBefore(g, el.firstChild);
    });
    // 只对当前悬停的卡片写入坐标，避免每帧遍历
    let cur = null;
    document.addEventListener('pointermove', (e) => {
      const el = e.target && e.target.closest ? e.target.closest('.spot') : null;
      if (!el) { cur = null; return; }
      if (el !== cur) cur = el;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(2) + '%');
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(2) + '%');
    }, { passive: true });
  })();

  /* ==========================================================
     5. 幕帘转场 · 区块入场（两片对开）
     ========================================================== */
  (function initCurtains() {
    const blocks = $$('.curtain');
    if (!blocks.length) return;
    if (reduced) { blocks.forEach((b) => b.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .12 });
    blocks.forEach((b) => {
      if (!b.querySelector(':scope > .ct')) {
        b.insertAdjacentHTML('beforeend', '<i class="ct t"></i><i class="ct b"></i>');
      }
      io.observe(b);
    });
  })();

  /* ==========================================================
     6. 首屏视差
     ========================================================== */
  (function heroParallax() {
    if (reduced) return;
    const bg = $('#heroBg'), inner = $('.hero-inner');
    if (!bg) return;
    scrollSubs.push(() => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (y > vh * 1.15) return;
      const p = Math.min(1, Math.max(0, y / vh));
      bg.style.transform = `translate3d(0,${(p * 68).toFixed(1)}px,0)`;
      if (inner) {
        inner.style.transform = `translate3d(0,${(-p * 46).toFixed(1)}px,0)`;
        inner.style.opacity = (1 - p * 0.85).toFixed(3);
      }
    });
  })();

  /* ==========================================================
     7. 横向钉住画廊
     ========================================================== */
  (function horizontalGallery() {
    const sec = $('#journey');
    const pin = $('#hsPin');
    const track = $('#hsTrack');
    if (!sec || !pin || !track) return;
    const data = window.PANELS || [];

    if (data.length) {
      // 每幅高度一致，宽度按各自真实比例算出来：横图横幅、竖图竖幅，都不裁切。
      // 高度在 CSS 里定义（--hs-h），这里只负责把比例写进去。
      // 整块可点击 → 跳到 gallery.html 的对应风格分类。
      track.innerHTML = data.map((p, i) => {
        const ar = (p.w && p.h) ? (p.w / p.h) : (8 / 5);
        const num = String(i + 1).padStart(2, '0');
        const href = p.style
          ? `gallery.html?cat=${encodeURIComponent(p.style)}`
          : 'gallery.html';
        const tag = p.style ? `<span class="hs-tag">${p.style}</span>` : '';
        const title = p.title ? `<span class="hs-t">${p.title}</span>` : '';
        // 按需求：标题下方不再写描述小字，只留编号 + 标题 + 风格
        const cap = `<div class="hs-cap">
             <span class="hs-no">${num}</span>
             ${title}
             ${tag}
             ${p.en ? `<span class="hs-en">${p.en}</span>` : ''}
           </div>`;
        return `
        <a class="hs-panel" data-i="${i}"${p.portrait ? ' data-portrait="1"' : ''}
           href="${href}" aria-label="${p.title || ('作品 ' + num)}${p.style ? ' · ' + p.style : ''}">
          <div class="hs-media curtain" style="--hs-ar:${ar.toFixed(5)}">
            <img src="${p.img}" alt="${p.title || ('作品 ' + num)}" loading="lazy" decoding="async">
            <i class="ct t"></i><i class="ct b"></i>
            <span class="hs-go" aria-hidden="true">
              查看该风格
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </div>
          ${cap}
        </a>`;
      }).join('');

      // 高度 = min(56vh, 520px)，宽度 = 高度 × 比例；把最终宽度写回 --hs-w 供布局使用
      const setWidths = () => {
        const h = track.querySelector('.hs-media');
        if (!h) return;
        const hh = h.getBoundingClientRect().height;
        if (hh < 40) return;
        $$('.hs-panel', track).forEach((el) => {
          const media = el.querySelector('.hs-media');
          const raw = media && media.style.getPropertyValue('--hs-ar');
          const ar = parseFloat(raw) || (8 / 5);
          el.style.setProperty('--hs-w', (hh * ar).toFixed(1) + 'px');
        });
      };
      setWidths();
      window.addEventListener('resize', setWidths, { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(setWidths);
      setTimeout(setWidths, 260);
    }

    const bar = $('#hsBar');
    const count = $('#hsCount');
    const head = $('.hs-head', sec);
    const mqDesktop = window.matchMedia('(min-width: 821px)');
    const panels = () => $$('.hs-panel', track);
    // 初值用 null，保证首次 sync() 一定会落一次状态：
    // 否则「桌面端 + 系统开启减弱动态效果」时 want=false 与初值相等，会直接 return，
    // 区块仍被钉住却又不做横向位移，后面的面板就永远看不到了。
    let enabled = null, distance = 0, headH = 0, trackW = 0, ioOff = null;

    /* 面板进入可视：拉开帘子 + 图片回落 */
    const show = (panel) => {
      panel.classList.add('in');
      const m = panel.querySelector('.hs-media');
      if (m) m.classList.add('in');
    };

    function layout() {
      headH = head ? head.offsetHeight : 0;
      trackW = track.scrollWidth;
      if (!enabled) { sec.style.height = ''; return; }
      distance = Math.max(0, trackW - window.innerWidth);
      sec.style.height = (headH + window.innerHeight + distance) + 'px';
      sec.dataset.hsDist = Math.round(distance);
    }

    function update() {
      if (!enabled) return;
      // 自愈：字体加载、换行变化、图片撑开都会改变量测，发现不一致就重算
      const hh = head ? head.offsetHeight : 0;
      const tw = track.scrollWidth;
      if (hh !== headH || tw !== trackW) {
        headH = hh; trackW = tw;
        distance = Math.max(0, trackW - window.innerWidth);
        sec.style.height = (headH + window.innerHeight + distance) + 'px';
      }
      const top = sec.getBoundingClientRect().top;
      const p = distance > 0 ? Math.min(1, Math.max(0, (-headH - top) / distance)) : 0;
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`;
      if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
      if (count && data.length) {
        const idx = Math.min(data.length, Math.floor(p * (data.length - 1) + 0.5) + 1);
        count.innerHTML = `<b>${String(idx).padStart(2, '0')}</b> / ${String(data.length).padStart(2, '0')}`;
      }
      // 按进度判断哪些面板已经进入视野
      const x = p * distance, vw = window.innerWidth;
      panels().forEach((el) => {
        const left = el.offsetLeft;
        if (left < x + vw * 0.92 && left + el.offsetWidth > x + vw * 0.06) show(el);
      });
    }

    function sync() {
      const want = !reduced && mqDesktop.matches;
      if (want === enabled) { if (enabled) { layout(); update(); } return; }
      enabled = want;
      sec.classList.toggle('hs-off', !enabled);
      sec.dataset.hs = enabled ? 'on' : 'off';   // 便于排查：当前是否为钉住模式
      if (enabled) {
        if (ioOff) { ioOff.disconnect(); ioOff = null; }
        layout(); update();
      } else {
        // 手机端 / 关闭动效：退化为原生横滑，用 IO 在滑动时逐张揭开
        sec.style.height = '';
        track.style.transform = '';
        if (bar) bar.style.width = '';
        if (ioOff) ioOff.disconnect();
        ioOff = new IntersectionObserver((es) => {
          es.forEach((en) => {
            if (!en.isIntersecting) return;
            show(en.target);
            ioOff.unobserve(en.target);
          });
        }, { root: track, threshold: .28 });
        panels().forEach((p) => ioOff.observe(p));
      }
    }

    scrollSubs.push(update);
    if (head && window.ResizeObserver) {
      new ResizeObserver(() => { layout(); update(); }).observe(head);
    }
    window.addEventListener('resize', () => { layout(); update(); }, { passive: true });
    window.addEventListener('load', () => { layout(); update(); });
    requestAnimationFrame(() => { sync(); layout(); update(); });
    setTimeout(() => { layout(); update(); }, 400);

    /* 预热面板图：面板是被 transform 平移的，靠 loading="lazy" 可能在滑到时才开始加载，
       出现「滑到才白一下」的突现。这里在首屏空闲后按顺序补图，既不影响首屏，也不会突现。 */
    const warmPanels = () => data.forEach((p) => { const im = new Image(); im.src = p.img; });
    if ('requestIdleCallback' in window) requestIdleCallback(warmPanels, { timeout: 2500 });
    else setTimeout(warmPanels, 1500);
  })();
})();
