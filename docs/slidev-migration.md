# Shared Slidev infrastructure migration

Branch: `codex/slidev-shared-build`, based on `main` at `b592520`.

## Design

One root npm installation serves the five existing presentation directories. The local npm workspace `slidev-addon-evenet` supplies 13 identical components, the math helper, global layers, and common UnoCSS/Vite configuration. The default theme remains unchanged. This uses Slidev's documented [addon](https://sli.dev/guide/theme-addon) and [directory conventions](https://sli.dev/custom/directory-structure).

Deck-specific content, assets, HTML injections, and unique components remain local. Small forwarding components preserve historical explicit Markdown imports of LaTeX and PlotlyChart. `style.ts` imports shared styles in their original order; `ICHEP2027` retains its own animation stylesheet. The two newer decks retain their extra icon safelists.

The command wrapper runs the root-installed CLI with the selected deck as its working directory. CI installs once with npm download caching, tests the wrapper, and builds every deck sequentially. The landing page and `/<repository>/<deck>/` addresses are unchanged. No output caching, parallel build, push, merge, or deployment is included.

## Version policy

The root lockfile starts from `AI_LHC_2026/package-lock.json`. Every existing package entry retains its version. Slidev CLI/client remain `52.11.3`; the default theme remains `0.25.0`. The only additional package is the already-used `slidev-addon-fancy-arrow@0.16.1`, plus the local addon workspace link.

The older Japan/EPE lockfiles differ from the chosen lockfile in 14 transitive tooling entries. Consolidation intentionally uses the approved AI_LHC lock, rather than performing a general dependency update. Historical output is checked against each deck's own original dependency set.

## Verification

- Built the original decks, then the root-install-only stage, then the shared-addon stage using the existing deployment bases.
- Verified a separate source-only copy with a clean root `npm ci` and no per-deck dependency directories. All five decks and a generated starter build successfully there.
- Compared all 86 slides at initial and final click states: Japan 15, AI_LHC 23, EPE 15, HWW 14, ICHEP 19. All slide text, click totals, and loaded-image checks match.
- Captured 172 states in Chrome at 1280×720 with loaded fonts, seeded randomness, fixed SVG animation time, and controlled animation-frame timestamps. 157 pairs are pixel-identical; 14 have only tiny raster-rounding differences. The remaining ICHEP text-smoothing variation also occurs between repeated captures of the unchanged baseline. Its final geometry/styles match, and flattening the completed animation layers produces pixel-identical baseline/migrated images. No unexplained visual differences remain.
- Verified all 129 tracked public assets against the output, unchanged content/data files, identical extracted component implementations apart from terminal newlines, and an unchanged landing page. The existing ignored `.DS_Store` is not presentation content and was left untouched.
- Every emitted CSS file has an equivalent original stylesheet after normalizing generated Vue scope/keyframe identifiers. Generated bundle filenames may differ.
- Nine automated tests cover name validation, no-overwrite scaffolding, root CLI invocation, argument forwarding, failure propagation, sequential output paths, source/output protection, complete discovery, and compatibility component rendering.
- The generated starter was developed, built to its own `dist`, and exported to PDF using the preserved export flags.
- Baseline and migrated browser reports match for all five decks: direct slide links and refresh, 54 intermediate keyboard click states, presenter/overview routes and slide totals, 129 public HTTP responses, and no console errors during settled navigation. Pie-chart tooltips match on the four overview decks; plot zoom/open/Escape-close behavior matches on all five decks.
- Invalid names, reserved output names, and existing-directory protection were tested from the actual CLI. A deliberately failing Vite configuration returned exit code 1 through the wrapper.

Browser artifacts and machine-readable reports, including asset inventories, are local and ignored under `output/playwright/`. The fixed-animation comparison is `comparison-baseline-settled-final-settled.json`; baseline and final route reports are the corresponding `*-settled-interactions.json` files.

## Local build timing

These are single local runs, not a controlled benchmark or a prediction of GitHub runner performance. Font/network and filesystem cache state affect measurements.

| Deck | Original dependencies | Shared installation/addon |
| --- | ---: | ---: |
| AI_HEP_Japan | 24.6 s | 21.2 s |
| AI_LHC_2026 | 26.8 s | 21.7 s |
| EPE_Seminar | 24.5 s | 21.5 s |
| HWW_QE_lvlv | 14.7 s | 6.4 s |
| ICHEP2027 | 24.6 s | 21.0 s |
| Total | 115.3 s | 92.1 s |

The primary CI improvement is eliminating four installations and caching package downloads. Every presentation still builds on every run.

A separate cached-install comparison used `npm ci --offline --no-audit --no-fund` in temporary verification copies (the original three incomplete lockfiles received the baseline-only repair described below). Five old installations took 32.6 seconds total; one shared installation took 4.9 seconds. This measures cached local extraction/installation, not cold network downloads. The source-only shared copy passed all tests again after that clean installation.

## Pre-existing issues and migration pitfalls

- Original Japan, EPE, and ICHEP lockfiles failed a clean `npm ci` because optional Nuxt kit entries were missing. Only the temporary baseline copies received the missing entries needed to install their existing dependencies. The selected AI_LHC lockfile already contained them; repository dependencies were not upgraded to repair this.
- Very rapid navigation away from the original overview can expose a LaTeX asynchronous-render/unmount race (`Cannot set properties of null`). Normal settled navigation passes. Its implementation is unchanged; this is not silently fixed by the migration.
- Existing large Plotly bundle warnings remain. Local Node 25 also emitted its existing local-storage warning.
- Local compatibility components intentionally take precedence over identically named addon components, producing auto-import naming warnings. Explicit imports still resolve to the shared implementation.
- During verification, CSS `@import` left UnoCSS directives unexpanded, and script-only Vue forwarding files rendered empty in Slidev's production build. Both migration regressions were corrected: ordered TypeScript CSS imports and real forwarding templates are required. The component test guards against script-only wrappers.

The original untracked presentation notes and unrelated generated exports remain untouched. Obsolete per-deck dependency directories were moved out of the repository to `/private/tmp/slidev-refactor.w8B5My/old-deps` on the migration machine; they are also reinstallable. No production state was changed.
