import React, { useMemo } from "react";

/* ── 11 PURE HIGH-QUALITY VECTOR SVG PIRATE TREASURES & EXPENSIVE JEWELRY ── */

// 1. Faceted Crimson Ruby
const SVGRubyGem = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="40%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
    </defs>
    <polygon points="50,10 85,35 70,90 30,90 15,35" fill="url(#rubyGrad)" stroke="#7f1d1d" strokeWidth="2" />
    <polygon points="50,10 85,35 50,45" fill="#fca5a5" opacity="0.6" />
    <polygon points="50,10 15,35 50,45" fill="#fee2e2" opacity="0.8" />
  </svg>
);

// 2. Brilliant Cut Cyan Diamond
const SVGBrilliantDiamond = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    <polygon points="25,20 75,20 95,45 50,95 5,45" fill="url(#diamondGrad)" stroke="#0284c7" strokeWidth="2" />
    <polygon points="25,20 75,20 50,45" fill="#ffffff" opacity="0.9" />
    <polygon points="25,20 5,45 50,45" fill="#e0f2fe" opacity="0.7" />
  </svg>
);

// 3. Faceted Green Emerald
const SVGEmeraldJewel = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="50%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
    </defs>
    <rect x="20" y="15" width="60" height="70" rx="6" fill="url(#emeraldGrad)" stroke="#14532d" strokeWidth="2" />
    <polygon points="20,15 80,15 70,28 30,28" fill="#86efac" opacity="0.7" />
  </svg>
);

// 4. Deep Blue Royal Sapphire
const SVGSapphireGem = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="url(#sapphireGrad)" stroke="#1e3a8a" strokeWidth="2" />
    <polygon points="50,5 90,30 50,40" fill="#93c5fd" opacity="0.8" />
  </svg>
);

// 5. Embossed Pirate Gold Doubloon
const SVGGoldDoubloon = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="doubloonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#doubloonGrad)" stroke="#713f12" strokeWidth="3" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 3" />
    <path d="M 50 25 L 50 68 M 35 40 L 65 40 M 32 60 Q 50 78 68 60" fill="none" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 6. Royal Pirate Captain Crown
const SVGRoyalCrown = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>
    <path d="M 15 75 L 20 25 L 40 50 L 50 15 L 60 50 L 80 25 L 85 75 Z" fill="url(#crownGrad)" stroke="#713f12" strokeWidth="2" />
    <circle cx="20" cy="22" r="4.5" fill="#ef4444" />
    <circle cx="50" cy="12" r="5.5" fill="#3b82f6" />
    <circle cx="80" cy="22" r="4.5" fill="#ef4444" />
    <rect x="15" y="70" width="70" height="10" rx="2" fill="#991b1b" stroke="#eab308" strokeWidth="1" />
  </svg>
);

// 7. Golden Pirate Goblet Chalice
const SVGGoldenChalice = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chaliceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>
    <path d="M 25 15 Q 50 10 75 15 L 65 55 Q 50 70 35 55 Z" fill="url(#chaliceGrad)" stroke="#451a03" strokeWidth="2" />
    <rect x="46" y="55" width="8" height="25" fill="#d97706" />
    <ellipse cx="50" cy="85" rx="25" ry="6" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
    <ellipse cx="50" cy="18" rx="22" ry="5" fill="#ef4444" opacity="0.8" />
  </svg>
);

// 8. Mystical Purple Amethyst Crystal
const SVGAmethystCrystal = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="amethystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
    </defs>
    <polygon points="50,5 75,30 65,95 35,95 25,30" fill="url(#amethystGrad)" stroke="#3b0764" strokeWidth="2" />
    <polygon points="50,5 75,30 50,45" fill="#e9d5ff" opacity="0.8" />
    <polygon points="50,5 25,30 50,45" fill="#f3e8ff" opacity="0.9" />
  </svg>
);

// 9. Vintage Brass Skeleton Key
const SVGSkeletonKey = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="60%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#713f12" />
      </linearGradient>
    </defs>
    <circle cx="30" cy="30" r="18" fill="none" stroke="url(#keyGrad)" strokeWidth="6" />
    <circle cx="30" cy="30" r="8" fill="none" stroke="#713f12" strokeWidth="2" />
    <line x1="43" y1="43" x2="85" y2="85" stroke="url(#keyGrad)" strokeWidth="6" strokeLinecap="round" />
    <path d="M 70 70 L 78 62 M 78 78 L 86 70" stroke="url(#keyGrad)" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// 10. Open Shell with Glowing White Pearl
const SVGPearlShell = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M 15 55 Q 50 20 85 55 Q 50 90 15 55 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
    <path d="M 15 55 Q 50 35 85 55" fill="none" stroke="#ea580c" strokeWidth="1.5" />
    <circle cx="50" cy="55" r="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <circle cx="47" cy="52" r="3" fill="#f8fafc" />
  </svg>
);

// 11. Crossed Golden Pirate Daggers / Cutlasses
const SVGCrossedSwords = ({ style }) => (
  <svg viewBox="0 0 100 100" style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M 15 15 Q 40 40 85 85 M 85 15 Q 60 40 15 85" stroke="#eab308" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="50" r="8" fill="#991b1b" stroke="#eab308" strokeWidth="2" />
  </svg>
);

const ALL_PIRATE_TREASURES = [
  SVGRubyGem,
  SVGBrilliantDiamond,
  SVGEmeraldJewel,
  SVGSapphireGem,
  SVGGoldDoubloon,
  SVGRoyalCrown,
  SVGGoldenChalice,
  SVGAmethystCrystal,
  SVGSkeletonKey,
  SVGPearlShell,
  SVGCrossedSwords,
];

const GoldRainParticles = () => {
  // Generate 22 lightweight SVG pirate treasures with smooth CSS fall animation
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      Component: ALL_PIRATE_TREASURES[i % ALL_PIRATE_TREASURES.length],
      left: `${(i * 4.5 + 2) % 95}%`,
      size: `${10 + (i % 4) * 3}px`,
      duration: `${4.5 + (i % 4) * 2}s`,
      delay: `${(i % 5) * 0.7}s`,
      opacity: 0.8 + (i % 3) * 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {particles.map((p) => {
        const JewelSvg = p.Component;
        return (
          <div
            key={p.id}
            className="absolute animate-[jewelFall_infinite_linear] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
            style={{
              left: p.left,
              top: "-6%",
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          >
            <JewelSvg style={{ width: p.size, height: p.size }} />
          </div>
        );
      })}
      <style>{`
        @keyframes jewelFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          50% {
            transform: translateY(350px) rotate(180deg) translateX(14px);
          }
          100% {
            transform: translateY(700px) rotate(360deg) translateX(-14px);
          }
        }
      `}</style>
    </div>
  );
};

export default GoldRainParticles;
