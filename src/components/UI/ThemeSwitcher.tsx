import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeMode } from '../../types';

export const ThemeSwitcher: React.FC = () => {
  const { mode, setMode, colors } = useTheme();

  const modes: ThemeMode[] = ['light', 'dark', 'silver'];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-1 p-1 bg-current/5 backdrop-blur-xl border border-current/10 rounded-full">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`relative px-4 py-2 text-[9px] font-mono uppercase tracking-widest transition-colors duration-500 rounded-full ${
            mode === m ? 'text-white' : 'opacity-40 hover:opacity-100'
          }`}
        >
          {mode === m && (
            <motion.div
              layoutId="theme-pill"
              className="absolute inset-0 bg-black rounded-full -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {m}
        </button>
      ))}
    </div>
  );
};
