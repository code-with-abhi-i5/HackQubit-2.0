import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import pricePoolImg from "../assets/images/price pool image.png";
import {
  Trophy,
  Crown,
  Medal,
  Star,
  Gift,
  ScrollText,
  Anchor,
  Skull,
  Compass,
  Sword,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Prize Data ─── */
const PRIZES = [
  {
    id: "grand",
    rank: "🥇",
    title: "Grand Treasure",
    amount: "₹50,000",
    subtitle: "The Ultimate Bounty",
    description: "The captain who conquers all seas claims the grandest treasure ever hoarded.",
    icon: Trophy,
    accent: "#FFD700",
    delay: 0,
  },
  {
    id: "captain",
    rank: "🥈",
    title: "Captain's Reward",
    amount: "₹30,000",
    subtitle: "Second in Command",
    description: "A reward fit for the bravest captain who sailed through the storm.",
    icon: Crown,
    accent: "#C0C0C0",
    delay: 0.1,
  },
  {
    id: "firstmate",
    rank: "🥉",
    title: "First Mate Reward",
    amount: "₹15,000",
    subtitle: "The Loyal Navigator",
    description: "For the steadfast first mate whose compass never wavered.",
    icon: Medal,
    accent: "#CD7F32",
    delay: 0.2,
  },
  {
    id: "bounties",
    rank: "🎖",
    title: "Special Bounties",
    amount: "₹10,000",
    subtitle: "Domain Champions",
    description: "Legendary bounties for those who master specific seas of innovation.",
    icon: Star,
    accent: "#D4AF37",
    delay: 0.3,
  },
  {
    id: "goodies",
    rank: "🎁",
    title: "Participant Loot",
    amount: "Swag Kit",
    subtitle: "Treasures For All",
    description: "Every brave soul who boards this ship sails home with plundered treasures.",
    icon: Gift,
    accent: "#D4AF37",
    delay: 0.4,
  },
  {
    id: "certificates",
    rank: "📜",
    title: "Certificates",
    amount: "All Crews",
    subtitle: "Royal Decree",
    description: "An official decree from the Pirate King, certifying your legendary voyage.",
    icon: ScrollText,
    accent: "#D4AF37",
    delay: 0.5,
  },
];

/* ─── Floating Particle Component ─── */
const GoldParticle = ({ style }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: style.size,
      height: style.size,
      left: style.left,
      top: style.top,
      background: `radial-gradient(circle, #FFD700 0%, #D4AF37 40%, transparent 70%)`,
      animation: `prizeParticleFloat ${style.duration}s ${style.delay}s ease-in-out infinite`,
      opacity: 0,
    }}
  />
);

/* ─── Fog Layer ─── */
const FogLayer = ({ className, style }) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{
      background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.03) 20%, rgba(212,175,55,0.06) 50%, rgba(212,175,55,0.03) 80%, transparent 100%)",
      ...style,
    }}
  />
);

/* ─── Lantern Component ─── */
const Lantern = ({ position, delay = 0 }) => (
  <div
    className="absolute pointer-events-none z-10"
    style={{
      ...position,
      animation: `lanternFlicker 4s ${delay}s ease-in-out infinite`,
    }}
  >
    {/* Rope */}
    <div className="w-[2px] h-8 mx-auto bg-gradient-to-b from-pirate-bronze/60 to-pirate-bronze/30" />
    {/* Lantern body */}
    <div className="relative w-6 h-8 mx-auto">
      <div className="absolute inset-0 rounded-b-lg bg-gradient-to-b from-[#3d2b1f] to-[#2a1c11] border border-pirate-gold/30" />
      {/* Flame glow */}
      <div
        className="absolute -inset-4 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(255,180,50,0.6) 0%, rgba(212,175,55,0.2) 40%, transparent 70%)",
        }}
      />
      {/* Flame */}
      <div
        className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full"
        style={{
          background: "radial-gradient(ellipse, #FFD700 0%, #FF8C00 50%, transparent 100%)",
          animation: `lanternFlicker 2s ${delay + 0.5}s ease-in-out infinite`,
        }}
      />
    </div>
  </div>
);

