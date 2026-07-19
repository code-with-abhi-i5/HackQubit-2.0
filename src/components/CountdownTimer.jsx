import { useState, useEffect, forwardRef, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DottedCircle = ({ value, max, label, dotsCount = 60 }) => {
  const radius = 38;
  const center = 50;

  return (
    <div className="flex flex-col items-center relative group mx-1 sm:mx-2">
      {/* SVG Container for Dotted Ring */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
          {Array.from({ length: dotsCount }).map((_, i) => {
            const angle = (i / dotsCount) * Math.PI * 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            
            // Calculate active state
            // Inverse logic: as time decreases, the circle fills up from the top
            const progress = 1 - (value / max);
            const isActive = (i / dotsCount) <= progress;
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                className={`transition-all duration-300 ${
                  isActive 
                    ? "fill-pirate-gold drop-shadow-[0_0_4px_#D4AF37]" 
                    : "fill-white/10"
                }`}
              />
            );
          })}
        </svg>

        {/* Center Number with Framer Motion AnimatePresence for flip/slide effect */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={value}
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="font-bona-nova text-lg sm:text-xl md:text-2xl font-bold text-pirate-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                {String(value).padStart(2, '0')}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Label Underneath */}
      <motion.span 
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1, y: -2 }}
        className="mt-2 sm:mt-3 font-eb-garamond text-pirate-white/80 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] transition-colors duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] group-hover:text-pirate-gold"
      >
        {label}
      </motion.span>
    </div>
  );
};

const CountdownTimer = forwardRef((props, ref) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date('2026-10-07T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    // Setting an arbitrary max for days for the visual circle progress (e.g. 100 days)
    { label: 'Days', value: timeLeft.days, max: 100, dotsCount: 60 },
    { label: 'Hours', value: timeLeft.hours, max: 24, dotsCount: 60 },
    { label: 'Minutes', value: timeLeft.minutes, max: 60, dotsCount: 60 },
    { label: 'Seconds', value: timeLeft.seconds, max: 60, dotsCount: 60 },
  ];

  return (
    <div ref={ref} className="mt-4 sm:mt-6 relative z-20">
      <div 
        ref={containerRef} 
        className="flex flex-nowrap items-center justify-start sm:gap-2"
      >
        {timeUnits.map((unit, index) => (
          <DottedCircle 
            key={index} 
            value={unit.value} 
            max={unit.max} 
            label={unit.label} 
            dotsCount={unit.dotsCount} 
          />
        ))}
      </div>
    </div>
  );
});

CountdownTimer.displayName = "CountdownTimer";

export default CountdownTimer;
