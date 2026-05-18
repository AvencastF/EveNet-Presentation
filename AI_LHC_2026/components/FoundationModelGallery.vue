<template>
  <div class="fm-gallery" :style="galleryStyle">
    <div class="gallery-topline">
      <div class="level-tabs">
        <span
          v-for="level in visibleLevels"
          :key="level.key"
          class="level-tab"
          :style="{ '--level-color': level.color }"
        >
          {{ level.label }}
        </span>
      </div>
      <div class="legend">
        <span><b>D</b> discriminative</span>
        <span><b>G</b> generative</span>
        <span><b>SSL</b> self-supervised</span>
        <span><b>R</b> real / public data</span>
      </div>
    </div>

    <div class="level-board" :class="`board-${group}`" :style="boardStyle">
      <section
        v-for="level in visibleLevels"
        :key="level.key"
        class="level-lane"
        :style="{ '--level-color': level.color }"
      >
        <div class="lane-header">
          <div class="lane-icon" :class="level.icon"></div>
          <div>
            <h3>{{ level.label }}</h3>
            <p>{{ level.description }}</p>
          </div>
        </div>
        <div
          class="card-grid"
          :class="{ 'many-cards': modelsForLevel(level.key).length > 4 }"
        >
          <article
            v-for="model in modelsForLevel(level.key)"
            :key="model.id"
            role="button"
            tabindex="0"
            class="model-card"
            :class="[`rarity-${model.rarity}`, { featured: model.featured }]"
            @click.stop="openModel(model)"
            @keydown.enter.prevent="openModel(model)"
            @keydown.space.prevent="openModel(model)"
          >
            <div class="card-shine"></div>
            <div class="card-head">
              <div class="avatar" :style="{ '--avatar-color': model.color }">
                <span>{{ model.initials }}</span>
              </div>
              <div class="card-meta">
                <div class="model-name">
                  {{ model.cardTitle ?? model.name }}
                  <sup v-if="model.summarizedTitle" class="summary-marker" title="summarized title">*</sup>
                </div>
              </div>
            </div>
            <div
              class="source-rows"
              :class="{ 'long-source-list': compactLinksFor(model).length > 3 }"
            >
              <div
                v-for="source in compactLinksFor(model)"
                :key="source.url"
                :title="`${source.date} · ${source.label}`"
                class="source-row"
              >
                <span class="source-date">{{ source.date }}</span>
                <div
                  v-if="isArxiv(source)"
                  class="source-icon source-icon--arxiv i-simple-icons:arxiv"
                ></div>
                <div v-else class="source-icon i-carbon:document"></div>
                <span class="source-ref">{{ cardRef(source) }}</span>
              </div>
            </div>
            <div class="mini-tags">
              <span
                v-for="tag in model.badges"
                :key="tag"
                :class="badgeClass(tag)"
              >
                {{ tag }}
              </span>
            </div>
            <div class="card-footer">
              <span>{{ model.arch }}</span>
              <div class="i-carbon:zoom-in"></div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <div
        v-if="selected"
        class="fm-detail-overlay"
        @click.self="closeModel"
      >
        <article class="fm-detail-card" :style="{ '--accent': selected.color }">
          <button
            type="button"
            class="detail-close"
            aria-label="Close paper details"
            @click.stop="closeModel"
          >
            <div class="i-carbon:close"></div>
          </button>
          <div class="detail-hero">
            <div class="detail-avatar">
              <span>{{ selected.initials }}</span>
            </div>
            <div>
              <div class="detail-level">{{ levelLabel(selected.level) }}</div>
              <h2>{{ selected.name }}</h2>
              <p>{{ selected.title }}</p>
            </div>
          </div>
          <div class="detail-body">
            <div class="detail-summary">
              <h3>What it contributes</h3>
              <p>{{ selected.summary }}</p>
              <h3>Highlights</h3>
              <ul>
                <li v-for="item in selected.highlights" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="detail-sidebar">
              <div class="stat-block">
                <span>Representation</span>
                <strong>{{ selected.representation }}</strong>
              </div>
              <div class="stat-block">
                <span>Architecture</span>
                <strong>{{ selected.architecture }}</strong>
              </div>
              <div class="stat-block">
                <span>Domain</span>
                <strong>{{ selected.domain }}</strong>
              </div>
              <div class="stat-block">
                <span>Data signal</span>
                <strong>{{ selected.data }}</strong>
              </div>
              <div class="detail-sources">
                <span>Source links</span>
                <div>
                  <a
                    v-for="source in linksFor(selected)"
                    :key="source.url"
                    :href="source.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                  >
                    <span class="source-date">{{ source.date }}</span>
                    <div
                      v-if="isArxiv(source)"
                      class="source-icon source-icon--arxiv i-simple-icons:arxiv"
                    ></div>
                    <div v-else class="source-icon i-carbon:document"></div>
                    <span class="source-ref">{{ source.label }}</span>
                    <div class="source-launch i-carbon:launch"></div>
                  </a>
                </div>
              </div>
              <div class="detail-tags">
                <span v-for="tag in selected.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="detail-hint">Esc or click outside to close</div>
        </article>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cardRef, compactLinksFor, isArxiv, levels, linksFor, models } from '../data/foundationModels.js'

