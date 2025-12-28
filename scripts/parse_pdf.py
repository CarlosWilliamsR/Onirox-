import re
import json
import os

# RUTA DE SALIDA (Donde Astro buscará los datos)
OUTPUT_FILE = os.path.join('src', 'data', 'products.ts')

# AQUÍ PEGAS EL TEXTO DE TU PDF CUANDO TENGAS UNA COLECCIÓN NUEVA
# He precargado los datos que vimos en tu PDF para que funcione YA.
RAW_PDF_CONTENT = """
El Vuelo Global
$16,99
Vuela con propósito. Un diseño que une la belleza de la fauna tropical.
Franela: Unisex | Tela: 50% algodón y 50% polyester | Tallas: XS, S, M, L y XL.

El Planeta Arde
$17,99
Viste tu compromiso con el futuro del planeta.
Franela: Unisex | Tela: 50% algodón y 50% polyester | Tallas: XS, S, M, L y XL.

Waraira Repano
$17,99
Tu conexión con la cima, en un diseño minimalista.
Franela: Unisex | Tela: 50% algodón y 50% polyester | Tallas: XS, S, M, L y XL.

El Ojo de la Selva
$18,99
Sé indomable. Un diseño inmersivo en tonos de la selva.
Franela: Unisex | Tela: 50% algodón y 50% polyester | Tallas: XS, S, M, L y XL.

Glaciar en Alerta
$18,99
Viste con Conciencia. Un diseño sensible y conmovedor.
Franela: Unisex | Tela: 50% algodón y 50% polyester | Tallas: XS, S, M, L y XL.

Biodiversidad Geométrica
$18,99
El arte de la vida salvaje.
Franela: Unisex | Tela: 50% algodón y 50% polyester | Tallas: XS, S, M, L y XL.
"""

def parse_products(text):
    products = []
    # Dividimos por bloques de texto (doble salto de línea suele separar productos)
    blocks = text.strip().split('\n\n')
    
    for i, block in enumerate(blocks):
        lines = [l.strip() for l in block.split('\n') if l.strip()]
        if len(lines) < 2: continue

        # 1. Detectar Nombre
        name = lines[0]
        
        # 2. Detectar Precio (busca el símbolo $)
        price = 0.0
        price_line_index = -1
        for idx, line in enumerate(lines):
            if '$' in line:
                try:
                    # Convierte "$16,99" a float 16.99
                    price_str = line.replace('$', '').replace(',', '.').strip()
                    price = float(re.findall(r"[\d\.]+", price_str)[0])
                    price_line_index = idx
                    break
                except:
                    pass
        
        # 3. Detectar Descripción (la línea debajo del precio)
        description = "Colección exclusiva ONIROX 2025"
        if price_line_index != -1 and price_line_index + 1 < len(lines):
            description = lines[price_line_index + 1]

        # 4. Categoría basada en nombre
        category = "Estampados"
        if "Waraira" in name: category = "Caracas"
        elif "Planeta" in name or "Glaciar" in name: category = "Conciencia"
        
        # ID único seguro
        slug = name.lower().replace(' ', '-').replace('ñ', 'n')

        products.append({
            "id": slug,
            "name": name,
            "price": price,
            "description": description,
            "category": category,
            "fabricType": "50% Algodón / 50% Poliéster",
            "availableSizes": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
            "images": [f"/images/products/{slug}.jpg"], # Asume que la foto se llama igual
            "colors": ["#000000", "#FFFFFF", "#808080", "#1D4ED8", "#B91C1C"] # Colores por defecto
        })
            
    return products

def generate_ts_file(products):
    # Asegurar que el directorio data existe
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    ts_content = f"""
// ARCHIVO GENERADO AUTOMÁTICAMENTE POR scripts/parse_pdf.py
// NO EDITAR MANUALMENTE SI VAS A VOLVER A CORRER EL SCRIPT

export interface Product {{
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  fabricType: string;
  availableSizes: string[];
  images: string[];
  colors: string[];
}}

export const products: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"✅ ¡ÉXITO! Se generaron {len(products)} productos en {OUTPUT_FILE}")

if __name__ == "__main__":
    print("🔄 Procesando catálogo...")
    data = parse_products(RAW_PDF_CONTENT)
    generate_ts_file(data)