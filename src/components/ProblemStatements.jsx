import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Compass, ArrowRight, Sparkles } from "lucide-react";

import emblemCompassMap from "../assets/images/emblem_compass_map.webp";
import emblemSkullAnchor from "../assets/images/emblem_skull_anchor.webp";
import emblemTreasureChest from "../assets/images/emblem_treasure_chest.webp";
import emblemPirateShip from "../assets/images/emblem_pirate_ship.webp";
import femalePirateNavigator from "../assets/images/female_pirate_navigator.webp";
import bgStoryProblemStatements from "../assets/images/bg_story_problem_statements.webp";
import GoldRainParticles from "./GoldRainParticles";
import TiltCard from "./TiltCard";

const TRACKS = [
  { title: "Healthcare & Biotech", count: "3 Bounties", badge: "Track 01", emblem: emblemCompassMap },
  { title: "AI / Machine Learning", count: "3 Bounties", badge: "Track 02", emblem: emblemSkullAnchor },
  { title: "Cybersecurity & Privacy", count: "3 Bounties", badge: "Track 03", emblem: emblemTreasureChest },
  { title: "Web3 & Blockchain", count: "3 Bounties", badge: "Track 04", emblem: emblemPirateShip },
  { title: "AI Agents Systems", count: "3 Bounties", badge: "Track 05", emblem: emblemCompassMap },
];

const ProblemStatements = ({ onOpenProblems }) => {
  const sectionRef = useRef(null);

  const handleOpen = () => {
    if (onOpenProblems) {
      onOpenProblems();
    } else {
      window.location.hash = "problems";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="problem-statements"
      className="relative py-24 px-6 bg-pirate-bg text-slate-900 overflow-hidden"
    >
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM WITH TOP GRADIENT BLEND ── */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStoryProblemStatements}
          alt="Pirate Strategy Cabin Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Female Pirate Navigator Cutout Overlay (Prominent Right Side) */}
        <div className="absolute -top-6 -right-4 md:right-0 z-30 pointer-events-none block">
          <img
            src={femalePirateNavigator}
            alt="Female Pirate Navigator"
            loading="lazy"
            decoding="async"
            className="w-36 sm:w-48 lg:w-56 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-900/40 bg-amber-500/20 mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-900 animate-pulse" />
          <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
            15 Challenge Scrolls Unfurled
          </span>
        </motion.div>

        {/* Title */}
        <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 mb-4 tracking-wide">
          Problem <span className="text-amber-800">Statements</span>
        </h2>
        <p className="font-raleway text-amber-900 font-bold text-base sm:text-lg max-w-xl mx-auto mb-16">
          The secret pirate challenges are unveiled! Choose your track and prepare for the 24-hour coding voyage.
        </p>

        {/* Main Announcement Banner with Top Vintage Emblem Logo */}
        <div className="relative rounded-3xl border-2 border-amber-700/40 bg-white/95 backdrop-blur-xl p-8 sm:p-12 shadow-2xl mb-16 max-w-3xl mx-auto text-amber-950">
          {/* Top Middle Vintage Emblem Badge Logo */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 hover:scale-110">
              <img
                src={emblemTreasureChest}
                alt="Vintage Pirate Treasure Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(120,70,10,0.35)]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 relative z-10 pt-8">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-950">
              All 15 Bounties Unlocked
            </h3>

            <p className="font-raleway text-sm sm:text-base text-amber-900 font-bold max-w-md leading-relaxed">
              Explore detailed problem briefs, build specifications, deliverables, and key challenges for each domain.
            </p>

            {/* Main Action Button to open Problem Statements Page */}
            <button
              type="button"
              onClick={handleOpen}
              className="mt-4 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-cinzel text-sm sm:text-base font-black tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-amber-300" />
              <span>View All Problem Statements</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>
          </div>
        </div>

        {/* Tracks Grid Preview with Top Vintage Emblems & 3D Tilt */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
          {TRACKS.map((t) => (
            <div
              key={t.badge}
              onClick={handleOpen}
              className="cursor-pointer"
            >
              <TiltCard
                className="p-5 pt-9 rounded-2xl border border-amber-900/20 bg-white/90 backdrop-blur-md flex flex-col items-center gap-2.5 hover:border-amber-700 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Top Middle Vintage Emblem Logo */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-14 h-14">
                  <img
                    src={t.emblem}
                    alt={t.title}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <span className="text-[10px] font-black tracking-widest text-amber-800 uppercase mt-2">
                  {t.badge}
                </span>
                <h4 className="font-cinzel text-xs sm:text-sm font-extrabold text-amber-950 group-hover:text-amber-800 transition-colors leading-snug text-center">
                  {t.title}
                </h4>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  {t.count}
                </span>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatements;
