
/* 
 * RULES SUMMARY:
 * 1. Focus: Architectural Modularization & Layout Realignment.
 * 2. Silicon Valley VP/Senior Engineer standard.
 * 3. Bleeding-edge Motion 12.
 * 4. Jony Ive approved beauty.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Magnetic } from './Magnetic.tsx';
import { SentinelCore } from './SentinelCore.tsx';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };
  const variant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-background pt-32 lg:pt-40 pb-20 overflow-hidden">
       {/* Master Grid: Columna Coincidente Logic */}
       <div className="max-w-8xl w-full mx-auto px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch relative z-10">
          
          {/* Columna Izquierda: Content Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left h-full relative z-20">
            <div className="space-y-12 lg:space-y-16">
              {/* TAG: Cine Inteligente */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div key={language} {...variant} transition={transition}>
                    <div className="inline-flex items-center gap-5 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest-3x text-white/50">
                        {t('hero.tag')}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* H1: Cine Híbrido & Nuevos Medios */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={language}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="font-display text-h1-fluid font-medium leading-[0.85] tracking-tighter text-text"
                  >
                    <span className="block">{t('hero.title1')}</span>
                    <span className="block text-secondary italic">{t('hero.title2')}</span>
                    <span className="block">{t('hero.title3')}</span>
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Desc: Arquitectamos experiencias... */}
              <div className="relative max-w-sm">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={language} 
                    {...variant} 
                    transition={transition}
                    className="text-body-fluid text-secondary leading-relaxed opacity-50 font-light"
                  >
                    {t('hero.desc')}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* CTAs: Reel Cine / Ver Archivo */}
            <div className="flex flex-wrap items-center gap-6 mt-16">
              <Magnetic strength={0.12} radius={120}>
                <motion.a 
                  href="#work" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-white text-black px-8 py-3.5 lg:px-10 lg:py-4 rounded-full font-black text-[10px] uppercase tracking-widest-3x shadow-lg block"
                >
                  <AnimatePresence mode="wait">
                    <motion.span key={language} {...variant} transition={transition} className="relative z-10 block">
                      {t('hero.btn')}
                    </motion.span>
                  </AnimatePresence>
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.08} radius={100}>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="px-8 py-3.5 lg:px-10 lg:py-4 rounded-full font-black text-[10px] uppercase tracking-widest-3x text-text border border-white/15 flex items-center gap-5 group"
                >
                  <span className="material-icons-outlined text-lg opacity-60 group-hover:opacity-100 transition-opacity">play_circle</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={language} {...variant} transition={transition} className="block">
                      {t('hero.reel')}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </Magnetic>
            </div>
          </div>

          {/* Columna Derecha: Sentinel Core (Anchored to content height via Grid items-stretch) */}
          <div className="lg:col-span-7 relative min-h-[400px]">
             <SentinelCore />
          </div>
       </div>
    </section>
  );
};

export default Hero;
