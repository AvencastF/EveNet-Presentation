---
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
import ZoomablePlot from '../components/ZoomablePlot.vue'
</script>

# Does <span class="gradient-animated">EveNet</span> work in real applications?

<span class="applications-subtitle">Open-data physics showcases</span>

<main class="applications-stage">
  <section class="fourtop-showcase">
    <header class="fourtop-intro">
      <div class="fourtop-identity">
        <span class="showcase-label"><span i-carbon:data-base></span> Application 1 · CMS Open Data</span>
        <h2>Fully hadronic four-top reconstruction</h2>
        <a class="fourtop-link" href="https://indico.ihep.ac.cn/event/28557/contributions/222569/" target="_blank" rel="noopener">SJTU team · Yifan Wu, Liang Li et al. ↗</a>
      </div>
      <ul class="fourtop-points">
        <li>Fully hadronic <span class="fourtop-math"><LaTeX :formula="'t\\bar{t}t\\bar{t}'" /></span>: 4 b + 8 light quarks (12 partons), with no neutrinos.</li>
        <li><span class="gradient-animated" style="font-variant: small-caps;">EveNet</span> assigns reconstructed jets to the four hadronic top-quark decays.</li>
        <li>CMS Open Data benchmark against SPANet in an extreme combinatorial regime.</li>
      </ul>
    </header>
    <div class="fourtop-evidence">
      <section class="reco-panel">
        <div class="panel-title"><span i-carbon:table-split></span><strong>Reconstruction-level performance</strong><em>CMS Open Data</em></div>
        <table class="reco-table">
          <thead>
            <tr><th>Method</th><th>Purity</th><th>Reco tops / event</th></tr>
          </thead>
          <tbody>
            <tr><td>Standard jets + SPANet</td><td>44%</td><td>0.90</td></tr>
            <tr><td>Variable-R jets + SPANet</td><td>53%</td><td>1.70</td></tr>
            <tr><td>Standard jets + <span class="gradient-animated">EveNet</span></td><td>66%</td><td>1.30</td></tr>
            <tr class="best-row"><td>Variable-R jets + <span class="gradient-animated">EveNet</span></td><td>63%</td><td>2.01</td></tr>
          </tbody>
        </table>
        <p class="reco-takeaway"><strong>2.23×</strong> more fully reconstructed tops per event than the CMS all-hadronic anchor.</p>
      </section>
      <figure class="projection-panel">
        <div class="panel-title"><span i-carbon:chart-line-data></span><strong>Conservative significance projection</strong></div>
        <div class="projection-plot"><ZoomablePlot src="/4_top_projection_plot.svg" alt="Projected four-top significance versus integrated luminosity for CMS baseline, standard jets plus EveNet, and variable-radius jets plus EveNet" /></div>
      </figure>
    </div>
  </section>
  <section class="ztautau-showcase">
    <div class="ztautau-story">
      <span class="showcase-label showcase-label--tau"><span i-carbon:chemistry></span> Application 2 · LEP Open Data</span>
      <h2><LaTeX :formula="'Z\\to\\tau\\tau'" /> spin reconstruction · <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span></h2>
      <ul class="ztautau-list">
        <li><strong>CLS</strong> identifies the τ decay channel.</li>
        <li><strong>GEN</strong> infers neutrinos and restores the τ rest frame.</li>
        <li>Enables the full spin-density matrix and quantum observables.</li>
      </ul>
    </div>
    <div class="ztautau-results">
      <div class="ztautau-results-head"><strong>Signal-significance gain vs DELPHI selection</strong><span class="talk-links"><span>Details:</span><a href="https://indi.to/T232V" target="_blank" rel="noopener">CHEP ↗</a><a href="https://indico.cern.ch/event/1574970/contributions/7093548/" target="_blank" rel="noopener">BOOST ↗</a><a href="https://indi.to/FXBv7" target="_blank" rel="noopener">ICHEP ↗</a></span></div>
      <div class="gain-grid" aria-label="Signal-significance gains compared with the traditional DELPHI selection">
        <div class="gain-cell"><span class="tau-channel"><LaTeX :formula="'\\tau_{\\ell}\\tau_{\\ell}'" /></span><strong>+67%</strong></div>
        <div class="gain-cell"><span class="tau-channel"><LaTeX :formula="'\\tau_{\\ell}\\tau_{\\mathrm{had}}'" /></span><strong>+110%</strong></div>
        <div class="gain-cell"><span class="tau-channel"><LaTeX :formula="'\\tau_{\\pi}\\tau_{\\pi}'" /></span><strong>+50%</strong></div>
        <div class="gain-cell"><span class="tau-channel"><LaTeX :formula="'\\tau_{\\mathrm{had}}\\tau_{\\mathrm{had}}'" /></span><strong>+58%</strong></div>
      </div>
    </div>
  </section>
