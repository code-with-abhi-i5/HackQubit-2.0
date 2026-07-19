import { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { STATS_DATA } from "../constants";
import { useCountUp } from "../hooks";

// ============================================
// Custom Pirate x Hackathon SVG Icons
// ============================================
const PirateIcons = {
  coders: () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Code brackets with skull vibe */}
      <path d="M16 14L6 24L16 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 14L42 24L32 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 10L21 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Skull accent */}
      <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="22.5" cy="23.5" r="0.8" fill="currentColor" opacity="0.3" />
      <circle cx="25.5" cy="23.5" r="0.8" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  teams: () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Crew / people with pirate hat */}
      <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M14 38C14 32 18 28 24 28C30 28 34 32 34 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pirate hat on center figure */}
      <path d="M17 13C17 13 20 8 24 8C28 8 31 13 31 13" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M19 13L24 10L29 13" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Side figures */}
      <circle cx="10" cy="20" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M4 34C4 30 6 28 10 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="38" cy="20" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M44 34C44 30 42 28 38 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  clock: () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Clock with pirate compass style */}
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
      {/* Clock hands */}
      <path d="M24 14V24L30 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Hour markers like compass */}
      <path d="M24 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 36V38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 24H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 24H38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.5" />
      {/* Lightning bolt for non-stop energy */}
      <path d="M40 8L38 14L42 13L39 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  ),
  trophy: () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Trophy cup */}
      <path d="M16 8H32V20C32 26 28 30 24 30C20 30 16 26 16 20V8Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Trophy handles */}
      <path d="M16 12C16 12 10 12 10 18C10 22 14 22 16 20" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M32 12C32 12 38 12 38 18C38 22 34 22 32 20" stroke="currentColor" strokeWidth="1.3" fill="none" />
      {/* Stem and base */}
      <path d="M24 30V35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 35H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 38H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Star on trophy */}
      <path d="M24 14L25.5 17.5L29 18L26.5 20.5L27 24L24 22.5L21 24L21.5 20.5L19 18L22.5 17.5Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.4" />
      {/* Crown accent */}
      <path d="M19 8L21 5L24 7L27 5L29 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  ),
};

const StatCard = ({ icon, value, suffix, label, isLast }) => {
  const { count, ref: counterRef } = useCountUp(value, 2.5);
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const PirateIcon = PirateIcons[icon];

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(iconRef.current, {
      scale: 1.15,
      rotate: 8,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(iconRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div className="flex items-center">
      <div
        ref={(el) => {
          cardRef.current = el;
          counterRef.current = el;
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="flex items-center gap-4 lg:gap-5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 cursor-pointer transition-all duration-300 group relative"
      >
        {/* Ornate Pirate Icon */}
        <div
          ref={iconRef}
          className="relative flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 text-pirate-gold/50 transition-colors duration-500 group-hover:text-pirate-gold"
        >
          <PirateIcon />
          {/* Subtle glow behind icon on hover */}
          <div className="absolute inset-0 bg-pirate-gold/0 rounded-full blur-xl transition-all duration-500 group-hover:bg-pirate-gold/10" />
        </div>

        {/* Value + Label */}
        <div className="flex flex-col">
          <span className="font-cinzel text-2xl sm:text-3xl lg:text-[34px] font-bold text-pirate-white leading-none tracking-wide lining-nums">
            {count}
            <span className="text-pirate-gold">{suffix}</span>
          </span>
          <span className="font-cinzel text-[9px] sm:text-[10px] text-pirate-white/35 tracking-[0.2em] uppercase mt-1">
            {label}
          </span>
        </div>
      </div>

      {/* Gold Vertical Divider */}
      {!isLast && (
        <div className="hidden lg:block w-[1px] h-12 self-center bg-gradient-to-b from-transparent via-pirate-gold/30 to-transparent flex-shrink-0" />
      )}
    </div>
  );
};

const Stats = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bottom-5 sm:bottom-7 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] lg:w-auto max-w-[1300px]"
    >
      {/* Outer carved border */}
      <div className="carved-border animate-glow-border">
        {/* Inner carved glass card */}
        <div className="carved-bg relative">
          
          {/* Grunge / Old Map Noise Texture */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-color-dodge rounded-xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Giant Faded Compass Watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]">
            <svg viewBox="0 0 100 100" className="w-[600px] h-[600px] text-pirate-gold animate-[spin_180s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="50" cy="50" r="45" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="38" />
              <path d="M50 2 L54 46 L98 50 L54 54 L50 98 L46 54 L2 50 L46 46 Z" fill="currentColor" opacity="0.3" stroke="none" />
              <path d="M50 2 L50 98 M2 50 L98 50" />
              <path d="M16 16 L47 47 M84 16 L53 47 M84 84 L53 53 M16 84 L47 53" strokeDasharray="1 2" />
              <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.5" />
            </svg>
          </div>

          {/* Map Grid Lines Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Subtle top highlight line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/40 to-transparent z-10" />

          <div className="grid grid-cols-2 lg:grid-cols-4 relative z-10">
            {STATS_DATA.map((stat, i) => (
              <StatCard
                key={stat.label}
                {...stat}
                isLast={i === STATS_DATA.length - 1}
              />
            ))}
          </div>

          {/* Bottom subtle highlight */}
          <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/20 to-transparent z-10" />
        </div>
      </div>

      {/* Corner decorative bracket accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-pirate-gold/40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pirate-gold/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-pirate-gold/40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-pirate-gold/40 pointer-events-none" />
    </div>
  );
});

Stats.displayName = "Stats";

export default Stats;
