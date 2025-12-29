import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'product' | 'text' | 'image';
  className?: string;
}

export default function SkeletonLoader({ 
  variant = 'product', 
  className = '' 
}: SkeletonLoaderProps) {
  const shimmerVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        x: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        },
      },
    },
  };

  if (variant === 'product') {
    return (
      <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-xl sm:rounded-2xl ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
          variants={shimmerVariants}
          animate="animate"
          style={{ width: '50%' }}
        />
        <div className="h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[420px]" />
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-xl ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
          variants={shimmerVariants}
          animate="animate"
          style={{ width: '50%' }}
        />
        <div className="aspect-square" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-lg ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
        variants={shimmerVariants}
        animate="animate"
        style={{ width: '50%' }}
      />
      <div className="h-4 w-full" />
    </div>
  );
}

