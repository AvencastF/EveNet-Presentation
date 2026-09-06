---
transition: fade
class: nju-align-section nju-oracle-page
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Good solutions exist; learn to favor them

<div class="as-subtitle align-takeaway">More candidates reveal solutions closer to simulation truth.</div>

<div class="as-motivation">
  <section class="as-oracle">
    <h2>Best candidate versus sample count</h2>
    <div class="as-oracle-plot"><NJUPlot src="/figures/rl-oracle.png" alt="Oracle best-of-K Cartesian MSE decreases with candidate count, for the median, 68th and 90th percentiles" /></div>
  </section>
  <section class="as-reasoning">
    <div class="as-evidence"><h3>Evidence · Better candidates exist</h3><p>The best-candidate error <strong>falls as <LaTeX formula="K" /> grows</strong>.</p><small><LaTeX formula="K" /> = candidates generated per event.</small></div>
    <div class="as-gap"><h3>Gap · Correlations still matter</h3><p>Matching individual distributions can miss <strong>relationships between momenta</strong>.</p></div>
    <div class="as-opportunity"><h3>Opportunity · Learn what to prefer</h3><p><strong>Reward accurate candidates</strong> so the model samples them more often.</p><span class="as-next">Candidate rewards <svg viewBox="0 0 28 12" aria-hidden="true"><path d="M1 6 H26 M21 1 L26 6 L21 11" /></svg> DGPO</span></div>
  </section>
</div>
<div class="as-endnote"><strong>Oracle diagnostic</strong><span>Select the best candidate using simulation truth; this diagnostic cannot select candidates in real data.</span></div>

<style>
.nju-oracle-page .as-reasoning{grid-template-rows:repeat(3,minmax(0,1fr));gap:14px;border:0;height:350px}
.nju-oracle-page .as-reasoning>div{border:0;border-left:2px solid var(--point-color);padding:0 0 0 15px;display:flex;flex-direction:column;justify-content:flex-start}
.nju-oracle-page .as-evidence{--point-color:#77c9ff}
.nju-oracle-page .as-gap{--point-color:#f69cab}
.nju-oracle-page .as-opportunity{--point-color:#70dcb2}
.nju-oracle-page .as-reasoning h3{color:var(--point-color);font-size:18px;line-height:24px;margin:0 0 9px!important}
.nju-oracle-page .as-reasoning p{font-size:16px;line-height:1.45}
.nju-oracle-page .as-reasoning strong{color:#f0f1f3;font-weight:550}
.nju-oracle-page .as-reasoning small{font-size:12px;color:#bcc2cb;margin-top:7px}
.nju-oracle-page .as-next{font-size:13px;margin-top:9px;color:var(--point-color)}
</style>

<!--
Presenter-provided oracle and correlation diagnostics. Oracle selection uses simulation truth, not a deployable selector. Good marginals do not establish complete conditional calibration. Original plotted series and labels are preserved.
-->
