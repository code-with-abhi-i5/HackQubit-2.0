import { gsap } from "gsap";

// ============================================
// Hero Section Entrance Animations
// ============================================
export const animateHeroEntrance = (refs) => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Navbar fade in
  if (refs.navbar) {
    tl.fromTo(
      refs.navbar,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      0
    );
  }

  // Subtitle fade in
  if (refs.subtitle) {
    tl.fromTo(
      refs.subtitle,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      0.3
    );
  }

  // Heading line 1 reveal
  if (refs.headingLine1) {
    tl.fromTo(
      refs.headingLine1,
      { y: 80, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
      0.5
    );
  }

  // Heading line 2 reveal
  if (refs.headingLine2) {
    tl.fromTo(
      refs.headingLine2,
      { y: 80, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
      0.7
    );
  }

  // Skull icon
  if (refs.skullIcon) {
    tl.fromTo(
      refs.skullIcon,
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" },
      1.0
    );
  }

  // Description fade
  if (refs.description) {
    tl.fromTo(
      refs.description,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.1
    );
  }

  // Buttons slide up
  if (refs.buttons) {
    tl.fromTo(
      refs.buttons,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.3
    );
  }

  // Social icons
  if (refs.social) {
    tl.fromTo(
      refs.social,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      1.0
    );
  }

  // Stats
  if (refs.stats) {
    tl.fromTo(
      refs.stats,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      1.5
    );
  }

  // Scroll indicator
  if (refs.scrollIndicator) {
    tl.fromTo(
      refs.scrollIndicator,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      1.8
    );
  }

  return tl;
};

// ============================================
// Hover Animations
// ============================================
export const hoverScale = (element, scale = 1.05) => {
  gsap.to(element, {
    scale,
    duration: 0.3,
    ease: "power2.out",
  });
};

export const hoverReset = (element) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

// ============================================
// Button Glow Animation
// ============================================
export const buttonGlow = (element) => {
  gsap.to(element, {
    boxShadow: "0 0 30px #D4AF3750, 0 0 60px #D4AF3720",
    duration: 0.3,
    ease: "power2.out",
  });
};

export const buttonGlowReset = (element) => {
  gsap.to(element, {
    boxShadow: "0 0 20px #D4AF3730, 0 0 40px #D4AF3715",
    duration: 0.3,
    ease: "power2.out",
  });
};
