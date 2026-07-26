---
layout: full
class: no-page-number cinema-bridge-layout
transition: fade-out
---

<div class="cinema-bridge text-white">
  <div class="cinema-bg" aria-hidden="true">
    <div class="cinema-glow"></div>
    <div class="cinema-vignette"></div>
  </div>

  <div
    class="cinema-question"
    :class="{ 'is-out': $clicks > 0 }"
  >
    <p class="cinema-q">
      <span class="cinema-q-line">Can we further improve</span>
      <span class="cinema-q-line cinema-q-line--emph">
        <span class="gradient-animated cinema-brand">EveNet-Full</span><br/>
        generative reconstruction?
      </span>
      <span class="cinema-q-sub">Without shifting the physics.</span>
    </p>
  </div>

  <div v-click class="cinema-reveal">
    <p class="cinema-line cinema-line--pre">Reinforcement Learning with Preference Alignment</p>
    <p class="cinema-line cinema-line--hero">
      <span class="gradient-animated cinema-brand">EveNet-Align</span>
    </p>
    <p class="cinema-line cinema-line--detail">DGPO + CPO alignment</p>
  </div>
</div>

<style scoped>
:global(.slidev-layout.cinema-bridge-layout) {
  position: relative;
  padding: 0 !important;
  overflow: hidden;
  background: #030508 !important;
}

.cinema-bridge {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #030508;
}

.cinema-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cinema-glow {
  position: absolute;
  top: 42%;
  left: 50%;
  width: min(92vw, 52rem);
  height: min(92vw, 52rem);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 229, 255, 0.09) 0%,
    rgba(255, 61, 242, 0.05) 38%,
    transparent 68%
  );
  opacity: 0.9;
  transition: opacity 1.4s ease;
}

.cinema-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(0, 0, 0, 0.72) 100%);
}

.cinema-question,
.cinema-reveal {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  text-align: center;
}

.cinema-question {
  z-index: 2;
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
  transition:
    opacity 1.05s cubic-bezier(0.4, 0, 0.2, 1),
    transform 1.05s cubic-bezier(0.4, 0, 0.2, 1),
    filter 1.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.cinema-question.is-out {
  opacity: 0;
  transform: scale(1.02);
  filter: blur(10px);
  pointer-events: none;
}

.cinema-q {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  max-width: min(150vw, 40rem);
}

.cinema-q-line {
  font-size: clamp(2.1rem, 4.6vw, 3.2rem);
  line-height: 1.12;
  font-weight: 380;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.94);
}

.cinema-q-line--emph {
  font-weight: 420;
}

.cinema-q-sub {
  margin-top: 0.45rem;
  font-size: clamp(1.2rem, 2.4vw, 1.55rem);
  line-height: 1.2;
  font-weight: 360;
  letter-spacing: 0.01em;
  color: rgba(226, 232, 240, 0.62);
}

.cinema-brand {
  font-variant: small-caps;
  font-weight: 520;
}

.cinema-reveal {
  z-index: 1;
  gap: 0.4rem;
}

.cinema-line {
  margin: 0;
  opacity: 0;
  transform: translateY(14px);
  animation: cinemaIn 1.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.cinema-line--pre {
  font-size: clamp(1.35rem, 2.8vw, 1.85rem);
  font-weight: 360;
  letter-spacing: 0.06em;
  /* text-transform: lowercase; */
  color: rgba(226, 232, 240, 0.52);
  animation-delay: 0.55s;
}

.cinema-line--hero {
  font-size: clamp(2.8rem, 6.5vw, 4.6rem);
  font-weight: 420;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: rgba(255, 255, 255, 0.95);
  animation-delay: 1.05s;
}

.cinema-line--detail {
  margin-top: 0.08rem;
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  font-weight: 420;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(165, 243, 252, 0.72);
  animation-delay: 1.55s;
}

.cinema-bridge:has(.cinema-question.is-out) .cinema-glow {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.06);
  transition: opacity 1.6s ease, transform 1.6s ease;
}

@keyframes cinemaIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
