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
        <span><b class="legend-d">D</b> discriminative</span>
        <span><b class="legend-g">G</b> generative</span>
        <span><b class="legend-ssl">SSL</b> self-supervised</span>
        <span><b class="legend-real">R</b> real / public data</span>
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
          <div class="lane-icon" :class="level.icon" />
          <div class="lane-header-copy">
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
            :style="{ '--avatar-color': model.color }"
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
                  <!-- <sup v-if="model.summarizedTitle" class="summary-marker" title="summarized title">*</sup> -->
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

    <FoundationModelDetail :model="selected" @close="closeModel" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cardRef, compactLinksFor, isArxiv, levels, models } from '../data/foundationModels.js'
import FoundationModelDetail from './FoundationModelDetail.vue'

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
  min-height: 14px;
  display: grid;
  grid-template-columns: 52px 10px minmax(0, 1fr);
  gap: 3px;
  align-items: center;
  padding: 0;
  line-height: 1;
  min-width: 0;
}

.source-rows.long-source-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.source-rows.long-source-list .source-row {
  grid-template-columns: 36px 9px minmax(0, 1fr);
  gap: 3px;
}

.source-rows.long-source-list .source-date {
  font-size: calc(5.7px * var(--fm-font-scale));
}

.source-rows.long-source-list .source-ref {
  font-size: calc(6.3px * var(--fm-font-scale));
}

.source-date {
  color: rgba(255, 255, 255, 0.72);
  font-size: calc(6.8px * var(--fm-font-scale));
  line-height: 1;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.source-ref {
  color: rgba(255, 255, 255, 0.88);
  font-size: calc(7.2px * var(--fm-font-scale));
  line-height: 1;
  font-weight: 650;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.source-icon {
  width: 9px;
  height: 9px;
  color: rgba(255, 255, 255, 0.45);
}

.source-icon--arxiv {
  color: rgba(255, 255, 255, 0.55);
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
  min-height: 12px;
  grid-template-columns: 45px 8px minmax(0, 1fr);
  gap: 2px;
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


.legend b {
  font-weight: 900;
  letter-spacing: 0.04em;
}

.legend-d { color: #67e8f9; }
.legend-g { color: #fcd34d; }
.legend-ssl { color: #c4b5fd; }
.legend-real { color: #6ee7b7; }

.lane-header {
  padding-bottom: 2px;
  border-bottom: 1px solid color-mix(in srgb, var(--level-color), transparent 78%);
  margin-bottom: 2px;
}

.lane-header h3 {
  color: color-mix(in srgb, var(--level-color), white 10%);
  font-weight: 950;
  letter-spacing: 0.01em;
  text-shadow: 0 0 18px color-mix(in srgb, var(--level-color), transparent 72%);
}

.lane-header p {
  color: color-mix(in srgb, var(--level-color), rgba(226, 232, 240, 0.55) 35%);
  font-weight: 600;
}

.model-name {
  color: color-mix(in srgb, var(--avatar-color), white 62%);
  font-weight: 900;
  letter-spacing: 0.01em;
  text-shadow: none;
}

.model-card.featured .model-name {
  color: color-mix(in srgb, var(--avatar-color), white 78%);
}

.level-tab {
  box-shadow: 0 0 14px color-mix(in srgb, var(--level-color), transparent 82%);
}
</style>
