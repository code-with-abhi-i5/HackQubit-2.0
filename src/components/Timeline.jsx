import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { motion } from "framer-motion";
import { 
  Anchor, 
  Scroll, 
  Code, 
  Utensils, 
  Moon, 
  Sun, 
  Hourglass, 
  Swords, 
  Trophy,
  Map, 
  Compass,
  Sparkles
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ── Milestone Data with Lucide Icons ── */
const MILESTONES = [
  {
    id: "checkin", day: "Day 1", time: "09:00 AM",
    title: "Set Sail!", subtitle: "Check-in & Swag",
    desc: "Arrive at port, collect your treasure chest swag bag and meet your crewmates.",
    Icon: Anchor, color: "#8B5E3C",
  },
  {
    id: "opening", day: "Day 1", time: "10:30 AM",
    title: "Captain's Orders", subtitle: "Opening Ceremony",
    desc: "The Grand Admiral reveals the challenge scroll. The voyage officially begins!",
    Icon: Scroll, color: "#6B7F3C",
  },
  {
    id: "hacking", day: "Day 1", time: "11:30 AM",
    title: "Raise The Sails!", subtitle: "Hacking Begins",
    desc: "All hands on deck! 24 hours of intense building, creating and innovating starts now.",
    Icon: Code, color: "#3C5F8B",
  },
  {
    id: "lunch", day: "Day 1", time: "01:30 PM",
    title: "Pirate's Feast", subtitle: "Lunch Break",
    desc: "Even the fiercest pirates need to eat. Refuel before the storm hits!",
    Icon: Utensils, color: "#8B3C3C",
  },
  {
    id: "midnight", day: "Day 1", time: "11:59 PM",
    title: "Midnight Watch", subtitle: "Late Night Checkpoint",
    desc: "Coffee, sea shanties and late-night debugging. The treasure is within reach!",
    Icon: Moon, color: "#3C3C8B",
  },
  {
    id: "sunrise", day: "Day 2", time: "06:00 AM",
    title: "Dawn's Light", subtitle: "Sunrise Hustle",
    desc: "Land ho! The end is near. Final push before the storm calms.",
    Icon: Sun, color: "#8B6B3C",
  },
  {
    id: "submit", day: "Day 2", time: "11:30 AM",
    title: "Drop Anchor!", subtitle: "Submissions Close",
    desc: "Put down your weapons — hacking time is over. Present what you have built!",
    Icon: Hourglass, color: "#5C8B3C",
  },
  {
    id: "pitch", day: "Day 2", time: "12:30 PM",
    title: "Battle of Wits", subtitle: "Pitches to Judges",
    desc: "Face the tribunal. Defend your treasure in front of the fearsome judging panel.",
    Icon: Swords, color: "#8B3C6B",
  },
  {
    id: "awards", day: "Day 2", time: "03:00 PM",
    title: "Claim Your Bounty", subtitle: "Closing & Awards",
    desc: "The ultimate pirate claims the greatest treasure. Legends are born today!",
    Icon: Trophy, color: "#D4AF37",
    isFinal: true,
  },
];

/* ── Precise S-Curve Path passing through all 9 well-spaced milestone nodes ── */
const PATH_D = "M 375,120 C 470,120 560,230 470,340 C 370,450 190,470 280,580 C 370,690 560,710 470,820 C 370,930 190,950 280,1060 C 370,1170 560,1190 470,1300 C 370,1410 190,1430 280,1540 C 370,1650 560,1670 470,1780 C 380,1890 375,1950 375,2020";

/* ── Hand-Drawn Paper Map Sketch Overlay SVGs (Islands, Ships, Kraken & Grid) ── */
const PaperMapSketches = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Hand-Drawn Water Waves */}
    <path d="M 120,200 Q 130,190 140,200 Q 150,210 160,200" stroke="#7A4E2D" strokeWidth="1.5" fill="none" />
    <path d="M 580,450 Q 590,440 600,450 Q 610,460 620,450" stroke="#7A4E2D" strokeWidth="1.5" fill="none" />
    <path d="M 150,800 Q 160,790 170,800 Q 180,810 190,800" stroke="#7A4E2D" strokeWidth="1.5" fill="none" />
    <path d="M 550,1150 Q 560,1140 570,1150 Q 580,1160 590,1150" stroke="#7A4E2D" strokeWidth="1.5" fill="none" />
    <path d="M 160,1650 Q 170,1640 180,1650 Q 190,1660 200,1650" stroke="#7A4E2D" strokeWidth="1.5" fill="none" />
    
    {/* Hand-Drawn Island 1 (Skull Island Sketch) near y=420 */}
    <g transform="translate(100, 420) scale(0.85)">
      <path d="M 10 40 Q 30 10 70 20 Q 110 30 100 70 Q 80 100 40 90 Q 5 80 10 40 Z" fill="#8B6B3F" opacity="0.15" stroke="#5C3A1E" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M 35 45 Q 45 30 65 45" fill="none" stroke="#5C3A1E" strokeWidth="1" />
      <text x="35" y="65" fontSize="9" fontFamily="Pirata One" fill="#5C3A1E">Isle of Code</text>
    </g>

    {/* Hand-Drawn Island 2 (Treasure Cove Sketch) near y=1400 */}
    <g transform="translate(560, 1400) scale(0.9)">
      <path d="M 20 20 Q 60 5 90 35 Q 110 75 70 95 Q 20 110 10 60 Z" fill="#8B6B3F" opacity="0.15" stroke="#5C3A1E" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="22" y="55" fontSize="9" fontFamily="Pirata One" fill="#5C3A1E">Bounty Cove</text>
    </g>

    {/* Hand-Drawn Mini Pirate Ship Sketches sailing on paper map */}
    <g transform="translate(520, 220) scale(0.7)">
      <path d="M 0 20 L 30 20 L 25 30 L 5 30 Z" fill="#5C3A1E" />
      <line x1="15" y1="20" x2="15" y2="5" stroke="#5C3A1E" strokeWidth="1.5" />
      <path d="M 15 5 Q 25 10 15 17 Z" fill="#7A4E2D" />
    </g>
    <g transform="translate(140, 1850) scale(0.65)">
      <path d="M 0 20 L 30 20 L 25 30 L 5 30 Z" fill="#5C3A1E" />
      <line x1="15" y1="20" x2="15" y2="5" stroke="#5C3A1E" strokeWidth="1.5" />
      <path d="M 15 5 Q 25 10 15 17 Z" fill="#7A4E2D" />
    </g>

    {/* Sea Monster Sketch (Kraken Tentacles) */}
    <g transform="translate(580, 720) scale(0.6)" opacity="0.8">
      <path d="M 10,50 Q 20,10 40,30 Q 30,70 10,50 Z" fill="#5C3A1E" />
      <path d="M 30,60 Q 50,20 70,40 Q 50,80 30,60 Z" fill="#5C3A1E" />
      <path d="M 50,70 Q 80,30 95,55 Q 70,95 50,70 Z" fill="#5C3A1E" />
    </g>

    {/* Map Grid Coordinates Line Markings */}
    <line x1="50" y1="0" x2="50" y2="2150" stroke="#8B6B3F" strokeWidth="0.5" strokeDasharray="6 6" />
    <line x1="700" y1="0" x2="700" y2="2150" stroke="#8B6B3F" strokeWidth="0.5" strokeDasharray="6 6" />
    <line x1="0" y1="400" x2="750" y2="400" stroke="#8B6B3F" strokeWidth="0.5" strokeDasharray="6 6" />
    <line x1="0" y1="1000" x2="750" y2="1000" stroke="#8B6B3F" strokeWidth="0.5" strokeDasharray="6 6" />
    <line x1="0" y1="1600" x2="750" y2="1600" stroke="#8B6B3F" strokeWidth="0.5" strokeDasharray="6 6" />
  </svg>
);

