/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';
import heroImage from '../assets/images/cafe_hero_pour_over_1783164658254.jpg';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-natural-cream py-16 md:py-24 border-b border-natural-warm-gray">
      {/* Decorative organic background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-natural-sand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-natural-sage/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Content (left) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-white border border-natural-warm-gray px-4 py-1.5 rounded-full w-fit shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-natural-sage" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-natural-body font-bold">
                Est. 2014 — Seattle Roasters
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-serif text-5xl sm:text-6xl text-natural-espresso leading-[1.1] tracking-tight"
              >
                Morning ritual, <br />
                <span className="italic text-natural-sage">roasted slow.</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-natural-body/85 text-base md:text-lg leading-relaxed max-w-xl font-light"
            >
              At The Brass Kettle, we roast single-origin microlots in small batches and brew with obsessive temperature profiling to honor the farmers who cultivated the cherries.
            </motion.p>

            {/* Quick Metrics / Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-3 gap-4 py-4 border-t border-b border-natural-warm-gray font-sans"
            >
              <div>
                <span className="block font-serif text-2xl font-semibold text-natural-espresso">93.5°C</span>
                <span className="block text-[9px] uppercase tracking-widest text-natural-body/60 font-mono mt-0.5">
                  Extraction Temp
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold text-natural-espresso">100%</span>
                <span className="block text-[9px] uppercase tracking-widest text-natural-body/60 font-mono mt-0.5">
                  Traceable Beans
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold text-natural-espresso">1:16</span>
                <span className="block text-[9px] uppercase tracking-widest text-natural-body/60 font-mono mt-0.5">
                  Gold Cup Ratio
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a 
                href="#menu" 
                className="px-8 py-4 bg-natural-sage hover:bg-[#4d5138] text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md inline-flex items-center space-x-2"
              >
                <span>View Today's Brew</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
              <a 
                href="#profile-finder" 
                className="px-6 py-4 bg-transparent border border-natural-espresso rounded-full hover:bg-natural-espresso hover:text-white text-natural-espresso font-mono text-xs uppercase tracking-widest transition-all duration-300"
              >
                Find Your Roast
              </a>
            </motion.div>
          </div>

          {/* Hero Image (right) */}
          <div className="lg:col-span-6 relative pt-8 lg:pt-0">
            <div className="absolute inset-0 bg-natural-warm-gray rounded-[48px] transform rotate-2"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative aspect-video lg:aspect-square rounded-[48px] overflow-hidden shadow-2xl border-[12px] border-white flex items-center justify-center bg-natural-sand"
            >
              <img 
                src={heroImage} 
                alt="Artisan pour over coffee at The Brass Kettle" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
                id="hero-main-image"
              />
              
              {/* Overlay glass tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-natural-espresso/90 backdrop-blur-md p-4 border border-white/10 rounded-2xl text-white flex items-center justify-between shadow-lg">
                <div>
                  <span className="block font-serif text-base font-semibold text-natural-tan italic">Now Brewing</span>
                  <span className="block font-mono text-[9px] text-gray-300 mt-0.5">Ethiopia Kochere Washed</span>
                </div>
                <div className="flex items-center space-x-2 bg-natural-sage/20 text-natural-cream border border-natural-sage/30 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-ping" />
                  <span>Fresh Batch</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

