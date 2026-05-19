---
clicks: 1
transition: fade
---

<section class="top-mass-slide">
<div class="ambient ambient-amber"></div>
<div class="ambient ambient-cyan"></div>

<header class="top-head">
<div class="kicker">Event-Level Correlations</div>
<h1>Does the Improvement Survive <span class="gradient-animated">Physics Reconstruction?</span></h1>
<p>Top mass probes correlated neutrino reconstruction, not just one-dimensional marginals.</p>
</header>

<div class="top-layout">
<section class="figure-column">
<div class="glass-panel plot-card">
<div class="plot-header">
<span i-carbon:chart-line-data class="plot-icon" />
<div>
<strong>Top-quark mass <span class="math-lite">m<sub>t</sub></span> response</strong>
<span>Insert/use: results/kinematics/top_mass.pdf</span>
</div>
</div>

<div class="axis-plot">
<div class="grid-lines"></div>
<div class="axis-label y">reco density</div>
<div class="axis-label x">m<sub>t</sub></div>
<svg viewBox="0 0 520 245" preserveAspectRatio="none" aria-label="Top mass response placeholder">
<path class="truth-band" d="M63,201 C111,193 139,168 171,116 C196,76 225,52 261,55 C307,59 334,91 365,132 C402,181 442,198 492,202" />
<path class="anchor-line" d="M58,204 C106,193 137,171 171,121 C200,76 232,55 263,58 C307,62 338,93 368,134 C405,181 443,197 493,202" />
<path class="dgpo-line" d="M58,203 C104,190 133,159 164,102 C194,47 225,31 264,37 C314,45 342,83 371,129 C407,187 442,205 493,207" />
<path class="baseline-line" d="M58,208 C112,201 151,180 184,139 C217,98 249,87 285,93 C331,101 361,127 392,162 C423,197 457,209 493,212" />
</svg>
<div class="legend">
<span><i class="truth"></i>target</span>
<span><i class="anchored"></i>anchored</span>
<span><i class="dgpo"></i>DGPO</span>
</div>
</div>

<div class="question-chip">
<span i-carbon:assembly-cluster />
<strong>Do both reconstructed neutrinos stay correlated with the visible system?</strong>
</div>

<p class="caption">Combining the two reconstructed neutrinos with visible decay products tests whether event-level correlations survive.</p>
</div>
</section>

<section v-click="1" class="glass-panel metrics-column">
<div class="panel-label">
<span i-carbon:table-split class="panel-icon" />
<span>Top-quark mass metrics</span>
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
<td>EveNet+DGPO+Anchor</td>
<td class="metric-good">4.26</td>
<td class="metric-good">0.480</td>
<td class="metric-good">14.78</td>
<td class="metric-good">22.77</td>
</tr>
<tr>
<td>EveNet+DGPO</td>
<td>4.84</td>
<td class="metric-good">0.479</td>
<td class="metric-good">14.65</td>
<td class="metric-good">22.23</td>
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
<tr>
<td>EveNet Diffusion</td>
<td>5.45</td>
<td>0.267</td>
<td>18.33</td>
<td>28.43</td>
</tr>
</tbody>
</table>

<div class="insight-grid">
<div class="insight-card cyan">
<span i-carbon:chart-relationship />
<strong>Diffusion baseline</strong>
<p>Already improves over ν²-Flows in correlated top-mass reconstruction.</p>
</div>
<div class="insight-card amber">
<span i-carbon:flash />
<strong>Preference gain</strong>
<p>DGPO gives the sharpest top-mass response.</p>
</div>
<div class="insight-card violet">
<span i-carbon:scale />
<strong>Anchored balance</strong>
<p>Keeps nearly the same MAE/RMSE while improving W1.</p>
</div>
<div class="insight-card rose">
<span i-carbon:warning-alt />
<strong>Pretraining matters</strong>
<p>The scratch model is worse across the correlated reconstruction test.</p>
</div>
</div>

<div class="interpretation">
<strong>Interpretation</strong>
<span>Top mass is stricter than neutrino <span class="math-lite">p<sub>T</sub></span>: it depends on the correlated reconstruction of both neutrinos. The anchored model keeps the DGPO event-level gain while improving shape agreement.</span>
</div>
</section>
</div>

