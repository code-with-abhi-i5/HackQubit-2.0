import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Anchor, Skull, Compass, Flag, Crown, Swords, Code, Presentation, Coffee, Zap, Timer } from "lucide-react";
import pirateShip from "../assets/images/ship for timeline.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── MILESTONE DATA ─── */
const MILESTONES = [
  {
    id: "reg",
    title: "Registration & Check-In",
    subtitle: "Day 1 - October 7th",
    date: "09:00 AM",
    desc: "Gather your crew at the harbor and sign up for the ultimate adventure.",
    icon: Anchor,
  },
  {
    id: "open",
    title: "Opening Ceremony",
    subtitle: "Day 1 - October 7th",
    date: "10:00 AM",
    desc: "The captain unveils the map and sets the rules of engagement.",
    icon: Flag,
  },
  {
    id: "hack",
    title: "Hacking Begins",
    subtitle: "Day 1 - October 7th",
    date: "11:00 AM",
    desc: "Set sail! The 24-hour coding voyage officially starts.",
    icon: Code,
  },
  {
    id: "lunch",
    title: "Lunch Break",
    subtitle: "Day 1 - October 7th",
    date: "01:00 PM",
    desc: "Restock your supplies and feast before the storm.",
    icon: Coffee,
  },
  {
    id: "talks",
    title: "Tech Talks & Mentoring",
    subtitle: "Day 1 - October 7th",
    date: "06:00 PM",
    desc: "Learn from veteran pirates and navigate tricky coding waters.",
    icon: Presentation,
  },
  {
    id: "dinner",
    title: "Dinner & Networking",
    subtitle: "Day 1 - October 7th",
    date: "08:00 PM",
    desc: "Share tales of the sea and refuel for the long night ahead.",
    icon: Compass,
  },
  {
    id: "midnight",
    title: "Midnight Energy Boost",
    subtitle: "Day 1 - October 7th",
    date: "12:00 AM",
    desc: "Survive the dark hours with surprise activities and snacks.",
    icon: Zap,
  },
  {
    id: "submit",
    title: "Submission Deadline",
    subtitle: "Day 2 - October 8th",
    date: "09:00 AM",
    desc: "Drop your anchors! All code must be submitted.",
    icon: Timer,
  },
  {
    id: "judge",
    title: "Judging & Presentation",
    subtitle: "Day 2 - October 8th",
    date: "09:30 AM",
    desc: "Defend your treasure before the high council of judges.",
    icon: Swords,
  },
  {
    id: "close",
    title: "Closing Ceremony",
    subtitle: "Day 2 - October 8th",
    date: "10:30 AM",
    desc: "Claim the ultimate treasure and eternal glory.",
    icon: Crown,
    isFinal: true,
  },
];

/* ─── Pirate Ship SVG ─── */
const PirateShipSVG = () => (
  <img
    src={pirateShip}
    alt="Pirate Ship"
    className="w-[120%] h-[120%] object-contain"
  />
);

