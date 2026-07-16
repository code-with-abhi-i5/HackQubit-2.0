import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// ============================================
// useScrollPosition - Track scroll position
// ============================================
export const useScrollPosition = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

// ============================================
// useCountUp - Animated counter hook
// ============================================
export const useCountUp = (endValue, duration = 2.5, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const startCounter = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      },
    });
  }, [endValue, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startCounter, startOnView]);

  return { count, ref };
};

// ============================================
// useMouseParallax - Mouse-based parallax
// ============================================
export const useMouseParallax = (sensitivity = 0.02) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setPosition({
        x: (e.clientX - centerX) * sensitivity,
        y: (e.clientY - centerY) * sensitivity,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sensitivity]);

  return position;
};
