import React from "react";
import { ClipboardCheck, Command } from "lucide-react";

const HeroContent = ({ refs }) => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center max-w-4xl lg:max-w-none w-full px-6 sm:px-12 lg:px-20 pt-28 pb-16 text-center mx-auto">

      <div className="relative mb-6 group select-none text-center">
        <div ref={refs.headingLine1} className="w-full">
          <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-700 drop-shadow-[0_4px_12px_rgba(212,175,55,0.7)] tracking-widest leading-none uppercase filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
            HACK QUBIT 2.0
          </h1>
        </div>
      </div>

      {/* Slogan Below Heading */}
      <p
        ref={refs.description}
        className="font-raleway text-base sm:text-xl lg:text-2xl text-white font-normal max-w-2xl leading-relaxed mb-10 text-center mx-auto"
      >
        “Sail the High Seas of Innovation, Unearth Rare Code Treasures & Conquer the Digital Ocean.”
      </p>

      {/* Two Clean Action Buttons: Registration & Learn More */}
      <div ref={refs.buttons} className="flex flex-row flex-nowrap items-center justify-center gap-3 sm:gap-6 w-full">
        {/* Registration Button */}
        <a
          href="https://forms.gle/STi1SKZ8uK1fCVQr7"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 sm:px-10 py-3 sm:py-4 rounded-xl font-cinzel text-xs sm:text-base font-extrabold text-amber-50 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 shadow-xl hover:shadow-amber-900/30 hover:scale-105 transition-all duration-300 uppercase tracking-widest border border-amber-600/40 text-center whitespace-nowrap"
        >
          <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Registration</span>
        </a>

        {/* Learn More Button */}
        <a
          href="#about"
          className="flex items-center gap-2 px-5 sm:px-10 py-3 sm:py-4 rounded-xl font-cinzel text-xs sm:text-base font-extrabold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 uppercase tracking-widest shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-center whitespace-nowrap"
        >
          <Command className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Learn More</span>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
