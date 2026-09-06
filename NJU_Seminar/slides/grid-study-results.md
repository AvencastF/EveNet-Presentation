---
transition: fade
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# <span class="evenet-wordmark gradient-animated">EveNet</span> Grid Study Results

<!-- Hidden img tags to ensure Vite includes these assets in the build -->
<div style="display: none;">
  <img src="/grid_sic_individual.svg" alt="" />
</div>

<div class="study-content">
  <div class="plot-wrapper">
    <NJUPlot 
      src="/grid_sic_individual.svg" 
      alt="Grid SIC Individual Results"
    />
  </div>
  <div class="stress-test-panel">
    <div class="stress-test-title">X → YH<sub>SM</sub>: A demanding stress test</div>
    <div class="grid-statistics">
      <div class="stat-value">121</div>
      <div class="stat-copy"><span class="stat-label">mass points</span><span class="stat-range"><i>m</i><sub>X</sub> = 240–1000 GeV &nbsp;·&nbsp; <i>m</i><sub>Y</sub> = 60–800 GeV</span></div>
    </div>
    <div class="stress-feature">
      <span i-carbon:data-structured class="stress-icon stress-icon-cyan" />
      <div><span class="stress-highlight-cyan">Sparse signal</span><span class="stress-detail"> → 2.1k–19.7k selected events per mass point</span></div>
    </div>
    <div class="stress-feature">
      <span i-carbon:chart-line-data class="stress-icon stress-icon-orange" />
      <div><span class="stress-highlight-orange">Changing kinematics</span><span class="stress-detail"> → signal features vary strongly across the grid</span></div>
    </div>
    <div class="stress-feature">
      <span i-carbon:warning-alt class="stress-icon stress-icon-violet" />
      <div><span class="stress-highlight-violet">Background-dominated training</span><span class="stress-detail"> → difficult to converge quickly and stably</span></div>
    </div>
    <div class="stress-feature">
      <span i-carbon:warning-alt class="stress-icon stress-icon-green" />
      <div><span class="stress-highlight-green">Multi-parameter BSM models</span><span class="stress-detail"> → dense experimental grid scans</span></div>
    </div>
  </div>
</div>

<div class="results-container">
  <div class="result-item result-item-1">
    <span i-carbon:trophy class="icon-svg icon-svg-1" />
    <div class="result-content result-content-1">
      <span class="evenet-wordmark gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> achieves the <span class="highlight-number">highest Max SIC</span> across nearly the full grid
    </div>
  </div>

  <div class="result-item result-item-2">
    <span i-carbon:chart-line class="icon-svg icon-svg-2" />
    <div class="result-content result-content-2">
      <span class="evenet-wordmark gradient-animated" style="font-variant: small-caps;">EveNet-Full</span><span class="result-highlight-2"> outperforms</span> TabPFN in the <span class="highlight-region">low-statistics region</span>
    </div>
  </div>

  <div class="result-item result-item-3">
    <span i-carbon:time class="icon-svg icon-svg-3" />
    <div class="result-content result-content-3">
      <span class="evenet-wordmark gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> converges <span class="highlight-speed">~3× faster</span> than scratch, and <span class="highlight-speed">~2x faster</span> than <span class="evenet-wordmark gradient-animated" style="font-variant: small-caps;">EveNet-Cls</span>, with <span class="highlight-stable-3">stable sensitivity</span>
    </div>
  </div>

</div>