/* ─── Treasure Chest SVG ─── */
const TreasureChestSVG = ({ isHovered }) => (
  <svg viewBox="0 0 300 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chestWood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5C3A1E" />
        <stop offset="30%" stopColor="#3D2B1F" />
        <stop offset="70%" stopColor="#2A1A0E" />
        <stop offset="100%" stopColor="#1A0F08" />
      </linearGradient>
      <linearGradient id="chestLid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A2E15" />
        <stop offset="50%" stopColor="#3D2510" />
        <stop offset="100%" stopColor="#2E1A0A" />
      </linearGradient>
      <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="30%" stopColor="#D4AF37" />
        <stop offset="70%" stopColor="#B8860B" />
        <stop offset="100%" stopColor="#8B6B3F" />
      </linearGradient>
      <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE44D" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#DAA520" />
      </linearGradient>
      <radialGradient id="gemRed" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#FF4444" />
        <stop offset="50%" stopColor="#CC0000" />
        <stop offset="100%" stopColor="#880000" />
      </radialGradient>
      <radialGradient id="gemBlue" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#4488FF" />
        <stop offset="50%" stopColor="#0044CC" />
        <stop offset="100%" stopColor="#002288" />
      </radialGradient>
      <radialGradient id="gemGreen" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#44FF88" />
        <stop offset="50%" stopColor="#00CC44" />
        <stop offset="100%" stopColor="#008822" />
      </radialGradient>
      <radialGradient id="glowCenter" cx="50%" cy="40%">
        <stop offset="0%" stopColor="rgba(255,215,0,0.6)" />
        <stop offset="40%" stopColor="rgba(212,175,55,0.2)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="chestShadow">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.7" />
      </filter>
    </defs>

    {/* Volumetric glow behind chest */}
    <ellipse cx="150" cy="130" rx="140" ry="90" fill="url(#glowCenter)" opacity={isHovered ? 0.9 : 0.5}>
      <animate attributeName="opacity" values={isHovered ? "0.7;0.95;0.7" : "0.4;0.6;0.4"} dur="3s" repeatCount="indefinite" />
    </ellipse>

    {/* Chest lid - tilts open on hover */}
    <g transform={`translate(150, 120) rotate(${isHovered ? -18 : -5}) translate(-150, -120)`} style={{ transition: "transform 0.6s ease" }}>
      {/* Lid shape */}
      <path d="M40,120 Q40,75 150,65 Q260,75 260,120 L260,130 L40,130 Z" fill="url(#chestLid)" stroke="url(#goldMetal)" strokeWidth="2" filter="url(#chestShadow)" />
      {/* Lid metal bands */}
      <path d="M60,120 Q60,88 150,80 Q240,88 240,120" fill="none" stroke="url(#goldMetal)" strokeWidth="3" opacity="0.6" />
      <path d="M70,115 Q70,92 150,85 Q230,92 230,115" fill="none" stroke="url(#goldMetal)" strokeWidth="2" opacity="0.4" />
      {/* Lid wood grain */}
      <path d="M80,110 Q80,95 150,90 Q220,95 220,110" fill="none" stroke="rgba(90,60,30,0.3)" strokeWidth="1" />
      {/* Lid keyhole ornament */}
      <circle cx="150" cy="122" r="8" fill="url(#goldMetal)" />
      <path d="M150,117 L147,125 L153,125 Z" fill="#1A0F08" />
    </g>

    {/* Gold light escaping from chest */}
    <rect x="50" y="118" width="200" height={isHovered ? 15 : 6} rx="3" fill="rgba(255,215,0,0.3)" opacity={isHovered ? 0.8 : 0.3} style={{ transition: "all 0.6s ease" }}>
      <animate attributeName="opacity" values={isHovered ? "0.6;0.9;0.6" : "0.2;0.4;0.2"} dur="2s" repeatCount="indefinite" />
    </rect>

    {/* Treasure contents visible - coins and gems */}
    <g opacity={isHovered ? 1 : 0.7} style={{ transition: "opacity 0.6s ease" }}>
      {/* Coins piling up */}
      <ellipse cx="110" cy="115" rx="12" ry="5" fill="url(#coinGold)" />
      <ellipse cx="130" cy="112" rx="10" ry="4" fill="url(#coinGold)" />
      <ellipse cx="155" cy="110" rx="13" ry="5" fill="url(#coinGold)" />
      <ellipse cx="175" cy="113" rx="11" ry="4" fill="url(#coinGold)" />
      <ellipse cx="195" cy="116" rx="10" ry="5" fill="url(#coinGold)" />
      <ellipse cx="120" cy="108" rx="9" ry="4" fill="url(#coinGold)" opacity="0.8" />
      <ellipse cx="165" cy="106" rx="11" ry="4" fill="url(#coinGold)" opacity="0.8" />
      <ellipse cx="185" cy="109" rx="8" ry="3" fill="url(#coinGold)" opacity="0.7" />
      {/* Gems */}
      <circle cx="140" cy="108" r="5" fill="url(#gemRed)">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="106" r="4" fill="url(#gemBlue)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="104" r="3.5" fill="url(#gemGreen)">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite" />
      </circle>
      {/* Pearl */}
      <circle cx="125" cy="111" r="3" fill="#F0EAD6" opacity="0.9">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Chest body */}
    <rect x="40" y="128" width="220" height="75" rx="6" fill="url(#chestWood)" stroke="url(#goldMetal)" strokeWidth="2" filter="url(#chestShadow)" />

    {/* Wood grain texture lines */}
    <line x1="50" y1="145" x2="250" y2="145" stroke="rgba(90,60,30,0.2)" strokeWidth="1" />
    <line x1="50" y1="160" x2="250" y2="160" stroke="rgba(90,60,30,0.15)" strokeWidth="1" />
    <line x1="50" y1="175" x2="250" y2="175" stroke="rgba(90,60,30,0.2)" strokeWidth="1" />
    <line x1="50" y1="190" x2="250" y2="190" stroke="rgba(90,60,30,0.15)" strokeWidth="1" />

    {/* Metal bands on body */}
    <rect x="40" y="135" width="220" height="6" fill="url(#goldMetal)" opacity="0.5" rx="1" />
    <rect x="40" y="165" width="220" height="4" fill="url(#goldMetal)" opacity="0.3" rx="1" />
    <rect x="40" y="192" width="220" height="6" fill="url(#goldMetal)" opacity="0.5" rx="1" />

    {/* Corner reinforcements */}
    <rect x="38" y="126" width="16" height="80" rx="3" fill="url(#goldMetal)" opacity="0.4" />
    <rect x="246" y="126" width="16" height="80" rx="3" fill="url(#goldMetal)" opacity="0.4" />

    {/* Lock plate */}
    <rect x="135" y="145" width="30" height="25" rx="4" fill="url(#goldMetal)" opacity="0.7" />
    <circle cx="150" cy="155" r="4" fill="#1A0F08" />
    <rect x="148" y="155" width="4" height="10" rx="1" fill="#1A0F08" />

    {/* Side handles */}
    <ellipse cx="35" cy="165" rx="8" ry="12" fill="none" stroke="url(#goldMetal)" strokeWidth="3" opacity="0.5" />
    <ellipse cx="265" cy="165" rx="8" ry="12" fill="none" stroke="url(#goldMetal)" strokeWidth="3" opacity="0.5" />
  </svg>
);

