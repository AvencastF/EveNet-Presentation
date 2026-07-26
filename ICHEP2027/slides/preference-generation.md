---
clicks: 2
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# From <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> to Preference Alignment

<span class="rl-subtitle">Can the generative head sharpen neutrino samples without moving the physics?</span>

<section class="rl-gen-slide">
<div class="ambient ambient-cyan"></div>
<div class="ambient ambient-violet"></div>

<div class="gen-layout">
<aside class="glass-panel method-panel">
<div class="panel-heading">
<span i-carbon:idea class="panel-icon cyan" />
<div>
<strong>Bridge from <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span></strong>
<span>Use the trained generator; only change how candidates are preferred</span>
</div>
</div>

<div class="step-rail">
<div class="step-pill active"><b>1</b><span>sample</span></div>
<div class="step-pill active"><b>2</b><span>rank</span></div>
<div class="step-pill" :class="{ active: $clicks >= 1 }"><b>3</b><span>detect drift</span></div>
<div class="step-pill" :class="{ active: $clicks >= 2 }"><b>4</b><span>anchor</span></div>
</div>

<div class="physics-hook">
<span class="hook-label">Starting point</span>
<p><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> already gives <strong><LaTeX formula="K" /> neutrino candidates</strong>. The follow-up question is how to select sharper samples without rewriting calibration.</p>
</div>

<div class="pipeline-card">
<div class="pipeline">
<div class="flow-node">Visible<br/>event</div>
<span class="arrow">→</span>
<div class="flow-node">diffusion</div>
<span class="arrow">→</span>
<div class="flow-node highlight"><LaTeX formula="K" /> ν<br/>samples</div>
<span class="arrow amber">→</span>
<div class="flow-node amber">DGPO<br/>ranking</div>
</div>
<div class="pipeline-caption">Direct Group Preference Optimization ranks candidates <em>within</em> each event; anchoring is added only to control population drift.</div>
</div>

<div class="dgpo-card">
<div class="scope-head">
<span i-carbon:events class="scope-icon amber" />
<strong>Local RL-style preference</strong>
</div>
<div class="formula-lockup">
<LaTeX formula="\hat{x}_{i,1:K}\xrightarrow{\;\mathrm{rank}\;}r_{i,1:K}" block />
</div>
<div class="micro-grid">
<span>rank samples</span>
<span>reward sharper</span>
<span>preserve modes</span>
</div>
</div>

<div v-if="$clicks >= 1" class="drift-card">
<div class="scope-head">
<span i-carbon:warning-alt class="scope-icon warn" />
<strong>Hidden cost: local preference can drift globally</strong>
</div>
<div class="drift-equation">
<span>local gain</span>
<b>≠</b>
<span>global closure</span>
</div>
</div>
</aside>

<main class="glass-panel plot-panel">
<div class="panel-heading">
<span i-carbon:chart-line-data class="panel-icon amber" />
<div>
<strong>Neutrino <LaTeX formula="p_T^\nu" /> calibration check</strong>
<span>Event rewards must survive marginal checks</span>
</div>
</div>

<div class="portrait-frame">
<ZoomablePlot src="/RL/neutrino_pt.svg" alt="Neutrino pT spectrum: EveNet-Full, DGPO bias, anchored calibration" />
</div>

<div class="plot-story">
<span class="leg eve"><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span></span>
<span class="leg dgpo" :class="{ active: $clicks >= 1 }">+DGPO: sharper, drifting</span>
<span class="leg anc" :class="{ active: $clicks >= 2 }">+Anchor: calibrated</span>
</div>
</main>

<aside class="glass-panel evidence-panel">
<div class="panel-heading">
<span i-carbon:table-split class="panel-icon violet" />
<div>
<strong>What changes?</strong>
<span>Held-out neutrino <LaTeX formula="p_T^\nu" /> metrics</span>
</div>
</div>

<table class="metric-table">
<thead>
<tr>
<th>Method</th>
<th>MAE↓</th>
<th>Pearson↑</th>
<th>W1↓</th>
<th>|μ<sub>res</sub>|↓</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span></td>
<td>31.52</td>
<td>0.297</td>
<td>1.50</td>
<td>1.75</td>
</tr>
<tr :class="$clicks >= 1 ? 'row-focus' : 'future-row'">
<td><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span>+DGPO</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">22.06</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">0.644</td>
<td :class="$clicks >= 1 ? 'metric-bad' : ''">4.35</td>
<td :class="$clicks >= 1 ? 'metric-bad' : ''">5.24</td>
</tr>
<tr :class="$clicks >= 2 ? 'preferred-row' : 'future-row'">
<td><span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span>+DGPO+Anchor</td>
<td :class="$clicks >= 2 ? 'metric-good' : ''">22.66</td>
<td :class="$clicks >= 2 ? 'metric-good' : ''">0.648</td>
<td :class="$clicks >= 2 ? 'metric-good' : ''">1.55</td>
<td :class="$clicks >= 2 ? 'metric-good' : ''">1.37</td>
</tr>
</tbody>
</table>

