/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import BeanSelector from './components/BeanSelector';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-natural-cream text-natural-espresso font-sans selection:bg-natural-sage selection:text-white overflow-x-hidden">
      {/* 1. Header/Nav */}
      <Header />

      {/* 2. Hero Presentation */}
      <HeroSection />

      {/* 3. Artisan Menu & Tray Builder */}
      <MenuSection />

      {/* 4. Interactive Bean Profile Finder */}
      <BeanSelector />

      {/* 5. Nook Reservation & Table Booking */}
      <ReservationSection />

      {/* 6. Footer Information */}
      <Footer />
    </div>
  );
}
