---
clicks: 4
transition: fade
---

<script setup>
import ZoomablePlot from '../components/ZoomablePlot.vue'
import LaTeX from '../components/LaTeX.vue'
</script>

# <span class="gradient-animated">EveNet-Align</span> in neutrino reconstruction

<span class="align-subtitle">Dileptonic <LaTeX formula="t\bar t" /> reconstruction: improve event-level candidates without shifting the neutrino population.</span>
<section class="align-result-slide">
  <div class="ambient ambient--cyan">
  </div>
  <div class="ambient ambient--violet">
  </div>
  <aside class="method-panel">
    <div class="panel-header">
      <span i-carbon:ibm-watson-machine-learning class="panel-icon panel-icon--cyan"></span>
      <div>
        <span class="panel-kicker gradient-animated">EveNet-Align</span><h2>Preference + population alignment</h2>
      </div>
    </div>
    <div class="method-canvas">
      <div v-if="$clicks === 0" class="method-state state-sample">
        <div class="state-label">
          <span>0</span><strong>Generate candidate pairs</strong><em>EveNet-Full samples several <LaTeX formula="\nu\bar\nu" /> candidates for each event.</em>
        </div>
        <div class="sample-event">
          <span class="event-badge">visible event</span><span class="event-arrow">→</span><span class="sample-caption">candidate <LaTeX formula="\nu\bar\nu" /> batch</span>
        </div>
        <div class="sample-cloud">
          <i class="truth-dot"></i><i class="sample-dot dot-1"></i><i class="sample-dot dot-2"></i><i class="sample-dot dot-3"></i><i class="sample-dot dot-4"></i><i class="sample-dot dot-5"></i><i class="sample-dot dot-6"></i><span class="truth-label"><LaTeX formula="\nu_{\rm truth}" /></span>
        </div>
        <p class="state-foot">First select candidates that reconstruct the event more faithfully.</p>
      </div>
      <div v-else-if="$clicks === 1" class="method-state state-dgpo">
        <div class="state-label state-label--amber">
          <span>1</span><strong>DGPO: prefer the good group</strong><em>Truth four-momentum distance supplies a relative reward.</em>
        </div>
        <div class="dgpo-groups">
          <div class="candidate-group group-bad">
            <div class="group-head">
              <strong>Group A</strong><span>far from <LaTeX formula="\nu_{\rm truth}" /></span>
            </div>
            <div class="group-track">
              <i class="truth-anchor"></i><i class="group-dot bad-dot-1"></i><i class="group-dot bad-dot-2"></i><i class="group-dot bad-dot-3"></i><i class="group-dot bad-dot-4"></i>
            </div>
            <div class="reward-chip reward-chip--bad">
              <LaTeX formula="r\!\downarrow" />
            </div>
          </div>
          <div class="candidate-group group-good">
            <div class="group-head">
              <strong>Group B</strong><span>close to <LaTeX formula="\nu_{\rm truth}" /></span>
            </div>
            <div class="group-track">
              <i class="truth-anchor"></i><i class="group-dot good-dot-1"></i><i class="group-dot good-dot-2"></i><i class="group-dot good-dot-3"></i><i class="group-dot good-dot-4"></i>
            </div>
            <div class="reward-chip reward-chip--good">
              <LaTeX formula="r\!\uparrow" />
            </div>
          </div>
        </div>
        <div class="reward-formula">
          <LaTeX formula="r\;\propto\;-\left\lVert p^{\nu}_{\rm cand}-p^{\nu}_{\rm truth}\right\rVert" />
        </div>
        <div class="policy-arrow">
          <span>prefer Group B</span><i>→</i><strong>DGPO proposal <LaTeX formula="\delta_0" /></strong>
        </div>
      </div>
      <div v-else-if="$clicks === 2" class="method-state state-cpo">
        <div class="state-label state-label--violet">
          <span>2</span><strong>CPO: protect the latent population</strong><em>Embed truth and generated batches with the same frozen AD, then compare the two latent clouds.</em>
        </div>
        <div class="ad-flow-label">
shared frozen anomaly detector (AD)
        </div>
        <div class="ad-layout">
          <div class="batch-card batch-card--truth">
            <strong>truth batch <LaTeX formula="\{\nu_{\rm truth}\}" /></strong><br/>
            <div class="mini-cloud">
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
          <div class="flow-arrow">
