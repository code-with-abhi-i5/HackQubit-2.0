import { useState, useRef, forwardRef } from "react";
import { Skull, Anchor } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "../constants";
import { useScrollPosition } from "../hooks";
import { gsap } from "gsap";

const Navbar = forwardRef((props, ref) => {
  const isScrolled = useScrollPosition(50);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const linkRefs = useRef([]);

  const handleLinkHover = (index) => {
    gsap.to(linkRefs.current[index], {
      y: -2,
      color: "#D4AF37",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLinkLeave = (index) => {
    gsap.to(linkRefs.current[index], {
      y: 0,
      color: "#F8F5F2",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <nav
      ref={ref}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "glass-navbar shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Skull
                className="w-8 h-8 text-pirate-gold transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 w-8 h-8 bg-pirate-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cinzel text-lg font-bold text-pirate-white tracking-wider">
                {SITE_NAME.split(" ")[0]}
              </span>
              <span className="font-inter text-[10px] text-pirate-gold/70 tracking-[0.3em] uppercase">
                {SITE_NAME.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </a>

          {/* Center Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => (linkRefs.current[i] = el)}
                href={link.href}
                onMouseEnter={() => handleLinkHover(i)}
                onMouseLeave={() => handleLinkLeave(i)}
                className="relative px-5 py-2 font-inter text-sm text-pirate-white/90 tracking-wide transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-pirate-gold to-transparent group-hover:w-4/5 transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="#crew"
              className="relative group flex items-center gap-2.5 px-6 py-2.5 border border-pirate-gold/50 rounded font-cinzel text-sm text-pirate-gold tracking-wider transition-all duration-500 hover:border-pirate-gold hover:bg-pirate-gold/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <span>Join The Crew</span>
              <Anchor className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded bg-gradient-to-r from-pirate-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[1.5px] bg-pirate-gold transition-all duration-500 ${
                isMobileOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-pirate-gold transition-all duration-500 ${
                isMobileOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-pirate-gold transition-all duration-500 ${
                isMobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-navbar px-6 py-6 border-t border-pirate-gold/10">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-inter text-sm text-pirate-white/80 tracking-wide py-3 px-4 rounded transition-all duration-300 hover:bg-pirate-gold/5 hover:text-pirate-gold hover:pl-6"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#crew"
              onClick={() => setIsMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-3 border border-pirate-gold/50 rounded font-cinzel text-sm text-pirate-gold tracking-wider hover:bg-pirate-gold/10 transition-all duration-300"
            >
              <span>Join The Crew</span>
              <Anchor className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
