---
clicks: 3
transition: fade
---

<script setup>
import NJUAlignLoop from '../components/NJUAlignLoop.vue'
</script>

# <span class="evenet-wordmark gradient-animated">EveNet-Align</span>: learning which solutions to prefer

<div class="dgpo-subtitle align-takeaway">Direct Group Preference Optimization (DGPO): favor candidates with higher rewards.</div>

<NJUAlignLoop :step="$clicks" />

<style scoped>
h1{font-size:30px;line-height:1.12;margin:0;letter-spacing:-.025em}
.dgpo-subtitle{font-size:14px;color:#bcc2cb;margin-top:8px}
</style>

<!--
Method based on the presenter-provided algorithm. Existing NJU top-mass figure and metrics retained verbatim.
Click 0: K same-event neutrino-pair candidates (eight shown as an illustrative example) from the rollout diffusion policy; DDIM uses 10 steps. Event/object tokens are frozen.
Click 1: A general reward function scores candidates; alternative rewards are under study. The current results use the negative sum of component-normalized squared Cartesian momentum residuals to the matched simulation truth, summed over the neutrino pair. sigma_i is component normalization, not the group reward spread. Diagram numbers are illustrative.
Click 2: Standardize rewards within the same event: A_(k,e) = (R_(k,e) - mu_e) / sigma_e. Positive/negative advantages increase/decrease relative probability. No separate critic. This is not best-of-K selection and not a comparison of two event groups.
Click 3: Group-relative KL-free objective, 8 inner optimization steps and gradient accumulation yield an AdamW proposal. The source setup uses CPO to correct it when normalized frozen-AE latent SWD exceeds 0.1, then updates policy and EMA. Frozen reference and rollout EMA are retained in the source algorithm; save/eval EMA is 0.985. We deliberately summarize this safeguard: ongoing work aims to remove CPO, not claim it is already removed.
Mass reconstruction and unfolding evidence now follow together on slide 17. This slide ends with the DGPO update.
Training-only truth-distance reward favors one realized truth, can suppress other modes and cause pT collapse. Truth is not an inference input. The candidate positions, reward bars, and feedback pulses are a schematic, not a simulation or measured optimization trajectory.
-->
