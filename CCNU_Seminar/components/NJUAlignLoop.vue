<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { animate } from 'animejs'
import { useSlideContext } from '@slidev/client'
import katex from 'katex'

const props = defineProps<{ step: number }>()
const { $nav, $page, $renderContext } = useSlideContext()
const motion = reactive({ stage: Math.min(props.step, 3), cycle: 0 })
const reduced = ref(false), hidden = ref(false)
let media: MediaQueryList | undefined
let transition: ReturnType<typeof animate> | undefined
let loop: ReturnType<typeof animate> | undefined
const running = computed(() => $nav.value.currentPage === $page.value && $renderContext.value === 'slide' && !reduced.value && !hidden.value)
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const reveal = (stage: number) => clamp(motion.stage - stage + 1)
const mix = (a: number, b: number, t: number) => a + (b - a) * t
// Illustrative normalized squared distances, never measured performance.
const distances = [6.4, 1.2, 4.7, 2.1, 7.6, 3.4, .6, 5.6]
const mean = distances.reduce((a, b) => a + b) / distances.length
const sigma = Math.sqrt(distances.reduce((a, b) => a + (b - mean) ** 2, 0) / distances.length)
const samples = distances.map((d, i) => ({ d, a: (mean - d) / sigma, x: 294 + i * 73, y: [103, 163, 80, 137, 189, 111, 174, 91][i] }))
const color = (a: number) => reveal(2) > .5 ? a > 0 ? '#70dcb2' : '#f69cab' : '#f0c36e'
const cy = (s: typeof samples[number]) => mix(s.y, mix(90, 78, reveal(2)), reveal(1))
const end = (s: typeof samples[number]) => mix(126 + s.d * 11, 173 - s.a * 30, reveal(2))
const baseline = computed(() => mix(126, 173, reveal(2)))
const math = (formula: string) => katex.renderToString(formula, { throwOnError: true })
const titles = [`Sample ${math('K')} solutions for one event`, 'Score candidates with a chosen reward', 'Compare each reward with its event mean', 'Update the model to favor higher-reward solutions']
const captions = [`One observed event ${math(String.raw`\to K`)} candidate solutions (${math('K = 8')} shown)`, `Higher reward ${math(String.raw`\to`)} stronger preference. Reward design is under study.`, 'Above-average reward: increase probability. Below-average: decrease it.', `Train the model to generate above-average solutions more often.`]
const stage = computed(() => Math.min(props.step, 3))
const equations = [
  String.raw`\{(\nu,\bar\nu)_{k,e}\}_{k=1}^{K}\sim\pi_{\rm rollout}(\cdot\mid x_e)`,
  String.raw`R_{k,e}=r\!\left((\nu,\bar\nu)_{k,e},\,x_e\right)`,
  String.raw`A_{k,e}=\frac{R_{k,e}-\mu_e}{\sigma_e}`,
]
const equation = computed(() => katex.renderToString(equations[Math.min(stage.value, 2)], { throwOnError: true, displayMode: true }))
function update() {
  transition?.cancel()
  if (!running.value) { motion.stage = stage.value; return }
  transition = animate(motion, { stage: stage.value, duration: 1100, ease: 'inOutCubic' })
}
function sync() {
  loop?.cancel()
  if (running.value) loop = animate(motion, { cycle: { from: 0, to: 1 }, duration: 3000, ease: 'linear', loop: true })
  update()
}
function preference() { reduced.value = !!media?.matches }
function visibility() { hidden.value = document.hidden }
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preference)
  document.addEventListener('visibilitychange', visibility)
  preference(); visibility(); sync()
})
watch(() => props.step, update)
watch(running, sync)
onBeforeUnmount(() => { transition?.cancel(); loop?.cancel(); media?.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility) })
</script>

