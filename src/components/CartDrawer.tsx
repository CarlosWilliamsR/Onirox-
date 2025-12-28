import { useStore } from '@nanostores/react';
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[90]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-[95] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200">
            <h2 className="text-xl font-extrabold text-black">CARRITO</h2>
            <button
              onClick={onClose}
              className="p-2 text-black hover:text-zinc-600 transition-colors"
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
          <div className="flex-1 overflow-y-auto p-6">
            {itemsArray.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-600 mb-4">Tu carrito está vacío</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-black text-white font-extrabold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {itemsArray.map(([key, item]) => (
                  <div key={key} className="flex gap-4 pb-6 border-b border-zinc-200 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-extrabold text-black text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-600 mb-2">
                        Talla: {item.size}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(key, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-zinc-200 hover:border-black transition-colors text-black"
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
                          <span className="text-sm font-normal text-black w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(key, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-zinc-200 hover:border-black transition-colors text-black"
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
                          <p className="text-sm font-extrabold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(key)}
                            className="text-xs text-zinc-600 hover:text-black mt-1 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {itemsArray.length > 0 && (
            <div className="border-t border-zinc-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600">TOTAL</span>
                <span className="text-xl font-extrabold text-black">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full py-4 bg-black text-white font-extrabold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}

