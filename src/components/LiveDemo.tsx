import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Activity } from 'lucide-react';
import SpectrogramHeatmap from './SpectrogramHeatmap';
import { useInView } from '../hooks/useInView';

type Verdict = 'real' | 'cloned';

export default function LiveDemo() {
  const [verdict, setVerdict] = useState<Verdict>('real');
  const [confidence, setConfidence] = useState(99);
  const [analyzing, setAnalyzing] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const toggleTimer = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    toggleTimer.current = window.setInterval(() => {
      setAnalyzing(true);
      window.setTimeout(() => {
        setVerdict((prev) => (prev === 'real' ? 'cloned' : 'real'));
        setConfidence(() => (Math.random() > 0.5 ? 99 : 97));
        setAnalyzing(false);
      }, 800);
    }, 4500);

    return () => clearInterval(toggleTimer.current);
  }, [inView]);

  const isReal = verdict === 'real';
  const gaugeColor = isReal ? '#00ffc8' : '#ff4060';
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (confidence / 100) * circumference;

  return (
    <section className="relative w-full overflow-hidden bg-ink-900 py-32">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: isReal ? 'radial-gradient(circle, #00ffc8, transparent 70%)' : 'radial-gradient(circle, #ff4060, transparent 70%)' }}
      />

      {/* Section header */}
      <div className="relative z-10 mx-auto mb-12 max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-teal shadow-[0_0_8px_rgba(0,255,200,0.7)]" />
            <span className="font-mono text-xs tracking-wide text-white/50">INTERACTIVE</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Live Demo
          </h2>
          <p className="mt-4 max-w-lg text-sm font-light text-white/40 md:text-base">
            Watch Auralis analyze a voice sample in real time and deliver its verdict.
          </p>
        </motion.div>
      </div>

      {/* Demo card */}
      <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-8 md:p-10"
        >
          {/* Top scan line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left: Spectrogram */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-neon-blue/60" />
                <span className="font-mono text-xs tracking-wide text-white/40">
                  SPECTROGRAM
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/5 bg-ink-800/60">
                <SpectrogramHeatmap width={300} height={140} active={!analyzing} seed={2} />
              </div>

              {/* Audio level bars */}
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-full"
                    style={{ background: isReal ? 'rgba(0,255,200,0.4)' : 'rgba(255,64,96,0.4)' }}
                    animate={{
                      height: analyzing
                        ? [4, 4]
                        : [4, 4 + Math.sin(i * 0.5) * 10 + Math.random() * 8, 4],
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      delay: i * 0.03,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Gauge + Verdict */}
            <div className="flex flex-col items-center justify-center">
              {/* Confidence gauge */}
              <div className="relative h-[140px] w-[140px]">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={gaugeColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{ filter: `drop-shadow(0 0 6px ${gaugeColor}80)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={confidence}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display text-3xl font-bold text-white"
                  >
                    {confidence}%
                  </motion.span>
                  <span className="font-mono text-xs text-white/30">CONFIDENCE</span>
                </div>
              </div>

              {/* Verdict badge */}
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {analyzing ? (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass flex items-center gap-2 rounded-full px-5 py-2.5"
                    >
                      <motion.span
                        className="h-2 w-2 rounded-full bg-neon-blue"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <span className="font-mono text-xs tracking-wide text-white/50">
                        ANALYZING...
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={verdict}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 rounded-full px-5 py-2.5"
                      style={{
                        background: isReal
                          ? 'rgba(0,255,200,0.1)'
                          : 'rgba(255,64,96,0.1)',
                        border: `1px solid ${isReal ? 'rgba(0,255,200,0.3)' : 'rgba(255,64,96,0.3)'}`,
                        boxShadow: `0 0 20px ${isReal ? 'rgba(0,255,200,0.15)' : 'rgba(255,64,96,0.15)'}`,
                      }}
                    >
                      {isReal ? (
                        <ShieldCheck className="h-4 w-4" style={{ color: gaugeColor }} />
                      ) : (
                        <ShieldAlert className="h-4 w-4" style={{ color: gaugeColor }} />
                      )}
                      <span
                        className="font-mono text-xs font-semibold tracking-wide"
                        style={{ color: gaugeColor }}
                      >
                        {isReal ? 'REAL VOICE' : 'AI-CLONED VOICE'}
                      </span>
                      <motion.span
                        className="h-2 w-2 rounded-full"
                        style={{ background: gaugeColor }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-teal shadow-[0_0_6px_rgba(0,255,200,0.6)]" />
              <span className="font-mono text-xs text-white/30">SAMPLE: call_2847.wav</span>
            </div>
            <span className="font-mono text-xs text-white/30">
              {analyzing ? 'PROCESSING...' : 'VERDICT DELIVERED'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
    </section>
  );
}
