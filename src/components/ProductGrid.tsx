import { useState, useMemo } from 'react';
import { allProducts, Product, ProductCategory } from '../data/products';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductDetailModal from './ProductDetailModal';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === 'all' || product.category === selectedCategory;
      return categoryMatch;
    });
  }, [selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay para permitir animación de salida
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  };

  return (
    <div className="w-full">
      <ProductFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid - Responsive: 1 col (móvil), 2 col (tablet), 3 col (desktop), 4 col (xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            id={`product-${product.id}`}
            className="animate-fade-in-up will-change-transform"
            style={{ 
              animationDelay: `${Math.min(index * 30, 300)}ms`,
              transform: 'translateZ(0)'
            }}
          >
            <ProductCard 
              product={product} 
              onProductClick={handleProductClick}
            />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 animate-fade-in-up">
          <p className="text-zinc-600 dark:text-zinc-400 font-normal text-lg">
            No se encontraron productos con estos filtros.
          </p>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

