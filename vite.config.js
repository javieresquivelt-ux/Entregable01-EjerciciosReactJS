import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Detectar dinámicamente index.html y todos los js_ejercicio_*.html
const htmlFiles = readdirSync(__dirname).filter((file) => file.endsWith('.html'))
const input = htmlFiles.reduce((acc, file) => {
  const name = file.replace(/\.html$/, '')
  acc[name] = resolve(__dirname, file)
  return acc
}, {})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Asegura rutas relativas para despliegue correcto en GitHub Pages
  build: {
    rollupOptions: {
      input,
    },
  },
})

