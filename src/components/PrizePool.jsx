import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Award, Trophy, Sparkles } from "lucide-react";

// Custom Generated 3D Cutout Assets
import prize1stImg from "../assets/images/prize_1st_gold.webp";
import prize2ndImg from "../assets/images/prize_2nd_silver.webp";
import prize3rdImg from "../assets/images/prize_3rd_bronze.webp";
import bgStoryPrizes from "../assets/images/bg_story_prizes.webp";
import GoldRainParticles from "./GoldRainParticles";
import PirateRopeCannonSidebar from "./PirateRopeCannonSidebar";

gsap.registerPlugin(ScrollTrigger);

/* ── 3 HIGH-QUALITY FLUFFY SVG CUMULUS CLOUDS WITH CSS GRADIENTS & FILTERS ── */
const FluffyCloud1 = ({ className, style }) => (
  <svg viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="prizeCloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="70%" stopColor="#F8FAFC" stopOpacity="0.98" />
        <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.95" />
      </linearGradient>
      <filter id="prizeCloudShadow1" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="25" floodColor="#0F172A" floodOpacity="0.12" />
      </filter>
    </defs>
    <g filter="url(#prizeCloudShadow1)" fill="url(#prizeCloudGrad1)">
      <ellipse cx="500" cy="300" rx="420" ry="120" />
      <ellipse cx="320" cy="260" rx="220" ry="140" />
      <ellipse cx="680" cy="250" rx="240" ry="145" />
      <ellipse cx="500" cy="200" rx="270" ry="160" />
      <ellipse cx="160" cy="300" rx="140" ry="100" />
      <ellipse cx="840" cy="290" rx="150" ry="105" />
      <ellipse cx="500" cy="140" rx="180" ry="110" />
    </g>
  </svg>
);

const FluffyCloud2 = ({ className, style }) => (
  <svg viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="prizeCloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="65%" stopColor="#F1F5F9" stopOpacity="0.98" />
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.92" />
      </linearGradient>
      <filter id="prizeCloudShadow2" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="28" floodColor="#0F172A" floodOpacity="0.14" />
      </filter>
    </defs>
    <g filter="url(#prizeCloudShadow2)" fill="url(#prizeCloudGrad2)">
      <ellipse cx="500" cy="310" rx="440" ry="125" />
      <ellipse cx="280" cy="270" rx="240" ry="150" />
      <ellipse cx="720" cy="260" rx="230" ry="140" />
      <ellipse cx="500" cy="190" rx="280" ry="165" />
      <ellipse cx="140" cy="320" rx="130" ry="95" />
      <ellipse cx="860" cy="310" rx="140" ry="100" />
      <ellipse cx="380" cy="150" rx="170" ry="115" />
      <ellipse cx="620" cy="160" rx="160" ry="110" />
    </g>
  </svg>
);

const FluffyCloud3 = ({ className, style }) => (
  <svg viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <defs>
      <linearGradient id="prizeCloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="70%" stopColor="#F8FAFC" stopOpacity="0.97" />
        <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.94" />
      </linearGradient>
      <filter id="prizeCloudShadow3" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#0F172A" floodOpacity="0.12" />
      </filter>
    </defs>
    <g filter="url(#prizeCloudShadow3)" fill="url(#prizeCloudGrad3)">
      <ellipse cx="500" cy="290" rx="430" ry="120" />
      <ellipse cx="340" cy="250" rx="230" ry="145" />
      <ellipse cx="660" cy="240" rx="250" ry="150" />
      <ellipse cx="500" cy="180" rx="260" ry="155" />
      <ellipse cx="150" cy="290" rx="135" ry="98" />
      <ellipse cx="850" cy="280" rx="145" ry="102" />
      <ellipse cx="500" cy="130" rx="175" ry="105" />
    </g>
  </svg>
);

const CLOUDS_CONFIG = [
  { id: 1, top: "-10%", left: "-15%", w: "105vw", startX: "0%", endX: "-120%", scrub: 1.2 },
  { id: 2, top: "28%",  left: "10%",  w: "105vw", startX: "0%", endX: "120%",  scrub: 1.4 },
  { id: 3, top: "65%",  left: "-15%", w: "105vw", startX: "0%", endX: "-120%", scrub: 1.3 },
];

