import { forwardRef } from "react";
import { HERO_CONTENT } from "../constants";
import Buttons from "./Buttons";

const HeroContent = forwardRef(({ refs }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 z-10 flex flex-col justify-center max-w-[700px] px-6 sm:px-10 lg:px-16 xl:px-32 pt-20"
    >
      {/* Subtitle */}
      <p
        ref={refs.subtitle}
        className="font-eb-garamond italic text-lg sm:text-xl lg:text-2xl text-pirate-gold/90 tracking-wider mb-4 sm:mb-5"
      >
        {HERO_CONTENT.subtitle}
      </p>

      {/* Main Heading */}
      <div className="mb-4 sm:mb-5 flex flex-col items-start w-fit">
        <h1 
          ref={refs.headingLine1}
          className="font-bona-nova text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-bold text-pirate-gold leading-[0.9] tracking-wider text-shadow-cinematic whitespace-nowrap"
        >
          Hack Qubit
        </h1>
        <h1 
          ref={refs.headingLine2}
          className="font-bona-nova text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-pirate-gold leading-[1] tracking-wider text-shadow-cinematic mt-1 sm:mt-2 lining-nums"
        >
          2.0
        </h1>
      </div>
      {/* Description */}
      <p
        ref={refs.description}
        className="font-eb-garamond text-base sm:text-lg lg:text-xl max-w-[480px] leading-relaxed mb-8 sm:mb-10"
        style={{
          color: '#E2E8F0',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}
      >
        {HERO_CONTENT.description}
      </p>

      {/* Buttons */}
      <Buttons ref={refs.buttons} />
    </div>
  );
});

HeroContent.displayName = "HeroContent";

export default HeroContent;
