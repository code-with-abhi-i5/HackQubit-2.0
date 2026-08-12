import React, { useState } from "react";
import { motion } from "framer-motion";
import SponsorshipDetailsModal from "./SponsorshipDetailsModal";

// Import 3 Pirate Character Assets
import pirateCaptainImg from "../assets/images/pirate_captain.webp";
import pirateFemaleImg from "../assets/images/pirate_female.webp";
import pirateSwashbucklerImg from "../assets/images/pirate_swashbuckler.webp";
import bgStorySponsorPackage from "../assets/images/bg_story_sponsor_package.webp";
import GoldRainParticles from "./GoldRainParticles";
import PirateRopeCannonSidebar from "./PirateRopeCannonSidebar";

/* ─── Thick Side Ropes ─── */
const SideThickRopes = () => (
  <>
    {/* Left Vertical Hanging Rope */}
    <div
      className="absolute top-0 left-2 sm:left-6 w-3 sm:w-4 bottom-0 z-20 pointer-events-none opacity-80"
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          #92400e 0px,
          #92400e 8px,
          #78350f 8px,
          #78350f 16px,
          #b45309 16px,
          #b45309 24px
        )`,
        boxShadow: "inset 2px 0 4px rgba(0,0,0,0.6), 4px 0 12px rgba(0,0,0,0.4)",
      }}
    />
    {/* Right Vertical Hanging Rope */}
    <div
      className="absolute top-0 right-2 sm:right-6 w-3 sm:w-4 bottom-0 z-20 pointer-events-none opacity-80"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          #92400e 0px,
          #92400e 8px,
          #78350f 8px,
          #78350f 16px,
          #b45309 16px,
          #b45309 24px
        )`,
        boxShadow: "inset -2px 0 4px rgba(0,0,0,0.6), -4px 0 12px rgba(0,0,0,0.4)",
      }}
    />
  </>
);

const SPONSOR_TIERS = [
  {
    title: "Bronze Doubloon",
    badge: "Quartermaster Tier",
    price: "₹15,000",
    color: "from-amber-900/10 via-amber-800/15 to-amber-900/10 border-amber-900/40 text-amber-950",
    badgeColor: "bg-amber-900/20 text-amber-950 border-amber-900/40",
    characterImg: pirateCaptainImg,
    characterAlt: "Pirate Captain",
    features: [
      "Logo on event website & social media shoutout",
      "Option to distribute digital swag & vouchers",
      "Mention in opening & closing ceremonies",
      "1 booth space in virtual / physical expo",
      "Access to opt-in hacker resume database",
    ],
  },
  {
    title: "Silver Treasure",
    badge: "First Mate Tier",
    price: "₹30,000",
    color: "from-slate-300/30 via-slate-200/40 to-slate-400/30 border-slate-400/60 text-slate-900",
    badgeColor: "bg-slate-700/20 text-slate-950 border-slate-500/50",
    characterImg: pirateFemaleImg,
    characterAlt: "Pirate Female Navigator",
    features: [
      "Medium logo on website, banners & t-shirts",
      "5-minute product demo / workshop slot",
      "Distribute physical swag & branded merchandise",
      "2 mentor seats for your technical team",
      "Direct channel in event Discord for support",
      "Access to full hacker resume database",
    ],
  },
  {
    title: "Gold Chest",
    badge: "Captain Tier",
    price: "₹50,000+",
    color: "from-amber-400/25 via-amber-300/35 to-amber-500/25 border-amber-500/70 text-amber-950",
    badgeColor: "bg-amber-500/30 text-amber-950 border-amber-600/60 font-bold",
    characterImg: pirateSwashbucklerImg,
    characterAlt: "Pirate Swashbuckler Hero",
    features: [
      "Exclusive 'Presented By [Your Brand]' branding",
      "Prime keynote slot at Opening & Grand Finale",
      "VIP judging panel seat & awards presentation",
      "Custom branded hackathon track & API challenge",
      "First access to top hacker talent & recruitment",
      "Full post-event analytics & media coverage feature",
    ],
  },
];

const SponsorPackage = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <section id="sponsorship" className="py-28 relative px-6 max-w-7xl mx-auto overflow-hidden text-amber-950">
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM WITH TOP GRADIENT BLEND ── */}
      <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStorySponsorPackage}
          alt="Pirate Sponsorship Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>

      {/* Thick Side Ropes with Shadow */}
      <SideThickRopes />

      {/* Section Header */}
      <div className="text-center mb-28 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black font-cinzel text-amber-950 mb-4 tracking-wide"
        >
          Sponsor <span className="text-amber-800">The Voyage</span>
        </motion.h2>
        <p className="text-base sm:text-lg text-amber-900 font-bold max-w-2xl mx-auto font-cinzel leading-relaxed">
          Join our crew and help make HackQubit 2.0 an unforgettable adventure. Choose your sponsorship package below.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 pt-16 relative z-10">
        {SPONSOR_TIERS.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 pt-20 shadow-2xl border-2 border-amber-800/40 flex flex-col justify-between hover:border-amber-600 transition-all duration-300`}
          >
            {/* ── TOP MIDDLE BIGGER PIRATE CHARACTER (CLEAN CUTOUT, NO BACKGROUND) ── */}
            <div className="absolute -top-24 sm:-top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 transition-transform duration-500 hover:scale-110">
                <img
                  src={pkg.characterImg}
                  alt={pkg.characterAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter drop-shadow-[0_14px_24px_rgba(120,70,10,0.35)]"
                />
              </div>
            </div>

            <div>
              <div className="text-center mb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-cinzel font-black uppercase tracking-widest border ${pkg.badgeColor}`}>
                  {pkg.badge}
                </span>
              </div>
              <h3 className="text-2xl font-black font-cinzel mb-2 text-center text-amber-950">
                {pkg.title}
              </h3>
              <div className="text-3xl sm:text-4xl font-black text-amber-900 mb-6 text-center font-cinzel">
                {pkg.price}
              </div>

              <ul className="flex-grow space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-amber-950 font-bold font-cinzel text-xs sm:text-sm leading-relaxed">
                    <span className="text-amber-700 font-bold mr-2 shrink-0">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="mailto:hackqubit2.0@gmail.com"
              className="w-full py-3.5 rounded-xl font-black text-amber-50 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 hover:from-amber-700 hover:to-amber-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-cinzel tracking-wider uppercase text-xs sm:text-sm text-center block"
            >
              Become a Sponsor
            </a>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8 relative z-20">
        <button
          onClick={() => setIsDetailsOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-black text-amber-50 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-cinzel tracking-wider uppercase text-sm cursor-pointer"
        >
          Learn More ⚓
        </button>
      </div>

      {/* Sponsorship Details Modal */}
      <SponsorshipDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </section>
  );
};

export default SponsorPackage;
