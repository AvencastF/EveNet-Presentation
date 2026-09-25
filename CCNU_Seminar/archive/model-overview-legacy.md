---
clicks: 0
transition: 'fade'
---

# <span class="gradient-animated">EveNet</span> Model Summary

<div class="mt-5">
  <!-- 4 columns: Input | Arrows | Encoder | Decoder -->
  <div class="grid w-full gap-x-6" style="grid-template-columns: 19% 8% 30% 39%;">
    <!-- Left: Input Section -->
    <div class="flex flex-col gap-5 pt-12">
      <!-- Point-cloud input -->
      <div
        class="relative rounded-lg overflow-hidden border-2 border-cyan-800 bg-cyan-800/15"
      >
        <div bg="cyan-800/35" px-3 py-1.5 flex items-center text-sm>
          <div i-carbon:grid class="text-cyan-300 mr-2" />
          <span font-bold>Point-cloud input</span>
        </div>
        <div class="px-3 py-2">
          <div class="grid grid-cols-18 gap-1">
            <div
              v-for="i in 126"
              :key="i"
              class="w-1.5 h-1.5 rounded-full"
              :class="[
                (((i - 1) % 18) + 1) > 11
                  ? 'bg-zinc-500/35'
                  : 'bg-white/70',
              ]"
            />
          </div>
        </div>
      </div>
      <!-- Diffusion Time Variable (visual indicator) -->
      <div
        class="relative rounded-lg overflow-hidden border-2 border-amber-800 bg-amber-800/15"
      >
        <div bg="amber-800/35" px-3 py-1.5 flex items-center text-sm>
          <div i-carbon:time class="text-amber-300 mr-2" />
          <span font-bold>Diffusion Time</span>
        </div>
        <div class="px-3 py-2 flex items-center justify-center">
          <NoiseScheduleIllustration
            :width="100"
            :height="60"
            :seed="42"
          />
        </div>
      </div>
      <!-- Global Conditions -->
      <div
        class="relative rounded-lg overflow-hidden border-2 border-violet-800 bg-violet-800/15"
      >
        <div bg="violet-800/35" px-3 py-1.5 flex items-center text-sm>
          <div i-carbon:data-volume class="text-violet-300 mr-2" />
          <span font-bold>Global Conditions</span>
        </div>
        <div class="px-3 py-2">
          <div class="grid grid-cols-10 gap-2">
            <div
              v-for="i in 10"
              :key="i"
              class="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Arrows: Input -> Encoder -->
    <div class="relative flex flex-col gap-0 pt-4">
      <!-- Point-cloud input -> PET Encoder -->
      <div class="w-full min-w-45 translate-y-18">
        <DataFlowArrow icon="i-carbon:grid" accent="cyan" :count="1" />
      </div>
      <!-- Diffusion Time -> PET Encoder (noise injection) -->
      <div class="w-full min-w-27 translate-y-45">
        <DataFlowArrow icon="i-carbon:time" accent="amber" :count="1" />
      </div>
      <!-- Global Conditions -> Global Embedding -->
      <div class="w-full min-w-27 translate-y-60">
        <DataFlowArrow icon="i-carbon:data-volume" accent="violet" :count="1" />
      </div>
      <div class="w-full min-w-5 translate-y--12 translate-x-75">
        <DataFlowArrow icon="i-carbon:grid" accent="cyan" :count="1" />
      </div>
      <!-- Additional arrow for noise injection path -->
      <div class="w-full min-w-32 translate-y--3 translate-x rotate-270">
        <DataFlowArrow icon="i-carbon:time" accent="amber" :count="1" />
      </div>
      <!-- Inject Noise -->
      <div class="w-full min-w-18 translate-y--7 translate-x-50 rotate-270">
        <DataFlowArrow icon="i-carbon:time" accent="amber" :count="1" />
      </div>
      <div class="w-full min-w-42 translate-y--5 translate-x-50">
        <DataFlowArrow icon="i-carbon:time" accent="amber" :count="1" />
      </div>
      <div class="w-full min-w-42 translate-y-10 translate-x-50">
        <DataFlowArrow icon="i-carbon:data-volume" accent="violet" :count="1" />
      </div>
    </div>
    <!-- Middle: Encoder Section -->
    <div class="flex flex-col gap-3 pt-4">
      <!-- PET Encoder -->
      <div
        class="h-full relative rounded-lg overflow-hidden border-2 border-cyan-800 bg-cyan-800/15"
      >
        <div bg="cyan-800/35" px-4 py-2 flex items-center text-sm>
          <div i-carbon:chart-network class="text-cyan-300 mr-2" />
          <span font-bold>Encoders</span>
        </div>
        <div class="px-4 py-4 flex justify-end">
          <div class="grid grid-cols-5 gap-1 p-2 rounded-md bg-black/20 border border-white/10 w-1/2 mr-10">
            <div
              v-for="i in 25"
              :key="i"
              class="w-3 h-3 rounded-sm"
              :class="[
                ([0, 6, 12, 18, 24].includes(i - 1)) 
                  ? 'bg-white/140' 
                  : ([2, 3, 6, 8, 18, 20, 24].includes(i) ? 'bg-white/10' : 'bg-white/50'),
              ]"
            />
          </div>
        </div>
        <div class="px-5 pt-12 flex justify-start w-1/2">
          <svg
            width="70"
            height="60"
            viewBox="0 0 110 80"
            class="rounded-md bg-black/20 border border-white/10 p-2"
          >
            <g stroke="rgba(255,255,255,0.22)" stroke-width="0.6" stroke-linecap="round">
              <template v-for="(iy, i) in [20, 40, 60]" :key="`ih-row-${i}`">
                <line
                  v-for="(hy, j) in [14, 32, 48, 66]"
                  :key="`ih-${i}-${j}`"
                  :x1="18"
                  :y1="iy"
                  :x2="55"
                  :y2="hy"
                />
              </template>
            </g>
            <g stroke="rgba(255,255,255,0.22)" stroke-width="0.6" stroke-linecap="round">
              <template v-for="(hy, i) in [14, 32, 48, 66]" :key="`ho-row-${i}`">
                <line
                  v-for="(oy, j) in [10, 22, 34, 46, 58, 70]"
                  :key="`ho-${i}-${j}`"
                  :x1="55"
                  :y1="hy"
                  :x2="98"
                  :y2="oy"
                />
              </template>
            </g>
            <g>
              <circle v-for="(y, i) in [20, 40, 60]" :key="`in-${i}`" :cx="18" :cy="y" r="3.5" fill="#fff" />
              <circle v-for="(y, i) in [14, 32, 48, 66]" :key="`hid-${i}`" :cx="55" :cy="y" r="3.5" fill="#fff" />
              <circle
                v-for="(y, i) in [10, 22, 34, 46, 58, 70]"
                :key="`out-${i}`"
                :cx="98"
                :cy="y"
                r="3.5"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
        <div class="px-5 pt-9 flex justify-start w-1/2">
          <svg
            width="70"
            height="60"
            viewBox="0 0 110 80"
            class="rounded-md bg-black/20 border border-white/10 p-2"
          >
            <g stroke="rgba(255,255,255,0.22)" stroke-width="0.6" stroke-linecap="round">
              <template v-for="(iy, i) in [20, 40, 60]" :key="`ih-row-${i}`">
                <line
                  v-for="(hy, j) in [14, 32, 48, 66]"
                  :key="`ih-${i}-${j}`"
                  :x1="18"
                  :y1="iy"
                  :x2="55"
                  :y2="hy"
                />
              </template>
            </g>
            <g stroke="rgba(255,255,255,0.22)" stroke-width="0.6" stroke-linecap="round">
              <template v-for="(hy, i) in [14, 32, 48, 66]" :key="`ho-row-${i}`">
                <line
                  v-for="(oy, j) in [10, 22, 34, 46, 58, 70]"
                  :key="`ho-${i}-${j}`"
                  :x1="55"
                  :y1="hy"
                  :x2="98"
                  :y2="oy"
                />
              </template>
            </g>
            <g>
              <circle v-for="(y, i) in [20, 40, 60]" :key="`in-${i}`" :cx="18" :cy="y" r="3.5" fill="#fff" />
              <circle v-for="(y, i) in [14, 32, 48, 66]" :key="`hid-${i}`" :cx="55" :cy="y" r="3.5" fill="#fff" />
              <circle
                v-for="(y, i) in [10, 22, 34, 46, 58, 70]"
                :key="`out-${i}`"
                :cx="98"
                :cy="y"
                r="3.5"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <!-- Right: Decoder Section -->
    <div class="flex flex-col gap-2 pt-4">
      <div
        class="relative rounded-lg overflow-hidden border-2 border-cyan-800 bg-cyan-800/15"
      >
        <div bg="cyan-800/35" px-4 py-1.5 flex items-center text-sm>
          <div i-carbon:apps class="text-cyan-300 mr-2" />
          <span class="font-bold">Decoders</span>
          <span class="ml-1 text-xs"><i>(modular analysis primitives)</i></span>
        </div>
        <!-- Sup-Gen -->
        <div class="mx-3 mt-1.5 mb-1.5 rounded-lg overflow-hidden border-2 border-indigo-800 bg-indigo-800/12 h-[65px]">
          <div px-3 py-1.5 class="text-xs text-white/80 flex gap-2 items-center h-full">
            <div class="flex items-center text-xs shrink-0">
              <div i-carbon:data-check class="text-indigo-300 mr-1.5" />
              <span font-semibold>Sup-Gen</span>
            </div>
            <div class="flex-1 flex items-center justify-end" style="width: 160px; height: 65px; overflow: hidden;">
              <div style="transform: scale(0.56); transform-origin: center right;">
              <SupervisedGenIllustration
                class="shrink-0"
                :width="220"
                :height="75"
                :seed="17"
                :duration="5.5"
              />
              </div>
            </div>
          </div>
        </div>
        <!-- SS-Gen -->
        <div class="mx-3 mb-1.5 rounded-lg overflow-hidden border-2 border-teal-800 bg-teal-800/12 h-[65px]">
          <div px-3 py-1.5 class="text-xs text-white/80 flex gap-2 items-center h-full">
            <div class="flex items-center text-xs shrink-0">
              <div i-carbon:renew class="text-teal-300 mr-1.5" />
              <span font-semibold>SS-Gen</span>
            </div>
            <div class="flex-1 flex items-center justify-end">
              <SelfSupervisedGenIllustration
                class="shrink-0"
                :width="160"
                :height="60"
                :seed="23"
                :duration="5.5"
                :drawText="false"
              />
            </div>
          </div>
        </div>
        <!-- CLS -->
        <div class="mx-3 mb-1.5 rounded-lg overflow-hidden border-2 border-sky-800 bg-sky-800/12 h-[65px]">
          <div px-3 py-1.5 class="text-xs text-white/80 flex gap-2 items-center justify-between h-full">
            <div class="flex items-center text-xs shrink-0">
              <div i-carbon:chart-bar class="text-sky-300 mr-1.5" />
              <span font-semibold>CLS</span>
            </div>
            <div class="flex-1 flex items-center justify-end">
              <ClassificationIllustration
                class="shrink-0"
                :width="120"
                :height="55"
                :points-per-cluster="10"
                :sigma-frac="0.23"
                :center-spread="0.9"
                :grid-step="3"
              />
            </div>
          </div>
        </div>
        <!-- ASG -->
        <div class="mx-3 mb-1.5 rounded-lg overflow-hidden border-2 border-rose-800 bg-rose-800/12 h-[65px]">
          <div px-3 py-1.5 class="text-xs text-white/80 flex gap-2 items-center justify-between h-full">
            <div class="flex items-center text-xs shrink-0">
              <div i-carbon:link class="text-rose-300 mr-1.5" />
              <span font-semibold>ASG</span>
            </div>
            <div class="flex-1 flex items-center justify-end" style="width: 160px; height: 65px; overflow: hidden;">
              <div style="transform: scale(0.775); transform-origin: center right;">
                <AssignmentIllustration
                  class="shrink-0"
                  :width="200"
                  :height="70"
                  :cols="10"
                  :pickTB="2"
                  :pickTL="7"
                  :pickTpB="3"
                  :pickQ1="5"
                  :pickQ2="6"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- SEG -->
        <div class="mx-3 mb-1.5 rounded-lg overflow-hidden border-2 border-violet-800 bg-violet-800/12 h-[65px]">
          <div px-3 py-1.5 class="text-xs text-white/80 flex gap-2 items-center justify-between h-full">
            <div class="flex items-center text-xs shrink-0">
              <div i-carbon:group-objects class="text-violet-300 mr-1.5" />
              <span font-semibold>SEG</span>
            </div>
            <div class="flex-1 flex items-center justify-end" style="width: 160px; height: 65px; overflow: hidden;">
              <div style="transform: scale(0.725); transform-origin: center right;">
              <SegmentationIllustration
                class="shrink-0"
                :width="220"
                :height="80"
                :seed="11"
                :duration="4.5"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
