import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Check the artifact, not a config string: public pages must not request paid image transforms.
const root = 'dist/client';
const pages = readdirSync(root, { recursive: true }).filter((path) => path.endsWith('.html'));
assert(pages.length > 0, 'No static pages were built.');
let checkedImages = 0;
for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  assert(!html.includes('/_vercel/image'), `Runtime Vercel image URL in ${page}`);
  for (const match of html.matchAll(/\b(src|srcset|content)\s*=\s*(["'])(.*?)\2/gs)) {
    const references = match[1] === 'srcset'
      ? match[3].split(',').map((candidate) => candidate.trim().split(/\s+/)[0])
      : [match[3]];
    for (const reference of references) {
      const url = new URL(reference, 'https://www.sebastiansigl.com');
      if (url.origin !== 'https://www.sebastiansigl.com' || !url.pathname.startsWith('/_astro/') ||
        !/\.(avif|gif|jpe?g|png|svg|webp)$/i.test(url.pathname)) continue;
      const path = decodeURIComponent(url.pathname);
      assert(existsSync(join(root, path)), `Missing static image ${path} in ${page}`);
      checkedImages += 1;
    }
  }
}
assert(checkedImages > 0, 'No optimized static images were referenced.');
console.log(`Verified ${pages.length} static pages and ${checkedImages} static image references; no Vercel image URLs.`);
