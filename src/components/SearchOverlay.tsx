import { useState, useEffect } from 'react';
import { allProducts, Product } from '../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setResults([]);
      return;
    }
    // Focus input when opened
    const input = document.getElementById('search-input');
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    setResults(filtered);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-white"
      onClick={onClose}
    >
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative mb-8">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full px-6 py-4 text-2xl font-normal border-b-2 border-black bg-transparent text-black placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
          />
          <button
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-black hover:text-zinc-600 transition-colors"
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
        {searchQuery && (
          <div className="space-y-4">
            {results.length > 0 ? (
              <>
                <p className="text-sm text-zinc-600 mb-4">
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((product) => (
                    <a
                      key={product.id}
                      href={`#product-${product.id}`}
                      onClick={onClose}
                      className="flex gap-4 p-4 border border-zinc-200 hover:border-black transition-colors group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-extrabold text-black group-hover:text-zinc-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-zinc-600 mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-zinc-600 py-12">
                No se encontraron productos
              </p>
            )}
          </div>
        )}

        {!searchQuery && (
          <p className="text-center text-zinc-400 py-12">
            Escribe para buscar productos...
          </p>
        )}
      </div>
    </div>
  );
}

