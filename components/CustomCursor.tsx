
import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useKinetic } from '../context/KineticContext.tsx';

export const CustomCursor: React.FC = () => {
  const { mouseX, mouseY, velX, velY } = useKinetic();

  // Optimized Speed Calculation
  const speed = useTransform([velX, velY], ([vx, vy]) => 
    Math.sqrt(Math.pow((vx as number) || 0, 2) + Math.pow((vy as number) || 0, 2))
  );

  const stretch = useTransform(speed, [0, 3000], [1, 1.8]);
  const squash = useTransform(speed, [0, 3000], [1, 0.6]);
  
  const angle = useTransform([velX, velY], ([vx, vy]) => {
    const vX = (vx as number) || 0;
    const vY = (vy as number) || 0;
    return Math.atan2(vY, vX) * (180 / Math.PI);
  });

  const springConfig = { damping: 40, stiffness: 450, mass: 0.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      {/* Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--accent)',
        }}
        className="w-1.5 h-1.5 rounded-full shadow-sm"
      />

      {/* Kinetic Aura */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: angle,
          scaleX: stretch,
          scaleY: squash,
          borderColor: 'var(--accent)',
        }}
        className="w-10 h-10 border-[1px] rounded-full backdrop-blur-[1.5px] opacity-60 transition-[background,border-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
    </div>
  );
};
