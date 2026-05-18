<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      width?: number
      height?: number
      seed?: number
    }>(),
    {
      width: 1200,
      height: 520,
      seed: 42,
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
  
  const W = props.width
  const H = props.height
  
  // ======= layout (body only) =======
  const pad = 36
  
  // Remove title/header area completely:
  const ySceneTop = pad
  
  // sections across X (keep same ratios)
  const gapX = 26
  const inputW = Math.round(W * 0.26)
  const encW = Math.round(W * 0.36)
  const decW = W - pad * 2 - gapX * 2 - inputW - encW
  
  const xInputL = pad
  const xEncL = xInputL + inputW + gapX
  const xDecL = xEncL + encW + gapX
  
  const xInputC = xInputL + inputW / 2
  const xEncC = xEncL + encW / 2
  const xDecC = xDecL + decW / 2
  
  // ======= 3 LANES =======
  const laneGap = Math.round((H - ySceneTop - pad) / 3)
  const y1 = ySceneTop + laneGap * 0.55
  const y2 = ySceneTop + laneGap * 1.55
  const y3 = ySceneTop + laneGap * 2.55
  
  const xLaneStart = xInputL + 40
  const xLaneEnd = xDecL + 18
  
  // ======= input icons =======
  const pcR = 36
  const pcCenter = { x: xInputC, y: y1 }
  const pcPts = Array.from({ length: 11 }, (_, i) => {
    const ang = (i / 11) * Math.PI * 2
    const rad = pcR * (0.45 + 0.45 * rng())
    return { x: pcCenter.x + rad * Math.cos(ang), y: pcCenter.y + rad * Math.sin(ang) }
  })
  
  const diffCenter = { x: xInputC, y: y2 }
  const condBox = { x: xInputC - 14, y: y3 - 14, w: 28, h: 28 }
  
  // ======= encoder blocks =======
  const sq = 34
  const xEmbed = xEncL + Math.round(encW * 0.18)
  const xTimeSq = xEncL + Math.round(encW * 0.26)
  const xCondSq = xEncL + Math.round(encW * 0.26)
  
  const embedSq = { x: xEmbed - sq / 2, y: y1 - sq / 2, w: sq, h: sq }
  const timeSq = { x: xTimeSq - sq / 2, y: y2 - sq / 2, w: sq, h: sq }
  const condSq2 = { x: xCondSq - sq / 2, y: y3 - sq / 2, w: sq, h: sq }
  
  // transformers grid block
  const gridS = 120
  const grid = {
    x: xEncC - gridS / 2,
    y: (y1 + y2) / 2 - gridS / 2 - 10,
    w: gridS,
    h: gridS,
  }
  const gridCols = 6
  const gridRows = 6
  const cell = 16
  const cellGap = 3
  const gridInnerW = gridCols * cell + (gridCols - 1) * cellGap
  const gridInnerH = gridRows * cell + (gridRows - 1) * cellGap
  const gridInner = {
    x: grid.x + (grid.w - gridInnerW) / 2,
    y: grid.y + (grid.h - gridInnerH) / 2,
  }
  const gridCells = Array.from({ length: gridRows * gridCols }, (_, k) => {
    const r = Math.floor(k / gridCols)
    const c = k % gridCols
    return {
      x: gridInner.x + c * (cell + cellGap),
      y: gridInner.y + r * (cell + cellGap),
      a: 0.18 + rng() * 0.35,
    }
  })
  
  // conditioning label under grid
  const yCondLabel = grid.y + grid.h + 26
  
  // ======= decoder panel =======
  const decPanel = {
    x: xDecL,
    y: ySceneTop - 8,
    w: decW,
    h: H - (ySceneTop - 8) - pad + 6,
    r: 26,
  }
  
  const genBoxW = Math.round(decW * 0.62)
  const genBoxH = 44
  const genGap = 10
  const genX = xDecL + decW - genBoxW - 26
  const genY1 = decPanel.y + 34
  const genY2 = genY1 + genBoxH + genGap
  
  const pillW = 52
  const pillH = 150
  const pillX = xDecL + 30
  const pillY = genY2 + genBoxH + 22
  
  const blueX = pillX + pillW + 18
  const blueW = decW - (blueX - xDecL) - 28
  const blueH = 40
  const blueGap = 10
  const blueY1 = pillY + 6
  const blueY2 = blueY1 + blueH + blueGap
  const blueY3 = blueY2 + blueH + blueGap
  
  function arrowH(x1: number, y: number, x2: number) {
    return `M ${x1} ${y} L ${x2} ${y}`
  }
  </script>
  
  <template>
    <svg :width="W" :height="H" class="model-fig" role="img" aria-label="Model diagram">
      <defs>
        <marker id="ah-dark" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="rgba(15, 23, 42, 0.85)" />
        </marker>
        <marker id="ah-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="rgba(37, 99, 235, 0.75)" />
        </marker>
      </defs>
  
      <!-- Decoder background -->
      <rect :x="decPanel.x" :y="decPanel.y" :width="decPanel.w" :height="decPanel.h" :rx="decPanel.r" class="decBg" />
  
      <!-- 3 lane lines -->
      <path :d="arrowH(xLaneStart, y1, xLaneEnd)" class="lane" marker-end="url(#ah-dark)" />
      <path :d="arrowH(xLaneStart, y2, xLaneEnd)" class="lane" marker-end="url(#ah-dark)" />
      <path :d="arrowH(xLaneStart, y3, xLaneEnd)" class="lane" marker-end="url(#ah-dark)" />
  
      <!-- Input: labels + icons -->
      <text :x="xInputC" :y="y1 - 52" text-anchor="middle" class="label">Physics Point Cloud</text>
      <g>
        <circle v-for="(p, i) in pcPts" :key="`pc-${i}`" :cx="p.x" :cy="p.y" r="6" class="pcDot" />
      </g>
  
      <text :x="xInputC" :y="y2 - 52" text-anchor="middle" class="label">Diffusion Time Variable</text>
      <circle :cx="diffCenter.x" :cy="diffCenter.y" r="14" class="diffRing" />
  
      <text :x="xInputC" :y="y3 - 52" text-anchor="middle" class="label">Conditioned Variables</text>
      <rect :x="condBox.x" :y="condBox.y" :width="condBox.w" :height="condBox.h" rx="4" class="condIn" />
  
      <!-- Encoder: squares -->
      <text :x="embedSq.x + embedSq.w / 2" :y="embedSq.y - 14" text-anchor="middle" class="smallLabel">Embed</text>
      <rect :x="embedSq.x" :y="embedSq.y" :width="embedSq.w" :height="embedSq.h" rx="4" class="sqBlue" />
      <rect :x="timeSq.x" :y="timeSq.y" :width="timeSq.w" :height="timeSq.h" rx="4" class="sqGold" />
      <rect :x="condSq2.x" :y="condSq2.y" :width="condSq2.w" :height="condSq2.h" rx="4" class="sqRed" />
  
      <!-- Transformers grid -->
      <text :x="xEncC" :y="grid.y - 14" text-anchor="middle" class="label">Point-Edge Transformers</text>
      <rect :x="grid.x" :y="grid.y" :width="grid.w" :height="grid.h" rx="6" class="gridBox" />
      <rect
        v-for="(c, i) in gridCells"
        :key="`g-${i}`"
        :x="c.x"
        :y="c.y"
        :width="cell"
        :height="cell"
        :fill="`rgba(148, 163, 184, ${c.a})`"
        stroke="rgba(15, 23, 42, 0.12)"
        stroke-width="0.8"
      />
      <path :d="`M ${xEncC} ${y2} L ${xEncC} ${grid.y + grid.h + 2}`" class="laneThin" marker-end="url(#ah-dark)" />
      <text :x="xEncC" :y="yCondLabel" text-anchor="middle" class="smallLabel">Diffusion Time Conditioning</text>
  
      <!-- Visual flow cues -->
      <path :d="`M ${pcCenter.x + pcR + 18} ${y1} L ${embedSq.x - 10} ${y1}`" class="laneThin" marker-end="url(#ah-dark)" />
      <path :d="`M ${embedSq.x + embedSq.w + 10} ${y1} L ${grid.x - 10} ${y1}`" class="laneThin" marker-end="url(#ah-dark)" />
      <path :d="`M ${grid.x + grid.w + 10} ${y1} L ${xDecL + 18} ${y1}`" class="laneThin" marker-end="url(#ah-dark)" />
      <path :d="`M ${diffCenter.x + 20} ${y2} L ${timeSq.x - 12} ${y2}`" class="laneThin" marker-end="url(#ah-dark)" />
      <path :d="`M ${xInputC + 24} ${y3} L ${condSq2.x - 12} ${y3}`" class="laneThin" marker-end="url(#ah-dark)" />
  
      <!-- Wavy Inject Noise -->
      <path
        :d="`M ${xEncL + 24} ${y2 - 2}
            C ${xEncL + 6} ${y2 - 22}, ${xEncL + 46} ${y2 - 42}, ${xEncL + 26} ${y2 - 62}
            C ${xEncL + 6} ${y2 - 82}, ${xEncL + 46} ${y2 - 102}, ${xEncL + 26} ${y2 - 122}`"
        class="noise"
      />
      <text :x="xEncL + 62" :y="y2 - 36" class="smallLabel" text-anchor="start">Inject</text>
      <text :x="xEncL + 62" :y="y2 - 18" class="smallLabel" text-anchor="start">Noise</text>
  
      <!-- Decoder: orange generation -->
      <rect :x="genX" :y="genY1" :width="genBoxW" :height="genBoxH" rx="10" class="genBox" />
      <rect :x="genX" :y="genY2" :width="genBoxW" :height="genBoxH" rx="10" class="genBox" />
      <text :x="genX + genBoxW / 2" :y="genY1 + 28" text-anchor="middle" class="taskText">Self-supervised</text>
      <text :x="genX + genBoxW / 2" :y="genY1 + 46" text-anchor="middle" class="taskText">Generation</text>
      <text :x="genX + genBoxW / 2" :y="genY2 + 28" text-anchor="middle" class="taskText">Supervised</text>
      <text :x="genX + genBoxW / 2" :y="genY2 + 46" text-anchor="middle" class="taskText">Generation</text>
  
      <!-- Shared transformers pill -->
      <rect :x="pillX" :y="pillY" :width="pillW" :height="pillH" rx="12" class="pill" />
      <text
        :x="pillX + pillW / 2"
        :y="pillY + pillH / 2"
        text-anchor="middle"
        class="pillText"
        :transform="`rotate(90 ${pillX + pillW / 2} ${pillY + pillH / 2})`"
      >
        Shared Transformers
      </text>
  
      <!-- Blue downstream -->
      <rect :x="blueX" :y="blueY1" :width="blueW" :height="blueH" rx="10" class="blueBox" />
      <rect :x="blueX" :y="blueY2" :width="blueW" :height="blueH" rx="10" class="blueBox" />
      <rect :x="blueX" :y="blueY3" :width="blueW" :height="blueH" rx="10" class="blueBox" />
      <text :x="blueX + blueW / 2" :y="blueY1 + 26" text-anchor="middle" class="taskText">Classification</text>
      <text :x="blueX + blueW / 2" :y="blueY2 + 26" text-anchor="middle" class="taskText">Assignment</text>
      <text :x="blueX + blueW / 2" :y="blueY3 + 26" text-anchor="middle" class="taskText">Segmentation</text>
  
      <!-- Optional: arrow from encoder to gen stack -->
      <path
        :d="`M ${grid.x + grid.w + 10} ${y1} L ${genX - 14} ${genY1 + genBoxH / 2}`"
        class="laneThin"
        marker-end="url(#ah-blue)"
      />
    </svg>
  </template>
  
  <style scoped>
  .model-fig {
    overflow: visible;
    background: transparent;
  }
  
  .label {
    font-family: Inter, system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
    fill: rgba(15, 23, 42, 0.9);
  }
  .smallLabel {
    font-family: Inter, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    fill: rgba(15, 23, 42, 0.78);
  }
  .taskText {
    font-family: Inter, system-ui, sans-serif;
    font-size: 14px;
    font-weight: 700;
    fill: rgba(15, 23, 42, 0.88);
  }
  .pillText {
    font-family: Inter, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 800;
    fill: rgba(15, 23, 42, 0.88);
  }
  
  .decBg {
    fill: rgba(226, 232, 240, 0.55);
    stroke: rgba(148, 163, 184, 0.6);
    stroke-width: 2;
  }
  .lane {
    stroke: rgba(15, 23, 42, 0.75);
    stroke-width: 3;
    fill: none;
  }
  .laneThin {
    stroke: rgba(15, 23, 42, 0.55);
    stroke-width: 2.5;
    fill: none;
  }
  
  .pcDot {
    fill: rgba(147, 197, 253, 0.95);
    stroke: rgba(96, 165, 250, 0.55);
    stroke-width: 1;
  }
  .diffRing {
    fill: rgba(251, 191, 36, 0.18);
    stroke: rgba(180, 83, 9, 0.5);
    stroke-width: 3;
  }
  .condIn {
    fill: rgba(244, 114, 182, 0.28);
  }
  
  .sqBlue {
    fill: rgba(96, 165, 250, 0.65);
    stroke: rgba(30, 64, 175, 0.55);
    stroke-width: 3;
  }
  .sqGold {
    fill: rgba(251, 191, 36, 0.55);
    stroke: rgba(180, 83, 9, 0.55);
    stroke-width: 3;
  }
  .sqRed {
    fill: rgba(239, 68, 68, 0.55);
    stroke: rgba(127, 29, 29, 0.55);
    stroke-width: 3;
  }
  
  .gridBox {
    fill: rgba(241, 245, 249, 0.9);
    stroke: rgba(148, 163, 184, 0.7);
    stroke-width: 2.5;
  }
  .noise {
    stroke: rgba(180, 83, 9, 0.65);
    stroke-width: 4;
    fill: none;
    stroke-linecap: round;
  }
  
  .genBox {
    fill: rgba(251, 191, 36, 0.35);
    stroke: rgba(234, 88, 12, 0.55);
    stroke-width: 3;
  }
  .pill {
    fill: rgba(191, 219, 254, 0.65);
    stroke: rgba(15, 23, 42, 0.75);
    stroke-width: 3;
  }
  .blueBox {
    fill: rgba(147, 197, 253, 0.65);
    stroke: rgba(15, 23, 42, 0.75);
    stroke-width: 3;
  }
  </style>