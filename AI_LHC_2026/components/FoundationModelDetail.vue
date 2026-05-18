<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="fm-detail-overlay"
      @click.self="emit('close')"
    >
      <article class="fm-detail-card" :style="{ '--accent': model.color }">
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
          <div>
            <div class="detail-level">{{ levelLabel(model.level) }}</div>
            <h2>{{ model.name }}</h2>
            <p>{{ model.title }}</p>
            <p v-if="highlightSource" class="detail-source-focus">
              Focus: {{ highlightSource.label }} · {{ highlightSource.date }}
            </p>
          </div>
        </div>
        <div class="detail-body">
          <div class="detail-summary">
            <h3>What it contributes</h3>
            <p>{{ model.summary }}</p>
            <h3>Highlights</h3>
            <ul>
              <li v-for="item in model.highlights" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="detail-sidebar">
            <div class="stat-block">
              <span>Representation</span>
              <strong>{{ model.representation }}</strong>
            </div>
            <div class="stat-block">
              <span>Architecture</span>
              <strong>{{ model.architecture }}</strong>
            </div>
            <div class="stat-block">
              <span>Domain</span>
              <strong>{{ model.domain }}</strong>
            </div>
            <div class="stat-block">
              <span>Data signal</span>
              <strong>{{ model.data }}</strong>
            </div>
            <div class="detail-sources">
              <span>Source links</span>
              <div>
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
            <div class="detail-tags">
              <span v-for="tag in model.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
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

const highlightSource = computed(() => {
  if (!props.model || !props.highlightDate) return null
  return linksFor(props.model).find(s => s.date === props.highlightDate) ?? null
})

function levelLabel(key) {
  return levels.find(l => l.key === key)?.label ?? key
}
</script>

<style scoped>
.fm-detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.86);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px;
  animation: detail-fade 160ms ease-out;
}

.fm-detail-card {
  position: relative;
  width: min(1040px, 94vw);
  min-height: 560px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 48%);
  background:
    radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent), transparent 74%), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.090), rgba(255, 255, 255, 0.030)),
    rgba(5, 10, 22, 0.96);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.54), 0 0 40px color-mix(in srgb, var(--accent), transparent 84%);
  padding: 34px;
  color: rgba(255, 255, 255, 0.92);
  overflow: hidden;
  animation: detail-rise 220ms ease-out;
}

.fm-detail-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.10;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.20) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.20) 1px, transparent 1px);
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
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 20px;
  align-items: center;
  padding-right: 58px;
}

.detail-avatar {
  width: 82px;
  height: 82px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), white 18%);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent), white 8%), rgba(255, 255, 255, 0.12)),
    rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 26px rgba(255, 255, 255, 0.10);
}

.detail-avatar span {
  color: rgba(5, 10, 22, 0.92);
  font-size: 30px;
  line-height: 1;
  font-weight: 950;
}

.detail-level {
  color: var(--accent);
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.10em;
  font-weight: 900;
}

.detail-source-focus {
  margin: 10px 0 0;
  color: var(--accent);
  font-size: 13px;
  line-height: 1.3;
}

.detail-hero h2 {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: 42px;
  line-height: 1;
}

.detail-hero p {
  margin: 10px 0 0;
  color: rgba(226, 232, 240, 0.68);
  font-size: 16px;
  line-height: 1.32;
}

.detail-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 28px;
  margin-top: 28px;
}

.detail-summary h3 {
  margin: 0 0 9px;
  color: rgba(255, 255, 255, 0.90);
  font-size: 17px;
  line-height: 1;
}

.detail-summary p {
  margin: 0 0 22px;
  color: rgba(226, 232, 240, 0.72);
  font-size: 16px;
  line-height: 1.42;
}

.detail-summary ul {
  margin: 0;
  padding-left: 20px;
  color: rgba(226, 232, 240, 0.72);
  font-size: 15px;
  line-height: 1.42;
}

.detail-summary li + li {
  margin-top: 8px;
}

.detail-sidebar {
  display: grid;
  gap: 10px;
  align-content: start;
}

.stat-block {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background: rgba(0, 0, 0, 0.18);
  padding: 10px 12px;
}

.stat-block span {
  display: block;
  color: rgba(226, 232, 240, 0.46);
  font-size: 10.5px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 800;
}

.stat-block strong {
  display: block;
  margin-top: 7px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 13px;
  line-height: 1.25;
}

.detail-sources {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background: rgba(0, 0, 0, 0.18);
  padding: 10px 12px;
}

.detail-sources > span {
  display: block;
  color: rgba(226, 232, 240, 0.46);
  font-size: 10.5px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 800;
}

.detail-sources > div {
  display: grid;
  gap: 5px;
  margin-top: 8px;
}

.detail-sources a {
  min-height: 25px;
  display: grid;
  grid-template-columns: 72px 13px minmax(0, 1fr) 12px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 58%);
  background: color-mix(in srgb, var(--accent), transparent 90%);
  padding: 0 8px;
  line-height: 1;
  text-decoration: none;
  min-width: 0;
}

.detail-sources a.source-row--active {
  border-color: color-mix(in srgb, var(--accent), white 12%);
  background: color-mix(in srgb, var(--accent), transparent 72%);
}

.detail-sources a:hover {
  border-color: color-mix(in srgb, var(--accent), white 10%);
  background: color-mix(in srgb, var(--accent), transparent 82%);
}

.detail-sources .source-date {
  font-size: 9.2px;
  color: rgba(226, 232, 240, 0.58);
}

.detail-sources .source-ref {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.88);
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
  margin-top: 4px;
}

.detail-tags span {
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 62%);
  background: color-mix(in srgb, var(--accent), transparent 90%);
  color: rgba(255, 255, 255, 0.80);
  padding: 0 8px;
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
}

.detail-hint {
  position: absolute;
  right: 26px;
  bottom: 18px;
  color: rgba(226, 232, 240, 0.42);
  font-size: 11px;
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
