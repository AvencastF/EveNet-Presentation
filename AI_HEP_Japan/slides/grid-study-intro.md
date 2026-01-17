---
class: py-10 no-page-number
transition: fade
---

<script setup>
import { computed } from 'vue'
import LaTeX from '../components/LaTeX.vue'
import PlotlyChart from '../components/PlotlyChart.vue'

// Grid scan data
const gridData = {
  "MX-1000_MY-100": { "passed": 8909, "total": 184000 },
  "MX-1000_MY-125": { "passed": 10121, "total": 183999 },
  "MX-1000_MY-150": { "passed": 10889, "total": 184000 },
  "MX-1000_MY-190": { "passed": 11665, "total": 183999 },
  "MX-1000_MY-250": { "passed": 12716, "total": 183999 },
  "MX-1000_MY-300": { "passed": 13927, "total": 183998 },
  "MX-1000_MY-350": { "passed": 14812, "total": 183999 },
  "MX-1000_MY-400": { "passed": 15613, "total": 183997 },
  "MX-1000_MY-450": { "passed": 16416, "total": 184000 },
  "MX-1000_MY-500": { "passed": 17716, "total": 184000 },
  "MX-1000_MY-60": { "passed": 3538, "total": 183999 },
  "MX-1000_MY-600": { "passed": 19309, "total": 184000 },
  "MX-1000_MY-70": { "passed": 4708, "total": 183064 },
  "MX-1000_MY-700": { "passed": 19655, "total": 182124 },
  "MX-1000_MY-80": { "passed": 6070, "total": 183998 },
  "MX-1000_MY-800": { "passed": 15683, "total": 181192 },
  "MX-1000_MY-90": { "passed": 7423, "total": 183257 },
  "MX-240_MY-100": { "passed": 2261, "total": 183999 },
  "MX-240_MY-60": { "passed": 2099, "total": 183999 },
  "MX-240_MY-70": { "passed": 2145, "total": 184026 },
  "MX-240_MY-80": { "passed": 2168, "total": 183998 },
  "MX-240_MY-90": { "passed": 2175, "total": 184000 },
  "MX-280_MY-100": { "passed": 3515, "total": 183998 },
  "MX-280_MY-125": { "passed": 3473, "total": 183995 },
  "MX-280_MY-150": { "passed": 2644, "total": 183998 },
  "MX-280_MY-60": { "passed": 3408, "total": 183999 },
  "MX-280_MY-70": { "passed": 3408, "total": 183999 },
  "MX-280_MY-80": { "passed": 3326, "total": 182137 },
  "MX-280_MY-90": { "passed": 3388, "total": 180254 },
  "MX-300_MY-100": { "passed": 4127, "total": 183996 },
  "MX-300_MY-125": { "passed": 4091, "total": 183998 },
  "MX-300_MY-150": { "passed": 3672, "total": 184024 },
  "MX-300_MY-60": { "passed": 3980, "total": 183997 },
  "MX-300_MY-70": { "passed": 4027, "total": 183999 },
  "MX-300_MY-80": { "passed": 4094, "total": 183998 },
  "MX-300_MY-90": { "passed": 4083, "total": 184000 },
  "MX-320_MY-100": { "passed": 4852, "total": 183998 },
  "MX-320_MY-125": { "passed": 4972, "total": 183997 },
  "MX-320_MY-150": { "passed": 4674, "total": 183997 },
  "MX-320_MY-60": { "passed": 4620, "total": 183067 },
  "MX-320_MY-70": { "passed": 4671, "total": 183999 },
  "MX-320_MY-80": { "passed": 4679, "total": 183999 },
  "MX-320_MY-90": { "passed": 4805, "total": 183068 },
  "MX-360_MY-125": { "passed": 6473, "total": 183996 },
  "MX-360_MY-60": { "passed": 6054, "total": 182129 },
  "MX-360_MY-70": { "passed": 6192, "total": 183998 },
  "MX-360_MY-80": { "passed": 6192, "total": 184000 },
  "MX-400_MY-100": { "passed": 8013, "total": 184000 },
  "MX-400_MY-150": { "passed": 8177, "total": 184000 },
  "MX-400_MY-250": { "passed": 5066, "total": 183996 },
  "MX-400_MY-60": { "passed": 7758, "total": 183998 },
  "MX-400_MY-80": { "passed": 7840, "total": 183998 },
  "MX-400_MY-90": { "passed": 7861, "total": 184000 },
  "MX-500_MY-100": { "passed": 11315, "total": 183999 },
  "MX-500_MY-125": { "passed": 11602, "total": 183996 },
  "MX-500_MY-150": { "passed": 11962, "total": 183062 },
  "MX-500_MY-250": { "passed": 11810, "total": 183998 },
  "MX-500_MY-300": { "passed": 9453, "total": 176502 },
  "MX-500_MY-60": { "passed": 10149, "total": 182125 },
  "MX-500_MY-70": { "passed": 10926, "total": 183998 },
  "MX-500_MY-80": { "passed": 11084, "total": 183061 },
  "MX-500_MY-90": { "passed": 11256, "total": 183999 },
  "MX-600_MY-100": { "passed": 12841, "total": 183998 },
  "MX-600_MY-125": { "passed": 13195, "total": 184000 },
  "MX-600_MY-150": { "passed": 13915, "total": 183999 },
  "MX-600_MY-250": { "passed": 15070, "total": 181206 },
  "MX-600_MY-300": { "passed": 15378, "total": 184000 },
  "MX-600_MY-400": { "passed": 11882, "total": 184000 },
  "MX-600_MY-60": { "passed": 9586, "total": 182130 },
  "MX-600_MY-70": { "passed": 11503, "total": 183999 },
  "MX-600_MY-80": { "passed": 12255, "total": 183999 },
  "MX-600_MY-90": { "passed": 12795, "total": 183998 },
  "MX-650_MY-100": { "passed": 12814, "total": 183998 },
  "MX-650_MY-125": { "passed": 13497, "total": 183999 },
  "MX-650_MY-150": { "passed": 14308, "total": 183999 },
  "MX-650_MY-190": { "passed": 15024, "total": 183999 },
  "MX-650_MY-250": { "passed": 15949, "total": 184000 },
  "MX-650_MY-300": { "passed": 16460, "total": 184000 },
  "MX-650_MY-350": { "passed": 16344, "total": 183997 },
  "MX-650_MY-400": { "passed": 15197, "total": 183999 },
  "MX-650_MY-450": { "passed": 12682, "total": 184000 },
  "MX-650_MY-500": { "passed": 8165, "total": 183999 },
  "MX-650_MY-60": { "passed": 8508, "total": 183996 },
  "MX-650_MY-70": { "passed": 10959, "total": 183074 },
  "MX-650_MY-80": { "passed": 12114, "total": 184000 },
  "MX-650_MY-90": { "passed": 12597, "total": 183997 },
  "MX-700_MY-100": { "passed": 12780, "total": 183999 },
  "MX-700_MY-125": { "passed": 13434, "total": 183996 },
  "MX-700_MY-150": { "passed": 14015, "total": 182127 },
  "MX-700_MY-250": { "passed": 16120, "total": 183998 },
  "MX-700_MY-300": { "passed": 16989, "total": 183999 },
  "MX-700_MY-400": { "passed": 17090, "total": 183999 },
  "MX-700_MY-500": { "passed": 13345, "total": 183997 },
  "MX-700_MY-60": { "passed": 7164, "total": 178389 },
  "MX-700_MY-70": { "passed": 10080, "total": 182133 },
  "MX-700_MY-80": { "passed": 11614, "total": 184000 },
  "MX-700_MY-90": { "passed": 12391, "total": 183080 },
  "MX-800_MY-100": { "passed": 12082, "total": 183998 },
  "MX-800_MY-125": { "passed": 12642, "total": 183061 },
  "MX-800_MY-250": { "passed": 15583, "total": 183999 },
  "MX-800_MY-300": { "passed": 16645, "total": 183999 },
  "MX-800_MY-400": { "passed": 18088, "total": 182136 },
  "MX-800_MY-500": { "passed": 17996, "total": 183999 },
  "MX-800_MY-60": { "passed": 5542, "total": 183996 },
  "MX-800_MY-600": { "passed": 14566, "total": 184000 },
  "MX-800_MY-70": { "passed": 7859, "total": 184000 },
  "MX-800_MY-80": { "passed": 10006, "total": 183999 },
  "MX-800_MY-90": { "passed": 11245, "total": 183087 },
  "MX-900_MY-100": { "passed": 10463, "total": 183997 },
  "MX-900_MY-125": { "passed": 11335, "total": 183997 },
  "MX-900_MY-150": { "passed": 12081, "total": 183999 },
  "MX-900_MY-250": { "passed": 14329, "total": 183999 },
  "MX-900_MY-300": { "passed": 15149, "total": 184000 },
  "MX-900_MY-400": { "passed": 17253, "total": 184000 },
  "MX-900_MY-500": { "passed": 18972, "total": 183999 },
  "MX-900_MY-60": { "passed": 4370, "total": 183998 },
  "MX-900_MY-600": { "passed": 19176, "total": 183999 },
  "MX-900_MY-70": { "passed": 6147, "total": 184000 },
  "MX-900_MY-700": { "passed": 15283, "total": 183999 },
  "MX-900_MY-80": { "passed": 7817, "total": 184000 },
  "MX-900_MY-90": { "passed": 9421, "total": 183997 }
}

