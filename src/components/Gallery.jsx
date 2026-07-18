import { useRef, useState, useMemo, useCallback } from "react";
import { Compass } from "lucide-react";
import GalleryHeading from "./gallery/GalleryHeading";
import GalleryCarousel from "./gallery/GalleryCarousel";
import useGalleryAnimation from "./gallery/useGalleryAnimation";
import galleryData from "./gallery/galleryData";

/**
 * Gallery — Premium cinematic pirate 3D Cover Flow section.
 *
 * 100vh full-screen section with:
 * – Fog / dust / vignette / candle-glow backgrounds
 * – Cinematic heading reveal
 * – Apple Cover Flow inspired 3D gallery
 * – GSAP-powered interactions and animations
 */
const Gallery = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(
    Math.floor(galleryData.length / 2)
  );

  // Background particles
  const bgParticles = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 3}px`,
        duration: 6 + Math.random() * 12,
        delay: Math.random() * 8,
        drift: -20 + Math.random() * 40,
      })),
    []
  );

  // Fog layers
  const fogLayers = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        opacity: 0.015 + i * 0.008,
        duration: 20 + i * 10,
        yOffset: 30 + i * 20,
        scale: 1 + i * 0.15,
      })),
    []
  );

  // Wire up all animations
  useGalleryAnimation({
    sectionRef,
    headingRef,
    stageRef,
    cardRefs,
    particleContainerRef,
    activeIndex,
  });

  const handleCardClick = useCallback(
    (index) => {
      setActiveIndex(index);
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #030201 0%, #0A0908 10%, #111111 30%, #1B1815 50%, #111111 70%, #0A0908 90%, #030201 100%)",
      }}
    >
      {/* ═══════════════════════════════════════════
          BACKGROUND EFFECTS
      ═══════════════════════════════════════════ */}

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at center, transparent 20%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Candle glow – warm center light */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, rgba(184,139,74,0.02) 30%, transparent 70%)",
          filter: "blur(60px)",
          animation: "candleFlicker 4s ease-in-out infinite",
        }}
      />

      {/* Fog layers */}
      {fogLayers.map((fog) => (
        <div
          key={fog.id}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 120% 40% at ${30 + fog.id * 20}% ${fog.yOffset}%, rgba(245,232,199,${fog.opacity}) 0%, transparent 60%)`,
            animation: `fogDrift ${fog.duration}s ease-in-out infinite`,
            transform: `scale(${fog.scale})`,
          }}
        />
      ))}

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025] mix-blend-color-dodge"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Smoke wisps */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          left: "10%",
          bottom: "10%",
          width: "300px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(245,232,199,0.02) 0%, transparent 60%)",
          filter: "blur(40px)",
          animation: "fogDrift 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          right: "5%",
          top: "20%",
          width: "250px",
          height: "350px",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.015) 0%, transparent 60%)",
          filter: "blur(50px)",
          animation: "fogDrift 30s ease-in-out infinite",
        }}
      />

      {/* Gold dust particles */}
      {bgParticles.map((p, i) => (
        <div
          key={`dust-${i}`}
          className="absolute rounded-full pointer-events-none z-[1]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, #FFD700 0%, #D4AF37 50%, transparent 100%)",
            animation: `prizeParticleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Decorative compass */}
      <div className="absolute bottom-12 right-[4%] opacity-[0.03] pointer-events-none z-0">
        <Compass
          className="w-32 h-32 text-pirate-gold animate-[spin_30s_linear_infinite]"
          strokeWidth={0.3}
        />
      </div>

      {/* ═══════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto py-16 sm:py-20">
        {/* Heading */}
        <GalleryHeading headingRef={headingRef} />

        {/* 3D Cover Flow Carousel */}
        <GalleryCarousel
          images={galleryData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onCardClick={handleCardClick}
          particleContainerRef={particleContainerRef}
          stageRef={stageRef}
        />

        {/* Bottom ornament */}
        <div className="flex justify-center mt-10 sm:mt-14">
          <div className="flex items-center gap-4">
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/15" />
            <Compass
              className="w-4 h-4 text-pirate-gold/15 animate-[spin_20s_linear_infinite]"
              strokeWidth={1}
            />
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/15" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
