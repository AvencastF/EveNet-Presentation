---
layout: full
class: p-0 no-page-number
transition: fade-out
---

<div class="h-full w-full relative overflow-hidden bg-slate-950 text-white">
  <!-- subtle hi-tech glow, very light -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[980px] h-[980px] glow"></div>
    <div class="absolute inset-0 noise opacity-[0.10]"></div>
  </div>

  <div class="relative h-full w-full flex items-center justify-center px-14">
    <div class="max-w-5xl w-full">
      <!-- Q -->
      <div class="max-w-5xl">
        <div class="q-main">
          A unified ML model
        </div>
        <div class="q-sub">
          across detectors and tasks.
        </div>
      </div>
      <!-- A -->
      <div v-click class="line in mt-20">
        <div class="answer">
          <span class="gradient-animated">EveNet</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.q-main{
  font-size: 64px;
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 420;
  color: rgba(255,255,255,0.95);
}
.q-sub{
  margin-top: 14px;
  font-size: 42px;
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 360;
  color: rgba(226,232,240,0.75);
}
.answer{
  font-size: 75px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 420;
  color: rgba(255,255,255,0.90);
}
</style>