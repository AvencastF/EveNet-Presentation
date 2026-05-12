<script setup lang="ts">
/**
 * SSL masked prediction (manifold -> fill masked slots)
 * - Left: a stylized "data manifold / PDF" (contours + scatter)
 * - Right: token row with some masked slots
 * - Animation: k samples detach from manifold and fly to masked slots, then "land" + ripple
 *
 * Notes:
 * - Uses viewBox for stable placement at any render size
 * - Avoids SVG-transform-vs-CSS-transform override by nesting:
 *   outer <g transform="translate(x,y)"> fixed position
 *   inner <g class="..."> animated via CSS transform
 */
const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    seed?: number
    duration?: number
    /** number of masked slots to fill (if fewer masked exist, uses that) */
    kFill?: number
    /** number of padded (gray) points at the end */
    nPadded?: number
    /** whether to draw text labels */
    drawText?: boolean
  }>(),
  {
    width: 220,
    height: 90,
    seed: 23,
    duration: 3.2,
    kFill: 3,
    nPadded: 3,
    drawText: true,
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

// --- Design coordinate system (stable) ---
const VBW = 220
const VBH = 90

// Panels
const pad = 10
const leftX0 = pad
const leftX1 = VBW * 0.48
const rightX0 = VBW * 0.55
const rightX1 = VBW - pad

const midY = VBH * 0.56

// --- Right: tokens + masks (6 columns × 3 rows = 18 tokens) ---
const nCols = 6
const nRows = 3
const nTok = nCols * nRows
const tokRowW = rightX1 - rightX0
const tokColH = VBH * 0.65
const tokGapX = tokRowW / (nCols - 1)
const tokGapY = tokColH / (nRows - 1)
const tokR = 3.0
const pcCenterY = midY

const tokens = Array.from({ length: nTok }, (_, i) => {
  const col = i % nCols
  const row = Math.floor(i / nCols)
  const x = rightX0 + col * tokGapX
  const y = pcCenterY - tokColH * 0.5 + row * tokGapY
  return { i, x, y, col, row }
})

// Separate tokens: padded (last nPadded), then the rest
const nPadded = Math.min(props.nPadded, nTok)
const padded = tokens.slice(-nPadded)
const activeTokens = tokens.slice(0, nTok - nPadded)

// pick masked indices from active tokens (~30-40%)
const maskedIdxs = activeTokens
  .filter(() => rng() < 0.34)
  .map((t) => t.i)

// ensure at least 2 masked so it reads clearly
if (maskedIdxs.length < 2 && activeTokens.length >= 2) {
  maskedIdxs.push(activeTokens[Math.floor(rng() * activeTokens.length)].i)
  maskedIdxs.push(activeTokens[(maskedIdxs[0] + 3) % activeTokens.length].i)
}
// unique
const maskedSet = new Set(maskedIdxs)
const masked = activeTokens.filter((t) => maskedSet.has(t.i))
const visible = activeTokens.filter((t) => !maskedSet.has(t.i))

// ALL masked slots get filled by flying samples (not just kFill)
const maskedToFill = masked

// --- Left: manifold blob + scatter ---
const blobCx = (leftX0 + leftX1) * 0.5
const blobCy = midY
const blobRx = (leftX1 - leftX0) * 0.40
const blobRy = VBH * 0.28

function blobPath(scale = 1, wobble = 0.14, steps = 44) {
  const pts: Array<{ x: number; y: number }> = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    // deterministic wobble with seeded rng-like phase (no extra state)
    const w1 = Math.sin(t * 3.0 + props.seed * 0.17) * wobble
    const w2 = Math.sin(t * 5.0 + props.seed * 0.11) * (wobble * 0.6)
    const rX = blobRx * scale * (1 + w1 + w2)
    const rY = blobRy * scale * (1 + w1 * 0.8 - w2 * 0.5)
    pts.push({
      x: blobCx + rX * Math.cos(t),
      y: blobCy + rY * Math.sin(t),
    })
  }
  const d =
    `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} ` +
    pts.slice(1).map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") +
    " Z"
  return d
}

const blobOuter = blobPath(1.00, 0.15)
const blobMid = blobPath(0.78, 0.13)
const blobInner = blobPath(0.56, 0.11)

// scatter points inside blob-ish region
const scatter = (() => {
  const pts: Array<{ x: number; y: number; r: number; a: number }> = []
  const m = 22
  for (let i = 0; i < m; i++) {
    // sample inside ellipse
    const u = rng()
    const v = rng()
    const ang = u * Math.PI * 2
    const rad = Math.sqrt(v) // bias toward center
    const x = blobCx + Math.cos(ang) * blobRx * 0.85 * rad + (rng() - 0.5) * 1.0
    const y = blobCy + Math.sin(ang) * blobRy * 0.85 * rad + (rng() - 0.5) * 1.0
    const r = 0.9 + rng() * 1.2
    const a = 0.10 + rng() * 0.18
    pts.push({ x, y, r, a })
  }
  return pts
})()

