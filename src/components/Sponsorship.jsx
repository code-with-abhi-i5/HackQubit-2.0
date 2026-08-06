import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Flag, Coins, Crown, Medal, Shield, Skull, Compass, Sparkles } from "lucide-react";
import sponsorTitleImg from "../assets/images/our sponsore.png";
import sponsorPackImg from "../assets/images/our pack.png";
import izzkiLogo from "../assets/images/izzki tech.jpg";
import hdfcLogo from "../assets/images/hdfc.png";

// Import 3 Pirate Character Assets
import pirateCaptainImg from "../assets/images/pirate_captain.png";
import pirateFemaleImg from "../assets/images/pirate_female.png";
import pirateSwashbucklerImg from "../assets/images/pirate_swashbuckler.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── Interactive Cursor-Tracking Flying Parrot SVG Component ─── */
const InteractiveParrot = () => {
  const parrotRef = useRef(null);
  const wingLeftRef = useRef(null);
  const wingRightRef = useRef(null);

  useEffect(() => {
    // 1. Wing Flapping Loop Animation
    const wingTl = gsap.timeline({ repeat: -1, yoyo: true });
    wingTl.to([wingLeftRef.current, wingRightRef.current], {
      scaleY: 0.3,
      duration: 0.25,
      ease: "power1.inOut",
    });

    // 2. Interactive Cursor Tracking & Floating Movement
    const handleMouseMove = (e) => {
      if (!parrotRef.current) return;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowW = window.innerWidth;

      // Calculate tilt angle based on mouse distance
      const rotation = ((mouseX - windowW / 2) / windowW) * 25;

      gsap.to(parrotRef.current, {
        x: (mouseX - windowW / 2) * 0.15,
        y: (mouseY - 300) * 0.1,
        rotate: rotation,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      wingTl.kill();
    };
  }, []);

  return (
    <div
      ref={parrotRef}
      className="absolute top-12 left-1/2 -translate-x-1/2 z-40 pointer-events-auto cursor-pointer group"
      title="Click me to squawk!"
      onClick={() => {
        if (parrotRef.current) {
          gsap.to(parrotRef.current, {
            scale: 1.4,
            rotate: "+=360",
            duration: 0.8,
            ease: "back.out(2)",
            onComplete: () => gsap.to(parrotRef.current, { scale: 1, duration: 0.4 }),
          });
        }
      }}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-[0_10px_20px_rgba(212,175,55,0.5)] transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Left Wing */}
          <path
            ref={wingLeftRef}
            d="M 35 45 C 10 20, 5 40, 20 60 C 30 55, 35 50, 35 45 Z"
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="1"
          />
          {/* Right Wing */}
          <path
            ref={wingRightRef}
            d="M 65 45 C 90 20, 95 40, 80 60 C 70 55, 65 50, 65 45 Z"
            fill="#3b82f6"
            stroke="#1d4ed8"
            strokeWidth="1"
          />
          {/* Body */}
          <path d="M 40 30 Q 50 15 60 30 Q 65 60 50 80 Q 35 60 40 30 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          {/* Tail Feathers */}
          <path d="M 46 80 L 42 100 L 50 95 L 58 100 L 54 80 Z" fill="#22c55e" />
          {/* Parrot Head */}
          <circle cx="50" cy="25" r="12" fill="#ef4444" />
          {/* Curved Beak */}
          <path d="M 58 22 Q 72 26 62 34 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
          {/* Eye */}
          <circle cx="54" cy="22" r="3" fill="white" />
          <circle cx="55" cy="22" r="1.5" fill="black" />
          {/* Pirate Eye Patch */}
          <path d="M 44 19 L 52 26" stroke="black" strokeWidth="1.5" />
          <circle cx="47" cy="22" r="2.5" fill="black" />
        </svg>
      </div>
    </div>
  );
};

/* ─── Hanging Pirate Ropes Overlay Component ─── */
const HangingRopesOverlay = () => (
  <div className="absolute inset-x-0 top-0 h-48 pointer-events-none z-20 overflow-hidden">
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full opacity-60">
      {/* Hanging Swag Ropes */}
      <path d="M 0 0 Q 300 120 600 20 Q 900 140 1200 0" fill="none" stroke="#78350f" strokeWidth="5" strokeDasharray="10 4" />
      <path d="M 0 30 Q 400 160 800 40 Q 1000 100 1200 10" fill="none" stroke="#b45309" strokeWidth="3" />
      {/* Knotted Rope Drops */}
      <line x1="200" y1="65" x2="200" y2="120" stroke="#78350f" strokeWidth="4" />
      <circle cx="200" cy="120" r="5" fill="#542307" />
      <line x1="600" y1="20" x2="600" y2="80" stroke="#78350f" strokeWidth="4" />
      <circle cx="600" cy="80" r="5" fill="#542307" />
      <line x1="950" y1="75" x2="950" y2="130" stroke="#78350f" strokeWidth="4" />
      <circle cx="950" cy="130" r="5" fill="#542307" />
    </svg>
  </div>
);

/* ─── Perks Data ─── */
const perks = [
  {
    title: "Engagement",
    desc: "Interact directly with participants during Q&A sessions, fostering connections and collaborations.",
    icon: <Anchor className="w-8 h-8 text-pirate-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />,
  },
  {
    title: "Brand Visibility",
    desc: "Gain recognition as a key contributor, strengthening your presence within the tech community.",
    icon: <Flag className="w-8 h-8 text-pirate-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />,
  },
  {
    title: "Post-Event Marketing",
    desc: "Benefit from extensive outreach through press releases, social media coverage, and content creation.",
    icon: <Coins className="w-8 h-8 text-pirate-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />,
  },
];

/* ─── Packages Data with Pirate Character Avatars ─── */
const packages = [
  {
    title: "Title Sponsor",
    price: "₹40,000+",
    tagline: "Rule the Seven Seas",
    icon: Crown,
    tier: "legendary",
    characterImg: pirateCaptainImg,
    characterAlt: "Captain",
    accentColor: "#FFD700",
    accentGlow: "rgba(255,215,0,0.35)",
    benefits: [
      "Exclusive logo on all event materials",
      "Banner & poster premium branding",
      "Opening & closing ceremony feature",
      "Premium stage branding",
      "Social media campaign spotlight",
    ],
  },
  {
    title: "Gold Sponsor",
    price: "₹30,000+",
    tagline: "Captain of the Fleet",
    icon: Medal,
    tier: "gold",
    characterImg: pirateFemaleImg,
    characterAlt: "Female Captain",
    accentColor: "#D4AF37",
    accentGlow: "rgba(212,175,55,0.25)",
    benefits: [
      "Logo on all banners & posters",
      "Full event branding package",
      "Social media mentions & posts",
      "Print advertising placement",
    ],
  },
  {
    title: "Silver Sponsor",
    price: "₹20,000+",
    tagline: "First Mate's Honor",
    icon: Shield,
    tier: "silver",
    characterImg: pirateSwashbucklerImg,
    characterAlt: "Swashbuckler",
    accentColor: "#C0C0C0",
    accentGlow: "rgba(192,192,192,0.2)",
    benefits: [
      "Logo placement on materials",
      "Prize category sponsorship",
      "Poster branding inclusion",
    ],
  },
];

/* ─── Tier Config ─── */
const tierStyles = {
  legendary: {
    badge: "THE CROWN JEWEL",
    borderGrad: "linear-gradient(135deg, #FFD700 0%, #D4AF37 30%, #8B6B3F 60%, #FFD700 100%)",
    cardBg: "linear-gradient(165deg, rgba(30,22,12,0.98) 0%, rgba(15,10,5,0.99) 40%, rgba(25,18,8,0.98) 100%)",
    iconBg: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(212,175,55,0.05) 60%, transparent 100%)",
    ribbon: true,
  },
  gold: {
    badge: "CAPTAIN'S CHOICE",
    borderGrad: "linear-gradient(135deg, #D4AF37 0%, #8B6B3F 50%, #D4AF37 100%)",
    cardBg: "linear-gradient(165deg, rgba(22,16,8,0.98) 0%, rgba(12,8,4,0.99) 40%, rgba(20,14,6,0.98) 100%)",
    iconBg: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(139,107,63,0.04) 60%, transparent 100%)",
    ribbon: false,
  },
  silver: {
    badge: "WORTHY ALLY",
    borderGrad: "linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%)",
    cardBg: "linear-gradient(165deg, rgba(18,16,14,0.98) 0%, rgba(10,8,6,0.99) 40%, rgba(16,14,12,0.98) 100%)",
    iconBg: "radial-gradient(circle, rgba(192,192,192,0.1) 0%, rgba(128,128,128,0.04) 60%, transparent 100%)",
    ribbon: false,
  },
};

