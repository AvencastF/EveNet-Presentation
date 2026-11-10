---
class: iml-content iml-keyword-summary
transition: fade
---

# <span class="evenet-wordmark">EveNet</span>: a reusable backbone for collider analysis

<div class="iml-summary-subtitle">Published evidence · analysis applications · outlook</div>

<v-clicks>
<div class="iml-summary-intro">One backbone pretrained on <b>500M simulated events</b>; <b>five heads</b> for downstream tasks.</div>
<div class="iml-summary-rows">
<section class="iml-summary-row iml-summary-performance">
<h2>Physics performance</h2>
<div><p>CMS mass grid: <b>+49% mean SIC</b> relative to XGBoost.</p><p>Exotic Higgs: <b><LaTeX formula="2.5\times" /> scratch SIC</b> with classification alone.</p><p>Quantum correlations: <b>3.33% precision on <LaTeX formula="\Delta" /></b> vs 3.44% for scratch.</p><p>CMS data AD: <LaTeX formula="\Upsilon" /> at <b><LaTeX formula="7.6\sigma" /> median local significance</b> vs <LaTeX formula="1.5\sigma" /> for scratch.</p></div>
</section>
<section class="iml-summary-row iml-summary-transfer">
<h2>Transfer &amp; robustness</h2>
<div><p>Successful adaptation from Delphes to <b>CMS full simulation and collision data</b>.</p><p><b>Greater stability</b> under the tested detector variations.</p></div>
</section>
<section class="iml-summary-row iml-summary-outlook">
<h2>Efficient adaptation</h2>
<div><p>CMS mass grid: <b>up to <LaTeX formula="3\times" /> fewer training steps</b> than scratch.</p><p>Exotic-Higgs search: <b>less dependence on auxiliary supervision</b>.</p></div>
</section>
<section class="iml-summary-row iml-summary-deployment iml-application-row">
<div><h2>Analysis-ready model</h2><span class="iml-application-label">Current applications</span></div>
<div>
<div class="iml-deployment-flow" aria-label="EveNet model exported to ONNX and integrated in ATLAS analysis pipelines">
<div class="iml-deployment-step"><img src="/evenet-logo-gold.svg" class="iml-flow-logo" alt="EveNet emblem" /><div><strong><span class="evenet-wordmark">EveNet</span></strong><small>~20M parameters</small></div></div>
<svg class="iml-flow-arrow" viewBox="0 0 38 16" aria-hidden="true"><path d="M1 8h33m-6-6 6 6-6 6"/></svg>
<div class="iml-deployment-step"><span class="i-carbon:deploy iml-flow-icon"/><div><strong>ONNX</strong><small>Model export</small></div></div>
<svg class="iml-flow-arrow" viewBox="0 0 38 16" aria-hidden="true"><path d="M1 8h33m-6-6 6 6-6 6"/></svg>
<div class="iml-deployment-step"><span class="i-carbon:flow iml-flow-icon"/><div><strong>ATLAS analyses</strong><small>Pipeline integration</small></div></div>
</div>
<div class="iml-deployment-validation">Used in <b>several analyses</b>; tested with <b>their full systematic variations</b>.</div>
</div>
</section>
</div>
</v-clicks>

<div class="iml-strategy-close" v-after>
<div><b>A proof of concept for CERN’s physics foundation model programme.</b><br/>Next: investigate scaling, broader detector transfer and analysis validation.</div>
<a href="https://cio.web.cern.ch/artificial-intelligence" target="_blank" rel="noopener noreferrer">CERN AI strategy · LH-07</a>
</div>

<!--
Merged discussion and conclusion; layout follows EPE_Seminar slide 14: colored keyword labels, aligned short lines, no cards or repeated closing slogan. Click 1 introduces pretraining; click 2 reveals all four takeaways.
The foundation-model claim is supported by reusable weights across diverse tasks and validated downstream transfer, not an unqualified historical first or universal superiority claim. Classification-only pretraining does not reproduce the generative benefits of the full model. Reduced auxiliary-head benefit refers specifically to the downstream exotic-Higgs benchmark.
Transfer to unseen signals and CMS requires downstream adaptation; this is not a zero-shot or arbitrary-detector claim. The two CMS tests combine changes in reconstruction, detector response, pile-up and selection; no controlled pile-up ablation establishes a small causal impact. Published robustness results cover the particular detector variations shown on the preceding slide.
Deployment and ATLAS uptake are presenter-supplied status on 10 November 2026, not numerical results of the paper. Full systematic variations means those used by the participating analyses, not every possible uncertainty. ONNX refers to the deployed analysis model, not all generative sampling paths. Parameter count alone does not measure latency or throughput. Larger models are future work conditional on inference resources.
The closing outlook explicitly connects to the supplied IML 2.pdf (pages 5 and 12–15): reusable event representations, calibration, the last mile of deployment, and useful scaling. Reference: supplied CERN AI programme slides, pp. 4, 5, 12–15, LH-07 and FLARE WP4. Proof of concept describes scientific relevance, not CERN endorsement or formal programme membership.
-->

