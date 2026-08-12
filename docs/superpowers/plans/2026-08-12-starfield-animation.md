# Starfield Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ~127 hand-positioned star `div`s and their hardcoded CSS with one canvas-based `<Starfield />` component whose meteor tails are derived from velocity, so they can never point the wrong way.

**Architecture:** Pure geometry and physics live in `src/utils/starfield.js` with no DOM or React imports, which makes them unit-testable in this project (see Global Constraints — most other modules are not). `src/components/Starfield.jsx` owns the canvas element, the `requestAnimationFrame` loop, and the observers; it consumes the pure module and does nothing clever itself.

**Tech Stack:** React 18, Create React App 5 (react-scripts), Canvas 2D API, Jest 27 + @testing-library. No new dependencies.

## Global Constraints

- **No new npm dependencies.** Bundle must stay near its current 77 kB gzip.
- **Test runner is broken by default in this repo.** Jest builds an absolute `testMatch` containing the project path, and the `.pemrograman` path segment yields `Documents\.pemrograman/...` — a backslash inside a glob, which matches nothing. Every test run MUST pass a relative override: `--testMatch="**/*.test.js"`.
- **Nothing that imports `react-router-dom` can be unit tested.** `react-router-dom@7.13.0` declares `main: ./dist/main.js`, a file that does not exist in the package; it ships only `dist/index.js` / `dist/index.mjs` behind an `exports` map. Webpack 5 reads `exports` (so `npm run build` works), Jest 27 does not. Therefore only import-free pure modules get tests.
- **`CI=true` turns ESLint warnings into build errors** (this is how Vercel builds). Verify with `CI=true` locally before deploying.
- **Do not touch `body::before`** in `src/css/style.css` — it is a separate global CSS starfield, explicitly out of scope.
- **Do not remove `@keyframes blink` or `.blinking-cursor`** — they drive the typing cursor in `SectionProfile`, not the starfield.
- Angles: `up-right` = `-55°`, `down-left` = `150°`, jitter `±12°`. These preserve the existing per-section directional character.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/utils/starfield.js` | **Create.** Pure math: angles, meteor creation and motion, opacity envelopes, star seeding, twinkle. No imports. |
| `src/utils/starfield.test.js` | **Create.** Unit tests for the above. |
| `src/components/Starfield.jsx` | **Create.** Canvas element, rAF loop, Resize/Intersection observers, reduced-motion handling. |
| `src/components/SectionMenu.jsx` | **Modify.** 115 star divs → one `<Starfield />`. |
| `src/components/SectionProfile.jsx` | **Modify.** 3 star divs → one `<Starfield />`. |
| `src/pages/ProjectsPage.jsx` | **Modify.** 8 star divs → one `<Starfield />`. |
| `src/components/ContentContact.jsx` | **Modify.** 4 star divs → one `<Starfield />`. |
| `src/css/style.css` | **Modify.** Delete dead star rules. |
| `src/App.test.js` | **Delete.** Asserts on "learn react" text that no longer exists, and cannot run anyway (see Global Constraints). |
| `package.json` | **Modify.** Add a `test:unit` script carrying the required `--testMatch` override. |

---

### Task 1: Make the test harness runnable

Without this, every later task's "run the test" step silently reports "No tests found" and exits 1, which reads like a broken test but is a broken glob.

**Files:**
- Delete: `src/App.test.js`
- Modify: `package.json` (scripts block)

**Interfaces:**
- Consumes: nothing
- Produces: `npm run test:unit` — the command every later task uses to run tests

- [ ] **Step 1: Confirm the current failure mode**

Run: `npx react-scripts test --watchAll=false`

Expected: `No tests found, exiting with code 1`, and the printed `testMatch` contains `Documents\.pemrograman/`. This confirms the glob problem rather than a missing test.

- [ ] **Step 2: Delete the dead default test**

```bash
git rm src/App.test.js
```

It asserts `screen.getByText(/learn react/i)`, but `src/App.js` was rewritten and renders no such text. It also imports `App`, which imports `react-router-dom`, which Jest cannot resolve in this project.

- [ ] **Step 3: Add the `test:unit` script**

In `package.json`, inside `"scripts"`, add this entry after `"test"`:

```json
    "test:unit": "react-scripts test --watchAll=false --testMatch=\"**/*.test.js\"",
