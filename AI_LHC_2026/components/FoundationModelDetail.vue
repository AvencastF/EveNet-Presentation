<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="fm-detail-overlay"
      @click.self="emit('close')"
    >
      <article
        class="fm-detail-card"
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

        <header class="detail-header">
          <div
            class="detail-avatar"
            :class="{ 'detail-avatar--evenet': model.id === 'evenet' }"
          >
            <img
              v-if="model.id === 'evenet'"
              src="/evenet-logo-white.svg"
              alt=""
              class="detail-avatar-logo"
            />
            <span v-else>{{ model.initials }}</span>
          </div>

          <div class="detail-heading">
            <div class="detail-kicker">
              <span class="level-pill">
                <span class="level-dot"></span>
                {{ levelMeta?.label ?? levelLabel(model.level) }}
              </span>
              <span class="evidence-pill" :class="evidenceClass(fmEvidence.level)">
                {{ fmEvidence.level }}
              </span>
              <span class="classification"><MathText :text="model.classification ?? model.short" /></span>
            </div>

            <h2 class="detail-name"><MathText :text="model.name" /></h2>
            <p class="detail-paper-title"><MathText :text="model.title" /></p>
            <p v-if="highlightSource" class="detail-source-focus">
              <span>Focus</span><MathText :text="highlightSource.label" /> · {{ highlightSource.date }}
            </p>

            <div class="tag-groups">
              <div
                v-for="group in tagGroups"
                :key="group.key"
                class="tag-group"
              >
                <span class="tag-group-label">{{ group.label }}</span>
                <span
                  v-for="tag in group.values"
                  :key="`${group.key}-${tag}`"
                  class="detail-tag"
                ><MathText :text="tag" /></span>
              </div>
            </div>
          </div>
        </header>

        <nav class="detail-tabs" aria-label="Model detail sections">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            :class="{ active: activeTab === tab.key }"
            @click.stop="activeTab = tab.key"
          >
            <div :class="tab.icon"></div>
            <span>{{ tab.label }}</span>
          </button>
        </nav>

        <div class="detail-scroll" :key="activeTab">
          <template v-if="activeTab === 'evidence'">
            <section class="detail-panel detail-panel--dataset">
              <div class="panel-title">
                <div class="i-carbon:data-table"></div>
                <span>Dataset</span>
              </div>

              <div class="dataset-facts">
                <div
                  v-for="item in datasetRows"
                  :key="item.label"
                  class="dataset-fact"
                  :class="{ 'dataset-fact--wide': item.wide }"
                >
                  <span>{{ item.label }}</span>
                  <strong v-if="item.kind !== 'link'"><MathText :text="valueText(item.value)" /></strong>
                  <strong v-else>
                    <template
                      v-for="part in linkParts(item.value)"
                      :key="part.text"
                    >
                      <a
                        v-if="part.href"
                        :href="part.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        @click.stop
                      >{{ part.text }}</a>
                      <span v-else><MathText :text="part.text" /></span>
                    </template>
                  </strong>
                </div>
              </div>
            </section>

            <section class="detail-panel detail-panel--benchmarks">
              <div class="panel-title">
                <div class="i-carbon:chart-evaluation"></div>
                <span>Benchmarks</span>
              </div>

              <div class="table-wrap">
                <table class="benchmark-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Dataset</th>
                      <th>Metric</th>
                      <th>OOD?</th>
                      <th>Real data?</th>
                      <th>FM evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="benchmark in benchmarkRows"
                      :key="`${benchmark.task}-${benchmark.dataset}`"
                    >
                      <td><MathText :text="valueText(benchmark.task)" /></td>
                      <td><MathText :text="valueText(benchmark.dataset)" /></td>
                      <td><MathText :text="valueText(benchmark.metrics)" /></td>
                      <td>
                        <span class="status-chip" :class="statusClass(benchmark.ood)">
                          {{ compactStatus(benchmark.ood) }}
                        </span>
                      </td>
                      <td>
                        <span class="status-chip" :class="statusClass(benchmark.realData)">
                          {{ compactStatus(benchmark.realData) }}
                        </span>
                      </td>
                      <td><MathText :text="valueText(benchmark.fmEvidence)" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </template>

          <section
            v-else-if="activeTab === 'structure'"
            class="detail-grid detail-grid--structure"
          >
            <div class="detail-side-stack">
              <div class="detail-panel">
                <div class="panel-title">
                  <div class="i-carbon:data-vis-1"></div>
                  <span>Representation Pipeline</span>
                </div>

                <div class="pipeline">
                  <template
                    v-for="(step, index) in pipelineSteps"
                    :key="`${step}-${index}`"
                  >
                    <div class="pipeline-step">
                      <span>{{ pipelineLabels[index] ?? `Step ${index + 1}` }}</span>
                      <strong><MathText :text="valueText(step)" /></strong>
                    </div>
                    <div
                      v-if="index < pipelineSteps.length - 1"
                      class="pipeline-arrow i-carbon:arrow-right"
                    ></div>
                  </template>
                </div>

                <dl class="mini-facts mini-facts--representation">
                  <div>
                    <dt>Input</dt>
                    <dd><MathText :text="valueText(representation.inputObjects)" /></dd>
                  </div>
                  <div>
                    <dt>Variable length</dt>
                    <dd><MathText :text="valueText(representation.variableLength)" /></dd>
                  </div>
                  <div>
                    <dt>Padding / masking</dt>
                    <dd><MathText :text="valueText(representation.paddingMasking)" /></dd>
                  </div>
                  <div>
                    <dt>Preprocessing</dt>
                    <dd><MathText :text="valueText(representation.preprocessing)" /></dd>
                  </div>
                </dl>
              </div>
            </div>

            <div class="detail-side-stack">
              <div class="detail-panel">
                <div class="panel-title">
                  <div class="i-carbon:model"></div>
                  <span>Backbone</span>
                </div>

                <dl class="architecture-grid">
                  <div
                    v-for="item in backboneRows"
                    :key="item.label"
                  >
                    <dt>{{ item.label }}</dt>
                    <dd><MathText :text="valueText(item.value)" /></dd>
                  </div>
                </dl>
              </div>

              <div class="detail-panel detail-panel--resources">
                <div class="panel-title">
                  <div class="i-carbon:chip"></div>
                  <span>Pretraining Resources</span>
                </div>
                <dl class="resource-list">
                  <div
                    v-for="item in resourceRows"
                    :key="item.label"
                  >
                    <dt>{{ item.label }}</dt>
                    <dd><MathText :text="valueText(item.value)" /></dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <template v-else>
            <section class="narrative-grid">
            <div class="detail-panel">
              <div class="panel-title">
                <div class="i-carbon:idea"></div>
                <span>Summary</span>
              </div>
              <p class="summary-text"><MathText :text="model.summary" /></p>
              <p v-if="fmEvidence.note" class="evidence-note">
                <MathText :text="fmEvidence.note" />
              </p>
            </div>

            <div class="detail-panel">
              <div class="panel-title">
                <div class="i-carbon:star-filled"></div>
                <span>Highlights</span>
              </div>
              <ul class="highlight-list">
                <li
                  v-for="item in model.highlights"
                  :key="item"
                ><MathText :text="item" /></li>
              </ul>
            </div>

            <div class="detail-panel">
              <div class="panel-title">
                <div class="i-carbon:chart-relationship"></div>
                <span>Capability Assessment</span>
              </div>
              <p class="summary-text"><MathText :text="fmEvidence.level" /></p>
              <p v-if="fmEvidence.note" class="evidence-note">
                <MathText :text="fmEvidence.note" />
              </p>
            </div>
            </section>

            <section
              v-if="sourceLinks.length"
              class="source-strip"
            >
              <span>Sources</span>
              <a
                v-for="source in sourceLinks"
                :key="source.url"
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="{ active: source.date === highlightDate }"
                @click.stop
              >
                <em>{{ source.date }}</em>
                <div
                  v-if="isArxiv(source)"
                  class="i-simple-icons:arxiv"
                ></div>
                <div v-else class="i-carbon:document"></div>
                <strong><MathText :text="source.label" /></strong>
              </a>
            </section>
          </template>
        </div>

        <div class="detail-hint">Esc or click outside to close</div>
      </article>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { isArxiv, levels, linksFor } from '../data/foundationModels.js'
