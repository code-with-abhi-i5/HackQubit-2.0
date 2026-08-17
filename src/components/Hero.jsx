import { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import hackQubitVideo from "../assets/heroSection.mp4";

const Hero = ({ onOpenRegister }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const navbarRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback
        });
      }
    }
  }, []);

  return (
    <>
      {/* =========================================
          NAVBAR
      ========================================= */}
      <div className="relative z-50">
        <Navbar ref={navbarRef} onOpenRegister={onOpenRegister} />
      </div>

      <section
        ref={heroRef}
        id="home"
        className="relative w-full h-screen overflow-hidden bg-black transform-gpu"
        style={{ contain: "paint" }}
      >
        {/* =========================================
          HACKQUBIT 2.0 VIDEO BACKGROUND (LOOP)
      ========================================= */}
        <video
          ref={videoRef}
          src={hackQubitVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 z-0 w-full h-full object-cover transform-gpu"
          style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
        />

        {/* =========================================
          VIDEO OVERLAY
      ========================================= */}
        <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none transform-gpu" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none transform-gpu" />

        {/* =========================================
          FOG / MIST BOTTOM BLEND
      ========================================= */}
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-48 z-20 bg-gradient-to-b from-transparent via-[#E0F2FE]/70 to-[#E0F2FE] pointer-events-none transform-gpu" />

        {/* =========================================
          HACKQUBIT 2.0 CONTENT
      ========================================= */}
        <div className="relative z-20 h-full flex items-center transform-gpu">
          <HeroContent
            onOpenRegister={onOpenRegister}
            refs={{
              subtitle: subtitleRef,
              headingLine1: headingLine1Ref,
              description: descriptionRef,
              buttons: buttonsRef,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;


