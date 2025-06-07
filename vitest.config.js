/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    setupFiles: [
      'src/test/setup/setupTestDatabase.ts',
    ],
    hookTimeout: 20000,
  },
  threads: false, // Run tests sequentially to avoid testcontainer issues
});
