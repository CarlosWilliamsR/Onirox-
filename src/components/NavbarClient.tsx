import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems } from '../store/cartStore';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';

export default function NavbarClient() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useStore(cartItems);
  const cartCount = Object.values(items).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: Hamburger Menu (Mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-black hover:text-zinc-600 transition-colors"
                aria-label="Abrir menú"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <a
                href="/"
                className="text-3xl md:text-4xl font-ultrabold text-black uppercase tracking-tight hover:text-zinc-600 transition-colors"
              >
                ONIROX
              </a>
            </div>

            {/* Right: Search & Cart */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-black hover:text-zinc-600 transition-colors"
                aria-label="Buscar"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-black hover:text-zinc-600 transition-colors"
                aria-label="Carrito"
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-black text-white text-xs font-extrabold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}



