---
clicks: 1
transition: fade-out
glow: full
glowOpacity: 0.28
---

<h1 class="fm-title">From Pretrained Models to <span class="gradient-animated">Foundation Models</span></h1>
<div class="bridge-note">
  The CS concept gives us a useful anchor, but in HEP the open question is what <strong>evidence</strong> proves broad and reliable <strong>transfer</strong>.
</div>
<div class="fm-stepper">
  <div class="step-dot" :class="{ active: $clicks === 0, done: $clicks > 0 }">1</div>
  <div class="step-label" :class="{ active: $clicks === 0 }">CS anchor</div>
  <div class="step-line" :class="{ active: $clicks > 0 }"></div>
  <div class="step-dot" :class="{ active: $clicks === 1, done: $clicks > 1 }">2</div>
  <div class="step-label" :class="{ active: $clicks === 1 }">HEP evidence</div>
</div>
<div class="fm-definition-stage" :class="{ 'state-cs': $clicks === 0, 'state-evidence': $clicks > 0 }">
  <section class="def-panel def-panel--cs" :class="{ active: $clicks === 0, collapsed: $clicks > 0, done: $clicks > 0 }">
    <div class="rail-content">
      <span class="rail-number">01</span>
      <span class="rail-icon i-carbon:book"></span>
      <strong>CS anchor</strong>
    </div>
    <div class="active-content active-content--cs">
      <div class="panel-top fm-reveal">
        <div class="panel-kicker">
          <span class="panel-icon i-carbon:book"></span>
          <span>Computer science anchor</span>
        </div>
        <a href="https://arxiv.org/abs/2108.07258" target="_blank" rel="noopener" class="cite-pill">
          <span class="i-simple-icons:arxiv"></span>2108.07258
        </a>
      </div>
      <div class="cs-anchor-grid">
        <div class="cs-quote-card fm-reveal delay-1">
          <p class="definition-quote">
            A foundation model is a model trained on <span class="hl-cyan">broad data</span> <span class="hl-magenta">at scale</span> that can be <span class="hl-green">adapted</span> to a wide range of <span class="hl-violet">downstream tasks</span>.
            <br />
            It is not a fully complete model in itself, but a <span class="hl-amber">foundation</span>: a starting point for building <span class="hl-cyan">task-specific models</span>.
          </p>
        </div>
        <div class="cs-points fm-reveal delay-2">
          <div class="cs-point">
            <span class="i-carbon:idea"></span>
            <strong>Emergence</strong>
            <p>New behaviors from scale</p>
          </div>
          <div class="cs-point">
            <span class="i-carbon:model"></span>
            <strong>Homogenization</strong>
            <p>One model, many tasks</p>
          </div>
          <div class="cs-point primary">
            <span class="i-carbon:flow"></span>
            <strong>Transferable representations</strong>
            <p>Pretrain once, reuse anywhere</p>
          </div>
          <div class="cs-point">
            <span class="i-carbon:network-4"></span>
            <strong>Multimodal potential</strong>
            <p>Works across data types</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="def-panel def-panel--evidence" :class="{ active: $clicks > 0, collapsed: $clicks === 0 }">
    <div class="rail-content">
      <span class="rail-number">02</span>
      <span class="rail-icon i-carbon:checkmark-outline"></span>
      <strong>HEP evidence</strong>
    </div>
    <div class="active-content active-content--evidence">
      <div class="panel-top fm-reveal">
        <div class="panel-kicker">
          <span class="panel-icon i-carbon:checkmark-outline"></span>
          <span>Adapting the CS concept to HEP</span>
        </div>
        <span class="mode-pill">open question</span>
      </div>
      <div class="hep-question fm-reveal delay-1">
        <span class="i-carbon:question-answering"></span>
        <div>
          <strong>Not just a name:</strong>
          <p>What evidence makes a pretrained physics model a HEP foundation model?</p>
        </div>
      </div>
      <div class="evidence-standard fm-reveal delay-2">
        <div class="main-gate transfer-gate">
          <em>1</em>
          <span class="i-carbon:flow"></span>
          <strong>Transfer evidence</strong>
          <p>Consistent improvements across distinct <b>tasks</b>, processes, detector shifts, or <b>domains</b>.</p>
        </div>
        <div class="main-gate analysis-gate">
          <em>2</em>
          <span class="i-carbon:deploy"></span>
          <strong>Real analysis applicability</strong>
          <p>Works inside realistic experimental workflows and constraints.</p>
        </div>
        <div class="support-gate">
          <div class="gate-label">
            <em>3</em>
            <span>supporting gates</span>
          </div>
          <div class="mini-gate">
            <span class="i-carbon:data-vis-4"></span>
            <div>
              <strong>Pretraining breadth</strong>
              <p>Broad physics phase space, not one benchmark process.</p>
            </div>
          </div>
          <div class="mini-gate">
            <span class="i-carbon:task"></span>
            <div>
              <strong>Multi-task adaptability</strong>
              <p>Heterogeneous downstream objectives.</p>
            </div>
          </div>
          <div class="mini-gate">
            <span class="i-carbon:chart-line"></span>
            <div>
              <strong>Scalability and extensibility</strong>
              <p>Backbone scales without redesigning the framework.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
