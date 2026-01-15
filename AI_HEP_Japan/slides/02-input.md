---
class: py-10
clicks: 5
transition: 'none'
---

# Inputs: particle point cloud

<span>Let's start with the basics</span>

<div
  v-if="$clicks <= 4"
  transition duration-500 ease-out
  :class="[ $clicks <= 2 ? '' : 'scale-0 opacity-0 translate-x--100 translate-y--20']"
>
  <Vectors />
</div>
<div
  v-if="$clicks >= 2"
  absolute top-0 left-0 w-full
  transition duration-800 ease-in-out
  translate-x-10 translate-y-38
>
  <div class="grid w-full gap-x-6" style="grid-template-columns: 20% 15% 65%;">
    <!-- Left: inputs -->
    <div class="flex justify-start w-full min-w-0">
      <div class="flex flex-col items-start gap-4">
      <!-- Card: PC -->
      <div
        class="relative px-4 py-3 w-full origin-top-left transition duration-700 ease-in-out"
        :class="[
          ($clicks >= 5 ? 'opacity-0 scale-20 translate-x-100 translate-y-10' : ''),
        ]"
      >
        <div
          class="absolute inset-0 pointer-events-none transition duration-700 ease-out bg-white/5 rounded-lg"
          :class="[
            ($clicks <= 2 ? 'opacity-0' : 'opacity-100 delay-1400'),
          ]"
        />
        <div
          class="relative text-sm font-semibold text-white/80 mb-3 transition duration-700 ease-out"
          :class="[
            ($clicks <= 2 ? 'opacity-0' : 'opacity-100 delay-1400'),
          ]"
        >
          <div class="flex items-center gap-2">
            <div i-carbon:grid class="text-white/70" />
            <span>Point-cloud input</span>
          </div>
        </div>
        <div class="relative flex flex-col gap-2">
          <div
            v-for="e in 3"
            :key="e"
            class="transition duration-700 ease-in-out"
            :class="[
              ($clicks <= 2 ? 'opacity-0 scale-110' : 'opacity-100 scale-100'),
              e === 1 ? 'delay-400' : (e === 2 ? 'delay-800' : 'delay-1200'),
            ]"
          >
            <div class="grid grid-cols-18 gap-1">
              <div
                v-for="i in 126"
                :key="i"
                class="w-1.5 h-1.5 rounded-full"
                :class="[
                // pad last N columns (of 18) for each event
                (((i - 1) % 18) + 1) > (18 - (e === 1 ? 7 : (e === 2 ? 9 : 4)))
                    ? 'bg-zinc-500/35'
                    : 'bg-white/70',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Card: Conditions -->
      <div
        class="relative px-4 py-3 w-full origin-top-left transition duration-700 ease-in-out"
        :class="[
          ($clicks >= 5 ? 'opacity-0 scale-20 translate-x-100 translate-y-0' : ''),
        ]"
      >
        <div
          class="absolute inset-0 pointer-events-none transition duration-700 ease-out  bg-white/5 rounded-lg"
          :class="[
            ($clicks <= 2 ? 'opacity-0' : 'opacity-100 delay-1400'),
          ]"
        />
        <div
          class="relative text-sm font-semibold text-white/80 mb-3 transition duration-700 ease-out"
          :class="[
            ($clicks <= 2 ? 'opacity-0' : 'opacity-100 delay-1400'),
          ]"
        >
          <div class="flex items-center gap-2">
            <div i-carbon:data-volume class="text-white/70" />
            <span>Global Conditions</span>
          </div>
        </div>
        <div class="relative flex flex-col gap-1">
          <div
            v-for="e in 3"
            :key="e"
            class="transition duration-700 ease-in-out"
            :class="[
              ($clicks <= 2 ? 'opacity-0 scale-110' : 'opacity-100 scale-100'),
              e === 1 ? 'delay-400' : (e === 2 ? 'delay-800' : 'delay-1200'),
            ]"
          >
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
      </div>
    </div>
    <!-- Middle: data flow arrows -->
    <div
      class="flex flex-col items-center gap-10 pt-6 transition duration-700 ease-in-out w-full min-w-0"
      :class="[
        // disappear with inputs on click5 and appear if click == 4
        ($clicks >= 5 ? 'opacity-0 scale-90 translate-x-6' : ($clicks < 4 ? 'opacity-0 scale-100 translate-x-0' : '')),
      ]"
    >
      <div class="w-full min-w-0 translate-y-10">
        <DataFlowArrow icon="i-carbon:grid" accent="cyan" />
      </div>
      <div class="w-full min-w-0 translate-y-50">
        <DataFlowArrow icon="i-carbon:data-volume" accent="violet" />
      </div>
    </div>
    <!-- Right: model cards -->
    <div class="flex justify-start w-full min-w-0">
      <div
        class="flex flex-col items-start gap-10 transition duration-800 ease-in-out"
        :class="[
          // After inputs 'flow in' and fade, pull encoders to the left side
          ($clicks >= 5 ? 'translate-x--100 delay-700' : ''),
        ]"
      >
        <!-- Card: PET body -->
        <div v-click="4" class="transition duration-400 ease-in-out">
          <div
            class="relative min-w-[260px] rounded-lg overflow-hidden border-2 border-cyan-800 bg-cyan-800/15 transition-all duration-700 ease-in-out"
            :class="[
              // after moving left: 'powered up' (gradient flow + neon)
              ($clicks >= 5 ? 'evenet-power evenet-power-cyan pulse-glow delay-1000' : ''),
            ]"
          >
            <div bg="cyan-800/35" px-4 py-2 flex items-center>
              <div i-carbon:chart-network text-cyan-300 text-xl mr-2 />
              <span font-bold>PET body</span>
              <span class="ml-auto text-xs text-cyan-200/80 font-mono">GNN + Transformer</span>
            </div>
            <div px-4 py-3>
              <div class="flex items-start gap-4">
                <div class="text-xs leading-5 text-white/80">
                  <div class="font-semibold text-cyan-200 mb-1">Structure</div>
                  <ul class="list-disc pl-4 space-y-1">
                    <li>Point–edge message passing (graph inductive bias)</li>
                    <li>Attention-style mixing across particles/edges</li>
                    <li>Permutation-symmetric over particle order</li>
                  </ul>
                </div>
                <!-- Shape: 4×4 matrix (mixed) -->
                <div class="ml-auto shrink-0 pt-1">
                  <div class="grid grid-cols-5 gap-1 p-2 rounded-md bg-black/20 border border-white/10">
                    <div
                      v-for="i in 25"
                      :key="i"
                      class="w-3 h-3 rounded-sm"
                      :class="[
                        // deterministic 'random-looking' pattern
                        [1, 4, 6, 7, 10, 12, 15].includes(i) ? 'bg-zinc-400/40' : 'bg-white/70',
                      ]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Card: GlobalEmbedding -->
        <div v-click="4" class="transition duration-800 ease-in-out">
          <div
            class="relative min-w-[260px] rounded-lg overflow-hidden border-2 border-violet-800 bg-violet-800/15 transition-all duration-700 ease-in-out"
            :class="[
              // after moving left: 'powered up' (gradient flow + neon)
              ($clicks >= 5 ? 'evenet-power evenet-power-violet pulse-glow delay-1000' : ''),
            ]"
          >
            <div bg="violet-800/35" px-4 py-2 flex items-center>
              <div i-carbon:global-filters text-violet-300 text-xl mr-2 />
              <span font-bold>GlobalEmbedding</span>
              <span class="ml-auto text-xs text-violet-200/80 font-mono">Transformer</span>
            </div>
            <div px-4 py-3>
              <div class="flex items-start gap-4">
                <div class="text-xs leading-5 text-white/80">
                  <div class="font-semibold text-violet-200 mb-1">Structure</div>
                  <ul class="list-disc pl-4 space-y-1">
                    <li>Transformer encoder over event-level scalars</li>
                    <li>Produces compact condition tokens</li>
                    <li>Provides global context to all heads</li>
                  </ul>
                </div>
                <!-- Shape: 4×4 matrix (all white) -->
                <div class="ml-auto shrink-0 pt-1">
                  <div class="grid grid-cols-4 gap-1 p-2 rounded-md bg-black/20 border border-white/10">
                    <div
                      v-for="i in 16"
                      :key="i"
                      class="w-3 h-3 rounded-sm bg-white/70"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
