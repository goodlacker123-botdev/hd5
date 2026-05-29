
# Like-Driven Countdown

Make the countdown's target date shift earlier in real-time based on YouTube likes on the Fall From Fame video (`V_0mVSO4faM`). Each like = **1 hour off**, floored at **7 days from now**.

## Behavior

- Original target: June 26, 2026, 12 AM ET (unchanged baseline).
- A backend job polls the YouTube video's like count every ~2 minutes.
- Effective target = `originalTarget - (likeCount × 1 hour)`, but never earlier than `now + 7 days`.
- Frontend reads the effective target from the database (live-updated via realtime), so all visitors see the same countdown.
- Below the countdown: "❤️ {likes} likes  ·  {hours} hours unlocked  ·  Floor: 7 days minimum".

## Stack changes

This currently is a static SPA. Adding this requires the project to gain a backend (Lovable Cloud). I'll enable it as part of this work.

## Pieces to build

### 1. Lovable Cloud (backend)
Enable Cloud, then create:
- **Table `countdown_state`** (single row): `id`, `original_target` (timestamptz), `seconds_per_like` (int, default 3600), `floor_seconds` (int, default 604800), `youtube_video_id` (text), `like_count` (int), `effective_target` (timestamptz), `updated_at`.
- RLS: public SELECT (anonymous), no public write. Service role writes from edge function.
- Realtime enabled on the table so the page updates instantly when likes come in.

### 2. Edge function `poll-youtube-likes`
- Calls `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=V_0mVSO4faM&key=YOUTUBE_API_KEY`.
- Reads `likeCount`, computes `effective_target = max(original_target - likes*3600s, now + 7 days)`.
- Upserts the row.
- Requires secret: **`YOUTUBE_API_KEY`** (user provides — instructions below).

### 3. Schedule via pg_cron + pg_net
- Run the function every 2 minutes.

### 4. Frontend (`src/pages/Index.tsx`, `src/components/Countdown.tsx`)
- Replace the hardcoded `targetDate` with a Supabase fetch + realtime subscription on `countdown_state`.
- Pass the live `effective_target` into `<Countdown />`.
- New small `LikeProgress` component under the countdown showing likes, hours unlocked, and floor notice.
- Keep current visual theme (theater reds/golds, accent glow).

## What you'll need to provide

A **YouTube Data API v3 key** (free):
1. Go to Google Cloud Console → create/select a project.
2. Enable "YouTube Data API v3".
3. Credentials → Create API Key.
4. I'll request it via the secrets tool when we get there.

## Caveats

- YouTube like counts can go **down** (users unliking) — countdown could move back. I'll add a "ratchet" so it only ever moves earlier, never later. Tell me if you'd rather have it track live (both directions).
- YouTube API quota is 10,000 units/day; this call costs 1 unit. Polling every 2 min = 720/day. Plenty of headroom.
- Floor of 7 days from "now" is rolling — every poll recomputes against current time. If you'd prefer a fixed floor date instead, say the word.

## Ready to build?
Approve and I'll: enable Cloud → create table + RLS → write edge function → ask for the YouTube API key → wire up scheduling → update the frontend.
