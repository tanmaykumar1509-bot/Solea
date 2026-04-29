import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { THEMES } from '../constants';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: typeof THEMES.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const colors = THEMES[mode];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg', colors.bg);
    root.style.setProperty('--text', colors.text);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--muted', colors.muted);
    
    root.style.backgroundColor = colors.bg;
    root.style.color = colors.text;
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
