import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so logos resolve on GitHub Pages and local preview
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