/* ─── Hover Particles ─── */
const HoverParticles = ({ accent }) => {
  const particles = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
    size: 2 + Math.random() * 4,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-1/4 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #FFD700 0%, ${accent} 70%, transparent 100%)`,
            boxShadow: `0 0 10px ${accent}`,
            animation: `hoverParticleUp ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Top Prize Card (Large, Podium-style) ─── */
const TopPrizeCard = ({ prize, index, isFirst }) => {
  const IconComp = prize.icon;

  return (
    <motion.div
      className="prize-card-wrapper"
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        delay: prize.delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="prize-card relative group cursor-pointer"
        animate={{
          y: [0, isFirst ? -12 : -6, 0],
        }}
        transition={{
          duration: 5 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          y: -20,
          scale: 1.03,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
      >
        {/* Outer glow ring for 1st place */}
        {isFirst && (
          <div className="absolute -inset-3 rounded-2xl pointer-events-none opacity-60 animate-pulse" style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(212,175,55,0.05), rgba(255,215,0,0.15))",
            filter: "blur(12px)",
          }} />
        )}

        {/* Card container */}
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isFirst ? "p-1" : ""}`}
          style={{
            background: isFirst
              ? "linear-gradient(135deg, rgba(255,215,0,0.4), rgba(212,175,55,0.15), rgba(255,215,0,0.4))"
              : "none",
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(165deg, rgba(30,22,12,0.97) 0%, rgba(12,8,4,0.99) 50%, rgba(25,18,8,0.97) 100%)",
              border: isFirst ? "none" : `1px solid ${prize.accent}35`,
              boxShadow: isFirst
                ? "inset 0 0 60px rgba(0,0,0,0.6), 0 20px 60px rgba(0,0,0,0.7), 0 0 80px rgba(255,215,0,0.08)"
                : "inset 0 0 40px rgba(0,0,0,0.8), 0 15px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Treasure Map / Vintage Wood Texture */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay" style={{
              backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%), repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(139,107,63,0.5) 4px, rgba(139,107,63,0.5) 5px)`,
            }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
              <Trophy className="w-64 h-64 text-pirate-gold rotate-12" strokeWidth={0.5} />
            </div>

            {/* Lamp Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-pirate-gold/20 blur-[50px] pointer-events-none rounded-full transform -translate-y-1/2 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-pirate-gold to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Noise */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-color-dodge" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: `radial-gradient(ellipse at center, ${prize.accent}18 0%, transparent 70%)`,
            }} />

            {/* Hover Particles */}
            <HoverParticles accent={prize.accent} />

            {/* Content */}
            <div className={`relative z-10 ${isFirst ? "p-8 sm:p-10" : "p-6 sm:p-8"} text-center`}>

              {/* Rank label */}
              <div className="flex justify-center mb-3">
                <div className={`px-4 py-1 rounded-full border font-cinzel text-xs font-bold tracking-[0.25em] uppercase`} style={{
                  borderColor: `${prize.accent}50`,
                  color: prize.accent,
                  background: `linear-gradient(135deg, ${prize.accent}10 0%, transparent 100%)`,
                }}>
                  {isFirst ? "1st Place" : index === 1 ? "2nd Place" : "3rd Place"}
                </div>
              </div>

              {/* Icon */}
              <div className={`${isFirst ? "w-20 h-20" : "w-16 h-16"} rounded-full mx-auto mb-5 flex items-center justify-center border transition-all duration-500 group-hover:scale-110`} style={{
                borderColor: `${prize.accent}40`,
                background: `radial-gradient(circle, ${prize.accent}15 0%, transparent 70%)`,
                boxShadow: `0 0 30px ${prize.accent}10`,
              }}>
                <IconComp className={`${isFirst ? "w-9 h-9" : "w-7 h-7"} transition-colors duration-500`} style={{ color: prize.accent }} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className={`font-cinzel ${isFirst ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} font-bold tracking-wider mb-2 transition-colors duration-300 group-hover:text-pirate-gold`} style={{ color: prize.accent }}>
                {prize.title}
              </h3>

              {/* Subtitle */}
              <p className="font-cinzel text-xs text-pirate-white/40 tracking-[0.2em] uppercase mb-5">
                {prize.subtitle}
              </p>

              {/* AMOUNT — THE STAR */}
              <div className="mb-5">
                <span className={`font-pirata ${isFirst ? "text-5xl sm:text-6xl md:text-7xl" : "text-4xl sm:text-5xl"} font-normal tracking-wide lining-nums block`} style={{
                  background: `linear-gradient(135deg, ${prize.accent} 0%, #FFE44D 40%, #FFD700 60%, ${prize.accent} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 20px ${prize.accent}40)`,
                }}>
                  {prize.amount}
                </span>
              </div>

              {/* Divider */}
              <div className="w-16 h-[1px] mx-auto mb-4" style={{
                background: `linear-gradient(90deg, transparent, ${prize.accent}50, transparent)`,
              }} />

              {/* Description */}
              <p className="font-cormorant text-sm sm:text-base text-pirate-white/50 leading-relaxed group-hover:text-pirate-white/70 transition-colors duration-500 max-w-[300px] mx-auto">
                {prize.description}
              </p>
            </div>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              background: `linear-gradient(90deg, transparent, ${prize.accent}80, transparent)`,
            }} />

            {/* Corner ornaments */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l rounded-tl-lg group-hover:border-pirate-gold/50 transition-colors duration-500" style={{ borderColor: `${prize.accent}25` }} />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r rounded-tr-lg group-hover:border-pirate-gold/50 transition-colors duration-500" style={{ borderColor: `${prize.accent}25` }} />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l rounded-bl-lg group-hover:border-pirate-gold/50 transition-colors duration-500" style={{ borderColor: `${prize.accent}25` }} />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r rounded-br-lg group-hover:border-pirate-gold/50 transition-colors duration-500" style={{ borderColor: `${prize.accent}25` }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Bottom Prize Card (Compact) ─── */
const BottomPrizeCard = ({ prize, index }) => {
  const IconComp = prize.icon;

  return (
    <motion.div
      className="prize-card-wrapper"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: prize.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="prize-card relative group cursor-pointer h-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3 } }}
      >
        <div
          className="relative rounded-xl overflow-hidden transition-all duration-500 h-full"
          style={{
            background: "linear-gradient(165deg, rgba(30,22,12,0.97) 0%, rgba(12,8,4,0.99) 50%, rgba(25,18,8,0.97) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {/* Treasure Map / Vintage Wood Texture */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay" style={{
            backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%), repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(139,107,63,0.5) 4px, rgba(139,107,63,0.5) 5px)`,
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-700">
            <Trophy className="w-40 h-40 text-pirate-gold -rotate-12" strokeWidth={0.5} />
          </div>

          {/* Lamp Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-pirate-gold/20 blur-[30px] pointer-events-none rounded-full transform -translate-y-1/2 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/70 to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
            background: `radial-gradient(ellipse at center, ${prize.accent}12 0%, transparent 70%)`,
          }} />

          <div className="relative z-10 p-5 sm:p-6 text-center">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border border-pirate-gold/25 group-hover:border-pirate-gold/50 transition-all duration-500" style={{
              background: `radial-gradient(circle, ${prize.accent}10 0%, transparent 70%)`,
            }}>
              <IconComp className="w-5 h-5 text-pirate-gold/70 group-hover:text-pirate-gold transition-colors duration-500" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-wider mb-1 transition-colors duration-300 group-hover:text-pirate-gold" style={{ color: prize.accent }}>
              {prize.title}
            </h3>

            <p className="font-cinzel text-[10px] text-pirate-white/40 tracking-[0.2em] uppercase mb-3">
              {prize.subtitle}
            </p>

            {/* Amount */}
            <span className="font-pirata text-3xl sm:text-4xl font-normal tracking-wide lining-nums block mb-2" style={{
              background: `linear-gradient(135deg, ${prize.accent} 0%, #FFD700 50%, ${prize.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {prize.amount}
            </span>

            <p className="font-cormorant text-xs text-pirate-white/45 leading-relaxed group-hover:text-pirate-white/65 transition-colors duration-500">
              {prize.description}
            </p>
          </div>

          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: `linear-gradient(90deg, transparent, ${prize.accent}60, transparent)`,
          }} />

          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-pirate-gold/15 rounded-tl-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-pirate-gold/15 rounded-tr-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-pirate-gold/15 rounded-bl-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-pirate-gold/15 rounded-br-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main PrizePool Component ─── */
const PrizePool = () => {
  const sectionRef = useRef(null);
  const chestRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const fogRef1 = useRef(null);
  const fogRef2 = useRef(null);
  const glowRef = useRef(null);
  const [chestHovered, setChestHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const topPrizes = PRIZES.slice(0, 3);
  const bottomPrizes = PRIZES.slice(3);

  /* Generate particles once */
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${20 + Math.random() * 60}%`,
        size: `${2 + Math.random() * 4}px`,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    []
  );

  /* Generate dust/fog particles */
  const dustMotes = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 2}px`,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 8,
      })),
    []
  );

  /* Mouse parallax handler */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  /* Apply parallax to chest */
  useEffect(() => {
    if (chestRef.current) {
      gsap.to(chestRef.current, {
        rotateY: mousePos.x * 8,
        rotateX: -mousePos.y * 5,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [mousePos]);

  /* GSAP ScrollTrigger animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in from darkness
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
      });

      // Title entrance
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Subtitle entrance
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        });
      }

      // Treasure chest dramatic rise
      if (chestRef.current) {
        gsap.from(chestRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          y: 120,
          scale: 0.7,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        });

        // Chest breathing animation
        gsap.to(chestRef.current, {
          scale: 1.02,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Chest subtle shake every few seconds
        gsap.to(chestRef.current, {
          x: 2,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none",
          repeatDelay: 4,
        });
      }

      // Golden glow intensifies on scroll
      if (glowRef.current) {
        gsap.from(glowRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
          opacity: 0,
          scale: 0.5,
        });
      }

      // Fog continuous movement
      if (fogRef1.current) {
        gsap.to(fogRef1.current, {
          x: 80,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (fogRef2.current) {
        gsap.to(fogRef2.current, {
          x: -60,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // CTA entrance
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative min-h-screen py-24 sm:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050302 0%, #0a0705 15%, #0d0a06 40%, #080604 70%, #030201 100%)",
      }}
    >
      {/* ─── Background Layers ─── */}

      {/* Cave/ocean gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(15,25,40,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(10,5,2,0.9) 0%, transparent 50%)
          `,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-color-dodge"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Fog layers */}
      <FogLayer
        className="w-[200%] h-40 top-[20%] -left-[50%] opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.02) 30%, rgba(212,175,55,0.05) 50%, rgba(212,175,55,0.02) 70%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />
      <div ref={fogRef1} className="absolute w-[150%] h-32 top-[35%] -left-[25%] pointer-events-none opacity-20" style={{ background: "linear-gradient(90deg, transparent, rgba(200,170,100,0.06), transparent)", filter: "blur(50px)" }} />
      <div ref={fogRef2} className="absolute w-[150%] h-28 top-[55%] -left-[25%] pointer-events-none opacity-15" style={{ background: "linear-gradient(90deg, transparent, rgba(180,150,80,0.05), transparent)", filter: "blur(60px)" }} />

      {/* Lanterns */}
      <Lantern position={{ top: "5%", left: "8%" }} delay={0} />
      <Lantern position={{ top: "3%", right: "10%" }} delay={1.5} />
      <Lantern position={{ top: "8%", left: "25%" }} delay={0.8} />
      <Lantern position={{ top: "6%", right: "28%" }} delay={2.2} />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <GoldParticle key={`particle-${i}`} style={p} />
      ))}

      {/* Floating dust motes */}
      {dustMotes.map((d, i) => (
        <div
          key={`dust-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            top: d.top,
            background: "rgba(212,175,55,0.3)",
            animation: `dustFloat ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Decorative anchors and skulls */}
      <div className="absolute top-12 left-[5%] opacity-[0.06] pointer-events-none">
        <Anchor className="w-20 h-20 text-pirate-gold" strokeWidth={0.8} />
      </div>
      <div className="absolute bottom-20 right-[6%] opacity-[0.05] pointer-events-none rotate-12">
        <Skull className="w-16 h-16 text-pirate-gold" strokeWidth={0.8} />
      </div>
      <div className="absolute top-[15%] right-[4%] opacity-[0.04] pointer-events-none -rotate-15">
        <Sword className="w-24 h-24 text-pirate-gold" strokeWidth={0.5} />
      </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
              <Trophy className="w-64 h-64 text-pirate-gold rotate-12" strokeWidth={0.5} />
            </div>

      {/* Rope decorations */}
      <div className="absolute top-0 left-[15%] w-[2px] h-32 pointer-events-none opacity-20" style={{ background: "linear-gradient(to bottom, transparent, #8B6B3F, #8B6B3F, transparent)" }} />
      <div className="absolute top-0 right-[18%] w-[2px] h-40 pointer-events-none opacity-15" style={{ background: "linear-gradient(to bottom, transparent, #8B6B3F, #8B6B3F, transparent)" }} />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section Header */}
        <header className="text-center mb-16 sm:mb-20">
          {/* Decorative compass above title */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className="relative">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-pirate-gold/50 animate-[spin_20s_linear_infinite]" strokeWidth={1} />
              <div className="absolute inset-0 rounded-full animate-pulse-gold" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }} />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            ref={titleRef}
            className="font-pirata text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider leading-[0.95] mb-5 sm:mb-6 cursor-pointer flex justify-center flex-wrap"
            >
            {"The Treasure Awaits".split("").map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  letter === " " ? "w-4" : ""
                }`}
                style={{
                  color: "#D4AF37",
                  textShadow: "0 0 15px rgba(212,175,55,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-12px) scale(1.15)";
                  e.target.style.background =
                    "linear-gradient(180deg,#FFF9C4,#FFD700,#FFB300)";
                  e.target.style.webkitBackgroundClip = "text";
                  e.target.style.webkitTextFillColor = "transparent";
                  e.target.style.textShadow =
                    "0 0 8px #FFD700,0 0 20px #FFD700,0 0 40px #FFD700";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.background = "none";
                  e.target.style.color = "#D4AF37";
                  e.target.style.webkitTextFillColor = "";
                  e.target.style.textShadow =
                    "0 0 15px rgba(212,175,55,0.25)";
                }}
                >
                {letter}
              </span>
            ))}
          </motion.h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-cormorant italic text-lg sm:text-xl lg:text-2xl text-pirate-gold/60 tracking-wide max-w-[600px] mx-auto"
          >
            &ldquo;Only the bravest pirates claim the greatest bounty.&rdquo;
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/40" />
            <Skull className="w-4 h-4 sm:w-5 sm:h-5 text-pirate-gold/30" strokeWidth={1} />
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/40" />
          </div>
        </header>

        {/* ─── Treasure Chest Centerpiece ─── */}
        {false && (
          <div className="flex justify-center mb-16 sm:mb-20">
            <motion.div
              ref={chestRef}
              className="relative w-[260px] h-[220px] sm:w-[320px] sm:h-[260px] md:w-[380px] md:h-[300px] cursor-pointer"
              onHoverStart={() => setChestHovered(true)}
              onHoverEnd={() => setChestHovered(false)}
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              {/* Volumetric golden glow behind chest */}
              <div
                ref={glowRef}
                className="absolute -inset-16 sm:-inset-24 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, ${chestHovered ? "rgba(255,215,0,0.15)" : "rgba(212,175,55,0.08)"} 0%, ${chestHovered ? "rgba(212,175,55,0.06)" : "rgba(212,175,55,0.02)"} 40%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />

              {/* Upward golden light rays */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-1/2 w-1 pointer-events-none transition-all duration-700"
                style={{
                  height: chestHovered ? "200px" : "100px",
                  background: `linear-gradient(to top, rgba(255,215,0,${chestHovered ? 0.15 : 0.05}), transparent)`,
                  filter: "blur(15px)",
                }}
              />

              {/* Chest Image */}
              <img
                src={pricePoolImg}
                alt="Treasure Chest"
                className={`w-full h-full object-contain transition-all duration-700 ${chestHovered ? "drop-shadow-[0_0_40px_rgba(255,215,0,0.8)] scale-110" : "drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"}`}
              />

              {/* Floating coins animation around chest */}
              {chestHovered && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`coin-burst-${i}`}
                      className="absolute left-1/2 top-1/3 w-3 h-3 rounded-full"
                      style={{
                        background: "radial-gradient(circle, #FFD700, #DAA520)",
                        boxShadow: "0 0 8px rgba(255,215,0,0.6)",
                      }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: (Math.random() - 0.5) * 120,
                        y: -(40 + Math.random() * 80),
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          </div>
        )}

        {/* ─── Top 3 Prizes — Podium Layout ─── */}
        {/* On desktop: 2nd | 1st (elevated) | 3rd */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-end mb-12">
          {/* 2nd Place */}
          <div className="pt-12">
            <TopPrizeCard prize={topPrizes[1]} index={1} isFirst={false} />
          </div>
          {/* 1st Place — taller */}
          <div>
            <TopPrizeCard prize={topPrizes[0]} index={0} isFirst={true} />
          </div>
          {/* 3rd Place */}
          <div className="pt-12">
            <TopPrizeCard prize={topPrizes[2]} index={2} isFirst={false} />
          </div>
        </div>

        {/* On mobile / tablet: stack vertically, 1st → 2nd → 3rd */}
        <div className="lg:hidden flex flex-col gap-6 mb-12">
          {topPrizes.map((prize, i) => (
            <TopPrizeCard key={prize.id} prize={prize} index={i} isFirst={i === 0} />
          ))}
        </div>

        {/* Divider between top and bottom prizes */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/25" />
          <Anchor className="w-4 h-4 text-pirate-gold/20" strokeWidth={1.5} />
          <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/25" />
        </div>

        {/* ─── Bottom 3 Prizes — Compact Row ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {bottomPrizes.map((prize, i) => (
            <BottomPrizeCard key={prize.id} prize={prize} index={i} />
          ))}
        </div>



      </div>
    </section>
  );
};

export default PrizePool;
