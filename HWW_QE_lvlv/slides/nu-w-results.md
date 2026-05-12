---
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# <span class="gradient-animated">W</span> Four-Momentum Distributions

<span class="subtitle text-zinc-300">On-shell and off-shell reconstructed bosons, evaluated on held-out test events</span>

<div class="wres-preload">
  <img src="/distributions/w_on_pt.svg" alt="" />
  <img src="/distributions/w_on_eta.svg" alt="" />
  <img src="/distributions/w_on_phi.svg" alt="" />
  <img src="/distributions/w_on_mass.svg" alt="" />
  <img src="/distributions/w_off_pt.svg" alt="" />
  <img src="/distributions/w_off_eta.svg" alt="" />
  <img src="/distributions/w_off_phi.svg" alt="" />
  <img src="/distributions/w_off_mass.svg" alt="" />
</div>

<div class="wres-page">
  <div class="wres-grid">
    <div class="wres-row-label wres-cyan">
      <LaTeX formula="\mathbf{W}" />
      <span>on-shell</span>
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="p_{\mathrm{T}}^{W}" /></div>
      <ZoomablePlot src="/distributions/w_on_pt.svg" alt="On-shell W pT distribution" />
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="\eta^{W}" /></div>
      <ZoomablePlot src="/distributions/w_on_eta.svg" alt="On-shell W eta distribution" />
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="\phi^{W}" /></div>
      <ZoomablePlot src="/distributions/w_on_phi.svg" alt="On-shell W phi distribution" />
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="M_{W}" /></div>
      <ZoomablePlot src="/distributions/w_on_mass.svg" alt="On-shell W mass distribution" />
    </div>
    <div class="wres-row-label wres-pink">
      <LaTeX formula="\mathbf{W}^{*}" />
      <span>off-shell</span>
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="p_{\mathrm{T}}^{W^{*}}" /></div>
      <ZoomablePlot src="/distributions/w_off_pt.svg" alt="Off-shell W pT distribution" />
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="\eta^{W^{*}}" /></div>
      <ZoomablePlot src="/distributions/w_off_eta.svg" alt="Off-shell W eta distribution" />
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="\phi^{W^{*}}" /></div>
      <ZoomablePlot src="/distributions/w_off_phi.svg" alt="Off-shell W phi distribution" />
    </div>
    <div class="wres-plot">
      <div class="wres-title"><LaTeX formula="M_{W^{*}}" /></div>
      <ZoomablePlot src="/distributions/w_off_mass.svg" alt="Off-shell W mass distribution" />
    </div>
  </div>
  <div class="wres-notes">
    <div class="wres-note wres-note-cyan"><div i-carbon:chart-line-data class="wres-icon" /><span>
        PCRes is more sharply constrained but also more sculpted. It tends to produce narrower structures, especially in <LaTeX formula="W" /> and <LaTeX formula="W^{*}" /> mass, with clear artificial peaks or dips.
        </span>
    </div>
    <div class="wres-note wres-note-amber"><div i-carbon:fit-to-screen class="wres-icon" /><span><span class="gradient-animated evenet-inline">EveNet</span> gives smoother shape-level agreement. It better follows the broad shapes in <LaTeX formula="p_{\mathrm{T}}^{W}" />, <LaTeX formula="\eta^{W}" />, and <LaTeX formula="\phi^{W}" />, which is less over-constrained than PCRes.</span>
    </div>
  </div>
</div>

<style>
.wres-preload {
  display: none;
}
.wres-page {
  height: 386px;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 58px;
  gap: 9px;
  margin-top: 9px;
}
.wres-grid {
  display: grid;
  grid-template-columns: 72px repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 8px;
  min-height: 0;
}
.wres-row-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 950;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.78), rgba(30, 41, 59, 0.48));
  box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.04);
}
.wres-row-label span {
  color: rgba(255, 255, 255, 0.58);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.wres-cyan {
  color: rgba(207, 250, 254, 0.98);
  border-color: rgba(34, 211, 238, 0.42);
}
.wres-pink {
  color: rgba(252, 231, 243, 0.98);
  border-color: rgba(244, 114, 182, 0.42);
}
.wres-plot {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-rows: 26px minmax(0, 1fr);
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.74), rgba(30, 41, 59, 0.38));
  padding: 5px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
}
.wres-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(226, 232, 240, 0.94);
  font-size: 13px;
  font-weight: 950;
  border-radius: 7px;
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.10), rgba(167, 139, 250, 0.10));
  margin-bottom: 5px;
}
.wres-title :deep(.katex),
.wres-row-label :deep(.katex) {
  font-size: 1.05em;
}
.wres-title :deep(.inline),
.wres-row-label :deep(.inline),
.wres-note :deep(.inline) {
  display: inline-block;
  white-space: nowrap;
}
.evenet-inline {
  display: inline-block;
  white-space: nowrap;
}
.wres-plot :deep(.zoomable-plot-container) {
  min-height: 0;
}
.wres-plot :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.wres-notes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.wres-note {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 12px;
  border-radius: 11px;
  font-size: 12px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.80);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid;
  background: radial-gradient(circle at 6% 50%, rgba(34, 211, 238, 0.16), transparent 38%), rgba(15, 23, 42, 0.62);
}
.wres-note b {
  color: rgba(255, 255, 255, 0.98);
}
.wres-note-cyan {
  border-left-color: rgba(34, 211, 238, 0.82);
}
.wres-note-amber {
  border-left-color: rgba(251, 191, 36, 0.82);
  background: radial-gradient(circle at 6% 50%, rgba(251, 191, 36, 0.14), transparent 38%), rgba(15, 23, 42, 0.62);
}
.wres-icon {
  flex: 0 0 auto;
  color: rgba(125, 211, 252, 0.95);
  font-size: 17px;
}
</style>
