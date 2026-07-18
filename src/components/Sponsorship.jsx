import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Flag, Coins, Crown, Medal, Shield, Skull, Compass, Sparkles } from "lucide-react";
import sponsorTitleImg from "../assets/images/our sponsore.png";
import sponsorPackImg from "../assets/images/our pack.png";
import izzkiLogo from "../assets/images/izzki tech.jpg";
import hdfcLogo from "../assets/images/hdfc.png";

gsap.registerPlugin(ScrollTrigger);

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

/* ─── Packages Data ─── */
const packages = [
  {
    title: "Title Sponsor",
    price: "₹40,000+",
    tagline: "Rule the Seven Seas",
    icon: Crown,
    tier: "legendary",
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

/* ─── Premium Package Card ─── */
const PackageCard = ({ pkg, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);
  const benefitsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const style = tierStyles[pkg.tier];
  const IconComp = pkg.icon;

  useEffect(() => {
    // GSAP ScrollTrigger for the card reveal
    const card = cardRef.current;
    
    // Animate the card itself
    gsap.fromTo(card, 
      { opacity: 0, y: 100, scale: 0.9, rotationY: -15 },
      {
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        delay: index * 0.15
      }
    );

    // Stagger animate the benefits list items inside the card
    gsap.fromTo(benefitsRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
        },
        delay: 0.5 + index * 0.15 // Start after card appears
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
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1200,
      transformOrigin: "center center",
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
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { x: 0, y: 0, duration: 0.5 });
    }
    setIsHovered(false);
  };

  const handleIconHover = () => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      scale: 1.15,
      rotate: 8,
      duration: 0.4,
      ease: "back.out(2)",
    });
  };

  const handleIconLeave = () => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div className="package-card-container relative" style={{ perspective: "1500px" }}>
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
        <div
          className="relative rounded-2xl overflow-hidden h-full flex flex-col"
          style={{ background: style.cardBg }}
        >
          {/* Wood grain texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 5px, rgba(139,107,63,0.25) 5px, rgba(139,107,63,0.25) 6px)",
            }}
          />

          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-color-dodge"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Cursor-following glow */}
          <div
            ref={glowRef}
            className="absolute w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-0"
            style={{
              background: `radial-gradient(circle, ${pkg.accentGlow} 0%, transparent 60%)`,
              filter: "blur(40px)",
            }}
          />

          {/* Legendary ribbon badge */}
          {style.ribbon && (
            <div className="absolute -top-1 -right-1 z-30">
              <div
                className="relative px-4 py-1 text-[9px] font-cinzel font-bold tracking-[0.3em] uppercase"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #8B6B3F 100%)",
                  color: "#1a0f08",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
                  paddingBottom: "12px",
                }}
              >
                ★ BEST
              </div>
            </div>
          )}

          {/* ── Card Content ── */}
          <div className="relative z-10 p-7 sm:p-8 lg:p-9 flex-grow flex flex-col" style={{ transform: "translateZ(30px)" }}>
            
            {/* Tier Badge */}
            <div className="flex items-center justify-center mb-5">
              <span
                className="inline-block px-4 py-1 rounded-full text-[9px] sm:text-[10px] font-cinzel font-bold tracking-[0.25em] uppercase border"
                style={{
                  color: pkg.accentColor,
                  borderColor: `${pkg.accentColor}40`,
                  background: `${pkg.accentColor}08`,
                }}
              >
                {style.badge}
              </span>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div
                ref={iconRef}
                onMouseEnter={handleIconHover}
                onMouseLeave={handleIconLeave}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-700 cursor-pointer"
                style={{
                  background: style.iconBg,
                  border: `2px solid ${pkg.accentColor}30`,
                  boxShadow: `0 0 25px ${pkg.accentGlow}, inset 0 0 20px ${pkg.accentColor}08`,
                }}
              >
                <div
                  className="absolute inset-1 rounded-full border border-dashed animate-[spin_12s_linear_infinite]"
                  style={{ borderColor: `${pkg.accentColor}35` }}
                />
                <IconComp
                  className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg"
                  style={{ color: pkg.accentColor }}
                  fill="currentColor"
                  strokeWidth={1}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-cinzel text-xl sm:text-2xl lg:text-[26px] font-bold text-center tracking-[0.12em] mb-2"
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
                  className="font-pirata text-2xl sm:text-3xl tracking-wide lining-nums"
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

            {/* Divider with anchor */}
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
                    style={{
                      background: pkg.accentColor,
                      boxShadow: `0 0 8px ${pkg.accentGlow}`,
                    }}
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
              {/* Shimmer */}
              <div
                className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${pkg.accentColor}20, transparent)` }}
              />
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

          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l rounded-tl-lg opacity-20 group-hover:opacity-50 transition-opacity duration-500" style={{ borderColor: pkg.accentColor }} />
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r rounded-tr-lg opacity-20 group-hover:opacity-50 transition-opacity duration-500" style={{ borderColor: pkg.accentColor }} />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l rounded-bl-lg opacity-20 group-hover:opacity-50 transition-opacity duration-500" style={{ borderColor: pkg.accentColor }} />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r rounded-br-lg opacity-20 group-hover:opacity-50 transition-opacity duration-500" style={{ borderColor: pkg.accentColor }} />

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `linear-gradient(90deg, transparent, ${pkg.accentColor}80, transparent)` }}
          />
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
      // 1. Ambient Background Parallax
      gsap.to(bgSkullRef.current, {
        y: -150,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      gsap.to(bgAnchorRef.current, {
        y: -200,
        rotation: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      gsap.to(ambientGlowRef.current, {
        y: 200,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });

      // 2. Title Images Reveal (Parallax + Fade)
      gsap.utils.toArray(".title-img").forEach((img) => {
        gsap.fromTo(img,
          { opacity: 0, y: 80, scale: 0.9, rotationX: -20 },
          {
            opacity: 1, y: 0, scale: 1, rotationX: 0,
            duration: 1.5,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            }
          }
        );
      });

      // 3. Perks Cards Stagger (Crazy 3D Entrance)
      gsap.fromTo(".perk-card",
        { opacity: 0, y: 120, rotationY: 45, scale: 0.8 },
        {
          opacity: 1, y: 0, rotationY: 0, scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: perksRef.current,
            start: "top 75%",
          }
        }
      );

      // 4. Past Sponsors Reveal
      gsap.fromTo(".past-sponsor-item",
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pastSponsorsRef.current,
            start: "top 85%",
          }
        }
      );

      // 5. Text reveals (Subtitles)
      gsap.utils.toArray(".subtitle-text").forEach((text) => {
        gsap.fromTo(text, 
          { opacity: 0, y: 20, letterSpacing: "0px" },
          {
            opacity: 1, y: 0, letterSpacing: "0.05em",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate random dust particles
  const dustParticles = Array.from({ length: 40 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${5 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: 0.2 + Math.random() * 0.4,
    size: `${2 + Math.random() * 5}px`,
  }));

  return (
    <section
      ref={sectionRef}
      id="sponsorship"
      className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 flex flex-col items-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #040302 0%, #090706 20%, #0a0806 50%, #080604 80%, #040302 100%)",
      }}
    >
      {/* ─── Ambient Background ─── */}
      {/* Fog Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-color-dodge pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Ambient Parallax Glows */}
      <div 
        ref={ambientGlowRef}
        className="absolute top-[10%] left-[10%] w-[800px] h-[800px] bg-pirate-gold/5 rounded-full blur-[200px] pointer-events-none" 
      />
      <div className="absolute bottom-[20%] right-[-10%] w-[1000px] h-[1000px] bg-[#8B6B3F]/5 rounded-full blur-[250px] pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {dustParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pirate-gold"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animation: `dustFloat ${particle.animationDuration} infinite ease-in-out ${particle.animationDelay}`,
            }}
          />
        ))}
      </div>

      {/* Decorative Parallax Elements */}
      <div ref={bgSkullRef} className="absolute top-32 right-[8%] opacity-[0.04] pointer-events-none rotate-12">
        <Skull className="w-24 h-24 sm:w-32 sm:h-32 text-pirate-gold" strokeWidth={0.6} />
      </div>
      <div ref={bgAnchorRef} className="absolute bottom-[20%] left-[5%] opacity-[0.04] pointer-events-none -rotate-12">
        <Anchor className="w-32 h-32 sm:w-48 sm:h-48 text-pirate-gold" strokeWidth={0.5} />
      </div>

      <div className="max-w-[1300px] mx-auto w-full relative z-10 flex flex-col items-center gap-32">
        
        {/* =========================================
            ROW 1: SPONSORSHIP PERKS
            ========================================= */}
        <div ref={perksRef} className="w-full flex flex-col items-center">
          
          {/* Perks Title Banner */}
          <div className="mb-16 w-full flex justify-center" style={{ perspective: "1000px" }}>
            <img 
              src={sponsorTitleImg} 
              alt="Our Sponsors" 
              className="title-img w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_30px_rgba(212,175,55,0.3)] animate-float"
              loading="lazy"
            />
          </div>

          {/* Perks Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10" style={{ perspective: "1200px" }}>
            {perks.map((perk, idx) => (
              <div 
                key={idx} 
                className="perk-card parchment-card group p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(212,175,55,0.15)]"
                style={{ animation: "lanternFlicker 6s infinite alternate" }}
              >
                {/* Circular Gold Badge */}
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#0a0806] border-2 border-pirate-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-all duration-700 ease-out">
                  <div className="absolute inset-1 rounded-full border border-dashed border-pirate-gold/40 animate-[spin_10s_linear_infinite]" />
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
                
                {/* Bottom decorative line */}
                <div className="mt-8 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-pirate-gold/40 to-transparent group-hover:w-3/4 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>


        {/* =========================================
            ROW 2: SPONSORSHIP PACKAGES
            ========================================= */}
        <div ref={packagesRef} className="w-full flex flex-col items-center">
          
          {/* Packages Title Banner */}
          <div className="mb-6 w-full flex justify-center" style={{ perspective: "1000px" }}>
            <img 
              src={sponsorPackImg} 
              alt="Sponsorship Packages" 
              className="title-img w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_30px_rgba(212,175,55,0.3)] animate-float"
              style={{ animationDelay: "1s" }}
              loading="lazy"
            />
          </div>

          {/* Packages subtitle */}
          <p className="subtitle-text font-cormorant italic text-center text-pirate-gold/60 text-lg sm:text-xl tracking-wide mb-14 max-w-[500px]">
            &ldquo;Every great voyage needs a mighty fleet behind it.&rdquo;
          </p>

          {/* Packages Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <PackageCard key={pkg.title} pkg={pkg} index={idx} />
            ))}
          </div>

          {/* Bottom anchor divider */}
          <div className="flex items-center gap-4 mt-20">
            <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/40" />
            <Sparkles className="w-5 h-5 text-pirate-gold/40 animate-pulse" strokeWidth={1} />
            <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/40" />
          </div>
        </div>

        {/* =========================================
            ROW 3: PAST SPONSORS
            ========================================= */}
        <div ref={pastSponsorsRef} className="w-full flex flex-col items-center mt-8 border-t border-pirate-gold/20 pt-16 relative">
          {/* Decorative Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/60 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)]" />

          <div className="title-img relative inline-block mb-16 px-10 sm:px-16 py-4 sm:py-5 bg-[#14100C] border-y-2 border-pirate-gold/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')]" />
            <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black to-transparent" />
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black to-transparent" />
            <h3 className="relative z-10 font-cinzel text-3xl sm:text-4xl md:text-5xl text-gradient-gold tracking-[0.2em] text-shadow-cinematic flex items-center justify-center gap-4 uppercase">
              Our Sponsors
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-90">
            {/* Izzki Tech */}
            <div className="past-sponsor-item flex flex-col items-center gap-5 cursor-pointer group">
              <div className="rounded-xl overflow-hidden border-2 border-pirate-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-pirate-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 group-hover:-translate-y-2 bg-white/5 p-1">
                <img src={izzkiLogo} alt="Izzki Tech Pvt Ltd" className="h-16 sm:h-20 object-contain" loading="lazy" />
              </div>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-pirate-gold/70 tracking-wider group-hover:text-pirate-gold transition-colors duration-300">
                Izzki Tech Pvt Ltd
              </span>
            </div>

            {/* HDFC */}
            <div className="past-sponsor-item flex flex-col items-center gap-5 cursor-pointer group">
              <div className="rounded-xl overflow-hidden border-2 border-[#ED232A]/40 shadow-[0_0_15px_rgba(237,35,42,0.15)] group-hover:border-[#ED232A] group-hover:shadow-[0_0_30px_rgba(237,35,42,0.4)] transition-all duration-500 group-hover:-translate-y-2 bg-white p-2">
                <img src={hdfcLogo} alt="HDFC Bank" className="h-16 sm:h-20 object-contain" loading="lazy" />
              </div>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-[#ED232A]/70 tracking-wider group-hover:text-[#ED232A] transition-colors duration-300">
                HDFC Bank
              </span>
            </div>

            {/* Orbinger */}
            <div className="past-sponsor-item flex flex-col items-center gap-5 cursor-pointer group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-black/50 border-2 border-[#00E5FF]/40 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:border-[#00E5FF] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-500 group-hover:-translate-y-2">
                <span className="text-4xl sm:text-5xl filter contrast-125 group-hover:rotate-[360deg] transition-transform duration-1000">🌐</span>
              </div>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-[#00E5FF]/70 tracking-wider group-hover:text-[#00E5FF] transition-colors duration-300">
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
