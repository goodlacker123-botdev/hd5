## Tease The Death of a Star Visualizer

Refresh the homepage to tease the next visualizer ("The Death of a Star"), ending Friday June 26, 2026 at midnight Eastern Time. Reuse the existing countdown + curtain reveal, then redirect to a placeholder YouTube URL.

### Page changes

- **Headline**: "The Star is Falling..."
- **Subtitle**: keep "✦ INTERMISSION ENDING SOON ✦"
- **Footer**: "Intermission Ends June 26th at 12AM ET"
- **Countdown target**: June 26, 2026 00:00 ET (EDT, `-04:00`)
- **Buttons**: Keep both existing ("Stream Talk of the Town", "Stream The Death of a Star") and add a third — **"Stream Fall From Fame"** — linking to the Fall From Fame stream URL (you can confirm/correct the link before I implement).
- **Redirect after curtain**: Replace `VIS_URL` with a clearly labeled `// TODO: replace with real YouTube link` placeholder.

### Files touched

- `src/pages/Index.tsx` — update `targetDate`, `VIS_URL` placeholder, headline, footer, and add the third stream button matching the existing button styling.

No other files need to change. Curtain intro, curtain reveal, and social links stay as-is.

### Need from you

The exact Fall From Fame stream URL (e.g. DistroKid hyperfollow). If you don't have it handy, I'll drop in a `// TODO` placeholder on that button too.
