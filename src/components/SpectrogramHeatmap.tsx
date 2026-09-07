import { useEffect, useRef } from 'react';

interface SpectrogramHeatmapProps {
  width?: number;
  height?: number;
  className?: string;
  active?: boolean;
  seed?: number;
}

const PALETTE = [
  [5, 8, 20],
  [10, 25, 60],
  [0, 80, 160],
  [0, 180, 220],
  [0, 255, 200],
  [120, 255, 100],
  [255, 220, 60],
  [255, 100, 40],
];

function paletteColor(t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(0.999, t)) * (PALETTE.length - 1);
  const i = Math.floor(clamped);
  const f = clamped - i;
  const a = PALETTE[i];
  const b = PALETTE[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

export default function SpectrogramHeatmap({
  width = 320,
  height = 120,
  className = '',
  active = true,
  seed = 0,
}: SpectrogramHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const COLS = 48;
    const ROWS = 20;
    const cellW = width / COLS;
    const cellH = height / ROWS;

    const grid: number[][] = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => Math.random() * 0.3)
    );

    let time = 0;

    const draw = () => {
      time += 0.016;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let val = grid[r][c];

          if (active) {
            const wave1 = Math.sin(time * 1.5 + c * 0.2 + r * 0.15 + seed) * 0.5 + 0.5;
            const wave2 = Math.sin(time * 0.8 + c * 0.1 - r * 0.08) * 0.5 + 0.5;
            const env = Math.exp(-Math.pow((r - ROWS / 2) / (ROWS / 1.8), 2));
            const drift = Math.sin(time * 0.3 + seed) * 0.1;
            val = (wave1 * 0.5 + wave2 * 0.3 + Math.random() * 0.15) * (env + drift);
            val = Math.max(0, Math.min(1, val));
          } else {
            val *= 0.95;
          }

          grid[r][c] = val;
          const [cr, cg, cb] = paletteColor(val);
          ctx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb | 0})`;
          ctx.fillRect(c * cellW, r * cellH, cellW + 0.5, cellH + 0.5);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, active, seed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className={className}
    />
  );
}
