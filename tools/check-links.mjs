#!/usr/bin/env node
/**
 * Kiểm tra liên kết nội bộ trong repo (không cần cài thư viện).
 *
 * - Quét mọi file .html và .css (bỏ qua node_modules, .git).
 * - Với mỗi href/src (HTML) và url(...) (CSS) là đường dẫn tương đối:
 *     + file đích phải tồn tại;
 *     + nếu có #fragment trỏ tới file .html thì phần tử id tương ứng phải tồn tại.
 * - Bỏ qua: http(s)://, //, mailto:, tel:, sms:, data:, javascript:, và href="#".
 *
 * Cách chạy:  node tools/check-links.mjs
 * Thoát với mã 1 nếu có liên kết hỏng.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git']);
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (['.html', '.css'].includes(extname(name))) out.push(full);
  }
  return out;
}

const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    const ids = new Set([...html.matchAll(/\sid\s*=\s*"([^"]+)"/g)].map((m) => m[1]));
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

function stripComments(text, type) {
  return type === '.css'
    ? text.replace(/\/\*[\s\S]*?\*\//g, '')
    : text.replace(/<!--[\s\S]*?-->/g, '').replace(/<script\b[\s\S]*?<\/script>/gi, '');
}

const files = walk(root);
let checked = 0;
const errors = [];

for (const file of files) {
  const type = extname(file);
  const text = stripComments(readFileSync(file, 'utf8'), type);
  const refs =
    type === '.html'
      ? [...text.matchAll(/\s(?:href|src)\s*=\s*"([^"]*)"/g)].map((m) => m[1])
      : [...text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map((m) => m[1]);

  for (const raw of refs) {
    const ref = raw.trim();
    if (!ref || ref === '#' || EXTERNAL.test(ref)) continue;
    checked++;

    const [pathAndQuery, fragment] = ref.split('#');
    const path = decodeURI(pathAndQuery.split('?')[0]);
    let target = path ? resolve(dirname(file), path) : file;
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');

    const where = relative(root, file);
    if (!existsSync(target)) {
      errors.push(`${where}: không tìm thấy "${ref}"`);
      continue;
    }
    if (fragment && extname(target) === '.html' && !idsOf(target).has(decodeURIComponent(fragment))) {
      errors.push(`${where}: "${ref}" – không có phần tử id="${fragment}"`);
    }
  }
}

console.log(`Đã quét ${files.length} file, kiểm tra ${checked} liên kết nội bộ.`);
if (errors.length) {
  console.error(`\n${errors.length} liên kết hỏng:`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log('✓ Không có liên kết hỏng.');