```

- [ ] **Step 4: Verify the harness reports zero tests cleanly**

Run: `npm run test:unit`

Expected: still exits non-zero with "No tests found" — but this is now the honest answer, because `App.test.js` is gone and no other test exists yet. Task 2 adds the first real test; this step only confirms the command runs and the glob no longer contains a backslash.

- [ ] **Step 5: Commit**

```bash
git add package.json src/App.test.js
git commit -m "test: repair the Jest harness for this project path

Jest builds an absolute testMatch containing the project path, and the
.pemrograman segment produces a backslash inside the glob, so no test
ever matched. test:unit passes a relative --testMatch instead.

Drop the CRA default App.test.js: it asserts on 'learn react' text that
App.js no longer renders, and it imports react-router-dom@7, which Jest
27 cannot resolve because the package declares a main entry that does
not exist and relies on an exports map Webpack reads but Jest does not."
```

---

### Task 2: Angle helpers

**Files:**
- Create: `src/utils/starfield.js`
- Create: `src/utils/starfield.test.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `DIRECTION_ANGLES: { 'up-right': -55, 'down-left': 150 }`
  - `ANGLE_JITTER_DEG: 12`
  - `toRadians(deg: number) => number`
  - `lerp(min: number, max: number, t: number) => number`
  - `clamp(value: number, min: number, max: number) => number`
  - `pickAngle(direction: string, rng?: () => number) => number` — radians; throws on unknown direction

- [ ] **Step 1: Write the failing tests**

Create `src/utils/starfield.test.js`:

```js
import {
  DIRECTION_ANGLES,
  toRadians,
  lerp,
  clamp,
  pickAngle,
  ANGLE_JITTER_DEG,
} from './starfield';

describe('toRadians', () => {
  test('converts degrees to radians', () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI);
    expect(toRadians(-90)).toBeCloseTo(-Math.PI / 2);
  });
});

describe('lerp', () => {
  test('returns the endpoints at t=0 and t=1', () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  test('interpolates linearly in between', () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });
});

describe('clamp', () => {
  test('bounds a value to the range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });
});

describe('pickAngle', () => {
  test('returns the base angle when the rng lands mid-range', () => {
    // rng() === 0.5 makes the jitter term exactly zero
    expect(pickAngle('up-right', () => 0.5)).toBeCloseTo(
      toRadians(DIRECTION_ANGLES['up-right'])
    );
    expect(pickAngle('down-left', () => 0.5)).toBeCloseTo(
      toRadians(DIRECTION_ANGLES['down-left'])
    );
  });

  test('applies the full jitter at the rng extremes', () => {
    expect(pickAngle('up-right', () => 0)).toBeCloseTo(
      toRadians(DIRECTION_ANGLES['up-right'] - ANGLE_JITTER_DEG)
    );
    expect(pickAngle('up-right', () => 1)).toBeCloseTo(
      toRadians(DIRECTION_ANGLES['up-right'] + ANGLE_JITTER_DEG)
    );
  });

  test('throws on an unknown direction rather than silently drifting', () => {
    expect(() => pickAngle('sideways', () => 0.5)).toThrow(
      /Unknown starfield direction/
    );
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL — `Cannot find module './starfield'`.

- [ ] **Step 3: Write the implementation**

Create `src/utils/starfield.js`:

```js
// Pure geometry and physics for the starfield. Deliberately free of DOM and
// React imports: those cannot be unit tested in this project (see the plan's
// Global Constraints), so anything worth testing lives here.

export const DIRECTION_ANGLES = {
  'up-right': -55,
  'down-left': 150,
};

export const ANGLE_JITTER_DEG = 12;

export function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

