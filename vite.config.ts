import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/habit-tracker/',  // ← ここを追加
  plugins: [react()],
});
