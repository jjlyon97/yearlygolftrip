/* ============================================================
   Destinations — filtering, detail view, rating
   ============================================================ */

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

const state = { q:'', usRegion:'', month:'', price:'', style:'', sort:'editor', category:'overall', minScore:0 };

/* ---------- filter + sort ---------- */
function applyFilters(){
  let list = DESTINATIONS.filter(d => {
    if(state.usRegion && d.usRegion !== state.usRegion) return false;
    if(state.price && String(d.priceTier) !== state.price) return false;
    if(state.style && d.style !== state.style) return false;
    if(state.month && !d.seasonMonths.includes(Number(state.month))) return false;
    if(state.minScore && Ratings.by(d, state.category) < state.minScore) return false;
    if(state.q){
      const hay = [d.name, d.region, d.country, d.tagline, d.blurb,
                   ...d.courses.map(c => c.name)].join(' ').toLowerCase();
      if(!hay.includes(state.q.toLowerCase())) return false;
    }
    return true;
  });

  const sorters = {
    editor:  (a, b) => b.editorScore - a.editorScore,
    rated:   (a, b) => Ratings.by(b, state.category) - Ratings.by(a, state.category),
    price:   (a, b) => a.priceTier - b.priceTier,
    name:    (a, b) => a.name.localeCompare(b.name),
    courses: (a, b) => b.courses.length - a.courses.length,
    travel:  (a, b) => a.travelEase - b.travelEase || b.editorScore - a.editorScore
  };
  list.sort(sorters[state.sort] || sorters.editor);

  const grid = $('#dest-grid');
  $('#result-count').textContent =
    `${list.length} destination${list.length === 1 ? '' : 's'}`;

  grid.innerHTML = list.length
    ? list.map(d => destinationCard(d)).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <h3>Nothing matches those filters</h3>
         <p>Try widening the month or price range.</p>
       </div>`;
}

const dest_votes = d => d.seedVotes.toLocaleString('en-US');

/* ---------- detail view ---------- */
function renderDetail(id){
  const d = DEST_BY_ID[id];
  const box = $('#detail');
  if(!d){ box.hidden = true; box.innerHTML = ''; return; }

  const s = Ratings.score(d);
  const mine = s.mine;

  const courseRows = d.courses.map(c => {
    const cost = c.private
      ? '<span class="pill pill-warn">Private</span>'
      : `<span class="pill pill-sand">${PRICE_LABEL[c.tier]}</span>`;
    const book = c.private
      ? '<span class="small muted">No public access</span>'
      : c.url
        ? `<a class="btn btn-ghost btn-sm" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Tee times&nbsp;↗</a>`
        : '<span class="small muted">Book through the resort</span>';
    return `
    <tr>
      <td><b>${esc(c.name)}</b><div class="small muted">${esc(c.note)}</div></td>
      <td>${esc(c.designer)}</td>
      <td>Par ${c.par}</td>
      <td>${cost}</td>
      <td>${book}</td>
    </tr>`;
  }).join('');

  const lodgingRows = d.lodging.map(l => `
    <div class="cost-line">
      <span><b>${esc(l.name)}</b> <span class="muted small">${esc(l.type)}</span></span>
      <span class="pill pill-sand">${PRICE_LABEL[l.tier]}</span>
    </div>`).join('');

  box.hidden = false;
  box.innerHTML = `
    <div class="panel" style="padding:0;overflow:hidden">
      <div class="terrain" style="${terrainStyle(d)};height:210px">
        <span class="terrain-tag">${esc(d.style)}</span>
        <span class="terrain-flag"></span>
      </div>
      <div style="padding:1.7rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:flex-start">
          <div>
            <p class="eyebrow" style="margin-bottom:.4rem">${esc(d.region)}</p>
            <h2 style="margin-bottom:.25em">${esc(d.name)}</h2>
          </div>
          <button class="icon-btn no-print" id="close-detail" title="Close">✕ Close</button>
        </div>

        <p class="lede">${esc(d.tagline)}</p>
        <p>${esc(d.blurb)}</p>

        <div class="meta-row" style="margin:1.4rem 0 1.6rem;gap:1.6rem">
          <span>Season<br><b>${esc(d.season)}</b></span>
          <span>Cost<br><b>${PRICE_LABEL[d.priceTier]} ${PRICE_WORD[d.priceTier]}</b></span>
          <span>Getting there<br><b>${TRAVEL_WORD[d.travelEase]}</b></span>
          <span>Editor score<br><b>${d.editorScore.toFixed(1)}</b></span>
        </div>

        <div class="panel panel-tight getting-there" style="margin-bottom:1.6rem">
          <div class="gt-head">
            <span class="gt-plane">✈</span>
            <div>
              <h3 style="margin:0 0 .15em">Getting there</h3>
              <p class="small muted" style="margin:0">${TRAVEL_WORD[d.travelEase]}</p>
            </div>
            <span class="gt-meter" aria-label="${TRAVEL_WORD[d.travelEase]}">
              ${[1,2,3,4].map(n => `<i class="${n <= d.travelEase ? 'on' : ''}"></i>`).join('')}
            </span>
          </div>
          <div class="cost-line"><span>Fly into</span><span><b>${esc(d.airport)}</b></span></div>
          <p class="small" style="margin:.7rem 0 0">${esc(d.travelNote)}</p>
        </div>

        <div class="notice" style="margin-bottom:1.6rem">
          <b>Access:</b> ${esc(d.access)}
          ${d.site ? ` · <a href="${esc(d.site)}" target="_blank" rel="noopener noreferrer">Official site ↗</a>` : ''}
        </div>

        <div class="grid grid-2" style="margin-bottom:1.8rem">
          <div>
            <h3>Why go</h3>
            <ul class="small">${d.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
          </div>
          <div>
            <h3>Watch out for</h3>
            <ul class="small">${d.watchouts.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
          </div>
        </div>

        <h3>How travellers rate it</h3>
        <p class="small muted" style="margin:-.4em 0 .9rem">
          ${s.blended
            ? `Blended — community ${100 - Math.round(MY_WEIGHT * 100)}%, your rating ${Math.round(MY_WEIGHT * 100)}%.`
            : 'Community scores. Rate it below and these become your blended view.'}
        </p>
        <div class="score-bars" style="margin-bottom:1.8rem">
          ${RATING_CATEGORIES.map(c => {
            const v = s.categories[c.key];
            return `
            <div class="score-bar">
              <span class="sb-label">${esc(c.label)}</span>
              <span class="sb-track"><span class="sb-fill" style="width:${(v / 5 * 100).toFixed(1)}%"></span></span>
              <span class="sb-val">${v.toFixed(1)}</span>
            </div>`;
          }).join('')}
        </div>

        <h3>Courses</h3>
        <div class="table-wrap" style="margin-bottom:1.8rem">
          <table>
            <thead><tr><th>Course</th><th>Architect</th><th></th><th>Cost</th><th>Book</th></tr></thead>
            <tbody>${courseRows}</tbody>
          </table>
        </div>

        <h3>Where to stay</h3>
        <div style="margin-bottom:1.8rem">${lodgingRows}</div>

        <!-- rating -->
        <div class="panel panel-tight" style="background:var(--cream)">
          <h3 style="margin-bottom:.2em">Rate ${esc(d.name)}</h3>
          <p class="small muted" style="margin-bottom:1.1rem">
            Community score <b>${s.community.toFixed(1)}</b> from ${dest_votes(d)} ratings.
            ${mine
              ? `You have rated this, so the scores shown are blended — yours counts for ${Math.round(MY_WEIGHT * 100)}%.`
              : 'Rate the categories you have an opinion on; skip the rest.'}
          </p>

          <div class="rate-grid">
            ${RATING_CATEGORIES.map(c => `
              <div class="rate-cat" data-cat="${c.key}">
                <div class="rate-cat-label">
                  <b>${esc(c.label)}</b>
                  <span class="small muted">${esc(c.hint)}</span>
                </div>
                <div class="rate-cat-stars">
                  <div class="rate-widget" role="radiogroup" aria-label="${esc(c.label)}">
                    ${[1,2,3,4,5].map(n => `
                      <button class="rate-star${mine && mine.scores[c.key] >= n ? ' on' : ''}"
                              data-cat="${c.key}" data-n="${n}"
                              aria-label="${esc(c.label)}: ${n} of 5">★</button>`).join('')}
                  </div>
                  <span class="rate-community small muted"
                        title="Community average">${s.categories[c.key].toFixed(1)}</span>
                </div>
              </div>`).join('')}
          </div>

          <div class="field" style="margin:1.1rem 0">
            <label for="rate-note">Tip for the next group (optional)</label>
            <textarea id="rate-note" maxlength="400"
              placeholder="Best time to tee off, where to eat, what you'd skip…">${esc(mine ? mine.review : '')}</textarea>
          </div>
          <div style="display:flex;gap:.6rem;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" id="save-rating">Save rating</button>
            ${mine ? '<button class="btn btn-ghost btn-sm" id="clear-rating">Remove</button>' : ''}
            <a class="btn btn-ghost btn-sm" href="builder.html?dest=${d.id}">Plan a trip here →</a>
          </div>
        </div>
      </div>
    </article>`;

  /* rating interactions */
  const picked = {};
  if(mine) Object.assign(picked, mine.scores);

  $$('#detail .rate-star').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      picked[cat] = Number(btn.dataset.n);
      $$(`#detail .rate-star[data-cat="${cat}"]`).forEach(b =>
        b.classList.toggle('on', Number(b.dataset.n) <= picked[cat]));
    });
  });

  $('#save-rating').addEventListener('click', () => {
    if(!Object.keys(picked).length){ toast('Rate at least one category first'); return; }
    Ratings.set(d.id, picked, $('#rate-note').value);
    const n = Object.keys(picked).length;
    toast(`Saved — ${n} categor${n === 1 ? 'y' : 'ies'} rated`);
    applyFilters();
    renderDetail(d.id);
  });

  const clearBtn = $('#clear-rating');
  if(clearBtn) clearBtn.addEventListener('click', () => {
    Ratings.clear(d.id);
    toast('Rating removed');
    applyFilters();
    renderDetail(d.id);
  });

  $('#close-detail').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname);
    box.hidden = true;
    box.innerHTML = '';
  });

  box.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // region options
  $('#f-region').innerHTML = '<option value="">Anywhere in the US</option>' +
    US_REGIONS.map(r => `<option value="${r}">${r}</option>`).join('');

  // month options
  $('#f-month').innerHTML = '<option value="">Any month</option>' +
    MONTHS.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');

  // style chips
  const styles = [...new Set(DESTINATIONS.map(d => d.style))].sort();
  $('#style-chips').innerHTML =
    `<button class="chip active" data-style="">All styles</button>` +
    styles.map(s => `<button class="chip" data-style="${s}">${s}</button>`).join('');

  $$('#style-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('#style-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.style = chip.dataset.style;
      applyFilters();
    });
  });

  $('#f-search').addEventListener('input', e => { state.q = e.target.value; applyFilters(); });
  $('#f-region').addEventListener('change', e => { state.usRegion = e.target.value; applyFilters(); });
  $('#f-month').addEventListener('change', e => { state.month = e.target.value; applyFilters(); });
  $('#f-price').addEventListener('change', e => { state.price = e.target.value; applyFilters(); });
  $('#f-sort').addEventListener('change', e => { state.sort = e.target.value; applyFilters(); });

  $('#f-category').innerHTML =
    '<option value="overall">Overall rating</option>' +
    RATING_CATEGORIES.map(c => `<option value="${c.key}">${c.label}</option>`).join('');

  $('#f-category').addEventListener('change', e => {
    state.category = e.target.value;
    if(state.minScore || state.sort === 'rated') applyFilters(); else { state.sort = 'rated'; $('#f-sort').value = 'rated'; applyFilters(); }
  });
  $('#f-min').addEventListener('change', e => { state.minScore = Number(e.target.value); applyFilters(); });

  $('#f-reset').addEventListener('click', () => {
    Object.assign(state, { q:'', usRegion:'', month:'', price:'', style:'', sort:'editor', category:'overall', minScore:0 });
    $('#f-search').value = ''; $('#f-region').value = ''; $('#f-month').value = '';
    $('#f-price').value = ''; $('#f-sort').value = 'editor';
    $('#f-category').value = 'overall'; $('#f-min').value = '0';
    $$('#style-chips .chip').forEach((c, i) => c.classList.toggle('active', i === 0));
    applyFilters();
  });

  applyFilters();

  const openFromHash = () => renderDetail(location.hash.slice(1));
  window.addEventListener('hashchange', openFromHash);
  if(location.hash) openFromHash();

  // in-page card links should re-render even when the hash is unchanged
  $('#dest-grid').addEventListener('click', e => {
    const link = e.target.closest('a[href^="destinations.html#"]');
    if(!link) return;
    e.preventDefault();
    const id = link.getAttribute('href').split('#')[1];
    history.replaceState(null, '', '#' + id);
    renderDetail(id);
  });
});
