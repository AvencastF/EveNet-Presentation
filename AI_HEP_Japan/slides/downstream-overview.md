---
clicks: 1
transition: 'fade'
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
</script>

# <span class="gradient-animated">EveNet</span> Downstream Tasks Overview

<span>Precision Measurement, Search for New Physics, Data-Driven Analysis</span>

<div class="mt-4 w-full">
  <div class="grid gap-3 items-start w-full" style="grid-template-columns: repeat(4, 1fr);">
    <!-- Task 1: Quantum Correlation (Easy) -->
    <div class="rounded-lg border-2 border-green-800 bg-green-800/15 p-3 flex flex-col relative">
      <!-- Title with bg highlighting -->
      <div class="rounded-lg bg-green-800/25 px-3 py-2 mb-2">
        <div class="card-title font-bold text-white/90">Quantum Correlation</div>
      </div>
      <!-- Dataset Badge - Fixed Height -->
      <div class="mb-2 h-dataset-badge flex items-center">
        <div class="rounded-lg bg-cyan-800/30 border border-cyan-700/50 px-2 py-1.5 text-xs">
          <span class="text-cyan-200 font-semibold">Self-Generated Dataset</span>
        </div>
      </div>
      <!-- Task Details - Fixed Height -->
      <div class="text-xs text-white/80 space-y-2 mb-2 h-task-details overflow-y-auto">
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:api class="text-green-300 shrink-0" />
            <span class="font-semibold text-green-200">Process:</span>
          </div>
          <div class="ml-6 mt-1"><LaTeX formula="t\bar t\!\to\!b\ell\nu+b\ell\nu"/></div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:chart-network class="text-green-300 shrink-0" />
            <span class="font-semibold text-green-200">Heads:</span>
          </div>
          <div class="ml-6 mt-1 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1"><div i-carbon:link class="text-rose-300" /><span class="text-rose-200">ASG</span></span>,
            <span class="inline-flex items-center gap-1"><div i-carbon:data-check class="text-indigo-300" /><span class="text-indigo-200">Sup-Gen</span></span>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:checkmark-outline class="text-green-300 shrink-0" />
            <span class="font-semibold text-green-200">Distribution:</span>
          </div>
          <div class="ml-6 mt-1">In-distribution</div>
        </div>
        <div class="text-xs text-green-200/80 mt-2 italic">
          Dataset seen in pretrain
        </div>
      </div>
      <!-- Illustration Placeholder - Fixed Height -->
      <div class="pt-2 border-t border-white/10 h-illustration">
        <!-- Placeholder state (hidden after first click) -->
        <!-- Results Card (Click 1) -->
        <div v-click="1" class="w-full flex flex-col justify-center result-card-reveal">
            <!-- Title -->
            <div class="text-[14px] text-green-300 font-bold mb-2 flex items-center gap-0.1 mt--1">
              Precision on D [%]
            </div>
            <!-- Chart bars -->
            <div class="space-y-2 result-bars-container">
              <!-- Reference Paper -->
              <div class="result-row">
                <div class="result-name result-name-ref">Ref.</div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-ref" style="width: 100%;">
                    <span class="result-bar-text result-bar-text-ref">5.26</span>
                  </div>
                </div>
              </div>
              <!-- EveNet-SSL -->
              <div class="result-row">
                <div class="result-name result-name-ssl">
                  <span class="gradient-animated" style="font-variant: small-caps;">SSL</span>
                </div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-ssl" style="width: 32.1%;">
                    <span class="result-bar-text result-bar-text-ssl">1.69</span>
                  </div>
                  <div class="result-improvement result-improvement-ssl">
                    <div class="result-improvement-badge">68% ↓</div>
                  </div>
                </div>
              </div>
              <!-- EveNet-Full -->
              <div class="result-row">
                <div class="result-name result-name-full">
                  <span class="gradient-animated" style="font-variant: small-caps;">Full</span>
                </div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-full" style="width: 30.2%;">
                    <span class="result-bar-text result-bar-text-full">1.59</span>
                  </div>
                  <div class="result-improvement result-improvement-full">
                    <div class="result-improvement-badge">70% ↓</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Citation -->
            <div class="text-[9px] text-green-300/90 mt-2 pt-1.5 border-t border-white/5">
              Ref.: <a href="https://doi.org/10.1140/epjc/s10052-022-10245-9" target="_blank" class="underline hover:text-green-200 transition-colors">Eur. Phys. J. C (2022) 82:285</a>
            </div>
        </div>
      </div>
    </div>
    <!-- Task 2: Exotic Higgs Decay (Medium) -->
    <div class="rounded-lg border-2 border-amber-800 bg-amber-800/15 p-3 flex flex-col relative">
      <!-- Title with bg highlighting -->
      <div class="rounded-lg bg-amber-800/25 px-3 py-2 mb-2">
        <div class="card-title font-bold text-white/90">Exotic Higgs Decay</div>
      </div>
      <!-- Dataset Badge - Fixed Height -->
      <div class="mb-2 h-dataset-badge flex items-center">
        <div class="rounded-lg bg-cyan-800/30 border border-cyan-700/50 px-2 py-1.5 text-xs">
          <span class="text-cyan-200 font-semibold">Self-Generated Dataset</span>
        </div>
      </div>
      <!-- Task Details - Fixed Height -->
      <div class="text-xs text-white/80 space-y-2 mb-2 h-task-details overflow-y-auto">
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:api class="text-amber-300 shrink-0" />
            <span class="font-semibold text-amber-200">Process:</span>
          </div>
          <div class="ml-6 mt-1"> <LaTeX formula="H\!\to\!aa\!\to\!bbbb"/> </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:chart-network class="text-amber-300 shrink-0" />
            <span class="font-semibold text-amber-200">Heads:</span>
          </div>
          <div class="ml-6 mt-1 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1"><div i-carbon:chart-bar class="text-sky-300" /><span class="text-sky-200">CLS</span></span>,
            <span class="inline-flex items-center gap-1"><div i-carbon:link class="text-rose-300" /><span class="text-rose-200">ASG</span></span>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:warning-alt class="text-amber-300 shrink-0" />
            <span class="font-semibold text-amber-200">Distribution:</span>
          </div>
          <div class="ml-6 mt-1">Out-of-distribution</div>
        </div>
        <div class="text-xs text-amber-200/80 mt-2 italic">
          Bkg not so far from pretrain
        </div>
      </div>
      <!-- Illustration Placeholder - Fixed Height -->
      <div class="pt-2 border-t border-white/10 h-illustration">
        <!-- Results Card (Click 1) -->
        <div v-click="1" class="w-full flex flex-col justify-center result-card-reveal">
            <!-- Title -->
            <div class="text-[14px] text-amber-300 font-bold mb-2 flex items-center gap-0.1 mt--1">
              Max SIC
            </div>
            <!-- Chart bars -->
            <div class="space-y-2 result-bars-container">
              <!-- Reference: SPANet CLS -->
              <div class="result-row">
                <div class="result-name result-name-ref">SPANet</div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-ref" style="width: 19.0%;">
                    <span class="result-bar-text result-bar-text-ref">1.4</span>
                  </div>
                </div>
              </div>
              <!-- SSL CLS -->
              <div class="result-row">
                <div class="result-name result-name-ssl">
                  <span class="gradient-animated" style="font-variant: small-caps;">SSL</span>
                </div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-ssl" style="width: 48.6%;">
                    <span class="result-bar-text result-bar-text-ssl">3.7</span>
                  </div>
                  <div class="result-improvement result-improvement-ssl">
                    <div class="result-improvement-badge">157% ↑</div>
                  </div>
                </div>
              </div>
              <!-- Full CLS -->
              <div class="result-row">
                <div class="result-name result-name-full">
                  <span class="gradient-animated" style="font-variant: small-caps;">Full</span>
                </div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-full" style="width: 54.0%;">
                    <span class="result-bar-text result-bar-text-full">4.1</span>
                  </div>
                  <div class="result-improvement result-improvement-full">
                    <div class="result-improvement-badge">185% ↑</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Citation -->
            <div class="text-[9px] text-amber-300/90 mt-2 pt-1.5 border-t border-white/5">
              SPANet: <a href="https://www.nature.com/articles/s42005-024-01627-4" target="_blank" class="underline hover:text-amber-200 transition-colors">Commun Phys 7, 139 (2024)</a>
            </div>
        </div>
      </div>
    </div>
    <!-- Task 3: X→YH->bbWW Grid Study (Hard) -->
    <div class="rounded-lg border-2 border-orange-800 bg-orange-800/15 p-3 flex flex-col relative">
      <!-- Title with bg highlighting -->
      <div class="rounded-lg bg-orange-800/25 px-3 py-2 mb-2">
        <div class="card-title font-bold text-white/90">X→YH Grid Study</div>
      </div>
      <!-- Dataset Badge - Fixed Height with neon/gradient effect -->
      <div class="mb-2 h-dataset-badge flex items-center">
        <div class="rounded-lg px-2 py-1.5 text-xs bg-gradient-to-r from-violet-600/40 to-purple-600/40 border border-violet-400/60 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
          <span class="text-violet-100 font-semibold">2016 CMS Open Data</span>
        </div>
      </div>
      <!-- Task Details - Fixed Height -->
      <div class="text-xs text-white/80 space-y-2 mb-2 h-task-details overflow-y-auto">
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:api class="text-orange-300 shrink-0" />
            <span class="font-semibold text-orange-200">Process:</span>
          </div>
          <div class="ml-6 mt-1"><LaTeX formula=" \small{Y}\! \to \!b\bar b, \mathrm{H}\! \to \!\mathrm{WW^*} \! \to \!\ell \nu qq" /></div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:chart-network class="text-orange-300 shrink-0" />
            <span class="font-semibold text-orange-200">Head:</span>
          </div>
          <div class="ml-6 mt-1">
            <span class="inline-flex items-center gap-1"><div i-carbon:chart-bar class="text-sky-300" /><span class="text-sky-200">CLS</span></span>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:warning-alt class="text-orange-300 shrink-0" />
            <span class="font-semibold text-orange-200">Distribution:</span>
          </div>
          <div class="ml-6 mt-1">Out-of-distribution</div>
        </div>
        <div class="text-xs text-orange-200/80 mt-2 italic">
          Full simulation, pile-up
        </div>
      </div>
      <!-- Illustration Placeholder - Fixed Height -->
      <div class="pt-2 border-t border-white/10 h-illustration">
        <!-- New Result Badge (Click 1) -->
        <div v-click="1" class="h-full flex items-center justify-center result-card-reveal">
          <div class="new-result-badge rounded-lg px-4 py-2 bg-gradient-to-r from-orange-600/30 to-orange-500/30 border-2 border-orange-400/50 shadow-[0_0_12px_rgba(251,146,60,0.4)]">
            <div class="text-sm font-bold text-orange-200" style="font-variant: small-caps;">New Result!</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Task 4: Anomaly Detection (Hard) -->
    <div class="rounded-lg border-2 border-rose-800 bg-rose-800/15 p-3 flex flex-col relative">
      <!-- Title with bg highlighting -->
      <div class="rounded-lg bg-rose-800/25 px-3 py-2 mb-2">
        <div class="card-title font-bold text-white/90">Anomaly Detection</div>
      </div>
      <!-- Dataset Badge - Fixed Height with neon/gradient effect (2 badges) -->
      <div class="mb-2 h-dataset-badge flex items-center">
        <div class="rounded-lg px-2 py-1.5 text-xs bg-gradient-to-r from-violet-600/40 to-purple-600/40 border border-violet-400/60 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
          <span class="text-violet-100 font-semibold">2016 CMS Open Data</span>
        </div>
      </div>
      <!-- Task Details - Fixed Height -->
      <div class="text-xs text-white/80 space-y-2 mb-2 h-task-details overflow-y-auto">
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:api class="text-rose-300 shrink-0" />
            <span class="font-semibold text-rose-200">Process:</span>
          </div>
          <div class="ml-6 mt-1"><LaTeX formula="\Upsilon\!\to\!\mu^+\mu^-"/> (Rediscovery)</div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:chart-network class="text-rose-300 shrink-0" />
            <span class="font-semibold text-rose-200">Head:</span>
          </div>
          <div class="ml-6 mt-1">
            <span class="inline-flex items-center gap-1"><div i-carbon:renew class="text-teal-300" /><span class="text-teal-200">SS-Gen</span></span>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <div i-carbon:warning-alt class="text-rose-300 shrink-0" />
            <span class="font-semibold text-rose-200">Distribution:</span>
          </div>
          <div class="ml-6 mt-1">Real Data</div>
        </div>
        <div class="text-xs text-rose-200/80 mt-2 italic">
          Real data only, no simulation
        </div>
      </div>
      <!-- Illustration Placeholder - Fixed Height -->
      <div class="pt-2 border-t border-white/10 h-illustration">
        <!-- Results Card (Click 1) -->
        <div v-click="1" class="w-full flex flex-col justify-center result-card-reveal">
            <!-- Title -->
            <div class="text-[14px] text-rose-300 font-bold mb-2 flex items-center gap-0.1 mt--1">
              Observed Significance
            </div>
            <!-- Chart bars -->
            <div class="space-y-2 result-bars-container">
              <!-- Reference -->
              <div class="result-row">
                <div class="result-name result-name-ref">Ref.</div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-ref" style="width: 45.5%;">
                    <span class="result-bar-text result-bar-text-ref">6.4</span>
                  </div>
                </div>
              </div>
              <!-- SSL -->
              <div class="result-row">
                <div class="result-name result-name-ssl">
                  <span class="gradient-animated" style="font-variant: small-caps;">SSL</span>
                </div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-ssl" style="width: 52.7%;">
                    <span class="result-bar-text result-bar-text-ssl">7.4</span>
                  </div>
                  <!-- Error bar: 7.412 -0.4561 +0.4401 -->
                  <div class="result-error-bar result-error-bar-ssl" style="left: 49.4%; width: 6.3%;">
                    <div class="result-error-line"></div>
                    <div class="result-error-tick result-error-tick-left"></div>
                    <div class="result-error-tick result-error-tick-right"></div>
                  </div>
                  <div class="result-improvement result-improvement-ssl">
                    <div class="result-improvement-badge">1.0σ ↑</div>
                  </div>
                </div>
              </div>
              <!-- Full -->
              <div class="result-row">
                <div class="result-name result-name-full">
                  <span class="gradient-animated" style="font-variant: small-caps;">Full</span>
                </div>
                <div class="result-bar-container">
                  <div class="result-bar result-bar-full" style="width: 54.0%;">
                    <span class="result-bar-text result-bar-text-full">7.6</span>
                  </div>
                  <!-- Error bar: 7.608 -0.4268 +0.4268 -->
                  <div class="result-error-bar result-error-bar-full" style="left: 50.9%; width: 6.1%;">
                    <div class="result-error-line"></div>
                    <div class="result-error-tick result-error-tick-left"></div>
                    <div class="result-error-tick result-error-tick-right"></div>
                  </div>
                  <div class="result-improvement result-improvement-full">
                    <div class="result-improvement-badge">1.2σ ↑</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Citation -->
            <div class="text-[9px] text-rose-300/90 mt-2 pt-1.5 border-t border-white/5">
              Ref.: <a href="https://journals.aps.org/prl/abstract/10.1103/vvv3-5kkl" target="_blank" class="underline hover:text-rose-200 transition-colors">Phys. Rev. Lett. 135, 021902</a>
            </div>
        </div>
      </div>
    </div>
