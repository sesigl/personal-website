/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

export default getViteConfig({
  cacheDir: 'node_modules/.vite-vitest',
  test: {
    // scripts/*.test.mjs use node:test and run with `npm run test:static-images`.
    exclude: [...configDefaults.exclude, 'scripts/**'],
    hookTimeout: 120000,
    testTimeout: 120000,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      }
    },
    maxConcurrency: 1,
    fileParallelism: false,
  },
});
