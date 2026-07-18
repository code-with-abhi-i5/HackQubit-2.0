import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook managing 3D Cover Flow interactions:
 * – Mouse drag / touch swipe
 * – Scroll-wheel navigation
 * – Arrow key navigation
 * – Snap-to-card with momentum
 * – 3D perspective transforms (rotateY, translate, scale, opacity, blur)
 */
export default function useCoverflow({
  containerRef,
  trackRef,
  cardRefs,
  totalItems,
  activeIndex,
  setActiveIndex,
}) {
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const velocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const rafId = useRef(null);
  const currentOffset = useRef(0);

  // Layout constants
  const CARD_WIDTH = 320;
  const CARD_GAP = 24;
  const SIDE_ROTATE = 45;
  const SIDE_TRANSLATE_Z = -200;
  const SIDE_TRANSLATE_X = 60;
  const SNAP_DURATION = 0.6;
  const DRAG_SENSITIVITY = 1;

  /** Compute transform for each card based on continuous offset */
  const applyLayout = useCallback(
    (offset) => {
      if (!cardRefs.current) return;
      const cards = cardRefs.current;
      const center = offset;

      cards.forEach((card, i) => {
        if (!card) return;
        const diff = i - center;
        const absDiff = Math.abs(diff);

        // Rotation – smoothly interpolated
        const rotateY = Math.max(-SIDE_ROTATE, Math.min(SIDE_ROTATE, -diff * SIDE_ROTATE));

        // Z translation – push side cards back
        const translateZ = absDiff < 0.1 ? 0 : SIDE_TRANSLATE_Z * Math.min(absDiff, 1);

        // X translation – spread side cards outward
        const translateX = diff * (CARD_WIDTH + CARD_GAP) + diff * SIDE_TRANSLATE_X * Math.min(absDiff, 2);

        // Scale – center card is 1, sides shrink
        const scale = Math.max(0.6, 1 - absDiff * 0.15);

        // Opacity
        const opacity = Math.max(0.25, 1 - absDiff * 0.25);

        // Blur
        const blur = Math.min(absDiff * 3, 8);

        // Z-index – center card on top
        const zIndex = 100 - Math.round(absDiff * 10);

        // Brightness
        const brightness = Math.max(0.4, 1 - absDiff * 0.2);

        gsap.set(card, {
          x: translateX,
          z: translateZ,
          rotateY,
          scale,
          opacity,
          zIndex,
          filter: `blur(${blur}px) brightness(${brightness})`,
          force3D: true,
        });
      });
    },
    [cardRefs]
  );

  /** Snap to nearest card index */
  const snapTo = useCallback(
    (targetIndex, dur = SNAP_DURATION) => {
      const clamped = Math.max(0, Math.min(totalItems - 1, Math.round(targetIndex)));
      setActiveIndex(clamped);
      currentOffset.current = clamped;

      // Animate smoothly
      const obj = { val: currentOffset.current };
      // We need to start from the current visual offset for smooth feel
      gsap.to(
        { val: currentOffset.current },
        {
          val: clamped,
          duration: dur,
          ease: "power3.out",
          onUpdate: function () {
            currentOffset.current = this.targets()[0].val;
            applyLayout(currentOffset.current);
          },
        }
      );
    },
    [totalItems, setActiveIndex, applyLayout]
  );

  /** Navigate by delta (+1 or -1) */
  const navigate = useCallback(
    (delta) => {
      const next = Math.max(0, Math.min(totalItems - 1, Math.round(currentOffset.current) + delta));
      snapTo(next);
    },
    [totalItems, snapTo]
  );

  // ─── Pointer / Touch Events ───
  const onPointerDown = useCallback(
    (e) => {
      isDragging.current = true;
      dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
      lastDragX.current = dragStartX.current;
      lastDragTime.current = Date.now();
      velocity.current = 0;
      dragDelta.current = 0;

      // Kill any ongoing snapping
      gsap.killTweensOf({});
    },
    []
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const delta = clientX - lastDragX.current;
      const now = Date.now();
      const dt = now - lastDragTime.current || 16;

      velocity.current = delta / dt;
      lastDragX.current = clientX;
      lastDragTime.current = now;

      dragDelta.current = clientX - dragStartX.current;
      const offsetDelta = -dragDelta.current / (CARD_WIDTH + CARD_GAP) * DRAG_SENSITIVITY;
      const baseIndex = Math.round(currentOffset.current);
      const newOffset = baseIndex + offsetDelta;

      applyLayout(newOffset);
    },
    [applyLayout]
  );

  const onPointerUp = useCallback(
    () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const offsetDelta = -dragDelta.current / (CARD_WIDTH + CARD_GAP) * DRAG_SENSITIVITY;
      const baseIndex = Math.round(currentOffset.current);
      let targetIndex = baseIndex + offsetDelta;

      // Apply velocity-based momentum
      const momentumCards = -velocity.current * 150 / (CARD_WIDTH + CARD_GAP);
      targetIndex += momentumCards;

      // Clamp and snap
      targetIndex = Math.max(0, Math.min(totalItems - 1, Math.round(targetIndex)));

      // Update current offset for animation starting point
      currentOffset.current = baseIndex + offsetDelta;
      snapTo(targetIndex);
      dragDelta.current = 0;
    },
    [totalItems, snapTo]
  );

  // ─── Scroll Wheel ───
  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1 : -1;
      navigate(delta);
    },
    [navigate]
  );

  // ─── Keyboard ───
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  // ─── Attach Events ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pointer events
    container.addEventListener("mousedown", onPointerDown);
    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseup", onPointerUp);
    container.addEventListener("mouseleave", onPointerUp);

    // Touch events
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchmove", onPointerMove, { passive: false });
    container.addEventListener("touchend", onPointerUp);

    // Scroll wheel
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("mousedown", onPointerDown);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("mouseleave", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchmove", onPointerMove);
      container.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, [containerRef, onPointerDown, onPointerMove, onPointerUp, onWheel]);

  // ─── Initial Layout ───
  useEffect(() => {
    currentOffset.current = activeIndex;
    applyLayout(activeIndex);
  }, []);

  return { navigate, snapTo, applyLayout, currentOffset };
}
