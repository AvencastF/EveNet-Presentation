<script setup lang="ts">
type Pt = { x: number; y: number; noise: number }

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    steps?: number
    seed?: number
    duration?: number
    points?: number

    showForward?: boolean
    showContours?: boolean
    showVectors?: boolean
    showSchedule?: boolean

    contourSteps?: number[]
    vectorSteps?: number[]
    vectorCount?: number
  }>(),
  {
    width: 520,
    height: 360,
    steps: 7,
    seed: 42,
    duration: 4.0,
    points: 22,

    showForward: true,
    showContours: true,
    showVectors: true,
    showSchedule: true,

    contourSteps: () => [0, 1, 2, 3, 4, 5, 6],
    vectorSteps: () => [1,2, 3, 4, 5, 6],
    vectorCount: 6,
  },
)

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rng = mulberry32(props.seed)

// ---------- Layout ----------
const pad = 4
const topLabelGap = 12 // Space at top for "Train" and "Predict" labels
const innerX = pad
const innerY = pad + topLabelGap
const innerH = props.height - pad * 2 - topLabelGap

const gap = 0
const axisWidth = 10 // Space for axis labels and ticks
const scheduleW = 10
const cols = props.showForward ? 2 : 1

// Calculate available width accounting for:
// - Left padding
// - Schedule bar (if shown) + gap
// - Left axis (if forward column shown) + gap
// - Columns + gaps between them
// - Right axis + gap
// - Right padding
const leftMargin = scheduleW > 0 ? scheduleW + gap : 0
const leftAxisSpace = props.showForward ? axisWidth + gap : 0
const rightAxisSpace = axisWidth + gap
const availableW = props.width - pad * 2 - leftMargin - leftAxisSpace - rightAxisSpace - (cols - 1) * gap
const colW = availableW / cols

const leftX = innerX + leftMargin + leftAxisSpace
const rightX = props.showForward ? leftX + colW + gap : leftX

const bandH = innerH / props.steps
const bandCy = (i: number) => innerY + (i + 0.5) * bandH
const colCx = (x0: number) => x0 + colW / 2

const clusterR = Math.min(colW, bandH) * 0.35

const isContourStep = (i: number) => props.contourSteps.includes(i)
const isVectorStep = (i: number) => props.vectorSteps.includes(i)

const cleanPattern = (() => {
  const pts: Array<{ x: number; y: number }> = []
  const n = props.points
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2
    const radial = clusterR * (0.7 + 0.18 * Math.cos(2 * ang) + 0.1 * (rng() - 0.5))
    pts.push({ x: radial * Math.cos(ang), y: radial * 0.82 * Math.sin(ang) })
  }
  return pts
})()

const mkStep = (noise: number) => {
  const ampX = colW * 0.28 * noise
  const ampY = bandH * 0.28 * noise
  return cleanPattern.map((p) => ({
    x: p.x + (rng() - 0.5) * ampX,
    y: p.y + (rng() - 0.5) * ampY,
    noise,
  }))
}

// right column: reverse diffusion (T -> 0): top noise, bottom clean
const reverseData: Pt[][] = Array.from({ length: props.steps }, (_, i) => {
  const t = props.steps === 1 ? 1 : i / (props.steps - 1)
  return mkStep(1 - t)
})

// left column: forward diffusion (0 -> T): top clean, bottom noise
const forwardData: Pt[][] = props.showForward
  ? Array.from({ length: props.steps }, (_, i) => {
    const t = props.steps === 1 ? 0 : i / (props.steps - 1)
    return mkStep(t)
  })
  : []

const vectorHints = (i: number) => {
  if (!props.showVectors || !isVectorStep(i) || i <= 0 || i >= props.steps - 1) return []
  const step = reverseData[i]
  const take = Math.min(props.vectorCount, step.length)
  const idxs = Array.from({ length: take }, (_, k) => Math.floor((k / take) * step.length))
  return idxs.map((j) => {
    const p = step[j]
    const c = cleanPattern[j]
    const dx = c.x - p.x
    const dy = c.y - p.y
    const len = Math.hypot(dx, dy) || 1
    const scale = 2
    return { x1: p.x, y1: p.y, x2: p.x + (dx / len) * scale, y2: p.y + (dy / len) * scale }
  })
}


// Calculate delay so step appears when cursor reaches it
// Step i is at position (i / (steps-1)) of the total height
// Cursor reaches it at time (i / (steps-1)) * duration
const getStepDelay = (stepIndex: number) => {
  const denom = Math.max(props.steps - 1, 1)
  return (stepIndex * props.duration) / denom
}
const getPointDelay = (pointIndex: number) => pointIndex * 0.02
// global timing fractions (0..1)
// fade is how long we take to fade in once the cursor reaches the row
const fadeFrac = 0.06     // 6% of duration
const holdFrac = 0.96     // keep visible until 96%, then drop to reset

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

