---
transition: fade
---

<script setup>
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# <span class="gradient-animated">Reconstruction</span> Summary

<span class="subtitle text-zinc-300">Distribution-level calibration versus event-level matching</span>

<div class="sres-preload">
  <img src="/summary/boson_fourmoment_metrics.svg" alt="" />
  <img src="/summary/qe_angle_metrics.svg" alt="" />
</div>

<div class="sres-page">
  <div class="sres-left">
    <div class="sres-plot sres-plot-wide"><div class="sres-title">Boson four-momentum metrics</div><ZoomablePlot src="/summary/boson_fourmoment_metrics.svg" alt="Boson four-momentum summary metrics" /></div>
    <div class="sres-mini-notes">
      <div class="sres-mini sres-cyan"><b>Distribution metrics</b><span>W1 and signed bias reveal global calibration.</span></div>
      <div class="sres-mini sres-amber"><b>Event metrics</b><span>MAE, RMSE, and Pearson reward best-fit sharpness.</span></div>
    </div>
  </div>
  <div class="sres-plot sres-plot-qe"><div class="sres-title">QE angular metrics</div><ZoomablePlot src="/summary/qe_angle_metrics.svg" alt="QE angle summary metrics" /></div>
  <div class="sres-notes">
    <div class="sres-note sres-note-amber"><div i-carbon:bullhorn class="sres-icon" /><span><b>MAE / RMSE</b><small>PCRes is best event-wise; <span class="gradient-animated evenet-inline">EveNet</span> is modestly broader, consistent with valid posterior solutions.</small></span></div>
    <div class="sres-note sres-note-cyan"><div i-carbon:chart-relationship class="sres-icon" /><span><b>W1</b><small><span class="gradient-animated evenet-inline">EveNet</span> sharply lowers Wasserstein distance, improving QE phase-space agreement.</small></span></div>
    <div class="sres-note sres-note-violet"><div i-carbon:scatter-matrix class="sres-icon" /><span><b>Pearson</b><small>PCRes keeps stronger one-to-one matching; <span class="gradient-animated evenet-inline">EveNet</span> samples plausible configurations.</small></span></div>
    <div class="sres-note sres-note-green"><div i-carbon:chart-line-smooth class="sres-icon" /><span><b>Bias</b><small><span class="gradient-animated evenet-inline">EveNet</span> stays closer to zero signed bias, reducing systematic angular distortions.</small></span></div>
  </div>
</div>

<style>
.sres-preload {
  display: none;
}
.sres-page {
  height: 388px;
  display: grid;
  grid-template-columns: minmax(0, 0.98fr) minmax(0, 0.90fr) 300px;
  gap: 12px;
  margin-top: 10px;
}
.sres-left {
  min-width: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 88px;
  gap: 10px;
}
.sres-plot {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-rows: 30px minmax(0, 1fr);
  border-radius: 13px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.76), rgba(30, 41, 59, 0.40));
  padding: 8px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
}
.sres-title {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.12), rgba(167, 139, 250, 0.12));
  color: rgba(226, 232, 240, 0.94);
  font-size: 12.5px;
  font-weight: 950;
}
.sres-plot :deep(.zoomable-plot-container) {
  min-height: 0;
}
.sres-plot :deep(.zoomable-plot-image) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.sres-mini-notes {
  display: grid;
  gap: 8px;
}
.sres-mini {
  display: grid;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 10px;
  border-left: 4px solid;
  background: rgba(15, 23, 42, 0.64);
}
.sres-mini b {
  color: rgba(255, 255, 255, 0.96);
  font-size: 11.3px;
}
.sres-mini span {
  color: rgba(255, 255, 255, 0.66);
  font-size: 10.2px;
  line-height: 1.2;
}
.sres-cyan {
  border-left-color: rgba(34, 211, 238, 0.80);
}
.sres-amber {
  border-left-color: rgba(251, 191, 36, 0.80);
}
.sres-notes {
  display: grid;
  align-content: stretch;
  gap: 8px;
}
.sres-note {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 9px 10px;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid;
  background: rgba(15, 23, 42, 0.64);
  color: rgba(255, 255, 255, 0.80);
}
.sres-note > span {
  display: grid;
  gap: 3px;
}
.sres-note b {
  color: rgba(255, 255, 255, 0.98);
  font-size: 13px;
}
.sres-note small {
  color: rgba(255, 255, 255, 0.66);
  font-size: 12px;
  line-height: 1.2;
}
.sres-note-cyan {
  border-left-color: rgba(34, 211, 238, 0.82);
  background: radial-gradient(circle at 5% 8%, rgba(34, 211, 238, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.sres-note-amber {
  border-left-color: rgba(251, 191, 36, 0.82);
  background: radial-gradient(circle at 5% 8%, rgba(251, 191, 36, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.sres-note-violet {
  border-left-color: rgba(167, 139, 250, 0.82);
  background: radial-gradient(circle at 5% 8%, rgba(167, 139, 250, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.sres-note-green {
  border-left-color: rgba(52, 211, 153, 0.82);
  background: radial-gradient(circle at 5% 8%, rgba(52, 211, 153, 0.16), transparent 45%), rgba(15, 23, 42, 0.64);
}
.sres-icon {
  flex: 0 0 auto;
  color: rgba(125, 211, 252, 0.95);
  font-size: 16px;
  margin-top: 1px;
}
.evenet-inline {
  display: inline-block;
  white-space: nowrap;
}
</style>
