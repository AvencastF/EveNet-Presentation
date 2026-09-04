# Creating presentations without duplicating infrastructure

This is the practical companion to [AGENTS.md](../AGENTS.md). The short version: generate a deck, write its content, and consume the shared addon. Do not clone an entire old talk.

## 1. Create a deck

From the repository root, with a current Node.js LTS release:

```bash
npm ci
npm run new -- My_Talk
npm run dev -- My_Talk
```

`npm ci` is initial setup, not a per-presentation step. Run it again when the lockfile changes or the installation needs replacing. npm automatically links the local addon workspace; no manual symlink or package publishing is needed.

The generator creates only:

```text
My_Talk/
  slides.md       Entry, settings, and initial slide
  style.ts        Three shared stylesheet imports
  slides/         Empty; add Markdown sections here
  public/         Empty; add this talk's assets here
```

Names must start with a letter or number and contain only letters, numbers, underscores, or hyphens. Existing files/directories are never overwritten. `site`, `node_modules`, `shared`, `tools`, `gh-pages`, and `output` are reserved, case-insensitively. Empty directories are not tracked by Git; that is normal until you add content.

The generated headmatter already includes:

```yaml
theme: default
addons:
  - slidev-addon-evenet
```

Keep the other generated settings too, including `routerMode: hash`, `canvasWidth: 980`, and `aspectRatio: 16/9`. An addon supplements the default theme rather than replacing its layouts/fonts. See [Slidev's theme/addon documentation](https://sli.dev/guide/theme-addon).

Development retains `--open --remote`, so it opens a browser and exposes the preview to the network. Additional CLI arguments are forwarded:

```bash
npm run dev -- My_Talk --port 3031
```

## 2. Write content locally

Keep the generated headmatter at the beginning of `My_Talk/slides.md`. Replace the placeholder body and add section references, for example:

```markdown
# My Talk

An introduction for this audience.

---
src: ./slides/method.md
---
```

Then create `My_Talk/slides/method.md`:

```markdown
# Method

<LaTeX formula="E = mc^2" />

<v-clicks>

- Explain the input.
- Explain the result.

</v-clicks>
```

The entry file controls ordering; a Markdown file is not included merely because it exists in `slides/`. Keep talk-specific datasets in an optional `My_Talk/data/` directory. Do not import another historical deck's sections or data to avoid maintaining local content. Shared historical content libraries are deliberately outside the current architecture.

## 3. Reuse before writing new infrastructure

Use this ownership rule:

| What you need | Where it belongs |
| --- | --- |
| Narrative, slide order, speaker notes, results/data | The deck |
| Figures with stable public URLs, deck HTML injections | The deck's existing asset/HTML locations |
| One-off Vue behavior or styling | `<deck>/components/` or `<deck>/styles/` |
| Reusable, talk-independent Vue behavior | `shared/slidev-addon-evenet/components/` |
| Reusable calculation helpers | `shared/slidev-addon-evenet/composable/` |
| Common palette, typography, utilities, animation styles | `shared/styles/` |
| Common global layers and UnoCSS/Vite configuration | `shared/slidev-addon-evenet/` |
| Dependencies and CLI/build behavior | Root manifests and `tools/` |

Search the existing implementations and their callers first:

```bash
rg --files shared
rg -n 'LaTeX|PlotlyChart|Illustration' shared AI_LHC_2026/slides
rg --files AI_HEP_Japan/components AI_LHC_2026/components EPE_Seminar/components HWW_QE_lvlv/components ICHEP2027/components
```

The shared addon currently provides `LaTeX`, `PlotlyChart`, `Vectors`, `DataFlowArrow`, and these illustration components: `AssignmentIllustration`, `ClassificationIllustration`, `DDIMIllustration`, `GenerativeIllustration`, `ModelOverviewIllustration`, `NoiseScheduleIllustration`, `SegmentationIllustration`, `SelfSupervisedGenIllustration`, and `SupervisedGenIllustration`. Read a component's props and existing usages instead of guessing its API.

These components are available in slides through the addon; new decks need no local copy or forwarding file. For example, a new section can contain:

```markdown
<script setup>
const traces = [{ type: 'bar', x: ['A', 'B'], y: [3, 5] }]
</script>

# Example results

<PlotlyChart :data="traces" :height="320" />
```

When an explicit import is useful, use the workspace package name:

```ts
import PlotlyChart from 'slidev-addon-evenet/components/PlotlyChart.vue'
import { normalize } from 'slidev-addon-evenet/composable/math.ts'
```

The shared math helpers have existing, specific behavior; inspect their input assumptions before using them. Do not change a helper's semantics as part of adding an unrelated slide.

### Extend without copying

1. Use an existing component's props or wrap it in a distinctly named local component for one talk.
2. If multiple talks genuinely need a new capability, make a small backwards-compatible shared API. Keep current defaults unchanged; pass labels, data, colors, or asset URLs from the deck.
3. Shared modules must not reach into `AI_LHC_2026/` or another deck. Dependency direction is deck → shared, never shared → deck.
4. Keep a unique implementation local until its reuse and stable interface are clear. Do not create `ComponentV2.vue` as a near-copy to change one label or color.
5. Before extracting apparently identical code, compare all copies and callers. Preserve intentional differences, compatibility entrypoints, and output. Test every consumer after extraction.

Historical `LaTeX.vue`/`PlotlyChart.vue` adapters remain because existing Markdown explicitly imports their old paths. They are not a starter template. If maintaining an adapter, preserve its real `<template>` forwarding to the shared component with `$attrs` and `inheritAttrs: false`. Script-only re-exports can produce empty production renders even when an isolated SSR test passes.

Deck-local same-name components override shared components. Prefer a distinct local name; if an override is necessary, explain it in that deck's README. `global-top.vue` and `global-bottom.vue` are different: their layers are additive. Copying them locally duplicates page-number/background layers rather than replacing the addon.

## 4. Styles and icons

Keep the generated `style.ts` imports in this exact order:

```ts
import '../shared/styles/main.css'
import '../shared/styles/animations.css'
import '../shared/styles/base.css'
```

Use the existing CSS variables such as `--fg-0`, `--fg-1`, `--c-cyan`, `--c-violet`, and `--card-bg` before inventing another palette. Common styling is shared; a talk's special layout should be local and narrowly scoped.

For a local extension, create `<deck>/styles/local.css` and append this import after the three shared imports:

```ts
import './styles/local.css'
```

Do not replace the loader with CSS `@import`: shared UnoCSS directives were left unexpanded by that approach during migration. Do not copy the three shared CSS files into a deck. Preserve ICHEP's intentional local `styles/animations.css` in its second import position.

Common UnoCSS presets, fonts, and rules already come from the addon. A deck-local `uno.config.ts` should contain only additions, for example an icon needed by dynamic markup:

```ts
export default {
  safelist: ['i-carbon:chart-line-data'],
}
```

Use installed icon collections first. AI_LHC and ICHEP already have additional local safelists; do not replace them with a copy of the shared config. Changing shared fonts, global selectors, presets, or animation defaults requires checking all decks.

## 5. Assets and public URLs

Place a new talk's figure at `My_Talk/public/figures/result.svg`. For Vue-bound URLs, include the configured deployment base rather than hard-coding the repository/deck or referencing `/public/`:

```markdown
<script setup>
const figureUrl = `${import.meta.env.BASE_URL}figures/result.svg`
</script>

# Result

<img :src="figureUrl" alt="Result of the study" />
```

The file is published as `/<repository>/My_Talk/figures/result.svg`. Pass that resolved URL to a reusable component when needed. A dev-root URL that works at `/` is not sufficient evidence that GitHub Pages paths work.

Preserve existing historical public directories, filenames, and HTML injections. Asset deduplication is not part of this refactor: do not move images to `shared/public`, rewrite historical links, or copy another talk's entire public directory. Add only the assets the new talk needs, with appropriate attribution.

## 6. Build, verify, and hand off

```bash
npm test
npm run build -- My_Talk
npm run build -- My_Talk --base /EveNet-Presentation/My_Talk/
npm run export -- My_Talk
```

Single-deck output defaults to `My_Talk/dist/`. Export retains `--with-clicks --per-slide --wait-until none`; it requires Playwright Chromium. If it is missing, install it with `npx playwright install chromium`. Generate exports when requested, and do not overwrite or remove unrelated existing exports.

For the complete website, or after shared infrastructure changes:

```bash
npm run build:all
```

This recreates disposable `site/`, discovers every top-level `slides.md`, and builds sequentially into `site/<deck>/`. Invalid manual deck names fail rather than silently disappearing. CI performs one cached root installation and uploads the complete artifact; any failed build prevents deployment.

New decks are discovered automatically, but `gh-pages/index.html` is not rewritten by the generator. Add a landing-page link separately when listing the talk is part of the request. A deck can still be built and published even when no landing link points to it. Do not add private drafts as top-level decks to a deployment-bound change inadvertently.

Before handing off:

- Inspect the selected deck's initial/final click states and relevant intermediate steps, formulas, chart interactions, image zoom, and fonts. Build success alone is insufficient.
- For a shared change, compare all affected decks against their baseline with consistent browser/viewport/fonts and settled animations. Verify direct links/refresh, presenter/overview, public responses, and console errors.
- For dependency changes, preserve unrelated locked versions, run a clean root install, and rebuild all decks. Do not run `npm update`, regenerate the lockfile, or change CI as incidental authoring work.
- Review `git diff` and `git status`; exclude temporary decks, notes unrelated to the task, generated site output, dependencies, and QA screenshots from commits. Keep QA files under ignored `output/playwright/`.
- Report what changed, what you reused, the checks actually performed, and any limitations. Keep pre-existing issues separate. Push/merge/deploy only when requested.

For documentation-only edits, check links and examples and run the tests; a full slide rebuild is unnecessary. For existing migration caveats and the rendering comparison procedure, see [the verification notes](slidev-migration.md). For general syntax and component conventions, consult [Slidev syntax](https://sli.dev/guide/syntax), [components](https://sli.dev/guide/component), and [directory structure](https://sli.dev/custom/directory-structure); the repository's pinned version and tested behavior take precedence over newer documentation examples.