<div v-click="1" class="takeaway-bar">
<span i-carbon:checkmark-outline />
<strong>Foundation pretraining + preference optimization + residual anchoring</strong>
<span>gives the best reconstruction-calibration compromise.</span>
</div>
</section>

<style scoped>
.top-mass-slide {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}

.ambient {
  position: absolute;
  width: 380px;
  height: 220px;
  border-radius: 999px;
  filter: blur(62px);
  opacity: 0.22;
  pointer-events: none;
  z-index: -1;
}

.ambient-amber {
  top: -82px;
  right: 118px;
  background: rgba(251, 191, 36, 0.5);
}

.ambient-cyan {
  left: -98px;
  bottom: -84px;
  background: rgba(0, 229, 255, 0.56);
}

.top-head {
  display: grid;
  gap: 0.14rem;
}

.kicker {
  color: rgba(253, 224, 171, 0.94);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.top-head h1 {
  max-width: 930px;
  margin: 0;
  font-size: 1.8rem;
  line-height: 1;
  letter-spacing: 0;
}

.top-head p {
  margin: 0.06rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.72rem;
}

.top-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.98fr;
  gap: 0.62rem;
  min-height: 0;
  flex: 1;
}

.glass-panel {
  min-height: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.026)),
    rgba(7, 13, 26, 0.72);
  box-shadow:
    0 0 0 1px rgba(0, 229, 255, 0.06),
    0 20px 44px rgba(0, 0, 0, 0.27),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
}

.plot-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.62rem;
}

.plot-header {
  display: flex;
  align-items: center;
  gap: 0.54rem;
  margin-bottom: 0.5rem;
}

.plot-icon {
  width: 1.34rem;
  height: 1.34rem;
  color: rgba(103, 232, 249, 0.95);
  filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.35));
}

.plot-header strong {
  display: block;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.82rem;
  line-height: 1.05;
}

.plot-header span {
  display: block;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.46rem;
  margin-top: 0.14rem;
}

.axis-plot {
  position: relative;
  flex: 1;
  min-height: 10.9rem;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(103, 232, 249, 0.18);
  background:
    radial-gradient(circle at 50% 46%, rgba(103, 232, 249, 0.08), transparent 44%),
    rgba(3, 8, 18, 0.62);
}

.grid-lines {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 100% 20%, 14.285% 100%;
  mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 90%, transparent 100%);
}

.axis-plot svg {
  position: absolute;
  inset: 1.1rem 1rem 1rem 1.25rem;
  width: calc(100% - 2.25rem);
  height: calc(100% - 2.1rem);
}

.axis-plot path {
  fill: none;
  stroke-linecap: round;
}

.truth-band {
  stroke: rgba(255, 255, 255, 0.36);
  stroke-width: 12;
}

.anchor-line {
  stroke: rgba(45, 212, 191, 0.95);
  stroke-width: 4;
  filter: drop-shadow(0 0 8px rgba(45, 212, 191, 0.42));
}

.dgpo-line {
  stroke: rgba(251, 191, 36, 0.92);
  stroke-width: 3;
  stroke-dasharray: 12 9;
  filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.32));
}

.baseline-line {
  stroke: rgba(196, 181, 253, 0.62);
  stroke-width: 3;
  stroke-dasharray: 4 8;
}

