import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/ServiceDogsAroundTown_v2',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
