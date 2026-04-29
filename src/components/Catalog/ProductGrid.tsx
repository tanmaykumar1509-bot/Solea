import React from 'react';
import { PRODUCTS } from '../../constants';
import { ProductCard } from './ProductCard';
import { AnalysisResult } from '../../types';

interface ProductGridProps {
  analysis?: AnalysisResult | null;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ analysis }) => {
  const filterType = analysis?.skinType;
  
  const filteredProducts = filterType 
    ? PRODUCTS.filter(p => p.targetSkin === filterType || p.targetSkin === 'all')
    : PRODUCTS;

  // Function to calculate individual match % based on overall analysis
  const getMatchPercentage = (productSkinType: string) => {
    if (!analysis) return null;
    const baseMatch = analysis.matchScore;
    // Products that perfectly match the skin type get a slight boost, others stay high but varied
    if (productSkinType === analysis.skinType) {
      return (baseMatch + (Math.random() * 2)).toFixed(1);
    }
    return (baseMatch - (2 + Math.random() * 5)).toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-px gap-y-12">
      {filteredProducts.map((product, i) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={i} 
          matchPercentage={getMatchPercentage(product.targetSkin)}
        />
      ))}
    </div>
  );
};
