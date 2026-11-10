# IML workshop, 11 November 2026

EveNet: A Foundation Model for Particle Collision Data Analysis.

Independent Slidev deck generated with the root starter, using the Wuhan (`CCNU_Seminar`) presentation as the content and visual base. The Wuhan deck and shared infrastructure are unchanged. Only selected source slides, required local components, fonts, styles and assets were copied. The existing Graphite & Gold identity and shared wordmark are retained.

```bash
npm run dev -- IML_2026
npm run build -- IML_2026 --base /EveNet-Presentation/IML_2026/
npm run export -- IML_2026
```

## Slide map

1. Cover — workshop title and date
2. Traditional ML paradigms — unchanged
3. Unified model introduction — unchanged
4. Animated architecture overview — unchanged
5. Three deterministic heads — replaces three task pages
6. Two generative heads — replaces two task pages
7. Pretraining variants — unchanged
8. Four-task overview — retained; CMS simulation label clarified
9. CMS Open Data mass grid — existing results, explicit full-simulation/pile-up context
10. CMS collision-data resonance rediscovery — dedicated result page
11. Auxiliary-head ablation — explicit downstream-task conclusion
12. Detector-systematic robustness — unchanged
13. Discussion — transfer/pile-up, analysis deployment, model size
14. Conclusions — explicit evidence-based statements
15. Thank you/resources — workshop label updated

RL, DELPHI, their transitions, the ATLAS transition, and the internal HHML result are excluded. No internal HHML figure was copied. ATLAS use is mentioned only at the level requested by the presenter.

## Scientific sources and interpretation

- Published-model content follows the Wuhan slides and the local paper source `/Users/avencastmini/EveNet_Paper/main.tex`.
- CMS mass distributions: original `AD/ad_mass_distribution.svg` and `AD/ad_mass_distribution_no_signal.svg` from the final-paper plotting directory.
- `public/figures/auxiliary-heads.svg`: direct vector export of original BSM data using the original peak-SIC computation and scatter renderer; reproducible with `scripts/export-ablation.py`. No screenshot, raster crop, or estimated data values.
- The two CMS applications are distinct: the mass-grid study uses full simulation with pile-up; the resonance study uses recorded collision data and data-driven adaptation/calibration.
- Reduced auxiliary-head benefit refers to downstream Cls/Cls+Asn/Cls+Seg in the exotic-Higgs benchmark. It is not a statement that auxiliary tasks never help, or that classification-only pretraining is sufficient for generation.
- The 20M/ONNX integration, full analysis-systematics testing and several ATLAS users are the presenter's status update on 10 November 2026. No internal numerical result, inference latency, or claim that every diffusion path is exported is included.
- The discussion draws implicitly on the supplied `IML 2.pdf`, particularly pages 5 and 12–15: reusable event representations, calibration, deployment, and scaling. It does not imply CERN endorsement.
- Successful adapted transfer does not isolate the causal effect of pile-up and does not establish zero-shot or arbitrary-detector generalisation. The conclusion makes no unqualified priority claim.

## Components and scope

The retained architecture and cover use the Wuhan-local `NJUAnimatedEveNet` and `NJUChapterScene`. `NJUPlot` retains click-to-enlarge figures. Slides 5–6 now use the deck-local `IMLTaskHeads` component: a consistent SVG/HTML layout with LaTeX particle labels, animated classification/assignment/segmentation examples and two distinct diffusion examples. Its 5.2-second loop runs only on the active audience slide; inactive slides, presenter/overview and reduced-motion views show a settled state. No shared component, dependency, or historical deck was changed.

The title page links the published Nature Machine Intelligence article and arXiv together. The revision was checked against Figure 1 and the Model architecture section of the NMI PDF in Zotero (parent `XE5Q655S`, PDF `VHZ2LXS8`). ReconGeneration is self-supervised using original reconstructed inputs; only TruthGeneration uses invisible-particle simulation-truth targets.

## Verification

- Production build at `/EveNet-Presentation/IML_2026/`: passed.
- Root repository tests: 9 passed. `git diff --check` passed.
- Scientific figure crops: visually inspected against their source panels.
- Source/asset checks: all entry references and local figure paths resolve; 15 slides; excluded physics sections are not in the entry.
- Original Wuhan source and shared files: unchanged.
- Revision QA: visually reviewed slides 1, 5 and 6 before/after in Chrome using the user-started `http://localhost:3030/` preview, at the same browser viewport and fonts. Checked refreshed direct navigation, changing animation phases on active slides, settled inactive/overview instances, overview rendering, formula labels and visible footer bounds. Slides 5–6 require no clicks. The console had two browser-message-channel errors already present before revision; no new component error was observed. Presenter mode, reduced-motion emulation and served production-base interaction checks were not run. The earlier ignored offline QA bundle is not a deliverable.
- The existing remote-font fetch and large-chunk warnings also appear in the Wuhan baseline build. The deck includes its local DM Sans font.