const props = defineProps({
  group: {
    type: String,
    default: 'detector'
  },
  /** Per-lane width weights, e.g. `{ raw: 0.55, jet: 1.45 }` or `[0.55, 1.45]` in visible-lane order */
  laneWidths: {
    type: [Object, Array],
    default: null
  },
  /** Uniform layout scale (zoom on the gallery board) */
  scale: {
    type: Number,
    default: 1
  },
  /** Text scale multiplier; defaults to 1 (independent of `scale`) */
  fontScale: {
    type: Number,
    default: 1
  }
})

const galleryStyle = computed(() => ({
  '--fm-font-scale': props.fontScale,
  '--fm-scale': props.scale
}))

const boardStyle = computed(() => {
  const widths = resolveLaneWidths()
  if (!widths.length) return {}
  return { gridTemplateColumns: widths.map(w => `minmax(0, ${w}fr)`).join(' ') }
})

function resolveLaneWidths() {
  if (!props.laneWidths) return []

  if (Array.isArray(props.laneWidths)) {
    return visibleLevels.value.map((level, index) => {
      const value = props.laneWidths[index]
      return Number.isFinite(value) && value > 0 ? value : 1
    })
  }

  return visibleLevels.value.map(level => {
    const value = props.laneWidths[level.key]
    return Number.isFinite(value) && value > 0 ? value : 1
  })
}

const selected = ref(null)

const visibleLevels = computed(() => levels.filter(level => level.groups.includes(props.group)))
const visibleKeys = computed(() => visibleLevels.value.map(level => level.key))

function modelsForLevel(levelKey) {
  return models.filter(model => model.level === levelKey && visibleKeys.value.includes(model.level))
}

function openModel(model) {
  selected.value = model
}

function closeModel() {
  selected.value = null
}

function handleEscape(event) {
  if (event.key === 'Escape' && selected.value) {
    closeModel()
  }
}

function levelLabel(key) {
  return levels.find(level => level.key === key)?.label ?? key
}

function badgeClass(tag) {
  return {
    'badge-g': tag === 'G',
    'badge-d': tag === 'D',
    'badge-ssl': tag === 'SSL',
    'badge-real': tag === 'R',
    'badge-llm': tag === 'LLM'
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.fm-gallery {
  position: relative;
  width: 100%;
  --fm-scale: 1;
  --fm-font-scale: 1;
  zoom: var(--fm-scale);
  transform-origin: top left;
}

.gallery-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 7px;
}

.level-tabs,
.legend {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.level-tab {
  min-height: 26px;
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--level-color), transparent 45%);
  background: color-mix(in srgb, var(--level-color), transparent 88%);
  color: rgba(255, 255, 255, 0.86);
  padding: 0 10px;
  font-size: calc(12px * var(--fm-font-scale));
  font-weight: 800;
  letter-spacing: 0.02em;
}

