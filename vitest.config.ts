import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    testTimeout: 10000
  },
})