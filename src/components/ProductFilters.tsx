import { useState } from 'react';
import { ProductCategory, categoryLabels, categoryOrder } from '../data/products';

interface ProductFiltersProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4 sm:pb-6 md:pb-8 mb-6 sm:mb-8 md:mb-12 animate-fade-in-down">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 border border-zinc-200 text-black font-extrabold uppercase tracking-wider"
        >
          <span>Filtros</span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isMobileMenuOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filters Content */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:block space-y-6`}
      >
        {/* Category Filter */}
        <div>
          <h3 className="text-xs font-extrabold text-black dark:text-white uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 text-zinc-500 dark:text-zinc-400">
            CATEGORÍA
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border transition-all duration-300 rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105 shadow-medium'
                  : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-700 active:scale-95'
              }`}
            >
              Todas
            </button>
            {categoryOrder.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                  className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border transition-all duration-300 rounded-full ${
                    selectedCategory === category
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105 shadow-medium'
                      : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-700 active:scale-95'
                  }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

