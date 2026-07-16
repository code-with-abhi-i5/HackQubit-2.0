import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Compass, Skull, Trophy, Map } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "Registration Opens",
    date: "Day 1",
    desc: "Gather your crew and sign up for the ultimate adventure.",
    icon: <Map className="w-10 h-10 text-pirate-gold" />
  },
  {
    title: "The Voyage Begins",
    date: "Day 15",
    desc: "Opening ceremony and the start of the 24-hour hackathon.",
    icon: <Anchor className="w-10 h-10 text-pirate-gold" />
  },
  {
    title: "Navigating the Storm",
    date: "Day 16 (Midnight)",
    desc: "Intense coding, late-night snacks, and mentorship sessions.",
    icon: <Skull className="w-10 h-10 text-pirate-gold" />
  },
  {
    title: "X Marks the Spot",
    date: "Day 16 (Evening)",
    desc: "Final submissions, project demos, and the grand prize distribution.",
    icon: <Trophy className="w-10 h-10 text-pirate-gold" />
  }
];

const Journey = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".journey-step");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // base vertical scrolling on how wide the container is so it feels more natural.
          end: () => "+=" + trackRef.current.offsetWidth
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="relative h-screen bg-[#060403] overflow-hidden flex items-center">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pirate-gold/5 via-transparent to-black pointer-events-none" />

      {/* Title */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
        <h2 className="font-pirate text-3xl sm:text-5xl text-pirate-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] tracking-widest">
          The Hackathon Journey
        </h2>
        <div className="flex items-center justify-center gap-4 mt-4 opacity-60">
          <div className="w-12 h-[1px] bg-pirate-gold" />
          <Compass className="w-5 h-5 text-pirate-gold animate-[spin_10s_linear_infinite]" />
          <div className="w-12 h-[1px] bg-pirate-gold" />
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div ref={trackRef} className="flex h-full items-center pl-[10vw] sm:pl-[20vw]">
        {/* The dashed treasure map path */}
        <div className="absolute top-1/2 left-0 w-[400vw] h-0 border-t-2 border-dashed border-pirate-gold/20 -translate-y-1/2 z-0" />

        {milestones.map((step, idx) => (
          <div 
            key={idx} 
            className="journey-step relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] h-[60vh] flex flex-col items-center justify-center px-8 z-10 group"
          >
            {/* The Island Node */}
            <div className="w-24 h-24 rounded-full bg-[#0a0806] border-2 border-pirate-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-pirate-gold group-hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
              {step.icon}
              <div className="absolute inset-0 rounded-full border border-pirate-gold/20 animate-[ping_3s_linear_infinite] opacity-20" />
            </div>

            {/* Content Box */}
            <div className="bg-[#0d0a07] border border-pirate-white/10 p-6 rounded-lg text-center shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-pirate-gold/30">
              <span className="inline-block px-3 py-1 bg-pirate-gold/10 border border-pirate-gold/30 rounded text-pirate-gold font-inter font-bold text-xs uppercase tracking-widest mb-4">
                {step.date}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl text-pirate-white mb-3 tracking-wide">
                {step.title}
              </h3>
              <p className="font-inter text-pirate-white/70 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
        {/* End Padding to allow the last item to scroll into center */}
        <div className="journey-step w-[50vw] flex-shrink-0" />
      </div>
    </section>
  );
};

export default Journey;
