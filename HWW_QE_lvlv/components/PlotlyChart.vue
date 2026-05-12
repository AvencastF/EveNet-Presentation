<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { Data, Layout, Config } from 'plotly.js-dist'

const props = defineProps<{
  data: Data[]
  layout?: Partial<Layout>
  config?: Partial<Config>
  width?: number | string
  height?: number | string
}>()

const plotRef = ref<HTMLDivElement>()
let plotlyInstance: any = null

const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width || '100%',
  height: typeof props.height === 'number' ? `${props.height}px` : props.height || '100%',
}))

const initPlotly = async () => {
  if (!plotRef.value) return

  // Dynamically import plotly.js-dist-min to reduce bundle size
  const Plotly = await import('plotly.js-dist')
  plotlyInstance = Plotly.default || Plotly

  const defaultLayout: Partial<Layout> = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      color: 'rgba(255, 255, 255, 0.9)',
      family: 'system-ui, sans-serif',
      size: 12,
    },
    ...props.layout,
  }

  const defaultConfig: Partial<Config> = {
    responsive: true,
    displayModeBar: false,
    ...props.config,
  }

  await plotlyInstance.newPlot(
    plotRef.value,
    props.data,
    defaultLayout,
    defaultConfig,
  )
}

const updatePlot = async () => {
  if (!plotRef.value || !plotlyInstance) return

  const defaultLayout: Partial<Layout> = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      color: 'rgba(255, 255, 255, 0.9)',
      family: 'system-ui, sans-serif',
      size: 12,
    },
    ...props.layout,
  }

  await plotlyInstance.react(
    plotRef.value,
    props.data,
    defaultLayout,
    props.config,
  )
}

onMounted(() => {
  initPlotly()
})

onUnmounted(() => {
  if (plotRef.value && plotlyInstance) {
    plotlyInstance.purge(plotRef.value)
  }
})

watch(
  () => [props.data, props.layout],
  () => {
    if (plotlyInstance) {
      updatePlot()
    }
  },
  { deep: true },
)
</script>

<template>
  <div
    ref="plotRef"
    :style="containerStyle"
  />
</template>
