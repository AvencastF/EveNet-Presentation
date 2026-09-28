# CCNU seminar draft

EveNet: From Event Understanding to Invisible-Particle Reconstruction

Independent Slidev deck generated with the repository starter. Existing decks and shared infrastructure are unchanged. No seminar date has been assumed.

```bash
npm run dev -- CCNU_Seminar
npm run build -- CCNU_Seminar
```

## Slide map

1. [cover](slides/cover.md)
2. [traditional-ml-paradigms](slides/traditional-ml-paradigms.md)
3. [unified-model-intro](slides/unified-model-intro.md)
4. [model-overview](slides/model-overview.md)
5. [Classification](slides/animated-architecture.md)
6. [Assignment](slides/animated-architecture.md)
7. [Segmentation](slides/animated-architecture.md)
8. [Self-supervised generation](slides/animated-architecture.md)
9. [Supervised generation](slides/animated-architecture.md)
10. [pretrain](slides/pretrain.md)
11. [downstream-overview](slides/downstream-overview.md)
12. [grid-study-results](slides/grid-study-results.md)
13. [systematics-robustness](slides/systematics-robustness.md)
14. [preference-transition](slides/preference-transition.md)
15. [rl-motivation](slides/rl-motivation.md)
16. [preference-generation](slides/preference-generation.md)
17. [rl-results](slides/rl-results.md)
18. [lep-transition](slides/lep-transition.md)
19. [delphi-transfer](slides/delphi-transfer.md)
20. [delphi-confusion](slides/delphi-confusion.md)
21. [delphi-scaling](slides/delphi-scaling.md)
22. [delphi-classification](slides/delphi-classification.md)
23. [delphi-physics](slides/delphi-physics.md)
24. [higgs-outlook](slides/higgs-outlook.md)
25. [hhml-results](slides/hhml-results.md)
26. [summary](slides/summary.md)
27. [thank-you](slides/thank-you.md)

## Sources and editing

- Core slide content and styling adapted from ICHEP2027. Only required local assets are included.
- Four-slide RL mini-section: the chapter bridge and motivation follow the ML4Jets 2026 preference-optimization talk (a general refinement of generative quantities; neutrino momenta are the example). The DGPO method and results remain from Yi-Ren Wu et al., `EPE Seminar.pdf`.
- DELPHI section: workflow, confusion matrix, scaling, channel yields, and the Asimov spin matrix. Footnotes cite Chen-Hua et al., ML4Jets, 2026.09.16. The feature-attribution and response-matrix slides are not in the deck.
- Figures are cropped PDF renders, preserving plotted values and original legends. Text and layout are editable in each Markdown file. The complete source PDFs remain outside the deck.
- `components/NJUPlot.vue` is the existing ICHEP plot viewer copied under a deck-specific name. Shared math, charts and illustrations are consumed directly from the addon.
- `styles/local.css` contains only the ICHEP-specific logo gradient and NJU slide layouts.
- Slide 25 adds the supplied internal preliminary HHML result from `HHML_IHEP.pptx`, slide 9. The original plot is preserved, with rounded gains from a single configuration relative to inclusive XGB. This local addition has not been published.
- Listed on the GitHub Pages landing page. The root Pages workflow builds this deck together with the other presentations and publishes it at `/EveNet-Presentation/CCNU_Seminar/` on pushes to `main`.

## Architecture and task sequence

The approved animated overview replaces the earlier model summary at slide 4. The previous source is retained in `archive/model-overview-legacy.md`. The five task illustrations follow immediately at slides 5–9. The old input, discriminative-head and generative-head sources are retained but excluded from the deck.

- 4: live data flows through a seamless mechanical housing; one click retracts the panels and exposes all five branches.
- 5–7: immediately rendered classification, assignment and segmentation outputs.
- 8: immediately rendered self-supervised denoising of perturbed visible point-cloud channels.
- 9: immediately rendered supervised neutrino generation from truth-level invisible-particle targets.

Slide 4 has exactly **one click** to open the model. Slides 5–9 start at their complete result. Idle motion repeats every **2.5 seconds**; the opening reveal takes 1.6 seconds. Reduced-motion views settle immediately; inactive and hidden slides stop animating. Speaker notes distinguish training targets from inference inputs. All samples and trajectories are illustrative.

`components/NJUAnimatedEveNet.vue` is deliberately deck-local. Anime.js 4.5.0 is pinned in the root installation. The source code also offers optional Regression and independent GlobalGeneration modules; these are outside the existing talk's five-head scope. No model code or datasets are bundled.

Browser regression check (serve the production build at its deployment base first):

```bash
CCNU_PREVIEW_URL=http://127.0.0.1:4174/EveNet-Presentation/CCNU_Seminar/ node CCNU_Seminar/check-animation.mjs
```

