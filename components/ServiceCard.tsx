
import React, { useRef, useMemo, useId } from 'react';
// Added missing useTransform import from motion/react to satisfy usage on line 24
import { motion, useTime, useTransform, AnimatePresence, useInView } from 'motion/react';
import { ServiceItem } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { KineticSurface } from './kinetic/KineticSurface.tsx';
import { KineticLayer } from './kinetic/KineticLayer.tsx';

interface ServiceCardProps {
  item?: ServiceItem;
  index: number;
  isCTA?: boolean;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaBtn?: string;
}

const ServiceCardEngine: React.FC<ServiceCardProps> = ({ 
  item, index, isCTA, ctaTitle, ctaDesc, ctaBtn
}) => {
  const time = useTime();
  const { language } = useLanguage();

  // Fix: useTransform is now properly imported from motion/react
  const idleBreathe = useTransform(time, (t: number) => 1 + Math.sin((t + index * 500) / 4000) * 0.003);
  
  const theme = isCTA ? {
    container: "text-black",
    bg: "bg-white",
    subtext: "text-black/60",
    shadow: "hover:shadow-[0_80px_160px_rgba(255,255,255,0.18)]"
  } : {
    container: "text-white",
    bg: "bg-white/[0.04] backdrop-blur-3xl",
    subtext: "text-white/60",
    shadow: "hover:shadow-[0_50px_120px_rgba(0,0,0,0.5)]"
  };

  const textVariant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };
  
  const textTransition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <KineticSurface 
      strength={10} 
      shineIntensity={isCTA ? 0.06 : 0.18}
      className={`w-full h-full p-10 lg:p-12 rounded-[48px] border border-white/10 flex flex-col ${theme.container} ${theme.shadow} transition-shadow duration-700 overflow-visible`}
    >
      <motion.div style={{ scale: idleBreathe } as any} className={`absolute inset-0 rounded-[48px] pointer-events-none ${theme.bg}`} />

      {/* ICON & NUMBER LAYER */}
      <KineticLayer depth={165} className="flex justify-between items-start h-20 lg:h-24 mb-4 pointer-events-none">
        {isCTA ? (
          <span className="text-nano font-mono font-bold text-black/25 tracking-widest-2x uppercase pt-2">End_Sequence</span>
        ) : (
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-1000">
            <span className="material-icons-outlined text-2xl lg:text-3xl text-white group-hover:text-black transition-colors duration-700">{item?.icon}</span>
          </div>
        )}
        <span className={`text-nano font-mono font-bold tracking-widest-2x uppercase pt-2 transition-colors duration-700 ${isCTA ? 'text-black/15' : 'text-white/40 group-hover:text-white/80'}`}>
          {isCTA ? '///' : item?.number}
        </span>
      </KineticLayer>

      {/* TITLE LAYER */}
      <KineticLayer depth={105} className={`flex-grow flex flex-col pointer-events-none ${isCTA ? 'items-center text-center' : ''}`}>
        <div className="min-h-[2.2em] mb-4 w-full relative">
          <AnimatePresence mode="wait">
            <motion.h3 key={language} {...textVariant} transition={textTransition} className="text-card-title-fluid font-display font-medium leading-[1.1] tracking-tight w-full">
              {isCTA ? ctaTitle : item?.title}
            </motion.h3>
          </AnimatePresence>
        </div>
        
        {/* DESC SUB-LAYER */}
        <KineticLayer depth={55} className="relative min-h-[3em]">
          <AnimatePresence mode="wait">
            <motion.p key={language} {...textVariant} transition={{ ...textTransition, delay: 0.1 }} className={`text-body-fluid leading-relaxed transition-colors duration-1000 max-w-full font-light w-full ${theme.subtext} ${isCTA ? 'px-4 opacity-80' : 'group-hover:text-white/90'}`}>
              {isCTA ? ctaDesc : item?.description}
            </motion.p>
          </AnimatePresence>
        </KineticLayer>
      </KineticLayer>

      {isCTA && (
        <KineticLayer depth={225} className="relative pb-2 flex justify-center w-full">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full transition-all duration-700 shadow-xl group/btn cursor-pointer pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.span key={language} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={textTransition} className="uppercase tracking-widest-2x text-label-fluid font-bold block">
                {ctaBtn}
              </motion.span>
            </AnimatePresence>
            <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="material-icons-outlined text-lg">bolt</motion.span>
          </motion.div>
        </KineticLayer>
      )}

      {/* BORDER GLOW SUB-LAYER */}
      {!isCTA && (
        <KineticLayer depth={1} className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute inset-0 border-[2px] border-white/30 rounded-[48px]"
            style={{
              maskImage: `radial-gradient(500px circle at var(--mx) var(--my), black, transparent 90%)`,
              WebkitMaskImage: `radial-gradient(500px circle at var(--mx) var(--my), black, transparent 90%)`
            } as any}
          />
        </KineticLayer>
      )}
    </KineticSurface>
  );
};

export const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { margin: "200px", once: false });

  return (
    <div
      ref={scrollRef}
      className="relative h-[460px] group transition-opacity duration-700"
    >
      {isInView ? (
        <ServiceCardEngine {...props} />
      ) : (
        <div className="w-full h-full p-10 rounded-[48px] border border-white/5 bg-white/[0.02] flex flex-col opacity-20" />
      )}
    </div>
  );
};
