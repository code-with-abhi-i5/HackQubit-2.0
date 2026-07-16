import { Hero, About, Sponsorship, Footer, ScrollToTop } from "./components";

function App() {
  return (
    <main className="bg-pirate-bg min-h-screen relative">
      <Hero />
      <About />
      <Sponsorship />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

export default App;
