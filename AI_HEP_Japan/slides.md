---
layout: cover
highlighter: shiki
css: unocss
colorSchema: dark
transition: slide-left
title: EveNet (Deck Scaffold)
exportFilename: EveNet - Slidev Deck
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 229
routerMode: hash
---

<div class="kube-title" style="font-size: 64px; line-height: 1.02;">
  EveNet
</div>

<div class="subtitle mt-4">
  Foundation models for event-level objects (placeholder)
</div>

<div class="mt-10 neon-hr" style="max-width: 720px;" />

<div class="mt-10 subtitle" style="opacity: 0.85;">
  AI+HEP Japan • 2026
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
  </div>
</div>

---
layout: default
class: px-18 py-10
glowSeed: 205
---

## Agenda

<div class="mt-8 grid grid-cols-2 gap-4">
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 1 ? 'enter-left' : 'enter-in'"
    icon="i-carbon:information"
    title="Foundation model"
    :bullets="['what it is', 'what it is not']"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 2 ? 'enter-right' : 'enter-in'"
    icon="i-carbon:data-structured"
    title="Event-level objects"
    :bullets="['why objects', 'why now']"
    accent="magenta"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 3 ? 'enter-left' : 'enter-in'"
    icon="i-carbon:network-4"
    title="EveNet architecture"
    :bullets="['animated flow', 'progressive reveal']"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 4 ? 'enter-right' : 'enter-in'"
    icon="i-carbon:application"
    title="Downstream tasks"
    :bullets="['3 placeholders', 'takeaways']"
    accent="magenta"
  />
</div>

---
layout: default
class: px-18 py-10
glowSeed: 120
---

## What is a foundation model?

<div class="mt-8 grid grid-cols-2 gap-5 items-start">
  <FlowBox
    v-click
    label="One sentence"
    class="transition duration-500"
    :class="$clicks < 1 ? 'enter-left' : 'enter-in'"
  >
    <div class="text-2xl leading-tight">
      A general-purpose model that learns reusable representations.
    </div>
    <div class="muted mt-3">
      (placeholder wording)
    </div>
  </FlowBox>

  <FlowBox
    v-click
    label="Mental model"
    accent="magenta"
    class="transition duration-500"
    :class="$clicks < 2 ? 'enter-right' : 'enter-in'"
  >
    <TokenCloud :count="144" :cols="18" :highlight="$clicks >= 3 ? 'all' : [0, 1, 2, 5, 8, 13]" />
    <div class="muted mt-3">
      Progressive reveal: partial → full coverage
    </div>
  </FlowBox>
</div>

---
layout: default
class: px-18 py-10
glowSeed: 260
---

## Why event-level objects?

<div class="mt-8 grid grid-cols-3 gap-4">
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 1 ? 'enter-left' : 'enter-in'"
    icon="i-carbon:events"
    title="Compression"
    :bullets="['fewer tokens', 'more signal']"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 2 ? 'enter-pop' : 'enter-in'"
    icon="i-carbon:connection-signal"
    title="Structure"
    :bullets="['relations', 'constraints']"
    accent="magenta"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 3 ? 'enter-right' : 'enter-in'"
    icon="i-carbon:repeat"
    title="Reuse"
    :bullets="['shared backbone', 'many heads']"
  />
</div>

<div v-click class="mt-8 glass" style="border-radius: 16px; padding: 14px 16px;">
  <div class="muted">Placeholder: one crisp “why this representation helps” line.</div>
</div>

---
layout: default
class: px-18 py-10
glowSeed: 330
---

## EveNet architecture (animated)

<div class="muted mt-1">Clicks spotlight each stage. (placeholder)</div>

<div class="mt-8">
  <EveNetFlowDemo />
</div>

---
layout: default
class: px-18 py-10
glowSeed: 210
---

## Downstream task 1 (placeholder)

