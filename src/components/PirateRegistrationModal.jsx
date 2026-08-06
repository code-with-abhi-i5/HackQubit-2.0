import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Anchor, Sparkles, CheckCircle2, User, Users, Mail, Phone, School } from "lucide-react";
import emblemTreasureChest from "../assets/images/emblem_treasure_chest.png";

const PirateRegistrationModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    email: "",
    phone: "",
    college: "",
    teamSize: "4",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* ── UNFURLING PARCHMENT SCROLL CONTAINER ── */}
          <motion.div
            initial={{ scaleY: 0.1, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0.1, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-3xl border-4 border-[#3e2312] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-10 text-amber-950 select-none overflow-hidden my-auto"
            style={{
              background: "linear-gradient(180deg, #fdfbf7 0%, #f5efe6 50%, #e6d5c3 100%)",
              boxShadow: "inset 0 0 35px rgba(120,70,10,0.3), 0 25px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Vintage Wax Seal Emblem */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 mb-2">
                <img
                  src={emblemTreasureChest}
                  alt="Wax Seal Emblem"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/10 text-amber-950 font-cinzel text-[10px] font-black uppercase tracking-wider mb-1">
                <Anchor className="w-3.5 h-3.5 text-amber-800" />
                <span>Official Pirate Charter</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-950">
                Pledge Your Crew
              </h3>
              <p className="font-cinzel text-xs font-bold text-amber-900 mt-1">
                Registration Fee: ₹600 • Team Size: 2–4 Pirates
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4 animate-bounce" />
                <h4 className="font-cinzel text-2xl font-black text-amber-950">
                  Pledge Sealed &amp; Accepted!
                </h4>
                <p className="font-cinzel text-sm font-bold text-amber-900 mt-2 max-w-sm">
                  Your crew is registered for HackQubit 2.0! We will send voyage details to your email.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-cinzel">
                <div>
                  <label className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                    Pirate Crew / Team Name
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-amber-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Code Buccaneers"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-800/40 bg-white/80 focus:bg-white text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                      Captain Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-amber-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Captain Full Name"
                        value={formData.captainName}
                        onChange={(e) => setFormData({ ...formData, captainName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-800/40 bg-white/80 focus:bg-white text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-800/40 bg-white/80 focus:bg-white text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
                    >
                      <option value="2">2 Pirates</option>
                      <option value="3">3 Pirates</option>
                      <option value="4">4 Pirates (Full Crew)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                    Captain Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-amber-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="captain@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-800/40 bg-white/80 focus:bg-white text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-amber-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-800/40 bg-white/80 focus:bg-white text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-amber-950 uppercase tracking-wider block mb-1">
                      College / Institution
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 text-amber-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="RVSCET / College Name"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-800/40 bg-white/80 focus:bg-white text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-800/50"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 hover:from-amber-900 hover:to-amber-950 text-amber-50 font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Seal Pirate Charter &amp; Register</span>
                </button>
              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PirateRegistrationModal;
