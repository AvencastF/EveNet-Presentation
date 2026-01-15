<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

type Bullet = string

const props = withDefaults(defineProps<{
  icon?: string
  title: string
  bullets?: Bullet[]
  revealAt?: number
  active?: boolean
  accent?: 'cyan' | 'magenta'
}>(), {
  icon: undefined,
  bullets: () => [],
  revealAt: 0,
  active: false,
  accent: 'cyan',
})

const { $clicks } = useSlideContext()
const visible = computed(() => ($clicks.value ?? 0) >= props.revealAt)
</script>

<template>
  <div
    class="neon-card glass"
    :class="[
      visible ? 'enter-in' : 'enter-pop',
      active ? 'flow-highlight pulse-glow' : '',
      accent === 'magenta' ? 'is-magenta' : 'is-cyan',
    ]"
    :style="{ pointerEvents: visible ? 'auto' : 'none' }"
  >
    <div class="neon-card__top">
      <div class="neon-card__icon">
        <div v-if="icon" :class="icon" />
      </div>
      <div class="neon-card__title">
        {{ title }}
      </div>
    </div>

    <div v-if="bullets.length" class="neon-card__bullets">
      <div v-for="(b, i) in bullets.slice(0, 2)" :key="i" class="neon-card__bullet">
        <span class="dot" />
        <span class="text">{{ b }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-card {
  border-radius: 16px;
  padding: 16px 16px 14px;
  transition: opacity 400ms ease, transform 450ms ease, box-shadow 450ms ease, filter 350ms ease;
}

.neon-card.is-cyan {
  border: 1px solid rgba(0, 229, 255, 0.18);
}

.neon-card.is-magenta {
  border: 1px solid rgba(255, 61, 242, 0.16);
}

.neon-card__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.neon-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
}

.neon-card__icon > div {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.88);
}

.neon-card__title {
  font-size: 20px;
  font-weight: 650;
  line-height: 1.15;
}

.neon-card__bullets {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
}

.neon-card__bullet {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.9), rgba(255, 61, 242, 0.75));
  box-shadow: 0 0 14px rgba(0, 229, 255, 0.25);
  flex: 0 0 auto;
}
</style>

