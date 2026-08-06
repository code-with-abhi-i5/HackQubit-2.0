import { useState, useRef } from "react";
import { Compass, Sparkles, MapPin, Award, Terminal, Flame, ShieldAlert } from "lucide-react";
import { gsap } from "gsap";

const QUEST_LOCATIONS = [
  {
    id: "compass",
    name: "Navigational Core",
    icon: Compass,
    title: "24-Hour Non-Stop Hackathon",
    desc: "A high-stakes coding marathon testing speed, endurance, and real-time execution.",
    coord: "22.8046° N, 86.1833° E",
    color: "#d4af37",
  },
  {
    id: "terminal",
    name: "Code Deck",
    icon: Terminal,
    title: "On-Spot Problem Statements",
    desc: "No pre-built templates or PPT presentations. Challenge briefs are unlocked live!",
    coord: "RVSCET Innovation Lab",
    color: "#3b82f6",
  },
  {
    id: "trophy",
    name: "Bounty Treasury",
    icon: Award,
    title: "National Recognition & Cash Prizes",
    desc: "Compete against top developer crews across India to claim the ultimate title.",
    coord: "Main Auditorium Deck",
    color: "#eab308",
  },
  {
    id: "venue",
    name: "Pirate Outpost",
    icon: MapPin,
    title: "RVSCET Campus, Jamshedpur",
    desc: "State-of-the-art infrastructure with high-speed connectivity & overnight lodging.",
    coord: "Jamshedpur, Jharkhand",
    color: "#22c55e",
  },
];

const InteractiveTreasureMap = () => {
  const [activeLocation, setActiveLocation] = useState(QUEST_LOCATIONS[0]);
  const detailCardRef = useRef(null);

  const handleSelect = (loc) => {
    setActiveLocation(loc);
    gsap.fromTo(
      detailCardRef.current,
      { y: 15, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  const IconComponent = activeLocation.icon;

  return (
    <div className="relative my-12 p-6 sm:p-10 rounded-3xl overflow-hidden border border-amber-400/25 bg-[#030c1d]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cinzel text-xs text-amber-400 tracking-widest uppercase font-semibold">
              Interactive Map & Logbook
            </span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Explore Voyage Coordinates
          </h3>
        </div>
        <span className="font-cinzel text-xs text-white/40 tracking-widest uppercase bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          Click Points to Inspect
        </span>
      </div>

      {/* Grid: Buttons vs Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Buttons List (Left 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {QUEST_LOCATIONS.map((loc) => {
            const BtnIcon = loc.icon;
            const isSelected = activeLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-400/15 border-amber-400/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] translate-x-2"
                    : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/20"
                } border`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isSelected ? "bg-amber-400 text-slate-950" : "bg-white/5 text-amber-400 group-hover:scale-110"
                  }`}
                >
                  <BtnIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-cinzel text-xs text-white/40 tracking-widest uppercase block">
                    {loc.name}
                  </span>
                  <span className="font-cinzel text-sm font-bold text-white block mt-0.5">
                    {loc.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Logbook Card (Right 7 Cols) */}
        <div
          ref={detailCardRef}
          className="lg:col-span-7 p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[260px]"
          style={{
            background: `radial-gradient(ellipse at 100% 0%, ${activeLocation.color}20 0%, rgba(10,20,40,0.95) 70%)`,
            border: `1px solid ${activeLocation.color}50`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.5)`,
          }}
        >
          <div className="flex items-start justify-between">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: `${activeLocation.color}25`, border: `1px solid ${activeLocation.color}60` }}
            >
              <IconComponent className="w-7 h-7" style={{ color: activeLocation.color }} />
            </div>
            <span
              className="font-cinzel text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${activeLocation.color}40`, color: activeLocation.color, background: `${activeLocation.color}10` }}
            >
              {activeLocation.coord}
            </span>
          </div>

          <div className="my-6">
            <h4 className="font-cinzel text-2xl font-bold text-white mb-2">
              {activeLocation.title}
            </h4>
            <p className="font-cinzel text-sm text-white/70 leading-relaxed max-w-[480px]">
              {activeLocation.desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="font-cinzel text-xs text-white/40 tracking-widest uppercase">
              Voyage Coordinates Locked
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-ping" style={{ background: activeLocation.color }} />
              <span className="font-cinzel text-xs font-bold" style={{ color: activeLocation.color }}>
                ACTIVE NODE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTreasureMap;
