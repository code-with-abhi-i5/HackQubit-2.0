import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anchor, Skull, Code2, Terminal, Compass } from "lucide-react";
import shipNightImg from "../assets/images/about image left side.jpeg";
import aboutHackqubitImg from "../assets/images/about.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const leftVisualRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top heading animation
      gsap.from(".about-top-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
      });

      // Left visual entrance
      gsap.from(leftVisualRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: -50, opacity: 0, duration: 1.2, ease: "power3.out",
      });

      // Content area entrance
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: 50, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2,
      });

      // Animated Borders
      gsap.to(".animated-border-rect", {
        strokeDashoffset: -100,
        duration: 15,
        ease: "linear",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-24 px-6 sm:px-10 lg:px-16 flex flex-col items-center bg-[#0a0a0a] overflow-hidden"
    >

      {/* Subtle Mist/Fog Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] mix-blend-color-dodge pointer-events-none hidden md:block"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-[1500px] mx-auto w-full relative z-10 flex flex-col items-center">

        {/* Cinematic ABOUT US Heading Replaced by Image */}
        <div className="mt-12 mb-20 about-top-title flex flex-col items-center justify-center w-full relative">
          <img
            src={aboutHackqubitImg}
            alt="About HackQubit"
            className="w-full max-w-[800px] h-auto object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          />
        </div>

        {/* Modern Bento Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">

          {/* Main Description Box (Spans 2 cols, 2 rows) */}
          <div ref={contentRef} className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2 bg-[#111]/80 backdrop-blur-sm border border-pirate-gold/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-pirate-gold/40 transition-colors duration-500 flex flex-col justify-center">
            {/* Animated Border Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-30" xmlns="http://www.w3.org/2000/svg">
              <rect className="animated-border-rect" width="100%" height="100%" rx="24" fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="30 70" strokeDashoffset="0" />
            </svg>

            {/* Lamp Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-pirate-gold/20 blur-[40px] pointer-events-none rounded-full transform -translate-y-1/2 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/70 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-pirate-gold/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

            {/* Subtle Background SVGs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-700">
              <div className="absolute top-[10%] right-[10%] w-32 h-32 group-hover:animate-[floatIntense_3s_ease-in-out_infinite]">
                <Anchor className="w-full h-full text-pirate-gold rotate-12" strokeWidth={1} />
              </div>
              <div className="absolute bottom-[10%] left-[5%] w-40 h-40 group-hover:animate-[floatIntenseReverse_4s_ease-in-out_infinite]">
                <Code2 className="w-full h-full text-pirate-gold -rotate-12" strokeWidth={1} />
              </div>
              <div className="absolute top-[40%] left-[40%] w-24 h-24 group-hover:animate-[floatIntense_2.5s_ease-in-out_infinite]">
                <Skull className="w-full h-full text-pirate-gold rotate-45" strokeWidth={1} />
              </div>
              <div className="absolute top-[60%] right-[20%] w-28 h-28 group-hover:animate-[floatIntenseReverse_3.5s_ease-in-out_infinite]">
                <Terminal className="w-full h-full text-pirate-gold -rotate-6" strokeWidth={1} />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 group-hover:animate-[spinFast_10s_linear_infinite]">
                <Compass className="w-full h-full text-pirate-gold" strokeWidth={0.5} />
              </div>
            </div>

            <div className="relative z-10 font-inter text-sm sm:text-base text-pirate-white/70 leading-relaxed space-y-6">
              <p>
                <strong className="text-pirate-gold font-semibold text-lg sm:text-xl">HackQubit 2.0</strong> is a <strong className="text-pirate-gold/90 font-medium">24-hour national-level hackathon</strong> hosted by RVSCET, Jamshedpur, designed to bring together the brightest minds in technology, innovation, and creativity. Fueled by the thrill of an F1 race, this competition challenges participants to <strong className="text-pirate-gold/90 font-medium">Code, Create, and Conquer</strong> as they race against time to develop groundbreaking solutions.
              </p>

              {/* Divider */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-pirate-gold/80 to-transparent rounded-full" />

              <p>
                This year, the event welcomes students from across <strong className="text-pirate-gold/90 font-medium">India</strong> — regardless of background or branch — to compete in diverse domains. <strong className="text-pirate-gold font-medium">No pre-submissions, no PPTs — just pure innovation.</strong> Problem statements will be revealed on the spot, adding to the excitement and testing real-time problem-solving skills. From ideation to execution, teams will collaborate, strategize, and push their limits to claim the chequered flag and take home exciting prizes.
              </p>
            </div>
          </div>

          {/* Visual/Map Box (Spans 2 cols, 1 row) */}
          <div ref={leftVisualRef} className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-1 rounded-3xl overflow-hidden relative border border-pirate-gold/20 min-h-[280px] group p-1 bg-[#111]/80 backdrop-blur-sm">
            {/* Animated Border Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-30" xmlns="http://www.w3.org/2000/svg">
              <rect className="animated-border-rect" width="100%" height="100%" rx="24" fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="30 70" strokeDashoffset="0" />
            </svg>

            {/* Lamp Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-pirate-gold/20 blur-[40px] pointer-events-none rounded-full transform -translate-y-1/2 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/70 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-full h-full rounded-[20px] overflow-hidden relative">
              {/* Map Glow */}
              <div className="absolute inset-0 bg-pirate-gold/10 pointer-events-none group-hover:bg-transparent transition-colors z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14711.693067178232!2d86.273805!3d22.805307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e30ff76d3319%3A0x4986ace5ea086802!2sRVS%20College%20Of%20Engineering%20And%20Technology%2C%20Jamshedpur!5e0!3m2!1sen!2sin!4v1784198208951!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(100%) sepia(30%) hue-rotate(340deg) brightness(80%) contrast(120%)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 sm:p-8 pointer-events-none z-20">
                <div>
                  <p className="text-pirate-gold font-medium text-xs sm:text-sm tracking-[0.2em] uppercase mb-1 drop-shadow-md">Location</p>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold font-pirate-display tracking-wide drop-shadow-lg">RVSCET, Jamshedpur</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Box 1 (1 col, 1 row) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 md:row-span-1 bg-[#111]/80 backdrop-blur-sm border border-pirate-gold/20 rounded-3xl p-5 sm:p-6 relative overflow-hidden group hover:border-pirate-gold/40 transition-all duration-500 flex flex-col items-center justify-center text-center">
            {/* Animated Border Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-30" xmlns="http://www.w3.org/2000/svg">
              <rect className="animated-border-rect" width="100%" height="100%" rx="24" fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="30 70" strokeDashoffset="0" />
            </svg>

            {/* Lamp Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-pirate-gold/20 blur-[40px] pointer-events-none rounded-full transform -translate-y-1/2 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/70 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute inset-0 bg-pirate-gold/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <h3 className="relative z-10 text-3xl sm:text-4xl font-bold text-pirate-gold mb-2 font-pirate-display drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] leading-tight">
              Oct 7-8<br /><span className="text-xl sm:text-2xl text-pirate-gold/70">2026</span>
            </h3>
          </div>

          {/* Stat Box 2 (1 col, 1 row) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 md:row-span-1 bg-[#111]/80 backdrop-blur-sm border border-pirate-gold/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-pirate-gold/40 transition-all duration-500 flex flex-col items-center justify-center text-center">
            {/* Animated Border Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-30" xmlns="http://www.w3.org/2000/svg">
              <rect className="animated-border-rect" width="100%" height="100%" rx="24" fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="30 70" strokeDashoffset="0" />
            </svg>

            {/* Lamp Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-pirate-gold/20 blur-[40px] pointer-events-none rounded-full transform -translate-y-1/2 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/70 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="absolute inset-0 bg-pirate-gold/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />

            {/* Code Icon SVG */}
            <div className="relative z-10 mb-3 bg-pirate-black/50 p-3 rounded-xl border border-pirate-gold/20 group-hover:border-pirate-gold/50 transition-all duration-500 group-hover:animate-[floatIntense_2s_ease-in-out_infinite] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:bg-pirate-black/70">
              <svg className="w-8 h-8 text-pirate-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-pirate-white mb-1 font-pirate-display tracking-wider">Pure Code</h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
