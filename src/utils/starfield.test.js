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
  METEOR_LIFETIME_MS,
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
