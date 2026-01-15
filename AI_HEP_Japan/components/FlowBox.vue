<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  active?: boolean
  accent?: 'cyan' | 'magenta'
}>(), {
  label: undefined,
  active: false,
  accent: 'cyan',
})
</script>

<template>
  <div
    class="flow-box glass"
    :class="[
      accent === 'magenta' ? 'glow-border-magenta' : 'glow-border',
      active ? 'flow-highlight' : '',
    ]"
  >
    <div v-if="label" class="flow-box__label">
      <span class="chip">{{ label }}</span>
    </div>
    <div class="flow-box__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.flow-box {
  border-radius: 18px;
  padding: 14px 14px 12px;
}

.flow-box__label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.chip {
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  padding: 6px 10px;
  border-radius: 999px;
}
</style>

