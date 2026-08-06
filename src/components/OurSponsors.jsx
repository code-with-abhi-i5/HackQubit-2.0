import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Sparkles, Anchor, Download } from "lucide-react";
import emblemPirateShip from "../assets/images/emblem_pirate_ship.webp";
import femalePirateQuartermaster from "../assets/images/female_pirate_quartermaster.webp";
import bgStoryOurSponsors from "../assets/images/bg_story_our_sponsors.webp";
import GoldRainParticles from "./GoldRainParticles";

const OurSponsors = () => {
  return (
    <section
      id="our-sponsors"
      className="relative py-24 px-6 bg-pirate-bg text-amber-950 overflow-hidden"
    >
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM WITH TOP GRADIENT BLEND ── */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStoryOurSponsors}
          alt="Pirate Sponsors Armada Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Female Pirate Quartermaster Overlay (Prominent Position) */}
        <div className="absolute -top-12 -left-2 md:-left-6 z-30 pointer-events-none block">
          <img
            src={femalePirateQuartermaster}
            alt="Female Pirate Quartermaster"
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
          <Sparkles className="w-4 h-4 text-amber-900" />
          <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
            Voyage Alliance
          </span>
        </motion.div>

        {/* Title */}
        <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 mb-4 tracking-wide">
          Our <span className="text-amber-800">Sponsors</span>
        </h2>
        <p className="font-cinzel text-amber-900 font-bold text-base sm:text-lg max-w-xl mx-auto mb-6">
          The esteemed industry leaders and visionaries backing HackQubit 2.0.
        </p>

        {/* Download Sponsorship Brochure Button */}
        <a
          href="/HackQubit2SponsorshipBrochure.pdf"
          download
          className="inline-flex items-center gap-2 px-8 py-4 mb-16 rounded-xl font-cinzel text-sm sm:text-base font-extrabold text-amber-50 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 shadow-xl hover:shadow-amber-900/30 hover:scale-105 transition-all duration-300 uppercase tracking-widest border border-amber-600/40"
        >
          <Download className="w-5 h-5" />
          Download Sponsorship Brochure
        </a>

        {/* Announcement Card with Top Vintage Emblem Logo */}
        <div className="relative rounded-3xl border-2 border-dashed border-amber-700/40 bg-white/95 backdrop-blur-xl p-10 sm:p-14 shadow-2xl max-w-3xl mx-auto text-amber-950">
          {/* Top Middle Vintage Pirate Emblem Logo */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 hover:scale-110">
              <img
                src={emblemPirateShip}
                alt="Vintage Pirate Ship Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(120,70,10,0.35)]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 relative z-10 pt-4">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-950">
              Sponsors To Be Announced
            </h3>

            <p className="font-cinzel text-sm sm:text-base text-amber-900 font-bold max-w-lg leading-relaxed">
              We are finalizing strategic partnerships with world-class technology companies and sponsors. Full sponsor lineup will be revealed soon!
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="px-5 py-3 rounded-xl border border-amber-300 bg-amber-50 font-cinzel text-xs text-amber-950 font-black flex items-center gap-2 shadow-sm">
                <Anchor className="w-4 h-4 text-amber-800" />
                <span>Title Sponsor Reveal Coming Soon</span>
              </div>
              <div className="px-5 py-3 rounded-xl border border-amber-300 bg-amber-50 font-cinzel text-xs text-amber-950 font-black flex items-center gap-2 shadow-sm">
                <ShieldAlert className="w-4 h-4 text-amber-800" />
                <span>Track Partners Reveal Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSponsors;
