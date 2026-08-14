import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── SVG: animated location pin ────────────────────────────────────────
const LocationPinSVG = () => (
  <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="pinGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffd700"/>
        <stop offset="100%" stopColor="#d4af37"/>
      </radialGradient>
      <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0"/>
      </radialGradient>
      <filter id="pinShadow">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#d4af37" floodOpacity="0.4"/>
      </filter>
    </defs>
    {/* Shadow on ground */}
    <ellipse cx="60" cy="148" rx="28" ry="8" fill="url(#shadowGrad)">
      <animate attributeName="rx" values="28;20;28" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" repeatCount="indefinite"/>
    </ellipse>
    {/* Pin body */}
    <path
      d="M60 8C38 8 20 26 20 48C20 76 60 140 60 140C60 140 100 76 100 48C100 26 82 8 60 8Z"
      fill="url(#pinGrad)"
      filter="url(#pinShadow)"
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 0,-6; 0,0"
        dur="2s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
      />
    </path>
    {/* Inner circle highlight */}
    <circle cx="60" cy="48" r="18" fill="white" opacity="0.2">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 0,-6; 0,0"
        dur="2s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
      />
    </circle>
    <circle cx="60" cy="48" r="10" fill="#0f172a" opacity="0.9">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 0,-6; 0,0"
        dur="2s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
      />
    </circle>
    {/* Pulse rings */}
    <circle cx="60" cy="48" r="30" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0">
      <animate attributeName="r" values="18;45" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="60" cy="48" r="30" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0">
      <animate attributeName="r" values="18;55" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

// ── SVG: Compass Rose ─────────────────────────────────────────────────
const CompassSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="36" stroke="#d4af37" strokeWidth="1" opacity="0.3"/>
    <circle cx="40" cy="40" r="28" stroke="#d4af37" strokeWidth="0.5" opacity="0.2"/>
    {/* N arrow */}
    <path d="M40 6 L44 32 L40 36 L36 32 Z" fill="#d4af37"/>
    {/* S arrow */}
    <path d="M40 74 L44 48 L40 44 L36 48 Z" fill="white" opacity="0.4"/>
    {/* E arrow */}
    <path d="M74 40 L48 44 L44 40 L48 36 Z" fill="white" opacity="0.4"/>
    {/* W arrow */}
    <path d="M6 40 L32 44 L36 40 L32 36 Z" fill="white" opacity="0.4"/>
    <circle cx="40" cy="40" r="5" fill="#d4af37"/>
    <circle cx="40" cy="40" r="2.5" fill="white"/>
    {/* Labels */}
    <text x="37" y="20" fill="#d4af37" fontSize="8" fontWeight="bold">N</text>
    <text x="37" y="68" fill="white" fontSize="6" opacity="0.5">S</text>
    <text x="66" y="43" fill="white" fontSize="6" opacity="0.5">E</text>
    <text x="10" y="43" fill="white" fontSize="6" opacity="0.5">W</text>
  </svg>
);

// ── SVG: Calendar ────────────────────────────────────────────────────
const CalendarSVG = ({ day }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="12" width="56" height="48" rx="6" fill="#0a0f1e" stroke="#d4af37" strokeWidth="1.5"/>
    <rect x="4" y="12" width="56" height="18" rx="6" fill="#d4af37"/>
    <rect x="4" y="24" width="56" height="6" fill="#d4af37"/>
    <line x1="20" y1="6" x2="20" y2="20" stroke="#d4af37" strokeWidth="3" strokeLinecap="round"/>
    <line x1="44" y1="6" x2="44" y2="20" stroke="#d4af37" strokeWidth="3" strokeLinecap="round"/>
    <text x="32" y="50" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="serif">{day}</text>
  </svg>
);

