import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles, MessageCircle } from "lucide-react";
import pirateParrotImg from "../assets/images/pirate_parrot_transparent.png";

const PARROT_QUOTES = [
  "SQUAWK! 🦜 500+ Hackers Onboard!",
  "Ahoy Matey! 🏴‍☠️ ₹50k Bounty awaits!",
  "Code, Create & Conquer! ⚡",
  "Live Problem Statements on Spot! 📜",
  "RVSCET Jamshedpur 24-Hour Voyage! ⚓",
  "Feathers ruffled for innovation! 🚀",
];

const PirateParrotCompanion = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [isSquawking, setIsSquawking] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  // Mouse tracking for subtle head tilt / rotation toward cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 40;
      const deltaY = (e.clientY - centerY) / 40;
      
      // Limit rotation range
      const clampedX = Math.max(-12, Math.min(12, deltaX));
      const clampedY = Math.max(-8, Math.min(8, deltaY));
      
      setMouseOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Periodic auto-squawk every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleParrotInteraction();
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleParrotInteraction = () => {
    setIsSquawking(true);
    setShowSpeech(true);
    setQuoteIndex((prev) => (prev + 1) % PARROT_QUOTES.length);

    setTimeout(() => {
      setIsSquawking(false);
    }, 800);

    setTimeout(() => {
      setShowSpeech(false);
    }, 5000);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* ── SPEECH BUBBLE ── */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="mb-3 max-w-[240px] px-4 py-2.5 rounded-2xl bg-amber-500/95 text-amber-950 border-2 border-amber-900/30 shadow-2xl backdrop-blur-md relative font-cinzel text-xs font-black tracking-wide"
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase text-amber-900 tracking-widest font-extrabold">
              <Sparkles className="w-3 h-3 text-amber-900" />
              <span>Captain's Parrot Squawks:</span>
            </div>
            <p className="leading-snug">{PARROT_QUOTES[quoteIndex]}</p>

            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-amber-500/95 border-r-2 border-b-2 border-amber-900/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INTERACTIVE PARROT CHARACTER CONTAINER ── */}
      <motion.div
        onClick={handleParrotInteraction}
        onMouseEnter={() => {
          if (!showSpeech) handleParrotInteraction();
        }}
        animate={{
          rotate: mouseOffset.x * -0.5,
          y: isSquawking ? [0, -16, 4, -8, 0] : [0, -6, 0],
          scale: isSquawking ? [1, 1.12, 1] : 1,
        }}
        transition={{
          y: isSquawking
            ? { duration: 0.6, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.3 },
        }}
        className="relative cursor-pointer group flex flex-col items-center"
      >
        {/* Glowing aura ring on hover */}
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Parrot Image Cutout */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative">
          <img
            src={pirateParrotImg}
            alt="Interactive Pirate Parrot Companion"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
          />

          {/* Squawk Soundwave Icon Badge */}
          {isSquawking && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-1 bg-amber-800 text-amber-50 p-1.5 rounded-full border border-amber-400 shadow-lg"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
            </motion.div>
          )}
        </div>

        {/* Small "Click Me" hint badge */}
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 font-cinzel text-[9px] font-bold tracking-wider uppercase border border-amber-500/30 group-hover:border-amber-400 group-hover:bg-amber-900 transition-all duration-300 shadow-md flex items-center gap-1">
          <MessageCircle className="w-2.5 h-2.5 text-amber-400" />
          <span>Squawk</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PirateParrotCompanion;
