/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, Coffee, HelpCircle, CheckCircle2, Trash2, ShieldCheck } from 'lucide-react';
import { TableReservation } from '../types';
import interiorImage from '../assets/images/cafe_interior_cozy_1783164674967.jpg';

export default function ReservationSection() {
  const [activeReservation, setActiveReservation] = useState<TableReservation | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [tableType, setTableType] = useState<'window' | 'bar' | 'lounge' | 'patio'>('window');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Load initial reservation from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('brass_kettle_reservation');
    if (saved) {
      try {
        setActiveReservation(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved reservation', err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) return;

    const newReservation: TableReservation = {
      id: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      phone,
      date,
      time,
      partySize,
      tableType,
      specialRequests,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('brass_kettle_reservation', JSON.stringify(newReservation));
    setActiveReservation(newReservation);
    
    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setPartySize(2);
    setTableType('window');
    setSpecialRequests('');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your table reservation?')) {
      localStorage.removeItem('brass_kettle_reservation');
      setActiveReservation(null);
    }
  };

  const tableTypeLabels = {
    window: 'Sunset Window Nook',
    bar: 'Artisan Espresso Bar Barstool',
    lounge: 'Cozy Fireplace Leather Sofa',
    patio: 'Heated Brick Patio Table'
  };

  return (
    <section id="reservation" className="py-20 bg-natural-cream border-b border-natural-warm-gray scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-natural-tan font-bold">
            Table Reservations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-natural-espresso mt-2 tracking-tight">
            Reserve An Afternoon Nook
          </h2>
          <div className="w-12 h-0.5 bg-natural-sand mx-auto my-4" />
          <p className="font-sans text-natural-body/85 text-sm sm:text-base font-light">
            Whether you need a quiet sunset workspace, a cozy sofa next to our roasting bay, or a sunny heated patio bench, we have space ready for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Visual Showcase (left column) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white p-5 rounded-[32px] border border-natural-warm-gray shadow-md h-full flex flex-col">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-5">
                <img 
                  src={interiorImage} 
                  alt="Cozy interior of The Brass Kettle cafe" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="reservation-interior-image"
                />
                <div className="absolute top-4 left-4 bg-natural-espresso/90 text-natural-tan text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 shadow-md">
                  Cozy Seating Space
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-natural-espresso">
                    Quiet, Connected, & Curated
                  </h3>
                  <p className="font-sans text-xs text-natural-body/80 leading-relaxed font-light">
                    Our cafe features ultra-fast complimentary fiber WiFi, accessible power outlets at every window nook, and a quiet atmospheric soundscape designed for focused minds.
                  </p>
                  
                  <div className="space-y-2 text-xs font-mono text-natural-body/95">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-natural-sage" />
                      <span>Complimentary mineral water for all bookings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-natural-sage" />
                      <span>Tables held for 15 minutes past booking time</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-natural-warm-gray bg-natural-cream/30 p-4 rounded-2xl flex items-start space-x-3">
                  <HelpCircle className="w-4 h-4 text-natural-sand shrink-0 mt-0.5" />
                  <p className="text-[10px] text-natural-body/80 leading-relaxed font-sans font-light">
                    Need a custom event or a large-party reservation of more than 8 people? Feel free to reach out to our barista team at <span className="font-semibold text-natural-espresso">hello@brasskettlecoffee.com</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Active Ticket (right column) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeReservation ? (
                /* Active Booking Slip Screen */
                <motion.div
                  key="active-ticket"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-6 sm:p-8 rounded-[32px] border border-natural-sand/30 shadow-xl relative overflow-hidden h-full flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-natural-sage" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start pb-5 border-b border-natural-warm-gray">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-white font-bold font-mono bg-natural-sage px-3 py-1 rounded-full">
                          Reservation Confirmed
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-natural-espresso mt-4">
                          Your Coffee Nook is Ready
                        </h3>
                        <p className="font-sans text-xs text-natural-body/60 mt-1 font-light">
                          We look forward to hosting you soon.
                        </p>
                      </div>
                      <div className="text-right font-mono">
                        <span className="block text-[8px] uppercase tracking-wider text-natural-body/50">Booking ID</span>
                        <span className="text-sm font-bold text-natural-espresso">{activeReservation.id}</span>
                      </div>
                    </div>

                    {/* Booking Attributes */}
                    <div className="grid grid-cols-2 gap-4 py-6 border-b border-natural-warm-gray font-sans">
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-natural-body/60 tracking-wider">Guest Name</span>
                        <span className="text-sm font-semibold text-natural-espresso">{activeReservation.name}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-natural-body/60 tracking-wider">Contact Email</span>
                        <span className="text-sm font-semibold text-natural-espresso">{activeReservation.email}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-natural-body/60 tracking-wider">Scheduled Date & Time</span>
                        <span className="text-sm font-semibold text-natural-espresso flex items-center space-x-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-natural-sand" />
                          <span>{activeReservation.date} @ {activeReservation.time}</span>
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-natural-body/60 tracking-wider">Party Size</span>
                        <span className="text-sm font-semibold text-natural-espresso flex items-center space-x-1.5 mt-0.5">
                          <Users className="w-3.5 h-3.5 text-natural-sand" />
                          <span>{activeReservation.partySize} {activeReservation.partySize === 1 ? 'Guest' : 'Guests'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Table Style and Special Request */}
                    <div className="py-5 space-y-4">
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-natural-body/60 tracking-wider">Reserved Zone</span>
                        <span className="text-sm font-serif font-bold text-natural-sage mt-1 flex items-center space-x-2">
                          <Coffee className="w-4 h-4 text-natural-sand" />
                          <span>{tableTypeLabels[activeReservation.tableType]}</span>
                        </span>
                      </div>

                      {activeReservation.specialRequests && (
                        <div className="bg-natural-cream/30 p-3.5 rounded-2xl border border-natural-warm-gray">
                          <span className="block text-[9px] uppercase font-mono text-natural-body/60 tracking-wider">Special Notes</span>
                          <p className="text-xs text-natural-body/90 italic mt-1 font-sans font-light">
                            "{activeReservation.specialRequests}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-6 border-t border-natural-warm-gray flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="flex items-center space-x-2 text-natural-sage">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest">Pass Added to Wallet</span>
                    </div>

                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-6 py-3 text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-400 font-mono text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Reservation Form Screen */
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="bg-white p-6 sm:p-8 rounded-[32px] border border-natural-warm-gray shadow-lg space-y-5"
                >
                  <h3 className="font-serif text-xl font-bold text-natural-espresso mb-2">
                    Submit Reservation Slip
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full border border-natural-warm-gray rounded-full py-2.5 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-sans font-light"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. eleanor@vance.com"
                        className="w-full border border-natural-warm-gray rounded-full py-2.5 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-sans font-light"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (206) 555-0198"
                        className="w-full border border-natural-warm-gray rounded-full py-2.5 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-sans font-light"
                      />
                    </div>

                    {/* Party Size */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Party Size *
                      </label>
                      <select 
                        value={partySize}
                        onChange={(e) => setPartySize(parseInt(e.target.value))}
                        className="w-full border border-natural-warm-gray rounded-full py-2.5 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-mono cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                          <option key={s} value={s}>{s} {s === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Preferred Date *
                      </label>
                      <input 
                        type="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-natural-warm-gray rounded-full py-2.5 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-mono cursor-pointer"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Time Slot *
                      </label>
                      <select 
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border border-natural-warm-gray rounded-full py-2.5 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-mono cursor-pointer"
                      >
                        <option value="">-- Choose Slot --</option>
                        <option value="07:30 AM">07:30 AM</option>
                        <option value="08:30 AM">08:30 AM</option>
                        <option value="09:30 AM">09:30 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                      </select>
                    </div>

                    {/* Nook / Table Style */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-2 font-bold tracking-wider">
                        Select Seating Zone *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(tableTypeLabels).map(([val, label]) => (
                          <button
                            type="button"
                            key={val}
                            onClick={() => setTableType(val as any)}
                            className={`p-3.5 rounded-[18px] text-left border text-xs transition-all duration-200 ${
                              tableType === val
                                ? 'bg-natural-sage/15 border-natural-sage text-natural-espresso font-semibold'
                                : 'bg-transparent border-natural-warm-gray hover:border-natural-sage/50 text-natural-body'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-natural-body/75 mb-1.5 font-bold tracking-wider">
                        Special Notes or Requests (Optional)
                      </label>
                      <textarea 
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. Birthday occasion, near charging outlets, highchair needed, etc."
                        rows={3}
                        className="w-full border border-natural-warm-gray rounded-2xl py-3 px-4 text-xs outline-none focus:border-natural-sage bg-natural-cream/30 text-natural-espresso font-sans resize-none font-light"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-natural-sage hover:bg-[#4d5138] text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md mt-2"
                  >
                    Generate Confirmation Pass
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
