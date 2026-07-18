import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Master animation hook for the Gallery section.
 * Handles:
 * – Heading reveal (fade + blur + slide)
 * – Card entrance stagger (scale + rotateY + opacity)
 * – Floating card animation (infinite gentle Y bob)
 * – Mouse parallax on the gallery stage
 * – Gold particle spawning on active card
 * – ScrollTrigger-driven spread/gather effect
 */
export default function useGalleryAnimation({
  sectionRef,
  headingRef,
  stageRef,
  cardRefs,
  particleContainerRef,
  activeIndex,
}) {
  const mouseParallax = useRef({ x: 0, y: 0 });
  const floatTimelines = useRef([]);

  // ─── Heading Entrance ───
  useEffect(() => {
    if (!headingRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate sub-label
      const label = headingRef.current.querySelector(".gallery-label");
      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Animate title
      const title = headingRef.current.querySelector(".gallery-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 120, filter: "blur(20px)", scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Animate paragraph
      const para = headingRef.current.querySelector(".gallery-para");
      if (para) {
        gsap.fromTo(
          para,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power4.out",
            delay: 0.35,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Divider
      const divider = headingRef.current.querySelector(".gallery-divider");
      if (divider) {
        gsap.fromTo(
          divider,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, headingRef]);

  // ─── Card Entrance Animation ───
  useEffect(() => {
    if (!cardRefs.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      cards.forEach((card, i) => {
        const direction = i < Math.floor(cards.length / 2) ? 1 : -1;

        gsap.fromTo(
          card,
          {
            scale: 0.6,
            rotateY: direction * 45,
            opacity: 0,
          },
          {
            scale: 1,
            rotateY: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cardRefs, sectionRef]);

  // ─── Floating Effect ───
  useEffect(() => {
    if (!cardRefs.current) return;

    const cards = cardRefs.current.filter(Boolean);
    floatTimelines.current = [];

    cards.forEach((card) => {
      const duration = 4 + Math.random() * 4; // 4–8s
      const yAmount = 6 + Math.random() * 8; // 6–14px

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(card, {
        y: `-=${yAmount}`,
        duration,
        ease: "sine.inOut",
      });

      floatTimelines.current.push(tl);
    });

    return () => {
      floatTimelines.current.forEach((tl) => tl.kill());
    };
  }, [cardRefs]);

  // ─── Mouse Parallax ───
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(stage, {
        rotateY: x * 3, // subtle 3° max
        rotateX: -y * 2, // subtle 2° max
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(stage, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    stage.addEventListener("mousemove", onMouseMove);
    stage.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [stageRef]);

  // ─── Gold Particles on Active Card ───
  useEffect(() => {
    const container = particleContainerRef?.current;
    if (!container) return;

    // Clear old particles
    container.innerHTML = "";

    // Spawn floating gold particles
    const count = 12;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "gallery-gold-particle";
      const size = 2 + Math.random() * 3;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #FFD700 0%, #D4AF37 50%, transparent 100%);
        pointer-events: none;
        left: ${20 + Math.random() * 60}%;
        top: ${20 + Math.random() * 60}%;
        opacity: 0;
      `;
      container.appendChild(particle);

      // Animate each particle
      gsap.to(particle, {
        y: -(30 + Math.random() * 60),
        x: (Math.random() - 0.5) * 40,
        opacity: 0.8,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }

    return () => {
      container.innerHTML = "";
    };
  }, [activeIndex, particleContainerRef]);

  // ─── ScrollTrigger – Gallery Spread Effect ───
  useEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Subtle rotation based on scroll
          const rotateAmount = Math.sin(progress * Math.PI) * 3;
          gsap.set(stageRef.current, {
            rotateY: rotateAmount,
            overwrite: "auto",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, stageRef]);
}
