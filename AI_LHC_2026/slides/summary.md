---
transition: fade
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
      <!-- Computational Efficiency -->
      <div class="aspect-block">
        <div class="aspect-label efficiency-label">
          Computational Efficiency
        </div>
        <div class="aspect-content">
          <div class="aspect-line efficiency-line">
            The pretrained full model shows <span text="[#fdb874]">fast convergence</span>, reaching downstream performance up to <span text="[#fdb874]">3× faster</span> than scratch training.
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
            EveNet gives transfer evidence across 4 downstream tasks, from <i>in-distribution</i> to <span text="[#22c55e]" font-semibold><i>out-of-distribution</i></span> settings.
          </div>
          <div class="aspect-line transfer-line">
            It generalizes across <span text="[#4ade80]">detectors</span>, <span text="[#4ade80]">kinematic regimes</span>, <span text="[#4ade80]">pile-up simulations</span>, and <span text="[#4ade80]">real data</span>.
          </div>
          <div class="aspect-line transfer-line">
            It demonstrates <span text="[#4ade80]">robustness to systematic variations</span>.
          </div>
        </div>
      </div>
      <!-- Real Analysis Application -->
      <div class="aspect-divider">
        <span class="aspect-divider-text">Next gate</span>
      </div>
      <div class="gate-block">
        <div class="gate-head">
          <div class="gate-title application-label">
            Towards Real Physics Analysis
          </div>
          <p class="gate-lead">
            <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span>
            is now moving beyond benchmark studies into
            <span text="[#f0abfc]">real experimental workflows</span>,
            including multiple ongoing
            <span text="[#f0abfc]">ATLAS</span>
            analyses and reconstruction studies.
          </p>
        </div>
        <ul class="gate-subbullets">
          <li class="gate-subbullet">
            Most ATLAS applications remain
            <span text="[#f0abfc]">internal and under active development</span>,
            serving as an early deployment testbed for event-level foundation models.
          </li>
          <li class="gate-subbullet">
            The first public-facing showcase is our
            <span text="[#f0abfc]">LEP Z → ττ</span>
            study on full spin density matrix reconstruction and quantum effects,
            to be presented at
            <a href="https://indi.to/T232V" target="_blank" rel="noopener" class="talk-link">CHEP</a>
            and later
            <a href="https://indi.to/FXBv7" target="_blank" rel="noopener" class="talk-link">ICHEP</a>.
          </li>
        </ul>
      </div>
    </div>
  </v-clicks>
</div>

<style>
.summary-content {
  margin-top: 0.45rem;
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
  max-height: calc(100vh - 7.5rem);
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  margin-bottom: 0.02rem;
}

.summary-bullet {
  font-size: 16px;
  color: rgba(196, 181, 253, 0.8);
  flex-shrink: 0;
  margin-top: 1px;
}

.summary-text {
  font-size: 14.5px;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.9);
}

.key-aspects {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.1rem;
}

.aspect-block {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  column-gap: 1.1rem;
  align-items: flex-start;
  padding-bottom: 0.2rem;
}

.aspect-label {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 14.5px;
  line-height: 1.15;
  font-weight: 600;
  padding-bottom: 4px;
}

.performance-label {
  color: rgba(103, 232, 249, 0.95);
  border-bottom: 1.5px solid rgba(103, 232, 249, 0.4);
}

.efficiency-label {
  color: rgba(253, 186, 116, 0.95);
  border-bottom: 1.5px solid rgba(253, 186, 116, 0.4);
}

.transfer-label {
  color: rgba(74, 222, 128, 0.95);
  border-bottom: 1.5px solid rgba(74, 222, 128, 0.4);
}

.application-label {
  color: rgba(240, 171, 252, 0.95);
  border-bottom: 1.5px solid rgba(240, 171, 252, 0.4);
}

.label-kicker {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.55);
}

.aspect-divider {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  column-gap: 1.1rem;
  align-items: center;
  margin: 0.08rem 0 0.06rem;
}

.aspect-divider-text {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(240, 171, 252, 0.72);
}

.aspect-divider-text::before,
.aspect-divider-text::after {
  content: "";
  flex: 1;
  height: 2.5px;
  background: linear-gradient(90deg, transparent, rgba(240, 171, 252, 0.45), transparent);
}

.aspect-content {
  display: flex;
  flex-direction: column;
  gap: 0.26rem;
  color: rgba(255, 255, 255, 0.85);
  min-width: 0;
}

.aspect-line {
  font-size: 13.5px;
  line-height: 1.42;
  position: relative;
  padding-left: 0.95rem;
}

.gate-block {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  padding-top: 0.04rem;
}

.gate-head {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  column-gap: 1.1rem;
  align-items: start;
}

.gate-title {
  margin: 0;
  padding-bottom: 4px;
}

.gate-lead {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.42;
  color: rgba(255, 255, 255, 0.88);
}

.gate-subbullets {
  list-style: none;
  margin: 0;
  padding: 0.1rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}

.gate-subbullet {
  position: relative;
  margin: 0;
  padding: 0 0 0 1.35rem;
  font-size: 13.5px;
  line-height: 1.42;
  color: rgba(255, 255, 255, 0.85);
}

.gate-subbullet::before {
  content: "";
  position: absolute;
  left: 0.55rem;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(240, 171, 252, 0.95);
  box-shadow: 0 0 8px rgba(240, 171, 252, 0.85);
  transform: translateY(-50%);
}

.aspect-line::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.48em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 8px currentColor;
}

.performance-line::before {
  color: rgba(103, 232, 249, 0.85);
  background: rgba(103, 232, 249, 0.95);
}

.efficiency-line::before {
  color: rgba(253, 186, 116, 0.85);
  background: rgba(253, 186, 116, 0.95);
}

.transfer-line::before {
  color: rgba(74, 222, 128, 0.85);
  background: rgba(74, 222, 128, 0.95);
}

.application-line::before {
  color: rgba(240, 171, 252, 0.85);
  background: rgba(240, 171, 252, 0.95);
}

.talk-link {
  color: #f0abfc;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid rgba(240, 171, 252, 0.45);
}
</style>
