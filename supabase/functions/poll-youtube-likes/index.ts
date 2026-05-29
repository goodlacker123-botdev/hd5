import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!YOUTUBE_API_KEY) throw new Error('YOUTUBE_API_KEY is not configured');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase env missing');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: state, error: stateErr } = await supabase
      .from('countdown_state')
      .select('*')
      .eq('id', 1)
      .single();
    if (stateErr) throw stateErr;

    const videoId = state.youtube_video_id;
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const ytData = await ytRes.json();
    if (!ytRes.ok) {
      throw new Error(`YouTube API error [${ytRes.status}]: ${JSON.stringify(ytData)}`);
    }

    const stats = ytData.items?.[0]?.statistics;
    if (!stats) throw new Error('No statistics returned for video');

    const liveLikes = parseInt(stats.likeCount ?? '0', 10);
    // Ratchet: never decrease like count (avoid timer moving back if users unlike)
    const likeCount = Math.max(liveLikes, state.like_count);

    const originalTargetMs = new Date(state.original_target).getTime();
    const reducedMs = originalTargetMs - likeCount * state.seconds_per_like * 1000;
    const floorMs = Date.now() + state.floor_seconds * 1000;
    const effectiveMs = Math.max(reducedMs, floorMs);
    const effective_target = new Date(effectiveMs).toISOString();

    const { error: upErr } = await supabase
      .from('countdown_state')
      .update({
        like_count: likeCount,
        effective_target,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);
    if (upErr) throw upErr;

    return new Response(
      JSON.stringify({ success: true, like_count: likeCount, effective_target }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
