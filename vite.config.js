import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/contactless-sleep-monitor-gui/' : '/',
  server: { port: 3000 },
})
