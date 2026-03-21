import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        arizonia: ["Arizonia", "cursive"],
        biorhyme: ["BioRhyme", "serif"],
        neuton: ["Neuton", "serif"],
      },
    },
  },
  plugins: [react(), tailwindcss()],
  server: {port:5173}
})
