---
transition: fade
---

<script setup>
import LaTeX from '../components/LaTeX.vue'
</script>

# To bring them all...

<span>Final summary of <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span></span>

<div class="summary-content">
  <div class="summary-item">
    <div class="summary-bullet">•</div>
    <div class="summary-text">
      <span class="gradient-animated" style="font-variant: small-caps;">EveNet</span> reconstructs physically reasonable neutrino phase space for <span class="text-sm"><LaTeX formula="H\to WW^*\to \ell\nu\ell\nu" /></span>, achieving lower QE angular bias with moderately broader event-level uncertainty.
    </div>
  </div>

  <div class="key-aspects">
    <div class="aspect-block">
      <div class="aspect-label metric-label">Event Metrics</div>
      <div class="aspect-content">
        <div class="aspect-line metric-line">
          PCRes remains sharper event-by-event, with lower <span class="metric-chip">MAE/RMSE</span> and higher <span class="metric-chip">Pearson</span>; 
          <span class="gradient-animated evenet-inline">EveNet</span> instead preserves a broader physically valid posterior manifold.
        </div>
      </div>
    </div>
    <div class="aspect-block">
      <div class="aspect-label distribution-label">Distribution Fidelity</div>
      <div class="aspect-content">
        <div class="aspect-line distribution-line">
          Diffusion significantly improves <span class="distribution-chip">W1 agreement</span> and suppresses signed <span class="distribution-chip">QE angular bias</span>.
        </div>
        <div class="aspect-line distribution-line">
          The reconstructed angular spectra remain smoother and less sculpted, which is important for QE-sensitive observables.
        </div>
      </div>
    </div>
    <div class="aspect-block">
      <div class="aspect-label physics-label">Physics Picture</div>
      <div class="aspect-content">
        <div class="aspect-line physics-line">
          This tradeoff is physically expected because dileptonic neutrino reconstruction is intrinsically multimodal and underconstrained.
        </div>
        <div class="aspect-line physics-line">
          For QE measurements and unfolding, unbiased angular phase space may ultimately matter more than a single best-fit event solution.
        </div>
      </div>
    </div>
    <div class="future-divider">
      <span>Where this goes next</span>
    </div>
    <div class="aspect-block">
      <div class="aspect-label future-label">Next Step</div>
      <div class="aspect-content">
        <div class="aspect-line future-line">
          Use reinforcement learning to further improve <span class="future-chip">neutrino precision</span> and robust <span class="future-chip">lep-ν pairing</span>.
        </div>
        <div class="aspect-line future-line">
          Evaluate final <LaTeX formula="\rho_{\lambda\lambda'}" /> / SDM observables, since
          <span class="summary-critical">low-dimensional metrics cannot fully capture propagated ML-induced physics effects</span>.
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.summary-content {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.88rem;
}
.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.2rem;
}
.summary-bullet {
  font-size: 18px;
  color: rgba(196, 181, 253, 0.8);
  flex-shrink: 0;
  margin-top: 2px;
}
.summary-text {
  font-size: 15.6px;
  line-height: 1.42;
  color: rgba(255, 255, 255, 0.9);
}
.summary-text :deep(.inline) {
  display: inline-block;
  white-space: nowrap;
  vertical-align: -0.08em;
}
.key-aspects {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 0.16rem;
}
.aspect-block {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding-bottom: 0.54rem;
}
.aspect-label {
  font-size: 16px;
  font-weight: 750;
  padding-bottom: 5px;
  flex: 0 0 180px;
  padding-top: 2px;
  letter-spacing: 0.01em;
}
.metric-label {
  color: rgba(253, 186, 116, 0.95);
  border-bottom: 2px solid rgba(253, 186, 116, 0.55);
  text-shadow: 0 0 16px rgba(253, 186, 116, 0.25);
}
.distribution-label {
  color: rgba(103, 232, 249, 0.95);
  border-bottom: 2px solid rgba(103, 232, 249, 0.55);
  text-shadow: 0 0 16px rgba(103, 232, 249, 0.25);
}
.physics-label {
  color: rgba(196, 181, 253, 0.95);
  border-bottom: 2px solid rgba(196, 181, 253, 0.55);
  text-shadow: 0 0 16px rgba(196, 181, 253, 0.25);
}
.future-label {
  color: rgba(134, 239, 172, 0.98);
  border-bottom: 2px solid rgba(74, 222, 128, 0.64);
  text-shadow: 0 0 18px rgba(74, 222, 128, 0.34);
}
.aspect-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.85);
}
.aspect-line {
  position: relative;
  padding-left: 18px;
  font-size: 14.1px;
  line-height: 1.34;
}
.aspect-line::before {
  content: '•';
  position: absolute;
  left: 0;
  top: -0.02em;
  font-weight: 700;
}
.metric-line::before {
  color: rgba(253, 186, 116, 0.58);
}
.distribution-line::before {
  color: rgba(103, 232, 249, 0.58);
}
.physics-line::before {
  color: rgba(196, 181, 253, 0.58);
}
.future-line::before {
  color: rgba(74, 222, 128, 0.58);
}
.future-divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 -0.08rem;
  color: rgba(187, 247, 208, 0.86);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}
.future-divider::before,
.future-divider::after {
  content: '';
  height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.68), rgba(103, 232, 249, 0.54));
}
.future-divider::after {
  background: linear-gradient(90deg, rgba(103, 232, 249, 0.54), rgba(74, 222, 128, 0.68), transparent);
}
.metric-chip,
.distribution-chip,
.future-chip {
  display: inline-block;
  padding: 0.03rem 0.34rem 0.06rem;
  border-radius: 999px;
  font-weight: 750;
  white-space: nowrap;
}
.metric-chip {
  color: rgb(254, 215, 170);
  background: rgba(253, 186, 116, 0.12);
}
.distribution-chip {
  color: rgb(165, 243, 252);
  background: rgba(103, 232, 249, 0.12);
}
.future-chip {
  color: rgb(187, 247, 208);
  background: rgba(74, 222, 128, 0.12);
}
.aspect-line :deep(.inline) {
  display: inline-block;
  white-space: nowrap;
  vertical-align: -0.08em;
}
.evenet-inline {
  display: inline;
  font-variant: small-caps;
}

/* Emphasis: low-dim metrics miss propagated physics */
.summary-critical {
  font-weight: 700;
  color: rgb(187, 247, 208);
  text-shadow:
    0 0 10px rgba(34, 211, 238, 0.45),
    0 0 22px rgba(244, 114, 182, 0.28);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
</style>
