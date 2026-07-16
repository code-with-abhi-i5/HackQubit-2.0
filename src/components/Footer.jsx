import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Map, Mail, MapPin, MessageSquare } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const dividerRef = useRef(null);
  const colRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Divider expanding animation
      gsap.fromTo(dividerRef.current, 
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          }
        }
      );

      // Columns stagger fade up
      gsap.fromTo(colRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#020202] pt-20 pb-6 overflow-hidden border-t border-pirate-gold/10"
    >
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-pirate-gold/5 blur-[150px] pointer-events-none" />

      {/* --- Top Golden Divider --- */}
      <div className="w-full flex justify-center absolute top-0 left-0 right-0">
        <div ref={dividerRef} className="w-[80%] max-w-[1200px] h-[2px] bg-gradient-to-r from-transparent via-pirate-gold/60 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.8)] origin-center" />
        <div className="absolute top-0 -translate-y-1/2 bg-[#020202] p-2 rounded-full border border-pirate-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.5)] z-10">
          <Compass className="w-6 h-6 text-pirate-gold animate-[spin_20s_linear_infinite]" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div ref={el => colRefs.current[0] = el} className="flex flex-col gap-6">
            <h2 className="font-pirate text-3xl sm:text-4xl text-pirate-gold tracking-widest drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              HACKQUBIT <span className="text-pirate-white">2.0</span>
            </h2>
            <p className="font-inter text-pirate-white/70 text-sm leading-relaxed">
              Embark on the ultimate coding voyage. Unearth hidden tech treasures, brave the coding challenges, and forge legendary projects alongside the finest crew of developers.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div ref={el => colRefs.current[1] = el} className="flex flex-col gap-6">
            <h3 className="font-cinzel font-bold text-xl text-pirate-white tracking-widest flex items-center gap-3">
              <Map className="w-5 h-5 text-pirate-gold" />
              Navigation Map
            </h3>
            <ul className="flex flex-col gap-3 font-inter text-pirate-white/60">
              {['Home Base', 'The Treasures', 'Our Sponsors', 'FAQ & Rules', 'Register Crew'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-pirate-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="text-pirate-gold/0 group-hover:text-pirate-gold transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">✦</span>
                    <span className="transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div ref={el => colRefs.current[2] = el} className="flex flex-col gap-6">
            <h3 className="font-cinzel font-bold text-xl text-pirate-white tracking-widest flex items-center gap-3">
              <Mail className="w-5 h-5 text-pirate-gold" />
              Captain's Quarters
            </h3>
            <ul className="flex flex-col gap-4 font-inter text-sm text-pirate-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pirate-gold shrink-0 mt-0.5" />
                <a href="https://www.rvscollege.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-pirate-gold transition-colors duration-300">
                  RVS College Of Engineering<br/>
                  And Technology, Jamshedpur
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pirate-gold shrink-0" />
                <a href="mailto:hello@hackqubit.com" className="hover:text-pirate-gold transition-colors duration-300">
                  captain@hackqubit.com
                </a>
              </li>
            </ul>

            {/* Pirate-Themed Map Embed */}
            <div className="w-full h-32 mt-2 rounded-lg overflow-hidden border border-pirate-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] group relative">
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
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Column 4: Socials */}
          <div ref={el => colRefs.current[3] = el} className="flex flex-col gap-6">
            <h3 className="font-cinzel font-bold text-xl text-pirate-white tracking-widest flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-pirate-gold" />
              The Crew
            </h3>
            <p className="font-inter text-pirate-white/70 text-sm">
              Join our fleet on social media for the latest treasure maps and updates.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {[
                { icon: <FaDiscord className="w-5 h-5" />, label: "Discord" },
                { icon: <FaTwitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <FaLinkedinIn className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <FaGithub className="w-5 h-5" />, label: "GitHub" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-pirate-gold/30 bg-black/50 flex items-center justify-center text-pirate-white hover:text-pirate-gold hover:border-pirate-gold hover:bg-pirate-gold/10 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-pirate-gold/10 gap-4">
          <p className="font-inter text-pirate-white/50 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} HackQubit 2.0. All treasures reserved.
          </p>
          <p className="font-inter text-pirate-white/50 text-xs sm:text-sm text-center sm:text-right flex items-center gap-1">
            Forged with <span className="text-[#ED232A] animate-pulse">❤️</span> by the HackQubit Crew
          </p>
        </div>

      </div>
    </footer>
  );
};



export default Footer;
