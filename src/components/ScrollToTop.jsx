import { useState, useEffect } from "react";
import xyzImg from "../assets/images/xyz.png";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 sm:bottom-10 sm:right-10 z-[100] transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative group focus:outline-none"
        aria-label="Scroll to top"
      >
        {/* Glow effect behind the image */}
        <div className="absolute inset-0 bg-pirate-gold/30 rounded-full blur-xl group-hover:bg-pirate-gold/60 transition-all duration-500" />
        
        <img 
          src={xyzImg} 
          alt="Scroll to top" 
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.9)] transition-all duration-500 group-hover:-translate-y-2 animate-float cursor-pointer"
        />
      </button>
    </div>
  );
};

export default ScrollToTop;
