import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Droplets, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

export const RegimenDrawer: React.FC = () => {
  const { state, dispatch } = useCart();
  const { colors } = useTheme();

  const total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: 'TOGGLE_DRAWER', payload: false })}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
            className="fixed top-0 right-0 h-full w-full max-w-md border-l z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-current/10">
              <div className="space-y-1">
                <h2 className="font-sans font-medium text-xl tracking-tight uppercase">Daily Regimen</h2>
                <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">{state.items.length} Modules Active</p>
              </div>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_DRAWER', payload: false })}
                className="p-2 hover:bg-current/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {state.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-current/10 flex items-center justify-center">
                    <Droplets className="opacity-20" size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-sans text-sm font-medium opacity-60">Your skin journey begins with a scan.</p>
                    <p className="font-mono text-[10px] uppercase tracking-tighter opacity-30">Scan for personalized recommendations</p>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_DRAWER', payload: false })}
                    className="mt-4 px-8 py-2 border border-current text-[10px] font-mono uppercase tracking-widest hover:bg-current hover:text-white transition-all"
                  >
                    Start Analysis
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-24 bg-current/5 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <h4 className="font-sans font-medium text-sm">{item.name}</h4>
                            <p className="font-mono text-[10px]">${item.price * item.quantity}.00</p>
                          </div>
                          <p className="font-mono text-[10px] opacity-40 uppercase">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 font-mono text-[10px]">
                            <span className="opacity-40">Qty: {item.quantity}</span>
                          </div>
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                            className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-8 border-t border-current/10 bg-current/5">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-mono text-[10px] uppercase opacity-40">Summative Total</span>
                  <span className="font-sans font-medium text-2xl tracking-tighter">${total}.00</span>
                </div>
                <button className="w-full py-4 bg-black text-white hover:bg-neutral-800 transition-all flex items-center justify-between px-6 font-mono text-xs uppercase tracking-widest group">
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
