import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Shield, Medal, Award, Coffee } from "lucide-react";

/* ─── Tier Configuration ─── */
const TIERS = [
  {
    key: "powered",
    name: "POWERED BY",
    price: "₹70,000",
    themeTag: "Title Sponsor",
    icon: Crown,
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)",
    glowColor: "rgba(255, 215, 0, 0.35)",
    headerBg: "linear-gradient(180deg, rgba(255,215,0,0.18) 0%, rgba(212,175,55,0.06) 100%)",
  },
  {
    key: "gold",
    name: "GOLD SPONSOR",
    price: "₹50,000",
    themeTag: "Quartermaster Tier",
    icon: Medal,
    color: "#D4AF37",
    gradient: "linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #8B6B3F 100%)",
    glowColor: "rgba(212, 175, 55, 0.25)",
    headerBg: "linear-gradient(180deg, rgba(212,175,55,0.15) 0%, rgba(139,107,63,0.05) 100%)",
  },
  {
    key: "silver",
    name: "SILVER SPONSOR",
    price: "₹30,000",
    themeTag: "Navigator Tier",
    icon: Shield,
    color: "#C0C0C0",
    gradient: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A0A0A0 100%)",
    glowColor: "rgba(192, 192, 192, 0.2)",
    headerBg: "linear-gradient(180deg, rgba(192,192,192,0.12) 0%, rgba(160,160,160,0.04) 100%)",
  },
  {
    key: "bronze",
    name: "BRONZE SPONSOR",
    price: "₹15,000",
    themeTag: "Swashbuckler Tier",
    icon: Award,
    color: "#CD7F32",
    gradient: "linear-gradient(135deg, #CD7F32 0%, #A0522D 50%, #8B4513 100%)",
    glowColor: "rgba(205, 127, 50, 0.2)",
    headerBg: "linear-gradient(180deg, rgba(205,127,50,0.12) 0%, rgba(139,69,19,0.04) 100%)",
  },
  {
    key: "refreshment",
    name: "REFRESHMENT",
    price: "In-Kind",
    themeTag: "Bounty & Provisions",
    icon: Coffee,
    color: "#20B2AA",
    gradient: "linear-gradient(135deg, #20B2AA 0%, #008B8B 50%, #006D6F 100%)",
    glowColor: "rgba(32, 178, 170, 0.2)",
    headerBg: "linear-gradient(180deg, rgba(32,178,170,0.12) 0%, rgba(0,139,139,0.04) 100%)",
  },
];

/* ─── Benefits Matrix ─── */
const BENEFITS = [
  {
    label: "Title Sponsor Branding",
    tiers: { powered: true, gold: false, silver: false, bronze: false, refreshment: false },
  },
  {
    label: "Logo on Event Website",
    tiers: { powered: true, gold: true, silver: true, bronze: true, refreshment: true },
  },
  {
    label: "Logo on Posters, Certificates, ID Cards",
    tiers: { powered: true, gold: true, silver: true, bronze: true, refreshment: true },
  },
  {
    label: "Pre-event Promotions",
    tiers: { powered: true, gold: true, silver: true, bronze: true, refreshment: true },
  },
  {
    label: "Social Media Shoutouts",
    tiers: { powered: true, gold: true, silver: true, bronze: true, refreshment: true },
  },
  {
    label: "Media Coverage",
    tiers: { powered: true, gold: true, silver: true, bronze: true, refreshment: true },
  },
  {
    label: "Career Board Posting",
    tiers: { powered: true, gold: true, silver: false, bronze: false, refreshment: false },
  },
  {
    label: "Problem Statement Contribution",
    tiers: { powered: true, gold: false, silver: false, bronze: false, refreshment: false },
  },
  {
    label: "Keynote Speech Opportunity",
    tiers: { powered: true, gold: true, silver: false, bronze: false, refreshment: false },
  },
  {
    label: "Judge / Panel Opportunity",
    tiers: { powered: true, gold: false, silver: false, bronze: false, refreshment: false },
  },
  {
    label: "Verbal Recognition (Opening & Closing)",
    tiers: { powered: true, gold: true, silver: true, bronze: true, refreshment: true },
  },
  {
    label: "Award Distribution",
    tiers: { powered: true, gold: false, silver: false, bronze: false, refreshment: false },
  },
  {
    label: "Course / Training Promotion",
    tiers: { powered: false, gold: false, silver: false, bronze: true, refreshment: false },
  },
  {
    label: "Swag Kit Inclusion (Goodies in Participant Bags)",
    tiers: { powered: true, gold: true, silver: false, bronze: false, refreshment: true },
  },
  {
    label: "Featured on Official T-Shirts",
    tiers: { powered: true, gold: false, silver: false, bronze: false, refreshment: false },
  },
];

