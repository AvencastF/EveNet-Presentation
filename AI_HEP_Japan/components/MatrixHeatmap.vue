<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  rows: number
  cols: number
  values?: number[][]
  highlight?: { r: number; c: number }[]
}>(), {
  values: undefined,
  highlight: () => [],
})

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

const hi = computed(() => new Set(props.highlight.map(x => `${x.r}:${x.c}`)))

const val = computed(() => {
  const base = props.values?.length
    ? props.values
    : Array.from({ length: props.rows }, (_, r) =>
      Array.from({ length: props.cols }, (_, c) => clamp01(((r + 1) * (c + 2)) % 9 / 9)),
    )
  return base
})
</script>

<template>
  <div class="m">
    <div
      v-for="r in rows"
      :key="r"
      class="row"
      :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }"
    >
      <div
        v-for="c in cols"
        :key="c"
        class="cell"
        :class="hi.has(`${r - 1}:${c - 1}`) ? 'is-hi' : ''"
        :style="{ '--v': val[r - 1]?.[c - 1] ?? 0 }"
      />
    </div>
  </div>
</template>

<style scoped>
.m {
  padding: 10px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.10);
  display: grid;
  gap: 6px;
}

.row {
  display: grid;
  gap: 6px;
}

.cell {
  height: 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 250ms ease, filter 250ms ease, opacity 250ms ease;
  opacity: calc(0.25 + var(--v) * 0.75);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.12), rgba(255, 61, 242, 0.08));
}

.cell.is-hi {
  opacity: 1;
  filter: saturate(1.2);
  transform: scale(1.05);
  box-shadow: 0 0 14px rgba(0, 229, 255, 0.20);
}
</style>

