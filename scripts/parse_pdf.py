"""
PDF Parser for ONIROX Product Catalog - "Colores de la Naturaleza"

SINGLE SOURCE OF TRUTH: Este script genera src/data/products.ts
que debe coincidir EXACTAMENTE con la interfaz Product definida en TypeScript.

REGLA DE ORO: Los campos generados deben coincidir con la interfaz Product:
- id, name, price, description, story, images, category, fabric, availableSizes

Este script extrae productos REALES del PDF "Colores de la Naturaleza"
y completa hasta 122 productos usando las colecciones definidas.
"""

import re
import json
import os
from typing import List, Dict, Any, Optional

# RUTA DE SALIDA (Donde Astro buscará los datos)
OUTPUT_FILE = os.path.join('src', 'data', 'products.ts')

# CATEGORÍAS VÁLIDAS (deben coincidir con ProductCategory en TypeScript)
VALID_CATEGORIES = ['Naturaleza', 'Clima', 'Caracas', 'Selva', 'Deshielo', 'Nativa']

# FABRIC ESTÁNDAR
STANDARD_FABRIC = '50% algodón y 50% polyester'

# TALLAS ESTÁNDAR
STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
STANDARD_SIZES_XL_ONLY = ['XS', 'S', 'M', 'L', 'XL']


def detect_category(name: str, description: str, story: str = '') -> str:
    """
    Detecta la categoría basándose en palabras clave del nombre, descripción y story.
    Retorna una categoría válida del tipo ProductCategory.
    """
    text = (name + ' ' + description + ' ' + story).lower()
    
    # Palabras clave por categoría basadas en el PDF real
    keywords = {
        'Naturaleza': ['vuelo global', 'fauna tropical', 'naturaleza', 'aves', 'bosque', 'cascada', 'montaña', 'río', 'océano', 'desierto', 'pradera', 'aurora', 'volcán', 'lago', 'cueva', 'arrecife', 'duna', 'manglar', 'cañón', 'tundra'],
        'Clima': ['planeta arde', 'clima habla', 'planeta en venta', 'cambio climático', 'crisis climática', 'temperatura', 'carbono', 'energía', 'ozono', 'invernadero', 'sequía', 'inundación', 'tormenta', 'calentamiento', 'emisiones', 'sostenibilidad', 'consciencia', 'futuro', 'acción', 'tierra', 'alerta'],
        'Caracas': ['waraira', 'ávila', 'caracas', 'valle', 'cerro', 'distrito', 'urbana', 'metrópolis', 'santiago', 'nocturna', 'plaza', 'histórica', 'urbe', 'contemporánea', 'mirador', 'viva', 'capital', 'moderna', 'esencia', 'caraqueña'],
        'Selva': ['ojo', 'selva', 'amazonas', 'virgen', 'pulmón', 'flora', 'fauna', 'ecosistema', 'tropical', 'reserva', 'salvaje', 'canopy', 'húmeda', 'primaria', 'pura', 'intacta', 'protegida', 'complejo'],
        'Nativa': ['biodiversidad', '4 elementos', 'piensa en verde', 'poder 4r', 'elementos', 'verde', '4r', 'raíces', 'tierra', 'cultura', 'sabiduría', 'tradición', 'herencia', 'indígena', 'espíritu', 'origen', 'milenaria', 'profundas', 'sagrada', 'ancestros', 'identidad', 'autóctona', 'culturales', 'ancestral', 'originario', 'viva', 'reducir', 'reutilizar', 'reciclar', 'recuperar', 'geometrica', 'vida salvaje', 'reino animal'],
        'Deshielo': ['glaciar', 'polo', 'hielo', 'antártida', 'nivel', 'perdido', 'eterno', 'acelerado', 'capa', 'permafrost', 'retrocede', 'ártico', 'global', 'riesgo', 'desaparece', 'peligro', 'histórico', 'frágil', 'inminente', 'alerta', 'víctimas del deshielo'],
    }
    
    # Contar coincidencias por categoría
    category_scores = {}
    for category, words in keywords.items():
        score = sum(1 for word in words if word in text)
        if score > 0:
            category_scores[category] = score
    
    if category_scores:
        # Retornar la categoría con más coincidencias
        return max(category_scores.items(), key=lambda x: x[1])[0]
    
    return 'Naturaleza'  # Default


