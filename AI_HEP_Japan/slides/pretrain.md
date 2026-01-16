---
class: py-10
clicks: 1
transition: 'fade'
---

<script setup>
import { ref, computed } from 'vue'
import PlotlyChart from '../components/PlotlyChart.vue'
import datasetProcesses from '../data/dataset-processes.json'

const processes = datasetProcesses.processes

// Define colors for each process (matching the previous color scheme)
const processColors = {
  'QCD': 'rgba(148, 163, 184, 0.85)',
  'tt': 'rgba(59, 130, 246, 0.85)',
  'ttW': 'rgba(34, 197, 94, 0.85)',
  'ttZ': 'rgba(249, 115, 22, 0.85)',
  'W+jets': 'rgba(168, 85, 247, 0.85)',
  'Z+jets': 'rgba(14, 165, 233, 0.85)',
  'WW': 'rgba(139, 92, 246, 0.85)',
  'ZZ': 'rgba(99, 102, 241, 0.85)',
  'WZ': 'rgba(236, 72, 153, 0.85)',
  'HWW': 'rgba(251, 191, 36, 0.85)',
}

const pieChartData = computed(() => [{
  type: 'pie',
  labels: processes.map(p => p.name),
  values: processes.map(p => p.percentage),
  hole: 0,
  textinfo: 'label',
  textposition: 'outside',
  hovertemplate: '<b>%{label}</b><br>%{value}%<extra></extra>',
  marker: {
    colors: processes.map(p => processColors[p.name]),
    line: {
      color: 'rgba(255, 255, 255, 0.15)',
      width: 1.5,
    },
  },
  textfont: {
    color: processes.map(p => processColors[p.name].replace('0.85', '1')),
    size: 12,
    family: 'system-ui, sans-serif',
  },
}])

const pieChartLayout = computed(() => ({
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
  font: {
    color: 'rgba(34, 211, 238, 0.9)',
    family: 'system-ui, sans-serif',
    size: 11,
  },
  showlegend: false,
  margin: { l: 15, r: 15, t: 15, b: 15 },
  height: 220,
  width: 300,
}))
</script>

# <span class="gradient-animated">EveNet</span> with Pretrain

