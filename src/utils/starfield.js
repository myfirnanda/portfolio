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

// The tail point a meteor's streak is drawn from, in the same coordinate
// space as meteor.x/y. This is deliberately the only place that formula
// lives: the renderer must call this rather than re-deriving (or, worse,
// storing) a tail angle of its own, because a separately maintained angle is
// exactly how the original CSS version drifted 10-15 degrees off the travel
// path. Tail orientation is a consequence of velocity, not an independent
// value — this function is what makes that testable.
export function meteorTail(meteor) {
  return {
    x: meteor.x - meteor.vx * meteor.trail,
    y: meteor.y - meteor.vy * meteor.trail,
  };
}

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
// max was 260, tuned for a single-viewport section (~3.1 Mpx). SectionMenu
// (experience/skills/education/projects/certificates/contact stacked in one
// column) can run 6,000-15,000 CSS px tall, i.e. 11-29 Mpx at a typical
// desktop width, which sat well above the old cap regardless of the density
// prop passed in — density became a no-op there. Raised so the designed
// ~1-star-per-12,000px² density stays live across that realistic range
// (it still saturates on extreme ultra-wide/very-tall combinations, which is
// an acceptable, deliberate ceiling rather than an accidental one); 2,000
// simple arc+fill draws per frame is still cheap for canvas 2D.
// A per-frame budget, not a cosmetic limit: each star costs an arc(), a fill()
// and a sin() every frame. Sections tall enough to hit this cap should be given
// their own smaller Starfield rather than having the cap raised.
export const STAR_COUNT_LIMITS = { min: 30, max: 400 };
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
