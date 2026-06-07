/**
 * pr-animations.js
 * PR Awards page — animation & interaction module
 * Uses pra-* class namespace for all premium page elements
 */
(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────
     UTILITIES
  ────────────────────────────────────────────────────── */

  /** easeOutQuart — smooth deceleration for counters */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  /* ──────────────────────────────────────────────────────
     1. REVEAL ANIMATIONS  [data-pra-reveal]
  ────────────────────────────────────────────────────── */
  function initReveal() {
    var ios = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-pra-delay') || '0', 10);
        setTimeout(function () {
          el.classList.add('pra-revealed');
        }, delay);
        ios.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-pra-reveal]').forEach(function (el) {
      ios.observe(el);
    });
  }

  /* ──────────────────────────────────────────────────────
     2. SCROLL CUE — hide after first scroll
  ────────────────────────────────────────────────────── */
  function initScrollCue() {
    var cue = document.getElementById('praScrollCue');
    if (!cue) return;
    var hide = function () {
      if (window.scrollY > 60) {
        cue.classList.add('is-hidden');
        window.removeEventListener('scroll', hide);
      }
    };
    window.addEventListener('scroll', hide, { passive: true });
  }

  /* ──────────────────────────────────────────────────────
     3. ANIMATED COUNTERS  [data-count]
  ────────────────────────────────────────────────────── */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;

    function tick(timestamp) {
      if (!start) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var value = Math.round(easeOutQuart(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var counters = document.querySelectorAll('.pra-stats__num[data-count]');
    if (!counters.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { io.observe(el); });
  }

  /* ──────────────────────────────────────────────────────
     4. CARD STAGGER ENTRANCE  [data-pra-card]
  ────────────────────────────────────────────────────── */
  function initCardReveal() {
    var cards = document.querySelectorAll('[data-pra-card]');
    if (!cards.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var card = entry.target;
        var index = Array.prototype.indexOf.call(cards, card);
        var stagger = (index % 3) * 80;
        setTimeout(function () {
          card.classList.add('pra-revealed');
        }, stagger);
        io.unobserve(card);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    cards.forEach(function (card) { io.observe(card); });
  }

  /* ──────────────────────────────────────────────────────
     5. FILTER BAR
  ────────────────────────────────────────────────────── */
  function initFilters() {
    var buttons = document.querySelectorAll('.pra-filter-btn');
    var cards = document.querySelectorAll('[data-pra-card]');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.classList.remove('pra-filter-btn--active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('pra-filter-btn--active');
        btn.setAttribute('aria-pressed', 'true');

        var filter = btn.getAttribute('data-filter');

        cards.forEach(function (card, i) {
          var cat = card.getAttribute('data-cat');
          var show = filter === 'all' || cat === filter;
          card.classList.toggle('pra-card--filtered', !show);

          if (show && !card.classList.contains('pra-revealed')) {
            var delay = (i % 3) * 80;
            setTimeout(function () {
              card.classList.add('pra-revealed');
            }, delay);
          }
        });
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     6. CUSTOM LIGHTBOX  .pra-lb-trigger
  ────────────────────────────────────────────────────── */
  function initLightbox() {
    var lb = document.getElementById('praLb');
    var lbImg = document.getElementById('praLbImg');
    var lbClose = document.getElementById('praLbClose');
    var lbBackdrop = document.getElementById('praLbBackdrop');
    if (!lb || !lbImg) return;

    function openLb(src, alt) {
      lbImg.src = '';
      lbImg.alt = alt || 'Press Release image';
      lb.hidden = false;
      document.body.style.overflow = 'hidden';

      var img = new Image();
      img.onload = function () { lbImg.src = src; };
      img.src = src;
    }

    function closeLb() {
      lb.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.pra-lb-trigger').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var src = el.getAttribute('href');
        var card = el.closest('.pra-card');
        var titleEl = card && card.querySelector('.pra-card__title');
        var alt = titleEl ? titleEl.textContent.trim() : 'Press Release image';
        openLb(src, alt);
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLb);

    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && !lb.hidden) {
        closeLb();
      }
    });
  }

  /* ──────────────────────────────────────────────────────
     7. BRANDS SWIPER CAROUSEL
  ────────────────────────────────────────────────────── */
  function initBrandsSwiper() {
    var el = document.querySelector('.brands-slider-active');
    if (!el || typeof Swiper === 'undefined') return;

    new Swiper(el, {
      loop: true,
      speed: 900,
      spaceBetween: 24,
      autoplay: { delay: 2800, disableOnInteraction: false },
      grabCursor: true,
      breakpoints: {
        0:    { slidesPerView: 1 },
        480:  { slidesPerView: 2 },
        768:  { slidesPerView: 3 },
        992:  { slidesPerView: 4 },
        1200: { slidesPerView: 5 }
      }
    });
  }

  /* ──────────────────────────────────────────────────────
     8. COPYRIGHT YEAR
  ────────────────────────────────────────────────────── */
  function initCopyrightYear() {
    var el = document.getElementById('copyrightYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ──────────────────────────────────────────────────────
     9. PARALLAX HERO ORBS  (subtle, rAF-throttled)
  ────────────────────────────────────────────────────── */
  function initOrbParallax() {
    var orbs = document.querySelectorAll('.pra-orb');
    if (!orbs.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (orbs[0]) orbs[0].style.transform = 'translateY(' + (y * 0.12) + 'px)';
        if (orbs[1]) orbs[1].style.transform = 'translateY(' + (y * -0.08) + 'px)';
        if (orbs[2]) orbs[2].style.transform = 'translateY(' + (y * 0.06) + 'px)';
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────────────── */
  function init() {
    initReveal();
    initScrollCue();
    initCounters();
    initCardReveal();
    initFilters();
    initLightbox();
    initBrandsSwiper();
    initCopyrightYear();
    initOrbParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