</div>
</div>

<style>
.card-title {
  font-size: 15px;
}

.h-dataset-badge {
  height: 1.75rem; /* 88px - equivalent to h-22 */
}

.h-task-details {
  height: 9.75rem; /* 80px - equivalent to h-20 */
}

.h-illustration {
  height: 8.3rem; /* 80px - equivalent to h-20 */
}

/* Unified result display styles - 3 column layout */
.result-bars-container {
  /* Container for all result rows */
}

.result-row {
  display: grid;
  grid-template-columns: 0.33fr 1fr;
  gap: 0.5rem;
  align-items: center;
}

.result-name {
  text-align: left;
  font-size: 13px;
  font-weight: 500;
}

.result-bar-container {
  position: relative;
  width: 100%;
  padding-right: 0;
}

.result-bar {
  height: 1rem;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 0.5rem;
  transform-origin: left;
  animation: scaleInBar 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

.result-bar-text {
  padding-left: 0.1rem;
  font-size: 11px;
  font-weight: 600;
}

.result-bracket {
  font-size: 10px;
  font-weight: 500;
  opacity: 0.8;
  margin-left: 0.2rem;
}

/* Reference bar styles */
.result-name-ref {
  color: rgba(255, 255, 255, 0.7);
}

.result-value-ref {
  color: rgba(255, 255, 255, 0.9);
}

.result-bar-ref {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  animation-delay: 0.3s;
}

.result-bar-text-ref {
  color: rgba(255, 255, 255, 0.9);
}

/* Full bar styles */
.result-name-full {
  color: rgba(255, 255, 255, 0.8);
}

.result-value-full {
  color: rgba(34, 197, 94, 0.9);
}

.result-bar-full {
  border: 1px solid rgba(34, 197, 94, 0.4);
  background: rgba(34, 197, 94, 0.25);
  animation-delay: 0.5s;
}

.result-bar-text-full {
  color: rgba(187, 247, 208, 0.9);
}

.result-improvement-full {
  position: absolute;
  right: -0.25rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  opacity: 0;
  animation: fadeInHighlight 0.6s ease-in-out forwards;
}

.result-improvement-full .result-improvement-badge {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.1s forwards;
  opacity: 0;
}

/* SSL bar styles - muted/weaker than Full */
.result-name-ssl {
  color: rgba(255, 255, 255, 0.6);
}

.result-value-ssl {
  color: rgba(22, 163, 74, 0.6);
}

.result-bar-ssl {
  border: 1px solid rgba(22, 163, 74, 0.25);
  background: rgba(22, 163, 74, 0.15);
  animation-delay: 0.7s;
}

.result-bar-text-ssl {
  color: rgba(187, 247, 208, 0.7);
}

.result-improvement-ssl {
  position: absolute;
  right: -0.25rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  opacity: 0;
  animation: fadeInHighlight 0.6s ease-in-out forwards;
}

.result-improvement-ssl .result-improvement-badge {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.3s forwards;
  opacity: 0;
  /* Muted styling for SSL - weaker than Full */
  background: rgba(20, 83, 45, 0.4);
  border: 1px solid rgba(34, 197, 94, 0.35);
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
  color: rgba(134, 239, 172, 0.8);
}

/* Improvement badge */
.result-improvement-badge {
  font-size: 11px;
  font-weight: bold;
  margin-right: 0;
  background: rgba(20, 83, 45, 0.6);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  border: 1px solid rgba(34, 197, 94, 0.5);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
  color: rgba(134, 239, 172, 1);
}

/* Error bars for uncertainty visualization */
.result-error-bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 0;
  pointer-events: none;
  opacity: 0;
  animation: fadeInHighlight 0.6s ease-in-out forwards;
}

