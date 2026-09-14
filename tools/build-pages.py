"""Generate a real, crawlable HTML page for every destination and trip.

The app renders destinations into a drawer at destinations.html#<id>, which is
one URL as far as a search engine is concerned — 26 destinations and 26
itineraries with no way to be found. These pages give each of them a URL, a
title, a description and its own content.

They are generated, never hand-edited. deploy.sh runs this before committing,
so they cannot drift from data.js.
"""
import html, os, sys, datetime
sys.path.insert(0, os.path.dirname(__file__))
from jsdata import load

SITE = 'https://yearlygolftrip.netlify.app'
OUT_D, OUT_T = 'd', 't'
PRICE = {1: '$', 2: '$$', 3: '$$$', 4: '$$$$'}
WORD  = {1: 'Budget', 2: 'Moderate', 3: 'Premium', 4: 'Splurge'}
e = lambda s: html.escape(str(s or ''), quote=True)


def clip(text, n=155):
    t = ' '.join(str(text).split())
    return t if len(t) <= n else t[:n - 1].rsplit(' ', 1)[0] + '…'


def css_version():
    """Match whatever the hand-written pages are using, so a cache bump
    reaches the generated pages too."""
    import re
    m = re.search(r'\?v=(\d+)', open('index.html', encoding='utf-8').read())
    return m.group(1) if m else '1'


