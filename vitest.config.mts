import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Unit tests for hooks and libraries. Browser flows stay in Playwright (e2e/).
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
