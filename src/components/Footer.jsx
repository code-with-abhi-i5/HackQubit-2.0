import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Mail, MapPin, MessageSquare, Anchor, Award, ExternalLink } from "lucide-react";
import { FaLinkedinIn, FaDiscord, FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer
      id ="footer"
      ref={footerRef}
      className="relative bg-slate-950 text-slate-200 pt-20 pb-8 overflow-hidden border-t border-slate-800"
    >
      {/* Decorative Gold Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-amber-500/10 blur-[140px] pointer-events-none" />

      {/* Top Divider */}
      <div className="w-full flex justify-center absolute top-0 left-0 right-0">
        <div className="w-[85%] max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-5">
            <h2 className="font-cinzel font-bold text-3xl text-amber-400 tracking-wider flex items-center gap-2">
              <Anchor className="w-6 h-6 text-amber-500" />
              HACKQUBIT 2.0
            </h2>
            <p className="font-cinzel text-slate-400 text-xs leading-relaxed">
              Embark on the ultimate 24-hour coding voyage at RVSCET Jamshedpur. Unearth hidden tech treasures, brave challenges, and build epic projects alongside the finest hacker crew.
            </p>
            <div className="flex items-center gap-2 text-xs font-cinzel text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official 2026 Edition</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="font-cinzel font-bold text-lg text-white tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Quick Voyage Links
            </h3>
            <ul className="flex flex-col gap-2.5 font-cinzel text-xs text-slate-400">
              {[
                { label: "Home Base", href: "#home" },
                { label: "Voyage Map", href: "#timeline" },
                { label: "Prize Treasures", href: "#prizes" },
                { label: "Problem Statements", href: "#problem-statements" },
                { label: "Sponsorship Packages", href: "#sponsorship" },
                { label: "Sponsorship Perks", href: "#sponsorship-perks" },
                { label: "FAQ & Rules", href: "#faq" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-amber-400/0 group-hover:text-amber-400 transition-all duration-200">✦</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Location & Venue Details (Clean Card without raw iframe map) */}
          <div className="flex flex-col gap-5">
            <h3 className="font-cinzel font-bold text-lg text-white tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Captain's Quarters & Venue
            </h3>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col gap-4 text-xs font-cinzel text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">RVSCET Jamshedpur</span>
                  <span className="text-slate-400">RVS College of Engineering & Technology, Edalbera, Jamshedpur, Jharkhand</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="hackqubit2.0@gmail.com" className="hover:text-amber-400 transition-colors text-slate-300">
                  hackqubit2.0@gmail.com
                </a>
              </div>

              <a
                href="https://maps.google.com/?q=RVSCET+Jamshedpur"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold transition-all duration-200 group"
              >
                <span>View Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 4: Community & Social Fleet */}
          <div className="flex flex-col gap-5">
            <h3 className="font-cinzel font-bold text-lg text-white tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Join The Fleet
            </h3>
            <p className="font-cinzel text-slate-400 text-xs leading-relaxed">
              Connect with our pirate community on social media for announcements, teaser hints, and crew teamups.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaDiscord className="w-4 h-4" />, label: "Discord", href: "https://discord.gg/3nJdTFxK" },
                { icon: <FaYoutube className="w-4 h-4" />, label: "YouTube", href: "https://www.youtube.com/channel/UCRR5Cgctq1cX-63U3o86G_A" },
                { icon: <FaFacebookF className="w-4 h-4" />, label: "Facebook", href: "https://www.facebook.com/people/Helix-The-Tech-AI-Club/61575162227587/" },
                { icon: <FaLinkedinIn className="w-4 h-4" />, label: "LinkedIn", href: "https://www.linkedin.com/company/helixrvscet/posts/?feedView=all" },
                { icon: <FaInstagram className="w-4 h-4" />, label: "Instagram", href: "https://www.instagram.com/helixrvscet?igsh=MXBicHRjbmdscTg4bQ==" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10 hover:-translate-y-1 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-800 gap-4 text-xs font-cinzel text-slate-500">
          <p>&copy; {new Date().getFullYear()} HackQubit 2.0. All pirate treasures reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <span className="text-amber-400 animate-pulse">✦</span> by Helix Crew
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
