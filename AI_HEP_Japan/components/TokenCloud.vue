<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  count: number
  cols?: number
  highlight?: number[] | 'all'
  shape?: 'dot' | 'rect'
}>(), {
  cols: 18,
  highlight: () => [],
  shape: 'rect',
})

const highlighted = computed(() => {
  if (props.highlight === 'all')
    return new Set(Array.from({ length: props.count }, (_, i) => i))
  return new Set(props.highlight)
})
</script>

<template>
  <div
    class="token-cloud"
    :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
    aria-label="Token cloud"
  >
    <div
      v-for="i in count"
      :key="i"
      class="t"
      :class="[
        shape === 'dot' ? 'dot' : 'rect',
        highlighted.has(i - 1) ? 'is-hi' : 'is-lo',
      ]"
    />
  </div>
</template>

<style scoped>
.token-cloud {
  display: grid;
  gap: 6px;
  padding: 10px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

.t {
  transition: transform 250ms ease, opacity 250ms ease, filter 250ms ease, background 250ms ease;
}

.t.rect {
  height: 9px;
  border-radius: 3px;
}

.t.dot {
  height: 8px;
  width: 8px;
  border-radius: 999px;
  justify-self: center;
}

.t.is-lo {
  background: rgba(255, 255, 255, 0.16);
  opacity: 0.55;
}

.t.is-hi {
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.95), rgba(255, 61, 242, 0.80));
  box-shadow: 0 0 14px rgba(0, 229, 255, 0.22);
  opacity: 1;
  filter: saturate(1.1);
  transform: scale(1.08);
}
</style>

