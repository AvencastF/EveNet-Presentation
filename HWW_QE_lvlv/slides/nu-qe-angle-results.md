---
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# <span class="gradient-animated">QE</span> Angular Distributions

<span class="subtitle text-zinc-300">Spin-correlation observables</span>

<div class="qeres-preload">
  <img src="/distributions/qe_pos_theta.svg" alt="" />
  <img src="/distributions/qe_neg_theta.svg" alt="" />
  <img src="/distributions/qe_pos_phi.svg" alt="" />
  <img src="/distributions/qe_neg_phi.svg" alt="" />
</div>

<div class="qeres-page">
  <div class="qeres-grid">
    <div class="qeres-plot"><div class="qeres-title"><LaTeX formula="\theta_{\ell^+}^{\rm QE}" /></div><ZoomablePlot src="/distributions/qe_pos_theta.svg" alt="QE positive lepton theta distribution" /></div>
    <div class="qeres-plot"><div class="qeres-title"><LaTeX formula="\theta_{\ell^-}^{\rm QE}" /></div><ZoomablePlot src="/distributions/qe_neg_theta.svg" alt="QE negative lepton theta distribution" /></div>
    <div class="qeres-plot"><div class="qeres-title"><LaTeX formula="\phi_{\ell^+}^{\rm QE}" /></div><ZoomablePlot src="/distributions/qe_pos_phi.svg" alt="QE positive lepton phi distribution" /></div>
    <div class="qeres-plot"><div class="qeres-title"><LaTeX formula="\phi_{\ell^-}^{\rm QE}" /></div><ZoomablePlot src="/distributions/qe_neg_phi.svg" alt="QE negative lepton phi distribution" /></div>
  </div>
  <div class="qeres-notes">
    <div class="qeres-note qeres-note-cyan">
      <div i-carbon:chart-line-smooth class="qeres-icon" />
      <span>
        <b><LaTeX formula="\theta" /> angles</b>
        <small><span class="gradient-animated evenet-inline">EveNet</span> is more stable; PCRes overshoots near peaks and undershoots tails, especially <LaTeX formula="\theta_{\ell^+}^{W}/\pi" /> and high <LaTeX formula="\theta_{\ell^-}^{W}/\pi" />.</small>
      </span>
    </div>
    <div class="qeres-note qeres-note-violet">
      <div i-carbon:chart-relationship class="qeres-icon" />
      <span>
        <b><LaTeX formula="\phi" /> angles</b>
        <small>Both are reasonable, but <span class="gradient-animated evenet-inline">EveNet</span> is less sculpted; PCRes enhances the two peaks more strongly while <span class="gradient-animated evenet-inline">EveNet</span> gives smoother model/truth ratios.</small>
      </span>
    </div>
  </div>
</div>

<style>
.qeres-preload {
  display: none;
}
.qeres-page {
  height: 390px;
  display: grid;
  grid-template-rows: 250px 118px;
  gap: 12px;
  margin-top: 10px;
}
.qeres-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 12px;
  min-height: 0;
}
.qeres-plot {
  min-width: 0;
  height: 236px;
  display: grid;
  grid-template-rows: 30px minmax(0, 1fr);
  border-radius: 13px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.74), rgba(30, 41, 59, 0.38));
  padding: 7px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
}
.qeres-title {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.12), rgba(244, 114, 182, 0.11));
  color: rgba(226, 232, 240, 0.96);
  font-size: 14px;
  font-weight: 950;
}
.qeres-title :deep(.inline),
.qeres-note :deep(.inline) {
  display: inline-block;
  white-space: nowrap;
}
.qeres-title :deep(.katex) {
  font-size: 1.05em;
}
.evenet-inline {
  display: inline-block;
  white-space: nowrap;
}
.qeres-plot :deep(.zoomable-plot-container) {
  min-height: 0;
}
.qeres-plot :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.qeres-notes {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
.qeres-note {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 50px;
  padding: 8px 13px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid;
  background: rgba(15, 23, 42, 0.64);
  color: rgba(255, 255, 255, 0.80);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.20);
}
.qeres-note > span {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
}
.qeres-note b {
  flex: 0 0 88px;
  color: rgba(255, 255, 255, 0.98);
  font-size: 14px;
}
.qeres-note small {
  min-width: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  line-height: 1.18;
}
.qeres-note-pink {
  border-left-color: rgba(244, 114, 182, 0.82);
  background: radial-gradient(circle at 5% 8%, rgba(244, 114, 182, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.qeres-note-amber {
  border-left-color: rgba(251, 191, 36, 0.84);
  background: radial-gradient(circle at 5% 8%, rgba(251, 191, 36, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.qeres-note-cyan {
  border-left-color: rgba(34, 211, 238, 0.84);
  background: radial-gradient(circle at 5% 8%, rgba(34, 211, 238, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.qeres-note-violet {
  border-left-color: rgba(167, 139, 250, 0.84);
  background: radial-gradient(circle at 5% 8%, rgba(167, 139, 250, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.qeres-icon {
  flex: 0 0 auto;
  color: rgba(125, 211, 252, 0.95);
  font-size: 18px;
  margin-top: 1px;
}
</style>
