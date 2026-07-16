import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Flag, Coins, Crown, Medal, Shield, Swords } from "lucide-react";
import sponsorTitleImg from "../assets/images/our sponsore.png";
import sponsorPackImg from "../assets/images/our pack.png";
import izzkiLogo from "../assets/images/izzki tech.jpg";
import hdfcLogo from "../assets/images/hdfc.png";

gsap.registerPlugin(ScrollTrigger);

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

const packages = [
  {
    title: "Title Sponsor",
    price: "From ₹40,000+",
    icon: <Crown className="w-8 h-8 text-pirate-gold mb-2 drop-shadow-md" fill="currentColor" />,
    borderGlow: "border-pirate-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]",
    bgHover: "hover:bg-pirate-gold/10",
    benefits: [
      "Exclusive logo placement",
      "Banner & Poster Branding",
      "Opening & Closing Ceremony Mention",
      "Premium Event Branding",
    ],
  },
  {
    title: "Gold Sponsor",
    price: "From ₹30,000+",
    icon: <Medal className="w-8 h-8 text-[#FFD700] mb-2 drop-shadow-md" fill="currentColor" />,
    borderGlow: "border-[#FFD700]/70 shadow-[0_0_25px_rgba(255,215,0,0.2)]",
    bgHover: "hover:bg-[#FFD700]/10",
    benefits: [
      "Logo on banners",
      "Event branding",
      "Social Media Mentions",
      "Print Ads",
    ],
  },
  {
    title: "Silver Sponsor",
    price: "From ₹20,000+",
    icon: <Shield className="w-8 h-8 text-[#C0C0C0] mb-2 drop-shadow-md" fill="currentColor" />,
    borderGlow: "border-[#C0C0C0]/60 shadow-[0_0_20px_rgba(192,192,192,0.15)]",
    bgHover: "hover:bg-[#C0C0C0]/10",
    benefits: [
      "Logo Placement",
      "Prize Sponsorship",
      "Poster Branding",
    ],
  },
];

