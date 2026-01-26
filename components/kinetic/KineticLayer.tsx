
import React, { useContext } from 'react';
import { motion, useTransform } from 'motion/react';
import { KineticSurfaceContext } from './KineticSurface.tsx';

interface KineticLayerProps {
  children: React.ReactNode;
  depth: number; // Positive for "towards user", negative for "away"
  className?: string;
}

/**
 * KINETIC LAYER V1 (2026)
 * Automatically calculates Parallax offsets based on parent Surface state.
 */
export const KineticLayer: React.FC<KineticLayerProps> = ({ children, depth, className = "" }) => {
  const context = useContext(KineticSurfaceContext);
  
  if (!context) {
    console.warn("KineticLayer must be used within a KineticSurface");
    return <>{children}</>;
  }

  const { smoothX, smoothY } = context;

  // Parallax Calculation: Higher depth = more movement
  const x = useTransform(smoothX, [0, 1], [depth * 0.2, -depth * 0.2]);
  const y = useTransform(smoothY, [0, 1], [depth * 0.2, -depth * 0.2]);

  return (
    <motion.div
      style={{ 
        x, 
        y, 
        translateZ: depth,
        transformStyle: 'preserve-3d'
      } as any}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};
