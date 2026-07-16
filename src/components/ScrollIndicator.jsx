import { forwardRef } from "react";

const ScrollIndicator = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute right-6 sm:right-8 lg:right-10 bottom-28 sm:bottom-32 lg:bottom-28 z-20 hidden md:flex flex-col items-center gap-3"
    >
      {/* Mouse outline */}
      <div className="relative w-6 h-10 rounded-full border border-pirate-white/30 flex items-start justify-center pt-2">
        {/* Animated dot */}
        <div className="w-1 h-2.5 rounded-full bg-pirate-gold/80 animate-scroll-dot" />
      </div>

      {/* Line */}
      <div className="w-[1px] h-8 bg-gradient-to-b from-pirate-white/30 to-transparent" />

      {/* Text */}
      <span className="font-inter text-[10px] text-pirate-white/40 tracking-[0.3em] uppercase rotate-0">
        Scroll
      </span>
    </div>
  );
});

ScrollIndicator.displayName = "ScrollIndicator";

export default ScrollIndicator;
