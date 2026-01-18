---
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# <span class="gradient-animated">EveNet</span> Grid Study Results

<!-- Hidden img tags to ensure Vite includes these assets in the build -->
<div style="display: none;">
  <img src="/grid_sic_individual.svg" alt="" />
  <img src="/grid_sic_mixed.svg" alt="" />
</div>

<div class="plots-container pt-4">
  <div class="plot-wrapper">
    <div class="plot-title">Individual Training</div>
    <ZoomablePlot 
      src="/grid_sic_individual.svg" 
      alt="Grid SIC Individual Results"
    />
  </div>
  
  <div class="plot-wrapper">
    <div class="plot-title">Paramertized Training</div>
    <ZoomablePlot 
      src="/grid_sic_mixed.svg" 
      alt="Grid SIC Mixed Results"
    />
  </div>
</div>

<div class="results-container">
  <div class="result-item result-item-1">
    <span i-carbon:trophy class="icon-svg icon-svg-1" />
    <div class="result-content result-content-1">
      <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span><span class="result-highlight-1"></span> achieves the <span class="highlight-number">highest Max SIC</span> across nearly the entire <LaTeX formula="(m_X, m_Y)" /> grid
    </div>
  </div>

  <div class="result-item result-item-2">
    <span i-carbon:chart-line class="icon-svg icon-svg-2" />
    <div class="result-content result-content-2">
      <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span><span class="result-highlight-2"> outperforms</span> tabular foundation model (TabPFN [<a href="https://www.nature.com/articles/s41586-024-08328-6" target="_blank" class="nature-link">Nature</a>]) even in <span class="highlight-region">low-statistics region</span>
    </div>
  </div>

  <div class="result-item result-item-3">
    <span i-carbon:time class="icon-svg icon-svg-3" />
    <div class="result-content result-content-3">
      <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span> converges <span class="highlight-speed">~3× faster</span> than scratch training, while maintaining <span class="highlight-stable-3">stable sensitivity</span>
    </div>
  </div>

  <div class="result-item result-item-4">
    <span i-carbon:information class="icon-svg icon-svg-4" />
    <div class="result-content result-content-4">
      <span class="result-highlight-4">Parameterized training</span> doesn't help in this study
    </div>
  </div>
</div>

<style>
.plots-container {
  display: flex;
  gap: 1.5rem;
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
  font-size: 18px;
  color: rgba(148, 163, 184, 0.9);
  margin-bottom: 0.25rem;
  margin-top: 0;
  text-align: center;
  font-weight: 500;
}

.plot-wrapper :deep(.zoomable-plot-container) {
  width: 100%;
  height: 35vh;
  min-height: 200px;
  max-height: 22vh;
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
  margin-top: 0.75rem;
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

.result-item-4 {
  border-left-color: rgba(148, 163, 184, 0.6);
  background: rgba(148, 163, 184, 0.06);
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

.icon-svg-4 {
  color: rgba(148, 163, 184, 0.95);
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

/* Item 4 - Gray/Muted */
.result-highlight-4 {
  font-weight: 600;
  color: rgba(148, 163, 184, 0.95);
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
