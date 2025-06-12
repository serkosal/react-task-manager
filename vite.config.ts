import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const ReactCompilerConfig = {
  sources: (_filename: any) => {
    return true;
  },
};

// https://vite.dev/config/
export default defineConfig({
  base: '/react-task-manager/',
  plugins: [react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
})
