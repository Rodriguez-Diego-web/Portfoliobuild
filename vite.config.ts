import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  base: '/', // Setzt die Base-URL für alle Assets
  assetsInclude: ['**/*.MP4', '**/*.avi', '**/*.jpg', '**/*.png', '**/*.svg'],
  build: {
    minify: 'terser',
    sourcemap: false, // Keine Sourcemaps in der Production
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: false, // Aktiviere Konsolenausgaben für Debugging
        drop_debugger: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          ui: ['lucide-react', '@headlessui/react'],
        },
        entryFileNames: 'assets/[name].[hash].js', // Eindeutige Namen für JS-Dateien
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    open: true,
    cors: true
  }
});
