---
clicks: 3
transition: fade-out
glow: right
glowOpacity: 0.34
---

# From Task-Specific ML to Foundation Models

<div class="paradigm-kicker">
  <span v-if="$clicks === 0">Two major ML workflows in collider physics — each with many specialized use cases.</span>
  <span v-else-if="$clicks === 1">Traditionally, <strong>one model per task</strong> — trained and deployed in isolation.</span>
  <span v-else-if="$clicks === 2"><strong>One foundation model</strong> can reduce reliance on many task-specific models.</span>
  <span v-else>A <strong>shared representation</strong> transfers across tasks.</span>
</div>

<div
  class="paradigm-layout"
  :class="{
    'phase-silo': $clicks >= 1,
    'phase-one': $clicks >= 2,
    'phase-shared': $clicks >= 3,
  }"
>
  <article class="paradigm-card paradigm-card--disc">
    <header class="paradigm-card__head">
      <div i-carbon:chart-network class="paradigm-card__icon" />
      <h3>Discriminative ML</h3>
    </header>
    <div class="paradigm-card__viz">
      <ClassificationIllustration :width="168" :height="76" />
    </div>
    <div class="task-lane task-lane--disc">
      <div class="task-row" style="--i: 0">
        <span class="task-pill">tagging</span>
        <span class="task-link"><i class="i-carbon:arrow-right" /></span>
        <span class="task-end">
          <span class="model-chip">f₁</span>
          <span class="gain-badge">↑</span>
        </span>
      </div>
      <div class="task-row" style="--i: 1">
        <span class="task-pill">classification</span>
        <span class="task-link"><i class="i-carbon:arrow-right" /></span>
        <span class="task-end">
          <span class="model-chip">f₂</span>
          <span class="gain-badge">↑</span>
        </span>
      </div>
      <div class="task-row" style="--i: 2">
        <span class="task-pill">regression</span>
        <span class="task-link"><i class="i-carbon:arrow-right" /></span>
        <span class="task-end">
          <span class="model-chip">f₃</span>
          <span class="gain-badge">↑</span>
        </span>
      </div>
    </div>
  </article>

  <div class="paradigm-bridge">
    <div class="bridge-hub">
      <div class="hub-ring" />
      <div class="hub-core">
        <div class="hub-text hub-text--before">
          <span class="hub-count">5×</span>
          <span>models</span>
        </div>
        <div class="hub-text hub-text--one">
          <span class="hub-count">1×</span>
          <span>foundation<br />model</span>
        </div>
        <div class="hub-text hub-text--after">
          <span class="hub-z">z</span>
          <span>shared<br />representation</span>
        </div>
      </div>
    </div>
  </div>

  <article class="paradigm-card paradigm-card--gen">
    <header class="paradigm-card__head">
      <div i-carbon:intent-request-scale-out class="paradigm-card__icon" />
      <h3>Generative ML</h3>
    </header>
    <div class="paradigm-card__viz">
      <GenerativeIllustration :width="168" :height="76" />
    </div>
    <div class="task-lane task-lane--gen">
      <div class="task-row" style="--i: 0">
        <span class="task-pill">simulation</span>
        <span class="task-link"><i class="i-carbon:arrow-right" /></span>
        <span class="task-end">
          <span class="model-chip">g₁</span>
          <span class="gain-badge">↑</span>
        </span>
      </div>
      <div class="task-row" style="--i: 1">
        <span class="task-pill">generation</span>
        <span class="task-link"><i class="i-carbon:arrow-right" /></span>
        <span class="task-end">
          <span class="model-chip">g₂</span>
          <span class="gain-badge">↑</span>
        </span>
      </div>
    </div>
  </article>
</div>

<div v-if="$clicks === 2 || $clicks === 3" class="paradigm-highlights">
  <div class="highlight-card" :class="{ active: $clicks === 2, done: $clicks === 3 }">
    <span class="highlight-num">1</span>
    <div class="highlight-body">
      <div class="highlight-title">Many models → one</div>
      <div class="highlight-desc">A single foundation model serves classification, generation, and related tasks.</div>
    </div>
  </div>
  <div class="highlight-card" :class="{ active: $clicks === 3 }">
    <span class="highlight-num">2</span>
    <div class="highlight-body">
      <div class="highlight-title">Shared representation helps every task</div>
      <div class="highlight-desc">Pretrained <em>z</em> transfers knowledge: can improve downstream tasks when transfer is validated.</div>
    </div>
  </div>
