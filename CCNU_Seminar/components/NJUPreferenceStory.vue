<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ step: number }>()
const canvas = ref<HTMLCanvasElement>()
const { $nav, $page, $renderContext } = useSlideContext()
const reduced = ref(false)
const hidden = ref(false)
const active = computed(() => $nav.value.currentPage === $page.value && $renderContext.value === 'slide' && !reduced.value && !hidden.value)
const stage = computed(() => Math.min(Math.max(props.step, 0), 2))

const steps = [
  {
    name: 'Naive approach: regression',
    body: 'One predicted number sits between the true answers. The average is often not a solution.',
  },
  {
    name: 'A generator can keep both',
    body: 'It can put probability on both peaks. The rare peak is still almost empty.',
  },
  {
    name: 'A reward fills the empty peak',
    body: 'Score the samples. Put more weight on the ones that land on the true peaks.',
  },
]

let media: MediaQueryList | undefined
let frame = 0
let last = 0
let time = 0
let shown = stage.value
let ctx: CanvasRenderingContext2D | null = null
const W = 760
const H = 460
const left = { x: -150, z: 22 }
const right = { x: 156, z: -8 }
const valley = { x: 4, z: 6 }

function gauss(x: number, z: number, cx: number, cz: number, s: number) {
  const dx = x - cx
  const dz = z - cz
  return Math.exp(-(dx * dx + dz * dz) / (2 * s * s))
}

function truthHeight(x: number, z: number) {
  return gauss(x, z, left.x, left.z, 34) * 168 + gauss(x, z, right.x, right.z, 36) * 160
}

function learnedHeight(x: number, z: number, breath: number) {
  const spike = gauss(x, z, valley.x, valley.z, 16 + breath * 2) * (210 + 12 * breath)
  const learned = gauss(x, z, left.x, left.z, 40) * (150 + 10 * breath)
    + gauss(x, z, right.x, right.z, 78) * 42
    + gauss(x, z, valley.x, valley.z, 52) * 28
  const refined = gauss(x, z, left.x, left.z, 36) * 162 + gauss(x, z, right.x, right.z, 38) * 154
  const value = [spike, learned, refined]
  const index = Math.min(1, Math.floor(shown))
  const blend = shown - index
  const smooth = blend * blend * (3 - 2 * blend)
  return value[index] * (1 - smooth) + value[Math.min(2, index + 1)] * smooth
}

function view(x: number, z: number, h: number): [number, number] {
  return [352 + x * 0.84 + z * 0.36, 318 + z * 0.38 - h * 0.86]
}

function line(points: number[][], color: string, width = 1) {
  if (!ctx || points.length < 2) return
  ctx.beginPath()
  points.forEach((p, i) => i ? ctx!.lineTo(p[0], p[1]) : ctx!.moveTo(p[0], p[1]))
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.stroke()
}

function bloom(x: number, z: number, radius: number, alpha: number) {
  if (!ctx || alpha < 0.01) return
  const p = view(x, z, truthHeight(x, z))
  const glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], radius)
  glow.addColorStop(0, `rgba(214,255,236,${alpha})`)
  glow.addColorStop(0.35, `rgba(112,220,178,${alpha * 0.35})`)
  glow.addColorStop(1, 'rgba(112,220,178,0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(p[0], p[1], radius, 0, Math.PI * 2)
  ctx.fill()
}

function onPlane(x: number, z: number, lift = 0): [number, number] {
  return view(x, z, truthHeight(x, z) + lift)
}

function ring(cx: number, cz: number, radius: number, turn: number) {
  const pts = Array.from({ length: 56 }, (_, i) => {
    const a = i / 55 * Math.PI * 2
    return onPlane(cx + Math.cos(a) * radius, cz + Math.sin(a) * radius * 0.7)
  })
  line(pts, 'rgba(158,198,224,.16)', 0.7)
  const arc = Array.from({ length: 10 }, (_, k) => {
    const a = turn - k * 0.09
    return onPlane(cx + Math.cos(a) * radius, cz + Math.sin(a) * radius * 0.7, 2)
  })
  line(arc, 'rgba(255,228,176,.85)', 1.7)
  const head = arc[0]
  if (!ctx || !head) return
  ctx.beginPath()
  ctx.arc(head[0], head[1], 1.8, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,236,196,.95)'
  ctx.fill()
}

