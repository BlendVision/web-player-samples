import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyPSEEngine } from '@blendvision/pse/bundle-utils';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  plugins: [react()],
  build: {
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      plugins: [
        copyPSEEngine({
          dest: 'dist/assets',
        }),
      ],
    },
  },
});