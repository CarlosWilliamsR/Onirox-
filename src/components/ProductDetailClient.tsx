import { useState } from 'react';
import { Product } from '../data/products';
import { addToCart } from '../store/cartStore';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla');
      return;
    }

    addToCart(
      product.id,
      selectedSize,
      product.price,
      product.name,
      product.images[0]
    );

    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      {/* Size Selector */}
      <div>
        <label className="block text-xs font-extrabold text-black dark:text-white uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 text-zinc-500 dark:text-zinc-400">
          SELECCIONA TU TALLA
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {product.availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 sm:px-5 md:px-7 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border transition-all duration-300 rounded-full transform-gpu ${
                selectedSize === size
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105 shadow-medium'
                  : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-700 active:scale-95'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize}
        className={`w-full py-3 sm:py-4 md:py-5 bg-black text-white font-extrabold uppercase tracking-wider transition-all duration-300 rounded-full transform-gpu text-sm sm:text-base ${
          selectedSize
            ? 'hover:bg-zinc-900 hover:scale-[1.02] hover:shadow-large active:scale-95'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        {showFeedback ? 'AÑADIDO AL CARRITO' : 'AÑADIR AL CARRITO'}
      </button>

      {/* Feedback Message */}
      {showFeedback && (
        <div className="text-center animate-fade-in-up">
          <p className="text-sm font-extrabold text-black dark:text-white uppercase tracking-wider">
            ✓ Producto añadido correctamente
          </p>
        </div>
      )}
    </div>
  );
}

