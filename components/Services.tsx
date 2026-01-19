
import React, { useRef } from 'react';
import { motion, useTime, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ServiceItem } from '../types.ts';

const BreathableCard: React.FC<{ item: ServiceItem; index: number }> = ({ item, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const time = useTime();

  // 1. Normalized Motion Values
  const mouseX = useMotionValue(0.5); 
  const mouseY = useMotionValue(0.5); 

  // Physics-tuned springs for high-end material feel
  const springConfig = { stiffness: 120, damping: 20, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2. Continuous Idle "Breathing"
  const idleBreathe = useTransform(time, t => 1 + Math.sin((t + index * 500) / 3000) * 0.005);

  // 3. Kinetic Transforms (±12 Degrees Arc)
  const rotateX = useTransform(smoothY, [0, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12]);
  
  // Specular Gradients Positioning
  const lightX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  // Deep Parallax for Content
  const iconX = useTransform(smoothX, [0, 1], [-20, 20]);
  const iconY = useTransform(smoothY, [0, 1], [-20, 20]);
  const textX = useTransform(smoothX, [0, 1], [-10, 10]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Robust coordinate mapping relative to a STATIC wrapper
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(px);
    mouseY.set(py);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[460px] cursor-default"
      style={{ perspective: 1500 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          rotateX, 
          rotateY, 
          scale: idleBreathe,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
        className="group relative w-full h-full p-10 rounded-[40px] bg-white/[0.04] border border-white/10 flex flex-col justify-between overflow-hidden backdrop-blur-2xl transition-colors duration-700 hover:border-white/30"
      >
        {/* LIGHT LAYER 1: Broad Luminous Beam */}
        <motion.div 
          style={{ 
            background: useTransform(
              [lightX, lightY], 
              ([lx, ly]) => `radial-gradient(1000px circle at ${lx} ${ly}, rgba(255,255,255,0.22), transparent 50%)`
            ),
            mixBlendMode: 'overlay'
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* LIGHT LAYER 2: Sharp Specular Glint */}
        <motion.div 
          style={{ 
            background: useTransform(
              [lightX, lightY], 
              ([lx, ly]) => `radial-gradient(350px circle at ${lx} ${ly}, rgba(255,255,255,0.4), transparent 60%)`
            ),
            mixBlendMode: 'soft-light'
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* CONTENT SECTION */}
        <div className="flex justify-between items-start relative z-10" style={{ transform: 'translateZ(40px)' }}>
          <motion.div 
            style={{ x: iconX, y: iconY }}
            className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-700 shadow-2xl"
          >
            <span 
              className="material-icons-outlined text-3xl text-white group-hover:text-black transition-colors duration-500 select-none"
              style={{ fontFamily: "'Material Icons Outlined'", fontStyle: 'normal' }}
            >
              {item.icon}
            </span>
          </motion.div>
          <span className="text-[10px] font-mono font-bold text-white/20 tracking-[0.4em] group-hover:text-white/60 transition-colors uppercase">
            {item.number}
          </span>
        </div>

        <div className="relative z-10 mt-10" style={{ transform: 'translateZ(20px)' }}>
          <motion.h3 
            style={{ x: textX }}
            className="text-2xl font-display font-medium mb-4 text-white tracking-tight leading-tight"
          >
            {item.title}
          </motion.h3>
          <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-700 max-w-[95%] font-light">
            {item.description}
          </p>
        </div>

        {/* Footer with reactive border glow */}
        <div className="relative z-10 pt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-700" style={{ transform: 'translateZ(30px)' }}>
          <div className="h-[1px] w-12 bg-white/40" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-bold">Protocol_v2.6.A</span>
        </div>

        {/* Kinetic Border Light Sweep */}
        <motion.div 
          className="absolute inset-0 border-[1.5px] border-white/40 rounded-[40px] pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            maskImage: useTransform(
              [lightX, lightY],
              ([lx, ly]) => `radial-gradient(500px circle at ${lx} ${ly}, black, transparent 75%)`
            ),
            WebkitMaskImage: useTransform(
              [lightX, lightY],
              ([lx, ly]) => `radial-gradient(500px circle at ${lx} ${ly}, black, transparent 75%)`
            )
          }}
        />
      </motion.div>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const services: ServiceItem[] = t('services.items') || [];

  return (
    <section id="services" className="py-40 bg-background relative transition-colors duration-500 overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-0 right-0 w-[1400px] h-[1400px] bg-white/[0.015] blur-[220px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.05]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/50">
                {t('services.tag')}
              </span>
            </motion.div>
            <h2 className="font-display text-5xl md:text-8xl font-medium tracking-tighter text-white">
              {t('services.title')}
            </h2>
          </div>
          <p className="text-white/30 max-w-sm mt-12 md:mt-0 text-left leading-relaxed text-lg font-light">
            {t('services.desc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <BreathableCard key={service.id} item={service} index={index} />
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group p-10 rounded-[40px] bg-white text-black border border-white hover:shadow-[0_60px_120px_rgba(255,255,255,0.15)] transition-all duration-700 cursor-pointer min-h-[460px] flex flex-col justify-center items-center text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h3 className="text-4xl font-display font-medium tracking-tight leading-none">{t('services.custom')}</h3>
                <p className="opacity-60 text-sm font-light px-10">{t('services.customDesc')}</p>
              </div>
              
              <div className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full group-hover:scale-105 group-active:scale-95 transition-all duration-500 shadow-2xl">
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold">{t('services.cta')}</span>
                <span className="material-icons-outlined text-sm" style={{ fontFamily: "'Material Icons Outlined'" }}>bolt</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;