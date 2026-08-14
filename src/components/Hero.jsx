import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

import hackQubitVideo from "../assets/HackQubit2.0.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const navbarRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video) {
      return;
    }

    let scrollTriggerInstance = null;

    const setupVideoScroll = () => {
      if (!video.duration || !Number.isFinite(video.duration)) {
        return;
      }

      // Start video from the first frame
      video.pause();
      video.currentTime = 0;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: hero,

        // Start when Hero reaches top of screen
        start: "top top",

        // 2500px scrolling controls entire video
        end: "+=2500",

        // Keep Hero on screen while scrubbing video
        pin: true,

        // Scroll position controls progress with smoothing
        scrub: 1.5,

        onUpdate: (self) => {
          if (!video.duration) return;

          const newTime = self.progress * video.duration;

          // Prevent unnecessary updates
          if (Math.abs(video.currentTime - newTime) > 0.01) {
            video.currentTime = newTime;
          }
        },
      });

      ScrollTrigger.refresh();
    };

    // Video metadata is already available
    if (video.readyState >= 1) {
      setupVideoScroll();
    } else {
      video.addEventListener("loadedmetadata", setupVideoScroll, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupVideoScroll);

      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      video.pause();

      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* =========================================
          NAVBAR (Moved outside pinned section to prevent scrolling glitch)
      ========================================= */}
      <div className="relative z-50">
        <Navbar ref={navbarRef} />
      </div>

      <section
        ref={heroRef}
        id="home"
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/* =========================================
          HACKQUBIT 2.0 VIDEO BACKGROUND
      ========================================= */}

      <video
        ref={videoRef}
        src={hackQubitVideo}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      {/* =========================================
          VIDEO OVERLAY
      ========================================= */}

      <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

      {/* =========================================
          FOG / MIST BOTTOM BLEND
      ========================================= */}
      <div className="absolute bottom-0 left-0 w-full h-48 sm:h-64 z-20 bg-gradient-to-b from-transparent via-[#E0F2FE]/80 to-[#E0F2FE] pointer-events-none" />


      {/* =========================================
          HACKQUBIT 2.0 CONTENT
      ========================================= */}

      <div className="relative z-20 h-full flex items-center">
        <HeroContent
          refs={{
            subtitle: subtitleRef,
            headingLine1: headingLine1Ref,
            description: descriptionRef,
            buttons: buttonsRef,
          }}
        />
      </div>

      {/* =========================================
          SOCIAL ICONS + SCROLL INDICATOR
      ========================================= */}

      <div
        className="
          absolute
          left-0
          right-0
          bottom-0
          z-30
          flex
          items-center
          justify-between
          px-6
          sm:px-12
          pb-8
        "
      >
        <ScrollIndicator ref={scrollIndicatorRef} />
      </div>
    </section>
    </>
  );
};

export default Hero;
