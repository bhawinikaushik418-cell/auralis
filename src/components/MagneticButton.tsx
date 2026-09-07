import { useRef, useState, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const MAGNET_STRENGTH = 0.4;
const HOVER_RADIUS = 120;

export default function MagneticButton({ children, onClick }: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < HOVER_RADIUS) {
      setOffset({ x: dx * MAGNET_STRENGTH, y: dy * MAGNET_STRENGTH });
      setIsHovering(true);
    } else {
      setOffset({ x: 0, y: 0 });
      setIsHovering(false);
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow halo */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
        style={{
          opacity: isHovering ? 0.6 : 0,
          background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)',
          transform: 'scale(1.8)',
        }}
      />
      <button
        ref={btnRef}
        onClick={onClick}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className="group relative flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium tracking-wide text-white transition-all duration-300"
      >
        {/* Glass background */}
        <span className="absolute inset-0 rounded-full border border-neon-blue/30 bg-gradient-to-r from-neon-blue/10 to-neon-teal/10 backdrop-blur-md transition-all duration-300 group-hover:border-neon-teal/60 group-hover:from-neon-blue/20 group-hover:to-neon-teal/20" />
        {/* Inner glow line */}
        <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
        <span className="relative z-10">{children}</span>
        <svg
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
