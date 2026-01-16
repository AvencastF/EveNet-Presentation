<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentSlideNo, slides, total } = useNav()

// Calculate the current page number (1-indexed)
const currentPage = computed(() => currentSlideNo.value)

// Calculate total pages (fallback to slides.length if total is not available)
const totalPages = computed(() => total?.value ?? slides.value.length)

// Hide on the first slide (title page)
const isTitlePage = computed(() => currentPage.value === 1)

// Check if current slide has no-page-number class
const shouldHidePageNumber = computed(() => {
  const currentSlide = slides.value[currentSlideNo.value - 1]
  if (!currentSlide) return false
  const classes = currentSlide.class || ''
  return classes.includes('no-page-number')
})
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