</main>

<!--
[Sources]
- Four-top reconstruction: Four-Top Reco_Poster_wyf_final(2).pdf, Yifan Wu, July 2026.
- Four-top abstract and team attribution: https://indico.ihep.ac.cn/event/28557/contributions/222569/
- Ztautau significance gains and CHEP/BOOST/ICHEP links: supplied by the presenter.
[/Sources]
-->

<style scoped>
h1 {
  margin: 0;
  font-size: 1.86rem;
  line-height: 1.04;
  letter-spacing: -0.024em;
  white-space: nowrap;
}

.applications-subtitle {
  display: block;
  margin-top: 0.28rem;
  color: rgba(226, 232, 240, 0.69);
  font-size: 0.78rem;
  line-height: 1.2;
}

.applications-stage {
  display: grid;
  grid-template-rows: minmax(0, 2.25fr) minmax(0, 1fr);
  gap: 0.7rem;
  height: calc(100% - 2.25rem);
  margin-top: 0.48rem;
}

.fourtop-showcase,
.ztautau-showcase {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(103, 232, 249, 0.22);
  border-radius: 10px;
  background: linear-gradient(118deg, rgba(0, 229, 255, 0.08), rgba(15, 23, 42, 0.23) 46%, rgba(124, 92, 255, 0.06));
}

.fourtop-showcase::before,
.ztautau-showcase::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 96% 8%, rgba(0, 229, 255, 0.11), transparent 29%);
}

.fourtop-showcase {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
}

