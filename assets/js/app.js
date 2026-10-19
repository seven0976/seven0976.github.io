/* ============================================================
   SevenHours · 站点脚本（入口页 / 旅拍板块 / 理疗板块 共用）
   每个区块都以「根元素是否存在」为开关，所以同一个文件可以服务三个页面。
   ============================================================ */
(function () {
  const S = window.SITE || {};
  const W = window.WORKS || { categories: [], hero: [] };
  const PAGE = document.body.dataset.page || 'hub';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const ICONS = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 16.5V19M19 16.5V19M3.5 16.5h17v-4l-2-5.2A2 2 0 0 0 16.6 6H7.4a2 2 0 0 0-1.9 1.3l-2 5.2v4z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/></svg>',
    wechat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3C4.9 3 1.6 5.8 1.6 9.2c0 1.9 1 3.6 2.7 4.8L3.6 16.6l2.6-1.3c.9.3 1.8.4 2.8.4h.6a5.6 5.6 0 0 1-.2-1.5c0-3.4 3.3-6.1 7.4-6.1h.6C16.5 5.2 13.1 3 9 3zm-2.5 3.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM15 9.4c-3.6 0-6.5 2.4-6.5 5.3s2.9 5.3 6.5 5.3c.8 0 1.5-.1 2.2-.3l2.4 1.2-.6-2c1.5-1 2.5-2.5 2.5-4.2 0-2.9-2.9-5.3-6.5-5.3zm-2 2.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/></svg>',
    xhs: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6 14.4 7l4.9.7-3.6 3.4.9 4.8-4.6-2.4-4.6 2.4.9-4.8L4.7 7.7 9.6 7 12 2.6z"/></svg>',
    douyin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3h-2.7v11.4a2.6 2.6 0 1 1-2.6-2.6c.2 0 .4 0 .6.1V9.2a5.3 5.3 0 1 0 4.7 5.2V8.6a5.6 5.6 0 0 0 3.5 1.2V7.2a3.5 3.5 0 0 1-3.5-3.5V3z"/></svg>',
    bili: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6.5" width="18" height="13.5" rx="3"/><path d="M7 3.5 10 6.5M17 3.5 14 6.5M9.5 11v3.5M14.5 11V14.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 8.5h3l1.5-2.5h9L18 8.5h3v11H3z"/><circle cx="12" cy="14" r="3.4"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="9" y="3" width="6" height="10.5" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 17h6M10 20h4M12 3a6 6 0 0 0-3.5 10.8V16h7v-2.2A6 6 0 0 0 12 3z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 4C10 4 4 9 4 16c0 2 1 4 1 4s2-9 15-12c0 0-7 3-11 9"/></svg>',
    lotus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 4c2 3 2 6 0 9-2-3-2-6 0-9z"/><path d="M4 11c3 0 6 1 8 4-3 .5-6-.5-8-4zM20 11c-3 0-6 1-8 4 3 .5 6-.5 8-4z"/><path d="M3 16c3 3 6 4 9 4s6-1 9-4"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5V4.5a1.5 1.5 0 0 1 3 0V11m0-1V6.5a1.5 1.5 0 0 1 3 0V13c0 4-2 7-6 7s-6-2.5-6-5.5V11a1.5 1.5 0 0 1 3 0"/></svg>'
  };
  const ico = (n) => ICONS[n] || '';

  /* ==========================================================
     入口页
     ========================================================== */
  (function renderHub() {
    const nav = $('#hubCards');
    if (!nav) return;
    const H = S.hub || {};
    $('#hubEyebrow').textContent = H.eyebrow || '';
    $('#hubTitle').innerHTML = H.title || '';
    $('#hubDesc').textContent = H.desc || '';
    nav.innerHTML = (H.cards || []).map((c) => `
      <a class="hub-card rv" href="${c.href}">
        <div class="hub-card-media"><img src="${c.img}" alt="${c.title}" loading="eager" decoding="async"></div>
        <div class="hub-card-body">
          <div class="hub-card-tag">${c.tag || ''}</div>
          <h2>${c.title}</h2>
          <div class="hub-card-en">${c.en || ''}</div>
          <p>${c.desc || ''}</p>
          <div class="hub-card-points">${(c.points || []).map((p) => `<span>${p}</span>`).join('')}</div>
          <span class="hub-card-cta">${c.cta || '进入'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </a>`).join('');
    if ($('#hubNote')) $('#hubNote').textContent = H.note || '';
  })();

  /* ==========================================================
     旅拍板块 · 首屏
     ========================================================== */
  const heroBg = $('#heroBg');
  if (heroBg) {
    const heroImgs = (W.hero && W.hero.length ? W.hero : ['assets/img/feature/about.jpg']);
    heroBg.innerHTML = heroImgs.map((src, i) =>
      `<div class="slide${i === 0 ? ' on' : ''}" style="background-image:url('${src}')"></div>`).join('');
    const dots = $('#heroDots');
    if (dots && heroImgs.length > 1) {
      dots.innerHTML = heroImgs.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'on' : ''}"></button>`).join('');
      let cur = 0, timer;
      const go = (n) => {
        const slides = $$('.slide', heroBg), bs = $$('button', dots);
        slides[cur].classList.remove('on'); bs[cur].classList.remove('on');
        cur = (n + slides.length) % slides.length;
        slides[cur].classList.add('on'); bs[cur].classList.add('on');
      };
      const play = () => { timer = setInterval(() => go(cur + 1), 5200); };
      dots.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        clearInterval(timer); go(+b.dataset.i); play();
      });
      play();
    }
    const h = S.hero || {};
    $('#heroEyebrow').textContent = h.eyebrow || '';
    $('#heroTitle').innerHTML = h.title || '';
    $('#heroDesc').textContent = h.desc || '';
    $('#heroTags').innerHTML = (h.tags || []).map((t) => `<span>${t}</span>`).join('');
  }

  /* ==========================================================
     旅拍板块 · 其余内容
     ========================================================== */
  if ($('#stats')) {
    $('#stats').innerHTML = (S.stats || []).map((s) =>
      `<div class="strip-item rv"><b>${s.num}</b><span>${s.label}</span></div>`).join('');
  }

  if ($('#aboutTitle')) {
    const a = S.about || {};
    $('#aboutEyebrow').textContent = a.eyebrow || '';
    $('#aboutTitle').textContent = a.title || '';
    $('#aboutQuote').innerHTML = a.quote || '';
    $('#aboutBody').innerHTML = (a.body || []).map((p) => `<p>${p}</p>`).join('');
    $('#aboutTags').innerHTML = (a.tags || []).map((t) => `<span>${t}</span>`).join('');
    const ap = $('#aboutPhoto');
    if (a.photo) ap.src = a.photo; else ap.remove();
    ap.onerror = () => { ap.style.display = 'none'; };
  }

  if ($('#philosophy')) {
    $('#philosophy').innerHTML = (S.philosophy || []).map((p) => `
      <article class="card rv">
        <div class="card-ico">${ico(p.icon)}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="card-tags"><span>${p.en}</span></div>
      </article>`).join('');
  }

  if ($('#services')) {
    $('#services').innerHTML = (S.services || []).map((s) => `
      <div class="svc rv">
        <div class="svc-no">${s.no}</div>
        <div><h3>${s.title}<small>${s.en}</small></h3></div>
        <div class="svc-body">
          <p>${s.desc}</p>
          <ul>${(s.points || []).map((p) => `<li>${p}</li>`).join('')}</ul>
        </div>
      </div>`).join('');
  }

  if ($('#routes')) {
    $('#routes').innerHTML = (S.routes || []).map((r) => `<span>${r}</span>`).join('');
  }

  if ($('#carTitle')) {
    const CAR = S.car || {};
    $('#carEyebrow').textContent = CAR.eyebrow || '';
    $('#carTitle').textContent = CAR.title || '';
    $('#carDesc').textContent = CAR.desc || '';
    const cm = $('#carMain');
    if (CAR.main) { cm.src = CAR.main; cm.alt = CAR.title || '专属座驾'; }
    else cm.closest('.car-hero').remove();
    $('#carSpecs').innerHTML = (CAR.specs || []).map((s) => `<span>${s}</span>`).join('');
    $('#carFeats').innerHTML = (CAR.feats || []).map((f) => `
      <article class="car-feat rv">
        <img src="${f.img}" alt="${f.title}" loading="lazy" decoding="async">
        <div class="car-feat-body"><h3>${f.title}</h3><p>${f.desc}</p></div>
      </article>`).join('');
  }

  /* ---------- 陪玩报价：3 个单项 + 1 个打包 ---------- */
  if ($('#priceGrid')) {
    const P = S.pricing || {};
    $('#priceEyebrow').textContent = P.eyebrow || '';
    $('#priceTitle').textContent = P.title || '';
    $('#priceDesc').textContent = P.desc || '';
    $('#priceUnit').textContent = P.unitNote || '';

    // 单项卡片按价格从低到高排列（以后改价，顺序也会自动跟着变）
    const plans = [...(P.items || [])].sort((a, b) => (a.price || 0) - (b.price || 0));
    $('#priceGrid').innerHTML = plans.map((it) => `
      <article class="price rv" data-key="${it.key || ''}">
        <div class="price-name">${it.name}</div>
        <div class="price-en">${it.en || ''}</div>
        <div class="price-amt">
          <span class="cur">¥</span><span class="num">${it.price}</span><span class="unit">${it.unit || ''}</span>
        </div>
        <div class="price-note">${it.desc || ''}</div>
        <hr>
        <ul>${(it.features || []).map((f) => `<li>${ico('check')}<span>${f}</span></li>`).join('')}</ul>
        <a class="btn btn-ghost" href="#contact">${it.cta || '咨询'}</a>
      </article>`).join('');

    const B = P.bundle || {};
    // 省多少由「三个单项合计 − 打包价」自动算出，改价后不会对不上
    const itemSum = plans.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    const save = Math.max(0, itemSum - (Number(B.price) || 0));
    $('#bundleWrap').innerHTML = B.price ? `
      <article class="bundle rv">
        <div class="bundle-left">
          <div class="bundle-tag">一起买更省事</div>
          <h3 class="bundle-name">${B.name}</h3>
          <div class="bundle-en">${B.en || ''}</div>
          <p class="bundle-desc">${B.desc || ''}</p>
          <ul class="bundle-feats">${(B.features || []).map((f) => `<li>${ico('check')}<span>${f}</span></li>`).join('')}</ul>
        </div>
        <div class="bundle-right">
          <div class="bundle-amt">
            <span class="cur">¥</span><span class="num">${B.price}</span><span class="unit">${B.unit || ''}</span>
          </div>
          ${save > 0 ? `<div class="bundle-save">比分开买省 ¥${save}</div>` : ''}
          <a class="btn btn-primary" href="#contact">${B.cta || '预约'}</a>
        </div>
      </article>` : '';

    $('#extras').innerHTML = (P.extras || []).map((x) => `
      <div class="card rv" style="padding:22px 24px">
        <div style="font-size:12px;letter-spacing:.2em;color:var(--accent)">${x.k}</div>
        <div style="font-size:14px;color:var(--muted);margin-top:8px">${x.v}</div>
      </div>`).join('');
    $('#priceNote').textContent = P.note || '';
  }

  if ($('#equipGrid')) {
    const E = S.equipment || {};
    const G = window.GEAR || {};
    const eIcons = { camera: 'camera', lens: 'film', light: 'bulb', acc: 'mic' };
    $('#equipGrid').innerHTML = Object.keys(E).map((k) => {
      const c = E[k];
      return `<div class="equip-col rv">
        <h4>${ico(eIcons[k])}<span>${c.title}</span></h4>
        <ul>${(c.items || []).map((it) => {
          const name = typeof it === 'string' ? it : it.n;
          const img = (it && it.img) ? it.img : null;
          if (!img) return `<li class="noimg">${name}</li>`;
          const dark = !!(G[img] && G[img].dark);
          return `<li${dark ? ' class="eq-dark"' : ''}>`
            + `<span class="eq-pic${dark ? ' dark' : ''}">`
            + `<img src="assets/img/gear/${img}.webp" alt="${name}" loading="lazy" decoding="async">`
            + `</span><span class="eq-name">${name}</span></li>`;
        }).join('')}</ul>
      </div>`;
    }).join('');
    $$('#equipGrid img').forEach((im) => im.addEventListener('error', () => {
      const pic = im.parentNode, li = pic.parentNode;
      pic.remove(); li.classList.add('noimg');
    }));
  }

  /* ==========================================================
     理疗板块
     ========================================================== */
  (function renderWellness() {
    if (!$('#wlProjects')) return;
    const V = S.wellness || {};

    if ($('#wlHeroImg') && V.hero && V.hero.img) $('#wlHeroImg').src = V.hero.img;
    const set = (id, v) => { const el = $(id); if (el) el.textContent = v || ''; };
    set('#wlEyebrow', V.hero && V.hero.eyebrow);
    set('#wlTitle', V.hero && V.hero.title);
    set('#wlDesc', V.hero && V.hero.desc);
    $('#wlTags').innerHTML = ((V.hero && V.hero.tags) || []).map((t) => `<span>${t}</span>`).join('');

    if (V.intro) {
      set('#wlAboutEyebrow', V.intro.eyebrow);
      set('#wlAboutTitle', V.intro.title);
      $('#wlAboutBody').innerHTML = (V.intro.body || []).map((p) => `<p>${p}</p>`).join('');
    }

    const PICON = { yoga: 'lotus', therapy: 'hand', counsel: 'eye' };
    $('#wlProjects').innerHTML = (V.projects || []).map((p) => `
      <article class="wl-card rv" data-key="${p.key}">
        ${p.photo ? `<div class="wl-card-photo"><img src="${p.photo}" alt="${p.title}" loading="lazy" decoding="async"></div>` : ''}
        <div class="wl-card-body">
          <div class="wl-card-head">
            <div class="wl-card-ico">${ico(PICON[p.key] || 'leaf')}</div>
            <div>
              <h3>${p.title}</h3>
              <div class="wl-card-en">${p.en || ''}</div>
            </div>
            <div class="wl-card-cap">${p.capacity || ''}</div>
          </div>
          <p class="wl-card-desc">${p.desc || ''}</p>
          <div class="wl-card-price">
            <span class="cur">¥</span><span class="num">${p.price}</span><span class="unit">${p.unit || ''}</span>
            <span class="wl-card-dur">${p.duration || ''}</span>
          </div>
          <ul class="wl-card-list">${(p.points || []).map((x) => `<li>${ico('check')}<span>${x}</span></li>`).join('')}</ul>
          <a class="btn btn-primary" href="#contact">预约${p.title}</a>
        </div>
      </article>`).join('');

    /* 练习意象图 —— 图上只保留一个词（瑜伽 / 香道 / 冥想 / 禅修），不写描述小字 */
    if ($('#wlGallery')) {
      const G = V.gallery || {};
      set('#wlGalEyebrow', G.eyebrow);
      set('#wlGalTitle', G.title);
      set('#wlGalDesc', G.desc);
      $('#wlGallery').innerHTML = (G.items || []).map((it) => `
        <figure class="wl-shot rv">
          <img src="${it.img}" alt="${it.title}" loading="lazy" decoding="async">
          <figcaption><b>${it.title}</b></figcaption>
        </figure>`).join('');
    }

    if (V.notes) {
      set('#wlNotesEyebrow', V.notes.eyebrow);
      set('#wlNotesTitle', V.notes.title);
      $('#wlNoteList').innerHTML = (V.notes.items || []).map((x) => `
        <div class="wl-note rv">
          <div class="wl-note-k">${x.k}</div>
          <div class="wl-note-v">${x.v}</div>
        </div>`).join('');
    }
  })();

  /* ==========================================================
     联系（三个页面共用；理疗页用理疗自己的引导语）
     ========================================================== */
  if ($('#contactWays')) {
    const V = S.wellness || {};
    const C = (PAGE === 'wellness' && V.cta)
      ? { eyebrow: 'CONTACT', title: V.cta.title, sub: V.cta.desc, ways: (S.contact || {}).ways }
      : (S.contact || {});
    $('#contactEyebrow').textContent = C.eyebrow || '';
    $('#contactTitle').textContent = C.title || '';
    $('#contactSub').textContent = C.sub || '';
    $('#contactWays').innerHTML = (C.ways || []).map((w) => `
      <div class="way" ${w.pending ? 'style="opacity:.62"' : ''}>
        <div class="way-ico">${ico(w.icon)}</div>
        <div><b>${w.k}</b><span>${w.v}</span></div>
        ${w.pending ? '' : '<span class="copy">复制</span>'}
      </div>`).join('');
    $('#contactWays').addEventListener('click', (e) => {
      const way = e.target.closest('.way'); if (!way) return;
      const txt = way.querySelector('span').textContent.trim();
      if (!txt || txt === '待补充') return;
      navigator.clipboard?.writeText(txt).then(() => {
        const c = way.querySelector('.copy');
        if (c) { c.textContent = '已复制 ✓'; setTimeout(() => c.textContent = '复制', 1600); }
      }).catch(() => {});
    });
  }

  if ($('#year')) {
    document.getElementById('year').textContent = new Date().getFullYear();
    $('#footCn').textContent = (S.brand && S.brand.cn) || '';
    $('#footNote').textContent = (S.footer && S.footer.note) || '';
  }

  /* ==========================================================
     精选作品（旅拍板块）
     ========================================================== */
  const grid = $('#featured');
  let feat = [];
  if (grid) {
    const all = (W.categories || []).flatMap((c) => c.items.map((i) => ({ ...i, cat: c.name, catEn: c.en })));
    const seen = {};
    for (const it of all) {
      if (seen[it.cat]) continue;
      seen[it.cat] = 1; feat.push(it);
    }
    if ($('#featCount')) $('#featCount').textContent = feat.length;
    // 每张可点击 → 跳到 gallery.html 的对应风格分类
    grid.innerHTML = feat.map((it, i) => `
      <a class="it rv" data-i="${i}" href="gallery.html?cat=${encodeURIComponent(it.cat)}"
         aria-label="${it.cat} · 查看该风格全部作品">
        <img src="${it.thumb}" alt="${it.cat}" loading="lazy" width="${it.w || ''}" height="${it.h || ''}">
        <figcaption>${it.cat}</figcaption>
        <span class="it-go" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </a>`).join('');
  }

  /* ==========================================================
     灯箱
     ========================================================== */
  const lb = $('#lb');
  if (lb) {
    const lbImg = $('#lbImg'), lbCap = $('#lbCap');
    let LB = [], idx = 0;
    const render = () => {
      const it = LB[idx]; if (!it) return;
      lbImg.src = it.full;
      lbCap.innerHTML = `<b>${it.cat}</b> &nbsp;·&nbsp; ${idx + 1} / ${LB.length}`;
    };
    const close = () => { lb.classList.remove('on'); document.body.classList.remove('lb-open'); lbImg.src = ''; };
    const nav = (d) => { idx = (idx + d + LB.length) % LB.length; render(); };
    const open = (list, i) => { LB = list; idx = i; lb.classList.add('on'); document.body.classList.add('lb-open'); render(); };
    $('#lbClose').onclick = close;
    $('#lbPrev').onclick = () => nav(-1);
    $('#lbNext').onclick = () => nav(1);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') nav(-1);
      if (e.key === 'ArrowRight') nav(1);
    });
    let tsx = 0, tsy = 0;
    lb.addEventListener('touchstart', (e) => { tsx = e.touches[0].clientX; tsy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - tsx, dy = e.changedTouches[0].clientY - tsy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) nav(dx < 0 ? 1 : -1);
    }, { passive: true });
    if (grid) {
      const featSrc = feat.map((f) => ({ ...f }));
      grid.addEventListener('click', (e) => {
        const it = e.target.closest('.it'); if (!it) return;
        open(featSrc, +it.dataset.i);
      });
    }
  }

  /* ==========================================================
     导航 / 入场
     ========================================================== */
  const nav0 = $('#nav'), burger = $('#burger'), links = $('#navLinks');
  if (nav0) {
    const onScroll = () => nav0.classList.toggle('scrolled', window.scrollY > 40);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (burger && links) {
    burger.onclick = () => { links.classList.toggle('open'); burger.classList.toggle('x'); };
    $$('#navLinks a').forEach((a2) => a2.addEventListener('click', () => {
      links.classList.remove('open'); burger.classList.remove('x');
    }));
  }

  const introWait = window.__DSH_INTRO || 0;
  const io = new IntersectionObserver((es) => {
    es.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      const wait = (introWait && el.closest('.hero,.wl-hero,.hub-hero')) ? introWait : 0;
      if (wait) setTimeout(() => el.classList.add('in'), wait);
      else el.classList.add('in');
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  $$('.rv').forEach((el) => io.observe(el));
})();
