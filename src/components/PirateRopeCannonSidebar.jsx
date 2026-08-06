import React from "react";

const PirateRopeCannonSidebar = ({ side = "left" }) => {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute top-0 bottom-0 ${
        isLeft ? "left-2 sm:left-4" : "right-2 sm:right-4"
      } w-8 sm:w-10 z-20 pointer-events-none select-none overflow-hidden`}
    >
      {/* ── HEAVY TWISTED HEMP ROPE (REPEAT-Y PATTERN) ── */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 sm:w-5">
        <svg
          className="w-full h-full text-amber-900/60"
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="hempRopePattern"
              width="20"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              {/* Twisted Hemp Strands */}
              <path
                d="M0,0 Q10,15 20,30 M-10,0 Q0,15 10,30 M10,0 Q20,15 30,30"
                stroke="#78350f"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M0,0 Q10,15 20,30 M-10,0 Q0,15 10,30 M10,0 Q20,15 30,30"
                stroke="#d97706"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
            </pattern>
          </defs>
          <rect width="20" height="100%" fill="url(#hempRopePattern)" />
        </svg>
      </div>

      {/* ── VINTAGE BRASS PIRATE CANNON ATTACHED ON THE ROPE ── */}
      <div
        className={`absolute top-1/3 ${
          isLeft ? "left-0" : "right-0"
        } w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center transform ${
          isLeft ? "" : "-scale-x-100"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cannonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="woodMount" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Wooden Wheel & Carriage Base */}
          <rect x="25" y="60" width="50" height="16" rx="4" fill="url(#woodMount)" stroke="#451a03" strokeWidth="2" />
          <circle cx="35" cy="76" r="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <circle cx="65" cy="76" r="10" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <circle cx="35" cy="76" r="4" fill="#d97706" />
          <circle cx="65" cy="76" r="4" fill="#d97706" />

          {/* Heavy Iron Cannon Barrel */}
          <path
            d="M 15 40 L 75 44 Q 85 45 85 55 Q 85 65 75 66 L 15 70 Z"
            fill="url(#cannonGrad)"
            stroke="#020617"
            strokeWidth="2"
          />
          {/* Reinforced Barrel Rings */}
          <rect x="30" y="41" width="6" height="27" fill="#64748b" />
          <rect x="50" y="42" width="6" height="25" fill="#64748b" />
          {/* Cannon Muzzle Rim */}
          <ellipse cx="85" cy="55" rx="3" ry="10" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          {/* Glowing Fuse Spark */}
          <path d="M 15 45 Q 8 35 12 25" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="12" cy="25" r="3" fill="#ef4444" className="animate-ping" />
        </svg>
      </div>
    </div>
  );
};

export default PirateRopeCannonSidebar;
