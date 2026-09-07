---
name: EveNet Presentations
description: Graphite & Gold talk index — foundation cover hero into a night-strip catalog
colors:
  graphite: "#0c0d0f"
  ink: "rgba(240, 241, 243, 0.92)"
  mist: "rgba(226, 232, 240, 0.82)"
  slate: "rgba(183, 199, 210, 0.72)"
  amber: "#ffbd59"
  champagne: "#fff0ba"
  rose: "#ff91b5"
  path: "rgba(255, 240, 186, 0.78)"
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-gold: "rgba(240, 195, 110, 0.45)"
  amber-wash: "rgba(255, 189, 89, 0.06)"
  selection: "rgba(255, 189, 89, 0.28)"
typography:
  display:
    fontFamily: "\"EveNet Engineered\", sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0"
  headline:
    fontFamily: "\"Avenir Next\", \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)"
    fontWeight: 380
    lineHeight: 1.35
    letterSpacing: "normal"
  title:
    fontFamily: "\"Avenir Next\", \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 550
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "\"Avenir Next\", \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.02em"
  label:
    fontFamily: "\"Avenir Next\", \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.04em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  hair: "2px"
spacing:
  xs: "0.35rem"
  sm: "0.55rem"
  md: "0.85rem"
  lg: "1.25rem"
  xl: "1.6rem"
  gutter: "11.5rem"
  page-x: "clamp(1.1rem, 3vw, 2.4rem)"
  hero-pad: "clamp(2rem, 6vh, 4.5rem) clamp(1.25rem, 4vw, 3.5rem) 2.25rem"
components:
  button-cta:
    backgroundColor: "{colors.amber-wash}"
    textColor: "{colors.champagne}"
    rounded: "{rounded.hair}"
    padding: "0.85rem 1.25rem"
    typography: "{typography.label}"
  button-cta-hover:
    backgroundColor: "rgba(255, 189, 89, 0.12)"
    textColor: "{colors.champagne}"
    rounded: "{rounded.hair}"
    padding: "0.85rem 1.25rem"
  tag-filter:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    rounded: "{rounded.hair}"
    padding: "0.55rem 0.5rem"
  tag-filter-live:
    backgroundColor: "transparent"
    textColor: "{colors.champagne}"
    rounded: "{rounded.hair}"
    padding: "0.55rem 0.5rem"
  strip-tag:
    backgroundColor: "transparent"
    textColor: "rgba(255, 240, 186, 0.72)"
    rounded: "{rounded.hair}"
    padding: "0.4rem 0.65rem"
  talk-strip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hair}"
    padding: "0.95rem 0.5rem"
  talk-strip-hover:
    backgroundColor: "rgba(255, 189, 89, 0.035)"
    textColor: "{colors.ink}"
    rounded: "{rounded.hair}"
    padding: "0.95rem 0.5rem"
---

# Design System: EveNet Presentations

## Overview

**Creative North Star: "The Graphite Foundation"**

EveNet Presentations is a dark, scientific brand surface: a full-viewport graphite cover that shows the foundation mechanism, then a night-strip talk index for finding real decks. The opening frame is unmistakable EveNet—gold emblem beside the Option C amber–champagne–rose wordmark—before any catalog chrome. Motion is entry and presence (anime.js hero reveal, looping wordmark, canvas streams), never decoration that blocks finding a talk.

Density stays tabular and scannable: sticky tag gutter, hairline talk rows (title | tags | path), one live gold filter accent. Confirmed visual rejections: soft card grids, inventory dump layouts, Index kickers/eyebrows, and the prior cyan/purple landing language.

**Key Characteristics:**
- Graphite canvas (`#0c0d0f`) with amber–champagne–rose brand accents only
- EveNet Engineered Option C wordmark + gold emblem as the hero brand signal
- Full-viewport foundation-scene canvas behind left cover copy
- Night-strip catalog: tag gutter + hairline rows; no cards
- Champagne mono paths; uppercase micro tags on strips
- `prefers-reduced-motion` freezes wordmark loop and softens/stops decorative motion

