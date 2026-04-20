## Tease Fall From Fame Visualizer with New Countdown

Bring the countdown back on the homepage to tease the upcoming "Fall From Fame" visualizer, ending Friday April 24, 2026 at midnight Eastern Time. Reuse the existing curtain reveal, then redirect to the YouTube visualizer (placeholder URL for now).

### What changes on the page

- **Headline**: "The Show Continues..."
- **Subtitle**: "✦ INTERMISSION ENDING SOON ✦"
- **Footer**: "Intermission Ends April 24th at 12AM ET"
- **Countdown**: Reappears, targeting Apr 24, 2026 00:00 ET. Since April 24 is after the DST transition (Mar 8, 2026), the timestamp uses the EDT offset `-04:00` to land exactly at midnight Eastern.
- **Buttons**: Keep the existing "Stream Talk of the Town" and "Presave The Death of a Star" buttons unchanged except change the text "Presave The Death of a Star"  to "Stream The Death of a Star" . No new button until the visualizer releases.
- **Curtain reveal**: Unchanged animation. After the curtain finishes, the page redirects to the Fall From Fame visualizer URL (placeholder constant for you to fill in later).
- **Curtain reveal text**: Stays as "Let the show begin..." (matches the theatrical theme; let me know if you'd like it changed for this tease).

### Files touched

- `**src/pages/Index.tsx**` — Update `targetDate` to `new Date('2026-04-24T00:00:00-04:00')`. Replace headline/subtitle/footer copy. Add a `FALL_FROM_FAME_VISUALIZER_URL` constant near the top with a clear `// TODO: replace with real YouTube link` placeholder, and use it inside `handleCurtainComplete` instead of the Death of a Star link.

No other files need to change. The curtain component, preview route, Netlify redirects, and existing buttons all stay as they are.

### After you provide the visualizer URL

Just edit the one constant at the top of `src/pages/Index.tsx` — no other changes required.