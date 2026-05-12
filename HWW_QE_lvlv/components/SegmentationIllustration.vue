<script setup lang="ts">
  const props = withDefaults(defineProps<{
    width?: number
    height?: number
    seed?: number
    rows?: number
    cols?: number
  
    /** fixed type vocabulary on the right */
    types?: Array<{ key: string; label: string }>
  
    /**
     * detected instances (clusters), in the order you want to animate
     * Example ttZ:
     *  [{type:"top", indices:[1,2,7]}, {type:"top", indices:[4,9,10]}, {type:"Z", indices:[14,15]}]
     */
    instances?: Array<{ type: string; indices: number[] }>
  
    /** seconds per full loop */
    duration?: number
  }>(), {
    width: 260,
    height: 92,
    seed: 11,
    rows: 3,
    cols: 6,
    duration: 6,
    types: () => ([
      { key: "top", label: "top" },
      { key: "Z",   label: "Z" },
      { key: "W",   label: "W" },
      { key: "H",   label: "H" },
    ]),
    instances: () => ([
      { type: "top", indices: [1, 2, 7] },
      { type: "top", indices: [4, 9, 10] },
      { type: "Z",   indices: [14, 15] },
    ]),
  })
  
  type Pt = { x: number; y: number }
  
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
  
  const W = props.width
  const H = props.height
  const rng = mulberry32(props.seed)
  
  const pad = 5
  const rightPanelW = Math.max(78, Math.floor(W * 0.30))
  const leftPanelW = W - rightPanelW - pad
  const leftX0 = pad
  const leftY0 = pad
  const leftH = H - pad * 2
  
  const rows = props.rows
  const cols = props.cols
  const N = rows * cols
  
  const cellW = leftPanelW / cols
  const cellH = leftH / rows
  const rBase = Math.min(cellW, cellH) * 0.15
  
  const jitter = Math.min(cellW, cellH) * 0.
  function jitteredCenter(i: number): Pt {
    const c = i % cols
    const r = Math.floor(i / cols)
    const cx = leftX0 + (c + 0.5) * cellW
    const cy = leftY0 + (r + 0.5) * cellH
    const jx = (rng() - 0.5) * 2 * jitter
    const jy = (rng() - 0.5) * 2 * jitter
    return { x: cx + jx, y: cy + jy }
  }
  const pts: Pt[] = Array.from({ length: N }, (_, i) => jitteredCenter(i))
  
  function bbox(indices: number[]) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const i of indices) {
      const p = pts[i]
      minX = Math.min(minX, p.x)
      minY = Math.min(minY, p.y)
      maxX = Math.max(maxX, p.x)
      maxY = Math.max(maxY, p.y)
    }
    const pad = Math.min(cellW, cellH) * 0.48
    return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, rx: (maxX - minX) / 2 + pad, ry: (maxY - minY) / 2 + pad }
  }
  
  function colorFor(type: string) {
    if (type === "top") return "rgba(56,189,248,0.92)"   // cyan (tops)
    if (type === "Z")   return "rgba(167,139,250,0.92)"  // violet
    if (type === "W")   return "rgba(34,197,94,0.92)"    // green
    if (type === "H")   return "rgba(245,158,11,0.92)"   // amber
    return "rgba(255,255,255,0.85)"
  }
  function fillFor(type: string) {
    if (type === "top") return "rgba(56,189,248,0.10)"
    if (type === "Z")   return "rgba(167,139,250,0.10)"
    if (type === "W")   return "rgba(34,197,94,0.10)"
    if (type === "H")   return "rgba(245,158,11,0.10)"
    return "rgba(255,255,255,0.06)"
  }
  
  const instances = props.instances
  const instEll = instances.map(inst => ({ ...inst, e: inst.indices?.length ? bbox(inst.indices) : null }))
  
  // Right panel layout
  const rpX = leftX0 + leftPanelW + 12
  const rpY0 = pad + 5
  const rpStep = 16
  const rpTransform = (idx: number) => `translate(${rpX}, ${rpY0 + idx * rpStep})`
  
  // Animation timing: sequential reveal, then persistent
  const dur = props.duration
  const instN = Math.max(1, instEll.length)
  const slot = 1.0 / instN
  
  function revealWindow(k: number) {
    // we want: 0 until its reveal, then 1 for remainder of cycle
    const start = k * slot
    const on = start + slot * 0.20
    const pct = (x: number) => `${Math.round(x * 1000) / 10}%`
    return `
      0% { opacity: 0; }
      ${pct(start)} { opacity: 0; }
      ${pct(on)} { opacity: 1; }
      100% { opacity: 1; }
    `.trim()
  }
  
  // Counter animation: count increases as instances of that type appear
  function countKeyframes(type: string) {
    // We animate by changing opacity of layered texts "0,1,2,3..."
    // Keep it simple: max count = number of instances
    const max = instEll.filter(x => x.type === type).length
    return max
  }
  
  const maxCountOverall = instEll.length
  </script>
  
  <template>
    <svg
      :width="W"
      :height="H"
      :viewBox="`0 0 ${W} ${H}`"
      class="seg-svg"
      :style="{ '--dur': `${dur}s` }"
    >
      <rect :x="0" :y="0" :width="W" :height="H" rx="12" ry="12"
        fill="rgba(0,0,0,0.16)" stroke="rgba(255,255,255,0.12)" />
  
      <!-- Left grid -->
      <g class="grid">
        <g class="grid-lines">
          <path v-for="c in cols-1" :key="`vc-${c}`"
            :d="`M ${leftX0 + c*cellW} ${leftY0} L ${leftX0 + c*cellW} ${leftY0 + leftH}`"
            class="grid-line" />
          <path v-for="r in rows-1" :key="`hr-${r}`"
            :d="`M ${leftX0} ${leftY0 + r*cellH} L ${leftX0 + leftPanelW} ${leftY0 + r*cellH}`"
            class="grid-line" />
        </g>
  
        <circle v-for="(p, i) in pts" :key="`p-${i}`"
          :cx="p.x" :cy="p.y" :r="rBase"
          class="p-base" />
      </g>
  
      <!-- Instances: sequential reveal, persistent -->
      <g v-for="(inst, k) in instEll" :key="`inst-${k}`"
        class="inst" :class="`inst-${k}`">
  
        <template v-if="inst.e">
          <ellipse :cx="inst.e.cx" :cy="inst.e.cy" :rx="inst.e.rx" :ry="inst.e.ry"
            class="mask-fill" :style="{ fill: fillFor(inst.type) }" />
          <ellipse :cx="inst.e.cx" :cy="inst.e.cy" :rx="inst.e.rx" :ry="inst.e.ry"
            class="mask-ring" :style="{ '--ring': colorFor(inst.type) }" />
        </template>
  
        <circle v-for="i in inst.indices" :key="`hit-${k}-${i}`"
          :cx="pts[i].x" :cy="pts[i].y"
          :r="rBase * 1.25"
          class="p-hit" :style="{ fill: colorFor(inst.type) }" />
      </g>
  
      <!-- Right: type counters -->
      <g class="right-panel">
        <rect :x="leftX0 + leftPanelW + 6" :y="pad"
          :width="rightPanelW - 12" :height="H - pad * 2"
          rx="10" ry="10"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" />

        <g v-for="(t, idx) in types" :key="t.key" class="rp-item" :transform="rpTransform(idx)">
          <circle
            cx="6"
            cy="6"
            r="4.2"
            class="rp-dot"
            :style="{ fill: colorFor(t.key) }"
          />
          <text
            x="16"
            y="9"
            class="rp-label"
            :style="{ fill: colorFor(t.key) }"
          >
            {{ t.label }}:
          </text>
  
          <!-- count display: stack 0..maxCountOverall and reveal each step -->
          <g :transform="`translate(${44}, 0)`">
            <text
              v-for="n in (maxCountOverall + 1)"
              :key="`cnt-${t.key}-${n-1}`"
              x="0" y="9"
              class="rp-count"
              :class="`cnt-${t.key}-${n-1}`"
              :style="{ fill: colorFor(t.key) }"
            >{{ n-1 }}</text>
          </g>
  
          <!-- small glow when this type increments -->
          <circle
            cx="6"
            cy="6"
            r="7.6"
            class="rp-glow"
            :class="`glow-${t.key}`"
            :style="{ stroke: colorFor(t.key) }"
          />
        </g>
      </g>
    </svg>
  </template>
  
  <style scoped>
  .seg-svg { display: block; --dur: 6s; }
  
  /* grid */
  .grid-line { stroke: rgba(255,255,255,0.08); stroke-width: 0.8; }
  .p-base { fill: rgba(255,255,255,0.38); }
  
  /* instances */
  .inst { opacity: 0; } /* each gets its own keyframes below */
  
  .mask-ring {
    fill: none;
    stroke: rgba(255,255,255,0.70);
    stroke-width: 1.0;
    stroke-dasharray: 7 9;
    filter:
      drop-shadow(0 0 1px rgba(255,255,255,0.35))
      drop-shadow(0 0 10px rgba(255,255,255,0.12));
    animation: ring var(--dur) ease-in-out infinite;
  }
  @keyframes ring {
    0% { stroke-dashoffset: 0; opacity: 0.55; }
    50% { stroke-dashoffset: 18; opacity: 0.95; }
    100% { stroke-dashoffset: 0; opacity: 0.55; }
  }
  .p-hit { opacity: 0.92; }
  
  /* right panel */
  .rp-title { fill: rgba(255,255,255,0.70); font-size: 9px; font-weight: 800; }
  .rp-dot { opacity: 0.55; }
  .rp-label { opacity: 0.90; font-size: 9px; font-weight: 800; }
  .rp-count { font-size: 9px; font-weight: 900; opacity: 0; }
  .rp-glow { fill: none; stroke-width: 1.1; opacity: 0; }
  
  /* ---------- instance reveal (persistent) ---------- */
  /* For 3 instances: inst-0 appears first, then stays; inst-1, inst-2... */
  .inst-0 { animation: inst0 var(--dur) ease-in-out infinite; }
  .inst-1 { animation: inst1 var(--dur) ease-in-out infinite; }
  .inst-2 { animation: inst2 var(--dur) ease-in-out infinite; }
  @keyframes inst0 { 0%{opacity:0;} 8%{opacity:0;} 16%{opacity:1;} 100%{opacity:1;} }
  @keyframes inst1 { 0%{opacity:0;} 40%{opacity:0;} 48%{opacity:1;} 100%{opacity:1;} }
  @keyframes inst2 { 0%{opacity:0;} 70%{opacity:0;} 78%{opacity:1;} 100%{opacity:1;} }
  
  /* ---------- counters (example for ttZ: top goes 0->1->2; Z goes 0->1; W/H stay 0) ---------- */
  /* default: show 0 at start */
  .cnt-top-0, .cnt-Z-0, .cnt-W-0, .cnt-H-0 { opacity: 1; }
  
  /* top: after inst0 -> show 1; after inst1 -> show 2 */
  /* use steps() so numbers "jump" instantly (no easing) */
  .cnt-top-0 { animation: top0 var(--dur) steps(1, end) infinite; }
  .cnt-top-1 { animation: top1 var(--dur) steps(1, end) infinite; }
  .cnt-top-2 { animation: top2 var(--dur) steps(1, end) infinite; }
  @keyframes top0 { 0%{opacity:1;} 16%{opacity:0;} 100%{opacity:0;} }
  @keyframes top1 { 0%{opacity:0;} 16%{opacity:1;} 48%{opacity:0;} 100%{opacity:0;} }
  @keyframes top2 { 0%{opacity:0;} 48%{opacity:1;} 100%{opacity:1;} }
  
  /* Z: after inst2 -> show 1 */
  .cnt-Z-0 { animation: z0 var(--dur) steps(1, end) infinite; }
  .cnt-Z-1 { animation: z1 var(--dur) steps(1, end) infinite; }
  @keyframes z0 { 0%{opacity:1;} 78%{opacity:0;} 100%{opacity:0;} }
  @keyframes z1 { 0%{opacity:0;} 78%{opacity:1;} 100%{opacity:1;} }
  
  /* W/H remain 0 (no animation needed) */
  
  /* subtle glow pulse when increments happen */
  .glow-top { animation: glowTop var(--dur) ease-in-out infinite; }
  .glow-Z   { animation: glowZ var(--dur) ease-in-out infinite; }
  @keyframes glowTop {
    0%, 12% { opacity: 0; }
    16% { opacity: 1; }
    26% { opacity: 0; }
    48% { opacity: 1; }
    58% { opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes glowZ {
    0%, 74% { opacity: 0; }
    78% { opacity: 1; }
    90% { opacity: 0; }
    100% { opacity: 0; }
  }
  </style>