import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Shield, Medal, Award, Coffee } from "lucide-react";
import bgStoryMatrix from "../assets/images/bg_story_sponsorship_matrix.png";

/* ─── Tier Configuration (Light Theme Colors) ─── */
const TIERS = [
  {
    key: "powered",
    name: "POWERED BY",
    price: "₹70,000",
    themeTag: "Title Sponsor",
    icon: Crown,
    color: "#92400e",
    iconBg: "rgba(146,64,14,0.12)",
    iconBorder: "rgba(146,64,14,0.3)",
    headerBg: "linear-gradient(180deg, rgba(146,64,14,0.08) 0%, rgba(217,119,6,0.03) 100%)",
  },
  {
    key: "gold",
    name: "GOLD SPONSOR",
    price: "₹50,000",
    themeTag: "Quartermaster Tier",
    icon: Medal,
    color: "#b45309",
    iconBg: "rgba(180,83,9,0.1)",
    iconBorder: "rgba(180,83,9,0.25)",
    headerBg: "linear-gradient(180deg, rgba(180,83,9,0.07) 0%, rgba(217,119,6,0.02) 100%)",
  },
  {
    key: "silver",
    name: "SILVER SPONSOR",
    price: "₹30,000",
    themeTag: "Navigator Tier",
    icon: Shield,
    color: "#64748b",
    iconBg: "rgba(100,116,139,0.1)",
    iconBorder: "rgba(100,116,139,0.25)",
    headerBg: "linear-gradient(180deg, rgba(100,116,139,0.07) 0%, rgba(148,163,184,0.02) 100%)",
  },
  {
    key: "bronze",
    name: "BRONZE SPONSOR",
    price: "₹15,000",
    themeTag: "Swashbuckler Tier",
    icon: Award,
    color: "#9a3412",
    iconBg: "rgba(154,52,18,0.1)",
    iconBorder: "rgba(154,52,18,0.25)",
    headerBg: "linear-gradient(180deg, rgba(154,52,18,0.06) 0%, rgba(194,65,12,0.02) 100%)",
  },
  {
    key: "refreshment",
    name: "REFRESHMENT",
    price: "In-Kind",
    themeTag: "Bounty & Provisions",
    icon: Coffee,
    color: "#0f766e",
    iconBg: "rgba(15,118,110,0.1)",
    iconBorder: "rgba(15,118,110,0.25)",
    headerBg: "linear-gradient(180deg, rgba(15,118,110,0.06) 0%, rgba(20,184,166,0.02) 100%)",
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill={`${color}18`} stroke={color} strokeWidth="1.5" />
      <path
        d="M7 12.5L10.5 16L17 9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
);

const CrossIcon = () => (
  <div className="flex items-center justify-center opacity-30">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="6" y1="6" x2="14" y2="14" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="6" x2="6" y2="14" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
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
        background: "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(224,242,254,0.9) 100%)",
        border: `1.5px solid ${tier.color}30`,
        boxShadow: `0 4px 25px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.06)`,
      }}
    >
      {/* Card Header */}
      <div
        className="relative px-5 py-4 flex items-center gap-3"
        style={{
          background: tier.headerBg,
          borderBottom: `1px solid ${tier.color}15`,
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: tier.iconBg,
            border: `1.5px solid ${tier.iconBorder}`,
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
          <p className="text-[10px] font-cinzel tracking-widest uppercase text-amber-800/50">
            {tier.themeTag}
          </p>
        </div>
        <div
          className="font-pirata text-lg font-bold shrink-0"
          style={{ color: tier.color }}
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
                    ? "1px solid rgba(146,64,14,0.08)"
                    : "none",
              }}
            >
              <div className="shrink-0 w-6 flex justify-center">
                {included ? <CheckIcon color={tier.color} /> : <CrossIcon />}
              </div>
              <span
                className={`font-cormorant text-sm leading-tight ${
                  included ? "text-amber-950/85 font-semibold" : "text-amber-900/25 line-through"
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
          className="block w-full py-3 rounded-xl text-center font-cinzel font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 text-amber-50"
          style={{
            background: `linear-gradient(135deg, ${tier.color} 0%, ${tier.color}cc 100%)`,
            boxShadow: `0 4px 15px ${tier.color}30`,
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
          {/* Backdrop — Light theme matching pirate-bg */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(224,242,254,0.95)",
              backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ── LANDSCAPE STORY BACKGROUND FIXED TO VIEWPORT ── */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src={bgStoryMatrix}
              alt="Pirate Sponsorship Story"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-bottom opacity-60"
            />
            {/* Top is solid sky blue, bottom is transparent to show image */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E0F2FE] via-[#E0F2FE]/80 to-transparent" />
          </div>

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
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)",
              }}
            />



            {/* Close Button — Light theme */}
            <motion.button
              onClick={onClose}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(224,242,254,0.95) 100%)",
                border: "1.5px solid rgba(146,64,14,0.2)",
                boxShadow: "0 4px 20px rgba(15,23,42,0.1), 0 0 15px rgba(212,175,55,0.08)",
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-amber-800 group-hover:text-amber-600" />
            </motion.button>

            <div className="relative px-4 sm:px-6 lg:px-12 py-8 sm:py-12 max-w-[1400px] mx-auto">
              {/* ── Section Header ── */}
              <motion.div
                className="text-center mb-10 sm:mb-14"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="font-pirata text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-950 mb-3 tracking-wider">
                  Sponsorship{" "}
                  <span className="text-amber-800">Matrix</span>
                </h2>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-700/40" />
                  <span className="text-amber-700 text-lg">✦</span>
                  <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-amber-700/40" />
                </div>
                <p className="font-cormorant italic text-amber-800/60 text-base sm:text-lg max-w-xl mx-auto">
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
                    background: "linear-gradient(165deg, rgba(255,255,255,0.98) 0%, rgba(224,242,254,0.95) 100%)",
                    border: "1.5px solid rgba(146,64,14,0.15)",
                    boxShadow: "0 25px 60px rgba(15,23,42,0.08), 0 4px 12px rgba(15,23,42,0.04), 0 0 40px rgba(212,175,55,0.04)",
                  }}
                >
                  {/* Subtle parchment texture */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(139,107,63,0.2) 4px, rgba(139,107,63,0.2) 5px)",
                    }}
                  />

                  <table className="w-full relative z-10">
                    {/* Header Row */}
                    <thead>
                      <tr>
                        <th
                          className="sticky left-0 z-20 text-left px-6 py-5 font-cinzel text-xs tracking-[0.25em] uppercase text-amber-800/70"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.99) 0%, rgba(254,243,199,0.4) 100%)",
                            borderBottom: "2px solid rgba(146,64,14,0.1)",
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
                                borderBottom: `2px solid ${tier.color}25`,
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
                                    background: tier.iconBg,
                                    border: `1.5px solid ${tier.iconBorder}`,
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
                                  style={{ color: tier.color }}
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
                                ? "rgba(254,243,199,0.15)"
                                : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(254,243,199,0.35)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              rowIdx % 2 === 0 ? "rgba(254,243,199,0.15)" : "transparent";
                          }}
                        >
                          <td
                            className="sticky left-0 z-10 px-6 py-4 font-cormorant text-base font-semibold text-amber-950/75 group-hover:text-amber-950 transition-colors duration-200"
                            style={{
                              background:
                                rowIdx % 2 === 0
                                  ? "rgba(255,255,255,0.97)"
                                  : "rgba(255,255,255,0.99)",
                              borderBottom: "1px solid rgba(146,64,14,0.06)",
                            }}
                          >
                            {benefit.label}
                          </td>
                          {TIERS.map((tier) => (
                            <td
                              key={tier.key}
                              className="text-center px-3 py-4"
                              style={{
                                borderBottom: "1px solid rgba(146,64,14,0.06)",
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
                  className="overflow-x-auto rounded-2xl"
                  style={{
                    background: "linear-gradient(165deg, rgba(255,255,255,0.98) 0%, rgba(224,242,254,0.95) 100%)",
                    border: "1.5px solid rgba(146,64,14,0.12)",
                    boxShadow: "0 15px 40px rgba(15,23,42,0.06)",
                  }}
                >
                  {/* Scroll hint */}
                  <div className="flex items-center justify-center gap-2 py-3 text-amber-700/40 text-xs font-cinzel tracking-wider">
                    <span>← Scroll to see all tiers →</span>
                  </div>
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr>
                        <th
                          className="sticky left-0 z-20 text-left px-5 py-4 font-cinzel text-xs tracking-[0.2em] uppercase text-amber-800/60"
                          style={{
                            background: "rgba(255,255,255,0.99)",
                            borderBottom: "2px solid rgba(146,64,14,0.08)",
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
                                borderBottom: `2px solid ${tier.color}20`,
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
                                  style={{ color: tier.color }}
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
                              rowIdx % 2 === 0 ? "rgba(254,243,199,0.15)" : "transparent",
                          }}
                        >
                          <td
                            className="sticky left-0 z-10 px-5 py-3 font-cormorant text-base font-semibold text-amber-950/70"
                            style={{
                              background:
                                rowIdx % 2 === 0 ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.99)",
                              borderBottom: "1px solid rgba(146,64,14,0.06)",
                            }}
                          >
                            {benefit.label}
                          </td>
                          {TIERS.map((tier) => (
                            <td
                              key={tier.key}
                              className="text-center px-2 py-3"
                              style={{ borderBottom: "1px solid rgba(146,64,14,0.06)" }}
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
                  <span className="text-amber-700/50 text-sm">✦</span>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-700/30" />
                </div>
                <p className="font-cormorant italic text-amber-800/50 text-sm mb-6 max-w-md mx-auto">
                  Ready to set sail with HackQubit 2.0? Reach out and claim your tier.
                </p>
                <a
                  href="mailto:hackqubit2.0@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl font-cinzel font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-1 text-amber-50"
                  style={{
                    background: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #92400e 100%)",
                    boxShadow: "0 4px 25px rgba(146,64,14,0.25), 0 2px 8px rgba(15,23,42,0.1)",
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
