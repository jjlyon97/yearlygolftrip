/* ============================================================
   "Where should you go?" — the trip matcher
   ------------------------------------------------------------
   Five quick questions, scored against the destination data.
   Nothing is a hard filter except season, so you always get an
   answer rather than an empty state.
   ============================================================ */

const QUESTIONS = [
  {
    key:'season',
    q:'When can you actually get away?',
    hint:'Season matters more than anything else — half these places are shut or unplayable at the wrong time of year.',
    opts:[
      {label:'Winter',  sub:'December – February', value:[12,1,2]},
      {label:'Spring',  sub:'March – May',         value:[3,4,5]},
      {label:'Summer',  sub:'June – August',       value:[6,7,8]},
      {label:'Autumn',  sub:'September – November',value:[9,10,11]}
    ]
  },
  {
    key:'group',
    q:'Who is coming?',
    hint:'This changes the answer more than people expect.',
    opts:[
      {label:'A buddies trip',        sub:'Four of us, here to play golf',      value:'buddies'},
      {label:'A big group',           sub:'Eight or more, cost matters',        value:'biggroup'},
      {label:'Just the two of us',    sub:'A couple’s trip with golf in it',    value:'couples'},
      {label:'Mixed group',           sub:'Some of us do not play',             value:'families'},
      {label:'Architecture pilgrimage', sub:'We are here for the golf courses', value:'architecture'}
    ]
  },
  {
    key:'budget',
    q:'What are you willing to spend?',
    hint:'Per round, roughly — this sets the tier we aim at.',
    opts:[
      {label:'Keep it cheap',   sub:'$ — value is the point',          value:1},
      {label:'Sensible',        sub:'$$ — good golf, no silly rates',  value:2},
      {label:'Push the boat',   sub:'$$$ — this is the big one',       value:3},
      {label:'Money no object', sub:'$$$$ — bucket list, once ever',   value:4}
    ]
  },
  {
    key:'style',
    q:'What kind of golf do you want?',
    hint:'',
    opts:[
      {label:'Links and coastline', sub:'Wind, firm ground, ocean',      value:['links','coastal']},
      {label:'Sand and dunes',      sub:'Inland sand, big architecture', value:['sand','sandhills']},
      {label:'Desert sunshine',     sub:'Target golf, guaranteed sun',   value:['desert']},
      {label:'Green and classic',   sub:'Parkland, resort, mountain',    value:['parkland','resort','mountain','tropical']},
      {label:'No preference',       sub:'Surprise me',                   value:null}
    ]
  },
  {
    key:'travel',
    q:'How much travel hassle can you take?',
    hint:'Some of the best golf here is a long way from an airport.',
    opts:[
      {label:'Keep it simple',   sub:'Major hub, short drive',          value:1},
      {label:'A connection is fine', sub:'Or an hour or two in the car', value:2},
      {label:'We will drive',    sub:'Half a day of travel is fine',    value:3},
      {label:'Anywhere',         sub:'If it is worth it, we will get there', value:4}
    ]
  }
];

const answers = {};
let step = 0;

/* ---------- scoring ---------- */
function scoreDestination(d){
  let score = d.editorScore / 4;   // gentle tie-breaker
  const why = [];

  // season — the only near-hard filter
  const months = answers.season || [];
  const inSeason = months.some(m => d.seasonMonths.includes(m));
  if(inSeason){ score += 6; why.push('In season then'); }
  else { score -= 12; }

  // who is going
  if(answers.group && d.goodFor.includes(answers.group)){
    score += 4;
    why.push({
      buddies:'Built for a buddies trip', biggroup:'Works for a big group',
      couples:'Good couple’s trip',       families:'Fine for non-golfers too',
      architecture:'Architecture pilgrimage'
    }[answers.group]);
  }

  // budget — reward at or under, punish over
  if(answers.budget){
    const over = d.priceTier - answers.budget;
    if(over <= 0){ score += 3 + over * 0.5; if(d.priceTier < answers.budget) why.push('Under budget'); else why.push('On budget'); }
    else { score -= over * 3; }
  }

  // style of golf
  if(answers.style){
    if(answers.style.includes(d.style)){ score += 4; why.push(d.style[0].toUpperCase() + d.style.slice(1) + ' golf'); }
  }

  // travel tolerance
  if(answers.travel){
    const over = d.travelEase - answers.travel;
    if(over <= 0){ score += 2; if(d.travelEase === 1) why.push('Easy to reach'); }
    else { score -= over * 2.5; }
  }

  return { d, score, why: why.filter(Boolean).slice(0, 4) };
}