/* ─── Island Card ─── */
const IslandCard = ({ milestone, index, side }) => {
  const IconComp = milestone.icon;
  const isFinal = milestone.isFinal;

  return (
    <motion.div
      className={`timeline-card relative flex w-full ${side === "left" ? "md:justify-end" : "md:justify-start"}`}
      initial={{ opacity: 0, x: side === "left" ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="group relative cursor-pointer w-full max-w-[360px] md:max-w-[420px]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
      >
        {/* Card */}
        <div
          className="relative rounded-xl overflow-hidden transition-all duration-500"
          style={{
            background: "linear-gradient(165deg, rgba(30,22,12,0.97) 0%, rgba(12,8,4,0.99) 50%, rgba(25,18,8,0.97) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.05)",
          }}
        >
          {/* Wood grain */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(139,107,63,0.3) 4px, rgba(139,107,63,0.3) 5px)",
          }} />

          {/* Noise */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-color-dodge" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }} />

          {/* Reached (Active) Glow Overlay */}
          <div className="absolute inset-0 opacity-0 group-[.reached]:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
            boxShadow: "inset 0 0 40px rgba(212,175,55,0.2)",
            border: "1px solid rgba(255,215,0,0.5)",
            borderRadius: "0.75rem",
          }} />

          <div className="relative z-10 p-5 sm:p-6">

            {/* Time (Large and Prominent) */}
            <div className="text-center mb-1">
              <h4 className="font-pirata text-3xl sm:text-4xl text-pirate-gold tracking-widest drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                {milestone.date}
              </h4>
            </div>

            {/* Subtitle / Day */}
            <p className="font-cinzel text-xs sm:text-sm font-bold text-pirate-white/50 tracking-[0.2em] uppercase text-center mb-5">
              {milestone.subtitle}
            </p>

            {/* Icon */}
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center border border-pirate-gold/25 group-hover:border-pirate-gold/50 group-[.reached]:border-pirate-gold/80 transition-all duration-500" style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
              boxShadow: "0 0 20px rgba(212,175,55,0.05)",
            }}>
              <IconComp className="w-5 h-5 text-pirate-gold/70 group-hover:text-pirate-gold group-[.reached]:text-[#FFD700] transition-colors duration-500" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-pirate-white group-hover:text-pirate-gold group-[.reached]:text-pirate-gold tracking-wider text-center mb-3 transition-colors duration-300">
              {milestone.title}
            </h3>

            {/* Divider */}
            <div className="w-12 h-[1px] mx-auto mb-3 bg-gradient-to-r from-transparent via-pirate-gold/30 to-transparent" />

            {/* Description */}
            <p className="font-cormorant text-sm text-pirate-white/50 leading-relaxed text-center group-hover:text-pirate-white/70 transition-colors duration-500">
              {milestone.desc}
            </p>

            {/* Final treasure glow */}
            {isFinal && (
              <div className="mt-4 flex justify-center">
                <div className="w-8 h-8 rounded-full animate-pulse-gold" style={{
                  background: "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(212,175,55,0.1) 50%, transparent 100%)",
                  boxShadow: "0 0 25px rgba(255,215,0,0.25)",
                }} />
              </div>
            )}
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-pirate-gold/15 rounded-tl-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-pirate-gold/15 rounded-tr-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-pirate-gold/15 rounded-bl-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-pirate-gold/15 rounded-br-lg group-hover:border-pirate-gold/40 transition-colors duration-500" />

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── MAIN TIMELINE ─── */
const Timeline = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const timelineContainerRef = useRef(null);

  // Gold particles
  const particles = useMemo(() =>
    Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1.5 + Math.random() * 3}px`,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 6,
    })),
    []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          y: 50, opacity: 0, duration: 1.2, ease: "power3.out",
        });
      }
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          y: 30, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out",
        });
      }

      // Draw the glowing straight line down
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, 
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          }
        );
      }

      // Move ship along the vertical path smoothly with GSAP
      gsap.fromTo(".pirate-ship", 
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainerRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        }
      );

      // Milestone nodes glow as they enter viewport initially
      gsap.utils.toArray(".timeline-node").forEach((node) => {
        gsap.from(node, {
          scrollTrigger: { trigger: node, start: "top 75%" },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        });
      });

      // Milestone items light up when the ship reaches them (center of screen)
      gsap.utils.toArray(".milestone-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "center 50%", // When exact center of item hits the center of the viewport
          onEnter: () => item.classList.add("reached"),
          onLeaveBack: () => item.classList.remove("reached"),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #030201 0%, #080604 15%, #0a0806 50%, #080604 85%, #040302 100%)",
      }}
    >
      {/* ─── Background ─── */}

      {/* Ocean gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 40% at 50% 30%, rgba(10,25,45,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 60% 30% at 50% 70%, rgba(212,175,55,0.02) 0%, transparent 50%)
        `,
      }} />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-color-dodge" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
      }} />

      {/* Gold particles */}
      {particles.map((p, i) => (
        <div
          key={`gold-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            background: "radial-gradient(circle, #FFD700 0%, #D4AF37 50%, transparent 100%)",
            animation: `prizeParticleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Decorative elements */}
      <div className="absolute top-20 right-[6%] opacity-[0.04] pointer-events-none">
        <Compass className="w-28 h-28 text-pirate-gold animate-[spin_30s_linear_infinite]" strokeWidth={0.4} />
      </div>
      <div className="absolute bottom-32 left-[5%] opacity-[0.04] pointer-events-none">
        <Skull className="w-16 h-16 text-pirate-gold" strokeWidth={0.5} />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[1100px] mx-auto">

        {/* Header */}
        <header className="text-center mb-16 sm:mb-20">
          <motion.div
            className="flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className="relative">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-pirate-gold/40 animate-[spin_20s_linear_infinite]" strokeWidth={1} />
            </div>
          </motion.div>

          <h2
            ref={titleRef}
            className="font-pirata text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider mb-4 flex justify-center flex-wrap"
            style={{
              textShadow: "0 0 40px rgba(212,175,55,0.2), 0 4px 15px rgba(0,0,0,0.8)",
            }}
            >
            {"The Pirate's Voyage".split("").map((char, index) => (
              <span
                key={index}
                className={`
                inline-block
                transition-all
                duration-300
                ease-out
                ${char === " " ? "w-4" : ""}
                `}
                style={{
                  background: "linear-gradient(180deg,#FFD700,#B8860B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.15)";
                  e.currentTarget.style.background ="linear-gradient(180deg,#FFF8C6 0%, #FFE866 20%, #FFD700 45%, #FFB700 70%, #B8860B 100%)";
                  e.currentTarget.style.WebkitBackgroundClip = "text";
                  e.currentTarget.style.WebkitTextFillColor = "transparent";
                  e.currentTarget.style.filter ="drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 18px #FFD700)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px) scale(1)";
                  e.currentTarget.style.background ="linear-gradient(180deg,#FFD700,#B8860B)";
                  e.currentTarget.style.WebkitBackgroundClip = "text";
                  e.currentTarget.style.WebkitTextFillColor = "transparent";
                  e.currentTarget.style.filter = "none";
                }}
                >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p
            ref={subtitleRef}
            className="font-cormorant italic text-base sm:text-lg lg:text-xl text-pirate-gold/50 max-w-[550px] mx-auto tracking-wide"
          >
            &ldquo;Every great captain must conquer every challenge before claiming the ultimate treasure.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-pirate-gold/30" />
            <Anchor className="w-3.5 h-3.5 text-pirate-gold/25" strokeWidth={1.5} />
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-pirate-gold/30" />
          </div>
        </header>

        {/* ─── Vertical Timeline ─── */}
        <div className="relative" ref={timelineContainerRef}>

          {/* Central Straight Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block z-0 pointer-events-none">
            {/* Background static faint line */}
            <div className="absolute inset-0 bg-gradient-to-b from-pirate-gold/10 via-pirate-gold/20 to-pirate-gold/10" />
            
            {/* Animated glowing line that draws downwards */}
            <div 
              ref={lineRef} 
              className="absolute inset-0 bg-pirate-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] origin-top" 
            />
          </div>

          {/* Mobile center line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] md:hidden bg-gradient-to-b from-pirate-gold/10 via-pirate-gold/20 to-pirate-gold/10" />

          {/* ─── Pirate Ship (moves along the path) ─── */}
          <div
            className="pirate-ship absolute z-30 pointer-events-none hidden md:block"
            style={{
              left: "50%",
              top: "5%",
              transform: "translate(-50%, -50%)",
              width: "88px",
              height: "68px",
            }}
          >
            {/* Ship glow */}
            <div className="absolute -inset-6 pointer-events-none" style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)",
            }} />
            <div style={{ animation: "shipBob 3s ease-in-out infinite" }}>
              <PirateShipSVG />
            </div>
          </div>

          {/* Mobile ship */}
          <div
            className="pirate-ship absolute z-30 pointer-events-none md:hidden"
            style={{
              left: "6px",
              top: "3%",
              transform: "translate(-50%, -50%)",
              width: "56px",
              height: "50px",
            }}
          >
            <div style={{ animation: "shipBob 3s ease-in-out infinite" }}>
              <PirateShipSVG />
            </div>
          </div>

          {/* ─── Milestone Items ─── */}
          <div className="relative flex flex-col gap-16 sm:gap-20 md:gap-24">
            {MILESTONES.map((ms, i) => {
              const side = i % 2 === 0 ? "left" : "right";

              return (
                <div key={ms.id} className="milestone-item group relative flex items-center">

                  {/* Center node dot (desktop) */}
                  <div className="timeline-node timeline-node-center absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-pirate-gold/50 bg-[#0a0806] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-500 group-[.reached]:scale-[1.4] group-[.reached]:border-pirate-gold group-[.reached]:bg-pirate-gold/20 group-[.reached]:shadow-[0_0_25px_rgba(255,215,0,0.8)]">
                      <div className="w-2 h-2 rounded-full bg-pirate-gold/60 transition-all duration-500 group-[.reached]:bg-[#FFD700] group-[.reached]:scale-[1.5] group-[.reached]:shadow-[0_0_10px_#FFD700]" />
                    </div>
                  </div>

                  {/* Mobile node dot */}
                  <div className="timeline-node absolute left-6 -translate-x-1/2 z-20 md:hidden flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-pirate-gold/40 bg-[#0a0806] flex items-center justify-center transition-all duration-500 group-[.reached]:scale-[1.4] group-[.reached]:border-pirate-gold group-[.reached]:bg-pirate-gold/20 group-[.reached]:shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-pirate-gold/50 transition-all duration-500 group-[.reached]:bg-[#FFD700] group-[.reached]:scale-[1.5]" />
                    </div>
                  </div>

                  {/* Card — desktop alternating, mobile always right */}
                  <div className="w-full flex md:hidden pl-14">
                    <IslandCard milestone={ms} index={i} side="right" />
                  </div>

                  <div className="hidden md:flex w-full">
                    {side === "left" ? (
                      <>
                        <div className="w-1/2 pr-12 lg:pr-16 flex justify-end">
                          <IslandCard milestone={ms} index={i} side="left" />
                        </div>
                        <div className="w-1/2" />
                      </>
                    ) : (
                      <>
                        <div className="w-1/2" />
                        <div className="w-1/2 pl-12 lg:pl-16 flex justify-start">
                          <IslandCard milestone={ms} index={i} side="right" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final treasure marker */}
          <motion.div
            className="flex justify-center mt-16 sm:mt-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{
              background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(212,175,55,0.05) 60%, transparent 100%)",
              border: "2px solid rgba(212,175,55,0.3)",
              boxShadow: "0 0 40px rgba(255,215,0,0.15), 0 0 80px rgba(212,175,55,0.05)",
            }}>
              <span className="text-2xl">🏴‍☠️</span>
              {/* Ping ring */}
              <div className="absolute inset-0 rounded-full border border-pirate-gold/20 animate-[ping_3s_linear_infinite] opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
