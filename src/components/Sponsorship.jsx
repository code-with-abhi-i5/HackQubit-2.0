import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Flag, Coins, Star, Shield, Medal } from "lucide-react";
import sponsorTitleImg from "../assets/images/our sponsore.png";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Engagement",
    desc: "Interact directly with participants during Q&A sessions, fostering connections and collaborations.",
    icon: <Anchor className="w-6 h-6 sm:w-8 sm:h-8 text-pirate-gold drop-shadow-md" />,
  },
  {
    title: "Brand Visibility",
    desc: "Gain recognition as a key contributor, strengthening your presence within the tech community.",
    icon: <Flag className="w-6 h-6 sm:w-8 sm:h-8 text-pirate-gold drop-shadow-md" />,
  },
  {
    title: "Post-Event Marketing",
    desc: "Benefit from extensive outreach through press releases, social media coverage, and content creation.",
    icon: <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-pirate-gold drop-shadow-md" />,
  },
];

const packages = [
  {
    title: "Title Sponsor",
    price: "From ₹40,000+",
    icon: <Star className="w-6 h-6 text-pirate-gold" fill="currentColor" />,
    border: "border-pirate-gold",
    glow: "shadow-[0_0_25px_rgba(212,175,55,0.3)]",
    benefits: [
      "Exclusive brand logo prominently displayed throughout HackQubit 2.0",
      "Print advertisements on banners and posters",
      "Keynote address during opening & closing ceremony",
      "Premium branding across all event assets",
    ],
  },
  {
    title: "Gold Sponsor",
    price: "From ₹30,000+",
    icon: <Medal className="w-6 h-6 text-[#FFD700]" fill="currentColor" />,
    border: "border-[#FFD700]/60",
    glow: "shadow-[0_0_15px_rgba(255,215,0,0.15)]",
    benefits: [
      "Brand logo on banners",
      "Print advertisements",
      "Logo on all event materials",
      "Official social media mentions",
    ],
  },
  {
    title: "Silver Sponsor",
    price: "From ₹20,000+",
    icon: <Shield className="w-6 h-6 text-[#C0C0C0]" fill="currentColor" />,
    border: "border-[#C0C0C0]/60",
    glow: "shadow-[0_0_15px_rgba(192,192,192,0.1)]",
    benefits: [
      "Logo placement",
      "Prize sponsorship",
      "Print advertisements on posters",
    ],
  },
];

const Sponsorship = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner Animation
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: -40, opacity: 0, duration: 1.2, ease: "power3.out",
      });

      // Left Column Cards Animation
      gsap.from(".sponsor-feature", {
        scrollTrigger: { trigger: leftColRef.current, start: "top 75%" },
        x: -50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
      });

      // Right Column Treasure Panel Animation
      gsap.from(rightColRef.current, {
        scrollTrigger: { trigger: rightColRef.current, start: "top 75%" },
        scale: 0.95, opacity: 0, duration: 1, ease: "power3.out",
      });
      
      // Packages List Animation
      gsap.from(".sponsor-package", {
        scrollTrigger: { trigger: rightColRef.current, start: "top 60%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsorship"
      className="relative min-h-screen py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-center bg-[#050505] overflow-hidden"
    >
      {/* Background Lighting / Fog */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pirate-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pirate-bronze/5 rounded-full blur-[180px] pointer-events-none" />
      
      {/* Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Top Centered Title Banner */}
        <div ref={titleRef} className="mb-20 w-full flex justify-center">
          <img 
            src={sponsorTitleImg} 
            alt="Our Sponsors" 
            className="w-full max-w-[700px] h-auto object-contain drop-shadow-[0_5px_25px_rgba(212,175,55,0.25)] animate-float"
          />
        </div>

        {/* Two Column Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Features */}
          <div ref={leftColRef} className="flex-1 flex flex-col gap-6 sm:gap-8 justify-center">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="sponsor-feature parchment-card lantern-glow p-6 sm:p-8 rounded-lg flex items-start gap-5 sm:gap-6 group"
              >
                <div className="mt-1 p-3 rounded-full bg-black/40 border border-pirate-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:bg-pirate-gold/10 transition-colors">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-pirate text-2xl sm:text-3xl text-pirate-gold tracking-widest mb-3 drop-shadow-md">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-pirate-white/70 text-sm sm:text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Treasure Panel (Packages) */}
          <div ref={rightColRef} className="flex-[1.2] xl:flex-[1.3]">
            <div className="treasure-panel w-full h-full p-1 sm:p-2 rounded-xl">
              {/* Inner Carved Border */}
              <div className="border border-pirate-gold/30 rounded-lg p-6 sm:p-10 h-full flex flex-col relative overflow-hidden bg-black/40">
                
                {/* Decorative Corners */}
                <div className="absolute top-2 left-2 text-pirate-gold/40 text-xl">⚔️</div>
                <div className="absolute top-2 right-2 text-pirate-gold/40 text-xl">⚔️</div>
                <div className="absolute bottom-2 left-2 text-pirate-gold/40 text-xl">⚔️</div>
                <div className="absolute bottom-2 right-2 text-pirate-gold/40 text-xl">⚔️</div>

                <div className="flex flex-col items-center mb-10 border-b border-pirate-gold/20 pb-6">
                  <span className="text-4xl mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">💰</span>
                  <h2 className="font-pirate text-3xl sm:text-4xl text-pirate-white tracking-widest text-shadow-cinematic text-center">
                    Sponsorship Packages
                  </h2>
                </div>

                <div className="flex flex-col gap-8 flex-1">
                  {packages.map((pkg, idx) => (
                    <div 
                      key={idx}
                      className={`sponsor-package relative flex flex-col sm:flex-row gap-6 p-6 rounded-md bg-[#0a0805]/80 border-l-4 ${pkg.border} ${pkg.glow} hover:-translate-y-1 transition-transform duration-300`}
                    >
                      {/* Package Header */}
                      <div className="flex flex-col sm:w-[35%] border-b sm:border-b-0 sm:border-r border-pirate-white/10 pb-4 sm:pb-0 sm:pr-6 justify-center">
                        <div className="flex items-center gap-3 mb-2">
                          {pkg.icon}
                          <h4 className="font-pirate text-xl sm:text-2xl text-pirate-white tracking-wider">
                            {pkg.title}
                          </h4>
                        </div>
                        <p className="font-inter font-bold text-pirate-gold/90 text-lg">
                          {pkg.price}
                        </p>
                      </div>

                      {/* Package Benefits */}
                      <div className="flex-1 flex flex-col justify-center">
                        <ul className="space-y-3">
                          {pkg.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <span className="text-pirate-gold mt-1 text-xs">✦</span>
                              <span className="font-inter text-sm sm:text-base text-pirate-white/80 leading-snug">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