def parse_sizes(text: str) -> List[str]:
    """
    Parsea las tallas del texto y retorna lista normalizada.
    Detecta "XS, S, M, L y XL" o "XS hasta 3XL"
    """
    text_lower = text.lower()
    
    # Detectar si dice "hasta 3XL" o "a 3XL"
    if 'hasta 3xl' in text_lower or 'a 3xl' in text_lower:
        return STANDARD_SIZES.copy()
    
    # Buscar todas las tallas mencionadas
    size_pattern = r'\b(XS|S|M|L|XL|XXL|3XL)\b'
    found_sizes = re.findall(size_pattern, text, re.IGNORECASE)
    
    if found_sizes:
        # Normalizar a mayúsculas y eliminar duplicados
        normalized = list(set([s.upper() for s in found_sizes]))
        # Ordenar según orden estándar
        size_order = STANDARD_SIZES
        return [size for size in size_order if size in normalized]
    
    # Si no se encuentran tallas, retornar XS a XL por defecto
    return STANDARD_SIZES_XL_ONLY.copy()


def extract_fabric(text: str) -> str:
    """
    Extrae la composición de tela del texto.
    Retorna el formato estándar si no se encuentra.
    """
    # Buscar patrones como "50% algodón y 50% polyester" o variaciones
    fabric_patterns = [
        r'Tela:\s*([^\n|]+)',
        r'(\d+%?\s*algodón\s*(?:y|/)\s*\d+%?\s*polyester)',
        r'(\d+%?\s*algodón\s*(?:y|/)\s*\d+%?\s*poliéster)',
    ]
    
    for pattern in fabric_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            fabric = match.group(1).strip()
            # Limpiar formato (quitar **, *, etc.)
            fabric = re.sub(r'^\*\*?\s*', '', fabric)
            fabric = re.sub(r'\*\*?\s*$', '', fabric)
            # Normalizar formato
            fabric = fabric.replace('poliéster', 'polyester')
            return fabric
    
    return STANDARD_FABRIC


def extract_story(block: str, description: str) -> str:
    """
    Extrae el texto de storytelling (story) del bloque.
    El story es el texto narrativo más largo que describe la filosofía del producto.
    """
    # Dividir por líneas
    lines = [l.strip() for l in block.split('\n') if l.strip()]
    
    # Buscar el bloque entre el precio y "DETALLES:"
    story_parts = []
    found_price = False
    
    for i, line in enumerate(lines):
        # Detectar inicio del story (después del precio)
        if '$' in line:
            found_price = True
            continue
        
        # Si ya encontramos el precio, empezamos a recopilar el story
        if found_price:
            # Detectar fin del story (cuando aparece "DETALLES:")
            if 'DETALLES:' in line.upper() or line.upper().startswith('DETALLES'):
                break
            
            # Excluir líneas que son solo formato, separadores o muy cortas
            if (len(line) > 15 and 
                not re.match(r'^[#\-\s]+$', line) and 
                not line.startswith('COLORES:') and
                not line.startswith('##') and
                line != description):
                story_parts.append(line)
    
    story = ' '.join(story_parts).strip()
    
    # Si el story es muy corto o igual a la descripción, usar la descripción
    if not story or len(story) < 30 or story == description:
        story = description
    
    return story


