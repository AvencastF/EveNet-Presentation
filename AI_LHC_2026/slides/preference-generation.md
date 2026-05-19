---
clicks: 1
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
</script>

<section class="pref-generation-slide">
<div class="ambient ambient-cyan"></div>
<div class="ambient ambient-violet"></div>

<header class="pref-head">
<div class="kicker">Preference Optimization with Residual Anchoring</div>
<h1>Can We Do More on <span class="gradient-animated">Generation?</span></h1>
<p>EveNet gives an event-level generative model. The next question is how to align its neutrino samples without damaging physics calibration.</p>
</header>

<div class="pref-grid">
<aside class="glass-panel motivation-card">
<div class="panel-label">
<span i-carbon:idea class="panel-icon" />
<span>Why neutrinos?</span>
</div>
<ul>
<li>Invisible at the LHC</li>
<li>Central to <LaTeX formula="t\bar t" />, <LaTeX formula="H\to WW^*" />, <LaTeX formula="H\to\tau\tau" />, HH analyses</li>
<li>Underconstrained: many latent solutions match one event</li>
<li>Need event-level accuracy and population-level calibration</li>
</ul>
<div class="motif-strip">
<span>accuracy</span>
<span>calibration</span>
</div>
</aside>

<main class="glass-panel algorithm-card">
<div class="panel-label cyan">
<span i-carbon:flow class="panel-icon" />
<span>Alignment loop</span>
</div>

<div class="pipeline">
<div class="pipe-node observed">
<span i-carbon:events class="pipe-icon" />
<strong>Observed event</strong>
</div>
<div class="pipe-arrow">→</div>
<div class="pipe-node diffusion">
<span i-carbon:renew class="pipe-icon" />
<strong>EveNet diffusion head</strong>
</div>
<div class="pipe-arrow">→</div>
<div class="pipe-node candidates">
<span class="candidate-stack"><i></i><i></i><i></i></span>
<strong>K neutrino candidates</strong>
</div>
<div class="pipe-arrow amber">→</div>
<div class="pipe-node dgpo">
<span i-carbon:rank class="pipe-icon" />
<strong>DGPO ranking</strong>
</div>
<div class="pipe-arrow amber">→</div>
<div class="pipe-node solution">
<span i-carbon:bullhorn class="pipe-icon" />
<strong>sharper event-level solution</strong>
</div>
</div>

<div class="formula-row">
<div class="dgpo-card">
<div class="formula-title">DGPO</div>
<div class="formula-copy">rank candidates within each event</div>
</div>

<div v-click="1" class="bias-warning">
<span i-carbon:warning-alt />
<strong>But local preference ≠ global calibration</strong>
</div>
</div>

<div v-click="1" class="anchor-stage">
<div class="anchor-flow">
<span>Batch residual mean</span>
<b>→</b>
<span>constrain <LaTeX formula="\langle \hat{x}-x^\star\rangle" /></span>
<b>→</b>
<span>restore calibrated spectra</span>
</div>

<div class="anchor-card">
<div class="formula-title">Anchor</div>
<LaTeX block formula="\mathcal L_{\rm anc} \propto \left\| \frac{1}{|\mathcal M|} \sum_{\mathcal M} \left[g(\hat{x})-g(x^\star)\right] \right\|^2" />
<div class="formula-note">Constrains only the batch-level mean residual, not each candidate.</div>
</div>
</div>
</main>

<aside class="glass-panel results-card">
<div class="panel-label amber">
<span i-carbon:table-split class="panel-icon" />
<span>Neutrino <LaTeX formula="p_T^\nu" /> trade-off</span>
</div>

