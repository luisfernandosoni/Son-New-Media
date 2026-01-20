
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useMotionValue, MotionValue, useVelocity, useTransform } from 'framer-motion';

interface KineticContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  velX: MotionValue<number>;
  velY: MotionValue<number>;
}

const KineticContext = createContext<KineticContextType | undefined>(undefined);

export const KineticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  const value = useMemo(() => ({
    mouseX,
    mouseY,
    velX,
    velY
  }), [mouseX, mouseY, velX, velY]);

  return (
    <KineticContext.Provider value={value}>
      {children}
    </KineticContext.Provider>
  );
};

export const useKinetic = () => {
  const context = useContext(KineticContext);
  if (!context) throw new Error('useKinetic must be used within a KineticProvider');
  return context;
};

/**
 * High-Performance Relative Motion Hook
 * Transforms global pointer coordinates into 0-1 normalized values for a specific element.
 */
export const useRelativeMotion = (ref: React.RefObject<HTMLElement | null>) => {
  const { mouseX, mouseY } = useKinetic();

  const relX = useTransform(mouseX, (x) => {
    if (!ref.current) return 0.5;
    const rect = ref.current.getBoundingClientRect();
    const val = (x - rect.left) / rect.width;
    return Math.max(0, Math.min(1, val));
  });

  const relY = useTransform(mouseY, (y) => {
    if (!ref.current) return 0.5;
    const rect = ref.current.getBoundingClientRect();
    const val = (y - rect.top) / rect.height;
    return Math.max(0, Math.min(1, val));
  });

  // Determines if the mouse is actually over the element
  const isOver = useTransform([mouseX, mouseY], ([x, y]) => {
    if (!ref.current) return false;
    const rect = ref.current.getBoundingClientRect();
    return (
      (x as number) >= rect.left &&
      (x as number) <= rect.right &&
      (y as number) >= rect.top &&
      (y as number) <= rect.bottom
    );
  });

  return { relX, relY, isOver };
};