/* ── Compass Rose SVG ── */
const CompassRose = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#8B6B3F" strokeWidth="1.5" opacity="0.6"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="#8B6B3F" strokeWidth="0.8" opacity="0.4"/>
    <polygon points="50,8 54,46 50,50 46,46" fill="#8B3C3C" opacity="0.9"/>
    <polygon points="50,92 54,54 50,50 46,54" fill="#5C3A1E" opacity="0.7"/>
    <polygon points="8,50 46,46 50,50 46,54" fill="#5C3A1E" opacity="0.7"/>
    <polygon points="92,50 54,54 50,50 54,46" fill="#5C3A1E" opacity="0.7"/>
    <text x="50" y="5" textAnchor="middle" fontSize="8" fill="#8B3C3C" fontWeight="bold">N</text>
    <text x="50" y="99" textAnchor="middle" fontSize="7" fill="#5C3A1E">S</text>
    <text x="4" y="53" textAnchor="middle" fontSize="7" fill="#5C3A1E">W</text>
    <text x="97" y="53" textAnchor="middle" fontSize="7" fill="#5C3A1E">E</text>
    <circle cx="50" cy="50" r="5" fill="#D4AF37" opacity="0.8"/>
    <circle cx="50" cy="50" r="2.5" fill="#8B6B3F"/>
  </svg>
);

