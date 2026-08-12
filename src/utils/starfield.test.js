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
