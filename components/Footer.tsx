import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tighter mb-10 text-white">
              Ready to automate<br />the future?
            </h2>
            <a 
              href="mailto:hello@soninewmedia.com" 
              className="inline-flex items-center text-xl md:text-2xl font-light border-b border-white/30 pb-1 hover:text-gray-300 hover:border-white transition-all text-white"
            >
              hello@soninewmedia.com
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-x-20 gap-y-10 w-full lg:w-auto">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-600 mb-6">Sitemap</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Home', 'Services', 'Work', 'About'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-600 mb-6">Socials</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Instagram', 'LinkedIn', 'Twitter (X)'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy5c9p5Ei-crkwZwkIk3maQGiOg2p3xjNocNa47rWjgWAlwUFxV4uaZP0HDUDpppu_wpuEzhww5ypEAqt6uM8qHs6vvrBBEq-6iSovqhQxoRSOknUByRgQwApeyKQIJoH8cBkl6Bm3OAnpcCNCjEEzdC5Nj84bx1GNF-nivrPs_zlHfC5bR6TX_CV2hZkjfGFNP4lcbphhxJ8dnm673n-XvI-nImnFMGuAAZPZkXqKRmMwrDCIqOxk3N_afw3IaZtbAyBHuhherNgp" 
              alt="Soní Logo Small" 
              className="h-6 w-auto opacity-30 invert" 
            />
            <span>© 2026 Soní New Media.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;