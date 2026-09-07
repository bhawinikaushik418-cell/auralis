import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import LiveDemo from './components/LiveDemo';
import WhoItProtects from './components/WhoItProtects';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-ink-900">
      <Hero />
      <HowItWorks />
      <LiveDemo />
      <WhoItProtects />
      <Footer />
    </main>
  );
}

export default App;
