import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Compass, Home, Info, Clock, DollarSign, Users, Image as ImageIcon, HelpCircle, PhoneCall, X } from 'lucide-react';
import hackqubitLogo from '../assets/images/hackqubit_jewel_title.png';

const NAV_ITEMS = [
  { label: 'Home',       href: '#home',        icon: Home },
  { label: 'About',      href: '#about',       icon: Info },
  { label: 'Timeline',   href: '#timeline',    icon: Clock },
  { label: 'Prize Pool', href: '#prizes',      icon: DollarSign },
  { label: 'Sponsors',   href: '#sponsorship', icon: Users },
  { label: 'Gallery',    href: '#gallery',     icon: ImageIcon },
  { label: 'FAQ',        href: '#faq',         icon: HelpCircle },
  { label: 'Contact',    href: '#footer',      icon: PhoneCall },
];

/* ── Hamburger / X toggle ── */
export const HamburgerToggle = ({ isOpen, toggle }) => {
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(line1.current, { y: 7,  rotate: 45,  duration: 0.35, ease: 'back.out(1.5)' });
      gsap.to(line2.current, { opacity: 0, scaleX: 0, duration: 0.2 });
      gsap.to(line3.current, { y: -7, rotate: -45, duration: 0.35, ease: 'back.out(1.5)' });
    } else {
      gsap.to([line1.current, line3.current], { y: 0, rotate: 0, duration: 0.35, ease: 'back.out(1.5)' });
      gsap.to(line2.current, { opacity: 1, scaleX: 1, duration: 0.3, delay: 0.1 });
    }
  }, [isOpen]);

  return (
    <button
      onClick={toggle}
      className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-0 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/25 hover:border-amber-400/60 transition-all duration-300"
      aria-label="Toggle menu"
    >
      <span ref={line1} className="block w-5 h-[1.5px] bg-amber-200 rounded-full origin-center" />
      <span ref={line2} className="block w-5 h-[1.5px] bg-amber-200 rounded-full origin-center mt-[5px]" />
      <span ref={line3} className="block w-5 h-[1.5px] bg-amber-200 rounded-full origin-center mt-[5px]" />
    </button>
  );
};

/* ── Mobile slide-in drawer ── */
export const PirateMobileMenu = ({ isOpen, close }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 lg:hidden backdrop-blur-sm"
        style={{
          zIndex: 45,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          background: 'rgba(120, 80, 20, 0.35)',
        }}
        onClick={close}
      />

      {/* Drawer — pirate sky theme */}
      <div
        className="fixed top-0 right-0 w-4/5 max-w-sm h-full lg:hidden flex flex-col pt-6 px-6 pb-10 overflow-y-auto bg-white/10 backdrop-blur-xl"
        style={{
          zIndex: 48,
          boxShadow: '-20px 0 80px rgba(100,60,0,0.35)',
          transform: isOpen ? 'translateX(0)' : 'translateX(110%)',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1), visibility 0.45s',
        }}
      >
        {/* Decorative cloud blobs */}
        <div className="pointer-events-none absolute top-10 -right-6 w-32 h-20 rounded-full bg-white/30 blur-2xl" />
        <div className="pointer-events-none absolute top-1/3 -left-4 w-24 h-16 rounded-full bg-white/25 blur-2xl" />
        <div className="pointer-events-none absolute bottom-20 right-2 w-28 h-16 rounded-full bg-amber-200/40 blur-2xl" />

        {/* Header row */}
        <div className="flex items-center justify-end mb-8 pb-5 border-b border-amber-900/20 relative z-10">
          <button
            onClick={close}
            className="p-2 bg-amber-100/50 hover:bg-amber-400/50 rounded-full border border-amber-700/20 transition-colors text-amber-900 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-2 flex-1 relative z-10">
          {NAV_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={close}
                style={{ transitionDelay: isOpen ? `${0.05 * i}s` : '0s' }}
                className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl border border-amber-900/15 bg-white/30 hover:bg-amber-400/30 hover:border-amber-700/40 backdrop-blur-sm transition-all duration-300 ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100/60 group-hover:bg-amber-400/50 border border-amber-700/20 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-amber-900 group-hover:text-amber-950 transition-colors duration-300" />
                </div>
                <span className="font-cinzel text-sm font-bold text-amber-950 tracking-widest group-hover:text-amber-900 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="ml-auto text-amber-700/50 group-hover:text-amber-900 transition-colors duration-300 text-base font-bold">›</span>
              </a>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-amber-900/20 relative z-10">
          <a
            href="https://forms.gle/STi1SKZ8uK1fCVQr7"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl font-cinzel text-sm text-amber-50 font-black tracking-wider shadow-lg hover:shadow-[0_0_24px_rgba(180,120,20,0.5)] transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            Register Now
          </a>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
            <Compass className="w-3 h-3 text-amber-700/50" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
          </div>
          <p className="text-center font-cinzel text-[10px] text-amber-800/70 mt-3 tracking-widest uppercase">
            ⚓ Sail the High Seas of Code
          </p>
        </div>
      </div>
    </>
  );
};
