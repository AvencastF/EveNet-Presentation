<script setup lang="ts">
import { normalize } from '../composable/math.ts'
import LaTeX from './LaTeX.vue'

// Map feature/condition names to LaTeX formulas
const featureNameToLaTeX: Record<string, string> = {
  'log(E)': '\\log(E)',
  'log(pT)': '\\log(p_T)',
  'eta': '\\eta',
  'phi': '\\phi',
  'isBtag': '\\text{isBtag}',
  'isLepton': '\\text{isLepton}',
  'Q': 'Q',
}

const conditionNameToLaTeX: Record<string, string> = {
  'met': 'E_T^{\\text{miss}}',
  'met_phi': '\\phi_{E_T^{\\text{miss}}}',
  'nLepton': 'N_\\ell',
  'nbJet': 'N_b',
  'nJet': 'N_j',
  'HT': 'H_T',
  'HT_lep': 'H_T^{\\ell}',
  'M_all': 'M_{\\text{all}}',
  'M_leps': 'M_{\\ell}',
  'M_bjets': 'M_b',
}

function getLaTeXFormula(name: string, mapping: Record<string, string>): string | null {
  return mapping[name] || null
}

const colors = [
  { text: 'text-sky-300', bg: 'bg-sky-800/30', border: 'border-sky-800' },
  { text: 'text-violet-300', bg: 'bg-violet-800/30', border: 'border-violet-800' },
  { text: 'text-teal-300', bg: 'bg-teal-800/30', border: 'border-teal-800' },
]

const grayTextColors = [
  'text-neutral-200',
  'text-neutral-300',
  'text-neutral-400',
  'text-neutral-500',
  'text-neutral-600',
  'text-neutral-700',
]

function grayTextColorBasedOnSoftMax(value: number, ofValues: number[]) {
  const normalized = normalize(value, ofValues)
  const index = Math.floor(normalized * (grayTextColors.length - 1))
  return grayTextColors[index]
}

const featureNames = ['log(E)', 'log(pT)', 'eta', 'phi', 'isBtag', 'isLepton', 'Q']

function formatFeatureValue(name: string, value: number) {
  if (name === 'isBtag' || name === 'isLepton') return String(Math.round(value))
  if (name === 'Q') return String(Math.round(value))
  if (name === 'eta') return value.toFixed(1)
  if (name === 'phi') return value.toFixed(1)
  // log(E), log(pT)
  return value.toFixed(1)
}

const tokenTypeColors: Record<string, { text: string; bg: string; border: string }> = {
  l: colors[0],
  b: colors[1],
  j: colors[2],
}

const dataHead = [
  { type: 'l', label: 'lep', features: [6.1, 4.2, 1.12, 2.48, 0, 1, -1] },
  { type: 'b', label: 'b-jet', features: [7.4, 5.1, -0.63, -1.32, 1, 0, 0] },
  { type: 'l', label: 'lep', features: [5.8, 3.9, 0.27, 0.91, 0, 1, +1] },
  { type: 'j', label: 'jet', features: [6.5, 4.6, 1.73, 1.14, 0, 0, +1] },
  { type: 'j', label: 'jet', features: [7.1, 5.0, -0.22, -0.58, 0, 0, 0] },
  { type: 'j', label: 'jet', features: [7.1, 5.0, -0.22, -0.58, 0, 0, 0] },
  { type: 'j', label: 'jet', features: [7.1, 5.0, -0.22, -0.58, 0, 0, 0] },
  { type: 'b', label: 'b-jet', features: [7.1, 5.0, -0.22, -0.58, 1, 0, 0] },
] as const

const tailTitle = 'padding'
const tailFeatures = [0, 0, 0, 0, 0, 0, 0]

const conditionNames = [
  'met',
  'met_phi',
  'nLepton',
  'nbJet',
  'nJet',
  'HT',
  'HT_lep',
  'M_all',
  'M_leps',
  'M_bjets',
] as const
</script>

