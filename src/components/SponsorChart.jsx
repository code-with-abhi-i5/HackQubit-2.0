import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Skull, Anchor, Compass, Crown, Medal, Shield, Coins, Sparkles } from "lucide-react";
import { gsap } from "gsap";

const SponsorChart = () => {
  const containerRef = useRef(null);
  const tableRef = useRef(null);
  const rowsRef = useRef([]);
  const headerRef = useRef(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  const tiers = [
    { name: "Powered By", price: "₹70,000", icon: Crown, color: "#FFD700", glow: "rgba(255,215,0,0.4)" },
    { name: "Gold Sponsor", price: "₹50,000", icon: Medal, color: "#D4AF37", glow: "rgba(212,175,55,0.4)" },
    { name: "Silver Sponsor", price: "₹30,000", icon: Shield, color: "#C0C0C0", glow: "rgba(192,192,192,0.4)" },
    { name: "Bronze Sponsor", price: "₹20,000", icon: Coins, color: "#CD7F32", glow: "rgba(205,127,50,0.4)" },
    { name: "Refreshment", price: "In-kind", icon: Compass, color: "#00E5FF", glow: "rgba(0,229,255,0.4)" },
  ];

  const benefits = [
    { name: "Title Sponsor Branding", values: [true, false, false, false, false] },
    { name: "Logo on Event Website", values: [true, true, true, true, true] },
    { name: "Logo on Posters, Certificates, ID Cards", values: [true, true, true, true, true] },
    { name: "Pre-event Promotions", values: [true, true, true, true, true] },
    { name: "Social Media Shoutouts", values: [true, true, true, true, true] },
    { name: "Media Coverage", values: [true, true, true, true, true] },
    { name: "Career Board Posting", values: [true, true, false, false, false] },
    { name: "Problem Statement Contribution", values: [true, false, false, false, false] },
    { name: "Keynote Speech Opportunity", values: [true, true, false, false, false] },
    { name: "Judge / Panel Opportunity", values: [true, false, false, false, false] },
    { name: "Verbal Recognition (Opening & Closing)", values: [true, true, true, true, true] },
    { name: "Award Distribution", values: [true, false, false, false, false] },
    { name: "Course / Training Promotion", values: [false, false, false, true, false] },
    { name: "Swag Kit Inclusion (Goodies in Participant Bags)", values: [true, true, false, false, true] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax entrance
      gsap.fromTo(".bg-element", 
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 0.05, scale: 1, duration: 2, stagger: 0.2, ease: "power3.out" }
      );

      // Header entrance
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0, rotateX: 45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "back.out(1.5)" }
      );

      // Table scale-in
      gsap.fromTo(tableRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.3 }
      );

      // Rows stagger entrance
      gsap.fromTo(rowsRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.05, ease: "power2.out", delay: 0.8 }
      );

      // Continuous animated elements
      gsap.to(".floating-gold", {
        y: -15,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-pirate-bg min-h-screen relative overflow-hidden py-12 px-4 sm:px-8 font-cormorant text-pirate-white flex flex-col items-center">
      
      {/* ─── Ambient Background ─── */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-color-dodge pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute top-[5%] left-[20%] w-[600px] h-[600px] bg-pirate-gold/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Parallax Background Icons */}
      <Skull className="bg-element absolute top-[20%] left-[5%] w-32 h-32 text-pirate-gold rotate-[-15deg] pointer-events-none" strokeWidth={0.5} />
      <Anchor className="bg-element absolute bottom-[15%] right-[5%] w-48 h-48 text-pirate-gold rotate-[15deg] pointer-events-none" strokeWidth={0.5} />

      <div className="w-full max-w-[1400px] relative z-10 flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full flex justify-start mb-6">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-pirate-gold hover:text-pirate-white transition-all duration-300 font-cinzel tracking-widest text-sm uppercase"
          >
            <div className="w-8 h-8 rounded-full border border-pirate-gold/30 flex items-center justify-center group-hover:bg-pirate-gold/10 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span>Return to Fleet</span>
          </Link>
        </div>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 relative">
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.2em] uppercase text-gradient-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-4 flex justify-center items-center gap-6">
            <Sparkles className="w-8 h-8 text-pirate-gold animate-pulse" />
            Sponsorship Matrix
            <Sparkles className="w-8 h-8 text-pirate-gold animate-pulse" />
          </h1>
          <p className="font-cormorant italic text-pirate-gold/70 text-lg sm:text-xl tracking-wider">
            "Weigh anchor and choose your treasure tier."
          </p>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-64 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/50 to-transparent" />
        </div>

        {/* Chart Container */}
        <div 
          ref={tableRef}
          className="w-full relative parchment-card rounded-3xl p-1 sm:p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.15)] border border-pirate-gold/30 overflow-hidden"
          style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
        >
          {/* Inner dark wood overlay */}
          <div className="absolute inset-0 bg-[#0F0A06]/90 rounded-3xl" />
          
          <div className="relative z-10 overflow-x-auto custom-scrollbar rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              
              {/* THEAD */}
              <thead>
                <tr>
                  {/* Empty top-left cell */}
                  <th className="p-6 border-b border-r border-pirate-gold/20 bg-[#16110B] relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                    <span className="font-cinzel font-bold text-xl text-pirate-gold/50 tracking-widest uppercase relative z-10">
                      Benefits
                    </span>
                  </th>
                  
                  {/* Tier Headers */}
                  {tiers.map((tier, idx) => {
                    const Icon = tier.icon;
                    const isHovered = hoveredCol === idx;
                    return (
                      <th 
                        key={idx}
                        onMouseEnter={() => setHoveredCol(idx)}
                        onMouseLeave={() => setHoveredCol(null)}
                        className="p-6 border-b border-r border-pirate-gold/20 text-center relative transition-all duration-500 cursor-pointer w-[180px]"
                        style={{
                          background: isHovered ? "linear-gradient(180deg, #2A1F13 0%, #16110B 100%)" : "#16110B",
                        }}
                      >
                        {/* Glow Behind Icon */}
                        <div 
                          className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-[20px] transition-opacity duration-500"
                          style={{ background: tier.glow, opacity: isHovered ? 0.8 : 0 }}
                        />
                        
                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <Icon 
                            className={`w-10 h-10 transition-all duration-500 floating-gold ${isHovered ? "scale-110 drop-shadow-[0_0_15px_currentColor]" : "opacity-80"}`} 
                            style={{ color: tier.color }}
                            strokeWidth={1.5}
                          />
                          <div>
                            <div className="font-cinzel font-bold text-lg tracking-widest uppercase whitespace-nowrap" style={{ color: tier.color }}>
                              {tier.name}
                            </div>
                            <div className="font-pirata text-xl mt-1 tracking-wider text-pirate-white/80">
                              {tier.price}
                            </div>
                          </div>
                        </div>

                        {/* Hover Column Highlight Top Accent */}
                        <div 
                          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                          style={{ background: tier.color, opacity: isHovered ? 1 : 0 }}
                        />
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* TBODY */}
              <tbody>
                {benefits.map((row, rowIdx) => (
                  <tr 
                    key={rowIdx} 
                    ref={el => rowsRef.current[rowIdx] = el}
                    className="group border-b border-pirate-gold/10 transition-colors duration-300 hover:bg-pirate-gold/5"
                  >
                    {/* Benefit Name Cell */}
                    <td className="p-5 pl-8 border-r border-pirate-gold/10 font-medium text-lg text-pirate-white/90 relative group-hover:text-pirate-gold transition-colors">
                      {/* Row Hover Line */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-pirate-gold group-hover:h-3/4 transition-all duration-300 rounded-r-md" />
                      {row.name}
                    </td>

                    {/* Benefit Values Cells */}
                    {row.values.map((val, colIdx) => {
                      const isColHovered = hoveredCol === colIdx;
                      const tierColor = tiers[colIdx].color;
                      const tierGlow = tiers[colIdx].glow;

                      return (
                        <td 
                          key={colIdx} 
                          onMouseEnter={() => setHoveredCol(colIdx)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className="p-5 border-r border-pirate-gold/10 text-center transition-colors duration-500 relative"
                          style={{
                            backgroundColor: isColHovered ? "rgba(255,215,0,0.02)" : "transparent",
                          }}
                        >
                          <div className="flex justify-center items-center h-full">
                            {val ? (
                              <div className="relative">
                                <Check 
                                  className={`w-6 h-6 transition-all duration-500 ${isColHovered ? "scale-125" : "scale-100 opacity-90"}`} 
                                  style={{ color: tierColor, filter: isColHovered ? `drop-shadow(0 0 10px ${tierColor})` : 'none' }}
                                  strokeWidth={3}
                                />
                              </div>
                            ) : (
                              <X 
                                className={`w-5 h-5 text-pirate-white/20 transition-all duration-500 ${isColHovered ? "scale-110 opacity-40 text-red-400" : ""}`}
                                strokeWidth={2}
                              />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom decorative bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pirate-gold/40 to-transparent opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default SponsorChart;