import MathText from './MathText.vue'

const props = defineProps({
  model: { type: Object, default: null },
  highlightDate: { type: String, default: null },
  typography: { type: Object, default: () => ({}) },
  layout: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close'])

const NOT_SPECIFIED = 'Not specified in the paper/project.'
const MISSING_SHORT = 'Not specified.'

const TAG_GROUPS = [
  { key: 'modelType', label: 'Model' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'domain', label: 'Domain' },
  { key: 'evidence', label: 'Evidence' }
]

const tabs = [
  { key: 'evidence', label: 'Evidence', icon: 'i-carbon:chart-evaluation' },
  { key: 'structure', label: 'Architecture', icon: 'i-carbon:model' },
  { key: 'narrative', label: 'Notes', icon: 'i-carbon:idea' }
]

const activeTab = ref('evidence')

watch(() => props.model?.id, () => {
  activeTab.value = 'evidence'
})

const pipelineLabels = ['Raw source', 'Preprocess / tokenize', 'Model input']

const levelMeta = computed(() =>
  props.model ? levels.find(l => l.key === props.model.level) : null
)

const sourceLinks = computed(() => (props.model ? linksFor(props.model) : []))

const highlightSource = computed(() => {
  if (!props.model || !props.highlightDate) return null
  return sourceLinks.value.find(s => s.date === props.highlightDate) ?? null
})

const layoutConfig = computed(() => ({
  ...props.layout,
  ...(props.model?.detailLayoutOptions ?? {})
}))

const detailStyle = computed(() => ({
  '--accent': props.model?.color ?? '#c4b5fd',
  '--level-color': levelMeta.value?.color ?? props.model?.color ?? '#c4b5fd',
  '--detail-card-width': cssSize(layoutConfig.value.cardWidth, '1320px')
}))

const fmEvidence = computed(() => ({
  level: props.model?.fmEvidence?.level ?? 'Not specified',
  note: props.model?.fmEvidence?.note ?? ''
}))

const tagGroups = computed(() => {
  const tags = props.model?.tags
  if (!tags) return []
  if (Array.isArray(tags)) {
    return [{ key: 'tags', label: 'Tags', values: tags }]
  }

  return TAG_GROUPS
    .map(group => ({
      ...group,
      values: normalizeList(tags[group.key])
    }))
    .filter(group => group.values.length)
})

const dataset = computed(() => props.model?.dataset ?? {})
const representation = computed(() => props.model?.representation ?? {})
const backbone = computed(() => props.model?.backbone ?? {})
const pretrainingResources = computed(() => props.model?.pretrainingResources ?? {})

const datasetRows = computed(() => [
  { label: 'Type', value: dataset.value.type },
  { label: 'Size', value: dataset.value.size },
  { label: 'Public?', value: dataset.value.public },
  { label: 'Generator / simulation', value: dataset.value.generator, wide: true },
  { label: 'Link / source', value: dataset.value.link, kind: 'link' },
  { label: 'Mixed-source / cross-domain', value: dataset.value.mixedSource ?? dataset.value.multipleDatasets, wide: true }
])

const pipelineSteps = computed(() => {
  const steps = normalizeList(representation.value.pipeline)
  if (steps.length) return steps.slice(0, 4)
  return [
    representation.value.inputObjects,
    representation.value.preprocessing,
    representation.value.variableLength
  ].filter(Boolean)
})

const backboneRows = computed(() => [
  { label: 'Base / type', value: backbone.value.architectureType ?? backbone.value.baseModel },
  { label: 'Objective', value: backbone.value.objective },
  { label: 'Structure', value: backbone.value.structure },
  { label: 'Parameters', value: backbone.value.parameters },
  { label: 'Trainable / frozen', value: backbone.value.trainableFrozen },
  { label: 'Fine-tuning', value: backbone.value.fineTuning }
])

const benchmarkRows = computed(() => props.model?.benchmarks ?? [])

const resourceRows = computed(() => [
  { label: 'Hardware', value: pretrainingResources.value.hardware },
  { label: 'GPU', value: pretrainingResources.value.gpu },
  { label: 'Time', value: pretrainingResources.value.trainingTime },
  { label: 'Batch', value: pretrainingResources.value.batchSize },
  { label: 'Optimizer', value: pretrainingResources.value.optimizer },
  { label: 'Distributed', value: pretrainingResources.value.distributedStrategy }
])

function levelLabel(key) {
  return levels.find(l => l.key === key)?.label ?? key
}

function cssSize(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback
  return typeof value === 'number' ? `${value}px` : String(value)
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (value === undefined || value === null || value === '') return []
  return [value]
}

function isMissing(value) {
  return value === undefined || value === null || value === '' || value === NOT_SPECIFIED
}

function valueText(value) {
  if (Array.isArray(value)) return value.map(valueText).join('; ')
  if (isMissing(value)) return MISSING_SHORT
  return String(value)
}

function compactStatus(value) {
  const text = valueText(value)
  const lower = text.toLowerCase()
  if (lower.startsWith('yes')) return 'Yes'
  if (lower.startsWith('no')) return 'No'
  if (lower.startsWith('partial')) return 'Partial'
  if (lower.includes('weak')) return 'Weak'
  if (lower.includes('limited')) return 'Limited'
  return text
}

function statusClass(value) {
  const lower = valueText(value).toLowerCase()
  return {
    'status-chip--yes': lower.startsWith('yes') || lower.includes('strong'),
    'status-chip--no': lower.startsWith('no') || lower.includes('not specified'),
    'status-chip--partial': lower.includes('partial') || lower.includes('limited') || lower.includes('weak'),
    'status-chip--moderate': lower.includes('moderate')
  }
}

function evidenceClass(value) {
  const lower = valueText(value).toLowerCase()
  return {
    'evidence-pill--strong': lower.includes('strong'),
    'evidence-pill--moderate': lower.includes('moderate'),
    'evidence-pill--partial': lower.includes('partial') || lower.includes('preliminary'),
    'evidence-pill--demo': lower.includes('demo')
  }
}

function linkParts(value) {
  if (isMissing(value)) return [{ text: MISSING_SHORT, href: null }]

  return String(value)
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const url = part.match(/https?:\/\/\S+/)?.[0]
      if (!url) return { text: part, href: null }
      return { text: shortUrl(url), href: url }
    })
}

