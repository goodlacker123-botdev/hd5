const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// September 14, 2026 8:00 PM ET (UTC-4)
const TARGET_MS = Date.parse("2026-09-15T00:00:00Z");

const EMBED_URL =
  "https://www.tunegoody.com/embed/artist/hayden-davis/album/the-death-of-a-star-the-final-bow-edition";
const EMBED_TITLE = "Tunegoody embed - The Death of a Star (The Final Bow Edition)";
const EMBED_ORIGIN = "https://www.tunegoody.com";

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const now = Date.now();

  if (now < TARGET_MS) {
    return new Response(
      JSON.stringify({ revealed: false, msRemaining: TARGET_MS - now }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({
      revealed: true,
      url: EMBED_URL,
      title: EMBED_TITLE,
      origin: EMBED_ORIGIN,
      minHeight: 760,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
