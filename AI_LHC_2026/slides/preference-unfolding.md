---
clicks: 0
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# Unfolding-Level Closure

<span class="rl-subtitle">Do calibrated spectra survive the analysis chain?</span>

<section class="unfolding-slide">
<div class="ambient ambient-cyan"></div>
<div class="ambient ambient-violet"></div>

<div class="unfolding-main">
<div class="plots-grid">
<div class="plot-card">
<div class="plot-title"><LaTeX formula="\Delta\phi_{\ell\ell}" /></div>
<div class="landscape-frame">
<ZoomablePlot src="/RL/unfolding/unfolded_dphi_ll.svg" alt="Unfolded dilepton delta phi" />
</div>
</div>

<div class="plot-card">
<div class="plot-title"><LaTeX formula="p_T(t_1)" /></div>
<div class="landscape-frame">
<ZoomablePlot src="/RL/unfolding/unfolded_pt_t1.svg" alt="Unfolded leading top pT" />
</div>
</div>

<div class="plot-card">
<div class="plot-title"><LaTeX formula="p_T(t\bar{t})" /></div>
<div class="landscape-frame">
<ZoomablePlot src="/RL/unfolding/unfolded_pt_tt.svg" alt="Unfolded ttbar pT" />
</div>
</div>

<div class="plot-card">
<div class="plot-title"><LaTeX formula="y(t\bar{t})" /></div>
<div class="landscape-frame">
<ZoomablePlot src="/RL/unfolding/unfolded_y_tt.svg" alt="Unfolded ttbar rapidity" />
</div>
</div>
</div>

<div class="results-container">
<div class="result-item result-item-1">
<span i-carbon:chart-line class="icon-svg icon-svg-1" />
<div class="result-content">
<strong>DGPO+Anchor keeps DGPO uncertainty.</strong>
Across all four observables, the anchored curves retain the DGPO uncertainty scale while improving calibration.
</div>
</div>

<div class="result-item result-item-2">
<span i-carbon:compare class="icon-svg icon-svg-2" />
<div class="result-content">
<strong>ν²-Flows is the paper baseline.</strong>
Use ν²-Flows from <a href="https://arxiv.org/abs/2307.02405" target="_blank">arXiv:2307.02405</a> as the reference; DGPO and DGPO+Anchor outperform that baseline and <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span>.
</div>
</div>

<div class="result-item result-item-3">
<span i-carbon:checkmark-outline class="icon-svg icon-svg-3" />
<div class="result-content">
<strong>Analysis-level conclusion.</strong>
Preference optimization supplies the gain; residual anchoring is the calibration-safe version for unfolded spectra.
</div>
</div>
</div>
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

.unfolding-slide {
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
  width: 390px;
  height: 230px;
  border-radius: 999px;
  filter: blur(64px);
  opacity: 0.2;
  pointer-events: none;
  z-index: -1;
}

.ambient-cyan {
  top: -90px;
  left: 90px;
  background: rgba(0, 229, 255, 0.58);
}

.ambient-violet {
  right: -110px;
  bottom: -80px;
  background: rgba(124, 92, 255, 0.6);
}

.unfolding-main {
  flex: 1;
  min-height: 0;
  width: min(100%, 1130px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 0.68rem;
}

.plots-grid {
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 0.58rem;
  align-content: center;
}

.plot-card {
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background: rgba(255, 255, 255, 0.03);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: none;
  overflow: hidden;
}

.plot-title {
  min-height: 1.72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.68rem;
  font-weight: 850;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
}

.plot-title :deep(.inline) {
  color: rgba(165, 243, 252, 0.98);
  font-size: 0.74rem;
}

.landscape-frame {
  aspect-ratio: 801.39975 / 420.289108;
  width: 100%;
  min-height: 0;
  background: rgba(255, 255, 255, 0.96);
}

.landscape-frame :deep(.zoomable-plot-container) {
  width: 100%;
  height: 100%;
  padding: 0.08rem;
}

.landscape-frame :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.results-container {
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
  gap: 0.5rem;
}

.result-item {
  display: flex;
  align-items: flex-start;
  gap: 0.44rem;
  min-height: 6.1rem;
  padding: 0.58rem;
  border-left: 3px solid;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 10px 24px rgba(0, 0, 0, 0.16);
}

.result-item-1 {
  border-left-color: rgba(196, 181, 253, 0.78);
  background: rgba(124, 92, 255, 0.08);
}

.result-item-2 {
  border-left-color: rgba(251, 191, 36, 0.78);
  background: rgba(251, 191, 36, 0.07);
}

.result-item-3 {
  border-left-color: rgba(103, 232, 249, 0.92);
  background: rgba(0, 229, 255, 0.08);
}

.icon-svg {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  margin-top: 0.06rem;
}

.icon-svg-1 {
  color: rgba(196, 181, 253, 0.95);
}

.icon-svg-2 {
  color: rgba(251, 191, 36, 0.95);
}

.icon-svg-3 {
  color: rgba(103, 232, 249, 1);
}

.result-content {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.62rem;
  line-height: 1.28;
}

.result-content strong {
  display: block;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.68rem;
  margin-bottom: 0.1rem;
}

.result-content a {
  color: rgba(103, 232, 249, 0.96);
  text-decoration: none;
  border-bottom: 1px solid rgba(103, 232, 249, 0.42);
}
</style>
