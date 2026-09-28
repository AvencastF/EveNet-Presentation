---
transition: fade
class: nju-delphi dp-attrib
---

<script setup>
import NJUPlot from '../components/NJUPlot.vue'
</script>

# Which inputs the classifier uses

<div class="dp-subtitle">Accuracy drop when a feature group is removed. Orange is the <LaTeX formula="\pi/\rho" /> hadronic subset; blue is the full 17-way classification.</div>
<div class="dp-split">
<div class="dp-plot"><NJUPlot src="/figures/delphi-feature-importance.png" alt="Horizontal bar chart of EveNet classifier feature-group importance, comparing the pi/rho hadronic subset with the overall 17-way classification" /></div>
<div class="dp-callouts">
<div><h3>Hemisphere geometry</h3><p><LaTeX formula="\Delta R" />, the 3-D opening angle, and a hemisphere flag, relative to the two leading <LaTeX formula="\tau" /> candidates.</p></div>
<div><h3>Hadronic calorimeter</h3><p>Hadronic shower energy and tower multiplicity.</p></div>
<div><h3>Electromagnetic calorimeter</h3><p>Shower energy, centroid <LaTeX formula="\theta/\phi" />, and layer count.</p></div>
</div>
</div>
<div class="dp-note"><strong>How to read it</strong><span>A longer bar means removing that group hurts more. Kinematics matter everywhere; calorimeter information matters more for the hadronic subset.</span></div>
<div class="dp-source">Cen Mo et al. · ML4Jets · 2026.09.16</div>

<!--
Source: ML4Jets.key slide 16, original vector figure feature_importance. Blue Keynote callouts are restated as the three definitions. Series colors and in-figure labels, including the EveNet title inside the plot, are unchanged. Do not quote bar heights that are not printed on the figure.
-->
