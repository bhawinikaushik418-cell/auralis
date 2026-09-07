import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  AudioWaveform,
  Waves,
  Grid3x3,
  BrainCircuit,
  ShieldCheck,
} from 'lucide-react';
import SpectrogramHeatmap from './SpectrogramHeatmap';
import { useInView } from '../hooks/useInView';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: ReactNode;
  visual: ReactNode;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Audio In',
    desc: 'Raw voice stream captured in real time from any call or channel.',
    icon: <AudioWaveform className="h-5 w-5" />,
    visual: (
      <div className="flex h-full items-center justify-center gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-neon-blue/60"
            animate={{ height: [8, 28, 12, 32, 8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    ),
  },
  {
    num: '02',
    title: 'Preprocessing',
    desc: 'Noise suppression, normalization, and voice activity detection.',
    icon: <Waves className="h-5 w-5" />,
    visual: (
      <div className="flex h-full items-center justify-center">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
          <motion.path
            d="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20"
            stroke="#00d4ff"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Spectrogram',
    desc: 'Audio converted to a visual frequency-time heatmap for analysis.',
    icon: <Grid3x3 className="h-5 w-5" />,
    visual: <SpectrogramHeatmap width={140} height={70} seed={1} />,
  },
  {
    num: '04',
    title: 'AI Detection',
    desc: 'Neural network analyzes spectral artifacts of synthetic voice clones.',
    icon: <BrainCircuit className="h-5 w-5" />,
    visual: (
      <div className="flex h-full items-center justify-center">
        <div className="relative">
          <motion.div
            className="h-12 w-12 rounded-full border border-neon-blue/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="h-6 w-6 text-neon-blue/70" />
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '05',
    title: 'Verdict',
    desc: 'Confidence-scored result delivered in milliseconds — real or cloned.',
    icon: <ShieldCheck className="h-5 w-5" />,
    visual: (
      <div className="flex h-full items-center justify-center">
        <div className="glass rounded-lg px-3 py-1.5">
          <span className="font-mono text-xs text-neon-teal">REAL 99.7%</span>
        </div>
      </div>
    ),
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="group relative flex-shrink-0"
    >
      <div className="glass relative w-[220px] rounded-2xl p-5 transition-all duration-300 hover:border-neon-blue/30">
        {/* Step number */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-neon-blue/40">{step.num}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon-blue/20 bg-neon-blue/5 text-neon-blue/60 transition-colors group-hover:border-neon-blue/40 group-hover:text-neon-blue">
            {step.icon}
          </div>
        </div>

        {/* Visual */}
        <div className="mb-4 h-[70px] overflow-hidden rounded-lg border border-white/5 bg-ink-800/60">
          {step.visual}
        </div>

        {/* Title + desc */}
        <h3 className="font-display text-base font-semibold text-white/90">{step.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/40">{step.desc}</p>
      </div>
    </motion.div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <div className="hidden flex-shrink-0 items-center md:flex">
      <div className="relative h-px w-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/60 to-neon-blue/0"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 bg-neon-blue/10" />
      </div>
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-neon-blue/60 shadow-[0_0_8px_rgba(0,212,255,0.5)]"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
      />
    </div>
  );
}

export default function HowItWorks() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);

  return (
    <section className="relative w-full overflow-hidden bg-ink-900 py-32">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      {/* Section header */}
      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
            <span className="font-mono text-xs tracking-wide text-white/50">PIPELINE</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-lg text-sm font-light text-white/40 md:text-base">
            Five stages. Twelve milliseconds. From raw audio to verified verdict.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll pipeline */}
      <div ref={ref} className="relative z-10">
        <div className="flex items-center gap-0 overflow-x-auto px-6 pb-6 md:justify-center md:overflow-x-visible">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center">
              <StepCard step={step} index={i} />
              {i < STEPS.length - 1 && <Connector delay={i * 0.3} />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
    </section>
  );
}