.fm-title {
  margin: 0;
  max-width: 920px;
  color: rgba(255, 255, 255, 0.96);
  font-size: 36px;
  line-height: 1.04;
  font-weight: 950;
  letter-spacing: -0.01em;
}

.bridge-note {
  margin-top: 0.30rem;
  max-width: 900px;
  color: rgba(226, 232, 240, 0.70);
  font-size: 13px;
  line-height: 1.22;
  font-weight: 720;
}

.bridge-note strong {
  color: #fff;
  background-image: linear-gradient(90deg, rgba(103, 232, 249, 0.82), rgba(255, 61, 242, 0.70));
  background-repeat: no-repeat;
  background-size: 100% 2px;
  background-position: 0 100%;
}

.bridge-note::before {
  content: "";
  display: inline-block;
  width: 38px;
  height: 2px;
  margin-right: 10px;
  vertical-align: 0.28em;
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.95), rgba(255, 61, 242, 0.78));
  box-shadow: 0 0 16px rgba(0, 229, 255, 0.34);
}

.fm-stepper {
  display: grid;
  grid-template-columns: 24px max-content 46px 24px max-content 46px 24px max-content;
  align-items: center;
  gap: 7px;
  margin-top: 0.48rem;
  width: max-content;
}

.step-dot {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(226, 232, 240, 0.18);
  background: rgba(15, 23, 42, 0.62);
  color: rgba(226, 232, 240, 0.50);
  font-size: 10px;
  line-height: 1;
  font-weight: 950;
  transition: all 360ms cubic-bezier(.2, .8, .2, 1);
}

.step-dot.active {
  border-color: rgba(0, 229, 255, 0.88);
  background: rgba(0, 229, 255, 0.15);
  color: #fff;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.28);
}

.step-dot.done {
  border-color: rgba(110, 231, 183, 0.66);
  color: rgba(167, 243, 208, 0.96);
}

.step-label {
  color: rgba(226, 232, 240, 0.42);
  font-size: 8.7px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  transition: color 360ms ease;
}

.step-label.active {
  color: rgba(255, 255, 255, 0.92);
}

.step-line {
  height: 2px;
  border-radius: 999px;
  background: rgba(226, 232, 240, 0.14);
  transition: background 360ms ease, box-shadow 360ms ease;
}

.step-line.active {
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.90), rgba(255, 61, 242, 0.74));
  box-shadow: 0 0 16px rgba(0, 229, 255, 0.22);
}

.fm-definition-stage {
  display: flex;
  align-items: stretch;
  gap: 12px;
  margin-top: 12px;
  height: 366px;
  max-width: 910px;
}

.def-panel {
  position: relative;
  flex: 0 0 78px;
  min-width: 0;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.115);
  background:
    radial-gradient(circle at 18% -4%, rgba(0, 229, 255, 0.12), transparent 34%),
    radial-gradient(circle at 92% 4%, rgba(255, 61, 242, 0.09), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.072), rgba(255, 255, 255, 0.024)),
    rgba(5, 10, 22, 0.76);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.075);
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition:
    flex-basis 460ms cubic-bezier(.2, .8, .2, 1),
    flex-grow 460ms cubic-bezier(.2, .8, .2, 1),
    opacity 340ms ease,
    border-color 340ms ease,
    box-shadow 340ms ease,
    transform 340ms ease;
}

.def-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.095;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.20) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.20) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom, black, transparent 76%);
}

.def-panel::after {
  content: "";
  position: absolute;
  inset: -1px;
  opacity: 0;
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.18), transparent 34%, rgba(255, 61, 242, 0.14));
  transition: opacity 340ms ease;
  pointer-events: none;
}

