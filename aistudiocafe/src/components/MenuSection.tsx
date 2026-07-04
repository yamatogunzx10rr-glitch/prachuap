/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Trash2, ShoppingBag, Check, Sparkles, Receipt, X } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  customization: {
    milk: string;
    sweetness: string;
    extraShot: boolean;
  };
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'espresso' | 'filter' | 'signature' | 'pastry'>('all');
  const [tray, setTray] = useState<OrderItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const addToTray = (item: MenuItem) => {
    const existingIndex = tray.findIndex(t => t.menuItem.id === item.id);
    if (existingIndex > -1) {
      const newTray = [...tray];
      newTray[existingIndex].quantity += 1;
      setTray(newTray);
    } else {
      setTray([...tray, {
        menuItem: item,
        quantity: 1,
        customization: {
          milk: item.category === 'pastry' ? 'N/A' : 'Whole Milk',
          sweetness: item.category === 'pastry' ? 'N/A' : 'Standard',
          extraShot: false
        }
      }]);
    }
  };

  const updateQuantity = (index: number, delta: number) => {
    const newTray = [...tray];
    newTray[index].quantity += delta;
    if (newTray[index].quantity <= 0) {
      newTray.splice(index, 1);
    }
    setTray(newTray);
  };

  const updateCustomization = (index: number, field: 'milk' | 'sweetness' | 'extraShot', value: any) => {
    const newTray = [...tray];
    newTray[index].customization = {
      ...newTray[index].customization,
      [field]: value
    };
    setTray(newTray);
  };

  const removeFromTray = (index: number) => {
    const newTray = [...tray];
    newTray.splice(index, 1);
    setTray(newTray);
  };

  const calculateSubtotal = () => {
    return tray.reduce((sum, item) => {
      let basePrice = item.menuItem.price;
      if (item.customization.extraShot) basePrice += 1.00;
      if (item.customization.milk === 'Oat Milk' || item.customization.milk === 'Almond Milk') basePrice += 0.75;
      return sum + (basePrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.101; // Seattle sales tax 10.1%
  const total = subtotal + tax;

  const handleCheckout = () => {
    // Generate a unique digital receipt/ticket code
    const randCode = 'KTL-' + Math.floor(1000 + Math.random() * 9000);
    setTicketCode(randCode);
    setIsCheckoutOpen(true);
  };

  const clearTray = () => {
    setTray([]);
    setIsCheckoutOpen(false);
    setTicketCode(null);
  };

  const categoryLabels = [
    { id: 'all', label: 'All Curations' },
    { id: 'espresso', label: 'Classic Espresso' },
    { id: 'filter', label: 'Artisan Filter' },
    { id: 'signature', label: 'House Signatures' },
    { id: 'pastry', label: 'Warm Pastries' }
  ];

  return (
    <section id="menu" className="py-20 bg-natural-cream/40 border-b border-natural-warm-gray scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-natural-tan font-bold">
            The Daily Slate
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-natural-espresso mt-2 tracking-tight">
            Artisanal Menu Selection
          </h2>
          <div className="w-12 h-0.5 bg-natural-sand mx-auto my-4" />
          <p className="font-sans text-natural-body/85 text-sm sm:text-base font-light">
            Every bean in our house has been sustainably sourced and roasted in-house. 
            Select items to draft your personalized brewing tray below.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryLabels.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-natural-sage text-white shadow-md'
                  : 'bg-white text-natural-espresso border border-natural-warm-gray hover:border-natural-sage hover:text-natural-sage'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid Layout: Menu on Left, Tray Builder on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Menu Items Grid */}
          <div className="lg:col-span-8">
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="group bg-white p-6 rounded-[28px] border border-natural-warm-gray hover:border-natural-sage/30 shadow-xs hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between"
                  >
                    <div>
                      {/* Top labels */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                          {item.badge && (
                            <span className="bg-natural-sand/15 text-natural-sand font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {item.isPopular && (
                            <span className="bg-natural-sage/15 text-natural-sage font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                              <Sparkles className="w-2.5 h-2.5 animate-spin" />
                              <span>Highly Rated</span>
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs font-bold text-natural-espresso bg-natural-cream px-2.5 py-0.5 rounded-full">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="font-serif text-lg font-semibold text-natural-espresso group-hover:text-natural-sage transition-colors duration-200">
                        {item.name}
                      </h3>
                      <p className="font-sans text-natural-body/80 text-xs mt-1.5 leading-relaxed min-h-[40px] font-light">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] text-natural-sand/80 font-mono tracking-wider bg-natural-cream/50 px-2 py-0.5 rounded-full">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Add Button */}
                    <div className="mt-5 pt-4 border-t border-natural-warm-gray flex justify-end">
                      <button
                        onClick={() => addToTray(item)}
                        className="w-full sm:w-auto px-5 py-2 bg-natural-cream group-hover:bg-natural-sage text-natural-espresso group-hover:text-white font-mono text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2 border border-natural-warm-gray group-hover:border-natural-sage"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Tray</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Interactive Morning Tray Builder */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-[28px] border border-natural-sand/25 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-natural-sage" />
              
              {/* Tray Header */}
              <div className="flex items-center justify-between pb-4 border-b border-natural-warm-gray mb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-natural-sage" />
                  <h3 className="font-serif text-lg font-semibold text-natural-espresso">
                    My Morning Tray
                  </h3>
                </div>
                <span className="font-mono text-xs bg-natural-cream px-2.5 py-1 rounded-full font-bold text-natural-espresso">
                  {tray.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>

              {/* Tray List */}
              {tray.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-natural-cream flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-5 h-5 text-natural-sand" />
                  </div>
                  <p className="font-serif text-sm italic text-natural-body/80">
                    Your tray is currently empty.
                  </p>
                  <p className="font-sans text-xs text-natural-body/60 mt-1 max-w-xs mx-auto font-light leading-relaxed">
                    Select a brew or warm pastry on the left to start building your custom order draft.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 max-h-[360px] overflow-y-auto pr-1">
                  {tray.map((item, idx) => (
                    <div key={idx} className="pb-4 border-b border-natural-warm-gray last:border-0 last:pb-0">
                      
                      {/* Name & Control */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-natural-espresso">
                            {item.menuItem.name}
                          </h4>
                          <span className="text-[10px] text-natural-sand font-mono block">
                            ${(item.menuItem.price).toFixed(2)} each
                          </span>
                        </div>
                        <button 
                          onClick={() => removeFromTray(idx)}
                          className="text-natural-body/40 hover:text-red-700 p-0.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customizations (conditional for beverages) */}
                      {item.menuItem.category !== 'pastry' && (
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-natural-warm-gray">
                          {/* Milk Options */}
                          <div>
                            <label className="block text-[8px] font-mono uppercase text-natural-body/60 tracking-wider">Milk</label>
                            <select 
                              value={item.customization.milk}
                              onChange={(e) => updateCustomization(idx, 'milk', e.target.value)}
                              className="w-full text-[10px] font-mono bg-natural-cream border border-natural-warm-gray rounded-full py-1 px-2.5 outline-none text-natural-espresso"
                            >
                              <option value="Whole Milk">Whole Milk</option>
                              <option value="Oat Milk">Oat Milk (+ $0.75)</option>
                              <option value="Almond Milk">Almond Milk (+ $0.75)</option>
                              <option value="Skim Milk">Skim Milk</option>
                            </select>
                          </div>

                          {/* Sweetness */}
                          <div>
                            <label className="block text-[8px] font-mono uppercase text-natural-body/60 tracking-wider">Sweetness</label>
                            <select 
                              value={item.customization.sweetness}
                              onChange={(e) => updateCustomization(idx, 'sweetness', e.target.value)}
                              className="w-full text-[10px] font-mono bg-natural-cream border border-natural-warm-gray rounded-full py-1 px-2.5 outline-none text-natural-espresso"
                            >
                              <option value="Standard">Standard</option>
                              <option value="Sugar-Free">Sugar-Free</option>
                              <option value="Extra Sweet">Extra Sweet</option>
                              <option value="Unsweetened">Unsweetened</option>
                            </select>
                          </div>

                          {/* Extra Shot checkbox */}
                          <div className="col-span-2 flex items-center space-x-1.5 mt-1">
                            <input 
                              type="checkbox" 
                              id={`shot-${idx}`}
                              checked={item.customization.extraShot}
                              onChange={(e) => updateCustomization(idx, 'extraShot', e.target.checked)}
                              className="rounded-full border-natural-warm-gray accent-natural-sage"
                            />
                            <label htmlFor={`shot-${idx}`} className="text-[9px] font-mono text-natural-body/80 cursor-pointer">
                              Add Extra Espresso Shot (+ $1.00)
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Quantity row */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-1 border border-natural-warm-gray rounded-full p-0.5 bg-natural-cream">
                          <button 
                            onClick={() => updateQuantity(idx, -1)}
                            className="p-1 hover:bg-natural-warm-gray text-natural-espresso rounded-full"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 font-mono text-xs font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(idx, 1)}
                            className="p-1 hover:bg-natural-warm-gray text-natural-espresso rounded-full"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        
                        <span className="font-mono text-xs font-bold text-natural-espresso">
                          ${(
                            ((item.menuItem.price + 
                              (item.customization.extraShot ? 1.0 : 0) + 
                              (item.customization.milk === 'Oat Milk' || item.customization.milk === 'Almond Milk' ? 0.75 : 0)
                            ) * item.quantity)
                          ).toFixed(2)}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              )}

              {/* Price calculations & Action */}
              {tray.length > 0 && (
                <div className="mt-6 pt-4 border-t border-natural-warm-gray">
                  <div className="space-y-1.5 font-mono text-xs text-natural-body/85 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-natural-espresso font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seattle Tax (10.1%)</span>
                      <span className="text-natural-espresso">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-natural-warm-gray text-natural-espresso font-bold">
                      <span>Total Draft</span>
                      <span className="text-natural-sage text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-natural-espresso hover:bg-natural-body text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Generate Ticket Code</span>
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Checkout Receipt Ticket Modal */}
      <AnimatePresence>
        {isCheckoutOpen && ticketCode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={clearTray}
              className="absolute inset-0 bg-natural-espresso/60 backdrop-blur-xs" 
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-natural-cream border border-natural-sand max-w-sm w-full rounded-[32px] shadow-2xl relative overflow-hidden z-10"
            >
              {/* Top tear ribbon */}
              <div className="h-2 bg-natural-sand w-full flex space-x-1 overflow-hidden">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-natural-cream rounded-full -mt-2 shrink-0" />
                ))}
              </div>

              {/* Close Button */}
              <button 
                onClick={clearTray}
                className="absolute top-4 right-4 text-natural-body/40 hover:text-natural-espresso transition-colors p-1 bg-white/20 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6">
                <div className="text-center mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold bg-natural-sage px-3 py-1 rounded-full">
                    Digital Brewing Slip
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-natural-espresso mt-4">
                    The Brass Kettle
                  </h3>
                  <p className="font-mono text-[9px] text-natural-body/60 mt-1">420 Roasted Bean Way, Seattle</p>
                </div>

                {/* Items List */}
                <div className="border-t border-b border-dashed border-natural-body/35 py-4 my-4 space-y-2.5 font-mono text-xs">
                  {tray.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-natural-body">
                       <div className="max-w-[70%]">
                        <span className="font-semibold text-natural-espresso">{item.quantity}x </span>
                        <span>{item.menuItem.name}</span>
                        {item.menuItem.category !== 'pastry' && (
                          <span className="block text-[9px] text-natural-body/70 font-sans mt-0.5">
                            ↳ {item.customization.milk}, {item.customization.sweetness}
                            {item.customization.extraShot ? ', +Extra Shot' : ''}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-natural-espresso">
                        ${(
                          ((item.menuItem.price + 
                            (item.customization.extraShot ? 1.0 : 0) + 
                            (item.customization.milk === 'Oat Milk' || item.customization.milk === 'Almond Milk' ? 0.75 : 0)
                          ) * item.quantity)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="space-y-1.5 font-mono text-xs text-natural-body mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10.1%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-natural-espresso pt-2 border-t border-dashed border-natural-body/25">
                    <span>Total Bill</span>
                    <span className="text-natural-sage">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Ticket Code Block */}
                <div className="bg-natural-espresso text-white rounded-[20px] p-4 text-center shadow-md border border-white/5">
                  <span className="block text-[9px] uppercase tracking-widest text-natural-tan font-mono">
                    Show Barista at Counter
                  </span>
                  <span className="block font-serif text-3xl font-bold tracking-widest text-natural-tan mt-1">
                    {ticketCode}
                  </span>
                  <span className="block text-[8px] font-mono text-gray-400 mt-2 font-light">
                    Slip generated at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={clearTray}
                    className="text-xs font-mono tracking-widest uppercase text-natural-body/60 hover:text-natural-espresso border-b border-natural-body/25 hover:border-natural-espresso transition-all"
                  >
                    Clear Slate & Close
                  </button>
                </div>
              </div>

              {/* Bottom decorative barcode lines */}
              <div className="h-6 bg-white border-t border-natural-warm-gray px-6 py-1 flex items-stretch space-x-1.5 justify-center">
                <div className="w-1 bg-natural-espresso" />
                <div className="w-3 bg-natural-espresso" />
                <div className="w-0.5 bg-natural-espresso" />
                <div className="w-2 bg-natural-espresso" />
                <div className="w-1 bg-natural-espresso" />
                <div className="w-4 bg-natural-espresso" />
                <div className="w-0.5 bg-natural-espresso" />
                <div className="w-2 bg-natural-espresso" />
                <div className="w-1.5 bg-natural-espresso" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
