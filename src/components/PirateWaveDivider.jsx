import React from "react";
import oceanWavePattern from "../assets/images/ocean_wave_pattern.webp";
import emblemPirateShip from "../assets/images/emblem_pirate_ship.webp";

const PirateWaveDivider = ({ flip = false }) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-20 pointer-events-none select-none py-2 ${
        flip ? "transform rotate-180" : ""
      }`}
    >
      {/* ── TOP SVG WAVE FOAM CREST LINE FOR SMOOTH BLENDING ── */}
      <svg
        className="w-full h-6 text-amber-950/20 fill-current block"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
      >
        <path d="M0,0 Q300,35 600,10 T1200,20 L1200,40 L0,40 Z" />
      </svg>

      {/* ── REPEATING OCEAN WAVE PATTERN IMAGE (NO BG, REPEAT-X) ── */}
      <div
        className="w-full h-16 sm:h-20 md:h-24 bg-repeat-x bg-bottom mix-blend-multiply opacity-90 animate-[waveShift_20s_linear_infinite]"
        style={{
          backgroundImage: `url(${oceanWavePattern})`,
          backgroundSize: "contain",
        }}
      />

      {/* ── SINGLE NON-REPEATING PIRATE SHIP CUTOUT RIDING THE WAVE ── */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
        <div className="relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 animate-[shipBob_4s_ease-in-out_infinite]">
          <img
            src={emblemPirateShip}
            alt="Pirate Flagship Sailing Waves"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>

      {/* ── BOTTOM SVG FOAM CREST LINE ── */}
      <svg
        className="w-full h-4 text-amber-900/15 fill-current block"
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
      >
        <path d="M0,15 Q400,0 800,25 T1200,10 L1200,0 L0,0 Z" />
      </svg>

      {/* ── CSS KEYFRAMES FOR WAVE SHIFT & SHIP BOBBING ── */}
      <style>{`
        @keyframes waveShift {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1000px; }
        }
        @keyframes shipBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
};

export default PirateWaveDivider;
