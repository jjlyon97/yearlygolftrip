/* ============================================================
   The passport — which courses you have actually played
   ------------------------------------------------------------
   Same shape as Ratings: localStorage always, Supabase as well
   when config.js is filled in, keyed by the same rater id. A
   passport is personal rather than shared, so nothing here is
   aggregated across people — the server copy exists so it
   survives a cleared browser and follows you between devices.

   A course is identified by "<destinationId>::<course name>".
   Having played a destination is derived from having played at
   least one of its courses, so there is only ever one thing to
   click.
   ============================================================ */
const PASSPORT_KEY = 'annualgolftrip.passport.v1';

const Passport = {
  _set: new Set(),
  _loaded: false,
  online: false,      // true once the server copy has been read
  needsTable: false,  // shared ratings are on but the passport table is missing

  key(destId, courseName){ return destId + '::' + courseName; },

  _readLocal(){
    try {
      const raw = JSON.parse(localStorage.getItem(PASSPORT_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch { return []; }
  },
  _writeLocal(){
    try { localStorage.setItem(PASSPORT_KEY, JSON.stringify([...this._set])); } catch {}
  },

  async load(){
    if(this._loaded) return;
    this._set = new Set(this._readLocal());
    if(SHARED){
      try {
        const res = await fetch(
          `${SB.url}/rest/v1/passport?rater_id=eq.${encodeURIComponent(raterId())}&select=courses`,
          { headers: sbHeaders() });
        if(res.status === 404){
          /* the table has not been created yet — supabase-passport.sql */
          this.needsTable = true;
          console.info('[passport] no passport table on the server yet; run supabase-passport.sql. Using this browser only.');
        } else if(res.ok){
          const rows = await res.json();
          this.online = true;
          if(rows.length && Array.isArray(rows[0].courses)){
            /* union rather than replace: anything ticked offline on this
               device should survive meeting the server copy */
            rows[0].courses.forEach(c => this._set.add(c));
            this._writeLocal();
          }
          if(this._set.size && !rows.length) this._push();
        }
      } catch (e){
        console.warn('[passport] offline, using local copy', e);
      }
    }
    this._loaded = true;
  },

  has(destId, courseName){ return this._set.has(this.key(destId, courseName)); },

  async toggle(destId, courseName){
    const k = this.key(destId, courseName);
    const now = !this._set.has(k);
    now ? this._set.add(k) : this._set.delete(k);
    this._writeLocal();
    await this._push();
    return now;
  },

  async _push(){
    if(!SHARED || !this.online) return;
    try {
      await fetch(`${SB.url}/rest/v1/passport`, {
        method:'POST',
        headers: sbHeaders({ 'Prefer':'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify({ rater_id: raterId(), courses: [...this._set] })
      });
    } catch (e){ console.warn('[passport] save failed, kept locally', e); }
  },

  /* ---------- what you have done ---------- */
  playedCourses(){
    return [...this._set].map(k => {
      const [destId, ...rest] = k.split('::');
      const name = rest.join('::');
      const d = DEST_BY_ID[destId];
      if(!d) return null;
      const c = d.courses.find(x => x.name === name);
      return c ? { dest:d, course:c } : null;
    }).filter(Boolean);
  },
  playedIn(destId){
    const d = DEST_BY_ID[destId];
    return d ? d.courses.filter(c => this.has(destId, c.name)).length : 0;
  },
  destinations(){
    return DESTINATIONS.filter(d => this.playedIn(d.id) > 0);
  },
  totals(){
    const all = DESTINATIONS.reduce((n, d) => n + d.courses.length, 0);
    return {
      courses: this.playedCourses().length,
      allCourses: all,
      dests: this.destinations().length,
      allDests: DESTINATIONS.length
    };
  },
  /** Export/import so a cleared browser is not the end of it. */
  code(){ return btoa(unescape(encodeURIComponent(JSON.stringify([...this._set])))).replace(/=+$/, ''); },
  async restore(code){
    const pad = code + '==='.slice((code.length + 3) % 4);
    const list = JSON.parse(decodeURIComponent(escape(atob(pad))));
    if(!Array.isArray(list)) throw new Error('not a passport');
    list.forEach(k => this._set.add(k));
    this._writeLocal();
    await this._push();
    return this._set.size;
  }
};

/* ============================================================
   Achievements — earned from the data, never awarded arbitrarily
   ============================================================ */
const ARCHITECTS = [
  ['Coore & Crenshaw', 'Coore'],
  ['Tom Doak',         'Doak'],
  ['Pete Dye',         'Pete Dye'],
  ['Donald Ross',      'Donald Ross'],
  ['Robert Trent Jones','Robert Trent Jones'],
  ['Jack Nicklaus',    'Nicklaus'],
  ['David McLay Kidd', 'McLay Kidd'],
  ['Tom Fazio',        'Fazio']
];

function achievements(){
  const played = Passport.playedCourses();
  const t = Passport.totals();
  const out = [];

  const add = (id, name, desc, done, progress) =>
    out.push({ id, name, desc, done, progress });

  // volume
  [[5,'Getting started'],[10,'Double figures'],[25,'Serious about this'],
   [50,'Half a century'],[100,'Centurion']].forEach(([n, name]) =>
    add('c' + n, name, `Play ${n} courses`, t.courses >= n, `${Math.min(t.courses, n)}/${n}`));

  // breadth
  [[3,'Three down'],[10,'Well travelled'],[26,'The full set']].forEach(([n, name]) =>
    add('d' + n, name, `Play in ${n} destinations`, t.dests >= n, `${Math.min(t.dests, n)}/${n}`));

  // every course at one destination
  DESTINATIONS.forEach(d => {
    const playable = d.courses.filter(c => !c.private);
    if(playable.length < 2) return;
    const done = playable.filter(c => Passport.has(d.id, c.name)).length;
    if(done > 0) add('full-' + d.id, `${d.name} complete`,
      `Play every public course at ${d.name}`, done === playable.length,
      `${done}/${playable.length}`);
  });

  // a whole region
  US_REGIONS.forEach(r => {
    const inRegion = DESTINATIONS.filter(d => d.usRegion === r);
    const done = inRegion.filter(d => Passport.playedIn(d.id) > 0).length;
    if(done > 0) add('region-' + r, `${r} swept`,
      `Play in every ${r} destination`, done === inRegion.length,
      `${done}/${inRegion.length}`);
  });

  // architects
  ARCHITECTS.forEach(([name, match]) => {
    const total = DESTINATIONS.reduce((n, d) =>
      n + d.courses.filter(c => c.designer.includes(match)).length, 0);
    const done = played.filter(p => p.course.designer.includes(match)).length;
    if(done > 0) add('arch-' + match, `${name}`,
      `Play 5 courses by ${name}`, done >= 5, `${Math.min(done, 5)}/5`);
  });

  return {
    earned: out.filter(a => a.done),
    working: out.filter(a => !a.done).slice(0, 8)
  };
}
