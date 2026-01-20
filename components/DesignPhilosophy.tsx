
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';

const DesignPhilosophy: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-40 bg-surface border-y border-border transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="material-icons-outlined text-4xl mb-10 text-secondary/40">format_quote</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <blockquote className="font-display text-3xl md:text-5xl font-light leading-tight mb-12 text-text">
              {t('philosophy.quote')}
            </blockquote>
            <cite className="not-italic text-xs font-bold tracking-[0.3em] uppercase text-secondary block">
              {t('philosophy.tag')}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DesignPhilosophy;
