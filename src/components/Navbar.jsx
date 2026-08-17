import { useState, useEffect, useRef, forwardRef } from "react";
import { Compass } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { useScrollPosition } from "../hooks";
import { gsap } from "gsap";
import { PirateMobileMenu, HamburgerToggle } from "./PirateMobileNav";

import logoRvscet from "../assets/images/logo_rvscet.png";
import logoRed from "../assets/images/logo_red.png";
import logoHelix from "../assets/images/logo_helix.png";

const Navbar = forwardRef((props, ref) => {
  const isScrolled = useScrollPosition(50);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const shouldBeVisible = currentScrollY <= lastScrollY.current || currentScrollY <= 100;
          
          if (shouldBeVisible !== isVisibleRef.current) {
            isVisibleRef.current = shouldBeVisible;
            setIsVisible(shouldBeVisible);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[98%] sm:w-[96%] max-w-[1400px] z-40 transition-all duration-500 rounded-full border border-amber-500/20 ${isScrolled
          ? "backdrop-blur-sm bg-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent shadow-none border-transparent"
          } ${!isVisible ? "lg:-translate-y-[150%]" : "translate-y-0"}`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* ── LEFT: Three partner logos ── */}
            <div className="flex items-center gap-3">
              {/* RVSCET */}
              <a
                href="#home"
                className="group flex items-center justify-center w-8 h-8 rounded-full hover:shadow-[0_0_16px_rgba(212,175,55,0.6)] transition-all duration-300 overflow-hidden p-0 shadow-md"
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

              {/* HELIX */}
              <a
                href="#home"
                className="group flex items-center justify-center w-8 h-8 rounded-full hover:shadow-[0_0_16px_rgba(212,175,55,0.6)] transition-all duration-300 overflow-hidden p-0 shadow-md"
                title="Helix"
              >
                <img
                  src={logoHelix}
                  alt="Helix Logo"
                  className="w-full h-full object-contain rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Divider pip */}
              <span className="hidden sm:block w-px h-6 bg-white/20 rounded-full" />

              {/* HackQubit Shield logo */}
              <a
                href="#home"
                className="group flex items-center justify-center w-8 h-8 transition-all duration-300 p-0"
                title="HackQubit Emblem"
              >
                <img
                  src={logoRed}
                  alt="HackQubit Shield Logo"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Divider before site name */}
              <span className="hidden md:block w-px h-8 bg-white/20 rounded-full mx-1" />

              {/* Site Name */}
              <a href="#home" className="hidden md:flex flex-col leading-none group">
                <span className="font-cinzel text-sm font-black text-white tracking-widest drop-shadow-[0_0_12px_rgba(212,175,55,0.9)] group-hover:text-amber-400 transition-colors duration-300">
                  HACK QUBIT 2.0
                </span>
                <span className="font-cinzel text-[7px] text-amber-400/80 tracking-[0.4em] uppercase mt-0.5 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                  24 HR HACKATHON
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
                  className="relative px-2.5 xl:px-3.5 py-2 font-cinzel text-[12px] xl:text-[13px] font-semibold text-white/80 tracking-wide transition-colors duration-300 group whitespace-nowrap"
                >
                  {link.label}
                  {/* Amber underline glow */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:w-4/5 transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* ── RIGHT: Actions ── */}
            <div className="flex items-center gap-3">
              {/* CTA — Register Now (Desktop) */}
              <a
                href="https://forms.gle/STi1SKZ8uK1fCVQr7"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex relative group items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-cinzel text-[13px] text-slate-950 font-black tracking-wider transition-all duration-400 hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_28px_rgba(212,175,55,0.45)] overflow-hidden"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Compass className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                <span className="relative z-10">Register Now</span>
              </a>

              {/* ── Mobile Hamburger ── */}
              <div className="relative z-50 lg:hidden">
                <HamburgerToggle isOpen={isMobileOpen} toggle={() => setIsMobileOpen(!isMobileOpen)} />
              </div>
            </div>
          </div>
        </div>

        {/* Optional inner glow/shadow for the pill could go here, but removed the full-width bottom border */}
      </nav>

      {/* Mobile Slide-in Menu */}
      <PirateMobileMenu isOpen={isMobileOpen} close={() => setIsMobileOpen(false)} />
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
