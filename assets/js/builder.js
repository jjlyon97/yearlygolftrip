/* ============================================================
   Itinerary builder
   ------------------------------------------------------------
   State lives in localStorage; sharing packs the whole trip
   into the URL hash so there is no backend and no account.

   No dollar figures anywhere — cost is a tier ($ – $$$$)
   derived from the courses you pick, and every course links
   out to its own site for live pricing and tee times.
   ============================================================ */

const TRIP_KEY = 'annualgolftrip.trip.v1';

const blankDay = () => ({ course:'', teeTime:'', lodging:'', notes:'' });

let trip = {
  title:'', destId:'', startDate:'', travelers:4, days:[blankDay()]
};

/* ---------- base64url helpers (unicode-safe) ---------- */
function b64encode(str){
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64decode(b64){
  const pad = b64.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(pad + '==='.slice((pad.length + 3) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

/* ---------- serialisation ---------- */
function encodeTrip(t){
  return b64encode(JSON.stringify({
    t:t.title, d:t.destId, s:t.startDate, p:t.travelers,
    y:t.days.map(x => [x.course, x.teeTime, x.lodging, x.notes])
  }));
}

function decodeTrip(code){
  const raw = JSON.parse(b64decode(code));
  if(!raw || !Array.isArray(raw.y)) throw new Error('bad payload');
  return {
    title:  String(raw.t || '').slice(0, 120),
    destId: DEST_BY_ID[raw.d] ? raw.d : '',
    startDate: /^\d{4}-\d{2}-\d{2}$/.test(raw.s || '') ? raw.s : '',
    travelers: Math.min(64, Math.max(1, Number(raw.p) || 4)),
    days: raw.y.slice(0, 30).map(a => ({
      course:  String(a[0] || '').slice(0, 120),
      teeTime: String(a[1] || '').slice(0, 10),
      lodging: String(a[2] || '').slice(0, 120),
      notes:   String(a[3] || '').slice(0, 400)
    }))
  };
}

function save(){ localStorage.setItem(TRIP_KEY, JSON.stringify(trip)); }

function load(){
  try{
    const saved = JSON.parse(localStorage.getItem(TRIP_KEY));
    if(saved && Array.isArray(saved.days) && saved.days.length) trip = saved;
  }catch{ /* keep the blank trip */ }
}

function fromTemplate(tpl){
  return {
    title: tpl.title,
    destId: tpl.destinationId,
    startDate: '',
    travelers: tpl.travelers,
    days: tpl.days.map(d => ({
      course:  d.course === '—' ? '' : d.course,
      teeTime: d.teeTime,
      lodging: d.lodging === '—' ? '' : d.lodging,
      notes:   d.notes
    }))
  };
}

/* ---------- lookups ---------- */
function findCourse(name){
  return courseInDest(DEST_BY_ID[trip.destId], name);
}

function courseLinkHTML(name){
  const c = findCourse(name);
  if(!c) return '';
  if(c.private) return '<span class="pill pill-warn">Private — no public tee times</span>';
  if(!c.url)    return '<span class="small muted">Book through the resort</span>';
  return `<span class="pill pill-sand">${PRICE_LABEL[c.tier]}</span>
          <a class="small" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Tee times ↗</a>`;
}

/* ---------- dates ---------- */
function dayDate(i){
  if(!trip.startDate) return '';
  const d = new Date(trip.startDate + 'T12:00:00');
  if(isNaN(d)) return '';
  d.setDate(d.getDate() + i);
  return d.toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric' });
}

/* ---------- trip stats ---------- */
function stats(){
  const rounds = trip.days.filter(d => d.course.trim()).length;
  const dest = DEST_BY_ID[trip.destId];
  const tier = tierFromCourses(dest, trip.days.map(d => d.course));
  return { rounds, nights: Math.max(0, trip.days.length - 1), tier };
}

/* ---------- rendering ---------- */
function renderDatalists(){
  const d = DEST_BY_ID[trip.destId];
  $('#dl-courses').innerHTML = d
    ? d.courses.map(c => `<option value="${esc(c.name)}">${c.private ? 'Private' : PRICE_LABEL[c.tier]} · ${esc(c.designer)}</option>`).join('')
    : '';
  $('#dl-lodging').innerHTML = d
    ? d.lodging.map(l => `<option value="${esc(l.name)}">${PRICE_LABEL[l.tier]} · ${esc(l.type)}</option>`).join('')
    : '';
}

function renderDays(){
  $('#days').innerHTML = trip.days.map((day, i) => `
    <div class="day-card" data-idx="${i}">
      <div class="day-head">
        <span class="day-num">${i + 1}</span>
        <h3>Day ${i + 1}${dayDate(i) ? ` <span class="muted small" style="font-weight:400">· ${dayDate(i)}</span>` : ''}</h3>
        <button class="icon-btn" data-act="up"    ${i === 0 ? 'disabled' : ''} title="Move up">↑</button>
        <button class="icon-btn" data-act="down"  ${i === trip.days.length - 1 ? 'disabled' : ''} title="Move down">↓</button>
        <button class="icon-btn" data-act="remove" title="Remove day">✕</button>
      </div>

      <div class="field-row">
        <div class="field" style="flex:2">
          <label for="c${i}">Course</label>
          <input id="c${i}" list="dl-courses" data-f="course" placeholder="Search or type a course"
                 value="${esc(day.course)}">
        </div>
        <div class="field">
          <label for="t${i}">Tee time</label>
          <input id="t${i}" type="time" data-f="teeTime" value="${esc(day.teeTime)}">
        </div>
      </div>

      <div class="course-link" id="k${i}">${courseLinkHTML(day.course)}</div>

      <div class="field-row">
        <div class="field" style="flex:2">
          <label for="l${i}">Lodging</label>
          <input id="l${i}" list="dl-lodging" data-f="lodging" placeholder="Where you're staying"
                 value="${esc(day.lodging)}">
        </div>
      </div>

      <div class="field" style="margin-bottom:0">
        <label for="x${i}">Notes</label>
        <input id="x${i}" data-f="notes" placeholder="Caddie booked, dinner at 8, who's driving…"
               value="${esc(day.notes)}">
      </div>
    </div>`).join('');
}

function renderSummary(){
  const s = stats();
  const d = DEST_BY_ID[trip.destId];
  $('#summary').innerHTML = `
    <h3 style="margin-bottom:.2em">${esc(trip.title || 'Untitled trip')}</h3>
    <p class="small muted" style="margin-bottom:1.1rem">
      ${d ? esc(d.name) + ' · ' : ''}${trip.days.length} day${trip.days.length === 1 ? '' : 's'}
    </p>
    <div class="cost-line"><span>Rounds</span><span><b>${s.rounds}</b></span></div>
    <div class="cost-line"><span>Nights</span><span><b>${s.nights}</b></span></div>
    <div class="cost-line"><span>Players</span><span><b>${trip.travelers}</b></span></div>
    <div class="cost-total"><span>Trip cost</span>
      <b>${s.tier ? PRICE_LABEL[s.tier] : '—'}</b></div>
    <p class="small muted" style="margin:.6rem 0 1.2rem">
      ${s.tier ? PRICE_WORD[s.tier] + '.' : 'Pick a destination to see a cost tier.'}
      Follow the course links for live green fees and tee times.
    </p>
    <div style="display:grid;gap:.55rem">
      <button class="btn btn-primary btn-sm" id="btn-share">Copy share link</button>
      <button class="btn btn-ghost btn-sm" id="btn-print">Print / save as PDF</button>
      <button class="btn btn-ghost btn-sm" id="btn-reset">Start over</button>
    </div>`;

  $('#btn-share').addEventListener('click', shareTrip);
  $('#btn-print').addEventListener('click', printTrip);
  $('#btn-reset').addEventListener('click', () => {
    if(confirm('Clear this itinerary and start from scratch?')){
      trip = { title:'', destId:'', startDate:'', travelers:4, days:[blankDay()] };
      save(); history.replaceState(null, '', location.pathname); renderAll();
      toast('Cleared');
    }
  });
}

function renderAll(){
  $('#f-title').value     = trip.title;
  $('#f-dest').value      = trip.destId;
  $('#f-start').value     = trip.startDate;
  $('#f-travelers').value = trip.travelers;
  renderDatalists();
  renderDays();
  renderSummary();
  renderDestNote();
}

function renderDestNote(){
  const d = DEST_BY_ID[trip.destId];
  const box = $('#dest-note');
  if(!d){ box.hidden = true; return; }
  box.hidden = false;
  box.innerHTML = `<b>${esc(d.name)}:</b> best ${esc(d.season)}. ${esc(d.access)}.
    Fly into ${esc(d.airport)}. <a href="destinations.html#${d.id}">Full guide →</a>`;
}

/* ---------- actions ---------- */
function shareTrip(){
  const code = encodeTrip(trip);
  const url = `${location.origin}${location.pathname}#t=${code}`;
  history.replaceState(null, '', '#t=' + code);

  const done = ok => {
    $('#share-out').hidden = false;
    $('#share-url').value = url;
    toast(ok ? 'Link copied to your clipboard' : 'Link ready — copy it below');
  };
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(url).then(() => done(true), () => done(false));
  } else {
    done(false);
  }
}

function printTrip(){
  const d = DEST_BY_ID[trip.destId];
  const s = stats();
  $('#print-view').innerHTML = `
    <h1>${esc(trip.title || 'Golf trip itinerary')}</h1>
    <p><b>${d ? esc(d.name) + ' — ' + esc(d.region) : 'Destination TBC'}</b><br>
       ${trip.startDate ? 'Starting ' + esc(trip.startDate) + ' · ' : ''}
       ${trip.days.length} days · ${s.rounds} rounds · ${trip.travelers} players
       ${s.tier ? ' · ' + PRICE_LABEL[s.tier] + ' ' + PRICE_WORD[s.tier] : ''}</p>
    <hr>
    ${trip.days.map((day, i) => {
      const c = findCourse(day.course);
      return `
      <div style="margin-bottom:14px">
        <b>Day ${i + 1}${dayDate(i) ? ' — ' + dayDate(i) : ''}</b><br>
        ${esc(day.course || 'No round scheduled')}${day.teeTime ? ' at ' + esc(day.teeTime) : ''}<br>
        ${day.lodging ? 'Stay: ' + esc(day.lodging) + '<br>' : ''}
        ${day.notes ? '<i>' + esc(day.notes) + '</i><br>' : ''}
        ${c && c.url ? '<span style="font-size:11px">' + esc(c.url) + '</span>' : ''}
      </div>`; }).join('')}
    <hr>
    <p><small>Cost tiers are a guide only. Confirm green fees, rates and access with each course.</small></p>`;
  window.print();
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // destination select
  $('#f-dest').innerHTML = '<option value="">Choose a destination…</option>' +
    [...DESTINATIONS].sort((a, b) => a.name.localeCompare(b.name))
      .map(d => `<option value="${d.id}">${esc(d.name)} — ${esc(d.region)}</option>`).join('');

  const params = new URLSearchParams(location.search);
  const hash = location.hash;

  if(hash.startsWith('#t=')){
    try{
      trip = decodeTrip(hash.slice(3));
      toast('Shared itinerary loaded — edit it freely');
    }catch{
      toast('That share link could not be read');
      load();
    }
  } else if(params.get('template') && TRIP_BY_ID[params.get('template')]){
    trip = fromTemplate(TRIP_BY_ID[params.get('template')]);
    toast('Template loaded — make it yours');
  } else {
    load();
    const dest = params.get('dest');
    if(dest && DEST_BY_ID[dest]){
      trip.destId = dest;
      if(!trip.title) trip.title = `${DEST_BY_ID[dest].name} trip`;
    }
  }

  renderAll();
  save();

  /* trip-level fields */
  $('#f-title').addEventListener('input', e => {
    trip.title = e.target.value; save(); renderSummary();
  });
  $('#f-dest').addEventListener('change', e => {
    trip.destId = e.target.value;
    if(!trip.title && trip.destId) {
      trip.title = `${DEST_BY_ID[trip.destId].name} trip`;
      $('#f-title').value = trip.title;
    }
    save(); renderDatalists(); renderDays(); renderSummary(); renderDestNote();
  });
  $('#f-start').addEventListener('change', e => {
    trip.startDate = e.target.value; save(); renderDays(); renderSummary();
  });
  $('#f-travelers').addEventListener('input', e => {
    trip.travelers = Math.min(64, Math.max(1, Number(e.target.value) || 1));
    save(); renderSummary();
  });

  /* day fields — delegated so typing never rebuilds the DOM */
  $('#days').addEventListener('input', e => {
    const field = e.target.dataset.f;
    if(!field) return;
    const idx = Number(e.target.closest('.day-card').dataset.idx);
    trip.days[idx][field] = e.target.value;

    if(field === 'course'){
      $(`#k${idx}`).innerHTML = courseLinkHTML(trip.days[idx].course);
    }
    save(); renderSummary();
  });

  /* day actions */
  $('#days').addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if(!btn) return;
    const idx = Number(btn.closest('.day-card').dataset.idx);

    if(btn.dataset.act === 'remove'){
      if(trip.days.length === 1){ toast('A trip needs at least one day'); return; }
      trip.days.splice(idx, 1);
    }
    if(btn.dataset.act === 'up' && idx > 0){
      [trip.days[idx - 1], trip.days[idx]] = [trip.days[idx], trip.days[idx - 1]];
    }
    if(btn.dataset.act === 'down' && idx < trip.days.length - 1){
      [trip.days[idx + 1], trip.days[idx]] = [trip.days[idx], trip.days[idx + 1]];
    }
    save(); renderDays(); renderSummary();
  });

  $('#add-day').addEventListener('click', () => {
    if(trip.days.length >= 30){ toast('Thirty days is the limit'); return; }
    const prev = trip.days[trip.days.length - 1];
    // carry lodging forward — you usually stay put
    trip.days.push({ ...blankDay(), lodging:prev.lodging });
    save(); renderDays(); renderSummary();
    $('#days').lastElementChild.scrollIntoView({ behavior:'smooth', block:'center' });
  });

  $('#copy-url').addEventListener('click', () => {
    $('#share-url').select();
    navigator.clipboard?.writeText($('#share-url').value);
    toast('Copied');
  });
});
