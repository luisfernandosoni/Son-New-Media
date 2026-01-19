import React from 'react';

const DesignPhilosophy: React.FC = () => {
  return (
    <section className="py-40 bg-[#080808] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="material-icons-outlined text-4xl mb-10 text-gray-600">format_quote</span>
        <blockquote className="font-display text-3xl md:text-5xl font-light leading-tight mb-12 text-white/90">
          "Simplicity is not the absence of clutter, that's a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and product."
        </blockquote>
        <cite className="not-italic text-xs font-bold tracking-[0.3em] uppercase text-gray-500">Design Philosophy</cite>
      </div>
    </section>
  );
};

export default DesignPhilosophy;