<style>
.iml-keyword-summary .iml-summary-subtitle {
  color: var(--fg-1, #a6a6af);
  font-size: 17px;
  margin-top: 8px;
}
.iml-keyword-summary .iml-summary-intro {
  margin-top: 15px;
  padding-left: 18px;
  position: relative;
  font-size: 16px;
  line-height: 1.5;
  color: #e3e3e8;
}
.iml-keyword-summary .iml-summary-intro::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #c4b5fd;
}
.iml-keyword-summary .iml-summary-intro b { color: #e6c38e; font-weight: 600; }
.iml-keyword-summary .iml-summary-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.iml-keyword-summary .iml-summary-row {
  display: grid;
  grid-template-columns: 183px minmax(0, 1fr);
  gap: 23px;
  align-items: start;
}
.iml-keyword-summary .iml-summary-row h2 {
  margin: 0;
  padding: 0 0 8px;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--row-color);
  border-bottom: 1px solid color-mix(in srgb, var(--row-color) 45%, transparent);
}
.iml-keyword-summary .iml-summary-row p {
  margin: 0;
  padding-left: 17px;
  position: relative;
  font-size: 15px;
  line-height: 1.45;
  color: #dedee5;
}
.iml-keyword-summary .iml-summary-row p + p { margin-top: 5px; }
.iml-keyword-summary .iml-summary-row p::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--row-color);
  opacity: .6;
}
.iml-keyword-summary .iml-summary-row b { color: var(--row-color); font-weight: 500; }
.iml-summary-performance { --row-color: #8bdce5; }
.iml-summary-transfer { --row-color: #c4b5ed; }
.iml-summary-deployment { --row-color: #edba83; }
.iml-summary-outlook { --row-color: #84d3a2; }
.iml-keyword-summary .iml-application-row {
  border-top: 1px solid rgba(237, 186, 131, .25);
  padding-top: 12px;
}
.iml-keyword-summary .iml-application-label {
  display: block;
  margin-top: 6px;
  color: #c7b7a6;
  font-size: 12px;
}
.iml-keyword-summary .iml-deployment-flow {
  display: grid;
  grid-template-columns: 1fr 32px .85fr 32px 1.25fr;
  gap: 12px;
  align-items: center;
}
.iml-keyword-summary .iml-deployment-step { display: flex; align-items: center; gap: 10px; }
.iml-keyword-summary .iml-flow-logo { width:36px; height:36px; object-fit:contain; flex-shrink:0; }
.iml-keyword-summary .iml-flow-icon { font-size: 29px; flex-shrink: 0; color: #edba83; }
.iml-keyword-summary .iml-deployment-step strong { display: block; font-size: 16px; font-weight: 600; color: #edba83; }
.iml-keyword-summary .iml-deployment-step small { display: block; margin-top: 3px; font-size: 12px; color: #ded2c4; }
.iml-keyword-summary .iml-flow-arrow { width: 32px; fill: none; stroke: #b9936d; stroke-width: 1.5; }
.iml-keyword-summary .iml-deployment-validation { margin-top: 9px; font-size: 14px; color: #dedee5; }
.iml-keyword-summary .iml-strategy-close { display:flex; align-items:center; justify-content:space-between; gap:20px; margin-top:16px; padding-top:10px; border-top:1px solid #ffffff25; color:#c7c7d0; font-size:12px; line-height:1.5; }
.iml-keyword-summary .iml-strategy-close b { color:#e6c38e; font-weight:600; }
.iml-keyword-summary .iml-strategy-close a { flex:none; color:#aaaab8; font-size:10px; text-decoration:underline; }
</style>

<!-- Quantitative conclusion: CMS mean relative SIC +49.0% (slide 8); exotic-Higgs Cls at 300k events 4.062/1.616 = 2.514; quantum relative precision on Delta at largest published training fraction 3.33% vs 3.44%. Each comparison retains its own benchmark and baseline. -->
