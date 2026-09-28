---
transition: fade
class: nju-delphi dp-confusion
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Confusion among the 17 channels

<div class="dp-subtitle">Fraction of true events assigned to each predicted channel. The diagonal is a correct assignment.</div>
<div class="dp-split">
<div class="dp-plot"><NJUPlot src="/figures/delphi-confusion.png" alt="17-way confusion matrix for tau-pair decay channels, with true channel on the vertical axis and predicted channel on the horizontal axis" /></div>
<div class="dp-callouts">
<div><h3><LaTeX formula="\pi\rho" /></h3><p>The largest off-diagonal is <LaTeX formula="\pi \leftrightarrow \rho" />.</p></div>
<div><h3><LaTeX formula="\rho\rho" /></h3><p>The rho–rho channel is the weakest diagonal entry in the hadronic block.</p></div>
<div><h3>Leptonic pairs</h3><p><LaTeX formula="ee" />, <LaTeX formula="\mu\mu" />, and the mixed lepton channels stay sharply diagonal.</p></div>
</div>
</div>
<div class="dp-source">Chen-Hua et al. · ML4Jets · 2026.09.16</div>

<!--
Source: ML4Jets.key slide 15, original figure confusion_pretrain. The heatmap raster in the Keynote file is 681 pixels; axis labels are vector. Red callout boxes on the Keynote slide are restated here as the pi-rho and rho-rho notes, not drawn onto the figure. Channel labels inside the figure are preserved. Do not claim uniform purity. "others" is the source's residual category.
-->
