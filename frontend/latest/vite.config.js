import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This project shares a machine with Sikolo MIS, whose dev server holds
  // Vite's default 5173. Leaving this unset meant both defaulted to the same
  // port: Windows let the second bind [::1] specifically while the first held
  // the wildcard, `localhost` resolves to ::1 first, and every localhost:5173
  // tab silently served whichever started last. strictPort makes a future
  // clash fail on startup instead of being hijacked in silence.
  server: {
    port: 5177,
    strictPort: true,
  },
})
