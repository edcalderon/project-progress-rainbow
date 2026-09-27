# 🌈 Project Progress Rainbow

A [Super Productivity](https://github.com/super-productivity/super-productivity) plugin: per-project progress view with an overall portfolio bar + automatic milestones, styled to blend with the Rainbow theme (and light/dark themes).

![version](https://img.shields.io/badge/version-1.0.0-9b5de5)
![sup](https://img.shields.io/badge/super--productivity-%3E%3D14.0.0-118ab2)
![license](https://img.shields.io/badge/license-MIT-06d6a0)

## ✨ What it does

- **Portfolio bar** on top: `done / total` across all non-archived projects.
- **Card per project**: big `%`, `done/total` counts, animated rainbow progress bar. Uses the project's own color when set (`project.theme.primary`), otherwise rainbow.
- **Milestones, zero config** — tasks are auto-grouped:
  1. Title prefix `[M: Checkout]` → milestone "Checkout"
  2. Else parent epic title (`⛰ Epic`)
  3. Else first tag (`🏷 Tag`)
  4. Else `General`
- **Two calc modes**: task count (default) or time-estimate. Toggle in header, persisted via `persistDataSynced`.
- **Live updates**: hooks (`taskComplete`, `taskUpdate`, `taskDelete`, `anyTaskUpdate`, `projectListUpdate`) + 8s poll fallback.
- **Theme-aware**: only Super Productivity CSS variables (`--bg`, `--card-bg`, `--text-color`, `--divider-color`, `--c-primary`, …) + a single rainbow gradient:
  `linear-gradient(90deg,#ff5b7f,#ff8a5c,#ffd166,#06d6a0,#118ab2,#9b5de5)`.

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
```

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
