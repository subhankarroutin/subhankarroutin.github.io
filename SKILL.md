# Site Skill — subhankarrout.in

Personal portfolio of **Subhankar Rout** — Product Designer, Author, Filmmaker.
Stack: static HTML/CSS/JS · Bootstrap 5 · jQuery · WOW.js · Swiper · MeanMenu · Isotope

---

## Pages (9 total)

| File | Purpose | Hero bg |
|------|---------|---------|
| `index.html` | Home | Dark gradient |
| `portfolio.html` | UX case studies | Light white |
| `about.html` | Bio + timeline | Light white |
| `books.html` | Book listing | Dark gradient |
| `the_uncharted_romance.html` | Book page (novel) | Dark |
| `one_year_many_lessons.html` | Book page (non-fiction) | Dark |
| `pr.html` | Press release | Light / dot-grid |
| `s4cinesphere.html` | YouTube / film | Dark cinematic |
| `privacy-policy.html` | Legal | Dark strip |

---

## Design Tokens (CSS variables in `styles.css :root`)

```css
--tp-theme-1:       #5956E9   /* Violet — primary brand */
--tp-theme-2:       #423EF3   /* Violet dark — button hover fill */
--tp-theme-primary: #FFDC60   /* Yellow — accent CTA, underline */
--tp-common-black:  #0D0D12
--text-secondary:   #6B7280
--tp-border-1:      #E8ECF2
--radius-sm:        10px      /* buttons */
--radius-md:        16px      /* cards */
--radius-lg:        24px      /* large cards */
--radius-xl:        32px      /* portrait frame */
--transition:       0.35s cubic-bezier(0.16, 1, 0.3, 1)
--transition-fast:  0.2s ease-out
--ff-body:          'DM Sans', sans-serif
```

---

## Button System — which class to use where

| Context | Class | Notes |
|---------|-------|-------|
| Nav header CTA (Portfolio) | `.tp-btn` | Blue→yellow split-wipe hover. 70px height. Both desktop + mobile offcanvas |
| Primary CTA on **dark** hero | `.hm-btn-yellow` | Yellow fill, black text. Highest-emphasis on dark |
| Secondary on dark hero | `.hm-btn-ghost` | White ghost border. Never use on light bg |
| Primary on **light** section | `.hm-btn-primary` or `.btn-primary-hero` | Violet fill. hm- for index sections, btn-primary-hero for page heroes |
| Secondary on light section | `.hm-btn-outline` or `.btn-ghost-hero` | Outlined/ghost variants |
| Book review form submit | `.hm-btn-yellow` + `.bk-form` override | Hover → blue (#5956E9). Full-width |
| S4 Cinesphere page only | `.dx-btn-primary` / `.dx-btn-ghost` | Red (#FF3366). Never use elsewhere |

---

## CSS Load Order (critical — never reorder)

```html
<!-- SYNC (critical, render-blocking intentionally) -->
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/meanmenu.css">   <!-- MUST be sync: mobile menu -->
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="styles.css">

<!-- DEFERRED (non-critical) -->
<link rel="stylesheet" href="assets/css/animate.css"         media="print" onload="this.media='all'">
<link rel="stylesheet" href="assets/css/swiper-bundle.css"   media="print" onload="this.media='all'">
<!-- ...etc -->
```

## JS Load Order (critical — never reorder)

```html
<!-- SYNC (must be available immediately) -->
<script src="assets/js/jquery.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<!-- DEFERRED in dependency order (main.js uses ALL plugins below it) -->
<script defer src="assets/js/wow.js"></script>
<script defer src="assets/js/counterup.js"></script>
<script defer src="assets/js/waypoints.js"></script>
<script defer src="assets/js/magnific-popup.js"></script>
<script defer src="assets/js/swiper-bundle.js"></script>
<script defer src="assets/js/slick.js"></script>
<script defer src="assets/js/meanmenu.js"></script>
<script defer src="assets/js/isotope-pkgd.js"></script>
<script defer src="assets/js/imagesloaded-pkgd.js"></script>
<script defer src="assets/js/ajax-form.js"></script>
<script defer src="assets/js/main.js"></script>    <!-- depends on all above -->
<script defer src="script.js"></script>
```

**WHY THIS ORDER MATTERS:** `main.js` calls `new WOW()`, `$.fn.meanmenu`, `Swiper`, `counterUp`, `magnificPopup` on load. If any plugin is missing when main.js runs, JS throws and the entire file stops — menu links disappear, animations don't init. `defer` guarantees sequential execution in document order.

**meanmenu.css must be sync** — if deferred, mobile menu panel renders but nav links are invisible (no styles applied yet when panel opens).

---

## Footer — exact wrapper class

Always use this exact structure or the dark background breaks:

```html
<footer class="tp-footer-area">
  <div class="black-bg pt-130 pb-30">   <!-- NOT tp-footer-top pt-90 -->
    <div class="container">
      <div class="row">
        <!-- Col 1: Logo + social (LinkedIn, Instagram, Facebook, Behance) -->
        <!-- Col 2: Useful Links (S4 Cinesphere, Press Release, IMDb) -->
        <!-- Col 3: Publications (TUR, OYML) -->
        <!-- Col 4: Get Update (newsletter → Google Forms) -->
      </div>
    </div>
    <!-- copyright bar inside same .black-bg div -->
    <div class="tp-copyright-area">...</div>
  </div>
</footer>
```

---

## Responsive Breakpoints

| Name | Range | Yellow underline | Mobile menu |
|------|-------|-----------------|-------------|
| Desktop | > 1080px | max-width: 90% | Hidden (desktop nav) |
| Tablet | 768–1080px | max-width: 90% | Offcanvas |
| Mobile | < 768px | max-width: 100% | Offcanvas |

Note: breakpoint for tablet is `max-width: 1080px` (not 1024 — intentional decision).

---

## Key Custom Styles in `styles.css`

- `.tpoffcanvas { transition: 0.25s !important; }` — fast mobile menu (was 1s)
- `.hm-name::after` — yellow underline animation (`hm-lineGrow` keyframe)
- `#preloader-slow-msg` — shown after 3s if page still loading (emotional copy)
- `.cursor-dot` / `.cursor-ring` — custom cursor, hidden on touch devices
- `.hm-reveal.from-left/right` — IntersectionObserver scroll reveals (index.html)

---

## Third-party Services

| Service | Purpose | Notes |
|---------|---------|-------|
| Microsoft Clarity (r08p4eibkc) | Session recording, heatmaps | Script at bottom of `<body>` deferred |
| Chatbase | AI chatbot | Inline script at bottom deferred |
| Google Fonts | DM Sans | Preconnect + display=swap |
| Google Forms | Newsletter subscribe | iframe target pattern |

---

## Book Page Notes (`book.css`)

- `.bk-hero__inner` (not `.book-hero__inner`) — different class name to avoid global `!important` overrides in book.css
- Single cover: `.bk-hero__single-cover` — rotate(-3deg) default, hover straightens + lifts
- Review button hover override: `.bk-form .hm-btn-yellow:hover { background: var(--tp-theme-1) !important; color: #fff !important; }`
- Tagline override: `.bk-hero__inner .book-hero__tagline { margin-left: 0 !important; margin-right: 0 !important; }` — prevents global centering rule from misaligning text in 2-col layout

---

## Design System Reference

Full visual design system storybook: `https://subhankarrout.vercel.app/design-system.html`
Covers: tokens, color, typography, all buttons, components, animations, breakpoints, accessibility, page reference.
