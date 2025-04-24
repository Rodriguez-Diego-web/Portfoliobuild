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
  assetsInclude: ['**/*.MP4', '**/*.avi'],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Aktiviere Konsolenausgaben für Debugging
        drop_debugger: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
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