const PRIZES = [
  {
    rank: "1ST PRIZE",
    title: "The Grand Bounty",
    amount: "₹15,000",
    img: prize1stImg,
    glow: "rgba(255, 215, 0, 0.4)",
    borderColor: "border-amber-400/50",
    badgeBg: "bg-amber-500 text-amber-950",
    textColor: "text-amber-800",
    desc: "The supreme winner who conquers all challenges claims the golden bounty.",
    isCenter: true,
  },
  {
    rank: "2ND PRIZE",
    title: "Captain's Chest",
    amount: "₹10,000",
    img: prize2ndImg,
    glow: "rgba(192, 192, 192, 0.4)",
    borderColor: "border-slate-300",
    badgeBg: "bg-slate-600 text-slate-50",
    textColor: "text-slate-800",
    desc: "Awarded to the valiant runner-up who braved the storm with outstanding code.",
    isCenter: false,
  },
  {
    rank: "3RD PRIZE",
    title: "First Mate's Pouch",
    amount: "₹5,000",
    img: prize3rdImg,
    glow: "rgba(205, 127, 50, 0.4)",
    borderColor: "border-amber-700/40",
    badgeBg: "bg-amber-800 text-amber-50",
    textColor: "text-amber-900",
    desc: "For the steadfast crew whose relentless innovation earned a spot on the podium.",
    isCenter: false,
  },
];

const PrizePool = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const cloudRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Parallax Clouds Parting
      cloudRefs.current.forEach((el, i) => {
        if (!el) return;
        const config = CLOUDS_CONFIG[i];
        gsap.fromTo(
          el,
          { x: config.startX },
          {
            x: config.endX,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: config.scrub,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative py-28 px-6 bg-pirate-bg text-amber-950 overflow-hidden"
    >
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM WITH TOP GRADIENT BLEND ── */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStoryPrizes}
          alt="Pirate Treasure Beach Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>
      {/* ── 3 HUGE FLUFFY PARALLAX SVG CLOUDS COVERING PRIZES SECTION ── */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <div ref={(el) => (cloudRefs.current[0] = el)} className="absolute" style={{ top: CLOUDS_CONFIG[0].top, left: CLOUDS_CONFIG[0].left, width: CLOUDS_CONFIG[0].w }}>
          <FluffyCloud1 className="w-full h-auto" />
        </div>
        <div ref={(el) => (cloudRefs.current[1] = el)} className="absolute" style={{ top: CLOUDS_CONFIG[1].top, left: CLOUDS_CONFIG[1].left, width: CLOUDS_CONFIG[1].w }}>
          <FluffyCloud2 className="w-full h-auto" />
        </div>
        <div ref={(el) => (cloudRefs.current[2] = el)} className="absolute" style={{ top: CLOUDS_CONFIG[2].top, left: CLOUDS_CONFIG[2].left, width: CLOUDS_CONFIG[2].w }}>
          <FluffyCloud3 className="w-full h-auto" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-20 text-center">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-900/40 bg-amber-500/20 mb-4 shadow-sm"
          >
            <Trophy className="w-4 h-4 text-amber-900" />
            <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
              Total Bounty Pool
            </span>
          </motion.div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 tracking-wide">
            Prize <span className="text-amber-800">Pool</span>
          </h2>
          <p className="mt-4 font-cinzel text-amber-900 font-bold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Over <strong className="text-amber-950 font-extrabold">₹30,000+</strong> in cash prizes, trophies, and exclusive swag waiting for the victorious hacker crews!
          </p>
        </div>

        {/* Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {PRIZES.map((prize, idx) => (
            <div
              key={prize.rank}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`relative rounded-3xl border-2 ${prize.borderColor} bg-white/95 backdrop-blur-xl p-8 flex flex-col items-center justify-between text-center shadow-2xl transition-all duration-300 hover:scale-[1.03] ${
                prize.isCenter ? "md:-translate-y-6 border-amber-500 ring-4 ring-amber-500/30" : ""
              }`}
            >
              {/* Prize 3D Image */}
              <div className="w-44 h-44 sm:w-52 sm:h-52 -mt-16 mb-4 relative z-10">
                <img
                  src={prize.img}
                  alt={prize.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_16px_25px_rgba(120,70,10,0.4)] hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Rank Badge */}
              <span className={`px-4 py-1 rounded-full text-xs font-black font-cinzel tracking-widest uppercase mb-3 shadow-md ${prize.badgeBg}`}>
                {prize.rank}
              </span>

              {/* Title & Amount */}
              <h3 className="font-cinzel text-2xl font-black text-amber-950 mb-1">
                {prize.title}
              </h3>
              <div className={`font-cinzel text-3xl sm:text-4xl font-black ${prize.textColor} mb-4`}>
                {prize.amount}
              </div>

              {/* Description */}
              <p className="font-cinzel text-xs sm:text-sm font-bold text-amber-900 leading-relaxed mb-6">
                {prize.desc}
              </p>

              {/* Bottom Feature Pill */}
              <div className="w-full pt-4 border-t border-amber-200 flex items-center justify-center gap-2 text-xs font-black font-cinzel text-amber-950">
                <Award className="w-4 h-4 text-amber-800" />
                <span>Certificate + Exclusive Merch</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizePool;
