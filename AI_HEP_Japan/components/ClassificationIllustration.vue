<script setup lang="ts">
  
const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    seed?: number
    pointsPerCluster?: number
  
      // NEW controls
    centerSpread?: number // 0..1 how far apart class centers are
    sigmaFrac?: number // gaussian width as fraction of min(width,height)
    gridStep?: number // boundary grid resolution in px
  }>(),
  {
    width: 150,
    height: 84,
    seed: 7,
    pointsPerCluster: 14,
    centerSpread: 0.8,
    sigmaFrac: 0.18,
    gridStep: 3,
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
  
function randn(rng: () => number) {
  const u = Math.max(1e-9, rng())
  const v = Math.max(1e-9, rng())
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}
  
const margin = 6
  
const centers = (() => {
    // Spread centers across the canvas (triangle-like layout)
  const w = props.width
  const h = props.height
  
  const cx = w * 0.52
  const cy = h * 0.52
  
  const s = Math.min(w, h) * 0.38 * props.centerSpread
  
    // 3 corners of a (rough) triangle in the available area
  const c0 = { x: cx - s * 0.85, y: cy - s * 0.35 }
  const c1 = { x: cx + s * 0.9, y: cy - s * 0.15 }
  const c2 = { x: cx - s * 0.1, y: cy + s * 0.85 }
  
    // Clamp to margins so centers never sit outside the box
  const clamp = (p: { x: number; y: number }) => ({
    x: Math.min(w - margin, Math.max(margin, p.x)),
    y: Math.min(h - margin, Math.max(margin, p.y)),
  })
  
  return [clamp(c0), clamp(c1), clamp(c2)] as const
})()
  
const sigma = Math.min(props.width, props.height) * props.sigmaFrac
  
type Point = {
  x: number
  y: number
  x0: number
  y0: number
  k: 0 | 1 | 2
  delay: number
}

const points = (() => {
  const rng = mulberry32(props.seed)
  const out: Point[] = []
  const C = centers

  // start positions: random across the whole canvas
  const randIn = (a: number, b: number) => a + (b - a) * rng()

  for (let k = 0 as 0 | 1 | 2; k < 3; k = (k + 1) as 0 | 1 | 2) {
    for (let i = 0; i < props.pointsPerCluster; i++) {
      // target (trained) position: gaussian cluster
      const xt = C[k].x + randn(rng) * sigma
      const yt = C[k].y + randn(rng) * sigma

      // initial (untrained) position: uniform in canvas
      const x0 = randIn(margin, props.width - margin)
      const y0 = randIn(margin, props.height - margin)

      out.push({
        x: Math.min(props.width - margin, Math.max(margin, xt)),
        y: Math.min(props.height - margin, Math.max(margin, yt)),
        x0,
        y0,
        k,
        // stagger a bit so it feels like “optimization”
        delay: (i % 10) * 0.06 + k * 0.12,
      })
    }
  }
  return out
})()
  
  // --- "Real" classifier for boundaries: RBF scores around each center ---
function scoreRBF(x: number, y: number, c: { x: number; y: number }, sig: number) {
  const dx = x - c.x
  const dy = y - c.y
  const d2 = dx * dx + dy * dy
    // exp(-d^2 / (2 sigma^2))
  const denom = 2 * sig * sig
  return Math.exp(-d2 / Math.max(1e-9, denom))
}
  
function argmax3(a: number, b: number, c: number): 0 | 1 | 2 {
  if (a >= b && a >= c) return 0
  if (b >= a && b >= c) return 1
  return 2
}
  
type Segment = { x1: number; y1: number; x2: number; y2: number }
  
  // Extract boundary segments between class labels via simple cell-edge interpolation.
  // (Not full marching squares for iso-lines; but correct for label boundaries.)
const boundarySegments = (() => {
  const w = props.width
  const h = props.height
  const step = Math.max(2, Math.floor(props.gridStep))
  const C = centers
  const sig = sigma
  
    // grid of labels
  const nx = Math.floor(w / step) + 1
  const ny = Math.floor(h / step) + 1
  
  const label = new Array(ny)
  for (let j = 0; j < ny; j++) {
    const row = new Array(nx) as (0 | 1 | 2)[]
    const y = j * step
    for (let i = 0; i < nx; i++) {
      const x = i * step
      const s0 = scoreRBF(x, y, C[0], sig)
      const s1 = scoreRBF(x, y, C[1], sig)
      const s2 = scoreRBF(x, y, C[2], sig)
      row[i] = argmax3(s0, s1, s2)
      }
    label[j] = row
    }
  
  const segs: Segment[] = []
  
    // For each cell, add boundary segments where neighbor labels differ.
    // We draw boundaries along the midpoints of edges where labels change.
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
      const l00 = label[j][i]
      const l10 = label[j][i + 1]
      const l01 = label[j + 1][i]
      const l11 = label[j + 1][i + 1]
  
      const x0 = i * step
      const y0 = j * step
  
        // edge midpoints in this cell
      const top = { x: x0 + step * 0.5, y: y0 }
      const bottom = { x: x0 + step * 0.5, y: y0 + step }
      const left = { x: x0, y: y0 + step * 0.5 }
      const right = { x: x0 + step, y: y0 + step * 0.5 }
  
        // Mark which edges are "cut" by a label change
      const cuts: { p: { x: number; y: number } }[] = []
      if (l00 !== l10) cuts.push({ p: top })
      if (l01 !== l11) cuts.push({ p: bottom })
      if (l00 !== l01) cuts.push({ p: left })
      if (l10 !== l11) cuts.push({ p: right })
  
        // If two cuts, connect them. If 4 cuts, connect (top<->bottom) and (left<->right).
      if (cuts.length === 2) {
        segs.push({ x1: cuts[0].p.x, y1: cuts[0].p.y, x2: cuts[1].p.x, y2: cuts[1].p.y })
      } else if (cuts.length === 4) {
        segs.push({ x1: top.x, y1: top.y, x2: bottom.x, y2: bottom.y })
        segs.push({ x1: left.x, y1: left.y, x2: right.x, y2: right.y })
      }
    }
  }

  return segs
})()

