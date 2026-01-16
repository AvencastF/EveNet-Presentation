---
class: py-10
clicks: 0
transition: 'fade'
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
</script>

# <span class="gradient-animated">EveNet</span> Downstream Tasks Overview

<span>Precision Measurement, Search for New Physics, Data-Driven Analysis</span>

<div class="mt-6 w-full">
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
          <div class="ml-6 mt-1"><LaTeX formula="t\bar t\!\to\!b\ell\nu+bqq"/></div>
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
      <div class="pt-2 border-t border-white/10">
        <div class="rounded-lg bg-black/20 border border-white/10 h-illustration flex items-center justify-center">
          <div class="text-xs text-white/40 italic">Task Illustration</div>
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
      <div class="pt-2 border-t border-white/10">
        <div class="rounded-lg bg-black/20 border border-white/10 h-illustration flex items-center justify-center">
          <div class="text-xs text-white/40 italic">Task Illustration</div>
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
          Different detector, full simulation, pile-up
        </div>
      </div>
      <!-- Illustration Placeholder - Fixed Height -->
      <div class="pt-2 border-t border-white/10">
        <div class="rounded-lg bg-black/20 border border-white/10 h-illustration flex items-center justify-center">
          <div class="text-xs text-white/40 italic">Task Illustration</div>
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
      <div class="pt-2 border-t border-white/10">
        <div class="rounded-lg bg-black/20 border border-white/10 h-illustration flex items-center justify-center">
          <div class="text-xs text-white/40 italic">Task Illustration</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.card-title {
  font-size: 16px;
}

.h-dataset-badge {
  height: 2.5rem; /* 88px - equivalent to h-22 */
}

.h-task-details {
  height: 8rem; /* 80px - equivalent to h-20 */
}

.h-illustration {
  height: 5rem; /* 80px - equivalent to h-20 */
}
</style>
