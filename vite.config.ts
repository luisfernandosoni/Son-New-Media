import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// #MCRD: Plugin de Saneamiento de Entorno
const stripFallbacks = () => {
  return {
    name: 'mcrd-strip-fallbacks',
    transformIndexHtml(html: string) {
      return html.replace(/<!-- ::FALLBACK_START:: -->[\s\S]*?<!-- ::FALLBACK_END:: -->/gi, '');
    },
  };
};

// Plugin 2: Inyecta el CSS nativo SOLO en el build (FIX PANTALLA NEGRA)
const injectCss = () => {
  return {
    name: 'mcrd-inject-css',
    transform(code: string, id: string) {
      // Si el archivo es index.tsx, le pegamos el import del CSS al principio
      if (id.endsWith('index.tsx')) {
        return "import './index.css';\n" + code;
      }
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    stripFallbacks(),
    injectCss() // <--- El Agente de Inyección
  ],
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
  server: {
    port: 3000,
    host: true
  }
});