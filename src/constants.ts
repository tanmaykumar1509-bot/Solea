import { Product, SkinType } from './types';

// Minimalist, high-key studio photos from Unsplash
const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop', // white bottle
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop', // black bottle
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop', // gray/silver
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop', // blue/gray
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop', // white pump
];

export const PRODUCTS: Product[] = Array.from({ length: 30 }).map((_, i) => {
  const categories: SkinType[] = ['hydration', 'protection', 'recovery'];
  const targetSkin = categories[i % categories.length];
  
  return {
    id: `solea-${i + 1}`,
    name: i % 2 === 0 ? `Element ${i + 1}` : `Formula ${i + 1}`,
    category: targetSkin.charAt(0).toUpperCase() + targetSkin.slice(1),
    price: 45 + (i * 2),
    image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
    targetSkin,
    specs: {
      ph: (5.5 + (i * 0.05)).toFixed(1),
      volume: '50ml',
      origin: 'Laboratory 07'
    }
  };
});

export const THEMES = {
  light: {
    bg: '#FFFFFF',
    text: '#000000',
    accent: '#000000',
    muted: '#F5F5F5',
    border: '#E5E5E5',
    name: 'Clinic'
  },
  dark: {
    bg: '#000000',
    text: '#FFFFFF',
    accent: '#FFFFFF',
    muted: '#111111',
    border: '#222222',
    name: 'Lab'
  },
  silver: {
    bg: '#E5E5E5',
    text: '#1A1A1A',
    accent: '#1A1A1A',
    muted: '#D1D1D1',
    border: '#C0C0C0',
    name: 'Industrial'
  }
};
