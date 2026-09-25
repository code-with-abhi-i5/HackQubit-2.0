import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Download } from "lucide-react";
import femalePirateQuartermaster from "../assets/images/female_pirate_quartermaster.webp";
import bgStoryOurSponsors from "../assets/images/bg_story_our_sponsors.webp";
import GoldRainParticles from "./GoldRainParticles";

// Sponsor logos
import royalEnfieldLogo from "../assets/images/royal_enfield_logo.png";
import izzkiLogo from "../assets/images/logo-1.png";
import orbingerLogo from "../assets/images/orbinger_logo.png";

const SPONSORS_DATA = [
  {
    name: "Royal Enfield",
    logo: royalEnfieldLogo,
    website: "https://www.royalenfield.com",
    logoClass: "max-h-11 sm:max-h-12 w-auto object-contain",
  },
  {
    name: "Izzki Tech Solutions",
    logo: izzkiLogo,
    website: "https://izzki.com",
    logoClass: "max-h-11 sm:max-h-12 w-auto object-contain",
  },
  {
    name: "Orbinger India",
    logo: orbingerLogo,
    website: "https://orbingerindia.com",
    logoClass: "max-h-12 sm:max-h-14 w-auto object-contain",
  },
];

const OurSponsors = () => {
  return (
    <section
      id="our-sponsors"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-pirate-bg text-amber-950 overflow-hidden"
    >
      <GoldRainParticles />

      {/* ── LANDSCAPE ANIME STORY BACKGROUND AT BOTTOM ── */}
      <div className="absolute inset-x-0 bottom-0 h-[350px] sm:h-[450px] pointer-events-none z-0 overflow-hidden">
        <img
          src={bgStoryOurSponsors}
          alt="Pirate Sponsors Armada Story"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-bottom opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pirate-bg/40 to-pirate-bg" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Female Pirate Quartermaster Overlay */}
        <div className="absolute -top-10 -left-2 md:-left-6 z-30 pointer-events-none block">
          <img
            src={femalePirateQuartermaster}
            alt="Female Pirate Quartermaster"
            loading="lazy"
            decoding="async"
            className="w-24 sm:w-32 lg:w-40 h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-900/40 bg-amber-500/20 mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900" />
            <span className="font-cinzel text-xs tracking-widest text-amber-950 uppercase font-extrabold">
              Voyage Alliance
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 mb-2 tracking-wide"
          >
            Our <span className="text-amber-800">Sponsors</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-raleway text-amber-900 font-bold text-sm sm:text-base"
          >
            The esteemed partners and visionaries backing HackQubit 2.0.
          </motion.p>
        </div>

        {/* ── SIMPLE & COMPACT SPONSORS GRID (LOGO + COMPANY NAME ONLY) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-10">
          {SPONSORS_DATA.map((sponsor, index) => (
            <motion.a
              key={sponsor.name}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/95 hover:bg-white border border-amber-800/25 hover:border-amber-600/70 shadow-sm hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              {/* Logo Area */}
              <div className="w-full h-16 sm:h-20 flex items-center justify-center p-2">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  loading="lazy"
                  className={`${sponsor.logoClass} group-hover:scale-105 transition-transform duration-300`}
                />
              </div>

              {/* Company Name */}
              <span className="font-cinzel text-sm sm:text-base font-bold text-amber-950 group-hover:text-amber-800 transition-colors duration-300 mt-2">
                {sponsor.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Download Brochure Link */}
        <div className="text-center">
          <a
            href="/HackQubit2.0SponsorshipBrochure.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-extrabold text-amber-50 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 shadow-md hover:shadow-amber-900/30 hover:scale-105 transition-all duration-300 uppercase tracking-wider border border-amber-600/40"
          >
            <Download className="w-4 h-4" />
            Download Sponsorship Brochure
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurSponsors;
