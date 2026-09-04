<script setup>
// Preserve existing Markdown imports; implementation lives in the shared addon.
import SharedComponent from 'slidev-addon-evenet/components/PlotlyChart.vue'
defineOptions({ inheritAttrs: false })
</script>

<template>
  <SharedComponent v-bind="$attrs" />
</template>