.def-panel.active {
  flex: 1 1 auto;
  opacity: 1;
  transform: none;
}

.def-panel.active::after {
  opacity: 1;
}

.def-panel.collapsed {
  opacity: 0.58;
  transform: scale(0.988);
}

.def-panel.done {
  opacity: 0.66;
}

.def-panel--cs.active {
  border-color: rgba(148, 163, 184, 0.30);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 18px 34px rgba(0, 0, 0, 0.15);
}

.def-panel--evidence.active {
  border-color: rgba(110, 231, 183, 0.60);
  box-shadow: 0 0 36px rgba(16, 185, 129, 0.16);
}

.state-cs .def-panel--cs {
  background:
    radial-gradient(circle at 18% -4%, rgba(103, 232, 249, 0.055), transparent 36%),
    radial-gradient(circle at 92% 4%, rgba(196, 181, 253, 0.048), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.058), rgba(255, 255, 255, 0.020)),
    rgba(5, 10, 22, 0.76);
}

.state-cs .def-panel--cs.active::after {
  opacity: 0.22;
}

.active-content,
.rail-content {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.active-content {
  padding: 12px 14px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity 260ms ease, transform 260ms ease;
}

.def-panel.active .active-content {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  transition-delay: 130ms;
}

.rail-content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  gap: 10px;
  padding: 13px 9px;
  border-left: 3px solid rgba(255, 255, 255, 0.16);
  opacity: 1;
  transition: opacity 180ms ease;
}

.def-panel.active .rail-content {
  opacity: 0;
}

.def-panel--cs .rail-content { border-left-color: rgba(0, 229, 255, 0.58); }
.def-panel--evidence .rail-content { border-left-color: rgba(110, 231, 183, 0.58); }

.rail-number {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.045);
  font-size: 9.5px;
  line-height: 1;
  font-weight: 950;
}

.rail-icon {
  width: 24px;
  height: 24px;
  align-self: center;
  opacity: 0.82;
}

