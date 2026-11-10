import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const checker = fileURLToPath(new URL('./check-static-images.mjs', import.meta.url));

function checkPage(t, html, files) {
  const directory = mkdtempSync(join(tmpdir(), 'static-images-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const root = join(directory, 'dist/client');
  mkdirSync(join(root, '_astro'), { recursive: true });
  writeFileSync(join(root, 'index.html'), html);
  for (const file of files) writeFileSync(join(root, '_astro', file), 'image fixture');
  return spawnSync(process.execPath, [checker], { cwd: directory, encoding: 'utf8' });
}

test('rejects a missing srcset image even when the fallback image exists', (t) => {
  const result = checkPage(t,
    '<img src="/_astro/fallback.webp" srcset="/_astro/missing.avif 2x">',
    ['fallback.webp']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing static image \/_astro\/missing\.avif/);
});

test('checks single-quoted source sets and static image formats beyond WebP', (t) => {
  const result = checkPage(t,
    "<source srcset='/_astro/small.avif 1x, /_astro/large.png 2x'>" +
    '<img src="/_astro/original.jpg?download=1">' +
    '<meta content="https://www.sebastiansigl.com/_astro/social.jpeg">',
    ['small.avif', 'large.png', 'original.jpg', 'social.jpeg']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /4 static image references/);
});

test('rejects runtime Vercel image URLs in a source set', (t) => {
  const result = checkPage(t,
    '<img src="/_astro/fallback.webp" srcset="/_vercel/image?url=photo.jpg 2x">',
    ['fallback.webp']);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Runtime Vercel image URL/);
});