<div class="tradeoff-lane">
<div v-if="$clicks < 1" class="question-card">
<span i-carbon:chart-evaluation />
<div>
<strong>Read the follow-up as a trade-off</strong>
<p>First rank candidates for better event-level reconstruction; then check whether the population spectrum has moved.</p>
</div>
</div>

<div v-if="$clicks >= 1" class="result-chip drift-result">
<span i-carbon:chart-relationship />
<div>
<strong>DGPO gain</strong>
<p><b>MAE 31.52 → 22.06</b>, Pearson doubles, but W1 and mean residual degrade.</p>
</div>
</div>

<div v-if="$clicks >= 2" class="anchor-repair">
<div class="scope-head">
<span i-carbon:scale class="scope-icon teal" />
<strong>Residual anchor: repair only the batch mean</strong>
</div>
<LaTeX formula="\mathcal L_{\rm anc}\propto\left\|\frac{1}{|\mathcal M|}\sum_{\mathcal M}\left[g(\hat{x})-g(x^\star)\right]\right\|^2" block />
<div class="anchor-points">
<span>sample diversity</span>
<span>restore W1 / μres</span>
<span>keep resolution</span>
</div>
</div>
</div>

<div v-if="$clicks >= 2" class="takeaway-box">
<span i-carbon:compare />
<div>
<strong>Takeaway</strong>
<p>RL sharpens the event. Anchoring keeps the physics distribution in place.</p>
</div>
</div>
</aside>
</div>
</section>

<style scoped>
h1 {
  margin: 0;
  font-size: 2.08rem;
  line-height: 1.05;
  letter-spacing: 0;
}

.rl-subtitle {
  display: block;
  max-width: 1000px;
  margin-top: 0.46rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.92rem;
  line-height: 1.28;
}

.rl-gen-slide {
  position: relative;
  height: calc(100% - 5.35rem);
  margin-top: 0.72rem;
  overflow: visible;
}

.ambient {
  position: absolute;
  width: 380px;
  height: 225px;
  border-radius: 999px;
  filter: blur(66px);
  opacity: 0.18;
  pointer-events: none;
  z-index: -1;
}

.ambient-cyan {
  top: -88px;
  left: 60px;
  background: rgba(0, 229, 255, 0.58);
}

.ambient-violet {
  right: -100px;
  bottom: -70px;
  background: rgba(124, 92, 255, 0.62);
}

.gen-layout {
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.03fr) minmax(260px, 0.72fr) minmax(0, 0.95fr);
  gap: 0.72rem;
}

.glass-panel {
  min-height: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.method-panel,
.plot-panel,
.evidence-panel {
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
}

.method-panel {
  padding: 0.04rem 0.66rem 0.02rem 0;
  border-right: 1px solid rgba(103, 232, 249, 0.1);
}

.plot-panel {
  padding: 0.04rem 0.66rem 0.02rem 0;
  border-right: 1px solid rgba(196, 181, 253, 0.1);
}

.evidence-panel {
  padding: 0.04rem 0 0.02rem 0;
}

.panel-heading {
  display: flex;
  align-items: flex-start;
  gap: 0.42rem;
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
  font-size: 0.62rem;
  margin-top: 0.08rem;
  line-height: 1.2;
}

.panel-icon {
  width: 1.05rem;
  height: 1.05rem;
  flex: 0 0 auto;
  margin-top: 0.06rem;
}

.panel-icon.cyan { color: rgba(103, 232, 249, 0.95); }
.panel-icon.amber { color: rgba(251, 191, 36, 0.96); }
.panel-icon.violet { color: rgba(196, 181, 253, 0.95); }

.step-rail {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.22rem;
}

.step-pill {
  display: flex;
  align-items: center;
  gap: 0.24rem;
  min-height: 1.24rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.42);
  padding: 0.16rem 0.24rem;
  font-size: 0.5rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.step-pill b {
  display: grid;
  place-items: center;
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.54rem;
}

.step-pill.active {
  border-color: rgba(103, 232, 249, 0.24);
  background: rgba(0, 229, 255, 0.08);
  color: rgba(210, 246, 255, 0.9);
}

.step-pill.active b {
  background: rgba(0, 229, 255, 0.16);
  color: rgba(165, 243, 252, 0.98);
}

.physics-hook,
.pipeline-card,
.dgpo-card,
.drift-card,
.question-card,
.result-chip,
.anchor-repair,
.takeaway-box {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.physics-hook {
  padding: 0.32rem 0.42rem;
  border-color: rgba(103, 232, 249, 0.18);
  background: rgba(0, 229, 255, 0.065);
}

.hook-label {
  display: block;
  color: rgba(103, 232, 249, 0.88);
  font-size: 0.53rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 0.12rem;
}

.physics-hook p {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.65rem;
  line-height: 1.25;
}

.physics-hook strong {
  color: rgba(255, 255, 255, 0.96);
}

.pipeline-card {
  padding: 0.34rem 0.4rem;
  border-color: rgba(103, 232, 249, 0.15);
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.065), rgba(124, 92, 255, 0.055));
}

