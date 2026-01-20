
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Magnetic } from './Magnetic.tsx';
import { Logo } from './Logo.tsx';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['services', 'work', 'about'];

  // Global Physics Standard
  const transition = { 
    duration: 0.4, 
    ease: [0.16, 1, 0.3, 1] as const 
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-border py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Magnetic strength={0.15} radius={80}>
          <a href="#" className="flex items-center group cursor-pointer relative">
            <Logo size={32} />
          </a>
        </Magnetic>

        <div className="flex items-center space-x-6 lg:space-x-10">
          <div className="hidden lg:flex items-center space-x-2 text-sm font-medium tracking-wide">
            {navItems.map((item) => (
              <Magnetic key={item} strength={0.25} radius={60}>
                <a
                  href={`#${item}`}
                  className="px-4 py-2 text-secondary hover:text-text transition-colors relative group uppercase text-nano font-bold tracking-widest-2x block"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={language}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={transition}
                      className="block"
                    >
                      {t(`nav.${item}`)}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span 
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-1/2" 
                  />
                </a>
              </Magnetic>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l border-border pl-6 lg:pl-10">
            <div className="flex bg-subtle/50 rounded-full p-1 border border-border">
              {(['en', 'es'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all duration-300 ${
                    language === lang 
                    ? 'bg-accent text-accent-contrast shadow-sm' 
                    : 'text-secondary hover:text-text'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <Magnetic strength={0.1} radius={100}>
            <a
              href="#contact"
              className="hidden md:block bg-accent text-accent-contrast px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-accent/10 transition-all font-black text-nano uppercase tracking-widest-2x overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                  className="block"
                >
                  {t('nav.contact')}
                </motion.span>
              </AnimatePresence>
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
