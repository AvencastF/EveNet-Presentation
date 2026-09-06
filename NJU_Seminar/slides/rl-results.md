---
transition: fade
class: nju-align-section nju-results-page
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# <span class="evenet-wordmark gradient-animated">EveNet-Align</span>: better reconstruction and precision

<div class="as-subtitle align-takeaway">Better reconstruction reduces uncertainty when correcting for detector effects (unfolding).</div>

<div class="as-results">
  <div class="as-results-figures">
    <section class="as-mass"><h2>Top-mass reconstruction</h2><div class="as-result-plot"><NJUPlot src="/RL/top_mass.svg" alt="Held-out top-mass response for truth, EveNet-Full and EveNet-Align" /></div></section>
    <section class="as-unfold"><h2>Impact on unfolding uncertainty</h2><div class="as-result-plot"><NJUPlot src="/figures/rl-unfolding.png" alt="Relative unfolding uncertainty for top-pair rapidity, retaining all four top-pair mass regions and the improvement versus nu2flow panel" /></div></section>
  </div>
  <div class="as-metric-band">
    <div class="as-metric-caption"><strong>Top-mass metrics</strong><span>55,472 held-out events</span></div>
    <table aria-label="Top-mass reconstruction metrics"><thead><tr><th>Model</th><th><LaTeX formula="W_1\,\downarrow" /></th><th>Correlation <LaTeX formula="\uparrow" /></th><th>MAE <LaTeX formula="\downarrow" /></th><th>RMSE <LaTeX formula="\downarrow" /></th></tr></thead><tbody>
      <tr><td><span class="evenet-wordmark gradient-animated">EveNet-Full</span></td><td>5.45</td><td>0.097</td><td>19.47</td><td>31.12</td></tr>
      <tr class="as-preferred"><td><span class="evenet-wordmark gradient-animated">EveNet-Align</span></td><td>3.72</td><td>0.490</td><td>14.44</td><td>23.64</td></tr>
    </tbody></table>
  </div>
  <div class="rl-metric-key"><LaTeX formula="W_1" />: distribution distance · MAE: mean absolute error · RMSE: root mean squared error (all in GeV). Correlation is dimensionless.</div>
  <div class="as-results-note"><strong>Current results</strong><span>Uses a truth-based reward and a distribution safeguard; alternative rewards are under study.</span></div>
</div>

<style>
.slidev-layout.nju-results-page{padding-bottom:18px}
.nju-results-page .as-results{grid-template-rows:260px auto auto auto;gap:8px}
.nju-results-page .as-metric-band{padding:6px 0;min-height:90px;box-sizing:border-box}
.nju-results-page .as-metric-band table{margin:0!important;border-collapse:collapse}
.nju-results-page .as-metric-band :is(th,td){padding:4px 8px;border:0!important}
.nju-results-page .as-metric-band thead tr{border-bottom:1px solid #ffffff20}
.nju-results-page .as-metric-band tbody tr{border:0!important}
.nju-results-page .as-metric-band tbody tr+tr{border-top:1px solid #ffffff16!important}
.nju-align-section .as-result-plot{height:224px}
.nju-align-section .as-results-note{font-size:11px}

.nju-results-page .rl-metric-key{font-size:10px;color:var(--fg-1);line-height:1.35;margin-top:0}
</style>

<!--
Mass plot and all four measured metrics are moved unchanged from slide 16. The previous duplicate mass figure is excluded. The unfolding figure retains all four top-pair mass regions and the lower improvement-versus-nu2flow panel; original legends and scientific colors are preserved. E2E pretrain is the original source baseline label for the pretrained model. W1 is the first Wasserstein distance between mass distributions; MAE and RMSE compare reconstructed and truth masses event by event. Pearson correlation measures their event-by-event linear relationship. These results concern dileptonic ttbar, not DELPHI. Improvements do not establish perfect closure, multimodal preservation, or complete conditional calibration; distributional drift still needs control.
-->
