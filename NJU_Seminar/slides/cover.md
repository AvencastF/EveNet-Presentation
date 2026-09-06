---
class: nju-foundation-cover
---

<NJUChapterScene scene="foundation" />

<div class="cover">
  <header class="cover-hero">
    <div class="cover-identity">
      <img src="/evenet-logo-gold.svg" class="cover-emblem" alt="EveNet emblem">
      <p class="evenet-wordmark cover-title gradient-animated">EveNet</p>
    </div>
    <p class="cover-lead">
      <span class="cover-tagline">From Event Understanding to Invisible-Particle Reconstruction</span>
    </p>
  </header>

  <div class="cover-divider neon-hr" />

  <section class="cover-meta">
    <span>Nanjing University · Physics Seminar</span>
  </section>

  <p class="cover-author">Yulei Zhang</p>

  <footer class="cover-notes">
    <p class="cover-ref">
      Based on
      <a href="https://arxiv.org/abs/2601.17126" class="cover-link">
        <span inline-block translate-y-0.5 i-simple-icons:arxiv /><span class="evenet-wordmark gradient-animated">EveNet</span>
      </a>
      <span class="cover-ref-id">(arXiv:2601.17126)</span>
    </p>
    <p class="cover-ref">Accepted in principle at <em>Nature Machine Intelligence</em></p>
  </footer>
</div>

<style>
.slidev-layout.nju-foundation-cover { background: #0c0d0f!important; }
.slidev-layout.nju-foundation-cover::before { display: none; }
.nju-foundation-cover .cover-identity { display:flex; align-items:center; gap:16px; }
.nju-foundation-cover .cover-emblem { width:54px; height:54px; flex:none; }

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
  font-size: 48px;
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
