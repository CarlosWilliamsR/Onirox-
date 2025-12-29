import { useState } from 'react';
import { Product, ProductCategory } from '../data/products';

interface ColorSelectorProps {
  product: Product;
}

// Definición de colores disponibles
type ColorDefinition = {
  name: string;
  value: string;
  bgClass: string;
  borderClass: string;
};

const ALL_COLORS: Record<string, ColorDefinition> = {
  white: { name: 'Blanco', value: 'white', bgClass: 'bg-white', borderClass: 'border-zinc-300' },
  black: { name: 'Negro', value: 'black', bgClass: 'bg-black', borderClass: 'border-zinc-300' },
  'dark-gray': { name: 'Gris Oscuro', value: 'dark-gray', bgClass: 'bg-zinc-700', borderClass: 'border-zinc-300' },
  'light-gray': { name: 'Gris Claro', value: 'light-gray', bgClass: 'bg-zinc-300', borderClass: 'border-zinc-300' },
  beige: { name: 'Beige', value: 'beige', bgClass: 'bg-amber-100', borderClass: 'border-zinc-300' },
  'light-beige': { name: 'Beige Claro', value: 'light-beige', bgClass: 'bg-amber-50', borderClass: 'border-zinc-300' },
  'dark-blue': { name: 'Azul Oscuro', value: 'dark-blue', bgClass: 'bg-blue-900', borderClass: 'border-zinc-300' },
  'dark-green': { name: 'Verde Oscuro', value: 'dark-green', bgClass: 'bg-green-900', borderClass: 'border-zinc-300' },
  'light-blue': { name: 'Azul Claro', value: 'light-blue', bgClass: 'bg-blue-300', borderClass: 'border-zinc-300' },
  red: { name: 'Rojo', value: 'red', bgClass: 'bg-red-600', borderClass: 'border-zinc-300' },
  'sky-blue': { name: 'Azul Cielo', value: 'sky-blue', bgClass: 'bg-sky-400', borderClass: 'border-zinc-300' },
  coral: { name: 'Coral/Naranja', value: 'coral', bgClass: 'bg-orange-400', borderClass: 'border-zinc-300' },
};

// Paletas de colores por categoría
const COLOR_PALETTES: Record<ProductCategory, string[]> = {
  Naturaleza: ['white', 'black', 'beige', 'dark-green', 'sky-blue', 'light-blue'],
  Clima: ['white', 'black', 'red', 'dark-gray', 'dark-blue', 'coral'],
  Caracas: ['white', 'black', 'dark-gray', 'light-gray', 'dark-blue', 'sky-blue'],
  Selva: ['white', 'black', 'dark-green', 'beige', 'coral', 'light-beige'],
  Deshielo: ['white', 'black', 'sky-blue', 'light-blue', 'light-gray', 'dark-blue'],
  Nativa: ['white', 'black', 'beige', 'light-beige', 'coral', 'dark-green'],
};

// Función para obtener los colores disponibles para un producto según su categoría
function getColorsForProduct(category: ProductCategory): ColorDefinition[] {
  const colorKeys = COLOR_PALETTES[category] || COLOR_PALETTES.Naturaleza;
  return colorKeys.map(key => ALL_COLORS[key]).filter(Boolean);
}

export default function ColorSelector({ product }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const availableColors = getColorsForProduct(product.category);

  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
    
    // Actualizar la imagen principal basada en el color seleccionado
    const mainImage = document.getElementById('main-product-image') as HTMLImageElement;
    if (mainImage) {
      // Crear URL de imagen con color: /images/products/{id}-{color}-frente.jpg
      const baseSlug = product.id;
      const newImageSrc = `/images/products/${baseSlug}-${colorValue}-frente.jpg`;
      
      // Fade out actual
      mainImage.style.opacity = '0';
      
      // Intentar cargar la nueva imagen
      setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          mainImage.src = newImageSrc;
          mainImage.style.opacity = '1';
        };
        img.onerror = () => {
          // Si no existe la imagen con ese color, usar placeholder
          mainImage.src = '/images/products/placeholder.svg';
          mainImage.style.opacity = '1';
        };
        img.src = newImageSrc;
      }, 150);
    }
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
      {availableColors.map((color, index) => (
        <button
          key={color.value}
          onClick={() => handleColorSelect(color.value)}
          title={color.name}
          className={`
            w-full aspect-square rounded-full border-2 transition-all duration-300 transform-gpu
            ${color.bgClass} ${color.borderClass}
            ${selectedColor === color.value 
              ? 'ring-2 ring-black dark:ring-white ring-offset-2 scale-110 shadow-medium' 
              : 'hover:scale-110 hover:ring-1 hover:ring-zinc-400 active:scale-95'
            }
            animate-scale-in
          `}
          style={{ animationDelay: `${index * 30}ms` }}
          aria-label={`Seleccionar color ${color.name}`}
        />
      ))}
    </div>
  );
}
