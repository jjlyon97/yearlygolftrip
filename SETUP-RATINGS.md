# Turning on shared ratings

Right now ratings are stored in each visitor's own browser. Nobody sees anyone
else's. This turns them communal.

**Time:** about 20 minutes, almost all of it clicking.
**Cost:** free. Supabase's free tier is 500MB of database and 5GB of bandwidth
a month — this site will not come close.

The code is already written and shipped. It is dormant until you complete
step 5, and the site works normally the whole time. If anything goes wrong you
can undo it by blanking one file.

---

## Step 1 — Create the Supabase account

1. Go to **https://supabase.com** and click **Start your project**
2. Sign in with GitHub (you already have an account — use `jjlyon97`)
3. Authorise Supabase when GitHub asks

## Step 2 — Create the project

1. Click **New project**
2. **Name:** `yearly-golf-trip`
3. **Database Password:** click **Generate a password**, then **copy it into
   your password manager**. You will almost certainly never need it, but it
   cannot be recovered later — only reset.
4. **Region:** pick the one closest to most of your visitors — `East US
   (North Virginia)` is the safe default
5. **Plan:** Free
6. Click **Create new project**

It takes about two minutes to provision. Wait for the spinner to finish before
the next step.

## Step 3 — Create the table

1. In the left sidebar click **SQL Editor**
2. Click **New query**
3. Open `supabase-setup.sql` from this project, copy **the entire file**, and
   paste it into the editor
4. Click **Run** (or press Cmd+Enter)

You should see a result grid at the bottom reading:

```
policy_count | rls_enabled
     3       |    true
```

**If `rls_enabled` is false or `policy_count` is not 3, stop and tell me.**
Those two values are the entire security model — everything else is cosmetic.

## Step 4 — Copy your two keys

1. In the sidebar click **Project Settings** (the gear), then **API**
2. You need two values from that page:
   - **Project URL** — looks like `https://abcdefghijklmno.supabase.co`
   - **Project API keys → `anon` `public`** — a very long string starting `eyJ`

Copy the `anon` key, **not** the `service_role` key. The service_role key
bypasses all security and must never go in a web page. If you ever paste it
somewhere public, rotate it immediately from that same screen.

## Step 5 — Paste them into the site

Open `assets/js/config.js` and fill in the two blanks:

```js
window.SUPABASE_CONFIG = {
  url:     'https://abcdefghijklmno.supabase.co',
  anonKey: 'eyJhbGciOi...'
};
```

Keep the quotes. No trailing slash on the URL.

## Step 6 — Deploy

```bash
./deploy.sh "Turn on shared ratings"
```

## Step 7 — Check it worked

1. Open **https://yearlygolftrip.netlify.app/top-rated.html**
2. Above the table you should now see a green **Shared ratings on** badge

Then prove it properly:

1. Rate a destination
2. Open the site in a **private/incognito window** — a different browser
   entirely is even better
3. The rating should be there

That second window is a different browser profile with different local storage.
If the rating shows up there, it came from the database and it is genuinely
working.

---

## What the badge is telling you

| Badge | Meaning |
|---|---|
| **Shared ratings on** | Working. Everyone sees the same scores. |
| **Shared ratings unreachable** | Keys are filled in but the request failed. Open the browser console for the reason — usually a typo in the URL, or step 3 was skipped. |
| **Local ratings** | `config.js` is still blank. Nothing is broken; the feature is just off. |

## Things worth knowing before you switch it on

**The anon key is public and that is fine.** It sits in your JavaScript where
anyone can read it. It is safe *only* because the policies from step 3 decide
what it can do: read ratings, add a rating, edit a rating. Nothing else. This
is why step 3 is not optional.

**Nobody can delete ratings.** The SQL deliberately creates no delete policy,
so even someone holding your public key cannot wipe the table. "Remove my
rating" overwrites the row with an empty score instead.

**Anyone can rate without an account, so anyone can rate repeatedly** by
clearing their browser storage. At your scale this is theoretical. The fixes —
logins, captchas, IP limits — all cost more than the problem is worth right
now. Worth knowing rather than discovering later.

**Someone who obtained another person's `rater_id` could edit that rating.**
The id is a random string kept in their browser and never displayed, so this is
close to unexploitable, but it is a real consequence of having no logins. If it
ever matters, Supabase's anonymous auth gives you a real identity to bind the
policy to — a bigger change, and unnecessary today.

**Reviews are public text written by strangers.** Nothing renders them as HTML
— everything goes through `esc()` — so a malicious review cannot execute code.
But you have no moderation tools. If someone posts something objectionable, you
delete the row from the Supabase table editor by hand.

## If it goes wrong

Blank both values in `assets/js/config.js` and deploy. The site falls back to
browser-local ratings immediately, and the data in Supabase is untouched and
waiting.

The code also fails soft on its own: if Supabase is down or unreachable, the
site logs a warning and shows local ratings rather than breaking.
