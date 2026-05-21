import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pages 배포 시 자산 경로(CSS, JS, 이미지 등)가 누락되거나 깨지지 않도록 상대 경로로 지정합니다.
})
