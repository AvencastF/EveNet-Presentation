<script setup lang="ts">
type SupportedIcon =
  | 'i-carbon:grid'
  | 'i-carbon:data-volume'
  | 'i-carbon:chart-network'
  | 'i-carbon:global-filters'
  | 'i-carbon:intent-request-scale-out'
type Accent = 'cyan' | 'violet' | 'emerald'

const props = withDefaults(defineProps<{
  icon: SupportedIcon
  accent?: Accent
  count?: number
  animated?: boolean
}>(), {
  accent: 'cyan',
  count: 4,
  animated: true,
})

const lineClass =
  props.accent === 'violet'
    ? 'from-violet-400/10 via-violet-300/70 to-violet-200/10'
    : props.accent === 'emerald'
      ? 'from-emerald-400/10 via-emerald-300/70 to-emerald-200/10'
      : 'from-cyan-400/10 via-cyan-300/70 to-cyan-200/10'

const chipBorderClass =
  props.accent === 'violet'
    ? 'border-violet-300/40 bg-violet-900/25'
    : props.accent === 'emerald'
      ? 'border-emerald-300/40 bg-emerald-900/25'
      : 'border-cyan-300/40 bg-cyan-900/25'
</script>

<template>
  <div class="relative h-10 w-full min-w-0">
    <!-- Arrow line -->
    <div class="absolute left-0 right-3 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-gradient-to-r"
      :class="lineClass" />

    <!-- Arrow head -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 opacity-80"
      :class="accent === 'violet' ? 'border-violet-200/70' : (accent === 'emerald' ? 'border-emerald-200/70' : 'border-cyan-200/70')"
    />

    <!-- Flowing icon chips -->
    <div
      v-if="animated"
      v-for="i in count"
      :key="i"
      class="evenet-flow-chip absolute top-1/2 -translate-y-1/2"
      :style="{ animationDelay: `${(i - 1) * 0.75}s` }"
    >
      <div class="h-6 w-6 rounded-full border flex items-center justify-center backdrop-blur-sm"
        :class="chipBorderClass">
        <div v-if="icon === 'i-carbon:grid'" i-carbon:grid class="text-white/85 text-sm" />
        <div v-else-if="icon === 'i-carbon:data-volume'" i-carbon:data-volume class="text-white/85 text-sm" />
        <div v-else-if="icon === 'i-carbon:chart-network'" i-carbon:chart-network class="text-white/85 text-sm" />
        <div v-else-if="icon === 'i-carbon:global-filters'" i-carbon:global-filters class="text-white/85 text-sm" />
        <div v-else i-carbon:intent-request-scale-out class="text-white/85 text-sm" />
      </div>
    </div>

    <!-- Static chip (no animation) -->
    <div
      v-else
      class="absolute top-1/2 -translate-y-1/2"
      style="left: calc(50% - 12px);"
    >
      <div class="h-6 w-6 rounded-full border flex items-center justify-center backdrop-blur-sm"
        :class="chipBorderClass">
        <div v-if="icon === 'i-carbon:grid'" i-carbon:grid class="text-white/85 text-sm" />
        <div v-else-if="icon === 'i-carbon:data-volume'" i-carbon:data-volume class="text-white/85 text-sm" />
        <div v-else-if="icon === 'i-carbon:chart-network'" i-carbon:chart-network class="text-white/85 text-sm" />
        <div v-else-if="icon === 'i-carbon:global-filters'" i-carbon:global-filters class="text-white/85 text-sm" />
        <div v-else i-carbon:intent-request-scale-out class="text-white/85 text-sm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes evenet-flow-move {
  0% { left: -10px; opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { left: calc(100% - 18px); opacity: 0; }
}

.evenet-flow-chip {
  left: 0;
  transform: translateY(-50%);
  animation: evenet-flow-move 2.5s ease-in-out infinite;
}
</style>

