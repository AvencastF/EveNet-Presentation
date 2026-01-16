---
class: py-10
clicks: 3
transition: 'fade'
---

# <span class="gradient-animated">EveNet</span> Decoders

<span>Discriminative Heads</span>

<div class="mt-5">
  <!-- 5 columns: tokens -> arrows -> object encoder -> fan-out -> heads -->
  <div class="grid w-full gap-x-6" style="grid-template-columns: 13% 7% 25% 6% 43%;">
    <!-- Left: input tokens (copied visual style from 02-input outputs) -->
    <div class="flex flex-col gap-5 pt-6">
      <!-- particle tokens -->
      <div
        rounded-lg
        border="2 solid cyan-800" bg="cyan-800/18"
        backdrop-blur
        class="w-31 overflow-hidden transition duration-500 ease-in-out"
      >
        <div class="px-4 py-3 flex items-center justify-center">
          <div i-carbon:grid class="h-10 w-10 text-cyan-200/90" />
        </div>
        <div bg="cyan-800/30" w-full px-3 py-2 class="text-xs text-center text-white/85">
          particle tokens
        </div>
      </div>
      <!-- noised particle tokens -->
      <div
        rounded-lg
        border="2 solid cyan-800" bg="cyan-800/18"
        backdrop-blur
        class="w-31 overflow-hidden transition duration-500 ease-in-out"
      >
        <div class="px-4 py-3 flex items-center justify-center">
          <div i-carbon:intent-request-scale-out class="h-10 w-10 text-cyan-200/90" />
        </div>
        <div bg="cyan-800/30" w-full px-3 py-2 class="text-xs text-center text-white/85">
          <span class="text-white/60 animate-pulse font-bold ">noised</span><br/>
          particle tokens
        </div>
      </div>
      <!-- condition tokens -->
      <div
        rounded-lg
        border="2 solid violet-800" bg="violet-800/18"
        backdrop-blur
        class="w-31 overflow-hidden transition duration-500 ease-in-out"
      >
        <div class="px-4 py-3 flex items-center justify-center">
          <div i-carbon:global-filters class="h-10 w-10 text-violet-200/90" />
        </div>
        <div bg="violet-800/30" w-full px-3 py-2 class="text-xs text-center text-white/85">
          condition tokens
        </div>
      </div>
    </div>
    <!-- Arrows into Object Encoder -->
    <div
      class="relative flex flex-col items-center transition duration-500 ease-in-out"
      :class="[ $clicks >= 1 ? 'opacity-100' : 'opacity-0' ]"
    >
      <div class="w-full min-w-0 translate-y-20">
        <DataFlowArrow icon="i-carbon:grid" accent="cyan" :count="2" />
      </div>
      <div class="w-full min-w-0 translate-y-35">
        <DataFlowArrow icon="i-carbon:intent-request-scale-out" accent="cyan" :count="2" />
      </div>
      <div class="w-full min-w-0 translate-y-51">
        <DataFlowArrow icon="i-carbon:global-filters" accent="violet" :count="2" />
      </div>
    </div>
    <!-- Middle-right: Object Encoder (taller, PET-like styling) -->
    <div class="flex justify-center items-center pt-0">
      <div
        class="relative w-full rounded-lg overflow-hidden border-2 border-emerald-800 bg-emerald-800/15 transition-all duration-700 ease-in-out min-h-[300px]"
        :class="[
          ($clicks >= 1 ? 'opacity-100 translate-x-0 delay-1000' : 'opacity-0 translate-x--4'),
          ($clicks >= 1 ? 'evenet-power evenet-power-emerald pulse-glow' : ''),
        ]"
      >
        <div bg="emerald-800/35" px-4 py-2.5 flex flex-col>
          <div class="flex items-center">
            <div i-carbon:cross-tab text-emerald-300 text-xl mr-2 />
            <span font-bold>Object Encoder</span>
          </div>
          <div class="text-xs text-emerald-200/80 font-mono mt-0.5 ml-7">Transformer</div>
        </div>
        <div px-4 py-4 class="text-xs leading-6 text-white/80">
          <div class="flex items-center gap-3 mb-3">
            <div i-carbon:link class="text-emerald-300/90 text-lg shrink-0" />
            <span class="text-emerald-100/90">Bridge: PET → Heads</span>
          </div>
          <div class="flex items-center gap-3">
            <div i-carbon:global-filters class="text-emerald-300/90 text-lg shrink-0" />
            <span class="text-emerald-100/90">Global event-level info</span>
          </div>
          <!-- Shape: 4×4 matrix (mixed) -->
                <div class="ml-auto shrink-0 pt-6">
                  <div class="grid grid-cols-6 gap-1 p-2 rounded-md bg-black/20 border border-white/10">
                    <div
                      v-for="i in 36"
                      :key="i"
                      class="w-3 h-3 rounded-sm"
                      :class="[
                        // diagonal terms are all white, rest as before
                        ([0, 6, 12, 18, 24].includes(i - 1)) 
                          ? 'bg-white/140' 
                          : ([2, 3, 6, 8, 18, 20, 24].includes(i) ? 'bg-white/10' : 'bg-white/50'),
                      ]"
                    />
                  </div>
                </div>
        </div>
      </div>
    </div>
    <!-- Fan-out arrows (Object Encoder -> heads) -->
    <div
      class="flex flex-col items-center gap-6 pt-18 transition duration-500 ease-in-out"
      :class="[ $clicks >= 2 ? 'opacity-100' : 'opacity-0' ]"
    >
      <div class="w-full min-w-0 translate-y-0">
        <DataFlowArrow icon="i-carbon:cross-tab" accent="emerald" :count="1" />
      </div>
      <div class="w-full min-w-0 translate-y-10">
        <DataFlowArrow icon="i-carbon:cross-tab" accent="emerald" :count="1" />
      </div>
      <div class="w-full min-w-0 translate-y-20">
        <DataFlowArrow icon="i-carbon:cross-tab" accent="emerald" :count="1" />
      </div>
    </div>
    <!-- Heads -->
    <div
      class="flex flex-col gap-1 pt-2 w-fit transition duration-600 ease-in-out"
      :class="[ $clicks >= 2 ? 'opacity-100 translate-x-0 delay-1000' : 'opacity-0 translate-x-4' ]"
    >
      <div class="rounded-lg overflow-hidden border-2 border-sky-800 bg-sky-800/12 min-h-[130px]">
        <div bg="sky-800/30" px-4 py-1.5 flex items-center text-sm>
          <div i-carbon:chart-bar text-sky-300 mr-1 />
          <span font-bold>Classification Head (CLS)</span>
        </div>
        <div px-4 py-2 class="text-xs text-white/80 flex items-start gap-4">
          <div
            class="pt-0.5 transition-all duration-600 ease-in-out"
            :class="[ $clicks >= 3 ? 'w-1/2' : 'w-full' ]"
          >
            <ul class="list-disc list-inside space-y-0.5">
              <li>Predict physics process.</li>
              <li>Noise-tolarence training.</li>
            </ul>
          </div>
          <ClassificationIllustration
            class="shrink-0 transition duration-600 ease-in-out"
            :class="[ $clicks >= 3 ? 'opacity-100 translate-x-5' : 'opacity-0 translate-x-10 pointer-events-none w-0' ]"
            :width="100"
            :height="75"
            :points-per-cluster="10"
            :sigma-frac="0.23"
            :center-spread="0.9"
            :grid-step="3"
          />
        </div>
      </div>
      <div class="rounded-lg overflow-hidden border-2 border-rose-800 bg-rose-800/12 min-h-[130px]">
        <div bg="rose-800/30" px-4 py-1.5 flex items-center text-sm>
          <div i-carbon:link text-rose-300 mr-2 />
          <span font-bold>Assignment Head (ASG)</span>
        </div>
        <div px-4 py-2 class="text-xs text-white/80 flex items-start gap-4">
          <div
            class="pt-0.5 transition-all duration-600 ease-in-out"
            :class="[ $clicks >= 3 ? 'w-1/2' : 'w-full' ]"
          >
            <ul class="list-disc list-inside space-y-0.5">
              <li>Match reconstructed objects to a fixed decay topology.</li>
            </ul>
          </div>
          <AssignmentIllustration
            class="shrink-0 transition duration-600 ease-in-out"
            :class="[ $clicks >= 3 ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-5 pointer-events-none w-0' ]"
            :width="180"
            :height="75"
            :cols="10"
            :pickTB="2"
            :pickTL="7"
            :pickTpB="3"
            :pickQ1="5"
            :pickQ2="6"
          />
        </div>
      </div>
      <div class="rounded-lg overflow-hidden border-2 border-violet-800 bg-violet-800/12 min-h-[130px]">
        <div bg="violet-800/30" px-4 py-1.5 flex items-center text-sm>
          <div i-carbon:group-objects text-violet-300 mr-2 />
          <span font-bold>Segmentation Head (SEG)</span>
        </div>
        <div px-4 py-2 class="text-xs text-white/80 flex items-start gap-4">
          <div
            class="pt-0.5 transition-all duration-600 ease-in-out"
            :class="[ $clicks >= 3 ? 'w-1/2' : 'w-full' ]"
          >
            <ul class="list-disc list-inside space-y-0.5">
              <li>Query-based masks over particles.</li>
            </ul>
          </div>
          <SegmentationIllustration
            class="shrink-0 transition duration-600 ease-in-out"
            :class="[ $clicks >= 3 ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-5 pointer-events-none w-0' ]"
            :width="180"
            :height="80"
            :seed="11"
            :duration="4.5"
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
@keyframes evenet-gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes evenet-neon-breathe {
  0% { opacity: 0.55; filter: none; }
  50% { opacity: 0.90; filter: none; }
  100% { opacity: 0.55; filter: none; }
}

