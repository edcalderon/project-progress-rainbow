// Bridge between @edcalderon/versioning (which manages package.json)
// and the Super Productivity plugin manifest (which carries the version
// the app actually reads). Run after every version bump, before commit:
//
//   node scripts/sync-manifest.mjs
//
// Exits non-zero if versions diverge and --check is passed (CI-friendly).
import { readFileSync, writeFileSync } from 'node:fs';

const check = process.argv.includes('--check');
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const raw = readFileSync('manifest.json', 'utf8');
const manifest = JSON.parse(raw);

if (manifest.version === pkg.version) {
  console.log(`✅ manifest.json already at ${pkg.version}`);
  process.exit(0);
}
if (check) {
  console.error(`❌ manifest.json (${manifest.version}) != package.json (${pkg.version})`);
  process.exit(1);
}
const next = raw.replace(
  /"version"\s*:\s*"[^"]+"/,
  `"version": "${pkg.version}"`
);
writeFileSync('manifest.json', next);
console.log(`✅ manifest.json synced to ${pkg.version}`);
