---
class: iml-content iml-paper
transition: fade
---

<script setup>
import NJUPlot from "../components/NJUPlot.vue"
</script>

# <span class="evenet-wordmark gradient-animated">EveNet</span> on CMS data: resonance rediscovery

<div class="paper-sub">CMS collision data · <LaTeX formula="\Upsilon\to\mu^+\mu^-" /> rediscovery · data-only downstream analysis</div>
<div class="ad-channel-key">
  <div><b>OS · opposite-sign</b><span><LaTeX formula="\mu^+\mu^-" />: resonance + background</span></div>
  <div><b>SS · same-sign</b><span><LaTeX formula="\mu^\pm\mu^\pm" />: background-only control</span></div>
</div>
<div class="ad-evidence">
<section>
<h2>Train → test: does the signal follow the data?</h2>
<div class="ad-significance"><NJUPlot src="/ad_significance.svg" alt="Significance for OS to OS, SS to OS, OS to SS and SS to SS train-to-test configurations" /></div>
<div class="paper-guide"><b>Evaluate on OS:</b> recover the resonance.<br/><b>Evaluate on SS:</b> significance compatible with zero.<br/>Markers: median; bars: central 68% of 1,600 pseudo-experiments.</div>
<div class="paper-flow">Sidebands → background model → reweighted mass test</div>
</section>
<section>
<h2>Same OS training; change the evaluation sample</h2>
<div class="ad-spectra"><div><b>OS → OS · resonance</b><NJUPlot src="/ad_mass_distribution.svg" alt="OS training and OS evaluation: recovered resonance" /></div><div><b>OS → SS · control</b><NJUPlot src="/ad_mass_distribution_no_signal.svg" alt="OS training and SS evaluation: background-only control" /></div></div>
<table class="paper-table"><thead><tr><th>OS → OS</th><th>Median local <LaTeX formula="Z" /></th></tr></thead><tbody><tr><td><span class="evenet-wordmark">EveNet-Full</span></td><td><LaTeX formula="7.6\pm0.4\,\sigma" /></td></tr><tr><td><span class="evenet-wordmark">EveNet-SSL</span></td><td><LaTeX formula="7.4\pm0.4\,\sigma" /></td></tr><tr><td>Scratch</td><td><LaTeX formula="1.5\pm0.2\,\sigma" /></td></tr></tbody></table>
<p class="paper-note">Published reference: <LaTeX formula="6.4\,\sigma" />.</p>
</section>
</div>
<div class="paper-result"><span i-carbon:chart-line /><div><b>Transfer to collision data:</b> enhanced resonance sensitivity in OS, with a successful SS null test.</div></div>

<style>
.slidev-layout.iml-paper .ad-spectra .zoomable-plot-container { height:100px!important; }
.slidev-layout.iml-paper .ad-significance .zoomable-plot-container { height:160px!important; }
.ad-channel-key { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:0 0 8px; }
.ad-channel-key>div { border-left:3px solid #82ccec; background:#82ccec0b; padding:5px 11px; font-size:12px; }
.ad-channel-key>div+div { border-color:#e9c78a; background:#e9c78a0b; }
.ad-channel-key b { display:block; color:#82ccec; font-size:14px; margin-bottom:3px; }
.ad-channel-key>div+div b { color:#e9c78a; }
.ad-channel-key span { color:#d6dee6; }
.ad-evidence h2 { font-size:14px!important; }
.ad-evidence .paper-flow { margin-top:7px; padding:6px 9px; }
</style>

<!--
Train → test labels the channels used for training and evaluation, respectively.
OS → OS uses 10,640 OS sideband events for the generator and 1,692 OS signal-region events for classifier training/cross-validation.
Calibration restores exact two-body kinematics. Median relative four-momentum corrections: Full 11.6%, SSL 13.3%, Scratch 74.4%.
Each configuration pools 1,600 pseudo-experiments. Quoted significance errors summarize the central 68% spread, not a discovery uncertainty from a single fit.
-->
