# Design — Firnanda Portfolio

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Produced by `hallmark redesign` (multi-page flow), 2026-09-08.

## Genre

editorial

Portfolios are named explicitly as an editorial brief. The genre's bans are the
point of this redesign: pill buttons with gradient fill, centred heroes,
card-in-card layouts, three-column equal icon tiles, glassmorphism, and pure
black or pure white as paper or ink. All six were present before this pass.

## Macrostructure family

- Marketing pages (`HomePage`): **15 · Split Studio**. Every major block is a
  diptych — label and prose on one side, evidence on the other — and the
  direction alternates down the page. Variation knob: which side leads.
- Content pages (`ProjectsPage`): **18 · Portfolio Grid**. The work is the
  product; the grid is the page. Variation knob: card density.
- App pages: none in this project.

## Theme

Studio — the one editorial theme whose native accent is chromatic green, so the
brief's green is the theme's own colour rather than a tint applied on top.

Values are OKLCH triplets without the `oklch()` wrapper so Tailwind can compose
them with `<alpha-value>`; see `src/css/tokens.css`. The token file lives under
`src/` rather than the project root because Create React App refuses imports
from outside `src/`; there is one copy, not two.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-paper` | `oklch(97.5% 0.008 150)` | `oklch(15.5% 0.014 155)` |
| `--color-paper-2` | `oklch(84% 0.045 150)` | `oklch(35% 0.022 155)` |
| `--color-ink` | `oklch(21% 0.022 150)` | `oklch(94.5% 0.01 150)` |
| `--color-ink-2` | `oklch(44% 0.022 150)` | `oklch(73.5% 0.015 150)` |
| `--color-rule` | `oklch(85.5% 0.018 150)` | `oklch(35.5% 0.024 155)` |
| `--color-accent` | `oklch(42% 0.115 155)` | `oklch(80% 0.155 158)` |
| `--color-accent-ink` | `oklch(99% 0 0)` | `oklch(16% 0.03 155)` |
| `--color-focus` | `oklch(42% 0.115 155)` | `oklch(80% 0.155 158)` |

Every pair is measured, not estimated. Lowest ratio in either mode is 4.74:1
(muted text on paper-2, light); body and display text run 6.5:1 to 16.7:1.
Paper against paper-2 sits at 1.51:1 light and 1.74:1 dark — revised up from
an original 1.23:1 / 1.28:1 after user feedback that cards read as flush with
the page. Accent dropped 46%→42% in light mode only, to hold 4.88:1 against
the now-darker card (dark mode's accent already cleared 6.37:1 unchanged).
Light paper-2's chroma was later raised 0.020→0.045 after feedback that the
card read as a dull flat grey rather than the theme's own green — contrast is
governed by lightness, not chroma, so every ratio above held unchanged.

Accent covers under 5% of any viewport. It marks the current role in the hero,
section numerals, links, and one primary action per page. Nothing else.

## Typography

2+1. Three families is the ceiling and this project uses all three.

- Display: **Cabinet Grotesk** (Fontshare), weights 300 and 800, style normal
- Body: **IBM Plex Sans** (Google), weights 400 and 600
- Outlier: **JetBrains Mono** (Google), weight 500
- Display tracking: `-0.02em` at display sizes, `0` below `--text-xl`
- Type scale: perfect fourth (1.333), anchored at
  `--text-display: clamp(2.75rem, 7vw, 5.5rem)`

The outlier carries exactly one role — machine-set metadata. It appears in two
slots and no others: the wordmark, and section numerals plus date ranges. A
third reach for it would make it a second body font.

Headings are always roman. Italic survives only as body-copy emphasis.

## Spacing

4-point named scale. Values live in `src/css/tokens.css`. Pages reference
`var(--space-md)`, never raw rem values.

## Motion

No motion library is installed and none is being added; this is a motion-cut
project.

- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
- Reveal pattern: one orchestrated entrance on the hero. No scroll reveals.
- Reduced-motion fallback: opacity only, 150ms.
- Animate `transform` and `opacity` only.

## Microinteractions stance

- Silent success. No celebratory toasts.
- Hover tooltips delay 800ms; focus tooltips 0ms.
- `:focus-visible` ring appears instantly and is never animated.

## CTA voice

- Primary: solid `--color-accent` fill, `--color-accent-ink` label,
  `--radius-card` corners, one per page. Verb first, three words maximum.
- Secondary: hairline `--color-rule` border, ink label, same corners, no fill.

Both are rectangles with a small radius. Pills are not part of this system, and
a gradient on either is banned.

## Per-page allowances

- Marketing pages may use Tier-A (pure CSS) or Tier-B (hand-built SVG)
  enrichment. The hero's hexagon canvas is the standing Tier-A enrichment.
- Content pages: typography only.

## What pages MUST share

- The wordmark and its mono register.
- The accent colour and its under-5% budget.
- Display, body, and outlier faces.
- The CTA voice — shape, radius, padding rhythm.
- The section heading rhythm: mono numeral, then display heading, stacked
  vertically in one column. Never numeral-left with heading-right.

## What pages MAY differ on

- Macrostructure, within the family this file allows for the page type.
- Which side of a Split Studio diptych leads.
- Grid density on content pages.
