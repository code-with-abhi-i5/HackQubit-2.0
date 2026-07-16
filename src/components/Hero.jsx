import { useRef, useEffect } from "react";
import { useMouseParallax } from "../hooks";
import { animateHeroEntrance } from "../animations";
import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import Stats from "./Stats";
import SocialIcons from "./SocialIcons";
import ScrollIndicator from "./ScrollIndicator";
import heroBg from "../assets/images/hero-bg.png";

const Hero = () => {
  const parallax = useMouseParallax(0.015);

  // Refs for animations
  const navbarRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const skullIconRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const tl = animateHeroEntrance({
      navbar: navbarRef.current,
      subtitle: subtitleRef.current,
      headingLine1: headingLine1Ref.current,
      headingLine2: headingLine2Ref.current,
      skullIcon: skullIconRef.current,
      description: descriptionRef.current,
      buttons: buttonsRef.current,
      social: socialRef.current,
      stats: statsRef.current,
      scrollIndicator: scrollIndicatorRef.current,
    });

    return () => tl.kill();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-pirate-bg"
    >
      {/* Background Image with Parallax & Slow Zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full animate-slow-zoom"
        style={{
          transform: `scale(1) translate(${parallax.x}px, ${parallax.y}px)`,
        }}
      >
        <img
          src={heroBg}
          alt="Pirate ship on stormy seas"
          className="w-full h-full object-contain object-center"
          loading="eager"
        />
      </div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient-overlay" />

      {/* Ambient Particles / Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pirate-gold/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-pirate-bronze/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.6) 100%)",
        }}
      />

      {/* Navbar */}
      <Navbar ref={navbarRef} />

      {/* Hero Content */}
      <HeroContent
        refs={{
          subtitle: subtitleRef,
          headingLine1: headingLine1Ref,
          headingLine2: headingLine2Ref,
          skullIcon: skullIconRef,
          description: descriptionRef,
          buttons: buttonsRef,
        }}
      />

      {/* Social Icons */}
      <SocialIcons ref={socialRef} />

      {/* Scroll Indicator */}
      <ScrollIndicator ref={scrollIndicatorRef} />

      {/* Stats Bar */}
      <Stats ref={statsRef} />
    </section>
  );
};

export default Hero;
