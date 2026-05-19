<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="fm-detail-overlay"
      @click.self="emit('close')"
    >
      <article
        class="fm-detail-card"
        :class="{ 'fm-detail-card--series': isSeriesDetail }"
        :style="detailStyle"
      >
        <button
          type="button"
          class="detail-close"
          aria-label="Close paper details"
          @click.stop="emit('close')"
        >
          <div class="i-carbon:close"></div>
        </button>

        <div class="detail-hero">
          <div class="detail-avatar">
            <span>{{ model.initials }}</span>
          </div>
          <div class="detail-hero-copy">
            <div class="detail-level-pill">
              <span class="detail-level-dot"></span>
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
              <span class="detail-section-icon i-carbon:idea"></span>
              What it contributes
            </h3>
            <p class="detail-summary-text">{{ model.summary }}</p>

            <h3 class="detail-section-heading detail-section-heading--spaced">
              <span class="detail-section-icon i-carbon:star-filled"></span>
              Highlights
            </h3>
            <ul class="detail-highlights">
              <li v-for="item in model.highlights" :key="item">{{ item }}</li>
            </ul>
          </div>

          <aside class="detail-sidebar">
            <div class="stat-block stat-block--representation">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:data-vis-1"></span>
                Representation
              </span>
              <strong>{{ model.representation }}</strong>
            </div>
            <div class="stat-block stat-block--architecture">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:model"></span>
                Architecture
              </span>
              <strong>{{ model.architecture }}</strong>
            </div>
            <div class="stat-block stat-block--domain">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:earth"></span>
                Domain
              </span>
              <strong>{{ model.domain }}</strong>
            </div>
            <div class="stat-block stat-block--data">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:data-base"></span>
                Data signal
              </span>
              <strong>{{ model.data }}</strong>
            </div>

            <div v-if="!isSeriesDetail" class="detail-sources">
              <span class="stat-label">
                <span class="stat-label-icon i-carbon:link"></span>
                Source links
              </span>
              <div class="detail-source-list">
                <a
                  v-for="source in sourceLinks"
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
                  ></div>
                  <div v-else class="source-icon i-carbon:document"></div>
                  <span class="source-ref">{{ source.label }}</span>
                  <div class="source-launch i-carbon:launch"></div>
                </a>
              </div>
            </div>

            <div v-if="model.tags?.length" class="detail-tags">
              <span v-for="tag in model.tags" :key="tag">{{ tag }}</span>
            </div>
          </aside>
        </div>

        <div v-if="isSeriesDetail" class="detail-sources detail-sources--wide">
          <span class="stat-label">
            <span class="stat-label-icon i-carbon:link"></span>
            Source links
          </span>
          <div class="detail-source-list">
            <a
              v-for="source in sourceLinks"
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
              ></div>
              <div v-else class="source-icon i-carbon:document"></div>
              <span class="source-ref">{{ source.label }}</span>
              <div class="source-launch i-carbon:launch"></div>
            </a>
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
  highlightDate: { type: String, default: null },
  /** Per-part typography controls. Numbers are treated as px; strings can use any CSS unit. */
  typography: { type: Object, default: () => ({}) },
  /** Detail modal layout controls such as sourceColumns/sidebarWidth. */
  layout: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close'])

const levelMeta = computed(() =>
  props.model ? levels.find(l => l.key === props.model.level) : null
)

const sourceLinks = computed(() => (props.model ? linksFor(props.model) : []))

const isSeriesDetail = computed(() =>
  sourceLinks.value.length > 5 || props.model?.detailLayout === 'series'
)

const typographyConfig = computed(() => ({
  ...props.typography,
  ...(props.model?.detailTypography ?? {})
}))

const layoutConfig = computed(() => ({
  ...props.layout,
  ...(props.model?.detailLayoutOptions ?? {})
}))

