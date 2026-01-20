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

import React, { useRef } from 'react';
import { motion, useTime, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ServiceItem } from '../types.ts';

interface ServiceCardProps {
  item?: ServiceItem;
  index: number;
  isCTA?: boolean;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaBtn?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  item, 
  index, 
  isCTA = false,
  ctaTitle,
  ctaDesc,
  ctaBtn
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const time = useTime();

  // 1. Intelligence: High-Fidelity Physics Engine
  const mouseX = useMotionValue(0.5); 
  const mouseY = useMotionValue(0.5); 

  /**
   * SV SENIOR STANDARD: Inertial Spring Configuration
   * We increase 'mass' to 1.2 to simulate physical weight.
   * We increase 'damping' to 35 for a "luxury car suspension" settle.
   */
  const springConfig = { 
    stiffness: 180, 
    damping: 35, 
    mass: 1.2,
    restDelta: 0.001 
  };
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2. Geometry: Sophisticated 10-degree Weighted Rotation
  // Slightly reduced max tilt (10deg) for a more professional, "less aggressive" feel
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
  
  // 3. MULTI-PLANAR DEPTH: Reactive Parallax
  // Refined offsets for Tiered Motion to ensure the "3DS effect" remains clear but elegant
  const tier1X = useTransform(smoothX, [0, 1], [20, -20]);
  const tier1Y = useTransform(smoothY, [0, 1], [20, -20]);
  
  const tier2X = useTransform(smoothX, [0, 1], [10, -10]);
  const tier2Y = useTransform(smoothY, [0, 1], [10, -10]);
  
  const tier3X = useTransform(smoothX, [0, 1], [5, -5]);
  const tier3Y = useTransform(smoothY, [0, 1], [5, -5]);

  // Subtle organic breathing (micro-interaction)
  const idleBreathe = useTransform(time, t => 1 + Math.sin((t + index * 500) / 4000) * 0.003);
  
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${idleBreathe})`;

  // 4. Light: Specular Tracking
  const lightX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent | React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize mouse position (-1 to 1 for more natural calculation)
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    // Return to neutral with a soft bounce
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[540px] cursor-none group"
      style={{ perspective: 2000 }} // Increased perspective for smoother depth perception
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          transform,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        className={`relative w-full h-full p-10 lg:p-12 rounded-[48px] border border-white/10 flex flex-col overflow-visible ${theme.container} ${theme.shadow} transition-shadow duration-700`}
      >
        {/* BASE GLASS LAYER */}
        <div 
          className={`absolute inset-0 rounded-[48px] pointer-events-none ${theme.bg}`}
          style={{ transform: 'translateZ(0px)' }}
        />

        {/* SPECULAR LIGHTING - DYNAMIC CUSHION */}
        <motion.div 
          style={{ 
            background: useTransform(
              [lightX, lightY], 
              ([lx, ly]) => isCTA 
                ? `radial-gradient(800px circle at ${lx} ${ly}, rgba(0,0,0,0.06), transparent 75%)`
                : `radial-gradient(1000px circle at ${lx} ${ly}, rgba(255,255,255,0.18), transparent 60%)`
            ),
            transform: 'translateZ(10px)',
            mixBlendMode: isCTA ? 'multiply' : 'overlay'
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[48px]"
        />

        {/* PARALLAX CONTENT STACK */}
        
        {/* TIER 1: ICON & NUMBER (MAX MOTION) */}
        <motion.div 
          style={{ 
            x: tier1X, 
            y: tier1Y, 
            translateZ: 100, // Elevated for deeper 3DS effect
            transformStyle: 'preserve-3d'
          }}
          className="flex justify-between items-start relative z-10 h-24 lg:h-32 mb-6 pointer-events-none"
        >
          {isCTA ? (
            <span className="text-nano font-mono font-bold text-black/25 tracking-widest-2x uppercase pt-2">
              End_Sequence
            </span>
          ) : (
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-1000 shadow-2xl">
              <span className="material-icons-outlined text-3xl lg:text-4xl text-white group-hover:text-black transition-colors duration-700 select-none">
                {item?.icon}
              </span>
            </div>
          )}
          <span className={`text-nano font-mono font-bold tracking-widest-2x uppercase pt-2 transition-colors duration-700 ${isCTA ? 'text-black/15' : 'text-white/40 group-hover:text-white/80'}`}>
            {isCTA ? '///' : item?.number}
          </span>
        </motion.div>

        {/* TIER 2: TITLE (MEDIUM MOTION) */}
        <motion.div 
          style={{ 
            x: tier2X, 
            y: tier2Y, 
            translateZ: 60,
            transformStyle: 'preserve-3d'
          }}
          className={`relative z-10 flex-grow flex flex-col pointer-events-none ${isCTA ? 'items-center text-center' : ''}`}
        >
          <div className="min-h-[2.5em] lg:min-h-[2.2em] mb-6 w-full">
            <h3 className="text-card-title-fluid font-display font-medium leading-[1.1] tracking-tight">
              {isCTA ? ctaTitle : item?.title}
            </h3>
          </div>
          
          {/* TIER 3: DESCRIPTION (LOW MOTION) */}
          <motion.div style={{ x: tier3X, y: tier3Y, translateZ: 30 }}>
            <p className={`text-body-fluid leading-relaxed transition-colors duration-1000 max-w-full font-light ${theme.subtext} ${isCTA ? 'px-4 opacity-80' : 'group-hover:text-white/90'}`}>
              {isCTA ? ctaDesc : item?.description}
            </p>
          </motion.div>
        </motion.div>

        {/* ACTION LAYER (MAX DEPTH) */}
        {isCTA && (
          <motion.div 
            style={{ translateZ: 140, x: tier1X, y: tier1Y }}
            className="relative z-10 pb-6 flex justify-center w-full"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-5 bg-black text-white px-12 py-6 rounded-full transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.3)] group/btn cursor-pointer pointer-events-auto"
            >
              <span className="uppercase tracking-widest-2x text-label-fluid font-bold">{ctaBtn}</span>
              <motion.span 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="material-icons-outlined text-xl"
              >
                bolt
              </motion.span>
            </motion.div>
          </motion.div>
        )}

        {/* KINETIC BORDER GLOW */}
        {!isCTA && (
          <motion.div 
            className="absolute inset-0 border-[2px] border-white/30 rounded-[48px] pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              transform: 'translateZ(1px)',
              maskImage: useTransform(
                [lightX, lightY],
                ([lx, ly]) => `radial-gradient(500px circle at ${lx} ${ly}, black, transparent 90%)`
              ),
              WebkitMaskImage: useTransform(
                [lightX, lightY],
                ([lx, ly]) => `radial-gradient(500px circle at ${lx} ${ly}, black, transparent 90%)`
              )
            }}
          />
        )}
      </motion.div>
    </div>
  );
};