
/* 
 * ARCHITECTURAL RULE: This component is a "Black Box". 
 * SYSTEM_CORE_V6_KINETIC_BOOST: +30% Motion Amplitude & Spatial Leverage.
 * Maximizes 3D parallax and rotational presence.
 */

import React, { useRef, useMemo, useId } from 'react';
import { motion, useSpring, useTransform, useTime, useMotionValue, MotionValue, useInView, useMotionTemplate, useVelocity } from 'motion/react';
import { useKinetic, useRelativeMotion } from '../context/KineticContext.tsx';

// --- SUB-COMPONENT: TechnicalFilters ---
const TechnicalFilters = () => (
  <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
    <defs>
      <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="glow" />
        <feBlend in="SourceGraphic" in2="glow" mode="screen" />
      </filter>
    </defs>
  </svg>
);

// --- SUB-COMPONENT: SpatialNodes ---
const SpatialNodes = React.memo(({ relX, relY }: { relX: MotionValue<number>, relY: MotionValue<number> }) => {
  const nodes = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    z: Math.random() * -800 - 100,
    opacity: Math.random() * 0.5 + 0.2,
    scale: Math.random() * 0.5 + 0.5
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          style={{
            top: node.top,
            left: node.left,
            translateZ: node.z,
            opacity: node.opacity,
            scale: node.scale,
            // KINETIC_BOOST: Dividers reduced to increase motion range by 30%
            x: useTransform(relX, [0, 1], [node.z / 6.2, -node.z / 6.2]),
            y: useTransform(relY, [0, 1], [node.z / 9.2, -node.z / 9.2]),
          } as any}
          className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      ))}
    </div>
  );
});

// --- SUB-COMPONENT: SentinelRing ---
const SentinelRing = React.memo(({ 
  index, 
  relX, 
  relY, 
  isMobile,
  totalRings,
  time
}: { 
  index: number; 
  relX: MotionValue<number>; 
  relY: MotionValue<number>;
  isMobile: boolean;
  totalRings: number;
  time: MotionValue<number>;
}) => {
  const baseDepth = isMobile ? 8 : 16; 
  const baseSize = isMobile ? 80 : 120;
  const sizeStep = isMobile ? 10 : 14;
  const zDepth = index * -baseDepth;

  const springConfig = useMemo(() => ({ 
    stiffness: 160 - (index * 2.5), 
    damping: 30 + (index * 0.5),   
    mass: 0.8 + (index * 0.05),    
  }), [index]);

  const ringSpringX = useSpring(relX, springConfig);
  const ringSpringY = useSpring(relY, springConfig);
  
  // KINETIC_BOOST: driftMultiplier increased from 10 to 13 (+30%)
  const driftMultiplier = index * 13;
  const tx = useTransform(ringSpringX, [0, 1], [-driftMultiplier, driftMultiplier]);
  const ty = useTransform(ringSpringY, [0, 1], [-driftMultiplier * 0.4, driftMultiplier * 0.4]);

  // KINETIC_BOOST: wobble factors increased by 30%
  const wobbleX = useTransform(time, (t) => Math.sin(t / (2000 + index * 100)) * (1.95 + index * 0.65));
  const wobbleY = useTransform(time, (t) => Math.cos(t / (2200 + index * 100)) * (1.95 + index * 0.65));

  const opacity = useTransform(useMotionValue(index), (i) => 
    0.7 - (i / totalRings) * 0.5
  );

  return (
    <motion.div
      style={{
        width: `${baseSize + index * sizeStep}px`,
        height: `${baseSize + index * sizeStep}px`,
        x: useMotionTemplate`${tx}px`,
        y: useMotionTemplate`${ty}px`,
        translateX: wobbleX,
        translateY: wobbleY,
        translateZ: zDepth,
        opacity,
        transformStyle: "preserve-3d",
      } as any}
      className="absolute flex items-center justify-center will-change-transform"
    >
      <div className="w-full h-full rounded-full border-[1.5px] border-white/40 relative" />
    </motion.div>
  );
});

