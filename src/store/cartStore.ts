import { atom, map } from 'nanostores';

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export const cartItems = map<Record<string, CartItem>>({});

export function addToCart(
  productId: string,
  size: string,
  price: number,
  name: string,
  image: string
) {
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

export function removeFromCart(key: string) {
  const current = cartItems.get();
  const { [key]: removed, ...rest } = current;
  cartItems.set(rest);
}

export function updateQuantity(key: string, quantity: number) {
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

export function getCartItemCount(): number {
  const items = cartItems.get();
  return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): number {
  const items = cartItems.get();
  return Object.values(items).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

export function clearCart() {
  cartItems.set({});
}




