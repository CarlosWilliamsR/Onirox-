import { useState, useMemo } from 'react';
import { allProducts, Product, ProductCategory } from '../data/products';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >('all');

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === 'all' || product.category === selectedCategory;
      return categoryMatch;
    });
  }, [selectedCategory]);

  return (
    <div className="w-full">
      <ProductFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid - 1 col (móvil), 2 col (tablet), 4 col (desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} id={`product-${product.id}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-600 font-normal text-lg">
            No se encontraron productos con estos filtros.
          </p>
        </div>
      )}
    </div>
  );
}

