/**
 * Product Data Structure for ONIROX E-commerce
 * 
 * SINGLE SOURCE OF TRUTH: Esta interfaz define la estructura definitiva de productos.
 * El script parse_pdf.py genera datos que deben coincidir exactamente con esta interfaz.
 * 
 * REGLA DE ORO: No agregar campos nuevos sin actualizar primero la interfaz y el script.
 * Este archivo es GENERADO AUTOMÁTICAMENTE por scripts/parse_pdf.py
 * NO EDITAR MANUALMENTE - Ejecutar el script para regenerar
 * Fecha de generación: 2025-12-28 19:17:44
 */

export type ProductCategory = 
  | 'Naturaleza' 
  | 'Clima' 
  | 'Caracas' 
  | 'Selva' 
  | 'Deshielo' 
  | 'Nativa';

/**
 * Interfaz Product definitiva
 * Todos los campos son requeridos y deben estar presentes en los datos generados por parse_pdf.py
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  story: string; // El bloque de storytelling del PDF
  category: ProductCategory;
  fabric: string; // Asegúrate de que se llame 'fabric', no 'fabricType'
  availableSizes: string[];
  images: string[];
}

/**
 * Todos los productos exportados
 * Este array es generado automáticamente por scripts/parse_pdf.py
 * NO EDITAR MANUALMENTE - Ejecutar el script para regenerar
 * Total: 121 productos
 */
