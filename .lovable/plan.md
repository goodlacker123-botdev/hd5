### 1. Realistic closed-curtain background image
- Generate a photorealistic image of closed red velvet theater curtains with gold valance and warm spotlight bleed at the seam, saved to `src/assets/closed-curtains.jpg` (1920×1080, standard quality).
- In `src/pages/Index.tsx`, replace `<ClosedCurtainsBackdrop />` with an `<img>` of the generated asset (full-bleed `object-cover`). Keep the existing gradient overlay for text legibility.
- Delete `src/components/ClosedCurtainsBackdrop.tsx`.

### 2. Floor: 3 days instead of 7
- Update `countdown_state.floor_seconds` from 604800 (7d) to 259200 (3d) via the insert tool.
- Update the user-facing copy in `Index.tsx` from "7 days is the minimum" to "3 days is the minimum."
- No edge function change needed — it already reads `floor_seconds` from the DB and `Math.max(reducedMs, now + floor)` already guarantees likes have no effect once the remaining time is at/under the floor.