/* ── Island Node SVG with Icon ── */
const IslandNode = ({ Icon, isFinal, color }) => (
  <div className="relative group cursor-pointer">
    {isFinal && (
      <>
        <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-35 scale-150" />
        <div className="absolute -inset-2 rounded-full bg-amber-400/20 blur-md animate-pulse" />
      </>
    )}
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 group-hover:scale-125 relative z-10 shadow-[0_10px_25px_rgba(0,0,0,0.3)] group-hover:shadow-[0_15px_35px_rgba(212,175,55,0.5)] ${
        isFinal ? "ring-4 ring-amber-400/50" : ""
      }`}
      style={{
        background: isFinal
          ? "radial-gradient(circle at 30% 30%, #fef08a, #d97706)"
          : `radial-gradient(circle at 30% 30%, ${color}44, ${color}cc)`,
        borderColor: isFinal ? "#F59E0B" : color,
        boxShadow: isFinal
          ? "0 10px 30px rgba(245,158,11,0.6), inset 0 2px 6px rgba(255,255,255,0.7)"
          : `0 8px 24px ${color}55, inset 0 2px 4px rgba(255,255,255,0.4)`
      }}
    >
      <Icon className={`w-7 h-7 ${isFinal ? "text-amber-950" : "text-white"} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} strokeWidth={2.4} />
    </div>
    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-800 rounded-full border-2 border-amber-300 flex items-center justify-center text-amber-200 text-[10px] font-bold z-20 shadow-md">
      ✦
    </div>
  </div>
);

