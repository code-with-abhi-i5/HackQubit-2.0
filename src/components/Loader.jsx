import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import shipWheelImg from "../assets/images/captain_ship_wheel.webp";
import islandBgImg from "../assets/images/wheel_island_bg.webp";
import hackqubitLogo from "../assets/images/hackqubit_jewel_title.webp";

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Eagerly cache preloader images in browser memory immediately
    [shipWheelImg, islandBgImg, hackqubitLogo].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let animationFrameId;
    let fallbackTimer;
    let completed = false;

    const checkLoading = () => {
      setProgress((prev) => {
        if (completed) return 100;

        // Check if page and video are loaded
        const video = document.querySelector("video");
        const isVideoReady = video ? video.readyState >= 3 : false;
        const isPageReady = document.readyState === "complete";

        if (isVideoReady && isPageReady) {
          const next = prev + 3; // Fast complete
          if (next >= 100) {
            completed = true;
            setTimeout(() => {
              if (typeof onLoadingComplete === "function") onLoadingComplete();
            }, 150); // slight delay to show 100%
            return 100;
          }
          return next;
        } else {
          // Slowly creep up to 90% while waiting
          if (prev < 90) return prev + 0.5;
          return prev;
        }
      });

      if (!completed) {
        animationFrameId = requestAnimationFrame(checkLoading);
      }
    };

    animationFrameId = requestAnimationFrame(checkLoading);

    // Safety fallback: force unmount after 8 seconds so user doesn't get stuck forever on slow networks
    fallbackTimer = setTimeout(() => {
      if (!completed) {
        completed = true;
        setProgress(100);
        if (typeof onLoadingComplete === "function") onLoadingComplete();
      }
    }, 8000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-amber-100 px-6 overflow-hidden select-none cursor-pointer"
      onClick={() => onLoadingComplete && onLoadingComplete()}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center z-10 max-w-sm w-full">
        
        {/* ── ROTATING SHIP WHEEL WITH TROPICAL ISLAND IN THE CENTER BG ── */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-8 flex items-center justify-center">
          
          {/* Island background image centered specifically inside the wheel's hole */}
          <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-inner z-0">
            <img
              src={islandBgImg}
              alt="Pirate Island Center"
              loading="eager"
              fetchpriority="high"
              decoding="sync"
              className="w-full h-full object-cover transform scale-110"
            />
          </div>

          {/* Smoothly Rotating Captain Ship Steering Wheel */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <img
              src={shipWheelImg}
              alt="Captain's Ship Steering Wheel"
              loading="eager"
              fetchpriority="high"
              decoding="sync"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

        </div>

        {/* ── HACKQUBIT 2.0 JEWEL TITLE LOGO ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <img
            src={hackqubitLogo}
            alt="HackQubit 2.0 Title Logo"
            loading="eager"
            fetchpriority="high"
            decoding="sync"
            className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(120,70,10,0.35)]"
          />
        </motion.div>

        {/* ── PROGRESS BAR CONTAINER ── */}
        <div className="w-full max-w-xs h-3 bg-amber-950/20 rounded-full p-0.5 border border-amber-900/30 shadow-inner relative overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 shadow-md"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
          />
        </div>

        {/* ── PERCENTAGE & STATUS TEXT ── */}
        <div className="mt-3 flex items-center justify-between w-full max-w-xs font-cinzel text-xs font-black text-amber-100">
          <span className="uppercase tracking-widest text-amber-400">Setting Sail...</span>
          <span className="tracking-wider text-amber-300">{progress}%</span>
        </div>

        <span className="mt-4 text-[10px] font-cinzel text-amber-400/60 uppercase tracking-widest">
          Click anywhere to skip
        </span>

      </div>
    </motion.div>
  );
};

export default Loader;
