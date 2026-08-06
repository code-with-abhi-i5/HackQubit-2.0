import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Award } from "lucide-react";

import emblemSkullAnchor from "../assets/images/emblem_skull_anchor.webp";
import emblemPirateShip from "../assets/images/emblem_pirate_ship.webp";
import emblemTreasureChest from "../assets/images/emblem_treasure_chest.webp";
import femalePirateTreasurer from "../assets/images/female_pirate_treasurer.webp";
import bgStorySponsorPerks from "../assets/images/bg_story_sponsor_perks.webp";
import GoldRainParticles from "./GoldRainParticles";

const PERKS = [
  {
    category: "Engagements & Interaction",
    badge: "Community Direct Access",
    emblem: emblemSkullAnchor,
    items: [
      "Direct live interactions with 500+ passionate developers & tech pioneers.",
      "Dedicated recruitment desk & speed-networking rounds with top hacker talent.",
      "Keynote speaking opportunity during the Opening & Grand Finale ceremony.",
      "Custom branded hackathon challenge / track creation for your product SDKs.",
    ],
  },
  {
    category: "Brand Visibility & Exposure",
    badge: "Maximum Reach",
    emblem: emblemPirateShip,
    items: [
      "Prime logo placement on main stage backdrops, banners, & official website.",
      "Prominent features in official press releases, social media shoutouts & newsletters.",
      "Exclusive brand merch distribution inside every pirate hacker welcome kit.",
      "Digital banner placements across all live streams & leaderboards.",
    ],
  },
  {
    category: "Post Event Management & Perks",
    badge: "Long-Term Value",
    emblem: emblemTreasureChest,
    items: [
      "Full access to opt-in participant resume database & project repositories.",
      "Post-event highlight video inclusion & winner showcase endorsement.",
      "Priority invitation to all future HackQubit chapters & partner summits.",
      "Detailed post-event analytics report on attendee engagement & brand impressions.",
    ],
  },
];

const SponsorPerks = () => {
  return (
    <section
      id="sponsorship-perks"
      className="relative py-28 px-6 bg-pirate-bg text-amber-950 overflow-hidden"
    >
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM WITH TOP GRADIENT BLEND ── */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStorySponsorPerks}
          alt="Pirate Alliance Port Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>
      <div className="max-w-6xl mx-auto relative z-20">
        {/* Female Pirate Treasurer Cutout Overlay (Top Right Empty Area) */}
        <div className="absolute -top-16 -right-2 md:right-4 z-30 pointer-events-none block">
          <img
            src={femalePirateTreasurer}
            alt="Female Pirate Treasurer"
            loading="lazy"
            decoding="async"
            className="w-36 sm:w-48 lg:w-56 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-900/40 bg-amber-500/20 mb-4 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
              Exclusive Partner Privileges
            </span>
          </motion.div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 tracking-wide">
            Sponsorship <span className="text-amber-800">Perks</span>
          </h2>
          <p className="mt-4 font-cinzel text-amber-900 font-bold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Partner with HackQubit 2.0 to unlock unparalleled developer engagement,
            brand prominence, and post-event talent access.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PERKS.map((perk, index) => (
            <motion.div
              key={perk.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative rounded-3xl border border-amber-900/20 bg-white/95 backdrop-blur-xl p-8 pt-12 flex flex-col justify-between hover:border-amber-700 transition-all duration-300 shadow-2xl group text-amber-950"
            >
              {/* Top Middle Vintage Emblem Logo */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-20 h-20">
                <img
                  src={perk.emblem}
                  alt={perk.category}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(120,70,10,0.3)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div>
                <div className="flex items-center justify-end mb-4">
                  <span className="text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                    {perk.badge}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl font-extrabold text-amber-950 mb-4 group-hover:text-amber-800 transition-colors">
                  {perk.category}
                </h3>

                <ul className="space-y-3 font-cinzel text-xs sm:text-sm text-amber-900 font-bold leading-relaxed">
                  {perk.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-200 flex items-center justify-between text-xs text-amber-950 font-black font-cinzel">
                <span>Included in Gold &amp; Platinum</span>
                <Award className="w-4 h-4 text-amber-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorPerks;
