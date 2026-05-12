---
clicks: 0
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'

const splitRows = [
  { label: 'Train', value: 263_735, pct: 70.0, cls: 'nu-fill-cyan', icon: 'i-carbon:machine-learning-model' },
  { label: 'Val', value: 75_569, pct: 20.0, cls: 'nu-fill-violet', icon: 'i-carbon:chart-relationship' },
  { label: 'Test', value: 37_681, pct: 10.0, cls: 'nu-fill-amber', icon: 'i-carbon:chart-evaluation' },
]

const recipe = [
  { k: 'EMA', v: 'stable diffusion', icon: 'i-carbon:renew' },
  { k: '300 epochs', v: '4 GPUs, ~1 hour', icon: 'i-carbon:chip' },
  { k: '250 steps', v: 'prediction', icon: 'i-carbon:time' },
]
</script>

# <span class="gradient-animated">EveNet</span> setup

<span class="subtitle text-zinc-300">Neutrino generation setup for <LaTeX formula="H\to WW^*\to \ell\nu\ell\nu" /></span>

<div class="nu-study-page">
  <div class="nu-top-grid">
    <section class="nu-card nu-card-cyan">
      <div class="nu-card-head">
        <div i-carbon:data-base class="text-cyan-300 text-lg" />
        <span>Input sample</span>
      </div>
      <div class="nu-card-body">
        <div class="nu-file-row">
          <div i-carbon:document class="text-cyan-200" />
          <span>mc20_qe_v4_recotruth_merged.h5</span>
        </div>
        <div class="nu-splits">
          <div v-for="row in splitRows" :key="row.label" class="nu-split-row">
            <div class="nu-split-label">
              <div :class="row.icon" class="text-white/75" />
              <span>{{ row.label }}</span>
            </div>
            <div class="nu-split-track">
              <div class="nu-split-fill" :class="row.cls" :style="{ width: `${row.pct}%` }" />
            </div>
            <b>{{ row.value.toLocaleString() }} <span>{{ row.pct.toFixed(1) }}%</span></b>
          </div>
        </div>
        <div class="nu-callout nu-callout-amber">
          <div i-carbon:locked class="text-amber-300" />
          <span>Results are reported on the <b>held-out test set</b> only.</span>
        </div>
      </div>
    </section>
    <section class="nu-card nu-card-violet">
      <div class="nu-card-head">
        <div i-carbon:target class="text-violet-300 text-lg" />
        <span>Training target</span>
      </div>
      <div class="nu-card-body nu-target-body">
        <div class="nu-target-row">
          <div class="nu-process">
            <LaTeX formula="H\to WW^*\to \ell\nu\ell\nu" />
          </div>
          <div i-carbon:arrow-right class="nu-arrow" />
          <div class="nu-target-tags">
            <span class="nu-tag nu-tag-cyan">ν from on-shell W</span>
            <span class="nu-tag nu-tag-pink">ν from off-shell W*</span>
          </div>
        </div>
        <div class="nu-callout nu-callout-pink">
          <div i-carbon:warning-alt class="text-fuchsia-300" />
          <span>Labels follow <b>W virtuality</b>, not lepton charge.</span>
        </div>
        <div class="nu-recipe-grid">
          <div v-for="item in recipe" :key="item.k" class="nu-recipe-item">
            <div :class="item.icon" class="text-indigo-200 text-lg" />
            <b>{{ item.k }}</b>
            <span>{{ item.v }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <section class="nu-card nu-card-emerald nu-pair-card">
    <div class="nu-card-head">
      <div i-carbon:chart-network class="text-emerald-300 text-lg" />
      <span>Post-prediction pairing</span>
    </div>
    <div class="nu-pair-body">
      <div class="nu-pair-rule">
        <div class="nu-rule-kicker">Assignment rule</div>
        <div class="nu-rule-formula">
          <LaTeX formula="\min\bigl|m_{\ell\nu}-M_W\bigr|" />
        </div>
        <p>Pair each generated neutrino with a charged lepton. The pair closer to <LaTeX formula="M_W" /> is the on-shell candidate.</p>
      </div>
      <div class="nu-pair-stage" aria-label="Animated neutrino pairing diagram">
        <svg viewBox="0 0 460 180" class="nu-pair-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pairOn" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#22d3ee" />
              <stop offset="100%" stop-color="#34d399" />
            </linearGradient>
            <linearGradient id="pairOff" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f472b6" />
              <stop offset="100%" stop-color="#a78bfa" />
            </linearGradient>
          </defs>
          <g class="pair-faint">
            <path d="M96 56 C190 30 270 150 364 124" />
            <path d="M96 124 C190 150 270 30 364 56" />
          </g>
          <g class="pair-live">
            <path class="pair-line pair-line-a" d="M96 56 C176 42 284 42 364 56" />
            <path class="pair-line pair-line-b" d="M96 124 C176 138 284 138 364 124" />
          </g>
          <g class="pair-nodes">
            <g transform="translate(68 56)">
              <circle class="pair-node pair-lepton" r="25" />
              <text y="5">ℓ₁</text>
            </g>
            <g transform="translate(68 124)">
              <circle class="pair-node pair-lepton" r="25" />
              <text y="5">ℓ₂</text>
            </g>
            <g transform="translate(392 56)">
              <circle class="pair-node pair-neutrino" r="25" />
              <text y="5">ν₁</text>
            </g>
            <g transform="translate(392 124)">
              <circle class="pair-node pair-neutrino" r="25" />
              <text y="5">ν₂</text>
            </g>
          </g>
          <g class="pair-badge">
            <rect x="166" y="63" width="123" height="50" rx="11" />
            <text x="230" y="85">closest to</text>
            <text x="230" y="105">on-shell W</text>
          </g>
        </svg>
      </div>
      <div class="nu-pair-note">
        <div class="nu-rule-kicker">Sampling choice</div>
        <div class="nu-one">1 solution / event</div>
        <p>Multiple draws are possible, but extra candidate selection can bias distributions. One conditional draw works best here.</p>
      </div>
    </div>
  </section>
</div>

<style>
.nu-study-page {
  height: 404px;
  display: grid;
  grid-template-rows: 200px 196px;
  gap: 12px;
  margin-top: 16px;
}
.nu-top-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-height: 0;
}
.nu-card {
  min-width: 0;
  overflow: hidden;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.55);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.nu-card-cyan {
  border-color: rgba(34, 211, 238, 0.34);
  background: linear-gradient(145deg, rgba(8, 47, 73, 0.54), rgba(15, 23, 42, 0.58));
}
.nu-card-violet {
  border-color: rgba(124, 58, 237, 0.38);
  background: linear-gradient(145deg, rgba(46, 16, 101, 0.52), rgba(15, 23, 42, 0.58));
}
.nu-card-emerald {
  border-color: rgba(16, 185, 129, 0.34);
  background: linear-gradient(145deg, rgba(6, 78, 59, 0.34), rgba(15, 23, 42, 0.62));
}
.nu-card-head {
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.045);
  color: rgba(255, 255, 255, 0.92);
  font-size: 13px;
  font-weight: 850;
}
.nu-card-body {
  height: calc(100% - 32px);
  display: grid;
  align-content: center;
  gap: 9px;
  padding: 11px 14px 12px;
}
.nu-file-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(34, 211, 238, 0.25);
  background: rgba(0, 0, 0, 0.22);
  color: rgba(207, 250, 254, 0.96);
  font: 800 11.5px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}
