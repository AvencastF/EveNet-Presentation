---
transition: fade
class: nju-delphi dp-directions
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Next, recover the directions that reveal spin.

<div class="dp-subtitle">Missing neutrinos hide the parent rest frames. Recover the parent motion to measure decay angles.</div>
<div class="dp-reco-method">
<div><strong>Generate angular offsets</strong><span class="dp-targets"><LaTeX formula="\Delta\eta_{\tau,\tau_{\mathrm{vis}}},\;\Delta\phi_{\tau,\tau_{\mathrm{vis}}}" /></span><small>Parent direction relative to visible decay products</small></div>
<span class="dp-arrow"><LaTeX formula="\longrightarrow" /></span>
<div><strong>Enforce kinematics</strong>Adjust to the pair’s energy–momentum constraints</div>
<span class="dp-arrow"><LaTeX formula="\longrightarrow" /></span>
<div><strong>Measure rest-frame angles</strong>Single angles probe polarization; products probe correlations</div>
</div>
<div class="dp-comparison">
<section><h2>Traditional reconstruction</h2><div class="dp-plot"><NJUPlot src="/figures/delphi-response-traditional.png" alt="Traditional response matrices for the spin-angle and angle-product observables, preserving axes and color scales" /></div></section>
<section><h2><span class="evenet-wordmark">EveNet</span></h2><div class="dp-plot"><NJUPlot src="/figures/delphi-response-evenet.png" alt="EveNet response matrices for the same spin-angle and angle-product observables, preserving axes and color scales" /></div></section>
</div>
<div class="dp-gloss">In the plots, <LaTeX formula="A,B" /> label the two particles; <LaTeX formula="k,n,r" /> label three spin axes. <LaTeX formula="\theta" /> is the decay direction relative to an axis.</div>
<div class="dp-axis-note">Response maps describe reconstruction, while <LaTeX formula="\rho" /> describes spin. Vertical: simulated truth; horizontal: reconstructed.</div>
<div class="dp-note"><strong>How to read the maps</strong><span>Offset from the diagonal = bias; spread = resolution. Less bias, but slightly more spread.</span></div>
<div class="dp-source">Cen Mo et al. · ICHEP 2026 · p. 8</div>

<!--
Source p. 8. Two plot pairs extracted without the slide footer or overlapping takeaway, retaining original labels and color scales. Targets are angular differences between each tau and its visible decay products, followed by system calibration. Do not describe independent generation of all neutrino four-vectors. Traditional fully hadronic reconstruction solves constrained kinematic equations; other channels use a likelihood grid search. Rest-frame decay angles carry spin information.
-->
