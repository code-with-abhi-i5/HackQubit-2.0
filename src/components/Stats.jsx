import { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { STATS_DATA } from "../constants";
import { useCountUp } from "../hooks";

// ── Premium stat card icons ──────────────────────────────────────────
const StatIcons = {
  coders: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path d="M14 10L4 20L14 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 10L36 20L26 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 8L18 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  teams: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="13" r="5" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M11 32C11 26.5 15 22 20 22C25 22 29 26.5 29 32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="8"  cy="16" r="3.5" stroke="currentColor" strokeWidth="1.8" opacity="0.55"/>
      <path d="M2 30C2 26 4.5 24 8 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
      <circle cx="32" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.8" opacity="0.55"/>
      <path d="M38 30C38 26 35.5 24 32 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
    </svg>
  ),
  clock: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M20 10V20L26 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <path d="M20 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 32V34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 20H8"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 20H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  trophy: () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path d="M12 6H28V17C28 22.5 24.4 26 20 26C15.6 26 12 22.5 12 17V6Z" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M12 10C12 10 7 10 7 15C7 19 11 19 12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 10C28 10 33 10 33 15C33 19 29 19 28 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 26V31" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 31H26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M12 34H28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M20 12L21.5 15.5L25 16L22.5 18.5L23 22L20 20.5L17 22L17.5 18.5L15 16L18.5 15.5Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.35"/>
    </svg>
  ),
};

// accent colors per card (Gold, Cyan, Amber, Emerald - Crimson replaced with Gold)
const CARD_ACCENTS = [
  { border: "rgba(212,175,55,0.45)",  glow: "rgba(212,175,55,0.18)",  icon: "#d4af37",  label: "#d4af37" },
  { border: "rgba(59,130,246,0.45)", glow: "rgba(59,130,246,0.18)", icon: "#3b82f6",  label: "#3b82f6" },
  { border: "rgba(234,179,8,0.45)",  glow: "rgba(234,179,8,0.18)",  icon: "#eab308",  label: "#eab308" },
  { border: "rgba(34,197,94,0.45)",  glow: "rgba(34,197,94,0.18)",  icon: "#22c55e",  label: "#22c55e" },
];

// ── Individual stat card ──────────────────────────────────────────────
const StatCard = ({ icon, value, suffix, label, index }) => {
  const { count, ref: counterRef } = useCountUp(value, 2.5);
  const cardRef  = useRef(null);
  const iconRef  = useRef(null);
  const glowRef  = useRef(null);
  const PirateIcon = StatIcons[icon];
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -8, scale: 1.02, duration: 0.4, ease: "power2.out" });
    gsap.to(iconRef.current, { scale: 1.18, rotate: 8, duration: 0.5, ease: "back.out(1.7)" });
    gsap.to(glowRef.current, { opacity: 1, duration: 0.4 });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(iconRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        counterRef.current = el;
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex flex-col items-center gap-4 px-6 py-6 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: `1px solid ${accent.border}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* hover glow layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent.glow} 0%, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.icon}, transparent)` }}
      />

      {/* Icon circle */}
      <div
        ref={iconRef}
        className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300"
        style={{
          background: `linear-gradient(135deg, ${accent.glow} 0%, rgba(255,255,255,0.03) 100%)`,
          border: `1px solid ${accent.border}`,
          color: accent.icon,
        }}
      >
        <div className="w-7 h-7">
          <PirateIcon />
        </div>
        {/* icon inner glow */}
        <div
          className="absolute inset-0 rounded-xl opacity-40"
          style={{ boxShadow: `inset 0 0 12px ${accent.glow}` }}
        />
      </div>

      {/* Value */}
      <div className="flex flex-col items-center text-center z-10">
        <div className="flex items-baseline gap-0.5">
          <span className="font-cinzel text-4xl font-bold text-white leading-none tracking-wide tabular-nums">
            {count}
          </span>
          <span
            className="font-cinzel text-2xl font-bold leading-none"
            style={{ color: accent.icon }}
          >
            {suffix}
          </span>
        </div>
        <span
          className="font-cinzel text-[10px] tracking-[0.25em] uppercase mt-2 font-semibold"
          style={{ color: accent.label, opacity: 0.85 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// ── Stats container ───────────────────────────────────────────────────
const Stats = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20
                 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] lg:w-auto max-w-[1200px]"
    >
      {/* Outer glass container */}
      <div
        className="relative p-3 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(0,15,35,0.85) 0%, rgba(0,8,20,0.92) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
});

Stats.displayName = "Stats";

export default Stats;
