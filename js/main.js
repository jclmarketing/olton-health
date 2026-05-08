(function () {
  // Mobile nav toggle
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }
  document.querySelectorAll('.nav__menu a').forEach(a => {
    a.addEventListener('click', () => nav && nav.classList.remove('open'));
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 4);
    const fcta = document.querySelector('.floating-cta');
    if (fcta) fcta.classList.toggle('visible', window.scrollY > 800);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => io.observe(el));

  // Animated number count-up
  const numIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const dur = 1400;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = (target * eased).toFixed(decimals);
        el.textContent = prefix + v + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      numIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => numIO.observe(el));

  // Subtle parallax for hero visual
  const heroVisual = document.querySelector('.hero__visual img');
  if (heroVisual && window.matchMedia('(min-width: 960px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 600);
      heroVisual.style.transform = `scale(1.06) translateY(${y * 0.08}px)`;
    }, { passive: true });
  }
})();
