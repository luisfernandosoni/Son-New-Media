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
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ServiceItem } from '../types.ts';
import { ServiceCard } from './ServiceCard.tsx';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const services: ServiceItem[] = t('services.items') || [];

  return (
    <section id="services" className="py-16 lg:py-24 bg-background relative transition-colors duration-500 overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-[1600px] h-[1600px] bg-white/[0.015] blur-[250px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-40">
          <div className="space-y-10 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.05]"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-label-fluid font-bold uppercase tracking-widest-3x text-white/70">
                {t('services.tag')}
              </span>
            </motion.div>
            <h2 className="font-display text-h2-fluid font-medium text-white">
              {t('services.title')}
            </h2>
          </div>
          <p className="text-body-fluid text-white/50 max-w-md mt-16 md:mt-0 text-left leading-relaxed font-light">
            {t('services.desc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              item={service} 
              index={index} 
            />
          ))}
          
          <ServiceCard 
            index={services.length}
            isCTA={true}
            ctaTitle={t('services.custom')}
            ctaDesc={t('services.customDesc')}
            ctaBtn={t('services.cta')}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;