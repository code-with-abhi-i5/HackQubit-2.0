import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shipNightImg from "../assets/images/about image left side.jpeg";
import treasureImg from "../assets/images/about image right side.jpeg";
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
        className="absolute inset-0 z-0 opacity-[0.03] mix-blend-color-dodge pointer-events-none"
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

        {/* Main Content Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Left Side: Visual Panel */}
          <div ref={leftVisualRef} className="w-full lg:w-[40%] xl:w-[45%] flex-shrink-0 flex items-center justify-center">
            <img
              src={shipNightImg}
              alt="Pirate Ship Visual"
              className="w-full h-auto max-h-[800px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right Side: Content Area */}
          <div ref={contentRef} className="w-full lg:w-[60%] xl:w-[55%] relative flex flex-col justify-center">

            {/* Right Background Image */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
              <img src={treasureImg} className="w-full h-full object-cover rounded-md" alt="Right Background" />
              <div className="absolute inset-0 bg-black/60 rounded-md" /> {/* Darken to make text readable */}
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full p-8 sm:p-10 lg:p-14 flex flex-col">


              {/* Typography & Content */}
              <div className="relative z-10 font-inter text-sm sm:text-base text-pirate-white/70 leading-relaxed space-y-6">
                <p>
                  <strong className="text-pirate-gold font-semibold">Pirates of the Sea</strong> is a student-driven initiative dedicated to <strong className="text-pirate-gold/90 font-medium">fostering technical excellence and innovation</strong> within the college community. The club provides a structured platform for students to enhance their <strong className="text-pirate-gold/90 font-medium">programming skills</strong>, engage in <strong className="text-pirate-gold/90 font-medium">collaborative learning</strong>, and apply their knowledge through practical projects. With a focus on coding challenges, <strong className="text-pirate-gold/90 font-medium">technical workshops, hackathons</strong>, and <strong className="text-pirate-gold/90 font-medium">knowledge-sharing sessions</strong>, Helix nurtures <strong className="text-pirate-gold/90 font-medium">problem-solving abilities</strong> and encourages members to explore diverse areas of computer science.
                </p>

                <p>
                  The club emphasizes both individual growth and teamwork, equipping students with the skills required to excel in academic pursuits, industry roles, and competitive programming. By cultivating an environment of discipline, <strong className="text-pirate-gold/90 font-medium">creativity</strong>, and continuous learning, Helix aspires to inspire <strong className="text-pirate-gold/90 font-medium">future technologists</strong> and innovators who can contribute meaningfully to the <strong className="text-pirate-gold/90 font-medium">ever-evolving digital landscape</strong>.
                </p>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-pirate-gold/20 to-transparent my-8" />

                <p>
                  <strong className="text-pirate-gold font-semibold">HackQubit 2.0</strong> is a <strong className="text-pirate-gold/90 font-medium">24-hour national-level hackathon</strong> hosted by RVSCET, Jamshedpur, designed to bring together the brightest minds in technology, innovation, and creativity. Fueled by the thrill of an F1 race, this competition challenges participants to <strong className="text-pirate-gold/90 font-medium">Code, Create, and Conquer</strong> as they race against time to develop groundbreaking solutions.
                </p>

                <p>
                  This year, the event welcomes students from across <strong className="text-pirate-gold/90 font-medium">India</strong> — regardless of background or branch — to compete in diverse domains. <strong className="text-pirate-gold font-medium">No pre-submissions, no PPTs — just pure innovation.</strong> Problem statements will be revealed on the spot, adding to the excitement and testing real-time problem-solving skills. From ideation to execution, teams will collaborate, strategize, and push their limits to claim the chequered flag and take home exciting prizes.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
