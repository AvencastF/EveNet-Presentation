<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="fm-detail-overlay"
      @click.self="emit('close')"
    >
      <article
        class="fm-detail-card"
        :style="{
          '--accent': model.color,
          '--level-color': levelMeta?.color ?? model.color
        }"
      >
        <button
          type="button"
          class="detail-close"
          aria-label="Close paper details"
          @click.stop="emit('close')"
        >
          <div class="i-carbon:close" />
        </button>

        <div class="detail-hero">
          <div class="detail-avatar">
            <span>{{ model.initials }}</span>
          </div>
          <div class="detail-hero-copy">
            <div class="detail-level-pill">
              <span class="detail-level-dot" />
              {{ levelMeta?.label ?? levelLabel(model.level) }}
            </div>
            <h2 class="detail-name">{{ model.name }}</h2>
            <p class="detail-paper-title">{{ model.title }}</p>
            <p v-if="highlightSource" class="detail-source-focus">
              <span class="detail-focus-label">Focus</span>
              {{ highlightSource.label }} · {{ highlightSource.date }}
            </p>
            <div v-if="model.badges?.length" class="detail-hero-badges">
              <span
                v-for="tag in model.badges"
                :key="tag"
                :class="badgeClass(tag)"
              >{{ tag }}</span>
            </div>
          </div>
        </div>

        <div class="detail-body">
          <div class="detail-summary">
            <h3 class="detail-section-heading">
              <span class="detail-section-icon i-carbon:idea" />
              What it contributes
            </h3>
            <p class="detail-summary-text">{{ model.summary }}</p>

            <h3 class="detail-section-heading detail-section-heading--spaced">
              <span class="detail-section-icon i-carbon:star-filled" />
              Highlights
            </h3>
            <ul class="detail-highlights">
              <li v-for="item in model.highlights" :key="item">{{ item }}</li>
            </ul>
          </div>

          <aside class="detail-sidebar">
            <div class="stat-block stat-block--representation">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:data-vis-1" />
                Representation
              </span>
              <strong>{{ model.representation }}</strong>
            </div>
            <div class="stat-block stat-block--architecture">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:model" />
                Architecture
              </span>
              <strong>{{ model.architecture }}</strong>
            </div>
            <div class="stat-block stat-block--domain">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:earth" />
                Domain
              </span>
              <strong>{{ model.domain }}</strong>
            </div>
            <div class="stat-block stat-block--data">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:data-base" />
                Data signal
              </span>
              <strong>{{ model.data }}</strong>
            </div>

            <div class="detail-sources">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:link" />
                Source links
              </span>
              <div class="detail-source-list">
                <a
                  v-for="source in linksFor(model)"
                  :key="source.url"
                  :href="source.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="{ 'source-row--active': source.date === highlightDate }"
                  @click.stop
                >
                  <span class="source-date">{{ source.date }}</span>
                  <div
                    v-if="isArxiv(source)"
                    class="source-icon source-icon--arxiv i-simple-icons:arxiv"
                  />
                  <div v-else class="source-icon i-carbon:document" />
                  <span class="source-ref">{{ source.label }}</span>
                  <div class="source-launch i-carbon:launch" />
                </a>
              </div>
            </div>

            <div v-if="model.tags?.length" class="detail-tags">
              <span v-for="tag in model.tags" :key="tag">{{ tag }}</span>
            </div>
          </aside>
        </div>

        <div class="detail-hint">Esc or click outside to close</div>
      </article>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { isArxiv, levels, linksFor } from '../data/foundationModels.js'

const props = defineProps({
  model: { type: Object, default: null },
  highlightDate: { type: String, default: null }
})

const emit = defineEmits(['close'])

const levelMeta = computed(() =>
  props.model ? levels.find(l => l.key === props.model.level) : null
)

const highlightSource = computed(() => {
  if (!props.model || !props.highlightDate) return null
  return linksFor(props.model).find(s => s.date === props.highlightDate) ?? null
})

function levelLabel(key) {
  return levels.find(l => l.key === key)?.label ?? key
}

