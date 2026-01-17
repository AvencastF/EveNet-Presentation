---
class: py-10 no-page-number
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
</script>

<h1>Search for Heavy Scalar: <span class="gradient-animated">X → YH</span></h1>

<span class="text-lg text-zinc-300">Large-parameter space benchmark</span>

<div class="mt-8" />

<div class="content-layout">
  <!-- Left: Motivation and Challenge (2/3 width) -->
  <div class="content-left">
    <!-- Motivation -->
    <div v-click="1" class="content-block">
      <div class="question-label motivation-label">
        Motivation
      </div>
      <div class="content-text">
        <div class="content-line motivation-line">Multiple unconstrained mass parameters in BSM models</div>
        <div class="content-line motivation-line">Must scan <span class="highlight-cyan">hundreds of mass hypotheses</span></div>
        <div class="content-line motivation-line"><LaTeX formula="X \rightarrow YH"/>: canonical multi-parameter benchmark</div>
      </div>
    </div>
    <!-- Challenge -->
    <div v-click="2" class="content-block">
      <div class="question-label challenge-label">
        Challenge
      </div>
      <div class="content-text">
        <div class="content-line challenge-line">Limited signal: <span class="highlight-orange">~1k–10k events</span> per point, <span class="highlight-orange">~110 points</span> total</div>
        <div class="content-line challenge-line">Severe imbalance: large background vs. sparse signal</div>
        <div class="content-line challenge-line">Per-point training: <span class="highlight-orange">inefficient</span> and <span class="highlight-orange">prohibitive</span></div>
      </div>
    </div>
  </div>
  <!-- Right: SVG (1/3 width) -->
  <div class="content-right">
    <svg width="100%" height="auto" viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" class="grid-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#22d3ee" stop-opacity="0.25"/>
          <stop offset="1" stop-color="#22d3ee" stop-opacity="0.08"/>
        </linearGradient>
        <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#a78bfa" stop-opacity="0.4"/>
          <stop offset="1" stop-color="#22d3ee" stop-opacity="0.3"/>
        </linearGradient>
      </defs>
      <g stroke="#22d3ee" stroke-opacity="0.4" stroke-width="1.2" stroke-linecap="round">
        <line x1="70" y1="125" x2="470" y2="125"/>
        <line x1="70" y1="125" x2="70"  y2="35"/>
      </g>
      <g fill="#22d3ee" fill-opacity="0.4">
        <path d="M470 125 l-8 -4 l0 8 z"/>
        <path d="M70 35 l-4 8 l8 0 z"/>
      </g>
      <g fill="#94a3b8" fill-opacity="0.6" font-family="ui-sans-serif, system-ui" font-size="11">
        <text x="458" y="145">mX</text>
        <text x="52" y="42">mY</text>
      </g>
      <rect x="90" y="55" width="360" height="55" rx="10" fill="url(#fade)" opacity="0.9"/>
      <g fill="#22d3ee" fill-opacity="0.6">
        <circle cx="110" cy="65" r="2.2"/><circle cx="145" cy="65" r="2.2"/><circle cx="180" cy="65" r="2.2"/>
        <circle cx="215" cy="65" r="2.2"/><circle cx="250" cy="65" r="2.2"/><circle cx="285" cy="65" r="2.2"/>
        <circle cx="320" cy="65" r="2.2"/><circle cx="355" cy="65" r="2.2"/><circle cx="390" cy="65" r="2.2"/>
        <circle cx="425" cy="65" r="2.2"/>
        <circle cx="110" cy="82" r="2.2"/><circle cx="145" cy="82" r="2.2"/><circle cx="180" cy="82" r="2.2"/>
        <circle cx="215" cy="82" r="2.2"/><circle cx="250" cy="82" r="2.2"/><circle cx="285" cy="82" r="2.2"/>
        <circle cx="320" cy="82" r="2.2"/><circle cx="355" cy="82" r="2.2"/><circle cx="390" cy="82" r="2.2"/>
        <circle cx="425" cy="82" r="2.2"/>
        <circle cx="110" cy="99" r="2.2"/><circle cx="145" cy="99" r="2.2"/><circle cx="180" cy="99" r="2.2"/>
        <circle cx="215" cy="99" r="2.2"/><circle cx="250" cy="99" r="2.2"/><circle cx="285" cy="99" r="2.2"/>
        <circle cx="320" cy="99" r="2.2"/><circle cx="355" cy="99" r="2.2"/><circle cx="390" cy="99" r="2.2"/>
        <circle cx="425" cy="99" r="2.2"/>
      </g>
      <g fill="#a78bfa" fill-opacity="0.85">
        <circle cx="180" cy="82" r="3.3"/>
        <circle cx="285" cy="65" r="3.3"/>
        <circle cx="355" cy="99" r="3.3"/>
      </g>
      <path d="M120 102 C 170 92, 210 74, 260 78 S 360 98, 420 70"
            fill="none" stroke="url(#pathGradient)" stroke-width="2" stroke-linecap="round"/>
      <g>
        <rect x="360" y="18" width="120" height="26" rx="13" fill="#22d3ee" fill-opacity="0.12" stroke="#22d3ee" stroke-opacity="0.3"/>
        <text x="372" y="35" fill="#22d3ee" fill-opacity="0.85"
              font-family="ui-sans-serif, system-ui" font-size="11" font-weight="500">≈110 mass points</text>
      </g>
    </svg>
  </div>
</div>

<!-- Key Takeaway -->
<div v-click="3" class="key-takeaway">
  <div class="takeaway-main">
    Foundation models excel in large parameter-space searches
  </div>
  <div class="takeaway-sub">
    Transfer learning → strong performance in low-statistics regimes
  </div>
</div>

<style>
/* ============================================
   LAYOUT STRUCTURE
   ============================================ */
.content-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.content-left {
  flex: 0 0 66.666%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-right {
  flex: 0 0 33.333%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-block {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.content-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
}

/* ============================================
   QUESTION LABELS
   ============================================ */
.question-label {
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 6px;
  flex: 0 0 160px;
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
  font-size: 16px;
  line-height: 1.2;
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
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  text-align: center;
}

.takeaway-main {
  font-size: 22px;
  font-weight: 600;
  color: rgba(196, 181, 253, 0.95);
  margin-bottom: 0.5rem;
}

.takeaway-sub {
  font-size: 15px;
  color: rgba(196, 181, 253, 0.8);
}

/* ============================================
   SVG STYLING
   ============================================ */
.grid-svg {
  width: 100%;
  height: auto;
  opacity: 0.9;
  filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.2));
}
</style>
