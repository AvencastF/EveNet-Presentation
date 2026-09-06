<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { animate } from 'animejs'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ scene: 'core' | 'classification' | 'assignment' | 'segmentation' | 'self' | 'supervised'; step: number }>()
const { $nav, $page, $renderContext } = useSlideContext()
const motion = reactive({ progress: props.step })
const ambient = reactive({ cycle: 0 })
const hidden = ref(false)
let transition: ReturnType<typeof animate> | undefined
let loop: ReturnType<typeof animate> | undefined
let media: MediaQueryList | undefined
const reduced = ref(false)
const active = computed(() => $nav.value.currentPage === $page.value)
const clamp = (v: number) => Math.max(0, Math.min(1, v))
const reveal = (step: number, offset = 0) => {
  const progress = props.scene === 'core' ? motion.progress * 3 : motion.progress * 2
  return clamp((progress - step + 1 - offset) / (1 - offset))
}
const unpack = computed(() => smooth(clamp((motion.progress - .12) / .78)))
const running = computed(() => active.value && $renderContext.value === 'slide' && !reduced.value && !hidden.value)
const phase = computed(() => ambient.cycle % 1)
const kick = (i: number) => running.value ? (1 + Math.sin(ambient.cycle * Math.PI * 2 - i * .6)) / 2 : 0
const travel = (offset = 0) => running.value ? clamp((((phase.value + offset) % 1) - .06) / .68) : 1
const spark = (offset = 0) => running.value ? Math.sin(travel(offset) * Math.PI) : 0
const queryReveal = (k: number) => k === 0 ? reveal(1) : reveal(2, (k - 1) * .35)
const queryPulse = (k: number) => .45 + .55 * kick(k * 8)

const smooth = (v: number) => v * v * (3 - 2 * v)
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const colors = ['#77c9ff', '#f0c36e', '#baa5ff', '#70dcb2', '#f69cab']
const eveNetLogo = `${import.meta.env.BASE_URL}evenet-logo-gold.svg`
const names = ['Classification', 'Assignment', 'Segmentation', 'Self-supervised', 'Supervised']
const scenes = ['classification', 'assignment', 'segmentation', 'self', 'supervised']
const index = computed(() => scenes.indexOf(props.scene))
const accent = computed(() => colors[Math.max(0, index.value)])
const generation = computed(() => index.value >= 3)
const rings = computed(() => props.scene === 'core'
  ? [{ x: 278, y: 170, r: 66, label: 'Particle features', color: colors[0], stage: 1 }, { x: 487, y: 146, r: 48, label: 'Event context', color: colors[3], stage: 2 }]
  : generation.value ? []
    : [{ x: 82, y: 163, r: 48, label: 'Particle features', color: colors[0], stage: 0 }, { x: 224, y: 163, r: 39, label: 'Event context', color: colors[3], stage: 0 }])
// Schematic local neighbourhoods and long-range attention, not measured weights.
const attentionPoints = Array.from({ length: 24 }, (_, i) => {
  const group = Math.floor(i / 8)
  const angle = (i % 8) * 2.4
  return { x: [-28, 27, 2][group] + Math.cos(angle) * (10 + i % 3 * 3),
    y: [-19, -13, 29][group] + Math.sin(angle) * (10 + i % 4 * 2), group }
})
const localEdges = attentionPoints.flatMap((p, i) => attentionPoints
  .map((q, j) => ({ p, q, i, j }))
  .filter(({ q, j }) => j > i && p.group === q.group && Math.hypot(p.x-q.x,p.y-q.y) < 23))
