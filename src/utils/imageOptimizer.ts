/**
 * Image Optimizer Utility
 * 
 * Helper functions for optimized image loading with WebP support and lazy loading
 */

export interface ImageSource {
  src: string;
  srcset?: string;
  type?: string;
}

/**
 * Generate WebP image path from original image
 * Note: In production, this should be handled by a build-time image optimization plugin
 * For now, we'll use the original images but prepare the structure for WebP optimization
 */
export function getWebPSource(originalSrc: string): ImageSource | null {
  if (typeof window === 'undefined') return null;
  
  // Check if browser supports WebP
  const canvas = document.createElement('canvas');
  const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  if (!supportsWebP) return null;
  
  // Replace extension with .webp
  const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return {
    src: webpSrc,
    type: 'image/webp',
  };
}

/**
 * Generate responsive image sources for different screen sizes
 */
export function getResponsiveImageSources(
  basePath: string,
  sizes: { width: number; breakpoint?: string }[] = [
    { width: 400 },
    { width: 800 },
    { width: 1200 },
    { width: 1600 },
  ]
): ImageSource[] {
  return sizes.map(({ width }) => ({
    src: `${basePath}?w=${width}`,
  }));
}

/**
 * Get optimized image attributes for lazy loading
 */
export function getImageAttributes(src: string, alt: string) {
  const webpSource = getWebPSource(src);
  
  return {
    src: src,
    alt: alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    ...(webpSource && { 'data-webp': webpSource.src }),
  };
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, type: 'image/webp' | 'image/jpeg' = 'image/jpeg') {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.type = type;
  document.head.appendChild(link);
}

