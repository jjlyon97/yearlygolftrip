/* ============================================================
   Yearly Golf Trip — shared app logic
   ============================================================ */

/* ---------- tiny helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Escape untrusted text before it goes anywhere near innerHTML. */
function esc(str){
  return String(str ?? '').replace(/[&<>"']/g, c => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
  ));
}

const money = n => '$' + Math.round(Number(n) || 0).toLocaleString('en-US');

function toast(msg){
  let el = $('.toast');
  if(!el){
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- brand mark: golf cart with a bag of clubs ---------- */
const BRAND_MARK = `
<svg class="brand-mark" viewBox="0 0 50 32" fill="none" aria-hidden="true" focusable="false">
  <!-- bag + clubs, riding at the back -->
  <g stroke="var(--sand)" stroke-width="1.5" stroke-linecap="round">
    <path d="M31.8 10.2 L35.4 1.9"/>
    <path d="M33.4 11.1 L38.6 4.0"/>
    <path d="M34.8 12.4 L41.0 6.6"/>
  </g>
  <g stroke="var(--sand)" stroke-width="2.6" stroke-linecap="round">
    <path d="M35.4 1.9 l1.9 0.9"/>
    <path d="M38.6 4.0 l1.9 1.0"/>
    <path d="M41.0 6.6 l1.8 1.1"/>
  </g>
  <rect x="27.8" y="9.4" width="6.3" height="13.2" rx="3.15"
        fill="var(--sand)" transform="rotate(15 30.9 16)"/>

  <!-- the cart, drawn as line art so it stays open at small sizes -->
  <g stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7.4 4.4 H26.6"/>
    <path d="M10.8 4.4 L9.6 17.2"/>
    <path d="M24.6 4.4 V20.8"/>
    <path d="M12.6 17.2 H19.1 V10.2"/>
    <path d="M4.6 20.8 V18.4 Q4.6 17.2 5.8 17.2 H9.6"/>
    <path d="M4.6 20.8 H26.6"/>
  </g>
  <g stroke="currentColor" stroke-width="2.2" fill="none">
    <circle cx="8.6" cy="24.8" r="2.5"/>
    <circle cx="22.0" cy="24.8" r="2.5"/>
  </g>
</svg>`;

/* ---------- site chrome ---------- */
const NAV_LINKS = [
  {href:'index.html',        label:'Home'},
  {href:'destinations.html', label:'Destinations'},
  {href:'top-rated.html',    label:'Top Rated'},
  {href:'trips.html',        label:'Example Trips'},
  {href:'builder.html',      label:'Build Your Trip'}
];

function renderChrome(){
  const here = location.pathname.split('/').pop() || 'index.html';

  const header = $('#site-header');
  if(header){
    header.className = 'site-header';
    header.innerHTML = `
      <div class="wrap nav">
        <a class="brand" href="index.html">${BRAND_MARK} <span>Yearly Golf Trip</span></a>
        <button class="nav-toggle" aria-expanded="false" aria-label="Menu">☰</button>
        <nav class="nav-links">
          ${NAV_LINKS.map(l => `<a href="${l.href}"${l.href === here ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}
        </nav>
      </div>`;
    const btn = $('.nav-toggle', header), links = $('.nav-links', header);
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  const footer = $('#site-footer');
  if(footer){
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <div class="brand">${BRAND_MARK} <span>Yearly Golf Trip</span></div>
            <p class="small" style="max-width:38ch">Trip planning for people who pick the holiday around the tee sheet. Build an itinerary, price it out, send it to the group.</p>
          </div>
          <div>
            <h4>Plan</h4>
            <ul>
              <li><a href="destinations.html">All destinations</a></li>
              <li><a href="top-rated.html">Top rated</a></li>
              <li><a href="trips.html">Example trips</a></li>
              <li><a href="builder.html">Itinerary builder</a></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="index.html#how">How it works</a></li>
              <li><a href="destinations.html">Browse by season</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Yearly Golf Trip — a demo project.</span>
          <span>Prices and scores are sample planning estimates, not live rates.</span>
        </div>
      </div>`;
  }
}

/* ============================================================
   Ratings store
   ------------------------------------------------------------
   No backend, so ratings live in this browser's localStorage.
   Seed scores in data.js are sample content used to give the
   leaderboard a starting shape — they are not real reviews.
   ============================================================ */
/* ============================================================
   Ratings store
   ------------------------------------------------------------
   Nothing is seeded. Every destination starts unrated and fills
   up as people score it, so a number on this site always came
   from somebody actually rating it.

   No backend yet, so "people" currently means this browser:
   ratings live in localStorage and are not shared. Swapping in
   a real API means changing `all()` and `set()` and nothing else.
   ============================================================ */
const RATINGS_KEY     = 'annualgolftrip.ratings.v3';
const RATINGS_KEY_OLD = 'annualgolftrip.ratings.v2';

/** Mean of whatever category scores are present, or null. */
function meanScore(scores, keys = CATEGORY_KEYS){
  const vals = keys.map(k => Number(scores?.[k])).filter(v => v > 0);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

const Ratings = {
  all(){
    try {
      const v3 = JSON.parse(localStorage.getItem(RATINGS_KEY));
      if(v3) return v3;
      const v2 = JSON.parse(localStorage.getItem(RATINGS_KEY_OLD));
      if(v2){ localStorage.setItem(RATINGS_KEY, JSON.stringify(v2)); return v2; }
      return {};
    } catch { return {}; }
  },
  get(id){ return this.all()[id] || null; },

  /** scores is a partial map of category key -> 1..5 */
  set(id, scores, review){
    const all = this.all();
    const clean = {};
    CATEGORY_KEYS.forEach(k => {
      const v = Number(scores[k]);
      if(v >= 1 && v <= 5) clean[k] = v;
    });
    all[id] = { scores:clean, review:String(review || '').slice(0, 400), ts:Date.now() };
    localStorage.setItem(RATINGS_KEY, JSON.stringify(all));
    return all[id];
  },
  clear(id){
    const all = this.all();
    delete all[id];
    localStorage.setItem(RATINGS_KEY, JSON.stringify(all));
  },

  /**
   * Everything known about how a destination has been rated.
   * `rated` is false until somebody scores it — the UI shows an
   * invitation rather than a fake number.
   */
  score(dest){
    const mine = this.get(dest.id);
    const categories = {};
    CATEGORY_KEYS.forEach(k => categories[k] = mine?.scores?.[k] ?? null);
    const rated = CATEGORY_KEYS.some(k => categories[k] != null);
    return {
      categories,
      rated,
      /* headline: the Overall trip score, or the mean of what was rated */
      value: rated ? (categories.overall ?? meanScore(categories)) : null,
      mean:  meanScore(categories, DETAIL_KEYS),
      votes: mine ? 1 : 0,
      mine
    };
  },

  /** Score for a single category, or null when nobody has rated it. */
  by(dest, key){
    return this.score(dest).categories[key] ?? null;
  },

  count(){ return Object.keys(this.all()).length; }
};

/* ---------- star rendering ---------- */
function starsHTML(value, max = 5){
  const filled = Math.round(value || 0);
  return `<span class="stars" aria-label="${(value || 0).toFixed(1)} out of ${max}">` +
    Array.from({length:max}, (_, i) =>
      `<span class="${i < filled ? '' : 'off'}">★</span>`).join('') +
    `</span>`;
}

/* ---------- cost tiers ----------
   One source of truth: a trip's cost tier is the rounded mean of the tiers of
   the courses on it, falling back to the destination's own tier when nothing
   has been matched. Used by the builder and the example-trip cards alike. */
function courseInDest(dest, name){
  if(!dest || !name) return null;
  const n = String(name).trim().toLowerCase();
  if(!n || n === '\u2014') return null;
  return dest.courses.find(c => c.name.toLowerCase() === n) || null;
}

function tierFromCourses(dest, courseNames){
  const matched = courseNames
    .map(n => courseInDest(dest, n))
    .filter(c => c && c.tier);
  if(matched.length) return Math.round(matched.reduce((a, c) => a + c.tier, 0) / matched.length);
  return dest ? dest.priceTier : null;
}

/** The category a destination scores highest in — its selling point. */
function bestCategory(scored){
  const rated = DETAIL_KEYS.filter(k => scored.categories[k] != null);
  if(!rated.length) return null;
  const key = rated.reduce((a, b) =>
    scored.categories[b] > scored.categories[a] ? b : a);
  return CATEGORY_BY_KEY[key];
}

/* ---------- destination card ---------- */
function terrainStyle(d){
  const [c1,c2,c3,c4] = d.palette;
  return `--c1:${c1};--c2:${c2};--c3:${c3};--c4:${c4}`;
}

function destinationCard(d, rank){
  const s = Ratings.score(d);
  const best = bestCategory(s);
  const trip = TRIP_BY_DEST[d.id];
  return `
    <article class="card" data-id="${d.id}">
      <div class="terrain" style="${terrainStyle(d)}">
        <span class="terrain-tag">${esc(d.style)}</span>
        ${rank ? `<span class="terrain-rank">${rank}</span>` : ''}
        <span class="terrain-flag"></span>
      </div>
      <div class="card-body">
        <div class="card-region">${esc(d.region)}</div>
        <h3><a href="destinations.html#${d.id}">${esc(d.name)}</a></h3>
        <p class="card-desc">${esc(d.tagline)}</p>
        <div class="pills">
          <span class="pill">${esc(d.season)}</span>
          <span class="pill pill-sand">${PRICE_LABEL[d.priceTier]} ${PRICE_WORD[d.priceTier]}</span>
          <span class="pill">${d.courses.length} courses</span>
        </div>
        <div class="card-foot">
          ${s.rated
            ? `<span>${starsHTML(s.value)} <span class="score">${s.value.toFixed(1)}</span></span>
               ${best ? `<span class="pill">Best for ${esc(best.short.toLowerCase())}</span>` : ''}`
            : `<span class="muted small">Not rated yet — <a href="destinations.html#${d.id}">be the first</a></span>`}
        </div>
        <div class="card-actions">
          ${trip ? `<a class="btn btn-ghost btn-sm" href="trips.html#${trip.id}">The itinerary</a>` : ''}
          <a class="btn btn-primary btn-sm" href="builder.html?dest=${d.id}">Plan it</a>
        </div>
      </div>
    </article>`;
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', renderChrome);
