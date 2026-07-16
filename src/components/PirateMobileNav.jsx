import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Skull, Home, Info, Clock, DollarSign, Users, Image as ImageIcon, HelpCircle, PhoneCall } from 'lucide-react';

const BONE_ICONS = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: Info },
  { label: 'Timeline', href: '#timeline', icon: Clock },
  { label: 'Prize Pool', href: '#prizes', icon: DollarSign },
  { label: 'Sponsors', href: '#sponsors', icon: Users },
  { label: 'Gallery', href: '#gallery', icon: ImageIcon },
  { label: 'FAQ', href: '#faq', icon: HelpCircle },
  { label: 'Contact', href: '#contact', icon: PhoneCall },
];

export const BoneToggle = ({ isOpen, toggle }) => {
  const containerRef = useRef(null);
  const topBoneRef = useRef(null);
  const midBoneRef = useRef(null);
  const botBoneRef = useRef(null);
  const skullRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(midBoneRef.current, { opacity: 0, scaleX: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(topBoneRef.current, { y: 7, rotate: 45, duration: 0.4, ease: 'back.out(1.2)' });
      gsap.to(botBoneRef.current, { y: -7, rotate: -45, duration: 0.4, ease: 'back.out(1.2)' });
      gsap.to(skullRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.5, delay: 0.2, ease: 'elastic.out(1, 0.5)' });
    } else {
      gsap.to(skullRef.current, { opacity: 0, scale: 0.5, rotate: -90, duration: 0.3, ease: 'power2.inOut' });
      gsap.to([topBoneRef.current, botBoneRef.current], { y: 0, rotate: 0, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 });
      gsap.to(midBoneRef.current, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.inOut', delay: 0.2 });
    }
  }, [isOpen]);

  const renderBone = (ref) => (
    <div ref={ref} className="bone-texture w-7 h-[3px] my-[2px] origin-center drop-shadow-md">
      <div className="bone-end-left-top scale-[0.6] -translate-x-[2px]" />
      <div className="bone-end-left-bottom scale-[0.6] -translate-x-[2px]" />
      <div className="bone-end-right-top scale-[0.6] translate-x-[2px]" />
      <div className="bone-end-right-bottom scale-[0.6] translate-x-[2px]" />
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-10 h-10 flex flex-col items-center justify-center cursor-pointer z-[60] group lg:hidden"
      onClick={toggle}
    >
      {/* 3 Bones */}
      <div className="flex flex-col items-center justify-center w-full h-full">
        {renderBone(topBoneRef)}
        {renderBone(midBoneRef)}
        {renderBone(botBoneRef)}
      </div>

      {/* Skull and Crossbones that fades in */}
      <div 
        ref={skullRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 -rotate-90 pointer-events-none"
      >
        <Skull className="w-6 h-6 text-pirate-gold skull-glow drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
};

export const PirateMobileMenu = ({ isOpen, close }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 lg:hidden"
        style={{
          zIndex: 30,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          backdropFilter: isOpen ? 'blur(4px)' : 'none',
          WebkitBackdropFilter: isOpen ? 'blur(4px)' : 'none',
          transition: 'all 0.5s ease-in-out',
          visibility: isOpen ? 'visible' : 'hidden'
        }}
        onClick={close}
      />
      
      {/* Slide-in Map Sidebar */}
      <div 
        className="fixed top-0 right-0 w-4/5 max-w-sm h-full map-sidebar lg:hidden flex flex-col pt-24 px-6 pb-10 overflow-y-auto"
        style={{
          zIndex: 40,
          transform: isOpen ? 'translateX(0)' : 'translateX(120%)',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 0.5s ease-in-out, visibility 0.5s ease-in-out'
        }}
      >
        {/* Lantern Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pirate-gold/20 rounded-full blur-[80px] pointer-events-none lantern-glow" style={{ animation: 'lanternFlicker 4s infinite' }} />
        
        {/* Menu Items */}
        <div className="flex flex-col gap-3 relative z-10">
          {BONE_ICONS.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={close}
                style={{ transitionDelay: isOpen ? `${0.3 + i * 0.1}s` : '0s' }}
                className={`nav-item-wood relative flex items-center gap-4 px-6 py-4 rounded-md group transition-all duration-500 hover:scale-[1.02] ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pirate-gold/0 via-pirate-gold/10 to-pirate-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
                <Icon className="w-5 h-5 text-pirate-gold/80 group-hover:text-pirate-gold group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
                <span className="font-cinzel text-pirate-gold/90 tracking-widest text-sm font-semibold group-hover:text-pirate-white transition-colors duration-300 text-shadow-cinematic">
                  {item.label}
                </span>
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-pirate-gold via-[#FFE066] to-transparent group-hover:w-full transition-all duration-700 ease-out" />
              </a>
            )
          })}
        </div>

        {/* Decorative elements at bottom */}
        <div className="mt-auto pt-8 flex justify-center items-center gap-4 opacity-60">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pirate-gold/50 to-transparent" />
          <Skull className="w-6 h-6 text-pirate-gold shrink-0" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pirate-gold/50 to-transparent" />
        </div>
      </div>
    </>
  );
};