.axis-label {
  position: absolute;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.axis-label.y {
  left: -1.56rem;
  top: 50%;
  transform: rotate(-90deg) translateX(50%);
}

.axis-label.x {
  right: 1rem;
  bottom: 0.22rem;
  text-transform: none;
}

.legend {
  position: absolute;
  top: 0.52rem;
  right: 0.6rem;
  display: flex;
  gap: 0.42rem;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(5, 10, 22, 0.74);
  padding: 0.22rem 0.42rem;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.42rem;
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.18rem;
}

.legend i {
  width: 0.48rem;
  height: 0.16rem;
  border-radius: 999px;
}

.legend .truth {
  background: rgba(255, 255, 255, 0.44);
}

.legend .anchored {
  background: rgba(45, 212, 191, 0.95);
}

.legend .dgpo {
  background: rgba(251, 191, 36, 0.95);
}

.question-chip {
  display: flex;
  align-items: center;
  gap: 0.42rem;
  margin-top: 0.42rem;
  border-radius: 8px;
  border: 1px solid rgba(251, 191, 36, 0.25);
  background: rgba(251, 191, 36, 0.08);
  color: rgba(254, 243, 199, 0.96);
  padding: 0.36rem 0.5rem;
}

.question-chip span {
  width: 1rem;
  height: 1rem;
  color: rgba(251, 191, 36, 0.95);
}

.question-chip strong {
  font-size: 0.56rem;
  line-height: 1.2;
}

.caption {
  margin: 0.34rem 0 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.46rem;
  line-height: 1.25;
}

.metrics-column {
  display: flex;
  flex-direction: column;
  padding: 0.56rem;
}

.panel-label {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  color: rgba(165, 243, 252, 0.95);
  font-size: 0.66rem;
  font-weight: 900;
  margin-bottom: 0.34rem;
}

.panel-icon {
  width: 1rem;
  height: 1rem;
}

.metric-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.12rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.42rem;
}

.metric-table th {
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.36rem;
  font-weight: 800;
  text-align: right;
  padding: 0 0.22rem 0.1rem;
  white-space: nowrap;
}

.metric-table th:first-child,
.metric-table td:first-child {
  text-align: left;
}

.metric-table td {
  text-align: right;
  padding: 0.14rem 0.2rem;
  background: rgba(255, 255, 255, 0.043);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.metric-table td:first-child {
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px 0 0 6px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.88);
}

.metric-table td:last-child {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0 6px 6px 0;
}

.metric-table .preferred-row td {
  background: rgba(20, 184, 166, 0.14);
  border-color: rgba(45, 212, 191, 0.28);
  box-shadow: 0 0 18px rgba(20, 184, 166, 0.12);
}

.metric-table .muted-row td {
  background: rgba(244, 63, 94, 0.065);
}

.metric-good {
  color: rgba(134, 239, 172, 0.98) !important;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.22);
}

.metric-bad {
  color: rgba(251, 191, 36, 0.98) !important;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.2);
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.28rem;
  margin-top: 0.34rem;
}

.insight-card {
  min-height: 2.35rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.3rem;
}

.insight-card span {
  width: 0.72rem;
  height: 0.72rem;
  margin-bottom: 0.08rem;
}

.insight-card strong {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.43rem;
  line-height: 1.08;
}

.insight-card p {
  margin: 0.08rem 0 0;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.35rem;
  line-height: 1.12;
}

.insight-card.cyan {
  border-color: rgba(103, 232, 249, 0.22);
}

.insight-card.cyan span {
  color: rgba(103, 232, 249, 0.95);
}

.insight-card.amber {
  border-color: rgba(251, 191, 36, 0.24);
}

.insight-card.amber span {
  color: rgba(251, 191, 36, 0.95);
}

.insight-card.violet {
  border-color: rgba(196, 181, 253, 0.24);
}

.insight-card.violet span {
  color: rgba(196, 181, 253, 0.95);
}

.insight-card.rose {
  border-color: rgba(251, 113, 133, 0.24);
}

.insight-card.rose span {
  color: rgba(251, 113, 133, 0.95);
}

.interpretation {
  margin-top: 0.34rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 229, 255, 0.18);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.07), rgba(124, 92, 255, 0.08));
  padding: 0.32rem 0.42rem;
}

.interpretation strong {
  display: block;
  color: rgba(165, 243, 252, 0.95);
  font-size: 0.44rem;
  margin-bottom: 0.1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.interpretation span {
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.4rem;
  line-height: 1.12;
}

.math-lite {
  color: rgba(165, 243, 252, 0.92);
  font-weight: 800;
}

.takeaway-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  min-height: 1.58rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 229, 255, 0.2);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.11), rgba(124, 92, 255, 0.12), rgba(251, 191, 36, 0.09));
  color: rgba(255, 255, 255, 0.84);
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.11);
  font-size: 0.58rem;
}

.takeaway-bar span:first-child {
  width: 0.94rem;
  height: 0.94rem;
  color: rgba(134, 239, 172, 0.96);
}

.takeaway-bar strong {
  color: rgba(255, 255, 255, 0.96);
}
</style>