## Colors

Graphite field, silver text ladder, and a single amber–champagne–rose brand chord—gold is rare and connective, never a purple/cyan substitute.

### Primary
- **Brand Amber** (`{colors.amber}`): Wordmark gradient start/end, live tag step numerals, CTA border/wash, connective rail, strip hover wash. The active gold signal.
- **Champagne** (`{colors.champagne}`): Wordmark mid stop, CTA text, live filter names, soft path tint source.
- **Rose** (`{colors.rose}`): Wordmark third stop and brand chord only—not a UI fill.

### Neutral
- **Graphite** (`{colors.graphite}`): Page and hero canvas; catalog fade into the same black.
- **Ink** (`{colors.ink}`): Primary reading text and strip titles.
- **Mist** (`{colors.mist}`): Hero lead and secondary prose.
- **Slate** (`{colors.slate}`): Idle tags, stack meta, empty states.
- **Hairline** (`{colors.hairline}`): Default separators and borders.
- **Hairline Gold** (`{colors.hairline-gold}`): Hovered strip bottom edge.
- **Path Champagne** (`{colors.path}`): Deck path/code column.

### Named Rules
**The One Gold Voice Rule.** Amber/champagne/rose appear as brand wordmark, live filter, CTA edge, path tint, and connective pulse—not as large surface fills or competing accent families.

**The Graphite Field Rule.** The page is one dark plane (`#0c0d0f`); depth comes from shade gradients and hairlines, not raised colored panels.

## Typography

**Display Font:** EveNet Engineered (sans-serif fallback)
**Body Font:** Avenir Next → Segoe UI → Helvetica Neue → Helvetica → Arial
**Label/Mono Font:** System UI monospace stack for paths

**Character:** Custom engineered display for the EveNet name only; cool neo-grotesque UI for everything else; monospace for deploy paths.

### Hierarchy
- **Display** (700, `clamp(2.8rem, 7vw, 4.4rem)`, 1.02): Hero wordmark only; gradient clipped text; optional compact `1.05rem` stack landmark.
- **Headline** (380, `clamp(1.15rem, 2.2vw, 1.45rem)`, 1.35): Hero lead sentence; max ~34rem.
- **Title** (550, 1.02rem, 1.35, −0.01em): Talk strip titles.
- **Body** (400–550, ~0.95–1.05rem): Meta line, CTA label, filter names.
- **Label** (500, 0.72rem, +0.04–0.08em, uppercase on strip tags): Micro tags and tabular filter step indices.
- **Mono** (400, 0.78rem): Strip path/`code`.

### Named Rules
**The Wordmark-Only Display Rule.** EveNet Engineered is reserved for complete EveNet name strings (`.evenet-wordmark`). Body and catalog copy never use it as a general display face.

**The No-Kicker Rule.** No uppercase section eyebrows or “Index” kickers above the catalog; the stack head is count + compact wordmark landmark only.

## Layout

Two stacked regions: (1) full-viewport hero (`min-height: 100dvh`) with absolute foundation canvas and left cover copy (`max-width: 40rem`), justified to the bottom; (2) catalog `#talks` with a two-column index—sticky tag gutter (`11.5rem`) and talk stack.

Horizontal rhythm uses shared page gutters (`clamp(1.1rem, 3vw, 2.4rem)`). Talk strips are a three-column grid: fluid title | tags (`9.5–12rem`) | path (`9–11rem`). Below `820px`, the index stacks to one column, tags become wrapped chips with borders, connective rail hides, and strips collapse to a single column with path left-aligned. Hero shade rotates from left-readability veil to bottom-heavy veil on small screens.

### Named Rules
**The Cover-Then-Catalog Rule.** First viewport is brand + one lead + meta + one CTA into `#talks`; stats, schedules, and talk lists do not share the hero.

