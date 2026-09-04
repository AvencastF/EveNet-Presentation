# EveNet Presentations

Independent Slidev decks with one shared dependency installation and reusable infrastructure.

## Getting started

Run commands from the repository root using a current Node.js LTS release.

```bash
npm ci
npm run dev -- AI_LHC_2026
npm run build -- AI_LHC_2026
npm run export -- AI_LHC_2026
```

The preview opens at http://localhost:3030. Edit the selected deck's `slides.md` and `slides/` files. Development retains `--open --remote`; remote mode exposes the preview to your network.

Extra arguments are forwarded to Slidev:

```bash
npm run dev -- AI_LHC_2026 --port 3031
npm run build -- AI_LHC_2026 --base /EveNet-Presentation/AI_LHC_2026/
```

A single-deck build writes to its `dist/`. Export retains `--with-clicks --per-slide --wait-until none` and requires Playwright's Chromium browser. If needed after installing dependencies, run `npx playwright install chromium`.

## Create a presentation

```bash
npm run new -- My_Talk
npm run dev -- My_Talk
```

This creates `slides.md`, a three-line stylesheet, and empty `slides/` and `public/` directories. Existing directories are never overwritten. Names may contain letters, numbers, underscores, and hyphens, and must begin with a letter or number. Infrastructure names such as `site` and `shared` are reserved.

No per-deck package manifest, lockfile, dependency installation, or copied component library is needed. Add the talk's own content and assets. Add a landing-page link manually when you want the talk listed there; the generator does not change the landing page.

## Structure and customization

```text
package.json / package-lock.json     One dependency set
shared/slidev-addon-evenet/          Components, global layers, UnoCSS and Vite config
shared/styles/                      Shared CSS, imported in the original order
<deck>/slides.md                     Deck configuration and slide order
<deck>/slides/                       Presentation-specific content
<deck>/public/                       Presentation-specific assets and existing URLs
<deck>/components/                   Unique components and local component overrides
tools/                              Development, build, export and scaffolding commands
```

Available decks: `AI_HEP_Japan`, `AI_LHC_2026`, `EPE_Seminar`, `HWW_QE_lvlv`, and `ICHEP2027`.

Each deck keeps Slidev's default theme and opts into `slidev-addon-evenet` in its headmatter. npm links the local addon workspace automatically. No manual symlinks or package publishing are needed.

The three imports in `style.ts` preserve CSS order and pass every shared file through UnoCSS's directive transformer. Use JavaScript/TypeScript imports here rather than CSS `@import`, which would leave shared `--uno` directives unexpanded.

Shared infrastructure changes affect all decks: build and review every presentation before accepting them. Keep historical talk content and data local. Deck-local components override shared components of the same name. Global layers are additive: a local global layer does not replace the addon's layer. Deck-local UnoCSS config should contain only additional rules/safelist entries. `ICHEP2027` retains its distinct animation CSS.

Existing `LaTeX.vue` and `PlotlyChart.vue` entrypoints are tiny forwarding components so historical Markdown imports do not need to change. They need real templates: Slidev's production transforms can replace a script-only re-export with an empty render function. New decks can use these components directly without local files.

## Complete website and CI

```bash
npm test
npm run build:all
npm run build:all -- --base /EveNet-Presentation/
```

`build:all` recreates the generated `site/` directory and sequentially builds every top-level folder containing `slides.md`. It stops at the first failure. Treat `site/` as disposable; keep source files and exports elsewhere.

The default URL prefix comes from `GITHUB_REPOSITORY` in Actions, otherwise `/EveNet-Presentation/`. Each output remains at `site/<deck>/`, published as `/<repository>/<deck>/`. The existing `gh-pages/index.html` is copied unchanged.

GitHub Actions runs one root `npm ci`, caches npm's package downloads using the root lockfile, builds every deck, and uploads the complete Pages artifact. Existing main-branch and manual deployment triggers are unchanged. No deck-output caching or parallel builds are used.

See the [migration verification notes](docs/slidev-migration.md) for version preservation, before/after measurements, and known pre-existing issues.

## Template credits

Based on [BaizeAI's Slidev template](https://github.com/BaizeAI/talks/tree/main/packages/2025-06-11-kubecon-hk). See the [Slidev documentation](https://sli.dev/) for authoring details.