.legend span {
  color: rgba(226, 232, 240, 0.58);
  font-size: calc(10.5px * var(--fm-font-scale));
  line-height: 1;
}

.legend b {
  color: rgba(255, 255, 255, 0.90);
}

.level-board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;
  margin-top: 9px;
}

.level-board.board-detector {
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
}

.level-lane {
  min-height: 300px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--level-color), transparent 62%);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.060), rgba(255, 255, 255, 0.020)),
    rgba(5, 10, 22, 0.72);
  padding: 9px;
  position: relative;
  overflow: hidden;
}

.level-lane::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.11;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.20) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.20) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, black, transparent 72%);
}

.lane-header {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 31px minmax(0, 1fr);
  gap: 8px;
  align-items: start;
}

.lane-icon {
  width: 28px;
  height: 28px;
  color: var(--level-color);
}

.lane-header h3 {
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: calc(16px * var(--fm-font-scale));
  line-height: 1;
  letter-spacing: 0;
}

.lane-header p {
  margin: 4px 0 0;
  color: rgba(226, 232, 240, 0.55);
  font-size: calc(10px * var(--fm-font-scale));
  line-height: 1.18;
}

.card-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
  margin-top: 8px;
}

.model-card {
  position: relative;
  min-height: 88px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(circle at 16% 0%, color-mix(in srgb, var(--avatar-color), transparent 82%), transparent 48%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.080), rgba(255, 255, 255, 0.030)),
    rgba(7, 11, 24, 0.76);
  color: rgba(255, 255, 255, 0.90);
  text-align: left;
  padding: 7px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.model-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--avatar-color), white 18%);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24), 0 0 20px color-mix(in srgb, var(--avatar-color), transparent 78%);
}

.model-card:focus-visible {
  outline: 2px solid var(--avatar-color);
  outline-offset: 2px;
}

.model-card.featured {
  border-color: color-mix(in srgb, var(--avatar-color), white 10%);
  box-shadow: 0 0 18px color-mix(in srgb, var(--avatar-color), transparent 84%);
}

.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 22%, rgba(255, 255, 255, 0.10) 42%, transparent 58%);
  transform: translateX(-120%);
  transition: transform 450ms ease;
}

.model-card:hover .card-shine {
  transform: translateX(120%);
}

.card-head {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 7px;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--avatar-color), transparent 12%), rgba(255, 255, 255, 0.12)),
    rgba(255, 255, 255, 0.04);
  border: 1px solid color-mix(in srgb, var(--avatar-color), white 18%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.08);
}

.avatar span {
  color: rgba(5, 10, 22, 0.90);
  font-size: calc(12.3px * var(--fm-font-scale));
  font-weight: 900;
  line-height: 1;
}

.model-name {
  color: rgba(255, 255, 255, 0.94);
  font-size: calc(12.3px * var(--fm-font-scale));
  line-height: 1.05;
  font-weight: 800;
}

.summary-marker {
  margin-left: 2px;
  color: var(--avatar-color);
  font-size: calc(10px * var(--fm-font-scale));
  line-height: 0;
  font-weight: 950;
  vertical-align: super;
}

.source-rows {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 2px;
  margin-top: 4px;
}

.source-row {
  min-height: 15px;
  display: grid;
  grid-template-columns: 52px 10px minmax(0, 1fr);
  gap: 3px;
  align-items: center;
  border-radius: 5px;
  border: 1px solid color-mix(in srgb, var(--avatar-color), transparent 68%);
  background: color-mix(in srgb, var(--avatar-color), transparent 91%);
  padding: 0 5px;
  line-height: 1;
  min-width: 0;
}

.model-card:hover .source-row {
  border-color: color-mix(in srgb, var(--avatar-color), white 8%);
  background: color-mix(in srgb, var(--avatar-color), transparent 84%);
}

.source-rows.long-source-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.source-rows.long-source-list .source-row {
  grid-template-columns: 36px 9px minmax(0, 1fr);
  gap: 3px;
  padding: 0 3px;
}

