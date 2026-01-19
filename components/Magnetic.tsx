
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ 
  children, 
  strength = 0.35, 
  radius = 180,
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useAnimationFrame(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const root = document.documentElement;
    const mxVal = root.style.getPropertyValue('--mouse-x');
    const myVal = root.style.getPropertyValue('--mouse-y');

    if (!mxVal || !myVal) return;
    
    const mx = parseFloat(mxVal);
    const my = parseFloat(myVal);

    if (isNaN(mx) || isNaN(my)) return;

    const deltaX = mx - centerX;
    const deltaY = my - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < radius) {
      const power = (1 - distance / radius);
      x.set(deltaX * strength * power);
      y.set(deltaY * strength * power);
    } else {
      x.set(0);
      y.set(0);
    }
  });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
