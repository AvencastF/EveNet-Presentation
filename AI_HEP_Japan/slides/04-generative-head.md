---
class: py-10
clicks: 1
transition: "fade"
---

# Decoders: heads

<span>Generative branch</span>

<div class="mt-5">
  <!-- 4 columns: tokens -> arrows -> heads -> prediction visualization -->
  <div class="grid w-full gap-x-6" style="grid-template-columns: 15% 7% 45% 30%;">
    <!-- Left: input tokens (particle tokens, condition tokens, time embedding) -->
    <div class="flex flex-col gap-5 pt-6">
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
          <span class="text-white/60 animate-pulse font-bold underline decoration-wavy decoration-cyan-500">noised</span><br/>
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
      <!-- time embedding -->
      <div
        rounded-lg
        border="2 solid amber-800" bg="amber-800/18"
        backdrop-blur
        class="w-31 overflow-hidden transition duration-500 ease-in-out"
      >
        <div class="px-4 py-3 flex items-center justify-center">
          <div i-carbon:time class="h-10 w-10 text-amber-200/90" />
        </div>
        <div bg="amber-800/30" w-full px-3 py-2 class="text-xs text-center text-white/85">
          time embedding
        </div>
      </div>
    </div>
    <!-- Arrows directly to heads -->
    <div
      class="relative flex flex-col items-center transition duration-500 ease-in-out"
      :class="[ $clicks >= 1 ? 'opacity-100' : 'opacity-0' ]"
    >
      <div class="w-full min-w-0 translate-y-20">
        <DataFlowArrow icon="i-carbon:intent-request-scale-out" accent="cyan" :count="2" />
      </div>
      <div class="w-full min-w-0 translate-y-35">
        <DataFlowArrow icon="i-carbon:global-filters" accent="violet" :count="2" />
      </div>
      <div class="w-full min-w-0 translate-y-51">
        <DataFlowArrow icon="i-carbon:time" accent="amber" :count="2" />
      </div>
    </div>
    <!-- Middle: Heads -->
    <div
      class="flex flex-col gap-1 pt-2 w-fit transition duration-600 ease-in-out"
      :class="[ $clicks >= 1 ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 translate-x-4' ]"
    >
      <!-- Supervised Generative Head -->
      <div class="mt-8 rounded-lg overflow-hidden border-2 border-indigo-800 bg-indigo-800/12 min-h-[150px]">
        <div bg="indigo-800/30" px-4 py-1.5 flex items-center text-sm>
          <div i-carbon:data-check text-indigo-300 mr-2 />
          <span font-bold>Supervised Generative Head</span>
        </div>
        <div px-4 py-2 class="text-xs text-white/80 flex items-start gap-4">
          <div
            class="pt-0.5 transition-all duration-600 ease-in-out"
          >
            <ul class="list-disc list-inside space-y-0.5">
              <li>Predict object features.</li>
              <li>Neutrino kinematics.</li>
            </ul>
          </div>
          <SupervisedGenIllustration
            class="shrink-0 self-center transition duration-600 ease-in-out"
            :width="180"
            :height="80"
            :seed="17"
            :duration="3.5"
          />
        </div>
      </div>
      <!-- Self-Supervised Generative Head -->
      <div class="mt-6 rounded-lg overflow-hidden border-2 border-teal-800 bg-teal-800/12 min-h-[150px]">
        <div bg="teal-800/30" px-4 py-1.5 flex items-center text-sm>
          <div i-carbon:renew text-teal-300 mr-2 />
          <span font-bold>Self-Supervised Generative Head</span>
        </div>
        <div px-4 py-2 class="text-xs text-white/80 flex items-start gap-4">
          <div
            class="pt-0.5 transition-all duration-600 ease-in-out"
          >
            <ul class="list-disc list-inside space-y-0.5">
              <li>Diffuse backward to recon masked particles.</li>
              <li>Learn latent event structure without labels.</li>
            </ul>
          </div>
          <SelfSupervisedGenIllustration
            class="shrink-0 self-center transition duration-600 ease-in-out"
            :width="180"
            :height="80"
            :seed="23"
            :duration="3.5"
          />
        </div>
      </div>
    </div>
    <!-- Right: DDIM Denoising Illustration -->
    <div
      class="flex flex-col justify-center items-center pt-6 transition duration-600 ease-in-out delay-1000"
      :class="[ $clicks >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4' ]"
    >
      <div class="rounded-lg border-2 border-amber-800/50 bg-amber-900/20 backdrop-blur p-4">
        <div class="text-xs font-semibold text-amber-300 mb-3 flex items-center justify-center gap-2">
          <div i-carbon:chart-line class="text-amber-300" />
          <span>Diffusion: Iterative Denoising</span>
        </div>
        <DDIMIllustration
          :width="220"
          :height="300"
          :steps="5"
          :seed="42"
          :duration="6"
        />
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

.evenet-power-amber {
  background-image: linear-gradient(
    115deg,
    rgba(251, 191, 36, 0.20),
    rgba(217, 119, 6, 0.14),
    rgba(245, 158, 11, 0.10),
    rgba(251, 191, 36, 0.20)
  );
  border-color: rgba(251, 191, 36, 0.72);
  box-shadow:
    0 0 0 1px rgba(251, 191, 36, 0.18),
    0 0 10px rgba(251, 191, 36, 0.12),
    0 0 18px rgba(245, 158, 11, 0.08);
}

.evenet-power-amber::before {
  background: linear-gradient(
    90deg,
    rgba(251, 191, 36, 0.82),
    rgba(245, 158, 11, 0.55),
    rgba(217, 119, 6, 0.28),
    rgba(251, 191, 36, 0.82)
  );
}
</style>
