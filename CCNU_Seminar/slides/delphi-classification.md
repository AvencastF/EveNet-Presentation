---
transition: fade
class: nju-delphi dp-selection
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Identify both tau decay modes

<div class="dp-subtitle">Four visible decay types for each <LaTeX formula="\tau" /> give <LaTeX formula="4\times4=16" /> categories; the <LaTeX formula="\tau^+" /> decay is listed first.</div>
<div class="dp-evidence-heading"><strong>Yield = selected events · purity = fraction in the target channel</strong><span>Each pair: traditional identification (B) / <span class="evenet-wordmark">EveNet</span> (E)</span></div>
<div class="dp-plot dp-classification"><NJUPlot src="/figures/delphi-channels-clean.png" alt="All 16 charge-ordered channels, showing traditional and EveNet yields and signal purity with original channel labels and truth-component legend" /></div>
<div class="dp-gloss"><LaTeX formula="e,\mu,\pi,\rho" /> label the visible decay types; here <LaTeX formula="\rho" /> is the rho meson, not the spin density matrix. MC = simulation; ID = identification.</div>
<div class="dp-note"><strong>The gain</strong><span>Retain more signal in the studied channels, while keeping categories with different spin sensitivities.</span></div>
<div class="dp-source">Cen Mo et al. · ICHEP 2026 · p. 7 · <LaTeX formula="Z\to\tau^+\tau^-" /></div>

<!--
Source p. 7; plot extracted at higher resolution with all channels, legend, yields and purity retained. Original in-plot annotations are preserved. B = baseline/traditional and E = EveNet. Do not claim perfect purity or uniform improvement in every metric. Additional SR cuts are described in source p. 7. Click the figure for full detail.
-->
