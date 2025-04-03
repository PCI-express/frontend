import { defineConfig } from 'vite';
// import { reactRouter } from '@react-router/dev/vite'
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
