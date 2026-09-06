---
transition: fade
class: nju-hhml
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Gains across all three POIs.

<div class="hhml-subtitle">ATLAS <LaTeX formula="HH" /> multilepton · <LaTeX formula="2\ell_{\mathrm{SC}}" /> · Reusing the <span class="evenet-wordmark">EveNet</span> backbone</div>

<div class="hhml-metrics">
  <div><strong><LaTeX formula="\sim22\%" /></strong><span>lower <LaTeX formula="\mu_{HH}" /> upper limit</span></div>
  <div><strong><LaTeX formula="\sim12\%" /></strong><span>narrower <LaTeX formula="\kappa_\lambda" /> interval</span></div>
  <div><strong><LaTeX formula="\sim47\%" /></strong><span>narrower <LaTeX formula="\kappa_{2V}" /> interval</span></div>
</div>

<div class="hhml-baseline">Expected sensitivity vs. inclusive XGB. Highlighted values use the red <span class="evenet-wordmark">EveNet</span> row.</div>
<div class="hhml-plot"><NJUPlot src="/figures/hhml-poi-comparison.png" alt="Full source comparison of inclusive XGB, low/high XGB and EveNet configurations for the expected HH signal-strength upper limit and kappa lambda and kappa 2V intervals. Red EveNet row: 21.8%, 12.4% and 46.7% improvement relative to inclusive XGB for the 3 minimum background setting." /></div>
<div class="hhml-stamp" aria-label="Internal, preliminary"><b>INTERNAL</b><span>PRELIMINARY</span></div>
<div class="hhml-outlook">HHML is one example. <strong>More ATLAS applications are underway.</strong></div>

<!--
Source: HHML_IHEP.pptx, slide 9, original embedded image33.png, preserved without cropping or recoloring.
Quick internal result, not a validated final ATLAS result. The quoted gains cover the three displayed POIs in 2lSC, not every HHML channel.
Use one consistent configuration: red EveNet s1/s1, filled markers (3 min. bkg.). Relative to inclusive XGB, the expected mu upper limit decreases from 22.06 to 17.25 (21.8%); kappa_lambda interval width decreases from 22.93 to 20.10 (12.4%); kappa_2V width decreases from 13.96 to 7.44 (46.7%). These round to 22%, 12%, 47%.
The source slide's prose says approximately 21%, 13%, 45% compared with retrained XGB, but the plot's reference row is inclusive XGB. Do not describe these as additional gains over the optimized low/high XGB row. All original rows and minimum-background settings remain visible.
Presenter framing: useful sensitivity gains come with reuse of the pretrained backbone. "For free" is an informal description of reuse, not a demonstrated claim of zero training, compute or analysis work. No extra validation or public-release claim is implied.
-->

<style>
.slidev-layout.nju-hhml { padding:42px 56px 35px; }
.nju-hhml h1 { margin:0!important; font-size:34px!important; }
.nju-hhml .hhml-subtitle { margin-top:9px; font-size:16px; color:var(--nju-amber); }
.nju-hhml .hhml-metrics { display:grid; grid-template-columns:1fr 1fr 1fr; margin-top:20px; padding:10px 0 12px; border-top:1px solid var(--nju-line); border-bottom:1px solid var(--nju-line); }
.nju-hhml .hhml-metrics > div { display:flex; align-items:center; gap:12px; }
.nju-hhml .hhml-metrics > div + div { border-left:1px solid var(--nju-line); padding-left:18px; }
.nju-hhml .hhml-metrics strong { font-size:29px; color:var(--nju-amber); white-space:nowrap; }
.nju-hhml .hhml-metrics > div > span { font-size:13px; line-height:1.4; max-width:120px; }
.nju-hhml .hhml-baseline { font-size:11px; color:var(--fg-1); margin:10px 0 8px; }
.nju-hhml .hhml-plot { height:270px; background:white; border-radius:3px; padding:5px; }
.nju-hhml .hhml-plot .zoomable-plot-container { height:100%!important; margin:0!important; }
.nju-hhml .hhml-stamp { position:absolute; top:55px; right:35px; width:151px; padding:5px 7px 6px; border:3px double var(--nju-coral); color:var(--nju-coral); text-align:center; transform:rotate(7deg); background:rgba(23,25,28,.7); }
.nju-hhml .hhml-stamp b { display:block; font-family:Georgia,serif; font-size:20px; font-weight:900; letter-spacing:1.6px; line-height:1; border-bottom:1px solid currentColor; padding-bottom:4px; margin-bottom:4px; }
.nju-hhml .hhml-stamp span { display:block; font-size:12px; font-weight:700; letter-spacing:1.5px; line-height:1.25; }
.nju-hhml .hhml-outlook { margin-top:12px; font-size:16px; line-height:1.35; color:var(--fg-1); }
.nju-hhml .hhml-outlook strong { color:var(--nju-amber); font-weight:550; }
.nju-hhml .katex { font-size:1.05em; }
</style>