const globalEdges = [0, 3, 6, 9, 12, 15, 18, 21].map(i => ({ p: attentionPoints[i], q: attentionPoints[(i+11)%24] }))
const attentionMix = computed(() => running.value ? .5 + .5 * Math.sin(ambient.cycle * Math.PI * 2) : .55)
const headY = [52, 112, 172, 306, 344]
const routes = [
  'M535 146 C598 146 588 52 686 52', 'M535 146 C590 146 601 112 686 112', 'M535 146 C595 146 600 172 686 172',
  'M344 170 H370 Q386 170 386 190 V288 Q386 306 408 306 H686',
  'M344 170 H357 Q368 170 368 191 V325 Q368 344 390 344 H686',
]
// ponytail: fixed schematic events keep the physics examples reproducible; no inference runtime.
const particles = Array.from({ length: 24 }, (_, i) => ({
  x: 80 + Math.cos(i * 2.4) * (18 + i * 1.5), y: 170 + Math.sin(i * 2.4) * (18 + i * 1.5),
  rx: 278 + Math.cos(i * Math.PI / 12) * (i % 2 ? 43 : 28), ry: 170 + Math.sin(i * Math.PI / 12) * (i % 2 ? 43 : 28),

}))
const embeddings = Array.from({ length: 42 }, (_, i) => ({
  group: i % 3, x: [430, 561, 476][i % 3] + Math.cos(i * 2.4) * (10 + (i % 7) * 4),
  y: [125, 154, 258][i % 3] + Math.sin(i * 2.4) * (10 + (i % 7) * 4),
}))
const queries = [ { label: 'top', ids: [0, 1, 4], color: colors[0], x: 402, y: 108, outline: 'M351 59 H455 V103 H395 V190 H351 Z' },
  { label: 'top', ids: [6, 7, 11], color: colors[1], x: 526, y: 206, outline: 'M472 145 H577 V276 H534 V189 H472 Z' },
  { label: 'Z', ids: [8, 9], color: colors[2], x: 402, y: 253, outline: 'M351 231 H455 V276 H351 Z' } ]
const slots = [{ label: 'b', x: 447, jet: 0 }, { label: 'q', x: 629, jet: 2 }, { label: 'q', x: 755, jet: 4 }]
const jetX = (i: number) => 371 + i * 86
const tokenX = (i: number) => 372 + (i % 4) * 61
const tokenY = (i: number) => 81 + Math.floor(i / 4) * 86
const memberColor = (i: number) => queries.find((q, k) => q.ids.includes(i) && queryReveal(k) > .65)?.color || '#b2c0d0'
// The two generation stories share a 2.5 s demonstration clock, not a sampler.
const clean = (i: number, center: number) => ({ x: center + Math.cos(i * 2.4) * (15 + (i % 8) * 3), y: 151 + Math.sin(i * 2.4) * (20 + (i % 7) * 4) })
const perturbedIds = [2, 5, 8, 11, 14]
const jetSignalY = (t: number) => 317*(1-t)**3 + 810*(1-t)**2*t + 810*(1-t)*t*t + 226*t**3

const captions = {
  core: ['A shared representation for event understanding and generation', 'Discriminative and Generative, in one model'],
  classification: ['One probability per physics process'],
  assignment: ['Object matching to a fixed decay hierarchy'],
  segmentation: ['Resonance identity and particle membership'],
  self: ['Generate new events or complete missing particle features'],
  supervised: ['Infer invisible event components from observed particles'],
}
const caption = computed(() => captions[props.scene][props.step ? captions[props.scene].length - 1 : 0])
function update() {
  transition?.cancel()
  if (!running.value) { motion.progress = props.step; return }
  transition = animate(motion, { progress: props.step, duration: 1600, ease: 'inOutCubic' })
}
function syncLoop() {
  loop?.cancel()
  if (running.value) loop = animate(ambient, { cycle: { from: ambient.cycle, to: ambient.cycle + 1 }, duration: 2500, ease: 'linear', loop: true })
  update()
}
function preference() { reduced.value = !!media?.matches }
function visibility() { hidden.value = document.hidden }
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preference)
  document.addEventListener('visibilitychange', visibility)
  preference(); visibility(); syncLoop()
})
watch(() => props.step, () => update())
watch(running, syncLoop)
onBeforeUnmount(() => { transition?.cancel(); loop?.cancel(); media?.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility) })
</script>