Review the development deck at http://localhost:3030/. The approved architecture overview is now at `#/4`.

## Graphite & Gold

The presenter-approved NJU theme lives in `styles/graphite.css`; it uses the bundled DM Sans, gold wordmarks and a matching local logo, quiet framing, blue highlights, amber/violet/mint/coral task colors, and a slow blue–violet background gradient. Scientific plot colors are preserved. Reduced-motion and print views stop the background/wordmark animations. See `DESIGN.md` for tokens and `PRODUCT.md` for presentation constraints.

## DGPO animation (slide 16)

`components/NJUAlignLoop.vue` uses the installed anime.js 4.5.0 with the same slide-activity, visibility and reduced-motion lifecycle as the architecture illustration. Three clicks cover reward scoring, within-event standardization, and the DGPO update. The mass evidence now lives on slide 17 alongside unfolding. The initial state samples eight joint neutrino-pair candidates. The diagram keeps candidate identities fixed across transitions; signed advantage values are computed from the illustrative rewards, not benchmark data.

The method follows the supplied EPE Seminar PDF, pp. 10–15: component-normalized squared Cartesian truth distance, an event-local reward baseline, and a KL-free DGPO update. CPO / frozen-AE latent SWD is summarized as the current safeguard; removing CPO is ongoing work. Truth dependence and mode-suppression risks remain explicit. Scientific evidence and measured metrics are unchanged. Formulas render synchronously through the existing KaTeX dependency so fast forward/backward navigation cannot leave an asynchronous render targeting an unmounted element.

Slides 14–17 share `styles/align-section.css`: a chapter bridge for preference refinement, a likelihood-surface motivation in the slide 14 wireframe style (naive regression, generative models, then RL), the DGPO method, and a combined results slide. Slide 17 contains the original mass SVG, all four mass metrics, and the complete four-region unfolding plot; the duplicate mass PNG is retained as an unused source asset. Slide numbering remains unchanged.


## Chapter transitions

Transition slides alone use the deck-local `components/NJUChapter.vue` and `styles/chapters.css`. Full-width chapter rails locate the static bridges at 14 (alignment), 18 (LHC-to-LEP adaptation) and 24 (ATLAS outlook). Their darker, animated detector scenes distinguish them from content slides. Architecture remains at slide 4 and its five task slides remain at 5–9. Content slides have no chapter labels. Slide 26 retains the original paper summary for later presenter edits.

The alignment bridge presents reinforcement learning as a general refinement of generative quantities, with underconstrained neutrino momenta as the working example. It does not claim that DGPO determines a quantum state. The LEP bridge explicitly describes adaptation; DELPHI is not presented as an EveNet-Align application or zero-shot transfer. The ATLAS credentials line is a joke on a static outlook slide, with no access control. The following slide contains the supplied internal preliminary HHML result.

## DELPHI evidence sequence (slides 18–23)

`styles/delphi-section.css` scopes the content slides to the approved Graphite & Gold palette. Slide 18 remains the chapter bridge. Slide 19 keeps the workflow. Slide 20 is the confusion matrix. Slide 21 is the scaling law. Slide 22 keeps the channel-yield comparison. Slide 23 draws the Asimov spin-density matrices in HTML, with Bell nonlocality and concurrence in a comparison table. Feature attribution is unhooked. The response-matrix slide remains in `slides/delphi-reconstruction.md`.

Particle notation and formulas use LaTeX. The quoted significances are expected Asimov results, not an observed entanglement result. Every DELPHI footnote reads Chen-Hua et al. · ML4Jets · 2026.09.16.


## Animated chapter backgrounds

The title page uses the same component's `foundation` scene: event streams converge into a rotating, gold shared-representation lattice and fan out into five warm-colored task constellations. This is a decorative foundation-model metaphor, not a literal architecture or measured event display. The amber–champagne–rose palette, split rim and radial traces echo the approved emblem; the emblem sits beside the title in clear space. The existing cover copy and approved wordmark are preserved. It follows the same activity and reduced-motion rules as the chapter scenes, with no added clicks.

`components/NJUChapterScene.vue` draws three distinct decorative scenes on transitions 14, 18 and 24, preserving foreground copy and layout. RL uses a multimodal probability surface, labeled as a generic conditional p(z|x), that concentrates smoothly; LEP uses two linked state-space spheres with a central Z vertex and tau labels; Higgs retains the perspective detector with two H branches and daughter pairs. Background notation uses LaTeX. These are illustrative motifs, not measured distributions, a factorization of the two-particle density matrix, accurate detector models, simulated events or internal ATLAS material.

Rendering is capped near 30 fps and device pixel ratio 2. Only the active audience slide animates; hidden pages, inactive slides, presenter/overview and reduced-motion views retain a still composition. The canvas is decorative and excluded from accessibility text. No extra clicks or dependencies are introduced.
