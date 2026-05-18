<template>
  <div class="hep-fm-tree" :class="{ 'hep-fm-tree--animate': animate }" :style="cssVars">
    <svg class="hep-fm-tree__svg" :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient :id="ids.trunk" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(148,163,184,0.12)" />
          <stop offset="50%" stop-color="rgba(255,255,255,0.75)" />
          <stop offset="100%" stop-color="rgba(148,163,184,0.12)" />
        </linearGradient>
        <linearGradient
          v-for="b in branches"
          :id="ids.base(b.key)"
          :key="`base-${b.key}`"
          gradientUnits="userSpaceOnUse"
          :x1="b.x" :y1="layout.trunkY" :x2="b.x" :y2="layout.plot.y0"
        >
          <stop offset="0%" :stop-color="b.color" stop-opacity="0.2" />
          <stop offset="30%" :stop-color="b.color" stop-opacity="0.8" />
          <stop offset="100%" :stop-color="b.color" stop-opacity="0.4" />
        </linearGradient>
        <linearGradient
          v-for="b in branches"
          :id="ids.flow(b.key)"
          :key="`flow-${b.key}`"
          gradientUnits="userSpaceOnUse"
          :x1="b.x" :y1="layout.trunkY" :x2="b.x" :y2="layout.plot.y0"
        >
          <stop offset="0%" stop-color="rgba(255,255,255,0)" />
          <stop offset="0%" :stop-color="b.color" stop-opacity="0">
            <animate attributeName="offset" :dur="b.flowDur" values="-0.15;1.15" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" :stop-color="b.color" stop-opacity="0.9">
            <animate attributeName="offset" :dur="b.flowDur" values="-0.05;1.25" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
        <filter :id="ids.trunkGlow" x="-8%" y="-80%" width="116%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path
        v-for="(b, i) in branches"
        :key="`g-${b.key}`"
        :d="b.pathD"
        fill="none"
        :stroke="b.color"
        :stroke-width="b.halo"
        stroke-linecap="round"
        class="hep-fm-tree__branch-glow"
        :style="{ '--i': i }"
      />
      <path
        v-for="(b, i) in branches"
        :key="b.key"
        :d="b.pathD"
        fill="none"
        :stroke="`url(#${ids.base(b.key)})`"
        :stroke-width="b.stroke"
        stroke-linecap="round"
        class="hep-fm-tree__branch-base"
        :style="{ '--i': i }"
      />
      <path
        v-for="(b, i) in branches"
        :key="`f-${b.key}`"
        :d="b.pathD"
        pathLength="100"
        fill="none"
        :stroke="`url(#${ids.flow(b.key)})`"
        :stroke-width="b.flowW"
        stroke-linecap="round"
        stroke-dasharray="14 86"
        class="hep-fm-tree__branch-flow"
        :style="{ '--i': i }"
      >
        <animate attributeName="stroke-dashoffset" :dur="b.flowDur" values="0;-100" repeatCount="indefinite" />
      </path>

      <line
        :x1="trunk.x1" :y1="trunk.y" :x2="trunk.x2" :y2="trunk.y"
        :stroke="`url(#${ids.trunk})`" :stroke-width="theme.trunkWidth + 3"
        stroke-linecap="round" opacity="0.35" :filter="`url(#${ids.trunkGlow})`"
      />
      <line
        :x1="trunk.x1" :y1="trunk.y" :x2="trunk.x2" :y2="trunk.y"
        :stroke="`url(#${ids.trunk})`" :stroke-width="theme.trunkWidth"
        stroke-linecap="round" class="hep-fm-tree__trunk"
      />

      <line
        v-for="(x, i) in columnEdges"
        :key="`col-${i}`"
        :x1="x" :y1="layout.plot.y0" :x2="x" :y2="layout.trunkY"
        :stroke="theme.colDivider" stroke-width="1" stroke-dasharray="3 6" opacity="0.28"
      />

      <template v-if="showTimeline">
        <line
          v-for="row in timelineRows"
          :key="`line-${row.year}`"
          :x1="layout.timelineLineX0" :y1="row.y"
          :x2="layout.timelineLineX1" :y2="row.y"
          class="hep-fm-tree__year-line" :stroke="theme.yearLine"
        />
      </template>
    </svg>

    <div class="hep-fm-tree__overlay">
      <template v-if="showTimeline">
        <div
          v-for="row in timelineRows"
          :key="`y-${row.year}`"
          class="hep-fm-tree__year"
          :style="posStyle(layout.dateCol.center, row.labelY)"
        >
          <span class="hep-fm-tree__year-badge">{{ row.year }}</span>
        </div>
      </template>

      <div
        v-for="b in branches"
        :key="`lbl-${b.key}`"
        class="hep-fm-tree__branch-label"
        :style="branchLabelStyle(b)"
        :data-color="b.color"
      >
        <div :class="b.icon" :style="{ color: b.color }" />
        <span>{{ b.label }}</span>
        <em>{{ b.count }}</em>
      </div>

      <button
        v-for="(leaf, i) in leaves"
        :key="leaf.id"
        type="button"
        class="hep-fm-tree__leaf"
        :class="[
          leaf.side === 'left' ? 'hep-fm-tree__leaf--left' : 'hep-fm-tree__leaf--right',
          { 'hep-fm-tree__leaf--featured': leaf.featured, 'hep-fm-tree__leaf--active': isActive(leaf) }
        ]"
        :style="leafStyle(leaf, i)"
        :title="leafTitle(leaf)"
        @click="openLeaf(leaf)"
      >
        <span class="hep-fm-tree__leaf-name">{{ leaf.name }}</span>
        <span v-if="leaf.arxivRef" class="hep-fm-tree__leaf-arxiv">arXiv:{{ leaf.arxivRef }}</span>
        <span class="hep-fm-tree__leaf-hint i-carbon:zoom-in" />
      </button>
    </div>

    <FoundationModelDetail :model="selected" :highlight-date="highlightDate" @close="closeDetail" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, useId } from 'vue'
