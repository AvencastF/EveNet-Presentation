---
clicks: 0
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# Top-Mass Correlation Test

<span class="rl-subtitle">Do neutrino gains survive full event reconstruction?</span>

<section class="top-mass-slide">
<div class="ambient ambient-amber"></div>
<div class="ambient ambient-cyan"></div>

<div class="top-layout">
<div class="top-plot-panel">
<div class="panel-heading">
<span i-carbon:chart-line-data class="panel-icon amber" />
<div>
<strong><LaTeX formula="m_t" /> response</strong>
<span>Correlated reconstruction of both neutrinos and visible decay products</span>
</div>
</div>
<div class="portrait-frame">
<ZoomablePlot src="/RL/top_mass.svg" alt="Top mass reconstruction response" />
</div>
<div class="question-chip">
<span i-carbon:assembly-cluster />
<strong>Correlated physics check: <LaTeX formula="m_t" /> response.</strong>
</div>
</div>

<aside class="result-panel">
<div class="panel-heading">
<span i-carbon:table-split class="panel-icon cyan" />
<div>
<strong>Top-quark mass metrics</strong>
<span>Shape, correlation, and resolution after reconstruction</span>
</div>
</div>

<table class="metric-table">
<thead>
<tr>
<th>Model</th>
<th>W1↓</th>
<th>Pearson↑</th>
<th>MAE↓</th>
<th>RMSE↓</th>
</tr>
</thead>
<tbody>
<tr class="preferred-row">
<td><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span>+DGPO+Anchor</td>
<td class="metric-good">4.26</td>
<td class="metric-good">0.480</td>
<td class="metric-good">14.78</td>
<td class="metric-good">22.77</td>
</tr>
<tr>
<td><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span>+DGPO</td>
<td>4.84</td>
<td class="metric-good">0.479</td>
<td class="metric-good">14.65</td>
<td class="metric-good">22.23</td>
</tr>
<tr>
<td><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span></td>
<td>5.45</td>
<td>0.267</td>
<td>18.33</td>
<td>28.43</td>
</tr>
<tr class="muted-row">
<td>Scratch+DGPO+Anchor</td>
<td class="metric-bad">13.38</td>
<td>0.405</td>
<td class="metric-bad">24.35</td>
<td class="metric-bad">33.77</td>
</tr>
<tr>
<td>ν²-Flows</td>
<td class="metric-bad">10.68</td>
<td class="metric-bad">-0.007</td>
<td class="metric-bad">28.53</td>
<td class="metric-bad">49.11</td>
</tr>
</tbody>
</table>

<div class="insight-grid">
<div class="insight-card cyan">
<span i-carbon:network-4 />
<div>
<strong><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> gives a useful prior</strong>
<p>The pretrained generator improves <LaTeX formula="m_t" /> reconstruction over ν²-Flows.</p>
</div>
</div>
<div class="insight-card amber">
<span i-carbon:target />
<div>
<strong>DGPO sharpens response</strong>
<p>Best MAE/RMSE comes from local preference optimization.</p>
</div>
</div>
<div class="insight-card violet">
<span i-carbon:scale />
<div>
<strong>Anchor improves shape</strong>
<p>Nearly unchanged resolution, better W1 among <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> variants.</p>
</div>
</div>
<div class="insight-card green">
<span i-carbon:ibm-watson-machine-learning />
<div>
<strong>Pretraining matters</strong>
<p>The scratch policy loses both resolution and physics closure.</p>
</div>
</div>
</div>
</aside>
</div>

<div class="takeaway-bar">
<span i-carbon:checkmark-outline />
<strong>Foundation pretraining + DGPO + residual anchoring</strong>
<span>is the best reconstruction-calibration compromise.</span>
</div>
</section>

<style scoped>
h1 {
  margin: 0;
  font-size: 2.08rem;
  line-height: 1.03;
  letter-spacing: 0;
}

.rl-subtitle {
  display: block;
  max-width: 930px;
  margin-top: 0.48rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.88rem;
  line-height: 1.24;
}

.top-mass-slide {
  position: relative;
  height: calc(100% - 5.35rem);
  margin-top: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: visible;
}

.ambient {
  position: absolute;
  width: 380px;
  height: 230px;
  border-radius: 999px;
  filter: blur(64px);
  opacity: 0.21;
  pointer-events: none;
  z-index: -1;
}

.ambient-amber {
  top: -92px;
  right: 150px;
  background: rgba(251, 191, 36, 0.5);
}

.ambient-cyan {
  left: -96px;
  bottom: -84px;
  background: rgba(0, 229, 255, 0.56);
}

.top-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(300px, 0.84fr) minmax(0, 1.16fr);
  gap: 0.82rem;
}