<template>
  <section class="align-loop" :data-step="step" :data-progress="motion.stage" :data-cycle="motion.cycle" :data-looping="running">
    <div class="al-heading"><h2 v-html="titles[stage]" /><span>DGPO · {{ stage + 1 }} / 4</span></div>
    <svg viewBox="0 0 880 280" role="img" aria-label="Conditioned diffusion, candidate rewards, relative advantages and policy update. Eight candidates are shown. The reward example uses training truth.">
      <path d="M20 30 H860 M20 244 H860" class="al-rule" />
      <text x="22" y="20" class="al-small">OBSERVED EVENT → CANDIDATES</text>
      <foreignObject x="263" y="3" width="590" height="26"><div xmlns="http://www.w3.org/1999/xhtml" class="al-math-label" v-html="stage === 0 ? `ONE EVENT · ${math('K')} NEUTRINO PAIRS` : stage === 1 ? `REWARD ${math('R')} · EXAMPLE SCORES` : `GROUP-RELATIVE ADVANTAGE ${math('A')}`" /></foreignObject>
      <rect x="22" y="88" width="178" height="112" rx="12" fill="#23262b" stroke="#f0c36e" stroke-opacity=".7" />
      <path d="M33 104 V99 H48 M173 99 H189 V114 M33 175 V189 H48 M173 189 H189 V175" fill="none" stroke="#f0c36e" />
      <foreignObject x="36" y="112" width="150" height="28"><div xmlns="http://www.w3.org/1999/xhtml" class="evenet-wordmark al-wordmark gradient-animated">{{ stage >= 3 ? 'EveNet-Align' : 'EveNet-Full' }}</div></foreignObject>
      <foreignObject x="28" y="139" width="166" height="26"><div xmlns="http://www.w3.org/1999/xhtml" class="al-policy">sampling model <span v-html="math(String.raw`\pi_\theta`)" /></div></foreignObject>
      <text x="111" y="179" text-anchor="middle" class="al-small">jets · leptons · MET</text>
      <text x="111" y="221" text-anchor="middle" class="al-small">Reuse the learned event features</text>
      <g v-for="(s, i) in samples" :key="i">
        <path :d="`M200 144 C235 144 244 ${cy(s)} ${s.x} ${cy(s)}`" fill="none" stroke="#77c9ff" :stroke-opacity=".25 * (1 - reveal(1))" />
        <path :d="`M200 144 C235 144 244 ${cy(s)} ${s.x} ${cy(s)}`" fill="none" stroke="#cdeaff" pathLength="100" stroke-dasharray="3 97" :stroke-dashoffset="-100*((motion.cycle+i*.09)%1)" :opacity="running ? .8*(1-reveal(1)) : 0" />
        <g class="al-candidate" :transform="`translate(${s.x} ${cy(s)})`">
          <circle r="14" fill="#17191c" :stroke="color(s.a)" stroke-opacity=".55" />
          <circle cx="-4" cy="-3" r="3.5" fill="#77c9ff" /><circle cx="4" cy="3" r="3.5" fill="#baa5ff" />
          <text y="-23" text-anchor="middle" class="al-small">{{ i + 1 }}</text>
        </g>
        <g :opacity="reveal(1)">
          <line :x1="s.x" :x2="s.x" :y1="baseline" :y2="end(s)" :stroke="color(s.a)" stroke-width="13" stroke-linecap="round" />
          <foreignObject :x="s.x - 30" :y="end(s) + (stage >= 2 && s.a > 0 ? -28 : 8)" width="60" height="28"><div xmlns="http://www.w3.org/1999/xhtml" class="al-value al-centered" :style="{ color: color(s.a) }" v-html="math(stage >= 2 ? (s.a > 0 ? '+' : '') + s.a.toFixed(2) : '-' + s.d.toFixed(1))" /></foreignObject>
        </g>
      </g>
      <g :opacity="reveal(1)">
        <path :d="`M267 ${baseline} H835`" stroke="#bcc2cb" stroke-opacity=".6" stroke-dasharray="3 4" />
        <text x="854" :y="baseline + 4" text-anchor="middle" class="al-small">0</text>
      </g>
      <g :opacity="reveal(3)">
        <path d="M826 231 V256 Q826 267 814 267 H123 Q111 267 111 255 V239" fill="none" stroke="#f0c36e" stroke-opacity=".55" />
        <path d="M826 231 V256 Q826 267 814 267 H123 Q111 267 111 255 V239" fill="none" stroke="#fff0ba" stroke-width="3" pathLength="100" stroke-dasharray="5 95" :stroke-dashoffset="-motion.cycle*100" />
        <path d="m106 245 5 -7 5 7" fill="none" stroke="#f0c36e" />
        <rect x="322" y="255" width="344" height="23" fill="#17191c" />
        <text x="494" y="271" text-anchor="middle" fill="#f0c36e" class="al-small">Update the sampling model · repeat</text>
      </g>
      <foreignObject v-if="stage === 0" x="300" y="214" width="500" height="30"><div xmlns="http://www.w3.org/1999/xhtml" class="al-math-label al-centered">Each point-pair is one joint <span v-html="math(String.raw`(\nu,\bar{\nu})`)" /> candidate.</div></foreignObject>
    </svg>
    <div class="al-equation">
      <div class="al-math" v-html="equation" />
      <p><span v-html="captions[stage]" /><small v-if="stage === 1">Current results: negative normalized squared distance to truth.</small><small v-if="stage === 0"><span v-html="math('x_e')" />: observed event · <span v-html="math('k')" />: candidate index.</small><small v-if="stage >= 2"><span v-html="math(String.raw`\mu_e,\sigma_e`)" />: mean and spread of rewards for this event.</small></p>
    </div>
    <div class="al-caveat"><strong>{{ stage >= 3 ? 'Distribution safeguard' : 'Training-truth reward' }}</strong><span>{{ stage >= 3 ? 'A constraint limits changes to the overall distribution. Simplifying this safeguard is ongoing work.' : 'Uses simulation truth during training. Favoring one solution can reduce the diversity of other plausible solutions.' }}</span></div>
    <div class="al-footer" aria-label="Sample, then reward, then relative advantage, then DGPO update">
      <template v-for="(label, i) in ['Sample', 'Reward', 'Relative advantage', 'DGPO update']" :key="label">
        <svg v-if="i" class="al-step-arrow" viewBox="0 0 24 12" aria-hidden="true"><path d="M1 6 H22 M17 1 L22 6 L17 11" /></svg>
        <span :class="{ active: step >= i }" :aria-current="step === i ? 'step' : undefined">{{ label }}</span>
      </template>
      <small>Illustrative candidates and values · <span v-html="math('K = 8')" /> shown</small>
    </div>
  </section>
