/**
 * script.js — Subhankar Rout Portfolio
 * Custom JS for portfolio interactions.
 * Requires: jQuery (loaded before this file via main.js chain)
 *
 * Modules:
 *   01. Copyright Year
 *   02. Custom Cursor
 *   03. Scroll Reveal (Intersection Observer)
 *   04. Project Filter Tabs
 *   05. Video Popup
 *   06. Scroll-to-Top
 *   07. Reduced-motion guard
 */

(function () {
  'use strict';

  /* ============================================================
     01. COPYRIGHT YEAR
  ============================================================ */
  var yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ============================================================
     02. CUSTOM CURSOR
     Only activates on true pointer devices
  ============================================================ */
  var cursorDot  = document.getElementById('cursorDot');
  var cursorRing = document.getElementById('cursorRing');

  if (
    cursorDot && cursorRing &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  ) {
    var mouseX = 0, mouseY = 0;
    var ringX  = 0, ringY  = 0;
    var cursorVisible = false;
    var rafId;

    // Track cursor position
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';

      if (!cursorVisible) {
        cursorVisible = true;
        cursorDot.style.opacity  = '1';
        cursorRing.style.opacity = '1';
      }
    });

    // Smooth ring follow via rAF
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      rafId = requestAnimationFrame(animateCursor);
    }
    rafId = requestAnimationFrame(animateCursor);

    // Hover state: enlarge ring on interactive elements
    function addHoverListeners() {
      var targets = document.querySelectorAll(
        'a, button, .pr-project-card, .pr-company-card, .pr-filter-tab, .pr-ai-card'
      );
      targets.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          cursorRing.classList.add('is-hovering');
        });
        el.addEventListener('mouseleave', function () {
          cursorRing.classList.remove('is-hovering');
        });
      });
    }
    addHoverListeners();

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', function () {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
      cursorVisible = false;
    });
    document.addEventListener('mouseenter', function () {
      if (cursorVisible) {
        cursorDot.style.opacity  = '1';
        cursorRing.style.opacity = '1';
      }
    });
  }


  /* ============================================================
     03. SCROLL REVEAL — Intersection Observer
     Adds .is-revealed to [data-reveal] when element enters view.
     Stagger delay via [data-reveal-delay="N"] (see styles.css).
  ============================================================ */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ============================================================
     04. PROJECT FILTER TABS
     Shows/hides project cards by [data-cat].
     Re-triggers reveal animation on newly-visible cards.
  ============================================================ */
  var filterTabs  = document.querySelectorAll('.pr-filter-tab');
  var projectGrid = document.getElementById('projectGrid');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var clickedFilter = this.dataset.filter;

      // Update active state + aria-pressed
      filterTabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('is-active');
      this.setAttribute('aria-pressed', 'true');

      // Show / hide cards
      if (!projectGrid) return;
      var cards = projectGrid.querySelectorAll('.pr-project-card');

      cards.forEach(function (card) {
        var match = clickedFilter === 'all' || card.dataset.cat === clickedFilter;
        card.style.display = match ? '' : 'none';

        // Re-animate visible cards
        if (match) {
          card.classList.remove('is-revealed');
          // Small delay so the browser repaints first
          setTimeout(function () {
            card.classList.add('is-revealed');
          }, 60);
        }
      });
    });
  });


  /* ============================================================
     05. VIDEO POPUP
  ============================================================ */
  var videoPopup  = document.getElementById('videoPopup');
  var videoFrame  = document.getElementById('videoFrame');
  var popupClose  = document.getElementById('popupCloseBtn');

  function openVideoPopup(url) {
    if (!videoPopup || !videoFrame) return;
    videoFrame.src = url;
    videoPopup.classList.add('is-active');
    videoPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (popupClose) {
      popupClose.focus();
    }
  }

  function closeVideoPopup() {
    if (!videoPopup || !videoFrame) return;
    videoPopup.classList.remove('is-active');
    videoPopup.setAttribute('aria-hidden', 'true');
    videoFrame.src = '';
    document.body.style.overflow = '';
  }

  // Triggers (.js-video-trigger)
  document.querySelectorAll('.js-video-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openVideoPopup(this.getAttribute('href'));
    });
  });

  // Close button
  if (popupClose) {
    popupClose.addEventListener('click', closeVideoPopup);
  }

  // Click outside popup content to close
  if (videoPopup) {
    videoPopup.addEventListener('click', function (e) {
      if (e.target === videoPopup) closeVideoPopup();
    });
  }

  // Escape key to close
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && videoPopup && videoPopup.classList.contains('is-active')) {
      closeVideoPopup();
    }
  });


  /* ============================================================
     06. SCROLL-TO-TOP (mobile button)
     NOTE: main.js section 03 already handles the scroll listener
     that adds/removes .open on .scroll-to-target. This module
     only overrides the click to use native smooth scroll instead
     of jQuery animate, avoiding double-binding the scroll event.
  ============================================================ */
  var scrollTopBtn = document.querySelector('.scroll-top.scroll-to-target');

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation(); // prevent main.js animate from also firing
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
   08. CREATIVE CHRONICLES SWIPER
