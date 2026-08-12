import { useEffect, useRef } from 'react';
import {
  createStars,
  createMeteor,
  advanceMeteor,
  isMeteorDead,
  meteorEnvelope,
  meteorTail,
  twinkleOpacity,
  lerp,
} from '../utils/starfield';

const SPAWN_INTERVAL_MS = { min: 400, max: 1400 };
const METEOR_RGB = '234, 242, 255';
// Cap the step so returning to a backgrounded tab does not teleport every
// meteor across the screen in a single frame.
const MAX_STEP_MS = 50;
// Hard ceiling on the canvas backing store, independent of section height.
// Firefox refuses any single dimension above 32,767px (renders nothing at
// all past it); iOS Safari blanks the canvas once width*height exceeds
// ~16.7 Mpx. SectionMenu alone can be 6,000-15,000 CSS px tall, so at
// devicePixelRatio 2-3 the naive width*dpr/height*dpr would blow both limits
// on most phones and Firefox on any display. A star field is soft dots, so
// falling back to a lower effective resolution on very tall sections is an
// acceptable trade for "still renders."
// The two limits are set independently on purpose. Deriving the area cap from
// the dimension cap (AREA = DIMENSION^2) makes the area term dead code, since
// sqrt(w*h) <= max(w,h) always: the dimension term would win every time.
const MAX_CANVAS_DIMENSION = 8192;
const MAX_CANVAS_AREA = 16 * 1024 * 1024; // iOS Safari's ~16.7 Mpx ceiling

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
        const tail = meteorTail(m);
        const gradient = ctx.createLinearGradient(tail.x, tail.y, m.x, m.y);
        gradient.addColorStop(0, `rgba(${METEOR_RGB}, 0)`);
        gradient.addColorStop(1, `rgba(${METEOR_RGB}, 1)`);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
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

      // Clamp the *effective* DPR (never the raw one) so the backing store
      // never approaches the browser limits above, no matter how tall the
      // section is. ctx.setTransform still uses this same clamped value, so
      // the drawing coordinate system stays in CSS pixels — draw calls keep
      // using `width`/`height`, unaware anything was capped.
      const rawDpr = window.devicePixelRatio || 1;
      const dpr = Math.min(
        rawDpr,
        MAX_CANVAS_DIMENSION / width,
        MAX_CANVAS_DIMENSION / height,
        Math.sqrt(MAX_CANVAS_AREA / (width * height))
      );
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
