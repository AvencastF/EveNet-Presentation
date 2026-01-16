<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    seed?: number
  }>(),
  {
    width: 150,
    height: 84,
    seed: 5,
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

const margin = 6

// Left cluster (light blue)
const leftCenter = { x: props.width * 0.32, y: props.height * 0.55 }
const leftRx = props.width * 0.28
const leftRy = props.height * 0.32

// Right cluster (light yellow)
const rightCenter = { x: props.width * 0.68, y: props.height * 0.45 }
const rightRx = props.width * 0.30
const rightRy = props.height * 0.28

// Generate blob path
function generateBlobPath(cx: number, cy: number, rx: number, ry: number, steps = 36) {
  const pts: Array<{ x: number; y: number }> = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const wobble1 = Math.sin(t * 3.0) * 0.14
    const wobble2 = Math.sin(t * 5.0 + 0.5) * 0.08
    const rX = rx * (1 + wobble1 + wobble2)
    const rY = ry * (1 + wobble1 * 0.8 - wobble2 * 0.5)
    pts.push({
      x: cx + rX * Math.cos(t),
      y: cy + rY * Math.sin(t),
    })
  }
  return `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} ${pts
    .slice(1)
    .map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ')} Z`
}

const leftBlob = generateBlobPath(leftCenter.x, leftCenter.y, leftRx, leftRy)
const rightBlob = generateBlobPath(rightCenter.x, rightCenter.y, rightRx, rightRy)

// Generate points inside blobs
type Point = { x: number; y: number; k: 0 | 1 }

const generatePointsInBlob = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
  k: 0 | 1,
): Point[] => {
  const pts: Point[] = []
  for (let i = 0; i < count; i++) {
    const u = rng()
    const v = rng()
    const ang = u * Math.PI * 2
    const rad = Math.sqrt(v) * 0.85 // bias toward center
    const x = cx + Math.cos(ang) * rx * rad + (rng() - 0.5) * 2
    const y = cy + Math.sin(ang) * ry * rad + (rng() - 0.5) * 2
    pts.push({ x, y, k })
  }
  return pts
}

const leftPoints = generatePointsInBlob(leftCenter.x, leftCenter.y, leftRx, leftRy, 8, 0)
const rightPoints = generatePointsInBlob(rightCenter.x, rightCenter.y, rightRx, rightRy, 7, 1)

// Add one red triangle point in left cluster
const redTrianglePoint = {
  x: leftCenter.x + (rng() - 0.5) * leftRx * 0.4,
  y: leftCenter.y + (rng() - 0.5) * leftRy * 0.4,
}

const viewBox = `0 0 ${props.width} ${props.height}`
</script>

<template>
  <div class="gen-illus" :style="{ width: `${width}px`, height: `${height}px` }">
    <svg class="gen-svg" :viewBox="viewBox" :width="width" :height="height">
      <defs>
        <radialGradient id="leftBlobGrad" cx="50%" cy="50%" r="75%">
          <stop offset="0" stop-color="rgba(56, 189, 248, 0.35)" />
          <stop offset="1" stop-color="rgba(56, 189, 248, 0.08)" />
        </radialGradient>
        <radialGradient id="rightBlobGrad" cx="50%" cy="50%" r="75%">
          <stop offset="0" stop-color="rgba(250, 204, 21, 0.35)" />
          <stop offset="1" stop-color="rgba(250, 204, 21, 0.08)" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect x="0" y="0" :width="width" :height="height" rx="10" ry="10" fill="rgba(0,0,0,0.18)" />

      <!-- Left blob (light blue) -->
      <path :d="leftBlob" fill="url(#leftBlobGrad)" class="blob-shape" />

      <!-- Right blob (light yellow) -->
      <path :d="rightBlob" fill="url(#rightBlobGrad)" class="blob-shape" />

      <!-- Data points in left cluster (blue circles) -->
      <circle
        v-for="(p, idx) in leftPoints"
        :key="`left-${idx}`"
        :cx="p.x"
        :cy="p.y"
        r="2.0"
        class="point-blue"
      />

      <!-- Red triangle in left cluster -->
      <polygon
        :points="`${redTrianglePoint.x},${redTrianglePoint.y - 2.5} ${redTrianglePoint.x - 2.5},${redTrianglePoint.y + 2} ${redTrianglePoint.x + 2.5},${redTrianglePoint.y + 2}`"
        class="point-red"
      />

      <!-- Data points in right cluster (yellow circles) -->
      <circle
        v-for="(p, idx) in rightPoints"
        :key="`right-${idx}`"
        :cx="p.x"
        :cy="p.y"
        r="2.0"
        class="point-yellow"
      />
    </svg>
  </div>
</template>

<style scoped>
.gen-illus {
  overflow: hidden;
  border-radius: 5px;
}
.gen-svg {
  display: block;
}

.blob-shape {
  opacity: 0.9;
}

.point-blue {
  fill: rgba(59, 130, 246, 0.92);
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.4));
}

.point-yellow {
  fill: rgba(250, 204, 21, 0.92);
  filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.4));
}

.point-red {
  fill: rgba(239, 68, 68, 0.95);
  filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.5));
}
</style>