// Parse data for Plotly with fixed axis indices
const plotData = computed(() => {
  // First pass: collect all unique mX and mY values
  const uniqueMX = new Set()
  const uniqueMY = new Set()
  const dataPoints = []

  Object.entries(gridData).forEach(([key, value]) => {
    const match = key.match(/MX-(\d+)_MY-(\d+)/)
    if (match) {
      const mx = parseInt(match[1])
      const my = parseInt(match[2])
      uniqueMX.add(mx)
      uniqueMY.add(my)
      dataPoints.push({ mx, my, passed: value.passed, total: value.total })
    }
  })

  // Sort and create index mappings
  const sortedMX = Array.from(uniqueMX).sort((a, b) => a - b)
  const sortedMY = Array.from(uniqueMY).sort((a, b) => a - b)
  
  const mXMap = new Map()
  sortedMX.forEach((val, idx) => mXMap.set(val, idx + 1))
  
  const mYMap = new Map()
  sortedMY.forEach((val, idx) => mYMap.set(val, idx + 1))

  // Second pass: map to indices and collect data
  const xIndices = []
  const yIndices = []
  const passed = []
  const hoverText = []

  dataPoints.forEach(({ mx, my, passed: p, total: t }) => {
    xIndices.push(mXMap.get(mx))
    yIndices.push(mYMap.get(my))
    passed.push(p)
    hoverText.push(`m<sub>X</sub>: ${mx} GeV<br>m<sub>Y</sub>: ${my} GeV<br>Passed: ${p.toLocaleString()}<br>Total: ${t.toLocaleString()}`)
  })

  return {
    type: 'scatter',
    mode: 'markers',
    x: xIndices,
    y: yIndices,
    marker: {
      size: (() => {
        const minPassed = Math.min(...passed)
        const maxPassed = Math.max(...passed)
        const range = maxPassed - minPassed
        // Normalize to a smaller range (2 to 5) with less variation
        return passed.map(p => {
          const normalized = (p - minPassed) / range
          // Use a gentler curve (square root of normalized) to reduce variation
          return 6 + Math.sqrt(normalized) * 5
        })
      })(),
      color: passed,
      colorscale: [[0, 'rgba(34, 211, 238, 0.3)'], [0.5, 'rgba(139, 92, 246, 0.6)'], [1, 'rgba(167, 139, 250, 0.9)']],
      colorbar: {
        title: 'Passed Events',
        titlefont: { color: 'rgba(255, 255, 255, 0.8)', size: 11 },
        tickfont: { color: 'rgba(255, 255, 255, 0.7)', size: 10 },
        thickness: 15,
        len: 0.6,
        x: 1.05,
        xpad: 5
      },
      line: {
        color: 'rgba(255, 255, 255, 0.2)',
        width: 0.1
      },
      sizemin: 2,
      sizemax: 5
    },
    text: hoverText,
    hovertemplate: '%{text}<extra></extra>',
    showlegend: false
  }
})

