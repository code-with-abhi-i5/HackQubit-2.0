import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import youngPirateImg from "../assets/images/young_pirate.png";

gsap.registerPlugin(ScrollTrigger);

/* ── Section-specific pirate dialogue lines ── */
const SECTION_DIALOGUES = {
  about: "Ahoy! Welcome aboard, matey! This be HackQubit 2.0! 🏴‍☠️",
  timeline: "Follow the treasure map, crew! Every stop be a milestone! 🗺️",
  prizes: "Arrr! There be gold for the bravest coders! 💰",
  "problem-statements": "The secret scrolls shall be revealed on hackathon day! 📜",
  sponsorship: "Our mighty allies fund this grand voyage! ⚓",
  "sponsorship-perks": "Sponsors get the finest treasures & glory! 👑",
  "our-sponsors": "The fleet of partners be assembling soon! 🚢",
  faq: "Got questions? This old captain has answers! 🦜",
};

const SECTION_IDS = Object.keys(SECTION_DIALOGUES);

const PirateCaptainGuide = () => {
  const [currentSection, setCurrentSection] = useState("");
  const [visible, setVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const captainRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const triggers = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          setCurrentSection(id);
          setVisible(true);
        },
        onEnterBack: () => {
          setCurrentSection(id);
          setVisible(true);
        },
        onLeave: () => {},
        onLeaveBack: () => {},
      });
      triggers.push(st);
    });

    return () => triggers.forEach((st) => st.kill());
  }, []);

  // Animate captain in/out
  useEffect(() => {
    if (!captainRef.current) return;
    if (visible && currentSection) {
      gsap.to(captainRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.4)",
      });
      // Show bubble with slight delay
      const timer = setTimeout(() => setBubbleVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, currentSection]);

  // Animate bubble
  useEffect(() => {
    if (!bubbleRef.current) return;
    if (bubbleVisible) {
      gsap.fromTo(
        bubbleRef.current,
        { scale: 0, opacity: 0, transformOrigin: "bottom left" },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
      // Auto-hide bubble after 5s
      const hideTimer = setTimeout(() => {
        gsap.to(bubbleRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setBubbleVisible(false),
        });
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [bubbleVisible, currentSection]);

  const dialogue = SECTION_DIALOGUES[currentSection] || "";

  return (
    <div
      ref={captainRef}
      className="fixed bottom-4 left-4 z-[9999] flex flex-col items-start"
      style={{ opacity: 0, transform: "translateX(-120px)" }}
    >
      {/* Speech Bubble (Cloud Shape) */}
      {bubbleVisible && dialogue && (
        <div
          ref={bubbleRef}
          className="relative mb-2 ml-8 max-w-[220px] sm:max-w-[260px]"
          style={{ transformOrigin: "bottom left" }}
        >
          {/* Cloud bubble body */}
          <div
            className="relative px-4 py-3 rounded-2xl shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "2px solid rgba(217, 169, 78, 0.5)",
              backdropFilter: "blur(10px)",
            }}
          >
            <p
              className="font-raleway text-xs sm:text-sm text-slate-800 font-semibold leading-snug"
              style={{ lineHeight: "1.5" }}
            >
              {dialogue}
            </p>
          </div>

          {/* Cloud tail pointing down-left toward captain */}
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            className="absolute -bottom-[16px] left-6"
            style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))" }}
          >
            <path
              d="M 0 18 Q 6 10 8 0 Q 12 6 24 4 Q 16 12 0 18 Z"
              fill="rgba(255,255,255,0.95)"
              stroke="rgba(217,169,78,0.5)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      {/* Young Pirate Captain Image */}
      <div
        className="w-36 h-36 sm:w-48 sm:h-48 cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={() => {
          setBubbleVisible(true);
        }}
        title="Click me, matey!"
      >
        <img
          src={youngPirateImg}
          alt="Young Pirate Captain Guide"
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
};

export default PirateCaptainGuide;

