import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MapPin, X, ChevronRight, Trophy, Sparkles, Anchor, ShieldAlert } from "lucide-react";

import emblemCompassMap from "../assets/images/emblem_compass_map.png";
import emblemSkullAnchor from "../assets/images/emblem_skull_anchor.png";
import emblemTreasureChest from "../assets/images/emblem_treasure_chest.png";
import emblemPirateShip from "../assets/images/emblem_pirate_ship.png";

const WAYPOINTS = [
  {
    id: 1,
    title: "Port of Registration",
    subtitle: "Check-In & Team Assembly",
    time: "Day 1 • 08:30 AM",
    x: "15%",
    y: "35%",
    icon: "⚓",
    emblem: emblemSkullAnchor,
    desc: "All hacker crews arrive at RVSCET Jamshedpur, claim their pirate welcome kits, set up dev stations, and complete team badge verifications.",
    checklist: [
      "ID Verification & Welcome Kit Claim",
      "Assign Dev Station & Power Hookups",
      "Network Setup & Discord Sync",
    ],
  },
  {
    id: 2,
    title: "Bay of Code",
    subtitle: "Problem Statements Revealed",
    time: "Day 1 • 10:00 AM",
    x: "35%",
    y: "65%",
    icon: "📜",
    emblem: emblemCompassMap,
    desc: "The sealed problem statements are unveiled live on stage! 24 hours of non-stop coding commence. No pre-built code allowed.",
    checklist: [
      "Live Challenge Unveiling on Main Screen",
      "Track Selection & Strategy Alignment",
      "GitHub Repo Creation & First Commit",
    ],
  },
  {
    id: 3,
    title: "Midnight Captain's Feast",
    subtitle: "Mentorship & Energy Refuel",
    time: "Day 1 • 11:30 PM",
    x: "58%",
    y: "28%",
    icon: "🍖",
    emblem: emblemPirateShip,
    desc: "Refuel with midnight snacks, hot beverages, and mini gaming side-quests. Industry mentors conduct 1-on-1 desk reviews to refine your project.",
    checklist: [
      "1-on-1 Mentor Architecture Review",
      "Midnight Snack Buffet & Energy Drinks",
      "Valorant / FIFA Mini Side-Quests",
    ],
  },
  {
    id: 4,
    title: "Pitch Island",
    subtitle: "Project Code Freeze & Demos",
    time: "Day 2 • 10:00 AM",
    x: "78%",
    y: "55%",
    icon: "⚔️",
    emblem: emblemSkullAnchor,
    desc: "Code freeze! Hacker crews submit their repositories and present live 3-minute pitches to the grand judging panel.",
    checklist: [
      "Final Code Commit & Video Demo Upload",
      "Live 3-Min Pitch to Grand Jury",
      "Q&A & Technical Architecture Audit",
    ],
  },
  {
    id: 5,
    title: "Treasure Vault",
    subtitle: "Grand Bounty Award Ceremony",
    time: "Day 2 • 01:00 PM",
    x: "90%",
    y: "25%",
    icon: "👑",
    emblem: emblemTreasureChest,
    desc: "The victorious crews claim the ₹30,000+ bounty pool, trophies, certificates, and direct sponsor recruitment offers!",
    checklist: [
      "1st, 2nd, 3rd Winner Announcement",
      "Trophy & Cash Bounty Distribution",
      "Sponsor Recruitment Offer Handouts",
    ],
  },
];

