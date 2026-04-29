import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Box, Activity, User, ChevronDown, Sparkles } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { Scanner } from './components/Scanner/Scanner';
import { ProductGrid } from './components/Catalog/ProductGrid';
import { RegimenDrawer } from './components/Cart/RegimenDrawer';
import { ThemeSwitcher } from './components/UI/ThemeSwitcher';
import { AnalysisResult } from './types';

const Header = () => {
  const { colors } = useTheme();
  const { state, dispatch } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md" style={{ borderColor: `${colors.border}40` }}>
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <h1 className="font-sans font-black text-2xl tracking-tighter uppercase">Soléa</h1>
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-40">Biometric Ecosystem</span>
          </div>

          <nav className="hidden md:flex gap-8 font-mono text-[10px] uppercase tracking-widest opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">Philosophy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Archive</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terminal</a>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full border border-current/10 font-mono text-[10px] uppercase tracking-tight">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Core Server Active
          </div>
          
          <button 
            onClick={() => dispatch({ type: 'TOGGLE_DRAWER', payload: true })}
            className="relative p-2 hover:bg-current/5 rounded-full transition-colors group"
          >
            <ShoppingBag size={20} />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center rounded-full font-mono">
                {state.items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

const MainContent = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const { colors } = useTheme();

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {!analysis ? (
          <motion.section
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 py-24 flex flex-col items-center justify-center gap-12"
          >
            <div className="max-w-xl text-center space-y-4">
              <h2 className="font-sans text-4xl sm:text-6xl font-medium tracking-tight leading-[0.9]">
                Verification Required
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40 max-w-sm mx-auto">
                Access to the Soléa catalog requires a biometric subject scan for product alignment.
              </p>
            </div>

            <Scanner onValidated={(result) => setAnalysis(result)} />

            <div className="flex gap-16 font-mono text-[9px] uppercase tracking-[0.2em] opacity-20">
              <div className="flex items-center gap-2">
                <Box size={14} /> Global Logistics
              </div>
              <div className="flex items-center gap-2">
                <Activity size={14} /> pH Equilibrium
              </div>
              <div className="flex items-center gap-2">
                <User size={14} /> Individual Specs
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="catalog"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="container mx-auto px-6 py-12 space-y-12"
          >
            {/* Catalog Info */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-current/10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-black text-white text-[9px] font-mono uppercase tracking-widest">Profile: Verified</span>
                  <span className="font-mono text-[9px] opacity-40 uppercase tracking-widest">Analysis Match: {analysis.matchScore.toFixed(1)}%</span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-current/5 border border-current/10 rounded-full">
                    <Sparkles size={10} className="text-current" />
                    <span className="font-mono text-[9px] uppercase tracking-tighter">{analysis.concern}</span>
                  </div>
                </div>
                <h2 className="font-sans text-5xl font-medium tracking-tighter uppercase leading-none">Specialized Recommendations</h2>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">Showing products optimized for your specific dermal profile.</p>
              </div>
              <div className="flex gap-4">
                <div 
                  onClick={() => setAnalysis(null)} 
                  className="px-6 py-3 border border-current/10 flex items-center gap-4 cursor-pointer hover:bg-current/5 transition-colors group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest">Re-Scan Biometrics</span>
                  <Activity size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Product Library */}
            <ProductGrid analysis={analysis} />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="selection:bg-black selection:text-white">
          <Header />
          <MainContent />
          <RegimenDrawer />
          <ThemeSwitcher />
          
          {/* Global Aesthetic Grain Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
