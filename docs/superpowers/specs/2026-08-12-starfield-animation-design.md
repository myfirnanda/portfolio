# Starfield Animation Redesign

**Date:** 2026-08-12
**Status:** Approved

## Problem

The shooting star animation reads as unnatural. Five causes were found in the code, not merely in taste:

1. **Trail points the wrong way.** `shoot-up` travels `translate(350px, -500px)` — an angle of ≈55° — while the element is `rotate(-45deg)`. The tail is off by 10° from the actual path. `shoot-down` travels ≈150° but is rotated `135deg`, off by ~15°. (`src/css/style.css:577-603`)
2. **Far too slow.** 3s to cross ~610px is ~200px/s. Real meteors last 0.3–1s. The current motion reads as a floating dot dragging a stick.
3. **Abrupt entry.** The base rule sets `opacity: 0` but keyframe `0%` sets `opacity: 1`, so each star pops in at full brightness, then fades slowly — the inverse of a real meteor.
4. **Identical repetition.** 21 shooting stars have hardcoded classes with fixed `top`/`left` and fixed `animation-delay`, looping `infinite`. The same pattern replays forever, and repetition is what the eye reads as "fake".
5. **Rigid trail.** The trail is a static 80px gradient bar that does not stretch or shrink with velocity.

Beyond the visuals, the current implementation costs ~127 animated DOM elements (115 in `SectionMenu`, 8 in `ProjectsPage`, 3 in `SectionProfile`, 4 in `ContentContact`) and several hundred lines of hardcoded positioning CSS.

## Goals

- Dense, continuous ambient motion that stays visually restrained — busy enough to feel alive, quiet enough not to compete with the content.
- Make the direction-mismatch bug structurally impossible rather than fixing this one instance.
- Cut the DOM and CSS bloat.

## Non-goals

- No external animation library. Bundle stays at its current ~77 kB gzip.
- No change to the overall dark/space theme, layout, or section structure.
- No unit tests for the animation itself (see Verification).
- **`body::before` is left alone.** It is a separate CSS-only global starfield — a single fixed pseudo-element, already cheap, and visible only where sections are transparent. Removing it risks a visual regression for no gain.

### Why per-section canvases rather than one global canvas

A single fixed canvas would be simpler, but the sections use opaque `bg-black` backgrounds that paint over anything fixed behind them — the same reason the stars were duplicated per section in the first place. Lifting one global canvas above those backgrounds would mean a z-index fight with the content. Per-section canvases avoid that entirely, and `IntersectionObserver` makes the off-screen ones free.

## Design

### Component

A single reusable `src/components/Starfield.jsx` renders one absolutely-positioned `<canvas>` filling its parent. It replaces every star `div` across the site and drives two particle systems in the same render loop.

### Props

| Prop | Default | Purpose |
|---|---|---|
| `density` | `1` | Multiplier on static star count |
| `meteorRate` | `1` | Multiplier on meteor spawn frequency |
| `direction` | `'down-left'` | Base travel direction: `'up-right'` or `'down-left'` |
| `maxMeteors` | `4` | Concurrent meteor cap |

Sections keep their current directional character: `SectionProfile` uses `'up-right'`, the rest use `'down-left'`.

### Trail correctness

The trail is drawn from the previous position to the current position, so its direction is **derived from the velocity vector** rather than set independently:

```js
ctx.moveTo(s.x - s.vx * s.trail, s.y - s.vy * s.trail);
ctx.lineTo(s.x, s.y);
```

Because orientation is computed from motion, the two can never disagree. This removes the entire class of bug rather than the current instance of it.

### Static stars

- Count: `area / 12000 * density`, clamped to `[30, 260]`
- Radius 0.4–1.4 px, base opacity 0.2–0.7
- Twinkle: `opacity = base * (0.55 + 0.45 * sin(t * speed + phase))`, with `speed` 0.4–1.2 rad/s and `phase` random per star, so stars never pulse in sync

### Meteors

- Spawn interval: random 400–1400 ms, scaled by `meteorRate`
- Lifetime 500–900 ms; speed set so each crosses 40–70% of the canvas diagonal within its lifetime
- Angle: `-55°` for `'up-right'`, `150°` for `'down-left'`, each with ±12° random jitter
- Trail length proportional to speed, so faster meteors streak longer
- Opacity envelope: fade in over the first 15% of life, hold, fade out over the last 45% — fixing the pop-in
- 1px wide, white with a slight blue tint, soft `shadowBlur` glow on the head only
- Peak opacity 0.45–0.75

### Reconciling "dense" with "subtle"

Density comes from count and spawn rate; restraint comes from size, opacity, and color. Many stars, all small, dim, and desaturated — the field reads as texture, not as a focal element.

### Frame-rate independence

The loop integrates position using delta time from `requestAnimationFrame` timestamps, not per-frame constants. Without this, the animation would run at more than twice speed on a 144 Hz display.

### Lifecycle and performance

- `prefers-reduced-motion: reduce` → draw static stars once and never start the loop
- `IntersectionObserver` → stop the loop while the section is off-screen; the page is long, so most canvases are idle most of the time
- `visibilitychange` → stop while the tab is hidden
- Scale the backing store by `devicePixelRatio` for sharpness on retina displays
- `ResizeObserver` re-seeds the field on resize
- Cleanup cancels the frame and disconnects both observers on unmount — required because React 18 StrictMode double-mounts in development

### Error handling

- If `getContext('2d')` returns `null`, bail out silently; the component renders nothing rather than crashing the page.
- If the parent has zero size before layout, skip drawing until dimensions are non-zero.

## Files affected

| File | Change |
|---|---|
| `src/components/Starfield.jsx` | New, ~130 lines |
| `src/components/SectionMenu.jsx` | 115 divs → 1 component |
| `src/components/SectionProfile.jsx` | 3 divs → 1 component |
| `src/pages/ProjectsPage.jsx` | 8 divs → 1 component |
| `src/components/ContentContact.jsx` | 4 divs → 1 component |
| `src/css/style.css` | Remove the now-dead star rules (see below) |

### CSS to remove

- `.shooting-star`, `.shooting-star::before`, and every `.shooting-star-profile-*` / `.shooting-star-menu-*`
- `.static-star` and every `.static-star-*`
- `@keyframes shoot-up`, `@keyframes shoot-down`
- `.stars-layer-1`, `.stars-layer-2`, `.stars-layer-3` — already dead; defined in CSS but never referenced from any JSX
- The duplicate second definitions of `@keyframes twinkle`, `twinkle-slow`, `twinkle-global`, and `blink` (each is currently declared twice)

### CSS to keep

- `body::before` and one copy of `@keyframes twinkle-global`, which drives it
- `@keyframes blink` and `.blinking-cursor` — these power the typing cursor in `SectionProfile`, not the starfield

## Verification

Canvas animation resists meaningful unit testing, so verification is behavioural:

- `CI=true npm run build` passes with no warnings-as-errors
- No console errors on load
- Visual check on the Vercel preview: meteor tails align with their travel path; no visible repeating pattern; the field does not overpower the text
- With `prefers-reduced-motion: reduce` forced, stars render but do not animate
- Navigating away from a section stops its loop (verified via a temporary frame counter, removed afterwards)

## Success criteria

The animation reads as natural — no misaligned tails, no perceptible loop, meteors fast enough to register as meteors — while the bundle stays at roughly its current size and the star-related DOM and CSS shrink substantially.
