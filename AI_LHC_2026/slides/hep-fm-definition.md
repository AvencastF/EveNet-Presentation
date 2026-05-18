---
clicks: 2
transition: fade-out
glow: full
glowOpacity: 0.28
---

# What Counts as a Foundation Model in HEP?

<div class="fm-stepper">
  <div class="step-dot" :class="{ active: $clicks === 0, done: $clicks > 0 }">1</div>
  <div class="step-line" :class="{ active: $clicks > 0 }"></div>
  <div class="step-dot" :class="{ active: $clicks === 1, done: $clicks > 1 }">2</div>
  <div class="step-line" :class="{ active: $clicks > 1 }"></div>
  <div class="step-dot" :class="{ active: $clicks === 2 }">3</div>
</div>

<div class="fm-definition-stage">
  <section
    class="def-panel def-panel--cs"
    :class="{ active: $clicks === 0, past: $clicks > 0 }"
  >
    <div class="panel-top">
      <div class="panel-icon i-carbon:book"></div>
      <a href="https://arxiv.org/abs/2108.07258" target="_blank" rel="noopener" class="cite-pill">
        <span class="i-simple-icons:arxiv"></span>2108.07258
      </a>
    </div>
    <h2>CS Definition</h2>
    <p class="claim">
      Foundation models are <span class="u">broadly pretrained</span> and <span class="u">adapted</span>.
    </p>
    <div class="cs-grid">
      <div><b>Broad data</b><span>not one task</span></div>
      <div><b>Scale</b><span>data + compute</span></div>
      <div><b>Adaptation</b><span>fine-tune / prompt</span></div>
      <div><b>Homogenization</b><span>one backbone</span></div>
    </div>
  </section>

  <div class="flow-arrow" :class="{ active: $clicks >= 1 }">
    <div class="i-carbon:arrow-right"></div>
    <span>translate</span>
  </div>

  <section
    class="def-panel def-panel--hep"
    :class="{ active: $clicks === 1, muted: $clicks < 1, past: $clicks > 1 }"
  >
    <div class="panel-top">
      <div class="panel-icon i-carbon:network-4"></div>
      <span class="mode-pill">HEP is not web text</span>
    </div>
    <h2>Adapt to HEP</h2>
    <p class="claim">
      Replace “broad data” with <span class="u">broad physics phase space</span>.
    </p>
    <div class="hep-map">
      <div><span>data</span><strong>events / objects / detector signals</strong></div>
      <div><span>variation</span><strong>processes, systematics, geometries</strong></div>
      <div><span>reuse</span><strong>tasks, domains, analyses</strong></div>
    </div>
    <div class="not-enough">
      <span>Not enough</span>
      one classifier, one benchmark, one detector condition
    </div>
  </section>

  <div class="flow-arrow" :class="{ active: $clicks >= 2 }">
    <div class="i-carbon:arrow-right"></div>
    <span>require</span>
  </div>

  <section
    class="def-panel def-panel--criteria"
    :class="{ active: $clicks === 2, muted: $clicks < 2 }"
  >
    <div class="panel-top">
      <div class="panel-icon i-carbon:checkmark-outline"></div>
      <span class="mode-pill">working bar</span>
    </div>
    <h2>Criteria</h2>
    <div class="criteria-list">
      <div><i></i><strong>Pretrained shared backbone</strong></div>
      <div><i></i><strong>Reusable latent <em>z</em></strong></div>
      <div><i></i><strong>Multiple downstream tasks</strong></div>
      <div><i></i><strong>Transfer / OOD evidence</strong></div>
      <div><i></i><strong>Analysis-ready workflow</strong></div>
    </div>
  </section>
</div>

<style>
.fm-stepper {
  display: grid;
  grid-template-columns: 28px 86px 28px 86px 28px;
  align-items: center;
  margin-top: 0.38rem;
  width: max-content;
}

.step-dot {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(226, 232, 240, 0.22);
  background: rgba(15, 23, 42, 0.58);
  color: rgba(226, 232, 240, 0.52);
  font-size: 12px;
  line-height: 1;
  font-weight: 950;
  transition: all 260ms ease;
}

.step-dot.active {
  border-color: rgba(103, 232, 249, 0.80);
  background: rgba(103, 232, 249, 0.16);
  color: #fff;
  box-shadow: 0 0 22px rgba(103, 232, 249, 0.25);
}

.step-dot.done {
  border-color: rgba(110, 231, 183, 0.65);
  color: rgba(167, 243, 208, 0.95);
}

.step-line {
  height: 2px;
  background: rgba(226, 232, 240, 0.18);
  transform-origin: left center;
  transition: background 260ms ease, box-shadow 260ms ease;
}

.step-line.active {
  background: linear-gradient(90deg, rgba(103, 232, 249, 0.85), rgba(196, 181, 253, 0.75));
  box-shadow: 0 0 16px rgba(103, 232, 249, 0.28);
}

.fm-definition-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 54px minmax(0, 1fr) 54px minmax(0, 1fr);
  gap: 10px;
  align-items: stretch;
  margin-top: 12px;
  height: 385px;
}

.def-panel {
  position: relative;
  min-width: 0;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.064), rgba(255, 255, 255, 0.024)),
    rgba(5, 10, 22, 0.70);
  padding: 15px;
  overflow: hidden;
  opacity: 0.72;
  transform: scale(0.985);
  transition: opacity 260ms ease, transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
}

