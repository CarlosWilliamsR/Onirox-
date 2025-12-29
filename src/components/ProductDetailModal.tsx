import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Product } from '../data/products';
import { addToCart } from '../store/cartStore';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedSize(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!selectedSize || !product) return;

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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 20,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (!product) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95"
                aria-label="Cerrar"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image Section */}
              <motion.div
                variants={itemVariants}
                className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
              >
                <img
                  src={product.images[0] || '/images/products/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 flex flex-col overflow-y-auto max-h-[90vh] md:max-h-full">
                <div className="p-6 sm:p-8 md:p-12 lg:p-16 space-y-8 md:space-y-10">
                  {/* Header */}
                  <motion.div variants={itemVariants}>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ultrabold text-black dark:text-white mb-4 md:mb-6 uppercase tracking-[-0.03em] leading-tight">
                      {product.name}
                    </h1>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black dark:text-white tracking-tight">
                      ${product.price.toFixed(2)}
                    </p>
                  </motion.div>

                  {/* Storytelling Block - Featured Quote Style */}
                  {product.story && (
                    <motion.div
                      variants={itemVariants}
                      className="relative pl-6 sm:pl-8 border-l-4 border-black dark:border-white/20 py-6 sm:py-8 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-r-2xl"
                    >
                      <div className="absolute top-0 left-0 text-6xl sm:text-7xl md:text-8xl font-serif text-black/5 dark:text-white/5 leading-none -mt-2">
                        "
                      </div>
                      <p className="text-base sm:text-lg md:text-xl font-normal text-black dark:text-zinc-200 leading-relaxed tracking-wide relative z-10">
                        {product.story}
                      </p>
                    </motion.div>
                  )}

                  {/* Details Section */}
                  <motion.div variants={itemVariants} className="space-y-6">
                    <h3 className="text-xs font-extrabold text-black dark:text-white uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
                      DETALLES:
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:gap-5">
                      {/* Franela */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-extrabold text-black dark:text-white uppercase tracking-wider block mb-1">
                            Franela:
                          </span>
                          <span className="text-sm sm:text-base font-normal text-black dark:text-zinc-300">
                            Unisex
                          </span>
                        </div>
                      </div>

                      {/* Marca */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-extrabold text-black dark:text-white uppercase tracking-wider block mb-1">
                            Marca:
                          </span>
                          <span className="text-sm sm:text-base font-normal text-black dark:text-zinc-300">
                            ONIROX
                          </span>
                        </div>
                      </div>

                      {/* Tela */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-extrabold text-black dark:text-white uppercase tracking-wider block mb-1">
                            Tela:
                          </span>
                          <span className="text-sm sm:text-base font-normal text-black dark:text-zinc-300">
                            {product.fabric}
                          </span>
                        </div>
                      </div>

                      {/* Tallas */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm font-extrabold text-black dark:text-white uppercase tracking-wider block mb-3">
                            Tallas Disponibles:
                          </span>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {product.availableSizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-2 transition-all duration-300 rounded-full ${
                                  selectedSize === size
                                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105 shadow-medium'
                                    : 'bg-transparent text-black dark:text-white border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:scale-105 active:scale-95'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Add to Cart Button */}
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedSize}
                      className={`w-full py-4 sm:py-5 bg-black dark:bg-white text-white dark:text-black font-extrabold uppercase tracking-wider text-sm sm:text-base transition-all duration-300 rounded-full ${
                        selectedSize
                          ? 'hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:scale-[1.02] hover:shadow-large active:scale-95'
                          : 'opacity-30 cursor-not-allowed'
                      }`}
                    >
                      {showFeedback ? '✓ AÑADIDO AL CARRITO' : 'AÑADIR AL CARRITO'}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

