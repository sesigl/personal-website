/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
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