.result-error-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-1px);
}

.result-error-tick {
  position: absolute;
  top: 0;
  width: 2px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-3px);
}

.result-error-tick-left {
  left: 0;
}

.result-error-tick-right {
  right: 0;
}

/* Error bar colors for SSL */
.result-error-bar-ssl .result-error-line,
.result-error-bar-ssl .result-error-tick {
  background: rgba(187, 247, 208, 0.7);
}

/* Error bar colors for Full */
.result-error-bar-full .result-error-line,
.result-error-bar-full .result-error-tick {
  background: rgba(187, 247, 208, 0.8);
}

/* Animation for result reveals - single click with ease-in-out */
.result-card-reveal {
  animation: fadeInScale 1s ease-in-out forwards;
  opacity: 0;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes scaleInBar {
  0% {
    opacity: 0;
    transform: scaleX(0);
  }
  60% {
    opacity: 1;
    transform: scaleX(1.05);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes fadeInHighlight {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes drawLine {
  0% {
    opacity: 0;
    transform: translateX(-10px) translateY(-50%) scaleX(0);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(-50%) scaleX(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-5px);
  }
  50% {
    opacity: 1;
    transform: scale(1.15) translateY(0);
  }
  70% {
    transform: scale(0.95) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 18px rgba(34, 197, 94, 0.7), 0 0 25px rgba(34, 197, 94, 0.4);
  }
}
</style>
