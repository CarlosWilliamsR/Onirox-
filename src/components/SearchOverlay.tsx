/**
 * Search Overlay Component
 * 
 * Architecture Decisions:
 * 1. Uses debounced search for performance (prevents excessive filtering)
 * 2. Searches across multiple fields (name, description, category)
 * 3. Highlights search terms in results for better UX
 * 4. Keyboard navigation support (ESC to close, Enter to select)
 * 5. Client-side only to avoid hydration issues
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { allProducts, searchProducts, Product } from '../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Debounce hook for search input
 * Architecture Decision: Debouncing reduces unnecessary computations
 * Improves performance on slow devices
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Highlight search term in text
 * Architecture Decision: Client-side highlighting provides instant feedback
 */
function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return <mark key={index} className="bg-yellow-200 font-extrabold">{part}</mark>;
    }
    return part;
  });
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Debounce search query for performance
  // Architecture Decision: 150ms delay balances responsiveness and performance
  const debouncedQuery = useDebounce(searchQuery, 150);

  // Memoized search results
  // Architecture Decision: useMemo prevents recalculation on every render
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchProducts(debouncedQuery);
  }, [debouncedQuery]);

  // Reset state when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      return;
    }
    
    // Focus input when opened
    // Architecture Decision: setTimeout ensures DOM is ready
    const input = document.getElementById('search-input');
    if (input) {
      setTimeout(() => {
        input.focus();
        input.select();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = `/producto/${results[selectedIndex].id}`;
            onClose();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (results.length === 0) return;
    
    const selectedElement = document.getElementById(`search-result-${selectedIndex}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex, results.length]);

  const handleResultClick = useCallback((productId: string) => {
    window.location.href = `/producto/${productId}`;
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda de productos"
    >
      <div
        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative mb-12">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0); // Reset selection on new search
            }}
            placeholder="Buscar productos..."
            className="w-full px-8 py-5 text-3xl md:text-4xl font-normal border-b-2 border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300 tracking-tight"
            aria-label="Campo de búsqueda"
            autoComplete="off"
          />
          <button
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-black hover:text-zinc-600 transition-all duration-200 rounded-lg hover:bg-zinc-100/50 active:scale-95"
            aria-label="Cerrar búsqueda"
          >
            <svg
              className="w-6 h-6"
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
        </div>

        {/* Results */}
        {debouncedQuery && (
          <div className="space-y-4">
            {results.length > 0 ? (
              <>
                <p className="text-sm text-zinc-600 mb-4">
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {results.map((product, index) => (
                    <a
                      key={product.id}
                      id={`search-result-${index}`}
                      href={`/producto/${product.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleResultClick(product.id);
                      }}
                      className={`flex gap-5 p-5 border-2 rounded-2xl transition-all duration-300 group block ${
                        index === selectedIndex
                          ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 shadow-soft scale-[1.02]'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 hover:scale-[1.01]'
                      }`}
                    >
                      <img
                        src={product.images[0] || '/images/products/placeholder.svg'}
                        alt={product.name}
                        className="w-24 h-24 object-cover flex-shrink-0 rounded-xl shadow-soft"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/products/placeholder.svg';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-black dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-1">
                          {highlightText(product.name, debouncedQuery)}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2">
                          {highlightText(product.description, debouncedQuery)}
                        </p>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-extrabold text-black dark:text-white">
                            ${product.price.toFixed(2)}
                          </p>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-600 mb-2">No se encontraron productos</p>
                <p className="text-sm text-zinc-400">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}
          </div>
        )}

        {!debouncedQuery && (
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">Escribe para buscar productos...</p>
            <div className="text-sm text-zinc-500 space-y-1">
              <p>Puedes buscar por nombre, descripción o categoría</p>
              <p>Usa las flechas ↑↓ para navegar, Enter para seleccionar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
