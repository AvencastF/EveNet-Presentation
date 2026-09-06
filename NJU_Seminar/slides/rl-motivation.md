---
transition: fade
class: nju-align-section
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Good solutions are already there

<div class="as-subtitle align-takeaway">Truth-near solutions exist; learn to sample them more often.</div>

<div class="as-motivation">
  <section class="as-oracle">
    <h2>Sample more. Find a closer solution.</h2>
    <div class="as-oracle-plot"><NJUPlot src="/figures/rl-oracle.png" alt="Oracle best-of-K Cartesian MSE decreases with candidate count, for the median, 68th and 90th percentiles" /></div>
  </section>
  <section class="as-reasoning">
    <div><h3>The evidence</h3><p>The closest-to-truth reconstruction improves as <LaTeX formula="K" /> increases.</p></div>
    <div><h3>The remaining gap</h3><p>Good one-dimensional distributions can coexist with imperfect joint correlations.</p></div>
    <div><h3>The opportunity</h3><p>Learn to sample useful solutions more often.</p><span class="as-next">Candidate rewards <svg viewBox="0 0 28 12" aria-hidden="true"><path d="M1 6 H26 M21 1 L26 6 L21 11" /></svg> DGPO</span></div>
  </section>
</div>
<div class="as-endnote"><strong>Oracle diagnostic</strong><span>Uses simulation truth to select candidates; not an inference-time selection rule.</span></div>

<!--
Presenter-provided oracle and correlation diagnostics. Oracle selection uses simulation truth, not a deployable selector. Good marginals do not establish complete conditional calibration. Original plotted series and labels are preserved.
-->