<div class="mt-6 h-full w-full">
  <div class="grid gap-6 items-stretch w-full" style="grid-template-columns: 1fr 1fr; grid-gap: 1.5rem;">
    <!-- Left Column: Dataset Card -->
    <div class="rounded-lg border-2 border-cyan-800 bg-cyan-800/15 p-5 flex flex-col h-full">
      <h2 class="text-2xl font-bold mb-4 flex items-center">
        <div i-carbon:datastore class="text-cyan-300 mr-2 text-xl" />
        Dataset
      </h2>
      <div class="flex flex-col gap-4 flex-1">
        <!-- Pie Chart -->
        <div class="flex justify-center">
          <PlotlyChart
            :data="pieChartData"
            :layout="pieChartLayout"
            width="220"
            height="220"
          />
        </div>
        <!-- Statistics and Info -->
        <div class="rounded-lg border-2 border-cyan-800/50 bg-cyan-900/20 p-3">
          <div class="text-xs text-cyan-200/90 space-y-1.5">
            <div class="flex items-start gap-2">
              <div i-carbon:checkmark-outline class="text-cyan-300 mt-0.5 shrink-0" />
              <span><span class="font-semibold text-cyan-100">10 SM processes</span> covering diverse physics channels</span>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:checkmark-outline class="text-cyan-300 mt-0.5 shrink-0" />
              <span><span class="font-semibold text-cyan-100">3B raw events</span> → <span v-mark="{at: 1, color: 'rgb(139, 92, 246)', type: 'underline' }" class="font-semibold text-violet-100">500M preprocessed</span></span>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:checkmark-outline class="text-cyan-300 mt-0.5 shrink-0" />
              <span><span class="font-semibold text-cyan-100">Complex channels</span> (ttV, VV, HWW) → drive segmentation & neutrino generation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Right Column: Training Strategy Card -->
    <div class="rounded-lg border-2 border-indigo-800 bg-indigo-800/15 p-5 flex flex-col h-full">
      <h2 class="text-2xl font-bold mb-4 flex items-center">
        <div i-carbon:model class="text-teal-300 mr-2 text-xl" />
        2-Stage Hybrid Training
      </h2>
      <div class="flex flex-col justify-between flex-1">
        <!-- Stage 1: Self-Supervised -->
        <div class="rounded-lg border-2 border-teal-800 bg-teal-800/15 p-2">
          <div bg="teal-800/30" px-3 py-1 flex items-center justify-between text-sm mb-2 rounded>
            <div class="flex items-center">
              <div i-carbon:settings class="text-teal-300 mr-2" />
              <span font-bold>Stage 1: Self-Supervised Learning</span>
            </div>
            <span class="gradient-animated" style="font-variant: small-caps;">EveNet-SSL</span>
          </div>
          <div class="text-xs text-white/80 space-y-3">
            <!-- Active Head Highlight -->
            <div class="flex flex-wrap gap-2 mb-2">
              <div class="rounded-lg border-2 border-teal-400 bg-teal-800/30 px-3 py-1.5 flex items-center gap-1.5">
                <div i-carbon:renew class="text-teal-300 text-sm" />
                <span class="font-bold text-teal-100">SS-Gen</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:checkmark-outline class="text-teal-300 mt-0.5 shrink-0" />
              <span>Learns unlabeled point cloud representation</span>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:chart-line class="text-teal-300 mt-0.5 shrink-0" />
              <span>
                <span class="font-semibold text-teal-200">Gradual masking:</span> 10% masked → ramp to 100%
              </span>
            </div>
          </div>
        </div>
        <!-- Stage 2: Full Training -->
        <div class="rounded-lg border-2 border-indigo-800 bg-indigo-800/15 p-2">
          <div bg="indigo-800/30" px-3 py-1 flex items-center justify-between text-sm mb-2 rounded>
            <div class="flex items-center">
              <div i-carbon:settings class="text-indigo-300 mr-2" />
              <span font-bold>Stage 2: Full Training</span>
            </div>
            <span class="gradient-animated" style="font-variant: small-caps;">EveNet-Full</span>
          </div>
          <div class="text-xs text-white/80 space-y-3">
            <!-- Active Heads Highlight -->
            <div class="flex flex-wrap gap-2 mb-2">
              <div class="rounded-lg border-2 border-sky-400 bg-sky-800/30 px-3 py-1.5 flex items-center gap-1.5">
                <div i-carbon:chart-bar class="text-sky-300 text-sm" />
                <span class="font-bold text-sky-100">CLS</span>
              </div>
              <div class="rounded-lg border-2 border-teal-400 bg-teal-800/30 px-3 py-1.5 flex items-center gap-1.5">
                <div i-carbon:renew class="text-teal-300 text-sm" />
                <span class="font-bold text-teal-100">SS-Gen</span>
              </div>
              <div class="rounded-lg border-2 border-indigo-400 bg-indigo-800/30 px-3 py-1.5 flex items-center gap-1.5">
                <div i-carbon:data-check class="text-indigo-300 text-sm" />
                <span class="font-bold text-indigo-100">Sup-Gen</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:checkmark-outline class="text-indigo-300 mt-0.5 shrink-0" />
              <span>Multi-task optimization</span>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:warning class="text-amber-300 mt-0.5 shrink-0" />
              <span>
                <span class="inline-flex gap-1"><div i-carbon:link class="text-rose-300 text-xs" /><span class="font-semibold text-rose-200">Assignment</span></span> head off due to high computational cost
              </span>
            </div>
            <div class="flex items-start gap-2">
              <div i-carbon:chart-line class="text-indigo-300 mt-0.5 shrink-0" />
              <span><span class="font-semibold text-indigo-200">Stability:</span> EMA + warm-up & cosine decay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.mark-delay-300 {
  animation-delay: 300ms;
  -webkit-animation-delay: 300ms;
}
</style>
