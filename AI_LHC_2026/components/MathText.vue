<script setup>
import { computed } from 'vue'
import LaTeX from './LaTeX.vue'

const props = defineProps({
  text: {
    type: [String, Number],
    default: ''
  }
})

const formattedText = computed(() => autoMath(String(props.text ?? '')))

const parts = computed(() => {
  const text = formattedText.value
  const tokens = []
  const pattern = /\$([^$]+)\$/g
  let lastIndex = 0
  let match

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    tokens.push({ type: 'math', value: match[1] })
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return tokens
})

function autoMath(text) {
  if (!text || text.includes('$') || /^https?:\/\//.test(text)) return text

  return text
    .replace(/\bOmniJet-alpha\b/g, 'OmniJet-$\\alpha$')
    .replace(/\bnu_tau\b/g, '$\\nu_\\tau$')
    .replace(/\beta_t\b/g, '$\\eta_t$')
    .replace(/\bsqrt\(s\)\s*=\s*200\s*GeV\b/g, '$\\sqrt{s}=200\\,\\mathrm{GeV}$')
    .replace(/\b(\d+(?:\.\d+)?)\s*GeV\/c\b/g, '$$$1\\,\\mathrm{GeV}/c$$')
    .replace(/\b(\d+(?:\.\d+)?)\s*kHz\/cm2\b/g, '$$$1\\,\\mathrm{kHz}/\\mathrm{cm}^2$$')
    .replace(/\b(\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?)\s*(MeV|GeV|TeV|AGeV|mm|fm)\b/g, '$$$1\\,\\mathrm{$2}$$')
    .replace(/\b768\^3\b/g, '$$768^3$$')
    .replace(/\b10\^(\d+)\b/g, '$$10^{$1}$$')
    .replace(/\bR2_v\b/g, '$R^2_v$')
    .replace(/\bR2\b/g, '$R^2$')
    .replace(/\bOmega_m\b/g, '$\\Omega_m$')
    .replace(/\bsigma_8\b/g, '$\\sigma_8$')
    .replace(/\b(\d+(?:\.\d+)?)\s+sigma\b/g, '$1 $\\sigma$')
    .replace(/\bl-reweighted\b/g, '$\\ell$-reweighted')
    .replace(/\bmissing pT\b/g, 'missing $p_T$')
    .replace(/\bvisible pT\b/g, 'visible $p_T$')
    .replace(/\blog pT\b/g, 'log $p_T$')
    .replace(/\bpT\b/g, '$p_T$')
    .replace(/\bttbar\b/g, '$t\\bar{t}$')
    .replace(/\bqqbar\b/g, '$q\\bar{q}$')
    .replace(/\bgamma gamma\b/g, '$\\gamma\\gamma$')
    .replace(/\bDelta eta\/phi\/R\b/g, '$\\Delta\\eta/\\phi/R$')
    .replace(/\bX->YH_SM->bbWW\*/g, '$X\\to YH_{SM}\\to b\\bar{b}WW^*$')
    .replace(/\bH_SM->aa->4b\b/g, '$H_{SM}\\to aa\\to 4b$')
    .replace(/\bG->HH->4b\b/g, '$G\\to HH\\to 4b$')
    .replace(/\bG->HH\b/g, '$G\\to HH$')
    .replace(/\bHH->4b\b/g, '$HH\\to 4b$')
    .replace(/\bHZ\/H->bb\b/g, '$HZ/H\\to b\\bar{b}$')
    .replace(/\bH->bb,Z->nunu\b/g, '$H\\to b\\bar{b}, Z\\to\\nu\\nu$')
    .replace(/\bH->bb\b/g, '$H\\to b\\bar{b}$')
    .replace(/\bZ\+jet\b/g, '$Z$+jet')
    .replace(/\bZ\+jets\b/g, '$Z$+jets')
}
</script>

<template>
  <span class="math-text">
    <template
      v-for="(part, index) in parts"
      :key="`${part.type}-${index}-${part.value}`"
    >
      <LaTeX
        v-if="part.type === 'math'"
        :formula="part.value"
      />
      <template v-else>{{ part.value }}</template>
    </template>
  </span>
</template>

<style scoped>
.math-text {
  display: inline;
}

.math-text :deep(.katex) {
  font-size: 1em;
  line-height: 1;
}

.math-text :deep(.katex-html) {
  white-space: nowrap;
}
</style>