function shortUrl(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
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
  padding: 12px;
  animation: detail-fade 160ms ease-out;
}

.fm-detail-card {
  position: relative;
  width: min(1480px, 98.5vw);
  max-height: min(880px, calc(100vh - 18px));
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 42%);
  background:
    radial-gradient(ellipse 72% 50% at 4% -8%, color-mix(in srgb, var(--accent), transparent 72%), transparent 56%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.088), rgba(255, 255, 255, 0.028)),
    rgba(5, 10, 22, 0.98);
  box-shadow:
    0 30px 82px rgba(0, 0, 0, 0.58),
    0 0 42px color-mix(in srgb, var(--accent), transparent 82%),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.92);
  padding: 22px 26px 16px;
  overflow: hidden;
  animation: detail-rise 220ms ease-out;
}

.fm-detail-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.08;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 32px 32px;
}

.detail-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 4;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 50%);
  background: color-mix(in srgb, var(--accent), transparent 88%);
  color: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.detail-close:hover {
  border-color: color-mix(in srgb, var(--accent), white 20%);
  background: color-mix(in srgb, var(--accent), transparent 72%);
  transform: translateY(-1px);
}

.detail-close div {
  width: 19px;
  height: 19px;
}

.detail-header,
.detail-tabs,
.detail-scroll,
.detail-hint {
  position: relative;
  z-index: 1;
}

