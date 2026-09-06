---
transition: fade
class: nju-delphi
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Reconstruct the missing kinematics.

<div class="dp-subtitle">One generative strategy across <LaTeX formula="\tau^+\tau^-" /> decay channels.</div>
<div class="dp-reco-method">
<div><strong>Diffusion targets</strong><span class="dp-targets"><LaTeX formula="\Delta\eta_{\tau,\tau_{\mathrm{vis}}},\;\Delta\phi_{\tau,\tau_{\mathrm{vis}}}" /></span></div>
<span class="dp-arrow"><LaTeX formula="\longrightarrow" /></span>
<div><strong>Post-calibration</strong>Impose the system’s kinematic constraints</div>
<span class="dp-arrow"><LaTeX formula="\longrightarrow" /></span>
<div><strong>Physics inputs</strong>Reconstruct decay-angle observables</div>
</div>
<div class="dp-comparison">
<section><h2>Traditional reconstruction</h2><div class="dp-plot"><NJUPlot src="/figures/delphi-response-traditional.png" alt="Traditional response matrices for the spin-angle and angle-product observables, preserving axes and color scales" /></div></section>
<section><h2><span class="evenet-wordmark">EveNet</span></h2><div class="dp-plot"><NJUPlot src="/figures/delphi-response-evenet.png" alt="EveNet response matrices for the same spin-angle and angle-product observables, preserving axes and color scales" /></div></section>
</div>
<div class="dp-axis-note">Response matrices · vertical: truth · horizontal: reconstructed</div>
<div class="dp-note"><strong>The tradeoff</strong><span>Less reconstruction bias, at the cost of slightly worse resolution.</span></div>
<div class="dp-source">Cen Mo et al. · ICHEP 2026 · p. 8</div>

<!--
Source p. 8. Two plot pairs extracted without the slide footer or overlapping takeaway, retaining original labels and color scales. Targets are angular differences between each tau and its visible decay products, followed by system calibration. Do not describe independent generation of all neutrino four-vectors. Traditional fully hadronic reconstruction solves constrained kinematic equations; other channels use a likelihood grid search. Rest-frame decay angles carry spin information.
-->
