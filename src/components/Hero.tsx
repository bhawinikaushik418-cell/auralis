import { Suspense, lazy } from 'react';
import MagneticButton from './MagneticButton';

const Scene = lazy(() => import('./Scene'));

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink-900">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* Radial vignette */}
      <div className="pointer-events-none absolute inset-0 radial-fade" />

      {/* Top scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />

      {/* Navigation */}
      <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md border border-neon-blue/40 bg-neon-blue/5 flex items-center justify-center">
            <div className="h-3 w-3 rounded-sm bg-neon-blue/80 shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
          </div>
          <span className="font-display text-sm font-semibold tracking-widest text-white/90">
            AURALIS
          </span>
        </div>
        <div className="hidden items-center gap-8 font-mono text-xs text-white/40 md:flex">
          <span className="transition-colors hover:text-white/80 cursor-pointer">SOLUTION</span>
          <span className="transition-colors hover:text-white/80 cursor-pointer">RESEARCH</span>
          <span className="transition-colors hover:text-white/80 cursor-pointer">PRICING</span>
          <span className="transition-colors hover:text-white/80 cursor-pointer">DOCS</span>
        </div>
        <div className="font-mono text-xs text-neon-teal/60">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-teal/80 mr-2 shadow-[0_0_8px_rgba(0,255,200,0.5)] animate-pulse" />
          LIVE
        </div>
      </nav>

      {/* Center content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-teal shadow-[0_0_8px_rgba(0,255,200,0.7)]" />
            <span className="font-mono text-xs tracking-wide text-white/50">
              REAL-TIME VOICE AUTHENTICATION
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-6xl font-bold tracking-tight text-white text-glow animate-fade-in-up opacity-0 md:text-8xl lg:text-9xl"
          style={{ animationDelay: '0.4s' }}
        >
          Auralis
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 max-w-xl text-base font-light text-white/50 animate-fade-in-up opacity-0 md:text-xl"
          style={{ animationDelay: '0.6s' }}
        >
          Know the Voice Behind the Call
        </p>

        {/* CTA */}
        <div
          className="mt-12 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.8s' }}
        >
          <MagneticButton onClick={() => console.log('demo')}>
            Try Live Demo
          </MagneticButton>
        </div>

        {/* Stats row */}
        <div
          className="mt-20 flex items-center gap-8 font-mono text-xs text-white/30 animate-fade-in opacity-0 md:gap-16"
          style={{ animationDelay: '1s' }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-2xl font-semibold text-white/80">99.7%</span>
            <span className="tracking-wide">ACCURACY</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-2xl font-semibold text-white/80">12ms</span>
            <span className="tracking-wide">LATENCY</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-2xl font-semibold text-white/80">240+</span>
            <span className="tracking-wide">VOICE MODELS</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />

      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-6 top-6 h-4 w-4 border-l border-t border-neon-blue/20 md:left-12 md:top-12" />
      <div className="pointer-events-none absolute right-6 top-6 h-4 w-4 border-r border-t border-neon-blue/20 md:right-12 md:top-12" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-4 w-4 border-b border-l border-neon-blue/20 md:bottom-12 md:left-12" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-4 w-4 border-b border-r border-neon-blue/20 md:bottom-12 md:right-12" />

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-white/20 tracking-widest">SCROLL</span>
        <div className="h-8 w-px bg-gradient-to-b from-neon-blue/40 to-transparent" />
      </div>
    </section>
  );
}