export const allProducts: Product[] = [
  {
    "id": "el-vuelo-global",
    "name": "El Vuelo Global",
    "price": 16.99,
    "description": "Vuela con propósito. Un diseño que une la belleza de la fauna tropical con la importancia de nuestro planeta. Ideal para quienes llevan la naturaleza en el corazón, sin fronteras.",
    "story": "Vuela con propósito. Un diseño que une la belleza de la fauna tropical con la importancia de nuestro planeta. Ideal para quienes llevan la naturaleza en el corazón, sin fronteras.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/el-vuelo-global-frente.jpg",
      "/images/products/el-vuelo-global-espalda.jpg"
    ]
  },
  {
    "id": "aves-migratorias",
    "name": "Aves Migratorias",
    "price": 16.99,
    "description": "Sigue el ritmo de la naturaleza en su constante movimiento.",
    "story": "Sigue el ritmo de la naturaleza en su constante movimiento.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/aves-migratorias-frente.jpg",
      "/images/products/aves-migratorias-espalda.jpg"
    ]
  },
  {
    "id": "bosque-primario",
    "name": "Bosque Primario",
    "price": 16.99,
    "description": "Conecta con la esencia pura de los ecosistemas ancestrales.",
    "story": "Conecta con la esencia pura de los ecosistemas ancestrales.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/bosque-primario-frente.jpg",
      "/images/products/bosque-primario-espalda.jpg"
    ]
  },
  {
    "id": "cascada-natural",
    "name": "Cascada Natural",
    "price": 16.99,
    "description": "Fluye con la fuerza y serenidad del agua en su estado más puro.",
    "story": "Fluye con la fuerza y serenidad del agua en su estado más puro.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/cascada-natural-frente.jpg",
      "/images/products/cascada-natural-espalda.jpg"
    ]
  },
  {
    "id": "montana-sagrada",
    "name": "Montaña Sagrada",
    "price": 16.99,
    "description": "Eleva tu espíritu con la majestuosidad de las cumbres eternas.",
    "story": "Eleva tu espíritu con la majestuosidad de las cumbres eternas.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/montana-sagrada-frente.jpg",
      "/images/products/montana-sagrada-espalda.jpg"
    ]
  },
  {
    "id": "rio-salvaje",
    "name": "Río Salvaje",
    "price": 16.99,
    "description": "Navega por la corriente de la vida en su forma más libre.",
    "story": "Navega por la corriente de la vida en su forma más libre.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/rio-salvaje-frente.jpg",
      "/images/products/rio-salvaje-espalda.jpg"
    ]
  },
  {
    "id": "selva-tropical",
    "name": "Selva Tropical",
    "price": 16.99,
    "description": "Sumérgete en la biodiversidad más rica del planeta.",
    "story": "Sumérgete en la biodiversidad más rica del planeta.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-tropical-frente.jpg",
      "/images/products/selva-tropical-espalda.jpg"
    ]
  },
  {
    "id": "oceano-infinito",
    "name": "Océano Infinito",
    "price": 16.99,
    "description": "Explora las profundidades de la conciencia marina.",
    "story": "Explora las profundidades de la conciencia marina.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/oceano-infinito-frente.jpg",
      "/images/products/oceano-infinito-espalda.jpg"
    ]
  },
  {
    "id": "desierto-vivo",
    "name": "Desierto Vivo",
    "price": 16.99,
    "description": "Descubre la vida que florece en la adversidad.",
    "story": "Descubre la vida que florece en la adversidad.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/desierto-vivo-frente.jpg",
      "/images/products/desierto-vivo-espalda.jpg"
    ]
  },
  {
    "id": "pradera-verde",
    "name": "Pradera Verde",
    "price": 16.99,
    "description": "Respira la frescura de los campos infinitos.",
    "story": "Respira la frescura de los campos infinitos.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/pradera-verde-frente.jpg",
      "/images/products/pradera-verde-espalda.jpg"
    ]
  },
  {
    "id": "aurora-boreal",
    "name": "Aurora Boreal",
    "price": 16.99,
    "description": "Déjate iluminar por los colores del cielo polar.",
    "story": "Déjate iluminar por los colores del cielo polar.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/aurora-boreal-frente.jpg",
      "/images/products/aurora-boreal-espalda.jpg"
    ]
  },
  {
    "id": "volcan-dormido",
    "name": "Volcán Dormido",
    "price": 16.99,
    "description": "Conecta con la energía latente de la tierra.",
    "story": "Conecta con la energía latente de la tierra.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/volcan-dormido-frente.jpg",
      "/images/products/volcan-dormido-espalda.jpg"
    ]
  },
  {
    "id": "lago-espejo",
    "name": "Lago Espejo",
    "price": 16.99,
    "description": "Refleja la calma y claridad de la naturaleza.",
    "story": "Refleja la calma y claridad de la naturaleza.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/lago-espejo-frente.jpg",
      "/images/products/lago-espejo-espalda.jpg"
    ]
  },
  {
    "id": "cueva-ancestral",
    "name": "Cueva Ancestral",
    "price": 16.99,
    "description": "Explora los secretos guardados por milenios.",
    "story": "Explora los secretos guardados por milenios.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/cueva-ancestral-frente.jpg",
      "/images/products/cueva-ancestral-espalda.jpg"
    ]
  },
  {
    "id": "arrecife-coralino",
    "name": "Arrecife Coralino",
    "price": 16.99,
    "description": "Protege la belleza frágil de los océanos.",
    "story": "Protege la belleza frágil de los océanos.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/arrecife-coralino-frente.jpg",
      "/images/products/arrecife-coralino-espalda.jpg"
    ]
  },
  {
    "id": "glaciar-eterno",
    "name": "Glaciar Eterno",
    "price": 16.99,
    "description": "Preserva la memoria helada de nuestro planeta.",
    "story": "Preserva la memoria helada de nuestro planeta.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/glaciar-eterno-frente.jpg",
      "/images/products/glaciar-eterno-espalda.jpg"
    ]
  },
  {
    "id": "duna-dorada",
    "name": "Duna Dorada",
    "price": 16.99,
    "description": "Camina sobre las olas de arena del tiempo.",
    "story": "Camina sobre las olas de arena del tiempo.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/duna-dorada-frente.jpg",
      "/images/products/duna-dorada-espalda.jpg"
    ]
  },
  {
    "id": "manglar-protegido",
    "name": "Manglar Protegido",
    "price": 16.99,
    "description": "Honra los ecosistemas que protegen nuestras costas.",
    "story": "Honra los ecosistemas que protegen nuestras costas.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/manglar-protegido-frente.jpg",
      "/images/products/manglar-protegido-espalda.jpg"
    ]
  },
  {
    "id": "canon-profundo",
    "name": "Cañón Profundo",
    "price": 16.99,
    "description": "Admira la grandeza tallada por la naturaleza.",
    "story": "Admira la grandeza tallada por la naturaleza.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/canon-profundo-frente.jpg",
      "/images/products/canon-profundo-espalda.jpg"
    ]
  },
  {
    "id": "tundra-artica",
    "name": "Tundra Ártica",
    "price": 16.99,
    "description": "Siente la pureza del mundo helado.",
    "story": "Siente la pureza del mundo helado.",
    "category": "Naturaleza",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/tundra-artica-frente.jpg",
      "/images/products/tundra-artica-espalda.jpg"
    ]
  },
  {
    "id": "el-planeta-arde",
    "name": "El Planeta Arde",
    "price": 17.99,
    "description": "Viste tu compromiso con el futuro del planeta. Un diseño potente y directo que enciende el debate y llama a la acción contra la crisis climática.",
    "story": "Viste tu compromiso con el futuro del planeta. Un diseño potente y directo que enciende el debate y llama a la acción contra la crisis climática.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/el-planeta-arde-frente.jpg",
      "/images/products/el-planeta-arde-espalda.jpg"
    ]
  },
  {
    "id": "cambio-climatico",
    "name": "Cambio Climático",
    "price": 17.99,
    "description": "Actúa ahora, el momento es crítico.",
    "story": "Actúa ahora, el momento es crítico.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/cambio-climatico-frente.jpg",
      "/images/products/cambio-climatico-espalda.jpg"
    ]
  },
  {
    "id": "temperatura-critica",
    "name": "Temperatura Crítica",
    "price": 17.99,
    "description": "Alerta sobre los límites que estamos cruzando.",
    "story": "Alerta sobre los límites que estamos cruzando.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/temperatura-critica-frente.jpg",
      "/images/products/temperatura-critica-espalda.jpg"
    ]
  },
  {
    "id": "huella-de-carbono",
    "name": "Huella de Carbono",
    "price": 17.99,
    "description": "Reduce tu impacto, aumenta tu conciencia.",
    "story": "Reduce tu impacto, aumenta tu conciencia.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/huella-de-carbono-frente.jpg",
      "/images/products/huella-de-carbono-espalda.jpg"
    ]
  },
  {
    "id": "energia-renovable",
    "name": "Energía Renovable",
    "price": 17.99,
    "description": "El futuro es limpio y sostenible.",
    "story": "El futuro es limpio y sostenible.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/energia-renovable-frente.jpg",
      "/images/products/energia-renovable-espalda.jpg"
    ]
  },
  {
    "id": "capa-de-ozono",
    "name": "Capa de Ozono",
    "price": 17.99,
    "description": "Protege lo que nos protege.",
    "story": "Protege lo que nos protege.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/capa-de-ozono-frente.jpg",
      "/images/products/capa-de-ozono-espalda.jpg"
    ]
  },
  {
    "id": "efecto-invernadero",
    "name": "Efecto Invernadero",
    "price": 17.99,
    "description": "Entiende el calor que generamos.",
    "story": "Entiende el calor que generamos.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/efecto-invernadero-frente.jpg",
      "/images/products/efecto-invernadero-espalda.jpg"
    ]
  },
  {
    "id": "deshielo-polar",
    "name": "Deshielo Polar",
    "price": 17.99,
    "description": "Siente la urgencia del deshielo acelerado.",
    "story": "Siente la urgencia del deshielo acelerado.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/deshielo-polar-frente.jpg",
      "/images/products/deshielo-polar-espalda.jpg"
    ]
  },
  {
    "id": "sequia-extrema",
    "name": "Sequía Extrema",
    "price": 17.99,
    "description": "Conciencia sobre la escasez de agua.",
    "story": "Conciencia sobre la escasez de agua.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/sequia-extrema-frente.jpg",
      "/images/products/sequia-extrema-espalda.jpg"
    ]
  },
  {
    "id": "inundacion-global",
    "name": "Inundación Global",
    "price": 17.99,
    "description": "El agua reclama su espacio.",
    "story": "El agua reclama su espacio.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/inundacion-global-frente.jpg",
      "/images/products/inundacion-global-espalda.jpg"
    ]
  },
  {
    "id": "tormenta-perfecta",
    "name": "Tormenta Perfecta",
    "price": 17.99,
    "description": "La naturaleza responde con fuerza.",
    "story": "La naturaleza responde con fuerza.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/tormenta-perfecta-frente.jpg",
      "/images/products/tormenta-perfecta-espalda.jpg"
    ]
  },
  {
    "id": "calentamiento-global",
    "name": "Calentamiento Global",
    "price": 17.99,
    "description": "El planeta se calienta, nosotros también debemos actuar.",
    "story": "El planeta se calienta, nosotros también debemos actuar.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/calentamiento-global-frente.jpg",
      "/images/products/calentamiento-global-espalda.jpg"
    ]
  },
  {
    "id": "emisiones-cero",
    "name": "Emisiones Cero",
    "price": 17.99,
    "description": "El objetivo es claro: cero emisiones.",
    "story": "El objetivo es claro: cero emisiones.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/emisiones-cero-frente.jpg",
      "/images/products/emisiones-cero-espalda.jpg"
    ]
  },
  {
    "id": "sostenibilidad",
    "name": "Sostenibilidad",
    "price": 17.99,
    "description": "Vive de forma que el futuro sea posible.",
    "story": "Vive de forma que el futuro sea posible.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/sostenibilidad-frente.jpg",
      "/images/products/sostenibilidad-espalda.jpg"
    ]
  },
  {
    "id": "consciencia-verde",
    "name": "Consciencia Verde",
    "price": 17.99,
    "description": "Piensa verde, actúa verde, vive verde.",
    "story": "Piensa verde, actúa verde, vive verde.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/consciencia-verde-frente.jpg",
      "/images/products/consciencia-verde-espalda.jpg"
    ]
  },
  {
    "id": "futuro-limpio",
    "name": "Futuro Limpio",
    "price": 17.99,
    "description": "Construye el futuro que quieres ver.",
    "story": "Construye el futuro que quieres ver.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/futuro-limpio-frente.jpg",
      "/images/products/futuro-limpio-espalda.jpg"
    ]
  },
  {
    "id": "accion-climatica",
    "name": "Acción Climática",
    "price": 17.99,
    "description": "No es suficiente preocuparse, hay que actuar.",
    "story": "No es suficiente preocuparse, hay que actuar.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/accion-climatica-frente.jpg",
      "/images/products/accion-climatica-espalda.jpg"
    ]
  },
  {
    "id": "tierra-en-riesgo",
    "name": "Tierra en Riesgo",
    "price": 17.99,
    "description": "Nuestro hogar está en peligro.",
    "story": "Nuestro hogar está en peligro.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/tierra-en-riesgo-frente.jpg",
      "/images/products/tierra-en-riesgo-espalda.jpg"
    ]
  },
  {
    "id": "alerta-roja",
    "name": "Alerta Roja",
    "price": 17.99,
    "description": "El momento de actuar es ahora.",
    "story": "El momento de actuar es ahora.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/alerta-roja-frente.jpg",
      "/images/products/alerta-roja-espalda.jpg"
    ]
  },
  {
    "id": "ultima-oportunidad",
    "name": "Última Oportunidad",
    "price": 17.99,
    "description": "Esta es nuestra última oportunidad.",
    "story": "Esta es nuestra última oportunidad.",
    "category": "Clima",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/ultima-oportunidad-frente.jpg",
      "/images/products/ultima-oportunidad-espalda.jpg"
    ]
  },
  {
    "id": "waraira-repano",
    "name": "Waraira Repano",
    "price": 17.99,
    "description": "Tu conexión con la cima, en un diseño minimalista.",
    "story": "Tu conexión con la cima, en un diseño minimalista.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/waraira-repano-frente.jpg",
      "/images/products/waraira-repano-espalda.jpg"
    ]
  },
  {
    "id": "avila-capital",
    "name": "Ávila Capital",
    "price": 17.99,
    "description": "La montaña que vigila nuestra ciudad.",
    "story": "La montaña que vigila nuestra ciudad.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/avila-capital-frente.jpg",
      "/images/products/avila-capital-espalda.jpg"
    ]
  },
  {
    "id": "caracas-2026",
    "name": "Caracas 2026",
    "price": 17.99,
    "description": "La capital que renace y se transforma.",
    "story": "La capital que renace y se transforma.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-2026-frente.jpg",
      "/images/products/caracas-2026-espalda.jpg"
    ]
  },
  {
    "id": "valle-de-caracas",
    "name": "Valle de Caracas",
    "price": 17.99,
    "description": "El valle que acoge nuestra historia.",
    "story": "El valle que acoge nuestra historia.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/valle-de-caracas-frente.jpg",
      "/images/products/valle-de-caracas-espalda.jpg"
    ]
  },
  {
    "id": "cerro-el-avila",
    "name": "Cerro El Ávila",
    "price": 17.99,
    "description": "El guardián verde de nuestra urbe.",
    "story": "El guardián verde de nuestra urbe.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/cerro-el-avila-frente.jpg",
      "/images/products/cerro-el-avila-espalda.jpg"
    ]
  },
  {
    "id": "distrito-capital",
    "name": "Distrito Capital",
    "price": 17.99,
    "description": "El corazón político y cultural de Venezuela.",
    "story": "El corazón político y cultural de Venezuela.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/distrito-capital-frente.jpg",
      "/images/products/distrito-capital-espalda.jpg"
    ]
  },
  {
    "id": "caracas-urbana",
    "name": "Caracas Urbana",
    "price": 17.99,
    "description": "La ciudad que nunca duerme.",
    "story": "La ciudad que nunca duerme.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-urbana-frente.jpg",
      "/images/products/caracas-urbana-espalda.jpg"
    ]
  },
  {
    "id": "metropolis",
    "name": "Metrópolis",
    "price": 17.99,
    "description": "La gran ciudad que lo tiene todo.",
    "story": "La gran ciudad que lo tiene todo.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/metropolis-frente.jpg",
      "/images/products/metropolis-espalda.jpg"
    ]
  },
  {
    "id": "santiago-de-leon",
    "name": "Santiago de León",
    "price": 17.99,
    "description": "El nombre histórico de nuestra capital.",
    "story": "El nombre histórico de nuestra capital.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/santiago-de-leon-frente.jpg",
      "/images/products/santiago-de-leon-espalda.jpg"
    ]
  },
  {
    "id": "valle-verde",
    "name": "Valle Verde",
    "price": 17.99,
    "description": "El verde que persiste en la ciudad.",
    "story": "El verde que persiste en la ciudad.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/valle-verde-frente.jpg",
      "/images/products/valle-verde-espalda.jpg"
    ]
  },
  {
    "id": "caracas-nocturna",
    "name": "Caracas Nocturna",
    "price": 17.99,
    "description": "La ciudad que brilla cuando cae la noche.",
    "story": "La ciudad que brilla cuando cae la noche.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-nocturna-frente.jpg",
      "/images/products/caracas-nocturna-espalda.jpg"
    ]
  },
  {
    "id": "plaza-bolivar",
    "name": "Plaza Bolívar",
    "price": 17.99,
    "description": "El corazón histórico de la ciudad.",
    "story": "El corazón histórico de la ciudad.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/plaza-bolivar-frente.jpg",
      "/images/products/plaza-bolivar-espalda.jpg"
    ]
  },
  {
    "id": "caracas-historica",
    "name": "Caracas Histórica",
    "price": 17.99,
    "description": "La ciudad que guarda nuestra memoria.",
    "story": "La ciudad que guarda nuestra memoria.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-historica-frente.jpg",
      "/images/products/caracas-historica-espalda.jpg"
    ]
  },
  {
    "id": "urbe-capital",
    "name": "Urbe Capital",
    "price": 17.99,
    "description": "La urbe que define nuestra identidad.",
    "story": "La urbe que define nuestra identidad.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/urbe-capital-frente.jpg",
      "/images/products/urbe-capital-espalda.jpg"
    ]
  },
  {
    "id": "caracas-contemporanea",
    "name": "Caracas Contemporánea",
    "price": 17.99,
    "description": "La ciudad del presente y futuro.",
    "story": "La ciudad del presente y futuro.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-contemporanea-frente.jpg",
      "/images/products/caracas-contemporanea-espalda.jpg"
    ]
  },
  {
    "id": "mirador-avila",
    "name": "Mirador Ávila",
    "price": 17.99,
    "description": "La vista que inspira desde las alturas.",
    "story": "La vista que inspira desde las alturas.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/mirador-avila-frente.jpg",
      "/images/products/mirador-avila-espalda.jpg"
    ]
  },
  {
    "id": "caracas-viva",
    "name": "Caracas Viva",
    "price": 17.99,
    "description": "La ciudad que late con energía propia.",
    "story": "La ciudad que late con energía propia.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-viva-frente.jpg",
      "/images/products/caracas-viva-espalda.jpg"
    ]
  },
  {
    "id": "capital-cultural",
    "name": "Capital Cultural",
    "price": 17.99,
    "description": "El centro cultural de nuestra nación.",
    "story": "El centro cultural de nuestra nación.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/capital-cultural-frente.jpg",
      "/images/products/capital-cultural-espalda.jpg"
    ]
  },
  {
    "id": "caracas-moderna",
    "name": "Caracas Moderna",
    "price": 17.99,
    "description": "La ciudad que evoluciona constantemente.",
    "story": "La ciudad que evoluciona constantemente.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/caracas-moderna-frente.jpg",
      "/images/products/caracas-moderna-espalda.jpg"
    ]
  },
  {
    "id": "esencia-caraquena",
    "name": "Esencia Caraqueña",
    "price": 17.99,
    "description": "La esencia única de nuestra capital.",
    "story": "La esencia única de nuestra capital.",
    "category": "Caracas",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/esencia-caraquena-frente.jpg",
      "/images/products/esencia-caraquena-espalda.jpg"
    ]
  },
  {
    "id": "el-ojo-de-la-selva",
    "name": "El Ojo de la Selva",
    "price": 18.99,
    "description": "Sé indomable.",
    "story": "Sé indomable. Un diseño inmersivo en tonos de la selva.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/el-ojo-de-la-selva-frente.jpg",
      "/images/products/el-ojo-de-la-selva-espalda.jpg"
    ]
  },
  {
    "id": "amazonas-profundo",
    "name": "Amazonas Profundo",
    "price": 18.99,
    "description": "Explora las profundidades del pulmón del mundo.",
    "story": "Explora las profundidades del pulmón del mundo.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/amazonas-profundo-frente.jpg",
      "/images/products/amazonas-profundo-espalda.jpg"
    ]
  },
  {
    "id": "selva-virgen",
    "name": "Selva Virgen",
    "price": 18.99,
    "description": "Conecta con la naturaleza en su estado más puro.",
    "story": "Conecta con la naturaleza en su estado más puro.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-virgen-frente.jpg",
      "/images/products/selva-virgen-espalda.jpg"
    ]
  },
  {
    "id": "biodiversidad",
    "name": "Biodiversidad",
    "price": 18.99,
    "description": "Celebra la riqueza de la vida en todas sus formas.",
    "story": "Celebra la riqueza de la vida en todas sus formas.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/biodiversidad-frente.jpg",
      "/images/products/biodiversidad-espalda.jpg"
    ]
  },
  {
    "id": "pulmon-del-mundo",
    "name": "Pulmón del Mundo",
    "price": 18.99,
    "description": "Respira la importancia de la selva amazónica.",
    "story": "Respira la importancia de la selva amazónica.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/pulmon-del-mundo-frente.jpg",
      "/images/products/pulmon-del-mundo-espalda.jpg"
    ]
  },
  {
    "id": "selva-amazonica",
    "name": "Selva Amazónica",
    "price": 18.99,
    "description": "El ecosistema más diverso del planeta.",
    "story": "El ecosistema más diverso del planeta.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-amazonica-frente.jpg",
      "/images/products/selva-amazonica-espalda.jpg"
    ]
  },
  {
    "id": "flora-y-fauna",
    "name": "Flora y Fauna",
    "price": 18.99,
    "description": "La vida en su máxima expresión.",
    "story": "La vida en su máxima expresión.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/flora-y-fauna-frente.jpg",
      "/images/products/flora-y-fauna-espalda.jpg"
    ]
  },
  {
    "id": "ecosistema-unico",
    "name": "Ecosistema Único",
    "price": 18.99,
    "description": "Un mundo único que debemos proteger.",
    "story": "Un mundo único que debemos proteger.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/ecosistema-unico-frente.jpg",
      "/images/products/ecosistema-unico-espalda.jpg"
    ]
  },
  {
    "id": "reserva-natural",
    "name": "Reserva Natural",
    "price": 18.99,
    "description": "Los espacios que preservamos para el futuro.",
    "story": "Los espacios que preservamos para el futuro.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/reserva-natural-frente.jpg",
      "/images/products/reserva-natural-espalda.jpg"
    ]
  },
  {
    "id": "vida-salvaje",
    "name": "Vida Salvaje",
    "price": 18.99,
    "description": "La naturaleza en su estado más libre.",
    "story": "La naturaleza en su estado más libre.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/vida-salvaje-frente.jpg",
      "/images/products/vida-salvaje-espalda.jpg"
    ]
  },
  {
    "id": "canopy-verde",
    "name": "Canopy Verde",
    "price": 18.99,
    "description": "Las alturas verdes que cubren la tierra.",
    "story": "Las alturas verdes que cubren la tierra.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/canopy-verde-frente.jpg",
      "/images/products/canopy-verde-espalda.jpg"
    ]
  },
  {
    "id": "selva-humeda",
    "name": "Selva Húmeda",
    "price": 18.99,
    "description": "La humedad que da vida a todo.",
    "story": "La humedad que da vida a todo.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-humeda-frente.jpg",
      "/images/products/selva-humeda-espalda.jpg"
    ]
  },
  {
    "id": "rio-amazonas",
    "name": "Río Amazonas",
    "price": 18.99,
    "description": "El río que conecta continentes.",
    "story": "El río que conecta continentes.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/rio-amazonas-frente.jpg",
      "/images/products/rio-amazonas-espalda.jpg"
    ]
  },
  {
    "id": "selva-primaria",
    "name": "Selva Primaria",
    "price": 18.99,
    "description": "Los bosques que nunca han sido tocados.",
    "story": "Los bosques que nunca han sido tocados.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-primaria-frente.jpg",
      "/images/products/selva-primaria-espalda.jpg"
    ]
  },
  {
    "id": "naturaleza-pura",
    "name": "Naturaleza Pura",
    "price": 18.99,
    "description": "La esencia sin contaminar.",
    "story": "La esencia sin contaminar.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/naturaleza-pura-frente.jpg",
      "/images/products/naturaleza-pura-espalda.jpg"
    ]
  },
  {
    "id": "selva-intacta",
    "name": "Selva Intacta",
    "price": 18.99,
    "description": "Los ecosistemas que debemos mantener intactos.",
    "story": "Los ecosistemas que debemos mantener intactos.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-intacta-frente.jpg",
      "/images/products/selva-intacta-espalda.jpg"
    ]
  },
  {
    "id": "biodiversidad-rica",
    "name": "Biodiversidad Rica",
    "price": 18.99,
    "description": "La riqueza de especies que nos asombra.",
    "story": "La riqueza de especies que nos asombra.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/biodiversidad-rica-frente.jpg",
      "/images/products/biodiversidad-rica-espalda.jpg"
    ]
  },
  {
    "id": "selva-protegida",
    "name": "Selva Protegida",
    "price": 18.99,
    "description": "Los espacios que defendemos.",
    "story": "Los espacios que defendemos.",
    "category": "Selva",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/selva-protegida-frente.jpg",
      "/images/products/selva-protegida-espalda.jpg"
    ]
  },
  {
    "id": "glaciar-en-alerta",
    "name": "Glaciar en Alerta",
    "price": 18.99,
    "description": "Viste con Conciencia. Un diseño sensible y conmovedor que pone el foco en las víctimas del deshielo.",
    "story": "Viste con Conciencia. Un diseño sensible y conmovedor que pone el foco en las víctimas del deshielo.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/glaciar-en-alerta-frente.jpg",
      "/images/products/glaciar-en-alerta-espalda.jpg"
    ]
  },
  {
    "id": "polo-norte",
    "name": "Polo Norte",
    "price": 18.99,
    "description": "El extremo norte que se derrite.",
    "story": "El extremo norte que se derrite.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/polo-norte-frente.jpg",
      "/images/products/polo-norte-espalda.jpg"
    ]
  },
  {
    "id": "hielo-derretido",
    "name": "Hielo Derretido",
    "price": 18.99,
    "description": "El hielo que desaparece nos alerta.",
    "story": "El hielo que desaparece nos alerta.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/hielo-derretido-frente.jpg",
      "/images/products/hielo-derretido-espalda.jpg"
    ]
  },
  {
    "id": "antartida",
    "name": "Antártida",
    "price": 18.99,
    "description": "El continente helado que debemos proteger.",
    "story": "El continente helado que debemos proteger.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/antartida-frente.jpg",
      "/images/products/antartida-espalda.jpg"
    ]
  },
  {
    "id": "nivel-del-mar",
    "name": "Nivel del Mar",
    "price": 18.99,
    "description": "El mar que sube nos recuerda nuestra responsabilidad.",
    "story": "El mar que sube nos recuerda nuestra responsabilidad.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/nivel-del-mar-frente.jpg",
      "/images/products/nivel-del-mar-espalda.jpg"
    ]
  },
  {
    "id": "glaciar-perdido",
    "name": "Glaciar Perdido",
    "price": 18.99,
    "description": "Los glaciares que ya no existen.",
    "story": "Los glaciares que ya no existen.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/glaciar-perdido-frente.jpg",
      "/images/products/glaciar-perdido-espalda.jpg"
    ]
  },
  {
    "id": "polo-sur",
    "name": "Polo Sur",
    "price": 18.99,
    "description": "El extremo sur en peligro.",
    "story": "El extremo sur en peligro.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/polo-sur-frente.jpg",
      "/images/products/polo-sur-espalda.jpg"
    ]
  },
  {
    "id": "hielo-eterno",
    "name": "Hielo Eterno",
    "price": 18.99,
    "description": "El hielo que creíamos eterno.",
    "story": "El hielo que creíamos eterno.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/hielo-eterno-frente.jpg",
      "/images/products/hielo-eterno-espalda.jpg"
    ]
  },
  {
    "id": "deshielo-acelerado",
    "name": "Deshielo Acelerado",
    "price": 18.99,
    "description": "La velocidad del cambio nos preocupa.",
    "story": "La velocidad del cambio nos preocupa.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/deshielo-acelerado-frente.jpg",
      "/images/products/deshielo-acelerado-espalda.jpg"
    ]
  },
  {
    "id": "capa-de-hielo",
    "name": "Capa de Hielo",
    "price": 18.99,
    "description": "La capa que se reduce cada año.",
    "story": "La capa que se reduce cada año.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/capa-de-hielo-frente.jpg",
      "/images/products/capa-de-hielo-espalda.jpg"
    ]
  },
  {
    "id": "permafrost",
    "name": "Permafrost",
    "price": 18.99,
    "description": "El suelo congelado que se descongela.",
    "story": "El suelo congelado que se descongela.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/permafrost-frente.jpg",
      "/images/products/permafrost-espalda.jpg"
    ]
  },
  {
    "id": "glaciar-retrocede",
    "name": "Glaciar Retrocede",
    "price": 18.99,
    "description": "Los glaciares que retroceden.",
    "story": "Los glaciares que retroceden.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/glaciar-retrocede-frente.jpg",
      "/images/products/glaciar-retrocede-espalda.jpg"
    ]
  },
  {
    "id": "hielo-artico",
    "name": "Hielo Ártico",
    "price": 18.99,
    "description": "El hielo ártico que desaparece.",
    "story": "El hielo ártico que desaparece.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/hielo-artico-frente.jpg",
      "/images/products/hielo-artico-espalda.jpg"
    ]
  },
  {
    "id": "deshielo-global",
    "name": "Deshielo Global",
    "price": 18.99,
    "description": "Un fenómeno que afecta a todo el planeta.",
    "story": "Un fenómeno que afecta a todo el planeta.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/deshielo-global-frente.jpg",
      "/images/products/deshielo-global-espalda.jpg"
    ]
  },
  {
    "id": "glaciar-en-riesgo",
    "name": "Glaciar en Riesgo",
    "price": 18.99,
    "description": "Los glaciares que están en peligro.",
    "story": "Los glaciares que están en peligro.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/glaciar-en-riesgo-frente.jpg",
      "/images/products/glaciar-en-riesgo-espalda.jpg"
    ]
  },
  {
    "id": "hielo-desaparece",
    "name": "Hielo Desaparece",
    "price": 18.99,
    "description": "El hielo que ya no volverá.",
    "story": "El hielo que ya no volverá.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/hielo-desaparece-frente.jpg",
      "/images/products/hielo-desaparece-espalda.jpg"
    ]
  },
  {
    "id": "polo-en-peligro",
    "name": "Polo en Peligro",
    "price": 18.99,
    "description": "Los polos que necesitan protección.",
    "story": "Los polos que necesitan protección.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/polo-en-peligro-frente.jpg",
      "/images/products/polo-en-peligro-espalda.jpg"
    ]
  },
  {
    "id": "glaciar-historico",
    "name": "Glaciar Histórico",
    "price": 18.99,
    "description": "La historia que se derrite.",
    "story": "La historia que se derrite.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/glaciar-historico-frente.jpg",
      "/images/products/glaciar-historico-espalda.jpg"
    ]
  },
  {
    "id": "hielo-fragil",
    "name": "Hielo Frágil",
    "price": 18.99,
    "description": "La fragilidad del equilibrio polar.",
    "story": "La fragilidad del equilibrio polar.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/hielo-fragil-frente.jpg",
      "/images/products/hielo-fragil-espalda.jpg"
    ]
  },
  {
    "id": "deshielo-inminente",
    "name": "Deshielo Inminente",
    "price": 18.99,
    "description": "El deshielo que no podemos detener.",
    "story": "El deshielo que no podemos detener.",
    "category": "Deshielo",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "/images/products/deshielo-inminente-frente.jpg",
      "/images/products/deshielo-inminente-espalda.jpg"
    ]
  },
  {
    "id": "biodiversidad-geometrica",
    "name": "Biodiversidad Geométrica",
    "price": 18.99,
    "description": "El arte de la vida salvaje. Una pieza de diseño vanguardista que enmarca la riqueza del reino animal. Lleva un ecosistema de estilo.",
    "story": "El arte de la vida salvaje. Una pieza de diseño vanguardista que enmarca la riqueza del reino animal. Lleva un ecosistema de estilo.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/biodiversidad-geometrica-frente.jpg",
      "/images/products/biodiversidad-geometrica-espalda.jpg"
    ]
  },
  {
    "id": "4-elementos",
    "name": "4 Elementos",
    "price": 19.99,
    "description": "En equilibrio con la naturaleza, nace 4 Elementos, inspirada en la fuerza del agua, la tierra, el fuego y el viento. Está colección simboliza la energía vital que sostiene nuestro planeta: el agua fluye y renueva, la tierra nos da raíces y firmeza, el fuego impulsa la transformación y el viento nos recuerda la libertad del espíritu.",
    "story": "En equilibrio con la naturaleza, nace 4 Elementos, inspirada en la fuerza del agua, la tierra, el fuego y el viento. Está colección simboliza la energía vital que sostiene nuestro planeta: el agua fluye y renueva, la tierra nos da raíces y firmeza, el fuego impulsa la transformación y el viento nos recuerda la libertad del espíritu.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/4-elementos-frente.jpg",
      "/images/products/4-elementos-espalda.jpg"
    ]
  },
  {
    "id": "piensa-en-verde",
    "name": "Piensa en Verde",
    "price": 19.99,
    "description": "Piensa en Verde, donde un árbol con rostro humano refleja la unión entre la mente y la naturaleza. En esta colección sus ramas y hojas alborotadas son el eco de nuestras ideas, recordándonos que cada pensamiento puede transformarse en vida cuando se orienta hacia el cuidado del planeta.",
    "story": "Piensa en Verde, donde un árbol con rostro humano refleja la unión entre la mente y la naturaleza. En esta colección sus ramas y hojas alborotadas son el eco de nuestras ideas, recordándonos que cada pensamiento puede transformarse en vida cuando se orienta hacia el cuidado del planeta.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/piensa-en-verde-frente.jpg",
      "/images/products/piensa-en-verde-espalda.jpg"
    ]
  },
  {
    "id": "poder-4r",
    "name": "Poder 4R",
    "price": 19.99,
    "description": "El \"Poder 4R\": Reducir, Reutilizar, Reciclar, Recuperar y Repetir. El verdadero cambio comienza en lo simple: consumir con conciencia, dar nueva vida a lo que tenemos, transformar desechos y rescatar lo que parecía perdido. Esta colección simboliza un ciclo infinito de respeto hacia la Tierra, donde nuestras acciones cotidianas construyen un futuro más justo y sostenible.",
    "story": "El \"Poder 4R\": Reducir, Reutilizar, Reciclar, Recuperar y Repetir. El verdadero cambio comienza en lo simple: consumir con conciencia, dar nueva vida a lo que tenemos, transformar desechos y rescatar lo que parecía perdido. Esta colección simboliza un ciclo infinito de respeto hacia la Tierra, donde nuestras acciones cotidianas construyen un futuro más justo y sostenible.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/poder-4r-frente.jpg",
      "/images/products/poder-4r-espalda.jpg"
    ]
  },
  {
    "id": "raices-nativas",
    "name": "Raíces Nativas",
    "price": 19.99,
    "description": "Las raíces que nos conectan con la tierra.",
    "story": "Las raíces que nos conectan con la tierra.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/raices-nativas-frente.jpg",
      "/images/products/raices-nativas-espalda.jpg"
    ]
  },
  {
    "id": "tierra-ancestral",
    "name": "Tierra Ancestral",
    "price": 19.99,
    "description": "La tierra que guarda nuestra historia.",
    "story": "La tierra que guarda nuestra historia.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/tierra-ancestral-frente.jpg",
      "/images/products/tierra-ancestral-espalda.jpg"
    ]
  },
  {
    "id": "cultura-originaria",
    "name": "Cultura Originaria",
    "price": 19.99,
    "description": "La cultura que nace de la tierra.",
    "story": "La cultura que nace de la tierra.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/cultura-originaria-frente.jpg",
      "/images/products/cultura-originaria-espalda.jpg"
    ]
  },
  {
    "id": "sabiduria-nativa",
    "name": "Sabiduría Nativa",
    "price": 19.99,
    "description": "La sabiduría de quienes conocen la naturaleza.",
    "story": "La sabiduría de quienes conocen la naturaleza.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/sabiduria-nativa-frente.jpg",
      "/images/products/sabiduria-nativa-espalda.jpg"
    ]
  },
  {
    "id": "tradicion-viva",
    "name": "Tradición Viva",
    "price": 19.99,
    "description": "Las tradiciones que se mantienen vivas.",
    "story": "Las tradiciones que se mantienen vivas.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/tradicion-viva-frente.jpg",
      "/images/products/tradicion-viva-espalda.jpg"
    ]
  },
  {
    "id": "herencia-indigena",
    "name": "Herencia Indígena",
    "price": 19.99,
    "description": "La herencia que honramos.",
    "story": "La herencia que honramos.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/herencia-indigena-frente.jpg",
      "/images/products/herencia-indigena-espalda.jpg"
    ]
  },
  {
    "id": "espiritu-nativo",
    "name": "Espíritu Nativo",
    "price": 19.99,
    "description": "El espíritu que conecta con la naturaleza.",
    "story": "El espíritu que conecta con la naturaleza.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/espiritu-nativo-frente.jpg",
      "/images/products/espiritu-nativo-espalda.jpg"
    ]
  },
  {
    "id": "origen-puro",
    "name": "Origen Puro",
    "price": 19.99,
    "description": "El origen sin contaminar.",
    "story": "El origen sin contaminar.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/origen-puro-frente.jpg",
      "/images/products/origen-puro-espalda.jpg"
    ]
  },
  {
    "id": "cultura-milenaria",
    "name": "Cultura Milenaria",
    "price": 19.99,
    "description": "La cultura que ha perdurado milenios.",
    "story": "La cultura que ha perdurado milenios.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/cultura-milenaria-frente.jpg",
      "/images/products/cultura-milenaria-espalda.jpg"
    ]
  },
  {
    "id": "raices-profundas",
    "name": "Raíces Profundas",
    "price": 19.99,
    "description": "Las raíces que van más allá de la superficie.",
    "story": "Las raíces que van más allá de la superficie.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/raices-profundas-frente.jpg",
      "/images/products/raices-profundas-espalda.jpg"
    ]
  },
  {
    "id": "tierra-sagrada",
    "name": "Tierra Sagrada",
    "price": 19.99,
    "description": "La tierra que merece respeto.",
    "story": "La tierra que merece respeto.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/tierra-sagrada-frente.jpg",
      "/images/products/tierra-sagrada-espalda.jpg"
    ]
  },
  {
    "id": "ancestros",
    "name": "Ancestros",
    "price": 19.99,
    "description": "Los ancestros que nos guían.",
    "story": "Los ancestros que nos guían.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/ancestros-frente.jpg",
      "/images/products/ancestros-espalda.jpg"
    ]
  },
  {
    "id": "identidad-nativa",
    "name": "Identidad Nativa",
    "price": 19.99,
    "description": "La identidad que nace de la tierra.",
    "story": "La identidad que nace de la tierra.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/identidad-nativa-frente.jpg",
      "/images/products/identidad-nativa-espalda.jpg"
    ]
  },
  {
    "id": "cultura-autoctona",
    "name": "Cultura Autóctona",
    "price": 19.99,
    "description": "La cultura propia de esta tierra.",
    "story": "La cultura propia de esta tierra.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/cultura-autoctona-frente.jpg",
      "/images/products/cultura-autoctona-espalda.jpg"
    ]
  },
  {
    "id": "raices-culturales",
    "name": "Raíces Culturales",
    "price": 19.99,
    "description": "Las raíces que definen nuestra cultura.",
    "story": "Las raíces que definen nuestra cultura.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/raices-culturales-frente.jpg",
      "/images/products/raices-culturales-espalda.jpg"
    ]
  },
  {
    "id": "herencia-ancestral",
    "name": "Herencia Ancestral",
    "price": 19.99,
    "description": "La herencia que recibimos.",
    "story": "La herencia que recibimos.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/herencia-ancestral-frente.jpg",
      "/images/products/herencia-ancestral-espalda.jpg"
    ]
  },
  {
    "id": "espiritu-originario",
    "name": "Espíritu Originario",
    "price": 19.99,
    "description": "El espíritu que nace aquí.",
    "story": "El espíritu que nace aquí.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/espiritu-originario-frente.jpg",
      "/images/products/espiritu-originario-espalda.jpg"
    ]
  },
  {
    "id": "tierra-nativa",
    "name": "Tierra Nativa",
    "price": 19.99,
    "description": "La tierra que nos pertenece.",
    "story": "La tierra que nos pertenece.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/tierra-nativa-frente.jpg",
      "/images/products/tierra-nativa-espalda.jpg"
    ]
  },
  {
    "id": "cultura-viva",
    "name": "Cultura Viva",
    "price": 19.99,
    "description": "La cultura que sigue viva.",
    "story": "La cultura que sigue viva.",
    "category": "Nativa",
    "fabric": "50% algodón y 50% polyester",
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "images": [
      "/images/products/cultura-viva-frente.jpg",
      "/images/products/cultura-viva-espalda.jpg"
    ]
  }
];

