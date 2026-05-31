## Goal

1. Swap the background video for a static "closed curtains" backdrop right now.
2. Update the new YouTube video link (`bOhIfi8WMn8`) and have the like-driven countdown turn on **automatically on June 1, 2026 at 12:00 AM ET** — no manual flip needed.

---

## Changes

### 1. Background → static closed curtains (immediate)

In `src/pages/Index.tsx`, replace the `<video src="/videos/intermission.mp4">` block with a static closed-curtain backdrop layer. The visual reuses the same velvet panels, valance, gold trim, and warm spotlight bleed from `CurtainIntro.tsx`, but **rendered in the closed state with no animation** so it acts as a still backdrop behind the headline / countdown / buttons. The existing gradient overlay stays so foreground text remains readable.

### 2. New video ID

Update `countdown_state.youtube_video_id` from `V_0mVSO4faM` to `bOhIfi8WMn8` (via the insert/update tool, not a migration — it's data).

### 3. Auto-enable on June 1, 2026 @ 12:00 AM ET

Two pieces switch over automatically at that moment:

**Frontend (`src/pages/Index.tsx`)**
- Replace the `LIKE_DRIVEN_COUNTDOWN_ENABLED = false` constant with:
  ```ts
  const FEATURE_START = new Date('2026-06-01T00:00:00-04:00');
  const likeFeatureLive = () => Date.now() >= FEATURE_START.getTime();
  ```
- Gate the subscription `useEffect` and the "X likes = Y time off" UI block on `likeFeatureLive()`. A lightweight 1-minute interval re-checks the flag so the UI flips on without a manual refresh once the moment passes.

**Backend (cron + edge function)**
- Re-create the `poll-youtube-likes-every-2-min` cron job (it was unscheduled when we paused the feature).
- Add a guard at the top of `supabase/functions/poll-youtube-likes/index.ts`: if `Date.now() < 2026-06-01T04:00:00Z`, return `{ skipped: true }` immediately without touching YouTube or the DB. This keeps `effective_target` equal to `original_target` until the cutover, so the countdown doesn't move early even though the cron is running.

After June 1 @ 12 AM ET:
- The edge function starts polling YouTube for real.
- `effective_target` begins shifting earlier as likes come in.
- The frontend starts subscribing to `countdown_state` and showing the "❤ N likes · N hr unlocked" block.

---

## Files touched

- `src/pages/Index.tsx` — swap video for static curtain backdrop; replace boolean flag with date-based check; gate UI + subscription.
- `supabase/functions/poll-youtube-likes/index.ts` — add pre-June-1 short-circuit.
- DB data update — set `youtube_video_id = 'bOhIfi8WMn8'` (insert tool).
- DB cron — re-schedule `poll-youtube-likes-every-2-min` every 2 minutes (insert tool, since it embeds the project URL + anon key).

No schema migrations needed. No new tables, secrets, or auth changes.