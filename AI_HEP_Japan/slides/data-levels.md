---
class: py-10
clicks: 3
transition: 'fade-out'
---

# Data Formats in High Energy Physics

Three levels of data representation in collider experiments

<div class="flex gap-4 mt-12 items-stretch">
  <!-- Card 1: Raw Detector Response -->
  <div v-click class="flex-1 transition-all duration-500 ease-in-out flex">
    <div class="border-2 border-cyan-800 bg-cyan-800/20 rounded-lg overflow-hidden flex flex-col w-full">
      <div class="bg-cyan-800/40 px-4 py-2 flex items-center">
        <div class="i-carbon:data-vis-1 text-cyan-300 text-xl mr-2" />
        <span class="font-bold">Raw Detector Response</span>
      </div>
      <div class="px-4 py-3 flex flex-col flex-1">
        <div class="text-sm text-white/80 mb-3">
          <span class="font-semibold text-cyan-200">Primitive:</span> Tracker Hits, Calorimeter Cells
        </div>
        <div class="mb-3 flex justify-between items-center flex-shrink-0">
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            class="text-cyan-400"
          >
            <!-- tracker layers -->
            <g stroke="currentColor" stroke-width="1" opacity="0.25">
              <line x1="30" y1="14" x2="30" y2="66" />
              <line x1="50" y1="14" x2="50" y2="66" />
              <line x1="70" y1="14" x2="70" y2="66" />
              <line x1="90" y1="14" x2="90" y2="66" />
            </g>
            <!-- hits -->
            <g fill="currentColor" opacity="0.9">
              <circle cx="30" cy="40" r="3" />
              <circle cx="50" cy="38" r="3" />
              <circle cx="70" cy="36" r="3" />
              <circle cx="90" cy="34" r="3" />
            </g>
            <!-- track -->
            <path
              d="M20 44 C40 38, 60 36, 100 32"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
<svg
  width="120"
  height="80"
  viewBox="0 0 120 80"
  class="text-cyan-400"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- 3×3 calorimeter cells: ALL shallow-filled -->
  <!-- cell size = 16, origin = (36,16) -->
  <g fill="currentColor" opacity="0.14">
    <rect x="36" y="16" width="16" height="16" rx="2" />
    <rect x="52" y="16" width="16" height="16" rx="2" />
    <rect x="68" y="16" width="16" height="16" rx="2" />
    <rect x="36" y="32" width="16" height="16" rx="2" />
    <rect x="52" y="32" width="16" height="16" rx="2" />
    <rect x="68" y="32" width="16" height="16" rx="2" />
    <rect x="36" y="48" width="16" height="16" rx="2" />
    <rect x="52" y="48" width="16" height="16" rx="2" />
    <rect x="68" y="48" width="16" height="16" rx="2" />
  </g>

  <!-- optional thin borders so the grid reads clearly -->
  <g stroke="currentColor" stroke-width="1.2" opacity="0.28" fill="none">
    <rect x="36" y="16" width="48" height="48" rx="3" />
    <line x1="52" y1="16" x2="52" y2="64" />
    <line x1="68" y1="16" x2="68" y2="64" />
    <line x1="36" y1="32" x2="84" y2="32" />
    <line x1="36" y1="48" x2="84" y2="48" />
  </g>

  <!-- diagonal hit cells: overwrite with stronger fill -->
  <g fill="currentColor">
    <rect x="36" y="16" width="16" height="16" rx="2" opacity="0.55" />
    <rect x="52" y="32" width="16" height="16" rx="2" opacity="0.95" />
    <rect x="68" y="48" width="16" height="16" rx="2" opacity="0.65" />
  </g>

  <!-- particle track across the grid -->
  <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <line x1="30" y1="12" x2="92" y2="74" stroke-width="2.5" />
  </g>
</svg>
        </div>
        <div class="mt-auto">
          <div class="mt-3 bg-cyan-900/30 rounded-lg p-3 flex flex-col gap-2">
            <div class="flex items-start gap-2">
              <div class="i-carbon:checkmark-outline text-cyan-300 mt-0.5" />
              <span class="text-sm">Most information-rich</span>
            </div>
          </div>
          <div class="mt-3 bg-red-900/30 rounded-lg p-3 flex flex-col gap-2">
            <div class="flex items-start gap-2">
              <div class="i-carbon:warning text-red-300 mt-0.5" />
              <span class="text-sm">Very high dimensionality → massive computational cost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Card 2: Constituent Level -->
  <div v-click class="flex-1 transition-all duration-500 ease-in-out flex">
    <div class="border-2 border-amber-800 bg-amber-800/20 rounded-lg overflow-hidden flex flex-col w-full">
      <div class="bg-amber-800/40 px-4 py-2 flex items-center">
        <div class="i-carbon:data-vis-2 text-amber-300 text-xl mr-2" />
        <span class="font-bold">Constituent Level</span>
      </div>
      <div class="px-4 py-3 flex flex-col flex-1">
        <div class="text-sm text-white/80 mb-3">
          <span class="font-semibold text-amber-200">Low-level Objects:</span> Particle Flow, Tracks
        </div>
        <div class="mb-3 flex justify-center flex-shrink-0">