def parse_products(raw_text: str) -> List[Dict[str, Any]]:
    """
    Parsea el texto del PDF y extrae productos REALES.
    Retorna una lista de diccionarios que coinciden con la interfaz Product.
    """
    products = []
    
    # Dividir por productos usando el patrón "# Nombre" como separador
    product_blocks = re.split(r'\n#\s+', raw_text)
    
    # El primer bloque puede ser vacío o contenido previo, lo saltamos
    if product_blocks and not product_blocks[0].strip().startswith('#'):
        product_blocks = product_blocks[1:]
    
    seen_names = set()  # Para evitar duplicados
    
    for block in product_blocks:
        if not block.strip() or len(block.strip()) < 30:
            continue
        
        # Agregar el "# " que se perdió en el split
        block = '# ' + block
        
        # 1. Extraer Nombre (primera línea después de #)
        lines = [l.strip() for l in block.split('\n') if l.strip()]
        if not lines:
            continue
        
        # El nombre es la primera línea (después de #)
        name_line = lines[0]
        name_match = re.match(r'#\s*(.+)', name_line)
        if not name_match:
            # Intentar sin el #
            name_match = re.match(r'^([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑa-záéíóúñ\s0-9]+?)$', name_line)
        
        if not name_match:
            continue
        
        name = name_match.group(1).strip()
        
        # Limpiar el nombre (quitar # si quedó)
        name = re.sub(r'^#\s*', '', name).strip()
        
        # Evitar duplicados
        if name in seen_names:
            continue
        seen_names.add(name)
        
        # 2. Extraer Precio (buscar línea con $)
        price = 0.0
        price_line_index = -1
        for idx, line in enumerate(lines):
            if '$' in line:
                try:
                    # Convertir "$16,99" o "$16.99" a float
                    price_str = re.sub(r'[^\d,.]', '', line.replace(',', '.'))
                    price_match = re.search(r'[\d.]+', price_str)
                    if price_match:
                        price = float(price_match.group())
                        price_line_index = idx
                        break
                except (ValueError, AttributeError):
                    pass
        
        if price == 0.0:
            continue  # Producto sin precio no es válido
        
        # 3. Extraer Descripción (línea corta después del precio)
        description = ""
        if price_line_index != -1 and price_line_index + 1 < len(lines):
            desc_line = lines[price_line_index + 1]
            # Si la línea siguiente no es un detalle técnico, es la descripción
            if 'Franela:' not in desc_line and 'Tela:' not in desc_line and 'Tallas:' not in desc_line and 'DETALLES' not in desc_line.upper():
                description = desc_line
        
        # Si no hay descripción, crear una genérica
        if not description:
            description = f"Diseño exclusivo de la colección ONIROX 2025."
        
        # 4. Extraer Story (texto narrativo largo)
        story = extract_story(block, description)
        
        # 5. Extraer información técnica
        fabric = extract_fabric(block)
        sizes = parse_sizes(block)
        
        # 6. Detectar Categoría
        category = detect_category(name, description, story)
        
        # Validar que la categoría sea válida
        if category not in VALID_CATEGORIES:
            category = 'Naturaleza'  # Fallback
        
        # Ajustar tallas para productos de "Clima Habla" (deben tener hasta 3XL)
        if category == 'Clima':
            story_lower = story.lower()
            block_lower = block.lower()
            if 'clima habla' in story_lower or 'clima habla' in block_lower:
                # Si no tiene 3XL, agregarlo
                if '3XL' not in sizes:
                    sizes = STANDARD_SIZES.copy()
        
        # Ajustar categoría y tallas para "Biodiversidad Geométrica" (debe estar en Nativa con tallas hasta 3XL)
        if name.lower() == 'biodiversidad geométrica' or 'biodiversidad geométrica' in name.lower():
            category = 'Nativa'
            sizes = STANDARD_SIZES.copy()  # Nativa incluye hasta 3XL
        
        # 7. Generar ID único (slug)
        slug = name.lower()
        # Normalizar caracteres especiales
        slug = slug.replace('ñ', 'n').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'\s+', '-', slug).strip('-')
        
        # 8. Generar imágenes (frente y espalda)
        # Cada producto debe tener al menos 2 imágenes: frente y espalda
        images = [
            f"/images/products/{slug}-frente.jpg",  # Vista frontal
            f"/images/products/{slug}-espalda.jpg"  # Vista trasera
        ]
        
        # 9. Construir producto según interfaz Product (orden exacto)
        product = {
            "id": slug,
            "name": name,
            "price": price,
            "description": description,
            "story": story,
            "category": category,
            "fabric": fabric,
            "availableSizes": sizes,
            "images": images,
        }
        
        products.append(product)
    
    return products


