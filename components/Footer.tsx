import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Logo } from './Logo.tsx';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="footer bg-background pt-48 lg:pt-64 pb-16 border-t border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-32 mb-48">
          <div className="max-w-4xl">
            <h2 className="font-display text-h2-fluid font-medium text-text mb-20">
              {t('footer.cta')}
            </h2>
            <a 
              href="mailto:hello@soninewmedia.com" 
              className="inline-flex items-center text-h3-fluid font-light border-b-2 border-text/15 pb-3 hover:text-text hover:border-text transition-all text-secondary"
            >
              hello@soninewmedia.com
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-x-32 gap-y-16 w-full lg:w-auto">
            <div>
              <h4 className="font-bold text-label-fluid uppercase tracking-widest-2x text-secondary mb-10">Sitemap</h4>
              <ul className="space-y-6 text-body-fluid text-secondary/80">
                {['services', 'work', 'about'].map(item => (
                  <li key={item}>
                    <a href={`#${item}`} className="hover:text-text transition-colors capitalize">{t(`nav.${item}`)}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-label-fluid uppercase tracking-widest-2x text-secondary mb-10">Socials</h4>
              <ul className="space-y-6 text-body-fluid text-secondary/80">
                {['Instagram', 'LinkedIn', 'Twitter (X)'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-text transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-border text-nano text-secondary/50">
          <div className="flex items-center gap-8 mb-8 md:mb-0">
            <Logo size={32} className="opacity-40 grayscale brightness-200 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
            <span className="font-medium tracking-wide">© 2026 Soní New Media.</span>
          </div>
          <div className="flex gap-12 font-medium">
            <a href="#" className="hover:text-text transition-colors tracking-widest uppercase">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-text transition-colors tracking-widest uppercase">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;