import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Duas páginas: a landing page e a Política de Privacidade (/privacidade/).
      input: {
        main: 'index.html',
        privacidade: 'privacidade/index.html',
      },
    },
  },
})
