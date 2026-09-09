# Yearly Golf Trip

A static site for planning golf travel: browse the twenty-six US golf areas worth
building a trip around, copy one of the twenty-six ready-made itineraries, build your own day-by-day
schedule, and share it as a link.

## Running it

No build step, no dependencies, no Node.

```bash
python3 -m http.server 8791
```

…then open <http://localhost:8791>, or just double-click `index.html`.

## Pages

| File | What it does |
|---|---|
| `index.html` | Home — hero, **trip matcher**, featured destinations, how it works, top ten |
| `destinations.html` | All 26 destinations, filterable; detail drawer with courses, lodging and the rating widget |
| `top-rated.html` | Leaderboard — rank by community score, editor score, or value; plus your own reviews |
| `trips.html` | Twenty-six example itineraries — one per destination; card grid, region filter, detail drawer, each loadable into the builder |
| `builder.html` | The itinerary builder — days, courses, tee times, lodging, share link |

## How the data works

- `assets/js/data.js` — all destination and trip content. Edit this file to add
  a destination; every page picks it up automatically.
- `assets/js/app.js` — shared chrome, the brand mark, the ratings store, the
  cost-tier helper, card rendering.
- `assets/js/destinations.js` / `builder.js` / `matcher.js` — page-specific logic.

### No dollar amounts — tiers and links instead

Green fees and room rates go stale the moment they are written down, so the site
never shows a dollar figure. Cost is a tier and every course links to its own
site for live pricing and tee times:

| Tier | Label |
|---|---|
| 1 | `$` Budget |
| 2 | `$$` Moderate |
| 3 | `$$$` Premium |
| 4 | `$$$$` Splurge |

A **trip's** tier is derived, not hardcoded: `tierFromCourses()` in `app.js`
takes the rounded mean of the tiers of the courses on the itinerary, falling
back to the destination's own tier when no course has been chosen yet. The
builder, the example-trip cards and the home page all call the same helper, so
they can never disagree.

Courses that cannot be booked publicly carry `private: true` and render a
**Private** badge with no link. A handful of casino-owned Las Vegas courses
carry `nolink: true` — their own sites could not be verified, so they show
"Book through the resort" rather than an unverified link.

**Every course URL in `data.js` was checked to resolve to the correct course.**
Two plausible-looking guesses turned out to be a quilting company and a staffing
firm, so re-verify before adding new ones.

### The trip matcher (`matcher.js`, home page only)

Five questions — season, who is going, budget, style of golf, travel tolerance —
scored against every destination. Season is the only near-hard filter (−12);
everything else adds or subtracts, so there is always an answer rather than an
empty state. `editorScore / 4` is the tie-breaker. The top three are shown with
"why it fits" chips derived from whichever rules actually scored.

Two data fields exist purely for this:

- `goodFor: []` — any of `buddies`, `biggroup`, `couples`, `families`,
  `architecture`. Drives the "who is coming?" question.
- `travelEase: 1–4` — see below.

### Getting there

`airport` names the airports and `gettingThere` is a sentence on what the
journey is actually like. Both are factual and editorial.

There is deliberately **no travel-difficulty rating**. An earlier build scored
each destination 1–4 and rendered "A mission" / "Straightforward" badges with a
little plane; it was removed because the subjective half of that question is
better answered by the `transport` rating category, which real visitors fill
in. Facts here, opinions from ratings.

### Ratings — eight categories

People rate a destination across eight axes rather than giving one blunt star
score, because "is it good?" has different answers depending on what you want:

| Key | Label | What it means |
|---|---|---|
| `overall` | Overall trip | All in — would you tell a mate to go? |
| `fun` | Fun & enjoyment | How much fun the golf was, regardless of difficulty or prestige |
| `quality` | Course quality | The design — the holes you actually remember |
| `depth` | Course depth | Enough good golf for a whole trip, or one course and filler |
| `transport` | Getting there & around | Flights, drives, and how close the courses sit to each other |
| `lodging` | Lodging & amenities | Rooms, food, clubhouse, practice, caddies |
| `value` | Value | Worth the money, whatever the price bracket |
| `offcourse` | Off-course | The town, the food, whether non-golfers enjoyed it |

**`overall` is the headline score and is rated directly**, not averaged from the
other seven — "was this a good trip?" is its own judgement, and a mean would
let a weak Off-course score drag down somewhere nobody minds. `DETAIL_KEYS` is
every category except `overall`, used for the "best for X" badge and
comparisons where the headline would be circular.

Categories are defined once in `RATING_CATEGORIES` (`data.js`) and everything
else — the rating widget, the filters, the leaderboard chips and columns, the
breakdown bars — generates from that array. Add or remove one there and it
propagates; you only have to add the matching `seedScores` key to each of the
twenty destinations.

Rating is **partial by design**: score only the categories you have an opinion
on. Unrated categories show the community number untouched.

**Why filtering by category matters:** the rankings genuinely diverge.

| Ranked by | Top three |
|---|---|
| Overall trip | Bandon Dunes, Pinehurst, Monterey |
| Fun & enjoyment | Bandon Dunes, Sand Valley, Pinehurst |
| Getting there & around | Scottsdale, Palm Springs, Las Vegas |
| Value | RTJ Trail, Long Island, Myrtle Beach |
| Lodging & amenities | Sea Island, Kiawah, Maui |
| Off-course | Maui, Las Vegas, Orlando |