No landing-page entry, commit, push, or deployment was made. As with every top-level deck, this folder will be discovered by `build:all` in a future deployment.

## Plot authoring rule

Use original SVG plots from `/Users/avencastmini/PycharmProjects/EveNet_Result_Plot/plot/final_paper`. Where only PDF exists, export SVG directly from the original plotting code and data. Do not use screenshots or raster crops. Keep source provenance in notes/README rather than audience-visible footnotes.

### November 10 visual refinement
- Slides 5–6: removed explanatory footnotes; segmentation now shows separately predicted resonance groups, contrasted with assignment's specified decay tree.
- Slides 8–12: consistent local evidence layouts, original SVG assets, no raster figure crops. The overview gives equal prominence to CMS simulation and recorded data.
- Production build passed with `/EveNet-Presentation/IML_2026/` base; npm tests 9/9 passed. Chrome live dev review covered slides 5 and 8–12; corrected inherited sizing and subtitle opacity. Production-base serving remains unverified in browser due local binding restrictions.

### Superseding visual direction: original Wuhan slides 8–9
Restored the original four-column downstream overview, its quantitative comparisons and one-click reveal, and the original mass-grid layout with its study panel and three result rows. Keep this richer visual structure as the design reference; do not replace it with sparse editorial layouts. Retained explicit CMS simulation/collision labels and the original SVG mass-grid plot. Production build passed; browser checked overview before/after reveal and mass-grid layout.

### Slides 10–12: rich evidence panels
Applied Impeccable polish against the restored Wuhan visual reference: paired CMS signal/control frames plus a significance comparison; original ablation SVG with scratch/pretraining interpretation panels; framed systematics grid and colored result emphasis. No plot data or assets changed, no added source footnotes. Live desktop review covered all three slides and corrected bottom-edge crowding on 10 and 12. Only deck-local content/CSS changed.

### Paper-led reconstruction of slides 10–12
Supersedes the sparse panel treatment. AD now leads with the original `ad_significance.svg` (all four train/test configurations), mass/control spectra, published significance/calibration values, training statistics, and pseudo-experiment interpretation. Ablation adds published SIC/data-efficiency comparisons and head definitions. Systematics uses equal-width original SVGs, a separate reading rail, response definitions and published interval widths. Facts checked against the published Zotero full text, Fig.3–5 captions and Methods. Build passed; desktop browser inspection covered all three and a second pass corrected crowding. No shared files or slides 8–9 changed.

### Closing slides 13–14
Restored the Wuhan conclusion composition (model strip, three colored evidence panels, deployment band) with IML-only claims. Discussion reformatted as observations versus open questions across transfer/pile-up, deployment and scaling. Preserved the scientific caveats and presenter's integration status. Desktop browser reviewed both and tightened discussion spacing. No other slide content changed.

### Merged closing slide (supersedes slides 13–14 above)
Discussion and summary are now one slide 13, following EPE_Seminar slide 14: four colored keyword rows with aligned short statements. Removed repeated model/deployment claims and closing slogans; retained the pile-up limitation and scaling discussion. The prior discussion source is retained unreferenced. Thank-you is now slide 14. Only the summary, entry ordering and this record changed.
Production-base build passed. Chrome desktop review confirmed the merged layout, readable emphasis and two reveal states; no served production-base browser check was performed.

### Closing slide: paper results followed by applications
Slide 13 now orders performance, transfer/robustness and efficient adaptation before a separate Analysis-ready model section. A compact vector/icon flow connects the ~20M model to ONNX and ATLAS pipelines; application status is explicitly distinguished from published results. Production-base build and live Chrome visual check passed.

### NMI consistency and CERN outlook
- Published NMI article is the nominal numerical reference. Slide 8 now reports precision on Delta: Full 3.33%, Scratch 3.44%, SSL 3.55%, versus the 5.26% external reference. Bars updated; unsupported Cls entry removed. Reference and scratch improvements are distinguished.
- CMS anomaly downstream analysis uses collision data only; no MC sample enters downstream adaptation/evaluation. The pretrained weights originate from simulation.
- Pretraining and downstream heads are distinguished; SIC normalization explicitly uses the propagated statistical uncertainty per variation, as defined in the published paper.
- Slide 13 remains the merged conclusion/discussion, with paper results before the analysis-ready application flow. A compact closing outlook links to CERN AI strategy LH-07: proof of concept, with further scaling, detector-transfer and analysis-validation studies. The old unreferenced discussion source remains archived.
- Visual QA: Chrome live preview, slides 7, 8, 10, 11, 12 and 13; conclusion initial and reveal states. Production-base build passed; served production-base browser inspection was blocked by local socket-binding permissions (EPERM). Existing remote-font and large-chunk warnings persist.
