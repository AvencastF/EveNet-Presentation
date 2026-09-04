# Shared presentation infrastructure

Start with the [authoring guide](../docs/authoring.md) and [agent instructions](../AGENTS.md).

- `slidev-addon-evenet/` is a private npm workspace linked by the root installation. It extends the default Slidev theme; it is not a separate presentation or a replacement theme.
- `slidev-addon-evenet/components/` holds reusable, talk-independent components. Consume them from slides through the addon, or import from `slidev-addon-evenet/components/<Name>.vue` when necessary.
- `slidev-addon-evenet/composable/` holds reusable calculation helpers. Shared code must not import from a deck directory.
- The addon's global layers and UnoCSS/Vite configuration are loaded for every deck that opts into it. Global layers are additive; do not copy them into decks.
- `styles/` contains common CSS. Deck `style.ts` files import `main.css`, `animations.css`, and `base.css` in that order. Keep the documented ICHEP local-animation exception.

Do not put talk Markdown, datasets, result figures, generated output, or per-deck dependency copies here. Prefer existing props and CSS variables; preserve defaults when extending shared behavior. Keep one-off changes local and narrowly scoped.

Changes here can alter all presentations. Run `npm test` and `npm run build:all`, inspect affected renders/interactions against a baseline, and document any intentional change. Adding a new talk should normally require no changes to this directory.
