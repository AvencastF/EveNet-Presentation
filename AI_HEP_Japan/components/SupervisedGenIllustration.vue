<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    seed?: number
    /** total loop duration (seconds) */
    duration?: number
  }>(),
  {
    width: 180,
    height: 180, // 1:1
    seed: 17,
    duration: 3.5,
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

const margin = 5
const innerW = props.width - margin * 2
const innerH = props.height - margin * 2

// 1:1 split
const leftW = innerW * 0.5
const rightX0 = leftW
const rightW = innerW * 0.5

// Axis box on the right half
const axPad = 3
const axX0 = rightX0 + axPad
const axY0 = axPad
const axW = rightW - axPad * 2
const axH = innerH - axPad * 2
const axX1 = axX0 + axW
const axY1 = axY0 + axH

// Curve inside the axis box: y = f(t), t in [0,1] left->right
function curveY(t: number) {
  const p = 1 - t
  return axY0 + axH * (0.12 + 0.82 * Math.exp(-p * 2.2))
}
function curveX(t: number) {
  return axX0 + t * axW
}

// Curve points for drawing
const pTCurvePoints = (() => {
  const n = 70
  const pts: Array<{ x: number; y: number }> = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    pts.push({ x: curveX(t), y: curveY(t) })
  }
  return pts
})()

const curvePathD = `M ${pTCurvePoints[0].x} ${pTCurvePoints[0].y} ${pTCurvePoints
  .slice(1)
  .map((p) => `L ${p.x} ${p.y}`)
  .join(" ")}`

const curveFillD = `M ${pTCurvePoints[0].x} ${pTCurvePoints[0].y} ${pTCurvePoints
  .slice(1)
  .map((p) => `L ${p.x} ${p.y}`)
  .join(" ")} L ${pTCurvePoints[pTCurvePoints.length - 1].x} ${axY1} L ${pTCurvePoints[0].x} ${axY1} Z`

type Pt = {
  x0: number
  y0: number
  targetX: number
  targetY: number
  dx: number
  dy: number
  delay: string
}

/**
 * LEFT: "jagged/random clusters"
 * - we still generate in 3 groups, but each point has random jitter so it doesn't look like a clean ring.
 * - each point maps to a random t on the curve, and the target is EXACTLY on the curve line.
 */
const points = (() => {
  const out: Pt[] = []
  const clusterCount = 3
  const totalPerCluster = [3, 6, 10] // stable look; tweak if you want

  for (let c = 0; c < clusterCount; c++) {
    // base cluster centers (roughly left side), but points are randomized/jagged around them
    const cx = leftW * (0.18 + 0.14 * c)
    const cy = innerH * (0.25 + (c / (clusterCount - 1)) * 0.5)

    for (let i = 0; i < totalPerCluster[c]; i++) {
      // jagged random placement (NOT a circle)
      const x0 = cx + (rng() - 0.5) * 26 + (rng() - 0.5) * 10
      const y0 = cy + (rng() - 0.5) * 26 + (rng() - 0.5) * 10

      // random mapping onto curve (on the line)
      // bias a little toward mid-range so they don't all crowd ends
      const u = rng()
      const t = 0.12 + 0.76 * (0.5 - 0.5 * Math.cos(Math.PI * u)) // smooth bias to middle

      const tx = curveX(t)
      const ty = curveY(t)

      // stagger: small per-point delays but within one “step”
      const d = props.duration * (0.08 + 0.015 * c + 0.0035 * i)

      out.push({
        x0,
        y0,
        targetX: tx,
        targetY: ty,
        dx: tx - x0,
        dy: ty - y0,
        delay: `${d.toFixed(3)}s`,
      })
    }
  }

  return out
})()
</script>