</div>

<style>
.paradigm-kicker {
  margin-top: 0.35rem;
  max-width: 900px;
  min-height: 2.5em;
  color: rgba(226, 232, 240, 0.74);
  font-size: 16px;
  line-height: 1.35;
}

.paradigm-kicker strong {
  color: #fff;
  font-weight: 700;
}

.paradigm-layout {
  --bridge-w: 0px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--bridge-w) minmax(0, 1fr);
  gap: 14px;
  margin-top: 12px;
  align-items: stretch;
  transition:
    grid-template-columns 700ms cubic-bezier(0.4, 0, 0.2, 1),
    gap 700ms cubic-bezier(0.4, 0, 0.2, 1);
}

.paradigm-layout.phase-silo {
  --bridge-w: 132px;
  gap: 12px;
}

.paradigm-layout.phase-one,
.paradigm-layout.phase-shared {
  --bridge-w: 168px;
}

.paradigm-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 2px solid transparent;
  padding: 14px 16px 12px;
  overflow: hidden;
  transition: opacity 450ms ease;
}

.paradigm-card--disc {
  border-color: rgba(34, 211, 238, 0.38);
  background: rgba(8, 145, 178, 0.1);
  box-shadow: 0 0 24px rgba(34, 211, 238, 0.08);
}

.paradigm-card--gen {
  border-color: rgba(251, 191, 36, 0.34);
  background: rgba(180, 83, 9, 0.1);
  box-shadow: 0 0 24px rgba(251, 191, 36, 0.07);
}

.phase-shared .paradigm-card {
  opacity: 0.92;
}

.paradigm-card__head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.paradigm-card__icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.paradigm-card--disc .paradigm-card__icon { color: #67e8f9; }
.paradigm-card--gen .paradigm-card__icon { color: #fcd34d; }

.paradigm-card__head h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
}

.paradigm-card__viz {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 92px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transition: opacity 450ms ease, transform 450ms ease;
}

.phase-silo .paradigm-card__viz,
.phase-one .paradigm-card__viz {
  opacity: 0.5;
  transform: scale(0.96);
}

.phase-shared .paradigm-card__viz {
  opacity: 0.42;
}

.task-lane {
  --task-rows: 3;
  display: grid;
  grid-template-rows: repeat(var(--task-rows), 34px);
  gap: 6px;
  margin-top: 12px;
  min-height: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(8px);
  transition:
    max-height 550ms ease,
    opacity 400ms ease,
    transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.phase-silo .paradigm-card,
.phase-one .paradigm-card,
.phase-shared .paradigm-card {
  min-height: 268px;
}

.phase-silo .task-lane,
.phase-one .task-lane,
.phase-shared .task-lane {
  grid-template-rows: repeat(3, 34px);
  flex: 0 0 114px;
  height: 114px;
  max-height: 114px;
  min-height: 114px;
  align-content: start;
  opacity: 1;
  transform: none;
}

.task-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20px 40px;
  gap: 5px;
  align-items: center;
  min-height: 28px;
  transition: grid-template-columns 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Generative has 2 tasks — lock to rows 1 & 2 so they line up with disc */
.task-lane--gen .task-row:nth-child(1) { grid-row: 1; }
.task-lane--gen .task-row:nth-child(2) { grid-row: 2; }

.task-lane .task-pill { grid-column: 1; }
.task-lane .task-link { grid-column: 2; }
.task-lane .task-end { grid-column: 3; }

/* Reserve badge column from click 2 on — avoids jump when ↑ appears on click 3 */
.phase-one .task-row,
.phase-shared .task-row {
  grid-template-columns: minmax(0, 1fr) 20px 28px;
}

.task-end {
  position: relative;
  width: 40px;
  height: 28px;
  justify-self: end;
  transition: width 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.phase-one .task-end,
.phase-shared .task-end {
  width: 28px;
}

.task-pill {
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
  font-size: 11px;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.85);
  padding: 0 8px;
  transition: border-color 400ms ease, background 400ms ease;
}

.task-lane--disc .task-pill {
  border-color: rgba(103, 232, 249, 0.25);
}

.task-lane--gen .task-pill {
  border-color: rgba(252, 211, 77, 0.25);
}

.task-link {
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.35);
  font-size: 14px;
  transition: color 450ms ease, transform 450ms ease;
}

.phase-one .task-link,
.phase-shared .task-link {
  color: rgba(255, 61, 242, 0.75);
  transform: translateX(2px);
}

.model-chip {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  font-family: ui-monospace, Menlo, monospace;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition:
    opacity 450ms ease,
    transform 450ms ease;
  overflow: hidden;
}

.gain-badge {
  position: absolute;
  inset: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.18);
  border: 1px solid transparent;
  color: #6ee7b7;
  font-size: 12px;
  font-weight: 800;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 450ms ease,
    transform 500ms cubic-bezier(0.34, 1.2, 0.64, 1),
    border-color 450ms ease;
  transition-delay: calc(var(--i, 0) * 40ms);
}

