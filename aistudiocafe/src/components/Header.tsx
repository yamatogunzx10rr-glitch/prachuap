/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Coffee, MapPin, Clock } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-natural-warm-gray bg-natural-cream/85 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-natural-espresso text-natural-cream rounded-full shadow-md">
              <Coffee className="w-6 h-6" id="header-logo-icon" />
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-natural-espresso">
                The Brass Kettle
              </span>
              <span className="block font-mono text-[9px] tracking-widest text-natural-sand uppercase -mt-0.5">
                Artisan Coffee Roasters
              </span>
            </div>
          </div>

          {/* Elegant Navigation Links */}
          <div className="hidden lg:flex gap-8 text-xs uppercase tracking-widest font-mono text-natural-body/80">
            <a href="#menu" className="hover:text-natural-sage transition-colors duration-200">The Menu</a>
            <a href="#profile-finder" className="hover:text-natural-sage transition-colors duration-200">Bean Profile</a>
            <a href="#reservation" className="hover:text-natural-sage transition-colors duration-200">Table Bookings</a>
          </div>

          {/* Quick Info Block */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-medium text-natural-body/85 font-sans">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-natural-sand" />
              <span>Mon - Sun: 7am - 6pm</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-natural-sand" />
              <span>Seattle, WA</span>
            </div>
          </div>

          {/* Call to Action scroll targets */}
          <div className="flex items-center space-x-3">
            <a 
              href="#reservation" 
              className="px-5 py-2.5 bg-natural-sage hover:bg-natural-sage/90 text-white text-xs font-mono tracking-widest uppercase rounded-full transition-all duration-300 shadow-sm"
              id="nav-book-table-btn"
            >
              Book Table
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

