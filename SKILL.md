# Site Skill — subhankarrout.in
**Chitra Design System v2.0 · June 2026**

Personal portfolio of **Subhankar Rout** — Product Designer, Author, Filmmaker.
Stack: static HTML/CSS/JS · Bootstrap 5 · jQuery · WOW.js · Swiper · MeanMenu · Isotope · Font Awesome Pro

---

## 1. Pages (9 total)

| File | Purpose | Hero background |
|------|---------|----------------|
| `index.html` | Home — all sections | Dark gradient (#181530 → #0D0D12) |
| `portfolio.html` | UX case studies + Isotope filter | Light white |
| `about.html` | Bio + timeline | Light white |
| `books.html` | Books listing | Dark gradient |
| `the_uncharted_romance.html` | Book page — novel | Dark book hero |
| `one_year_many_lessons.html` | Book page — non-fiction | Dark book hero |
| `pr.html` | Press release + portrait hero | Light / dot-grid |
| `s4cinesphere.html` | YouTube / film channel | Dark cinematic (red accent) |
| `privacy-policy.html` | Legal | Dark hero strip |

---

## 2. Chitra Design System (Design Storybook)

File: `ChitraDesignSystem/index.html`
External CSS: `ChitraDesignSystem/chitra-design-system.css`
**`noindex, nofollow`** — internal reference only. Not publicly linked.

### Sections in the design system (sidebar nav anchors):
`#introduction` · `#brand` · `#tokens` · `#color` · `#typography` · `#buttons` · `#labels` · `#components` · `#navigation` · `#footer` · `#animation` · `#breakpoints` · `#accessibility` · `#pages` · `#cards` · `#marquees` · `#stats`

### Design System page layout (desktop):
- `body { display: flex }` — row flex. Sidebar left, main content right.
- `.ds-sidebar` — `position: sticky; top: 0; height: 100vh; align-self: flex-start` ← `align-self: flex-start` is CRITICAL. Without it, flex stretch overrides `height:100vh` and sticky breaks.
- `body { overflow-x: clip }` in `chitra-design-system.css` — uses `clip` not `hidden`. `overflow-x: hidden` on body creates a scroll container that breaks `position: sticky` AND blocks vertical scroll on iOS.

### Design System page layout (mobile ≤768px):
- Desktop sidebar (`.ds-sidebar`) is `display: none !important` on mobile.
- A completely separate `#ds-mobile-nav` element handles mobile navigation.
- Topbar (`#ds-topbar`) is `position: fixed; height: 56px; z-index: 1002`.
- Overlay (`#ds-overlay`) is `position: fixed; z-index: 1000` — dims content when nav opens.
- Mobile nav (`#ds-mobile-nav`) is `position: fixed; top: 56px; z-index: 1001; transform: translateX(-110%)` — slides in from left.
- JS scroll lock on open: `position: fixed + top: -scrollY` trick (iOS-compatible).
- `.ds-main { position: relative; z-index: 0 }` on mobile — contains all child stacking contexts below the overlay.
- Body mobile: `overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch` ← all 3 required for iOS scroll to work.

---

## 3. Design Tokens (CSS variables in `styles.css :root` and DS inline `<style>`)

### Brand Colors
```css
--tp-theme-1:       #5956E9   /* Violet — primary brand. Also aliased as --accent-violet */
--tp-theme-2:       #423EF3   /* Violet dark — button hover fill (hm-btn-primary scaleX) */
--tp-theme-primary: #FFDC60   /* Yellow — accent CTA, underline, tp-btn hover fill. Also --accent-yellow */
--tp-common-white:  #ffffff
--tp-common-black:  #0D0D12   /* Also --text-primary, --surface-dark */
--tp-grey-1:        #F7F8FD   /* DS page background */
```

### Text Colors
```css
--text-primary:     #0D0D12   /* Main text, headings */
--text-secondary:   #6B7280   /* Body text. Also --tp-text-body */
--text-tertiary:    #9CA3AF   /* Timestamps, meta, labels */
```

### Surfaces & Borders
```css
--tp-border-1:      #E8ECF2   /* Dividers, card borders. Also --ds-border */
--surface-1:        #FAFAFA   /* Light section bg */
--surface-2:        #F4F4F6   /* Table header, subtle bg */
--surface-dark:     #0D0D12   /* Dark hero, footer, marquee bg */
```

### Hardcoded (not tokenized)
```
#ffe980   — Yellow Light — hm-btn-yellow hover
#FF3366   — Cinematic Red — s4cinesphere.html only
#22c55e   — Green — status/online dots only
```

### Border Radius
```css
--radius-sm:  10px   /* Buttons, chips */
--radius-md:  16px   /* Cards */
--radius-lg:  24px   /* Large cards */
--radius-xl:  32px   /* Portrait frame */
100px         /* Pills, kickers, tags (hardcoded) */
```

### Shadows
```css
--shadow-card:  0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.06)  /* resting state */
--shadow-hover: 0 4px 24px rgba(89,86,233,.14), 0 1px 4px rgba(0,0,0,.08) /* hover/active */
```

### Transitions
```css
--transition:      0.35s cubic-bezier(0.16, 1, 0.3, 1)           /* Default — smooth spring. Cards, hover states */
--transition-fast: 0.2s ease-out                                  /* Links, icon hovers */
--transition-btn:  0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86)  /* tp-btn split-wipe animation */
Mobile menu:       0.25s — .tpoffcanvas slide-in (intentionally fast to avoid UX lag)
```

### Spacing Scale (added in v2.0)
```css
--space-1:  4px    /* Micro — icon gaps, badge padding, inline offsets */
--space-2:  8px    /* Tight — nav item gaps, small button padding, tag rows */
--space-3:  16px   /* Base unit — standard padding, form fields, list items */
--space-4:  24px   /* Comfortable — card padding, sidebar nav groups */
--space-5:  32px   /* Component — between components within a section */
--space-6:  48px   /* Section — top/bottom padding on page sections */
--space-7:  80px   /* Large — gap between major page sections */
--space-8:  120px  /* Hero / Page — hero sections, footer top padding */
```

### Typography
```css
--ff-body: 'DM Sans', sans-serif    /* Single typeface. Weights 300–700, optical size 9–40 */
--ff-mono: 'DM Mono', monospace     /* Code chips, spec labels */
```

---

## 4. Typography Scale

Only **DM Sans** (Google Fonts). No second typeface. All sizes use `clamp()` for fluid scaling.

| Role | Size | Weight | Line-height | Letter-spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Headline | `clamp(36px, 4vw, 72px)` | 700 | 1.06 | -0.025em | — |
| Section Title | `clamp(32px, 3.5vw, 52px)` | 700 | 1.1 | -0.02em | — |
| Body / Sub-heading | 17px | 400 | 1.75 | 0 | max-width 480–540px |
| Kicker / Eyebrow | 12px | 500–600 | — | 0.08–0.12em | uppercase |
| Card Body | 14–15px | 400–500 | 1.6–1.7 | 0 | — |
| Meta / Label | 11–12px | 500–600 | — | 0.04em | color: text-tertiary |

**Italic rule:** `<em>` inside headlines always gets `color: var(--accent-violet)`. Exception on dark sections: `color: var(--accent-yellow)`. Never italic for body copy — headlines only.

---

## 5. Button System (10 variants — never swap freely)

### `.tp-btn` — Nav CTA Button
- Blue fill (#5956E9), **height 56px** (renders taller ~70px due to line-height), `border-radius: 10px`
- Hover: dual split-wipe animation — yellow (#FFDC60) fills from top-left AND bottom-right simultaneously via `::before` (top) and `::after` (bottom). Text turns black on hover.
- **Used:** Desktop header nav (Portfolio CTA) · Mobile offcanvas nav
- Source: `assets/css/style.css`

### `.hm-btn-yellow` — Yellow Primary CTA
- Yellow fill (#FFDC60), black text, weight 700
- Hover: lighter yellow (#ffe980) + lifts 2px (`translateY(-2px)`)
- Highest-emphasis CTA. **Reserved for the most important action on dark-bg sections.**
- **Used:** `index.html` hero "My Portfolio" · Book spotlight "Get Your Copy" · `books.html` hero
- Source: `styles.css`

### `.hm-btn-primary` — Violet Primary
- Violet fill (#5956E9). Hover: darker violet (#423EF3) slides in from left via `scaleX(0→1)`
- For light-background sections when primary action is navigating deeper.
- **Used:** `index.html` About section "Full Story"
- Source: `styles.css`

### `.hm-btn-ghost` — Dark Ghost
- Transparent with white-tinted border (`rgba(255,255,255,.22)`). White-ish text.
- **Only on dark backgrounds.** Secondary action paired alongside `.hm-btn-yellow`.
- **Used:** `index.html` hero "My Books" (dark hero)
- Source: `styles.css`

### `.hm-btn-outline` — Violet Outline
- Violet border + violet text. Hover: fills solid violet, text turns white.
- Light-bg secondary action. Lower visual weight than `.hm-btn-primary`.
- **Used:** `index.html` About section "Press Release" (secondary to "Full Story")
- Source: `styles.css`

### `.btn-primary-hero` + `.btn-ghost-hero` — Page Hero Pair
- Primary: Black fill → violet slide-fill on hover (`scaleX` from left)
- Ghost: Light border → violet border + violet text on hover
- **Exclusive to white/light hero sections.** Always used as a pair.
- **Used:** `portfolio.html` hero · `pr.html` hero · `about.html` hero
- Source: `styles.css`

### `.hm-btn-yellow` + `.bk-form` override — Book Review Submit
- Base: `.hm-btn-yellow`. Override in books page: hover goes violet (#5956E9) + white text — reverse of normal yellow button. Full-width inside form.
- **Used:** `the_uncharted_romance.html` · `one_year_many_lessons.html` — review form submit only
- Override: `styles.css` (`.bk-form .hm-btn-yellow:hover { background: var(--tp-theme-1) !important; color: #fff !important; }`)

### `.dx-btn-primary` + `.dx-btn-ghost` — Cinematic Red Pair
- Primary: Red fill (#FF3366). Hover: darker red (#e0194e) + strong lift + red glow
- Ghost: White-border transparent. Hover: slight white bg, more opaque border
- **Exclusive to `s4cinesphere.html`. Red = cinematic brand signal. Never use on other pages.**
- Source: `styles.css`

### Button Decision Guide

| Situation | Use | Reason |
|-----------|-----|--------|
| Primary CTA on dark hero | `.hm-btn-yellow` | Yellow pops on dark |
| Secondary on dark hero | `.hm-btn-ghost` | Low-key, doesn't compete |
| Primary action on light section | `.hm-btn-primary` or `.btn-primary-hero` | Violet readable on white |
| Secondary on light section | `.hm-btn-outline` or `.btn-ghost-hero` | Outlined = less weight |
| Desktop/mobile nav CTA | `.tp-btn` | Tall height designed for nav bar |
| Book review form submit | `.hm-btn-yellow` + bk-form override | Yellow draws eye, blue confirms |
| Any CTA on S4 Cinesphere | `.dx-btn-primary / .dx-btn-ghost` | Red is cinema brand signal |

---

## 6. Labels & Kickers

### Kicker Pill — Violet
- Class: `.pr-hero__kicker` / `.hm-hero__kicker`
- 12px uppercase, violet bg + border, pulsing animated dot (`kickerPulse` 2s infinite)
- Hero kicker on light pages

### Kicker Pill — Yellow
- Class: `.pr-hero__kicker--yellow`
- Same shape, amber text (#7a6200), yellow tint bg
- Used for achievement / book context badges (e.g. "Amazon Bestseller")

### Section Label
- Class: `.pr-section-label`
- 12px uppercase violet text with 20px violet rule on the left (`::before`)
- Above every section title on `pr.html` and `portfolio.html`

### HM Eyebrow Label
- Class: `.hm-label`
- Violet text, yellow left-rule (not violet — distinct from section label)
- Unique to `index.html` section openers. Slightly warmer feel.

---

## 7. UI Components

### Floating Tag Pills (`.pr-hero__tag`)
- White card, pill shape (100px border-radius), colored dot, `--shadow-card`
- Float on portrait image in `pr.html` hero
- 3 variants: violet dot, green dot (#22c55e), Figma icon
- Each animates independently: `floatA` / `floatB` / `floatC` (5–7s ease-in-out infinite)

### Filter Tabs (`.pr-filter-tab`)
- Pill-shaped Isotope filter buttons on `portfolio.html`
- Default: outlined, `text-secondary`. Active/hover: solid violet fill, white text.

### Quick-Links Bar (`.pr-hero__links`)
- 4-column grid below `pr.html` hero
- White bg, shared border, each link has brand icon color (LinkedIn blue, Behance blue, Instagram pink, YouTube red)
- Hover: violet text + faint violet bg tint
- Mobile: collapses to 2×2 grid

### Skill Chips (`.hm-skill-chip`)
- Pill border, icon + label
- Used in the skills marquee strip (currently commented out)
- Two rows — row 1 scrolls left, row 2 scrolls right

### Book Cover Single Tilt (`.bk-hero__single-cover`)
- 320px wide, `border-radius: 12px`, default `rotate(-3deg)`
- Hover: straightens + lifts 8px (`translateY(-8px)`)
- Only on `books.html` hero

### Newsletter Input (`.tp-footer-widget__input`)
- Dark bg, white-tinted border, plane icon submit button
- Posts to Google Forms. `iframe onload` pattern for confirmation.
- Used in footer "Get Update" column on all pages.

---

## 8. Navigation & Header

Identical structure on all 9 pages.

### Desktop Header States

**State 1 — Transparent (on page load):**
- Class: `.tp-header-area-two.header-transparent`
- Background: transparent. Logo: `logo-white.png`. Nav items: white text.
- `d-none d-lg-block` — hidden on mobile.

**State 2 — White (after scrolling ≥ 100px):**
- JS adds class: `#header-sticky.header-white`
- Background: white. Box-shadow added. Nav items turn dark. Logo swaps to `logo-blue.png`.
- Trigger: `scrollY >= 100` in `script.js`.

### Publications Dropdown
- Class: `.has-dropdown` on the `<li>`
- On `:hover`: nested `.submenu` becomes visible (opacity + translateY)
- Submenu background: `#0D0D12`. Text hover color: `#FFDC60` (yellow).
- Built by `.tp-main-menu` in `assets/css/style.css`.
- Mobile: MeanMenu.js collapses all dropdowns into accordion expand/collapse.

### Mobile Header + Offcanvas
- Shown on mobile: `.tp-md-header-area` · `d-lg-none`
- Logo: `logo-white.png`. Hamburger: `.tp-menu-bar`
- Offcanvas panel: `.tpoffcanvas` — slides in from right in 0.25s (overridden from 1s in `styles.css`)
- Close button: `fa-times-hexagon`
- Built by: `.tp-offcanvas-area .tpoffcanvas` in `assets/css/style.css`
- MeanMenu.js builds the `<nav>` accordion. Requires `meanmenu.css` loaded SYNC.

### CSS Class Source Reference
| Class | File |
|-------|------|
| `.tp-header-area-two` | `assets/css/style.css` |
| `.header-transparent` | `assets/css/style.css` |
| `#header-sticky.header-white` | `assets/css/style.css` (JS adds class) |
| `.tp-logo` | `assets/css/style.css` |
| `.tp-main-menu` | `assets/css/style.css` |
| `.has-dropdown .submenu` | `assets/css/style.css` |
| `.tp-btn` (Portfolio CTA) | `assets/css/style.css` |
| `.tp-md-header-area` | `assets/css/style.css` |
| `.tp-menu-bar` | `assets/css/style.css` |
| `.tp-offcanvas-area .tpoffcanvas` | `assets/css/style.css` |
| `.tpoffcanvas { transition: 0.25s }` | `styles.css` (override) |
| `.mean-nav, .mean-container` | `assets/css/meanmenu.css` |

---

## 9. Footer

Identical across all 9 pages. 4-column layout on dark background.

**Critical wrapper class (use exactly this or dark bg breaks):**
```html
<footer class="tp-footer-area">
  <div class="black-bg pt-130 pb-30">   <!-- NOT tp-footer-top pt-90 — this breaks dark bg + spacing -->
    <div class="container">
      <div class="row">
        <!-- Col 1: Logo (logo-white.png) + social: LinkedIn, Instagram, Facebook, Behance -->
        <!-- Col 2: Useful Links — S4 Cinesphere, Press Release, IMDb -->
        <!-- Col 3: Publications — The Uncharted Romance, One Year Many Lessons -->
        <!-- Col 4: Get Update — email input → Google Forms -->
      </div>
    </div>
    <div class="tp-copyright-area">...</div>
  </div>
</footer>
```

**Copyright bar — `.tp-copyright-area`:**
- Copyright text (`.tp-copyright-left p`) and both links (`.tp-copyright-right a`) use `color: #9ca3af !important` — muted gray, not white. Override in `styles.css`.
- Chitra DS link uses **two separate `<a>` tags** (NOT two spans inside one `<a>`):
  - `class="d-none d-md-inline"` → "Chitra Design System" on desktop
  - `class="d-md-none"` → "Chitra DS" on mobile
  - Keeps each link's hover/tap area exactly its own text width. Putting both texts inside one `<a>` made the hit area wider than visible text.
- Mobile layout (`@media max-width:767px`): `.tp-copyright-right { display:flex; width:fit-content; margin:8px auto 0 }` — container hugs links and centers itself. Theme's `margin-left:60px` on `a` zeroed with `!important`.
- Touch hover fix: `@media (hover:none) { .tp-copyright-right a:hover { color:inherit !important } }` — prevents `:hover` sticking after tap on mobile.

**Known bug:** `privacy-policy.html` once used `.tp-footer-top.pt-90` wrapper — broke dark bg and column spacing. Fixed by switching to `.black-bg.pt-130.pb-30`.

---

## 10. Animations

### Named Keyframes

| Name | Effect | Timing | Used where |
|------|--------|--------|-----------|
| `heroFadeUp` | opacity 0→1 + translateY(30px→0) | 0.8s ease | All hero sections. 5 stagger variants `.hero-anim-1` to `.hero-anim-5` (0.1s to 0.78s delay) |
| `heroFadeRight` | opacity 0→1 + translateX(40px→0) | 0.9s | Right image column in hero (`.hero-anim-right`) |
| `hm-lineGrow` | width 0→100% | 1.2s, 0.5s delay | Yellow name underline (`.hm-name::after`). Height 3px, yellow (#FFDC60), border-radius 2px. In `styles.css` |
| `blobFloat` / `hm-blobDrift` | translate + scale drift | 12–20s infinite | 3 ambient bg gradient blobs in hero |
| `marqueeScroll` | translateX(0→-50%) | 24s linear infinite | Logo marquee, skills ticker. Pauses on hover |
| `kickerPulse` | opacity + scale(0.8) | 2s ease-in-out infinite | Dot inside kicker pills |
| `floatA/B/C` | Y offset + timing offset | 5–7s ease-in-out infinite | Tag pills on `pr.html` portrait |
| `ph-shimmer` | white light gradient sweep | 3.5s, 1.8s delay, infinite | Glossy shimmer on kicker pills |

### Scroll-Down Reveal — 3 Systems

**System 1 — WOW.js (all 9 pages)**
- WOW.js watches viewport. When `.wow` element enters, adds `.animated` → CSS animation fires.
- `data-wow-delay` staggers multiple elements (common: 0.2s between cards).
- Common classes: `fadeInUp`, `fadeInLeft`, `fadeInRight`, `zoomIn`
- Source: `assets/css/animate.css` + `assets/js/wow.js`
```html
<div class="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">...</div>
```

**System 2 — Custom IntersectionObserver `.hm-reveal` (index.html only)**
- Elements slide in from left or right when they enter the viewport.
- `script.js` adds `.is-visible` via IntersectionObserver.
- `.hm-reveal.from-left`: `translateX(-60px)→0 · opacity 0→1 · 0.7s ease`
- `.hm-reveal.from-right`: `translateX(60px)→0 · opacity 0→1 · 0.7s ease · delay 0.2s`
- Source: `styles.css §16` + `script.js`
```html
<div class="hm-reveal from-left">text</div>
<div class="hm-reveal from-right">image</div>
<!-- script.js adds .is-visible when scrolled into view -->
```

**System 3 — `[data-pr-reveal]` (pr.html only)**
- Simpler IntersectionObserver. Adds `.pr-visible` to `[data-pr-reveal]` elements.
- Effect: `opacity:0; transform:translateY(28px)` → `opacity:1; transform:none · 0.55s`
- Source: `styles.css §23` + `script.js`
```html
<div data-pr-reveal>...</div>
```

### Scroll System Summary
| System | Pages | Animation |
|--------|-------|-----------|
| `.wow.fadeInUp` | All 9 | Fade up from Y+30px |
| `.hm-reveal.from-left/right` | `index.html` only | Slide in from side |
| `[data-pr-reveal]` | `pr.html` only | Fade up from Y+28px |

### Slow-Load Message
- `#preloader-slow-msg` fades in after `setTimeout(3000ms)` if page still loading.
- Contains emotional copy. Cleared on `window.load`.
- `opacity 0.6s` transition. Source: `styles.css`.

---

## 11. Breakpoints

| Name | Range | Yellow underline max-width | Mobile menu |
|------|-------|--------------------------|-------------|
| Desktop | > 1080px | 90% | Hidden (desktop nav shown) |
| Tablet | 768–1080px | 90% | Offcanvas (meanmenu) |
| Mobile | < 768px | 100% | Offcanvas (meanmenu) |
| Reduced Motion | `prefers-reduced-motion` | — | All keyframes disabled, transitions 0.01ms |

**Note:** Tablet breakpoint is `max-width: 1080px`, NOT 1024px. Intentional design decision.

Bootstrap 5 via `bootstrap.bundle.min.js`. Key grid patterns:
- `col-xl-3 col-lg-4 col-md-6` — footer columns
- `container-fluid` — header
- `container` — content sections
- CSS Grid (not Bootstrap) used for hero sections in `styles.css`

---

## 12. Accessibility

Lighthouse accessibility: **82–92%**

| Feature | Implementation |
|---------|---------------|
| Skip link | `<a class="skip-link" href="#hm-main">` — visually hidden until Tab key. Violet bg when focused. On all pages. |
| Focus styles | `a, button, input, [tabindex]` get `outline: 2px solid var(--accent-violet); outline-offset: 3px` on `:focus-visible`. Global in `styles.css §03`. |
| ARIA labels | All navs have `aria-label`. Images have descriptive `alt`. Decorative: `aria-hidden="true"`. Offcanvas: `role="dialog" aria-modal="true"`. Hamburger: `aria-expanded` toggled by JS. |
| Hero LCP image | `loading="eager" fetchpriority="high"` + `<link rel="preload">` |
| Below-fold images | `loading="lazy"` |
| Logo images | `width` + `height` attributes to prevent CLS |

---

## 13. Page Reference

| Page | File | Hero | Primary CTA | Secondary CTA |
|------|------|------|-------------|---------------|
| Home | `index.html` | Dark gradient | `.hm-btn-yellow` | `.hm-btn-ghost` |
| Portfolio | `portfolio.html` | Light white | `.btn-primary-hero` | `.btn-ghost-hero` |
| About | `about.html` | Light white | `.ab-btn-primary` | `.ab-btn-ghost` |
| Books | `books.html` | Dark gradient | `.hm-btn-yellow` | — |
| The Uncharted Romance | `the_uncharted_romance.html` | Dark book hero | `.tp-btn` (Buy) | `.hm-btn-yellow` (review) |
| One Year, Many Lessons | `one_year_many_lessons.html` | Dark book hero | `.tp-btn` (Buy) | `.hm-btn-yellow` (review) |
| Press Release | `pr.html` | Light/grid bg | `.btn-primary-hero` | `.btn-ghost-hero` |
| S4 Cinesphere | `s4cinesphere.html` | Dark cinematic | `.dx-btn-primary` (red) | `.dx-btn-ghost` |
| Privacy Policy | `privacy-policy.html` | Dark strip | — | — |

### Shared on ALL 9 pages:
- **Header:** `.tp-header-area-two` + mobile `.tp-md-header-area` + `.tpoffcanvas` offcanvas
- **Footer:** `.black-bg.pt-130.pb-30` · 4 columns · Google Forms newsletter
- **Analytics:** Microsoft Clarity (ID: `r08p4eibkc`) · Chatbase AI chatbot
- **Fonts:** DM Sans via Google Fonts · Font Awesome Pro icons
- **Custom cursor:** `.cursor-dot` (8px violet) + `.cursor-ring` (36px → 56px on hover). Hidden on touch devices.
- **Preloader:** `#pr-preloader` · Dismissed on `window.load` · Slow-load message after 3s.

---

## 14. Cards (all types)

### Project / Portfolio Card — `portfolio.html`
```
.pr-card           — wrapper (white bg, 18px radius, hover: lift + shadow glow)
.pr-card__fig      — image container (aspect-ratio 4/3)
.pr-card__img      — cover image (scale on hover)
.pr-card__overlay  — dark overlay with action icons (opacity 0→1 on hover)
.pr-card__act      — glassmorphism action button (36×36, blur backdrop)
.pr-card__badge    — top-left pill badge
.pr-badge--pr / .pr-badge--awd / .pr-badge--video  — badge color variants
.pr-card__body     — text content padding
.pr-card__title    — 15px/700, hover → violet
.pr-card__meta     — 12px, icon+text, tertiary color
.pr-filter / .pr-filter.active — pill filter tabs, active = violet fill
```
Source: `styles.css §10`

### AI Tool Card — `index.html`
```
.pr-ai-card   — dark glass card (dark bg, rgba border, hover: lifts + border glows violet)
Icon wrapper  — 44×44px, 12px radius, rgba(89,86,233,.15) bg
              — 6 icon variants: wand, brain, robot, microchip, code, film
.pr-ai-tag    — tiny pill badge, violet tint (tool category label)
Grid          — 3-col desktop, 1-col mobile
```
Source: `styles.css §09`

### Story / Chronicle Card — `index.html` Swiper carousel (Creative Chronicles)
```
.pr-story-card     — dark glass card (rgba bg + rgba border). Hover: border turns violet.
Category pill      — violet / yellow / teal tint depending on content type
.pr-chronicles-dots — custom Swiper pagination (elongated active dot)
Swiper config      — slidesPerView: 1.15 (mobile) → 2 (576px) → 3 (992px) → 4 (1200px)
Active slide       — border glows violet
No <a> wrapper    — images have no external link; tag/title in body only
```
**6 slides (portfolio.html):**
1. Short Film (placeholder / existing)
2. Novel / The Uncharted Romance
3. Non-Fiction / One Year, Many Lessons
4. Figma MCP Training at Capgemini — `assets/img/pr/details/delivering_Figma mcp_training_capgemni.jpg` · tag: Training
5. SAP Impulse India '25 — `assets/img/pr/details/sap_impluse_2025.jpg` · tag: Event · title: "Event Coordinator & Volunteer — SAP Impulse India '25"
6. (Any additional future slide)

Source: `styles.css §14` · Swiper breakpoints in `script.js`

### About Page — Highlight Card
```
.ab-highlight-card — white bg, 16px radius, hover: lift + violet shadow
.ab-meta-item      — icon + stat/label pair
```
Source: `styles.css §20`

### Book Spotlight Card — `index.html`
```
.hm-book-card — dark glass, hover: border turns violet
Cover image   — slight tilt, hover straightens
Tag pill      — category label (Novel, Non-fiction, etc.)
```

### Press Release — Media/Award Cards
```
.pr-media-card — white bg, media logo, quote text, source label
.pr-award-card — dark bg, award icon, title, year
```

### Timeline Entry (about.html)
```
.ab-timeline__item  — connected with vertical line + dot
.ab-timeline__year  — violet year badge
.ab-timeline__title — bold milestone title
```

---

## 15. Marquees & Tickers

3 auto-scrolling strips across the site. All pause on hover.

### Logo Marquee (index.html, pr.html)
```
.hm-logo-marquee  — single row, scrolls left
.hm-marquee-inner — translateX animation (marqueeScroll, 24s linear infinite)
Brand logos        — grayscale, opacity 0.5. Hover: opacity 1.
```

### Skills Ticker (index.html — currently commented out)
```
.hm-ticker-row-1  — scrolls left
.hm-ticker-row-2  — scrolls right (reverse direction)
.hm-skill-chip    — pill: icon + label, border, white bg
```

### S4 Cinesphere Film Ticker (s4cinesphere.html)
- Film titles scrolling continuously
- Red accent for cinema branding

---

## 16. Stats & Data

### Counter Stats
```
.hm-stat-item    — icon + number + label. Number animated by CounterUp.js on scroll.
.hm-stat-number  — weight 700, large size
.hm-stat-label   — text-secondary
```
CounterUp.js requires Waypoints.js. Both must be loaded before `main.js`.

### Data Tables
```
.ds-table          — full-width, collapsed borders, 13px
.ds-table th       — surface-2 bg, uppercase label, 11px
.ds-table td       — 12px padding, bottom border
.ds-table__wrap    — border + radius + overflow:hidden wrapper
```

---

## 17. CSS Load Order (critical — never reorder)

```html
<!-- SYNC (render-blocking — intentional) -->
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/meanmenu.css">   <!-- MUST be sync — mobile menu links invisible if deferred -->
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="styles.css">

<!-- DEFERRED (non-critical) -->
<link rel="stylesheet" href="assets/css/animate.css"        media="print" onload="this.media='all'">
<link rel="stylesheet" href="assets/css/swiper-bundle.css"  media="print" onload="this.media='all'">
<link rel="stylesheet" href="assets/css/magnific-popup.css" media="print" onload="this.media='all'">
<!-- etc. -->
<noscript><link rel="stylesheet" href="assets/css/animate.css"></noscript>
```

---

## 18. JS Load Order (critical — never reorder)

```html
<!-- SYNC (must be available immediately) -->
<script src="assets/js/jquery.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>

<!-- DEFERRED in dependency order — main.js uses ALL plugins below it -->
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
<script defer src="assets/js/main.js"></script>   <!-- depends on ALL above -->
<script defer src="script.js"></script>            <!-- site-specific logic -->
```

**WHY THIS ORDER MATTERS:** `main.js` calls `new WOW()`, `$.fn.meanmenu`, `Swiper`, `counterUp`, `magnificPopup` on load. If any plugin is missing when main.js runs, JS throws and the entire file stops — menu links disappear, animations don't init. `defer` guarantees sequential execution in document order.

**`meanmenu.css` must be sync** — if deferred, mobile menu panel renders but nav links are invisible (no styles applied yet when panel opens).

---

## 19. Key Styles in `styles.css` (custom overrides)

| Selector | Effect |
|----------|--------|
| `.tpoffcanvas { transition: 0.25s !important }` | Fast mobile menu (overrides plugin's 1s) |
| `.hm-name::after` | Yellow underline animation (`hm-lineGrow` keyframe) |
| `#preloader-slow-msg` | Shown after 3s if page still loading |
| `.cursor-dot / .cursor-ring` | Custom cursor. Hidden on touch devices. |
| `.hm-reveal.from-left/right` | IntersectionObserver scroll reveals (index.html) |
| `a, button { :focus-visible outline }` | Violet focus ring (§03) |
| `@media (prefers-reduced-motion)` | All animations/transitions disabled (§20) |

---

## 20. Book Page Gotchas (`book.css`)

- Class: `.bk-hero__inner` (NOT `.book-hero__inner`) — different name avoids global `!important` overrides in `book.css`
- Single cover: `.bk-hero__single-cover` — `rotate(-3deg)` default, hover straightens + lifts
- Review button hover override: `.bk-form .hm-btn-yellow:hover { background: var(--tp-theme-1) !important; color: #fff !important; }` — turns blue instead of lighter yellow
- Tagline override: `.bk-hero__inner .book-hero__tagline { margin-left: 0 !important; margin-right: 0 !important; }` — prevents global centering rule from misaligning text in 2-col layout

---

## 21. Third-Party Services

| Service | Purpose | Load location |
|---------|---------|---------------|
| Microsoft Clarity `r08p4eibkc` | Session recording, heatmaps | Bottom of `<body>`, deferred |
| Chatbase | AI chatbot widget | Bottom of `<body>`, deferred |
| Google Fonts (DM Sans, DM Mono) | Typography | `<head>` preconnect + display=swap |
| Google Forms | Newsletter subscribe | `iframe` target pattern |
| Font Awesome Pro | Icons | `assets/css/font-awesome-pro.css` sync |

---

## 22. Known Bugs Fixed (do not reintroduce)

1. **Footer dark bg broken on `privacy-policy.html`** — caused by using `.tp-footer-top.pt-90` wrapper instead of `.black-bg.pt-130.pb-30`. Fixed.

2. **Chitra DS desktop sidebar not sticky** — two causes: (a) `body { overflow-x: hidden }` creates scroll container that breaks `position: sticky` → fixed with `overflow-x: clip`; (b) `align-items: stretch` on flex body overrides `height: 100vh` on sidebar → fixed with `align-self: flex-start` on `.ds-sidebar`.

3. **Chitra DS mobile page not scrollable** — `overflow-x: hidden` on body blocks vertical scroll on iOS Safari. Fixed with `overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch` in mobile media query.

4. **Chitra DS mobile content overlapping header/overlay** — page content elements with `position: relative + z-index` floated above the sidebar overlay. Fixed with `position: relative; z-index: 0` on `.ds-main` in mobile, which creates a contained stacking context below overlay (z-index 1000) and mobile nav (z-index 1001).

5. **Chitra DS mobile topbar blacked out when sidebar opens** — topbar z-index was same as overlay (1000). Fixed: topbar z-index raised to 1002.

6. **Chitra DS mobile sidebar fighting desktop CSS** — solved by creating a completely separate `#ds-mobile-nav` element with independent `ds-mn-*` CSS classes. Desktop `.ds-sidebar` is `display: none !important` on mobile. No more `!important` cascade conflicts.
