import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Make sure output is directed to 'dist' folder
  },
  resolve: {
    alias: {
      '@': '/src', // If you're using aliases, make sure they are correctly defined
    },
  },
})