/* ── MAIN COMPONENT ── */
const TreasureMapTimeline = () => {
  const sectionRef = useRef(null);
  const shipRef = useRef(null);
  const shipRockRef = useRef(null);
  const pathRef = useRef(null);

  // Exact 9 Generously Spaced Node Positions along Height = 2150
  const NODES = [
    { x: 375, y: 120 },  // 0. Set Sail! (Boat starts here) -> Card Right
    { x: 470, y: 340 },  // 1. Opening -> Card Left
    { x: 280, y: 580 },  // 2. Hacking -> Card Right
    { x: 470, y: 820 },  // 3. Lunch -> Card Left
    { x: 280, y: 1060 }, // 4. Midnight -> Card Right
    { x: 470, y: 1300 }, // 5. Dawn -> Card Left
    { x: 280, y: 1540 }, // 6. Drop Anchor -> Card Right
    { x: 470, y: 1780 }, // 7. Battle of Wits -> Card Left
    { x: 375, y: 2020 }, // 8. Bounty Trophy -> Card Right / Center
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let ctx = gsap.context(() => {
      if (shipRef.current && pathRef.current) {
        // Realistic Sailing Motion along SVG path with automatic rotation
        gsap.to(shipRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
            start: 0,
            end: 1,
          },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 15%",
            end: "bottom 90%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // Gentle Swaying Water Pitch on inner ship container
      if (shipRockRef.current) {
        gsap.to(shipRockRef.current, {
          rotation: 6,
          transformOrigin: "50% 50%",
          yoyo: true,
          repeat: -1,
          duration: 2,
          ease: "sine.easeInOut",
        });
      }

      // Glowing golden trail drawn in sync with scroll
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength?.() || 2900;
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 15%",
            end: "bottom 90%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // Milestone cards pop-in animation
      gsap.utils.toArray(".milestone-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.88,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    const refreshST = () => {
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(refreshST, 300);
    const timer2 = setTimeout(refreshST, 1000);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(refreshST);
    }

    window.addEventListener("load", refreshST);
    window.addEventListener("resize", refreshST);

    let ro;
    if (typeof ResizeObserver !== "undefined" && sectionRef.current) {
      ro = new ResizeObserver(refreshST);
      ro.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener("load", refreshST);
      window.removeEventListener("resize", refreshST);
      if (ro) ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden py-20"
      style={{
        background: "linear-gradient(180deg, #f5e6c8 0%, #edd9b5 30%, #e8d0a0 60%, #dfc090 100%)",
      }}
    >
      {/* ── Parchment Texture ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")
        `,
        mixBlendMode: "multiply",
        opacity: 0.5,
      }} />

      {/* ── Burnt Vignette ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at center, transparent 40%, rgba(101,67,33,0.4) 100%),
          linear-gradient(to bottom, rgba(101,67,33,0.25) 0%, transparent 8%, transparent 92%, rgba(101,67,33,0.3) 100%)
        `,
      }} />

      {/* ── Border Frame ── */}
      <div className="absolute inset-4 border-4 border-dashed border-amber-900/30 rounded-none pointer-events-none" />
      <div className="absolute inset-6 border border-amber-800/20 pointer-events-none" />

      {/* ── Compass Rose (top-left) ── */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-40 pointer-events-none">
        <CompassRose />
      </div>

      {/* ── Section Header ── */}
      <div className="text-center mb-12 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center p-3 rounded-full bg-amber-900/10 border border-amber-800/30 mb-3 shadow-md"
        >
          <Map className="w-8 h-8 text-amber-900" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Pirata_One'] text-5xl md:text-7xl text-amber-950 mb-3"
          style={{ textShadow: "3px 3px 0px rgba(101,67,33,0.3), 0 0 30px rgba(212,175,55,0.3)" }}
        >
          The Voyage Map
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-amber-900 text-lg font-['Cormorant_Garamond'] italic max-w-xl mx-auto font-medium"
        >
          "Follow the winding path, brave the stormy seas, and claim the ultimate treasure."
        </motion.p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-800/50" />
          <Compass className="w-5 h-5 text-amber-800" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-800/50" />
        </div>
      </div>

      {/* ── MAP AREA ── */}
      {/* MOBILE TIMELINE: simple stacked list, avoids overlap on small screens */}
      <div className="sm:hidden px-4 space-y-5 relative z-10">
        {MILESTONES.map((ms) => (
          <div
            key={ms.id}
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(248,238,216,0.98) 0%, rgba(238,220,188,0.98) 100%)",
              border: `1px solid ${ms.color}66`,
              boxShadow: `0 15px 35px -5px rgba(80,50,20,0.35), 0 0 20px ${ms.color}22`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0"
                style={{ background: `${ms.color}33`, borderColor: ms.color }}
              >
                <ms.Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mr-2"
                  style={{ background: ms.color + "22", color: ms.color, border: `1px solid ${ms.color}44` }}
                >
                  {ms.day}
                </span>
                <span className="text-[11px] text-amber-900/80 font-['Cinzel'] font-semibold">{ms.time}</span>
              </div>
            </div>
            <h3 className="font-['Pirata_One'] text-lg text-amber-950 leading-tight mb-0.5">{ms.title}</h3>
            <p className="text-[11px] font-bold text-amber-800/90 uppercase tracking-wider mb-1.5 font-['Cinzel']">{ms.subtitle}</p>
            <p className="text-[12.5px] text-amber-950/80 leading-relaxed font-['Cormorant_Garamond'] italic">{ms.desc}</p>
            {ms.isFinal && (
              <div className="mt-2.5 pt-2 border-t border-amber-700/20 text-center flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-700 font-bold text-[11px] font-['Cinzel'] uppercase tracking-widest">X Marks The Spot</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto hidden sm:block" style={{ maxWidth: 750, minHeight: 2150 }}>
        {/* Hand-Drawn Paper Map Sketch Overlay */}
        <PaperMapSketches />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 750 2150"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hullWood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2b1404"/>
              <stop offset="50%" stopColor="#4a2506"/>
              <stop offset="100%" stopColor="#2b1404"/>
            </linearGradient>
            <linearGradient id="whiteGalleonSail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="50%" stopColor="#f8fafc"/>
              <stop offset="100%" stopColor="#e2e8f0"/>
            </linearGradient>
          </defs>

          {/* Guide Path Shadows & Dashes */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.2"
          />
          <path
            d={PATH_D}
            fill="none"
            stroke="#8B6B3F"
            strokeWidth="3"
            strokeDasharray="14 8"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Active Glowing Drawn Path */}
          <path
            ref={pathRef}
            id="voyage-path"
            d={PATH_D}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* ── REALISTIC DETAILED PIRATE GALLEON (Native SVG MotionPath) ── */}
          <g ref={shipRef} id="ship-group" style={{ pointerEvents: 'none' }}>
            {/* Ambient water glow */}
            <circle cx="0" cy="0" r="40" fill="#D4AF37" opacity="0.22" />
            <circle cx="0" cy="0" r="26" fill="#FDE047" opacity="0.3" />

            {/* Rocking ship container centered around (0,0) */}
            <g ref={shipRockRef} transform="translate(-40, -48) scale(0.8)">
              {/* Ship Hull (Curved Bow Pointing Top Y=10) */}
              <path d="M 50 10 Q 75 40 72 95 Q 50 115 28 95 Q 25 40 50 10 Z" fill="url(#hullWood)" stroke="#1a0c02" strokeWidth="2" />
              <path d="M 50 15 Q 68 42 66 90 Q 50 105 34 90 Q 32 42 50 15 Z" fill="#3b1d05" />

              {/* Deck Planks */}
              <line x1="36" y1="40" x2="64" y2="40" stroke="#251203" strokeWidth="1" />
              <line x1="34" y1="60" x2="66" y2="60" stroke="#251203" strokeWidth="1" />
              <line x1="32" y1="80" x2="68" y2="80" stroke="#251203" strokeWidth="1" />

              {/* Bowsprit Pole (Front Spike) */}
              <line x1="50" y1="15" x2="50" y2="2" stroke="#1a0c02" strokeWidth="3" strokeLinecap="round" />

              {/* Foremast Yards & Pure White Sails */}
              <line x1="20" y1="35" x2="80" y2="35" stroke="#1a0c02" strokeWidth="2.5" />
              <path d="M 22 35 Q 50 22 78 35 Q 50 44 22 35 Z" fill="url(#whiteGalleonSail)" stroke="#94a3b8" strokeWidth="1" />

              {/* Mainmast Yards & Main White Sail */}
              <line x1="12" y1="62" x2="88" y2="62" stroke="#1a0c02" strokeWidth="3" />
              <path d="M 14 62 Q 50 48 86 62 Q 50 74 14 62 Z" fill="url(#whiteGalleonSail)" stroke="#94a3b8" strokeWidth="1" />

              {/* Mizzenmast Yard & Rear White Sail */}
              <line x1="25" y1="85" x2="75" y2="85" stroke="#1a0c02" strokeWidth="2" />
              <path d="M 27 85 Q 50 75 73 85 Q 50 94 27 85 Z" fill="url(#whiteGalleonSail)" stroke="#94a3b8" strokeWidth="1" />

              {/* Jolly Roger Pirate Flag on Mainmast Top */}
              <g transform="translate(50, 52)">
                <rect x="0" y="-8" width="14" height="9" fill="#0f172a" rx="1" />
                <circle cx="7" cy="-4" r="1.8" fill="#ffffff" />
                <line x1="4" y1="-2" x2="10" y2="-6" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="10" y1="-2" x2="4" y2="-6" stroke="#ffffff" strokeWidth="0.8" />
              </g>

              {/* Pure White / Silver Side Shields */}
              <circle cx="28" cy="55" r="2.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.5" />
              <circle cx="72" cy="55" r="2.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.5" />
              <circle cx="30" cy="75" r="2.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.5" />
              <circle cx="70" cy="75" r="2.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.5" />
            </g>
          </g>
        </svg>

        {/* ── MILESTONE CARDS (Non-Overlapping & Spaced Out) ── */}
        {MILESTONES.map((ms, i) => {
          const node = NODES[i] || NODES[NODES.length - 1];
          const goesLeft = i % 2 === 1; // Alternating sides

          return (
            <div
              key={ms.id}
              className="milestone-card absolute"
              style={{
                left: `${(node.x / 750) * 100}%`,
                top: `${(node.y / 2150) * 100}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 20,
              }}
            >
              <div className="flex flex-col items-center">
                <IslandNode Icon={ms.Icon} isFinal={ms.isFinal} color={ms.color} />

                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-52 sm:w-64 md:w-72
                    ${goesLeft ? "right-[120%]" : "left-[120%]"}
                  `}
                >
                  <div
                    className="rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, rgba(248,238,216,0.98) 0%, rgba(238,220,188,0.98) 100%)",
                      border: `1px solid ${ms.color}66`,
                      boxShadow: `0 15px 35px -5px rgba(80,50,20,0.35), 0 0 20px ${ms.color}22, inset 0 1px 0 rgba(255,255,255,0.6)`,
                    }}
                  >
                    {/* Ambient Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                      style={{ boxShadow: `0 0 30px ${ms.color}55` }}
                    />

                    {/* Corner Flourishes */}
                    <div className="absolute top-1.5 left-2 text-amber-800/40 text-xs select-none">✦</div>
                    <div className="absolute top-1.5 right-2 text-amber-800/40 text-xs select-none">✦</div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm"
                          style={{ background: ms.color + "22", color: ms.color, border: `1px solid ${ms.color}44` }}
                        >
                          {ms.day}
                        </span>
                        <span className="text-[11px] text-amber-900/80 font-['Cinzel'] font-semibold">{ms.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-['Pirata_One'] text-xl text-amber-950 leading-tight">
                          {ms.title}
                        </h3>
                      </div>

                      <p className="text-[11px] font-bold text-amber-800/90 uppercase tracking-wider mb-1.5 font-['Cinzel']">
                        {ms.subtitle}
                      </p>

                      <p className="text-[12.5px] text-amber-950/80 leading-relaxed font-['Cormorant_Garamond'] italic">
                        {ms.desc}
                      </p>

                      {ms.isFinal && (
                        <div className="mt-2.5 pt-2 border-t border-amber-700/20 text-center flex items-center justify-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                          <span className="text-amber-700 font-bold text-[11px] font-['Cinzel'] uppercase tracking-widest">
                            X Marks The Spot
                          </span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                        </div>
                      )}
                    </div>

                    {/* Arrow Pointer */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-0 h-0
                        ${goesLeft
                          ? "right-0 translate-x-full border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent border-l-[10px]"
                          : "left-0 -translate-x-full border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent border-r-[10px]"
                        }
                      `}
                      style={{
                        borderLeftColor: goesLeft ? "rgba(238,220,188,0.98)" : "transparent",
                        borderRightColor: !goesLeft ? "rgba(238,220,188,0.98)" : "transparent",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TreasureMapTimeline;