function sparks(cx: number, cz: number, count: number, color: string, speed: number, radius0: number) {
  for (let i = 0; i < count; i++) {
    const radius = radius0 + (i % 5) * 7
    const angle = time * speed + i * 2.39996
    const trail = Array.from({ length: 7 }, (_, k) => {
      const a = angle - k * 0.07
      return onPlane(cx + Math.cos(a) * radius, cz + Math.sin(a) * radius * 0.7, 4)
    })
    line(trail, color, 1.1)
    const head = trail[0]
    if (!ctx || !head) continue
    ctx.beginPath()
    ctx.arc(head[0], head[1], 1.7, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }
}

function home(i: number, mode: number, clock: number) {
  const angle = i * 2.39996 + clock * 0.05
  if (mode <= 0) return { x: valley.x, z: valley.z, alpha: 0 }
  if (mode === 1) {
    if (i < 18) {
      const radius = 14 + (i % 6) * 6
      return { x: left.x + Math.cos(angle) * radius, z: left.z + Math.sin(angle) * radius * 0.72, alpha: 0.9 }
    }
    if (i < 23) {
      const radius = 8 + (i % 3) * 7
      return { x: valley.x + Math.cos(angle) * radius, z: valley.z + Math.sin(angle) * radius, alpha: 0.32 }
    }
    const radius = 26 + (i % 4) * 9
    return { x: right.x + Math.cos(angle) * radius, z: right.z + Math.sin(angle) * radius * 0.8, alpha: 0.22 }
  }
  const center = i < 16 ? left : right
  const radius = 12 + (i % 5) * 5
  return { x: center.x + Math.cos(angle) * radius, z: center.z + Math.sin(angle) * radius * 0.72, alpha: 0.92 }
}

function render() {
  if (!ctx) return
  const breath = reduced.value ? 0.35 : 0.5 - 0.5 * Math.cos(time * Math.PI / 7)
  const reward = Math.max(0, Math.min(1, shown - 1))
  const pulse = reduced.value ? 1 : 0.82 + 0.18 * Math.sin(time * 2.4)
  ctx.clearRect(0, 0, W, H)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  bloom(right.x, right.z, 92 + 14 * pulse, 0.5 * reward * pulse)
  bloom(left.x, left.z, 70, 0.16 * reward * pulse)

  for (let z = -200; z <= 190; z += 12) {
    const row = Array.from({ length: 64 }, (_, i) => {
      const x = -292 + i * 9.3
      return view(x, z, truthHeight(x, z))
    })
    const back = Array.from({ length: 64 }, (_, i) => {
      const x = 292 - i * 9.3
      return view(x, z + 12, truthHeight(x, z + 12))
    })
    ctx.beginPath()
    ;[...row, ...back].forEach((p, i) => i ? ctx!.lineTo(p[0], p[1]) : ctx!.moveTo(p[0], p[1]))
    ctx.closePath()
    ctx.fillStyle = 'rgba(27,28,31,.8)'
    ctx.fill()
    const crest = truthHeight(0, z)
    line(row, crest > 70 ? 'rgba(198,220,236,.62)' : 'rgba(150,178,204,.3)', 0.85)
  }
  for (let x = -292; x <= 292; x += 18) {
    line(Array.from({ length: 50 }, (_, i) => {
      const z = -200 + i * 8
      return view(x, z, truthHeight(x, z))
    }), 'rgba(176,198,216,.16)', 0.6)
  }

  const turn = reduced.value ? 0.4 : time * 0.55
  for (const peak of [left, right]) {
    ring(peak.x, peak.z, 28, turn + (peak === right ? 1.7 : 0))
    ring(peak.x, peak.z, 52, -turn * 0.7 + (peak === right ? 0.6 : 2.2))
  }
  sparks(left.x, left.z, 8, 'rgba(255,220,160,.55)', 0.35, 18)
  sparks(right.x, right.z, reward > 0.05 ? 10 : 5, reward > 0.05 ? 'rgba(186,244,214,.8)' : 'rgba(255,220,160,.4)', 0.55 + reward * 0.4, 16)

  for (let z = -200; z <= 190; z += 12) {
    for (let i = 0; i < 63; i++) {
      const x0 = -292 + i * 9.3
      const x1 = x0 + 9.3
      const wave = reduced.value ? 1 : 0.62 + 0.38 * Math.sin(time * 1.7 + x0 * 0.02 + z * 0.02)
      const shine = (learnedHeight(x0, z, breath) + learnedHeight(x1, z, breath)) / 2 / 220 * wave
      if (shine < 0.16) continue
      line(
        [view(x0, z, truthHeight(x0, z)), view(x1, z, truthHeight(x1, z))],
        `rgba(255,214,140,${Math.min(0.92, shine * 1.15)})`,
        2.4,
      )
    }
  }

  const appear = Math.min(1, Math.max(0, shown))
  for (let i = 0; i < 32; i++) {
    const fromMode = Math.floor(shown)
    const toMode = Math.min(2, Math.ceil(shown))
    const from = home(i, fromMode, time)
    const to = home(i, toMode, time)
    const blend = shown - fromMode
    const x = from.x + (to.x - from.x) * blend
    const z = from.z + (to.z - from.z) * blend
    const alpha = (from.alpha + (to.alpha - from.alpha) * blend) * appear
    if (alpha < 0.04) continue
    const trail = [0, 1, 2, 3].map((k) => {
      const earlier = home(i, fromMode, time - k * 0.08)
      const later = home(i, toMode, time - k * 0.08)
      return onPlane(earlier.x + (later.x - earlier.x) * blend, earlier.z + (later.z - earlier.z) * blend, 5)
    })
    line(trail, `rgba(255,214,140,${alpha * 0.45})`, 1.2)
    const point = trail[0]
    if (!point) continue
    ctx.beginPath()
    ctx.arc(point[0], point[1], 2.2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,228,176,${alpha})`
    ctx.fill()
  }

  if (reward > 0.04) {
    for (let i = 0; i < 8; i++) {
      const u = ((reduced.value ? 0.35 : time * 0.42) + i / 8) % 1
      const lift = Math.sin(Math.PI * u)
      const x = valley.x + (right.x - valley.x) * u
      const z = valley.z + (right.z - valley.z) * u
      const prevU = Math.max(0, u - 0.045)
      const tail = onPlane(valley.x + (right.x - valley.x) * prevU, valley.z + (right.z - valley.z) * prevU, 8 + Math.sin(Math.PI * prevU) * 10)
      const head = onPlane(x, z, 8 + lift * 10)
      line([tail, head], `rgba(186,244,214,${reward * lift})`, 1.8)
      ctx.beginPath()
      ctx.arc(head[0], head[1], 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(214,255,236,${reward * lift})`
      ctx.fill()
    }
  }

  const marker = Math.max(0, 1 - shown * 1.25)
  if (marker > 0.02) {
    const top = view(valley.x, valley.z, truthHeight(valley.x, valley.z) + 8)
    const foot = view(valley.x, valley.z, 0)
    line([foot, top], `rgba(246,156,171,${0.45 * marker})`, 1.2)
    ctx.beginPath()
    ctx.arc(top[0], top[1], 7, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(246,156,171,${0.95 * marker})`
    ctx.lineWidth = 1.7
    ctx.stroke()
    line([[top[0] - 4.5, top[1]], [top[0] + 4.5, top[1]]], `rgba(246,156,171,${marker})`, 1.5)
    line([[top[0], top[1] - 4.5], [top[0], top[1] + 4.5]], `rgba(246,156,171,${marker})`, 1.5)
  }
}

function tick(stamp: number) {
  if (!active.value) { frame = 0; return }
  frame = requestAnimationFrame(tick)
  if (stamp - last < 33) return
  const dt = last ? Math.min((stamp - last) / 1000, 0.1) : 0.033
  if (!reduced.value) time += dt
  const target = Math.min(Math.max(props.step, 0), 2)
  shown += (target - shown) * Math.min(1, Math.max(dt, 0.016) * 4)
  if (Math.abs(target - shown) < 0.004) shown = target
  last = stamp
  render()
}

function sync() {
  if (!active.value) {
    cancelAnimationFrame(frame)
    frame = 0
    shown = Math.min(Math.max(props.step, 0), 2)
    render()
    return
  }
  if (!frame) frame = requestAnimationFrame(tick)
}

function motionChange() { reduced.value = !!media?.matches }
function visibility() { hidden.value = document.hidden }
onMounted(() => {
  const node = canvas.value
  if (!node) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  node.width = W * dpr
  node.height = H * dpr
  ctx = node.getContext('2d')
  ctx?.scale(dpr, dpr)
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', motionChange)
  document.addEventListener('visibilitychange', visibility)
  motionChange()
  visibility()
  sync()
})
watch(active, sync)
watch(stage, sync)
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  media?.removeEventListener('change', motionChange)
  document.removeEventListener('visibilitychange', visibility)
})
</script>

<template>
  <section class="pref-plan" :data-step="stage">
    <ol class="pref-steps">
      <li v-for="(item, index) in steps" :key="item.name" :data-on="stage === index">
        <h2>{{ item.name }}</h2>
        <p>{{ item.body }}</p>
      </li>
    </ol>
    <div class="pref-field">
      <canvas ref="canvas" aria-hidden="true" />
      <ul class="pref-key">
        <li><i class="swatch truth" /> Truth <LaTeX formula="p(z \mid x)" /></li>
        <li>
          <i class="swatch model" />
          <template v-if="stage === 0">Regression <LaTeX formula="\hat{z}(x)" /></template>
          <template v-else>Learned <LaTeX formula="p_\theta(z \mid x)" /></template>
        </li>
        <li v-if="stage === 2" class="live"><i class="swatch reward" /> Reward <LaTeX formula="R" /></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pref-plan { display:grid; grid-template-columns:minmax(300px, 360px) 1fr; gap:8px; height:372px; margin-top:10px; align-items:center; }
.pref-steps { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; justify-content:center; gap:22px; }
.pref-steps li { margin:0; padding-left:14px; border-left:1px solid transparent; }
.pref-steps li[data-on="true"] { border-left-color:#f0c36e; }
.pref-steps h2 { margin:0; font-size:18px; line-height:1.25; font-weight:550; letter-spacing:-.02em; color:#9aa3ad; }
.pref-steps li[data-on="true"] h2 { color:#f0c36e; }
.pref-steps p { margin:6px 0 0; font-size:14px; line-height:1.45; color:#7f8792; }
.pref-steps li[data-on="true"] p { color:#d5dbe3; }
.pref-field { position:relative; height:100%; overflow:hidden; }
.pref-field canvas { display:block; width:118%; height:112%; margin-left:-4%; margin-top:2%; }
.pref-key { position:absolute; top:0; left:8px; right:8px; display:flex; flex-wrap:wrap; gap:8px 16px; margin:0; padding:0; list-style:none; font-size:13px; line-height:1.2; color:#d5dbe3; }
.pref-key li { display:flex; align-items:center; gap:6px; }
.pref-key li.live { color:#8ee0c0; }
.swatch { width:16px; height:2px; border-radius:1px; display:block; }
.swatch.truth { background:#b7d4ea; }
.swatch.model { background:#ffd68c; }
.swatch.reward { width:8px; height:8px; border-radius:50%; background:#a8ecce; box-shadow:0 0 8px #70dcb2; }
@media (prefers-reduced-motion: reduce) {
  .pref-field canvas { transition:none; }
}
</style>