.detail-header {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  gap: 20px;
  padding-right: 50px;
  padding-bottom: 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--accent), transparent 74%);
}

.detail-avatar {
  width: 78px;
  height: 78px;
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
    0 8px 22px color-mix(in srgb, var(--accent), transparent 80%);
}

.detail-avatar--evenet {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.080), rgba(255, 255, 255, 0.026)),
    rgba(5, 10, 22, 0.84);
  border-color: rgba(255, 255, 255, 0.36);
  box-shadow:
    inset 0 0 24px rgba(255, 255, 255, 0.07),
    0 0 0 1px rgba(125, 211, 252, 0.24),
    0 8px 22px rgba(0, 0, 0, 0.20);
}

.detail-avatar span {
  color: rgba(5, 10, 22, 0.94);
  font-size: 30px;
  line-height: 1;
  font-weight: 950;
}

.detail-avatar-logo {
  display: block;
  width: 76%;
  height: 76%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(125, 211, 252, 0.30));
}

.detail-kicker {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  min-width: 0;
}

.level-pill,
.evidence-pill {
  min-height: 26px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--level-color), transparent 42%);
  background: color-mix(in srgb, var(--level-color), transparent 86%);
  color: color-mix(in srgb, var(--level-color), white 18%);
  padding: 0 11px;
  font-size: 10.8px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 900;
}