function badgeClass(tag) {
  return {
    'hero-badge': true,
    'hero-badge--g': tag === 'G',
    'hero-badge--d': tag === 'D',
    'hero-badge--ssl': tag === 'SSL',
    'hero-badge--real': tag === 'R' || tag === 'LHC',
    'hero-badge--llm': tag === 'LLM'
  }
}
</script>

<style scoped>
.fm-detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px;
  animation: detail-fade 160ms ease-out;
}

.fm-detail-card {
  position: relative;
  width: min(1300px, 96vw);
  min-height: 560px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 38%);
  background:
    radial-gradient(ellipse 80% 55% at 8% -8%, color-mix(in srgb, var(--accent), transparent 68%), transparent 52%),
    radial-gradient(ellipse 50% 40% at 100% 0%, color-mix(in srgb, var(--level-color), transparent 82%), transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.028)),
    rgba(5, 10, 22, 0.97);
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.58),
    0 0 48px color-mix(in srgb, var(--accent), transparent 80%),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  padding: 34px 36px 30px;
  color: rgba(255, 255, 255, 0.92);
  overflow: hidden;
  animation: detail-rise 220ms ease-out;
}

.fm-detail-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.09;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 34px 34px;
}

.detail-close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 50%);
  background: color-mix(in srgb, var(--accent), transparent 88%);
  color: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;
}

.detail-close:hover {
  border-color: color-mix(in srgb, var(--accent), white 20%);
  background: color-mix(in srgb, var(--accent), transparent 72%);
}

.detail-close div {
  width: 21px;
  height: 21px;
}

.detail-hero,
.detail-body {
  position: relative;
  z-index: 1;
}

.detail-hero {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 22px;
  align-items: start;
  padding-right: 52px;
  padding-bottom: 22px;
  border-bottom: 1px solid color-mix(in srgb, var(--accent), transparent 72%);
}

.detail-avatar {
  width: 82px;
  height: 82px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--accent), white 22%);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--accent), white 6%), rgba(255, 255, 255, 0.10)),
    rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 0 0 28px rgba(255, 255, 255, 0.12),
    0 8px 24px color-mix(in srgb, var(--accent), transparent 78%);
}

.detail-avatar span {
  color: rgba(5, 10, 22, 0.92);
  font-size: 30px;
  line-height: 1;
  font-weight: 950;
}

.detail-level-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 24px;
  padding: 0 11px 0 8px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--level-color), transparent 42%);
  background: color-mix(in srgb, var(--level-color), transparent 86%);
  color: color-mix(in srgb, var(--level-color), white 18%);
  font-size: 10.5px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-weight: 900;
}

.detail-level-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--level-color);
  box-shadow: 0 0 10px var(--level-color);
}

.detail-name {
  margin: 10px 0 0;
  font-size: 40px;
  line-height: 1.02;
  font-weight: 950;
  letter-spacing: -0.02em;
  background: linear-gradient(
    105deg,
    #fff 0%,
    color-mix(in srgb, var(--accent), white 28%) 55%,
    color-mix(in srgb, var(--accent), white 8%) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.detail-paper-title {
  margin: 11px 0 0;
  color: rgba(226, 232, 240, 0.78);
  font-size: 15.5px;
  line-height: 1.38;
  font-weight: 500;
  max-width: 54em;
}

.detail-source-focus {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(226, 232, 240, 0.72);
}

.detail-focus-label {
  display: inline-block;
  margin-right: 6px;
  padding: 2px 7px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--accent), transparent 82%);
  border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
  color: var(--accent);
  font-size: 9.5px;
  font-weight: 900;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  vertical-align: middle;
}

.detail-hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.hero-badge {
  min-height: 22px;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.22);
  padding: 0 8px;
  font-size: 10.5px;
  font-weight: 850;
  letter-spacing: 0.03em;
}

