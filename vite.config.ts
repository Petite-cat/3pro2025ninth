import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/3pro2025ninth/', // 
  build: {
    outDir: 'docs', // 出力先を 'docs' に変更
  },
})
