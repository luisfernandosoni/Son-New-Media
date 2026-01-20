
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useMotionValue, MotionValue, useVelocity, useTransform, useSpring } from 'motion/react';
import { useMobileMagic } from '../hooks/useMobileMagic';

interface RectCache {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface KineticContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  velX: MotionValue<number>;
  velY: MotionValue<number>;
  isMobile: boolean;
  // NEW: Centralized geometry registry
  registerElement: (id: string, ref: React.RefObject<HTMLElement | null>) => void;
  getRect: (id: string) => RectCache | null;
}

const KineticContext = createContext<KineticContextType | undefined>(undefined);

export const KineticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, virtualX, virtualY, requestGyroAccess } = useMobileMagic();
  
  const desktopX = useMotionValue(0);
  const desktopY = useMotionValue(0);

  const gyroSpringConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothVirtualX = useSpring(virtualX, gyroSpringConfig);
  const smoothVirtualY = useSpring(virtualY, gyroSpringConfig);

  // Quantization: Rounding to 3 decimals to reduce GPU draw call frequency
  const finalX = useTransform(isMobile ? smoothVirtualX : desktopX, (v) => Math.round(v * 1000) / 1000);
  const finalY = useTransform(isMobile ? smoothVirtualY : desktopY, (v) => Math.round(v * 1000) / 1000);

  const velX = useVelocity(finalX);
  const velY = useVelocity(finalY);

  // --- REFLOW-ZERO MEASUREMENT ENGINE ---
  const rects = useRef<Map<string, RectCache>>(new Map());
  const elements = useRef<Map<string, React.RefObject<HTMLElement | null>>>(new Map());

  const updateRects = () => {
    elements.current.forEach((ref, id) => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        // We store absolute positions relative to the scroll for stability
        rects.current.set(id, {
          left: r.left + window.scrollX,
          top: r.top + window.scrollY,
          width: r.width,
          height: r.height
        });
      }
    });
  };

  useEffect(() => {
    // 1. Inputs
    if (!isMobile) {
      const handlePointerMove = (e: PointerEvent) => {
        desktopX.set(e.clientX);
        desktopY.set(e.clientY);
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      return () => window.removeEventListener('pointermove', handlePointerMove);
    } else {
      const unlock = () => { requestGyroAccess(); window.removeEventListener('touchstart', unlock); };
      window.addEventListener('touchstart', unlock);
    }
  }, [isMobile, desktopX, desktopY, requestGyroAccess]);

  useEffect(() => {
    // 2. Spatial Observer (Centralized)
    const observer = new ResizeObserver(updateRects);
    window.addEventListener('scroll', updateRects, { passive: true });
    window.addEventListener('resize', updateRects, { passive: true });
    
    // Initial measure
    const timer = setTimeout(updateRects, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateRects);
      window.removeEventListener('resize', updateRects);
      clearTimeout(timer);
    };
  }, []);

  const value = useMemo(() => ({
    mouseX: finalX,
    mouseY: finalY,
    velX,
    velY,
    isMobile,
    registerElement: (id: string, ref: React.RefObject<HTMLElement | null>) => {
      elements.current.set(id, ref);
      updateRects();
    },
    getRect: (id: string) => rects.current.get(id) || null
  }), [finalX, finalY, velX, velY, isMobile]);

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

// --- REFLOW-ZERO RELATIVE MOTION HOOK ---
export const useRelativeMotion = (id: string, ref: React.RefObject<HTMLElement | null>) => {
  const { mouseX, mouseY, getRect, registerElement } = useKinetic();

  useEffect(() => {
    registerElement(id, ref);
  }, [id, ref, registerElement]);

  const relX = useTransform([mouseX], ([x]: any[]) => {
    const rect = getRect(id);
    if (!rect) return 0.5;
    // Account for current scroll to calculate relative viewport position
    const actualX = (x as number) - (rect.left - window.scrollX);
    const val = actualX / rect.width;
    return Math.max(0, Math.min(1, val));
  });

  const relY = useTransform([mouseY], ([y]: any[]) => {
    const rect = getRect(id);
    if (!rect) return 0.5;
    const actualY = (y as number) - (rect.top - window.scrollY);
    const val = actualY / rect.height;
    return Math.max(0, Math.min(1, val));
  });

  const isOver = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    const rect = getRect(id);
    if (!rect) return 0;
    const l = rect.left - window.scrollX;
    const t = rect.top - window.scrollY;
    const over = (
      x >= l &&
      x <= l + rect.width &&
      y >= t &&
      y <= t + rect.height
    );
    return (over ? 1 : 0) as number;
  });

  return { relX, relY, isOver };
};