.fourtop-intro {
  position: relative;
  display: grid;
  grid-template-columns: 315px minmax(0, 1fr);
  gap: 0.94rem;
  align-items: center;
  padding: 0.54rem 0.8rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.showcase-label {
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
  color: rgba(103, 232, 249, 0.96);
  font-size: 0.59rem;
  font-weight: 850;
  letter-spacing: 0.085em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.showcase-label > span { font-size: 0.86rem; }

.fourtop-identity h2,
.ztautau-story h2 {
  margin: 0.22rem 0 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  line-height: 1.06;
  letter-spacing: -0.018em;
  white-space: nowrap;
}

.fourtop-link {
  display: inline-block;
  margin-top: 0.2rem;
  color: rgba(186, 230, 253, 0.78);
  font-size: 0.58rem;
  font-weight: 650;
  line-height: 1.1;
  text-decoration: none;
  border-bottom: 1px solid rgba(103, 232, 249, 0.35);
  white-space: nowrap;
}

.fourtop-link:hover,
.ztautau-results-head a:hover { color: #67e8f9; }

.fourtop-points {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fourtop-points li {
  position: relative;
  padding-left: 0.8rem;
  align-items: baseline;
  color: rgba(226, 232, 240, 0.75);
  font-size: 0.64rem;
  line-height: 1.13;
  white-space: nowrap;
}

.fourtop-points li::before {
  content: '';
  position: absolute;
  top: 0.29rem;
  left: 0.1rem;
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 50%;
  background: #67e8f9;
  box-shadow: 0 0 8px rgba(103, 232, 249, 0.46);
}

.fourtop-math { display: inline-flex; align-items: baseline; color: #67e8f9; font-weight: 730; }

.fourtop-evidence {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(250px, 1fr);
  gap: 0.7rem;
  min-height: 0;
  padding: 0.54rem 0.8rem 0.62rem;
}

.reco-panel,
.projection-panel {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  height: 100%;
  margin: 0;
  padding: 0.46rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  background: rgba(3, 8, 20, 0.3);
}

.reco-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.projection-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.32rem;
  min-width: 0;
  color: rgba(226, 232, 240, 0.91);
  font-size: 0.66rem;
  line-height: 1;
  white-space: nowrap;
}

.panel-title > span { color: #fdb874; font-size: 0.82rem; }
.panel-title strong { font-weight: 790; }
.panel-title em {
  margin-left: auto;
  color: rgba(226, 232, 240, 0.46);
  font-size: 0.53rem;
  font-style: normal;
  letter-spacing: 0.025em;
  white-space: nowrap;
}

.reco-table {
  width: 100%;
  align-self: center;
  margin: 0.34rem 0 0;
  border-collapse: collapse;
  color: rgba(241, 245, 249, 0.88);
  font-size: 0.64rem;
  line-height: 1.05;
}

.reco-table th,
.reco-table td {
  padding: 0.29rem 0.32rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  text-align: left;
  white-space: nowrap;
}

.reco-table th {
  color: rgba(186, 230, 253, 0.86);
  background: rgba(0, 229, 255, 0.075);
  font-size: 0.57rem;
  font-weight: 820;
}

.reco-table th:nth-child(n + 2),
.reco-table td:nth-child(n + 2) { text-align: center; }
.reco-table th:nth-child(2) { width: 17%; }
.reco-table th:nth-child(3) { width: 30%; }
.reco-table td:first-child { font-weight: 580; }

.reco-table .best-row {
  color: white;
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.19), rgba(124, 92, 255, 0.16));
}

.reco-table .best-row td {
  border-bottom-color: transparent;
  font-weight: 790;
}

.reco-takeaway {
  margin: 0.34rem 0 0;
  padding-top: 0.31rem;
  border-top: 1px solid rgba(103, 232, 249, 0.13);
  color: rgba(226, 232, 240, 0.73);
  font-size: 0.6rem;
  line-height: 1.12;
  white-space: nowrap;
}

.reco-takeaway strong { color: #67e8f9; font-size: 1.08em; }

.projection-plot {
  min-height: 0;
  margin-top: 0.34rem;
}

.projection-plot :deep(.zoomable-plot-container) {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.projection-plot :deep(.zoomable-plot-image) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ztautau-showcase {
  display: grid;
  grid-template-columns: 330px minmax(0, 1fr);
  gap: 0.9rem;
  align-items: stretch;
  padding: 0.58rem 0.8rem;
  border-color: rgba(240, 171, 252, 0.25);
  background: linear-gradient(112deg, rgba(240, 171, 252, 0.12), rgba(15, 23, 42, 0.23) 46%, rgba(103, 232, 249, 0.055));
}

.ztautau-showcase::before { background: radial-gradient(circle at 3% 100%, rgba(240, 171, 252, 0.16), transparent 35%); }
.ztautau-story,
.ztautau-results { position: relative; min-width: 0; }
.showcase-label--tau { color: rgba(240, 171, 252, 0.96); }
.ztautau-story h2 { margin-top: 0.22rem; }

.ztautau-list {
  display: grid;
  gap: 0.16rem;
  margin: 0.27rem 0 0;
  padding: 0;
  list-style: none;
  color: rgba(226, 232, 240, 0.76);
  font-size: 0.63rem;
  line-height: 1.18;
}

.ztautau-list li {
  position: relative;
  padding-left: 0.68rem;
  white-space: nowrap;
}

.ztautau-list li::before {
  content: '';
  position: absolute;
  top: 0.27rem;
  left: 0.07rem;
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background: #f0abfc;
  box-shadow: 0 0 8px rgba(240, 171, 252, 0.45);
}

.ztautau-list strong { color: #f0abfc; }

.ztautau-results {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding-left: 0.88rem;
  border-left: 1px solid rgba(240, 171, 252, 0.24);
}

.ztautau-results-head {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.64rem;
  line-height: 1;
  white-space: nowrap;
}

.ztautau-results-head strong { font-weight: 790; }

.ztautau-results-head a {
  color: rgba(240, 171, 252, 0.9);
  font-size: 0.57rem;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid rgba(240, 171, 252, 0.42);
  white-space: nowrap;
}

.talk-links {
  display: inline-flex;
  align-items: baseline;
  gap: 0.46rem;
  margin-left: auto;
  color: rgba(226, 232, 240, 0.47);
  font-size: 0.55rem;
  white-space: nowrap;
}

.gain-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  margin-top: 0.34rem;
}

.gain-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  min-width: 0;
  padding: 0.18rem 0.25rem;
  border-left: 1px solid rgba(240, 171, 252, 0.2);
}

.gain-cell:first-child { border-left: 0; }
.tau-channel { display: inline-flex; align-items: center; min-height: 1rem; color: rgba(255, 255, 255, 0.84); font-size: 0.74rem; white-space: nowrap; }
.gain-cell strong { color: #f0abfc; font-size: 0.88rem; line-height: 1; white-space: nowrap; }

</style>
