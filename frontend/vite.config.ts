import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ]
  },
  server: {
    proxy: {
      '/ggg/simple-slots': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      },
      '/ggg/user-state': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:3002',
        rewrite: (path) => {
          console.log(path.replace(/^\/auth\//, ''))

          return path.replace(/^\/auth\//, '')
        },
        ws: true,
        changeOrigin: true
      }
    }
  }
})
