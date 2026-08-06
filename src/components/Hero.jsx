import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import SocialIcons from "./SocialIcons";
import ScrollIndicator from "./ScrollIndicator";

import animeOceanIslandImg from "../assets/images/anime_ocean_island.webp";
import waterShipImg from "../assets/images/water_ship_bottom_left.webp";
import flyingDragonImg from "../assets/images/flying_dragon_hero.webp";

const Hero = () => {
  const navbarRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const waterShipRef = useRef(null);
  const dragonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth entrance sequence
      const targets = [
        headingLine1Ref.current,
        headingLine2Ref.current,
        descriptionRef.current,
        buttonsRef.current,
      ].filter(Boolean);

      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
        );
      }

      // Dragon entrance from far left
      if (dragonRef.current) {
        gsap.fromTo(
          dragonRef.current,
          { opacity: 0, x: -100, y: -20 },
          { opacity: 1, x: 0, y: 0, duration: 1.4, ease: "power3.out", delay: 0.2 }
        );
      }

      // Water Ship entrance from bottom-left
      if (waterShipRef.current) {
        gsap.fromTo(
          waterShipRef.current,
          { opacity: 0, x: -80, y: 40 },
          { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out", delay: 0.4 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-pirate-bg flex flex-col justify-between"
    >
      {/* ── 1. BACKGROUND: Anime Ocean Island Image ── */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <img
          src={animeOceanIslandImg}
          alt="Anime Ocean Island Background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Soft Sky Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-pirate-bg/60 via-transparent to-pirate-bg/80 pointer-events-none" />

      {/* ── 2. TOP FOREGROUND: Corner-to-Corner Diagonal Rigging Rope ── */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 0 C 350 250, 650 750, 1000 1000"
          fill="none"
          stroke="#381400"
          strokeWidth="16"
          strokeLinecap="square"
        />
        <path
          d="M 0 0 C 350 250, 650 750, 1000 1000"
          fill="none"
          stroke="#92400e"
          strokeWidth="7"
          strokeDasharray="20 10"
          strokeLinecap="square"
        />
      </svg>

      {/* ── 3. FLYING SEA DRAGON (TOP-LEFT SKY - HIGH IN AIR, NO OVERLAP WITH WATER SHIP) ── */}
      <div
        ref={dragonRef}
        className="absolute top-12 sm:top-16 lg:top-20 left-6 sm:left-12 lg:left-20 z-20 pointer-events-none w-56 sm:w-72 md:w-[420px] lg:w-[520px] xl:w-[580px] max-w-[46vw] animate-[floatDragon_7s_ease-in-out_infinite]"
      >
        <img
          src={flyingDragonImg}
          alt="Flying Sea Dragon"
          className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
          loading="eager"
        />
      </div>

      {/* ── 4. WATER PIRATE SHIP (BOTTOM-LEFT SEA - FACING RIGHT & UPWARDS) ── */}
      <div
        ref={waterShipRef}
        className="absolute bottom-0 sm:bottom-4 lg:bottom-8 left-0 sm:left-2 lg:left-6 z-20 pointer-events-none w-72 sm:w-96 md:w-[520px] lg:w-[640px] xl:w-[740px] max-w-[52vw] animate-[bobSea_5s_ease-in-out_infinite]"
      >
        <img
          src={waterShipImg}
          alt="Enemy Pirate Ship on Water"
          className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
          loading="eager"
        />
      </div>



      {/* Navbar */}
      <Navbar ref={navbarRef} />

      {/* ── 6. HERO MAIN CONTENT ── */}
      <HeroContent
        refs={{
          subtitle: subtitleRef,
          headingLine1: headingLine1Ref,
          headingLine2: headingLine2Ref,
          description: descriptionRef,
          buttons: buttonsRef,
        }}
      />

      {/* Social Icons & Scroll Indicator */}
      <div className="relative z-30 flex items-center justify-between px-6 sm:px-12 pb-8">
        <SocialIcons ref={socialRef} />
        <ScrollIndicator ref={scrollIndicatorRef} />
      </div>

      {/* Floating Keyframe Styles */}
      <style>{`
        @keyframes floatDragon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes floatSky {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(1.5deg); }
        }
        @keyframes bobSea {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-1.5deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;

