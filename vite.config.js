// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/widget/', // Reemplazá con el nombre de tu repositorio
  plugins: [react()],
})
