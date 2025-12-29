import { useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export default function AnimatedBackground() {
  const { theme, mounted } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [orbColors, setOrbColors] = useState({
    orb1: 'rgba(224, 242, 254, 0.4)',
    orb2: 'rgba(245, 242, 232, 0.4)',
    orb3: 'rgba(219, 234, 254, 0.3)',
  });

  const colors = useMemo(
    () =>
      theme === 'dark'
        ? {
            orb1: 'rgba(30, 27, 75, 0.5)', // Deep indigo
            orb2: 'rgba(45, 27, 105, 0.4)', // Deep purple
            orb3: 'rgba(30, 58, 95, 0.4)', // Dark blue
          }
        : {
            orb1: 'rgba(224, 242, 254, 0.4)', // Sky blue
            orb2: 'rgba(245, 242, 232, 0.4)', // Beige
            orb3: 'rgba(219, 234, 254, 0.3)', // Light blue
          },
    [theme]
  );

  useEffect(() => {
    if (!mounted) return;
    setOrbColors(colors);
  }, [colors, mounted]);

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  // Optimized animation variants with reduced motion support
  const orbVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { animate: { opacity: 0.6 } }
        : {
            animate: {
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.9, 1],
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const, // easeInOut
              },
            },
          },
    [prefersReducedMotion]
  );

  const orb2Variants = useMemo(
    () =>
      prefersReducedMotion
        ? { animate: { opacity: 0.5 } }
        : {
            animate: {
              x: [0, -120, 80, 0],
              y: [0, 100, -70, 0],
              scale: [1, 0.8, 1.3, 1],
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const, // easeInOut
              },
            },
          },
    [prefersReducedMotion]
  );

  const orb3Variants = useMemo(
    () =>
      prefersReducedMotion
        ? { animate: { opacity: 0.4 } }
        : {
            animate: {
              x: [0, 150, -100, 0],
              y: [0, -120, 90, 0],
              scale: [1, 1.1, 0.85, 1],
              transition: {
                duration: 30,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const, // easeInOut
              },
            },
          },
    [prefersReducedMotion]
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs with GPU acceleration */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-60 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${orbColors.orb1} 0%, transparent 70%)`,
          left: '10%',
          top: '20%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        variants={orbVariants}
        animate="animate"
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${orbColors.orb2} 0%, transparent 70%)`,
          right: '15%',
          bottom: '30%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        variants={orb2Variants}
        animate="animate"
      />
      
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-40 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${orbColors.orb3} 0%, transparent 70%)`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        variants={orb3Variants}
        animate="animate"
      />

      {/* Noise Texture Overlay */}
      <div className="noise-texture" style={{ willChange: 'auto' }} />
    </div>
  );
}