To recap for everyone what is distributed training. Let's start with the basics.

[click] In machine learning field, model is basically a set of matrix and vectors, which is used to predict the output based on the input data. Say, we have a set of vectors

[click] That's not the whole picture, so let's zoom out a little bit.
-->

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
  /* avoid "double border" (base border + neon border) */
  border-color: transparent !important;
}

.evenet-power > * {
  position: relative;
  z-index: 2;
}

/* Cleaner "neon border" instead of big blurry halo */
.evenet-power::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1.5px; /* border thickness */
  border-radius: 10px;
  z-index: 1;
  opacity: 0.75;
  animation: evenet-neon-breathe 2.8s ease-in-out infinite;
  pointer-events: none;

  /* show gradient ONLY on border */
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

.evenet-power-cyan {
  background-image: linear-gradient(
    115deg,
    rgba(34, 211, 238, 0.22),
    rgba(14, 116, 144, 0.16),
    rgba(59, 130, 246, 0.12),
    rgba(34, 211, 238, 0.22)
  );
  border-color: rgba(34, 211, 238, 0.70);
  box-shadow:
    0 0 0 1px rgba(34, 211, 238, 0.18),
    0 0 10px rgba(34, 211, 238, 0.12),
    0 0 18px rgba(59, 130, 246, 0.08);
}

.evenet-power-cyan::before {
  background: linear-gradient(
    90deg,
    rgba(34, 211, 238, 0.85),
    rgba(59, 130, 246, 0.55),
    rgba(255, 61, 242, 0.32),
    rgba(34, 211, 238, 0.85)
  );
}

.evenet-power-violet {
  background-image: linear-gradient(
    115deg,
    rgba(167, 139, 250, 0.20),
    rgba(124, 58, 237, 0.14),
    rgba(236, 72, 153, 0.10),
    rgba(167, 139, 250, 0.20)
  );
  border-color: rgba(167, 139, 250, 0.72);
  box-shadow:
    0 0 0 1px rgba(167, 139, 250, 0.18),
    0 0 10px rgba(167, 139, 250, 0.12),
    0 0 18px rgba(236, 72, 153, 0.08);
}

.evenet-power-violet::before {
  background: linear-gradient(
    90deg,
    rgba(167, 139, 250, 0.82),
    rgba(124, 58, 237, 0.55),
    rgba(236, 72, 153, 0.34),
    rgba(167, 139, 250, 0.82)
  );
}
</style>