.evenet-power {
  background-size: 220% 220%;
  animation: evenet-gradient-flow 2.6s ease-in-out infinite;
  border-color: transparent !important;
}

.evenet-power > * {
  position: relative;
  z-index: 2;
}

.evenet-power::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1.5px;
  border-radius: 10px;
  z-index: 1;
  opacity: 0.75;
  animation: evenet-neon-breathe 2.8s ease-in-out infinite;
  pointer-events: none;

  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
}

.evenet-power::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(120px 80px at 20% 10%, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%),
              radial-gradient(140px 90px at 90% 20%, rgba(255,255,255,0.08), rgba(255,255,255,0) 55%);
  mix-blend-mode: overlay;
  opacity: 0.14;
}

.evenet-power-emerald {
  background-image: linear-gradient(
    115deg,
    rgba(16, 185, 129, 0.20),
    rgba(4, 120, 87, 0.14),
    rgba(34, 211, 238, 0.10),
    rgba(16, 185, 129, 0.20)
  );
  border-color: rgba(16, 185, 129, 0.72);
  box-shadow:
    0 0 0 1px rgba(16, 185, 129, 0.18),
    0 0 10px rgba(16, 185, 129, 0.12),
    0 0 18px rgba(34, 211, 238, 0.08);
}

.evenet-power-emerald::before {
  background: linear-gradient(
    90deg,
    rgba(16, 185, 129, 0.82),
    rgba(34, 211, 238, 0.55),
    rgba(255, 61, 242, 0.28),
    rgba(16, 185, 129, 0.82)
  );
}
</style>
