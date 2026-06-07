/* ============================================
   PR/AWARDS PAGE - ENHANCED UX ANIMATIONS
   Senior UI/UX Specialist Standards
============================================ */

(function() {
  'use strict';

  // ========== SMOOTH PAGE LOAD ==========
  window.addEventListener('load', () => {
    document.body.style.animation = 'pageLoad 0.6s ease-out';
  });

  // ========== INTERSECTION OBSERVER SETUP ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // ========== HEADER REVEAL ANIMATIONS ==========
  const revealElements = () => {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Pause observer after element is visible for performance
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .section-header--light, .section-header--dark').forEach(el => {
      revealObs.observe(el);
    });
  };

  // ========== STAGGERED CARD ANIMATIONS ==========
  const animateCardsOnScroll = () => {
    const cards = document.querySelectorAll('.pr-card:not(.hidden), .pr-slide');
    
    cards.forEach((card, index) => {
      card.style.setProperty('--card-index', index);
    });

    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    cards.forEach(card => cardObs.observe(card));
  };

  // ========== ENHANCED COUNTER ANIMATION WITH EASING ==========
  const animateCounter = (el) => {
    const target = +el.dataset.count;
    const duration = 2000;
    const start = performance.now();
    
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    const run = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const easeProgress = easeOutQuart(progress);
      el.textContent = Math.floor(easeProgress * target) + '+';
      
      if (progress < 1) {
        requestAnimationFrame(run);
      } else {
        el.textContent = target + '+';
      }
    };
    
    requestAnimationFrame(run);
  };

  const setupCounters = () => {
    const statsEl = document.querySelector('.awards-highlight');
    if (!statsEl) return;

    let counted = false;
    const counterObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.award-stat-num[data-count]').forEach(animateCounter);
        counterObs.disconnect();
      }
    }, { threshold: 0.3 });

    counterObs.observe(statsEl);
  };

  // ========== ENHANCED FILTER FUNCTIONALITY ==========
  const setupFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all buttons
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.pr-card');

        cards.forEach((card, index) => {
          const shouldShow = filter === 'all' || card.dataset.cat === filter;
          
          if (shouldShow) {
            card.classList.remove('hidden');
            // Stagger appearance with smooth animation
            setTimeout(() => {
              card.style.animation = `cardPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
            }, index * 30);
          } else {
            card.classList.add('hidden');
            card.style.animation = 'none';
          }
        });

        // Scroll to cards smoothly
        setTimeout(() => {
          const firstVisible = document.querySelector('.pr-card:not(.hidden)');
          if (firstVisible) {
            firstVisible.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      });
    });
  };

  // ========== ENHANCED LIGHTBOX WITH SMOOTH TRANSITIONS ==========
  const setupLightbox = () => {
    const lbOverlay = document.getElementById('lbOverlay');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');
    
    if (!lbOverlay) return;

    const triggers = document.querySelectorAll('.lb-trigger');
    
    triggers.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const src = el.getAttribute('href');
        
        // Preload image
        const img = new Image();
        img.onload = () => {
          lbImg.src = src;
          lbOverlay.classList.add('open');
          document.body.style.overflow = 'hidden';
          lbImg.style.animation = 'fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        };
        img.src = src;
      });
    });

    // Close button with proper focus management
    if (lbClose) {
      lbClose.addEventListener('click', closeLightbox);
    }

    // Click on overlay to close
    lbOverlay.addEventListener('click', (e) => {
      if (e.target === lbOverlay) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lbOverlay.classList.contains('open')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lbOverlay.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.style.animation = 'none';
    }
  };

  // ========== ENHANCED PLAY BUTTONS WITH HOVER EFFECTS ==========
  const enhancePlayButtons = () => {
    const playBtns = document.querySelectorAll('.pr-card-play-btn');
    
    playBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.getAttribute('href');
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });

      btn.addEventListener('mouseenter', function() {
        const circle = this.querySelector('.play-circle');
        if (circle) {
          circle.style.animation = 'playPulse 0.6s ease-in-out';
        }
      });

      btn.addEventListener('mouseleave', function() {
        const circle = this.querySelector('.play-circle');
        if (circle) {
          circle.style.animation = 'playPulse 2.5s ease-in-out infinite';
        }
      });
    });
  };

  // Scroll indicator removed — progress bar disabled per request

  // ========== PARALLAX EFFECT FOR SECTIONS ==========
  const setupParallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('.pr-slider-section::before, .awards-highlight');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        if (!el.classList.contains('no-parallax')) {
          const scrollY = window.scrollY;
          const elementOffset = el.offsetTop;
          const distance = (scrollY - elementOffset) * 0.3;
          el.style.transform = `translateY(${distance}px)`;
        }
      });
    }, { passive: true });
  };

  // ========== SMOOTH HOVER EFFECTS ON CARDS ==========
  const setupCardHoverEffects = () => {
    const cards = document.querySelectorAll('.pr-card, .pr-slide');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        // Add subtle scale and lift effect
        this.style.transform = 'translateY(-8px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  };

  // ========== INTERSECTION OBSERVER FOR LAZY ANIMATIONS ==========
  const setupLazyAnimations = () => {
    const lazyObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          lazyObs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      lazyObs.observe(el);
    });
  };

  // ========== ACCESSIBILITY - FOCUS MANAGEMENT ==========
  const setupFocusManagement = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        // Add visual focus indicator for keyboard navigation
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  };

  // ========== PERFORMANCE OPTIMIZATION - DEBOUNCE ==========
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ========== RESPONSIVE OBSERVER ==========
  const setupResponsiveAnimations = () => {
    const handleResize = debounce(() => {
      const isMobile = window.innerWidth < 768;
      document.body.classList.toggle('is-mobile', isMobile);
    }, 250);

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize(); // Call on init
  };

  // ========== PAGE LOAD INITIALIZATION ==========
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  };

  const initAll = () => {
    // Core animations
    revealElements();
    setupCounters();
    setupFilters();
    setupLightbox();
    enhancePlayButtons();
    setupCardHoverEffects();
    
    // Advanced features
    setupParallaxEffect();
    setupLazyAnimations();
    setupFocusManagement();
    setupResponsiveAnimations();
    
    // Trigger card animations after short delay
    setTimeout(() => {
      animateCardsOnScroll();
    }, 100);

    // Log performance
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
      });
    }
  };

  init();

  // ========== EXPORT FOR TESTING ==========
  window.PRAnimations = {
    animateCounter,
    debounce
  };

})();

// ========== ADD REQUIRED ANIMATIONS TO DOCUMENT ==========
if (!document.getElementById('pr-animations-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'pr-animations-styles';
  styleEl.textContent = `
    @keyframes pageLoad {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .pr-card.in-view,
    .pr-slide.in-view {
      animation: cardPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      animation-delay: calc(var(--card-index, 0) * 50ms);
    }

    /* Keyboard navigation indicator */
    body.keyboard-nav *:focus {
      outline: 2px solid var(--tp-theme-1);
      outline-offset: 2px;
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
      .pr-card,
      .pr-slide {
        will-change: auto;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

