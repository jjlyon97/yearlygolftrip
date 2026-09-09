/* ============================================================
   Shared-ratings configuration
   ------------------------------------------------------------
   Leave these blank and the site behaves exactly as it does
   today: ratings are stored in each visitor's own browser and
   are not shared with anyone.

   Fill both in and ratings become communal — see
   SETUP-RATINGS.md for the step-by-step.

   The anon key is MEANT to be public. It is safe to commit and
   safe to serve in JavaScript, but ONLY because Row Level
   Security decides what it is allowed to do. Run
   supabase-setup.sql before putting a key here.
   ============================================================ */
window.SUPABASE_CONFIG = {
  url:     '',   // e.g. 'https://abcdefghijkl.supabase.co'  (no trailing slash)
  anonKey: ''    // the long "anon public" key
};
