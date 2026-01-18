---
layout: full
class: no-page-number
transition: fade-out
---

<div class="h-full w-full relative overflow-hidden text-white">
  <!-- subtle hi-tech glow, very light -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[980px] h-[980px] glow"></div>
    <div class="absolute inset-0 noise opacity-[0.10]"></div>
  </div>

  <div class="relative h-full w-full flex items-center justify-center px-14">
    <!-- Q: starts large and centered; on click animates smaller to top-left -->
    <div
      :class="{ 'q-collapsed': $clicks > 0 }"
      class="q-block"
    >
      <div class="q-main">
        A unified ML model
      </div>
      <div class="q-sub">
        across detectors and tasks
      </div>
    </div>
    <!-- A: appears on first click, centered -->
    <div class="max-w-5xl w-full flex flex-col items-center justify-center">
      <div v-click class="line in answer-reveal">
        <div class="answer flex items-center gap-3">
          <div class="answer-logo gradient-animated-svg" role="img" aria-label="EveNet"></div>
          <span class="gradient-animated">EveNet</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
/* Q block: absolute so we can animate from center to top-left */
.q-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  max-width: min(90vw, 48rem);
  transition:
    top 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    left 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-block.q-collapsed {
  top: 2rem;
  left: 2rem;
  transform: none;
}
/* Initially larger; collapsed stays readable, not too small */
.q-main {
  font-size: 52px;
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 420;
  color: rgba(255,255,255,0.95);
  transition: font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-sub {
  margin-top: 14px;
  font-size: 32px;
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 360;
  color: rgba(226,232,240,0.75);
  transition: font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-block.q-collapsed .q-main {
  font-size: 48px;
}
.q-block.q-collapsed .q-sub {
  font-size: 28px;
}
.answer-reveal {
  transition: opacity 0.5s ease 0.5s;
}
.answer {
  font-size: 100px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 420;
  padding-top: 5rem;
  color: rgba(255,255,255,0.90);
}
.answer-logo {
  height: 1em;
  width: auto;
  flex-shrink: 0;
  aspect-ratio: 390 / 392;
}
/* Gradient animation for SVG via mask — same colors as .gradient-animated */
.gradient-animated-svg {
  -webkit-mask: url(/evenet-logo-white.svg) no-repeat center / contain;
  mask: url(/evenet-logo-white.svg) no-repeat center / contain;
  -webkit-mask-size: contain;
  mask-size: contain;
  background: linear-gradient(90deg, #00e5ff, #ff3df2, #00e5ff);
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}
</style>