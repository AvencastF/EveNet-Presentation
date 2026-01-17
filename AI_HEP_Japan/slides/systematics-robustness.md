---
class: py-10 no-page-number
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# <span class="gradient-animated">EveNet</span> Systematic Robustness

<div class="plots-container pt-4">
  <div class="plots-row">
    <div class="plot-wrapper">
      <div class="plot-title">QC: JES variation → Precision on D</div>
      <ZoomablePlot 
        src="/qe_systematics_precision_jes_only_scatter.svg" 
        alt="QE Systematics JES Only"
      />
    </div>
    <div class="plot-wrapper">
      <div class="plot-title">QC: MET variation → Precision on D</div>
      <ZoomablePlot 
        src="/qe_systematics_precision_met_only_scatter.svg" 
        alt="QE Systematics MET Only"
      />
    </div>
  </div>
  
  <div class="plots-row">
    <div class="plot-wrapper">
      <div class="plot-title">Exotic: JES variation → Jet pairing efficiency</div>
      <ZoomablePlot 
        src="/bsm_systematics_pair_scatter.svg" 
        alt="BSM Systematics Pair"
      />
    </div>
    <div class="plot-wrapper">
      <div class="plot-title">Exotic: JES variation → Max SIC</div>
      <ZoomablePlot 
        src="/bsm_systematics_sic_scatter.svg" 
        alt="BSM Systematics SIC"
      />
    </div>
  </div>
</div>

<div class="results-container">
  <div class="result-item result-item-1">
    <span i-carbon:settings-adjust class="icon-svg icon-svg-1" />
    <div class="result-content result-content-1">
      Models are <span class="result-highlight-1">evaluated directly</span> on systematically varied data <span class="result-highlight-1">without retraining</span>, demonstrating genuine robustness to detector-level uncertainties
    </div>
  </div>

  <div class="result-item result-item-2">
    <span i-carbon:desk-adjustable class="icon-svg icon-svg-2" />
    <div class="result-content result-content-2">
      <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> is <span class="result-highlight-2">consistently more stable</span> than scratch training under the tested systematic variations
    </div>
  </div>

  <div class="result-item result-item-3">
    <span i-carbon:chart-line class="icon-svg icon-svg-3" />
    <div class="result-content result-content-3">
      Systematic robustness represents a key advantage of <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span>, <span class="highlight-precision">supporting precision measurements in systematics-limited regimes</span>
    </div>
  </div>
</div>

<style>
.plots-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.plots-row {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.plot-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 48%;
  min-height: 0;
}

.plot-title {
  font-size: 16px;
  color: rgba(148, 163, 184, 0.9);
  margin-bottom: 0.25rem;
  margin-top: 0;
  text-align: center;
  font-weight: 500;
}

.plot-wrapper :deep(.zoomable-plot-container) {
  width: 100%;
  height: 28vh;
  min-height: 1vh;
  max-height: 9vh;
  margin: 0;
  padding: 0;
}

.plot-wrapper :deep(.zoomable-plot-image) {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.results-container {
  margin-top: 1.2rem;
  padding: 0;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
  background: rgba(139, 92, 246, 0.08);
  border-left: 3px solid;
  border-radius: 6px;
  transition: all 0.5s ease-out;
}

.result-item-1 {
  border-left-color: rgba(139, 92, 246, 0.6);
  background: rgba(139, 92, 246, 0.06);
}

.result-item-2 {
  border-left-color: rgba(253, 186, 116, 0.6);
  background: rgba(253, 186, 116, 0.06);
}

.result-item-3 {
  border-left-color: rgba(103, 232, 249, 0.8);
  background: rgba(103, 232, 249, 0.1);
  border-left-width: 4px;
}

.icon-svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
  margin-top: 2px;
  transition: all 0.4s ease-out;
}

.icon-svg-1 {
  color: rgba(196, 181, 253, 0.95);
}

.icon-svg-2 {
  color: rgba(253, 186, 116, 0.95);
}

.icon-svg-3 {
  color: rgba(103, 232, 249, 1);
}

.result-content {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  padding-top: 0;
}

/* Item 1 - Purple/Violet (Methodology Statement) */
.result-highlight-1 {
  font-weight: 600;
  color: rgba(196, 181, 253, 0.95);
}

/* Item 2 - Orange (Performance Overview) */
.result-highlight-2 {
  font-weight: 600;
  color: rgba(253, 186, 116, 0.95);
}

/* Item 3 - Cyan/Bright (Most Important - Precision Measurements) */
.highlight-precision {
  font-weight: 700;
  color: rgb(103, 232, 249);
  /* background: linear-gradient(135deg, rgba(103, 232, 249, 0.25), rgba(34, 211, 238, 0.25)); */
  padding: 2px 0;
  /* border-radius: 4px; */
  display: inline;
  /* border: 1px solid rgba(103, 232, 249, 0.3); */
}
</style>
