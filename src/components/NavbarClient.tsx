import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import { cartItems } from '../store/cartStore';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import CartNotification from './CartNotification';

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
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-zinc-200/30 dark:border-zinc-800/30 h-16 sm:h-20 transition-all duration-500 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0a0a0a]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Left: Hamburger Menu (Mobile & Tablet) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 sm:p-2.5 text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-all duration-200 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 active:scale-95"
                aria-label="Abrir menú"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <a
                href="/"
                className="text-2xl sm:text-3xl md:text-4xl font-ultrabold text-black dark:text-white uppercase tracking-[-0.02em] hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300 hover:scale-[1.02] inline-block"
              >
                ONIROX
              </a>
            </div>

            {/* Right: Desktop Actions - Theme Toggle, Search & Cart */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-all duration-200 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 active:scale-95"
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
                className="relative p-2.5 text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-all duration-200 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 active:scale-95"
                aria-label="Carrito"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-200 hover:scale-110"
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
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 15,
                    }}
                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-soft"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
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
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <CartNotification />
    </>
  );
}