// --- Flying samples: start points on manifold -> masked slots ---
type Fly = {
  sx: number
  sy: number
  tx: number
  ty: number
  dx: number
  dy: number
  delay: string
}

const flyers: Fly[] = maskedToFill.map((slot, j) => {
  // pick a start point from scatter (or near blob rim if you want)
  const pick = scatter[Math.floor(rng() * scatter.length)]
  const sx = pick.x
  const sy = pick.y

  const tx = slot.x
  const ty = slot.y

  // stagger
  const base = props.duration * 0.30
  const dd = base + j * props.duration * 0.06

  return {
    sx,
    sy,
    tx,
    ty,
    dx: tx - sx,
    dy: ty - sy,
    delay: `${dd.toFixed(3)}s`,
  }
})
</script>

<template>
  <svg :width="width" :height="height" class="ssl-manifold" :style="{ '--duration': `${duration}s` }"
    :viewBox="`0 0 ${VBW} ${VBH}`" preserveAspectRatio="xMidYMid meet">
    <defs>
      <!-- subtle neon glow -->
      <filter id="glow-teal" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.4" result="b" />
        <feColorMatrix in="b" type="matrix" values="
              0 0 0 0 0.08
              0 0 0 0 0.90
              0 0 0 0 0.85
              0 0 0 0.75 0" result="g" />
        <feMerge>
          <feMergeNode in="g" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glow-white" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.1" result="b" />
        <feColorMatrix in="b" type="matrix" values="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0.32 0" result="g" />
        <feMerge>
          <feMergeNode in="g" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <marker id="arrowhead-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 6 3, 0 6" fill="rgba(20,184,166,0.75)" />
      </marker>

      <!-- hatch for mask -->
      <pattern id="maskHatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M 0 6 L 6 0" stroke="rgba(20,184,166,0.35)" stroke-width="1" />
      </pattern>

      <!-- shimmer gradient sweep -->
      <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgba(20,184,166,0)" />
        <stop offset="0.5" stop-color="rgba(20,184,166,0.35)" />
        <stop offset="1" stop-color="rgba(20,184,166,0)" />
      </linearGradient>

      <!-- PDF-style density gradients -->
      <radialGradient id="pdfHot" cx="45%" cy="45%" r="70%">
        <stop offset="0" stop-color="rgba(20,184,166,0.55)" />
        <stop offset="0.45" stop-color="rgba(20,184,166,0.22)" />
        <stop offset="1" stop-color="rgba(20,184,166,0.00)" />
      </radialGradient>

      <radialGradient id="pdfWarm" cx="55%" cy="50%" r="75%">
        <stop offset="0" stop-color="rgba(20,184,166,0.35)" />
        <stop offset="0.55" stop-color="rgba(20,184,166,0.15)" />
        <stop offset="1" stop-color="rgba(20,184,166,0.00)" />
      </radialGradient>

      <radialGradient id="pdfCool" cx="50%" cy="55%" r="80%">
        <stop offset="0" stop-color="rgba(20,184,166,0.22)" />
        <stop offset="0.65" stop-color="rgba(20,184,166,0.10)" />
        <stop offset="1" stop-color="rgba(20,184,166,0.00)" />
      </radialGradient>
    </defs>

    <!-- micro grid background -->
    <g class="bg">
      <path v-for="k in 9" :key="`h-${k}`" :d="`M 0 ${k * 10} L ${VBW} ${k * 10}`" class="bg-line" />
      <path v-for="k in 12" :key="`v-${k}`" :d="`M ${k * 20} 0 L ${k * 20} ${VBH}`" class="bg-line" />
    </g>

    <!-- LEFT: manifold / PDF -->
    <g class="manifold">
      <!-- soft density field (layered blobs) -->
      <g class="pdf-field" filter="url(#glow-teal)">
        <!-- back haze -->
        <ellipse :cx="blobCx" :cy="blobCy" :rx="blobRx * 1.05" :ry="blobRy * 0.95" fill="url(#pdfCool)"
          class="pdf-layer pdf-l0" />
        <!-- main mode -->
        <ellipse :cx="blobCx - blobRx * 0.12" :cy="blobCy - blobRy * 0.10" :rx="blobRx * 0.85" :ry="blobRy * 0.78"
          fill="url(#pdfHot)" class="pdf-layer pdf-l1" />
        <!-- secondary mode (conditional structure hint) -->
        <ellipse :cx="blobCx + blobRx * 0.18" :cy="blobCy + blobRy * 0.08" :rx="blobRx * 0.65" :ry="blobRy * 0.58"
          fill="url(#pdfWarm)" class="pdf-layer pdf-l2" />
      </g>

      <!-- optional: faint “iso-lines” (very subtle, so it still reads PDF) -->
      <path :d="blobOuter" class="iso iso-outer" />
      <path :d="blobMid" class="iso iso-mid" />

      <!-- scatter points inside density (speckle texture) -->
      <g v-for="(p, i) in scatter" :key="`s-${i}`" :transform="`translate(${p.x}, ${p.y})`">
        <circle :r="p.r" :style="{ opacity: p.a }" class="manifold-dot" />
      </g>
    </g>
    
    <!-- Labels (outside grid, aligned) -->
    <template v-if="drawText">
      <text :x="blobCx" :y="VBH + 14" class="manifold-label" text-anchor="middle">
        Cond. high-dim PDF
      </text>
      <text :x="(rightX0 + rightX1) * 0.5" :y="VBH + 14" class="manifold-label" text-anchor="middle">
        Masked Input
      </text>
    </template>
    <!-- RIGHT: tokens with masks (point cloud grid) -->
    <g class="tokens">
      <!-- visible tokens -->
      <g v-for="t in visible" :key="`v-${t.i}`" :transform="`translate(${t.x}, ${t.y})`">
        <g class="tok-wrap">
          <circle :r="tokR" class="tok" />
          <circle r="1.1" class="tok-core" />
        </g>
      </g>

      <!-- masked tokens -->
      <g v-for="t in masked" :key="`m-${t.i}`" :transform="`translate(${t.x}, ${t.y})`">
        <!-- position fixed; animate inside only -->
        <g class="mask-wrap">
          <rect :x="-(tokR + 2.5)" :y="-(tokR + 2.5)" :width="(tokR + 2.5) * 2" :height="(tokR + 2.5) * 2" rx="3"
            class="mask-box" />
          <rect :x="-(tokR + 2.5)" :y="-(tokR + 2.5)" :width="(tokR + 2.5) * 2" :height="(tokR + 2.5) * 2" rx="3"
            class="mask-shimmer" />
        </g>
      </g>

      <!-- padded tokens (gray) -->
      <g v-for="t in padded" :key="`p-${t.i}`" :transform="`translate(${t.x}, ${t.y})`">
        <g class="padded-wrap">
          <circle :r="tokR" class="tok-padded" />
          <circle r="1.1" class="tok-padded-core" />
        </g>
      </g>
    </g>

    <!-- FLYING SAMPLES: manifold -> masked slots -->
    <g class="flyers">
      <!-- landing ghost box at each filled masked slot -->
      <g v-for="(f, i) in flyers" :key="`lg-${i}`" :transform="`translate(${f.tx}, ${f.ty})`">
        <g class="land-ghost" :style="{ '--fly-delay': f.delay }">
          <rect :x="-(tokR + 2.5)" :y="-(tokR + 2.5)" :width="(tokR + 2.5) * 2" :height="(tokR + 2.5) * 2" rx="3"
            class="land-box" />
        </g>
      </g>

      <!-- moving predicted samples -->
      <g v-for="(f, i) in flyers" :key="`fly-${i}`" :transform="`translate(${f.sx}, ${f.sy})`">
        <g class="fly" :style="{
          '--dx': `${f.dx}`,
          '--dy': `${f.dy}`,
          '--fly-delay': f.delay,
        }">
          <circle :r="tokR + 0.9" class="pred-ring" />
          <circle :r="tokR - 0.2" class="pred-fill" />
          <circle r="1.4" class="pred-dot" />
          <circle r="0.1" class="pred-ripple" />
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.ssl-manifold {
  overflow: visible;
}