import FoundationModelDetail from './FoundationModelDetail.vue'
import { levels, modelById } from '../data/foundationModels.js'
import {
  VIEW_W,
  VIEW_H,
  DEFAULT_LAYOUT,
  buildLayout,
  buildBranches,
  buildTimelineRows,
  makeDateToY,
  placeLeaves,
  posStyle,
  leafAnchorTransform,
  leafWidthForRegion
} from '../composables/hepFmTreeLayout.js'

const props = defineProps({
  dateStart: { type: String, default: '2023-12-01' },
  dateEnd: { type: String, default: '2026-05-01' },
  timelineYears: { type: Array, default: () => [2024, 2025, 2026] },
  showTimeline: { type: Boolean, default: true },
  animate: { type: Boolean, default: true },
  layout: { type: Object, default: () => ({}) },
  theme: { type: Object, default: () => ({}) },
  typography: { type: Object, default: () => ({ year: 9, leafName: 8, label: 9 }) }
})

const DEFAULT_THEME = {
  stageBg: 'linear-gradient(168deg, #0b1020 0%, #0d1428 42%, #0a0f1c 100%)',
  yearLine: 'rgba(226,232,240,0.26)',
  colDivider: 'rgba(226,232,240,0.09)',
  trunkWidth: 5
}

const uid = useId()
const ids = {
  trunk: `hep-trunk-${uid}`,
  trunkGlow: `hep-trunk-glow-${uid}`,
  base: key => `hep-base-${key}-${uid}`,
  flow: key => `hep-flow-${key}-${uid}`
}

const selected = ref(null)
const highlightDate = ref(null)

const layout = computed(() => buildLayout({ ...DEFAULT_LAYOUT, ...props.layout }))
const theme = computed(() => ({ ...DEFAULT_THEME, ...props.theme }))
const levelMap = computed(() => Object.fromEntries(levels.map(l => [l.key, l])))
const dateToY = computed(() => makeDateToY(layout.value.plot, props.dateStart, props.dateEnd))

