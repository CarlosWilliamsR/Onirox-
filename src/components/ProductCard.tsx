import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Product } from '../data/products';
import { addToCart } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (size: string) => {
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

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container - 85% height */}
      <div className="relative h-[85%] overflow-hidden bg-zinc-50">
        <Zoom>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Zoom>

        {/* Size Selector Overlay - Desktop hover */}
        {hovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-wrap gap-2 justify-center max-w-[80%]">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(size);
                  }}
                  className="px-4 py-2 bg-white text-black font-extrabold text-sm uppercase tracking-wider hover:bg-zinc-100 transition-colors border border-zinc-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Message */}
        {showFeedback && selectedSize && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 text-sm font-extrabold uppercase tracking-wider z-10 animate-fade-in">
            Añadido
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <h3 className="font-extrabold text-black text-lg">{product.name}</h3>
        <p className="font-normal text-black text-base">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Mobile Size Selector - Always visible on mobile */}
      <div className="mt-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {product.availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleAddToCart(size)}
              className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider border transition-colors ${
                selectedSize === size
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-zinc-200 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