.pipeline {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 0.18rem;
}

.flow-node {
  min-height: 2.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 7px;
  border: 1px solid rgba(103, 232, 249, 0.22);
  background: rgba(0, 229, 255, 0.065);
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.58rem;
  font-weight: 800;
  line-height: 1.12;
}

.flow-node.highlight {
  border-color: rgba(196, 181, 253, 0.36);
  background: rgba(124, 92, 255, 0.13);
}

.flow-node.amber {
  border-color: rgba(251, 191, 36, 0.36);
  background: rgba(251, 191, 36, 0.11);
  color: rgba(254, 243, 199, 0.96);
}

.arrow {
  color: rgba(103, 232, 249, 0.78);
  font-weight: 900;
  font-size: 0.66rem;
}

.arrow.amber {
  color: rgba(251, 191, 36, 0.9);
}

.pipeline-caption {
  margin-top: 0.26rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.58rem;
  line-height: 1.18;
}

.pipeline-caption em {
  color: rgba(255, 255, 255, 0.88);
  font-style: italic;
}

.dgpo-card {
  padding: 0.38rem 0.44rem;
  border-color: rgba(251, 191, 36, 0.25);
  background: rgba(251, 191, 36, 0.075);
}

.scope-head {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.26rem;
}

.scope-head strong {
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.66rem;
  line-height: 1.12;
}

.scope-icon {
  width: 0.88rem;
  height: 0.88rem;
  flex: 0 0 auto;
}

.scope-icon.amber { color: rgba(251, 191, 36, 0.96); }
.scope-icon.warn { color: rgba(251, 113, 133, 0.96); }
.scope-icon.teal { color: rgba(45, 212, 191, 0.96); }

.formula-lockup {
  border-radius: 7px;
  padding: 0.22rem 0.32rem;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.formula-lockup :deep(.block) {
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.68rem;
  line-height: 1.05;
}

.anchor-repair :deep(.block) {
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.6rem;
  line-height: 1.03;
}

.micro-grid,
.anchor-points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  margin-top: 0.26rem;
}

.micro-grid span,
.anchor-points span {
  border-radius: 7px;
  padding: 0.22rem 0.26rem;
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.53rem;
  font-weight: 760;
  line-height: 1.14;
  text-align: center;
}

.drift-card {
  padding: 0.34rem 0.44rem;
  border-color: rgba(251, 113, 133, 0.3);
  background: linear-gradient(135deg, rgba(251, 113, 133, 0.09), rgba(124, 92, 255, 0.07));
}

.drift-equation {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.28rem;
  margin: 0.14rem 0 0;
}

.drift-equation span {
  border-radius: 7px;
  padding: 0.24rem 0.28rem;
  background: rgba(255, 255, 255, 0.065);
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.56rem;
  font-weight: 800;
  text-align: center;
}

.drift-equation b {
  color: rgba(251, 113, 133, 0.95);
  font-size: 0.72rem;
}

.drift-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.6rem;
  line-height: 1.22;
}

.portrait-frame {
  flex: 1 1 auto;
  min-height: 0;
  width: auto;
  height: 100%;
  max-width: 100%;
  aspect-ratio: 389.520312 / 448.328707;
  align-self: center;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 0 22px rgba(251, 191, 36, 0.11);
}

.portrait-frame :deep(.zoomable-plot-container) {
  width: 100%;
  height: 100%;
  padding: 0.08rem;
}