.def-panel--cs .rail-icon { color: #00e5ff; }
.def-panel--evidence .rail-icon { color: #6ee7b7; }

.rail-content strong {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: rgba(255, 255, 255, 0.80);
  font-size: 11px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.panel-kicker {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 9px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-icon {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
}

.def-panel--cs .panel-icon { color: #00e5ff; }
.def-panel--evidence .panel-icon { color: #6ee7b7; }

.cite-pill,
.mode-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.045);
  color: rgba(226, 232, 240, 0.72);
  padding: 0 8px;
  font-size: 8.4px;
  line-height: 1;
  font-weight: 850;
  text-decoration: none;
  white-space: nowrap;
}

.cite-pill span {
  width: 12px;
  height: 12px;
  color: #00e5ff;
}

.cs-anchor-grid {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 12px;
  height: calc(100% - 30px);
  margin-top: 10px;
}

.cs-point,
.hep-question,
.support-gate,
.main-gate,
.takeaway-line {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.115);
  background: rgba(255, 255, 255, 0.045);
}

.cs-quote-card {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 0;
  padding: 8px 44px 6px;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.definition-quote {
  max-width: 720px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgba(241, 245, 249, 0.88);
  font-size: 18px;
  line-height: 1.3;
  font-weight: 820;
  text-align: left;
}

.hl-cyan,
.hl-magenta,
.hl-green,
.hl-violet,
.hl-amber {
  font-weight: 950;
  background: transparent !important;
  box-shadow: none !important;
  text-shadow: none;
}

.hl-cyan {
  color: #67e8f9;
}

.hl-magenta {
  color: #ff7af5;
}

.hl-green {
  color: #6ee7b7;
}

.hl-violet {
  color: #c4b5fd;
}

.hl-amber {
  color: #fbbf24;
}

.cs-points {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
}

.cs-point {
  display: grid;
  grid-template-rows: 24px auto 1fr;
  align-items: start;
  gap: 5px;
  min-height: 84px;
  padding: 10px 11px;
  border-color: rgba(103, 232, 249, 0.16);
  background: rgba(255, 255, 255, 0.040);
}

.cs-point.primary {
  border-color: rgba(103, 232, 249, 0.26);
  background: rgba(103, 232, 249, 0.040);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

.cs-point span {
  width: 23px;
  height: 23px;
  color: rgba(0, 229, 255, 0.88);
  filter: none;
}

.cs-point strong {
  color: rgba(241, 245, 249, 0.90);
  font-size: 11.4px;
  line-height: 1.08;
  font-weight: 950;
}

.cs-point p {
  margin: 0;
  color: rgba(226, 232, 240, 0.62);
  font-size: 9px;
  line-height: 1.10;
  font-weight: 750;
}

.active-content--evidence {
  display: grid;
  grid-template-rows: 22px 54px minmax(0, 1fr);
  gap: 9px;
}

.hep-question {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-color: rgba(251, 191, 36, 0.28);
  background:
    radial-gradient(circle at 0% 0%, rgba(251, 191, 36, 0.16), transparent 42%),
    rgba(251, 191, 36, 0.060);
}

.hep-question > span {
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  color: rgba(251, 191, 36, 0.92);
  filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.20));
}

.hep-question strong {
  display: block;
  color: rgba(255, 255, 255, 0.94);
  font-size: 14.5px;
  line-height: 1;
  font-weight: 950;
}

.hep-question p {
  margin: 6px 0 0;
  color: rgba(241, 245, 249, 0.78);
  font-size: 12px;
  line-height: 1.12;
  font-weight: 760;
}

.evidence-standard {
  display: grid;
  grid-template-columns: 1.06fr 1.06fr 1.20fr;
  gap: 12px;
  min-height: 0;
}

.support-gate,
.main-gate {
  position: relative;
  min-width: 0;
  padding: 18px;
  overflow: hidden;
  isolation: isolate;
}

.support-gate {
  display: grid;
  grid-template-rows: auto 1fr 1fr 1fr;
  gap: 11px;
  border-color: rgba(148, 163, 184, 0.18);
  background:
    radial-gradient(circle at 10% 4%, rgba(110, 231, 183, 0.14), transparent 34%),
    radial-gradient(circle at 100% 0%, rgba(255, 61, 242, 0.12), transparent 42%),
    linear-gradient(150deg, rgba(11, 17, 31, 0.92), rgba(26, 19, 43, 0.90) 56%, rgba(9, 25, 34, 0.88));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.055);
}

.support-gate::before {
  display: none;
}

.main-gate {
  --gate-accent: #00e5ff;
  --gate-accent-2: #a78bfa;
  --gate-accent-rgb: 0, 229, 255;
  display: grid;
  grid-template-rows: auto 58px auto 1fr;
  align-content: start;
  border-color: rgba(var(--gate-accent-rgb), 0.34);
  background:
    radial-gradient(circle at 18% 0%, rgba(var(--gate-accent-rgb), 0.16), transparent 40%),
    linear-gradient(125deg, rgba(var(--gate-accent-rgb), 0.13), rgba(167, 139, 250, 0.070) 38%, rgba(255, 255, 255, 0.035) 54%, rgba(var(--gate-accent-rgb), 0.10) 76%, transparent),
    linear-gradient(180deg, rgba(255, 255, 255, 0.070), rgba(255, 255, 255, 0.024)),
    rgba(4, 12, 25, 0.60);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.075),
    0 18px 34px rgba(0, 0, 0, 0.18);
}

.main-gate::before {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  top: 0;
  height: 3px;
  border-radius: 0 0 999px 999px;
  background: linear-gradient(90deg, var(--gate-accent), var(--gate-accent-2), transparent 92%);
  opacity: 0.86;
}

.main-gate::after {
  content: "";
  position: absolute;
  inset: -42%;
  border: 0;
  border-radius: inherit;
  background:
    radial-gradient(circle at 72% 78%, rgba(var(--gate-accent-rgb), 0.12), transparent 28%),
    linear-gradient(118deg, transparent 24%, rgba(var(--gate-accent-rgb), 0.16) 42%, rgba(255, 255, 255, 0.055) 50%, rgba(var(--gate-accent-rgb), 0.10) 62%, transparent 78%);
  opacity: 0.46;
  transform: translate3d(-10%, 0, 0) rotate(7deg);
  animation: gateGradientFlow 7.8s ease-in-out infinite;
  z-index: 0;
}

.main-gate > * {
  position: relative;
  z-index: 1;
}

.analysis-gate {
  --gate-accent: #6ee7b7;
  --gate-accent-2: #fbbf24;
  --gate-accent-rgb: 110, 231, 183;
}

.analysis-gate::after {
  animation-delay: -2.4s;
  opacity: 0.42;
}

.gate-label {
  display: flex;
  align-items: center;
  gap: 7px;
}

.gate-label em,
.main-gate em {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(4, 13, 23, 0.78);
  color: rgba(255, 255, 255, 0.88);
  font-size: 10px;
  line-height: 1;
  font-style: normal;
  font-weight: 950;
}

.main-gate em {
  border-color: rgba(var(--gate-accent-rgb), 0.30);
  background: rgba(var(--gate-accent-rgb), 0.10);
  color: var(--gate-accent);
}

.gate-label span {
  color: rgba(167, 243, 208, 0.72);
  font-size: 8.4px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mini-gate {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 0;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background:
    linear-gradient(105deg, rgba(110, 231, 183, 0.070), rgba(255, 255, 255, 0.036) 42%, rgba(196, 181, 253, 0.040)),
    rgba(255, 255, 255, 0.030);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

.mini-gate > span {
  width: 28px;
  height: 28px;
  color: rgba(110, 231, 183, 0.78);
  filter: none;
}

.mini-gate strong {
  display: block;
  color: rgba(255, 255, 255, 0.90);
  font-size: 11.3px;
  line-height: 1.04;
  font-weight: 950;
}

.mini-gate p {
  margin: 4px 0 0;
  color: rgba(226, 232, 240, 0.60);
  font-size: 8.7px;
  line-height: 1.08;
  font-weight: 760;
}

.main-gate > span {
  width: 52px;
  height: 52px;
  margin-top: 19px;
  color: var(--gate-accent);
  filter: drop-shadow(0 0 12px rgba(var(--gate-accent-rgb), 0.26));
}

.main-gate strong {
  margin-top: 19px;
  background: linear-gradient(90deg, var(--gate-accent), var(--gate-accent-2) 52%, rgba(255, 255, 255, 0.94));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.04;
  font-weight: 950;
}

.main-gate strong {
  font-size: 23px;
}

.main-gate p {
  margin: 13px 0 0;
  color: rgba(226, 232, 240, 0.67);
  font-size: 13.2px;
  line-height: 1.17;
  font-weight: 780;
}

.main-gate p {
  color: rgba(241, 245, 249, 0.78);
}

.main-gate small {
  display: block;
  margin-top: 6px;
  color: rgba(226, 232, 240, 0.48);
  font-size: 7.3px;
  line-height: 1.08;
  font-weight: 760;
}

.main-gate b {
  color: #fff;
}

.final-evidence .main-gate {
  transform: translateY(-2px);
}

.final-evidence .transfer-gate,
.final-evidence .analysis-gate {
  animation: evidencePulse 3.2s ease-in-out infinite;
}

.final-evidence .analysis-gate {
  animation-delay: 420ms;
}

.takeaway-line {
  display: block;
  margin-top: 0;
  padding: 8px 11px;
  border-color: rgba(0, 229, 255, 0.24);
  background: rgba(0, 229, 255, 0.058);
  color: rgba(241, 245, 249, 0.84);
  font-size: 10.3px;
  line-height: 1.15;
  font-weight: 840;
}

.takeaway-line strong {
  color: #fff;
  font-weight: 950;
}

.fm-reveal {
  opacity: 0;
  transform: translateY(8px);
}

.def-panel.active .fm-reveal {
  animation: fmReveal 430ms cubic-bezier(.2, .8, .2, 1) both;
}

.def-panel.active .delay-1 { animation-delay: 120ms; }
.def-panel.active .delay-2 { animation-delay: 220ms; }
.def-panel.active .delay-3 { animation-delay: 320ms; }

@keyframes fmReveal {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes evidencePulse {
  0%, 100% {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.075),
      0 0 0 1px rgba(var(--gate-accent-rgb), 0.10),
      0 18px 34px rgba(0, 0, 0, 0.18),
      0 0 22px rgba(var(--gate-accent-rgb), 0.12);
  }
  50% {
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.080),
      0 0 0 1px rgba(var(--gate-accent-rgb), 0.22),
      0 18px 34px rgba(0, 0, 0, 0.18),
      0 0 34px rgba(var(--gate-accent-rgb), 0.22);
  }
}

@keyframes gateGradientFlow {
  0%, 100% {
    transform: translate3d(-12%, -2%, 0) rotate(7deg);
  }
  50% {
    transform: translate3d(12%, 3%, 0) rotate(7deg);
  }
}
</style>
