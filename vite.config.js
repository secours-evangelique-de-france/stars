import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuration pour GitHub Pages
  // ⚠️ Remplacez 'formulaire-sef' par le nom exact de votre repository GitHub
  base: process.env.NODE_ENV === 'production' 
    ? '/formulaire-sef/'  // Pour GitHub Pages: /nom-du-repo/
    : '/',                 // Pour développement local
  
  server: {
    port: 3000,
    open: true
  },
  
  // Build optimisé
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})