// Create axis tick mappings
const axisMappings = computed(() => {
  const uniqueMX = new Set()
  const uniqueMY = new Set()

  Object.keys(gridData).forEach(key => {
    const match = key.match(/MX-(\d+)_MY-(\d+)/)
    if (match) {
      uniqueMX.add(parseInt(match[1]))
      uniqueMY.add(parseInt(match[2]))
    }
  })

  const sortedMX = Array.from(uniqueMX).sort((a, b) => a - b)
  const sortedMY = Array.from(uniqueMY).sort((a, b) => a - b)

  return {
    xTicks: sortedMX.map((val, idx) => idx + 1),
    xLabels: sortedMX.map(val => val.toString()),
    yTicks: sortedMY.map((val, idx) => idx + 1),
    yLabels: sortedMY.map(val => val.toString())
  }
})

const plotLayout = computed(() => ({
  title: {
    text: 'Signal Statistics',
    font: { size: 14, color: 'rgba(255, 255, 255, 0.9)', family: 'system-ui, sans-serif' },
    x: 0.45,
    xanchor: 'center'
  },
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
  font: {
    color: 'rgba(255, 255, 255, 0.8)',
    family: 'system-ui, sans-serif',
    size: 11
  },
  xaxis: {
    title: {
      text: 'm<sub>X</sub> [GeV]',
      font: { size: 12, color: 'rgba(148, 163, 184, 0.9)' },
      standoff: 10
    },
    tickfont: { size: 10, color: 'rgba(148, 163, 184, 0.7)' },
    tickmode: 'array',
    tickvals: axisMappings.value.xTicks,
    ticktext: axisMappings.value.xLabels,
    showgrid: true,
    gridcolor: 'rgba(255, 255, 255, 0.05)',
    gridwidth: 1,
    linecolor: 'rgba(34, 211, 238, 0.4)',
    zeroline: false
  },
  yaxis: {
    title: {
      text: 'm<sub>Y</sub> [GeV]',
      font: { size: 12, color: 'rgba(148, 163, 184, 0.9)' },
      standoff: 10
    },
    tickfont: { size: 10, color: 'rgba(148, 163, 184, 0.7)' },
    tickmode: 'array',
    tickvals: axisMappings.value.yTicks,
    ticktext: axisMappings.value.yLabels,
    showgrid: true,
    gridcolor: 'rgba(255, 255, 255, 0.05)',
    gridwidth: 1,
    linecolor: 'rgba(34, 211, 238, 0.4)',
    zeroline: false
  },
  margin: { l: 50, r: 15, t: 20, b: 50 },
  height: 300,
  width: 400
}))
</script>