<table class="metric-table">
<thead>
<tr>
<th>Method</th>
<th>W1↓</th>
<th>|μ<sub>res</sub>|↓</th>
<th>MAE↓</th>
<th>Pearson↑</th>
</tr>
</thead>
<tbody>
<tr>
<td>EveNet</td>
<td>1.50</td>
<td>1.75</td>
<td>31.52</td>
<td>0.297</td>
</tr>
<tr class="dgpo-row">
<td>EveNet+DGPO</td>
<td :class="$clicks >= 1 ? 'metric-bad' : ''">4.35</td>
<td :class="$clicks >= 1 ? 'metric-bad' : ''">5.24</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">22.06</td>
<td>0.644</td>
</tr>
<tr :class="$clicks >= 1 ? 'preferred-row' : ''">
<td>EveNet+DGPO+Anchor</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">1.55</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">1.37</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">22.66</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">0.648</td>
</tr>
<tr>
<td>Scratch+DGPO+Anchor</td>
<td>0.79</td>
<td>0.01</td>
<td>26.33</td>
<td>0.573</td>
</tr>
<tr>
<td>ν²-Flows</td>
<td :class="$clicks >= 1 ? 'metric-good' : ''">0.33</td>
<td>1.84</td>
<td>41.33</td>
<td :class="$clicks >= 1 ? 'metric-bad' : ''">0.005</td>
</tr>
</tbody>
</table>

<div class="plot-placeholder">
<div class="mini-axis">
<span class="axis-x"></span>
<span class="axis-y"></span>
<span class="curve curve-bad"></span>
<span class="curve curve-good"></span>
</div>
<div>
<strong>Insert:</strong> results/kinematics/neutrino_pt.pdf
<p>Unanchored DGPO improves residuals but shifts the neutrino <LaTeX formula="p_T" /> spectrum; anchoring restores calibration.</p>
</div>
</div>
</aside>
</div>

<div class="takeaway-bar">
<span i-carbon:compare />
<strong>DGPO sharpens event-level reconstruction;</strong>
<span>anchoring prevents the hidden distributional drift.</span>
</div>
</section>

<style scoped>
.pref-generation-slide {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  overflow: hidden;
}

.ambient {
  position: absolute;
  width: 360px;
  height: 220px;
  border-radius: 999px;
  filter: blur(58px);
  opacity: 0.24;
  pointer-events: none;
  z-index: -1;
}

.ambient-cyan {
  top: -92px;
  left: 92px;
  background: rgba(0, 229, 255, 0.58);
}

.ambient-violet {
  right: -86px;
  bottom: -70px;
  background: rgba(124, 92, 255, 0.62);
}

.pref-head {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.14rem;
}

.kicker {
  color: rgba(103, 232, 249, 0.9);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pref-head h1 {
  margin: 0;
  font-size: 2.04rem;
  line-height: 0.98;
  letter-spacing: 0;
}

.pref-head p {
  max-width: 820px;
  margin: 0.08rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.76rem;
  line-height: 1.28;
}

.pref-grid {
  display: grid;
  grid-template-columns: 0.84fr 1.34fr 1fr;
  gap: 0.68rem;
  min-height: 0;
  flex: 1;
}

.glass-panel {
  min-height: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.028)),
    rgba(7, 13, 26, 0.72);
  box-shadow:
    0 0 0 1px rgba(0, 229, 255, 0.06),
    0 20px 44px rgba(0, 0, 0, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
}

.panel-label {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  margin-bottom: 0.58rem;
  color: rgba(221, 214, 254, 0.96);
  font-size: 0.72rem;
  font-weight: 800;
}

.panel-label.cyan {
  color: rgba(165, 243, 252, 0.96);
}

.panel-label.amber {
  color: rgba(253, 224, 171, 0.96);
}

.panel-icon {
  width: 1rem;
  height: 1rem;
}

.motivation-card {
  padding: 0.72rem;
  display: flex;
  flex-direction: column;
}

.motivation-card ul {
  display: grid;
  gap: 0.44rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.61rem;
  line-height: 1.25;
}

.motivation-card li {
  position: relative;
  padding-left: 1rem;
}

.motivation-card li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.34rem;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #00e5ff, #ffbf45);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.32);
}

.motif-strip {
  margin-top: auto;
  display: flex;
  gap: 0.36rem;
  padding-top: 0.58rem;
}

