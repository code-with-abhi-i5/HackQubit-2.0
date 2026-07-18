import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

/**
 * GalleryCard — A single 3D Cover Flow card.
 *
 * Props:
 * – image: { id, src, alt, title, subtitle }
 * – index: position in the array
 * – isActive: boolean
 * – onCardRef: (el, index) => void  – register DOM ref
 * – onClick: (index) => void
 */
const GalleryCard = ({ image, index, isActive, onCardRef, onClick }) => {
  const innerRef = useRef(null);
  const imgRef = useRef(null);
  const glowRef = useRef(null);
  const overlayRef = useRef(null);
  const breatheRef = useRef(null);

  // Register the card DOM element with the parent
  const setRef = useCallback(
    (el) => {
      innerRef.current = el;
      if (onCardRef) onCardRef(el, index);
    },
    [onCardRef, index]
  );

  // ─── Active Breathing Glow ───
  useEffect(() => {
    if (!innerRef.current) return;

    if (isActive) {
      breatheRef.current = gsap.to(innerRef.current, {
        boxShadow:
          "0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.8)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    } else {
      if (breatheRef.current) {
        breatheRef.current.kill();
        breatheRef.current = null;
      }
      gsap.set(innerRef.current, {
        boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
      });
    }

    return () => {
      if (breatheRef.current) {
        breatheRef.current.kill();
      }
    };
  }, [isActive]);

  // ─── Hover Tilt (only active card) ───
  const handleMouseMove = useCallback(
    (e) => {
      if (!isActive || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -6;
      const ry = ((x - cx) / cx) * 6;

      gsap.to(innerRef.current, {
        rotateX: rx,
        rotateY: ry,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1200,
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - cx,
          y: y - cy,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [isActive]
  );

  const handleMouseLeave = useCallback(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      ref={setRef}
      className="gallery-coverflow-card absolute cursor-pointer select-none"
      style={{
        width: "320px",
        height: "420px",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick?.(index)}
    >
      {/* ── Animated border ── */}
      <div
        className={`absolute -inset-[2px] rounded-xl transition-opacity duration-700 pointer-events-none ${
          isActive ? "opacity-100" : "opacity-30"
        }`}
        style={{
          background:
            "linear-gradient(135deg, #8B6B3F 0%, #D4AF37 25%, #8B6B3F 50%, #D4AF37 75%, #8B6B3F 100%)",
          backgroundSize: "200% 200%",
          animation: isActive ? "borderShimmer 3s linear infinite" : "none",
        }}
      />

      {/* ── Card body ── */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #1a120a 0%, #0d0906 100%)",
        }}
      >
        {/* Image */}
        <img
          ref={imgRef}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isActive ? "scale-100 hover:scale-108" : "scale-100"
          }`}
          draggable="false"
        />

        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: isActive
              ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.2) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Golden sweep light */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.08) 50%, transparent 70%)",
            opacity: isActive ? 1 : 0,
          }}
        />

        {/* Cursor-following glow */}
        <div
          ref={glowRef}
          className="absolute w-48 h-48 rounded-full pointer-events-none opacity-0"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />

        {/* ── Bottom overlay text ── */}
        <div
          ref={overlayRef}
          className={`absolute bottom-0 left-0 right-0 p-5 z-20 transition-all duration-500 ${
            isActive
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <p
            className="font-cinzel text-sm tracking-[0.2em] uppercase"
            style={{
              background:
                "linear-gradient(135deg, #FFD700, #D4AF37, #B88B4A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {image.title}
          </p>
          <p className="font-cormorant text-pirate-white/50 text-xs italic mt-1 tracking-wider">
            {image.subtitle}
          </p>
        </div>

        {/* Corner ornaments */}
        <div
          className={`absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 rounded-tl z-20 transition-colors duration-500 ${
            isActive
              ? "border-pirate-gold/60"
              : "border-pirate-gold/20"
          }`}
        />
        <div
          className={`absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 rounded-tr z-20 transition-colors duration-500 ${
            isActive
              ? "border-pirate-gold/60"
              : "border-pirate-gold/20"
          }`}
        />
        <div
          className={`absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 rounded-bl z-20 transition-colors duration-500 ${
            isActive
              ? "border-pirate-gold/60"
              : "border-pirate-gold/20"
          }`}
        />
        <div
          className={`absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 rounded-br z-20 transition-colors duration-500 ${
            isActive
              ? "border-pirate-gold/60"
              : "border-pirate-gold/20"
          }`}
        />

        {/* Active golden rim light */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              boxShadow:
                "inset 0 0 30px rgba(212,175,55,0.1), inset 0 -2px 0 rgba(212,175,55,0.3)",
            }}
          />
        )}

        {/* Reflection gradient at bottom */}
        {isActive && (
          <div
            className="absolute -bottom-1 left-[10%] right-[10%] h-16 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(212,175,55,0.08), transparent)",
              filter: "blur(8px)",
              transform: "scaleY(-1)",
            }}
          />
        )}
      </div>

      {/* ── Gold Particles Container (active card only) ── */}
      {isActive && (
        <div
          className="gallery-active-particles absolute inset-0 pointer-events-none z-30 overflow-visible"
          style={{ transformStyle: "preserve-3d" }}
        />
      )}
    </div>
  );
};

export default GalleryCard;