// ── Main Venue Component ──────────────────────────────────────────────
const Venue = () => {
  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const pinRef       = useRef(null);
  const card1Ref     = useRef(null);
  const card2Ref     = useRef(null);
  const card3Ref     = useRef(null);
  const mapRef       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // heading
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
      );
      // pin
      gsap.fromTo(pinRef.current,
        { y: -40, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)",
          scrollTrigger: { trigger: pinRef.current, start: "top 85%" } }
      );
      // cards stagger
      gsap.fromTo([card1Ref.current, card2Ref.current, card3Ref.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: card1Ref.current, start: "top 85%" } }
      );
      // map card
      gsap.fromTo(mapRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 88%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020b18 0%, #030e1f 60%, #050818 100%)" }}
    >
      {/* ── Background decorations ── */}
      {/* Gold radial glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 70%)" }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Rotating compass watermark */}
      <div className="absolute right-8 top-16 w-48 h-48 opacity-[0.04] pointer-events-none"
           style={{ animation: "spin 60s linear infinite" }}>
        <CompassSVG />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section heading ── */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-raleway text-xs tracking-[0.4em] text-amber-400 uppercase mb-3">
            ⚓ Drop Anchor Here
          </p>
          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            The Venue
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-amber-400/60" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>
          <p className="mt-5 font-raleway text-white/50 text-sm sm:text-base tracking-wider max-w-[480px] mx-auto">
            Set your compass and chart your course to the epicentre of innovation.
          </p>
        </div>

        {/* ── Top layout: Pin + Info cards ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 mb-12">

          {/* Animated location pin */}
          <div ref={pinRef} className="flex-shrink-0 w-32 h-44 lg:w-40 lg:h-56">
            <LocationPinSVG />
          </div>

          {/* Info cards grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">

            {/* Card 1 — Venue name */}
            <div
              ref={card1Ref}
              className="group relative flex flex-col gap-3 p-6 rounded-2xl overflow-hidden cursor-default transition-all duration-400 hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg,rgba(212,175,55,0.12) 0%,rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* top glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />
              {/* icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                   style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
                🏛️
              </div>
              <div>
                <p className="font-raleway text-[10px] tracking-[0.3em] text-amber-400 uppercase mb-1">Venue</p>
                <p className="font-raleway text-lg font-bold text-white leading-snug">RVSCET</p>
                <p className="font-raleway text-sm text-white/55 mt-1 leading-relaxed">
                  Ramgovind Ruia Science College of Engineering & Technology
                </p>
                <p className="font-raleway text-xs text-white/40 mt-2 tracking-wide">Jamshedpur, Jharkhand</p>
              </div>
            </div>

            {/* Card 2 — Date day 1 */}
            <div
              ref={card2Ref}
              className="group relative flex flex-col gap-3 p-6 rounded-2xl overflow-hidden cursor-default transition-all duration-400 hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg,rgba(59,130,246,0.1) 0%,rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(59,130,246,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="w-11 h-11">
                <CalendarSVG day="7" />
              </div>
              <div>
                <p className="font-raleway text-[10px] tracking-[0.3em] text-[#3b82f6] uppercase mb-1">Day 1</p>
                <p className="font-raleway text-lg font-bold text-white">October 7</p>
                <p className="font-raleway text-sm text-white/55 mt-1">2025 · Tuesday</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                  <span className="font-cinzel text-xs text-white/40">Opening Ceremony · Hackathon Begins</span>
                </div>
              </div>
            </div>

            {/* Card 3 — Date day 2 */}
            <div
              ref={card3Ref}
              className="group relative flex flex-col gap-3 p-6 rounded-2xl overflow-hidden cursor-default transition-all duration-400 hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg,rgba(234,179,8,0.1) 0%,rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(234,179,8,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#eab308] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="w-11 h-11">
                <CalendarSVG day="8" />
              </div>
              <div>
                <p className="font-raleway text-[10px] tracking-[0.3em] text-[#eab308] uppercase mb-1">Day 2</p>
                <p className="font-raleway text-lg font-bold text-white">October 8</p>
                <p className="font-raleway text-sm text-white/55 mt-1">2025 · Wednesday</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <span className="font-cinzel text-xs text-white/40">Judging · Prize Ceremony · Closing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Map card ── */}
        <div
          ref={mapRef}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Map header bar */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: "rgba(0,10,25,0.95)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                   style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
                📍
              </div>
              <div>
                <p className="font-raleway text-sm font-bold text-white">RVSCET, Jamshedpur</p>
                <p className="font-raleway text-[10px] text-white/40 tracking-wider">Jharkhand, India · 831013</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=RVSCET+Jamshedpur+Jharkhand"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg font-cinzel text-xs text-slate-950 font-bold tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #b89228 100%)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span>Open in Maps</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="relative w-full" style={{ paddingBottom: "42%", minHeight: "280px" }}>
            <iframe
              title="RVSCET Jamshedpur Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.234!2d86.1833!3d22.8046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31ff5ef8221%3A0x9b9b1f1f1f1f1f1f!2sRVSCET%20Jamshedpur!5e0!3m2!1sen!2sin!4v1000000000000"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay tint */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: "linear-gradient(to bottom, rgba(2,11,24,0.15) 0%, transparent 30%, transparent 70%, rgba(2,11,24,0.3) 100%)" }} />
          </div>

          {/* Bottom info strip */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 px-5 py-3"
            style={{ background: "rgba(0,10,25,0.95)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              { icon: "🕐", label: "24 Hours Non-Stop" },
              { icon: "📅", label: "Oct 7–8, 2025" },
              { icon: "📍", label: "Jamshedpur, Jharkhand" },
              { icon: "🏛️", label: "RVSCET Campus" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-sm">{icon}</span>
                <span className="font-cinzel text-[10px] text-white/40 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Venue;

