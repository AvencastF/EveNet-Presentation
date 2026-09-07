# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Public visitors discovering EveNet talks online, plus collaborators who return to find a specific presentation. They arrive from links, GitHub Pages, or shared URLs and need to recognize the project and open the right deck quickly.

## Product Purpose

EveNet Presentations is the public index for independent Slidev decks about EveNet and related HEP work. Success means a visitor can identify EveNet, scan available talks by venue tags, and open the correct presentation without wading through an undifferentiated card wall.

## Positioning

A curated, brand-forward talk index for one research project's presentations—organized by seminar / conference / workshop tags—rather than a generic multi-repo documentation hub or an auto-generated file listing.

## Operating Context

Static GitHub Pages site. `build:all` copies the `gh-pages/` landing tree (HTML plus assets) into `site/`; each deck deploys at `/<repo>/<deck>/`. Local preview of decks uses Slidev; the landing page itself is plain HTML. Visitors use desktop and mobile browsers; collaborators may deep-link to a deck after finding it here.

## Capabilities and Constraints

- List only authorized, real talks with real titles and relative paths.
- Index and filter by tags (venue type and venue name). Date-based sorting/filtering is deferred (undecided for later).
- Preserve EveNet brand commitments: Graphite & Gold wordmark/emblem language from the NJU seminar cover; anime.js-capable motion for the title experience is allowed.
- Do not invent publications, acceptance claims, customers, or benchmarks on the landing page.
- Keep the landing page deployable as static HTML without a per-page build step unless the user later authorizes infrastructure changes.
- Adding a deck to the site still requires an explicit landing entry; generators do not auto-rewrite this page.

## Brand Commitments

- Product name: EveNet Presentations / EveNet.
- Visual identity for this surface should match the NJU seminar title-page EveNet style (graphite canvas, amber–champagne–rose animated wordmark, gold emblem)—not the previous generic cyan/purple card grid.
- Voice: scientific, clear, confident; no marketing hype.

## Evidence on Hand

- Existing talks and paths: NJU_Seminar, AI_LHC_2026, AI_HEP_Japan, EPE_Seminar, HWW_QE_lvlv, ICHEP2027 (titles as currently listed on the landing page / deck headmatter).
- Brand assets: `shared/brand/evenet/` (Option C wordmark CSS + font), `NJU_Seminar/public/evenet-logo-gold.svg`.
- NJU cover composition and motion language as the approved title-page reference.
- Do not fabricate talk dates, abstracts, or attendance figures until supplied.

## Product Principles

1. Brand recognition first: EveNet must be unmistakable in the opening viewport.
2. Findability over inventory dump: tags organize the catalog; density must stay scannable as talks grow.
3. Truthful listing only: real titles, paths, and tags—no decorative fake metadata.
4. Motion serves presence: entry animation can echo the title page; it must not obstruct finding or opening a talk.
5. Static and durable: the index remains easy to deploy and maintain by hand until a richer data pipeline is authorized.

## Accessibility & Inclusion

Honor `prefers-reduced-motion` for decorative animation. Keep contrast readable on the graphite canvas; interactive filters and links must be keyboard-reachable.
