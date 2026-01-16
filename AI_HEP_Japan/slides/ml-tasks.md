---
class: py-10
clicks: 0
transition: 'fade-out'
---

# ML Tasks in High Energy Physics

Current landscape of discriminative and generative modeling in collider physics [^1]

[^1]: [HEP ML Living Review](https://iml-wg.github.io/HEPML-LivingReview/)

<div class="mt-10 grid w-full gap-x-8" style="grid-template-columns: 1fr 1fr;">
  <!-- Left Card: Discriminative Tasks -->
  <div
    class="relative rounded-lg border-2 border-cyan-800/60 bg-cyan-800/12 backdrop-blur overflow-hidden transition duration-700 ease-in-out opacity-100 scale-100"
  >
    <div class="px-5 py-3">
      <div class="flex items-center gap-2 mb-2">
        <div i-carbon:chart-network class="text-cyan-300 text-xl" />
        <h3 class="text-lg font-bold text-white/90">Discriminative Tasks</h3>
      </div>
      <div class="text-sm leading-5 text-white/75 mb-2 space-y-1">
        <p>Models learn to <span class="text-cyan-200 font-semibold">classify</span> event topologies and <span class="text-cyan-200 font-semibold">discriminate</span> physics processes from collider data.</p>
        <ul class="list-disc pl-5 space-y-0.5 mt-1.5">
          <li>Event topology classification</li>
          <li>Jet tagging and object identification</li>
          <li>Signal-background separation</li>
        </ul>
      </div>
      <div class="flex items-center justify-center mt-2 pt-2 border-t border-white/10">
        <ClassificationIllustration :width="150" :height="70" />
      </div>
    </div>
  </div>

  <!-- Right Card: Generative Tasks -->
  <div
    class="relative rounded-lg border-2 border-amber-800/60 bg-amber-800/12 backdrop-blur overflow-hidden transition duration-700 ease-in-out opacity-100 scale-100"
  >
    <div class="px-5 py-3">
      <div class="flex items-center gap-2 mb-2">
        <div i-carbon:intent-request-scale-out class="text-amber-300 text-xl" />
        <h3 class="text-lg font-bold text-white/90">Generative Tasks</h3>
      </div>
      <div class="text-sm leading-5 text-white/75 mb-2 space-y-1">
        <p>Models learn to <span class="text-amber-200 font-semibold">generate</span> realistic detector responses and <span class="text-amber-200 font-semibold">sample</span> from learned event distributions.</p>
        <ul class="list-disc pl-5 space-y-0.5 mt-1.5">
          <li>Fast detector simulation</li>
          <li>Calorimeter shower generation</li>
          <li>Unsupervised anomaly detection</li>
        </ul>
      </div>
      <div class="flex items-center justify-center mt-2 pt-2 border-t border-white/10">
        <GenerativeIllustration :width="150" :height="70" />
      </div>
    </div>
  </div>
</div>