/* background grid */
.bg-line {
  stroke: rgba(148, 163, 184, 0.08);
  stroke-width: 1;
}


.blob {
  fill: none;
  stroke-width: 1.4;
}

.blob-outer {
  stroke: rgba(20, 184, 166, 0.22);
  stroke-dasharray: 3 4;
  animation: blobBreathe var(--duration) ease-in-out infinite;
}

.blob-mid {
  stroke: rgba(20, 184, 166, 0.30);
  stroke-dasharray: 2 3;
  animation: blobBreathe var(--duration) ease-in-out infinite;
  animation-delay: 0.08s;
}

.blob-inner {
  stroke: rgba(20, 184, 166, 0.38);
  animation: blobBreathe var(--duration) ease-in-out infinite;
  animation-delay: 0.16s;
}

@keyframes blobBreathe {
  0% {
    opacity: 0.0;
  }

  15% {
    opacity: 1;
  }

  45% {
    opacity: 0.75;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0.0;
  }
}

.manifold-dot {
  fill: rgba(20, 184, 166, 0.9);
  filter: url(#glow-teal);
}

/* RIGHT tokens */
.tok-wrap {
  opacity: 1;
  filter: url(#glow-white);
}

.tok {
  fill: rgba(255, 255, 255, 0.50);
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 0.9;
}

.tok-core {
  fill: rgba(255, 255, 255, 0.85);
  opacity: 0.7;
}

/* padded tokens (gray) */
.padded-wrap {
  opacity: 1;
}

.tok-padded {
  fill: rgba(148, 163, 184, 0.30);
  stroke: rgba(148, 163, 184, 0.50);
  stroke-width: 0.9;
}

.tok-padded-core {
  fill: rgba(148, 163, 184, 0.50);
  opacity: 0.7;
}

/* mask slot */
.mask-wrap {
  opacity: 1;
  filter: url(#glow-teal);
  transform-box: fill-box;
  transform-origin: center;
}

.mask-box {
  fill: url(#maskHatch);
  stroke: rgba(20, 184, 166, 0.7);
  stroke-width: 1.2;
  stroke-dasharray: 2 2;
}

.mask-shimmer {
  fill: url(#shimmer);
  opacity: 0;
}

/* landing ghost box at each filled slot */
.land-ghost {
  opacity: 0;
  animation: land var(--duration) ease-in-out infinite;
  animation-delay: var(--fly-delay, 0s);
}

.land-box {
  fill: none;
  stroke: rgba(20, 184, 166, 0.22);
  stroke-width: 1.1;
  stroke-dasharray: 2 2;
}

@keyframes land {
  0% {
    opacity: 0;
  }

  40% {
    opacity: 0.0;
  }

  62% {
    opacity: 0.65;
  }

  88% {
    opacity: 0.65;
  }

  100% {
    opacity: 0;
  }
}

/* flying predicted samples */
.fly {
  opacity: 0;
  filter: url(#glow-teal);
  transform-box: fill-box;
  transform-origin: center;
  animation: flyMove var(--duration) cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  animation-delay: var(--fly-delay, 0s);
}

.pred-ring {
  fill: none;
  stroke: rgba(20, 184, 166, 1);
  stroke-width: 1.6;
}

.pred-fill {
  fill: rgba(20, 184, 166, 0.22);
}

.pred-dot {
  fill: rgba(20, 184, 166, 1);
}

.pred-ripple {
  fill: none;
  stroke: rgba(20, 184, 166, 0.8);
  stroke-width: 1.0;
  opacity: 0;
  animation: ripple var(--duration) ease-in-out infinite;
  animation-delay: var(--fly-delay, 0s);
}

@keyframes flyMove {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.7);
  }

  32% {
    opacity: 0;
    transform: translate(0, 0) scale(0.7);
  }

  42% {
    opacity: 1;
    transform: translate(0, 0) scale(1.05);
  }

  70% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)) scale(1);
  }

  /* Stay visible at destination until all points arrive, then disappear together */
  95% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)) scale(0.95);
  }
}

