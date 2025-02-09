/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    setupFiles: [],
    hookTimeout: 60000,
  },
  
});
