import React from "react";
import hackqubitJewelTitleImg from "../assets/images/hackqubit_jewel_title.png";

const HeroContent = ({ refs }) => {
  return (
    <div className="relative z-20 flex flex-col items-start justify-center max-w-4xl lg:max-w-none w-full px-6 sm:px-12 lg:px-20 pt-28 pb-16 text-left">
      {/* Small Badge / Tagline */}
      <div
        ref={refs.subtitle}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-600/40 bg-amber-500/15 mb-6 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
        <span className="font-cinzel text-xs sm:text-sm tracking-widest text-amber-900 font-extrabold uppercase">
          Annual Flagship Pirate Hackathon
        </span>
      </div>

      {/* Main Heading Graphic: "HACKQUBIT 2.0" where individual letters wear crowns, necklaces, rings & gems */}
      <div className="relative mb-6 group select-none self-end mr-4 sm:mr-8">
        <div ref={refs.headingLine1} className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px]">
          <img
            src={hackqubitJewelTitleImg}
            alt="HACKQUBIT 2.0 Pirate Jewelry Title"
            className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* Slogan Below Heading */}
      <p
        ref={refs.description}
        className="font-cinzel text-base sm:text-xl lg:text-2xl text-amber-950 font-extrabold max-w-2xl leading-relaxed mb-10 text-left"
      >
        “Sail the High Seas of Innovation, Unearth Rare Code Treasures & Conquer the Digital Ocean.”
      </p>

      {/* Two Clean Action Buttons: Registration & Learn More */}
      <div ref={refs.buttons} className="flex flex-wrap items-center gap-4 sm:gap-6">
        {/* Registration Button */}
        <a
          href="https://forms.gle/STi1SKZ8uK1fCVQr7"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 sm:px-10 py-4 rounded-xl font-cinzel text-sm sm:text-base font-extrabold text-amber-50 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 shadow-xl hover:shadow-amber-900/30 hover:scale-105 transition-all duration-300 uppercase tracking-widest border border-amber-600/40"
        >
          Registration
        </a>

        {/* Learn More Button */}
        <a
          href="#about"
          className="px-8 sm:px-10 py-4 rounded-xl font-cinzel text-sm sm:text-base font-extrabold text-amber-950 bg-amber-500/15 hover:bg-amber-500/25 border-2 border-amber-800/40 hover:border-amber-900 hover:scale-105 transition-all duration-300 uppercase tracking-widest shadow-md"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