→
          </div>
          <div class="ad-network">
            <span>AD</span><i></i><i></i><i></i><small>frozen</small>
          </div>
          <div class="flow-arrow">
→
          </div>
          <div class="latent-card latent-card--truth">
            <strong>truth latent</strong><span><LaTeX formula="z_{\rm truth}" /></span><i class="latent latent-1"></i><i class="latent latent-2"></i><i class="latent latent-3"></i><i class="latent latent-4"></i>
          </div>
          <div class="batch-card batch-card--pred">
            <strong>generated batch <LaTeX formula="\{\hat\nu\}" /></strong><br/>
            <div class="mini-cloud">
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
          <div class="flow-arrow">
→
          </div>
          <div class="ad-network ad-network--second">
            <span>AD</span><i></i><i></i><i></i><small>frozen</small>
          </div>
          <div class="flow-arrow">
→
          </div>
          <div class="latent-card latent-card--pred">
            <strong>generated latent</strong><span><LaTeX formula="z_{\rm pred}" /></span><i class="latent latent-1"></i><i class="latent latent-2"></i><i class="latent latent-3"></i><i class="latent latent-4"></i>
          </div>
        </div>
        <div class="swd-strip">
          <span>compare latent clouds</span><strong><LaTeX formula="\operatorname{SWD}(z_{\rm pred},z_{\rm truth})" /></strong><span>average projected distance</span>
        </div>
        <div class="cpo-repair-strip">
          <span>large SWD</span><i>→</i><strong>clip the drifting gradient</strong><i>→</i><span>keep the aligned update</span>
        </div>
      </div>
      <div v-else class="method-state state-align">
        <div class="state-label state-label--green">
          <span>3</span><strong class="gradient-animated">EveNet-Align</strong><em>Event-level preference improvement, retained inside a population-level constraint.</em>
        </div>
        <div class="align-lockup">
          <div class="align-node align-node--dgpo">
            <span>DGPO</span><strong>prefer accurate<br />candidates</strong>
          </div>
          <i>+</i>
          <div class="align-node align-node--cpo">
            <span>CPO / AD</span><strong>repair drifting<br />gradients</strong>
          </div>
          <i>→</i>
          <div class="align-output">
            <span i-carbon:checkmark-filled></span><strong class="gradient-animated">EveNet-Align</strong>
          </div>
        </div>
        <p class="state-foot state-foot--green">Sharper reconstruction, while the generated <LaTeX formula="\nu" /> population remains aligned with truth.</p>
        <div class="coming-soon-banner">
          <strong>Coming soon!</strong>
          <span>Work in progress · release planned soon</span>
        </div>
      </div>
    </div>
    <div class="stage-guide" aria-hidden="true">
      <span :class="{ active: $clicks >= 0 }">sample</span><i></i><span :class="{ active: $clicks >= 1 }">DGPO reward</span><i></i><span :class="{ active: $clicks >= 2 }">CPO + SWD</span><i></i><span class="gradient-animated" :class="{ active: $clicks >= 3 }">EveNet-Align</span>
    </div>
  </aside>
  <section v-if="$clicks === 4" class="result-panel">
    <div class="panel-header result-header">
      <span i-carbon:chart-line-data class="panel-icon panel-icon--amber"></span>
      <div>
        <span class="panel-kicker panel-kicker--amber">Held-out reconstruction</span><h2>Top-mass response</h2>
      </div>
      <span class="sample-note">55,472 events</span>
    </div>
    <div class="top-mass-plot">
      <ZoomablePlot src="/RL/top_mass.svg" alt="Top-mass response for EveNet-Align and EveNet-Full" />
    </div>
    <div class="metric-card">
      <div class="metric-title">
        <span i-carbon:table-split class="metric-title-icon"></span>
        <div>
          <strong>Top-quark mass metrics</strong>
        </div>
      </div>
      <table class="metric-table">
        <thead>
          <tr>
            <th>
Model
            </th>
            <th>
W1↓
            </th>
            <th>
Pearson↑
            </th>
            <th>
MAE↓
            </th>
            <th>
