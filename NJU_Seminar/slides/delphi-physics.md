---
transition: fade
class: nju-delphi
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Better reconstruction reaches the physics fit.

<div class="dp-subtitle">Expected precision on the full spin density matrix.</div>
<div class="dp-fit">
<div class="dp-plot"><NJUPlot src="/figures/delphi-fit-clean.png" alt="Combined Asimov fit to 16 signal regions: all 15 spin-density-matrix coefficients for EveNet, the traditional analysis, and theoretical prediction" /></div>
<div class="dp-fit-copy">
<h2>One simultaneous fit.<br />All 16 signal regions.</h2>
<p>Forward folding connects classification and reconstruction to the spin-density-matrix coefficients.</p>
<div class="dp-result"><strong><LaTeX formula="10\text{–}40\%" /></strong><p>smaller expected parameter uncertainties<br />than the traditional workflow.</p></div>
<div class="dp-coefficients"><span>6 polarization · <LaTeX formula="B_i^{\pm}" /></span><span>9 correlation · <LaTeX formula="C_{ij}" /></span></div>
<p class="dp-limit">Asimov study with data and MC statistical fluctuations. Theory and calibration systematics remain under study.</p>
</div>
</div>
<div class="dp-source">Cen Mo et al. · ICHEP 2026 · pp. 3, 9–11 · Expected sensitivity, not an observed entanglement result.</div>

<!--
Source pp. 3 and 9–11. Full 15-coefficient combined-fit plot is preserved. 10–40% is the source-reported reduction in parameter uncertainties, not an event-reconstruction metric and not an observed entanglement significance. All 16 SRs enter the simultaneous fit. Classification and reconstruction jointly contribute; do not attribute the gain to generation alone. Theory and calibration systematics are still being studied.
-->
