import React from 'react';
import { motion } from 'framer-motion';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

const RiveDisplay = () => {
  // Using a public Rive file that resembles a tech/mesh/fluid concept.
  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv', 
    stateMachines: "bumpy",
    // We instantiate Layout directly or rely on defaults. 
    // To be safe with ESM CDNs, we pass simple props where possible or rely on the react-wrapper's exports
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  return (
    <div className="w-full h-full relative group cursor-crosshair">
       {/* Fallback Image / Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-black z-0" />
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8NJDzPUfc17AetStXya0mR1WkSRvUXlKzJMDmTRQ61nSfrz4V1eSGNgp6HspHjmr4Wkz5IU5pWK1uIGUGkDfXjTDmjFBWuq1y0CKxXGC7GNfXbG97C6DS_SpPzOTHJ4YlJgLRcJQl6cyhtIiwTp9fqIv8ElbzwdaGMKGxD0PAKDvesg3d3xYgSAhMAZoAgA3sO1w9-boWr2Etm6-pOP7_ELkNmP6F3_bclbrlC6tXVROcuouoARJskq0lVbeBR3deTiXvMEHlv580"
        alt="Abstract Wave"
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-1000"
      />
      
      {/* Rive Canvas Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-end transform transition-transform duration-500 hover:scale-[1.02]">
            <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Processing Engine</p>
                <p className="text-white font-display text-2xl font-medium tracking-tight">Neural Cinematic V2</p>
            </div>
            <div className="flex gap-1 items-end h-8">
                {[1,2,3,4,5].map((i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: [12, 32, 16, 24, 12] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1.5, 
                            ease: "easeInOut",
                            delay: i * 0.1 
                        }}
                        className="w-1.5 bg-white rounded-full"
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10 z-10"
        >
          <h1 className="font-display text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.9] text-white">
            Hybrid<br />
            Filmmaking<br />
            <span className="text-gray-600 block mt-2">& Intelligence.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg font-light leading-relaxed">
            We build high-end digital products and automate cinematic experiences using bleeding-edge AI.
          </p>
          
          <div className="flex items-center gap-6 pt-4">
            <a href="#contact" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 font-medium text-black transition-all duration-300 hover:bg-gray-200 hover:w-48 w-40">
              <span className="mr-2">Start</span>
              <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            
            <button className="group flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              <span className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-800 group-hover:border-white transition-colors">
                <span className="material-icons-outlined text-lg">play_arrow</span>
              </span>
              Watch Reel
            </button>
          </div>
        </motion.div>

        {/* Visual Content / Rive */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
          className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-purple-900/10"
        >
            <RiveDisplay />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;