<style>
.study-content {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.plot-wrapper {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
}

.plot-wrapper :deep(.zoomable-plot-container) {
  width: 100%;
  height: 300px;
  margin: 0;
  padding: 10px;
}

.plot-wrapper :deep(.zoomable-plot-image) {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.stress-test-panel {
  flex: 1;
  height: 290px;
  min-width: 0;
  margin-top: 0.15rem;
  padding: 0.1rem 0 0.1rem 1.1rem;
  border-left: 1px solid rgba(103, 232, 249, 0.25);
}

.stress-test-title {
  font-size: 18px;
  line-height: 1.2;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.65rem;
}

.grid-statistics {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.65rem;
  padding: 0 0 0.65rem;
  border-bottom: 1px solid rgba(103, 232, 249, 0.18);
}

.stat-value {
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  color: rgb(103, 232, 249);
}

.stat-label {
  display: block;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
}

.stat-range {
  display: block;
  margin-top: 0.15rem;
  font-size: 12px;
  color: rgba(148, 163, 184, 0.9);
}

.stress-feature {
  display: flex;
  gap: 0.55rem;
  align-items: flex-start;
  margin-top: 0.55rem;
  font-size: 14px;
  line-height: 1.25;
}

.stress-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.stress-icon-cyan, .stress-highlight-cyan { color: rgb(103, 232, 249); }
.stress-icon-orange, .stress-highlight-orange { color: rgb(253, 186, 116); }
.stress-icon-violet, .stress-highlight-violet { color: rgb(196, 181, 253); }
.stress-icon-green, .stress-highlight-green { color: rgb(34, 197, 94); }

.stress-feature > div > span:first-child { font-weight: 600; }

.stress-detail {
  color: rgba(226, 232, 240, 0.78);
  font-size: 13px;
}

.results-container {
  margin-top: 0.5rem;
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
  padding: 0.5rem;
  background: rgba(139, 92, 246, 0.08);
  border-left: 3px solid;
  border-radius: 6px;
  transition: all 0.5s ease-out;
}

.result-item-1 {
  border-left-color: rgba(196, 181, 253, 0.6);
  background: rgba(196, 181, 253, 0.06);
}

.result-item-2 {
  border-left-color: rgba(103, 232, 249, 0.6);
  background: rgba(103, 232, 249, 0.06);
}

.result-item-3 {
  border-left-color: rgba(253, 186, 116, 0.6);
  background: rgba(253, 186, 116, 0.06);
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
  color: rgba(103, 232, 249, 0.95);
}

.icon-svg-3 {
  color: rgba(253, 186, 116, 0.95);
}

.result-content {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  padding-top: 0;
}

/* Item 1 - Purple/Violet */
.result-highlight-1 {
  font-weight: 600;
  color: rgba(196, 181, 253, 0.95);
}

.highlight-number {
  font-weight: 700;
  color: rgb(196, 181, 253);
  background: linear-gradient(135deg, rgba(196, 181, 253, 0.2), rgba(139, 92, 246, 0.2));
  padding: 1px 6px;
  border-radius: 3px;
  display: inline-block;
}

/* Item 2 - Cyan */
.result-highlight-2 {
  font-weight: 600;
  color: rgba(103, 232, 249, 0.95);
}

.highlight-region {
  font-weight: 600;
  color: rgb(103, 232, 249);
  background: linear-gradient(135deg, rgba(103, 232, 249, 0.15), rgba(34, 211, 238, 0.15));
  padding: 1px 6px;
  border-radius: 3px;
  display: inline-block;
}

/* Item 3 - Orange */
.highlight-speed {
  font-weight: 700;
  color: rgb(253, 186, 116);
  background: linear-gradient(135deg, rgba(253, 186, 116, 0.2), rgba(251, 146, 60, 0.2));
  padding: 1px 6px;
  border-radius: 3px;
  display: inline-block;
}

.highlight-stable-3 {
  font-weight: 600;
  color: rgba(253, 186, 116, 0.95);
}

/* Nature link styling */
.nature-link {
  color: rgba(103, 232, 249, 0.95);
  text-decoration: none;
  border-bottom: 1px solid rgba(103, 232, 249, 0.4);
  transition: all 0.2s ease;
}

.nature-link:hover {
  color: rgba(103, 232, 249, 1);
  border-bottom-color: rgba(103, 232, 249, 0.8);
}
</style>
