---
clicks: 0
transition: 'fade-out'
---

# Neutrino Reconstruction with ML

Deterministic regression versus generative diffusion modeling for underconstrained neutrino inference.

<div class="mt-5 grid w-full gap-x-8 items-stretch" style="grid-template-columns: 1fr 1fr;">
  <!-- Left Card -->
  <div
    class="h-full rounded-lg border-2 border-cyan-800/60 bg-cyan-800/12 backdrop-blur overflow-hidden">
    <div class="flex flex-col h-full px-5 py-4">
      <div class="flex items-center gap-2 mb-2">
        <div i-carbon:chart-line-smooth class="text-cyan-300 text-xl" />
        <h3 class="text-lg font-bold text-white/90">Regression</h3>
      </div>
      <div class="text-sm leading-5 text-white/75 space-y-1 flex-1">
        <p>
          Learns a
          <span class="text-cyan-200 font-semibold">deterministic mapping</span>
          from visible particles to neutrinos.
        </p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Single best-fit solution</li>
          <li>Optimized for RMSE / MAE</li>
          <li>Can bias toward averaged solutions</li>
        </ul>
      </div>
      <div class="flex items-center justify-center mt-3 pt-3 border-t border-white/10">
        <ClassificationIllustration :width="150" :height="70" />
      </div>
    </div>
  </div>

  <!-- Right Card -->
  <div
    class="h-full rounded-lg border-2 border-amber-800/60 bg-amber-800/12 backdrop-blur overflow-hidden">
    <div class="flex flex-col h-full px-5 py-4">
      <div class="flex items-center gap-2 mb-2">
        <div i-carbon:machine-learning-model class="text-amber-300 text-xl" />
        <h3 class="text-lg font-bold text-white/90">Diffusion (Generative)</h3>
      </div>
      <div class="text-sm leading-5 text-white/75 space-y-2 flex-1">
        <p>
          Learns the
          <span class="text-amber-200 font-semibold">conditional distribution</span>
          of physically allowed neutrino solutions.
        </p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Multiple physically valid solutions</li>
          <li>Captures ambiguity and correlations</li>
          <li>Better distribution-level agreement</li>
        </ul>
      </div>
      <div class="flex items-center justify-center mt-3 pt-3 border-t border-white/10">
        <GenerativeIllustration :width="150" :height="70" />
      </div>
    </div>
  </div>
</div>
<!-- <div class="mt-4 text-center text-sm text-white/70 leading-6">
  For QE observables, preserving the correct
  <span class="text-amber-200">angular phase-space distribution</span>
  may be more important than predicting a single deterministic neutrino solution.
</div> -->

<!-- Key Takeaway -->
<div class="key-takeaway text-center">
  <div class="takeaway-main">
    A single best-fit prediction can provide
    <span class="text-cyan-200">sharper event-level resolution</span>, <br/>
    while QE observables are sensitive to the
    <span class="text-amber-200">full distribution of neutrino solutions</span>.
  </div>
</div>

<style>
/* ============================================
   KEY TAKEAWAY
   ============================================ */
.key-takeaway {
  margin-top: 1.0rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  text-align: center;
}

.takeaway-main {
  font-size: 15px;
  font-weight: 600;
  color: rgba(196, 181, 253, 0.95);
  margin-bottom: 0.4rem;
  line-height: 1.3;
}
</style>