/* ---------- rendering ---------- */
function renderQuestion(){
  const Q = QUESTIONS[step];
  $('#matcher').innerHTML = `
    <div class="matcher-head">
      <div>
        <p class="matcher-step">Question ${step + 1} of ${QUESTIONS.length}</p>
        <h2 class="matcher-q">${esc(Q.q)}</h2>
        ${Q.hint ? `<p class="small muted" style="margin:.5rem 0 0;max-width:52ch">${esc(Q.hint)}</p>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.7rem">
        <div class="matcher-dots">
          ${QUESTIONS.map((_, i) =>
            `<i class="${i < step ? 'done' : i === step ? 'now' : ''}"></i>`).join('')}
        </div>
        ${step > 0 ? '<button class="btn btn-ghost btn-sm" id="m-back">← Back</button>' : ''}
      </div>
    </div>
    <div class="matcher-opts">
      ${Q.opts.map((o, i) => `
        <button class="opt" data-i="${i}">${esc(o.label)}
          ${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</button>`).join('')}
    </div>`;

  $$('#matcher .opt').forEach(btn => btn.addEventListener('click', () => {
    answers[Q.key] = Q.opts[Number(btn.dataset.i)].value;
    step++;
    step < QUESTIONS.length ? renderQuestion() : renderResults();
  }));

  const back = $('#m-back');
  if(back) back.addEventListener('click', () => { step--; renderQuestion(); });
}

function renderResults(){
  const ranked = DESTINATIONS.map(scoreDestination).sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 3);

  $('#matcher').innerHTML = `
    <div class="matcher-head">
      <div>
        <p class="matcher-step">Your matches</p>
        <h2 class="matcher-q">Start with these three</h2>
        <p class="small muted" style="margin:.5rem 0 0;max-width:54ch">
          Scored on when you can travel, who is coming, budget, the golf you want and how far you will go.
        </p>
      </div>
      <button class="btn btn-ghost btn-sm" id="m-restart">↺ Start over</button>
    </div>
    <div class="grid grid-3">
      ${top.map((r, i) => `
        <article class="card">
          <div class="terrain" style="${terrainStyle(r.d)}">
            <span class="terrain-tag">${esc(r.d.style)}</span>
            <span class="terrain-rank">${i + 1}</span>
            <span class="terrain-flag"></span>
          </div>
          <div class="card-body">
            <div class="card-region">${esc(r.d.region)}</div>
            <h3><a href="destinations.html#${r.d.id}">${esc(r.d.name)}</a></h3>
            <p class="card-desc">${esc(r.d.tagline)}</p>
            <div class="why">${r.why.map(w => `<span>${esc(w)}</span>`).join('')}</div>
            <div class="card-foot" style="display:block">
              <div class="small muted">✈ ${esc(r.d.airport)}</div>
            </div>
            <div class="card-actions">
              ${TRIP_BY_DEST[r.d.id]
                ? `<a class="btn btn-ghost btn-sm" href="trips.html#${TRIP_BY_DEST[r.d.id].id}">The itinerary</a>` : ''}
              <a class="btn btn-primary btn-sm" href="builder.html?dest=${r.d.id}">Plan it</a>
            </div>
          </div>
        </article>`).join('')}
    </div>
    <p class="small muted" style="margin:1.4rem 0 0">
      Next best: ${ranked.slice(3, 7).map(r =>
        `<a href="destinations.html#${r.d.id}">${esc(r.d.name)}</a>`).join(' · ')}
    </p>`;

  $('#m-restart').addEventListener('click', () => {
    step = 0;
    Object.keys(answers).forEach(k => delete answers[k]);
    renderQuestion();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if($('#matcher')) renderQuestion();
});