============================================================ */
if (
  typeof Swiper !== "undefined" &&
  document.querySelector(".pr-chronicles-swiper")
) {
  new Swiper(".pr-chronicles-swiper", {
    loop: true,
    speed: 800,
    spaceBetween: 24,
    grabCursor: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    pagination: {
      el: ".pr-chronicles-dots",
      clickable: true
    },

    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
}

  /* ============================================================
     09. MOBILE / TABLET OFFCANVAS NAV
     Wires the hamburger (.tp-menu-bar), offcanvas panel
     (.tpoffcanvas), overlay (.body-overlay) and close button
     (.close-btn) to match style.css class names:
       open  → .tpoffcanvas.opened  +  .body-overlay.apply
       close → remove both classes

     main.js section 08 handles meanmenu cloning into .mobile-menu.
     This module only handles the sidebar open/close toggle and
     adds Escape-key + focus-trap accessibility on top.

     NOTE: main.js already binds click for .tp-menu-bar, .close-btn,
     and .body-overlay via jQuery. This module is a defensive
     re-bind using vanilla JS so it works even if jQuery fires
     before the DOM is ready or if main.js throws an earlier error.
     Using the exact same class names ensures no double-state issue.
  ============================================================ */
  (function initOffcanvasNav() {
    /* Selectors must match style.css and main.js exactly */
    var menuBar  = document.querySelector('.tp-menu-bar');
    var panel    = document.querySelector('.tpoffcanvas');
    var overlay  = document.querySelector('.body-overlay');
    var closeBtn = document.querySelector('.close-btn');

    if (!menuBar || !panel) return; // not on a page with mobile nav

    function openMenu() {
      panel.classList.add('opened');
      if (overlay) overlay.classList.add('apply');
      menuBar.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
      panel.classList.remove('opened');
      if (overlay) overlay.classList.remove('apply');
      menuBar.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBar.focus();
    }

    /* Defensive bind — safe even if main.js already bound these */
    menuBar.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay)  overlay.addEventListener('click',  closeMenu);

    /* Escape key to close */
    document.addEventListener('keydown', function (e) {
      if (
        (e.key === 'Escape' || e.key === 'Esc') &&
        panel.classList.contains('opened')
      ) {
        closeMenu();
      }
    });

    /* Focus trap: keep Tab cycling inside the open panel */
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !panel.classList.contains('opened')) return;
      var focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  })();


  /* ============================================================
     07. REDUCED-MOTION GUARD
     Pause CSS animation-based marquees when user prefers
     reduced motion (supplements the CSS @media query).
  ============================================================ */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var marqueeTrack    = document.getElementById('marqueeTrack');
    var chroniclesTrack = document.getElementById('chroniclesTrack');

    if (marqueeTrack)    marqueeTrack.style.animationPlayState    = 'paused';
    if (chroniclesTrack) chroniclesTrack.style.animationPlayState = 'paused';

    // Also pause hero blobs
    document.querySelectorAll('.pr-hero__blob, .pr-hero__tag').forEach(function (el) {
      el.style.animation = 'none';
    });
  }

})();

  /* ============================================================
     10. ABOUT PAGE — all modules scoped to .ab-page body class
         a) Scroll-reveal (uses .ab-reveal / .ab-stagger)
         b) Animated counters (.ab-stat-num[data-count])
         c) Horizontal journey track (drag, dots, keyboard)
     Only initialises when document.body has class "ab-page"
  ============================================================ */
  (function initAboutPage() {
    if (!document.body.classList.contains('ab-page')) return;

    /* —— a) Scroll-reveal ————————————————————————————————————— */
    var abRevealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('ab-visible');
          abRevealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.ab-reveal, .ab-stagger').forEach(function (el) {
      abRevealObs.observe(el);
    });

    /* —— b) Animated counters ———————————————————————————————— */
    function runCounter(el) {
      var target   = +el.dataset.count;
      var suffix   = el.dataset.suffix || '+';
      var duration = 1800;
      var start    = performance.now();
      function tick(now) {
        var p = Math.min((now - start) / duration, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    }

    var statsSection = document.querySelector('.ab-stats');
    if (statsSection) {
      var counted = false;
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          document.querySelectorAll('.ab-stat-num[data-count]').forEach(runCounter);
        }
      }, { threshold: 0.4 }).observe(statsSection);
    }

    /* —— c) Horizontal journey ——————————————————————————————— */
    var track = document.getElementById('abJourneyTrack');
    var dotsContainer = document.getElementById('abJourneyDots');
    var journeyItems  = document.querySelectorAll('.ab-journey-item');

    if (!track || !dotsContainer || !journeyItems.length) return;

    /* Reveal items on scroll into view */
    var jObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = +entry.target.dataset.index;
          setTimeout(function () { entry.target.classList.add('ab-jv'); }, idx * 80);
        }
      });
    }, { threshold: 0.1 });
    journeyItems.forEach(function (it) { jObs.observe(it); });

    /* Build nav dots */
    journeyItems.forEach(function (_, i) {
      var btn = document.createElement('button');
      btn.className = 'ab-journey-dot' + (i === 0 ? ' ab-active' : '');
      btn.setAttribute('aria-label', 'Go to milestone ' + (i + 1));
      btn.addEventListener('click', function () { scrollToJourneyItem(i); });
      dotsContainer.appendChild(btn);
    });

    function scrollToJourneyItem(idx) {
      var items = document.querySelectorAll('.ab-journey-item');
      if (!items[idx]) return;
      var itemLeft  = items[idx].offsetLeft;
      var trackW    = track.offsetWidth;
      var itemW     = items[idx].offsetWidth;
      track.scrollTo({ left: itemLeft - trackW / 2 + itemW / 2, behavior: 'smooth' });
    }

    function updateDots() {
      var scrollLeft  = track.scrollLeft;
      var viewCenter  = scrollLeft + track.offsetWidth / 2;
      var closest = 0, closestDist = Infinity;
      journeyItems.forEach(function (item, i) {
        var c = item.offsetLeft + item.offsetWidth / 2;
        var d = Math.abs(viewCenter - c);
        if (d < closestDist) { closestDist = d; closest = i; }
      });
      document.querySelectorAll('.ab-journey-dot').forEach(function (dot, i) {
        dot.classList.toggle('ab-active', i === closest);
      });
      journeyItems.forEach(function (item, i) {
        item.classList.toggle('ab-active', i === closest);
      });
    }

    track.addEventListener('scroll', updateDots, { passive: true });

    /* Drag to scroll */
    var isDown = false, startX, scrollLeftStart;
    track.addEventListener('mousedown', function (e) {
      isDown = true; startX = e.pageX - track.offsetLeft;
      scrollLeftStart = track.scrollLeft; track.classList.add('grabbing');
    });
    document.addEventListener('mouseup', function () {
      isDown = false; track.classList.remove('grabbing');
    });
    track.addEventListener('mousemove', function (e) {
      if (!isDown) return; e.preventDefault();
      track.scrollLeft = scrollLeftStart - (e.pageX - track.offsetLeft - startX);
    });

    /* Keyboard arrow navigation */
    var activeIdx = 0;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        activeIdx = Math.min(activeIdx + 1, journeyItems.length - 1);
        scrollToJourneyItem(activeIdx);
      }
      if (e.key === 'ArrowLeft') {
        activeIdx = Math.max(activeIdx - 1, 0);
        scrollToJourneyItem(activeIdx);
      }
    });
  })();