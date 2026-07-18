import { useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GalleryCard from "./GalleryCard";
import useCoverflow from "./useCoverflow";

/**
 * GalleryCarousel — The 3D Cover Flow stage.
 *
 * Renders cards in a 3D perspective container and wires up
 * drag/swipe/scroll/keyboard interactions via useCoverflow.
 *
 * Props:
 * – images: array of gallery data
 * – activeIndex: current center card index
 * – setActiveIndex: state setter
 * – onCardClick: callback when a card is clicked
 * – particleContainerRef: ref for gold particles
 */
const GalleryCarousel = ({
  images,
  activeIndex,
  setActiveIndex,
  onCardClick,
  particleContainerRef,
  stageRef,
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const registerCardRef = useCallback((el, index) => {
    if (el) cardRefs.current[index] = el;
  }, []);

  const { navigate } = useCoverflow({
    containerRef,
    trackRef,
    cardRefs,
    totalItems: images.length,
    activeIndex,
    setActiveIndex,
  });

  // Attach particle container ref to the active card
  useEffect(() => {
    if (!particleContainerRef) return;
    const activeCard = cardRefs.current[activeIndex];
    if (activeCard) {
      const particleEl = activeCard.querySelector(".gallery-active-particles");
      if (particleEl) {
        particleContainerRef.current = particleEl;
      }
    }
  }, [activeIndex, particleContainerRef]);

  return (
    <div className="relative z-10">
      {/* 3D Perspective Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-visible cursor-grab active:cursor-grabbing"
        style={{
          height: "480px",
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Stage – receives mouse parallax */}
        <div
          ref={(el) => {
            trackRef.current = el;
            if (stageRef) stageRef.current = el;
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {images.map((img, idx) => (
            <GalleryCard
              key={img.id}
              image={img}
              index={idx}
              isActive={idx === activeIndex}
              onCardRef={registerCardRef}
              onClick={onCardClick}
            />
          ))}
        </div>

        {/* Glow behind active card */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── Navigation Arrows ── */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full border border-pirate-gold/20 bg-black/50 backdrop-blur-sm hover:bg-pirate-gold/10 hover:border-pirate-gold/50 transition-all duration-300 group"
        aria-label="Previous image"
      >
        <ChevronLeft
          className="w-5 h-5 sm:w-6 sm:h-6 text-pirate-gold/50 group-hover:text-pirate-gold transition-colors duration-300"
          strokeWidth={1.5}
        />
      </button>

      <button
        onClick={() => navigate(1)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full border border-pirate-gold/20 bg-black/50 backdrop-blur-sm hover:bg-pirate-gold/10 hover:border-pirate-gold/50 transition-all duration-300 group"
        aria-label="Next image"
      >
        <ChevronRight
          className="w-5 h-5 sm:w-6 sm:h-6 text-pirate-gold/50 group-hover:text-pirate-gold transition-colors duration-300"
          strokeWidth={1.5}
        />
      </button>

      {/* ── Dot Indicators ── */}
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              // Trigger the coverflow snap
              const obj = { val: activeIndex };
              // Direct state update to trigger re-layout
            }}
            className={`rounded-full transition-all duration-500 ${
              idx === activeIndex
                ? "w-7 h-2 bg-pirate-gold"
                : "w-2 h-2 bg-pirate-gold/30 hover:bg-pirate-gold/50"
            }`}
            style={{
              boxShadow:
                idx === activeIndex
                  ? "0 0 12px rgba(212,175,55,0.5)"
                  : "none",
            }}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