.nu-splits {
  display: grid;
  gap: 6px;
}
.nu-split-row {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr) 122px;
  align-items: center;
  gap: 9px;
}
.nu-split-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 11px;
  font-weight: 800;
}
.nu-split-row b {
  text-align: right;
  color: rgba(255, 255, 255, 0.88);
  font: 800 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}
.nu-split-row b span {
  color: rgba(255, 255, 255, 0.48);
  font-weight: 700;
}
.nu-split-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.11);
}
.nu-split-fill {
  height: 100%;
  border-radius: inherit;
}
.nu-fill-cyan {
  background: linear-gradient(90deg, #22d3ee, #14b8a6);
}
.nu-fill-violet {
  background: linear-gradient(90deg, #a78bfa, #e879f9);
}
.nu-fill-amber {
  background: linear-gradient(90deg, #fbbf24, #fb923c);
}
.nu-callout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 30px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11.5px;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.78);
}
.nu-callout b {
  color: rgba(254, 240, 138, 0.98);
}
.nu-callout-amber {
  border: 1px solid rgba(245, 158, 11, 0.28);
  background: rgba(120, 53, 15, 0.18);
}
.nu-callout-pink {
  border: 1px solid rgba(232, 121, 249, 0.26);
  background: rgba(112, 26, 117, 0.15);
}
.nu-target-row {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) 28px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
}
.nu-target-body {
  padding-top: 4px;
  align-content: start;
}
.nu-process {
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(167, 139, 250, 0.28);
  background: rgba(0, 0, 0, 0.22);
  color: rgba(237, 233, 254, 0.95);
  font-size: 13px;
  font-weight: 800;
}
.nu-arrow {
  color: rgba(255, 255, 255, 0.54);
  font-size: 19px;
}
.nu-target-tags {
  display: grid;
  gap: 6px;
}
.nu-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
}
.nu-tag-cyan {
  color: rgba(207, 250, 254, 0.98);
  border: 1px solid rgba(34, 211, 238, 0.36);
  background: rgba(8, 145, 178, 0.22);
}
.nu-tag-pink {
  color: rgba(252, 231, 243, 0.98);
  border: 1px solid rgba(244, 114, 182, 0.34);
  background: rgba(157, 23, 77, 0.20);
}
.nu-recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.nu-recipe-item {
  min-height: 43px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1px;
  border-radius: 8px;
  border: 1px solid rgba(129, 140, 248, 0.25);
  background: rgba(49, 46, 129, 0.18);
  text-align: center;
}
.nu-recipe-item b {
  color: rgba(224, 231, 255, 0.98);
  font-size: 11px;
}
.nu-recipe-item span {
  color: rgba(255, 255, 255, 0.62);
  font-size: 9px;
}
.nu-pair-card {
  display: grid;
  grid-template-rows: 32px minmax(0, 1fr);
}
.nu-pair-body {
  display: grid;
  grid-template-columns: 245px minmax(0, 1fr) 245px;
  gap: 14px;
  align-items: center;
  padding: 12px 16px 14px;
}
.nu-pair-rule,
.nu-pair-note {
  min-height: 132px;
  display: grid;
  align-content: center;
  gap: 7px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(0, 0, 0, 0.14);
}
.nu-rule-kicker {
  color: rgba(167, 243, 208, 0.72);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.nu-rule-formula {
  color: rgba(255, 255, 255, 0.96);
  font-size: 14px;
  font-weight: 900;
  text-align: center;
}
.nu-pair-rule p,
.nu-pair-note p {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 11.5px;
  line-height: 1.32;
}
.nu-one {
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(232, 121, 249, 0.36);
  background: rgba(112, 26, 117, 0.18);
  color: rgba(252, 231, 243, 0.98);
  font-size: 13px;
  font-weight: 950;
}
.nu-pair-stage {
  height: 146px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.20);
  background: radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.12), transparent 64%);
}
.nu-pair-svg {
  width: 100%;
  max-width: 438px;
  height: 146px;
  overflow: visible;
}
.pair-node {
  fill: rgba(15, 23, 42, 0.92);
  stroke-width: 2.5;
}
.pair-lepton {
  stroke: rgba(34, 211, 238, 0.92);
}
.pair-neutrino {
  stroke: rgba(167, 139, 250, 0.95);
  stroke-dasharray: 4 4;
  animation: nu-node-pulse 2.8s ease-in-out infinite;
}
.pair-nodes text {
  fill: rgba(248, 250, 252, 0.96);
  font: 800 18px ui-sans-serif, system-ui, sans-serif;
  text-anchor: middle;
}
.pair-faint path {
  fill: none;
  stroke: url(#pairOff);
  stroke-width: 2;
  stroke-dasharray: 5 7;
  opacity: 0.28;
}
.pair-line {
  fill: none;
  stroke: url(#pairOn);
  stroke-width: 3.2;
  stroke-linecap: round;
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  filter: drop-shadow(0 0 7px rgba(34, 211, 238, 0.45));
  animation: nu-draw-pair 4s ease-in-out infinite;
}
.pair-line-b {
  animation-delay: 0.35s;
}
.pair-badge rect {
  fill: rgba(49, 46, 129, 0.48);
  stroke: rgba(129, 140, 248, 0.60);
  stroke-width: 1.3;
}
.pair-badge {
  animation: nu-badge-glow 4s ease-in-out infinite;
}
.pair-badge text {
  fill: rgba(224, 231, 255, 0.95);
  font: 550 18px ui-sans-serif, system-ui, sans-serif;
  text-anchor: middle;
}
@keyframes nu-draw-pair {
  0% {
    stroke-dashoffset: 320;
    opacity: 0.15;
  }
  28%,
  72% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.45;
  }
}
@keyframes nu-node-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(167, 139, 250, 0));
  }
  50% {
    filter: drop-shadow(0 0 9px rgba(167, 139, 250, 0.50));
  }
}
@keyframes nu-badge-glow {
  0%,
  100% {
    opacity: 0.78;
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(129, 140, 248, 0.38));
  }
}
@media (max-width: 900px) {
  .nu-study-page {
    height: auto;
    grid-template-rows: auto auto;
  }
  .nu-top-grid,
  .nu-pair-body {
    grid-template-columns: 1fr;
  }
}
</style>