export function lerp(min, max, t) {
  return min + (max - min) * t;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Travel angle in radians, jittered so meteors in the same section do not
// run perfectly parallel. rng must return a value in [0, 1).
export function pickAngle(direction, rng = Math.random) {
  const base = DIRECTION_ANGLES[direction];
  if (base === undefined) {
    throw new Error(`Unknown starfield direction: ${direction}`);
  }
  const jitter = (rng() * 2 - 1) * ANGLE_JITTER_DEG;
  return toRadians(base + jitter);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: PASS, 4 suites of assertions, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add src/utils/starfield.js src/utils/starfield.test.js
git commit -m "feat: add starfield angle helpers"
```

---

### Task 3: Meteor creation and motion

**Files:**
- Modify: `src/utils/starfield.js`
- Modify: `src/utils/starfield.test.js`

**Interfaces:**
- Consumes: `pickAngle`, `lerp` from Task 2
- Produces:
  - `METEOR_LIFETIME_MS: { min: 500, max: 900 }`
  - `METEOR_TRAVEL_FRACTION: { min: 0.4, max: 0.7 }`
  - `TRAIL_MS: { min: 90, max: 160 }`
  - `PEAK_OPACITY: { min: 0.45, max: 0.75 }`
  - `createMeteor(width, height, direction, rng?) => Meteor` where `Meteor = { x, y, vx, vy, age, lifetime, trail, peak }`, `vx`/`vy` in px per ms, `trail` in ms
  - `advanceMeteor(meteor, dtMs) => Meteor` (mutates and returns)
  - `isMeteorDead(meteor) => boolean`

- [ ] **Step 1: Write the failing tests**

Append to `src/utils/starfield.test.js`:

```js
import {
  createMeteor,
  advanceMeteor,
  isMeteorDead,
  METEOR_LIFETIME_MS,
} from './starfield';

describe('createMeteor', () => {
  test('starts inside the canvas bounds', () => {
    const m = createMeteor(800, 600, 'down-left', () => 0.5);
    expect(m.x).toBeGreaterThanOrEqual(0);
    expect(m.x).toBeLessThanOrEqual(800);
    expect(m.y).toBeGreaterThanOrEqual(0);
    expect(m.y).toBeLessThanOrEqual(600);
  });

  test('starts unaged with a lifetime in range', () => {
    const m = createMeteor(800, 600, 'down-left', () => 0.5);
    expect(m.age).toBe(0);
    expect(m.lifetime).toBeGreaterThanOrEqual(METEOR_LIFETIME_MS.min);
    expect(m.lifetime).toBeLessThanOrEqual(METEOR_LIFETIME_MS.max);
  });

  // This is the regression test for the original bug: the CSS version set
  // the tail angle with rotate() and the path with translate(), and the two
  // disagreed by 10-15 degrees. Here the tail is drawn from
  // (x - vx*trail, y - vy*trail) to (x, y), so it is a function of velocity
  // and the two cannot diverge.
  test('tail direction is identical to travel direction', () => {
    ['up-right', 'down-left'].forEach((direction) => {
      const m = createMeteor(800, 600, direction, () => 0.5);
      const tailAngle = Math.atan2(m.vy * m.trail, m.vx * m.trail);
      const travelAngle = Math.atan2(m.vy, m.vx);
      expect(tailAngle).toBeCloseTo(travelAngle, 10);
    });
  });

  test('travels between 40% and 70% of the diagonal within its lifetime', () => {
    const width = 800;
    const height = 600;
    const diagonal = Math.hypot(width, height);
    const m = createMeteor(width, height, 'down-left', () => 0.5);
    const distance = Math.hypot(m.vx, m.vy) * m.lifetime;
    expect(distance / diagonal).toBeGreaterThanOrEqual(0.4);
    expect(distance / diagonal).toBeLessThanOrEqual(0.7);
  });

  test('up-right actually travels up and to the right', () => {
    const m = createMeteor(800, 600, 'up-right', () => 0.5);
    expect(m.vx).toBeGreaterThan(0);
    expect(m.vy).toBeLessThan(0); // canvas y grows downward
  });

  test('down-left actually travels down and to the left', () => {
    const m = createMeteor(800, 600, 'down-left', () => 0.5);
    expect(m.vx).toBeLessThan(0);
    expect(m.vy).toBeGreaterThan(0);
  });
});

describe('advanceMeteor', () => {
  test('moves by velocity times elapsed time', () => {
    const m = { x: 10, y: 20, vx: 2, vy: -1, age: 0, lifetime: 500 };
    advanceMeteor(m, 10);
    expect(m.x).toBe(30);
    expect(m.y).toBe(10);
    expect(m.age).toBe(10);
  });

  test('is frame-rate independent: one big step equals many small ones', () => {
    const a = { x: 0, y: 0, vx: 3, vy: 2, age: 0, lifetime: 500 };
    const b = { x: 0, y: 0, vx: 3, vy: 2, age: 0, lifetime: 500 };
    advanceMeteor(a, 100);
    for (let i = 0; i < 10; i += 1) advanceMeteor(b, 10);
    expect(a.x).toBeCloseTo(b.x);
    expect(a.y).toBeCloseTo(b.y);
    expect(a.age).toBeCloseTo(b.age);
  });
});

describe('isMeteorDead', () => {
  test('is false before the lifetime elapses and true after', () => {
    expect(isMeteorDead({ age: 499, lifetime: 500 })).toBe(false);
    expect(isMeteorDead({ age: 500, lifetime: 500 })).toBe(true);
  });
});
```

Merge the new names into the existing `import` at the top of the file rather than adding a second `import` from `'./starfield'`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL — `createMeteor is not a function`.

- [ ] **Step 3: Write the implementation**

Append to `src/utils/starfield.js`:

```js
export const METEOR_LIFETIME_MS = { min: 500, max: 900 };
export const METEOR_TRAVEL_FRACTION = { min: 0.4, max: 0.7 };
export const TRAIL_MS = { min: 90, max: 160 };
export const PEAK_OPACITY = { min: 0.45, max: 0.75 };

// Velocity is stored in px per millisecond and trail length in milliseconds,
// so the renderer can derive the tail as a point back along the path:
//   (x - vx * trail, y - vy * trail)
// Tail orientation is therefore a consequence of motion, never a separate
// value that can fall out of sync with it.
export function createMeteor(width, height, direction, rng = Math.random) {
  const angle = pickAngle(direction, rng);
  const lifetime = lerp(METEOR_LIFETIME_MS.min, METEOR_LIFETIME_MS.max, rng());
  const diagonal = Math.hypot(width, height);
  const distance =
    diagonal *
    lerp(METEOR_TRAVEL_FRACTION.min, METEOR_TRAVEL_FRACTION.max, rng());
  const speed = distance / lifetime;

  return {
    x: rng() * width,
    y: rng() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    age: 0,
    lifetime,
    trail: lerp(TRAIL_MS.min, TRAIL_MS.max, rng()),
    peak: lerp(PEAK_OPACITY.min, PEAK_OPACITY.max, rng()),
  };
}

// Integrate by elapsed milliseconds rather than per frame, so the animation
// runs at the same speed on a 144 Hz display as on a 60 Hz one.
export function advanceMeteor(meteor, dtMs) {
  meteor.x += meteor.vx * dtMs;
  meteor.y += meteor.vy * dtMs;
  meteor.age += dtMs;
  return meteor;
}

export function isMeteorDead(meteor) {
  return meteor.age >= meteor.lifetime;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: PASS, including `tail direction is identical to travel direction`.

- [ ] **Step 5: Commit**

```bash
git add src/utils/starfield.js src/utils/starfield.test.js
git commit -m "feat: add meteor creation and frame-rate independent motion

Tail direction is derived from the velocity vector, so the rotate/translate
mismatch that made the CSS version look wrong cannot recur."
```

---

### Task 4: Opacity envelope, star seeding, and twinkle

**Files:**
- Modify: `src/utils/starfield.js`
- Modify: `src/utils/starfield.test.js`

**Interfaces:**
- Consumes: `lerp`, `clamp` from Task 2
- Produces:
  - `FADE_IN_RATIO: 0.15`, `FADE_OUT_RATIO: 0.45`
  - `meteorEnvelope(lifeRatio: number) => number` in `[0, 1]`
  - `STAR_AREA_PER_STAR: 12000`, `STAR_COUNT_LIMITS: { min: 30, max: 260 }`
  - `starCount(width, height, density?) => number`
  - `createStars(width, height, density?, rng?) => Star[]` where `Star = { x, y, radius, baseOpacity, twinkleSpeed, phase }`
  - `twinkleOpacity(star, tSeconds) => number`

- [ ] **Step 1: Write the failing tests**

Append to `src/utils/starfield.test.js`:

```js
import {
  meteorEnvelope,
  starCount,
  createStars,
  twinkleOpacity,
  STAR_COUNT_LIMITS,
} from './starfield';

describe('meteorEnvelope', () => {
  test('is dark at both ends of life', () => {
    expect(meteorEnvelope(0)).toBe(0);
    expect(meteorEnvelope(1)).toBe(0);
  });

  test('reaches full brightness once the fade-in completes', () => {
    expect(meteorEnvelope(0.15)).toBeCloseTo(1);
    expect(meteorEnvelope(0.4)).toBeCloseTo(1);
  });

  test('ramps up rather than popping in', () => {
    // The CSS version jumped straight to opacity 1 at 0%.
    expect(meteorEnvelope(0.075)).toBeCloseTo(0.5);
  });

  test('fades out over the final 45% of life', () => {
    expect(meteorEnvelope(0.775)).toBeCloseTo(0.5);
  });

  test('never leaves the 0..1 range across the whole life', () => {
    for (let r = 0; r <= 1; r += 0.01) {
      const v = meteorEnvelope(r);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe('starCount', () => {
  test('scales with area', () => {
    expect(starCount(1920, 1080)).toBeGreaterThan(starCount(800, 600));
  });

  test('clamps tiny and huge areas to the limits', () => {
    expect(starCount(10, 10)).toBe(STAR_COUNT_LIMITS.min);
    expect(starCount(10000, 10000)).toBe(STAR_COUNT_LIMITS.max);
  });

  test('responds to the density multiplier', () => {
    expect(starCount(1000, 1000, 2)).toBeGreaterThan(starCount(1000, 1000, 1));
  });
});

describe('createStars', () => {
  test('creates the requested count within bounds', () => {
    const stars = createStars(800, 600, 1, () => 0.5);
    expect(stars).toHaveLength(starCount(800, 600, 1));
    stars.forEach((s) => {
      expect(s.x).toBeGreaterThanOrEqual(0);
      expect(s.x).toBeLessThanOrEqual(800);
      expect(s.y).toBeGreaterThanOrEqual(0);
      expect(s.y).toBeLessThanOrEqual(600);
      expect(s.radius).toBeGreaterThan(0);
    });
  });

  test('gives stars independent phases so they do not pulse in unison', () => {
    let n = 0;
    // A varying rng stands in for Math.random here.
    const rng = () => ((n += 0.137) % 1);
    const stars = createStars(800, 600, 1, rng);
    const phases = new Set(stars.map((s) => s.phase));
    expect(phases.size).toBeGreaterThan(1);
  });
});

describe('twinkleOpacity', () => {
  test('stays within the star base opacity and never goes negative', () => {
    const star = { baseOpacity: 0.6, twinkleSpeed: 1, phase: 0 };
    for (let t = 0; t < 20; t += 0.1) {
      const v = twinkleOpacity(star, t);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(star.baseOpacity);
    }
  });

  test('actually varies over time', () => {
    const star = { baseOpacity: 0.6, twinkleSpeed: 1, phase: 0 };
    expect(twinkleOpacity(star, 0)).not.toBeCloseTo(twinkleOpacity(star, 1.5));
  });
});
```

Merge the new names into the existing `import` at the top of the file.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL — `meteorEnvelope is not a function`.

- [ ] **Step 3: Write the implementation**

Append to `src/utils/starfield.js`:

```js
export const FADE_IN_RATIO = 0.15;
export const FADE_OUT_RATIO = 0.45;

// Brightness multiplier across a meteor's life: ramp up, hold, fall away.
// The asymmetry matters — a real meteor brightens quickly and dims slowly.
export function meteorEnvelope(lifeRatio) {
  if (lifeRatio <= 0 || lifeRatio >= 1) return 0;
  if (lifeRatio < FADE_IN_RATIO) return lifeRatio / FADE_IN_RATIO;
  const fadeOutStart = 1 - FADE_OUT_RATIO;
  if (lifeRatio > fadeOutStart) return (1 - lifeRatio) / FADE_OUT_RATIO;
  return 1;
}

export const STAR_AREA_PER_STAR = 12000;
export const STAR_COUNT_LIMITS = { min: 30, max: 260 };
export const STAR_RADIUS = { min: 0.4, max: 1.4 };
export const STAR_BASE_OPACITY = { min: 0.2, max: 0.7 };
export const TWINKLE_SPEED = { min: 0.4, max: 1.2 }; // radians per second

export function starCount(width, height, density = 1) {
  const raw = Math.round(
    ((width * height) / STAR_AREA_PER_STAR) * density
  );
  return clamp(raw, STAR_COUNT_LIMITS.min, STAR_COUNT_LIMITS.max);
}

export function createStars(width, height, density = 1, rng = Math.random) {
  const count = starCount(width, height, density);
  const stars = [];
  for (let i = 0; i < count; i += 1) {
    stars.push({
      x: rng() * width,
      y: rng() * height,
      radius: lerp(STAR_RADIUS.min, STAR_RADIUS.max, rng()),
      baseOpacity: lerp(STAR_BASE_OPACITY.min, STAR_BASE_OPACITY.max, rng()),
      twinkleSpeed: lerp(TWINKLE_SPEED.min, TWINKLE_SPEED.max, rng()),
      // An independent phase per star is what keeps the field from
      // pulsing as one block, which is the tell of a fake sky.
      phase: rng() * Math.PI * 2,
    });
  }
  return stars;
}

// t is elapsed seconds. Output is bounded by the star's own base opacity,
// so the "many but subtle" look survives any density setting.
export function twinkleOpacity(star, t) {
  const wave = 0.55 + 0.45 * Math.sin(t * star.twinkleSpeed + star.phase);
  return star.baseOpacity * wave;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: PASS, all suites.

- [ ] **Step 5: Commit**

```bash
git add src/utils/starfield.js src/utils/starfield.test.js
git commit -m "feat: add meteor opacity envelope, star seeding, and twinkle"
```

---

### Task 5: The Starfield component

No unit tests here: rendering needs a real canvas context, which jsdom does not provide, and the component's value is visual. It is verified in Task 8.

**Files:**
- Create: `src/components/Starfield.jsx`

**Interfaces:**
- Consumes: `createStars`, `createMeteor`, `advanceMeteor`, `isMeteorDead`, `meteorEnvelope`, `twinkleOpacity`, `lerp` from `src/utils/starfield`
- Produces: `<Starfield density? meteorRate? direction? maxMeteors? className? />` — default export. Requires a positioned (`relative`) parent.

- [ ] **Step 1: Write the component**

Create `src/components/Starfield.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import {
  createStars,
  createMeteor,
  advanceMeteor,
  isMeteorDead,
  meteorEnvelope,
  twinkleOpacity,
  lerp,
} from '../utils/starfield';

const SPAWN_INTERVAL_MS = { min: 400, max: 1400 };
const METEOR_RGB = '234, 242, 255';
// Cap the step so returning to a backgrounded tab does not teleport every
// meteor across the screen in a single frame.
const MAX_STEP_MS = 50;

const Starfield = ({
  density = 1,
  meteorRate = 1,
  direction = 'down-left',
  maxMeteors = 4,
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined; // no 2d support: render nothing, break nothing

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let stars = [];
    let meteors = [];
    let width = 0;
    let height = 0;
    let frameId = null;
    let lastTime = 0;
    let elapsed = 0;
    let nextSpawn = 0;
    let onScreen = false;

    const drawStars = (useTwinkle) => {
      ctx.fillStyle = '#ffffff';
      stars.forEach((s) => {
        ctx.globalAlpha = useTwinkle
          ? twinkleOpacity(s, elapsed / 1000)
          : s.baseOpacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const drawMeteors = () => {
      ctx.lineCap = 'round';
      ctx.lineWidth = 1;
      meteors.forEach((m) => {
        const alpha = m.peak * meteorEnvelope(m.age / m.lifetime);
        if (alpha <= 0) return;
        const tailX = m.x - m.vx * m.trail;
        const tailY = m.y - m.vy * m.trail;
        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, `rgba(${METEOR_RGB}, 0)`);
        gradient.addColorStop(1, `rgba(${METEOR_RGB}, 1)`);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const tick = (time) => {
      if (lastTime === 0) lastTime = time;
      const dt = Math.min(time - lastTime, MAX_STEP_MS);
      lastTime = time;
      elapsed += dt;

      nextSpawn -= dt;
      if (nextSpawn <= 0) {
        if (meteors.length < maxMeteors) {
          meteors.push(createMeteor(width, height, direction));
        }
        nextSpawn =
          lerp(SPAWN_INTERVAL_MS.min, SPAWN_INTERVAL_MS.max, Math.random()) /
          meteorRate;
      }

      meteors.forEach((m) => advanceMeteor(m, dt));
      meteors = meteors.filter((m) => !isMeteorDead(m));

      ctx.clearRect(0, 0, width, height);
      drawStars(true);
      drawMeteors();

      frameId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || frameId !== null) return;
      lastTime = 0;
      frameId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frameId === null) return;
      window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return; // not laid out yet

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = createStars(width, height, density);
      meteors = [];

      if (reduceMotion) {
        ctx.clearRect(0, 0, width, height);
        drawStars(false);
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    });
    intersectionObserver.observe(canvas);

    document.addEventListener('visibilitychange', sync);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [density, meteorRate, direction, maxMeteors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
    />
  );
};

export default Starfield;
```

- [ ] **Step 2: Verify it compiles under CI rules**

Run: `CI=true npm run build`

Expected: `Compiled successfully.` Any ESLint warning fails this build by design, so a clean result here is the gate. If it complains about the effect dependency list, do not add refs to it — the listed props are the only reactive inputs.

- [ ] **Step 3: Commit**

```bash
git add src/components/Starfield.jsx
git commit -m "feat: add canvas Starfield component

One canvas replaces per-section star divs. Pauses via IntersectionObserver
when off screen and via visibilitychange when the tab is hidden, and honours
prefers-reduced-motion by drawing a still field."
```

---

### Task 6: Replace the star markup at every call site

**Files:**
- Modify: `src/components/SectionMenu.jsx` (remove lines 9-23 and all `static-star` divs)
- Modify: `src/components/SectionProfile.jsx:50-52`
- Modify: `src/pages/ProjectsPage.jsx:12-14` and its `static-star` divs
- Modify: `src/components/ContentContact.jsx` (its `static-star` divs)

**Interfaces:**
- Consumes: `<Starfield />` from Task 5
- Produces: no new exports

- [ ] **Step 1: Confirm each parent is positioned**

Run: `grep -n "className=.*relative" src/components/SectionMenu.jsx src/components/SectionProfile.jsx src/pages/ProjectsPage.jsx src/components/ContentContact.jsx`

The canvas is `absolute inset-0`, so each direct parent must be `relative`. `SectionMenu` (`bg-black relative`) and `SectionProfile` (`relative overflow-hidden`) already are. If `ProjectsPage` or `ContentContact` is not, add `relative` to the wrapper you place `<Starfield />` inside.

- [ ] **Step 2: Replace the markup in `SectionMenu.jsx`**

Add the import at the top:

```jsx
import Starfield from "./Starfield";
```

Delete every `<div className="shooting-star ...">` and `<div className="static-star ...">` line, and put this immediately inside `<section id="menu" className="bg-black relative">`:

```jsx
<Starfield direction="down-left" density={1.1} meteorRate={1.2} maxMeteors={5} />
```

- [ ] **Step 3: Replace the markup in `SectionProfile.jsx`**

Add the import:

```jsx
import Starfield from "./Starfield";
```

Replace the three shooting-star divs (and the comment above them) with:

```jsx
<Starfield direction="up-right" density={0.9} meteorRate={1} maxMeteors={3} />
```

- [ ] **Step 4: Replace the markup in `ProjectsPage.jsx` and `ContentContact.jsx`**

Add the matching import to each (`./components/Starfield` from `pages/`, `./Starfield` from `components/`), delete their star divs, and insert:

```jsx
<Starfield direction="down-left" density={0.8} meteorRate={0.8} maxMeteors={3} />
```

- [ ] **Step 5: Verify no star divs remain**

Run: `grep -rn "shooting-star\|static-star" src --include=*.jsx --include=*.js`

Expected: no output.

- [ ] **Step 6: Verify the build**

Run: `CI=true npm run build`

Expected: `Compiled successfully.`

- [ ] **Step 7: Commit**

```bash
git add src/components/SectionMenu.jsx src/components/SectionProfile.jsx src/pages/ProjectsPage.jsx src/components/ContentContact.jsx
git commit -m "refactor: replace 127 star divs with the Starfield canvas"
```

---

### Task 7: Delete the dead star CSS

**Files:**
- Modify: `src/css/style.css`

**Interfaces:**
- Consumes: nothing
- Produces: nothing

- [ ] **Step 1: Record the starting size**

Run: `wc -l src/css/style.css`

Expected: 676. Note it for the commit message.

- [ ] **Step 2: Delete these rules**

- `.shooting-star`, `.shooting-star::before`, and every `.shooting-star-profile-*` and `.shooting-star-menu-*`
- `.static-star` and every `.static-star-*`
- `@keyframes shoot-up` and `@keyframes shoot-down`
- `.stars-layer-1`, `.stars-layer-2`, `.stars-layer-3` — already dead before this work; defined in CSS but referenced from no JSX
- The duplicate second definitions of `@keyframes twinkle`, `twinkle-slow`, `twinkle-global`, and `blink` (each is currently declared twice; keep the first)

- [ ] **Step 3: Keep these — deleting them causes visible regressions**

- `body::before` and the one remaining `@keyframes twinkle-global` that drives it
- `@keyframes blink` and `.blinking-cursor` — the typing cursor in `SectionProfile`

- [ ] **Step 4: Verify nothing still references the deleted rules**

Run: `grep -rn "stars-layer\|shooting-star\|static-star" src/`

Expected: no output.

Run: `grep -n "blinking-cursor\|body::before" src/css/style.css`

Expected: both still present.

- [ ] **Step 5: Verify the build and the typing cursor rule survived**

Run: `CI=true npm run build`

Expected: `Compiled successfully.`

- [ ] **Step 6: Commit**

```bash
git add src/css/style.css
git commit -m "refactor: drop the CSS the Starfield canvas replaced

Also removes .stars-layer-1/2/3, which no JSX has ever referenced, and the
duplicate second copies of four keyframes. Keeps body::before and the
.blinking-cursor rules, which are unrelated to the starfield."
```

---

### Task 8: Verify the result

The spec's success criterion is that the animation actually looks better, so this task is where that is checked. Do not skip to deploying.

**Files:** none

- [ ] **Step 1: Run the full unit suite**

Run: `npm run test:unit`

Expected: PASS, no failures.

- [ ] **Step 2: Build the way Vercel does**

Run: `CI=true npm run build`

Expected: `Compiled successfully.` Record the reported gzip size for `main.*.js` and compare with the 77.56 kB baseline — it should be within about 1 kB, since no dependency was added.

- [ ] **Step 3: Check it in a browser**

Run: `npx serve -s build` and open the printed URL.

Confirm each of these, which map one-to-one onto the five defects in the spec:
1. Meteor tails lie along their path — no tail pointing off-axis
2. Meteors cross quickly, reading as meteors rather than drifting dots
3. They brighten in rather than popping in at full strength
4. Watching for 30 seconds reveals no repeating position pattern
5. Tails vary in length rather than all being one fixed bar

Also confirm the field sits behind the text and does not compete with it — the agreed "dense but subtle" target.

- [ ] **Step 4: Check the reduced-motion path**

In Chrome DevTools: Command Menu → "Show Rendering" → set *Emulate CSS media feature prefers-reduced-motion* to `reduce`, then reload.

Expected: stars are drawn but nothing moves, and no meteors appear.

- [ ] **Step 5: Check the console**

Expected: no errors or warnings from `Starfield`.

- [ ] **Step 6: Deploy a preview**

Run: `vercel --yes`

Open the preview URL and repeat Step 3's checks there. Only promote to production (`vercel --prod`) once the preview looks right.

---

## Self-Review

**Spec coverage.** Every section of the spec maps to a task: the trail-direction fix and frame-rate independence to Task 3; the opacity envelope, density, and subtlety parameters to Task 4; props, the reduced-motion path, both observers, devicePixelRatio, and both error guards to Task 5; the call-site swap to Task 6; the explicit CSS keep/remove lists to Task 7; and the spec's whole Verification section to Task 8. The spec's "no new dependencies" and "leave `body::before` alone" appear in Global Constraints and Task 7.

**Placeholders.** None. Every code step carries complete code, and every run step names the exact command and the expected result.

**Type consistency.** `createMeteor` produces `{ x, y, vx, vy, age, lifetime, trail, peak }`, and Task 5 reads exactly those fields. `createStars` produces `{ x, y, radius, baseOpacity, twinkleSpeed, phase }`, and Task 5 reads `x`, `y`, `radius`, and `baseOpacity` directly while passing the whole star to `twinkleOpacity`, which uses `twinkleSpeed` and `phase`. Velocity is px/ms and `trail` is ms in both the producer and the consumer. `lerp` is used in Task 5 and exported in Task 2.

**Deviation from the spec.** The spec estimated the component at ~130 lines; the real implementation is closer to 170 because the observer wiring and the reduced-motion branch were written out rather than sketched. No behaviour differs.
