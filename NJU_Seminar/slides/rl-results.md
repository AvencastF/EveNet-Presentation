---
transition: fade
class: nju-align-section
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# <span class="evenet-wordmark gradient-animated">EveNet-Align</span>: from reconstruction to impact

<div class="as-subtitle align-takeaway">In this study, reconstruction gains also reduce unfolding uncertainty.</div>

<div class="as-results">
  <div class="as-results-figures">
    <section class="as-mass"><h2>Top-mass reconstruction</h2><div class="as-result-plot"><NJUPlot src="/RL/top_mass.svg" alt="Held-out top-mass response for truth, EveNet-Full and EveNet-Align" /></div></section>
    <section class="as-unfold"><h2>Impact on unfolding uncertainty</h2><div class="as-result-plot"><NJUPlot src="/figures/rl-unfolding.png" alt="Relative unfolding uncertainty for top-pair rapidity, retaining all four top-pair mass regions and the improvement versus nu2flow panel" /></div></section>
  </div>
  <div class="as-metric-band">
    <div class="as-metric-caption"><strong>Top-mass metrics</strong><span>55,472 held-out events</span></div>
    <table aria-label="Top-mass reconstruction metrics"><thead><tr><th>Model</th><th><LaTeX formula="W_1\,\downarrow" /></th><th>Pearson <LaTeX formula="\uparrow" /></th><th>MAE <LaTeX formula="\downarrow" /></th><th>RMSE <LaTeX formula="\downarrow" /></th></tr></thead><tbody>
      <tr><td><span class="evenet-wordmark gradient-animated">EveNet-Full</span></td><td>5.45</td><td>0.097</td><td>19.47</td><td>31.12</td></tr>
      <tr class="as-preferred"><td><span class="evenet-wordmark gradient-animated">EveNet-Align</span></td><td>3.72</td><td>0.490</td><td>14.44</td><td>23.64</td></tr>
    </tbody></table>
  </div>
  <div class="as-results-note"><strong>Current results</strong><span>Normalized squared truth-distance reward + CPO. Alternative rewards and removing CPO remain ongoing work.</span></div>
</div>

<!--
Mass plot and all four measured metrics are moved unchanged from slide 16. The previous duplicate mass figure is excluded. The unfolding figure retains all four top-pair mass regions and the lower improvement-versus-nu2flow panel; original legends and scientific colors are preserved. E2E pretrain is the original source baseline label. These results concern dileptonic ttbar, not DELPHI. Improvements do not establish perfect closure, multimodal preservation, or complete conditional calibration; distributional drift still needs control.
-->
