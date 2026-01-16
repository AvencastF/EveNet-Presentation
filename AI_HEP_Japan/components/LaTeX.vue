<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  formula: string
  block?: boolean
}>(), {
  block: false
})

const mathRef = ref<HTMLElement>()

const getKaTeX = async (): Promise<any> => {
  // Method 1: Try to access via Slidev's MDC processor (if available)
  // Method 2: Try window.katex (common in browser environments)
  // Method 3: Try dynamic import
  if (typeof window !== 'undefined') {
    const win = window as any
    
    // Try window.katex first (most common)
    if (win.katex) {
      return win.katex
    }
    
    // Try window.KaTeX (sometimes capitalized)
    if (win.KaTeX) {
      return win.KaTeX
    }
  }

  // Try dynamic import
  try {
    const katex = await import('katex')
    return katex.default || katex
  } catch (e) {
    // If all else fails, try importing from @slidev/client
    try {
      const slidev = await import('@slidev/client')
      if ((slidev as any).katex) {
        return (slidev as any).katex
      }
    } catch (e2) {
      // Ignore
    }
  }
  
  return null
}

const renderMath = async () => {
  if (!mathRef.value) return

  await nextTick()

  // Wait a bit for Slidev to initialize
  await new Promise(resolve => setTimeout(resolve, 50))

  const katex = await getKaTeX()

  if (!katex || !katex.renderToString) {
    // Fallback: show formula as text if KaTeX is not available
    mathRef.value.textContent = props.formula
    console.warn('KaTeX not available, showing raw formula:', props.formula)
    return
  }

  try {
    const html = katex.renderToString(props.formula, {
      throwOnError: false,
      displayMode: props.block,
    })
    mathRef.value.innerHTML = html
    
    // Load KaTeX CSS if not already loaded
    if (typeof document !== 'undefined' && !document.getElementById('katex-css')) {
      const link = document.createElement('link')
      link.id = 'katex-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'
      document.head.appendChild(link)
    }
  } catch (error) {
    console.error('KaTeX render error:', error, 'Formula:', props.formula)
    mathRef.value.textContent = props.formula
  }
}

onMounted(() => {
  renderMath()
})

watch(() => props.formula, () => {
  renderMath()
})

watch(() => props.block, () => {
  renderMath()
})
</script>

<template>
  <span v-if="!block" ref="mathRef" class="inline"></span>
  <div v-else ref="mathRef" class="block"></div>
</template>