</template>

<style scoped>
.align-loop{color:#f0f1f3;margin-top:10px;display:grid;grid-template-rows:30px 254px 64px 38px 22px}
.al-heading{display:flex;align-items:center;justify-content:space-between}
.al-heading h2{font-size:21px!important;font-weight:550;margin:0!important;letter-spacing:-.02em}
.al-heading>span{font-size:12px;color:#f0c36e;font-variant-numeric:tabular-nums}
.align-loop>svg{width:100%;height:254px;display:block;overflow:visible}
.al-rule{stroke:#bcc2cb;stroke-opacity:.2}
.al-small{font-size:12px;fill:#bcc2cb;letter-spacing:.015em}
.al-policy{font-size:15px;color:#f0f1f3;text-align:center;line-height:24px}
.al-math-label{font-size:12px;color:#bcc2cb;line-height:24px}
.al-centered{text-align:center}
.al-math-label :deep(.katex),.al-policy :deep(.katex),.al-heading :deep(.katex),.al-footer :deep(.katex){font-size:1em}
.al-value{font-size:13px;font-weight:600;font-variant-numeric:tabular-nums}
.al-wordmark{font-size:21px;font-weight:650;text-align:center;line-height:28px}
.al-equation{display:grid;grid-template-columns:1.05fr 1fr;gap:24px;align-items:center;min-height:0;height:64px;box-sizing:border-box;padding:2px 10px;color:#f0c36e}
.al-equation :deep(.katex){font-size:1.05em}
.al-equation :deep(.katex-display){margin:0}
.al-equation p{font-size:13px;line-height:1.35;margin:0;color:#f0f1f3}
.al-equation small{display:block;color:#bcc2cb;font-size:12px;margin-top:4px}
.al-caveat{display:flex;align-items:center;box-sizing:border-box;height:38px;gap:14px;padding:8px 0;border-top:1px solid #ffffff20;color:#bcc2cb;font-size:12px;line-height:1.4}
.al-caveat strong{color:#baa5ff;white-space:nowrap;font-weight:550}
.al-footer{display:flex;align-items:center;gap:10px;color:#bcc2cb;font-size:11px}
.al-footer .active{color:#f0c36e}
.al-step-arrow{width:22px;height:12px;flex:none;fill:none;stroke:#bcc2cb;stroke-width:1.4}
.al-footer i{font-style:normal}
.al-footer small{margin-left:auto;font-size:10px}
</style>