type Pt = { x: number; y: number }
type Seg = Segment

function keyOf(p: Pt) {
  // quantize to stabilize float comparisons
  return `${Math.round(p.x * 10) / 10},${Math.round(p.y * 10) / 10}`
}

function buildPolylines(segments: Seg[], eps = 0.25): Pt[][] {
  // Build adjacency (endpoint -> connected endpoints)
  const adj = new Map<string, Pt[]>()

  const addEdge = (a: Pt, b: Pt) => {
    const ka = keyOf(a)
    const kb = keyOf(b)
    if (!adj.has(ka)) adj.set(ka, [])
    if (!adj.has(kb)) adj.set(kb, [])
    adj.get(ka)!.push(b)
    adj.get(kb)!.push(a)
  }

  for (const s of segments) {
    addEdge({ x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 })
  }

  // Track unused directed edges
  const used = new Set<string>()
  const edgeKey = (a: Pt, b: Pt) => `${keyOf(a)}->${keyOf(b)}`

  const polylines: Pt[][] = []

  // Prefer starting at degree-1 nodes for open polylines
  const nodes = Array.from(adj.entries()).map(([k, nbrs]) => ({ k, nbrs }))
  nodes.sort((A, B) => A.nbrs.length - B.nbrs.length)

  const parsePt = (k: string): Pt => {
    const [xs, ys] = k.split(",")
    return { x: Number(xs), y: Number(ys) }
  }

  const walkFrom = (startKey: string) => {
    const start = parsePt(startKey)
    const line: Pt[] = [start]
    let curr = start
    let prev: Pt | null = null

    while (true) {
      const nbrs = adj.get(keyOf(curr)) || []
      // choose next neighbor not yet used
      let next: Pt | null = null
      for (const cand of nbrs) {
        const k1 = edgeKey(curr, cand)
        if (!used.has(k1)) {
          next = cand
          break
        }
      }
      if (!next) break

      used.add(edgeKey(curr, next))
      used.add(edgeKey(next, curr))
      line.push(next)
      prev = curr
      curr = next
    }
    if (line.length >= 2) polylines.push(line)
  }

  // Walk all components
  for (const n of nodes) {
    const startK = n.k
    const p = parsePt(startK)
    const nbrs = adj.get(startK) || []
    // if any unused edge exists from this node, start a walk
    const hasUnused = nbrs.some(nb => !used.has(edgeKey(p, nb)))
    if (hasUnused) walkFrom(startK)
  }

  return polylines
}

