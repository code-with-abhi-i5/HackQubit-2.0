import { forwardRef, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { HERO_CONTENT } from "../constants";

const Buttons = forwardRef((props, ref) => {
  const primaryRef = useRef(null);

  const handlePrimaryEnter = () => {
    gsap.to(primaryRef.current, {
      scale: 1.03,
      boxShadow: "0 0 40px #D4AF3760, 0 0 80px #D4AF3730, 0 0 120px #D4AF3715",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handlePrimaryLeave = () => {
    gsap.to(primaryRef.current, {
      scale: 1,
      boxShadow: "0 0 20px #D4AF3730, 0 0 40px #D4AF3715",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-5 sm:gap-6">
      {/* Primary Button - Explore Now */}
      <a
        ref={primaryRef}
        href="#treasures"
        onMouseEnter={handlePrimaryEnter}
        onMouseLeave={handlePrimaryLeave}
        className="group relative flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-pirate-gold to-pirate-bronze rounded font-cinzel text-sm sm:text-base text-pirate-bg font-semibold tracking-wider gold-glow transition-all duration-500 overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10">{HERO_CONTENT.primaryBtn}</span>
        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
      </a>
    </div>
  );
});

Buttons.displayName = "Buttons";

export default Buttons;
