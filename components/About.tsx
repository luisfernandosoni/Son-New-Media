
/* 
 * RULES SUMMARY:
 * 1. Focus on one core task per sprint.
 * 2. Maintain SV Top 10 VP/Senior standard.
 * 3. Use bleeding-edge technology/design.
 * 4. Strive for Apple-level aesthetic perfection.
 * 5. No unsolicited changes.
 * 6. Inform and explain work.
 * 7. Leverage Cloudflare 2026 Ecosystem.
 * 8. Always start by summarizing rules.
 */

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 lg:py-24 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-5 space-y-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-6 px-7 py-3 rounded-full border border-accent/10 bg-accent/[0.04]"
            >
              <span className="text-label-fluid font-bold uppercase tracking-widest-3x text-accent/60">
                {t('about.tag')}
              </span>
            </motion.div>
            
            <div className="space-y-12">
              <p className="text-body-fluid text-secondary leading-relaxed font-light opacity-90 max-w-sm">
                {t('about.desc')}
              </p>
              <div className="h-[2px] w-28 bg-accent/20" />
            </div>
          </div>

          {/* Main Manifesto Text */}
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-h2-fluid font-medium text-text mb-24"
            >
              {t('about.title')}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-h3-fluid text-secondary font-light leading-snug max-w-3xl opacity-85"
            >
              {t('about.manifesto')}
            </motion.p>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/[0.02] blur-[180px] rounded-full pointer-events-none -z-10" />
      </div>
    </section>
  );
};

export default About;
