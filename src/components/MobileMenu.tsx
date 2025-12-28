import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <span className="text-2xl font-ultrabold text-black">ONIROX</span>
          <button
            onClick={onClose}
            className="p-2 text-black hover:text-zinc-600 transition-colors"
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

        {/* Menu Items */}
        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-6">
            <li>
              <a
                href="#coleccion"
                onClick={onClose}
                className="text-2xl font-extrabold text-black hover:text-zinc-600 transition-colors block"
              >
                LA COLECCIÓN
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={onClose}
                className="text-2xl font-extrabold text-black hover:text-zinc-600 transition-colors block"
              >
                SOBRE NOSOTROS
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={onClose}
                className="text-2xl font-extrabold text-black hover:text-zinc-600 transition-colors block"
              >
                CONTACTO
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}



