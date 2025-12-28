import { useState } from 'react';
import { ProductCategory, categoryLabels } from '../data/products';

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
    <div className="w-full border-b border-zinc-200 pb-6 mb-8">
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
          <h3 className="text-sm font-extrabold text-black uppercase tracking-wider mb-3">
            Categoría
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-4 py-2 text-sm font-extrabold uppercase tracking-wider border transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-zinc-200 hover:border-black'
              }`}
            >
              Todas
            </button>
            {(Object.keys(categoryLabels) as ProductCategory[]).map(
              (category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 text-sm font-extrabold uppercase tracking-wider border transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-zinc-200 hover:border-black'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

