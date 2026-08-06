import { forwardRef, useRef } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { gsap } from "gsap";
import { SOCIAL_LINKS } from "../constants";

const ICON_MAP = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

const SocialIcons = forwardRef((props, ref) => {
  const iconRefs = useRef([]);

  const handleEnter = (index) => {
    gsap.to(iconRefs.current[index], {
      scale: 1.3,
      color: "#D4AF37",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (index) => {
    gsap.to(iconRefs.current[index], {
      scale: 1,
      color: "#F8F5F280",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={ref}
      className="absolute left-6 sm:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6"
    >
      {SOCIAL_LINKS.map((social, i) => {
        const IconComponent = ICON_MAP[social.icon];
        return (
          <a
            key={social.label}
            ref={(el) => (iconRefs.current[i] = el)}
            href={social.href}
            aria-label={social.label}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            className="text-pirate-white/50 text-sm transition-colors duration-300 hover:text-pirate-gold"
          >
            <IconComponent />
          </a>
        );
      })}

      {/* Gold divider */}
      <div className="w-[1px] h-16 bg-gradient-to-b from-pirate-gold/40 via-pirate-gold/20 to-transparent" />
    </div>
  );
});

SocialIcons.displayName = "SocialIcons";

export default SocialIcons;
