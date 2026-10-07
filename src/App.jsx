import React, { Component, useState, useCallback, useEffect } from "react";
import {
  Hero,
  About,
  Timeline,
  PrizePool,
  ProblemStatements,
  SponsorPackage,
  SponsorPerks,
  OurSponsors,
  Footer,
  Loader,
  Gallery,
  FAQ,
  ProblemStatementsPage,
} from "./components";

import PirateCaptainGuide from "./components/PirateCaptainGuide";
import PirateParrotCompanion from "./components/PirateParrotCompanion";
import DoubloonCursorTrail from "./components/DoubloonCursorTrail";
import { AnimatePresence } from "framer-motion";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-red-500 p-10 z-50 relative font-mono">
          <h1 className="text-3xl mb-4">React App Crashed</h1>
          <p className="mb-4">{this.state.error?.toString()}</p>
          <pre className="whitespace-pre-wrap text-sm">{this.state.errorInfo?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [loading, setLoading] = useState(true);

  // Router state: 'home' or 'problems'
  const isProblemsHash = () =>
    typeof window !== "undefined" &&
    (window.location.hash === "#problems" || window.location.hash === "#problem-statements");

  const [currentPage, setCurrentPage] = useState(() => (isProblemsHash() ? "problems" : "home"));

  useEffect(() => {
    const handleHashChange = () => {
      if (isProblemsHash()) {
        setCurrentPage("problems");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");

  const navigateToProblems = useCallback((cat = "all") => {
    setActiveCategory(typeof cat === "string" ? cat : "all");
    setCurrentPage("problems");
    window.location.hash = "problems";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentPage("home");
    window.location.hash = "home";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  }, []);

  return (
    <ErrorBoundary>
      {/* Interactive Doubloon Gold Spark Cursor Trail */}
      {!loading && <DoubloonCursorTrail />}

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Conditionally Render Either Dedicated Problem Statements Page OR Main Voyage */}
      {currentPage === "problems" ? (
        <ProblemStatementsPage onBack={navigateToHome} initialCategory={activeCategory} />
      ) : (
        <main className={`bg-pirate-bg min-h-screen relative ${loading ? "h-screen overflow-hidden" : ""}`}>
          <Hero onOpenProblems={navigateToProblems} />

          <About />

          {/* ── OUR SPONSORS (RIGHT BELOW ABOUT) ── */}
          <OurSponsors />

          {/* Timeline → Prize Pool → Problem Statements */}
          <Timeline />
          <PrizePool />
          <ProblemStatements onOpenProblems={navigateToProblems} />

          {/* Sponsor Package → Sponsor Perks */}
          <SponsorPackage />
          <SponsorPerks />

          {/* Our Past Gallery */}
          <Gallery />

          {/* FAQ → Footer */}
          <FAQ />
          <Footer />

          {/* Fixed Position Pirate Captain Guide & Interactive Parrot Companion */}
          {!loading && (
            <>
              <PirateCaptainGuide />
              <PirateParrotCompanion />
            </>
          )}
        </main>
      )}
    </ErrorBoundary>
  );
}

export default App;
