import { useState, useEffect, useRef } from "react";
import { Timer, Compass, Sparkles } from "lucide-react";
import { gsap } from "gsap";

const CountdownTimer = () => {
  const containerRef = useRef(null);

  // Target Date: October 7, 2025 09:00:00 IST
  const targetDate = new Date("2025-10-07T09:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      ref={containerRef}
      className="relative my-12 p-8 sm:p-10 rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(10,20,40,0.9) 100%)",
        border: "1px solid rgba(212,175,55,0.3)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Glow Effects */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: "#d4af37" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Title Info */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 mb-3">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cinzel text-xs text-amber-400 tracking-widest uppercase font-semibold">
              Live Voyage Countdown
            </span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Set Sail In...
          </h3>
          <p className="font-raleway text-xs text-white/50 tracking-wider mt-1">
            HackQubit 2.0 Launches October 7, 2025 @ RVSCET
          </p>
        </div>

        {/* Timer Boxes */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full md:w-auto">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl min-w-[70px] sm:min-w-[90px]"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(212,175,55,0.2)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              <span className="font-cinzel text-2xl sm:text-4xl font-bold text-amber-400 tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-cinzel text-[9px] sm:text-[11px] text-white/60 tracking-widest uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

