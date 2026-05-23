---
transition: 'fade-out'
glow: left
glowOpacity: 0.32
---

# Representation Levels I: Detector & Jet

<div class="slide-tldr">
  <span>TL;DR</span> Detector-level FMs are emerging; jet/constituent models are the mature hub for reusable HEP representations.
</div>

<FoundationModelGallery
  group="detector"
  :lane-widths="{ raw: 0.82, jet: 1.48 }"
  :scale="1.0"
  :detail-typography="{
    title: 34,
    paperTitle: 13,
    summary: 16,
    highlight: 14,
    tag: 12,
    sourceRef: 11.5,
    statValue: 13,
    seriesHighlight: 12.5
  }"
  :detail-layout="{
    cardWidth: 1280,
    sidebarWidth: 380,
    seriesSidebarWidth: 410,
    seriesSourceColumns: 3,
    seriesHighlightColumns: 3
  }"
/>

<div class="gallery-note">
  Click any card to open a paper-detail view with representation, architecture, task type, domain, data signal, and highlights.
</div>

<style>
.slide-tldr {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 0.38rem;
  border-left: 3px solid rgba(103, 232, 249, 0.75);
  background: rgba(15, 23, 42, 0.42);
  color: rgba(226, 232, 240, 0.80);
  font-size: 14.2px;
  line-height: 1.12;
  padding: 7px 11px;
  max-width: 900px;
}

.slide-tldr span {
  color: rgba(255, 255, 255, 0.95);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.gallery-note {
  margin-top: 8px;
  color: rgba(226, 232, 240, 0.48);
  font-size: 11.5px;
  line-height: 1;
}
</style>
