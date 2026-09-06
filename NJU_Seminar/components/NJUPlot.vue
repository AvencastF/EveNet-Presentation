<template>
  <div class="zoomable-plot-container">
    <img 
      :src="imageSrc" 
      :alt="alt" 
      class="zoomable-plot-image"
      @click="openFullscreen"
      @keydown.enter="openFullscreen"
      @keydown.space.prevent="openFullscreen"
      role="button"
      tabindex="0"
    />
    
    <!-- Fullscreen Modal -->
    <Teleport to="body">
      <div 
        v-if="isFullscreen" 
        class="fullscreen-overlay"
        @click.self="closeFullscreen"
      >
        <div class="fullscreen-content">
          <button class="close-button" @click="closeFullscreen">
            <div i-carbon:close class="close-icon" />
          </button>
          <img 
            :src="imageSrc" 
            :alt="alt" 
            class="fullscreen-image"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Plot'
  }
})

// Try multiple methods to get the base path
function getBasePath() {
  // Method 1: Use import.meta.env.BASE_URL
  if (import.meta.env.BASE_URL) {
    return import.meta.env.BASE_URL
  }
  
  // Method 2: Extract from window.location if available
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    // Extract base path (e.g., /EveNet-Presentation/AI_HEP_Japan/)
    const match = pathname.match(/^(\/[^\/]+\/[^\/]+\/)/)
    if (match) {
      return match[1]
    }
    // Fallback: get directory path
    const pathParts = pathname.split('/').filter(p => p)
    if (pathParts.length >= 2) {
      return '/' + pathParts.slice(0, 2).join('/') + '/'
    }
  }
  
  // Method 3: Default to root
  return '/'
}

const baseUrl = getBasePath()

// Compute the correct src path with base URL
const imageSrc = computed(() => {
  let finalSrc = props.src
  
  // If src already starts with baseUrl, use as is
  if (finalSrc.startsWith(baseUrl)) {
    return finalSrc
  }
  
  // If src starts with /, prepend baseUrl (removing the leading /)
  if (finalSrc.startsWith('/')) {
    finalSrc = baseUrl + finalSrc.slice(1)
    return finalSrc
  }
  
  // Otherwise, prepend baseUrl
  finalSrc = baseUrl + finalSrc
  return finalSrc
})

const isFullscreen = ref(false)

function openFullscreen() {
  isFullscreen.value = true
}

function closeFullscreen() {
  isFullscreen.value = false
}

function handleEscape(e) {
  if (e.key === 'Escape' && isFullscreen.value) {
    closeFullscreen()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.zoomable-plot-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.zoomable-plot-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.zoomable-plot-image:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* ============================================
   FULLSCREEN MODAL
   ============================================ */
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 24% 18%, rgba(0, 229, 255, 0.18), transparent 34%),
    radial-gradient(circle at 78% 76%, rgba(124, 92, 255, 0.2), transparent 38%),
    rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.fullscreen-content {
  position: relative;
  width: min(96vw, 1680px);
  height: min(94vh, 1120px);
  padding: clamp(16px, 2vw, 28px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: zoomIn 0.3s ease-out;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(7, 13, 26, 0.72);
  box-shadow:
    0 0 0 1px rgba(103, 232, 249, 0.09),
    0 28px 90px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.fullscreen-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 10px;
}

.close-button {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10000;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.close-icon {
  width: 24px;
  height: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
