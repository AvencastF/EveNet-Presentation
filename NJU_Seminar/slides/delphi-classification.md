---
transition: fade
class: nju-delphi
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Classify the event, retain more signal.

<div class="dp-subtitle">Full-event understanding across 16 charge-ordered decay channels.</div>
<div class="dp-evidence-heading"><strong>Yield and signal purity</strong><span>Each pair: traditional ID (B) / <span class="evenet-wordmark">EveNet</span> (E)</span></div>
<div class="dp-plot dp-classification"><NJUPlot src="/figures/delphi-channels-clean.png" alt="All 16 charge-ordered channels, showing traditional and EveNet yields and signal purity with original channel labels and truth-component legend" /></div>
<div class="dp-note"><strong>Classification gain</strong><span>Higher efficiency, with comparable or higher purity in the studied channels.</span></div>
<div class="dp-source">Cen Mo et al. · ICHEP 2026 · p. 7 · <LaTeX formula="Z\to\tau^+\tau^-" /></div>

<!--
Source p. 7; plot extracted at higher resolution with all channels, legend, yields and purity retained. Original in-plot annotations are preserved. B = baseline/traditional and E = EveNet. Do not claim perfect purity or uniform improvement in every metric. Additional SR cuts are described in source p. 7. Click the figure for full detail.
-->
