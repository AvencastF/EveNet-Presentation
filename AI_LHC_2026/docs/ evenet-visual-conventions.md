# EveNet Visual Conventions

This document defines the **visual grammar** for diagrams in Slidev, animations, and all automated visualizations of EveNet.

It follows conventions similar to:
> https://raw.githubusercontent.com/nekomeowww/talks/refs/heads/main/packages/2024-08-21-kubecon-hk/slides.md

---

## 1. Token & Block Color Scheme

### Inputs
- **Particle point cloud (`x`)**
  - Color: `bg-blue-400`
  - Outline: `border-blue-600`
  - Label color: `text-blue-900`

- **Padding mask**
  - Color: `bg-blue-200`
  - Opacity: `60%`
  - Label: `text-blue-700`

- **Global conditions (`globals`)**
  - Color: `bg-indigo-300`
  - Outline: `border-indigo-600`
  - Label: `text-indigo-900`

---

## 2. Encoders

### Point–Edge Transformer (PET)
- Card shape: Rounded rectangle
- Background: `bg-neutral-50`
- Border: `border-neutral-300`
- Header accent: `bg-neutral-200`
- Icon/illustration edges: `text-slate-600`
- Particle graph icon: little dots + connecting lines

### Global Embedding
- Same card style as PET
- Visual embedder: vertical vector → transformer blocks

---

## 3. Deterministic Heads

Use distinct but related color accents.

- **Classification head**
  - Header: `bg-green-200`, text: `text-green-900`
  - Output tokens: `bg-green-300`

- **Assignment head**
  - Header: `bg-yellow-200`, text: `text-yellow-900`
  - Output tokens: `bg-yellow-300`

- **Segmentation head**
  - Header: `bg-purple-200`, text: `text-purple-900`
  - Output tokens: `bg-purple-300`

Heads can be drawn as cards with headers.

---

## 4. Generative Heads

### Supervised Generation
- Header: `bg-red-200`, text: `text-red-900`
- Connective arrows: `stroke-red-400`

### Self-Supervised Generation
- Header: `bg-pink-200`, text: `text-pink-900`
- Mask icons and diffusion arrows: `stroke-pink-400`

---

## 5. Arrows & Data Flow

Use a consistent arrow style across diagrams:

- Solid arrow: `stroke-zinc-700`, width `2px`
- Dashed arrow: `stroke-zinc-500`, dash `4 2`, width `2px`
- Direction: left→right in canonical flow

---

## 6. Highlights & Animation

- Appear: `opacity-0 → opacity-100`, transform `scale-50 → scale-100`
- Collapse/transition: `scale-90`, `translate-x`, `opacity-60`
- Click-driven state changes: use `$clicks`

All animated states should obey:
- `transition duration-500 ease-in-out`

Example utility classes:
```css
.scale-in { transform: scale(1); opacity: 1; }
.scale-out { transform: scale(.85); opacity: 0; }
```

---

## 7. Blueprint for Matrix Grids

### Particle cloud (`x`)
- 18 rows × 7 columns
- Row cells: small squares
- Color:
  - Value cells: gradient blue according to “presence”
  - Padding rows: lighter / semi-transparent

### Token grids (embeddings)
- Use small tiles (e.g. 3×3 or 4×4) to indicate vector magnitude
- Distinguish by head color

---

## 8. Conventions for Dashed Blocks

Dashed boxes indicate **optional or conditional paths** such as:
- Generative mode
- Noise injection + time embedding

Dashed styling:
- `border-2 border-dashed border-zinc-400`
- Fill: none or very light

---

## 9. Consistent Text Labels

All diagrams must use the *canonical terminology* from `model_description.md`. Examples:

| Short label | Full meaning |
|-------------|--------------|
| PET | Point–Edge Transformer |
| t | time embedding (diffusion) |
| tokens | learned latent vectors |
| gen | generative mode |

---

## 10. Spacing & Grid

- Slide width: `max-w-6xl mx-auto`
- Default horizontal gap: `gap-x-8`
- Default vertical gap: `gap-y-6`
- Keep consistent margins on all slides.

---

## 11. SVG Icons (optional reuse)

If using icons (heroicons / custom SVG):
- Particle: `circle-solid`
- Transformer: `stacked blocks`
- Mask: `dotted square`
- Token: `small rectangle`
- Conditional shading: `pattern fill`

All icons should use `stroke-width="1.5"` and match color accents above.
