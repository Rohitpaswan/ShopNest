import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Proxy requests starting with /api to http://localhost:3000
    }
  },
  plugins: [react()]
});
