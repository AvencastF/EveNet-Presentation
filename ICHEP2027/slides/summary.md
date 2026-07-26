---
transition: fade
---

# To bring them all...

<span>Summary of EveNet</span>

<div class="summary-stage">
  <div class="model-strip summary-reveal">
    <div class="model-icon i-carbon:network-4"></div>
    <div class="model-main">
      <span class="model-kicker">Foundation-model candidate</span>
      <strong><span class="gradient-animated" style="font-variant: small-caps;">EveNet</span> encoder–decoder</strong>
    </div>
    <div class="model-metrics">
      <span><b>500M</b> fast-sim events</span>
      <span><b>5</b> task heads</span>
    </div>
  </div>
  <div class="evidence-grid summary-reveal delay-1">
    <div class="evidence-card evidence-card--performance">
      <div class="card-top">
        <span class="card-icon i-carbon:chart-line"></span>
        <span class="card-kicker">Evidence</span>
      </div>
      <h3>Performance</h3>
      <p><span class="key-emphasis key-emphasis--cyan">Outperforms</span> <span text="[#67e8f9]">scratch</span>, <span text="[#67e8f9]">task-specific</span>, and <span text="[#67e8f9]">tabular FM</span> baselines.</p>
      <div class="mini-note">Strong in low-statistics classification and generation.</div>
    </div>
    <div class="evidence-card evidence-card--efficiency">
      <div class="card-top">
        <span class="card-icon i-carbon:time"></span>
        <span class="card-kicker">Supporting evidence</span>
      </div>
      <h3>Efficiency</h3>
      <p>Pretraining gives <span class="key-emphasis key-emphasis--amber">fast convergence</span> and reaches target performance up to <span class="key-emphasis key-emphasis--amber">3× faster</span>.</p>
      <div class="mini-note">A practical route to repeated downstream studies.</div>
    </div>
    <div class="evidence-card evidence-card--transfer">
      <div class="card-top">
        <span class="card-icon i-carbon:flow"></span>
        <span class="card-kicker">Transfer evidence</span>
      </div>
      <h3>Transfer</h3>
      <p>Evidence across <span class="key-emphasis key-emphasis--green">4 tasks</span>, from in-distribution to <span class="key-emphasis key-emphasis--green">out-of-distribution</span> settings.</p>
      <div class="tag-row">
        <span>detectors</span>
        <span>kinematics</span>
        <span>pile-up</span>
        <span>real data</span>
        <span>systematics</span>
      </div>
    </div>
  </div>
  <div class="outlook-panel summary-reveal delay-2">
    <div class="outlook-label">
      <span class="outlook-icon i-carbon:deploy"></span>
      <span>Next step</span>
      <strong>Outlook: Real Physics Deployment</strong>
    </div>
    <div class="outlook-flow">
      <div class="outlook-main">
        <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span>
        is being explored beyond benchmarks in <span class="key-emphasis key-emphasis--pink">experimental workflows</span>, including ongoing <span class="key-emphasis key-emphasis--pink">ATLAS</span> analyses and reconstruction studies.
      </div>
      <div class="outlook-subgrid">
        <div>
          <span class="sub-icon i-carbon:locked"></span>
          <p>Most ATLAS applications remain <span text="[#f0abfc]">internal and active</span>, serving as an early deployment testbed.</p>
        </div>
        <div>
          <span class="sub-icon i-carbon:presentation-file"></span>
          <p>Public showcase: <span text="[#f0abfc]">LEP Z → ττ</span> full spin density matrix and quantum effects at <a href="https://indi.to/T232V" target="_blank" rel="noopener" class="talk-link">CHEP</a>, <a href="https://indico.cern.ch/event/1574970/contributions/7093548/" target="_blank" rel="noopener" class="talk-link">BOOST</a> and <a href="https://indi.to/FXBv7" target="_blank" rel="noopener" class="talk-link">ICHEP</a>.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.summary-stage {
  margin-top: 0.78rem;
  display: grid;
  gap: 0.72rem;
}

.summary-reveal {
  animation: summaryFadeUp 620ms ease both;
}

.summary-reveal.delay-1 {
  animation-delay: 90ms;
}

.summary-reveal.delay-2 {
  animation-delay: 180ms;
}

@keyframes summaryFadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.model-strip {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9rem;
  max-width: 930px;
  padding: 0.62rem 0.82rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.28);
}

.model-icon,
.card-icon,
.outlook-icon,
.sub-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.model-icon {
  width: 34px;
  height: 34px;
  color: rgba(103, 232, 249, 0.88);
  font-size: 28px;
}

.model-main {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  min-width: 0;
}

