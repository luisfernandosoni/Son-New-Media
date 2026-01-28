import React, { Suspense, lazy } from 'react'; //

import { LanguageProvider } from './context/LanguageContext.tsx';
import { KineticProvider } from './context/KineticContext.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';

// #MCRD OPTIMIZATION: Code Splitting Táctico
// Diferimos la carga de componentes pesados que no son visibles al inicio.
// Esto reduce drásticamente el JS inicial necesario para arrancar.
const Services = lazy(() => import('./components/Services.tsx'));
const Work = lazy(() => import('./components/Work.tsx'));
const About = lazy(() => import('./components/About.tsx'));
const TransmissionsPreview = lazy(() => import('./components/TransmissionsPreview.tsx'));
const DesignPhilosophy = lazy(() => import('./components/DesignPhilosophy.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));

// Componente de carga ultraligero (invisible o spinner minimalista)
const SectionLoader = () => <div className="w-full h-20 bg-transparent" />;

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <KineticProvider>
        <div className="relative w-full min-h-screen bg-background text-text selection:bg-accent selection:text-background transition-colors duration-500 overflow-x-hidden">
          <CustomCursor />
          
          {/* CRÍTICO: Navbar y Hero se mantienen síncronos para LCP instantáneo */}
          <Navbar />
          
          <main>
            <Hero />
            
            {/* El resto se carga en paralelo mientras el usuario admira el Hero */}
            <Suspense fallback={<SectionLoader />}>
              <Services />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Work />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>

            {/* Transmissions Preview - CMS Integration */}
            <Suspense fallback={<SectionLoader />}>
              <TransmissionsPreview />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <DesignPhilosophy />
            </Suspense>
          </main>
          
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </div>
      </KineticProvider>
    </LanguageProvider>
  );
};

export default App;