<div class="mt-8 grid grid-cols-2 gap-5">
  <FlowBox
    v-click
    label="Inputs"
    class="transition duration-500"
    :class="$clicks < 1 ? 'enter-left' : 'enter-in'"
  >
    <TokenCloud :count="120" :cols="20" :highlight="$clicks >= 2 ? 'all' : [2, 3, 6, 9, 20, 35]" />
  </FlowBox>
  <FlowBox
    v-click
    label="Output"
    accent="magenta"
    class="transition duration-500"
    :class="$clicks < 2 ? 'enter-right' : 'enter-in'"
  >
    <MatrixHeatmap :rows="6" :cols="10" />
  </FlowBox>
</div>

---
layout: default
class: px-18 py-10
glowSeed: 140
---

## Downstream task 2 (placeholder)

<div class="mt-8 glass" style="border-radius: 18px; padding: 18px;">
  <div class="muted">Drop in a figure / metric here later.</div>
  <div class="mt-6 spotlight" :class="$clicks >= 2 ? 'is-dim' : ''">
    <div class="grid grid-cols-3 gap-3">
      <NeonCard
        v-click="1"
        class="spotlight-item transition duration-500"
        :class="[$clicks < 1 ? 'enter-left' : 'enter-in', $clicks === 1 ? 'is-active' : '']"
        title="Module A"
        icon="i-carbon:chip"
        :bullets="['placeholder']"
        :active="$clicks === 1"
      />
      <NeonCard
        v-click="2"
        class="spotlight-item transition duration-500"
        :class="[$clicks < 2 ? 'enter-pop' : 'enter-in', $clicks === 2 ? 'is-active' : '']"
        title="Module B"
        icon="i-carbon:direction-right-02"
        :bullets="['placeholder']"
        :active="$clicks === 2"
        accent="magenta"
      />
      <NeonCard
        v-click="3"
        class="spotlight-item transition duration-500"
        :class="[$clicks < 3 ? 'enter-right' : 'enter-in', $clicks === 3 ? 'is-active' : '']"
        title="Module C"
        icon="i-carbon:flash"
        :bullets="['placeholder']"
        :active="$clicks === 3"
      />
    </div>
  </div>
</div>

---
layout: default
class: px-18 py-10
glowSeed: 180
---

## Downstream task 3 (placeholder)

<div class="mt-8 grid grid-cols-3 gap-4">
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 1 ? 'enter-left' : 'enter-in'"
    title="Setup"
    icon="i-carbon:settings"
    :bullets="['placeholder']"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 2 ? 'enter-pop' : 'enter-in'"
    title="Train"
    icon="i-carbon:run"
    :bullets="['placeholder']"
    accent="magenta"
  />
  <NeonCard
    v-click
    class="transition duration-500"
    :class="$clicks < 3 ? 'enter-right' : 'enter-in'"
    title="Evaluate"
    icon="i-carbon:chart-line"
    :bullets="['placeholder']"
  />
</div>

<div v-click class="mt-8 muted">
  Placeholder: add 1 key result line here.
</div>

---
layout: center
class: text-center
glowSeed: 310
---

## Summary

<div class="mt-8">
  <div class="kube-title" style="font-size: 44px; line-height: 1.08;">
    Minimal words. Maximum signal.
  </div>
  <div class="mt-6 grid grid-cols-3 gap-4">
    <NeonCard v-click title="Representation" icon="i-carbon:data-structured" :bullets="['objects first']" />
    <NeonCard v-click title="Backbone" icon="i-carbon:layers" :bullets="['reusable core']" accent="magenta" />
    <NeonCard v-click title="Heads" icon="i-carbon:application" :bullets="['many tasks']" />
  </div>

  <div v-click class="mt-10 muted">
    Placeholder: final take-home sentence.
  </div>

  <div v-click class="mt-6 muted" style="font-size: 14px;">
    Run locally: <code>npm i</code> then <code>npm run dev</code>
  </div>
</div>