<h1> <span class="gradient-animated">EveNet</span> Grid Study: X → YH</h1>

<span class="text-lg text-zinc-300">Large-parameter space benchmark: Search for Heavy Scalar</span>

<div class="mt-10" />

<div class="content-layout">
  <!-- Left: Motivation and Challenge (1/2 width) -->
  <div class="content-left">
    <!-- Motivation -->
    <div v-click="1" class="content-block">
      <div class="question-label motivation-label">
        Motivation
      </div>
      <div class="content-text">
        <div class="content-line motivation-line">
          <span class="highlight-cyan">Multi-parameter BSM models</span> <br/> → <span class="highlight-cyan">dense experimental grid scans</span>
        </div>
        <div class="content-line motivation-line">
          X → YH: a stress test for <span class="highlight-cyan">model generalization</span>
        </div>
      </div>
    </div>
    <!-- Challenge -->
    <div v-click="2" class="content-block">
      <div class="question-label challenge-label">
        Challenge
      </div>
      <div class="content-text">
        <div class="content-line challenge-line">
          <span class="highlight-orange">Sparse signal</span>: <span class="highlight-orange">~1k–10k</span> per mass point
        </div>
        <div class="content-line challenge-line">
          <span class="highlight-orange">Background-dominated</span> training <br/>→ <span class="highlight-orange">slow convergence</span>
        </div>
        <div class="content-line challenge-line">
          <span class="highlight-orange">Signal kinematics</span> can be <span class="highlight-orange">very different</span> across masses
        </div>
        <div class="content-line challenge-line">
          <span class="highlight-orange">Scratch models</span> <span class="highlight-orange">fail</span> to converge quickly and stably
        </div>
      </div>
    </div>
  </div>
  <!-- Right: Plotly Chart (1/2 width) -->
  <div v-click="2" class="content-right">
    <PlotlyChart
      :data="[plotData]"
      :layout="plotLayout"
    />
  </div>
