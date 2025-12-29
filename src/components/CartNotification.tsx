import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems } from '../store/cartStore';

export default function CartNotification() {
  const items = useStore(cartItems);
  const [showNotification, setShowNotification] = useState(false);
  const [lastItemCount, setLastItemCount] = useState(0);

  useEffect(() => {
    const currentCount = Object.values(items).reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Solo mostrar notificación si el conteo aumentó
    if (currentCount > lastItemCount && currentCount > 0) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }

    setLastItemCount(currentCount);
  }, [items, lastItemCount]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-full shadow-2xl pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15,
              }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
            <span className="text-sm font-extrabold uppercase tracking-wider">
              Added to your collection
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

