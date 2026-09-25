// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.sebastiansigl.com',
    integrations: [mermaid({
        theme: 'default',
        autoTheme: true,
        // Show flowcharts at their natural size; the code block scrolls instead
        // of scaling a wide diagram down until the labels are unreadable.
        mermaidConfig: { flowchart: { useMaxWidth: false } },
    }), mdx(), sitemap(), tailwind({ applyBaseStyles: false }), react()],
    adapter: vercel({
        imageService: true,
        webAnalytics: {
            enabled: true,
        },
    }),
    //adapter: node({
    //    mode: 'standalone',
    //}),
    vite: {
        resolve: {
            // The Yoopta email editor bundles its own React; keep one copy in
            // the dev server so the admin island mounts reliably.
            dedupe: ['react', 'react-dom'],
        },
        optimizeDeps: {
            include: ['@yoopta/email-builder'],
        },
        ssr: {
            noExternal: ['astro', '@astrojs/mdx', '@astrojs/sitemap', '@astrojs/tailwind', '@astrojs/react']
        }
    },
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