<script setup lang="ts">
  const props = withDefaults(defineProps<{
    width?: number
    height?: number
    cols?: number
    // picked reco indices (0-indexed)
    pickB?: number
    pickL?: number
    pickBp?: number
    pickQ1?: number
    pickQ2?: number
  }>(), {
    width: 220,
    height: 82,
    cols: 10,
    pickB: 2,
    pickL: 7,
    pickBp: 3,
    pickQ1: 5,
    pickQ2: 6,
  })
  
  const W = props.width
  const H = props.height
  
  // --- Layout ---
  const pad = 10
  const nodeR = 8
  
  // token strip (center)
  const tokensY = 60
  const tokX0 = 60
  const tokX1 = W - 70
  const stripW = tokX1 - tokX0
  const tokStep = stripW / (props.cols - 3.0)
  const colXs = Array.from({ length: props.cols }, (_, i) => tokX0 + i * tokStep)
  const tokR = 2.8
  
  // scanner block (scan over dots, not matrix)
  const scanW = 14
  const scanH = 18
  const scanY = tokensY - scanH / 2
  const scanX0 = colXs[0] - scanW / 2
  const scanX1 = colXs[props.cols - 1] - scanW / 2
  
  // left decay: t -> b l
  const leftX = 28
  const leftTop = { x: leftX, y: 18 }
  const leftB = { x: leftX - 10, y: 45 }
  const leftL = { x: leftX + 18, y: 38 }
  
  // right decay: t' -> b q q
  const rightX = W - 29
  const rightTop = { x: rightX, y: 18 }
  const rightB = { x: rightX + 13, y: 40 }
  const rightQ1 = { x: rightX - 6, y: 48 }
  const rightQ2 = { x: rightX - 25, y: 35 }
  
  function offsetAlong(a: { x: number; y: number }, b: { x: number; y: number }, r: number) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    if (len < 1e-6) return { x: a.x, y: a.y }
    const ux = dx / len
    const uy = dy / len
    return { x: a.x + ux * r, y: a.y + uy * r }
  }

  // helper for smooth curves from token -> node (touch circle edges, not centers)
  function curve(fromX: number, fromY: number, toX: number, toY: number, bend: number) {
    const a = { x: fromX, y: fromY }
    const b = { x: toX, y: toY }
    const start = offsetAlong(a, b, tokR)
    const end = offsetAlong(b, a, nodeR)

    // bend: positive bends downward, negative upward
    const cx1 = start.x + bend
    const cy1 = start.y - 10
    const cx2 = end.x - bend
    const cy2 = end.y - 10
    return `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`
  }

  // straight edge between two nodes, clipped to circle perimeters
  function edge(from: { x: number; y: number }, to: { x: number; y: number }) {
    const a = offsetAlong(from, to, nodeR)
    const b = offsetAlong(to, from, nodeR)
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
  }
  
  // token centers for chosen indices
  const xB = () => colXs[props.pickB]
  const xL = () => colXs[props.pickL]
  const xBp = () => colXs[props.pickBp]
  const xQ1 = () => colXs[props.pickQ1]
  const xQ2 = () => colXs[props.pickQ2]
  </script>
  
  <template>
    <svg :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" class="asg-svg">
      <!-- frame -->
      <rect :x="0" :y="0" :width="W" :height="H" rx="10" ry="10"
        fill="rgba(0,0,0,0.16)" stroke="rgba(255,255,255,0.12)" />
  
      <!-- LEFT: t -> b l -->
      <g>
        <path :d="edge(leftTop, leftB)" class="edge" />
        <path :d="edge(leftTop, leftL)" class="edge" />
  
        <circle :cx="leftTop.x" :cy="leftTop.y" :r="nodeR" class="node" />
        <circle :cx="leftB.x" :cy="leftB.y" :r="nodeR" class="node node-b" />
        <circle :cx="leftL.x" :cy="leftL.y" :r="nodeR" class="node node-l" />
  
        <text :x="leftTop.x" :y="leftTop.y + 3" text-anchor="middle" class="txt">t</text>
        <text :x="leftB.x" :y="leftB.y + 3" text-anchor="middle" class="txt txt-b">b</text>
        <text :x="leftL.x" :y="leftL.y + 3" text-anchor="middle" class="txt txt-l">ℓ</text>
      </g>
  
      <!-- RIGHT: t -> b q q (no prime, cleaned) -->
      <g>
        <path :d="edge(rightTop, rightB)" class="edge" />
        <path :d="edge(rightTop, rightQ1)" class="edge" />
        <path :d="edge(rightTop, rightQ2)" class="edge" />
  
        <circle :cx="rightTop.x" :cy="rightTop.y" :r="nodeR" class="node" />
        <circle :cx="rightB.x" :cy="rightB.y" :r="nodeR" class="node node-b2" />
        <circle :cx="rightQ1.x" :cy="rightQ1.y" :r="nodeR" class="node node-q" />
        <circle :cx="rightQ2.x" :cy="rightQ2.y" :r="nodeR" class="node node-q" />
  
        <text :x="rightTop.x" :y="rightTop.y + 3" text-anchor="middle" class="txt">t</text>
        <text :x="rightB.x" :y="rightB.y + 3" text-anchor="middle" class="txt txt-b2">b</text>
        <text :x="rightQ1.x" :y="rightQ1.y + 3" text-anchor="middle" class="txt txt-q">q</text>
        <text :x="rightQ2.x" :y="rightQ2.y + 3" text-anchor="middle" class="txt txt-q">q</text>
      </g>
  
      <!-- CENTER: reco tokens -->
      <g>
        <!-- faint guide line -->
        <line :x1="tokX0" :y1="tokensY" :x2="tokX1" :y2="tokensY" class="guide" />
  
        <circle
          v-for="(x, i) in colXs"
          :key="`tok-${i}`"
          :cx="x"
          :cy="tokensY"
          r="2.8"
          class="tok"
          :class="[
            i === pickB ? 'tok-b' : '',
            i === pickL ? 'tok-l' : '',
            i === pickBp ? 'tok-b2' : '',
            (i === pickQ1 || i === pickQ2) ? 'tok-q' : '',
          ]"
        />
  
        <!-- scanner block: animate x attribute (no transform drift) -->
        <rect
          class="scan"
          :y="scanY"
          :width="scanW"
          :height="scanH"
          rx="4"
        >
          <animate
            attributeName="x"
            :values="`${scanX0}; ${scanX1}`"
            dur="4.5s"
            repeatCount="indefinite"
            keyTimes="0; 1"
            calcMode="spline"
            keySplines="0.4 0 0.2 1"
          />
          <animate
            attributeName="opacity"
            values="0; 0.9; 0.9; 0"
            dur="4.5s"
            repeatCount="indefinite"
            keyTimes="0; 0.08; 0.85; 1"
          />
        </rect>
      </g>
  
      <!-- AFTER scan: assignment curves (token -> nodes) -->
      <g class="assign">
        <!-- to left -->
        <path :d="curve(xB(), tokensY, leftB.x, leftB.y, -18)" class="aline aline-b" />
        <path :d="curve(xL(), tokensY, leftL.x, leftL.y, -18)" class="aline aline-l" />
  
        <!-- to right -->
        <path :d="curve(xBp(), tokensY, rightB.x, rightB.y, 18)" class="aline aline-b2" />
        <path :d="curve(xQ1(), tokensY, rightQ1.x, rightQ1.y, 18)" class="aline aline-q" />
        <path :d="curve(xQ2(), tokensY, rightQ2.x, rightQ2.y, 18)" class="aline aline-q" />
      </g>
    </svg>
  </template>
  
  <style scoped>
  .asg-svg { display: block; }
  
  /* text */
  .txt {
    fill: rgba(255,255,255,0.86);
    font-size: 9px;
    font-weight: 700;
  }
  .txt-b { fill: rgba(244,63,94,0.92); }
  .txt-b2 { fill: rgba(244,63,94,0.78); }
  .txt-l { fill: rgba(56,189,248,0.92); }
  .txt-q { fill: rgba(251,191,36,0.92); }
  
  /* topology */
  .edge {
    stroke: rgba(255,255,255,0.30);
    stroke-width: 1.2;
    stroke-linecap: round;
  }
  .node {
    fill: rgba(255,255,255,0.06);
    stroke: rgba(255,255,255,0.20);
    stroke-width: 1.0;
  }
  .node-b  { stroke: rgba(244,63,94,0.38); fill: rgba(244,63,94,0.10); }
  .node-b2 { stroke: rgba(244,63,94,0.22); fill: rgba(244,63,94,0.07); }
  .node-l  { stroke: rgba(56,189,248,0.38); fill: rgba(56,189,248,0.10); }
  .node-q  { stroke: rgba(251,191,36,0.30); fill: rgba(251,191,36,0.10); }
  
  /* reco strip */
  .guide {
    stroke: rgba(255,255,255,0.10);
    stroke-width: 1;
    stroke-linecap: round;
  }
  .tok { fill: rgba(255,255,255,0.45); }
  .tok-b  { fill: rgba(244,63,94,0.90); }
  .tok-b2 { fill: rgba(244,63,94,0.60); }
  .tok-l  { fill: rgba(56,189,248,0.90); }
  .tok-q  { fill: rgba(251,191,36,0.88); }
  
  /* scanner block */
  .scan {
    fill: rgba(255,255,255,0.10);
    stroke: rgba(255,255,255,0.22);
    stroke-width: 0.9;
    filter:
      drop-shadow(0 0 1px rgba(255,255,255,0.35))
      drop-shadow(0 0 10px rgba(255,255,255,0.10));
  }
  
  /* assignment curves: appear AFTER scan */
  .aline {
    fill: none;
    stroke-width: 1.2;
    stroke-linecap: round;
    stroke-dasharray: 140;
    stroke-dashoffset: 140;
    opacity: 0.0;
    animation: draw 4.5s ease-in-out infinite;
  }
  .aline-b {
    stroke: rgba(244,63,94,0.86);
    filter:
      drop-shadow(0 0 1px rgba(244,63,94,0.35))
      drop-shadow(0 0 10px rgba(244,63,94,0.14));
  }
  .aline-l {
    stroke: rgba(56,189,248,0.86);
    filter:
      drop-shadow(0 0 1px rgba(56,189,248,0.30))
      drop-shadow(0 0 10px rgba(56,189,248,0.12));
  }
  .aline-b2 {
    stroke: rgba(244,63,94,0.70);
    filter:
      drop-shadow(0 0 1px rgba(244,63,94,0.25))
      drop-shadow(0 0 10px rgba(244,63,94,0.10));
  }
  .aline-q {
    stroke: rgba(251,191,36,0.86);
    filter:
      drop-shadow(0 0 1px rgba(251,191,36,0.28))
      drop-shadow(0 0 10px rgba(251,191,36,0.12));
  }
  
  /* small staggering */
  .aline-b  { animation-delay: 0.00s; }
  .aline-l  { animation-delay: 0.06s; }
  .aline-b2 { animation-delay: 0.10s; }
  .aline-q  { animation-delay: 0.14s; }
  
  @keyframes draw {
    0%   { opacity: 0.0; stroke-dashoffset: 140; }
    70%  { opacity: 0.0; stroke-dashoffset: 140; }
    82%  { opacity: 0.9; stroke-dashoffset: 0; }
    100% { opacity: 0.9; stroke-dashoffset: 0; }
  }
  </style>