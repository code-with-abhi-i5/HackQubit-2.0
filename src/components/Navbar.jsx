import { useState, useRef, forwardRef } from "react";
import { Sun, Moon, Compass } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NAV_LINKS } from "../constants";
import { useScrollPosition } from "../hooks";
import { gsap } from "gsap";
import { PirateMobileMenu, HamburgerToggle } from "./PirateMobileNav";

import logoRvscet from "../assets/images/logo_rvscet.png";
import logoRed    from "../assets/images/logo_red.png";
import logoHelix  from "../assets/images/logo_helix.jpg";

const Navbar = forwardRef((props, ref) => {
  const isScrolled = useScrollPosition(50);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const linkRefs = useRef([]);

  const handleLinkHover = (index) => {
    gsap.to(linkRefs.current[index], {
      y: -2,
      color: "#D4AF37",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLinkLeave = (index) => {
    gsap.to(linkRefs.current[index], {
      y: 0,
      color: "",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav
        ref={ref}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-2xl bg-[#0a0f1d]/92 shadow-[0_4px_40px_rgba(0,0,0,0.55)] border-b border-amber-500/15"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="flex items-center justify-between h-18 lg:h-20">

            {/* ── LEFT: Three partner logos ── */}
            <div className="flex items-center gap-3">
              {/* RVSCET */}
              <a
                href="#home"
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-white border-2 border-amber-400/40 hover:border-amber-400 hover:shadow-[0_0_14px_rgba(212,175,55,0.5)] transition-all duration-300 overflow-hidden p-2.5 shadow-md"
                title="RVSCET"
              >
                <img
                  src={logoRvscet}
                  alt="RVSCET Logo"
                  className="w-full h-full object-contain rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Divider pip */}
              <span className="hidden sm:block w-px h-6 bg-white/20 rounded-full" />

              {/* Red logo */}
              <a
                href="#home"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-red-400/40 hover:border-red-400 hover:shadow-[0_0_14px_rgba(239,68,68,0.5)] transition-all duration-300 overflow-hidden p-0.5 shadow-md"
                title="Partner"
              >
                <img
                  src={logoRed}
                  alt="Partner Logo"
                  className="w-full h-full object-contain rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Divider pip */}
              <span className="hidden sm:block w-px h-6 bg-white/20 rounded-full" />

              {/* HELIX */}
              <a
                href="#home"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-blue-400/40 hover:border-blue-400 hover:shadow-[0_0_14px_rgba(96,165,250,0.5)] transition-all duration-300 overflow-hidden p-0 shadow-md"
                title="Helix"
              >
                <img
                  src={logoHelix}
                  alt="Helix Logo"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Divider before site name */}
              <span className="hidden md:block w-px h-8 bg-white/20 rounded-full mx-1" />

              {/* Site Name */}
              <a href="#home" className="hidden md:flex flex-col leading-none group">
                <span className="font-cinzel text-base font-black text-white tracking-widest drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:text-amber-400 transition-colors duration-300">
                  HackQubit
                </span>
                <span className="font-cinzel text-[8px] text-amber-400/80 tracking-[0.4em] uppercase mt-0.5">
                  2.0 — Sail & Code
                </span>
              </a>
            </div>

            {/* ── CENTER: Nav Links (Desktop) ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  ref={(el) => (linkRefs.current[i] = el)}
                  href={link.href}
                  onMouseEnter={() => handleLinkHover(i)}
                  onMouseLeave={() => handleLinkLeave(i)}
                  className="relative px-4 py-2 font-cinzel text-[13px] text-white/80 tracking-wide transition-colors duration-300 group"
                >
                  {link.label}
                  {/* Amber underline glow */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:w-4/5 transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* ── RIGHT: Theme + Register ── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-white/15 hover:border-amber-400/50 hover:bg-amber-400/10 text-white/60 hover:text-white transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* CTA — Register Now */}
              <a
                href="#register"
                className="relative group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-cinzel text-[13px] text-slate-950 font-black tracking-wider transition-all duration-400 hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_28px_rgba(212,175,55,0.45)] overflow-hidden"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Compass className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                <span className="relative z-10">Register Now</span>
              </a>
            </div>

            {/* ── Mobile Hamburger ── */}
            <HamburgerToggle isOpen={isMobileOpen} toggle={() => setIsMobileOpen(!isMobileOpen)} />
          </div>
        </div>

        {/* Bottom border glow line */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        )}
      </nav>

      {/* Mobile Slide-in Menu */}
      <PirateMobileMenu isOpen={isMobileOpen} close={() => setIsMobileOpen(false)} />
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