// --- SUB-COMPONENT: SentinelAssembly ---
const SentinelAssembly: React.FC<{
  relX: MotionValue<number>;
  relY: MotionValue<number>;
  isMobile: boolean;
  time: MotionValue<number>;
}> = ({ relX, relY, isMobile, time }) => {
  const ringCount = isMobile ? 14 : 26; 
  const rings = useMemo(() => Array.from({ length: ringCount }), [ringCount]);

  // KINETIC_BOOST: Rotation range increased from ±25 to ±32.5 (+30%)
  const rotateX = useTransform(relY, [0, 1], [32.5, -32.5]);
  const rotateY = useTransform(relX, [0, 1], [-32.5, 32.5]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  return (
    <motion.div 
      style={{ 
        transformStyle: "preserve-3d",
        rotateX: springRotateX,
        rotateY: springRotateY,
        filter: "url(#core-glow)"
      } as any} 
      className="relative w-full h-full flex items-center justify-center"
    >
      <SpatialNodes relX={relX} relY={relY} />
      
      {rings.map((_, i) => (
        <SentinelRing 
          key={`ring-${i}`} 
          index={i} 
          relX={relX} 
          relY={relY} 
          isMobile={isMobile}
          totalRings={ringCount}
          time={time}
        />
      ))}
      
      {/* Central Singularity */}
      <motion.div 
        style={{ 
          translateZ: isMobile ? 40 : 120, 
          // KINETIC_BOOST: Singularity offset increased by 30%
          x: useTransform(relX, [0, 1], [-26, 26]),
          y: useTransform(relY, [0, 1], [-19.5, 19.5]),
          transformStyle: "preserve-3d"
        } as any} 
        className="relative z-50"
      >
        <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.6)]">
           <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-white border border-black/5 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-3 h-3 rounded-full bg-black" 
              />
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- EXPORTED COMPONENT: SentinelCore ---
export const SentinelCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardId = useId();
  const isInView = useInView(containerRef, { margin: "200px" });
  const { isMobile, velX, velY } = useKinetic();
  const time = useTime();
  const { relX, relY } = useRelativeMotion(cardId, containerRef);

  const speed = useTransform([velX, velY], ([vx, vy]) => 
    Math.min(100, Math.sqrt(Math.pow(vx as number, 2) + Math.pow(vy as number, 2)) / 40)
  );

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative group flex items-center justify-center perspective-[3000px] overflow-hidden bg-[#010101] border border-white/10 rounded-[40px] shadow-2xl"
    >
      <TechnicalFilters />
      
      {/* STATIC DEEP GRID */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
         <div className="w-full h-full" style={{ 
           backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
           backgroundSize: '100px 100px'
         }} />
      </div>

      {/* KINETIC PERSPECTIVE GRID */}
      <motion.div 
        style={{
          translateZ: -150,
          // KINETIC_BOOST: Environment rotation increased from ±6 to ±7.8 (+30%)
          rotateX: useTransform(relY, [0, 1], [7.8, -7.8]),
          rotateY: useTransform(relX, [0, 1], [-7.8, 7.8]),
          opacity: 0.25,
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 90%)'
        } as any}
        className="absolute inset-[-30%] pointer-events-none"
      >
         <div className="w-full h-full" style={{ 
           backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }} />
         
         <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[3px] bg-white/60 blur-[4px] shadow-[0_0_20px_rgba(255,255,255,0.4)] mix-blend-screen"
         />
      </motion.div>

      {isInView && (
        <SentinelAssembly 
          relX={relX}
          relY={relY}
          isMobile={isMobile}
          time={time}
        />
      )}
      
      {/* HUD Telemetry */}
      <div className="absolute inset-0 z-[60] p-8 lg:p-12 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest-3x text-white">SYSTEM_CORE_V6</h4>
            <p className="text-[6px] font-mono text-white/30 uppercase tracking-widest pl-0.5">KINETIC_AMPLITUDE_MAX</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-[8px] font-mono text-white/40 text-right uppercase tracking-widest tabular-nums font-bold">Z_BUFFER: BOOSTED</div>
             <motion.div 
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: 1, repeat: Infinity }}
               className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" 
             />
          </div>
        </div>
        
        <div className="w-full flex justify-between items-end">
          <div className="bg-white/[0.04] border border-white/10 px-8 py-4 rounded-[20px] backdrop-blur-xl">
            <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest block mb-1">DEPLOY_ID</span>
            <h3 className="text-white font-mono text-[10px] font-black tracking-widest-2x uppercase leading-none">SENTINEL_26_KINETIC</h3>
          </div>
          
          <div className="flex gap-1.5 items-end h-10 pr-4 opacity-40">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ height: [2, Math.random() * 25 + 2, 2] }} 
                style={{ 
                   height: useTransform(speed, [0, 100], [2, 40])
                } as any}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.5 + Math.random(), 
                  ease: "easeInOut",
                  delay: i * 0.02 
                }} 
                className="w-[1.5px] bg-white" 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};
