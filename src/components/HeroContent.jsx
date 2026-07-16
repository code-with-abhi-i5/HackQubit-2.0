import { forwardRef } from "react";
import { Skull } from "lucide-react";
import { HERO_CONTENT } from "../constants";
import Buttons from "./Buttons";

const HeroContent = forwardRef(({ refs }, ref) => {
  return (
    <div
      ref={ref}
      className="relative z-10 flex flex-col justify-center h-full max-w-[700px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-28 sm:pt-32 lg:pt-24"
    >
      {/* Subtitle */}
      <p
        ref={refs.subtitle}
        className="font-cormorant italic text-lg sm:text-xl lg:text-2xl text-pirate-gold/90 tracking-wider mb-4 sm:mb-5"
      >
        {HERO_CONTENT.subtitle}
      </p>

      {/* Main Heading */}
      <div className="mb-4 sm:mb-5 flex flex-col items-center w-fit">
        <h1 
          ref={refs.headingLine1}
          className="font-pirate text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-normal text-pirate-gold leading-[0.9] tracking-wider text-shadow-cinematic"
        >
          HackQubit
        </h1>
        <h1 
          ref={refs.headingLine2}
          className="font-pirate text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-normal text-pirate-gold leading-[1] tracking-wider text-shadow-cinematic mt-1 sm:mt-2"
        >
          2.0
        </h1>
      </div>

      {/* Skull Divider */}
      <div ref={refs.skullIcon} className="mb-5 sm:mb-6">
        <Skull
          className="w-6 h-6 sm:w-7 sm:h-7 text-pirate-gold/60"
          strokeWidth={1}
        />
      </div>

      {/* Description */}
      <p
        ref={refs.description}
        className="font-cormorant text-base sm:text-lg lg:text-xl text-pirate-white/60 max-w-[480px] leading-relaxed mb-8 sm:mb-10"
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
