<script setup>
defineProps({ active: Number })
const chapters = ['Shared event model', 'Learning preferences', 'LHC to LEP', 'Higgs physics']
</script>

<template>
  <div class="nju-chapter-rail" aria-label="Seminar chapters">
    <span v-for="(label, i) in chapters" :key="label" :class="{ current: active === i + 1 }" :aria-current="active === i + 1 ? 'step' : undefined"><b>{{ String(i + 1).padStart(2, '0') }}</b>{{ label }}</span>
  </div>
</template>
