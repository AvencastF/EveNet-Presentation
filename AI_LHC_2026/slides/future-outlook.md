---
clicks: 3
transition: fade
glow: center
glowOpacity: 0.32
---

# Outlook: <span class="gradient-animated">Foundation Models at HL-LHC</span>

<div class="future-subtitle">Modular stack: agents automate infrastructure; FMs swap backbones and heads; GPU services make it practical.</div>

<div class="future-stage">
  <div class="future-spine">
    <div class="spine-node spine-node--human">
      <span class="i-carbon:user-profile"></span>
      <strong>Analyzer</strong>
    </div>
    <div class="spine-line"></div>
    <div class="spine-node spine-node--physics">
      <span class="i-carbon:chart-multitype"></span>
      <strong>Physics reach</strong>
    </div>
  </div>

  <div class="future-lanes">
    <section class="future-lane future-lane--agent">
      <div class="lane-label">
        <span class="i-carbon:bot"></span>
        <div>
          <small>Efficiency layer</small>
          <strong>Agents + LLM</strong>
          <div class="lane-outcome">automate scaffolding</div>
        </div>
      </div>
      <div class="agent-chain">
        <div class="agent-task">
          <span class="i-carbon:filter"></span>
          <b>Event selection</b>
        </div>
        <div class="agent-task">
          <span class="i-carbon:map"></span>
          <b>Regions</b>
        </div>
        <div class="agent-task">
          <span class="i-carbon:settings-adjust"></span>
          <b>Systematics</b>
        </div>
        <div class="agent-task">
          <span class="i-carbon:chart-error-bar"></span>
          <b>Stats model</b>
        </div>
        <div class="agent-task">
          <span class="i-carbon:code"></span>
          <b>Workflow</b>
        </div>
      </div>
    </section>
    <section v-click="1" class="future-lane future-lane--fm">
      <div class="lane-label">
        <span class="i-carbon:network-4"></span>
        <div>
          <small>Performance layer</small>
          <strong>Foundation model</strong>
          <div class="lane-outcome">plug-and-play physics priors</div>
        </div>
      </div>
      <div class="fm-composer">
        <div class="backbone-group">
          <div class="group-title">choose pretrained backbone</div>
          <div class="backbone-row">
            <div class="backbone-chip">event</div>
            <div class="backbone-chip">detector</div>
            <div class="backbone-chip">jet / particle</div>
          </div>
        </div>
        <div class="composer-arrow">
          <span class="i-carbon:arrow-right"></span>
        </div>
        <div class="head-group">
          <div class="group-title">attach downstream heads</div>
          <div class="head-row">
            <div class="head-chip head-chip--cls">cls</div>
            <div class="head-chip head-chip--reg">reg</div>
            <div class="head-chip head-chip--seg">seg</div>
            <div class="head-chip head-chip--gen">gen</div>
          </div>
        </div>
      </div>
    </section>
    <section v-click="2" class="future-lane future-lane--infra">
      <div class="lane-label">
        <span class="i-carbon:data-center"></span>
        <div>
          <small>Serving layer</small>
          <strong>GPU inference services</strong>
          <div class="lane-outcome">shared scalable inference</div>
        </div>
      </div>
      <div class="infra-grid">
        <div class="server-rack" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="infra-card">
          <span class="i-carbon:chip"></span>
          <b>GPU farm</b>
        </div>
        <div class="infra-card">
          <span class="i-simple-icons:nvidia"></span>
          <b>Triton-style serving</b>
        </div>
        <div class="infra-card">
          <span class="i-carbon:flow-logs-vpc"></span>
          <b>dynamic batching</b>
        </div>
        <div class="infra-card">
          <span class="i-carbon:cloud-service-management"></span>
          <b>analysis as a service</b>
        </div>
      </div>
    </section>
    <section v-click="3" class="future-lane future-lane--human">
      <div class="lane-label">
        <span class="i-carbon:idea"></span>
        <div>
          <small>Human layer</small>
          <strong>Students stay central</strong>
          <div class="lane-outcome">more discovery</div>
        </div>
      </div>
      <div class="human-shift">
        <div class="before-box">
          <small>before</small>
          <b>debugging infrastructure</b>
          <span>bash env · broken paths · workflow glue</span>
        </div>
        <div class="shift-arrow">
          <span class="i-carbon:arrow-right"></span>
        </div>
        <div class="after-box">
          <small>after</small>
          <b>exploring physics</b>
          <span>more physics · less infrastructure</span>
        </div>
      </div>
    </section>
  </div>

  <div class="future-claim">
    <span class="i-carbon:rocket"></span>
    <strong>Expected end state:</strong>
    analyzers choose backbones like LLMs, plug in task heads, and iterate through shared GPU services.
  </div>