function smoothPathFromPolyline(pts: Pt[], tension = 0.35): string {
  // Quadratic smoothing: midpoints + Q commands
  if (pts.length < 2) return ""
  if (pts.length === 2) {
    return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`
  }

  const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })

  let d = ""
  const p0 = pts[0]
  const p1 = pts[1]
  const m0 = mid(p0, p1)
  d += `M ${p0.x} ${p0.y} L ${m0.x} ${m0.y}`

  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]
    const pNext = pts[i + 1]
    const m = mid(p, pNext)
    // Q control point at p, end at midpoint
    d += ` Q ${p.x} ${p.y} ${m.x} ${m.y}`
  }

  const plast = pts[pts.length - 1]
  d += ` L ${plast.x} ${plast.y}`
  return d
}
  
const boundaryPaths = (() => {
  // 1) stitch segments into polylines
  const lines = buildPolylines(boundarySegments)
  // 2) smooth each polyline into a path
  return lines
    .map(pl => smoothPathFromPolyline(pl))
    .filter(Boolean)
})()

// split into two groups for layered shine
const pathsA = boundaryPaths.filter((_, i) => i % 2 === 0)
const pathsB = boundaryPaths.filter((_, i) => i % 2 === 1)

const viewBox = `0 0 ${props.width} ${props.height}`
  
const dotRadius =
  props.pointsPerCluster >= 60 ? 0.95
  : props.pointsPerCluster >= 40 ? 1.15
  : props.pointsPerCluster >= 28 ? 1.35
  : props.pointsPerCluster >= 22 ? 1.6
  : 2.0
</script>
  
  <template>
    <div class="cls-illus" :style="{ width: `${width}px`, height: `${height}px` }">
      <svg class="cls-svg" :viewBox="viewBox" :width="width" :height="height">
        <defs>
          <radialGradient id="clsBgGlow" cx="50%" cy="45%" r="75%">
            <stop offset="0" stop-color="rgba(255,255,255,0.06)" />
            <stop offset="1" stop-color="rgba(0,0,0,0.0)" />
          </radialGradient>
        </defs>
  
        <rect x="0" y="0" :width="width" :height="height" rx="10" ry="10" fill="rgba(0,0,0,0.18)" />
        <rect x="0" y="0" :width="width" :height="height" rx="10" ry="10" fill="url(#clsBgGlow)" opacity="0.9" />
        <rect x="0" y="0" :width="width" :height="height" rx="10" ry="10" fill="transparent" stroke="rgba(255,255,255,0.12)" />
  
        <!-- Smooth decision boundaries -->
        <g class="cls-boundary cls-boundary-a">
          <path
            v-for="(d, i) in pathsA"
            :key="'pa'+i"
            :d="d"
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            stroke-width="0.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <g class="cls-boundary cls-boundary-b">
          <path
            v-for="(d, i) in pathsB"
            :key="'pb'+i"
            :d="d"
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            stroke-width="0.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
  
        <circle
          v-for="(p, idx) in points"
          :key="idx"
          class="cls-dot"
          :class="p.k === 0 ? 'cls-dot-a' : (p.k === 1 ? 'cls-dot-b' : 'cls-dot-c')"
          :cx="p.x"
          :cy="p.y"
          :r="dotRadius"
        >
          <!-- cx: hold at x0, train to x, hold at x, then jump back (loop) -->
          <animate
            attributeName="cx"
            :values="`${p.x0}; ${p.x0}; ${p.x}; ${p.x}; ${p.x0}`"
            keyTimes="0; 0.08; 0.60; 0.92; 1"
            dur="10s"
            :begin="`${p.delay}s`"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0 0 1 1; 0.22 1 0.36 1; 0 0 1 1; 0 0 1 1"
          />

          <!-- cy: same -->
          <animate
            attributeName="cy"
            :values="`${p.y0}; ${p.y0}; ${p.y}; ${p.y}; ${p.y0}`"
            keyTimes="0; 0.08; 0.60; 0.92; 1"
            dur="10s"
            :begin="`${p.delay}s`"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0 0 1 1; 0.22 1 0.36 1; 0 0 1 1; 0 0 1 1"
          />

          <!-- opacity: fade in during early training, then hold, then reset -->
          <animate
            attributeName="opacity"
            values="0.12; 0.92; 0.92; 0.12"
            keyTimes="0; 0.18; 0.92; 1"
            dur="10s"
            :begin="`${p.delay}s`"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.22 1 0.36 1; 0 0 1 1; 0.22 1 0.36 1"
          />
        </circle>
      </svg>
    </div>
  </template>
  
<style scoped>
.cls-illus { overflow: hidden; border-radius: 5px; }
.cls-svg { display: block; }

.cls-dot {
  opacity: 0.92;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.06));
}
.cls-dot-a { fill: rgba(56, 189, 248, 0.92); }
.cls-dot-b { fill: rgba(244, 63, 94, 0.90); }
.cls-dot-c { fill: rgba(167, 139, 250, 0.90); }

</style>