.model-kicker,
.card-kicker {
  color: rgba(226, 232, 240, 0.52);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.model-main strong {
  color: rgba(255, 255, 255, 0.92);
  font-size: 19px;
  line-height: 1.1;
}

.model-metrics {
  display: flex;
  gap: 0.45rem;
}

.model-metrics span {
  display: inline-flex;
  align-items: baseline;
  gap: 0.26rem;
  padding: 0.32rem 0.46rem;
  border-radius: 6px;
  color: rgba(226, 232, 240, 0.74);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 11.5px;
  white-space: nowrap;
}

.model-metrics b {
  color: #00e5ff;
  font-size: 15px;
}

.evidence-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.78rem;
  max-width: 930px;
}

.evidence-card {
  min-height: 148px;
  padding: 0.74rem 0.82rem 0.68rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018)),
    rgba(15, 23, 42, 0.20);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
}

.card-icon {
  font-size: 24px;
  opacity: 0.88;
}

.evidence-card h3 {
  margin: 0.42rem 0 0.34rem;
  font-size: 18px;
  line-height: 1.05;
  color: rgba(255, 255, 255, 0.92);
}

.evidence-card p {
  margin: 0;
  color: rgba(226, 232, 240, 0.82);
  font-size: 13px;
  line-height: 1.36;
}

.key-emphasis {
  font-size: 1.13em;
  font-weight: 850;
  line-height: 1;
}

.key-emphasis--cyan {
  color: #67e8f9;
}

.key-emphasis--amber {
  color: #fdb874;
}

.key-emphasis--green {
  color: #4ade80;
}

.key-emphasis--pink {
  color: #f0abfc;
}

.mini-note {
  margin-top: 0.5rem;
  padding-top: 0.42rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(226, 232, 240, 0.58);
  font-size: 11.5px;
  line-height: 1.28;
}

.evidence-card--performance {
  box-shadow: inset 0 2px 0 rgba(103, 232, 249, 0.42);
}

.evidence-card--performance .card-icon,
.evidence-card--performance h3 {
  color: rgba(103, 232, 249, 0.94);
}

.evidence-card--efficiency {
  box-shadow: inset 0 2px 0 rgba(253, 186, 116, 0.42);
}

.evidence-card--efficiency .card-icon,
.evidence-card--efficiency h3 {
  color: rgba(253, 186, 116, 0.94);
}

.evidence-card--transfer {
  box-shadow: inset 0 2px 0 rgba(74, 222, 128, 0.42);
}

.evidence-card--transfer .card-icon,
.evidence-card--transfer h3 {
  color: rgba(74, 222, 128, 0.94);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.28rem;
  margin-top: 0.58rem;
}

.tag-row span {
  padding: 0.16rem 0.34rem;
  border-radius: 999px;
  color: rgba(187, 247, 208, 0.82);
  border: 1px solid rgba(74, 222, 128, 0.18);
  background: rgba(74, 222, 128, 0.06);
  font-size: 10.5px;
  line-height: 1.1;
}

.outlook-panel {
  max-width: 930px;
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: 0.9rem;
  padding: 0.76rem 0.9rem;
  border: 1px solid rgba(240, 171, 252, 0.18);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(240, 171, 252, 0.08), rgba(15, 23, 42, 0.12) 42%),
    rgba(15, 23, 42, 0.24);
}

.outlook-label {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 0.5rem;
  align-content: start;
  color: rgba(240, 171, 252, 0.9);
}

.outlook-icon {
  grid-row: 1 / span 2;
  font-size: 25px;
  opacity: 0.88;
}

.outlook-label span:not(.outlook-icon) {
  color: rgba(226, 232, 240, 0.50);
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.10em;
  text-transform: uppercase;
}

.outlook-label strong {
  margin-top: 0.15rem;
  color: rgba(240, 171, 252, 0.94);
  font-size: 17px;
  line-height: 1.14;
}

.outlook-flow {
  display: flex;
  flex-direction: column;
  gap: 0.52rem;
}

.outlook-main {
  color: rgba(255, 255, 255, 0.88);
  font-size: 14px;
  line-height: 1.38;
}

.outlook-main .key-emphasis {
  font-size: 1.09em;
}

.outlook-subgrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.58rem;
}

.outlook-subgrid > div {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 0.42rem;
  align-items: start;
  padding: 0.46rem 0.54rem;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.065);
}

.sub-icon {
  color: rgba(240, 171, 252, 0.80);
  font-size: 18px;
  margin-top: 0.06rem;
}

.outlook-subgrid p {
  margin: 0;
  color: rgba(226, 232, 240, 0.78);
  font-size: 11.7px;
  line-height: 1.28;
}

.talk-link {
  color: #f0abfc;
  font-weight: 750;
  text-decoration: none;
  border-bottom: 1px solid rgba(240, 171, 252, 0.42);
}
</style>