def shell(*, title, desc, canonical, body, jsonld, depth=1):
    up = '../' * depth
    CSSV = css_version()
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{e(canonical)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Yearly Golf Trip">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{e(canonical)}">
<meta property="og:image" content="{SITE}/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(desc)}">
<link rel="stylesheet" href="{up}assets/css/style.css?v={CSSV}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='26'>⛳</text></svg>">
<script type="application/ld+json">{jsonld}</script>
</head>
<body>
<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="{up}index.html"><span>Yearly Golf Trip</span></a>
    <nav class="nav-links">
      <a href="{up}index.html">Home</a>
      <a href="{up}destinations.html">Destinations</a>
      <a href="{up}top-rated.html">Top Rated</a>
      <a href="{up}trips.html">Example Trips</a>
      <a href="{up}builder.html">Build Your Trip</a>
    </nav>
  </div>
</header>

<main>{body}</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-bottom">
      <span>© {datetime.date.today().year} Yearly Golf Trip</span>
      <span>Cost tiers are a guide. Check each course for current prices.</span>
    </div>
  </div>
</footer>
</body>
</html>
"""


def destination_page(d, trip):
    url = f'{SITE}/{OUT_D}/{d["id"]}.html'
    courses = ''.join(
        f"""<tr>
          <td><b>{e(c['name'])}</b><div class="small muted">{e(c.get('note',''))}</div></td>
          <td>{e(c['designer'])}</td><td>Par {c['par']}</td>
          <td>{'<span class="pill pill-warn">Private</span>' if c.get('private') else '<span class="pill pill-sand">' + PRICE[c['tier']] + '</span>'}</td>
          <td>{'<a class="btn btn-ghost btn-sm" href="' + e(c['url']) + '" target="_blank" rel="noopener noreferrer">Tee times ↗</a>' if c.get('url') else '<span class="small muted">' + ('No public access' if c.get('private') else 'Book through the resort') + '</span>'}</td>
        </tr>""" for c in d['courses'])

    body = f"""
  <section>
    <div class="wrap narrow">
      <p class="small muted"><a href="../destinations.html">Destinations</a> · {e(d['usRegion'])}</p>
      <p class="eyebrow">{e(d['region'])}</p>
      <h1>{e(d['name'])}</h1>
      <p class="lede">{e(d['tagline'])}</p>
      <p>{e(d['blurb'])}</p>
      <p>{e(d['longBlurb'])}</p>

      <div class="meta-row" style="margin:1.6rem 0">
        <span>Season<br><b>{e(d['season'])}</b></span>
        <span>Cost<br><b>{PRICE[d['priceTier']]} {WORD[d['priceTier']]}</b></span>
        <span>Courses<br><b>{len(d['courses'])}</b></span>
      </div>

      <div class="panel panel-tight" style="margin-bottom:1.6rem">
        <h2 style="font-size:1.1rem;margin:0 0 .5rem">Getting there</h2>
        <div class="cost-line"><span>Fly into</span><span><b>{e(d['airport'])}</b></span></div>
        <p class="small" style="margin:.7rem 0 0">{e(d['gettingThere'])}</p>
      </div>

      <div class="notice" style="margin-bottom:1.8rem"><b>Access:</b> {e(d['access'])}</div>

      <div class="grid grid-2" style="margin-bottom:1.8rem">
        <div><h2 style="font-size:1.1rem">Why go</h2><ul class="small">{''.join('<li>' + e(h) + '</li>' for h in d['highlights'])}</ul></div>
        <div><h2 style="font-size:1.1rem">Watch out for</h2><ul class="small">{''.join('<li>' + e(w) + '</li>' for w in d['watchouts'])}</ul></div>
      </div>

      <h2>Courses at {e(d['name'])}</h2>
      <div class="table-wrap" style="margin-bottom:1.8rem">
        <table><thead><tr><th>Course</th><th>Architect</th><th></th><th>Cost</th><th>Book</th></tr></thead>
        <tbody>{courses}</tbody></table>
      </div>

      <h2>Where to stay</h2>
      <div style="margin-bottom:2rem">{''.join(
        f'<div class="cost-line"><span><b>{e(l["name"])}</b> <span class="muted small">{e(l["type"])}</span></span><span class="pill pill-sand">{PRICE[l["tier"]]}</span></div>'
        for l in d['lodging'])}</div>

      <div class="panel">
        <h2 style="font-size:1.15rem;margin-bottom:.4rem">Plan a trip to {e(d['name'])}</h2>
        <p class="small muted">Start from an itinerary that already works, or build your own day by day.</p>
        <div class="hero-actions" style="margin-top:1rem">
          {'<a class="btn btn-primary btn-sm" href="../' + OUT_T + '/' + trip['id'] + '.html">See the ' + e(trip['title']) + ' →</a>' if trip else ''}
          <a class="btn btn-ghost btn-sm" href="../builder.html?dest={d['id']}">Build your own</a>
          <a class="btn btn-ghost btn-sm" href="../destinations.html?rate={d['id']}#{d['id']}">Rate it</a>
        </div>
      </div>
    </div>
  </section>"""

    jsonld = f"""{{"@context":"https://schema.org","@type":"TouristDestination","name":{_j(d['name'])},"description":{_j(d['tagline'])},"url":{_j(url)},"touristType":"Golf","address":{{"@type":"PostalAddress","addressRegion":{_j(d['region'])},"addressCountry":"US"}},"includesAttraction":[{','.join('{"@type":"GolfCourse","name":' + _j(c['name']) + '}' for c in d['courses'])}]}}"""

    return shell(
        title=f"{d['name']} Golf Trip — Courses, Season and Itinerary",
        desc=clip(d['tagline'] + ' ' + d['blurb']),
        canonical=url, body=body, jsonld=jsonld)


def trip_page(t, d):
    url = f'{SITE}/{OUT_T}/{t["id"]}.html'
    rounds = len([x for x in t['days'] if x['course'] and x['course'] != '—'])
    by_name = {c['name'].lower(): c for c in d['courses']}
    days = ''
    for day in t['days']:
        c = by_name.get(str(day['course']).strip().lower())
        head = e(day['course']) if day['course'] and day['course'] != '—' else 'Travel day'
        link = f'<a href="{e(c["url"])}" target="_blank" rel="noopener noreferrer">{head} ↗</a>' if c and c.get('url') else head
        days += f"""<div class="tl-item">
          <div class="tl-day">{e(day['label'])}{' · ' + e(day['teeTime']) if day['teeTime'] else ''}</div>
          <h3 style="font-size:1.05rem;margin:.15rem 0 .3rem">{link}</h3>
          <p>{e(day['notes'])}</p>
          {'<p class="small muted" style="margin-top:.2rem">Stay: ' + e(day['lodging']) + '</p>' if day['lodging'] and day['lodging'] != '—' else ''}
        </div>"""

    body = f"""
  <section>
    <div class="wrap narrow">
      <p class="small muted"><a href="../trips.html">Example trips</a> · <a href="../{OUT_D}/{d['id']}.html">{e(d['name'])}</a></p>
      <p class="eyebrow">{e(d['name'])} · {e(d['region'])}</p>
      <h1>{e(t['title'])}</h1>
      <p class="lede">{e(t['summary'])}</p>

      <div class="meta-row" style="margin:1.4rem 0 1.6rem">
        <span>Days<br><b>{len(t['days'])}</b></span>
        <span>Rounds<br><b>{rounds}</b></span>
        <span>Nights<br><b>{t['nights']}</b></span>
        <span>Group<br><b>{t['travelers']}</b></span>
      </div>

      <div class="notice" style="margin-bottom:1.8rem"><b>Local knowledge:</b> {e(t['tips'])}</div>

      <h2>Day by day</h2>
      <div class="timeline" style="margin-bottom:2rem">{days}</div>

      <div class="panel">
        <h2 style="font-size:1.15rem;margin-bottom:.4rem">Make it yours</h2>
        <p class="small muted">Load this itinerary into the builder and change whatever you like, then send it to the group as one link.</p>
        <div class="hero-actions" style="margin-top:1rem">
          <a class="btn btn-primary btn-sm" href="../builder.html?template={t['id']}">Copy into the builder →</a>
          <a class="btn btn-ghost btn-sm" href="../{OUT_D}/{d['id']}.html">About {e(d['name'])}</a>
        </div>
      </div>
    </div>
  </section>"""

    jsonld = f"""{{"@context":"https://schema.org","@type":"TouristTrip","name":{_j(t['title'])},"description":{_j(t['summary'])},"url":{_j(url)},"touristType":"Golf","itinerary":{{"@type":"ItemList","numberOfItems":{len(t['days'])},"itemListElement":[{','.join('{"@type":"ListItem","position":' + str(i+1) + ',"name":' + _j(x['course'] if x['course'] and x['course'] != '—' else 'Travel day') + '}' for i, x in enumerate(t['days']))}]}}}}"""

    return shell(
        title=f"{t['title']} — {len(t['days'])}-Day Golf Itinerary",
        desc=clip(t['summary'] + ' ' + t['tips']),
        canonical=url, body=body, jsonld=jsonld)


def _j(s):
    import json as _json
    return _json.dumps(str(s))


def main():
    dests, trips = load()
    trip_by_dest = {t['destinationId']: t for t in trips}
    dest_by_id = {d['id']: d for d in dests}
    os.makedirs(OUT_D, exist_ok=True)
    os.makedirs(OUT_T, exist_ok=True)

    for d in dests:
        open(f'{OUT_D}/{d["id"]}.html', 'w', encoding='utf-8').write(
            destination_page(d, trip_by_dest.get(d['id'])))
    for t in trips:
        open(f'{OUT_T}/{t["id"]}.html', 'w', encoding='utf-8').write(
            trip_page(t, dest_by_id[t['destinationId']]))

    today = datetime.date.today().isoformat()
    urls = [(f'{SITE}/', '1.0'), (f'{SITE}/destinations.html', '0.9'),
            (f'{SITE}/trips.html', '0.9'), (f'{SITE}/builder.html', '0.8'),
            (f'{SITE}/top-rated.html', '0.7')]
    urls += [(f'{SITE}/{OUT_D}/{d["id"]}.html', '0.8') for d in dests]
    urls += [(f'{SITE}/{OUT_T}/{t["id"]}.html', '0.7') for t in trips]
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for loc, pri in urls:
            f.write(f'  <url><loc>{loc}</loc><lastmod>{today}</lastmod><priority>{pri}</priority></url>\n')
        f.write('</urlset>\n')

    print(f'generated {len(dests)} destination pages, {len(trips)} trip pages, sitemap with {len(urls)} urls')


if __name__ == '__main__':
    main()
