/// <reference types="astro/client" />

// Extender CSSProperties de React para soportar viewTransitionName (View Transitions API)
// Esto permite usar viewTransitionName en el objeto style sin errores de TypeScript
declare module 'react' {
  interface CSSProperties {
    /**
     * Nombre de la transición para View Transitions API
     * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
     */
    viewTransitionName?: string;
  }
}

// Extender también para elementos HTML nativos (por si acaso)
declare global {
  namespace React {
    interface CSSProperties {
      viewTransitionName?: string;
    }
  }
}

export {};