.portrait-frame :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.plot-story {
  display: flex;
  flex-wrap: wrap;
  gap: 0.28rem;
}

.leg {
  border-radius: 999px;
  padding: 0.15rem 0.38rem;
  font-size: 0.53rem;
  font-weight: 850;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.05);
}

.leg.eve { border-color: rgba(103, 232, 249, 0.25); }
.leg.dgpo.active {
  border-color: rgba(251, 191, 36, 0.42);
  background: rgba(251, 191, 36, 0.12);
  color: rgba(254, 243, 199, 0.96);
}
.leg.anc.active {
  border-color: rgba(45, 212, 191, 0.38);
  background: rgba(20, 184, 166, 0.14);
  color: rgba(167, 243, 208, 0.96);
}

.metric-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.14rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.62rem;
}

.metric-table th {
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.52rem;
  font-weight: 850;
  text-align: right;
  padding: 0 0.16rem 0.06rem;
  white-space: nowrap;
}

.metric-table th:first-child,
.metric-table td:first-child {
  text-align: left;
}

.metric-table td {
  text-align: right;
  padding: 0.2rem 0.16rem;
  background: rgba(255, 255, 255, 0.045);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.metric-table td:first-child {
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px 0 0 6px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 760;
  line-height: 1.08;
}

.metric-table td:last-child {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0 6px 6px 0;
}

.row-focus td {
  background: rgba(251, 191, 36, 0.105);
  border-color: rgba(251, 191, 36, 0.22);
}

.preferred-row td {
  background: rgba(20, 184, 166, 0.15);
  border-color: rgba(45, 212, 191, 0.29);
}

.future-row td {
  opacity: 0.38;
}

.metric-good {
  color: rgba(134, 239, 172, 0.98) !important;
  font-weight: 900;
}

.metric-bad {
  color: rgba(251, 191, 36, 0.98) !important;
  font-weight: 900;
}

.tradeoff-lane {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.38rem;
  flex: 1;
  min-height: 0;
  align-content: start;
}

.question-card {
  display: flex;
  align-items: flex-start;
  gap: 0.38rem;
  padding: 0.48rem 0.52rem;
  border-color: rgba(196, 181, 253, 0.24);
  background: linear-gradient(135deg, rgba(124, 92, 255, 0.09), rgba(0, 229, 255, 0.055));
}

.question-card > span:first-child {
  width: 0.94rem;
  height: 0.94rem;
  color: rgba(196, 181, 253, 0.96);
  flex: 0 0 auto;
  margin-top: 0.04rem;
}

.result-chip {
  display: flex;
  align-items: flex-start;
  gap: 0.36rem;
  padding: 0.42rem 0.46rem;
  border-color: rgba(251, 191, 36, 0.28);
  background: rgba(251, 191, 36, 0.075);
}

.result-chip > span:first-child {
  width: 0.92rem;
  height: 0.92rem;
  color: rgba(251, 191, 36, 0.96);
  flex: 0 0 auto;
  margin-top: 0.04rem;
}

.question-card strong,
.result-chip strong,
.takeaway-box strong {
  display: block;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.62rem;
  margin-bottom: 0.06rem;
}

.question-card p,
.result-chip p,
.takeaway-box p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.56rem;
  line-height: 1.18;
}

.result-chip b {
  color: rgba(254, 243, 199, 0.96);
}

.anchor-repair {
  padding: 0.38rem 0.44rem;
  border-color: rgba(45, 212, 191, 0.3);
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.085), rgba(124, 92, 255, 0.07));
}

.anchor-points {
  grid-template-columns: repeat(3, 1fr);
  gap: 0.2rem;
  margin-top: 0.24rem;
}

.anchor-points span {
  text-align: center;
  color: rgba(167, 243, 208, 0.9);
  border-color: rgba(45, 212, 191, 0.16);
  background: rgba(20, 184, 166, 0.08);
  font-size: 0.5rem;
  padding: 0.18rem 0.2rem;
}

.takeaway-box {
  display: flex;
  align-items: flex-start;
  gap: 0.34rem;
  padding: 0.34rem 0.42rem;
  border-color: rgba(0, 229, 255, 0.22);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.1), rgba(124, 92, 255, 0.08));
}

.takeaway-box > span:first-child {
  width: 0.82rem;
  height: 0.82rem;
  color: rgba(103, 232, 249, 0.96);
  flex: 0 0 auto;
  margin-top: 0.04rem;
}
</style>