.def-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.10;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.20) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.20) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom, black, transparent 76%);
}

.def-panel.active {
  opacity: 1;
  transform: none;
}

.def-panel.muted {
  opacity: 0.34;
}

.def-panel.past {
  opacity: 0.52;
}

.def-panel--cs.active {
  border-color: rgba(103, 232, 249, 0.56);
  box-shadow: 0 0 34px rgba(34, 211, 238, 0.13);
}

.def-panel--hep.active {
  border-color: rgba(196, 181, 253, 0.60);
  box-shadow: 0 0 36px rgba(124, 92, 255, 0.16);
}

.def-panel--criteria.active {
  border-color: rgba(110, 231, 183, 0.58);
  box-shadow: 0 0 36px rgba(16, 185, 129, 0.14);
}

.panel-top,
.def-panel h2,
.claim,
.cs-grid,
.hep-map,
.not-enough,
.criteria-list {
  position: relative;
  z-index: 1;
}

.panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.panel-icon {
  width: 30px;
  height: 30px;
}

.def-panel--cs .panel-icon { color: #67e8f9; }
.def-panel--hep .panel-icon { color: #c4b5fd; }
.def-panel--criteria .panel-icon { color: #6ee7b7; }

.cite-pill,
.mode-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 23px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.045);
  color: rgba(226, 232, 240, 0.72);
  padding: 0 8px;
  font-size: 9.6px;
  line-height: 1;
  font-weight: 850;
  text-decoration: none;
  white-space: nowrap;
}

.cite-pill span {
  width: 12px;
  height: 12px;
  color: #67e8f9;
}

.def-panel h2 {
  margin: 15px 0 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: 24px;
  line-height: 1;
  letter-spacing: 0;
}

.claim {
  margin: 18px 0 0;
  color: rgba(226, 232, 240, 0.76);
  font-size: 19px;
  line-height: 1.28;
  font-weight: 650;
}

.u {
  color: #fff;
  font-weight: 900;
  background-image: linear-gradient(90deg, rgba(103, 232, 249, 0.70), rgba(196, 181, 253, 0.70));
  background-repeat: no-repeat;
  background-size: 100% 3px;
  background-position: 0 100%;
  padding-bottom: 1px;
}

.cs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 24px;
}

.cs-grid div {
  min-height: 72px;
  border-radius: 8px;
  border: 1px solid rgba(103, 232, 249, 0.15);
  background: rgba(103, 232, 249, 0.055);
  padding: 10px;
}

.cs-grid b,
.hep-map strong,
.criteria-list strong {
  display: block;
  color: rgba(255, 255, 255, 0.92);
  font-size: 13px;
  line-height: 1.08;
  font-weight: 900;
}

.cs-grid span,
.hep-map span {
  display: block;
  margin-top: 7px;
  color: rgba(226, 232, 240, 0.55);
  font-size: 10.5px;
  line-height: 1.1;
  font-weight: 800;
}

.hep-map {
  display: grid;
  gap: 8px;
  margin-top: 23px;
}

.hep-map div {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  align-items: center;
  min-height: 45px;
  border-radius: 8px;
  border: 1px solid rgba(196, 181, 253, 0.18);
  background: rgba(196, 181, 253, 0.060);
  padding: 9px 10px;
}

.hep-map span {
  margin: 0;
  color: rgba(196, 181, 253, 0.92);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 9px;
}

.not-enough {
  margin-top: 16px;
  border-left: 3px solid rgba(248, 113, 113, 0.66);
  background: rgba(248, 113, 113, 0.070);
  color: rgba(226, 232, 240, 0.63);
  padding: 9px 10px;
  font-size: 12px;
  line-height: 1.25;
}

.not-enough span {
  display: block;
  margin-bottom: 2px;
  color: rgba(255, 255, 255, 0.90);
  font-size: 10px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.criteria-list {
  display: grid;
  gap: 9px;
  margin-top: 24px;
}

.criteria-list div {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  min-height: 38px;
  border-radius: 8px;
  border: 1px solid rgba(110, 231, 183, 0.17);
  background: rgba(110, 231, 183, 0.055);
  padding: 8px 10px;
}

.criteria-list i {
  width: 10px;
  height: 10px;
  justify-self: center;
  border-radius: 50%;
  background: rgba(110, 231, 183, 0.95);
  box-shadow: 0 0 12px rgba(110, 231, 183, 0.50);
}

.criteria-list em {
  font-family: serif;
  font-style: italic;
}

.flow-arrow {
  align-self: center;
  justify-self: center;
  display: grid;
  place-items: center;
  gap: 7px;
  color: rgba(226, 232, 240, 0.28);
  transform: scale(0.96);
  transition: color 260ms ease, transform 260ms ease;
}

.flow-arrow div {
  width: 34px;
  height: 34px;
}

.flow-arrow span {
  font-size: 9px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.10em;
  text-transform: uppercase;
}

.flow-arrow.active {
  color: rgba(103, 232, 249, 0.92);
  transform: none;
  animation: arrowPulse 1100ms ease-in-out infinite;
}

@keyframes arrowPulse {
  0%, 100% { filter: drop-shadow(0 0 0 rgba(103, 232, 249, 0)); }
  50% { filter: drop-shadow(0 0 12px rgba(103, 232, 249, 0.42)); }
}
</style>
