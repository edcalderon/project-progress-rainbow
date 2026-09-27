// Bridge between @edcalderon/versioning (which manages package.json)
// and the Super Productivity plugin files that carry the version:
//   - manifest.json (the version the app reads)
//   - index.html PLUGIN_VERSION const (the version shown in the UI)
// Run after every version bump, before commit:
//
//   node scripts/sync-manifest.mjs
//
// Exits non-zero if versions diverge and --check is passed (CI-friendly).
import { readFileSync, writeFileSync } from 'node:fs';

const check = process.argv.includes('--check');
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
let failed = false;

function syncFile(path, regex, replacement, label) {
  const raw = readFileSync(path, 'utf8');
  if (regex.test(raw) && !raw.includes(replacement)) {
    if (check) {
      console.error(`❌ ${path} is not at ${pkg.version}`);
      failed = true;
      return;
    }
    writeFileSync(path, raw.replace(regex, replacement));
    console.log(`✅ ${path} synced to ${pkg.version}`);
  } else {
    console.log(`✅ ${path} already at ${pkg.version}`);
  }
}

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
if (manifest.version !== pkg.version && check) {
  console.error(`❌ manifest.json (${manifest.version}) != package.json (${pkg.version})`);
  failed = true;
}
syncFile('manifest.json', /"version"\s*:\s*"[^"]+"/, `"version": "${pkg.version}"`, 'manifest.json');
syncFile('index.html', /const PLUGIN_VERSION = '[^']*'/, `const PLUGIN_VERSION = '${pkg.version}'`, 'index.html');

if (failed) process.exit(1);
