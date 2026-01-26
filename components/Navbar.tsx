
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { NavBranding, NavLinkItem, NavLanguageSwitcher, NavCTA } from './navbar/Atoms.tsx';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Threshold 50px for transition to glass-morphism
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['services', 'work', 'about'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 border-b ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-2xl border-white/10 py-4'
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-8xl mx-auto px-10 lg:px-20 flex items-center justify-between">
        {/* Identity Anchor */}
        <NavBranding />

        <div className="flex items-center space-x-12 lg:space-x-16">
          {/* Navigation Matrix */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLinkItem 
                key={item} 
                item={item} 
                label={t(`nav.${item}`)} 
                language={language} 
              />
            ))}
          </div>
          
          {/* System Actions */}
          <div className="flex items-center gap-8 border-l border-white/10 pl-12 lg:pl-16">
            <NavLanguageSwitcher 
              current={language} 
              onSelect={setLanguage} 
            />
          </div>

          {/* Conversion Portal */}
          <NavCTA 
            label={t('nav.contact')} 
            language={language} 
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
