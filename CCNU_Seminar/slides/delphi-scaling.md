---
transition: fade
class: nju-delphi dp-scaling
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Scaling test

<div class="dp-subtitle">Top-1 error versus the number of DELPHI training events. FM is the LHC-pretrained model; scratch starts from random weights.</div>
<div class="dp-split">
<div class="dp-plot"><NJUPlot src="/figures/delphi-scaling.png" alt="Scaling-law plot of top-1 error versus training-set size, with scratch and FM power-law fits and uncertainty bands" /></div>
<div class="dp-callouts">
<div><h3>Power-law scaling</h3><p>Both errors fall as a power of <LaTeX formula="N" />. The fit is printed on the figure.</p></div>
<div><h3>Small <LaTeX formula="N" /></h3><p>The pretrained model has the lower error.</p></div>
<div><h3>Steeper scratch slope</h3><p>Training from scratch improves faster and meets the pretrained curve at large <LaTeX formula="N" />.</p></div>
</div>
</div>
<div class="dp-source">Chen-Hua et al. · ML4Jets · 2026.09.16</div>

<!--
Source: ML4Jets.key slide 17, original vector figure scaling_bands. FM is the LHC-pretrained model in the figure legend. The fit coefficients stay inside the figure. The comparison is a training-size scaling result.
-->