</div>

<style>
.future-stage {
  margin-top: 0.54rem;
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.5rem 0.74rem;
  height: 380px;
}

.future-subtitle {
  margin-top: 0.32rem;
  color: rgba(226, 232, 240, 0.64);
  font-size: 16px;
  line-height: 1.25;
}

.future-spine {
  grid-row: 1 / 2;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
  padding: 0.26rem 0 0.12rem;
}

.spine-node {
  width: 94px;
  min-height: 74px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  gap: 0.22rem;
  padding: 0.44rem 0.36rem;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.17);
  background: rgba(15, 23, 42, 0.34);
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.08);
}

.spine-node span {
  font-size: 27px;
}

.spine-node strong {
  font-size: 11.5px;
  line-height: 1.15;
  color: rgba(255, 255, 255, 0.9);
}

.spine-node--human span {
  color: #f0abfc;
}

.spine-node--physics span {
  color: #67e8f9;
}

.spine-line {
  width: 2px;
  height: 100%;
  min-height: 156px;
  background:
    linear-gradient(180deg, rgba(240, 171, 252, 0.82), rgba(0, 229, 255, 0.84)),
    repeating-linear-gradient(180deg, transparent 0, transparent 9px, rgba(255, 255, 255, 0.22) 9px, rgba(255, 255, 255, 0.22) 13px);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.28);
  opacity: 0.9;
}

.future-lanes {
  grid-column: 2;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: 0.38rem;
}

.future-lane {
  position: relative;
  display: grid;
  grid-template-columns: 178px minmax(0, 1fr);
  align-items: center;
  gap: 0.62rem;
  min-height: 0;
  padding: 0.46rem 0.56rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.046), rgba(255, 255, 255, 0.018)),
    rgba(15, 23, 42, 0.24);
  overflow: hidden;
}

.future-lane::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.28;
  pointer-events: none;
}

.future-lane--agent {
  border-color: rgba(216, 180, 254, 0.28);
}

.future-lane--agent::before {
  background: linear-gradient(90deg, rgba(168, 85, 247, 0.22), transparent 58%);
}

.future-lane--fm {
  border-color: rgba(45, 212, 191, 0.32);
}

.future-lane--fm::before {
  background: linear-gradient(90deg, rgba(20, 184, 166, 0.18), transparent 62%);
}

.future-lane--infra {
  border-color: rgba(251, 191, 36, 0.34);
}

.future-lane--infra::before {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.18), transparent 62%);
}

.future-lane--human {
  border-color: rgba(244, 114, 182, 0.30);
}

.future-lane--human::before {
  background: linear-gradient(90deg, rgba(236, 72, 153, 0.18), transparent 62%);
}

.lane-label,
.agent-chain,
.fm-composer,
.infra-grid,
.human-shift,
.lane-outcome {
  position: relative;
  z-index: 1;
}

.lane-label {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  align-items: center;
  gap: 0.46rem;
  min-width: 0;
}

.lane-label > span {
  font-size: 25px;
  color: rgba(255, 255, 255, 0.88);
}

.lane-label small,
.group-title,
.before-box small,
.after-box small {
  display: block;
  margin-bottom: 0.09rem;
  color: rgba(226, 232, 240, 0.52);
  font-size: 8.2px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.lane-label strong {
  display: block;
  color: rgba(255, 255, 255, 0.93);
  font-size: 13.8px;
  line-height: 1.07;
}

.agent-chain,
.backbone-row,
.head-row,
.infra-grid,
.human-shift {
  align-items: center;
  min-width: 0;
}

.agent-chain {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.34rem;
}

.agent-task {
  min-width: 0;
  height: 43px;
  display: grid;
  place-items: center;
  gap: 0.14rem;
  padding: 0.26rem 0.18rem;
  border-radius: 7px;
  border: 1px solid rgba(216, 180, 254, 0.24);
  background: rgba(88, 28, 135, 0.19);
}

.agent-task span {
  color: #d8b4fe;
  font-size: 15px;
}

.agent-task b,
.infra-card b {
  color: rgba(255, 255, 255, 0.84);
  font-size: 9.4px;
  line-height: 1.05;
  text-align: center;
}

.fm-composer {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) 28px minmax(0, 1fr);
  gap: 0.48rem;
  align-items: end;
}

