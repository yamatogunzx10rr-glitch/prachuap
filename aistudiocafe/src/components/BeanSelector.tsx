/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Coffee, Scale, Thermometer, Sliders, ChevronRight } from 'lucide-react';
import { RECOMMENDATIONS } from '../data';
import { RecommendationResult } from '../types';

export default function BeanSelector() {
  const [taste, setTaste] = useState<string>('');
  const [roast, setRoast] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [step, setStep] = useState<number>(1);

  const tasteOptions = [
    { value: 'fruity', label: 'Floral & Sweet Stonefruits', desc: 'Notes of jasmine, lemon zest, peaches, or berries' },
    { value: 'chocolatey', label: 'Rich Chocolates & Warm Nuts', desc: 'Notes of hazelnut, cocoa, brown sugar, or honey' },
    { value: 'bold', label: 'Dark Cacao & Deep Spices', desc: 'Notes of cloves, molasses, sandalwood, or cedar' },
    { value: 'sweet_citrus', label: 'Bright Sugars & Sweet Citruses', desc: 'Notes of orange, nectarine, caramel, or honey' }
  ];

  const roastOptions = [
    { value: 'Light', label: 'Light Roast', desc: 'Accents bright acidity, floral qualities, and authentic soil origin.' },
    { value: 'Medium', label: 'Medium Roast', desc: 'Balances acidity with deep caramelization and body.' },
    { value: 'Dark', label: 'Dark Roast', desc: 'Heavy mouthfeel, low acidity, rich roasted oils, and smoky sweet tones.' }
  ];

  const methodOptions = [
    { value: 'filter', label: 'Pour Over / Filter', desc: 'V60, Chemex, Kalita Wave, or electric drip' },
    { value: 'press', label: 'French Press / Immersion', desc: 'Deep extraction, heavy oil transfer' },
    { value: 'espresso', label: 'Espresso', desc: 'High pressure, concentrated shots' }
  ];

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateRecommendation();
    }
  };

  const calculateRecommendation = () => {
    // Basic logic mapping selections to recommendations
    let selectedRec: RecommendationResult = RECOMMENDATIONS[0]; // default fruity
    
    if (taste === 'chocolatey') {
      selectedRec = RECOMMENDATIONS[1]; // Finca El Tambo (Colombia)
    } else if (taste === 'bold') {
      selectedRec = RECOMMENDATIONS[2]; // Sumatra Gayo
    } else if (taste === 'sweet_citrus') {
      selectedRec = RECOMMENDATIONS[3]; // Las Lajas (Costa Rica)
    } else {
      // fruity
      selectedRec = RECOMMENDATIONS[0]; // Yirgacheffe (Ethiopia)
    }

    setResult(selectedRec);
    setStep(4);
  };

  const handleReset = () => {
    setTaste('');
    setRoast('');
    setMethod('');
    setResult(null);
    setStep(1);
  };

  return (
    <section id="profile-finder" className="py-20 bg-natural-espresso text-white scroll-mt-20 relative overflow-hidden">
      {/* Decorative starry background details */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#8b7e66_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-natural-sand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-natural-tan font-bold">
            Interactive Curator
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1.5 tracking-tight">
            Find Your House Bean & Brewing Guide
          </h2>
          <div className="w-12 h-0.5 bg-natural-sand mx-auto my-4" />
          <p className="font-sans text-gray-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Answer three quick questions about your flavor preferences, and our roasting profile system will recommend the perfect batch and home-brew recipe.
          </p>
        </div>

        {/* Quiz Canvas */}
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative">
          
          {/* Progress Indicators (Only if in step 1, 2, 3) */}
          {step <= 3 && (
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
              <span className="font-mono text-[10px] text-natural-tan font-bold uppercase tracking-wider">
                Step {step} of 3
              </span>
              <div className="flex space-x-2">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step ? 'w-8 bg-natural-sage' : 'w-2 bg-white/20'
                    }`} 
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Taste Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-xl font-medium text-white">
                    What flavor notes do you typically look forward to?
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-sans">
                    This determines the soil chemical properties and variety classification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasteOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTaste(opt.value)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                        taste === opt.value
                          ? 'bg-natural-sage border-natural-sage text-white'
                          : 'bg-white/5 border-white/10 hover:border-natural-sand/50 text-white'
                      }`}
                    >
                      <span className={`font-serif text-base font-semibold ${taste === opt.value ? 'text-white' : 'text-natural-tan group-hover:text-natural-tan/90'}`}>
                        {opt.label}
                      </span>
                      <span className={`text-xs mt-1.5 leading-relaxed font-sans ${taste === opt.value ? 'text-white/85' : 'text-gray-400'}`}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button
                    disabled={!taste}
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-natural-sage hover:bg-natural-sage/90 disabled:bg-white/10 disabled:text-white/40 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Next Profile Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Roast Preference */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-xl font-medium text-white">
                    Which roasting degree matches your mouthfeel style?
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-sans">
                    Roast temperature changes bean density and carbon development.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {roastOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setRoast(opt.value)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 flex justify-between items-center group ${
                        roast === opt.value
                          ? 'bg-natural-sage border-natural-sage text-white'
                          : 'bg-white/5 border-white/10 hover:border-natural-sand/50 text-white'
                      }`}
                    >
                      <div className="max-w-[85%]">
                        <span className={`font-serif text-base font-semibold block ${roast === opt.value ? 'text-white' : 'text-natural-tan'}`}>
                          {opt.label}
                        </span>
                        <span className={`text-xs mt-1 leading-relaxed font-sans ${roast === opt.value ? 'text-white/85' : 'text-gray-400'}`}>
                          {opt.desc}
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${roast === opt.value ? 'border-white' : 'border-white/30'}`}>
                        {roast === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-white/5">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-transparent border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={!roast}
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-natural-sage hover:bg-natural-sage/90 disabled:bg-white/10 disabled:text-white/40 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Next Profile Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Brew Method */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-xl font-medium text-white">
                    How do you typically brew at home?
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-sans">
                    Let us tailor our extraction recipe parameters for your daily setup.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {methodOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setMethod(opt.value)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 flex justify-between items-center group ${
                        method === opt.value
                          ? 'bg-natural-sage border-natural-sage text-white'
                          : 'bg-white/5 border-white/10 hover:border-natural-sand/50 text-white'
                      }`}
                    >
                      <div className="max-w-[85%]">
                        <span className={`font-serif text-base font-semibold block ${method === opt.value ? 'text-white' : 'text-natural-tan'}`}>
                          {opt.label}
                        </span>
                        <span className={`text-xs mt-1 leading-relaxed font-sans ${method === opt.value ? 'text-white/85' : 'text-gray-400'}`}>
                          {opt.desc}
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${method === opt.value ? 'border-white' : 'border-white/30'}`}>
                        {method === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-white/5">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-transparent border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={!method}
                    onClick={calculateRecommendation}
                    className="px-6 py-3 bg-natural-sage hover:bg-natural-sage/90 disabled:bg-white/10 disabled:text-white/40 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Curate Recommendation</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Results Display */}
            {step === 4 && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Result Hero Banner */}
                <div className="border-b border-white/10 pb-6">
                  <div className="flex items-center space-x-2 bg-natural-sage/20 text-natural-cream border border-natural-sage/30 px-4 py-1.5 rounded-full w-fit mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-natural-tan" />
                    <span className="font-mono text-[9px] uppercase tracking-wider">Your Roasted Match Found</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {result.beanName}
                      </h3>
                      <span className="font-mono text-xs text-natural-tan mt-1 block">
                        Origin: {result.origin}
                      </span>
                    </div>
                    <div className="mt-3 sm:mt-0 px-4 py-1.5 bg-white/5 border border-white/15 rounded-full font-mono text-xs text-gray-300">
                      {result.roastLevel} Roast
                    </div>
                  </div>
                  
                  <p className="font-sans text-sm text-gray-300 leading-relaxed mt-4 font-light">
                    {result.description}
                  </p>
                </div>

                {/* Specific Brewing Metrics */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-natural-tan mb-4 flex items-center space-x-2 font-bold">
                    <Sliders className="w-3.5 h-3.5 text-natural-tan" />
                    <span>Home Barista Extraction Guide</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                    {/* Method */}
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono">Recommended Device</span>
                      <span className="block text-sm font-semibold text-white font-serif mt-1 flex items-center space-x-1.5">
                        <Coffee className="w-4 h-4 text-natural-tan" />
                        <span>{result.recommendedMethod}</span>
                      </span>
                    </div>

                    {/* Ratio */}
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono">Brew Ratio (Coffee/Water)</span>
                      <span className="block text-sm font-semibold text-white font-serif mt-1 flex items-center space-x-1.5">
                        <Scale className="w-4 h-4 text-natural-tan" />
                        <span>{result.brewRatio}</span>
                      </span>
                    </div>

                    {/* Water Temp */}
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono">Water Temperature</span>
                      <span className="block text-sm font-semibold text-white font-serif mt-1 flex items-center space-x-1.5">
                        <Thermometer className="w-4 h-4 text-natural-tan" />
                        <span>{result.brewTemp}</span>
                      </span>
                    </div>

                    {/* Grind size */}
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-mono">Grind Setting</span>
                      <span className="block text-sm font-semibold text-white font-serif mt-1 flex items-center space-x-1.5">
                        <Sliders className="w-4 h-4 text-natural-tan" />
                        <span>{result.grindSize}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Taste Profile Badges */}
                <div className="pt-2">
                  <span className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-2">Primary Cup Attributes</span>
                  <div className="flex flex-wrap gap-2">
                    {result.tasteNotes.map((note, i) => (
                      <span key={i} className="px-4 py-1.5 bg-natural-sage/20 text-natural-cream border border-natural-sage/30 rounded-full font-mono text-[10px]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reset button */}
                <div className="flex justify-end pt-6 border-t border-white/10">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-widest rounded-full border border-white/15 transition-all flex items-center space-x-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Run Finder Again</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
