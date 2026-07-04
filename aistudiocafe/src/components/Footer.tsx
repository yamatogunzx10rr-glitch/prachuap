/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Clock, ArrowUpCircle } from 'lucide-react';
import espressoImage from '../assets/images/cafe_espresso_art_1783164692961.jpg';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-natural-espresso text-white border-t border-white/5 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10 items-start">
          
          {/* Column 1: Brand & Philosphy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-natural-sage text-white rounded-full">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-xl font-semibold tracking-tight text-white block">
                  The Brass Kettle
                </span>
                <span className="block font-mono text-[9px] tracking-widest text-natural-tan uppercase -mt-0.5 font-bold">
                  Artisan Coffee Roasters
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm font-light">
              We operate on a 100% direct-trade model, paying our farmers an average of 45% above Fair Trade standards. Every roast profile is mapped with digital accuracy to preserve flavor characteristics native to the microclimate.
            </p>

            <div className="flex space-x-3 pt-2 text-gray-400">
              <a href="#" className="hover:text-natural-tan p-1.5 bg-white/5 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-natural-tan p-1.5 bg-white/5 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Hours & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-natural-tan tracking-wide uppercase font-mono text-[11px]">
              Daily Operations
            </h4>
            
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-natural-sand shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Cafe Bar & Kitchen Hours</span>
                  <span className="block text-gray-400 text-[11px] mt-0.5 font-light">Monday - Sunday: 7:00 AM - 6:00 PM</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-natural-sand shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Seattle Roasting Bay</span>
                  <span className="block text-gray-400 text-[11px] mt-0.5 font-light">420 Roasted Bean Way, Seattle WA 98101</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-natural-sand shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">General Inquiries</span>
                  <span className="block text-gray-400 text-[11px] mt-0.5 font-light">hello@brasskettlecoffee.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Custom visual block (Espresso Pour Art) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="font-serif text-sm font-semibold text-natural-tan tracking-wide uppercase font-mono text-[11px]">
              Our Craft In Focus
            </h4>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-md">
              <img 
                src={espressoImage} 
                alt="Finely pulled espresso cup art" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-natural-espresso via-transparent to-transparent opacity-75" />
              <div className="absolute bottom-2.5 left-3 text-white">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-natural-tan">Seasonal Profile</span>
                <span className="block font-serif text-xs font-semibold text-white">Guatemala Huehuetenango Washed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Sub-row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-mono gap-4">
          <div>
            <span>© {new Date().getFullYear()} The Brass Kettle Co. All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleScrollToTop}
              className="flex items-center space-x-1 hover:text-natural-tan transition-colors"
            >
              <ArrowUpCircle className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
