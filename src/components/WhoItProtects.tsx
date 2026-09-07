import { type ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Building2, Newspaper } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface Audience {
  icon: ReactNode;
  title: string;
  desc: string;
  accent: string;
}

const AUDIENCES: Audience[] = [
  {
    icon: <HeartPulse className="h-7 w-7" />,
    title: 'Elderly & Vulnerable',
    desc: 'Shield loved ones from AI-voice scam calls impersonating family members.',
    accent: '#00ffc8',
  },
  {
    icon: <Building2 className="h-7 w-7" />,
    title: 'Banks & Call Centers',
    desc: 'Prevent inbound fraud by verifying caller authenticity in real time.',
    accent: '#00d4ff',
  },
  {
    icon: <Newspaper className="h-7 w-7" />,
    title: 'Journalists & Public Figures',
    desc: 'Verify audio authenticity before misinformation can spread.',
    accent: '#22e9ff',
  },
];

function TiltCard({ audience, index, inView }: { audience: Audience; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="flex-1"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="group glass relative h-full overflow-hidden rounded-2xl p-8 transition-colors duration-300 hover:border-white/15"
      >
        {/* Accent glow on hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${audience.accent}15, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div
          className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl border transition-colors duration-300"
          style={{
            borderColor: `${audience.accent}30`,
            background: `${audience.accent}08`,
            color: audience.accent,
          }}
        >
          {audience.icon}
          <div
            className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30"
            style={{ background: audience.accent }}
          />
        </div>

        {/* Title */}
        <h3 className="relative font-display text-lg font-semibold text-white/90">
          {audience.title}
        </h3>

        {/* Description */}
        <p className="relative mt-3 text-sm leading-relaxed text-white/40">
          {audience.desc}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px opacity-20"
          style={{ background: `linear-gradient(to right, ${audience.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function WhoItProtects() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);

  return (
    <section className="relative w-full overflow-hidden bg-ink-900 py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(34,233,255,0.7)]" />
            <span className="font-mono text-xs tracking-wide text-white/50">PROTECTION</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Who It Protects
          </h2>
          <p className="mt-4 max-w-lg text-sm font-light text-white/40 md:text-base">
            Real-time voice authentication for the people and organizations who need it most.
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {AUDIENCES.map((audience, i) => (
            <TiltCard key={audience.title} audience={audience} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
    </section>
  );
}
