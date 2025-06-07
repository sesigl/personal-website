// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.sebastiansigl.com',
    integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false }), react()],
    /*adapter: vercel({
        imageService: true,
    }),*/
    adapter: node({
        mode: 'standalone',
    }),
    env: {
        schema: {
            DATABASE_URL: envField.string({ context: "server", access: "secret", optional: false }),
            USER_SECRET_KEY: envField.string({ context: "server", access: "secret", optional: false }),
            ADMIN_PASSWORD: envField.string({ context: "server", access: "secret", optional: false }),
            AWS_ACCESS_KEY_ID: envField.string({ context: "server", access: "secret", optional: false }),
            AWS_SECRET_ACCESS_KEY: envField.string({ context: "server", access: "secret", optional: false }),
            AWS_REGION: envField.string({ context: "server", access: "secret", optional: false }),
        }
    }
});