.level-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--level-color);
  box-shadow: 0 0 10px var(--level-color);
}

.evidence-pill {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.065);
  color: rgba(226, 232, 240, 0.78);
}

.evidence-pill--strong {
  color: #6ee7b7;
  border-color: rgba(110, 231, 183, 0.40);
  background: rgba(110, 231, 183, 0.11);
}

.evidence-pill--moderate {
  color: #fcd34d;
  border-color: rgba(252, 211, 77, 0.38);
  background: rgba(252, 211, 77, 0.10);
}

.evidence-pill--partial,
.evidence-pill--demo {
  color: #f0abfc;
  border-color: rgba(240, 171, 252, 0.35);
  background: rgba(240, 171, 252, 0.10);
}

.classification {
  min-width: 0;
  color: rgba(226, 232, 240, 0.66);
  font-size: 13.5px;
  line-height: 1.28;
  font-weight: 650;
}

.detail-name {
  margin: 9px 0 0;
  color: #fff;
  font-size: 38px;
  line-height: 1.02;
  font-weight: 950;
  letter-spacing: 0;
}

.detail-paper-title {
  margin: 7px 0 0;
  max-width: 92ch;
  color: rgba(226, 232, 240, 0.75);
  font-size: 15px;
  line-height: 1.34;
  font-weight: 500;
}

.detail-source-focus {
  margin: 6px 0 0;
  color: rgba(226, 232, 240, 0.68);
  font-size: 12.5px;
  line-height: 1.2;
}

.detail-source-focus span {
  display: inline-block;
  margin-right: 6px;
  padding: 2px 6px;
  border-radius: 5px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent), transparent 84%);
  border: 1px solid color-mix(in srgb, var(--accent), transparent 58%);
  font-size: 9.2px;
  font-weight: 900;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.tag-groups {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
}

.tag-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  min-height: 27px;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.16);
  padding: 4px 6px;
}

.tag-group-label {
  color: rgba(226, 232, 240, 0.48);
  font-size: 9px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.detail-tag {
  min-height: 21px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 58%);
  background: color-mix(in srgb, var(--accent), transparent 88%);
  color: color-mix(in srgb, var(--accent), white 25%);
  padding: 0 8px;
  font-size: 10.2px;
  line-height: 1;
  font-weight: 800;
}

.detail-tabs {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 0 0;
}

.detail-tabs button {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.045);
  color: rgba(226, 232, 240, 0.64);
  padding: 0 13px;
  font-size: 11px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
}

.detail-tabs button:hover,
.detail-tabs button.active {
  border-color: color-mix(in srgb, var(--accent), transparent 42%);
  background: color-mix(in srgb, var(--accent), transparent 84%);
  color: color-mix(in srgb, var(--accent), white 24%);
}

.detail-tabs button div {
  width: 14px;
  height: 14px;
}

