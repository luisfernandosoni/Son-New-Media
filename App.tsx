import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import DesignPhilosophy from './components/DesignPhilosophy';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-background text-white selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <DesignPhilosophy />
      </main>
      <Footer />
    </div>
  );
};

export default App;