const detailStyle = computed(() => ({
  '--accent': props.model?.color ?? '#c4b5fd',
  '--level-color': levelMeta.value?.color ?? props.model?.color ?? '#c4b5fd',
  '--detail-font-family': typographyConfig.value.fontFamily ?? 'inherit',
  '--detail-avatar-size': cssSize(typographyConfig.value.avatar, '30px'),
  '--detail-series-avatar-size': cssSize(typographyConfig.value.seriesAvatar ?? typographyConfig.value.avatar, '25px'),
  '--detail-level-size': cssSize(typographyConfig.value.level, '10.5px'),
  '--detail-title-size': cssSize(typographyConfig.value.title, '40px'),
  '--detail-series-title-size': cssSize(typographyConfig.value.seriesTitle ?? typographyConfig.value.title, '35px'),
  '--detail-paper-title-size': cssSize(typographyConfig.value.paperTitle, '15.5px'),
  '--detail-series-paper-title-size': cssSize(typographyConfig.value.seriesPaperTitle ?? typographyConfig.value.paperTitle, '14px'),
  '--detail-focus-size': cssSize(typographyConfig.value.focus, '13px'),
  '--detail-series-focus-size': cssSize(typographyConfig.value.seriesFocus ?? typographyConfig.value.focus, '12px'),
  '--detail-focus-label-size': cssSize(typographyConfig.value.focusLabel, '9.5px'),
  '--detail-badge-size': cssSize(typographyConfig.value.badge, '10.5px'),
  '--detail-heading-size': cssSize(typographyConfig.value.heading, '14px'),
  '--detail-series-heading-size': cssSize(typographyConfig.value.seriesHeading ?? typographyConfig.value.heading, '12px'),
  '--detail-summary-size': cssSize(typographyConfig.value.summary, '16px'),
  '--detail-series-summary-size': cssSize(typographyConfig.value.seriesSummary ?? typographyConfig.value.summary, '14.5px'),
  '--detail-highlight-size': cssSize(typographyConfig.value.highlight, '14.5px'),
  '--detail-series-highlight-size': cssSize(typographyConfig.value.seriesHighlight ?? typographyConfig.value.highlight, '12.2px'),
  '--detail-stat-label-size': cssSize(typographyConfig.value.statLabel, '9.5px'),
  '--detail-series-stat-label-size': cssSize(typographyConfig.value.seriesStatLabel ?? typographyConfig.value.statLabel, '8.3px'),
  '--detail-stat-value-size': cssSize(typographyConfig.value.statValue, '13.2px'),
  '--detail-series-stat-value-size': cssSize(typographyConfig.value.seriesStatValue ?? typographyConfig.value.statValue, '11.2px'),
  '--detail-source-date-size': cssSize(typographyConfig.value.sourceDate, '9px'),
  '--detail-source-ref-size': cssSize(typographyConfig.value.sourceRef, '10.5px'),
  '--detail-tag-size': cssSize(typographyConfig.value.tag, '10.5px'),
  '--detail-series-tag-size': cssSize(typographyConfig.value.seriesTag ?? typographyConfig.value.tag, '9.3px'),
  '--detail-hint-size': cssSize(typographyConfig.value.hint, '11px'),
  '--detail-card-width': cssSize(layoutConfig.value.cardWidth, '1300px'),
  '--detail-sidebar-width': cssSize(layoutConfig.value.sidebarWidth, '398px'),
  '--detail-series-sidebar-width': cssSize(layoutConfig.value.seriesSidebarWidth, '410px'),
  '--detail-source-columns': cssCount(layoutConfig.value.sourceColumns, 1),
  '--detail-series-source-columns': cssCount(layoutConfig.value.seriesSourceColumns, 3),
  '--detail-series-highlight-columns': cssCount(layoutConfig.value.seriesHighlightColumns, 3)
}))

