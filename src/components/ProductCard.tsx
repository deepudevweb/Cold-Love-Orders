import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity_info: product.quantity_info,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden soft-shadow hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#E0F7FA] to-[#FFF3E0]">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#FF6B9D]">
            {product.category}
          </span>
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isAdded
              ? 'bg-green-500 text-white'
              : 'bg-[#FF6B9D] text-white hover:bg-[#ff4d8a]'
          }`}
        >
          {isAdded ? (
            <Check className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.quantity_info}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[#FF6B9D]">
            ₹{product.price}
          </span>
          {product.is_available ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
