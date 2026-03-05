import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // use relative paths so the app works regardless of the domain or
  // sub‑directory it’s hosted in (Cloudflare Pages, GitHub Pages, etc.)
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
