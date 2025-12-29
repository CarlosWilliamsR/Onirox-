import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems } from '../store/cartStore';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
  onCartOpen: () => void;
}

export default function MobileMenu({ isOpen, onClose, onSearchOpen, onCartOpen }: MobileMenuProps) {
  const items = useStore(cartItems);
  const cartCount = Object.values(items).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (!isOpen) return null;

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/20 dark:bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed left-0 top-0 bottom-0 z-[101] w-[85vw] sm:w-[75vw] max-w-md bg-white dark:bg-[#0a0a0a] shadow-large animate-slide-in overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-zinc-200/50 dark:border-zinc-800/50">
            <span className="text-2xl sm:text-3xl font-ultrabold text-black dark:text-white tracking-tight">ONIROX</span>
            <button
              onClick={onClose}
              className="p-2.5 text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-all duration-200 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 active:scale-95"
              aria-label="Cerrar menú"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-6 sm:p-8 border-b border-zinc-200/50 dark:border-zinc-800/50 space-y-3">
            <button
              onClick={() => handleAction(onSearchOpen)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95"
            >
              <svg
                className="w-6 h-6 text-black dark:text-white"
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
              <span className="font-extrabold text-black dark:text-white text-base uppercase tracking-wider">Buscar</span>
            </button>

            <button
              onClick={() => handleAction(onCartOpen)}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-black dark:text-white"
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
                <span className="font-extrabold text-black dark:text-white text-base uppercase tracking-wider">Carrito</span>
              </div>
              {cartCount > 0 && (
                <span className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black text-xs font-extrabold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-black dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="font-extrabold text-black dark:text-white text-base uppercase tracking-wider">Tema</span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-6 sm:px-8 py-8">
            <ul className="space-y-6">
              <li className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <a
                  href="/"
                  onClick={onClose}
                  className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300 block tracking-tight"
                >
                  INICIO
                </a>
              </li>
              <li className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <a
                  href="#coleccion"
                  onClick={onClose}
                  className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300 block tracking-tight"
                >
                  LA COLECCIÓN
                </a>
              </li>
              <li className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a
                  href="#about"
                  onClick={onClose}
                  className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300 block tracking-tight"
                >
                  SOBRE NOSOTROS
                </a>
              </li>
              <li className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300 block tracking-tight"
                >
                  CONTACTO
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}