.motif-strip span {
  flex: 1;
  text-align: center;
  border-radius: 999px;
  border: 1px solid rgba(0, 229, 255, 0.22);
  background: rgba(0, 229, 255, 0.08);
  color: rgba(165, 243, 252, 0.9);
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0.24rem 0.1rem;
  text-transform: uppercase;
}

.algorithm-card {
  padding: 0.68rem;
  display: flex;
  flex-direction: column;
}

.pipeline {
  display: grid;
  grid-template-columns: 1fr auto 1.06fr auto 0.94fr auto 0.9fr auto 0.96fr;
  gap: 0.28rem;
  align-items: center;
}

.pipe-node {
  min-height: 4.35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.22rem;
  text-align: center;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.045);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  padding: 0.34rem 0.2rem;
}

.pipe-node strong {
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.47rem;
  line-height: 1.12;
}

.pipe-icon {
  width: 1rem;
  height: 1rem;
  color: rgba(103, 232, 249, 0.88);
}

.diffusion .pipe-icon,
.candidates .candidate-stack {
  color: rgba(196, 181, 253, 0.9);
}

.dgpo,
.solution {
  border-color: rgba(251, 191, 36, 0.28);
  background: rgba(251, 191, 36, 0.07);
}

.dgpo .pipe-icon,
.solution .pipe-icon {
  color: rgba(253, 224, 171, 0.95);
}

.pipe-arrow {
  color: rgba(103, 232, 249, 0.8);
  font-size: 0.76rem;
  font-weight: 900;
  animation: arrow-drift 1.9s ease-in-out infinite;
}

.pipe-arrow.amber {
  color: rgba(251, 191, 36, 0.9);
}

.candidate-stack {
  position: relative;
  display: inline-block;
  width: 1.04rem;
  height: 1rem;
}

.candidate-stack i {
  position: absolute;
  display: block;
  width: 0.74rem;
  height: 0.52rem;
  border-radius: 5px;
  border: 1px solid rgba(196, 181, 253, 0.72);
  background: rgba(124, 92, 255, 0.18);
}

.candidate-stack i:nth-child(1) {
  left: 0.03rem;
  top: 0.08rem;
}

.candidate-stack i:nth-child(2) {
  left: 0.18rem;
  top: 0.25rem;
}

.candidate-stack i:nth-child(3) {
  left: 0.32rem;
  top: 0.42rem;
}

.formula-row {
  display: grid;
  grid-template-columns: 0.9fr 1.24fr;
  gap: 0.5rem;
  align-items: stretch;
  margin-top: 0.55rem;
}

.dgpo-card,
.anchor-card {
  border-radius: 8px;
  border: 1px solid rgba(103, 232, 249, 0.24);
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.14), rgba(124, 92, 255, 0.1));
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.08);
}

.dgpo-card {
  padding: 0.48rem 0.54rem;
}

.formula-title {
  color: rgba(103, 232, 249, 0.96);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.formula-copy {
  margin-top: 0.2rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.57rem;
  line-height: 1.25;
}

.bias-warning {
  display: flex;
  align-items: center;
  gap: 0.34rem;
  border-radius: 8px;
  border: 1px solid rgba(251, 191, 36, 0.42);
  background: rgba(251, 191, 36, 0.12);
  color: rgba(254, 243, 199, 0.96);
  padding: 0.44rem 0.54rem;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.12);
}

.bias-warning span {
  width: 1rem;
  height: 1rem;
  color: rgba(251, 191, 36, 0.95);
}

.bias-warning strong {
  font-size: 0.55rem;
  line-height: 1.18;
}

.anchor-stage {
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.42rem;
}

.anchor-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 0.28rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.48rem;
}

.anchor-flow span {
  min-height: 1.74rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 999px;
  border: 1px solid rgba(196, 181, 253, 0.22);
  background: rgba(196, 181, 253, 0.07);
  padding: 0.1rem 0.32rem;
}