</div>

<!-- Key Takeaway -->
<div v-click="3" class="key-takeaway">
  <div class="takeaway-main">
    Foundation models excel in large parameter-space searches
  </div>
  <div class="takeaway-sub">
    Transfer learning → strong performance + faster convergence
  </div>
</div>

<style>
/* ============================================
   LAYOUT STRUCTURE
   ============================================ */
.content-layout {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  min-height: 0;
}

.content-left {
  flex: 0 0 55%; /* Left column width - adjust percentage (e.g., 50%, 55%, 60%) */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.content-right {
  flex: 0 0 45%; /* Right column width - adjust percentage (e.g., 50%, 45%, 40%) */
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.content-block {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding-bottom: 1rem;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.content-right {
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.content-text {
  flex: 1;
  min-width: 0; /* Allow text to shrink if needed */
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Gap between lines - adjust this value (e.g., 0.5rem, 0.75rem, 1rem) */
  color: rgba(255, 255, 255, 0.85);
}

/* ============================================
   QUESTION LABELS
   ============================================ */
.question-label {
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 6px;
  flex: 0 0 140px; /* Left column width - adjust this value */
  padding-top: 2px;
}

.motivation-label {
  color: rgba(103, 232, 249, 0.95);
  border-bottom: 1.5px solid rgba(103, 232, 249, 0.4);
}

.challenge-label {
  color: rgba(253, 186, 116, 0.95);
  border-bottom: 1.5px solid rgba(253, 186, 116, 0.4);
}

/* ============================================
   CONTENT LINES
   ============================================ */
.content-line {
  font-size: 15px;
  line-height: 1.25;
  position: relative;
  padding-left: 18px;
}

.motivation-line::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(103, 232, 249, 0.5);
  font-weight: 300;
}

.challenge-line::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(253, 186, 116, 0.5);
  font-weight: 300;
}

/* ============================================
   HIGHLIGHTS
   ============================================ */
.highlight-cyan {
  font-weight: 600;
  color: rgb(103, 232, 249);
}

.highlight-orange {
  font-weight: 600;
  color: rgb(253, 186, 116);
}

/* ============================================
   KEY TAKEAWAY
   ============================================ */
.key-takeaway {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  text-align: center;
}

.takeaway-main {
  font-size: 20px;
  font-weight: 600;
  color: rgba(196, 181, 253, 0.95);
  margin-bottom: 0.4rem;
  line-height: 1.2;
}

.takeaway-sub {
  font-size: 15px;
  color: rgba(196, 181, 253, 0.8);
}

/* ============================================
   CHART STYLING
   ============================================ */
</style>
