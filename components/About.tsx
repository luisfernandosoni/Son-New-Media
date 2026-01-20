
/* 
 * RULES SUMMARY:
 * 1. Focus on one core task per sprint.
 * 2. Maintain SV Top 10 VP/Senior standard.
 * 3. Use bleeding-edge technology/design.
 * 4. Strive for Apple-level aesthetic perfection.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const variant = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
  };
  
  const transition = { 
    duration: 0.4, 
    ease: [0.16, 1, 0.3, 1] as const 
  };

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-4 space-y-16">
            <div className="relative min-h-[44px]">
              <AnimatePresence mode="wait">
                <motion.div key={language} {...variant} transition={transition}>
                  <div className="inline-flex items-center gap-6 px-6 py-2.5 rounded-full border border-accent/10 bg-accent/[0.04]">
                    <span className="text-nano font-black uppercase tracking-widest-3x text-accent/60">
                      {t('about.tag')}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="space-y-10">
              <div className="relative min-h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.p key={language} {...variant} transition={transition}>
                    <span className="text-body-fluid text-secondary leading-relaxed font-light opacity-80 max-w-xs block">
                      {t('about.desc')}
                    </span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="h-[1px] w-20 bg-accent/20" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={language} {...variant} transition={{ ...transition, duration: 0.5 }}>
                <h2 className="font-display text-h2-fluid font-medium text-text mb-16 lg:mb-20">
                  {t('about.title')}
                </h2>
                
                <p className="text-h3-fluid text-secondary font-light leading-relaxed max-w-2xl opacity-80">
                  {t('about.manifesto')}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/[0.01] blur-[200px] rounded-full pointer-events-none -z-10" />
      </div>
    </section>
  );
};

export default About;
