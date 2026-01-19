
import React from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, useAnimationFrame } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);

  const speed = useTransform([xVelocity, yVelocity], ([vx, vy]) => 
    Math.sqrt(Math.pow((vx as number) || 0, 2) + Math.pow((vy as number) || 0, 2))
  );

  const stretch = useTransform(speed, [0, 3000], [1, 1.8]);
  const squash = useTransform(speed, [0, 3000], [1, 0.6]);
  
  const angle = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    const vX = (vx as number) || 0;
    const vY = (vy as number) || 0;
    return Math.atan2(vY, vX) * (180 / Math.PI);
  });

  const springConfig = { damping: 35, stiffness: 400, mass: 0.3 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useAnimationFrame(() => {
    const root = document.documentElement;
    const mxVal = root.style.getPropertyValue('--mouse-x');
    const myVal = root.style.getPropertyValue('--mouse-y');
    
    if (mxVal && myVal) {
      const mx = parseFloat(mxVal);
      const my = parseFloat(myVal);
      if (!isNaN(mx) && !isNaN(my)) {
        x.set(mx);
        y.set(my);
      }
    }
  });

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      <motion.div
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--accent)',
        }}
        className="w-1.5 h-1.5 rounded-full shadow-sm"
      />

      <motion.div
        id="custom-cursor-aura"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: angle,
          scaleX: stretch,
          scaleY: squash,
          borderColor: 'var(--accent)',
          borderWidth: 'var(--cursor-aura-weight)',
        }}
        className="w-10 h-10 border rounded-full backdrop-blur-[1.5px] opacity-80 transition-[transform,background,border-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
    </div>
  );
};
