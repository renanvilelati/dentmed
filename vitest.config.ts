import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/generated/**/*.{ts,tsx}',
        'src/**/*.d.ts',
      ],
    }
  }
})