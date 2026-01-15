<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $clicks } = useSlideContext()

const step = computed(() => $clicks.value ?? 0)
const dim = computed(() => step.value >= 1)

function activeFor(idx: number) {
  return step.value === idx
}
</script>

<template>
  <div class="demo">
    <div class="spotlight" :class="dim ? 'is-dim' : ''">
      <div class="grid">
        <div class="spotlight-item" :class="activeFor(1) ? 'is-active' : ''">
          <FlowBox label="Event → Objects" :active="activeFor(1)">
            <div class="row">
              <TokenCloud :count="96" :cols="24" :highlight="step >= 1 ? 'all' : []" />
            </div>
            <div class="hint muted">tokens / hits / tracks (placeholder)</div>
          </FlowBox>
        </div>

        <div class="mid">
          <div class="spotlight-item" :class="activeFor(2) ? 'is-active' : ''">
            <GlowArrow />
          </div>
        </div>

        <div class="spotlight-item" :class="activeFor(2) ? 'is-active' : ''">
          <FlowBox label="Backbone" accent="magenta" :active="activeFor(2)">
            <div class="row">
              <NeonCard
                title="Encoder blocks"
                icon="i-carbon:layers"
                :bullets="['local mixing', 'global context']"
                :reveal-at="0"
                :active="activeFor(2)"
                accent="magenta"
              />
            </div>
          </FlowBox>
        </div>

        <div class="mid">
          <div class="spotlight-item" :class="activeFor(3) ? 'is-active' : ''">
            <GlowArrow />
          </div>
        </div>

        <div class="spotlight-item" :class="activeFor(3) ? 'is-active' : ''">
          <FlowBox label="Downstream heads" :active="activeFor(3)">
            <div class="row row2">
              <NeonCard title="Task A" icon="i-carbon:bullhorn" :bullets="['placeholder']" :reveal-at="0" :active="activeFor(3)" />
              <NeonCard title="Task B" icon="i-carbon:chart-evaluation" :bullets="['placeholder']" :reveal-at="0" :active="activeFor(3)" accent="magenta" />
              <NeonCard title="Task C" icon="i-carbon:tool-box" :bullets="['placeholder']" :reveal-at="0" :active="activeFor(3)" />
            </div>
            <div v-if="step >= 4" class="mt">
              <MatrixHeatmap :rows="5" :cols="9" />
            </div>
          </FlowBox>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="pill" :class="step >= 1 ? 'on' : ''">1) tokenize</div>
      <div class="pill" :class="step >= 2 ? 'on' : ''">2) encode</div>
      <div class="pill" :class="step >= 3 ? 'on' : ''">3) heads</div>
      <div class="pill" :class="step >= 4 ? 'on' : ''">4) matrix</div>
      <div class="muted small">Use clicks to advance.</div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 120px 1fr 120px 1fr;
  gap: 14px;
  align-items: center;
}

.mid {
  display: flex;
  justify-content: center;
}

.row {
  margin-top: 4px;
}

.row2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
}

.mt {
  margin-top: 12px;
}

.legend {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.pill {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.72);
  transition: all 250ms ease;
}

.pill.on {
  color: rgba(255, 255, 255, 0.92);
  border-color: rgba(0, 229, 255, 0.28);
  box-shadow: 0 0 18px rgba(0, 229, 255, 0.14);
}

.small {
  font-size: 12px;
}
</style>

