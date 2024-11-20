import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This should be 'dist'
  },
  esbuild: {
    jsx: 'automatic',
  },
  optimizeDeps: {
    include: ['react-toastify'],
  }
});
