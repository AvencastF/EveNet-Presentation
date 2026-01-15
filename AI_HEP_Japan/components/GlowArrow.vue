<script setup lang="ts">
withDefaults(defineProps<{
  direction?: 'right' | 'left' | 'down' | 'up'
  label?: string
}>(), {
  direction: 'right',
  label: undefined,
})
</script>

<template>
  <div class="ga" :class="`dir-${direction}`">
    <div class="shaft" />
    <div class="head" />
    <div v-if="label" class="label">{{ label }}</div>
  </div>
</template>

<style scoped>
.ga {
  position: relative;
  width: 120px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.18));
}

.shaft {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.85), rgba(255, 61, 242, 0.70));
  border-radius: 999px;
  opacity: 0.9;
}

.head {
  position: absolute;
  right: -2px;
  width: 10px;
  height: 10px;
  border-right: 2px solid rgba(255, 255, 255, 0.85);
  border-top: 2px solid rgba(255, 255, 255, 0.85);
  transform: rotate(45deg);
}

.label {
  position: absolute;
  top: -18px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
  white-space: nowrap;
}

.ga {
  animation: arrow-drift 1.8s ease-in-out infinite;
}

.dir-left {
  transform: rotate(180deg);
}

.dir-up {
  transform: rotate(-90deg);
}

.dir-down {
  transform: rotate(90deg);
}
</style>

