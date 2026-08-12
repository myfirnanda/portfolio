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
