
import React, { useRef, useMemo, useId } from 'react';
import { motion, useSpring, useTransform, useTime, useMotionValue, MotionValue, AnimatePresence, useInView, useMotionTemplate } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useKinetic, useRelativeMotion } from '../context/KineticContext.tsx';
import { Magnetic } from './Magnetic.tsx';

// --- COMPONENT: AnamorphicStreak ---
const AnamorphicStreak = () => {
  const { mouseX } = useKinetic();
  const xTransform = useTransform(mouseX, [0, window.innerWidth], ["-20%", "20%"]);
  const springX = useSpring(xTransform, { stiffness: 40, damping: 20 });

  return (
    <motion.div 
      style={{ x: springX } as any}
      className="absolute top-1/2 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-y-1/2 pointer-events-none blur-[1px] z-[1]"
    />
  );
};

// --- COMPONENT: SentinelRing (High-Density Orbital Engine) ---
const SentinelRing = React.memo(({ 
  index, 
  relX, 
  relY, 
  isMobile,
  totalRings
}: { 
  index: number; 
  relX: MotionValue<number>; 
  relY: MotionValue<number>;
  isMobile: boolean;
  totalRings: number;
}) => {
  // RESTORED DIMENSIONS: Delicate Filigree
  const baseDepth = isMobile ? 8 : 14;
  const baseSize = isMobile ? 24 : 38;
  const sizeStep = isMobile ? 18 : 26;
  
  const zDepth = index * -baseDepth;

  const springConfig = useMemo(() => ({ 
    stiffness: 100 - (index * 3), 
    damping: 45 + (index * 1.5),   
    mass: 0.8 + (index * 0.08),    
  }), [index]);

  const ringSpringX = useSpring(relX, springConfig);
  const ringSpringY = useSpring(relY, springConfig);
  
  // ORBITAL PHYSICS: Balanced following
  const rotationIntensity = 45 + (index * 8); 
  const rX = useTransform(ringSpringY, [0, 1], [rotationIntensity, -rotationIntensity]);
  const rY = useTransform(ringSpringX, [0, 1], [-rotationIntensity, rotationIntensity]);
  
  // SPEARHEAD FOLLOW: Inner follows, outer anchors
  const followIntensity = useTransform(useMotionValue(index), (i) => 
    Math.pow(1 - (i / totalRings), 1.5)
  );
  
  const moveRange = isMobile ? 40 : 120; // Rebalanced range
  const tx = useTransform([ringSpringX, followIntensity], ([x, intensity]) => 
    ((x as number) - 0.5) * moveRange * (intensity as number)
  );
  const ty = useTransform([ringSpringY, followIntensity], ([y, intensity]) => 
    ((y as number) - 0.5) * moveRange * (intensity as number)
  );

  const opacity = useTransform(useMotionValue(index), (i) => 
    0.6 - (i / totalRings) * 0.5
  );

  return (
    <motion.div
      style={{
        width: `${baseSize + index * sizeStep}px`,
        height: `${baseSize + index * sizeStep}px`,
        rotateX: rX,
        rotateY: rY,
        x: tx,
        y: ty,
        translateZ: zDepth,
        opacity,
        transformStyle: "preserve-3d",
      } as any}
      className="absolute flex items-center justify-center will-change-transform"
    >
      <div 
        className="w-full h-full rounded-full border border-white/5 relative"
        style={{
          boxShadow: `0 0 30px rgba(255, 255, 255, 0.01)`,
        }}
      >
        <motion.div 
          className="w-full h-full rounded-full"
          style={{
            boxShadow: `inset 0 0 0 0.5px rgba(255, 255, 255, ${0.1 - (index * 0.003)})`,
          }}
        />
      </div>
    </motion.div>
  );
});

