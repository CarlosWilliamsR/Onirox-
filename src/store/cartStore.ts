/**
 * Cart Store with LocalStorage Persistence
 * 
 * SINGLE SOURCE OF TRUTH: Este store maneja todo el estado del carrito.
 * 
 * Architecture Decisions:
 * 1. Usa Nano Stores para estado reactivo
 * 2. Persiste en LocalStorage para sobrevivir a refrescos de página
 * 3. Hydration-safe: Solo accede a window después de verificar typeof window !== 'undefined'
 * 4. Previene errores de SSR/hydration en Astro
 */

import { map, computed } from 'nanostores';

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

/**
 * Storage key para LocalStorage
 */
const CART_STORAGE_KEY = 'onirox-cart';

/**
 * Store principal del carrito
 * Inicializado vacío para evitar hydration mismatch
 */
export const cartItems = map<Record<string, CartItem>>({});

/**
 * Flag de hidratación para prevenir SSR/client mismatch
 */
let isHydrated = false;

/**
 * Inicializar carrito desde LocalStorage
 * Solo se ejecuta en el cliente después de la hidratación
 * Architecture Decision: Separar inicialización de definición previene hydration errors
 */
function initializeCart(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, CartItem>;
      // Validar estructura antes de establecer
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        cartItems.set(parsed);
      }
    }
  } catch (error) {
    console.error('Error loading cart from LocalStorage:', error);
    // Limpiar datos corruptos
    localStorage.removeItem(CART_STORAGE_KEY);
  } finally {
    isHydrated = true;
  }
}

/**
 * Persistir carrito en LocalStorage
 * Architecture Decision: Solo persiste después de hidratación para evitar errores
 */
function persistCart(): void {
  if (typeof window === 'undefined' || !isHydrated) return;
  
  try {
    const current = cartItems.get();
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(current));
  } catch (error) {
    console.error('Error saving cart to LocalStorage:', error);
    // Manejar errores de quota gracefully
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded, cart not persisted');
    }
  }
}

/**
 * Suscribirse a cambios del carrito y persistir
 * Architecture Decision: Single subscription point para toda la lógica de persistencia
 */
cartItems.subscribe(() => {
  persistCart();
});

/**
 * Inicializar en el cliente
 * Architecture Decision: Usa requestIdleCallback para inicialización no bloqueante
 */
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initializeCart);
  } else {
    // Fallback para navegadores sin requestIdleCallback
    setTimeout(initializeCart, 0);
  }
}

/**
 * Añadir item al carrito
 * Architecture Decision: Incrementa cantidad si el item ya existe
 */
export function addToCart(
  productId: string,
  size: string,
  price: number,
  name: string,
  image: string
): void {
  const key = `${productId}-${size}`;
  const current = cartItems.get();
  const existing = current[key];

  if (existing) {
    cartItems.setKey(key, {
      ...existing,
      quantity: existing.quantity + 1,
    });
  } else {
    cartItems.setKey(key, {
      productId,
      size,
      quantity: 1,
      price,
      name,
      image,
    });
  }
}

/**
 * Remover item del carrito
 */
export function removeFromCart(key: string): void {
  const current = cartItems.get();
  const { [key]: removed, ...rest } = current;
  cartItems.set(rest);
}

/**
 * Actualizar cantidad de item
 * Architecture Decision: Remueve automáticamente si cantidad <= 0
 */
export function updateQuantity(key: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(key);
    return;
  }
  const current = cartItems.get();
  const item = current[key];
  if (item) {
    cartItems.setKey(key, {
      ...item,
      quantity,
    });
  }
}

/**
 * Computed store para contar items del carrito
 * Architecture Decision: Computed stores son reactivos y eficientes
 */
export const cartItemCount = computed(cartItems, (items) => {
  return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
});

/**
 * Computed store para total del carrito
 * Architecture Decision: Separado del count para mejor performance
 */
export const cartTotal = computed(cartItems, (items) => {
  return Object.values(items).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

/**
 * Funciones legacy para compatibilidad hacia atrás
 * Architecture Decision: Mantiene API compatible mientras usa computed stores internamente
 */
export function getCartItemCount(): number {
  return cartItemCount.get();
}

export function getCartTotal(): number {
  return cartTotal.get();
}

/**
 * Limpiar todo el carrito
 */
export function clearCart(): void {
  cartItems.set({});
}

/**
 * Obtener items del carrito como array
 * Útil para iteración en componentes
 */
export function getCartItemsArray(): CartItem[] {
  return Object.values(cartItems.get());
}

/**
 * Verificar si el carrito está vacío
 */
export function isCartEmpty(): boolean {
  return Object.keys(cartItems.get()).length === 0;
}
