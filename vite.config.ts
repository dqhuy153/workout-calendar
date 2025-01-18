import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@modules': pathResolve('src/modules'),
      '@components': pathResolve('src/components'),
      '@routers': pathResolve('src/routers'),
      '@constants': pathResolve('src/constants'),
    },
  },
})
