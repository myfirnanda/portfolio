import {
  DIRECTION_ANGLES,
  toRadians,
  lerp,
  clamp,
  pickAngle,
  ANGLE_JITTER_DEG,
  createMeteor,
  advanceMeteor,
  isMeteorDead,
  meteorTail,
  METEOR_LIFETIME_MS,
  meteorEnvelope,
  starCount,
  createStars,
  twinkleOpacity,
  STAR_COUNT_LIMITS,
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

// This is the regression test for the original bug: the CSS version set the
// tail angle with rotate() and the path with translate(), and the two
// disagreed by 10-15 degrees. meteorTail is the one place the tail point is
// computed, from velocity and trail duration, so these tests exercise the
// actual returned segment rather than re-deriving the same formula the way
// the test being replaced did (atan2(k*y, k*x) == atan2(y, x), true for any
// positive k — it could not have caught a bug in the formula itself).
describe('meteorTail', () => {
  test("the tail-to-meteor segment's angle equals the travel angle", () => {
    ['up-right', 'down-left'].forEach((direction) => {
      const m = createMeteor(800, 600, direction, () => 0.5);
      const tail = meteorTail(m);
      // Computed from the returned point, not from vx/vy directly, so a
      // reintroduced separately-stored tail angle (or a broken sign/scale in
      // the formula) shows up as a real mismatch here.
      const segmentAngle = Math.atan2(m.y - tail.y, m.x - tail.x);
      const travelAngle = Math.atan2(m.vy, m.vx);
      expect(segmentAngle).toBeCloseTo(travelAngle, 10);
    });
  });

  test('is the point trail milliseconds behind the meteor along its velocity', () => {
    const m = { x: 100, y: 50, vx: 3, vy: -4, trail: 20 };
    const tail = meteorTail(m);
    expect(tail.x).toBeCloseTo(100 - 3 * 20);
    expect(tail.y).toBeCloseTo(50 - -4 * 20);
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

  // Every star costs an arc() + fill() + a sin() on every frame, so the cap is
  // a per-frame budget, not a cosmetic limit. An earlier version raised it to
  // 2000 to stop `density` reading as inert on a very tall section, which made
  // that section 7.7x more expensive to draw. The cap has to stay somewhere a
  // mid-range phone can afford 60 times a second.
  test('keeps the per-frame star budget affordable on any viewport', () => {
    expect(STAR_COUNT_LIMITS.max).toBeLessThanOrEqual(400);
    expect(starCount(3840, 2160, 2)).toBeLessThanOrEqual(400);
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