const TreasureMapQuest = () => {
  const [selectedWaypoint, setSelectedWaypoint] = useState(WAYPOINTS[0]);

  return (
    <section id="quest-map" className="relative py-28 px-6 bg-pirate-bg text-amber-950 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-900/40 bg-amber-500/20 mb-4 shadow-sm"
          >
            <Compass className="w-4 h-4 text-amber-900 animate-spin" />
            <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
              Interactive Voyage Route
            </span>
          </motion.div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 tracking-wide">
            Treasure <span className="text-amber-800">Map &amp; Quest</span>
          </h2>
          <p className="mt-4 font-raleway text-amber-900 font-bold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Click on any map waypoint to explore the 24-hour hackathon journey from arrival to the grand bounty vault!
          </p>
        </div>

        {/* ── PARCHMENT TREASURE MAP BOARD ── */}
        <div
          className="relative w-full h-[450px] sm:h-[520px] rounded-3xl border-4 border-[#522d13] p-6 shadow-[0_25px_50px_rgba(0,0,0,0.4)] overflow-hidden select-none"
          style={{
            background: "linear-gradient(180deg, #f7efe1 0%, #eddcc4 50%, #e0c8a6 100%)",
            boxShadow: "inset 0 0 40px rgba(120,70,10,0.3), 0 20px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Grid lines map texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Dotted Route Line Path connecting waypoints */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <path
              d="M 15% 35% Q 25% 65% 35% 65% T 58% 28% T 78% 55% T 90% 25%"
              fill="none"
              stroke="#92400e"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="drop-shadow-sm"
            />
          </svg>

          {/* Map Compass Rose Watermark */}
          <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
            <Compass className="w-32 h-32 text-amber-900" />
          </div>

          {/* Clickable Waypoint Pins */}
          {WAYPOINTS.map((wp) => {
            const isSelected = selectedWaypoint.id === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => setSelectedWaypoint(wp)}
                style={{ left: wp.x, top: wp.y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 flex flex-col items-center focus:outline-none`}
              >
                {/* Pin Pulse Glow */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all duration-300 border-2 ${
                    isSelected
                      ? "bg-amber-600 border-amber-950 scale-125 ring-4 ring-amber-500/50"
                      : "bg-amber-900/90 border-amber-400 group-hover:scale-110 group-hover:bg-amber-800"
                  }`}
                >
                  <span className="transform group-hover:scale-110 transition-transform">
                    {wp.icon}
                  </span>
                </div>

                {/* Waypoint Label Badge */}
                <div className="mt-2 px-3 py-1 rounded-full bg-amber-950/90 text-amber-100 font-cinzel text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md whitespace-nowrap border border-amber-700/50">
                  {wp.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── SELECTED WAYPOINT DETAIL PARCHMENT MODAL / CARD ── */}
        <AnimatePresence mode="wait">
          {selectedWaypoint && (
            <motion.div
              key={selectedWaypoint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-3xl border-2 border-amber-900/30 bg-white/95 backdrop-blur-xl p-8 shadow-2xl relative text-amber-950"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                
                {/* Left Emblem + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-50 border border-amber-300 p-2 flex items-center justify-center shrink-0 shadow-md">
                    <img
                      src={selectedWaypoint.emblem}
                      alt={selectedWaypoint.title}
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-800/30 text-amber-950 font-cinzel text-[10px] font-black uppercase tracking-wider mb-1">
                      <span>{selectedWaypoint.time}</span>
                    </div>
                    <h3 className="font-cinzel text-2xl font-black text-amber-950">
                      {selectedWaypoint.title}
                    </h3>
                    <p className="font-raleway text-xs font-extrabold text-amber-800 uppercase tracking-widest mb-2">
                      {selectedWaypoint.subtitle}
                    </p>
                    <p className="font-raleway text-sm font-bold text-amber-900 leading-relaxed max-w-xl">
                      {selectedWaypoint.desc}
                    </p>
                  </div>
                </div>

                {/* Right Checklist Requirements */}
                <div className="w-full md:w-80 bg-amber-50/90 rounded-2xl border border-amber-300/80 p-5 shrink-0">
                  <h4 className="font-cinzel text-xs font-black text-amber-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-800" />
                    <span>Waypoint Objectives</span>
                  </h4>
                  <ul className="flex flex-col gap-2 font-cinzel text-xs text-amber-900 font-extrabold">
                    {selectedWaypoint.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TreasureMapQuest;