.hero-badge--g { color: #fcd34d; border-color: rgba(252, 211, 77, 0.42); background: rgba(252, 211, 77, 0.10); }
.hero-badge--d { color: #67e8f9; border-color: rgba(103, 232, 249, 0.42); background: rgba(103, 232, 249, 0.10); }
.hero-badge--ssl { color: #c4b5fd; border-color: rgba(196, 181, 253, 0.42); background: rgba(196, 181, 253, 0.10); }
.hero-badge--real { color: #6ee7b7; border-color: rgba(110, 231, 183, 0.42); background: rgba(110, 231, 183, 0.10); }
.hero-badge--llm { color: #f0abfc; border-color: rgba(240, 171, 252, 0.40); background: rgba(240, 171, 252, 0.10); }

.detail-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 398px;
  gap: 28px;
  margin-top: 26px;
}

.detail-section-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 11px;
  color: color-mix(in srgb, var(--accent), white 12%);
  font-size: 14px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-section-heading--spaced {
  margin-top: 24px;
}

.detail-section-icon {
  width: 15px;
  height: 15px;
  color: var(--accent);
  opacity: 0.95;
}

.detail-summary-text {
  margin: 0;
  color: rgba(226, 232, 240, 0.80);
  font-size: 16px;
  line-height: 1.48;
  font-weight: 450;
}

.detail-highlights {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.detail-highlights li {
  position: relative;
  padding: 10px 12px 10px 30px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 78%);
  background: color-mix(in srgb, var(--accent), transparent 92%);
  color: rgba(226, 232, 240, 0.84);
  font-size: 14.5px;
  line-height: 1.38;
  font-weight: 500;
}

.detail-highlights li::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.detail-sidebar {
  display: grid;
  gap: 9px;
  align-content: start;
}

.stat-block {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-left: 3px solid var(--accent);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--accent), transparent 92%), transparent 42%),
    rgba(0, 0, 0, 0.20);
  padding: 10px 12px 11px;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: color-mix(in srgb, var(--accent), white 4%);
  font-size: 9.5px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-weight: 900;
}

.stat-label-icon {
  width: 12px;
  height: 12px;
  opacity: 0.9;
}

.stat-block strong {
  display: block;
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 13.2px;
  line-height: 1.32;
  font-weight: 700;
}

.detail-sources {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-left: 3px solid color-mix(in srgb, var(--accent), white 8%);
  background: rgba(0, 0, 0, 0.20);
  padding: 10px 12px 11px;
}

.detail-source-list {
  display: grid;
  gap: 5px;
  margin-top: 9px;
}

.detail-sources a {
  min-height: 26px;
  display: grid;
  grid-template-columns: 72px 13px minmax(0, 1fr) 12px;
  align-items: center;
  gap: 8px;
  border-radius: 7px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 58%);
  background: color-mix(in srgb, var(--accent), transparent 90%);
  padding: 0 8px;
  line-height: 1;
  text-decoration: none;
  min-width: 0;
  transition: border-color 140ms ease, background 140ms ease;
}

.detail-sources a.source-row--active {
  border-color: color-mix(in srgb, var(--accent), white 18%);
  background: color-mix(in srgb, var(--accent), transparent 72%);
  box-shadow: 0 0 16px color-mix(in srgb, var(--accent), transparent 78%);
}

.detail-sources a:hover {
  border-color: color-mix(in srgb, var(--accent), white 14%);
  background: color-mix(in srgb, var(--accent), transparent 80%);
}

.detail-sources .source-date {
  font-size: 9px;
  color: rgba(226, 232, 240, 0.55);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.detail-sources .source-ref {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.90);
  font-weight: 800;
}

.detail-sources .source-icon {
  width: 13px;
  height: 13px;
  color: color-mix(in srgb, var(--accent), white 18%);
}

.detail-sources .source-launch {
  width: 12px;
  height: 12px;
  color: var(--accent);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}

.detail-tags span {
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
  background: color-mix(in srgb, var(--accent), transparent 88%);
  color: color-mix(in srgb, var(--accent), white 22%);
  padding: 0 10px;
  font-size: 10.5px;
  line-height: 1;
  font-weight: 750;
}

.detail-hint {
  position: absolute;
  right: 26px;
  bottom: 18px;
  color: rgba(226, 232, 240, 0.38);
  font-size: 11px;
  letter-spacing: 0.02em;
}

@keyframes detail-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes detail-rise {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
</style>
