import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 60;
const COLORS = ['#00d4ff', '#00ffc8', '#22e9ff'];

interface Particle {
  x: number;
  baseY: number;
  y: number;
  vx: number;
  phase: number;
  amplitude: number;
  color: string;
  size: number;
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: (w / PARTICLE_COUNT) * i,
      baseY: h / 2,
      y: h / 2,
      vx: 0.3 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      amplitude: 20 + Math.random() * 30,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 1 + Math.random() * 1.5,
    }));

    let time = 0;

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Draw connecting line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        if (p.x > w + 10) p.x = -10;
        p.y = p.baseY + Math.sin(time * 0.8 + p.phase + p.x * 0.01) * p.amplitude;
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.35;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.globalAlpha = 0.08;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.5 }}
    />
  );
}