Myrtle Beach scoring high on Fun and low on Quality, or Bandon topping Fun
while sitting near the bottom on Transport, is the whole point — a single
combined score hides all of it.

### Nothing is seeded

Every destination starts **unrated**. There are no `seedScores`, no invented
vote counts, and no sample reviews — a number on this site always came from
somebody actually rating that place. The leaderboards ship empty and say so.

That was a deliberate reversal. An earlier build seeded plausible scores to
give the tables shape, which meant the site displayed numbers nobody had ever
given it, and a real rating blended into hundreds of fake votes moved a score
by about 0.004. Both problems disappear when the seed data does.

Ratings live in `localStorage` under `annualgolftrip.ratings.v3` (older `v2`
data is migrated on first read). **There is no backend, so "people" currently
means this browser** — ratings are not shared between visitors. Swapping in a
real API means changing `Ratings.all()` and `Ratings.set()` and nothing else;
every consumer goes through `Ratings.score()`.

Unrated things sort last rather than as zero, minimum-score filters exclude
them, and `bestCategory()` returns null instead of guessing.

### Sharing### Sharing
The builder packs the entire itinerary into the URL hash as base64url JSON
(`builder.html#t=…`). No account, no server, nothing uploaded. A shared link is
fully editable by whoever opens it — they get their own copy. All decoded values
are escaped before rendering, so a hostile link renders as text.

### Cache busting
Asset links carry a `?v=N` query string. It must be bumped whenever a JS or CSS
file changes, or browsers keep serving the old one. **`deploy.sh` does this for
you** — see below. To do it by hand:

```bash
for f in *.html; do sed -i '' 's/?v=10"/?v=11"/g' "$f"; done
```

## ⚠️ About the numbers

Cost tiers, editor scores and seed community scores are **editorial judgements
written as sample content**. Course names, architects, pars, seasons and access
notes are accurate. Confirm access policy and current rates on the course's own
site before booking.

## Trips and destinations are 1:1

`EXAMPLE_TRIPS` holds exactly one trip per destination, keyed by
`destinationId`. If you add a destination, add a trip for it too — the trips
page assumes the pairing, and the region chips are built from whichever
destinations have trips.

Day `course` and `lodging` strings must match the destination's `courses` /
`lodging` names **exactly**, or the links, cost tier and builder autofill will
silently fall through. Never schedule a `private:true` course as a playing day.

## Adding a destination

Append an object to `DESTINATIONS` in `assets/js/data.js`:

Each destination also carries a `longBlurb` — a fuller paragraph shown behind
the "Read more" toggle in the detail view, for people deciding rather than
browsing.

```js
{
  id:'slug', name:'Name', region:'State', country:'USA',
  usRegion:'West',            // West | Southwest | Midwest | Southeast | Northeast | Hawaii
  style:'links',              // drives the filter chips
  palette:['#sky','#mid','#turf','#dune'],   // card artwork
  tagline:'One line.', blurb:'A paragraph.',
  season:'May – September', seasonMonths:[5,6,7,8,9],
  airport:'CODE, drive time',
  priceTier:3, editorScore:9.0, seedScore:4.5, seedVotes:100,
  access:'Public / private / resort note',
  goodFor:['buddies','architecture'],   // drives the trip matcher
  gettingThere:'A sentence on what the journey is actually like.',
  longBlurb:'A fuller paragraph, shown behind the Read more toggle.',
  site:'https://…',           // destination-level official site
  highlights:['…'], watchouts:['…'],
  courses:[{name:'', designer:'', par:72, tier:3, url:'https://…', note:''}],
  lodging:[{name:'', type:'', tier:3}]
}
```

For a private course use `private:true` and omit `tier`/`url`. For one whose own
site you could not verify, use `nolink:true`.

## International destinations

Parked, not deleted — see `PARKED_INTERNATIONAL` at the bottom of `data.js`
(St Andrews, Southwest Ireland, Cabot Cape Breton, Algarve, Melbourne Sandbelt,
Barnbougle, Los Cabos). To bring one back, give it a `usRegion` replacement or
add an "International" option to the region filter, then move it into
`DESTINATIONS`.

## Deploying

Live at **https://yearlygolftrip.netlify.app**, deployed from the `main` branch
of **https://github.com/jjlyon97/yearlygolftrip**. Netlify watches the repo and
republishes on every push — no build command, no environment variables,
publish directory is the repo root.

### The one command

```bash
./deploy.sh "what changed"
```

That script is the whole deploy process:

1. Reads the current `?v=N` from the pages and checks they all agree
2. Pre-flight: every local file the pages reference must actually exist
3. Bumps the version to `N+1` across all pages
4. `git add -A`, commits with your message, pushes
5. Netlify republishes about 30 seconds later

It refuses to run if the pages disagree on a version or if a page points at a
missing file — both of which are silent breakage if they reach production.

Doing it by hand still works; the script just removes the step everyone forgets.

## Where a backend would be needed

- **Real shared ratings** across all visitors (currently per-browser)
- **Accounts** so a trip follows you between devices
- **Live tee-time availability** rather than linking out to each course
- **Collaborative editing** so the group edits one itinerary together