RMSE↓
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="preferred-row">
            <td>
              <span class="gradient-animated model-name" style="font-variant: small-caps;">EveNet-Align</span>
            </td>
            <td>
3.72
            </td>
            <td>
0.490
            </td>
            <td>
14.44
            </td>
            <td>
23.64
            </td>
          </tr>
          <tr>
            <td>
              <span class="gradient-animated model-name" style="font-variant: small-caps;">EveNet-Full</span>
            </td>
            <td>
5.45
            </td>
            <td>
0.097
            </td>
            <td>
19.47
            </td>
            <td>
31.12
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</section>

<style scoped>
h1  {
  margin: 0;
  font-size: 1.86rem;
  line-height: 1.04;
  letter-spacing: -0.024em;
}
.align-subtitle  {
  display: block;
  max-width: 970px;
  margin-top: 0.42rem;
  color: rgba(255,255,255,0.69);
  font-size: 0.82rem;
  line-height: 1.28;
}
.align-result-slide  {
  position: relative;
  height: calc(100% - 2.5rem);
  margin-top: 0.85rem;
  display: grid;
  grid-template-columns: minmax(0, 3.5fr) minmax(260px, 1fr);
  gap: 1.05rem;
  overflow: hidden;
}
.ambient  {
  position: absolute;
  z-index: -1;
  width: 330px;
  height: 200px;
  border-radius: 999px;
  filter: blur(68px);
  opacity: 0.14;
  pointer-events: none;
}
.ambient--cyan  {
  top: -115px;
  left: -60px;
  background: #00e5ff;
}
.ambient--violet  {
  right: 10%;
  bottom: -155px;
  background: #7c5cff;
}
.method-panel, .result-panel  {
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.method-panel  {
  padding: 0.35rem 1.1rem 0.25rem 0.88rem;
  border-right: 1px solid rgba(103,232,249,0.15);
}
.panel-header  {
  display: flex;
  align-items: center;
  gap: 0.48rem;
  min-height: 2.36rem;
  margin: 0.1rem 0 0.64rem;
}
.panel-icon  {
  width: 1.02rem;
  height: 1.02rem;
  flex: 0 0 auto;
}
.panel-icon--cyan  {
  color: rgba(103,232,249,0.96);
}
.panel-icon--amber  {
  color: rgba(253,224,71,0.96);
}
.panel-kicker  {
  display: block;
  color: rgba(165,243,252,0.9);
  font-size: 0.52rem;
  font-weight: 820;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.panel-kicker--amber  {
  color: rgba(253,224,71,0.94);
}
.panel-header h2  {
  margin: 0.12rem 0 0;
  color: rgba(255,255,255,0.94);
  font-size: 0.88rem;
  line-height: 1.05;
  letter-spacing: -0.012em;
}
.method-canvas  {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border-top: 2px solid rgba(103,232,249,0.62);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  background: linear-gradient(145deg, rgba(8,40,55,0.72), rgba(12,16,34,0.32));
}
.method-state  {
  position: absolute;
  inset: 0;
  padding: 1.02rem 1.18rem;
  animation: stateIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
}
.state-label  {
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  column-gap: 0.42rem;
  align-items: center;
  color: rgba(165,243,252,0.96);
}
.state-label > span  {
  grid-row: span 2;
  width: 1.1rem;
  height: 1.1rem;
  display: grid;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-size: 0.64rem;
  font-weight: 820;
}
.state-label strong  {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.94);
}
.state-label em  {
  color: rgba(255,255,255,0.58);
  font-size: 0.68rem;
  font-style: normal;
  line-height: 1.18;
}
.state-label--amber  {
  color: rgba(253,224,71,0.96);
}
.state-label--violet  {
  color: rgba(221,214,254,0.96);
}
.state-label--green  {
  color: rgba(94,234,212,0.96);
}
.stage-guide  {
  display: flex;
  align-items: center;
  gap: 0.34rem;
  margin: 0.64rem 0 0.1rem;
  color: rgba(255,255,255,0.38);
  font-size: 0.64rem;
  font-weight: 680;
  text-transform: uppercase;
  letter-spacing: 0.055em;
}
.stage-guide span  {
  transition: color 0.32s ease;
  white-space: nowrap;
}
.stage-guide span.active  {
  color: rgba(165,243,252,0.96);
}
.stage-guide i  {
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.15);
}
.sample-event  {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.05rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.68rem;
}
.event-badge  {
  padding: 0.38rem 0.52rem;
  border: 1px solid rgba(103,232,249,0.5);
  color: rgba(165,243,252,0.95);
}
.event-arrow  {
  font-size: 1.05rem;
  color: rgba(103,232,249,0.72);
}
.sample-caption  {
  color: rgba(221,214,254,0.92);
}
.sample-cloud  {
  position: relative;
  width: 62%;
  height: 7.6rem;
  margin: 0.68rem auto 0;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(124,92,255,0.2), transparent 66%);
}
.truth-dot, .sample-dot  {
  position: absolute;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  background: rgba(196,181,253,0.94);
  box-shadow: 0 0 15px rgba(124,92,255,0.45);
  animation: float 3.2s ease-in-out infinite;
}
.truth-dot  {
  top: 44%;
  left: 47%;
  width: 0.84rem;
  height: 0.84rem;
  background: rgba(251,191,36,1);
  box-shadow: 0 0 0 5px rgba(251,191,36,0.12), 0 0 20px rgba(251,191,36,0.48);
  animation: none;
}
.dot-1  {
  left: 18%;
  top: 21%;
}
.dot-2  {
  right: 19%;
  top: 25%;
  animation-delay: .4s;
}
.dot-3  {
  left: 25%;
  bottom: 16%;
  animation-delay: .9s;
}
.dot-4  {
  right: 21%;
  bottom: 14%;
  animation-delay: 1.4s;
}
.dot-5  {
  left: 44%;
  top: 6%;
  animation-delay: 1.8s;
}
.dot-6  {
  left: 7%;
  top: 50%;
  animation-delay: 2.2s;
}
.truth-label  {
  position: absolute;
  top: 66%;
  left: 43%;
  color: rgba(253,224,71,0.95);
  font-size: 0.66rem;
  white-space: nowrap;
}
.state-foot  {
  margin: 0.85rem 0 0;
  color: rgba(255,255,255,0.59);
  font-size: 0.68rem;
  text-align: center;
}
.dgpo-groups  {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.76rem;
  margin-top: 0.95rem;
}
.candidate-group  {
  padding: 0.62rem;
  border-top: 2px solid;
  background: rgba(255,255,255,0.035);
}
.group-bad  {
  border-color: rgba(251,113,133,0.7);
}
.group-good  {
  border-color: rgba(94,234,212,0.88);
  background: rgba(45,212,191,0.08);
}
.group-head  {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}
.group-head strong  {
  color: rgba(255,255,255,0.93);
  font-size: 0.82rem;
}
.group-head span  {
  color: rgba(255,255,255,0.62);
  font-size: 0.75rem;
}
.group-track  {
  position: relative;
  height: 4.55rem;
  margin-top: 0.28rem;
  border-bottom: 1px dashed rgba(255,255,255,0.16);
}
.truth-anchor  {
  position: absolute;
  left: 50%;
  top: 45%;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: rgba(251,191,36,1);
  box-shadow: 0 0 0 3px rgba(251,191,36,0.13);
}
.group-dot  {
  position: absolute;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  animation: dotPop .65s cubic-bezier(0.22,1,0.36,1) both;
}
.group-bad .group-dot  {
  background: rgba(251,113,133,0.9);
  box-shadow: 0 0 13px rgba(251,113,133,0.38);
}
.group-good .group-dot  {
  background: rgba(94,234,212,0.98);
  box-shadow: 0 0 13px rgba(45,212,191,0.48);
}
.bad-dot-1  {
  top: 8%;
  left: 7%;
}
.bad-dot-2  {
  right: 4%;
  top: 18%;
  animation-delay: .1s;
}
.bad-dot-3  {
  bottom: 4%;
  left: 15%;
  animation-delay: .2s;
}
.bad-dot-4  {
  bottom: 11%;
  right: 10%;
  animation-delay: .3s;
}
.good-dot-1  {
  top: 34%;
  left: 38%;
}
.good-dot-2  {
  top: 50%;
  left: 58%;
  animation-delay: .1s;
}
.good-dot-3  {
  top: 26%;
  left: 62%;
  animation-delay: .2s;
}
.good-dot-4  {
  bottom: 20%;
  left: 43%;
  animation-delay: .3s;
}
.reward-chip  {
  display: inline-block;
  margin-top: 0.42rem;
  padding: 0.18rem 0.36rem;
  border-radius: 0.26rem;
  font-size: 0.76rem;
  font-weight: 820;
}
.reward-chip--bad  {
  color: rgba(254,202,202,0.94);
  background: rgba(251,113,133,0.14);
}
.reward-chip--good  {
  color: rgba(167,243,208,0.98);
  background: rgba(45,212,191,0.15);
  animation: goodPulse 1.45s ease-in-out infinite;
}
.reward-formula  {
  margin-top: 0.7rem;
  color: rgba(253,224,71,0.92);
  font-size: 0.88rem;
  text-align: center;
}
.policy-arrow  {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.55rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.78rem;
}
.policy-arrow i  {
  color: rgba(253,224,71,0.94);
  font-size: 1.22rem;
  font-style: normal;
  animation: arrowMove 1.1s ease-in-out infinite;
}
.policy-arrow strong  {
  color: rgba(253,224,71,0.96);
}
.ad-flow-label  {
  margin-top: 0.58rem;
  color: rgba(221,214,254,0.9);
  font-size: 0.68rem;
  font-weight: 720;
  letter-spacing: 0.04em;
  text-align: center;
}
.ad-layout  {
  display: grid;
  grid-template-columns: 1.08fr .22fr .68fr .22fr 1.08fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.34rem 0.12rem;
  align-items: center;
  margin-top: 0.4rem;
}
.batch-card, .latent-card  {
  min-height: 3.15rem;
  padding: 0.36rem 0.42rem;
  background: rgba(255,255,255,0.04);
}
.batch-card strong, .latent-card strong  {
  display: block;
  color: rgba(255,255,255,0.91);
  font-size: 0.68rem;
}
.batch-card > span, .latent-card > span  {
  display: block;
  margin-top: 0.07rem;
  color: rgba(255,255,255,0.72);
  font-size: 0.68rem;
}
.batch-card--truth  {
  grid-column: 1;
  grid-row: 1;
  border-left: 2px solid rgba(251,191,36,0.9);
}
.batch-card--pred  {
  grid-column: 1;
  grid-row: 2;
  border-left: 2px solid rgba(103,232,249,0.9);
}
.mini-cloud  {
  display: flex;
  flex-wrap: wrap;
  gap: 0.18rem;
  margin-top: 0.22rem;
}
.mini-cloud i  {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: rgba(253,224,71,0.9);
  animation: float 2.6s ease-in-out infinite;
}
.batch-card--pred .mini-cloud i  {
  background: rgba(103,232,249,0.92);
}
.mini-cloud i:nth-child(2n)  {
  animation-delay: .4s;
}
.mini-cloud i:nth-child(3n)  {
  animation-delay: .8s;
}
.flow-arrow  {
  color: rgba(221,214,254,0.78);
  font-size: 0.92rem;
  text-align: center;
}
.flow-arrow:nth-of-type(2)  {
  grid-column: 2;
  grid-row: 1;
}
.flow-arrow:nth-of-type(6)  {
  grid-column: 2;
  grid-row: 2;
}
.flow-arrow:nth-of-type(4)  {
  grid-column: 4;
  grid-row: 1;
}
.flow-arrow:nth-of-type(8)  {
  grid-column: 4;
  grid-row: 2;
}
.ad-network  {
  grid-column: 3;
  grid-row: 1;
  min-height: 3.15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.18rem;
  border: 1px solid rgba(196,181,253,0.7);
  background: rgba(124,92,255,0.1);
  color: rgba(221,214,254,0.98);
}
.ad-network--second  {
  grid-row: 2;
}
.ad-network span  {
  font-size: 0.74rem;
  font-weight: 820;
  letter-spacing: 0.08em;
}
.ad-network i  {
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background: rgba(221,214,254,0.95);
  box-shadow: 0 0 10px rgba(196,181,253,0.72);
  animation: adBlink 1.4s ease-in-out infinite;
}
.ad-network i:nth-of-type(2)  {
  animation-delay: .24s;
}
.ad-network i:nth-of-type(3)  {
  animation-delay: .48s;
}
.ad-network small  {
  font-size: 0.56rem;
  color: rgba(221,214,254,0.66);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.latent-card  {
  position: relative;
}
.latent-card--truth  {
  grid-column: 5;
  grid-row: 1;
  border: 1px dashed rgba(251,191,36,0.55);
  background: rgba(251,191,36,0.045);
}
.latent-card--pred  {
  grid-column: 5;
  grid-row: 2;
  border: 1px dashed rgba(103,232,249,0.58);
  background: rgba(0,229,255,0.04);
}
.latent  {
  position: absolute;
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 50%;
  background: rgba(253,224,71,0.96);
  box-shadow: 0 0 9px rgba(251,191,36,0.58);
  animation: latentDrift 1.8s ease-in-out infinite alternate;
}
.latent-card--pred .latent  {
  background: rgba(103,232,249,0.96);
  box-shadow: 0 0 9px rgba(0,229,255,0.65);
}
.latent-1  {
  left: 58%;
  top: 38%;
}
.latent-2  {
  left: 66%;
  top: 53%;
  animation-delay: .2s;
}
.latent-3  {
  left: 56%;
  top: 70%;
  animation-delay: .4s;
}
.latent-4  {
  left: 76%;
  top: 31%;
  animation-delay: .6s;
}
.swd-strip, .cpo-repair-strip  {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 0.52rem;
  padding: 0.42rem 0.5rem;
  color: rgba(204,251,241,0.76);
  font-size: 0.68rem;
}
.swd-strip  {
  border-left: 3px solid rgba(94,234,212,0.88);
  background: rgba(45,212,191,0.08);
}
.swd-strip strong  {
  color: rgba(94,234,212,0.98);
  font-size: 0.78rem;
}
.cpo-repair-strip  {
  margin-top: 0.42rem;
  border-left: 3px solid rgba(196,181,253,0.88);
  background: rgba(124,92,255,0.09);
}
.cpo-repair-strip i  {
  color: rgba(196,181,253,0.98);
  font-size: 0.9rem;
  font-style: normal;
  animation: arrowMove 1.2s ease-in-out infinite;
}
.cpo-repair-strip strong  {
  color: rgba(221,214,254,0.98);
  font-size: 0.7rem;
}
.align-lockup  {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.58rem;
  margin-top: 2.3rem;
}
.align-node  {
  min-width: 7.6rem;
  padding: 0.8rem 0.62rem;
  border-top: 2px solid;
  text-align: center;
  background: rgba(255,255,255,0.045);
  animation: stateIn .58s cubic-bezier(.22,1,.36,1) both;
}
.align-node span  {
  display: block;
  color: rgba(255,255,255,0.57);
  font-size: 0.64rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
.align-node strong  {
  display: block;
  margin-top: 0.2rem;
  color: rgba(255,255,255,0.93);
  font-size: 0.72rem;
  line-height: 1.16;
}
.align-node--dgpo  {
  border-color: rgba(253,224,71,0.9);
}
.align-node--cpo  {
  border-color: rgba(221,214,254,0.92);
  animation-delay: .12s;
}
.align-lockup > i  {
  color: rgba(255,255,255,0.43);
  font-size: 1.12rem;
  font-style: normal;
}
.align-output  {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
  padding: 0.8rem 0.58rem;
  border: 1px solid rgba(94,234,212,0.55);
  color: rgba(94,234,212,0.98);
  background: rgba(45,212,191,0.1);
  animation: stateIn .58s .24s cubic-bezier(.22,1,.36,1) both;
}
.align-output span  {
  width: 0.92rem;
  height: 0.92rem;
}
.align-output strong  {
  margin-top: 0.18rem;
  font-size: 0.76rem;
}
.state-foot--green  {
  color: rgba(204,251,241,0.8);
}
.panel-kicker.gradient-animated,
.state-label strong.gradient-animated,
.align-output strong.gradient-animated,
.stage-guide span.gradient-animated  {
  color: transparent;
}
.result-panel  {
  min-width: 0;
  padding: 0.35rem 0 0.2rem 0.1rem;
  animation: resultIn .52s cubic-bezier(.22,1,.36,1) both;
}
.result-header  {
  margin-bottom: 0.38rem;
}
.sample-note  {
  display: none;
}
.coming-soon-banner  {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.04rem;
  width: max-content;
  margin: 1.25rem auto 0;
  padding: 0.25rem 0.38rem;
  border: 1px solid rgba(253, 71, 192, 0.56);
  background: rgba(253, 71, 192, 0.08);
  color: rgba(253, 71, 192, 0.94);
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}
.coming-soon-banner strong  {
  font-size: 1.0rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.coming-soon-banner span  {
  color: rgba(255,255,255,0.6);
  font-size: 0.8rem;
}
.top-mass-plot  {
  width: 14rem;
  height: 14.5rem;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.05rem;
  border-top: 2px solid rgba(251,191,36,0.84);
  background: rgba(255,255,255,0.98);
  box-shadow: 0 10px 26px rgba(0,0,0,0.17);
}
.top-mass-plot :deep(.zoomable-plot-container)  {
  width: 100%;
  height: 100%;
}
.top-mass-plot :deep(.zoomable-plot-image)  {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.metric-card  {
  flex: 1;
  position: relative;
  min-height: 0;
  margin-top: 0.35rem;
  padding: 0.52rem 0.14rem 0.35rem 0.55rem;
  border: 0;
  border-radius: 0;
  background: linear-gradient(118deg, rgba(31,68,132,0.58), rgba(13,32,76,0.22) 62%, transparent);
  box-shadow: none;
}
.metric-card::before  {
  position: absolute;
  top: 0.42rem;
  bottom: 0.28rem;
  left: 0;
  width: 2px;
  background: linear-gradient(180deg, rgba(196,181,253,0.66), rgba(103,232,249,0.12));
  content: '';
}
.metric-title  {
  display: flex;
  align-items: center;
  gap: 0.48rem;
  margin-bottom: 0.6rem;
}
.metric-title-icon  {
  width: 1.18rem;
  height: 1.18rem;
  color: rgba(196,181,253,0.98);
}
.metric-title strong  {
  display: block;
  color: rgba(255,255,255,0.92);
  font-size: 0.82rem;
}
.metric-title span  {
  display: block;
  margin-top: 0.12rem;
  color: rgba(196,181,253,0.76);
  font-size: 0.52rem;
  line-height: 1.15;
}
.metric-table  {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  font-size: 10px;
}
.metric-table th  {
  padding: 0 0.16rem 0.2rem;
  color: rgba(255,255,255,0.66);
  font-size: 9.5px;
  font-weight: 750;
  text-align: right;
}
.metric-table th:first-child  {
  width: 32%;
  text-align: left;
}
.metric-table td  {
  padding: 0.58rem 0.16rem;
  color: rgba(255,255,255,0.84);
  text-align: right;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(148,163,184,0.28);
}
.metric-table td:first-child  {
  text-align: left;
}
.metric-table td:last-child  {
}
.metric-table .model-name  {
  font-weight: 650;
}
.preferred-row td  {
  color: rgba(110,231,183,1);
  font-weight: 720;
  background: transparent;
  border-bottom: 2px solid rgba(45,212,191,0.82);
}
@keyframes stateIn  {
  from  {
    opacity: 0;
    transform: translateY(8px);
  }
  to  {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes resultIn  {
  from  {
    opacity: 0;
    transform: translateX(16px);
  }
  to  {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes float  {
  50%  {
    transform: translateY(-6px);
  }
}
@keyframes dotPop  {
  from  {
    opacity: 0;
    transform: scale(.45);
  }
  to  {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes goodPulse  {
  50%  {
    box-shadow: 0 0 0 4px rgba(45,212,191,0.1);
  }
}
@keyframes arrowMove  {
  50%  {
    transform: translateX(5px);
  }
}
@keyframes adBlink  {
  50%  {
    transform: scale(1.5);
    background: rgba(94,234,212,0.98);
  }
}
@keyframes latentDrift  {
  to  {
    transform: translate(4px,-3px);
  }
}
</style>
