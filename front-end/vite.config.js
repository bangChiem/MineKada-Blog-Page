import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://kqh40c51-8000.use.devtunnels.ms',
        changeOrigin: true,
      }
    } 
  }
})
