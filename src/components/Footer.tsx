import { Github, Linkedin, Mail } from 'lucide-react';
import ParticleWave from './ParticleWave';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink-900 pt-20 pb-10">
      {/* Particle wave background */}
      <div className="pointer-events-none absolute inset-0 h-full">
        <ParticleWave />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />

      {/* Top scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-8 rounded-md border border-neon-blue/40 bg-neon-blue/5 flex items-center justify-center">
              <div className="h-3 w-3 rounded-sm bg-neon-blue/80 shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
            </div>
            <span className="font-display text-lg font-semibold tracking-widest text-white/90">
              AURALIS
            </span>
          </div>

          <h3 className="font-display text-2xl font-semibold text-white/80">
            SparkSync
          </h3>
          <p className="mt-2 font-mono text-xs tracking-wide text-white/30">
            Built for Smart India Hackathon 2026.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto my-10 h-px max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Links */}
          <div className="flex items-center gap-6 font-mono text-xs text-white/30">
            <span className="transition-colors hover:text-white/70 cursor-pointer">SOLUTION</span>
            <span className="transition-colors hover:text-white/70 cursor-pointer">RESEARCH</span>
            <span className="transition-colors hover:text-white/70 cursor-pointer">PRICING</span>
            <span className="transition-colors hover:text-white/70 cursor-pointer">DOCS</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="h-4 w-4" />, label: 'GitHub' },
              { icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
              { icon: <Mail className="h-4 w-4" />, label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white/40 transition-all duration-300 hover:border-neon-blue/30 hover:text-neon-blue/80"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center font-mono text-xs text-white/20">
          © 2026 SparkSync. All rights reserved.
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-900 to-transparent" />
    </footer>
  );
}