// --- COMPONENT: SentinelAssembly ---
const SentinelAssembly: React.FC<{
  relX: MotionValue<number>;
  relY: MotionValue<number>;
  isMobile: boolean;
  time: MotionValue<number>;
}> = ({ relX, relY, isMobile, time }) => {
  const ringCount = isMobile ? 12 : 22; // High density for the 'pretty' look
  const rings = useMemo(() => Array.from({ length: ringCount }), [ringCount]);

  return (
    <motion.div 
      style={{ transformStyle: "preserve-3d" } as any} 
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Background Neural Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="absolute h-full w-[1px] bg-white" style={{ left: `${(i + 1) * 4.16}%` }} />
        ))}
      </div>

      {rings.map((_, i) => (
        <SentinelRing 
          key={`ring-${i}`} 
          index={i} 
          relX={relX} 
          relY={relY} 
          isMobile={isMobile}
          totalRings={ringCount}
        />
      ))}
      
      {/* Core Focal Orb */}
      <motion.div 
        style={{ 
          translateZ: isMobile ? 30 : 80, 
          x: useTransform(relX, [0, 1], [-60, 60]),
          y: useTransform(relY, [0, 1], [-60, 60]),
          transformStyle: "preserve-3d"
        } as any} 
        className="relative z-50"
      >
        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.6)]">
          <motion.div 
            style={{ 
              scale: useTransform(time, (t: number) => 0.2 + Math.sin(t / 1000) * 0.05),
              opacity: useTransform(time, (t: number) => 0.8 + Math.sin(t / 1000) * 0.2)
            } as any} 
            className="w-2 h-2 rounded-full bg-background" 
          />
        </div>
        
        <motion.div 
          animate={{ opacity: [0.2, 0.05, 0.2] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute inset-0 -m-12 lg:-m-20 bg-white/20 blur-3xl rounded-full -z-10" 
        />
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT: SentinelCore ---
const SentinelCore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardId = useId();
  const isInView = useInView(containerRef, { margin: "200px" });
  
  const { isMobile } = useKinetic();
  const time = useTime();
  const { relX, relY } = useRelativeMotion(cardId, containerRef);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[500px] lg:min-h-0 aspect-square lg:aspect-auto relative group flex items-center justify-center perspective-[3000px] overflow-hidden rounded-[40px] lg:rounded-[60px] bg-black border border-white/5 transition-all duration-1000"
    >
      {isInView && (
        <SentinelAssembly 
          relX={relX}
          relY={relY}
          isMobile={isMobile}
          time={time}
        />
      )}
      
      {/* RESTORED HUD UI */}
      <div className="absolute inset-0 z-[60] p-10 lg:p-14 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[7px] lg:text-nano uppercase tracking-widest-2x font-black text-white opacity-40">SYSTEM_CORE_V2</p>
            <p className="text-[6px] lg:text-[8px] font-mono text-white/20 uppercase tracking-widest">PROXIMITY_AWARENESS_ACTIVE</p>
          </div>
          <div className="text-[7px] lg:text-nano font-mono text-white/30 text-right uppercase tracking-widest tabular-nums">FPS: 120.0</div>
        </div>
        
        <div className="w-full flex justify-between items-end">
          <div className="bg-[#121212] border border-white/5 px-8 py-6 rounded-2xl">
            <p className="text-[7px] lg:text-[8px] uppercase tracking-widest-2x text-white/20 mb-1 font-bold">SENTINEL</p>
            <h3 className="text-white font-mono text-xs lg:text-sm font-black tracking-widest uppercase leading-none">SYNK_ORBIT</h3>
          </div>
          <div className="flex gap-1.5 items-end h-6 lg:h-8 opacity-40">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div key={i} animate={{ height: [2, 12, 2] }} transition={{ repeat: Infinity, duration: 0.8 + i * 0.1, ease: "easeInOut" }} className="w-[1.5px] bg-white" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Hero ---
const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  
  const transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };
  const variant = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-32 overflow-hidden bg-background">
       <div className="absolute inset-0 w-full h-full pointer-events-none">
          <AnamorphicStreak />
       </div>

       <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 gap-16 lg:gap-0">
          
          <div className="lg:col-span-5 flex flex-col justify-center text-left py-4 lg:py-0 h-full lg:pr-10">
            {/* Tag Card: Dark Pill style from image */}
            <div className="relative mb-8 lg:mb-12">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={language} 
                  {...variant} 
                  transition={transition}
                >
                  <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#121212] border border-white/5 self-start">
                    <span className="text-[9px] lg:text-nano font-black uppercase tracking-widest-3x text-white/80">
                      {t('hero.tag')}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* H1 Restoration: Correct colors and italicization */}
            <div className="relative mb-10 lg:mb-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={language}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <h1 className="font-display text-h1-fluid font-medium leading-[0.95] tracking-tighter text-text">
                    <span className="block">{t('hero.title1')}</span>
                    <span className="block text-secondary italic">{t('hero.title2')}</span>
                    <span className="block">{t('hero.title3')}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mb-16 lg:mb-20 min-h-[4em]">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={language} 
                  {...variant} 
                  transition={transition}
                  className="text-body-fluid text-secondary max-w-sm leading-relaxed opacity-60 font-light"
                >
                  {t('hero.desc')}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Magnetic strength={0.15} radius={200}>
                <motion.a 
                  href="#work" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-white text-black px-12 lg:px-14 py-5 lg:py-6 rounded-full font-bold text-[10px] lg:text-label-fluid uppercase tracking-widest-2x transition-all duration-500 flex items-center justify-center w-full sm:w-auto overflow-hidden group"
                >
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={language} 
                      {...variant} 
                      transition={transition}
                      className="relative z-10 block"
                    >
                      {t('hero.btn')}
                    </motion.span>
                  </AnimatePresence>
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.08} radius={180}>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  className="px-10 lg:px-12 py-5 lg:py-6 rounded-full font-bold text-[10px] lg:text-label-fluid uppercase tracking-widest-2x text-text border border-white/10 transition-all duration-500 flex items-center gap-6 group w-full sm:w-auto justify-center"
                >
                  <span className="material-icons-outlined text-xl opacity-60 group-hover:opacity-100 transition-opacity">play_circle</span>
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={language} 
                      {...variant} 
                      transition={transition}
                      className="block"
                    >
                      {t('hero.reel')}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </Magnetic>
            </div>
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }}
             className="lg:col-span-7 relative flex items-center justify-center"
          >
             <SentinelCore />
          </motion.div>
       </div>
    </section>
  );
};

export default Hero;
