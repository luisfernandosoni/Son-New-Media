import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-white/10 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative h-8 w-8 overflow-hidden">
             <img 
              alt="Soní Logo" 
              className="h-full w-full object-contain invert transition-transform duration-500 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj-4Q2WkLako8D3eq3-VcJbu2DnxRjHwY5mmRKmTYdNK4Oqev7p1akiGsxQAn53O0HR0pT5dwWlI1hTFBRlplYL3wlu0YA1eNAIlGdrBGLuSP4NifEEnQPOelLDwZkIUo0PmaDspKxdqOzZxtxQ3sHgZd8Xc4rT1DIe5_XUyTGTIc8cGtjanVqwWgbfIILclHgZy8A1ydNtR5PP9Vo31tUwKqoo5pP6iMHsP-Da2tGmiw3F5NQw5I0uIEW9NdbCJ4dxcXTl4NiMdty"
            />
          </div>
          <span className="font-display font-medium text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
            soní new media
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
          {['Services', 'Work', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 font-semibold"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white p-2">
          <span className="material-icons-outlined">menu</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;