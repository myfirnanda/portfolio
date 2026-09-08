import { memo, useRef, useEffect } from 'react';
import './ShapeGrid.css';

const ShapeGrid = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  shape = 'square',
  hoverTrailAmount = 0,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);
  const cellOpacities = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const isHex = shape === 'hexagon';
    const isTri = shape === 'triangle';
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    // Logical (CSS pixel) size of the canvas. The backing store is scaled by
    // the device pixel ratio so 1px strokes stay crisp on HiDPI displays,
    // while every calculation below keeps working in CSS pixels.
    let width = 0;
    let height = 0;
    let lastFrame = performance.now();

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // The trace* helpers only append a subpath -- they never call beginPath or
    // paint. That lets every border in a frame accumulate into a single path
    // that is stroked once, instead of one stroke() call per cell.
    const traceHex = (cx, cy, size) => {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const traceCircle = (cx, cy, size) => {
      // moveTo first, otherwise the arc is joined to the previous subpath.
      ctx.moveTo(cx + size / 2, cy);
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    };

    const traceSquare = (sx, sy, size) => {
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + size, sy);
      ctx.lineTo(sx + size, sy + size);
      ctx.lineTo(sx, sy + size);
      ctx.closePath();
    };

    const traceTriangle = (cx, cy, size, flip) => {
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    // Cell layout for the current shape, in CSS pixels. Returned as a plain
    // description so drawGrid and the hit-test share one source of truth --
    // previously they duplicated these offset formulas four times each and
    // could drift apart.
    const layout = () => {
      if (isHex) {
        return {
          stepX: hexHoriz,
          stepY: hexVert,
          colShift: Math.floor(gridOffset.current.x / hexHoriz),
          offsetX: ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz,
          offsetY: ((gridOffset.current.y % hexVert) + hexVert) % hexVert
        };
      }
      if (isTri) {
        const halfW = squareSize / 2;
        return {
          stepX: halfW,
          stepY: squareSize,
          colShift: Math.floor(gridOffset.current.x / halfW),
          rowShift: Math.floor(gridOffset.current.y / squareSize),
          offsetX: ((gridOffset.current.x % halfW) + halfW) % halfW,
          offsetY: ((gridOffset.current.y % squareSize) + squareSize) % squareSize
        };
      }
      return {
        stepX: squareSize,
        stepY: squareSize,
        offsetX: ((gridOffset.current.x % squareSize) + squareSize) % squareSize,
        offsetY: ((gridOffset.current.y % squareSize) + squareSize) % squareSize
      };
    };

    // Centre (or, for squares, top-left corner) of a given cell.
    const cellOrigin = (col, row, l) => {
      if (isHex) {
        return {
          x: col * hexHoriz + l.offsetX,
          y: row * hexVert + ((col + l.colShift) % 2 !== 0 ? hexVert / 2 : 0) + l.offsetY
        };
      }
      if (isTri) {
        return {
          x: col * l.stepX + l.offsetX,
          y: row * squareSize + squareSize / 2 + l.offsetY
        };
      }
      if (shape === 'circle') {
        return {
          x: col * squareSize + squareSize / 2 + l.offsetX,
          y: row * squareSize + squareSize / 2 + l.offsetY
        };
      }
      return { x: col * squareSize + l.offsetX, y: row * squareSize + l.offsetY };
    };

    const traceCell = (col, row, cx, cy, l) => {
      if (isHex) traceHex(cx, cy, squareSize);
      else if (isTri) traceTriangle(cx, cy, squareSize, ((((col + l.colShift + row + l.rowShift) % 2) + 2) % 2) !== 0);
      else if (shape === 'circle') traceCircle(cx, cy, squareSize);
      else traceSquare(cx, cy, squareSize);
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const l = layout();
      const cols = Math.ceil(width / l.stepX) + (isTri ? 4 : 3);
      const rows = Math.ceil(height / l.stepY) + (isTri ? 4 : 3);

      // Pass 1: hovered/trailing cells. Only a handful are ever non-zero, so
      // the per-cell fill cost here is negligible.
      if (cellOpacities.current.size > 0) {
        ctx.fillStyle = hoverFillColor;
        for (const [key, alpha] of cellOpacities.current) {
          const comma = key.indexOf(',');
          const col = Number(key.slice(0, comma));
          const row = Number(key.slice(comma + 1));
          const { x, y } = cellOrigin(col, row, l);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          traceCell(col, row, x, y, l);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Pass 2: every border as one path, stroked once. On a 1080p hero this
      // turns ~2500 stroke() calls per frame into a single one, which is what
      // keeps the hover fade running at full frame rate.
      ctx.beginPath();
      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const { x, y } = cellOrigin(col, row, l);
          traceCell(col, row, x, y, l);
        }
      }
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    };

    // Fade rates per 60fps frame. Rising is quick so the cell under the cursor
    // responds immediately; falling is stretched by hoverTrailAmount, which is
    // what produces the tail. Crucially the target for every cell that is not
    // hovered is 0, so a tail always fades out completely -- the previous
    // implementation pinned trail cells at a fixed opacity, which is why they
    // sat on screen forever once the cursor stopped.
    const RISE = 0.28;
    const fall = RISE / (1 + hoverTrailAmount * 0.35);

    const updateCellOpacities = frameScale => {
      const hoveredKey = hoveredSquare.current
        ? `${hoveredSquare.current.x},${hoveredSquare.current.y}`
        : null;

      if (hoveredKey && !cellOpacities.current.has(hoveredKey)) {
        cellOpacities.current.set(hoveredKey, 0);
      }

      for (const [key, opacity] of cellOpacities.current) {
        const hovered = key === hoveredKey;
        const rate = hovered ? RISE : fall;
        // 1 - (1 - rate)^frameScale keeps the easing identical whether the
        // browser is running at 60fps, 120fps, or dropping frames.
        const step = 1 - (1 - rate) ** frameScale;
        const next = opacity + ((hovered ? 1 : 0) - opacity) * step;

        if (!hovered && next < 0.004) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      }
    };

    const updateAnimation = () => {
      const now = performance.now();
      // Normalised to a 60fps frame so motion and fades run at the same visual
      // rate on any refresh rate. Clamped so a background tab or a long stall
      // does not teleport the grid on the next frame.
      const frameScale = Math.min((now - lastFrame) / (1000 / 60), 3);
      lastFrame = now;

      const effectiveSpeed = Math.max(speed, 0.1) * frameScale;
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      syncHover();
      updateCellOpacities(frameScale);
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    // Last pointer position in CSS pixels, or null when the pointer is away.
    // The hovered cell is recomputed from this every frame rather than only on
    // mousemove: the grid slides underneath a still cursor, so a cell index
    // captured once stops being the cell the cursor is actually over.
    const pointer = { x: 0, y: 0, inside: false };

    const syncHover = () => {
      if (!pointer.inside) return;

      const cell = cellAt(pointer.x, pointer.y);
      const changed =
        !hoveredSquare.current ||
        hoveredSquare.current.x !== cell.x ||
        hoveredSquare.current.y !== cell.y;

      if (changed) hoveredSquare.current = cell;
    };

    // Which cell currently sits under a point, in CSS pixels.
    const cellAt = (mouseX, mouseY) => {
      const l = layout();

      if (isHex) {
        // Hexagon columns interlock, so rounding x and y independently picks
        // the wrong cell near the slanted edges and the highlight appears to
        // jump a column ahead of the cursor. Scan the 3x3 neighbourhood around
        // the rough guess and take the nearest centre instead.
        const guessCol = Math.round((mouseX - l.offsetX) / hexHoriz);
        const guessRow = Math.round((mouseY - l.offsetY) / hexVert);
        let bestCol = guessCol;
        let bestRow = guessRow;
        let bestDist = Infinity;

        for (let col = guessCol - 1; col <= guessCol + 1; col++) {
          for (let row = guessRow - 1; row <= guessRow + 1; row++) {
            const { x, y } = cellOrigin(col, row, l);
            const dist = (mouseX - x) ** 2 + (mouseY - y) ** 2;
            if (dist < bestDist) {
              bestDist = dist;
              bestCol = col;
              bestRow = row;
            }
          }
        }

        return { x: bestCol, y: bestRow };
      }

      if (isTri) {
        return {
          x: Math.round((mouseX - l.offsetX) / l.stepX),
          y: Math.floor((mouseY - l.offsetY) / squareSize)
        };
      }

      const snap = shape === 'circle' ? Math.round : Math.floor;
      return {
        x: snap((mouseX - l.offsetX) / squareSize),
        y: snap((mouseY - l.offsetY) / squareSize)
      };
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = true;
    };

    const handleMouseLeave = () => {
      pointer.inside = false;
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let isVisible = false;
    let isPageVisible = !document.hidden;

    const tryStart = () => {
      if (isVisible && isPageVisible && !requestRef.current) {
        // Restart the clock, otherwise the gap while the tab was hidden is
        // charged to the first frame back.
        lastFrame = performance.now();
        requestRef.current = requestAnimationFrame(updateAnimation);
      }
    };
    const tryStop = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          tryStart();
        } else {
          tryStop();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        tryStart();
      } else {
        tryStop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryStart();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      tryStop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, shape, hoverTrailAmount]);

  return <canvas ref={canvasRef} className={`shapegrid-canvas ${className}`}></canvas>;
};

// The hero re-renders on every keystroke of its typing animation; memo keeps
// that from re-rendering the canvas element 20 times a second.
export default memo(ShapeGrid);
