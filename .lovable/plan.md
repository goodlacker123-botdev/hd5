

## Remove Admin Dashboard and Auth System

Strip out all admin, login, and authentication code while keeping the corrected redirect URL hardcoded in the backend function.

### Changes

**Remove files:**
- `src/pages/Login.tsx`
- `src/pages/Admin.tsx`
- `src/hooks/useAuth.tsx`

**Edit files:**

1. **`src/App.tsx`** - Remove imports for Login, Admin, and AuthProvider. Remove `/login` and `/admin` routes.

2. **`supabase/functions/get-redirect-url/index.ts`** - Replace database lookup with hardcoded URL: `https://distrokid.com/hyperfollow/haydendavis3/talk-of-the-town`

3. **`src/pages/Index.tsx`** - Remove database fetch for `site_settings`. Hardcode the countdown target date (`2026-02-11T22:00:00Z`) and remove the `site_enabled` / test mode logic.

4. **`src/components/Countdown.tsx`** - No changes needed (it already just takes a `targetDate` prop and calls the edge function on completion).

**Database cleanup:**
- Drop tables: `site_settings`, `user_roles`, `profiles`
- Drop function: `has_role`
- Drop function: `handle_new_user`
- Drop type: `app_role`

### What stays
- The edge function endpoint (with the corrected hardcoded URL)
- The Countdown component and redirect-on-zero behavior
- All frontend visuals and social links

