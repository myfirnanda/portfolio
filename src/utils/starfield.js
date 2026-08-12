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
