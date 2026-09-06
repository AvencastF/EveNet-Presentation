---
transition: fade
---

<script setup>
import LaTeX from 'slidev-addon-evenet/components/LaTeX.vue'
import NJUPlot from '../components/NJUPlot.vue'
</script>

# <span class="evenet-wordmark gradient-animated">EveNet</span>: robustness to detector variations

<div class="plots-container pt-4">
  <div class="plots-row">
    <div class="plot-wrapper">
      <div class="plot-title">Top spin: jet-energy scale · uncertainty on <LaTeX formula="D" /></div>
      <NJUPlot 
        src="/qe_systematics_precision_jes_only_scatter.svg" 
        alt="QE Systematics JES Only"
      />
    </div>
    <div class="plot-wrapper">
      <div class="plot-title">Top spin: missing momentum · uncertainty on <LaTeX formula="D" /></div>
      <NJUPlot 
        src="/qe_systematics_precision_met_only_scatter.svg" 
        alt="QE Systematics MET Only"
      />
    </div>
  </div>
  
  <div class="plots-row">
    <div class="plot-wrapper">
      <div class="plot-title">Exotic Higgs: jet-energy scale · pairing efficiency</div>
      <NJUPlot 
        src="/bsm_systematics_pair_scatter.svg" 
        alt="BSM Systematics Pair"
      />
    </div>
    <div class="plot-wrapper">
      <div class="plot-title">Exotic Higgs: jet-energy scale · peak SIC</div>
      <NJUPlot 
        src="/bsm_systematics_sic_scatter.svg" 
        alt="BSM Systematics SIC"
      />
    </div>
  </div>
</div>

<div class="systematics-key">Plot labels: JES = jet-energy scale; MET = missing transverse momentum. <LaTeX formula="D" /> probes spin correlations; SIC measures classification sensitivity.</div>

<div class="results-container">
  <div class="result-item result-item-1">
    <span i-carbon:settings-adjust class="icon-svg icon-svg-1" />
    <div class="result-content result-content-1">
      Vary the detector response and evaluate the same trained models <span class="result-highlight-1">without retraining</span>.
    </div>
  </div>

  <div class="result-item result-item-2">
    <span i-carbon:desk-adjustable class="icon-svg icon-svg-2" />
    <div class="result-content result-content-2">
      <span class="evenet-wordmark gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> shows <span class="result-highlight-2">smaller performance changes</span> than training from scratch under the tested variations.
    </div>
  </div>


</div>

<style>
.systematics-key{font-size:12px;line-height:1.45;color:var(--fg-1);margin-top:12px}

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
  border-top: 1px solid var(--nju-line);
  padding: 14px 0 0;
  margin-top: 1.2rem;
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