.detail-scroll {
  min-height: 0;
  overflow: auto;
  padding: 12px 3px 4px 0;
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--accent), transparent 38%) transparent;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 14px;
}

.detail-side-stack {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.detail-panel {
  min-width: 0;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.105);
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--accent), transparent 94%), transparent 48%),
    rgba(0, 0, 0, 0.22);
  padding: 13px;
  animation: panel-in 260ms ease both;
}

.detail-panel--dataset,
.detail-panel--benchmarks {
  border-color: color-mix(in srgb, var(--accent), transparent 68%);
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--accent), transparent 90%), transparent 52%),
    rgba(0, 0, 0, 0.24);
}

.detail-panel--benchmarks {
  margin-top: 12px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: color-mix(in srgb, var(--accent), white 14%);
  font-size: 12px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-title div {
  width: 15px;
  height: 15px;
  color: var(--accent);
}

.table-wrap {
  width: 100%;
  overflow: auto;
}

.dataset-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}

.dataset-fact {
  min-width: 0;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 80%);
  background: color-mix(in srgb, var(--accent), transparent 94%);
  padding: 10px 11px;
}

.dataset-fact--wide {
  grid-column: span 2;
}

.dataset-fact > span {
  display: block;
  margin-bottom: 5px;
  color: rgba(226, 232, 240, 0.54);
  font-size: 10px;
  line-height: 1;
  font-weight: 950;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dataset-fact strong {
  display: block;
  color: rgba(255, 255, 255, 0.90);
  font-size: 13.2px;
  line-height: 1.28;
  font-weight: 720;
  overflow-wrap: anywhere;
}

.dataset-fact a {
  color: color-mix(in srgb, var(--accent), white 34%);
  text-decoration: none;
}

.dataset-fact a:hover {
  text-decoration: underline;
}

.dataset-table,
.benchmark-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.dataset-table th,
.benchmark-table th {
  border-bottom: 1px solid color-mix(in srgb, var(--accent), transparent 70%);
  color: rgba(226, 232, 240, 0.58);
  font-size: 10px;
  line-height: 1.15;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-align: left;
  text-transform: uppercase;
  padding: 0 9px 8px 0;
}

.dataset-table td,
.benchmark-table td {
  vertical-align: top;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  color: rgba(245, 247, 250, 0.84);
  font-size: 12.1px;
  line-height: 1.32;
  font-weight: 520;
  padding: 9px 9px 9px 0;
  overflow-wrap: anywhere;
}

.dataset-table th:nth-child(1) { width: 14%; }
.dataset-table th:nth-child(2) { width: 25%; }
.dataset-table th:nth-child(3) { width: 16%; }
.dataset-table th:nth-child(4) { width: 12%; }
.dataset-table th:nth-child(5) { width: 15%; }
.dataset-table th:nth-child(6) { width: 18%; }

.benchmark-table th:nth-child(1) { width: 18%; }
.benchmark-table th:nth-child(2) { width: 19%; }
.benchmark-table th:nth-child(3) { width: 27%; }
.benchmark-table th:nth-child(4) { width: 8%; }
.benchmark-table th:nth-child(5) { width: 8%; }
.benchmark-table th:nth-child(6) { width: 20%; }

.dataset-table a,
.source-strip a {
  color: color-mix(in srgb, var(--accent), white 30%);
  text-decoration: none;
}

.dataset-table a:hover,
.source-strip a:hover {
  text-decoration: underline;
}

.pipeline {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 22px minmax(0, 1fr) 22px minmax(0, 1fr);
  align-items: stretch;
  gap: 6px;
}

.pipeline-step {
  min-width: 0;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 76%);
  background: color-mix(in srgb, var(--accent), transparent 92%);
  padding: 10px;
}