<svg
  width="120"
  height="100"
  viewBox="0 0 120 100"
  class="text-amber-400"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Vertex (left-bottom) -->
  <circle cx="22" cy="82" r="3" fill="currentColor" opacity="0.95" />

  <!-- Jet cone outline (pointing up-right ~75°) -->


  <!-- Constituent tracks (spray) -->
  <g stroke="currentColor" stroke-linecap="round" fill="none">
    <!-- leading constituents (thicker) -->
    <path d="M22 82 L58 24" stroke-width="2.4" opacity="0.85" />
    <path d="M22 82 L66 34" stroke-width="2.1" opacity="0.75" />
    <path d="M22 82 L52 30" stroke-width="2.1" opacity="0.70" />
    <!-- softer constituents (thinner, more numerous) -->
    <g stroke-width="1.5" opacity="0.55">
      <path d="M22 82 L46 26" />
      <path d="M22 82 L50 22" />
      <path d="M22 82 L54 20" />
      <path d="M22 82 L60 28" />
      <path d="M22 82 L62 40" />
      <path d="M22 82 L70 38" />
      <path d="M22 82 L72 30" />
      <path d="M22 82 L56 36" />
    </g>
    <!-- a couple slightly outside the cone (realistic “spray” leakage) -->
    <g stroke-width="1.4" opacity="0.28">
      <path d="M22 82 L40 40" />
      <path d="M22 82 L82 40" />
    </g>
  </g>
</svg>
        </div>
        <div class="mt-auto">
          <div class="mt-3 bg-amber-900/30 rounded-lg p-3 flex flex-col gap-2">
            <div class="flex items-start gap-2">
              <div class="i-carbon:checkmark-outline text-amber-300 mt-0.5" />
              <span class="text-sm">Captures substructure; less rich than raw-level</span>
            </div>
          </div>
          <div class="mt-3 bg-red-900/30 rounded-lg p-3 flex flex-col gap-2">
            <div class="flex items-start gap-2">
              <div class="i-carbon:warning text-red-300 mt-0.5" />
              <span class="text-sm">Higher dimensionality → increased cost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Card 3: Event Level (Preferred) -->
  <div v-click class="flex-1 transition-all duration-500 ease-in-out flex">
    <div class="border-2 border-green-800 bg-green-800/20 rounded-lg overflow-hidden flex flex-col w-full">
      <div class="bg-green-800/40 px-4 py-2 flex items-center">
        <div class="i-carbon:data-vis-3 text-green-300 text-xl mr-2" />
        <span class="font-bold">Event Level</span>
        <div class="ml-auto bg-green-600/50 px-2 py-0.5 rounded text-xs font-bold">
          Preferred
        </div>
      </div>
      <div class="px-4 py-3 flex flex-col flex-1">
        <div class="text-sm text-white/80 mb-3">
          <span class="font-semibold text-green-200">Event Objects:</span> Jets, Leptons, MET
        </div>
        <div class="mt-auto">
          <div class="mt-3 bg-green-900/30 rounded-lg p-3 flex flex-col gap-2">
            <div class="flex items-start gap-2">
              <div class="i-carbon:checkmark-outline text-green-400 mt-0.5" />
              <span class="text-sm">Already calibrated and validated</span>
            </div>
            <div class="flex items-start gap-2">
              <div class="i-carbon:checkmark-outline text-green-400 mt-0.5" />
              <span class="text-sm">Lower computational cost</span>
            </div>
            <div class="flex items-start gap-2">
              <div class="i-carbon:checkmark-outline text-green-400 mt-0.5" />
              <span class="text-sm">Less dependent on detector design</span>
            </div>
          </div>
          <div class="mt-3 bg-amber-900/30 rounded-lg p-3 flex flex-col gap-2">
            <div class="flex items-start gap-2">
              <div class="i-carbon:warning text-amber-300 mt-0.5" />
              <span class="text-sm">Dependent on reconstruction algorithms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
