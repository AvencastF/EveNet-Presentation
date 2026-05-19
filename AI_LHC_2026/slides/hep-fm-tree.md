---
transition: 'fade-out'
glow: full
glowOpacity: 0.30
---

<div class="tree-source-note">
  <span>Source</span>
  Papers indexed in the
  <a
    href="https://iml-wg.github.io/HEPML-LivingReview/#foundation-models-llms-agents"
    target="_blank"
    rel="noopener noreferrer"
  >HEP ML Living Review</a>
  (Foundation models, LLMs &amp; agents); Only FM papers are included.
</div>

<div class="hep-fm-tree-canvas absolute left-5 right-5 top-[4.75rem] bottom-3">
  <HEPFMTree
    date-start="2023-12-01"
    :layout="{
      colWeights: [1, 5, 5, 4, 4],
      leafGap: 26,
      labelGap: 18,
      timelinePad: { top: 12, bottom: 32 },
      trunkGap: 18,
      margin: { top: 10, bottom: 5, left: 14, right: 14 },
      inner: { top: 8, bottom: 1 },
      leafWidthRatio: 0.85,
      minLeafW: 48,
      maxLeafW: 140
    }"
    :typography="{ year: 8.5, leafName: 7, label: 8.5 }"
    :theme="{ fontScale: 1.2 }"
    :animate="true"
  />
</div>

<style>
.tree-source-note {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.5rem;
  max-width: 920px;
  margin-top: 0.1rem;
  border-left: 3px solid rgba(196, 181, 253, 0.65);
  background: rgba(15, 23, 42, 0.38);
  color: rgba(226, 232, 240, 0.62);
  font-size: 12px;
  line-height: 1.35;
  padding: 6px 11px;
}

.tree-source-note span {
  color: rgba(255, 255, 255, 0.88);
  font-size: 9.5px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  align-self: center;
}

.tree-source-note a {
  color: rgba(196, 181, 253, 0.95);
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid rgba(196, 181, 253, 0.35);
}

.tree-source-note a:hover {
  color: #fff;
  border-bottom-color: rgba(196, 181, 253, 0.8);
}

.tree-source-note em {
  font-style: normal;
  color: rgba(226, 232, 240, 0.78);
}

.hep-fm-tree-canvas {
  min-height: 0;
}
.hep-fm-tree-canvas > * {
  width: 100%;
  height: 100%;
}
</style>
