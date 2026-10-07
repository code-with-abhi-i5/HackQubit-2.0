import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  PackageCheck,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  Layers,
  Activity,
  Brain,
  Coins,
  Bot,
  Shield,
  FileText,
  Award
} from "lucide-react";
import { PROBLEM_STATEMENTS, TRACK_CATEGORIES } from "../constants/problemStatementsData";
import logoRed from "../assets/images/logo_red.png";
import logoRvscet from "../assets/images/logo_rvscet.png";
import logoHelix from "../assets/images/logo_helix.png";
import emblemTreasureChest from "../assets/images/emblem_treasure_chest.webp";
import femalePirateNavigator from "../assets/images/female_pirate_navigator.webp";
import GoldRainParticles from "./GoldRainParticles";

const getCategoryIcon = (category) => {
  switch (category) {
    case "sponsored":
      return Award;
    case "healthcare":
      return Activity;
    case "ai-ml":
      return Brain;
    case "web3":
      return Coins;
    case "agents":
      return Bot;
    case "cybersecurity":
      return Shield;
    default:
      return Compass;
  }
};

const ProblemCard = ({ problem, index, isExpanded, onToggleExpand }) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = getCategoryIcon(problem.category);

  const handleCopy = (e) => {
    e.stopPropagation();
    const text = `
${problem.number}: ${problem.title}
Domain: ${problem.domain}
Track: ${problem.badge}

PROBLEM IN BRIEF:
${problem.brief}

WHAT TEAMS MUST BUILD:
${problem.mustBuild.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

EXPECTED DELIVERABLES:
${problem.deliverables}

KEY CHALLENGE:
${problem.keyChallenge}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className={`group relative rounded-3xl border-2 transition-all duration-300 overflow-hidden text-amber-950 ${
        problem.category === "sponsored"
          ? isExpanded
            ? "border-amber-600 bg-white shadow-2xl ring-4 ring-amber-500/30"
            : "border-amber-500/60 bg-gradient-to-b from-amber-50/40 via-white to-white shadow-xl hover:border-amber-600 hover:shadow-2xl"
          : isExpanded
          ? "border-amber-700 bg-white shadow-2xl ring-2 ring-amber-500/30"
          : "border-amber-900/20 bg-white/95 hover:border-amber-700/60 hover:shadow-xl"
      }`}
    >
      {/* Top Accent Gradient Bar */}
      <div
        className={`h-2 w-full ${
          problem.category === "sponsored"
            ? "bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700"
            : "bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800"
        }`}
      />

      {/* Main Card Header */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            {/* Number Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-cinzel text-xs font-black tracking-wider shadow-sm ${
                problem.category === "sponsored"
                  ? "bg-gradient-to-r from-amber-600 to-amber-800 text-amber-50 ring-1 ring-amber-400"
                  : "bg-amber-800 text-amber-50"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {problem.number}
            </span>

            {/* Domain Badge */}
            <span
              className={`px-3 py-1 rounded-full font-cinzel text-xs font-bold tracking-wide border ${
                problem.category === "sponsored"
                  ? "bg-amber-100 text-amber-950 border-amber-400/80 font-black"
                  : "bg-amber-500/15 border-amber-800/25 text-amber-900"
              }`}
            >
              {problem.domain}
            </span>
          </div>

          {/* Quick Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-800/20 bg-amber-50 hover:bg-amber-100 text-amber-900 font-cinzel text-xs font-bold transition-all duration-200"
            title="Copy Problem Statement"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-800">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-800" />
                <span>Copy PS</span>
              </>
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 mb-3 tracking-wide leading-tight group-hover:text-amber-800 transition-colors">
          {problem.title}
        </h3>

        {/* Sub-badge / Track identifier */}
        <div className="text-[11px] font-cinzel font-extrabold text-amber-800/90 tracking-widest uppercase mb-3">
          ⚓ {problem.badge}
        </div>

        {/* Technology & Concept Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {problem.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className={`px-2.5 py-0.5 rounded-md font-raleway text-[11px] font-bold ${
                  problem.category === "sponsored"
                    ? "bg-amber-100/90 border border-amber-300 text-amber-950 shadow-2xs"
                    : "bg-amber-100/60 border border-amber-200/80 text-amber-900"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Problem in Brief */}
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 sm:p-5 mb-5 shadow-inner">
          <div className="flex items-center gap-2 mb-2 text-xs font-cinzel font-black text-amber-900 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-amber-800" />
            <span>Problem in Brief</span>
          </div>
          <p className="font-raleway text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
            {problem.brief}
          </p>
        </div>

        {/* Expand / Collapse Toggle Bar */}
        <button
          onClick={onToggleExpand}
          className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-amber-900/5 hover:bg-amber-900/10 transition-colors font-cinzel text-xs font-black text-amber-900 uppercase tracking-wider"
        >
          <span>{isExpanded ? "Collapse Full Specifications" : "View Full Specifications & Deliverables"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180 text-amber-700" : "text-amber-900"
            }`}
          />
        </button>

        {/* Expanded Detailed Sections */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-amber-900/15 flex flex-col gap-6 overflow-hidden"
            >
              {/* 1. What Teams Must Build */}
              <div>
                <h4 className="flex items-center gap-2 font-cinzel text-sm sm:text-base font-black text-amber-950 uppercase tracking-wider mb-3">
                  <PackageCheck className="w-4 h-4 text-amber-800" />
                  <span>What Teams Must Build</span>
                </h4>
                <ul className="grid grid-cols-1 gap-2.5">
                  {problem.mustBuild.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/50 text-slate-800 text-sm font-raleway font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-800 text-amber-50 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Expected Deliverables */}
              <div>
                <h4 className="flex items-center gap-2 font-cinzel text-sm sm:text-base font-black text-amber-950 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Expected Deliverables</span>
                </h4>
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300/80 text-emerald-950 font-raleway text-sm leading-relaxed font-semibold">
                  {problem.deliverables}
                </div>
              </div>

              {/* 3. Key Challenge */}
              <div>
                <h4 className="flex items-center gap-2 font-cinzel text-sm sm:text-base font-black text-amber-950 uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Key Challenge</span>
                </h4>
                <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-950 font-raleway text-sm leading-relaxed font-bold">
                  {problem.keyChallenge}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProblemStatementsPage = ({ onBack, initialCategory = "all" }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState({});
  const [expandAll, setExpandAll] = useState(false);

  // Sync selectedCategory when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Scroll to top upon mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleExpandAll = () => {
    const nextState = !expandAll;
    setExpandAll(nextState);
    const newExpanded = {};
    PROBLEM_STATEMENTS.forEach((ps) => {
      newExpanded[ps.id] = nextState;
    });
    setExpandedCards(newExpanded);
  };

  const filteredProblems = useMemo(() => {
    return PROBLEM_STATEMENTS.filter((ps) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" ? true : ps.category === selectedCategory;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        ps.title.toLowerCase().includes(query) ||
        ps.number.toLowerCase().includes(query) ||
        ps.domain.toLowerCase().includes(query) ||
        ps.brief.toLowerCase().includes(query) ||
        ps.keyChallenge.toLowerCase().includes(query) ||
        (ps.tags && ps.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-pirate-bg text-slate-900 relative selection:bg-amber-300 selection:text-amber-950 pb-28">
      <GoldRainParticles />

      {/* ── TOP STICKY NAVIGATION BAR ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-amber-900/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Identity & Logos */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-amber-800 hover:bg-amber-950 text-amber-50 font-cinzel text-xs sm:text-sm font-extrabold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-amber-900/20">
              <img src={logoRvscet} alt="RVSCET" className="w-7 h-7 object-contain" />
              <img src={logoHelix} alt="Helix" className="w-7 h-7 object-contain" />
              <img src={logoRed} alt="HackQubit" className="w-7 h-7 object-contain" />
              <span className="font-cinzel text-xs font-black text-amber-950 tracking-wider">
                HACKQUBIT 2.0
              </span>
            </div>
          </div>

          {/* Right: Quick Stats & Expand All */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={handleToggleExpandAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-900/30 bg-amber-50 hover:bg-amber-100 text-amber-950 font-cinzel text-[11px] sm:text-xs font-bold transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-amber-800" />
              <span>{expandAll ? "Collapse All" : "Expand All"}</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-800/30 text-amber-950 font-cinzel text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>{filteredProblems.length} Bounties</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER SECTION ── */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Floating Navigator Asset */}
        <div className="hidden lg:block absolute -top-4 right-6 pointer-events-none w-44 h-auto opacity-90 drop-shadow-xl">
          <img
            src={femalePirateNavigator}
            alt="Pirate Navigator"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Vintage Top Emblem */}
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 drop-shadow-xl hover:scale-105 transition-transform duration-300">
          <img
            src={emblemTreasureChest}
            alt="Bounty Emblem"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-900/40 bg-amber-500/20 text-amber-950 font-cinzel text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
          <Compass className="w-4 h-4 text-amber-800 animate-spin-slow" />
          <span>Official Hackathon Challenge Scrolls</span>
        </div>

        <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black text-amber-950 tracking-wide mb-4">
          Problem <span className="text-amber-800">Statements</span>
        </h1>

        <p className="font-raleway text-slate-800 text-base sm:text-xl font-bold max-w-3xl mx-auto leading-relaxed mb-8">
          Unfurl your sails and choose your expedition. Build robust, high-impact prototypes to claim glory and win prizes worth over ₹30,000+!
        </p>

        {/* ── SEARCH & FILTER CONTROLS ── */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-800" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem title, technology, domain, or problem number..."
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-amber-900/20 focus:border-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-amber-950 placeholder-amber-900/50 font-raleway text-sm sm:text-base font-semibold shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-cinzel font-black text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Track Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TRACK_CATEGORIES.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              const TabIcon = getCategoryIcon(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-cinzel text-xs sm:text-sm font-extrabold transition-all duration-300 shadow-sm cursor-pointer ${
                    isSelected
                      ? "bg-amber-800 text-amber-50 shadow-md scale-105 border-2 border-amber-900"
                      : "bg-white/80 hover:bg-white text-amber-950 border border-amber-900/20 hover:border-amber-700"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-2 py-0.2 rounded-full font-sans font-bold ${
                      isSelected ? "bg-amber-950 text-amber-200" : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENTS GRID ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white/80 border-2 border-amber-900/20 p-8 max-w-xl mx-auto shadow-xl">
            <div className="w-16 h-16 mx-auto mb-4 text-amber-800">
              <Compass className="w-full h-full animate-spin-slow" />
            </div>
            <h3 className="font-cinzel text-2xl font-black text-amber-950 mb-2">
              No Bounties Found
            </h3>
            <p className="font-raleway text-amber-900 font-bold mb-6">
              No problem statements matched your search criteria "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2.5 rounded-full bg-amber-800 text-amber-50 font-cinzel text-xs font-bold shadow-md hover:bg-amber-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {filteredProblems.map((problem, index) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={index}
                isExpanded={Boolean(expandedCards[problem.id] || expandAll)}
                onToggleExpand={() => handleToggleCard(problem.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER CALL TO ACTION ── */}
      <div className="max-w-3xl mx-auto mt-20 px-4 text-center">
        <div className="rounded-3xl border-2 border-amber-900/30 bg-white/95 p-8 shadow-2xl">
          <h3 className="font-cinzel text-2xl font-black text-amber-950 mb-3">
            Ready to Build Your Solution?
          </h3>
          <p className="font-raleway text-amber-900 font-bold text-sm sm:text-base mb-6">
            Sharpen your tools, align your team with the deliverables, and prepare for the 24-hour sprint at RVSCET Jamshedpur!
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 font-cinzel text-sm font-black tracking-wider shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            <span>Return to Hackathon Voyage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatementsPage;