// global progress fraction when the cursor reaches the center of row i
// const stepFrac = (i: number) => {
//   const denom = Math.max(props.steps - 1, 1)
//   return i / denom
// }

const stepFrac = (i: number) => {
  return (i + 0.35) / props.steps
}

// SMIL keyTimes + values for "appear when reached, then hold, then reset at end"
const keyTimesForStep = (i: number) => {
  const t0 = clamp01(stepFrac(i))
  const t1 = clamp01(t0 + fadeFrac)
  const t2 = holdFrac
  // 5-point piecewise:
  // 0..t0: 0
  // t0..t1: 0->1
  // t1..t2: 1
  // t2..1: 1->0 (reset)
  return `${0};${t0};${t1};${t2};${1}`
}

const valuesForStep = () => `0;0;1;1;0`

// Optional: smooth easing for the fade segments (2 spline segments)
// segment count = keyTimes count - 1 = 4 segments, we can set splines for all 4
const splinesForStep = () =>
  // ease-in on fade-in, linear hold, ease-out reset
  `0.2 0 0.2 1; 0 0 1 1; 0 0 1 1; 0.2 0 0.2 1`
</script>

<template>
  <svg :width="width" :height="height" class="diffusion" :style="{ '--T': `${duration}s` }">
    <defs>
      <pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse">
        <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.6" />
      </pattern>

      <!-- Standard arrowhead for other uses -->
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <polygon points="0 0, 8 4, 0 8" fill="rgba(34, 211, 238, 0.70)" />
      </marker>

    </defs>

    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Column labels: Train and Predict -->
    <g class="column-labels">
      <!-- Train label (aligned with left/forward column) -->
      <g v-if="showForward" :transform="`translate(${colCx(leftX)}, ${pad + topLabelGap / 2})`">
        <text
          x="0"
          y="0"
          text-anchor="middle"
          font-size="2.5"
          font-weight="600"
          fill="rgba(251, 191, 36, 0.9)"
          font-family="Inter, system-ui, sans-serif"
        >
          Train
        </text>
      </g>
      
      <!-- Predict label (aligned with right/reverse column) -->
      <g :transform="`translate(${colCx(rightX)}, ${pad + topLabelGap / 2})`">
        <text
          x="0"
          y="0"
          text-anchor="middle"
          font-size="2.5"
          font-weight="600"
          fill="rgba(34, 211, 238, 0.9)"
          font-family="Inter, system-ui, sans-serif"
        >
          Predict
        </text>
      </g>
    </g>

    <!-- row separators -->
    <g>
      <line v-for="i in steps - 1" :key="`sep-${i}`" 
        :x1="leftX - (props.showForward ? axisWidth : 0)" 
        :x2="rightX + colW + axisWidth" 
        :y1="innerY + i * bandH"
        :y2="innerY + i * bandH" 
        stroke="rgba(255,255,255,0.06)" 
        stroke-width="1" />
    </g>

    <!-- axes -->
    <g class="axis">
      <!-- Forward axis (0 -> T) -->
      <g v-if="showForward" :transform="`translate(${leftX - axisWidth}, ${innerY})`">
        <line x1="0" y1="0" x2="0" :y2="innerH" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <g v-for="i in steps" :key="`fa-${i}`">
          <line x1="-3" :y1="(i - 0.5) * (innerH / steps)" x2="0" :y2="(i - 0.5) * (innerH / steps)"
            stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <text x="-6" :y="(i - 0.5) * (innerH / steps) + 3" text-anchor="end" fill="rgba(255,255,255,0.55)">
            t={{ i - 1 }}
          </text>
        </g>
      </g>

      <!-- Reverse axis (T -> 0) -->
      <g :transform="`translate(${rightX + colW + gap}, ${innerY})`">
        <line x1="0" y1="0" x2="0" :y2="innerH" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <g v-for="i in steps" :key="`ra-${i}`">
          <line x1="0" :y1="(i - 0.5) * (innerH / steps)" x2="3" :y2="(i - 0.5) * (innerH / steps)"
            stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <text x="6" :y="(i - 0.5) * (innerH / steps) + 3" fill="rgba(255,255,255,0.55)">
            t={{ steps - i }}
          </text>
        </g>
      </g>

      <!-- Moving time cursor (loops with duration) -->
      <g class="time-cursor">
        <!-- forward axis cursor (training) -->
        <g v-if="showForward" :transform="`translate(${leftX - axisWidth}, ${innerY})`">
          <!-- small tick -->
          <line x1="-6" x2="0" y1="0" y2="0" class="cursor-tick cursor-tick-train">
            <animate attributeName="y1" :dur="`${duration}s`" repeatCount="indefinite" :values="`0; ${innerH}`" />
            <animate attributeName="y2" :dur="`${duration}s`" repeatCount="indefinite" :values="`0; ${innerH}`" />
          </line>

          <!-- dot -->
          <circle cx="0" cy="0" r="3.2" class="cursor-dot cursor-dot-train">
            <animate attributeName="cy" :dur="`${duration}s`" repeatCount="indefinite" :values="`0; ${innerH}`" />
          </circle>
        </g>

        <!-- reverse axis cursor (prediction) -->
        <g :transform="`translate(${rightX + colW + gap}, ${innerY})`">
          <line x1="0" x2="6" y1="0" y2="0" class="cursor-tick cursor-tick-predict">
            <animate attributeName="y1" :dur="`${duration}s`" repeatCount="indefinite" :values="`0; ${innerH}`" />
            <animate attributeName="y2" :dur="`${duration}s`" repeatCount="indefinite" :values="`0; ${innerH}`" />
          </line>

          <circle cx="0" cy="0" r="3.2" class="cursor-dot cursor-dot-predict">
            <animate attributeName="cy" :dur="`${duration}s`" repeatCount="indefinite" :values="`0; ${innerH}`" />
          </circle>
        </g>
      </g>
    </g>


    <!-- Forward column snapshots -->
    <g v-if="showForward">
      <g v-for="i in steps" :key="`f-${i}`" :transform="`translate(${colCx(leftX)}, ${bandCy(i - 1)})`">
        <!-- Step container -->
        <g opacity="0">
          <animate attributeName="opacity" :dur="`${duration}s`" repeatCount="indefinite" calcMode="spline"
            :keyTimes="keyTimesForStep(i - 1)" :values="valuesForStep()" :keySplines="splinesForStep()" />

          <!-- points -->
          <g v-for="(p, j) in forwardData[i - 1]" :key="`fp-${i}-${j}`" :transform="`translate(${p.x}, ${p.y})`">
            <circle r="2.5" fill="rgba(251,191,36,0.40)" stroke="rgba(251,191,36,0.55)" stroke-width="0.6" />
          </g>
        </g>
      </g>
    </g>

    <!-- Reverse column snapshots -->
    <g>
      <g v-for="i in steps" :key="`r-${i}`" :transform="`translate(${colCx(rightX)}, ${bandCy(i - 1)})`">
        <!-- Step container ALWAYS exists -->
        <g opacity="0">
          <animate attributeName="opacity" :dur="`${duration}s`" repeatCount="indefinite" calcMode="spline"
            :keyTimes="keyTimesForStep(i - 1)" :values="valuesForStep()" :keySplines="splinesForStep()" />

          <!-- points ALWAYS render -->
          <g v-for="(p, j) in reverseData[i - 1]" :key="`rp-${i}-${j}`" :transform="`translate(${p.x}, ${p.y})`">
            <circle :r="(i - 1) === 0 ? 2.9 : (i - 1) === steps - 1 ? 2.6 : 2.7" :fill="(i - 1) === 0
                ? 'rgba(251,191,36,0.38)'
                : (i - 1) === steps - 1
                  ? 'rgba(34,211,238,0.78)'
                  : `rgba(255,255,255, ${0.28 + (1 - p.noise) * 0.42})`
              " :stroke="(i - 1) === 0
              ? 'rgba(251,191,36,0.55)'
              : (i - 1) === steps - 1
                ? 'rgba(34,211,238,0.92)'
                : 'rgba(255,255,255,0.22)'
            " stroke-width="0.6" />
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.diffusion {
  overflow: visible;
}

.axis text {
  font-family: Inter, system-ui, sans-serif;
  font-size: 9px;
  font-weight: 500;
}

.time-cursor .cursor-tick {
  stroke-width: 1.4;
}

.time-cursor .cursor-tick-train {
  stroke: rgba(251, 191, 36, 0.60);
}

.time-cursor .cursor-tick-predict {
  stroke: rgba(34, 211, 238, 0.50);
}

.time-cursor .cursor-dot-train {
  fill: rgba(251, 191, 36, 0.85);
  stroke: rgba(251, 191, 36, 0.95);
  stroke-width: 0.8;
}

.time-cursor .cursor-dot-predict {
  fill: rgba(34, 211, 238, 0.85);
  stroke: rgba(34, 211, 238, 0.95);
  stroke-width: 0.8;
}
</style>