<template>
  <div class="njua" :data-scene="scene" :data-step="step" :data-progress="motion.progress" :data-looping="running" :data-cycle="ambient.cycle">
    <svg viewBox="0 0 880 370" role="img" :aria-label="caption">
      <!-- Distinct schematic operations: local/global attention and token contextualization. -->
      <g v-for="(ring,k) in rings" :key="ring.label" :style="{opacity:scene==='core' ? unpack : 1}">
        <text v-if="scene !== 'core'" :x="ring.x" :y="82" text-anchor="middle" class="strong">{{ ring.label }}</text>
        <g :transform="`translate(${ring.x} ${ring.y}) scale(${ring.r/55})`">
          <g v-if="k===0" class="pet-attention">
            <ellipse v-for="(c,i) in [{x:-28,y:-19},{x:27,y:-13},{x:2,y:29}]" :key="i" :cx="c.x" :cy="c.y" rx="26" ry="24" :stroke="colors[0]" fill="none" stroke-dasharray="2 4" :opacity=".18+.25*(1-attentionMix)" />
            <line v-for="(e,i) in globalEdges" :key="`g${i}`" :x1="e.p.x" :y1="e.p.y" :x2="e.q.x" :y2="e.q.y" :stroke="colors[0]" :opacity=".12+.5*attentionMix" stroke-width="1" />
            <line v-for="(e,i) in localEdges" :key="`l${i}`" :x1="e.p.x" :y1="e.p.y" :x2="e.q.x" :y2="e.q.y" :stroke="colors[0]" :opacity=".22+.55*(1-attentionMix)" stroke-width="1.4" />
            <circle v-for="(p,i) in attentionPoints" :key="i" :cx="p.x" :cy="p.y" :r="3+kick(i)*.7" :fill="colors[0]" />
            <circle v-for="(e,i) in globalEdges" :key="`signal${i}`" :cx="mix(e.p.x,e.q.x,travel(i*.09))" :cy="mix(e.p.y,e.q.y,travel(i*.09))" r="1.9" fill="#e4eaf1" :opacity="spark(i*.09)*attentionMix" />
          </g>
          <g v-else class="object-attention">
            <rect x="-58" y="-52" width="116" height="114" rx="8" class="housing" />
            <g v-for="i in 6" :key="i">
              <line v-for="j in 6" :key="j" x1="-31" :y1="-38+(i-1)*14" x2="31" :y2="-38+(j-1)*14" :stroke="colors[3]" :opacity=".06+.2*kick(i+j)" stroke-width=".8" />
              <rect x="-47" :y="-43+(i-1)*14" width="16" height="10" rx="2" :fill="i>4 ? colors[2] : colors[0]" />
              <rect x="31" :y="-43+(i-1)*14" width="16" height="10" rx="2" :fill="colors[3]" :opacity=".65+.35*kick(i)" />
              <line x1="31" :y1="-38+(i-1)*14" x2="0" y2="49" :stroke="colors[3]" :opacity=".12+.2*kick(i)" stroke-width=".8" />
            </g>
            <rect x="-9" y="42" width="18" height="13" rx="3" :fill="colors[3]" stroke="#e4eaf1" stroke-width="1" />
          </g>
        </g>
      </g>
      <g v-if="scene === 'core'" :style="{opacity:unpack}">
        <path d="M131 170 H201" class="wire" />
        <g v-for="(p,i) in particles" :key="i">
          <circle :cx="p.x" :cy="p.y" r="3" fill="#aebdcd" :style="{opacity:1-reveal(1)*.65}" />

        </g>
        <path d="M20 324 H324 Q403 324 403 236 V183 Q403 160 429 160" class="wire" stroke-dasharray="3 5" />
        <rect v-for="i in 8" :key="i" :x="22+i*20" y="315" width="10" :height="18+kick(i)*7" rx="2" :fill="colors[2]" />
        <path d="M350 170 C392 170 393 146 430 146" class="wire" />
        <g v-for="(path,i) in routes" :key="path" :style="{opacity:.12+.88*reveal(i<3?2:3)}">
          <path :d="path" class="wire" />
          <path :d="path" :stroke="colors[i]" fill="none" pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100*(1-reveal(i<3?2:3,i%3*.16))" stroke-width="2" />
          <path :d="path" stroke="#fff" fill="none" pathLength="100" stroke-dasharray="4 96" :stroke-dashoffset="-100*(ambient.cycle+i*.17)" stroke-width="4" :style="{opacity:.75*reveal(i<3?2:3)}" />
          <circle cx="698" :cy="headY[i]" :r="7+2*kick(i*4)" :fill="colors[i]" />
          <text x="719" :y="headY[i]+5" :fill="colors[i]" class="head-name">{{ names[i] }}</text>
          <text v-if="i>=3" x="719" :y="headY[i]+24" class="small">generation</text>
        </g>
        <g :style="{opacity:reveal(3)}">
          <path d="M316 324 H420 V270 H648 V324 H561 V331 M561 270 V293" fill="none" :stroke="colors[2]" stroke-dasharray="3 5" stroke-width="1.2" />
          <text x="535" y="257" text-anchor="middle" class="tiny">Global context + diffusion time</text>
          <g v-for="i in [3,4]" :key="`decoder${i}`">
            <rect x="488" :y="headY[i]-13" width="146" height="26" rx="5" fill="#23262b" :stroke="colors[i]" stroke-width="1.2" />
            <text x="561" :y="headY[i]+4" text-anchor="middle" class="decoder-label" :fill="colors[i]">{{ i===3 ? 'Particle-set decoder' : 'Target-slot decoder' }}</text>
          </g>
        </g>
      </g>
      <g v-if="scene === 'core'" :style="{opacity:unpack}">
        <text x="77" y="61" text-anchor="middle" class="label">PARTICLES</text>
        <text x="278" y="61" text-anchor="middle" class="strong">Particle features</text>
        <text x="278" y="83" text-anchor="middle" class="tiny">Point-edge Transformer</text>
        <text x="487" y="49" text-anchor="middle" class="strong">Event context</text>
        <text x="487" y="71" text-anchor="middle" class="tiny">Object Encoder</text>
        <text x="278" y="253" text-anchor="middle" class="small">Local + global attention</text>
        <text x="278" y="273" text-anchor="middle" class="tiny">Permutation equivariant</text>
        <text x="510" y="226" text-anchor="middle" class="small">Object context + event summary</text>
        <text x="87" y="358" text-anchor="middle" class="small">Global context</text>
      </g>

      <template v-if="scene !== 'core' && !generation">
        <path d="M137 163 H177 M270 163 H315" class="wire" />
        <path d="M270 163 H315" :stroke="accent" stroke-width="3" pathLength="100" stroke-dasharray="18 82" :stroke-dashoffset="-ambient.cycle*100" :style="{opacity:.35+.65*Math.sin(reveal(1)*Math.PI)}" />
        <g v-for="i in 8" :key="i"><rect :x="35+i*25" y="275" width="12" :height="15+kick(i)*10" rx="2" :fill="colors[2]" /></g>
        <path d="M151 272 H224 V212" class="wire" stroke-dasharray="3 5" />
        <text x="150" y="318" class="small" text-anchor="middle">Particles + global context</text>
        <line x1="332" x2="332" y1="38" y2="351" stroke="#41516a" stroke-opacity=".4" />
      </template>

      <g v-if="scene === 'classification'">
        <text x="360" y="31" class="label">EVENTS BY PROCESS</text>
        <g v-for="(c,i) in [{x:430,y:125},{x:561,y:154},{x:476,y:258}]" :key="i">
          <ellipse :cx="c.x" :cy="c.y" rx="62" ry="51" :fill="colors[i]" fill-opacity=".06" :stroke="colors[i]" stroke-opacity=".25" stroke-dasharray="3 6" />
          <text :x="c.x" :y="c.y-59" class="small" text-anchor="middle" :style="{fill:colors[i]}">{{ ['tt̄','W + jets','Z + jets'][i] }}</text>
        </g>
        <circle v-for="(p,i) in embeddings" :key="i" :cx="p.x" :cy="p.y" :r="2.7+kick(i%24)" :fill="colors[p.group]" fill-opacity=".65" />
        <g :style="{opacity:step ? .65+.35*spark() : 1}" :transform="`translate(${mix(370,436,smooth(reveal(1))*travel())} ${mix(320,120,smooth(reveal(1))*travel())})`">
          <circle r="11" fill="#0b1020" stroke="#fff" stroke-width="2" /><circle r="4" fill="#fff" />
          <text x="17" y="5" class="small" style="fill:white">This event</text>
        </g>
        <g :style="{opacity:reveal(2)}">
          <text x="692" y="87" class="strong" :fill="colors[0]">Probabilities</text>
          <g v-for="(w,i) in [123,38,19]" :key="i">
            <text x="692" :y="125+i*62" class="small">{{ ['tt̄','W + jets','Z + jets'][i] }}</text>
            <rect x="692" :y="136+i*62" :width="w*smooth(reveal(2,i*.12))" :style="{opacity:.65+.35*kick(i*7)}" height="11" rx="2" :fill="colors[i]" />
          </g>
        </g>
      </g>

      <g v-if="scene === 'assignment'">
        <text x="354" y="27" class="label">HADRONIC TOP DECAY</text>
        <path d="M587 63 L447 207 M587 63 L690 131 M690 131 L629 207 M690 131 L755 207" stroke="#8e9cb1" fill="none" stroke-width="1.5" />
        <circle cx="587" cy="63" r="19" class="socket" /><text x="587" y="69" text-anchor="middle">t</text>
        <circle cx="690" cy="131" r="17" class="socket" /><text x="690" y="137" text-anchor="middle">W</text>
        <g v-for="(s,i) in slots" :key="s.label+i">
          <circle :cx="s.x" cy="207" :r="19+2*kick(i*8)" class="socket" :style="{stroke:reveal(2)>.6?colors[1]:'#8291a7'}" />
          <text :x="s.x" y="213" text-anchor="middle">{{ s.label }}</text>
          <path :d="`M${jetX(s.jet)} 317 C${jetX(s.jet)} 270 ${s.x} 270 ${s.x} 226`" fill="none" :stroke="colors[1]" stroke-width="2.5" pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100*(1-smooth(reveal(2,i*.15)))" />
          <circle :cx="mix(jetX(s.jet),s.x,smooth(travel(i*.12)))" :cy="jetSignalY(travel(i*.12))" r="4" :fill="colors[1]" :style="{opacity:reveal(2)*spark(i*.12)}" />
        </g>
        <g :style="{opacity:reveal(1)*(1-reveal(2))}">
          <path v-for="i in 6" :key="i" :d="`M${jetX(i-1)} 306 Q${jetX(i-1)} 256 ${slots[(i-1)%3].x} 226`" fill="none" stroke="#e7b966" stroke-opacity=".27" stroke-dasharray="3 6" />
          <rect :x="351+430*travel()" :style="{opacity:.3+.7*spark()}" y="297" width="41" height="38" rx="4" fill="#e7b966" fill-opacity=".12" stroke="#e7b966" />
          <text x="367" y="271" class="small">Score candidate combinations</text>
        </g>
        <g v-for="i in 6" :key="i">
          <circle :cx="jetX(i-1)" cy="317" r="8" :fill="reveal(2)>.6 && [1,3,5].includes(i)?colors[1]:'#8798ad'" />
          <text :x="jetX(i-1)" y="346" text-anchor="middle" class="small">j{{ i }}</text>
        </g>
        <text x="362" y="79" class="small" :style="{opacity:reveal(2)}">j₁ + j₃ + j₅</text>
      </g>

      <g v-if="scene === 'segmentation'">
        <text x="353" y="27" class="label">INPUT PARTICLES</text><text x="640" y="27" class="label">RESONANCE + MEMBERSHIP</text>
        <g v-for="(q,k) in queries" :key="k" :style="{opacity:queryReveal(k)}">
          <path :d="q.outline" :fill="q.color" fill-opacity=".045" :stroke="q.color" :stroke-width="1.5+kick(k*8)" stroke-dasharray="4 5" :stroke-dashoffset="-ambient.cycle*27" />
          <path :d="`M${q.x+59} ${q.y} C608 ${q.y} 589 ${83+k*101} 633 ${83+k*101}`" fill="none" :stroke="q.color" pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100*(1-queryReveal(k))" />
          <circle cx="650" :cy="83+k*101" r="15" fill="#0b1020" :stroke="q.color" /><text x="650" :y="88+k*101" text-anchor="middle" class="small">{{ k+1 }}</text>
          <text x="680" :y="89+k*101" class="strong" :fill="q.color">{{ q.label }}</text>
          <rect v-for="i in 12" :key="i" :x="640+(i-1)*16" :y="109+k*101" width="11" height="15" rx="1" :fill="q.color" :style="{opacity:q.ids.includes(i-1)?queryPulse(k):.1}" />
        </g>
        <g v-for="i in 12" :key="i">
          <circle :cx="tokenX(i-1)" :cy="tokenY(i-1)" :r="7+kick(i-1)*2" :fill="memberColor(i-1)" />
          <text :x="tokenX(i-1)" :y="tokenY(i-1)+23" text-anchor="middle" class="tiny">{{ i }}</text>
        </g>
        <text x="640" y="345" class="small">Columns: particles 1–12</text>
      </g>

      <g v-if="generation">
        <text x="140" y="30" text-anchor="middle" class="label">{{ scene==='self'?'NOISED PARTICLE FEATURES':'OBSERVED EVENT' }}</text>
        <text x="430" y="30" text-anchor="middle" class="label">{{ scene==='self'?'DENOISING':'CONDITIONAL DIFFUSION' }}</text>
        <text x="735" y="30" text-anchor="middle" class="label">{{ scene==='self'?'GENERATED FEATURES':'INVISIBLE COMPONENTS' }}</text>
        <template v-if="scene==='self'">
          <rect x="72" y="78" width="136" height="151" rx="10" class="housing" />
          <circle v-for="i in 18" :key="i" :cx="clean(i,140).x + (perturbedIds.includes(i) ? Math.cos(i)*19 : 0)" :cy="clean(i,140).y + (perturbedIds.includes(i) ? Math.sin(i)*19 : 0)" r="3.8" :fill="perturbedIds.includes(i)?colors[3]:'#d8e3ef'" class="input-particle" />
          <text x="140" y="263" text-anchor="middle" class="small">Partial noising shown: event completion</text>
        </template>
        <template v-else>
          <rect x="72" y="78" width="136" height="151" rx="10" class="housing" />
          <circle v-for="i in 18" :key="i" :cx="clean(i,140).x" :cy="clean(i,140).y" r="3.8" fill="#d8e3ef" class="input-particle" />
        </template>
        <path d="M208 153 H344 M516 153 H652" class="wire" />
        <path d="M208 153 H344" :stroke="accent" fill="none" stroke-width="3" pathLength="100" stroke-dasharray="8 42" :stroke-dashoffset="-ambient.cycle*100" />
        <circle cx="430" cy="153" r="79" class="housing" />
        <g :transform="`rotate(${ambient.cycle*360} 430 153)`">
          <circle cx="430" cy="153" r="85" fill="none" :stroke="accent" stroke-width="2" stroke-dasharray="30 8" />
        </g>
        <foreignObject x="380" y="118" width="100" height="28"><div xmlns="http://www.w3.org/1999/xhtml" class="evenet-wordmark gradient-animated njua-brand">EveNet</div></foreignObject>
        <text x="430" y="167" text-anchor="middle" class="strong" :fill="accent">Diffusion</text>
        <text x="430" y="191" text-anchor="middle" class="tiny">Particle + global context</text>
        <text x="430" y="285" text-anchor="middle" class="strong" :fill="accent">{{ scene==='self' ? 'Unordered particle set' : 'Distinct invisible target slots' }}</text>
        <text x="430" y="310" text-anchor="middle" class="small">{{ scene==='self' ? 'Particle count · no slot embeddings' : 'Learned slot embeddings · fixed visible context' }}</text>
        <g v-if="scene==='self'" :style="{opacity:reveal(1)}">
          <rect x="662" y="78" width="146" height="151" rx="10" class="housing" />
          <circle v-for="i in 18" :key="`restored-${i}`" :cx="clean(i,735).x" :cy="clean(i,735).y" :r="3.6+kick(i)*.5" :fill="perturbedIds.includes(i)?colors[3]:'#d8e3ef'" />
          <circle v-for="i in 5" :key="`travel-${i}`" :cx="mix(516,clean(perturbedIds[i-1],735).x,smooth(travel((i-1)*.14)))" :cy="mix(153,clean(perturbedIds[i-1],735).y,smooth(travel((i-1)*.14)))" r="4" :fill="colors[3]" :style="{opacity:spark((i-1)*.14)}" />
        </g>
        <g v-if="scene==='supervised'" :style="{opacity:reveal(1)}">
          <rect x="644" y="66" width="182" height="176" rx="10" class="housing" />
          <path d="M673 210 H802 M673 210 V95" class="wire" />
          <text x="808" y="214" class="tiny">ν₁</text><text x="673" y="87" text-anchor="middle" class="tiny">ν₂</text>
          <g v-for="r in [16,30,45]" :key="r" :style="{opacity:.25+.75*reveal(1)}">
            <ellipse cx="726" cy="150" :rx="r" :ry="r*.55" fill="none" :stroke="colors[4]" stroke-width="1.5" stroke-dasharray="3 4" />
            <ellipse cx="771" cy="178" :rx="r*.55" :ry="r*.32" fill="none" :stroke="colors[0]" stroke-width="1.2" stroke-dasharray="2 4" />
          </g>
          <circle cx="726" cy="150" r="6" :fill="colors[4]" :style="{opacity:.55+.45*kick(3)}" />
          <circle cx="771" cy="178" r="6" :fill="colors[0]" :style="{opacity:.55+.45*kick(9)}" />
          <circle v-for="i in 3" :key="i" :cx="mix(516,i===1?771:726,smooth(travel(i*.2)))" :cy="mix(153,i===1?178:150,smooth(travel(i*.2)))" r="4" :fill="accent" :style="{opacity:spark(i*.2)}" />
          <text x="735" y="278" text-anchor="middle" class="small" :style="{fill:accent}">Example: neutrino momenta</text>
        </g>
      </g>
      <!-- The shell opens on the single click; the same ambient clock keeps data flowing. -->
      <g v-if="scene==='core'" class="model-shell" :style="{opacity:1-unpack, pointerEvents:unpack>.99?'none':'auto'}">
        <text x="22" y="69" class="label">EVENT INPUT</text>
        <circle v-for="(p,i) in particles" :key="i" :cx="p.x" :cy="p.y" :r="3+kick(i)" fill="#d8e3ef" />
        <path d="M133 170 H201 M20 324 H173 Q190 324 190 292 V250 H201" class="wire" />
        <path d="M133 170 H201 M20 324 H173 Q190 324 190 292 V250 H201" stroke="#c3ceda" fill="none" stroke-width="3" pathLength="100" stroke-dasharray="9 91" :stroke-dashoffset="-ambient.cycle*100" :style="{opacity:.8}" />
        <text x="22" y="352" class="small">Global conditions</text>
        <g v-for="i in 2" :key="i" :transform="`translate(0 ${(i===1?-1:1)*unpack*145})`">
          <path :d="i===1?'M201 180 V87 L223 65 H617 L639 87 V180 Z':'M201 180 V273 L223 295 H617 L639 273 V180 Z'" fill="#23262b" />
          <path :d="i===1?'M201 178 V87 L223 65 H617 L639 87 V178':'M201 182 V273 L223 295 H617 L639 273 V182'" fill="none" stroke="#9aa7b8" stroke-width="1.5" />
          <path :d="i===1?'M211 124 V93 L229 75 H280 M560 75 H611 L629 93 V124':'M211 236 V267 L229 285 H280 M560 285 H611 L629 267 V236'" fill="none" stroke="#c3ceda" stroke-width="3" :style="{opacity:.5+.5*kick(i*8)}" />
          <line v-for="j in 9" :key="j" :x1="294+j*25" :x2="304+j*25" :y1="i===1?83:277" :y2="i===1?83:277" stroke="#778391" />
          <path :d="i===1?'M225 110 H260 L278 128 H325 M615 110 H580 L562 128 H515':'M225 250 H260 L278 232 H325 M615 250 H580 L562 232 H515'" fill="none" stroke="#586370" stroke-width="1" />
        </g>
        <g :style="{opacity:1-clamp(unpack*2)}">
          <image :href="eveNetLogo" x="300" y="120" width="64" height="64" aria-label="EveNet logo" />
          <foreignObject x="382" y="125" width="175" height="58"><div xmlns="http://www.w3.org/1999/xhtml" class="evenet-wordmark gradient-animated njua-brand njua-brand-shell">EveNet</div></foreignObject>
          <text x="420" y="196" text-anchor="middle" class="small">One model · five tasks</text>
          <g v-for="i in 16" :key="i"><rect :x="300+i*14" y="215" width="6" :height="4+kick(i)*10" :fill="colors[(i-1)%5]" rx="1" /></g>
        </g>
        <g v-for="(y,i) in headY" :key="i" :style="{opacity:.75+.25*kick(i*4)}">
          <path :d="`M639 180 C668 180 665 ${y} 695 ${y}`" class="wire" />
          <path :d="`M639 180 C668 180 665 ${y} 695 ${y}`" :stroke="colors[i]" fill="none" stroke-width="2.5" pathLength="100" stroke-dasharray="10 90" :stroke-dashoffset="-100*(ambient.cycle+i*.16)" />
          <circle cx="702" :cy="y" :r="5+kick(i*4)*2" :fill="colors[i]" />
          <text x="720" :y="y+5" class="small" :style="{fill:colors[i]}">{{ ['Process probabilities','Decay matches','Particle groups','Event generation','Invisible components'][i] }}</text>
        </g>
      </g>
    </svg>
    <div class="njua-footer"><div class="njua-caption" aria-live="polite">{{ caption }}</div><span class="njua-note">Schematic</span></div>
  </div>