.phase-one .model-chip,
.phase-shared .model-chip {
  opacity: 0;
  transform: scale(0.85);
  pointer-events: none;
}

.phase-shared .gain-badge {
  opacity: 1;
  transform: scale(1);
  border-color: rgba(52, 211, 153, 0.45);
}

.paradigm-bridge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  overflow: hidden;
  transition: opacity 400ms ease;
}

.phase-silo .paradigm-bridge {
  opacity: 1;
}

.bridge-hub {
  position: relative;
  z-index: 2;
  width: 118px;
  height: 118px;
}

.hub-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 40deg,
    rgba(34, 211, 238, 0.75),
    rgba(255, 61, 242, 0.85),
    rgba(52, 211, 153, 0.65),
    rgba(34, 211, 238, 0.75)
  );
  opacity: 0;
  animation: paradigm-spin 14s linear infinite;
  transition: opacity 450ms ease;
}

.phase-one .hub-ring,
.phase-shared .hub-ring {
  opacity: 0.85;
}

.hub-core {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: rgba(7, 11, 24, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hub-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
  line-height: 1.05;
  font-weight: 800;
  transition: opacity 500ms ease, transform 550ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hub-text--before {
  font-size: 13px;
  color: rgba(226, 232, 240, 0.82);
}

.hub-count {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.94);
}

.hub-text--after {
  position: absolute;
  opacity: 0;
  transform: scale(0.9);
  font-size: 12px;
}

.hub-z {
  font-size: 28px;
  line-height: 1;
  background: linear-gradient(90deg, #00e5ff, #34d399, #ff3df2);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-shift 4s ease infinite;
}

.hub-text--one {
  position: absolute;
  opacity: 0;
  transform: scale(0.9);
  font-size: 12px;
}

.phase-silo .hub-text--before {
  opacity: 1;
  transform: none;
}

.phase-one .hub-text--before {
  opacity: 0;
  transform: scale(0.88);
}

.phase-one .hub-text--one {
  opacity: 1;
  transform: none;
}

.phase-shared .hub-text--before,
.phase-shared .hub-text--one {
  opacity: 0;
  transform: scale(0.88);
  transition-delay: 0ms;
}

.phase-shared .hub-text--after {
  opacity: 1;
  transform: none;
  transition-delay: 120ms;
}

.paradigm-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
}

.highlight-card {
  display: flex;
  gap: 10px;
  padding: 11px 13px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  opacity: 0.35;
  transition: opacity 450ms ease, border-color 450ms ease, background 450ms ease;
}

.highlight-card.active {
  opacity: 1;
  border-color: rgba(0, 229, 255, 0.28);
  background: rgba(0, 229, 255, 0.06);
}

.highlight-card.done {
  opacity: 0.65;
}

.highlight-card:last-child.active {
  border-color: rgba(52, 211, 153, 0.32);
  background: rgba(52, 211, 153, 0.07);
}

.highlight-num {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.highlight-card.active .highlight-num {
  color: #67e8f9;
  border-color: rgba(0, 229, 255, 0.4);
  background: rgba(0, 229, 255, 0.12);
}

.highlight-card:last-child.active .highlight-num {
  color: #6ee7b7;
  border-color: rgba(52, 211, 153, 0.4);
  background: rgba(52, 211, 153, 0.12);
}

.highlight-title {
  font-size: 13px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.94);
}

.highlight-desc {
  margin-top: 3px;
  font-size: 11.5px;
  line-height: 1.4;
  color: rgba(226, 232, 240, 0.62);
}

.highlight-desc em {
  font-style: normal;
  color: #67e8f9;
  font-weight: 700;
}

@keyframes paradigm-spin {
  to { transform: rotate(360deg); }
}

</style>
