## Animated Spotlight Beams

Add two theatrical spotlight beams that sweep across the closed-curtain background, layered behind the countdown content but above the curtain image.

### What it looks like
- Two conical light beams angled from the top-left and top-right of the screen, meeting near center.
- Soft warm gold/white color (matches existing theater palette), low opacity so the curtains stay visible.
- Slow, continuous sway animation (~8–12s loop) — each beam rotates a few degrees back and forth, slightly out of phase so they cross and separate.
- Subtle pulse on opacity for a "flickering bulb" feel.
- Pointer-events disabled so they never block clicks on buttons.

### Implementation
- New component `src/components/SpotlightBeams.tsx`: two absolutely-positioned divs using CSS `conic-gradient` or `linear-gradient` masked into a beam shape (skewed/rotated trapezoid with blur + radial fade at the tip).
- Add `@keyframes sway-left`, `sway-right`, and `flicker` to `tailwind.config.ts` (animations section) and `index.css`.
- Mount `<SpotlightBeams />` in `src/pages/Index.tsx` directly after the `<img>` curtain backdrop and before the gradient overlay, so beams sit on top of the curtains but under text.
- Respect `prefers-reduced-motion`: disable the sway/flicker animations via a media query so the beams render statically.

### Files
- create: `src/components/SpotlightBeams.tsx`
- edit: `src/pages/Index.tsx` (mount component)
- edit: `tailwind.config.ts` + `src/index.css` (keyframes)

No backend/data changes.
