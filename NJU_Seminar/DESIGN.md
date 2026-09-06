# Graphite & Gold

NJU-only design system, approved by the presenter.

- Canvas: #17191c. Raised surfaces: #23262b or a very low-opacity silver tint.
- Primary text: #f0f1f3. Supporting text: #bcc2cb. Primary emphasis: #77c9ff. Assignment: #f0c36e; segmentation: #baa5ff; self-supervised generation: #70dcb2; supervised generation: #f69cab.
- Wordmark: #ffbd59 → #fff0ba → #ff91b5 → #ffbd59, amber–champagne–rose on a smooth two-second wordmark loop, matching the logo asset. Original cyan–magenta rule is superseded for this deck.
- Typography: bundled DM Sans; titles 36px (architecture 32px), weight550; emphasis600. Existing content-specific sizes retained when needed for scientific diagrams.
- Background: slow28-second transform of low-opacity blue and violet radial gradients. Static under reduced motion or print.
- Framing: restrained1px separators; no colored glow; semantic color highlights.
- Scientific plot-series colors remain unchanged. Illustrative task categories use the saturated, high-contrast accent palette with text labels.
- Scientific claims, diagram topology and slide interactions stay intact.

Implementation: styles/graphite.css, loaded after existing NJU styles; no shared or historical-deck changes.

- Candidate and truth points use opaque semantic colors, never the translucent surface treatment. Truth markers also have an outline.

- Approved wordmark: Option C, EveNet Engineered. Shared implementation: `shared/brand/evenet/`; use `.evenet-wordmark` on complete variant names. The font renders custom EveNet lettering and readable suffixes; no per-slide typography overrides.
