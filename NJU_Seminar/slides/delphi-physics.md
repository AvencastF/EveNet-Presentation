---
transition: fade
class: nju-delphi dp-spin-fit
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Recover the full spin density matrix.

<div class="dp-subtitle"><LaTeX formula="\rho" /> encodes the complete spin quantum state of the <LaTeX formula="\tau^+\tau^-" /> pair; all 16 decay categories contribute to its reconstruction.</div>
<div class="dp-fit">
<section><div class="dp-plot"><NJUPlot src="/figures/delphi-fit-clean.png" alt="Combined Asimov fit to 16 signal regions: all 15 spin-density-matrix coefficients for EveNet, the traditional analysis, and theoretical prediction" /></div><div class="dp-gloss">POI = parameter of interest: one fitted spin coefficient.</div></section>
<div class="dp-fit-copy">
<h2>15 spin coefficients determine <LaTeX formula="\rho" /></h2>
<div class="dp-fit-definitions">
<p><LaTeX formula="B_i^{\pm}" />: each particle’s average spin.<br /><LaTeX formula="C_{ij}" />: correlations between the two spins.</p>
<p class="dp-state-message">Together, they specify the full spin quantum state.</p>
<p>Plot labels: <LaTeX formula="A,B" /> = the two particles;<br /><LaTeX formula="i,j\in\{k,n,r\}" /> = the three spin axes.<br />For example, <LaTeX formula="C_{nn}" /> correlates their spins along <LaTeX formula="n" />.</p>
</div>
<p><strong>Forward folding:</strong> pass predicted angle distributions through the response maps from the previous slide, then compare with reconstructed distributions.</p>
<div class="dp-result"><strong><LaTeX formula="10\text{–}40\%" /></strong><p>smaller expected uncertainties on the spin coefficients than the traditional workflow.</p></div>
<p class="dp-limit"><strong>Asimov</strong> = a dataset set to expected counts. Repeated simulated fits include data and simulation statistics; theory and calibration uncertainties remain under study.</p>
</div>
</div>
<div class="dp-source">Cen Mo et al. · ICHEP 2026 · pp. 3, 9–11 · Expected sensitivity, not an observed entanglement result.</div>

<!--
Source pp. 3 and 9–11. Full 15-coefficient combined-fit plot is preserved. 10–40% is the source-reported reduction in parameter uncertainties, not an event-reconstruction metric and not an observed entanglement significance. All 16 SRs enter the simultaneous fit. Classification and reconstruction jointly contribute; do not attribute the gain to generation alone. Theory and calibration systematics are still being studied.
-->