@keyframes ripple {

  0%,
  64% {
    opacity: 0;
    r: 0.1;
  }

  78% {
    opacity: 0.5;
    r: 8;
  }

  92% {
    opacity: 0;
    r: 11;
  }

  100% {
    opacity: 0;
    r: 11;
  }
}

/* LEFT manifold now behaves like a PDF field */
.manifold {
  opacity: 1;
}

.pdf-field {
  opacity: 0.95;
}

.pdf-layer {
  transform-box: fill-box;
  transform-origin: center;
}

.pdf-l0 { opacity: 0.80; }
.pdf-l1 { opacity: 0.95; }
.pdf-l2 { opacity: 0.85; }

/* very subtle iso-lines (optional) */
.iso {
  fill: none;
  filter: url(#glow-teal);
  opacity: 0.22;
  stroke: rgba(20,184,166,0.25);
  stroke-width: 1.1;
  stroke-dasharray: 2 4;
}
.iso-mid {
  opacity: 0.16;
  stroke-dasharray: 2 3;
}

/* speckle */
.manifold-dot {
  fill: rgba(20, 184, 166, 0.9);
  filter: url(#glow-teal);
}

/* manifold label */
.manifold-label {
  font-size: 9px;
  fill: rgba(148, 163, 184, 0.65);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  letter-spacing: 0.2px;
}
</style>