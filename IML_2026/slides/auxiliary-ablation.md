---
class: iml-content iml-paper
transition: fade
---

<script setup>
import NJUPlot from "../components/NJUPlot.vue"
</script>

# Pretraining reduces reliance on auxiliary heads

<div class="paper-sub"><LaTeX formula="H_{\mathrm{SM}}\to aa\to4b" />, <LaTeX formula="m_a=30\,\mathrm{GeV}" /> · unseen decay topology · classification + resonance reconstruction</div>
<div class="ablation-evidence">
<section><h2>Sensitivity versus downstream training size</h2><div class="ablation-main"><NJUPlot src="/figures/auxiliary-heads.svg" alt="Peak SIC versus training size for classification, assignment, and segmentation configurations" /></div><p class="paper-note"><b>Colour:</b> pretraining variant. <b>Line style:</b> downstream heads.<br/>“Cls-Only” in the legend denotes pretraining; “Cls” denotes the downstream head.</p></section>
<section>
<div class="paper-heads"><h2>What is varied downstream?</h2><p><b>Cls:</b> signal/background classification</p><p><b>Cls + Asn:</b> add fixed-topology assignment</p><p><b>Cls + Seg:</b> add resonance masks</p></div>
<p class="paper-note"><b>Peak SIC at 300k training events</b> · 150% of reference</p>
<table class="paper-table ablation-numbers"><thead><tr><th>Heads</th><th class="scratch-col">Scratch</th><th class="full-col">Full</th></tr></thead><tbody>
<tr><td>Cls</td><td><LaTeX formula="1.62\pm0.05" /></td><td><LaTeX formula="4.06\pm0.57" /></td></tr>
<tr><td>Cls + Asn</td><td><LaTeX formula="2.30\pm0.12" /><small>+42%</small></td><td><LaTeX formula="4.14\pm1.10" /><small>+1.8%</small></td></tr>
<tr><td>Cls + Seg</td><td><LaTeX formula="2.62\pm0.42" /><small>+62%</small></td><td><LaTeX formula="4.48\pm0.70" /><small>+10.2%</small></td></tr>
</tbody></table>
<p class="paper-note">Gains relative to Cls within each model; quoted errors from the ROC statistics.</p>
<div class="paper-insight"><b>Data efficiency</b><p>With Cls alone, Full at 10k events exceeds Scratch and SPANet at 300k.</p></div>

</section>
</div>
<div class="paper-result"><span i-carbon:machine-learning /><div><b>Full with Cls alone exceeds Scratch with auxiliary heads:</b> peak SIC 4.06 versus at most 2.62.</div></div>
<!-- Published Fig.4 and discussion. Reference dataset = 200k events; raw plot axis is training size in thousands. SIC = signal efficiency / sqrt(background efficiency). -->

<!-- Curve colors label pretraining variants; line styles label downstream heads. Cls-Only in the figure means classification-only pretraining, distinct from Cls (solid line), which means classification-only downstream fine-tuning. -->

<style>
.ablation-numbers small { display:block; margin-top:2px; font-size:11px; color:#bfcbd7; }
.ablation-numbers .scratch-col { color:#E69F00; }
.ablation-numbers .full-col { color:#56B4E9; }
.ablation-numbers td { white-space:nowrap; }
.slidev-layout.iml-paper .ablation-main .zoomable-plot-container { height:285px!important; }
</style>

<!-- Table source: https://evenet-hep.github.io/EveNet_Result_Plot/ , BSM SIC panel 2, train_size=300 (thousands), ma=30 GeV. Nominal means Full. Raw peak SIC/errors: Full Cls 4.062/0.5676, Asn 4.136/1.099, Seg 4.475/0.695; Scratch Cls 1.616/0.05496, Asn 2.3/0.1242, Seg 2.619/0.4235. Percent changes computed from unrounded central values; they are descriptive, not significance estimates. Source plotting function propagates FPR uncertainty at the raw ROC maximum. -->