.anchor-flow b {
  color: rgba(196, 181, 253, 0.9);
}

.anchor-card {
  padding: 0.42rem 0.54rem 0.4rem;
  border-color: rgba(196, 181, 253, 0.3);
  background: linear-gradient(135deg, rgba(124, 92, 255, 0.14), rgba(0, 229, 255, 0.08));
}

.anchor-card :deep(.katex) {
  font-size: 0.72rem;
}

.formula-note {
  margin-top: 0.18rem;
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.44rem;
}

.results-card {
  padding: 0.62rem;
  display: flex;
  flex-direction: column;
}

.metric-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.18rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.43rem;
}

.metric-table th {
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.38rem;
  font-weight: 800;
  text-align: right;
  padding: 0 0.22rem 0.12rem;
  white-space: nowrap;
}

.metric-table th:first-child,
.metric-table td:first-child {
  text-align: left;
}

.metric-table td {
  text-align: right;
  padding: 0.2rem 0.22rem;
  background: rgba(255, 255, 255, 0.043);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 420ms ease;
}

.metric-table td:first-child {
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px 0 0 6px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.86);
}

.metric-table td:last-child {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0 6px 6px 0;
}

.metric-table .preferred-row td {
  background: rgba(20, 184, 166, 0.14);
  border-color: rgba(45, 212, 191, 0.25);
  box-shadow: 0 0 18px rgba(20, 184, 166, 0.12);
}

.metric-good {
  color: rgba(134, 239, 172, 0.98) !important;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.24);
}

.metric-bad {
  color: rgba(251, 191, 36, 0.98) !important;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.22);
}

.plot-placeholder {
  margin-top: 0.44rem;
  display: grid;
  grid-template-columns: 3.7rem 1fr;
  gap: 0.42rem;
  align-items: center;
  border-radius: 8px;
  border: 1px dashed rgba(103, 232, 249, 0.34);
  background: rgba(0, 229, 255, 0.055);
  padding: 0.42rem;
}

.plot-placeholder strong {
  color: rgba(165, 243, 252, 0.95);
  font-size: 0.45rem;
}

.plot-placeholder div:last-child {
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.42rem;
  line-height: 1.2;
}

.plot-placeholder p {
  margin: 0.18rem 0 0;
}

.mini-axis {
  position: relative;
  height: 2.76rem;
  border-radius: 8px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    rgba(4, 9, 18, 0.55);
  background-size: 100% 33%, 25% 100%, auto;
  overflow: hidden;
}

.axis-x,
.axis-y {
  position: absolute;
  background: rgba(255, 255, 255, 0.32);
}

.axis-x {
  left: 0.34rem;
  right: 0.24rem;
  bottom: 0.44rem;
  height: 1px;
}

.axis-y {
  left: 0.36rem;
  top: 0.24rem;
  bottom: 0.44rem;
  width: 1px;
}

.curve {
  position: absolute;
  left: 0.54rem;
  right: 0.38rem;
  height: 1px;
  border-radius: 999px;
  transform-origin: left center;
}

.curve-bad {
  top: 1.08rem;
  border-top: 2px solid rgba(251, 191, 36, 0.86);
  transform: rotate(-7deg);
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}

.curve-good {
  top: 1.55rem;
  border-top: 2px solid rgba(45, 212, 191, 0.9);
  transform: rotate(4deg);
  box-shadow: 0 0 8px rgba(45, 212, 191, 0.42);
}

.takeaway-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  min-height: 2.04rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 229, 255, 0.2);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.12), rgba(124, 92, 255, 0.12), rgba(251, 191, 36, 0.09));
  color: rgba(255, 255, 255, 0.84);
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.11);
  font-size: 0.7rem;
}

.takeaway-bar span:first-child {
  width: 1.08rem;
  height: 1.08rem;
  color: rgba(103, 232, 249, 0.96);
}

.takeaway-bar strong {
  color: rgba(255, 255, 255, 0.96);
}
</style>
