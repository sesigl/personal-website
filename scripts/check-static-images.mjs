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
  for (const match of html.matchAll(/(?:src|content)="(?:https:\/\/www\.sebastiansigl\.com)?(\/_astro\/[^"?]+\.webp)"/g)) {
    assert(existsSync(join(root, match[1])), `Missing static image ${match[1]} in ${page}`);
    checkedImages += 1;
  }
}
assert(checkedImages > 0, 'No optimized static images were referenced.');
console.log(`Verified ${pages.length} static pages and ${checkedImages} static image references; no Vercel image URLs.`);
