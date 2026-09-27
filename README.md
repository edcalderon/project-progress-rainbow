# 🌈 Project Progress Rainbow

A [Super Productivity](https://github.com/super-productivity/super-productivity) plugin: per-project progress view with an overall portfolio bar + automatic milestones, styled to blend with the Rainbow theme (and light/dark themes).

![version](https://img.shields.io/badge/version-1.4.1-9b5de5)
![sup](https://img.shields.io/badge/super--productivity-%3E%3D14.0.0-118ab2)
![license](https://img.shields.io/badge/license-MIT-06d6a0)

## 📋 Latest Changes (v1.4.1)

### Features

* speedometer fuel-gauge portfolio dial, project search/sort/status filters, Grid/List/Rows layouts, tabbed detail view, layout/sortBy settings ([e68743](https://github.com/edcalderon/project-progress-rainbow/commit/e687437578d9eb807d577376012b2e43bc83f987))


### Bug Fixes

* gauge rainbow compressed to progress with glowing tip, % pill moved below dial to stop overlap, single unified filter panel, one section per detail tab ([e68743](https://github.com/edcalderon/project-progress-rainbow/commit/e687437578d9eb807d577376012b2e43bc83f987))

For full version history, see [CHANGELOG.md](./CHANGELOG.md) and [GitHub releases](https://github.com/edcalderon/project-progress-rainbow/releases)

## ✨ What it does

- **Portfolio bar** on top: `done / total` across all non-archived projects.
- **Card per project**: big `%`, `done/total` counts, rainbow progress bar with a bold animated flow (moving stripes + sweeping sheen + glow, speed adjustable, auto-disabled under `prefers-reduced-motion`). Uses the project's own color when set (`project.theme.primary`), otherwise rainbow.
- **Milestones, zero config** — tasks are auto-grouped:
  1. Title prefix `[M: Checkout]` → milestone "Checkout"
  2. Else parent epic title (`⛰ Epic`)
  3. Else first tag (`🏷 Tag`)
  4. Else `General`
- **Two calc modes**: task count (default) or time-estimate. Toggle in header, persisted via `persistDataSynced`.
- **Live updates**: hooks (`taskComplete`, `taskUpdate`, `taskDelete`, `anyTaskUpdate`, `projectListUpdate`) + 8s poll fallback.
- **Theme-aware**: only Super Productivity CSS variables (`--bg`, `--card-bg`, `--text-color`, `--divider-color`, `--c-primary`, …) + a single rainbow gradient:
  `linear-gradient(90deg,#ff5b7f,#ff8a5c,#ffd166,#06d6a0,#118ab2,#9b5de5)`.
- **Clickable cards → per-project detail page**: final objective + deadline + time budget (synced), times panel (estimated / spent / remaining vs budget), sprints with task assignment, manual milestone editor (rename/delete + per-task assignment), tag filter chips, and planner-grouped tasks (Overdue / Today / Upcoming / No date) with done toggles, time-estimate editing, and click-to-open in Super Productivity.

## 📦 Install

### From release ZIP (recommended)
1. Download `project-progress-rainbow.zip` from [Releases](../../releases).
2. Super Productivity → **Settings → Plugins → Choose Plugin File** → select the ZIP.
   (Uploading a ZIP is the only install path — there is no "load from folder".)
3. Open via menu **Project Progress Rainbow** or the header `insights` button.

### Manual ZIP
Zip the files at the archive root (no parent folder):
```
manifest.json
plugin.js
index.html
icon.svg
config-schema.json
```

## ⚙️ Settings

Proper plugin settings live on the plugin card: **Settings → Plugins → ⚙ icon**. They are rendered by the app from `config-schema.json` (calculation mode, backlog, hide-done, bar animation on/off, flow speed, milestones per card) and read back via `PluginAPI.getConfig()`.

The quick toggles in the plugin header write to local synced prefs instead — anything set in the ⚙ form overrides them (locked controls show a tooltip saying so).

## 🧪 Try it
1. Create 2 projects with mixed done/undone tasks.
2. Add one epic (parent task + subtasks) and a few tasks titled `[M: Beta] …`.
3. Open the plugin → portfolio %, per-project %, and milestone mini-bars should match.
4. Complete a task → bars animate without manual refresh.

## 🛠 Dev
- All UI is self-contained in `index.html` (inline CSS/JS — required for iframe plugins).
- `plugin.js` only registers the header button; rendering + `registerHook` live in the iframe.
- Data: `getAppState()` snapshot, fallback to `getAllProjects()` + `getTasks()` + `getAllTags()`.
- Test on a throwaway instance (e.g. https://test-app.super-productivity.com), not your real data. Open DevTools (`Ctrl+Shift+I`) for console errors.
- After cloning, activate the secrets pre-commit guard: `npm run setup-hooks` (requires git + npx). Every commit is then scanned for tokens/keys/mnemonics via `versioning check-secrets` and rejected if anything matches.

## 🚀 Releasing (versions / changelog / readme via versioning)

Versions are managed with [@edcalderon/versioning](https://www.npmjs.com/package/@edcalderon/versioning). `package.json` is the version source; `scripts/sync-manifest.mjs` mirrors it into `manifest.json` (the version Super Productivity reads); `update-readme` syncs the Latest Changes section above from `CHANGELOG.md`.

```bash
npm run release:minor   # or release:patch / release:major
git add -A && git commit -m "feat: ..."   # pre-commit hook scans for secrets
npx -y @edcalderon/versioning@1.5.13 guard-tag -t v1.1.0
git tag -a v1.1.0 -m "v1.1.0" && git push origin main v1.1.0
zip -j project-progress-rainbow.zip manifest.json plugin.js index.html icon.svg config-schema.json
gh release create v1.1.0 project-progress-rainbow.zip --title "v1.1.0" --notes "..."
```

Notes:
- The `.husky/pre-commit` hook intentionally calls the fully-scoped `npx -y @edcalderon/versioning@…` specifier — bare `npx versioning` resolves an unrelated registry package and fails.
- `versioning.config.json` enables the `secrets-check` and `readme-maintainer` (releases link) extensions.

## 📋 Publish checklist (community-plugins.json)
This repo is submitted to the upstream list via PR adding:
```json
{
  "name": "Project Progress Rainbow",
  "shortDescription": "Per-project progress bars with auto milestones (epic/tag/[M:Name]), rainbow gradient, theme-aware.",
  "url": "https://github.com/edcalderon/project-progress-rainbow",
  "author": "edcalderon",
  "authorUrl": "https://github.com/edcalderon",
  "stars": 0
}
```

## License
MIT — see [LICENSE](LICENSE).