**The Strip Not Card Rule.** Catalog entries are hairline rows, not bordered cards, media tiles, or grid cards.

## Elevation & Depth

Flat graphite with tonal layering: left/bottom hero shade gradients over the canvas, sticky gutter blur (`backdrop-filter: blur(8px)` at ~72% graphite), and 1px hairlines. No ambient drop-shadow vocabulary for surfaces. Focus uses inset amber rings; strip hover is a faint amber wash plus gold hairline—not lift.

### Named Rules
**The Hairline Depth Rule.** Structure is drawn with `rgba(255,255,255,0.08)` lines; gold hairlines mark interaction, not resting chrome.

## Shapes

Near-square micro radius only (`2px`) on CTA, filter tags, and strip tags. No large rounded cards or pills. Emblem is the circular gold SVG mark at `clamp(48px, 5vw, 64px)`. Connective accent is a 2px vertical amber fade rail from the live tag into the stack.

### Named Rules
**The Hair Radius Rule.** Interactive chrome uses `2px` corners—sharp enough to stay instrumental, never soft-card radius.

## Components

### Buttons
- **Shape:** Hair radius (`2px`), 1px amber border at rest.
- **Primary (hero CTA):** Champagne text on amber wash (`rgba(255, 189, 89, 0.06)`); padding `0.85rem 1.25rem`; arrow nudges down on hover/focus.
- **Hover / Focus:** Stronger wash and border (`0.12` / `0.65` amber); no outline, focus shared with hover.

### Chips
- **Filter tags:** Numbered step + name; idle slate; live champagne name + amber step; keyboard focus inset amber ring.
- **Strip tags:** Uppercase micro labels, champagne text, thin amber border, `2px` radius—metadata, not filters.

### Cards / Containers
- **Not used.** Catalog is strips and a sticky gutter; do not introduce card shells for talks.

### Navigation
- Sticky left tag gutter (Seminar / Conference / Workshop + venue tags, plus All); live state drives list filter and gold connective pulse. Mobile: horizontal wrap with bordered chips; live gets amber border + wash.

### EveNet Wordmark (signature)
- Complete name in `.evenet-wordmark`: EveNet Engineered 700, liga on, amber→champagne→rose→amber gradient at `200%` size, 2s ease-in-out flow; soft amber drop-shadow on the hero title only. Reduced motion: animation off, text still gradient-clipped.

### Talk Strip (signature)
- Full-row link: title | tag list | champagne mono path. Hover/focus: amber wash + gold bottom hairline + inset focus ring. Entrance: staggered opacity/translate when filtering (skipped under reduced motion).

### Foundation Hero Scene (signature)
- Full-bleed canvas (`foundation-scene.js`): streams → shared gold ball → five task nodes; ~0.9 opacity (0.55 under reduced motion). Left cover shade protects copy; scene is non-interactive (`pointer-events: none`).

## Do's and Don'ts

### Do:
- **Do** lead with EveNet emblem + Option C wordmark as the hero brand signal on graphite `#0c0d0f`.
- **Do** list talks as hairline strips with real titles, tags, and champagne paths.
- **Do** filter via the sticky tag gutter with a single live gold accent and honor `prefers-reduced-motion`.
- **Do** keep brand motion (wordmark loop, anime entry, foundation canvas) secondary to findability.

### Don't:
- **Don't** use soft card grids, inset media cards, or multi-column talk cards for the catalog.
- **Don't** add Index kickers, eyebrows, floating badges, or promo chips on the hero or catalog head.
- **Don't** reintroduce cyan/magenta/purple landing accents or generic purple-on-dark AI chrome.
- **Don't** invent dates, abstracts, attendance, or fake metadata on strips.
- **Don't** apply EveNet Engineered to non-EveNet strings or replace the wordmark with plain solid text.
