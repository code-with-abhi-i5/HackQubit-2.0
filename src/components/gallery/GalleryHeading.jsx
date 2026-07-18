import { Anchor } from "lucide-react";

/**
 * GalleryHeading — Section header with skull icon, cinematic serif title,
 * gold-gradient text, and fade-up animation hooks.
 */
const GalleryHeading = ({ headingRef }) => {
  return (
    <header ref={headingRef} className="text-center mb-12 sm:mb-16 relative z-10">
      {/* ☠ Label */}
      <div className="gallery-label flex items-center justify-center gap-3 mb-4">
        <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/40" />
        <span
          className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] uppercase"
          style={{
            background: "linear-gradient(90deg, #B88B4A, #D4AF37, #B88B4A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ☠ Our Memories
        </span>
        <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/40" />
      </div>

      {/* Main Title */}
      <h2
        className="gallery-title font-pirata text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] tracking-wider leading-none"
        style={{
          background:
            "linear-gradient(135deg, #FFD700 0%, #D4AF37 30%, #8B6B3F 60%, #D4AF37 80%, #FFD700 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          filter: "drop-shadow(0 0 40px rgba(212,175,55,0.15)) drop-shadow(0 4px 15px rgba(0,0,0,0.8))",
        }}
      >
        GALLERY
      </h2>

      {/* Paragraph */}
      <p className="gallery-para font-cormorant italic text-base sm:text-lg lg:text-xl text-pirate-white/40 max-w-[520px] mx-auto mt-5 tracking-wide leading-relaxed">
        Every voyage leaves behind a legend.
        <br />
        Explore our greatest adventures.
      </p>

      {/* Divider */}
      <div className="gallery-divider flex items-center justify-center gap-3 mt-6">
        <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/25" />
        <Anchor
          className="w-3.5 h-3.5 text-pirate-gold/20"
          strokeWidth={1.5}
        />
        <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/25" />
      </div>
    </header>
  );
};

export default GalleryHeading;
