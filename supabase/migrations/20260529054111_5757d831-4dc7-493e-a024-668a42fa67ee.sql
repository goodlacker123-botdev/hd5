
CREATE TABLE public.countdown_state (
  id integer PRIMARY KEY DEFAULT 1,
  original_target timestamptz NOT NULL DEFAULT '2026-06-26T04:00:00Z',
  seconds_per_like integer NOT NULL DEFAULT 3600,
  floor_seconds integer NOT NULL DEFAULT 604800,
  youtube_video_id text NOT NULL DEFAULT 'V_0mVSO4faM',
  like_count integer NOT NULL DEFAULT 0,
  effective_target timestamptz NOT NULL DEFAULT '2026-06-26T04:00:00Z',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

GRANT SELECT ON public.countdown_state TO anon;
GRANT SELECT ON public.countdown_state TO authenticated;
GRANT ALL ON public.countdown_state TO service_role;

ALTER TABLE public.countdown_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read countdown state"
ON public.countdown_state
FOR SELECT
USING (true);

INSERT INTO public.countdown_state (id) VALUES (1);

ALTER PUBLICATION supabase_realtime ADD TABLE public.countdown_state;
ALTER TABLE public.countdown_state REPLICA IDENTITY FULL;
