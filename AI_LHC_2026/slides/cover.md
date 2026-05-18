<div class="cover">
  <header class="cover-hero">
    <h1 class="cover-title gradient-animated">Foundation Models for HEP</h1>
    <p class="cover-lead">
      <span class="cover-evenet gradient-animated">EveNet</span>
      <span class="cover-sep" aria-hidden="true">·</span>
      <span class="cover-tagline">Unified understanding and generation of collider data</span>
    </p>
  </header>

  <div class="cover-divider neon-hr" />

  <section class="cover-meta">
    <span>AI@LHC 2026</span>
    <span class="cover-dot" aria-hidden="true">·</span>
    <span>Peking University</span>
    <span class="cover-dot" aria-hidden="true">·</span>
    <span>26 May 2026</span>
  </section>

  <p class="cover-author">Yulei Zhang</p>

  <footer class="cover-notes">
    <p class="cover-ref">
      Based on
      <a href="https://arxiv.org/abs/2601.17126" class="cover-link">
        <span inline-block translate-y-0.5 i-simple-icons:arxiv />EveNet
      </a>
      <span class="cover-ref-id">(arXiv:2601.17126)</span>
    </p>
    <p class="cover-disclaimer">
      Curated overview of selected FM work in HEP, not intended as a comprehensive survey.
    </p>
  </footer>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/evenet-logo-color.svg" h-20 translate-y-4 alt="EveNet">
  </div>
</div>

<style>
.cover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  max-width: 880px;
}

.cover-hero {
  margin: 0;
}

.cover-title {
  margin: 0;
  font-size: 68px;
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 520;
}

.cover-lead {
  margin: 0.65rem 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.5rem;
  font-size: 22px;
  line-height: 1.35;
  color: var(--fg-1);
}

.cover-evenet {
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.cover-sep {
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
}

.cover-tagline {
  color: rgba(226, 232, 240, 0.82);
  font-weight: 380;
}

.cover-divider {
  width: min(100%, 640px);
  margin: 1.35rem 0 1.1rem;
}

.cover-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.45rem;
  font-size: 17px;
  letter-spacing: 0.02em;
  text-transform: none;
  color: rgba(226, 232, 240, 0.72);
}

.cover-dot {
  color: rgba(255, 255, 255, 0.28);
}

.cover-author {
  margin: 0.85rem 0 0;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--c-cyan);
}

.cover-notes {
  margin: 1.15rem 0 0;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-width: 720px;
}

.cover-ref {
  margin: 0;
  font-size: 15px;
  line-height: 1.45;
  color: rgba(226, 232, 240, 0.78);
}

.cover-ref-id {
  opacity: 0.72;
}

.cover-link {
  color: var(--c-cyan);
  text-decoration: none;
  font-weight: 600;
}

.cover-link:hover {
  text-decoration: underline;
}

.cover-disclaimer {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(148, 163, 184, 0.88);
  font-style: italic;
}
</style>