.backbone-group,
.head-group {
  min-width: 0;
}

.backbone-group {
  min-width: 0;
}

.head-group {
  min-width: 0;
}

.backbone-row,
.head-row {
  display: grid;
  gap: 0.34rem;
}

.backbone-row {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.head-row {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.backbone-chip,
.head-chip {
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  border: 1px solid rgba(45, 212, 191, 0.28);
  color: rgba(236, 254, 255, 0.92);
  font-size: 10.8px;
  font-weight: 800;
  text-align: center;
  line-height: 1.05;
}

.backbone-chip {
  background: rgba(13, 148, 136, 0.18);
}

.head-chip {
  width: auto;
}

.head-chip--cls {
  background: rgba(79, 70, 229, 0.36);
  border-color: rgba(129, 140, 248, 0.42);
}

.head-chip--reg {
  background: rgba(217, 119, 6, 0.32);
  border-color: rgba(251, 191, 36, 0.44);
}

.head-chip--seg {
  background: rgba(22, 101, 52, 0.34);
  border-color: rgba(134, 239, 172, 0.38);
}

.head-chip--gen {
  background: rgba(2, 132, 199, 0.34);
  border-color: rgba(125, 211, 252, 0.42);
}

.composer-arrow,
.shift-arrow {
  display: grid;
  place-items: center;
  color: #22d3ee;
  font-size: 24px;
  animation: outlookArrow 1.8s ease-in-out infinite;
}

.infra-grid {
  display: grid;
  grid-template-columns: 58px repeat(4, minmax(0, 1fr));
  gap: 0.34rem;
}

.server-rack {
  width: 58px;
  height: 44px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.22rem;
  padding: 0.3rem;
  border-radius: 7px;
  border: 1px solid rgba(251, 191, 36, 0.30);
  background: rgba(2, 6, 23, 0.24);
}

.server-rack span {
  border-radius: 4px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02)),
    rgba(15, 23, 42, 0.74);
  box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.24);
  position: relative;
}

.server-rack span::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 7px;
  width: 4px;
  height: 4px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #a3e635;
  box-shadow: 0 0 8px rgba(163, 230, 53, 0.7);
}

.infra-card {
  height: 44px;
  min-width: 0;
  display: grid;
  place-items: center;
  gap: 0.18rem;
  padding: 0.32rem;
  border-radius: 7px;
  border: 1px solid rgba(251, 191, 36, 0.24);
  background: rgba(120, 53, 15, 0.17);
}

.infra-card span {
  color: #facc15;
  font-size: 16px;
}

.human-shift {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 26px minmax(0, 1fr);
  gap: 0.42rem;
}

.before-box,
.after-box {
  min-width: 0;
  height: 48px;
  padding: 0.32rem 0.46rem;
  border-radius: 7px;
  border: 1px solid rgba(148, 163, 184, 0.16);
}

.before-box {
  background: rgba(15, 23, 42, 0.30);
}

.after-box {
  background: rgba(126, 34, 206, 0.22);
  border-color: rgba(244, 114, 182, 0.30);
  box-shadow: 0 0 20px rgba(244, 114, 182, 0.12);
}

.before-box b,
.after-box b {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 11.4px;
  line-height: 1.02;
}

.before-box span,
.after-box span {
  display: block;
  margin-top: 0.14rem;
  color: rgba(226, 232, 240, 0.62);
  font-size: 9.2px;
  line-height: 1.05;
}

.lane-outcome {
  display: inline-block;
  margin-top: 0.28rem;
  max-width: 148px;
  padding: 0.22rem 0.34rem;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.045);
  color: rgba(255, 255, 255, 0.86);
  font-size: 9px;
  font-weight: 800;
  line-height: 1.12;
  text-align: left;
}

.future-claim {
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  gap: 0.46rem;
  min-height: 42px;
  padding: 0.42rem 0.62rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 229, 255, 0.22);
  background:
    linear-gradient(90deg, rgba(0, 229, 255, 0.12), rgba(255, 61, 242, 0.08)),
    rgba(15, 23, 42, 0.30);
  color: rgba(226, 232, 240, 0.78);
  font-size: 12.6px;
  line-height: 1.18;
}

.future-claim span {
  color: #67e8f9;
  font-size: 20px;
}

.future-claim strong {
  color: rgba(255, 255, 255, 0.92);
}

@keyframes outlookArrow {
  0% {
    transform: translateX(0);
    opacity: 0.64;
  }
  50% {
    transform: translateX(5px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0.64;
  }
}
</style>
