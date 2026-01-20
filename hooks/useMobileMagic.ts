import { useEffect, useState } from 'react';
import { useMotionValue } from 'motion/react';

export const useMobileMagic = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [gyroAvailable, setGyroAvailable] = useState(false);

  // El "Mouse Fantasma"
  const virtualX = useMotionValue(0);
  const virtualY = useMotionValue(0);

  useEffect(() => {
    // 1. Detección de entorno táctil
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouch);
      
      // Fallback inicial: Cursor en el centro absoluto de la pantalla
      if (isTouch) {
        virtualX.set(window.innerWidth / 2);
        virtualY.set(window.innerHeight / 2);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 2. Lógica del Giroscopio (Sensor Fusion)
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Si recibimos ceros absolutos, el sensor no está listo o no existe
      if (event.beta === null || event.gamma === null) return;
      
      setGyroAvailable(true);

      // Calibración de Sensibilidad (Grados máximos de inclinación)
      const MAX_TILT = 15; 
      
      // Eje X (Gamma): De -15 a 15 grados -> 0 a Ancho Pantalla
      const gamma = Math.min(Math.max(event.gamma, -MAX_TILT), MAX_TILT);
      const normalizedX = ((gamma + MAX_TILT) / (MAX_TILT * 2)) * window.innerWidth;

      // Eje Y (Beta): De 30 a 60 grados (posición natural de mano) -> 0 a Alto Pantalla
      const baseBeta = 45; // Ángulo natural de sostener el cel
      const beta = Math.min(Math.max(event.beta - baseBeta, -MAX_TILT), MAX_TILT);
      const normalizedY = ((beta + MAX_TILT) / (MAX_TILT * 2)) * window.innerHeight;

      // Inyectamos coordenadas crudas (el Spring del Contexto las suavizará)
      virtualX.set(normalizedX);
      virtualY.set(normalizedY);
    };

    if (isMobile) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile, virtualX, virtualY]);

  // 3. Trigger para iOS 13+ (Requiere toque del usuario)
  const requestGyroAccess = async () => {
    // @ts-ignore - Propiedad específica de WebKit
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setGyroAvailable(true);
        }
      } catch (e) {
        console.log("Gyroscope permission denied/error", e);
      }
    }
  };

  return { isMobile, gyroAvailable, virtualX, virtualY, requestGyroAccess };
};