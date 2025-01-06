import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/entrypoint.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /node_modules/
    }
  }
})
