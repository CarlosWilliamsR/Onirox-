export type ProductCategory = 
  | 'Naturaleza' 
  | 'Clima' 
  | 'Caracas' 
  | 'Selva' 
  | 'Deshielo' 
  | 'Nativa';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: ProductCategory;
  fabric: string;
  availableSizes: string[];
}

// Imágenes placeholder de Unsplash para ropa urbana
const getImageUrl = (index: number) => {
  const images = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=80',
  ];
  return images[index % images.length];
};

// Generar productos para cada colección
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const fabric = '50% Algodón / 50% Poliéster';

  // Colección Naturaleza - $16,99
  const naturalezaNames = [
    'El Vuelo Global',
    'Aves Migratorias',
    'Bosque Primario',
    'Cascada Natural',
    'Montaña Sagrada',
    'Río Salvaje',
    'Selva Tropical',
    'Océano Infinito',
    'Desierto Vivo',
    'Pradera Verde',
    'Aurora Boreal',
    'Volcán Dormido',
    'Lago Espejo',
    'Cueva Ancestral',
    'Arrecife Coralino',
    'Glaciar Eterno',
    'Duna Dorada',
    'Manglar Protegido',
    'Cañón Profundo',
    'Tundra Ártica',
  ];

  naturalezaNames.forEach((name, index) => {
    products.push({
      id: `naturaleza-${String(index + 1).padStart(3, '0')}`,
      name,
      price: 16.99,
      description: `Camiseta de la Colección Naturaleza. Diseño exclusivo ONIROX que celebra la belleza del mundo natural. ${fabric}.`,
      images: [getImageUrl(index), getImageUrl(index + 1)],
      category: 'Naturaleza',
      fabric,
      availableSizes: sizes,
    });
  });

  // Colección Clima - $17,99
  const climaNames = [
    'El Planeta Arde',
    'Cambio Climático',
    'Temperatura Crítica',
    'Huella de Carbono',
    'Energía Renovable',
    'Capa de Ozono',
    'Efecto Invernadero',
    'Deshielo Polar',
    'Sequía Extrema',
    'Inundación Global',
    'Tormenta Perfecta',
    'Calentamiento Global',
    'Emisiones Cero',
    'Sostenibilidad',
    'Consciencia Verde',
    'Futuro Limpio',
    'Acción Climática',
    'Tierra en Riesgo',
    'Alerta Roja',
    'Última Oportunidad',
  ];

  climaNames.forEach((name, index) => {
    products.push({
      id: `clima-${String(index + 1).padStart(3, '0')}`,
      name,
      price: 17.99,
      description: `Camiseta de la Colección Clima. Mensaje de conciencia ambiental. ${fabric}.`,
      images: [getImageUrl(index + 2), getImageUrl(index + 3)],
      category: 'Clima',
      fabric,
      availableSizes: sizes,
    });
  });

  // Colección Caracas - $17,99
  const caracasNames = [
    'Waraira Repano',
    'Ávila Capital',
    'Caracas 2026',
    'Valle de Caracas',
    'Cerro El Ávila',
    'Distrito Capital',
    'Caracas Urbana',
    'Metrópolis',
    'Santiago de León',
    'Valle Verde',
    'Caracas Nocturna',
    'Plaza Bolívar',
    'Caracas Histórica',
    'Urbe Capital',
    'Caracas Contemporánea',
    'Mirador Ávila',
    'Caracas Viva',
    'Capital Cultural',
    'Caracas Moderna',
    'Esencia Caraqueña',
  ];

  caracasNames.forEach((name, index) => {
    products.push({
      id: `caracas-${String(index + 1).padStart(3, '0')}`,
      name,
      price: 17.99,
      description: `Camiseta de la Colección Caracas. Homenaje a la capital venezolana. ${fabric}.`,
      images: [getImageUrl(index + 4), getImageUrl(index + 5)],
      category: 'Caracas',
      fabric,
      availableSizes: sizes,
    });
  });

  // Colección Selva - $18,99
  const selvaNames = [
    'El Ojo de la Selva',
    'Amazonas Profundo',
    'Selva Virgen',
    'Biodiversidad',
    'Pulmón del Mundo',
    'Selva Amazónica',
    'Flora y Fauna',
    'Ecosistema Único',
    'Selva Tropical',
    'Reserva Natural',
    'Vida Salvaje',
    'Canopy Verde',
    'Selva Húmeda',
    'Río Amazonas',
    'Selva Primaria',
    'Naturaleza Pura',
    'Selva Intacta',
    'Biodiversidad Rica',
    'Selva Protegida',
    'Ecosistema Complejo',
  ];

  selvaNames.forEach((name, index) => {
    products.push({
      id: `selva-${String(index + 1).padStart(3, '0')}`,
      name,
      price: 18.99,
      description: `Camiseta de la Colección Selva. Celebración de la selva amazónica. ${fabric}.`,
      images: [getImageUrl(index + 6), getImageUrl(index + 7)],
      category: 'Selva',
      fabric,
      availableSizes: sizes,
    });
  });

  // Colección Deshielo - $18,99
  const deshieloNames = [
    'Glaciar en Alerta',
    'Polo Norte',
    'Hielo Derretido',
    'Antártida',
    'Nivel del Mar',
    'Glaciar Perdido',
    'Polo Sur',
    'Hielo Eterno',
    'Deshielo Acelerado',
    'Capa de Hielo',
    'Permafrost',
    'Glaciar Retrocede',
    'Hielo Ártico',
    'Deshielo Global',
    'Glaciar en Riesgo',
    'Hielo Desaparece',
    'Polo en Peligro',
    'Glaciar Histórico',
    'Hielo Frágil',
    'Deshielo Inminente',
  ];

  deshieloNames.forEach((name, index) => {
    products.push({
      id: `deshielo-${String(index + 1).padStart(3, '0')}`,
      name,
      price: 18.99,
      description: `Camiseta de la Colección Deshielo. Conciencia sobre el derretimiento de los glaciares. ${fabric}.`,
      images: [getImageUrl(index), getImageUrl(index + 1)],
      category: 'Deshielo',
      fabric,
      availableSizes: sizes,
    });
  });

  // Colección Nativa - $19,99
  const nativaNames = [
    '4 Elementos',
    'Piensa en Verde',
    'Poder 4R',
    'Raíces Nativas',
    'Tierra Ancestral',
    'Cultura Originaria',
    'Sabiduría Nativa',
    'Tradición Viva',
    'Herencia Indígena',
    'Espíritu Nativo',
    'Origen Puro',
    'Cultura Milenaria',
    'Raíces Profundas',
    'Tierra Sagrada',
    'Ancestros',
    'Identidad Nativa',
    'Cultura Autóctona',
    'Raíces Culturales',
    'Herencia Ancestral',
    'Espíritu Originario',
    'Tierra Nativa',
    'Cultura Viva',
  ];

  nativaNames.forEach((name, index) => {
    products.push({
      id: `nativa-${String(index + 1).padStart(3, '0')}`,
      name,
      price: 19.99,
      description: `Camiseta de la Colección Nativa. Celebración de la cultura y tradiciones nativas. ${fabric}.`,
      images: [getImageUrl(index + 2), getImageUrl(index + 3)],
      category: 'Nativa',
      fabric,
      availableSizes: sizes,
    });
  });

  return products;
};

export const allProducts: Product[] = generateProducts();

export const categoryLabels: Record<ProductCategory, string> = {
  Naturaleza: 'Naturaleza',
  Clima: 'Clima',
  Caracas: 'Caracas',
  Selva: 'Selva',
  Deshielo: 'Deshielo',
  Nativa: 'Nativa',
};
