import { useState } from 'react';
import type React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';
import { addToCart } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (size: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    addToCart(
      product.id,
      size,
      product.price,
      product.name,
      product.images[0]
    );
    setSelectedSize(size);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Si el click es en un botón de talla, no abrir modal
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Fallback a navegación tradicional
      window.location.href = `/producto/${product.id}`;
    }
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      style={{ transform: 'translateZ(0)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      whileHover={{ 
        scale: 1.015,
        y: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container - Responsive height */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[420px] overflow-hidden bg-zinc-50 dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-soft transition-shadow duration-300 group-hover:shadow-medium">
        <motion.img
          src={product.images[0] || '/images/products/placeholder.svg'}
          alt={product.name}
          style={{ 
            viewTransitionName: `image-${product.id}`,
            transform: 'translateZ(0)'
          }}
          className="w-full h-full object-cover will-change-transform"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/products/placeholder.svg';
          }}
        />

        {/* Size Selector Overlay - Desktop hover */}
        {/* 4. TRUCO PRO: 'pointer-events-none' permite hacer clic a la imagen "a través" del fondo negro */}
        {hovered && (
          <div className="absolute inset-0 bg-black/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl will-change-opacity">
            {/* ...pero reactivamos los clicks ('pointer-events-auto') solo para los botones */}
            <div className="flex flex-wrap gap-3 justify-center max-w-[85%] pointer-events-auto">
              {product.availableSizes.map((size, index) => (
                <motion.button
                  key={size}
                  onClick={(e) => handleAddToCart(size, e)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-extrabold text-sm uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-medium"
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Message */}
        {showFeedback && selectedSize && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ 
              type: 'spring',
              stiffness: 400,
              damping: 20
            }}
            className="absolute top-6 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-sm font-extrabold uppercase tracking-wider z-10 rounded-full shadow-large pointer-events-none"
          >
            ✓ Añadido
          </motion.div>
        )}
      </div>

      {/* Product Info - Título en negrita y precio destacado */}
      <div className="mt-3 sm:mt-4 md:mt-5 space-y-1 sm:space-y-1.5 md:space-y-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-all duration-300">
        {/* Título en negrita */}
        <h3 
          className="font-extrabold text-black dark:text-white text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-1.5 leading-tight tracking-tight line-clamp-2"
          style={{ viewTransitionName: `title-${product.id}` }}
        >
          {product.name}
        </h3>
        {/* Precio destacado */}
        <p className="font-extrabold text-black dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Mobile Size Selector */}
      <div className="mt-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {product.availableSizes.map((size) => (
            <motion.button
              key={size}
              onClick={(e) => handleAddToCart(size, e)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider border transition-colors duration-200 rounded-full ${
                selectedSize === size
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-medium'
                  : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-zinc-200 dark:border-zinc-700 hover:border-black dark:hover:border-white'
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}