/* ─── Check / Cross Icons ─── */
const CheckIcon = ({ color }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="flex items-center justify-center"
  >
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      <path
        d="M6.5 11.5L9.5 14.5L15.5 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
);

const CrossIcon = () => (
  <div className="flex items-center justify-center opacity-25">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line x1="5" y1="5" x2="13" y2="13" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="5" x2="5" y2="13" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

/* ─── Mobile Card View for each Tier ─── */
const MobileTierCard = ({ tier, benefits, index }) => {
  const TierIcon = tier.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(165deg, rgba(20,15,8,0.97) 0%, rgba(10,7,3,0.99) 100%)",
        border: `1.5px solid ${tier.color}30`,
        boxShadow: `0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 ${tier.color}15`,
      }}
    >
      {/* Card Header */}
      <div
        className="relative px-5 py-4 flex items-center gap-3"
        style={{ background: tier.headerBg }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: `${tier.color}15`,
            border: `1.5px solid ${tier.color}40`,
            boxShadow: `0 0 15px ${tier.glowColor}`,
          }}
        >
          <TierIcon size={18} style={{ color: tier.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className="font-cinzel font-bold text-sm tracking-wider truncate"
            style={{ color: tier.color }}
          >
            {tier.name}
          </h4>
          <p className="text-[10px] font-cinzel tracking-widest uppercase opacity-50 text-amber-200">
            {tier.themeTag}
          </p>
        </div>
        <div
          className="font-pirata text-lg font-bold shrink-0"
          style={{
            background: tier.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {tier.price}
        </div>
      </div>

      {/* Benefits List */}
      <div className="px-4 py-3 space-y-0">
        {benefits.map((benefit, bIdx) => {
          const included = benefit.tiers[tier.key];
          return (
            <div
              key={bIdx}
              className="flex items-center gap-3 py-2.5"
              style={{
                borderBottom:
                  bIdx < benefits.length - 1
                    ? "1px solid rgba(212,175,55,0.06)"
                    : "none",
              }}
            >
              <div className="shrink-0 w-6 flex justify-center">
                {included ? <CheckIcon color={tier.color} /> : <CrossIcon />}
              </div>
              <span
                className={`font-cormorant text-[13px] leading-tight ${
                  included ? "text-amber-100/90" : "text-amber-100/25 line-through"
                }`}
              >
                {benefit.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4 pt-2">
        <a
          href="mailto:hackqubit2.0@gmail.com"
          className="block w-full py-3 rounded-xl text-center font-cinzel font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${tier.color}20 0%, ${tier.color}08 100%)`,
            border: `1px solid ${tier.color}35`,
            color: tier.color,
            boxShadow: `0 4px 15px ${tier.glowColor}`,
          }}
        >
          Become a Sponsor
        </a>
      </div>
    </motion.div>
  );
};

/* ─── Main Modal Component ─── */
const SponsorshipDetailsModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(15,10,5,0.92) 0%, rgba(5,3,1,0.97) 100%)",
              backdropFilter: "blur(12px)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative z-10 w-full h-full overflow-y-auto"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Decorative Top Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(30,22,12,0.95) 0%, rgba(15,10,5,0.98) 100%)",
                border: "1.5px solid rgba(212,175,55,0.3)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(212,175,55,0.1)",
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-amber-400 group-hover:text-amber-300" />
            </motion.button>

            <div className="relative px-4 sm:px-6 lg:px-12 py-8 sm:py-12 max-w-[1400px] mx-auto">
              {/* ── Section Header ── */}
              <motion.div
                className="text-center mb-10 sm:mb-14"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="font-pirata text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gradient-gold mb-3 tracking-wider">
                  Sponsorship Matrix
                </h2>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-700/50" />
                  <span className="text-amber-600 text-lg">☠</span>
                  <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-amber-700/50" />
                </div>
                <p className="font-cormorant italic text-amber-300/50 text-base sm:text-lg max-w-xl mx-auto">
                  Compare all sponsorship tiers and choose the right treasure for your brand
                </p>
              </motion.div>

              {/* ── DESKTOP TABLE (Hidden on mobile) ── */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(165deg, rgba(18,13,6,0.98) 0%, rgba(8,5,2,0.99) 100%)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.05)",
                  }}
                >
                  {/* Wood grain texture */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(139,107,63,0.3) 4px, rgba(139,107,63,0.3) 5px)",
                    }}
                  />

                  <table className="w-full relative z-10">
                    {/* Header Row */}
                    <thead>
                      <tr>
                        <th
                          className="sticky left-0 z-20 text-left px-6 py-5 font-cinzel text-xs tracking-[0.25em] uppercase"
                          style={{
                            background: "linear-gradient(135deg, rgba(20,15,8,0.99) 0%, rgba(12,9,4,0.99) 100%)",
                            color: "rgba(212,175,55,0.6)",
                            borderBottom: "1px solid rgba(212,175,55,0.1)",
                            minWidth: "200px",
                          }}
                        >
                          Benefits
                        </th>
                        {TIERS.map((tier, idx) => {
                          const TierIcon = tier.icon;
                          return (
                            <th
                              key={tier.key}
                              className="text-center px-3 py-5"
                              style={{
                                background: tier.headerBg,
                                borderBottom: `2px solid ${tier.color}30`,
                                minWidth: "140px",
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.08 }}
                                className="flex flex-col items-center gap-2"
                              >
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{
                                    background: `${tier.color}12`,
                                    border: `1.5px solid ${tier.color}35`,
                                    boxShadow: `0 0 20px ${tier.glowColor}`,
                                  }}
                                >
                                  <TierIcon size={18} style={{ color: tier.color }} />
                                </div>
                                <span
                                  className="font-cinzel font-bold text-[11px] tracking-[0.15em] uppercase"
                                  style={{ color: tier.color }}
                                >
                                  {tier.name}
                                </span>
                                <span
                                  className="font-pirata text-base font-bold"
                                  style={{
                                    background: tier.gradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                  }}
                                >
                                  {tier.price}
                                </span>
                              </motion.div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    {/* Body Rows */}
                    <tbody>
                      {BENEFITS.map((benefit, rowIdx) => (
                        <motion.tr
                          key={rowIdx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + rowIdx * 0.03 }}
                          className="group transition-colors duration-200"
                          style={{
                            background:
                              rowIdx % 2 === 0
                                ? "rgba(212,175,55,0.02)"
                                : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(212,175,55,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              rowIdx % 2 === 0 ? "rgba(212,175,55,0.02)" : "transparent";
                          }}
                        >
                          <td
                            className="sticky left-0 z-10 px-6 py-4 font-cormorant text-sm text-amber-200/70 group-hover:text-amber-200/95 transition-colors duration-200"
                            style={{
                              background:
                                rowIdx % 2 === 0
                                  ? "rgba(18,13,6,0.99)"
                                  : "rgba(12,9,4,0.99)",
                              borderBottom: "1px solid rgba(212,175,55,0.05)",
                            }}
                          >
                            {benefit.label}
                          </td>
                          {TIERS.map((tier) => (
                            <td
                              key={tier.key}
                              className="text-center px-3 py-4"
                              style={{
                                borderBottom: "1px solid rgba(212,175,55,0.05)",
                              }}
                            >
                              {benefit.tiers[tier.key] ? (
                                <CheckIcon color={tier.color} />
                              ) : (
                                <CrossIcon />
                              )}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* ── TABLET VIEW (md to lg) ── */}
              <motion.div
                className="hidden md:block lg:hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto rounded-2xl scrollbar-thin"
                  style={{
                    background: "linear-gradient(165deg, rgba(18,13,6,0.98) 0%, rgba(8,5,2,0.99) 100%)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* Scroll hint */}
                  <div className="flex items-center justify-center gap-2 py-3 text-amber-500/40 text-xs font-cinzel tracking-wider">
                    <span>← Scroll to see all tiers →</span>
                  </div>
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr>
                        <th
                          className="sticky left-0 z-20 text-left px-5 py-4 font-cinzel text-xs tracking-[0.2em] uppercase"
                          style={{
                            background: "rgba(15,10,5,0.99)",
                            color: "rgba(212,175,55,0.5)",
                            borderBottom: "1px solid rgba(212,175,55,0.1)",
                            minWidth: "180px",
                          }}
                        >
                          Benefits
                        </th>
                        {TIERS.map((tier) => {
                          const TierIcon = tier.icon;
                          return (
                            <th
                              key={tier.key}
                              className="text-center px-2 py-4"
                              style={{
                                background: tier.headerBg,
                                borderBottom: `2px solid ${tier.color}25`,
                                minWidth: "130px",
                              }}
                            >
                              <div className="flex flex-col items-center gap-1.5">
                                <TierIcon size={16} style={{ color: tier.color }} />
                                <span
                                  className="font-cinzel font-bold text-[10px] tracking-wider uppercase"
                                  style={{ color: tier.color }}
                                >
                                  {tier.name}
                                </span>
                                <span
                                  className="font-pirata text-sm font-bold"
                                  style={{
                                    background: tier.gradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                  }}
                                >
                                  {tier.price}
                                </span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {BENEFITS.map((benefit, rowIdx) => (
                        <tr
                          key={rowIdx}
                          style={{
                            background:
                              rowIdx % 2 === 0 ? "rgba(212,175,55,0.02)" : "transparent",
                          }}
                        >
                          <td
                            className="sticky left-0 z-10 px-5 py-3 font-cormorant text-sm text-amber-200/65"
                            style={{
                              background:
                                rowIdx % 2 === 0 ? "rgba(18,13,6,0.99)" : "rgba(12,9,4,0.99)",
                              borderBottom: "1px solid rgba(212,175,55,0.05)",
                            }}
                          >
                            {benefit.label}
                          </td>
                          {TIERS.map((tier) => (
                            <td
                              key={tier.key}
                              className="text-center px-2 py-3"
                              style={{ borderBottom: "1px solid rgba(212,175,55,0.05)" }}
                            >
                              {benefit.tiers[tier.key] ? (
                                <CheckIcon color={tier.color} />
                              ) : (
                                <CrossIcon />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* ── MOBILE CARD VIEW (below md) ── */}
              <div className="block md:hidden space-y-4">
                {TIERS.map((tier, idx) => (
                  <MobileTierCard
                    key={tier.key}
                    tier={tier}
                    benefits={BENEFITS}
                    index={idx}
                  />
                ))}
              </div>

              {/* ── Bottom Section ── */}
              <motion.div
                className="text-center mt-10 sm:mt-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-700/30" />
                  <span className="text-amber-700/40 text-sm">☠</span>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-700/30" />
                </div>
                <p className="font-cormorant italic text-amber-300/30 text-sm mb-6 max-w-md mx-auto">
                  Ready to set sail with HackQubit 2.0? Reach out and claim your tier.
                </p>
                <a
                  href="mailto:hackqubit2.0@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl font-cinzel font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(139,107,63,0.08) 100%)",
                    border: "1.5px solid rgba(212,175,55,0.3)",
                    color: "#D4AF37",
                    boxShadow: "0 4px 25px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.05)",
                  }}
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SponsorshipDetailsModal;
