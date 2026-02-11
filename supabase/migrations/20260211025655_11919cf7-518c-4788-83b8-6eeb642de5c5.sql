
-- Drop tables
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Drop type
DROP TYPE IF EXISTS public.app_role CASCADE;