.source-rows.long-source-list .source-date {
  font-size: calc(5.7px * var(--fm-font-scale));
}

.source-rows.long-source-list .source-ref {
  font-size: calc(6.3px * var(--fm-font-scale));
}

.source-date {
  color: rgba(226, 232, 240, 0.52);
  font-size: calc(6.8px * var(--fm-font-scale));
  line-height: 1;
  font-weight: 760;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.source-ref {
  color: rgba(255, 255, 255, 0.82);
  font-size: calc(7.2px * var(--fm-font-scale));
  line-height: 1;
  font-weight: 850;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.source-icon {
  width: 9px;
  height: 9px;
  color: rgba(226, 232, 240, 0.58);
}

.source-icon--arxiv {
  color: color-mix(in srgb, var(--avatar-color), white 12%);
}

.mini-tags {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 4px;
}

.mini-tags span {
  min-height: 16px;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(0, 0, 0, 0.16);
  color: rgba(226, 232, 240, 0.72);
  padding: 0 4px;
  font-size: calc(8.1px * var(--fm-font-scale));
  line-height: 1;
  font-weight: 800;
}

.mini-tags .badge-g { color: #fcd34d; border-color: rgba(252, 211, 77, 0.35); }
.mini-tags .badge-d { color: #67e8f9; border-color: rgba(103, 232, 249, 0.36); }
.mini-tags .badge-ssl { color: #c4b5fd; border-color: rgba(196, 181, 253, 0.36); }
.mini-tags .badge-real { color: #6ee7b7; border-color: rgba(110, 231, 183, 0.38); }
.mini-tags .badge-llm { color: #f0abfc; border-color: rgba(240, 171, 252, 0.35); }

.model-line {
  position: relative;
  z-index: 1;
  margin-top: 4px;
  color: rgba(226, 232, 240, 0.67);
  font-size: 9.6px;
  line-height: 1.12;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  position: relative;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 7px;
  color: rgba(226, 232, 240, 0.43);
  font-size: 9.5px;
  line-height: 1;
}

.card-grid.many-cards {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.level-board.board-detector .level-lane:first-child .card-grid.many-cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-grid.many-cards .model-card {
  min-height: 76px;
  padding: 6px;
}

.card-grid.many-cards .card-head {
  grid-template-columns: 27px minmax(0, 1fr);
  gap: 6px;
}

.card-grid.many-cards .avatar {
  width: 26px;
  height: 26px;
  border-radius: 7px;
}

.card-grid.many-cards .avatar span {
  font-size: calc(11px * var(--fm-font-scale));
}

.card-grid.many-cards .model-name {
  font-size: calc(11.1px * var(--fm-font-scale));
}

.card-grid.many-cards .summary-marker {
  margin-left: 2px;
  font-size: calc(8.6px * var(--fm-font-scale));
}

.card-grid.many-cards .source-rows {
  margin-top: 3px;
  gap: 1.5px;
}

.card-grid.many-cards .source-row {
  min-height: 13px;
  grid-template-columns: 45px 8px minmax(0, 1fr);
  gap: 2px;
  padding: 0 3px;
}

.card-grid.many-cards .source-rows.long-source-list .source-row {
  grid-template-columns: 34px 8px minmax(0, 1fr);
}

.card-grid.many-cards .source-date {
  font-size: calc(5.8px * var(--fm-font-scale));
}

.card-grid.many-cards .source-ref {
  font-size: calc(6.4px * var(--fm-font-scale));
}

.card-grid.many-cards .source-icon {
  width: 8px;
  height: 8px;
}

.card-grid.many-cards .mini-tags span {
  min-height: 14px;
  padding: 0 3px;
  font-size: calc(7px * var(--fm-font-scale));
}

.card-grid.many-cards .model-line {
  -webkit-line-clamp: 1;
  font-size: 8.4px;
}

.card-footer div {
  width: 14px;
  height: 14px;
  color: var(--avatar-color);
}

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

.detail-hero h2 {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: 42px;
  line-height: 1;
  letter-spacing: 0;
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
  letter-spacing: 0;
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
