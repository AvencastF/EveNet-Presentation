# Agent instructions

## Start here

This repository contains independent Slidev presentations backed by one root npm installation. Read [the authoring guide](docs/authoring.md) before creating a deck or changing shared infrastructure. Read [migration notes](docs/slidev-migration.md) before refactoring historical decks.

1. Check `git status` and the current branch. Preserve unrelated edits, notes, and generated exports; do not stage them with your work.
2. Identify whether the task changes one deck, shared infrastructure, build tools, or documentation. Keep the scope explicit.
3. Search before implementing: inspect `shared/slidev-addon-evenet/components/`, `shared/styles/`, and existing deck-local components. Reuse an existing implementation when it fits.

## Create and edit decks

Run these commands from the repository root:

```bash
npm ci                                  # Initial setup or after lockfile changes
npm run new -- My_Talk
npm run dev -- My_Talk
npm run build -- My_Talk
npm run export -- My_Talk                # When an export is requested
```

- Use the generator, not a copy of another presentation directory. It creates `slides.md`, `style.ts`, and empty `slides/` and `public/` directories.
- Keep the generated default theme, addon reference, hash routing, and stylesheet import order unless the user requests a change.
- Put talk-specific Markdown, data, figures, and unique components inside the selected deck. Read the target deck's README and entry file before editing it.
- Never add per-deck manifests, lockfiles, dependency directories, copied shared component libraries, or manual infrastructure symlinks. The addon workspace's own package manifest is intentional.
- New decks consume shared components directly. Do not copy the historical LaTeX/PlotlyChart forwarding files into a new deck.
- Every top-level directory containing `slides.md` is included in `build:all`; the landing page is separate. Do not create throwaway decks in the repository root and forget them. Listing a talk publicly or publishing its content requires appropriate user authorization.

## Shared versus local

- `shared/slidev-addon-evenet/` owns reusable Vue components, `composable/math.ts`, global layers, and common UnoCSS/Vite configuration. `shared/styles/` owns common CSS.
- Prefer props, slots, and existing CSS variables over copying a component or stylesheet. Introduce shared APIs for demonstrated reuse, not speculative generalization.
- Shared code must not import a particular deck's Markdown, datasets, figures, or components. Pass talk-specific inputs from the deck. Keep historical slide content and public assets local even when similar content appears in another talk.
- Keep one-off behavior in a deck-local component with a distinct name. A same-name local component overrides the addon component; use that only deliberately and document why.
- Preserve the tiny historical `LaTeX.vue` and `PlotlyChart.vue` adapters. They need real forwarding templates; script-only re-exports can render empty in Slidev's production build.
- Load common CSS through the three ordered TypeScript imports in `style.ts`, not CSS `@import`. Add deck-local CSS after those imports. Keep ICHEP's existing local animation import and the newer decks' extra icon safelists.
- Global layers are additive, not same-name overrides. Do not copy addon global layers into a deck; it would render both.
- Shared changes affect all consumers. Preserve existing defaults and backwards-compatible props. If a requested change would alter historical presentations, explain the impact and get direction before widening the scope.

## Mathematics and particle notation

- Use LaTeX by default for all audience-visible mathematical symbols, formulas, particle names, and decay/reaction notation, including slide titles, prose, captions, and diagram labels. Use another representation only when the user explicitly requests it.
- Use Slidev inline/block math in Markdown and the existing [LaTeX.vue](shared/slidev-addon-evenet/components/LaTeX.vue) component in HTML/Vue layouts. For example: `<LaTeX formula="\nu" />`, `<LaTeX formula="\bar{\nu}" />`, and `<LaTeX formula="Z \to \tau^{+}\tau^{-}" />`. The component accepts a `formula` string and an optional `block` boolean.
- Do not substitute Unicode or HTML entities for mathematical/particle symbols, or construct notation with HTML `<sub>`/`<sup>`. In SVG diagrams, use an HTML `foreignObject` with the LaTeX component when adding editable notation. Preserve labels embedded in existing scientific figure assets.

## EveNet name styling

- Every audience-visible occurrence of **EveNet**, including names such as EveNet-Full and EveNet-Align, must use the deck’s approved, consistent animated wordmark gradient. NJU uses the user-approved Graphite & Gold amber–champagne–rose gradient; other decks retain their existing cyan–magenta–cyan palette. This is a persistent brand rule for all slide authoring and refinement, including text inside diagrams; do not replace it with plain text or another palette during visual cleanup.
- NJU uses the approved Option C wordmark from [shared/brand/evenet/evenet.css](shared/brand/evenet/evenet.css). Import it after the deck theme and wrap the complete name in `<span class="evenet-wordmark">EveNet-Align</span>` (likewise EveNet, EveNet-Full, EveNet-Cls and other variants). Font geometry and gradient/motion must be edited only in this shared brand module; see its [README](shared/brand/evenet/README.md). Do not recreate the wordmark with per-slide fonts or paths.
- For SVG diagrams, use an HTML `foreignObject` with the same class. NJU retains its matching `NJU_Seminar/public/evenet-logo-gold.svg` emblem. Other decks retain their existing identity until explicitly migrated. Source identifiers, paths, speaker notes, alt text, and non-rendered references remain plain text. Preserve labels embedded in scientific figure assets.

## Dependencies, output, and deployment

- Install and manage dependencies at the repository root only. Check for an existing dependency first; do not upgrade or regenerate the lockfile just to create a talk.
- Preserve the current pinned Slidev CLI/client `52.11.3` and default theme `0.25.0` unless a dependency change is explicitly requested. Update the root manifest and lockfile together when an authorized change requires it.
- A single build writes `<deck>/dist/`. `npm run build:all` recreates `site/`, builds every deck sequentially, and copies the `gh-pages/` landing tree (HTML plus local assets) into `site/`.
- Keep existing deck folder names, `/<repository>/<deck>/` bases, hash routes, public asset paths, HTML injections, slide order, and settings unchanged during infrastructure-only work.
- CI uses one root `npm ci` with npm download caching. Do not restore per-deck installs, output caching, or parallel builds as incidental changes.
- Do not edit generated `site/`, `dist/`, or `node_modules/` as source. Do not remove unrelated exports. Do not push, merge, or deploy unless requested.

## Verification and handoff

- Run `npm test` for changes to build tools, the generator, dependencies, shared code, or documentation.
- For a new deck or deck-local change: build that deck and inspect its rendered output, relevant click states, figures, formulas, and interactions. Check its deployment base, not just the dev root URL.
- For shared styles/components/configuration or dependency changes: build all decks and compare all affected presentations against a baseline. A passing build alone does not prove rendering equivalence.
- For visual changes, use the same browser, viewport, fonts, and settled animation states. Check initial/final click states and relevant intermediate interactions, direct links/refresh, presenter/overview routes, public assets, and console errors. Record actual coverage and any gaps.
- For tool/generator changes: also check starter creation, no-overwrite/invalid-name behavior, argument forwarding, and failure propagation. Verify the starter's dev/build/export workflow when those paths change.
- Documentation-only changes need working examples and link checks, not a full presentation rebuild.
- Report pre-existing failures separately; do not silently fix unrelated rendering issues. See the migration notes for known cases.
- Review the final diff and summarize changed scope, checks performed, and limitations. Keep browser QA artifacts under ignored `output/playwright/`.

## Conversation titles

When the interface supports renaming the conversation, use `YY.MM | TYPE | SUBJECT`: current year/month, a short category such as CODE, TALK, DEBUG, REVIEW, or WRITE, and a 2–5 word subject. Do not repeat the project name or use a sentence-like title.
