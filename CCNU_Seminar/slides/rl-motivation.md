---
clicks: 2
transition: fade
class: nju-align-section nju-pref-page
---

<script setup>
import NJUPreferenceStory from '../components/NJUPreferenceStory.vue'
</script>

# Why one number is the wrong answer

<NJUPreferenceStory :step="$clicks" />

<div class="as-endnote"><strong>Next</strong><span>Sample several <LaTeX formula="\nu" /> answers, then keep the higher rewards.</span></div>

<style>
.nju-pref-page h1{line-height:1.2!important}
.nju-pref-page .as-endnote{margin-top:8px}
</style>

<!--
Intuition between the chapter bridge and the DGPO method. The surface reuses the slide 14 likelihood-plan drawing. Illustrative geometry only, not a measured posterior.
One plane only: the truth likelihood, p(z|x), two valid answers, held fixed. The learned plan is gold light and samples laid on that same plane, not a second surface.
Click 0, naive regression: a single marker stands in the valley. That average is often not itself a solution.
Click 1, generative models: samples and gold light cover the common answer and leak into the gap. The rare truth peak stays bare.
Click 2, RL: a reward glow settles on the true answers, and the samples climb onto the bare peak. The reward does not replace the generator, and it cannot invent a mode the sampler cannot reach. The following slide is that operation on neutrino momenta: sample several answers, score them, keep the higher rewards.
The truth-distance reward used later can still pull toward one realized truth and suppress other modes. This slide motivates a preference that keeps the valid groups.
-->
