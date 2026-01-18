<template>
  <div class="zoomable-plot-container">
    <img 
      :src="imageSrc" 
      :alt="alt" 
      class="zoomable-plot-image"
      @click="openFullscreen"
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

// Get the base URL from Vite (handles GitHub Pages subpath)
const baseUrl = import.meta.env.BASE_URL

// Compute the correct src path with base URL
const imageSrc = computed(() => {
  // If src already starts with baseUrl, use as is
  if (props.src.startsWith(baseUrl)) {
    return props.src
  }
  // If src starts with /, prepend baseUrl
  if (props.src.startsWith('/')) {
    return baseUrl + props.src.slice(1)
  }
  // Otherwise, prepend baseUrl
  return baseUrl + props.src
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
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.fullscreen-content {
  position: relative;
  width: 95%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: zoomIn 0.3s ease-out;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
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
