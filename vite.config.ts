import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-task-manager/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'), // т.к. assets лежит в корне проекта, а не в /src
    },
  },
})