.glass-panel {
  min-height: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.top-plot-panel,
.result-panel {
  display: flex;
  flex-direction: column;
}

.top-plot-panel {
  min-height: 0;
  padding: 0.04rem 0.78rem 0.02rem 0;
  border-right: 1px solid rgba(251, 191, 36, 0.14);
}

.result-panel {
  min-height: 0;
  padding: 0.04rem 0 0.02rem 0;
}

.panel-heading {
  display: flex;
  align-items: center;
  gap: 0.48rem;
  margin-bottom: 0.46rem;
  color: rgba(253, 224, 171, 0.96);
}

.panel-heading strong {
  display: block;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.84rem;
  line-height: 1.12;
}

.panel-heading div > span {
  display: block;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.58rem;
  margin-top: 0.1rem;
}

.panel-icon {
  width: 1.12rem;
  height: 1.12rem;
  flex: 0 0 auto;
}

.panel-icon.amber {
  color: rgba(251, 191, 36, 0.96);
}

.panel-icon.cyan {
  color: rgba(103, 232, 249, 0.95);
}

.portrait-frame {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  width: auto;
  max-width: 100%;
  aspect-ratio: 387.020391 / 447.178082;
  align-self: center;
  border-radius: 9px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 0 26px rgba(251, 191, 36, 0.11);
}

.portrait-frame :deep(.zoomable-plot-container) {
  width: 100%;
  height: 100%;
  padding: 0.1rem;
}

.portrait-frame :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.question-chip {
  display: flex;
  align-items: center;
  gap: 0.42rem;
  margin-top: 0.46rem;
  border-radius: 8px;
  border: 1px solid rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.09);
  color: rgba(254, 243, 199, 0.96);
  padding: 0.42rem 0.52rem;
}

.question-chip span {
  width: 1rem;
  height: 1rem;
  color: rgba(251, 191, 36, 0.95);
  flex: 0 0 auto;
}

.question-chip strong {
  font-size: 0.64rem;
  line-height: 1.15;
}

.metric-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.18rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.56rem;
}

.metric-table th {
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.49rem;
  font-weight: 850;
  text-align: right;
  padding: 0 0.24rem 0.08rem;
  white-space: nowrap;
}

.metric-table th:first-child,
.metric-table td:first-child {
  text-align: left;
}

.metric-table td {
  text-align: right;
  padding: 0.22rem 0.24rem;
  background: rgba(255, 255, 255, 0.048);
  border-top: 1px solid rgba(255, 255, 255, 0.065);
  border-bottom: 1px solid rgba(255, 255, 255, 0.065);
}

.metric-table td:first-child {
  border-left: 1px solid rgba(255, 255, 255, 0.065);
  border-radius: 6px 0 0 6px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 760;
}

.metric-table td:last-child {
  border-right: 1px solid rgba(255, 255, 255, 0.065);
  border-radius: 0 6px 6px 0;
}

.preferred-row td {
  background: rgba(20, 184, 166, 0.16);
  border-color: rgba(45, 212, 191, 0.31);
  box-shadow: 0 0 18px rgba(20, 184, 166, 0.13);
}

.muted-row td {
  background: rgba(244, 63, 94, 0.055);
}

.metric-good {
  color: rgba(134, 239, 172, 0.98) !important;
  font-weight: 900;
}

.metric-bad {
  color: rgba(251, 191, 36, 0.98) !important;
  font-weight: 900;
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.42rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.insight-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem;
  min-height: 3.2rem;
  padding: 0.46rem;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.02)),
    rgba(255, 255, 255, 0.035);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.insight-card > span {
  width: 1rem;
  height: 1rem;
  margin-top: 0.06rem;
}

.insight-card strong {
  display: block;
  color: rgba(255, 255, 255, 0.93);
  font-size: 0.62rem;
  line-height: 1.12;
  margin-bottom: 0.1rem;
}

.insight-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.55rem;
  line-height: 1.22;
}

.insight-card.cyan {
  border-color: rgba(103, 232, 249, 0.24);
  background: rgba(0, 229, 255, 0.07);
}

.insight-card.cyan > span {
  color: rgba(103, 232, 249, 0.98);
}

.insight-card.amber {
  border-color: rgba(251, 191, 36, 0.26);
  background: rgba(251, 191, 36, 0.075);
}

.insight-card.amber > span {
  color: rgba(251, 191, 36, 0.98);
}

.insight-card.violet {
  border-color: rgba(196, 181, 253, 0.24);
  background: rgba(124, 92, 255, 0.075);
}

.insight-card.violet > span {
  color: rgba(196, 181, 253, 0.96);
}

.insight-card.green {
  border-color: rgba(134, 239, 172, 0.22);
  background: rgba(34, 197, 94, 0.065);
}

.insight-card.green > span {
  color: rgba(134, 239, 172, 0.96);
}

.takeaway-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  min-height: 1.74rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 229, 255, 0.2);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.12), rgba(124, 92, 255, 0.12), rgba(251, 191, 36, 0.09));
  color: rgba(255, 255, 255, 0.84);
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.11);
  font-size: 0.66rem;
}

.takeaway-bar span:first-child {
  width: 0.96rem;
  height: 0.96rem;
  color: rgba(134, 239, 172, 0.96);
}

.takeaway-bar strong {
  color: rgba(255, 255, 255, 0.96);
}
</style>