<template>
  <div class="mt-5 flex flex-col gap-2">
    <!-- Left card: point-cloud input -->
    <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 w-full" transition="all ease-in-out"
      duration-1500 :class="[
        [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
        [1].includes($slidev.nav.clicks) ? 'opacity-100' : '',
        'delay-100',
      ]">
      <div class="mb-3 flex items-baseline justify-between gap-2">
        <div class="text-base font-semibold text-white/90 flex items-center gap-2">
          <div i-carbon:grid class="text-white/80" />
          <span>Point-cloud input</span>
        </div>
        <div class="text-sm text-white/60 text-right">
          Each column is one particle; rows are per-particle features used by the network.
        </div>
      </div>

      <div class="flex flex-row">
        <div class="flex-rol flex gap-6">
          <!-- Feature name column (aligned with feature values) -->
          <div class="flex flex-col" transition="all ease-in-out" duration-1500 :class="[
            [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
            [1].includes($slidev.nav.clicks) ? 'opacity-100' : '',
            'delay-200',
          ]">
            <div class="flex items-center justify-center rounded-full mb-3">
              <!-- spacer to align with token chips -->
              <span class="px-1.5 py-0.5 text-xs opacity-0 select-none">.</span>
            </div>
            <!-- No outer bracket for feature-name column -->
            <div class="relative mx-1 flex flex-col px-1">
              <div v-for="(name, i) in featureNames" :key="i" class="py-0.3">
                <span class="border-2 rounded-md border-solid px-1.5 py-0.5 text-xs min-w-18 text-center text-white/90 flex items-center justify-center"
                  :class="[
                    i < 4
                      ? 'bg-sky-300/10 border-sky-500/15 text-sky-100/85'
                      : 'bg-amber-200/10 border-amber-500/15 text-amber-100/90',
                  ]">
                  <LaTeX v-if="getLaTeXFormula(name, featureNameToLaTeX)" :formula="getLaTeXFormula(name, featureNameToLaTeX)!" />
                  <span v-else>{{ name }}</span>
                </span>
              </div>
            </div>
          </div>

          <template v-for="(item, index) in dataHead" :key="index">
            <div class="flex flex-col" transition="all ease-in-out" duration-1500 :class="[
              [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
              [1].includes($slidev.nav.clicks) ? 'opacity-100' : '',
              `delay-${200 * (index + 1)}`,
            ]">
              <div class="flex items-center justify-center rounded-full mb-3">
                <span class="border-2 rounded-md border-solid px-1.5 py-0.3 text-xs" :class="[
                  [
                    (tokenTypeColors[item.type] ?? colors[0]).text,
                    (tokenTypeColors[item.type] ?? colors[0]).bg,
                    (tokenTypeColors[item.type] ?? colors[0]).border,
                  ],
                ]">
                  {{ item.label }}
                </span>
              </div>
              <div class="vertical-vector relative mx-1 flex flex-col px-2 font-math">
                <div v-for="(value, i) in item.features" :key="i" class="py-0.3">
                  <span class="text-white text-sm leading-none">
                    {{ formatFeatureValue(featureNames[i], value) }}
                  </span>
                </div>
              </div>
            </div>
          </template>

          <!-- Tail: shared title spanning the last two elements ("..." + final embedding) -->
          <div class="flex flex-col" transition="all ease-in-out" duration-1500 :class="[
            [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
            [1].includes($slidev.nav.clicks) ? 'opacity-100' : '',
            `delay-${200 * (dataHead.length + 1)}`,
          ]">
            <div class="flex items-center justify-center rounded-full mb-3">
              <span class="border-2 rounded-md border-solid px-1.5 py-0.3 text-xs min-w-14 text-center" :class="[
                'text-white bg-white/10 border-white/70',
              ]">
                {{ tailTitle }}
              </span>
            </div>

            <div class="flex flex-row gap-0.5">
              <div class="relative flex flex-col px-2 font-math h-full justify-center text-2xl"
                transition="all ease-in-out" duration-1500 :class="[
                  [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
                  [1, 2].includes($slidev.nav.clicks) ? 'opacity-100' : '',
                  `delay-${200 * (dataHead.length + 1)}`,
                ]">
                <span>...</span>
              </div>

              <div class="vertical-vector relative mx-1 flex flex-col px-1 font-math" transition="all ease-in-out"
                duration-1500 :class="[
                  [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
                  [1].includes($slidev.nav.clicks) ? 'opacity-100' : '',
                  `delay-${200 * (dataHead.length + 2)}`,
                ]">
                <div v-for="(value, i) in tailFeatures" :key="i" class="py-0.3">
                  <span class="text-white text-sm leading-none">
                    {{ formatFeatureValue(featureNames[i], value) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom card: event-level conditions -->
    <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 w-full" transition="all ease-in-out"
      duration-1500 :class="[
        [0,1].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
        [2].includes($slidev.nav.clicks) ? 'opacity-100' : '',
        'delay-150',
      ]">
      <div class="mb-3 flex items-baseline justify-between gap-4">
        <div class="text-base font-semibold text-white/90 flex items-center gap-2">
          <div i-carbon:data-volume class="text-white/80" />
          <span>Global Conditions</span>
        </div>
        <div class="text-sm text-white/60 text-right">
          Event-level features conditioning the model.
        </div>
      </div>

      <!-- Horizontal condition vector + aligned feature-name row -->
      <div class="overflow-x-auto" transition="all ease-in-out" duration-1500 :class="[
        [0].includes($slidev.nav.clicks) ? 'opacity-0 translate-y--4' : '',
        [1].includes($slidev.nav.clicks) ? 'opacity-100' : '',
        'delay-200',
      ]">
        <div class="min-w-max">
          <!-- Feature names (aligned to the 1xN vector entries) -->
          <div class="mb-2 grid grid-cols-10 gap-x-2 px-2 place-items-center">
            <div v-for="(name, i) in conditionNames" :key="name" class="w-18 flex justify-center">
              <span class="border-2 rounded-md border-solid px-1.5 py-0.5 text-xs w-18 text-center text-white/90 flex items-center justify-center"
                :class="[
                  i < 2
                    ? 'bg-sky-300/10 border-sky-500/15 text-sky-100/85'
                    : i < 5
                      ? 'bg-amber-200/10 border-amber-500/15 text-amber-100/90'
                      : i < 7
                        ? 'bg-green-200/10 border-green-500/15 text-green-100/90'
                        : 'bg-purple-200/10 border-purple-500/15 text-purple-100/90',
                ]">
                <LaTeX v-if="getLaTeXFormula(name, conditionNameToLaTeX)" :formula="getLaTeXFormula(name, conditionNameToLaTeX)!" />
                <span v-else>{{ name }}</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.vertical-vector::before,
.vertical-vector::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  border: 1px solid rgb(255, 255, 255);
}

.vertical-vector::before {
  left: -6px;
  border-right: none;
}

.vertical-vector::after {
  right: -6px;
  border-left: none;
}
</style>