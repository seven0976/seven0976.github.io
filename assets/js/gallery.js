/* ============================================================
   SevenHours · 作品集页脚本
   ============================================================ */
(function () {
  const S = window.SITE || {};
  const W = window.WORKS || { categories: [] };
  const $ = (s, r = document) => r.querySelector(s);

  // 本脚本只服务于作品集页；放到别的页面上应该安静退出，而不是抛错
  const chips = $('#chips'), grid = $('#grid'), emptyEl = $('#empty');
  if (!chips || !grid || !emptyEl || !$('#gcount')) return;

  const cats = (W.categories || []).filter(c => c.items && c.items.length);
  const total = cats.reduce((n, c) => n + c.items.length, 0);
  $('#gcount').textContent = `${cats.length} 种风格 · ${total} 张作品`;
  document.getElementById('year').textContent = new Date().getFullYear();
  $('#footCn').textContent = S.brand?.cn || '';
  $('#footNote').textContent = S.footer?.note || '';

  /* ---------- chips ---------- */
  chips.innerHTML =
    `<button class="chip on" data-cat="__all">全部 <span style="opacity:.6">${total}</span></button>` +
    cats.map(c => `<button class="chip" data-cat="${c.name}">${c.name} <span style="opacity:.6">${c.items.length}</span></button>`).join('');

  /* ---------- grid ---------- */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let flat = [], itemIO = null;

  /* 入场：错落上浮（每行最多叠加 14 档，避免长列表越等越久） */
  const revealItems = () => {
    const items = [...grid.querySelectorAll('.it')];
    if (reduced) return;
    items.forEach((el, i) => {
      el.style.setProperty('--i', Math.min(i, 14));
      el.classList.add('wait');
    });
    if (itemIO) itemIO.disconnect();
    itemIO = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('show');
        itemIO.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .04 });
    items.forEach((el) => itemIO.observe(el));
  };

  const renderGrid = (cat) => {
    const list = cat === '__all' ? cats.flatMap(c => c.items.map(i => ({ ...i, cat: c.name })))
                                 : (cats.find(c => c.name === cat)?.items || []).map(i => ({ ...i, cat }));
    flat = list;
    emptyEl.style.display = list.length ? 'none' : 'block';
    grid.innerHTML = list.map((it, i) => `
      <figure class="it" data-i="${i}">
        <img src="${it.thumb}" alt="${it.cat}" loading="lazy" decoding="async">
        <figcaption>${it.cat}</figcaption>
      </figure>`).join('');
    revealItems();
    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  };

  /* 选中某个分类：同步 chips 高亮 + 更新地址栏（便于分享/返回）+ 渲染 */
  const selectCat = (cat, opts) => {
    const exists = cat === '__all' || cats.some(c => c.name === cat);
    const target = exists ? cat : '__all';
    const btn = [...chips.querySelectorAll('.chip')].find(x => x.dataset.cat === target);
    chips.querySelectorAll('.chip').forEach(x => x.classList.remove('on'));
    if (btn) {
      btn.classList.add('on');
      if (opts && opts.scrollChip) {
        try { btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (_) {}
      }
    }
    renderGrid(target);
    if (opts && opts.updateUrl) {
      const url = target === '__all' ? 'gallery.html' : `gallery.html?cat=${encodeURIComponent(target)}`;
      try { history.replaceState(null, '', url); } catch (_) {}
    }
  };

  // 打开页面时读 ?cat=xxx（从「精选作品 / 更多作品」点进来会带这个参数）
  const fromUrl = new URLSearchParams(location.search).get('cat');
  selectCat(fromUrl || '__all', { updateUrl: false });
  if (fromUrl && cats.some(c => c.name === fromUrl)) {
    // 从外部跳进来时，高亮标签滑进可视区，让用户知道当前在看哪个风格
    const btn = [...chips.querySelectorAll('.chip')].find(x => x.dataset.cat === fromUrl);
    if (btn) setTimeout(() => { try { btn.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (_) {} }, 120);
  }

  chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    selectCat(b.dataset.cat, { updateUrl: true, scrollChip: true });
  });

  /* ---------- lightbox ---------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let idx = 0;
  const render = () => {
    const it = flat[idx]; if (!it) return;
    lbImg.src = it.full;
    lbCap.innerHTML = `<b>${it.cat}</b> &nbsp;·&nbsp; ${idx + 1} / ${flat.length}`;
  };
  const open = (i) => { idx = i; lb.classList.add('on'); document.body.classList.add('lb-open'); render(); };
  const close = () => { lb.classList.remove('on'); document.body.classList.remove('lb-open'); lbImg.src = ''; };
  const nav = (d) => { idx = (idx + d + flat.length) % flat.length; render(); };
  $('#lbClose').onclick = close;
  $('#lbPrev').onclick = () => nav(-1);
  $('#lbNext').onclick = () => nav(1);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
  /* 手机端左右滑动切换 */
  let tsx = 0, tsy = 0;
  lb.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; tsy = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tsx, dy = e.changedTouches[0].clientY - tsy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) nav(dx < 0 ? 1 : -1);
  }, { passive: true });

  grid.addEventListener('click', e => {
    const it = e.target.closest('.it'); if (!it) return;
    open(+it.dataset.i);
  });

  /* ---------- nav ---------- */
  const burger = $('#burger'), links = $('#navLinks');
  burger.onclick = () => { links.classList.toggle('open'); burger.classList.toggle('x'); };
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); burger.classList.remove('x');
  }));
})();
