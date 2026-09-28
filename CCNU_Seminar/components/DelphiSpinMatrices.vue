<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const axes = ['l', 'n', 'r', 'k']
const paper = [247, 245, 242]
const warm = [214, 112, 90]
const cool = [78, 138, 186]

const traditional = [
  [id(), cell('+0.00', '0.13', 0), cell('-0.00', '0.13', 0), cell('+0.15', '0.08', 0.15)],
  [cell('+0.00', '0.13', 0), cell('+0.81', '0.25', 0.81), cell('+0.00', '0.63', 0), cell('+0.00', '0.53', 0)],
  [cell('+0.00', '0.13', 0), cell('-0.01', '0.63', -0.01), cell('-0.80', '0.32', -0.80), cell('-0.00', '0.51', 0)],
  [cell('+0.15', '0.08', 0.15), cell('-0.01', '0.53', -0.01), cell('-0.01', '0.51', -0.01), cell('+1.03', '0.30', 1.03)],
]
const learned = [
  [id(), cell('+0.00', '0.08', 0), cell('-0.00', '0.08', 0), cell('+0.15', '0.05', 0.15)],
  [cell('+0.00', '0.08', 0), cell('+0.81', '0.21', 0.81), cell('+0.00', '0.58', 0), cell('+0.00', '0.35', 0)],
  [cell('+0.00', '0.08', 0), cell('-0.01', '0.58', -0.01), cell('-0.80', '0.24', -0.80), cell('-0.00', '0.34', 0)],
  [cell('+0.15', '0.05', 0.15), cell('-0.01', '0.35', -0.01), cell('-0.01', '0.34', -0.01), cell('+1.03', '0.23', 1.03)],
]
const blocks = [
  { name: 'Traditional', rows: traditional },
  { name: 'ML-based', rows: learned },
]
const observables = [
  { name: 'Bell nonlocality', trad: '0.424\\pm 0.393', tradSig: '1.1\\sigma', ml: '0.424\\pm 0.311', mlSig: '1.4\\sigma' },
  { name: 'Concurrence', trad: '0.81\\pm 0.264', tradSig: '3.1\\sigma', ml: '0.81\\pm 0.20', mlSig: '4.1\\sigma' },
]

function id() {
  return { text: '1', unc: '', value: null, identity: true }
}
function cell(text, unc, value) {
  return { text, unc, value, identity: false }
}
function mix(from, to, t) {
  return from.map((channel, index) => Math.round(channel + (to[index] - channel) * t))
}
function fill(entry) {
  if (entry.identity) return 'rgb(230, 226, 220)'
  const t = Math.max(-1, Math.min(1, entry.value / 1.03))
  const rgb = t >= 0 ? mix(paper, warm, t) : mix(paper, cool, -t)
  return `rgb(${rgb.join(',')})`
}

const { $nav, $page, $renderContext } = useSlideContext()
const reduced = ref(false)
const play = ref(false)
const hover = ref(null)
let media
const active = computed(() => $nav.value.currentPage === $page.value && $renderContext.value === 'slide')

function preference() {
  reduced.value = !!media?.matches
}
async function sync() {
  play.value = false
  if (active.value && !reduced.value) {
    await nextTick()
    requestAnimationFrame(() => { play.value = true })
  }
}
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', preference)
  preference()
  sync()
})
watch(active, sync)
watch(reduced, sync)
onBeforeUnmount(() => media?.removeEventListener('change', preference))
</script>

<template>
  <div class="sdm" :class="{ 'sdm-play': play, 'is-focus': hover }">
    <div class="sdm-pair" @mouseleave="hover = null">
      <section v-for="block in blocks" :key="block.name">
        <div class="sdm-name">{{ block.name }}</div>
        <div class="sdm-matrix" role="table" :aria-label="`${block.name} combined tau-pair spin density matrix`">
          <div class="sdm-row" role="row">
            <span class="sdm-corner" />
            <span
              v-for="(axis, j) in axes"
              :key="axis"
              class="sdm-axis"
              :class="{ 'is-on': hover?.endsWith(`-${j}`) }"
              role="columnheader"
            ><LaTeX v-if="axis !== 'l'" :formula="axis" /></span>
          </div>
          <div v-for="(row, i) in block.rows" :key="axes[i]" class="sdm-row" role="row">
            <span class="sdm-axis" :class="{ 'is-on': hover?.startsWith(`${i}-`) }" role="rowheader"><LaTeX v-if="axes[i] !== 'l'" :formula="axes[i]" /></span>
            <div
              v-for="(entry, j) in row"
              :key="`${i}-${j}`"
              class="sdm-cell"
              :class="{ 'is-pair': hover === `${i}-${j}`, 'is-identity': entry.identity }"
              :style="{ background: fill(entry), '--d': i * 4 + j }"
              role="cell"
              @mouseenter="hover = `${i}-${j}`"
            >
              <span class="sdm-val"><LaTeX :formula="entry.text" /></span>
              <span v-if="entry.unc" class="sdm-unc"><LaTeX :formula="`\\pm ${entry.unc}`" /></span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <table class="sdm-obs">
      <colgroup>
        <col class="sdm-col-name" />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th />
          <th>Traditional</th>
          <th>ML-based</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in observables" :key="row.name" :style="{ '--d': index }">
          <th scope="row">{{ row.name }}</th>
          <td><span class="sdm-meas"><LaTeX :formula="row.trad" /><b><LaTeX :formula="row.tradSig" /></b></span></td>
          <td><span class="sdm-meas"><LaTeX :formula="row.ml" /><b><LaTeX :formula="row.mlSig" /></b></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