/**
 * Labels de categorías para UI (títulos exactos de las colecciones principales)
 * 1. El Vuelo Global - Naturaleza
 * 2. El Planeta Arde - Clima
 * 3. Waraira Repano - Caracas
 * 4. El Ojo de la Selva - Selva
 * 5. Glaciar en Alerta - Deshielo
 * 6. Biodiversidad Geométrica - Nativa
 */
export const categoryLabels: Record<ProductCategory, string> = {
  Naturaleza: 'Vuelo Global',
  Clima: 'Planeta Arde',
  Caracas: 'Waraira Repano',
  Selva: 'Ojo de la Selva',
  Deshielo: 'Glaciar en Alerta',
  Nativa: 'Biodiversidad Geométrica',
};

// Orden de categorías para mostrar en filtros (según orden de colecciones)
export const categoryOrder: ProductCategory[] = [
  'Naturaleza',  // 1. El Vuelo Global
  'Clima',       // 2. El Planeta Arde
  'Caracas',     // 3. Waraira Repano
  'Selva',       // 4. El Ojo de la Selva
  'Deshielo',    // 5. Glaciar en Alerta
  'Nativa',      // 6. Biodiversidad Geométrica
];

/**
 * Helper: Obtener productos por categoría
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter((product) => product.category === category);
}

/**
 * Helper: Buscar productos por query
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.story.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Helper: Obtener producto por ID
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}
