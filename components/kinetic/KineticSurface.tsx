
import React, { useRef, useMemo, useId } from 'react';
import { motion, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useRelativeMotion } from '../../context/KineticContext.tsx';

interface KineticSurfaceProps {
  children: React.ReactNode;
  strength?: number;
  shineIntensity?: number;
  className?: string;
  id?: string;
}

/**
 * KINETIC SURFACE V1 (2026)
 * A declarative wrapper for high-fidelity interactive surfaces.
 * Centralizes 3D Tilt and Specular Highlight logic.
 */
export const KineticSurface: React.FC<KineticSurfaceProps> = ({ 
  children, 
  strength = 10, 
  shineIntensity = 0.15,
  className = "",
  id: providedId 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalId = useId();
  const cardId = providedId || internalId;
  const { relX, relY, isOver } = useRelativeMotion(cardId, containerRef);

  const springConfig = useMemo(() => ({ 
    stiffness: 180, 
    damping: 35, 
    mass: 1.2 
  }), []);

  // Centralized Smoothness
  const smoothX = useSpring(useTransform([isOver, relX], ([over, rX]: any[]) => (over === 1 ? rX : 0.5)), springConfig);
  const smoothY = useSpring(useTransform([isOver, relY], ([over, rY]: any[]) => (over === 1 ? rY : 0.5)), springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [strength, -strength]);
  const rotateY = useTransform(smoothX, [0, 1], [-strength, strength]);
  
  const mouseXPercent = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const mouseYPercent = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={containerRef}
      style={{ 
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
        "--mx": mouseXPercent,
        "--my": mouseYPercent
      } as any}
      className={`relative group will-change-transform ${className}`}
    >
      {/* Lumina Specular Layer */}
      <motion.div 
        style={{ 
          opacity: useTransform(isOver, (over: number) => over === 1 ? 1 : 0),
          background: useMotionTemplate`radial-gradient(1000px circle at var(--mx) var(--my), rgba(255,255,255,${shineIntensity}), transparent 60%)`,
          transform: 'translateZ(1px)',
        } as any}
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 rounded-[inherit]"
      />

      {/* Context Provider for Child Layers */}
      <KineticSurfaceContext.Provider value={{ smoothX, smoothY }}>
        {children}
      </KineticSurfaceContext.Provider>
    </motion.div>
  );
};

// Internal Context to share mouse state with KineticLayer
export const KineticSurfaceContext = React.createContext<{
  smoothX: any;
  smoothY: any;
} | null>(null);