def generate_complete_catalog(extracted_products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Completa el catálogo hasta 122 productos usando las colecciones definidas.
    Usa los productos extraídos del PDF cuando están disponibles.
    """
    # Crear un mapa de productos extraídos por nombre para referencia
    extracted_map = {p['name']: p for p in extracted_products}
    
    all_products = []
    
    # Definir todas las colecciones con sus productos
    collections = {
        'Naturaleza': {
            'price': 16.99,
            'sizes': STANDARD_SIZES_XL_ONLY,
            'products': [
                {'name': 'El Vuelo Global', 'story': 'Vuela con propósito. Un diseño que une la belleza de la fauna tropical con la importancia de nuestro planeta. Ideal para quienes llevan la naturaleza en el corazón, sin fronteras.'},
                {'name': 'Aves Migratorias', 'story': 'Sigue el ritmo de la naturaleza en su constante movimiento.'},
                {'name': 'Bosque Primario', 'story': 'Conecta con la esencia pura de los ecosistemas ancestrales.'},
                {'name': 'Cascada Natural', 'story': 'Fluye con la fuerza y serenidad del agua en su estado más puro.'},
                {'name': 'Montaña Sagrada', 'story': 'Eleva tu espíritu con la majestuosidad de las cumbres eternas.'},
                {'name': 'Río Salvaje', 'story': 'Navega por la corriente de la vida en su forma más libre.'},
                {'name': 'Selva Tropical', 'story': 'Sumérgete en la biodiversidad más rica del planeta.'},
                {'name': 'Océano Infinito', 'story': 'Explora las profundidades de la conciencia marina.'},
                {'name': 'Desierto Vivo', 'story': 'Descubre la vida que florece en la adversidad.'},
                {'name': 'Pradera Verde', 'story': 'Respira la frescura de los campos infinitos.'},
                {'name': 'Aurora Boreal', 'story': 'Déjate iluminar por los colores del cielo polar.'},
                {'name': 'Volcán Dormido', 'story': 'Conecta con la energía latente de la tierra.'},
                {'name': 'Lago Espejo', 'story': 'Refleja la calma y claridad de la naturaleza.'},
                {'name': 'Cueva Ancestral', 'story': 'Explora los secretos guardados por milenios.'},
                {'name': 'Arrecife Coralino', 'story': 'Protege la belleza frágil de los océanos.'},
                {'name': 'Glaciar Eterno', 'story': 'Preserva la memoria helada de nuestro planeta.'},
                {'name': 'Duna Dorada', 'story': 'Camina sobre las olas de arena del tiempo.'},
                {'name': 'Manglar Protegido', 'story': 'Honra los ecosistemas que protegen nuestras costas.'},
                {'name': 'Cañón Profundo', 'story': 'Admira la grandeza tallada por la naturaleza.'},
                {'name': 'Tundra Ártica', 'story': 'Siente la pureza del mundo helado.'},
            ]
        },
        'Clima': {
            'price': 17.99,
            'sizes': STANDARD_SIZES_XL_ONLY,
            'products': [
                {'name': 'El Planeta Arde', 'story': 'Viste tu compromiso con el futuro del planeta. Un diseño potente y directo que enciende el debate y llama a la acción contra la crisis climática.'},
                {'name': 'Cambio Climático', 'story': 'Actúa ahora, el momento es crítico.'},
                {'name': 'Temperatura Crítica', 'story': 'Alerta sobre los límites que estamos cruzando.'},
                {'name': 'Huella de Carbono', 'story': 'Reduce tu impacto, aumenta tu conciencia.'},
                {'name': 'Energía Renovable', 'story': 'El futuro es limpio y sostenible.'},
                {'name': 'Capa de Ozono', 'story': 'Protege lo que nos protege.'},
                {'name': 'Efecto Invernadero', 'story': 'Entiende el calor que generamos.'},
                {'name': 'Deshielo Polar', 'story': 'Siente la urgencia del deshielo acelerado.'},
                {'name': 'Sequía Extrema', 'story': 'Conciencia sobre la escasez de agua.'},
                {'name': 'Inundación Global', 'story': 'El agua reclama su espacio.'},
                {'name': 'Tormenta Perfecta', 'story': 'La naturaleza responde con fuerza.'},
                {'name': 'Calentamiento Global', 'story': 'El planeta se calienta, nosotros también debemos actuar.'},
                {'name': 'Emisiones Cero', 'story': 'El objetivo es claro: cero emisiones.'},
                {'name': 'Sostenibilidad', 'story': 'Vive de forma que el futuro sea posible.'},
                {'name': 'Consciencia Verde', 'story': 'Piensa verde, actúa verde, vive verde.'},
                {'name': 'Futuro Limpio', 'story': 'Construye el futuro que quieres ver.'},
                {'name': 'Acción Climática', 'story': 'No es suficiente preocuparse, hay que actuar.'},
                {'name': 'Tierra en Riesgo', 'story': 'Nuestro hogar está en peligro.'},
                {'name': 'Alerta Roja', 'story': 'El momento de actuar es ahora.'},
                {'name': 'Última Oportunidad', 'story': 'Esta es nuestra última oportunidad.'},
            ]
        },
        'Caracas': {
            'price': 17.99,
            'sizes': STANDARD_SIZES_XL_ONLY,
            'products': [
                {'name': 'Waraira Repano', 'story': 'Tu conexión con la cima, en un diseño minimalista.'},
                {'name': 'Ávila Capital', 'story': 'La montaña que vigila nuestra ciudad.'},
                {'name': 'Caracas 2026', 'story': 'La capital que renace y se transforma.'},
                {'name': 'Valle de Caracas', 'story': 'El valle que acoge nuestra historia.'},
                {'name': 'Cerro El Ávila', 'story': 'El guardián verde de nuestra urbe.'},
                {'name': 'Distrito Capital', 'story': 'El corazón político y cultural de Venezuela.'},
                {'name': 'Caracas Urbana', 'story': 'La ciudad que nunca duerme.'},
                {'name': 'Metrópolis', 'story': 'La gran ciudad que lo tiene todo.'},
                {'name': 'Santiago de León', 'story': 'El nombre histórico de nuestra capital.'},
                {'name': 'Valle Verde', 'story': 'El verde que persiste en la ciudad.'},
                {'name': 'Caracas Nocturna', 'story': 'La ciudad que brilla cuando cae la noche.'},
                {'name': 'Plaza Bolívar', 'story': 'El corazón histórico de la ciudad.'},
                {'name': 'Caracas Histórica', 'story': 'La ciudad que guarda nuestra memoria.'},
                {'name': 'Urbe Capital', 'story': 'La urbe que define nuestra identidad.'},
                {'name': 'Caracas Contemporánea', 'story': 'La ciudad del presente y futuro.'},
                {'name': 'Mirador Ávila', 'story': 'La vista que inspira desde las alturas.'},
                {'name': 'Caracas Viva', 'story': 'La ciudad que late con energía propia.'},
                {'name': 'Capital Cultural', 'story': 'El centro cultural de nuestra nación.'},
                {'name': 'Caracas Moderna', 'story': 'La ciudad que evoluciona constantemente.'},
                {'name': 'Esencia Caraqueña', 'story': 'La esencia única de nuestra capital.'},
            ]
        },
        'Selva': {
            'price': 18.99,
            'sizes': STANDARD_SIZES_XL_ONLY,
            'products': [
                {'name': 'El Ojo de la Selva', 'story': 'Sé indomable. Un diseño inmersivo en tonos de la selva.'},
                # Nota: 'Selva Tropical' está en Naturaleza, no duplicar aquí
                {'name': 'Amazonas Profundo', 'story': 'Explora las profundidades del pulmón del mundo.'},
                {'name': 'Selva Virgen', 'story': 'Conecta con la naturaleza en su estado más puro.'},
                {'name': 'Biodiversidad', 'story': 'Celebra la riqueza de la vida en todas sus formas.'},
                {'name': 'Pulmón del Mundo', 'story': 'Respira la importancia de la selva amazónica.'},
                {'name': 'Selva Amazónica', 'story': 'El ecosistema más diverso del planeta.'},
                {'name': 'Flora y Fauna', 'story': 'La vida en su máxima expresión.'},
                {'name': 'Ecosistema Único', 'story': 'Un mundo único que debemos proteger.'},
                # 'Selva Tropical' está en Naturaleza, no duplicar aquí
                {'name': 'Reserva Natural', 'story': 'Los espacios que preservamos para el futuro.'},
                {'name': 'Vida Salvaje', 'story': 'La naturaleza en su estado más libre.'},
                {'name': 'Canopy Verde', 'story': 'Las alturas verdes que cubren la tierra.'},
                {'name': 'Selva Húmeda', 'story': 'La humedad que da vida a todo.'},
                {'name': 'Río Amazonas', 'story': 'El río que conecta continentes.'},
                {'name': 'Selva Primaria', 'story': 'Los bosques que nunca han sido tocados.'},
                {'name': 'Naturaleza Pura', 'story': 'La esencia sin contaminar.'},
                {'name': 'Selva Intacta', 'story': 'Los ecosistemas que debemos mantener intactos.'},
                {'name': 'Biodiversidad Rica', 'story': 'La riqueza de especies que nos asombra.'},
                {'name': 'Selva Protegida', 'story': 'Los espacios que defendemos.'},
            ]
        },
        'Deshielo': {
            'price': 18.99,
            'sizes': STANDARD_SIZES_XL_ONLY,
            'products': [
                {'name': 'Glaciar en Alerta', 'story': 'Viste con Conciencia. Un diseño sensible y conmovedor que pone el foco en las víctimas del deshielo.'},
                {'name': 'Polo Norte', 'story': 'El extremo norte que se derrite.'},
                {'name': 'Hielo Derretido', 'story': 'El hielo que desaparece nos alerta.'},
                {'name': 'Antártida', 'story': 'El continente helado que debemos proteger.'},
                {'name': 'Nivel del Mar', 'story': 'El mar que sube nos recuerda nuestra responsabilidad.'},
                {'name': 'Glaciar Perdido', 'story': 'Los glaciares que ya no existen.'},
                {'name': 'Polo Sur', 'story': 'El extremo sur en peligro.'},
                {'name': 'Hielo Eterno', 'story': 'El hielo que creíamos eterno.'},
                {'name': 'Deshielo Acelerado', 'story': 'La velocidad del cambio nos preocupa.'},
                {'name': 'Capa de Hielo', 'story': 'La capa que se reduce cada año.'},
                {'name': 'Permafrost', 'story': 'El suelo congelado que se descongela.'},
                {'name': 'Glaciar Retrocede', 'story': 'Los glaciares que retroceden.'},
                {'name': 'Hielo Ártico', 'story': 'El hielo ártico que desaparece.'},
                {'name': 'Deshielo Global', 'story': 'Un fenómeno que afecta a todo el planeta.'},
                {'name': 'Glaciar en Riesgo', 'story': 'Los glaciares que están en peligro.'},
                {'name': 'Hielo Desaparece', 'story': 'El hielo que ya no volverá.'},
                {'name': 'Polo en Peligro', 'story': 'Los polos que necesitan protección.'},
                {'name': 'Glaciar Histórico', 'story': 'La historia que se derrite.'},
                {'name': 'Hielo Frágil', 'story': 'La fragilidad del equilibrio polar.'},
                {'name': 'Deshielo Inminente', 'story': 'El deshielo que no podemos detener.'},
            ]
        },
        'Nativa': {
            'price': 19.99,
            'sizes': STANDARD_SIZES,  # Nativa incluye hasta 3XL
            'products': [
                {'name': 'Biodiversidad Geométrica', 'story': 'El arte de la vida salvaje. Una pieza de diseño vanguardista que enmarca la riqueza del reino animal. Lleva un ecosistema de estilo.'},
                {'name': '4 Elementos', 'story': 'En equilibrio con la naturaleza, nace 4 Elementos, inspirada en la fuerza del agua, la tierra, el fuego y el viento. Está colección simboliza la energía vital que sostiene nuestro planeta: el agua fluye y renueva, la tierra nos da raíces y firmeza, el fuego impulsa la transformación y el viento nos recuerda la libertad del espíritu.'},
                {'name': 'Piensa en Verde', 'story': 'Piensa en Verde, donde un árbol con rostro humano refleja la unión entre la mente y la naturaleza. En esta colección sus ramas y hojas alborotadas son el eco de nuestras ideas, recordándonos que cada pensamiento puede transformarse en vida cuando se orienta hacia el cuidado del planeta.'},
                {'name': 'Poder 4R', 'story': 'El "Poder 4R": Reducir, Reutilizar, Reciclar, Recuperar y Repetir. El verdadero cambio comienza en lo simple: consumir con conciencia, dar nueva vida a lo que tenemos, transformar desechos y rescatar lo que parecía perdido. Esta colección simboliza un ciclo infinito de respeto hacia la Tierra, donde nuestras acciones cotidianas construyen un futuro más justo y sostenible.'},
                {'name': 'Raíces Nativas', 'story': 'Las raíces que nos conectan con la tierra.'},
                {'name': 'Tierra Ancestral', 'story': 'La tierra que guarda nuestra historia.'},
                {'name': 'Cultura Originaria', 'story': 'La cultura que nace de la tierra.'},
                {'name': 'Sabiduría Nativa', 'story': 'La sabiduría de quienes conocen la naturaleza.'},
                {'name': 'Tradición Viva', 'story': 'Las tradiciones que se mantienen vivas.'},
                {'name': 'Herencia Indígena', 'story': 'La herencia que honramos.'},
                {'name': 'Espíritu Nativo', 'story': 'El espíritu que conecta con la naturaleza.'},
                {'name': 'Origen Puro', 'story': 'El origen sin contaminar.'},
                {'name': 'Cultura Milenaria', 'story': 'La cultura que ha perdurado milenios.'},
                {'name': 'Raíces Profundas', 'story': 'Las raíces que van más allá de la superficie.'},
                {'name': 'Tierra Sagrada', 'story': 'La tierra que merece respeto.'},
                {'name': 'Ancestros', 'story': 'Los ancestros que nos guían.'},
                {'name': 'Identidad Nativa', 'story': 'La identidad que nace de la tierra.'},
                {'name': 'Cultura Autóctona', 'story': 'La cultura propia de esta tierra.'},
                {'name': 'Raíces Culturales', 'story': 'Las raíces que definen nuestra cultura.'},
                {'name': 'Herencia Ancestral', 'story': 'La herencia que recibimos.'},
                {'name': 'Espíritu Originario', 'story': 'El espíritu que nace aquí.'},
                {'name': 'Tierra Nativa', 'story': 'La tierra que nos pertenece.'},
                {'name': 'Cultura Viva', 'story': 'La cultura que sigue viva.'},
            ]
        }
    }
    
    # Generar productos para cada colección
    for category, collection_data in collections.items():
        price = collection_data['price']
        sizes = collection_data['sizes']
        
        for index, product_data in enumerate(collection_data['products']):
            name = product_data['name']
            story = product_data['story']
            
            # Si el producto fue extraído del PDF, usar esos datos
            if name in extracted_map:
                # Verificar si es parte de "Clima Habla" y ajustar tallas si es necesario
                extracted_product = extracted_map[name]
                story_text = (extracted_product.get('story', '') + ' ' + extracted_product.get('description', '')).lower()
                # Si menciona "Clima Habla" o tiene tallas hasta 3XL, asegurar que las tallas incluyan hasta 3XL
                if 'clima habla' in story_text or any('3xl' in str(s).lower() for s in extracted_product.get('availableSizes', [])):
                    if '3XL' not in extracted_product['availableSizes']:
                        extracted_product['availableSizes'] = STANDARD_SIZES.copy()
                all_products.append(extracted_product)
                continue
            
            # Determinar tallas: productos de Clima que mencionen "Clima Habla" deben tener hasta 3XL
            product_sizes = sizes.copy()
            if category == 'Clima':
                story_lower = story.lower()
                if 'clima habla' in story_lower:
                    product_sizes = STANDARD_SIZES.copy()
            
            # Generar slug
            slug = name.lower()
            slug = slug.replace('ñ', 'n').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
            slug = re.sub(r'[^a-z0-9\s-]', '', slug)
            slug = re.sub(r'\s+', '-', slug).strip('-')
            
            # Crear descripción corta desde el story
            description = story.split('.')[0] + '.' if '.' in story else story[:100] + '...'
            
            product = {
                "id": slug,
                "name": name,
                "price": price,
                "description": description,
                "story": story,
                "category": category,
                "fabric": STANDARD_FABRIC,
                "availableSizes": product_sizes,
                "images": [
                    f"/images/products/{slug}-frente.jpg",  # Vista frontal
                    f"/images/products/{slug}-espalda.jpg"  # Vista trasera
                ],
            }
            
            all_products.append(product)
    
    return all_products


def generate_ts_file(products: List[Dict[str, Any]]) -> None:
    """
    Genera el archivo TypeScript que exporta allProducts.
    El formato debe coincidir EXACTAMENTE con la interfaz Product.
    """
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Convertir productos a JSON con formato TypeScript
    ts_products = json.dumps(products, indent=2, ensure_ascii=False)
    
    ts_content = f"""/**
 * Product Data Structure for ONIROX E-commerce
 * 
 * SINGLE SOURCE OF TRUTH: Esta interfaz define la estructura definitiva de productos.
 * El script parse_pdf.py genera datos que deben coincidir exactamente con esta interfaz.
 * 
 * REGLA DE ORO: No agregar campos nuevos sin actualizar primero la interfaz y el script.
 * Este archivo es GENERADO AUTOMÁTICAMENTE por scripts/parse_pdf.py
 * NO EDITAR MANUALMENTE - Ejecutar el script para regenerar
 * Fecha de generación: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
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
export interface Product {{
  id: string;
  name: string;
  price: number;
  description: string;
  story: string; // El bloque de storytelling del PDF
  category: ProductCategory;
  fabric: string; // Asegúrate de que se llame 'fabric', no 'fabricType'
  availableSizes: string[];
  images: string[];
}}

/**
 * Todos los productos exportados
 * Este array es generado automáticamente por scripts/parse_pdf.py
 * NO EDITAR MANUALMENTE - Ejecutar el script para regenerar
 * Total: {len(products)} productos
 */
export const allProducts: Product[] = {ts_products};

/**
 * Labels de categorías para UI (títulos exactos de las colecciones principales)
 * 1. El Vuelo Global - Naturaleza
 * 2. El Planeta Arde - Clima
 * 3. Waraira Repano - Caracas
 * 4. El Ojo de la Selva - Selva
 * 5. Glaciar en Alerta - Deshielo
 * 6. Biodiversidad Geométrica - Nativa
 */
export const categoryLabels: Record<ProductCategory, string> = {{
  Naturaleza: 'Vuelo Global',
  Clima: 'Planeta Arde',
  Caracas: 'Waraira Repano',
  Selva: 'Ojo de la Selva',
  Deshielo: 'Glaciar en Alerta',
  Nativa: 'Biodiversidad Geométrica',
}};

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
export function getProductsByCategory(category: ProductCategory): Product[] {{
  return allProducts.filter((product) => product.category === category);
}}

/**
 * Helper: Buscar productos por query
 */
export function searchProducts(query: string): Product[] {{
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.story.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
}}

/**
 * Helper: Obtener producto por ID
 */
export function getProductById(id: string): Product | undefined {{
  return allProducts.find((product) => product.id === id);
}}
"""
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"EXITO! Se generaron {len(products)} productos en {OUTPUT_FILE}")
    print(f"Categorias encontradas: {set(p['category'] for p in products)}")
    print(f"Tallas detectadas: {set(size for p in products for size in p['availableSizes'])}")
    print(f"Precios encontrados: {sorted(set(p['price'] for p in products))}")


if __name__ == "__main__":
    print("Procesando catalogo PDF 'Colores de la Naturaleza'...")
    print("Extrayendo productos REALES segun interfaz Product...")
    
    # Leer el contenido del PDF desde un archivo de texto
    print("\nIntentando leer desde 'catalogo_texto.txt'...")
    
    try:
        with open('catalogo_texto.txt', 'r', encoding='utf-8') as f:
            raw_text = f.read()
        print("Archivo 'catalogo_texto.txt' leido exitosamente")
    except FileNotFoundError:
        print("Archivo 'catalogo_texto.txt' no encontrado")
        print("Usando contenido de ejemplo del PDF...")
        raw_text = """
# El Vuelo Global
## $16,99
Vuela con propósito. Un diseño que une la belleza de la fauna tropical con la importancia de nuestro planeta. Ideal para quienes llevan la naturaleza en el corazón, sin fronteras.
## DETALLES:
- **Franela:** Unisex
- **Marca:** ONIROX
- **Tela:** 50% algodón y 50% polyester
- **Tallas:** XS, S, M, L y XL.

# El Planeta Arde
## $17,99
Viste tu compromiso con el futuro del planeta. Un diseño potente y directo que enciende el debate y llama a la acción contra la crisis climática.
## DETALLES:
- **Franela:** Unisex
- **Marca:** ONIROX
- **Tela:** 50% algodón y 50% polyester
- **Tallas:** XS, S, M, L y XL.

# Glaciar en Alerta
## $18,99
Viste con Conciencia. Un diseño sensible y conmovedor que pone el foco en las víctimas del deshielo.
## DETALLES:
- **Franela:** Unisex
- **Marca:** ONIROX
- **Tela:** 50% algodón y 50% polyester
- **Tallas:** XS, S, M, L y XL.

# Biodiversidad Geométrica
## $18,99
El arte de la vida salvaje. Una pieza de diseño vanguardista que enmarca la riqueza del reino animal. Lleva un ecosistema de estilo.
## DETALLES:
- **Franela:** Unisex
- **Marca:** ONIROX
- **Tela:** 50% algodón y 50% polyester
- **Tallas:** XS, S, M, L y XL.

# Clima Habla
## $16,99
En la actualidad surge el "Clima Habla", inspirada en los cambios drásticos que hoy enfrenta el planeta. Cada diseño refleja las huellas visibles del cambio climático. Está colección muestra una serie de 9 eventos climáticos y un planeta con rostro serio, dividido entre una mitad colorida y otra desvanecida, recordándonos a observar lo que el clima nos está diciendo: cuidar, valorar y actuar con conciencia.
## DETALLES:
- Franela: Unisex
- Marca: ONIROX
- Tela: 50% algodón y 50% polyester
- Tallas: XS hasta 3XL

# Planeta en Venta
## $18,99
Planeta en Venta, una reflexión sobre el consumo y el valor de nuestra Tierra. Para esta colección aparece colgado en un gancho como si fuera una prenda más, recordándonos que la naturaleza no tiene precio y que sus consecuencias no pueden comprarse ni venderse. La Tierra envuelta en plástico simboliza la forma en que consumimos, usamos y desechamos.
## DETALLES:
- Franela: Unisex
- Marca: ONIROX
- Tela: 50% algodón y 50% polyester
- Tallas: XS hasta 3XL

# 4 Elementos
## $19,99
En equilibrio con la naturaleza, nace 4 Elementos, inspirada en la fuerza del agua, la tierra, el fuego y el viento. Está colección simboliza la energía vital que sostiene nuestro planeta: el agua fluye y renueva, la tierra nos da raíces y firmeza, el fuego impulsa la transformación y el viento nos recuerda la libertad del espíritu.
## DETALLES:
- Franela: Unisex
- Marca: ONIROX
- Tela: 50% algodón y 50% polyester
- Tallas: XS hasta 3XL

# Piensa en Verde
## $19,99
Piensa en Verde, donde un árbol con rostro humano refleja la unión entre la mente y la naturaleza. En esta colección sus ramas y hojas alborotadas son el eco de nuestras ideas, recordándonos que cada pensamiento puede transformarse en vida cuando se orienta hacia el cuidado del planeta.
## DETALLES:
- Franela: Unisex
- Marca: ONIROX
- Tela: 50% algodón y 50% polyester
- Tallas: XS hasta 3XL

# Poder 4R
## $19,99
El "Poder 4R": Reducir, Reutilizar, Reciclar, Recuperar y Repetir. El verdadero cambio comienza en lo simple: consumir con conciencia, dar nueva vida a lo que tenemos, transformar desechos y rescatar lo que parecía perdido. Esta colección simboliza un ciclo infinito de respeto hacia la Tierra, donde nuestras acciones cotidianas construyen un futuro más justo y sostenible.
## DETALLES:
- Franela: Unisex
- Marca: ONIROX
- Tela: 50% algodón y 50% polyester
- Tallas: XS hasta 3XL
"""
    
    # Extraer productos del PDF
    extracted = parse_products(raw_text)
    print(f"Productos extraidos del PDF: {len(extracted)}")
    
    # Completar hasta 122 productos
    all_products = generate_complete_catalog(extracted)
    
    if not all_products:
        print("No se encontraron productos. Verifica el formato del texto.")
    else:
        generate_ts_file(all_products)
        print("Proceso completado exitosamente!")
        print(f"\nResumen:")
        print(f"  - Total productos: {len(all_products)}")
        print(f"  - Del PDF: {len(extracted)}")
        print(f"  - Generados: {len(all_products) - len(extracted)}")
