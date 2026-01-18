---
class: py-10
---

# To bring them all...

<span>Summary of EveNet</span>

<div class="summary-content">
  <v-clicks>
    <!-- First bullet point -->
    <div class="summary-item">
      <div class="summary-bullet">•</div>
      <div class="summary-text">
        Trained <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span> encoder–decoder with 5 task-specific heads on <span text="[#00e5ff]">500M fast-simulated events</span>
      </div>
    </div>
    <!-- Key Aspects -->
    <div class="key-aspects">
      <!-- General Performance -->
      <div class="aspect-block">
        <div class="aspect-label performance-label">
          Overall Performance
        </div>
        <div class="aspect-content">
          <div class="aspect-line performance-line">
            Outperforms <span text="[#67e8f9]">scratch</span> and <span text="[#67e8f9]">task-specific models</span>, including <span text="[#67e8f9]">tabular foundation models</span>
          </div>
          <div class="aspect-line performance-line">
            Effective in <span text="[#67e8f9]">low-statistics regimes</span> for both <span text="[#67e8f9]">classification</span> and <span text="[#67e8f9]">generative tasks</span>
          </div>
        </div>
      </div>
      <!-- Simplified Analysis Workflow -->
      <div class="aspect-block">
        <div class="aspect-label workflow-label">
          Simplified Workflow
        </div>
        <div class="aspect-content">
          <div class="aspect-line workflow-line">
            Pretraining removes the need for <span text="[#c4b5fd]">auxiliary heads</span>
          </div>
          <div class="aspect-line workflow-line">
            A <span text="[#c4b5fd]">single classification head</span> is sufficient for typical S/B analysis
          </div>
        </div>
      </div>
      <!-- Computational Efficiency -->
      <div class="aspect-block">
        <div class="aspect-label efficiency-label">
          Computational Efficiency
        </div>
        <div class="aspect-content">
          <div class="aspect-line efficiency-line">
            <span text="[#fdb874]">Fast convergence</span> for full model     
          </div>
          <div class="aspect-line efficiency-line">
            Up to <span text="[#fdb874]">3× faster</span> than scratch training
          </div>
        </div>
      </div>
      <!-- Transfer Learning -->
      <div class="aspect-block">
        <div class="aspect-label transfer-label">
          Transfer Learning
        </div>
        <div class="aspect-content">
          <div class="aspect-line transfer-line">
            Promising performance across 4 downstream tasks
            : <i>in-distribution</i> →
            <span text="[#22c55e]" font-semibold>
              <i>out-of-distribution</i>
            </span>
          </div>
          <div class="aspect-line transfer-line">
            Generalizes across different <span text="[#4ade80]">detectors</span>, <span text="[#4ade80]">kinematic regimes</span>, <span text="[#4ade80]">pile-up simulations</span> and <span text="[#4ade80]">real data</span>
          </div>
          <div class="aspect-line transfer-line">
            Demonstrated <span text="[#4ade80]">robustness to systematic variations</span>
          </div>
        </div>
      </div>
    </div>
  </v-clicks>
</div>

<style>
.summary-content {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.summary-bullet {
  font-size: 18px;
  color: rgba(196, 181, 253, 0.8);
  flex-shrink: 0;
  margin-top: 2px;
}

.summary-text {
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

.key-aspects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.aspect-block {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding-bottom: 0.75rem;
}

.aspect-label {
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 6px;
  flex: 0 0 180px;
  padding-top: 2px;
}

.performance-label {
  color: rgba(103, 232, 249, 0.95);
  border-bottom: 1.5px solid rgba(103, 232, 249, 0.4);
}

.workflow-label {
  color: rgba(196, 181, 253, 0.95);
  border-bottom: 1.5px solid rgba(196, 181, 253, 0.4);
}

.efficiency-label {
  color: rgba(253, 186, 116, 0.95);
  border-bottom: 1.5px solid rgba(253, 186, 116, 0.4);
}

.transfer-label {
  color: rgba(74, 222, 128, 0.95);
  border-bottom: 1.5px solid rgba(74, 222, 128, 0.4);
}

.aspect-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
}

.aspect-line {
  font-size: 15px;
  line-height: 1.4;
  position: relative;
  padding-left: 18px;
}

.performance-line::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(103, 232, 249, 0.5);
  font-weight: 300;
}

.workflow-line::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(196, 181, 253, 0.5);
  font-weight: 300;
}

.efficiency-line::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(253, 186, 116, 0.5);
  font-weight: 300;
}

.transfer-line::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(74, 222, 128, 0.5);
  font-weight: 300;
}
</style>