const branches = computed(() => buildBranches(layout.value.regions, levelMap.value, layout.value))
const leaves = computed(() => placeLeaves(layout.value.regions, levelMap.value, dateToY.value, layout.value))
const timelineRows = computed(() => buildTimelineRows(props.timelineYears, layout.value, dateToY.value))

const trunk = computed(() => ({
  x1: layout.value.regions.raw.branchX,
  x2: layout.value.regions.cross.branchX,
  y: layout.value.trunkY
}))

const columnEdges = computed(() => {
  const { dateCol, regions } = layout.value
  return [dateCol.x1, regions.raw.branchX, regions.jet.branchX, regions.event.branchX]
})

const cssVars = computed(() => {
  const s = props.typography
  const fs = props.theme?.fontScale ?? 1
  return {
    background: theme.value.stageBg,
    '--fs-year': `${s.year * fs}px`,
    '--fs-name': `${s.leafName * fs}px`,
    '--fs-label': `${s.label * fs}px`
  }
})

function branchLabelStyle(b) {
  return {
    ...posStyle(layout.value.regions[b.key].branchX, layout.value.labelY),
    transform: 'translate(-50%, -50%)',
    '--pill-color': b.color
  }
}

function leafStyle(leaf, index) {
  const region = layout.value.regions[leaf.regionKey]
  const colHalf = (region?.w ?? 200) / 2
  return {
    ...posStyle(leaf.branchX, leaf.y),
    width: `${(leaf.leafW / VIEW_W) * 100}%`,
    maxWidth: `${((colHalf - 4) / VIEW_W) * 100}%`,
    minWidth: layout.value.minLeafW ? `${(layout.value.minLeafW / VIEW_W) * 100}%` : undefined,
    transform: leafAnchorTransform(leaf.side),
    '--leaf-i': index,
    '--leaf-accent': leaf.color
  }
}

function leafTitle(leaf) {
  const ref = leaf.arxivRef ? `arXiv:${leaf.arxivRef}` : ''
  return [leaf.date, leaf.name, ref].filter(Boolean).join(' · ')
}

function isActive(leaf) {
  return selected.value?.id === leaf.modelId && highlightDate.value === leaf.date
}

function openLeaf(leaf) {
  const model = modelById(leaf.modelId)
  if (!model) return
  selected.value = model
  highlightDate.value = leaf.date
}

function closeDetail() {
  selected.value = null
  highlightDate.value = null
}

function onKeydown(e) {
  if (e.key === 'Escape' && selected.value) closeDetail()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.hep-fm-tree {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 12px 40px rgba(0, 0, 0, 0.45);
}

.hep-fm-tree::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(105deg, rgba(103, 232, 249, 0.06) 0%, transparent 40%, rgba(196, 181, 253, 0.07) 80%, transparent 100%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 30%, transparent 100%);
  background-size: 220% 100%, 100% 200%;
  animation: bg-flow 18s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

.hep-fm-tree::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.15) 100%);
  pointer-events: none;
  z-index: 0;
}

@keyframes bg-flow {
  from { background-position: 0% 50%, 50% 0%; }
  to { background-position: 100% 50%, 50% 100%; }
}

.hep-fm-tree__svg,
.hep-fm-tree__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hep-fm-tree__svg {
  display: block;
  pointer-events: none;
  z-index: 1;
}

.hep-fm-tree__overlay {
  pointer-events: none;
  z-index: 2;
}

.hep-fm-tree__branch-glow { opacity: 0.14; filter: blur(5px); }
.hep-fm-tree__branch-base { opacity: 0.92; }
.hep-fm-tree__branch-flow { opacity: 0.85; mix-blend-mode: screen; }
.hep-fm-tree__year-line { stroke-width: 1.5; stroke-dasharray: 7 5; opacity: 0.9; }

