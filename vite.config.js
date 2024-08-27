import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // Binds to 0.0.0.0
    port: 4173,   // Choose a port number
  },
})
