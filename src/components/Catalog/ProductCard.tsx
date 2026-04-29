import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

interface ProductCardProps {
  product: Product;
  index: number;
  matchPercentage?: string | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, matchPercentage }) => {
  const { dispatch } = useCart();
  const { colors } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col gap-4 p-4 border border-transparent hover:border-current transition-colors duration-500"
      style={{ borderColor: `${colors.border}1A` }}
    >
      {/* High-Key Product Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-transparent">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        
        {/* Match Percentage Overlay */}
        {matchPercentage && (
          <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-white/90 backdrop-blur-md text-black font-mono text-[9px] font-bold uppercase tracking-tighter border border-black/5">
            {matchPercentage}% Match
          </div>
        )}
        
        {/* Quick Add Button (+) */}
        <button
          onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
          className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-sans font-medium text-sm tracking-tight">{product.name}</h3>
          <span className="font-mono text-[10px] opacity-40">${product.price}.00</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">{product.category}</p>
          <div className="flex gap-2 font-mono text-[9px] opacity-20 group-hover:opacity-60 transition-opacity">
            <span>pH {product.specs.ph}</span>
            <span>{product.specs.volume}</span>
          </div>
        </div>
      </div>

      {/* Industrial Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-20" />
    </motion.div>
  );
};