.hep-fm-tree__year {
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hep-fm-tree__year-badge {
  font-size: var(--fs-year);
  font-weight: 800;
  color: #f8fafc;
  background: rgba(5, 10, 22, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.3);
  border-radius: 4px;
  padding: 2px 7px;
  line-height: 1;
  white-space: nowrap;
}

.hep-fm-tree__branch-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--fs-label);
  font-weight: 800;
  white-space: nowrap;
  color: #f8fafc;
  border: 1px solid color-mix(in srgb, var(--pill-color) 55%, transparent);
  background: color-mix(in srgb, var(--pill-color) 14%, rgba(5, 10, 22, 0.88));
  box-shadow: 0 0 12px color-mix(in srgb, var(--pill-color) 18%, transparent);
  z-index: 4;
  pointer-events: none;
}

.hep-fm-tree__branch-label em {
  font-style: normal;
  font-weight: 900;
  min-width: 1.2em;
  height: 1.2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.95em;
}

/* Leaves: anchor on branch, grow outward; text reads away from stem */
.hep-fm-tree__leaf {
  position: absolute;
  display: grid;
  gap: 1px;
  cursor: pointer;
  pointer-events: auto;
  border-radius: 6px;
  padding: 4px 8px;
  border: 1px solid color-mix(in srgb, var(--leaf-accent) 55%, white);
  background:
    radial-gradient(circle at var(--glow-x) 0, color-mix(in srgb, var(--leaf-accent) 20%, transparent), transparent 55%),
    linear-gradient(135deg, rgba(8, 12, 26, 0.97), rgba(4, 8, 18, 0.94));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45), 0 0 10px color-mix(in srgb, var(--leaf-accent) 8%, transparent);
  z-index: 6;
  transition: filter 0.15s ease, box-shadow 0.15s ease;
}

.hep-fm-tree__leaf--left {
  --glow-x: 100%;
  text-align: left;
  padding-right: 10px;
}

.hep-fm-tree__leaf--right {
  --glow-x: 0%;
  text-align: left;
  padding-left: 10px;
}

.hep-fm-tree__leaf-name {
  font-size: var(--fs-name);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.93);
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hep-fm-tree__leaf-arxiv {
  font-size: calc(var(--fs-name) * 0.86);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.1;
  white-space: nowrap;
}

.hep-fm-tree__leaf-hint {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  opacity: 0;
  color: rgba(255, 255, 255, 0.5);
  transition: opacity 0.15s ease;
}

.hep-fm-tree__leaf--left .hep-fm-tree__leaf-hint { right: 4px; }
.hep-fm-tree__leaf--right .hep-fm-tree__leaf-hint { right: 4px; }

.hep-fm-tree__leaf:hover {
  z-index: 12;
  filter: brightness(1.08);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5), 0 0 16px color-mix(in srgb, var(--leaf-accent) 22%, transparent);
}

.hep-fm-tree__leaf:hover .hep-fm-tree__leaf-hint { opacity: 1; }

.hep-fm-tree__leaf--featured { outline: 1px solid rgba(255, 255, 255, 0.35); }
.hep-fm-tree__leaf--active { outline: 2px solid rgba(255, 255, 255, 0.5); }

.hep-fm-tree--animate .hep-fm-tree__trunk,
.hep-fm-tree--animate .hep-fm-tree__branch-base,
.hep-fm-tree--animate .hep-fm-tree__branch-flow {
  opacity: 0;
  animation: fade-in 0.6s ease forwards;
}

.hep-fm-tree__branch-glow { opacity: 0.14; }

.hep-fm-tree--animate .hep-fm-tree__branch-base,
.hep-fm-tree--animate .hep-fm-tree__branch-flow {
  animation-delay: calc(70ms * var(--i, 0) + 50ms);
}

.hep-fm-tree--animate .hep-fm-tree__branch-label {
  opacity: 0;
  animation: label-in 0.45s ease forwards;
  animation-delay: calc(200ms + 70ms * var(--i, 0));
}

.hep-fm-tree--animate .hep-fm-tree__leaf {
  opacity: 0;
  animation: fade-in 0.4s ease forwards;
  animation-delay: calc(450ms + var(--leaf-i, 0) * 16ms);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes label-in {
  from { opacity: 0; transform: translate(-50%, -42%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
}
</style>