</template>

<style scoped>
.njua-brand { display:inline-block; width:100%; text-align:center; font-size:18px; line-height:28px; font-weight:550; }
.njua-brand-shell { text-align:left; font-size:43px; line-height:58px; font-weight:650; }
.njua { width:100%; margin-top:26px; }
.njua[data-scene="core"] { margin-top:26px; }
.njua[data-scene="core"] svg { height:340px; }
svg { display:block; width:100%; height:340px; overflow:visible; fill:#e4eaf1; }
svg text { font-family:inherit; font-size:17px; }
svg .strong { font-size:18px; font-weight:550; }
svg .decoder-label { font-size:13px; font-weight:550; }
svg .head-name { font-size:16px; font-weight:550; }
svg .small { font-size:13px; fill:#a8b5c7; }
svg .tiny { font-size:11px; fill:#a8b5c7; }
svg .label { font-size:10px; letter-spacing:1.2px; fill:#a8b5c7; }
.wire { fill:none; stroke:#6f859b; stroke-width:1.3; }
.housing { fill:#101827; stroke:#728298; stroke-opacity:.28; stroke-width:1; }
.socket { fill:#101827; stroke:#a0aec1; stroke-width:1.5; }
.njua-footer { display:flex; align-items:baseline; justify-content:space-between; gap:24px; margin-top:16px; padding-top:14px; border-top:1px solid #ffffff18; }
.njua-caption { font-size:21px; font-weight:450; letter-spacing:-.02em; line-height:1.35; }
.njua-note { flex-shrink:0; color:#a8b5c7; font-size:11px; }
</style>