const SponsorCard = ({ pkg }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 degree tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={`package-card relative flex flex-col p-1 rounded-xl bg-black border-2 ${pkg.borderGlow} transition-all duration-500 hover:-translate-y-2 group`}
    >
      {/* Inner Container */}
      <div 
        className={`h-full w-full flex flex-col p-8 rounded-lg bg-[#0d0a07] border border-pirate-white/5 ${pkg.bgHover} transition-colors duration-500`}
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Decorative Corners */}
        <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <Anchor className="w-5 h-5 text-pirate-gold" />
        </div>
        <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <Anchor className="w-5 h-5 text-pirate-gold" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <Anchor className="w-5 h-5 text-pirate-gold" />
        </div>
        <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <Anchor className="w-5 h-5 text-pirate-gold" />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center border-b border-pirate-white/10 pb-6 mb-6">
          {pkg.icon}
          <h3 className="font-pirate text-2xl sm:text-3xl text-pirate-white tracking-widest mb-2">
            {pkg.title}
          </h3>
          <div className="px-4 py-1 rounded bg-black/60 border border-pirate-gold/20">
            <p className="font-inter font-bold text-pirate-gold tracking-wider">
              {pkg.price}
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <ul className="flex-1 flex flex-col gap-4">
          {pkg.benefits.map((benefit, bIdx) => (
            <li key={bIdx} className="flex items-start gap-3">
              <span className="text-pirate-gold mt-1 text-[10px] drop-shadow-md">✦</span>
              <span className="font-inter text-pirate-white/80 leading-snug text-sm sm:text-base">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom Glow Element */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-pirate-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

const Sponsorship = () => {
  const sectionRef = useRef(null);
  const perksRef = useRef(null);
  const packagesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Perks Animation
      gsap.from(".perk-card", {
        scrollTrigger: { trigger: perksRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(".perks-title", {
        scrollTrigger: { trigger: perksRef.current, start: "top 85%" },
        y: -30, opacity: 0, duration: 1, ease: "power2.out",
      });

      // Packages Animation
      gsap.from(".package-card", {
        scrollTrigger: { trigger: packagesRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(".packages-title", {
        scrollTrigger: { trigger: packagesRef.current, start: "top 85%" },
        y: -30, opacity: 0, duration: 1, ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate random dust particles
  const dustParticles = Array.from({ length: 30 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${5 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: 0.2 + Math.random() * 0.4,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <section
      ref={sectionRef}
      id="sponsorship"
      className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 flex flex-col items-center bg-[#090909] overflow-hidden"
    >
      {/* --- Ambient Background --- */}
      {/* Fog Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-color-dodge pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      {/* Warm Amber Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#8B6B3F]/5 rounded-full blur-[200px] pointer-events-none animate-pulse-gold" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-pirate-gold/5 rounded-full blur-[250px] pointer-events-none animate-pulse-gold" style={{ animationDelay: "1.5s" }} />

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

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-center gap-32">
        
        {/* =========================================
            ROW 1: SPONSORSHIP PERKS
            ========================================= */}
        <div ref={perksRef} className="w-full flex flex-col items-center">
          
          {/* Perks Title Banner */}
          <div className="perks-title mb-16 w-full flex justify-center">
            <img 
              src={sponsorTitleImg} 
              alt="Our Sponsors" 
              className="w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_25px_rgba(212,175,55,0.25)] animate-float"
            />
          </div>

          {/* Perks Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {perks.map((perk, idx) => (
              <div 
                key={idx} 
                className="perk-card parchment-card group p-8 rounded-xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(212,175,55,0.15)]"
                style={{ animation: "lanternFlicker 6s infinite alternate" }}
              >
                {/* Circular Gold Badge */}
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-black border-2 border-pirate-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-1 rounded-full border border-dashed border-pirate-gold/40 animate-[spin_10s_linear_infinite]" />
                  {perk.icon}
                </div>
                
                <h3 className="font-pirate text-2xl sm:text-3xl text-pirate-gold tracking-wider mb-4 drop-shadow-md">
                  {perk.title}
                </h3>
                <p className="font-inter text-pirate-white/80 text-sm sm:text-base leading-relaxed">
                  {perk.desc}
                </p>
                
                {/* Bottom decorative rope/line */}
                <div className="mt-8 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-pirate-gold/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>


        {/* =========================================
            ROW 2: SPONSORSHIP PACKAGES
            ========================================= */}
        <div ref={packagesRef} className="w-full flex flex-col items-center">
          
          {/* Packages Title Banner */}
          <div className="packages-title mb-16 w-full flex justify-center">
            <img 
              src={sponsorPackImg} 
              alt="Sponsorship Packages" 
              className="w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_25px_rgba(212,175,55,0.25)] animate-float"
            />
          </div>

          {/* Packages Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-stretch" style={{ perspective: "1000px" }}>
            {packages.map((pkg, idx) => (
              <SponsorCard key={idx} pkg={pkg} />
            ))}
          </div>

        </div>

        {/* =========================================
            ROW 3: PAST SPONSORS
            ========================================= */}
        <div className="w-full flex flex-col items-center mt-8 border-t border-pirate-gold/20 pt-16 relative">
          {/* Decorative Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/60 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.8)]" />

          <div className="relative inline-block mb-12 px-8 sm:px-12 py-3 sm:py-4 bg-[#14100C] border-y-2 border-pirate-gold/40 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')]" />
            <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-black/80 to-transparent" />
            <h3 className="font-pirate text-2xl sm:text-3xl md:text-4xl text-pirate-gold tracking-[0.15em] text-shadow-cinematic flex items-center justify-center gap-4 uppercase">
              Our Past Sponsors
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-90">
            {/* Izzki Tech */}
            <div className="flex items-center gap-4 cursor-pointer transition-all duration-500 hover:-translate-y-1">
              <div className="rounded-lg overflow-hidden border border-pirate-gold/60 shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all">
                <img src={izzkiLogo} alt="Izzki Tech Pvt Ltd" className="h-14 sm:h-16 object-contain" />
              </div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-pirate-gold tracking-wider">
                Izzki Tech Pvt Ltd
              </span>
            </div>

            {/* HDFC */}
            <div className="flex items-center gap-4 cursor-pointer transition-all duration-500 hover:-translate-y-1">
              <div className="rounded-lg overflow-hidden border border-[#ED232A]/60 shadow-[0_0_10px_rgba(237,35,42,0.2)] transition-all bg-white/5 p-1">
                <img src={hdfcLogo} alt="HDFC Bank" className="h-14 sm:h-16 object-contain" />
              </div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#ED232A] tracking-wider">
                HDFC Bank
              </span>
            </div>

            {/* Orbinger */}
            <div className="flex items-center gap-4 cursor-pointer transition-all duration-500 hover:-translate-y-1">
              <div className="p-3 bg-black/50 border border-[#00E5FF]/60 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all">
                <span className="text-3xl filter contrast-125">🌐</span>
              </div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#00E5FF] tracking-wider">
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
