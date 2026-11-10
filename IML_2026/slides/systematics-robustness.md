---
class: iml-content iml-paper
transition: fade
---

<script setup>
import NJUPlot from "../components/NJUPlot.vue"
</script>

# More stable responses under detector variations

<div class="paper-sub">Fixed models · vary reconstructed inputs at evaluation · measure the spread in physics performance</div>
<div class="syst-evidence">
<section><h2>Top-spin measurement <span>50 variations per model</span></h2>
<div class="syst-pair"><div><h3>Jet-energy scale</h3><NJUPlot src="/qe_systematics_precision_jes_only_scatter.svg" alt="Relative precision response under JES shifts" /></div><div><h3>Missing transverse momentum</h3><NJUPlot src="/qe_systematics_precision_met_only_scatter.svg" alt="Relative precision response under missing momentum shifts" /></div></div>
<p class="axis-guide">Horizontal response: <LaTeX formula="\sigma_\Delta/\Delta-\langle\sigma_\Delta/\Delta\rangle" />. JES prior: 1% width; soft missing-momentum variations: 0–5 GeV.</p>
</section>
<section><h2>Exotic-Higgs search <span>100 JES variations · Cls + Asn</span></h2>
<div class="syst-pair"><div><h3>Pairing efficiency</h3><NJUPlot src="/bsm_systematics_pair_scatter.svg" alt="Pairing efficiency response under JES shifts" /></div><div><h3>Classification sensitivity</h3><NJUPlot src="/bsm_systematics_sic_scatter.svg" alt="Normalized SIC response under JES shifts" /></div></div>
<p class="axis-guide">Left: pairing-efficiency shift. Right: <LaTeX formula="(\mathrm{SIC}-\langle\mathrm{SIC}\rangle)/\sigma_{\mathrm{SIC}}" />. <LaTeX formula="\sigma_{\mathrm{SIC}}" />: propagated statistical uncertainty for each variation.</p>
</section>
</div>
<div class="syst-bottom"><div class="paper-guide"><b>Read the plots</b><br/>Point = one variation; color = applied shift.<br/>Line = median; dark/light bands = central 68%/95%.<br/><b>Narrower bands mean a more stable response to the tested variations.</b></div><div class="syst-interval"><b>Smaller SIC response spread</b><p class="paper-note">Normalized interval widths</p><table class="paper-table"><tr><th></th><th>68%</th><th>95%</th></tr><tr><td><span class="evenet-wordmark">EveNet-Full</span></td><td>0.21</td><td>0.34</td></tr><tr><td>Scratch</td><td>0.71</td><td>1.42</td></tr></table><p class="paper-note"><b>Full:</b> about <LaTeX formula="3.4\times" /> narrower at 68% and <LaTeX formula="4.2\times" /> at 95% than Scratch.</p></div></div>
