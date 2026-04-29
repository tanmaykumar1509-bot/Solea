export type ThemeMode = 'light' | 'dark' | 'silver';

export type SkinType = 'hydration' | 'protection' | 'recovery' | 'all';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  targetSkin: SkinType;
  specs: {
    ph: string;
    volume: string;
    origin: string;
  };
}

export interface AnalysisResult {
  skinType: SkinType;
  matchScore: number;
  concern: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ScanState = 'idle' | 'scanning' | 'success' | 'error';