const highlightSource = computed(() => {
  if (!props.model || !props.highlightDate) return null
  return sourceLinks.value.find(s => s.date === props.highlightDate) ?? null
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

function cssSize(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback
  return typeof value === 'number' ? `${value}px` : String(value)
}

function cssCount(value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? String(Math.floor(parsed)) : String(fallback)
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
  width: min(var(--detail-card-width), 96vw);
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
  font-family: var(--detail-font-family);
  overflow: hidden;
  animation: detail-rise 220ms ease-out;
}

.fm-detail-card--series {
  min-height: auto;
  max-height: min(850px, calc(100vh - 48px));
  padding: 26px 34px 24px;
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

.fm-detail-card--series .detail-hero {
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 18px;
  padding-right: 48px;
  padding-bottom: 16px;
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

.fm-detail-card--series .detail-avatar {
  width: 70px;
  height: 70px;
}

.detail-avatar span {
  color: rgba(5, 10, 22, 0.92);
  font-size: var(--detail-avatar-size);
  line-height: 1;
  font-weight: 950;
}

.fm-detail-card--series .detail-avatar span {
  font-size: var(--detail-series-avatar-size);
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
  font-size: var(--detail-level-size);
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
  font-size: var(--detail-title-size);
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

.fm-detail-card--series .detail-name {
  margin-top: 8px;
  font-size: var(--detail-series-title-size);
  line-height: 1;
}

.detail-paper-title {
  margin: 11px 0 0;
  color: rgba(226, 232, 240, 0.78);
  font-size: var(--detail-paper-title-size);
  line-height: 1.38;
  font-weight: 500;
  max-width: 54em;
}

.fm-detail-card--series .detail-paper-title {
  margin-top: 8px;
  font-size: var(--detail-series-paper-title-size);
  line-height: 1.28;
}

.detail-source-focus {
  margin: 12px 0 0;
  font-size: var(--detail-focus-size);
  line-height: 1.35;
  color: rgba(226, 232, 240, 0.72);
}

.fm-detail-card--series .detail-source-focus {
  margin-top: 9px;
  font-size: var(--detail-series-focus-size);
}

.detail-focus-label {
  display: inline-block;
  margin-right: 6px;
  padding: 2px 7px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--accent), transparent 82%);
  border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
  color: var(--accent);
  font-size: var(--detail-focus-label-size);
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

.fm-detail-card--series .detail-hero-badges {
  margin-top: 9px;
}

.hero-badge {
  min-height: 22px;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.22);
  padding: 0 8px;
  font-size: var(--detail-badge-size);
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
  grid-template-columns: minmax(0, 1fr) var(--detail-sidebar-width);
  gap: 28px;
  margin-top: 26px;
}

.fm-detail-card--series .detail-body {
  grid-template-columns: minmax(0, 1fr) var(--detail-series-sidebar-width);
  gap: 20px;
  margin-top: 18px;
}

.detail-section-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 11px;
  color: color-mix(in srgb, var(--accent), white 12%);
  font-size: var(--detail-heading-size);
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-section-heading--spaced {
  margin-top: 24px;
}

.fm-detail-card--series .detail-section-heading {
  margin-bottom: 9px;
  font-size: var(--detail-series-heading-size);
}

.fm-detail-card--series .detail-section-heading--spaced {
  margin-top: 16px;
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
  font-size: var(--detail-summary-size);
  line-height: 1.48;
  font-weight: 450;
}

.fm-detail-card--series .detail-summary-text {
  font-size: var(--detail-series-summary-size);
  line-height: 1.36;
}

.detail-highlights {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.fm-detail-card--series .detail-highlights {
  grid-template-columns: repeat(var(--detail-series-highlight-columns), minmax(0, 1fr));
  gap: 8px;
}

.detail-highlights li {
  position: relative;
  padding: 10px 12px 10px 30px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 78%);
  background: color-mix(in srgb, var(--accent), transparent 92%);
  color: rgba(226, 232, 240, 0.84);
  font-size: var(--detail-highlight-size);
  line-height: 1.38;
  font-weight: 500;
}

.fm-detail-card--series .detail-highlights li {
  min-height: 66px;
  padding: 9px 10px 9px 27px;
  font-size: var(--detail-series-highlight-size);
  line-height: 1.26;
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

.fm-detail-card--series .detail-sidebar {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
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

.fm-detail-card--series .stat-block {
  padding: 8px 10px 9px;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: color-mix(in srgb, var(--accent), white 4%);
  font-size: var(--detail-stat-label-size);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-weight: 900;
}

.fm-detail-card--series .stat-label {
  font-size: var(--detail-series-stat-label-size);
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
  font-size: var(--detail-stat-value-size);
  line-height: 1.32;
  font-weight: 700;
}

.fm-detail-card--series .stat-block strong {
  margin-top: 6px;
  font-size: var(--detail-series-stat-value-size);
  line-height: 1.22;
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
  grid-template-columns: repeat(var(--detail-source-columns), minmax(0, 1fr));
  gap: 5px;
  margin-top: 9px;
}

.detail-sources--wide {
  position: relative;
  z-index: 1;
  margin-top: 16px;
  padding: 10px 12px 12px;
}

.detail-sources--wide .detail-source-list {
  grid-template-columns: repeat(var(--detail-series-source-columns), minmax(0, 1fr));
  gap: 7px;
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

.detail-sources--wide a {
  min-height: 31px;
  grid-template-columns: 74px 14px minmax(0, 1fr) 12px;
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
  font-size: var(--detail-source-date-size);
  color: rgba(226, 232, 240, 0.55);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.detail-sources .source-ref {
  font-size: var(--detail-source-ref-size);
  color: rgba(255, 255, 255, 0.90);
  font-weight: 800;
}

.detail-sources--wide .source-ref {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.fm-detail-card--series .detail-tags {
  grid-column: 1 / -1;
  margin-top: 0;
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
  font-size: var(--detail-tag-size);
  line-height: 1;
  font-weight: 750;
}

.fm-detail-card--series .detail-tags span {
  min-height: 21px;
  padding: 0 8px;
  font-size: var(--detail-series-tag-size);
}

.detail-hint {
  position: absolute;
  right: 26px;
  bottom: 18px;
  color: rgba(226, 232, 240, 0.38);
  font-size: var(--detail-hint-size);
  letter-spacing: 0.02em;
}

.fm-detail-card--series .detail-hint {
  display: none;
}

@media (max-width: 980px) {
  .detail-sources--wide .detail-source-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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
