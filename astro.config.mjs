// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import rehypeLinksInNewTab from './src/markdown/rehypeLinksInNewTab.mjs';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.sebastiansigl.com',
    markdown: {
        rehypePlugins: [rehypeLinksInNewTab],
    },
    integrations: [mermaid({
        theme: 'default',
        autoTheme: true,
        // Show flowcharts at their natural size; the code block scrolls instead
        // of scaling a wide diagram down until the labels are unreadable.
        mermaidConfig: { flowchart: { useMaxWidth: false } },
    }), mdx(), sitemap(), tailwind({ applyBaseStyles: false }), react()],
    adapter: vercel({
        // Optimize public-page images during the build, not on each new CDN image variant.
        // Astro's Sharp service emits content-hashed static files and reuses its build cache.
        imageService: false,
        // Keep old image URLs working in already-sent newsletters and shared links.
        // This enables the legacy endpoint only; new pages use Sharp's static files.
        imagesConfig: {
            sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            domains: [],
        },
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
            include: [
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                '@astrojs/react/client.js',
                '@yoopta/email-builder',
            ],
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