/* ─── Premium Package Card with Top Center Pirate Character ─── */
const PackageCard = ({ pkg, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const benefitsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const style = tierStyles[pkg.tier];

  useEffect(() => {
    const card = cardRef.current;
    gsap.fromTo(
      card,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: card, start: "top 85%" },
        delay: index * 0.15,
      }
    );

    gsap.fromTo(
      benefitsRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 75%" },
        delay: 0.5 + index * 0.15,
      }
    );
  }, [index]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1200,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - centerX,
        y: y - centerY,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
    if (glowRef.current) gsap.to(glowRef.current, { x: 0, y: 0, duration: 0.5 });
    setIsHovered(false);
  };

  return (
    <div className="package-card-container relative pt-20 mt-6" style={{ perspective: "1500px" }}>
      {/* ── TOP MIDDLE HANDSOME PIRATE CHARACTER (PROUDLY FLOATING OUTSIDE CARD) ── */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex justify-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 transition-transform duration-500 hover:scale-110">
          {/* Character Ambient Glow Ring */}
          <div
            className="absolute inset-2 rounded-full blur-lg opacity-80"
            style={{ background: pkg.accentGlow }}
          />
          <img
            src={pkg.characterImg}
            alt={pkg.characterAlt}
            className="relative w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] scale-110"
          />
        </div>
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-pointer w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Outer gold border frame */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: style.borderGrad }}
        />

        {/* Card body */}
        <div className="relative rounded-2xl overflow-visible h-full flex flex-col pt-16" style={{ background: style.cardBg }}>
          {/* Inner Clipping Container for Background Textures & Glows Only */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {/* Wood grain texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 5px, rgba(139,107,63,0.25) 5px, rgba(139,107,63,0.25) 6px)",
              }}
            />
          </div>

          {/* Cursor-following glow */}
          <div
            ref={glowRef}
            className="absolute w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-0"
            style={{
              background: `radial-gradient(circle, ${pkg.accentGlow} 0%, transparent 60%)`,
              filter: "blur(40px)",
            }}
          />

          {/* ── Card Content ── */}
          <div className="relative z-10 p-7 sm:p-8 lg:p-9 flex-grow flex flex-col" style={{ transform: "translateZ(30px)" }}>
            {/* Tier Badge */}
            <div className="flex items-center justify-center mb-3">
              <span
                className="inline-block px-4 py-1 rounded-full text-[9px] sm:text-[10px] font-cinzel font-bold tracking-[0.25em] uppercase border shadow-sm"
                style={{
                  color: pkg.accentColor,
                  borderColor: `${pkg.accentColor}40`,
                  background: `${pkg.accentColor}08`,
                }}
              >
                {style.badge}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-cinzel text-xl sm:text-2xl lg:text-[26px] font-bold text-center tracking-[0.12em] mb-1"
              style={{ color: pkg.accentColor }}
            >
              {pkg.title}
            </h3>

            {/* Tagline */}
            <p className="font-cormorant italic text-center text-pirate-white/40 text-sm tracking-wider mb-5">
              {pkg.tagline}
            </p>

            {/* Price */}
            <div className="flex justify-center mb-6">
              <div
                className="relative px-6 py-2.5 rounded-lg border transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${pkg.accentColor}08 0%, transparent 100%)`,
                  borderColor: `${pkg.accentColor}25`,
                  boxShadow: isHovered ? `0 0 25px ${pkg.accentGlow}` : "none",
                }}
              >
                <span
                  className="font-pirata text-2xl sm:text-3xl tracking-wide"
                  style={{
                    background: `linear-gradient(135deg, ${pkg.accentColor} 0%, #FFD700 50%, ${pkg.accentColor} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {pkg.price}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${pkg.accentColor}30)` }} />
              <Anchor className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${pkg.accentColor}50` }} strokeWidth={1.5} />
              <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${pkg.accentColor}30, transparent)` }} />
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8 flex-grow">
              {pkg.benefits.map((benefit, bIdx) => (
                <li
                  key={bIdx}
                  ref={(el) => (benefitsRef.current[bIdx] = el)}
                  className="flex items-start gap-3 group/item opacity-0"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:scale-150"
                    style={{ background: pkg.accentColor, boxShadow: `0 0 8px ${pkg.accentGlow}` }}
                  />
                  <span className="font-cormorant text-pirate-white/65 text-[15px] sm:text-base leading-relaxed group-hover/item:text-pirate-white/90 transition-colors duration-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="#contact"
              className="mt-auto group/btn relative w-full flex items-center justify-center gap-2 py-3.5 rounded-lg overflow-hidden transition-all duration-500 border hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
              style={{
                background: `linear-gradient(135deg, ${pkg.accentColor}10 0%, transparent 50%, ${pkg.accentColor}08 100%)`,
                borderColor: `${pkg.accentColor}30`,
              }}
            >
              <Compass
                className="w-4 h-4 transition-all duration-700 group-hover/btn:rotate-[360deg]"
                style={{ color: pkg.accentColor }}
                strokeWidth={1.5}
              />
              <span
                className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-500 group-hover/btn:brightness-125"
                style={{ color: pkg.accentColor }}
              >
                Become Sponsor
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Sponsorship Component ─── */
const Sponsorship = () => {
  const sectionRef = useRef(null);
  const perksRef = useRef(null);
  const packagesRef = useRef(null);
  const bgSkullRef = useRef(null);
  const bgAnchorRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const pastSponsorsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgSkullRef.current, {
        y: -150,
        rotation: 45,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.to(bgAnchorRef.current, {
        y: -200,
        rotation: -30,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });

      gsap.to(ambientGlowRef.current, {
        y: 200,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
      });

      gsap.utils.toArray(".title-img").forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: img, start: "top 85%" },
          }
        );
      });

      gsap.fromTo(
        ".perk-card",
        { opacity: 0, y: 120, rotationY: 45, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: perksRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".past-sponsor-item",
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: pastSponsorsRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsorship"
      className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 flex flex-col items-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #040302 0%, #090706 20%, #0a0806 50%, #080604 80%, #040302 100%)",
      }}
    >
      {/* ─── Hanging Ropes & Interactive Parrot Overlays ─── */}
      <HangingRopesOverlay />
      <InteractiveParrot />

      {/* Ambient Parallax Glows */}
      <div
        ref={ambientGlowRef}
        className="absolute top-[10%] left-[10%] w-[800px] h-[800px] bg-pirate-gold/5 rounded-full blur-[200px] pointer-events-none"
      />
      <div className="absolute bottom-[20%] right-[-10%] w-[1000px] h-[1000px] bg-[#8B6B3F]/5 rounded-full blur-[250px] pointer-events-none" />

      {/* Decorative Parallax Elements */}
      <div ref={bgSkullRef} className="absolute top-32 right-[8%] opacity-[0.04] pointer-events-none rotate-12">
        <Skull className="w-24 h-24 sm:w-32 sm:h-32 text-pirate-gold" strokeWidth={0.6} />
      </div>
      <div ref={bgAnchorRef} className="absolute bottom-[20%] left-[5%] opacity-[0.04] pointer-events-none -rotate-12">
        <Anchor className="w-32 h-32 sm:w-48 sm:h-48 text-pirate-gold" strokeWidth={0.5} />
      </div>

      <div className="max-w-[1300px] mx-auto w-full relative z-10 flex flex-col items-center gap-32 pt-8">
        {/* ROW 1: SPONSORSHIP PERKS */}
        <div ref={perksRef} className="w-full flex flex-col items-center">
          <div className="mb-16 w-full flex justify-center" style={{ perspective: "1000px" }}>
            <img
              src={sponsorTitleImg}
              alt="Our Sponsors"
              className="title-img w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_30px_rgba(212,175,55,0.3)] animate-float"
              loading="lazy"
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10" style={{ perspective: "1200px" }}>
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="perk-card parchment-card group p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(212,175,55,0.15)]"
              >
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#0a0806] border-2 border-pirate-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-all duration-700 ease-out">
                  <div className="group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
                    {perk.icon}
                  </div>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl text-pirate-gold tracking-wider mb-4 drop-shadow-md">
                  {perk.title}
                </h3>
                <p className="font-cormorant text-pirate-white/80 text-sm sm:text-base leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: SPONSORSHIP PACKAGES WITH CHARACTERS */}
        <div ref={packagesRef} className="w-full flex flex-col items-center">
          <div className="mb-6 w-full flex justify-center" style={{ perspective: "1000px" }}>
            <img
              src={sponsorPackImg}
              alt="Sponsorship Packages"
              className="title-img w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_30px_rgba(212,175,55,0.3)] animate-float"
              style={{ animationDelay: "1s" }}
              loading="lazy"
            />
          </div>

          <p className="subtitle-text font-cormorant italic text-center text-pirate-gold/60 text-lg sm:text-xl tracking-wide mb-14 max-w-[500px]">
            &ldquo;Every great voyage needs a mighty fleet behind it.&rdquo;
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <PackageCard key={pkg.title} pkg={pkg} index={idx} />
            ))}
          </div>
        </div>

        {/* ROW 3: PAST SPONSORS */}
        <div ref={pastSponsorsRef} className="w-full flex flex-col items-center border-t border-pirate-gold/20 pt-16">
          <div className="title-img relative inline-block mb-16 px-10 sm:px-16 py-4 sm:py-5 bg-[#14100C] border-y-2 border-pirate-gold/40 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <h3 className="relative z-10 font-cinzel text-3xl sm:text-4xl md:text-5xl text-gradient-gold tracking-[0.2em] flex items-center justify-center gap-4 uppercase">
              Our Sponsors
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-90">
            <div className="past-sponsor-item flex flex-col items-center gap-5 cursor-pointer group">
              <div className="rounded-xl overflow-hidden border-2 border-pirate-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-pirate-gold transition-all duration-500 bg-white/5 p-1">
                <img src={izzkiLogo} alt="Izzki Tech Pvt Ltd" className="h-16 sm:h-20 object-contain" loading="lazy" />
              </div>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-pirate-gold/70 group-hover:text-pirate-gold">
                Izzki Tech Pvt Ltd
              </span>
            </div>

            <div className="past-sponsor-item flex flex-col items-center gap-5 cursor-pointer group">
              <div className="rounded-xl overflow-hidden border-2 border-[#ED232A]/40 shadow-[0_0_15px_rgba(237,35,42,0.15)] group-hover:border-[#ED232A] transition-all duration-500 bg-white p-2">
                <img src={hdfcLogo} alt="HDFC Bank" className="h-16 sm:h-20 object-contain" loading="lazy" />
              </div>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-[#ED232A]/70 group-hover:text-[#ED232A]">
                HDFC Bank
              </span>
            </div>

            <div className="past-sponsor-item flex flex-col items-center gap-5 cursor-pointer group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-black/50 border-2 border-[#00E5FF]/40 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:border-[#00E5FF] transition-all duration-500">
                <span className="text-4xl sm:text-5xl group-hover:rotate-[360deg] transition-transform duration-1000">🌐</span>
              </div>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-[#00E5FF]/70 group-hover:text-[#00E5FF]">
                Orbinger
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
