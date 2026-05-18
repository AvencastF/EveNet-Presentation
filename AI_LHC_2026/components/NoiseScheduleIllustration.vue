<script setup lang="ts">
  import { computed, ref, onMounted, onBeforeUnmount } from "vue"
  
  type Schedule = "cosine" | "linear" | "quadratic" | "sigmoid"
  
  const props = withDefaults(
    defineProps<{
      width?: number
      height?: number
      pad?: number
      samples?: number
      schedule?: Schedule
  
      /** neon color (rgb without alpha) */
      neonRGB?: string
  
      /** loop duration in ms */
      durationMs?: number
  
      /** show area fill under curve */
      fillArea?: boolean
  
      /** number of emitted particles */
      particles?: number
    }>(),
    {
      width: 140,
      height: 70,
      pad: 10,
      samples: 160,
      schedule: "cosine",
      neonRGB: "34, 211, 238", // cyan
      durationMs: 1600,
      fillArea: true,
      particles: 10,
    },
  )
  
  const W = computed(() => props.width)
  const H = computed(() => props.height)
  
  const pad = computed(() => props.pad)
  const innerX = computed(() => pad.value)
  const innerY = computed(() => pad.value)
  const innerW = computed(() => W.value - pad.value * 2)
  const innerH = computed(() => H.value - pad.value * 2)
  
  function clamp01(x: number) {
    return Math.max(0, Math.min(1, x))
  }
  
  /** We animate along a “noise level” curve (0→1). */
  function noiseLevel(t: number, schedule: Schedule): number {
    const x = clamp01(t)
    switch (schedule) {
      case "cosine":
        return 1 - Math.cos((Math.PI * x) / 2) // 0 -> 1 (your original)
      case "linear":
        return x
      case "quadratic":
        return x * x
      case "sigmoid": {
        const k = 10
        const s = 1 / (1 + Math.exp(-k * (x - 0.5)))
        const s0 = 1 / (1 + Math.exp(-k * (0 - 0.5)))
        const s1 = 1 / (1 + Math.exp(-k * (1 - 0.5)))
        return (s - s0) / (s1 - s0)
      }
    }
  }
  
  const neon = computed(() => props.neonRGB)
  const stroke = computed(() => `rgba(${neon.value}, 0.92)`)
  const strokeSoft = computed(() => `rgba(${neon.value}, 0.28)`)
  const fillTop = computed(() => `rgba(${neon.value}, 0.22)`)
  const fillBot = computed(() => `rgba(${neon.value}, 0.06)`)
  
  const gradientId = computed(() => `ng-${Math.random().toString(16).slice(2)}`)
  const glowId = computed(() => `gl-${Math.random().toString(16).slice(2)}`)
  const gridId = computed(() => `gr-${Math.random().toString(16).slice(2)}`)
  
  const pts = computed(() => {
    const n = Math.max(16, props.samples)
    const arr: Array<{ x: number; y: number; t: number }> = []
    for (let i = 0; i <= n; i++) {
      const t = i / n
      const nl = noiseLevel(t, props.schedule)
      const x = innerX.value + t * innerW.value
      const y = innerY.value + innerH.value - nl * innerH.value
      arr.push({ x, y, t })
    }
    return arr
  })
  
  const pathData = computed(() =>
    pts.value.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" "),
  )
  
  const areaPath = computed(() => {
    const last = pts.value[pts.value.length - 1]
    const baseY = innerY.value + innerH.value
    return `${pathData.value} L ${last.x} ${baseY} L ${innerX.value} ${baseY} Z`
  })
  
  /** loop animation t in [0,1] */
  const tAnim = ref(0)
  let raf = 0
  let t0 = 0
  function loop(ts: number) {
    if (!t0) t0 = ts
    const dt = ts - t0
    const u = (dt % props.durationMs) / props.durationMs
    tAnim.value = u
    raf = requestAnimationFrame(loop)
  }
  onMounted(() => {
    raf = requestAnimationFrame(loop)
  })
  onBeforeUnmount(() => cancelAnimationFrame(raf))
  
  /** sample point along curve for the scanner */
  function sampleAt(t: number) {
    const n = pts.value.length - 1
    const x = clamp01(t) * n
    const i = Math.floor(x)
    const f = x - i
    const p0 = pts.value[Math.max(0, Math.min(n, i))]
    const p1 = pts.value[Math.max(0, Math.min(n, i + 1))]
    return {
      x: p0.x + (p1.x - p0.x) * f,
      y: p0.y + (p1.y - p0.y) * f,
    }
  }
  
  const head = computed(() => sampleAt(tAnim.value))
  const trail = computed(() => {
    // short trail behind the scanner (t - window)
    const window = 0.14
    const steps = 24
    const arr: Array<{ x: number; y: number; a: number }> = []
    for (let k = 0; k < steps; k++) {
      const tt = clamp01(tAnim.value - (window * (steps - 1 - k)) / (steps - 1))
      const p = sampleAt(tt)
      const a = (k + 1) / steps
      arr.push({ ...p, a })
    }
    return arr
  })
  
  /** simple particle burst emitted from scanner */
  const particleSeeds = computed(() =>
    Array.from({ length: props.particles }, (_, i) => ({
      id: i,
      // deterministic-ish phase offsets
      phase: (i / Math.max(1, props.particles)) * 0.8 + 0.1,
      r: 0.8 + (i % 3) * 0.5,
      ang: (i * 2.3999632297) % (Math.PI * 2), // golden angle-ish
    })),
  )
  
  const particlesNow = computed(() => {
    const base = head.value
    return particleSeeds.value.map((p) => {
      // particle “age” within the loop, centered near the scanner
      let a = (tAnim.value - p.phase) / 0.22
      if (a < 0) a += 1 / 0.22 // wrap
      const age = clamp01(a)
      const speed = 10 + p.id * 0.6
      const dx = Math.cos(p.ang) * speed * age
      const dy = Math.sin(p.ang) * speed * age
      return {
        id: p.id,
        x: base.x + dx,
        y: base.y + dy,
        opacity: (1 - age) * 0.85,
        r: p.r * (1 - age * 0.6),
      }
    })
  })
  </script>
  
  <template>
    <svg :width="W" :height="H" class="ns" role="img" aria-hidden="true">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="fillTop" />
          <stop offset="100%" :stop-color="fillBot" />
        </linearGradient>
  
        <filter :id="glowId" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
  
        <pattern :id="gridId" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" :stroke="strokeSoft" stroke-width="0.6" opacity="0.18" />
        </pattern>
      </defs>
  
      <!-- glass panel (no text) -->
      <rect x="0" y="0" :width="W" :height="H" rx="12" class="panel" />
      <rect x="0" y="0" :width="W" :height="H" rx="12" :fill="`url(#${gridId})`" opacity="0.6" />
  
      <!-- fill -->
      <path v-if="fillArea" :d="areaPath" :fill="`url(#${gradientId})`" opacity="0.95" />
  
      <!-- base curve glow -->
      <path
        :d="pathData"
        :stroke="stroke"
        stroke-width="4.0"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.22"
        :filter="`url(#${glowId})`"
      />
  
      <!-- curve -->
      <path
        :d="pathData"
        :stroke="stroke"
        stroke-width="2.4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
  
      <!-- moving trail (noise being “taken”) -->
      <path
        v-if="trail.length"
        :d="trail.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')"
        :stroke="stroke"
        stroke-width="3.2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.35"
        :filter="`url(#${glowId})`"
        class="trail"
      />
  
      <!-- scanner head -->
      <circle :cx="head.x" :cy="head.y" r="3.2" :fill="stroke" :filter="`url(#${glowId})`" />
      <circle :cx="head.x" :cy="head.y" r="7.5" :fill="stroke" opacity="0.08" />
  
      <!-- emitted particles -->
      <circle
        v-for="p in particlesNow"
        :key="p.id"
        :cx="p.x"
        :cy="p.y"
        :r="p.r"
        :fill="stroke"
        :opacity="p.opacity"
      />
    </svg>
  </template>
  
  <style scoped>
  .ns {
    overflow: visible;
    background: transparent;
  }
  
  /* dark glass */
  .panel {
    fill: rgba(7, 10, 18, 0.72);
    stroke: rgba(255, 255, 255, 0.06);
    stroke-width: 1;
  }
  
  /* slightly shimmering trail */
  .trail {
    animation: shimmer 1.2s linear infinite;
  }
  @keyframes shimmer {
    0% {
      opacity: 0.22;
    }
    50% {
      opacity: 0.45;
    }
    100% {
      opacity: 0.22;
    }
  }
  </style>