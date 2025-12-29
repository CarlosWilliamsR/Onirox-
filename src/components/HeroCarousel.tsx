import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
}

// Helper to get image path (works in both dev and production)
const getImagePath = (imageName: string) => {
  // In Astro, public folder is served from root
  return imageName.startsWith('/') ? imageName : `/images/products/${imageName}`;
};

const slides: Slide[] = [
  {
    id: 1,
    image: getImagePath('1.jpeg'),
    title: 'COLECCIÓN 2026',
    subtitle: 'Vuelo Global',
    ctaText: 'COMPRAR AHORA',
    ctaLink: '#coleccion',
  },
  {
    id: 2,
    image: getImagePath('2.jpeg'),
    title: 'PLANETA ARDE',
    subtitle: 'Clima Habla',
    ctaText: 'EXPLORAR COLECCIÓN',
    ctaLink: '#coleccion',
  },
  {
    id: 3,
    image: getImagePath('3.jpeg'),
    title: 'WARAIRA REPANO',
    subtitle: 'Caracas',
    ctaText: 'DESCUBRIR MÁS',
    ctaLink: '#coleccion',
  },
  {
    id: 4,
    image: getImagePath('4.jpeg'),
    title: 'OJO DE LA SELVA',
    subtitle: 'Selva',
    ctaText: 'VER COLECCIÓN',
    ctaLink: '#coleccion',
  },
  {
    id: 5,
    image: getImagePath('5.jpeg'),
    title: 'GLACIAR EN ALERTA',
    subtitle: 'Deshielo',
    ctaText: 'VER COLECCIÓN',
    ctaLink: '#coleccion',
  },
  {
    id: 6,
    image: getImagePath('6.jpeg'),
    title: 'BIODIVERSIDAD GEOMÉTRICA',
    subtitle: 'Nativa',
    ctaText: 'VER COLECCIÓN',
    ctaLink: '#coleccion',
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  // Preload images
  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(slide.image));
          resolve(slide.image);
        };
        img.onerror = (error) => {
          console.warn(`Failed to load image: ${slide.image}`, error);
          setImageErrors((prev) => new Set(prev).add(slide.image));
          // Still resolve to allow carousel to continue
          resolve(slide.image);
        };
        // Set src after handlers to ensure they're attached
        img.src = slide.image;
      });
    });

    Promise.all(imagePromises).catch((error) => {
      console.error('Error preloading carousel images:', error);
    });
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const currentSrc = target.src;
    if (!imageErrors.has(currentSrc)) {
      setImageErrors((prev) => new Set(prev).add(currentSrc));
      // Try to load placeholder as fallback
      const placeholderPath = getImagePath('placeholder.svg');
      if (target.src !== placeholderPath) {
        target.src = placeholderPath;
      }
    }
  }, [imageErrors]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovered]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const currentSlide = useMemo(() => slides[currentIndex], [currentIndex]);

  // Optimized animation variants with reduced motion support
  const slideVariants = useMemo(
    () => ({
      initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1 },
      animate: { opacity: 1, scale: 1 },
      exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
    }),
    [prefersReducedMotion]
  );

  const contentVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: prefersReducedMotion ? 0 : -30 },
    }),
    [prefersReducedMotion]
  );

  return (
    <section
      className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[85vh] xl:h-[90vh] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide.id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
              {/* Show image or placeholder */}
              {imageErrors.has(currentSlide.image) ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white/50 text-sm">Imagen no disponible</div>
                </div>
              ) : (
                <>
                  {/* Loading placeholder */}
                  {!loadedImages.has(currentSlide.image) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className={`w-full h-full object-cover will-change-transform transition-opacity duration-500 ${
                      loadedImages.has(currentSlide.image) ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transform: 'translateZ(0)' }}
                    loading={currentIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                    onError={handleImageError}
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      setLoadedImages((prev) => new Set(prev).add(img.src));
                    }}
                  />
                </>
              )}
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-8 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-32">
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 0.6,
                    delay: prefersReducedMotion ? 0 : 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="max-w-xl sm:max-w-2xl will-change-transform"
                >
                  {currentSlide.subtitle && (
                    <p className="text-xs sm:text-sm md:text-base font-extrabold text-white/90 uppercase tracking-widest mb-2 sm:mb-3">
                      {currentSlide.subtitle}
                    </p>
                  )}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-ultrabold text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-[-0.03em] leading-[0.95]">
                    {currentSlide.title}
                  </h1>
                  <a href={currentSlide.ctaLink}>
                    <motion.button
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm hover:bg-zinc-100 transition-colors duration-200 rounded-full shadow-large will-change-transform"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {currentSlide.ctaText}
                    </motion.button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex items-center justify-center group z-10"
        aria-label="Slide anterior"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex items-center justify-center group z-10"
        aria-label="Slide siguiente"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="relative group"
            aria-label={`Ir al slide ${index + 1}`}
          >
            <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
            {index === currentIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 w-2 h-2 rounded-full bg-white will-change-transform"
                transition={{
                  type: prefersReducedMotion ? 'tween' : 'spring',
                  stiffness: prefersReducedMotion ? 0 : 500,
                  damping: prefersReducedMotion ? 0 : 30,
                  duration: prefersReducedMotion ? 0.2 : undefined,
                }}
                style={{ transform: 'translateZ(0)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      {!isHovered && !prefersReducedMotion && (
        <motion.div
          key={currentIndex}
          className="absolute bottom-0 left-0 h-1 bg-white/60 will-change-transform"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
          style={{ transform: 'translateZ(0)' }}
        />
      )}
    </section>
  );
}

