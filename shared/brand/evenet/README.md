# EveNet Engineered — Option C

Opt-in identity for the NJU seminar; importing this module does not change other decks.

Import `shared/brand/evenet/evenet.css` after the deck theme and mark the complete name:

```html
<span class="evenet-wordmark">EveNet</span>
<span class="evenet-wordmark">EveNet-Full</span>
<span class="evenet-wordmark">EveNet-Align</span>
<span class="evenet-wordmark">EveNet-Cls</span>
```

One font ligature draws the approved Option C lettering for EveNet (also evenet and EVENET). Variant suffixes remain readable text in the same font. Text remains selectable, searchable and accessible. SVG figures use an HTML foreignObject containing the same class.

- Color and two-second motion: `evenet.css`.
- Letter geometry: `build-font.py`; run it from the repository root after editing.
- The derived, renamed font uses DM Sans for suffixes, under the included OFL license. Custom EveNet paths are original project lettering.
- Preserve original scientific images; embedded image labels are not editable text.
