import { useStore } from '@nanostores/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  cartItems,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from '../store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useStore(cartItems);
  const itemsArray = Object.entries(items);
  const total = getCartTotal();
  const prefersReducedMotion = useReducedMotion();

  const drawerVariants = {
    hidden: {
      x: '100%',
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[420px] bg-white dark:bg-[#0a0a0a] z-[95] shadow-2xl flex flex-col"
          >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-zinc-200/50 dark:border-zinc-800/50">
            <h2 className="text-2xl font-extrabold text-black dark:text-white tracking-tight">CARRITO</h2>
            <button
              onClick={onClose}
              className="p-2.5 text-black hover:text-zinc-600 transition-all duration-200 rounded-lg hover:bg-zinc-100/50 active:scale-95"
              aria-label="Cerrar carrito"
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

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-8">
            {itemsArray.length === 0 ? (
              <div className="text-center py-16 animate-fade-in-up">
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-base">Tu carrito está vacío</p>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-black text-white font-extrabold uppercase tracking-wider hover:bg-zinc-900 transition-all duration-300 rounded-full hover:scale-105 active:scale-95"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {itemsArray.map(([key, item], index) => (
                  <motion.div 
                    key={key} 
                    variants={itemVariants}
                    className="flex gap-4 pb-6 border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0"
                  >
                    <img
                      src={item.image || '/images/products/placeholder.svg'}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-soft"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/products/placeholder.svg';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-extrabold text-black dark:text-white text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                        Talla: {item.size}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(key, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border-2 border-zinc-300 hover:border-black transition-all duration-200 rounded-full text-black active:scale-95"
                            aria-label="Reducir cantidad"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="text-base font-extrabold text-black w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(key, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border-2 border-zinc-300 hover:border-black transition-all duration-200 rounded-full text-black active:scale-95"
                            aria-label="Aumentar cantidad"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-black dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(key)}
                            className="text-xs font-extrabold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mt-2 transition-all duration-200 hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {itemsArray.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-t border-zinc-200/50 dark:border-zinc-800/50 p-8 space-y-6 bg-zinc-50/30 dark:bg-zinc-900/30"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-extrabold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">TOTAL</span>
                <span className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full py-5 bg-black text-white font-extrabold uppercase tracking-wider hover:bg-zinc-900 transition-all duration-300 rounded-full hover:scale-[1.02] active:scale-95 shadow-medium"
                onClick={() => {
                  // Generar mensaje de WhatsApp
                  const itemsList = itemsArray
                    .map(([key, item]) => {
                      return `• ${item.name} - Talla: ${item.size} x${item.quantity}`;
                    })
                    .join('\n');
                  
                  const message = `¡Hola ONIROX! Quiero comprar:\n\n${itemsList}\n\nTotal: $${total.toFixed(2)}.`;
                  
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/584126057234?text=${encodedMessage}`;
                  
                  window.open(whatsappUrl, '_blank');
                }}
              >
                FINALIZAR PEDIDO POR WHATSAPP
              </button>
            </motion.div>
          )}
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

