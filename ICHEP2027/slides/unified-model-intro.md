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
        <div
          :class="{ 'is-assembled': $clicks > 0 }"
          class="answer flex items-center gap-3"
        >
          <div class="answer-logo-motion" role="img" aria-label="EveNet logo assembling">
            <div class="evenet-energy" aria-hidden="true"></div>
            <div class="evenet-lock-flash" aria-hidden="true"></div>
            <div class="evenet-turn" aria-hidden="true">
              <div class="evenet-half evenet-half-left"></div>
              <div class="evenet-half evenet-half-right"></div>
            </div>
          </div>
          <span class="gradient-animated-logo-color">EveNet</span>
        </div>
      </div>
    </div>
    <div
      v-click
      class="team-block absolute left-14 right-14 bottom-0 text-center"
    >
      <span class="team-label">Team:</span>
      <span class="team-names">
        Ting-Hsiang Hsu, Bai-Hong Zhou, Qibin Liu, Wei-Po Wang, Yue Xu, Haoran Zhao,
        George Wei-Shu Hou, Shu Li, Benjamin Nachman, Shih-Chieh Hsu, Vinicius Massami Mikuni,
        Yuan-Tang Chou, Yulei Zhang
      </span>
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
.answer-logo-motion {
  --logo-motion-duration: 2400ms;
  position: relative;
  height: 2.32em;
  width: calc(2.32em * 390 / 392);
  flex-shrink: 0;
  aspect-ratio: 390 / 392;
  isolation: isolate;
}
.evenet-turn,
.evenet-half,
.evenet-energy,
.evenet-lock-flash {
  position: absolute;
}
.evenet-turn,
.evenet-half {
  inset: 0;
}
.evenet-turn {
  z-index: 1;
  transform-origin: 50% 50%;
}
.evenet-half {
  background: url(/evenet-logo-color.svg) center / contain no-repeat;
  filter: drop-shadow(0 0.14em 0.17em rgba(0, 0, 0, 0.24));
  transform-origin: 50% 50%;
}
.evenet-half-left {
  clip-path: inset(0 50% 0 0);
}
.evenet-half-right {
  clip-path: inset(0 0 0 50%);
}
.evenet-energy {
  inset: -28%;
  z-index: 0;
  border-radius: 50%;
  opacity: 0;
  background: conic-gradient(
    from 210deg,
    transparent 0 16%,
    rgba(61, 101, 158, 0.96) 22%,
    transparent 31% 58%,
    rgba(218, 152, 64, 0.96) 69%,
    transparent 77%
  );
  filter: blur(0.13em);
}
.evenet-lock-flash {
  width: 38%;
  aspect-ratio: 1;
  left: 31%;
  top: 31%;
  z-index: 2;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.96) 0 4%, rgba(218, 152, 64, 0.9) 16%, rgba(61, 101, 158, 0.42) 43%, transparent 73%);
  mix-blend-mode: screen;
}
.answer.is-assembled .evenet-half-left {
  animation: evenet-left-arrive var(--logo-motion-duration) both;
}
.answer.is-assembled .evenet-half-right {
  animation: evenet-right-arrive var(--logo-motion-duration) both;
}
.answer.is-assembled .evenet-turn {
  animation: evenet-assemble-turn var(--logo-motion-duration) both;
}
.answer.is-assembled .evenet-energy {
  animation: evenet-energy-orbit var(--logo-motion-duration) both;
}
.answer.is-assembled .evenet-lock-flash {
  animation: evenet-lock-flash var(--logo-motion-duration) both;
}
@keyframes evenet-left-arrive {
  0% { opacity: 1; transform: translateX(-122%) rotate(-12deg) scale(0.9); animation-timing-function: cubic-bezier(0.18, 0.72, 0.28, 1); }
  43% { transform: translateX(-10%) rotate(-2.5deg) scale(0.985); animation-timing-function: cubic-bezier(0.22, 0.88, 0.35, 1.08); }
  60% { transform: translateX(1.3%) rotate(0.5deg) scale(1.004); animation-timing-function: cubic-bezier(0.25, 0.78, 0.39, 1); }
  100% { transform: translateX(0) rotate(0) scale(1); }
}
@keyframes evenet-right-arrive {
  0%, 8% { opacity: 0; transform: translateX(126%) rotate(13deg) scale(0.88); animation-timing-function: cubic-bezier(0.2, 0.75, 0.32, 1); }
  18% { opacity: 1; transform: translateX(80%) rotate(9deg) scale(0.92); animation-timing-function: cubic-bezier(0.19, 0.75, 0.29, 1); }
  53% { transform: translateX(8%) rotate(2deg) scale(0.99); animation-timing-function: cubic-bezier(0.22, 0.88, 0.35, 1.08); }
  66% { transform: translateX(-1.1%) rotate(-0.4deg) scale(1.003); animation-timing-function: cubic-bezier(0.26, 0.77, 0.4, 1); }
  100% { opacity: 1; transform: translateX(0) rotate(0) scale(1); }
}
@keyframes evenet-assemble-turn {
  0%, 68% { transform: rotate(0deg) scale(1); animation-timing-function: cubic-bezier(0.19, 0.72, 0.33, 1); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes evenet-energy-orbit {
  0%, 48% { opacity: 0; transform: scale(0.38) rotate(-45deg); }
  68% { opacity: 0.86; transform: scale(1.08) rotate(96deg); }
  100% { opacity: 0; transform: scale(1.4) rotate(180deg); }
}
@keyframes evenet-lock-flash {
  0%, 62% { opacity: 0; transform: scale(0.28); }
  68% { opacity: 0.95; transform: scale(0.82); animation-timing-function: cubic-bezier(0.18, 0.8, 0.3, 1); }
  78%, 100% { opacity: 0; transform: scale(1.8); }
}
@media (prefers-reduced-motion: reduce) {
  .answer.is-assembled .evenet-half,
  .answer.is-assembled .evenet-turn {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .answer.is-assembled .evenet-energy,
  .answer.is-assembled .evenet-lock-flash {
    animation: none;
    display: none;
  }
}
.team-block {
  font-size: 15px;
  line-height: 1.55;
  color: rgba(226, 232, 240, 0.78);
}
.team-label {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.88);
  margin-right: 0.35rem;
}
.team-names {
  font-style: italic;
  font-weight: 400;
}
</style>