<template>
  <svg :width="width" :height="height" class="supervised-gen" :style="{ '--duration': `${duration}s` }">
    <g :transform="`translate(${margin}, ${margin})`">
      <!-- RIGHT: axes + curve -->
      <g class="axis-group">
        <path :d="`M ${axX0} ${axY0} L ${axX0} ${axY1} M ${axX0} ${axY1} L ${axX1} ${axY1}`" class="axis" />
        <g class="ticks">
          <path v-for="k in 4" :key="`yt-${k}`"
            :d="`M ${axX0 - 3} ${axY0 + (k / 5) * axH} L ${axX0} ${axY0 + (k / 5) * axH}`" />
          <path v-for="k in 4" :key="`xt-${k}`"
            :d="`M ${axX0 + (k / 5) * axW} ${axY1} L ${axX0 + (k / 5) * axW} ${axY1 + 3}`" />
        </g>

        <path :d="curvePathD" class="pt-curve" />
        <path :d="curveFillD" class="pt-curve-fill" />

        <!-- x-axis label -->
        <text :x="axX0 + axW * 0.62" :y="axY1 + 14" class="axis-label">
          p<tspan baseline-shift="sub">T</tspan>(ν)
        </text>
      </g>

      <!-- LEFT: random/jagged cloud + move-to-curve -->
      <g class="left-group">
        <!-- Ghosts (fixed) -->
        <g v-for="(p, idx) in points" :key="`ghost-${idx}`" :transform="`translate(${p.x0}, ${p.y0})`">
          <g class="ghost-point" :style="{ '--point-delay': p.delay }">
            <circle r="2.6" class="ghost-circle" />
          </g>
        </g>

        <!-- Moving points (fixed) -->
        <g v-for="(p, idx) in points" :key="`pt-${idx}`" :transform="`translate(${p.x0}, ${p.y0})`">
          <g class="moving-point" :style="{
            '--dx': `${p.dx}`,
            '--dy': `${p.dy}`,
            '--point-delay': p.delay,
          }">
            <circle r="2.6" class="point-circle" />
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.supervised-gen {
  overflow: visible;
}

/* Axes */
.axis {
  stroke: rgba(148, 163, 184, 0.45);
  stroke-width: 1;
  fill: none;
  opacity: 0.9;
}

.ticks path {
  stroke: rgba(148, 163, 184, 0.35);
  stroke-width: 1;
  fill: none;
}

/* Curve loops */
.pt-curve {
  opacity: 0;
  stroke: rgba(34, 211, 238, 0.85);
  stroke-width: 2;
  fill: none;

  stroke-dasharray: 260;
  stroke-dashoffset: 260;
  animation: curveLoop var(--duration) ease-in-out infinite;
}

.pt-curve-fill {
  opacity: 0;
  fill: rgba(34, 211, 238, 0.10);
  animation: fillLoop var(--duration) ease-in-out infinite;
}

@keyframes curveLoop {
  0% {
    opacity: 0;
    stroke-dashoffset: 260;
  }

  10% {
    opacity: 1;
  }

  32% {
    stroke-dashoffset: 0;
  }

  88% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: 0;
  }
}

@keyframes fillLoop {
  0% {
    opacity: 0;
  }

  18% {
    opacity: 1;
  }

  88% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

/* Ghost points: dashed “where they were”, per point */
.ghost-point {
  opacity: 0;
  animation: ghostLoop var(--duration) linear infinite;
  animation-delay: var(--point-delay, 0s);
  transform-origin: center;
}

@keyframes ghostLoop {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }

  12% {
    opacity: 1;
    transform: scale(1);
  }

  85% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.ghost-circle {
  fill: none;
  stroke: rgba(129, 140, 248, 0.35);
  stroke-width: 1.1;
  stroke-dasharray: 2 2;
}

/* Moving points: appear in jagged cloud -> move to curve line -> fade */
.moving-point {
  opacity: 0;
  animation: pointLoop var(--duration) cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  animation-delay: var(--point-delay, 0s);
  will-change: transform, opacity;
}

.point-circle {
  fill: rgba(129, 140, 248, 0.65);
  stroke: rgba(129, 140, 248, 0.95);
  stroke-width: 0.9;
}

@keyframes pointLoop {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.2);
  }

  12% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  22% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  /* move to the exact curve point (on the line) */
  70% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)) scale(1);
  }

  82% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)) scale(0.98);
  }

  100% {
    opacity: 0;
    transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)) scale(0.9);
  }
}

.axis-label {
  font-size: 10px;
  fill: rgba(148, 163, 184, 0.75);
  letter-spacing: 0.2px;
}
</style>