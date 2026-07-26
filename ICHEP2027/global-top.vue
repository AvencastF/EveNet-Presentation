<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, ref, watch, nextTick } from 'vue'

const { currentSlideNo, slides, total } = useNav()

// Calculate the current page number (1-indexed)
const currentPage = computed(() => currentSlideNo.value)

// Calculate total pages (fallback to slides.length if total is not available)
const totalPages = computed(() => total?.value ?? slides.value.length)

// Hide on the first slide (title page)
const isTitlePage = computed(() => currentPage.value === 1)

// Use a ref to track if page number should be hidden
const shouldHidePageNumber = ref(false)

// Function to check if current slide has no-page-number class
const checkPageNumber = () => {
  nextTick(() => {
    // Check the actual DOM element
    const slideElements = document.querySelectorAll('.slidev-page, [id^="page-"]')
    const currentIndex = currentSlideNo.value - 1
    const currentSlideElement = slideElements[currentIndex]
    
    console.log('[PageNumber] Current slide:', currentSlideNo.value)
    console.log('[PageNumber] Total slide elements:', slideElements.length)
    console.log('[PageNumber] Looking for element at index:', currentIndex)
    
    if (currentSlideElement) {
      console.log('[PageNumber] Current slide element found')
      console.log('[PageNumber] Element:', currentSlideElement)
      console.log('[PageNumber] Element classes:', currentSlideElement.className)
      console.log('[PageNumber] Element classList:', Array.from(currentSlideElement.classList))
      shouldHidePageNumber.value = currentSlideElement.classList.contains('no-page-number')
      console.log('[PageNumber] Has no-page-number class?', shouldHidePageNumber.value)
    } else {
      console.log('[PageNumber] Current slide element not found, trying alternative selectors')
      // Try alternative selectors
      const altElement = document.querySelector(`#page-${currentSlideNo.value}`) || 
                         document.querySelector(`[data-slide="${currentSlideNo.value}"]`)
      if (altElement) {
        console.log('[PageNumber] Found via alternative selector')
        console.log('[PageNumber] Element classes:', altElement.className)
        shouldHidePageNumber.value = altElement.classList.contains('no-page-number')
      } else {
        shouldHidePageNumber.value = false
      }
    }
    
    // Also check slide object metadata
    const currentSlide = slides.value[currentIndex]
    if (currentSlide) {
      console.log('[PageNumber] Slide object:', currentSlide)
      console.log('[PageNumber] Slide keys:', Object.keys(currentSlide))
      const meta = currentSlide.meta || {}
      console.log('[PageNumber] Meta:', meta)
      console.log('[PageNumber] Meta keys:', Object.keys(meta))
      
      // Check all meta properties
      for (const key in meta) {
        const value = meta[key]
        console.log(`[PageNumber] Meta.${key}:`, value, 'type:', typeof value)
        if (typeof value === 'string' && value.includes('no-page-number')) {
          console.log('[PageNumber] Found no-page-number in meta.' + key)
          shouldHidePageNumber.value = true
        }
      }
    }
  })
}

// Watch for slide changes
watch(currentSlideNo, () => {
  checkPageNumber()
}, { immediate: true })

// Also check on mount
checkPageNumber()
</script>

<template>
  <div
    v-if="!isTitlePage && !shouldHidePageNumber"
    class="page-number"
    aria-label="Page number"
  >
    <span class="page-number-current">{{ currentPage }}</span>
    <span class="page-number-separator">/</span>
    <span class="page-number-total">{{ totalPages }}</span>
  </div>
</template>

<style scoped>
.page-number {
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
  color: var(--fg-2);
  user-select: none;
  pointer-events: none;
  opacity: 0.85;
  transition: opacity 300ms ease;
}

.page-number:hover {
  opacity: 1;
}

.page-number-current {
  font-weight: 600;
  color: var(--fg-1);
}

.page-number-separator {
  color: var(--fg-2);
  opacity: 0.6;
}

.page-number-total {
  color: var(--fg-2);
}
</style>