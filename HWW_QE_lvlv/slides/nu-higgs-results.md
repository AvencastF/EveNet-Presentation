---
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# <span class="gradient-animated">Higgs</span> Four-Momentum Distributions

<span class="subtitle text-zinc-300">Reconstructed Higgs kinematics expose event-wise regression versus distribution fidelity</span>

<div class="hres-preload">
  <img src="/distributions/higgs_pt.svg" alt="" />
  <img src="/distributions/higgs_eta.svg" alt="" />
  <img src="/distributions/higgs_phi.svg" alt="" />
  <img src="/distributions/higgs_mass.svg" alt="" />
</div>

<div class="hres-page">
  <div class="hres-grid">
    <div class="hres-plot">
      <div class="hres-title"><LaTeX formula="p_{\mathrm{T}}^{H}" /></div>
      <ZoomablePlot src="/distributions/higgs_pt.svg" alt="Higgs pT distribution" />
    </div>
    <div class="hres-plot">
      <div class="hres-title"><LaTeX formula="\eta^{H}" /></div>
      <ZoomablePlot src="/distributions/higgs_eta.svg" alt="Higgs eta distribution" />
    </div>
    <div class="hres-plot">
      <div class="hres-title"><LaTeX formula="\phi^{H}" /></div>
      <ZoomablePlot src="/distributions/higgs_phi.svg" alt="Higgs phi distribution" />
    </div>
    <div class="hres-plot">
      <div class="hres-title"><LaTeX formula="M_{H}" /></div>
      <ZoomablePlot src="/distributions/higgs_mass.svg" alt="Higgs mass distribution" />
    </div>
  </div>
  <div class="hres-notes">
    <div class="hres-note hres-note-cyan">
      <div i-carbon:chart-line-smooth class="hres-icon" />
      <span>
        <b><LaTeX formula="p_{\mathrm{T}}^{H}" /></b>
        <small><span class="gradient-animated evenet-inline">EveNet</span> is more stable; PCRes overpopulates very low <LaTeX formula="p_{\mathrm{T}}" /> and underestimates the intermediate/high tail.</small>
      </span>
    </div>
    <div class="hres-note hres-note-amber">
      <div i-carbon:fit-to-screen class="hres-icon" />
      <span>
        <b><LaTeX formula="M_{H}" /></b>
        <small>PCRes is too sharply constrained near 125 GeV; <span class="gradient-animated evenet-inline">EveNet</span> is smoother but smears the Higgs mass peak.</small>
      </span>
    </div>
    <div class="hres-note hres-note-violet">
      <div i-carbon:compare class="hres-icon" />
      <span>
        <b><LaTeX formula="\eta^{H}" />, <LaTeX formula="\phi^{H}" /></b>
        <small>Both models look reasonably good; differences are much smaller than in <LaTeX formula="p_{\mathrm{T}}^{H}" /> and <LaTeX formula="M_{H}" />.</small>
      </span>
    </div>
  </div>
</div>

<style>
.hres-preload {
  display: none;
}
.hres-page {
  height: 390px;
  display: grid;
  grid-template-rows: 250px 122px;
  gap: 10px;
  margin-top: 10px;
}
.hres-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 12px;
  min-height: 0;
}
.hres-plot {
  min-width: 0;
  height: 236px;
  display: grid;
  grid-template-rows: 28px minmax(0, 1fr);
  border-radius: 13px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.74), rgba(30, 41, 59, 0.38));
  padding: 7px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
}
.hres-title {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.14), rgba(34, 211, 238, 0.10));
  color: rgba(226, 232, 240, 0.96);
  font-size: 15px;
  font-weight: 950;
}
.hres-title :deep(.katex) {
  font-size: 1.08em;
}
.hres-note :deep(.inline),
.hres-title :deep(.inline) {
  display: inline-block;
  white-space: nowrap;
}
.hres-note :deep(.katex) {
  font-size: 0.98em;
}
.evenet-inline {
  display: inline-block;
  white-space: nowrap;
}
.hres-plot :deep(.zoomable-plot-container) {
  min-height: 0;
}
.hres-plot :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.hres-notes {
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
}
.hres-note {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 7px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid;
  background: rgba(15, 23, 42, 0.64);
  color: rgba(255, 255, 255, 0.80);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.20);
}
.hres-note > span {
  display: flex;
  align-items: baseline;
  gap: 9px;
  min-width: 0;
}
.hres-note b {
  flex: 0 0 86px;
  color: rgba(255, 255, 255, 0.98);
  font-size: 14px;
}
.hres-note small {
  min-width: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  line-height: 1.18;
}
.hres-note-amber {
  border-left-color: rgba(251, 191, 36, 0.84);
  background: radial-gradient(circle at 5% 8%, rgba(251, 191, 36, 0.18), transparent 45%), rgba(15, 23, 42, 0.64);
}
.hres-note-pink {
  border-left-color: rgba(244, 114, 182, 0.82);
  background: radial-gradient(circle at 5% 8%, rgba(244, 114, 182, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.hres-note-cyan {
  border-left-color: rgba(34, 211, 238, 0.84);
  background: radial-gradient(circle at 5% 8%, rgba(34, 211, 238, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.hres-note-violet {
  border-left-color: rgba(167, 139, 250, 0.84);
  background: radial-gradient(circle at 5% 8%, rgba(167, 139, 250, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.hres-icon {
  flex: 0 0 auto;
  color: rgba(125, 211, 252, 0.95);
  font-size: 18px;
  margin-top: 1px;
}
</style>