.pipeline-step > span,
.mini-facts dt,
.architecture-grid dt,
.resource-list dt {
  display: block;
  margin-bottom: 6px;
  color: rgba(226, 232, 240, 0.50);
  font-size: 10px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pipeline-step strong {
  display: block;
  color: rgba(255, 255, 255, 0.88);
  font-size: 13.3px;
  line-height: 1.25;
  font-weight: 760;
  overflow-wrap: anywhere;
}

.pipeline-arrow {
  align-self: center;
  width: 18px;
  height: 18px;
  color: var(--accent);
  opacity: 0.78;
}

.mini-facts,
.architecture-grid,
.resource-list {
  margin: 10px 0 0;
  display: grid;
  gap: 9px;
}

.mini-facts--representation {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.architecture-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.mini-facts div,
.architecture-grid div,
.resource-list div {
  min-width: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.035);
  padding: 10px;
}

.mini-facts dd,
.architecture-grid dd,
.resource-list dd {
  margin: 0;
  color: rgba(245, 247, 250, 0.84);
  font-size: 12.6px;
  line-height: 1.28;
  font-weight: 560;
  overflow-wrap: anywhere;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(226, 232, 240, 0.72);
  padding: 0 8px;
  font-size: 10.2px;
  line-height: 1;
  font-weight: 900;
  white-space: normal;
}

.status-chip--yes {
  color: #6ee7b7;
  border-color: rgba(110, 231, 183, 0.34);
  background: rgba(110, 231, 183, 0.08);
}

.status-chip--no {
  color: rgba(226, 232, 240, 0.58);
}

.status-chip--partial,
.status-chip--moderate {
  color: #fcd34d;
  border-color: rgba(252, 211, 77, 0.34);
  background: rgba(252, 211, 77, 0.08);
}

.narrative-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.15fr) minmax(0, 0.75fr);
  gap: 14px;
  margin-top: 0;
}

.summary-text,
.evidence-note {
  margin: 0;
  color: rgba(226, 232, 240, 0.82);
  font-size: 15px;
  line-height: 1.42;
  font-weight: 520;
}

.evidence-note {
  margin-top: 10px;
  border-left: 2px solid color-mix(in srgb, var(--accent), transparent 32%);
  color: rgba(226, 232, 240, 0.62);
  padding-left: 10px;
  font-size: 13.5px;
  line-height: 1.36;
}

.highlight-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.highlight-list li {
  position: relative;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 80%);
  background: color-mix(in srgb, var(--accent), transparent 93%);
  color: rgba(226, 232, 240, 0.82);
  padding: 10px 11px 10px 25px;
  font-size: 13.2px;
  line-height: 1.32;
  font-weight: 560;
}

.highlight-list li::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 17px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.resource-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.source-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.18);
  padding: 9px;
}

.source-strip > span {
  color: rgba(226, 232, 240, 0.48);
  font-size: 10px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-right: 2px;
}

.source-strip a {
  min-height: 28px;
  display: inline-grid;
  grid-template-columns: 72px 14px minmax(0, 1fr);
  align-items: center;
  gap: 6px;
  max-width: 260px;
  border-radius: 7px;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 68%);
  background: color-mix(in srgb, var(--accent), transparent 91%);
  padding: 0 9px;
  line-height: 1;
}

.source-strip a.active {
  border-color: color-mix(in srgb, var(--accent), white 18%);
  background: color-mix(in srgb, var(--accent), transparent 76%);
}

.source-strip em {
  color: rgba(226, 232, 240, 0.54);
  font-size: 9.8px;
  font-style: normal;
  font-weight: 750;
  font-variant-numeric: tabular-nums;
}

.source-strip div {
  width: 13px;
  height: 13px;
  color: color-mix(in srgb, var(--accent), white 16%);
}

.source-strip strong {
  min-width: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.86);
  font-size: 10.5px;
  font-weight: 820;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-hint {
  justify-self: end;
  margin-top: 4px;
  color: rgba(226, 232, 240, 0.34);
  font-size: 10.5px;
  letter-spacing: 0.02em;
}

@media (max-width: 1100px) {
  .detail-grid,
  .narrative-grid {
    grid-template-columns: 1fr;
  }

  .pipeline {
    grid-template-columns: 1fr;
  }

  .pipeline-arrow {
    display: none;
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

@keyframes panel-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}
</style>
