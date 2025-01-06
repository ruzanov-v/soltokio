import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import {plugin as md, Mode} from 'vite-plugin-markdown'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    md({mode: [Mode.VUE]}),
    vue(),
  ],
  build: {
    lib: {
      entry: './src/entrypoint.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue']
    }
  }
})
