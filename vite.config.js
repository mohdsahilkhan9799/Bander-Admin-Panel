import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Adjust if your project is served from a subdirectory
  plugins: [react()],
});
