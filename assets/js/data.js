/* ============================================================
   Yearly Golf Trip — destination + trip dataset
   ------------------------------------------------------------
   US-only for now: the twenty golf areas worth building a trip
   around. International destinations are parked at the bottom.

   NO DOLLAR AMOUNTS. Green fees and room rates move constantly
   and go stale the moment they are written down, so cost is
   expressed as a tier ($ – $$$$) and every course links out to
   its own site for live tee times and pricing.

     tier 1 = $      budget
     tier 2 = $$     moderate
     tier 3 = $$$    premium
     tier 4 = $$$$   splurge

   Course names, architects, pars and access notes are accurate.
   Confirm access policy and rates on the course's own site.
   ============================================================ */

/* ---------- what people rate ----------
   `overall` is the headline score, rated directly rather than averaged from
   the rest — "was this a good trip?" is its own judgement, not the mean of
   eight sub-scores. The others explain it. */
const RATING_CATEGORIES = [
  {key:'overall',   label:'Overall trip',          short:'Overall',   hint:'All in — would you tell a mate to go?'},
  {key:'fun',       label:'Fun & enjoyment',       short:'Fun',       hint:'How much fun was the golf, regardless of how hard or famous it is?'},
  {key:'quality',   label:'Course quality',        short:'Quality',   hint:'The design — the holes you actually remember.'},
  {key:'depth',     label:'Course depth',          short:'Depth',     hint:'Enough good golf to fill the trip, or one course and filler?'},
  {key:'transport', label:'Getting there & around',short:'Transport', hint:'Flights, drives, and how close the courses are to each other.'},
  {key:'lodging',   label:'Lodging & amenities',   short:'Lodging',   hint:'Rooms, food, clubhouse, practice ground, caddies.'},
  {key:'value',     label:'Value',                 short:'Value',     hint:'Worth what you paid, whatever the price bracket?'},
  {key:'offcourse', label:'Off-course',            short:'Off-course',hint:'The town, the food, and whether non-golfers had a good time.'}
];
const CATEGORY_KEYS  = RATING_CATEGORIES.map(c => c.key);
const CATEGORY_BY_KEY= Object.fromEntries(RATING_CATEGORIES.map(c => [c.key, c]));
/* everything except the headline — used for "best for X" and comparisons */
const DETAIL_KEYS    = CATEGORY_KEYS.filter(k => k !== 'overall');

const US_REGIONS = ['West', 'Southwest', 'Midwest', 'Southeast', 'Northeast', 'Hawaii'];

const DESTINATIONS = [
  /* ---------------------------------------------- WEST ---- */
  {
    id:'bandon-dunes', name:'Bandon Dunes', region:'Oregon', country:'USA',
    usRegion:'West', style:'links', palette:['#8fb8d6','#c9d8b8','#7e9455','#d9cba4'],
    tagline:'Five walking-only links laid over Pacific clifftop dunes — the purest golf trip in America.',
    blurb:'A remote stretch of southern Oregon coast turned into a golf pilgrimage site. Every course is walking-only with caddies, the wind is a genuine hazard, and there is nothing to do but play, eat and play again. The archetypal buddies trip.',
    longBlurb:'The trip works because there is nothing else to do. You fly to a small airport, drive through logging country, and arrive somewhere with no traffic, no phone signal to speak of, and five golf courses arranged around a lodge. Days collapse into a rhythm: thirty-six holes, a caddie who becomes a friend by the fourth, dinner, bed, repeat. Pacific Dunes is the one that gets written about — Doak routed it along the cliff without moving much earth, and holes 4, 10, 11 and 13 are as good as anything built in the last fifty years. But Sheep Ranch is the one people talk about at dinner, because there are no bunkers and nine greens sit on the cliff edge with the Pacific behind them. Bring rain gear you actually trust, take a caddie at least once, and do not skip the short courses — the Preserve at dusk with a beer is the memory most groups come home with.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'North Bend (OTH), 30 min · Eugene (EUG), 2h45',
    gettingThere:'North Bend is tiny and weather-prone. Most people fly to Eugene or Portland and drive — budget most of a day each way.',
    priceTier:3, editorScore:9.7, access:'Resort — public, guests get priority tee times',
    goodFor:['buddies', 'architecture'],
    site:'https://bandondunesgolf.com',
    highlights:['Walking-only, caddie culture','Five full courses + two short courses','Genuine Scottish-style wind'],
    watchouts:['Long drive from any major airport','Weather swings hard, even in July'],
    courses:[
      {name:'Pacific Dunes', designer:'Tom Doak', par:71, tier:3, url:'https://bandondunesgolf.com', note:'Most celebrated of the five'},
      {name:'Bandon Dunes', designer:'David McLay Kidd', par:72, tier:3, url:'https://bandondunesgolf.com', note:'The original'},
      {name:'Old Macdonald', designer:'Doak / Urbina', par:71, tier:3, url:'https://bandondunesgolf.com', note:'Template holes, huge greens'},
      {name:'Sheep Ranch', designer:'Coore & Crenshaw', par:72, tier:3, url:'https://bandondunesgolf.com', note:'Nine greens on the cliff edge'},
      {name:'Bandon Trails', designer:'Coore & Crenshaw', par:71, tier:3, url:'https://bandondunesgolf.com', note:'Inland through forest and meadow'},
      {name:'The Preserve', designer:'Coore & Crenshaw', par:39, tier:2, url:'https://bandondunesgolf.com', note:'13-hole short course'}
    ],
    lodging:[
      {name:'Lodge Rooms', type:'Resort', tier:3},
      {name:'Chrome Lake / Grove Cottages', type:'Shared cottage', tier:2},
      {name:'Bandon town motels', type:'Budget, 25 min away', tier:1}
    ]
  },
  {
    id:'monterey', name:'Monterey Peninsula', region:'California', country:'USA',
    usRegion:'West', style:'coastal', palette:['#9dc0d4','#cbd6bb','#6f8b58','#ded4b6'],
    tagline:'Pebble Beach, Spyglass Hill and 17-Mile Drive — golf’s most photographed coastline.',
    blurb:'Expensive, crowded, and completely worth it once. Pebble’s closing stretch along Carmel Bay is the most famous finish in golf. Pair it with Spyglass and Spanish Bay on a resort package, or play the underrated municipal tracks for a fraction of the price.',
    longBlurb:'Everyone tells you Pebble is overpriced, and everyone who plays it goes quiet somewhere around the seventh tee. The famous holes really are that good: the tiny par 3 hanging over the ocean at 7, the cliff-edge 8th that Nicklaus called the best second shot in golf, and the 18th curving along the bay. What people underestimate is Spyglass, whose first five holes run through the dunes and are arguably a better stretch than anything at Pebble. The economics are brutal — a resort stay is effectively mandatory for a guaranteed tee time, and rates are the highest in North America. The counterweight is Pacific Grove Municipal, a genuine links on the same coastline for a fraction of the price, and Pasatiempo forty-five minutes north, where MacKenzie lived out his last years beside the sixth fairway.',
    season:'April – October', seasonMonths:[4,5,6,7,8,9,10],
    airport:'Monterey (MRY), 20 min · San Jose (SJC), 1h20',
    gettingThere:'Monterey has limited service; San Jose is 80 minutes and much better connected.',
    priceTier:4, editorScore:9.2, access:'Pebble tee times require a resort stay for guaranteed access',
    goodFor:['buddies', 'couples', 'architecture'],
    site:'https://www.pebblebeach.com',
    highlights:['Bucket-list par 3s at 7 and 17','Resort package guarantees Pebble access','Carmel-by-the-Sea is a real town, not a resort strip'],
    watchouts:['Highest green fees in North America','Summer marine fog can erase the views'],
    courses:[
      {name:'Pebble Beach Golf Links', designer:'Neville & Grant', par:72, tier:4, url:'https://www.pebblebeach.com', note:'Resort guests book 18 months out'},
      {name:'Spyglass Hill', designer:'Robert Trent Jones Sr.', par:72, tier:4, url:'https://www.pebblebeach.com', note:'First five holes in the dunes'},
      {name:'The Links at Spanish Bay', designer:'Jones Jr. / Watson', par:72, tier:3, url:'https://www.pebblebeach.com', note:'Bagpiper at sunset'},
      {name:'Bayonet / Black Horse', designer:'Gen. Robert McClure', par:72, tier:2, url:'https://www.bayonetblackhorse.com', note:'Best value on the peninsula'},
      {name:'Pacific Grove Municipal', designer:'Egan / Chandler', par:70, tier:1, url:'https://www.playpacificgrove.com', note:'"The poor man’s Pebble"'},
      {name:'Pasatiempo', designer:'Alister MacKenzie', par:70, tier:3, url:'https://www.pasatiempo.com', note:'MacKenzie’s own home course, 45 min north'},
      {name:'Poppy Hills', designer:'Robert Trent Jones Jr.', par:72, tier:2, url:'https://www.poppyhillsgolf.com', note:'Rebuilt in 2014, walkable'},
      {name:'Quail Lodge', designer:'Robert Muir Graves', par:71, tier:2, url:'https://www.quaillodge.com', note:'Carmel Valley sunshine when the coast is fogged in'}
    ],
    lodging:[
      {name:'The Lodge at Pebble Beach', type:'Luxury', tier:4},
      {name:'Inn at Spanish Bay', type:'Resort', tier:4},
      {name:'Monterey / Carmel hotel', type:'Mid', tier:3}
    ]
  },
  {
    id:'central-oregon', name:'Central Oregon', region:'Bend, Oregon', country:'USA',
    usRegion:'West', style:'mountain', palette:['#9db9d2','#c8d2b6','#5d7a4c','#d5cdb0'],
    tagline:'High-desert golf under the Cascades — juniper, lava rock and 300 days of sun.',
    blurb:'Bend has quietly become one of the best summer golf bases in the West: half a dozen serious courses inside 30 minutes, cool mornings at 3,600 feet, and a brewery scene that has outgrown the town. Easy to combine with Bandon on a longer Oregon loop.',
    longBlurb:'Bend has become the summer answer for west-coast golfers who find Bandon too far and Scottsdale too hot. You are at 3,600 feet in high desert: cold mornings, warm afternoons, no humidity, and lava rock instead of trees on half the holes. Juniper Preserve — everyone still calls it Pronghorn — is the headline, though Crosswater at Sunriver is the one that stays with people, running through wetlands with the Deschutes cutting across it. Tetherow is the outlier, a David McLay Kidd course built firm and fescued in a place that gets snow, and it plays like nothing else in Oregon. The town itself is the other half of the argument: thirty breweries, a river running through the middle, and enough hiking and mountain biking that a mixed group stays happy.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Redmond (RDM), 20 min · Portland (PDX), 3h drive',
    gettingThere:'Redmond is a small but reliable regional airport 20 minutes from Bend.',
    priceTier:2, editorScore:8.3, access:'Mix of public and resort-guest courses',
    goodFor:['buddies', 'couples', 'families'],
    site:'https://www.visitbend.com',
    highlights:['Cool, dry summer conditions','Short drives between courses','Genuinely good non-golf options'],
    watchouts:['Some courses are resort-guest only','Wildfire smoke can affect late summer'],
    courses:[
      {name:'Juniper Preserve (Nicklaus)', designer:'Jack Nicklaus', par:72, tier:3, url:'https://juniperpreserve.com', note:'Formerly Pronghorn; resort guests'},
      {name:'Crosswater at Sunriver', designer:'Bob Cupp', par:72, tier:3, url:'https://www.sunriverresort.com', note:'Resort guests only'},
      {name:'Tetherow', designer:'David McLay Kidd', par:72, tier:2, url:'https://www.tetherow.com', note:'Fescue and firm ground'},
      {name:'Brasada Canyons', designer:'Peter Jacobsen', par:72, tier:2, url:'https://www.brasada.com', note:'Canyon holes, big views'},
      {name:'Black Butte Ranch (Big Meadow)', designer:'Robert Muir Graves', par:72, tier:2, url:'https://www.blackbutteranch.com', note:'Classic mountain parkland'},
      {name:'Widgi Creek', designer:'Robert Muir Graves', par:72, tier:2, url:'https://www.widgi.com', note:'Right on the way to Mount Bachelor'},
      {name:'Aspen Lakes', designer:'William Overdorf', par:72, tier:2, url:'https://www.aspenlakes.com', note:'Red cinder bunkers'},
      {name:'Sunriver (Meadows)', designer:'John Fought', par:71, tier:2, url:'https://www.sunriverresort.com', note:'The accessible Sunriver course'}
    ],
    lodging:[
      {name:'Sunriver Resort', type:'Resort', tier:3},
      {name:'Downtown Bend hotel', type:'Mid', tier:2},
      {name:'Rental house', type:'Group split', tier:2}
    ]
  },
  {
    id:'palm-springs', name:'Palm Springs', region:'Coachella Valley, California', country:'USA',
    usRegion:'West', style:'desert', palette:['#d8bd94','#e6d1a6','#9c7f45','#efdfba'],
    tagline:'Pete Dye’s Stadium Course and a hundred more, guaranteed sunny from November to April.',
    blurb:'The original American winter golf escape and still one of the best-value ones. PGA West alone holds six courses, the mountains sit right behind the greens, and a two-hour drive from Los Angeles means no connecting flight for half of California.',
    longBlurb:'The valley invented the American winter golf trip and never quite lost the crown. What it offers is reliability — a hundred-plus courses, three hours from Los Angeles by car, and weather that does what it is told from November to April. PGA West is the centre of gravity, with six courses and the Stadium Course\'s island green at 17 that has ruined more scorecards than any hole in the desert. La Quinta\'s Mountain Course is the connoisseur\'s pick, cut so tightly into the rock that several tee shots play at cliff faces. The trade-off is character: a lot of the valley is housing-estate golf with palm trees and water features, and picking badly gets you a forgettable round. Stick to the names, book late-morning tee times in December, and it is the best-value big-name golf in the country.',
    season:'November – April', seasonMonths:[11,12,1,2,3,4],
    airport:'Palm Springs (PSP), 20 min · LAX, 2h30 drive',
    gettingThere:'Direct into Palm Springs, or drive out from LA in about two and a half hours.',
    priceTier:2, editorScore:8.2, access:'Public and resort daily-fee throughout',
    goodFor:['buddies', 'biggroup', 'couples'],
    site:'https://www.visitgreaterpalmsprings.com',
    highlights:['Stadium Course island green at 17','Very short drives between courses','Cheaper than Scottsdale in peak weeks'],
    watchouts:['Unplayable heat May to September','Some courses are condo-lined'],
    courses:[
      {name:'PGA West (Stadium)', designer:'Pete Dye', par:72, tier:3, url:'https://www.pgawest.com', note:'American Express host'},
      {name:'PGA West (Nicklaus Tournament)', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.pgawest.com', note:'Fairer than the Stadium'},
      {name:'La Quinta Resort (Mountain)', designer:'Pete Dye', par:72, tier:2, url:'https://www.laquintaresort.com', note:'Holes cut into the rock'},
      {name:'Indian Wells (Celebrity)', designer:'Clive Clark', par:72, tier:2, url:'https://www.indianwellsgolfresort.com', note:'Waterfalls and flowers'},
      {name:'Desert Willow (Firecliff)', designer:'Hurdzan / Fry', par:72, tier:2, url:'https://www.desertwillow.com', note:'Best municipal in the valley'},
      {name:'SilverRock', designer:'Arnold Palmer', par:72, tier:2, url:'https://www.silverrock.org', note:'Good value, big mountain backdrop'},
      {name:'PGA West (Greg Norman)', designer:'Greg Norman', par:72, tier:2, url:'https://www.pgawest.com', note:'The quiet one of the six'},
      {name:'Classic Club', designer:'Arnold Palmer', par:72, tier:2, url:'https://www.classicclubgolf.com', note:'Former Bob Hope host'},
      {name:'Westin Mission Hills (Pete Dye)', designer:'Pete Dye', par:70, tier:2, url:'https://www.westinmissionhillsgolf.com', note:'Dye at his most playable'},
      {name:'Escena', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.escenagolf.com', note:'Closest to the airport'},
      {name:'Terra Lago (North)', designer:'Ted Robinson', par:72, tier:1, url:'https://www.golfterralago.com', note:'Good value up in Indio'}
    ],
    lodging:[
      {name:'La Quinta Resort & Club', type:'Resort', tier:3},
      {name:'Indian Wells hotel', type:'Mid', tier:2},
      {name:'Rental home with pool', type:'Group split', tier:2}
    ]
  },

  /* ----------------------------------------- SOUTHWEST ---- */
  {
    id:'scottsdale', name:'Scottsdale', region:'Arizona', country:'USA',
    usRegion:'Southwest', style:'desert', palette:['#d6b98f','#e3cfa4','#a08348','#eddcb8'],
    tagline:'Two hundred courses, guaranteed winter sunshine, and the loudest hole in golf.',
    blurb:'The easiest golf trip to organise in America: direct flights, endless tee times, short drives, and reliable November-to-April weather. Not the most soulful golf on this list, but unbeatable for a large group that wants sun, steak and 36 holes a day.',
    longBlurb:'No destination on this list is easier to organise. Direct flights land at Sky Harbor from almost everywhere, the courses are twenty minutes apart, and there are enough tee times that a group of twelve can book late and still play well. TPC Scottsdale\'s Stadium Course is worth doing once purely for the 16th, a par 3 ringed by grandstands that turns into the loudest hole in golf for one week in February and remains an oddly thrilling amphitheatre the rest of the year. The better golf is at We-Ko-Pa, out on tribal land with no houses anywhere and two courses that are walkable — rare in the desert. What Scottsdale gives up is soul: this is target golf on manufactured corridors, and if your group cares about ground game and firm turf, Bandon and the Sandhills will ruin it for you.',
    season:'November – April', seasonMonths:[11,12,1,2,3,4],
    airport:'Phoenix Sky Harbor (PHX), 25 min',
    gettingThere:'Phoenix is a major hub with direct flights from almost everywhere, 25 minutes from the courses.',
    priceTier:2, editorScore:8.4, access:'Almost entirely public / resort daily-fee',
    goodFor:['buddies', 'biggroup'],
    site:'https://www.experiencescottsdale.com',
    highlights:['Easiest logistics of any destination here','Huge range of price points','Nightlife actually exists'],
    watchouts:['Peak-season rates triple','Target golf — not everyone’s taste'],
    courses:[
      {name:'TPC Scottsdale (Stadium)', designer:'Weiskopf / Morrish', par:71, tier:3, url:'https://tpc.com/scottsdale', note:'The 16th amphitheatre'},
      {name:'We-Ko-Pa (Saguaro)', designer:'Coore & Crenshaw', par:71, tier:2, url:'https://www.wekopa.com', note:'Walkable, no houses'},
      {name:'We-Ko-Pa (Cholla)', designer:'Scott Miller', par:72, tier:2, url:'https://www.wekopa.com', note:'Big desert views'},
      {name:'Troon North (Monument)', designer:'Weiskopf / Morrish', par:72, tier:3, url:'https://www.troonnorthgolf.com', note:'Boulder-strewn classic'},
      {name:'Grayhawk (Raptor)', designer:'Tom Fazio', par:72, tier:3, url:'https://www.grayhawkgolf.com', note:'NCAA championship host'},
      {name:'Boulders Resort (South)', designer:'Jay Morrish', par:71, tier:2, url:'https://www.theboulders.com', note:'Granite outcrops everywhere'},
      {name:'Talking Stick (North)', designer:'Coore & Crenshaw', par:70, tier:2, url:'https://www.talkingstickgolfclub.com', note:'Flat, wide, and the thinking golfer’s pick'},
      {name:'Papago Golf Course', designer:'William F. Bell', par:72, tier:1, url:'https://www.papagogolfcourse.net', note:'Best muni in Phoenix'},
      {name:'Ak-Chin Southern Dunes', designer:'Schmidt / Curley', par:72, tier:2, url:'https://www.southerndunesgolf.com', note:'Links-ish, 40 min south'},
      {name:'Quintero', designer:'Rees Jones', par:72, tier:2, url:'https://www.quinterogolf.com', note:'Worth the hour drive north'}
    ],
    lodging:[
      {name:'Four Seasons Troon North', type:'Luxury', tier:4},
      {name:'Old Town Scottsdale hotel', type:'Mid', tier:3},
      {name:'Rental house with pool', type:'Group split', tier:1}
    ]
  },
  {
    id:'las-vegas', name:'Las Vegas', region:'Nevada', country:'USA',
    usRegion:'Southwest', style:'desert', palette:['#d3b892','#e4cfa2','#8d7440','#eddcb6'],
    tagline:'Shadow Creek, Wynn and Cascata — the most extravagant golf in the country, ten minutes from the Strip.',
    blurb:'Nowhere else lets you play a Tom Fazio fantasy course in the morning and be at dinner on the Strip by seven. The marquee courses are eye-wateringly expensive and tied to casino stays; the Paiute courses out in the desert are the value play and arguably the better golf.',
    longBlurb:'The pitch is simple: play a Tom Fazio fantasy course carved out of raw desert in the morning, and be at dinner on the Strip by seven. Shadow Creek is the reason people come — a fully invented landscape with 20,000 imported trees, a creek, and no visible desert from anywhere on the property. It costs what a weekend costs elsewhere and requires an MGM stay, and the limo that collects you is included, which tells you everything about the operation. The honest recommendation is to do that once and spend the rest of the trip at Paiute, forty minutes north on tribal land, where Pete Dye built three courses in genuine desert for a fifth of the price. Vegas also solves the non-golfer problem better than anywhere on this list, which is why it works for mixed groups that would struggle at Bandon.',
    season:'October – May', seasonMonths:[10,11,12,1,2,3,4,5],
    airport:'Harry Reid (LAS), 15 min to most courses',
    gettingThere:'One of the best-connected airports in the country, 15 minutes from most tee times.',
    priceTier:3, editorScore:8.0, access:'Shadow Creek and Wynn require a linked resort stay',
    goodFor:['buddies', 'biggroup', 'couples'],
    site:'https://www.visitlasvegas.com',
    highlights:['Zero logistics — everything is 20 minutes away','Non-golfers are entertained','Late-season warmth when the Midwest is frozen'],
    watchouts:['Marquee green fees are the highest in the US','Not a walking destination'],
    courses:[
      {name:'Shadow Creek', designer:'Tom Fazio', par:72, tier:4, nolink:true, note:'MGM resort guests only'},
      {name:'Wynn Golf Club', designer:'Fazio / Wynn', par:70, tier:4, url:'https://www.wynnlasvegas.com', note:'Behind the Wynn hotel'},
      {name:'Cascata', designer:'Rees Jones', par:72, tier:4, nolink:true, note:'Stream runs through the clubhouse'},
      {name:'Bali Hai', designer:'Schmidt / Curley', par:71, tier:2, url:'https://www.balihaigolfclub.com', note:'On the Strip itself'},
      {name:'Paiute (Snow Mountain)', designer:'Pete Dye', par:72, tier:2, url:'https://lvpaiutegolf.com', note:'Best value in the valley'},
      {name:'Rio Secco', designer:'Rees Jones', par:72, tier:2, nolink:true, note:'Butch Harmon’s home base'},
      {name:'Paiute (Sun Mountain)', designer:'Pete Dye', par:72, tier:2, url:'https://lvpaiutegolf.com', note:'The second Paiute course'},
      {name:'Paiute (Wolf)', designer:'Pete Dye', par:72, tier:2, url:'https://lvpaiutegolf.com', note:'Longest of the three'},
      {name:'Reflection Bay', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.reflectionbaygolf.com', note:'On Lake Las Vegas'},
      {name:'Angel Park (Mountain)', designer:'Arnold Palmer', par:71, tier:1, url:'https://www.angelpark.com', note:'Cheap, close, and fine'},
      {name:'Boulder Creek', designer:'Mark Rathert', par:72, tier:1, url:'https://www.bouldercreekgc.com', note:'Best value in the valley'}
    ],
    lodging:[
      {name:'Bellagio / Wynn', type:'Luxury', tier:3},
      {name:'Mid-Strip resort', type:'Mid', tier:2},
      {name:'Off-Strip hotel', type:'Budget', tier:1}
    ]
  },

  /* ------------------------------------------- MIDWEST ---- */
  {
    id:'sand-valley', name:'Sand Valley', region:'Wisconsin', country:'USA',
    usRegion:'Midwest', style:'sand', palette:['#a9c4d8','#d5d3b0','#7f9a55','#e0d7b8'],
    tagline:'Central Wisconsin sand barrens, four courses, and the resurrected Lido.',
    blurb:'Same family behind Bandon, same formula: buy remote sandy land, hire the best architects, let the ground dictate the golf. The Lido — a hole-for-hole recreation of C.B. Macdonald’s lost masterpiece — makes this a genuine architecture pilgrimage.',
    longBlurb:'The Keiser family found sand barrens in central Wisconsin, hired the same architects who built Bandon, and let the ground dictate everything. Mammoth Dunes is enormously wide and makes average golfers feel brilliant; Sand Valley is tighter and cleverer; Sedge Valley is a par 68 that plays like English heathland and has become the critics\' favourite. The reason to make the trip now is The Lido — a hole-for-hole recreation of C.B. Macdonald\'s 1917 masterpiece on Long Island, lost to the Navy in the 1940s and rebuilt here from aerial photographs and a surveying student\'s drawings. Playing it is the closest thing golf has to time travel. Access is guest-limited and changes by season, so ask when you book the room rather than after you arrive.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Central Wisconsin (CWA), 45 min · Madison (MSN), 1h45',
    gettingThere:'Central Wisconsin is a small regional airport; most people fly to Madison or Milwaukee and drive two hours.',
    priceTier:2, editorScore:9.1, access:'Resort — public; The Lido is guest-access limited',
    goodFor:['buddies', 'architecture'],
    site:'https://www.sandvalley.com',
    highlights:['The Lido recreation','Sedge Valley’s low-par heathland design','Best per-round value of the big US resorts'],
    watchouts:['Lido access needs planning','Mosquitoes in early summer'],
    courses:[
      {name:'Mammoth Dunes', designer:'David McLay Kidd', par:73, tier:2, url:'https://www.sandvalley.com', note:'Enormously wide and fun'},
      {name:'Sand Valley', designer:'Coore & Crenshaw', par:72, tier:2, url:'https://www.sandvalley.com', note:'The original'},
      {name:'Sedge Valley', designer:'Tom Doak', par:68, tier:2, url:'https://www.sandvalley.com', note:'Short par 68, heathland feel'},
      {name:'The Lido', designer:'Doak (Macdonald recreation)', par:72, tier:3, url:'https://www.sandvalley.com', note:'Limited access — ask when booking'},
      {name:'The Sandbox', designer:'Coore & Crenshaw', par:34, tier:1, url:'https://www.sandvalley.com', note:'17-hole short course'}
    ],
    lodging:[
      {name:'Sand Valley Lodge', type:'Resort', tier:3},
      {name:'Cottages (4–8 guests)', type:'Group split', tier:2}
    ]
  },
  {
    id:'kohler', name:'Kohler', region:'Wisconsin', country:'USA',
    usRegion:'Midwest', style:'links', palette:['#a3bed4','#cdd5b5','#728f52','#dad2b2'],
    tagline:'Whistling Straits and Blackwolf Run — Pete Dye’s Lake Michigan spectacle.',
    blurb:'Whistling Straits looks like Ireland and was built out of a flat lakeside airfield, complete with imported sheep. Add the two Blackwolf Run courses ten minutes inland — and Erin Hills an hour south — and it is four or five championship rounds from one very comfortable base.',
    longBlurb:'Pete Dye built Whistling Straits on a flat lakeside airfield, trucked in a million cubic yards of sand, and produced something that photographs like County Clare. The illusion is total until you notice the scale — over a thousand bunkers, most of which no golfer will ever enter, put there because Dye thought they looked right from the fairway. It has hosted three PGA Championships and the 2021 Ryder Cup. The Straits requires walking with a caddie, which is the correct way to see it. Ten minutes inland, Blackwolf Run\'s River Course is quieter, prettier, and by some accounts the better golf: it winds along the Sheboygan through hardwoods, and hosted the 1998 US Women\'s Open that Se Ri Pak won barefoot out of the water. Erin Hills, an hour south, makes a fourth round worth the detour.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Milwaukee (MKE), 1h · Chicago O’Hare (ORD), 2h30',
    gettingThere:'Milwaukee is an easy hour away; Chicago adds another ninety minutes.',
    priceTier:3, editorScore:8.7, access:'Resort — public, guests get preferred rates',
    goodFor:['buddies', 'architecture', 'couples'],
    site:'https://www.destinationkohler.com',
    highlights:['2021 Ryder Cup venue','Caddie-required walking at the Straits','American Club is a genuinely great hotel'],
    watchouts:['Over 1,000 bunkers on the Straits','Lake wind can be savage in spring'],
    courses:[
      {name:'Whistling Straits (Straits)', designer:'Pete Dye', par:72, tier:4, url:'https://www.destinationkohler.com', note:'Walking with caddie required'},
      {name:'Whistling Straits (Irish)', designer:'Pete Dye', par:72, tier:3, url:'https://www.destinationkohler.com', note:'Inland sibling'},
      {name:'Blackwolf Run (River)', designer:'Pete Dye', par:72, tier:3, url:'https://www.destinationkohler.com', note:'US Women’s Open host'},
      {name:'Blackwolf Run (Meadow Valleys)', designer:'Pete Dye', par:72, tier:2, url:'https://www.destinationkohler.com', note:'Underrated'},
      {name:'Erin Hills', designer:'Hurdzan / Fry / Whitten', par:72, tier:3, url:'https://www.erinhills.com', note:'2017 US Open, 1h south'}
    ],
    lodging:[
      {name:'The American Club', type:'Luxury', tier:4},
      {name:'Inn on Woodlake', type:'Mid', tier:3}
    ]
  },
  {
    id:'northern-michigan', name:'Northern Michigan', region:'Traverse City, Michigan', country:'USA',
    usRegion:'Midwest', style:'sand', palette:['#a5c1d5','#cfd6b4','#6f8d51','#dbd2b1'],
    tagline:'Arcadia Bluffs above Lake Michigan and Doak’s reversible Loop, ninety minutes apart.',
    blurb:'The Midwest’s best summer golf region and still badly underrated nationally. Arcadia Bluffs sits 200 feet above the lake, Forest Dunes holds the only reversible course in America, and the whole area turns into a cherry-and-wine holiday town from June onward.',
    longBlurb:'The Midwest\'s best summer golf is up here and most of the country has still not noticed. Arcadia Bluffs sits two hundred feet above Lake Michigan with a clubhouse that looks like it was airlifted from Ireland, and on a clear evening the view down the coast is the single best thing in Michigan golf. Its South Course is a completely different animal — a flat, formal homage to Chicago Golf Club that divides opinion sharply. Ninety minutes east at Forest Dunes is The Loop, Tom Doak\'s reversible course: eighteen greens, two routings, playing clockwise one day and anticlockwise the next. It sounds like a gimmick and is genuinely one of the most interesting things built this century. The catch is the season, which runs May to October and gets busy the moment the cherries ripen.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Traverse City (TVC), 30 min · Grand Rapids (GRR), 2h30',
    gettingThere:'Traverse City is easy in summer, thinner the rest of the year — and the courses are spread over a two-hour radius.',
    priceTier:2, editorScore:8.5, access:'All listed courses are public / resort daily-fee',
    goodFor:['buddies', 'families', 'couples'],
    site:'https://www.traversecity.com',
    highlights:['The Loop plays a different routing each day','Lake Michigan bluff views','Works as a family holiday too'],
    watchouts:['Season is short — book July and August early','Courses are spread over a 2-hour radius'],
    courses:[
      {name:'Arcadia Bluffs (Bluffs)', designer:'Smith / Henderson', par:72, tier:3, url:'https://www.arcadiabluffs.com', note:'200 feet above the lake'},
      {name:'Arcadia Bluffs (South)', designer:'Dana Fry', par:72, tier:2, url:'https://www.arcadiabluffs.com', note:'Chicago Golf Club homage'},
      {name:'Forest Dunes', designer:'Tom Weiskopf', par:72, tier:2, url:'https://www.forestdunesgolf.com', note:'Sand and pine'},
      {name:'The Loop (Black / Red)', designer:'Tom Doak', par:70, tier:2, url:'https://www.forestdunesgolf.com', note:'Reversible — two courses, one plot'},
      {name:'Bay Harbor (Links / Quarry)', designer:'Arthur Hills', par:72, tier:2, url:'https://www.boyne.com', note:'Clifftop quarry holes'},
      {name:'The Highlands (Arthur Hills)', designer:'Arthur Hills', par:72, tier:2, url:'https://www.boyne.com', note:'Best value up north'},
      {name:'Treetops (Threetops)', designer:'Tom Fazio', par:27, tier:2, url:'https://www.treetops.com', note:'The best short course in the Midwest'},
      {name:'Treetops (Masterpiece)', designer:'Robert Trent Jones Sr.', par:71, tier:2, url:'https://www.treetops.com', note:'Enormous elevation change'},
      {name:'Crystal Downs', designer:'MacKenzie & Maxwell', par:70, private:true, note:'Private — one of the best in America'},
      {name:'Kingsley Club', designer:'Mike DeVries', par:71, private:true, note:'Private — a cult favourite'}
    ],
    lodging:[
      {name:'Forest Dunes cottage', type:'Group split', tier:2},
      {name:'Traverse City hotel', type:'Mid', tier:2},
      {name:'Boyne resort lodge', type:'Resort', tier:2}
    ]
  },
  {
    id:'nebraska-sandhills', name:'Nebraska Sandhills', region:'Nebraska', country:'USA',
    usRegion:'Midwest', style:'sand', palette:['#b3c8d6','#dcd6ae','#96a055','#e6dcb6'],
    tagline:'The purest sand golf in America, four hours from the nearest city and worth every mile.',
    blurb:'Sand Hills Golf Club changed modern architecture — Coore and Crenshaw found 18 holes lying in the dunes and barely moved dirt. It is private, but the Prairie Club and Dismal River put the same landscape within reach. This is the trip for people who care about ground, not amenities.',
    longBlurb:'In 1995 Coore and Crenshaw walked 8,000 acres of Nebraska dunes, identified 130 potential holes lying naturally in the ground, and picked eighteen. Sand Hills Golf Club cost almost nothing to build and changed how a generation of architects thought about their job. It is intensely private and you will not play it. What you can play is very nearly as good: The Prairie Club\'s Dunes course is fully public and routed through the same landscape, and Dismal River holds a Doak and a Nicklaus within a few hundred yards of each other. The trip is a commitment — the nearest useful airport is hours away and the drive from Denver is five — but the payoff is golf with no houses, no carts, no phone signal, and no other groups in sight. Go for the ground, not the amenities.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'North Platte (LBF) · Valentine (VTN) · Denver (DEN), 5h drive',
    gettingThere:'There is no easy way in. Fly to North Platte or Valentine on a small plane, or drive five hours from Denver.',
    priceTier:2, editorScore:9.0, access:'Sand Hills GC and CapRock are PRIVATE — Prairie Club is public',
    goodFor:['buddies', 'architecture'],
    site:'https://theprairieclub.com',
    highlights:['Prairie Club Dunes is fully public','Dismal River has two top-100 courses','No crowds, no houses, no phone signal'],
    watchouts:['Genuinely remote — plan the drive carefully','The famous course is private; set expectations'],
    courses:[
      {name:'Sand Hills Golf Club', designer:'Coore & Crenshaw', par:71, private:true, note:'Private — member introduction only'},
      {name:'The Prairie Club (Dunes)', designer:'Tom Lehman / Chris Brands', par:73, tier:2, url:'https://theprairieclub.com', note:'Public, and superb'},
      {name:'The Prairie Club (Pines)', designer:'Graham Marsh', par:72, tier:2, url:'https://theprairieclub.com', note:'Canyon-edge holes'},
      {name:'Dismal River (White)', designer:'Tom Doak', par:71, tier:2, url:'https://www.dismalriver.com', note:'Member / guest access'},
      {name:'Dismal River (Red)', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.dismalriver.com', note:'Member / guest access'},
      {name:'CapRock Ranch', designer:'Tom Doak', par:71, private:true, note:'Private — canyon setting'}
    ],
    lodging:[
      {name:'The Prairie Club lodge', type:'Resort', tier:2},
      {name:'Dismal River cabin', type:'Resort', tier:2}
    ]
  },

  /* ----------------------------------------- SOUTHEAST ---- */
  {
    id:'pinehurst', name:'Pinehurst', region:'North Carolina', country:'USA',
    usRegion:'Southeast', style:'sandhills', palette:['#b9cfd8','#d8d2b4','#8a9a5b','#e2d7b6'],
    tagline:'Ten courses, one village, and the turtleback greens of No. 2.',
    blurb:'The Sandhills resort that basically invented American golf tourism. No. 2 is the headline — restored to sandy waste areas and wire grass — but the value is in stacking four rounds across No. 4, No. 10, Pine Needles and Mid Pines without moving your car.',
    longBlurb:'Pinehurst invented American golf tourism and then spent a century refining it. The village is walkable, the caddie program is real, and there are nine resort courses plus a handful of Ross gems minutes away. No. 2 is the point: Coore and Crenshaw stripped out the rough in 2010 and put back the sandy scrub and wire grass Ross intended, and it is now the permanent home of the US Open. The greens are the whole test — crowned, firm, and unforgiving of any approach that is not perfect, and most visitors lose several balls off the sides without ever hitting a bad shot. The smart trip stacks the value courses around it: Mid Pines and Southern Pines are both Ross designs restored to a very high standard for a fraction of the No. 2 rate, and The Cradle, nine short holes by the clubhouse, is the most fun anyone has all week.',
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Raleigh-Durham (RDU), 1h15 · Fayetteville (FAY), 50 min',
    gettingThere:'Raleigh-Durham is a good airport and a straightforward 75-minute drive.',
    priceTier:3, editorScore:9.3, access:'Resort — public, stay-and-play packages',
    goodFor:['buddies', 'architecture', 'couples'],
    site:'https://www.pinehurst.com',
    highlights:['Nine resort courses plus The Cradle','Walkable village with caddie program','Best value shoulder seasons in US golf'],
    watchouts:['Summer heat and humidity are brutal','No. 2 greens punish anything below scratch'],
    courses:[
      {name:'Pinehurst No. 2', designer:'Donald Ross', par:70, tier:4, url:'https://www.pinehurst.com', note:'Permanent US Open venue'},
      {name:'Pinehurst No. 4', designer:'Gil Hanse', par:72, tier:3, url:'https://www.pinehurst.com', note:'Sandy, wild, fun'},
      {name:'Pinehurst No. 10', designer:'Tom Doak', par:71, tier:3, url:'https://www.pinehurst.com', note:'Newest, on old sand-mine land'},
      {name:'Mid Pines', designer:'Donald Ross', par:72, tier:2, url:'https://midpinesinn.com', note:'Ross gem, five minutes away'},
      {name:'Pine Needles', designer:'Donald Ross', par:71, tier:2, url:'https://www.pineneedleslodge.com', note:'US Women’s Open host'},
      {name:'The Cradle', designer:'Gil Hanse', par:27, tier:1, url:'https://www.pinehurst.com', note:'Nine short holes, replay all day'},
      {name:'Pinehurst No. 8', designer:'Tom Fazio', par:72, tier:2, url:'https://www.pinehurst.com', note:'Centennial course, out on its own'},
      {name:'Pinehurst No. 9', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.pinehurst.com', note:'Formerly National Golf Club'},
      {name:'Southern Pines Golf Club', designer:'Donald Ross / Kyle Franz', par:71, tier:2, url:'https://www.pineneedleslodge.com', note:'Superb 2021 restoration'},
      {name:'Tobacco Road', designer:'Mike Strantz', par:71, tier:2, url:'https://www.tobaccoroadgolf.com', note:'Wild, divisive, unforgettable'},
      {name:'Dormie Club', designer:'Coore & Crenshaw', par:71, private:true, note:'Private — Coore & Crenshaw in the sandhills'}
    ],
    lodging:[
      {name:'The Carolina Hotel', type:'Resort', tier:3},
      {name:'The Manor Inn', type:'Mid resort', tier:2},
      {name:'Village rental house', type:'Group split', tier:2}
    ]
  },
  {
    id:'kiawah', name:'Kiawah Island', region:'South Carolina', country:'USA',
    usRegion:'Southeast', style:'coastal', palette:['#9fc3d3','#cfd6b6','#79955a','#ded5b4'],
    tagline:'The Ocean Course — ten holes on the Atlantic and the hardest resort round in America.',
    blurb:'Pete Dye built the Ocean Course for the 1991 Ryder Cup and it has been terrifying resort golfers ever since. The rest of the island offers four gentler courses, proper beach-holiday infrastructure, and Charleston 45 minutes up the road.',
    longBlurb:'Pete Dye was given a strip of barrier island and told to build a Ryder Cup venue in time for 1991, and what he produced is the hardest resort course in America. Ten holes run along the Atlantic and every one of them is exposed — the wind can swing forty degrees between morning and afternoon and change the course by four clubs. Dye raised the entire course so players could see the ocean, which also removed any shelter. It has since hosted two PGA Championships. What makes Kiawah work as a trip rather than an ordeal is everything around it: four gentler courses on the same island, proper beach-holiday infrastructure for anyone not playing, and Charleston forty-five minutes away with one of the best restaurant scenes in the country. Play the Ocean Course on day three, not day one.',
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Charleston (CHS), 55 min',
    gettingThere:'Charleston is well connected and just under an hour from the island.',
    priceTier:3, editorScore:8.8, access:'Ocean Course prioritises resort guests',
    goodFor:['families', 'couples', 'buddies'],
    site:'https://kiawahresort.com',
    highlights:['Ryder Cup and PGA Championship history','Works as a family trip, not just a buddies trip','Charleston food scene nearby'],
    watchouts:['Ocean Course in wind is genuinely punishing','Hurricane season overlaps the autumn window'],
    courses:[
      {name:'The Ocean Course', designer:'Pete Dye', par:72, tier:4, url:'https://kiawahresort.com', note:'Walking-only before noon'},
      {name:'Cassique', designer:'Tom Watson', par:72, private:true, note:'Private — member or club-to-club only'},
      {name:'Turtle Point', designer:'Jack Nicklaus', par:72, tier:2, url:'https://kiawahresort.com', note:'Three holes on the beach'},
      {name:'Osprey Point', designer:'Tom Fazio', par:72, tier:2, url:'https://kiawahresort.com', note:'Lagoons and maritime forest'},
      {name:'Oak Point', designer:'Clyde Johnston', par:72, tier:2, url:'https://kiawahresort.com', note:'Best value on the island'}
    ],
    lodging:[
      {name:'The Sanctuary', type:'Luxury', tier:4},
      {name:'Island villa rental', type:'Group split', tier:2},
      {name:'Mainland hotel (20 min)', type:'Budget', tier:2}
    ]
  },
  {
    id:'myrtle-beach', name:'Myrtle Beach', region:'South Carolina', country:'USA',
    usRegion:'Southeast', style:'resort', palette:['#a8c8dc','#d4d5b4','#7d9a58','#e4dab8'],
    tagline:'Eighty courses on sixty miles of coast — the highest-volume golf trip in America, and the cheapest.',
    blurb:'The Grand Strand is where American buddies-trip golf was industrialised: package deals, cart girls, and a tee time every seven minutes. Ignore the snobbery — Caledonia and True Blue are genuinely excellent, and nowhere else lets twelve people play four rounds without anyone remortgaging.',
    longBlurb:'Sixty miles of coast, roughly eighty courses, and an entire local economy built around getting groups of eight onto a tee sheet efficiently. The snobbery about Myrtle Beach is half-earned — plenty of the courses are forgettable and the package machinery can feel industrial — but the top end is genuinely excellent and nowhere else in America delivers four good rounds at this price. Mike Strantz is the reason to come: Caledonia is routed through an old rice plantation under live oaks and is one of the most beautiful golf courses in the country, and True Blue ten minutes away is its wilder, sandier opposite. Book through a package operator rather than course by course, put the two Strantz courses back to back in the middle of the trip, and ignore anyone who tells you this is not a real golf destination.',
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Myrtle Beach (MYR), 20 min · Charleston (CHS), 2h',
    gettingThere:'Myrtle Beach has plenty of seasonal direct service and the courses start 20 minutes away.',
    priceTier:1, editorScore:8.0, access:'Entirely public — book through a package operator',
    goodFor:['biggroup', 'buddies'],
    site:'https://www.visitmyrtlebeach.com',
    highlights:['Unbeatable cost per round','Big groups are the norm, not a problem','Two Mike Strantz courses within ten minutes'],
    watchouts:['Course quality varies enormously — pick carefully','Spring package season gets very crowded'],
    courses:[
      {name:'Caledonia Golf & Fish Club', designer:'Mike Strantz', par:70, tier:2, url:'https://www.caledoniagolfandfishclub.com', note:'The best on the Strand'},
      {name:'True Blue', designer:'Mike Strantz', par:72, tier:2, url:'https://truebluegolf.com', note:'Wild, sandy, Strantz’s other one'},
      {name:'The Dunes Golf & Beach Club', designer:'Robert Trent Jones Sr.', par:72, tier:2, url:'https://www.thedunesclub.net', note:'Limited access — check packages'},
      {name:'Tidewater', designer:'Ken Tomlinson', par:72, tier:2, url:'https://www.tidewatergolf.com', note:'Marsh and ocean views'},
      {name:'Barefoot Resort (Love)', designer:'Davis Love III', par:72, tier:2, url:'https://www.barefootgolf.com', note:'Plantation-ruin theming'},
      {name:'TPC Myrtle Beach', designer:'Tom Fazio', par:72, tier:2, url:'https://www.tpcmyrtlebeach.com', note:'Best conditioned on the Strand'},
      {name:'King’s North at Myrtle Beach National', designer:'Arnold Palmer', par:72, tier:2, url:'https://www.mbn.com', note:'The Gambler hole'},
      {name:'Grande Dunes Resort Club', designer:'Roger Rulewich', par:72, tier:2, url:'https://www.grandedunesgolf.com', note:'Above the Intracoastal'},
      {name:'Pine Lakes', designer:'Robert White', par:71, tier:2, url:'https://www.pinelakes.com', note:'The Strand’s original, 1927'},
      {name:'Man O’War', designer:'Dan Maples', par:72, tier:1, url:'https://www.mbn.com', note:'Island golf, water on every hole'},
      {name:'Pawleys Plantation', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.pawleysplantation.com', note:'Marsh holes on the back'}
    ],
    lodging:[
      {name:'Oceanfront condo', type:'Group split', tier:1},
      {name:'Marina Inn at Grande Dunes', type:'Mid', tier:2},
      {name:'Beach resort hotel', type:'Mid', tier:2}
    ]
  },
  {
    id:'hilton-head', name:'Hilton Head Island', region:'South Carolina', country:'USA',
    usRegion:'Southeast', style:'coastal', palette:['#9cc0d2','#ccd4b2','#6f8d54','#dbd2b0'],
    tagline:'Harbour Town’s lighthouse finish, live oaks, and the most relaxed golf week in the Lowcountry.',
    blurb:'Pete Dye and a young Jack Nicklaus built Harbour Town small and tight on purpose, as an antidote to the era’s bulldozed monsters — tiny greens, trees in the way, and a closing hole along Calibogue Sound. The island around it is bike paths and beach houses, which makes this the easiest sell to a group that includes non-golfers.',
    longBlurb:'Harbour Town was a deliberate rebuke. In 1969, when American architecture meant enormous greens and heroic carries, Pete Dye and a 29-year-old Jack Nicklaus built something small, tight and awkward, with tiny greens tucked behind live oaks and railroad-tie bulkheads. It was immediately loved, and the RBC Heritage has been played there every April since. The closing hole runs along Calibogue Sound to a green beneath the striped lighthouse and is one of the most recognisable finishes in golf. The island itself is the other half of the appeal: bike paths instead of roads, beach houses under moss-hung oaks, and a genuinely relaxed pace that makes this the easiest sell on this list to a group containing people who do not play. Palmetto Bluff, thirty minutes inland, is worth the drive.',
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Hilton Head (HHH), 15 min · Savannah (SAV), 45 min',
    gettingThere:'Hilton Head’s own airport is small; Savannah is 45 minutes and far cheaper.',
    priceTier:2, editorScore:8.4, access:'Resort daily-fee; Harbour Town books well ahead',
    goodFor:['families', 'couples', 'biggroup'],
    site:'https://www.seapines.com',
    highlights:['RBC Heritage host every April','Palmetto Bluff is worth the 30-minute drive','Bike everywhere — no car needed once you arrive'],
    watchouts:['Harbour Town rates spike around the tournament','Island traffic in peak summer'],
    courses:[
      {name:'Harbour Town Golf Links', designer:'Pete Dye / Jack Nicklaus', par:71, tier:3, url:'https://www.seapines.com', note:'The lighthouse 18th'},
      {name:'May River at Palmetto Bluff', designer:'Jack Nicklaus', par:72, tier:3, url:'https://www.palmettobluff.com', note:'Walking with caddies'},
      {name:'Atlantic Dunes', designer:'Davis Love III', par:72, tier:2, url:'https://www.seapines.com', note:'Sea Pines’ rebuilt third course'},
      {name:'Heron Point', designer:'Pete Dye', par:72, tier:2, url:'https://www.seapines.com', note:'Dye at his most playable'},
      {name:'Palmetto Dunes (RTJ Oceanfront)', designer:'Robert Trent Jones Sr.', par:72, tier:2, url:'https://www.palmettodunes.com', note:'The only oceanfront hole on the island'},
      {name:'Palmetto Dunes (George Fazio)', designer:'George Fazio', par:70, tier:2, url:'https://www.palmettodunes.com', note:'The toughest of the Palmetto Dunes three'},
      {name:'Oyster Reef', designer:'Rees Jones', par:72, tier:2, url:'https://www.golfisland.com', note:'Par-3 6th over Port Royal Sound'},
      {name:'Colleton River (Dye)', designer:'Pete Dye', par:72, private:true, note:'Private — across the bridge in Bluffton'}
    ],
    lodging:[
      {name:'Inn & Club at Harbour Town', type:'Luxury', tier:3},
      {name:'Sea Pines villa', type:'Group split', tier:2},
      {name:'Island hotel', type:'Mid', tier:2}
    ]
  },
  {
    id:'sea-island', name:'Sea Island', region:'Georgia', country:'USA',
    usRegion:'Southeast', style:'coastal', palette:['#a2c4d4','#d0d5b2','#748f52','#dcd4b2'],
    tagline:'Seaside’s wind-blown links, Plantation’s oaks, and the most polished service in American golf.',
    blurb:'St Simons Island is where a large share of the PGA Tour actually lives, and it shows: three immaculate courses, a performance centre that half the Tour uses, and a level of hospitality that makes the price make sense. Seaside plays like a links when the wind comes off the Atlantic.',
    longBlurb:'St Simons Island is where a large slice of the PGA Tour actually lives, and the standard of everything reflects that. Seaside is the headline: a Colt and Alison design from 1929, rebuilt by Tom Fazio, running along the marsh and the Atlantic with almost no trees, so the wind does the defending. In a stiff easterly it plays like a links and the same holes can be four clubs different from one day to the next. Plantation, rebuilt in 2019, is the inland counterweight under enormous live oaks. What sets Sea Island apart is the service — the Cloister and the Lodge operate at a level that makes the prices defensible, and the Golf Performance Center is open to guests and used by tour professionals. It is not a buddies-trip bargain; it is a place to go when the trip itself is the occasion.',
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Brunswick (BQK), 25 min · Jacksonville (JAX), 1h20',
    gettingThere:'Brunswick is small, so most people fly into Jacksonville and drive 80 minutes.',
    priceTier:3, editorScore:8.7, access:'Resort guests and members',
    goodFor:['couples', 'families'],
    site:'https://www.seaisland.com',
    highlights:['RSM Classic host each November','Golf Performance Center is open to guests','Three courses, all walkable, all in one place'],
    watchouts:['Cloister rates are serious money','Summer is hot and buggy'],
    courses:[
      {name:'Seaside', designer:'Colt & Alison / Tom Fazio', par:70, tier:4, url:'https://www.seaisland.com', note:'Links-like in the wind'},
      {name:'Plantation', designer:'Davis Love III', par:72, tier:4, url:'https://www.seaisland.com', note:'Rebuilt in 2019'},
      {name:'Retreat', designer:'Davis Love III', par:72, tier:3, url:'https://www.seaisland.com', note:'Where the locals play'}
    ],
    lodging:[
      {name:'The Cloister', type:'Luxury', tier:4},
      {name:'The Lodge at Sea Island', type:'Luxury', tier:4},
      {name:'The Inn at Sea Island', type:'Mid', tier:2}
    ]
  },
  {
    id:'streamsong', name:'Streamsong', region:'Florida', country:'USA',
    usRegion:'Southeast', style:'sand', palette:['#b0c7d6','#dcd6b2','#8f9c58','#e6dcbb'],
    tagline:'Three big-name courses rising out of reclaimed Florida phosphate mine land.',
    blurb:'Nothing else in Florida looks like this — 200-foot sand ridges and lakes in the middle of cattle country, with Coore & Crenshaw, Doak and Hanse each given their own course. Remote by design, walkable, and a genuinely great two-night stop.',
    longBlurb:'Mosaic mined phosphate out of central Florida for decades and left behind two hundred feet of sand ridges, deep lakes and no topsoil. Rather than flatten it, the owners handed parcels to Coore and Crenshaw, Tom Doak and Gil Hanse and told them to route courses through the spoil. The result looks nothing like Florida — no palm trees, no housing, no water hazards in the conventional sense, just sand, scrub and enormous rumpled ground. Red and Blue share a clubhouse and intertwine; Black sits apart with its own building and the biggest greens most people will ever putt on. It is deliberately remote, which is either the appeal or the problem depending on your group: there is no town, no nightlife, and nothing to do between rounds but eat and talk about the golf.',
    season:'October – April', seasonMonths:[10,11,12,1,2,3,4],
    airport:'Tampa (TPA), 1h20 · Orlando (MCO), 1h30',
    gettingThere:'Tampa is a major hub, then an 80-minute drive into empty cattle country.',
    priceTier:2, editorScore:8.9, access:'Resort — public, best rates for overnight guests',
    goodFor:['buddies', 'architecture'],
    site:'https://streamsongresort.com',
    highlights:['Three top-100 US public courses in one place','Walking with caddies encouraged','Summer rates drop dramatically'],
    watchouts:['Genuinely isolated — no town nearby','Brutal in summer heat'],
    courses:[
      {name:'Streamsong Red', designer:'Coore & Crenshaw', par:72, tier:3, url:'https://streamsongresort.com', note:'Wide, rumpled, strategic'},
      {name:'Streamsong Blue', designer:'Tom Doak', par:72, tier:3, url:'https://streamsongresort.com', note:'Bigger dunes, bolder greens'},
      {name:'Streamsong Black', designer:'Gil Hanse', par:73, tier:3, url:'https://streamsongresort.com', note:'Massive greens, own clubhouse'},
      {name:'The Roundabout', designer:'Coore & Crenshaw', par:27, tier:1, url:'https://streamsongresort.com', note:'Short course by the lodge'}
    ],
    lodging:[
      {name:'The Lodge', type:'Resort', tier:3},
      {name:'The Clubhouse rooms', type:'Resort', tier:2}
    ]
  },
  {
    id:'orlando', name:'Orlando', region:'Florida', country:'USA',
    usRegion:'Southeast', style:'parkland', palette:['#a6c9d8','#cfd8ae','#6f9450','#dfd9b0'],
    tagline:'Bay Hill, Grand Cypress and fifty more — the easiest golf trip to sell to a group with families.',
    blurb:'Not the most characterful golf in America, but no destination is easier to reach or better at absorbing a mixed group. Direct flights from everywhere, villas with pools, and Streamsong ninety minutes down the road when you want the serious round.',
    longBlurb:'Orlando is not where anyone goes for architecture, and pretending otherwise misses the point. What it offers is logistics: the cheapest flights in American golf from almost any city, villas with pools that sleep eight for less than two hotel rooms, and enough non-golf that a mixed group with children stays genuinely happy. Bay Hill is the one with history — Arnold Palmer bought it in 1974, lived there until he died, and the Tour still plays it every March — though access requires a lodge stay. Grand Cypress is the curiosity: Nicklaus built a serious homage to the Old Course, complete with double greens, stone walls and pot bunkers, in the middle of Florida. The real move is treating Orlando as a base and driving ninety minutes to Streamsong for the round that justifies the trip.',
    season:'October – April', seasonMonths:[10,11,12,1,2,3,4],
    airport:'Orlando (MCO), 20–40 min',
    gettingThere:'Cheap direct flights from nearly anywhere, and the courses are 20 to 40 minutes out.',
    priceTier:2, editorScore:7.9, access:'Mostly public / resort; Bay Hill needs a lodge stay',
    goodFor:['families', 'biggroup'],
    site:'https://www.visitorlando.com',
    highlights:['Cheapest flights of any destination here','Non-golfers have plenty to do','Pairs naturally with a Streamsong overnight'],
    watchouts:['Afternoon thunderstorms most summer days','A lot of forgettable resort golf — choose carefully'],
    courses:[
      {name:'Bay Hill Club & Lodge', designer:'Dick Wilson / Arnold Palmer', par:72, tier:3, url:'https://www.bayhill.com', note:'Lodge guests only'},
      {name:'Grand Cypress (New)', designer:'Jack Nicklaus', par:72, tier:2, url:'https://golfgrandcypress.com', note:'St Andrews homage'},
      {name:'Reunion Resort (Watson)', designer:'Tom Watson', par:72, tier:2, url:'https://www.reunionresort.com', note:'Best of Reunion’s three'},
      {name:'Shingle Creek', designer:'Arnold Palmer Design', par:72, tier:2, url:'https://www.shinglecreekgolf.com', note:'Convenient and solid'},
      {name:'Orange County National (Panther Lake)', designer:'Ritson / Harman', par:72, tier:2, url:'https://www.ocngolf.com', note:'Great practice facility'},
      {name:'Waldorf Astoria Golf Club', designer:'Rees Jones', par:72, tier:2, url:'https://www.waldorfastoriaorlando.com', note:'Immaculate conditioning'},
      {name:'ChampionsGate (National)', designer:'Greg Norman', par:72, tier:2, url:'https://www.championsgategolf.com', note:'Home of the David Leadbetter academy'},
      {name:'Celebration Golf Club', designer:'Robert Trent Jones Sr. & Jr.', par:72, tier:2, url:'https://www.celebrationgolf.com', note:'Father-and-son design'},
      {name:'Victoria Hills', designer:'Ron Garl', par:72, tier:2, url:'https://www.victoriahillsgolfclub.com', note:'Rolling and un-Florida, 45 min north'}
    ],
    lodging:[
      {name:'Waldorf Astoria Orlando', type:'Luxury', tier:3},
      {name:'Reunion Resort villa', type:'Group split', tier:2},
      {name:'Airport-area hotel', type:'Budget', tier:2}
    ]
  },
  {
    id:'rtj-trail', name:'Robert Trent Jones Trail', region:'Alabama', country:'USA',
    usRegion:'Southeast', style:'parkland', palette:['#a9c6d0','#cdd6ac','#6c9048','#dcd7ac'],
    tagline:'Eleven sites, twenty-six courses, and the best dollar-per-round value in the country.',
    blurb:'Alabama built a statewide golf trail with pension money in the 1990s and accidentally created the best-value golf trip in America. The courses are big, muscular RTJ designs, the conditioning is far better than the price suggests, and you can string three sites together on one drive.',
    longBlurb:'In the 1990s Alabama\'s state pension fund decided to build golf courses as an economic development scheme, hired Robert Trent Jones Sr., and accidentally created the best-value golf in America. Twenty-six courses across eleven sites, most with an attached Marriott, and green fees that have somehow stayed reasonable for three decades. The courses are recognisably Jones — big, muscular, heavily bunkered, and punishing from the back tees, which most visitors should ignore. Grand National in Opelika is the highlight, with two courses on a peninsula where half the holes touch Lake Saugahatchee, and Robert Trent Jones himself called the site the best he was ever given. The trip is a driving holiday: sites sit sixty to ninety minutes apart, so plan a route rather than a base, and buy the trail card before you leave home.',
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Birmingham (BHM) · Montgomery (MGM) · Atlanta (ATL), 2h',
    gettingThere:'Birmingham and Montgomery are easy enough, Atlanta is two hours — but the trail itself means an hour of driving between sites.',
    priceTier:1, editorScore:7.8, access:'Fully public — trail card gets you on everything',
    goodFor:['biggroup', 'buddies'],
    site:'https://www.rtjgolf.com',
    highlights:['The cheapest good golf in America','Sites are 60–90 minutes apart','Attached Marriott hotels at most stops'],
    watchouts:['Long, hard courses from the back tees','Requires a lot of driving to see the best of it'],
    courses:[
      {name:'Ross Bridge', designer:'Robert Trent Jones Sr.', par:72, tier:2, url:'https://www.rtjgolf.com', note:'One of the longest in the world'},
      {name:'Capitol Hill (Judge)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'200-foot drop off the first tee'},
      {name:'Grand National (Lake)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'The Trail’s best course'},
      {name:'Grand National (Links)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'Its equal, most days'},
      {name:'Oxmoor Valley (Ridge)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'Severe elevation change'},
      {name:'Highland Oaks', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'Deep value in the south of the state'},
      {name:'Cambrian Ridge (Sherling / Canyon)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'Best views on the trail'},
      {name:'Magnolia Grove (Falls)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'Down on the Gulf Coast'},
      {name:'Silver Lakes (Heartbreaker / Backbreaker)', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'The name is a warning'},
      {name:'Lakewood (Azalea)', designer:'Perry Maxwell / RTJ Sr.', par:72, tier:2, url:'https://www.rtjgolf.com', note:'At the Grand Hotel in Point Clear'}
    ],
    lodging:[
      {name:'Renaissance Ross Bridge', type:'Resort', tier:2},
      {name:'Marriott Grand National', type:'Mid', tier:2},
      {name:'Trail-side budget hotel', type:'Budget', tier:1}
    ]
  },

  /* ----------------------------------------- NORTHEAST ---- */
  {
    id:'long-island', name:'Long Island', region:'New York', country:'USA',
    usRegion:'Northeast', style:'links', palette:['#a1bcd2','#ccd4b4','#6d8a52','#d8cfae'],
    tagline:'Bethpage Black at municipal rates — the greatest public course bargain in the world.',
    blurb:'The island holds more great golf per mile than anywhere in America, though most of it is behind gates at Shinnecock and National Golf Links. What you can play is extraordinary: Tillinghast’s brutal Bethpage Black, four more state courses on the same property, and Montauk Downs out at the tip.',
    longBlurb:'The best golf on Long Island is behind gates you will not get through — Shinnecock, National Golf Links, Maidstone, Garden City. What saves the trip is that New York State owns five courses on one property in Bethpage, and one of them is a Tillinghast monster that has hosted two US Opens, a PGA Championship and the 2025 Ryder Cup. The sign on the first tee warning that the Black Course is recommended only for highly skilled golfers is real and largely accurate. Getting on is the challenge: tee times are released on a rolling window and vanish in seconds, and the overnight queue in the car park remains a genuine and time-honoured strategy. Play the Red the day before — it is Tillinghast too, far easier to book, and good enough that plenty of locals prefer it.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'JFK, 45 min · LaGuardia (LGA), 1h',
    gettingThere:'JFK and LaGuardia put you 45 minutes from Bethpage. Nothing on this list is easier to reach.',
    priceTier:1, editorScore:8.6, access:'Bethpage via NY State reservation system or the walk-up line',
    goodFor:['buddies', 'architecture'],
    site:'https://parks.ny.gov',
    highlights:['2025 Ryder Cup venue','Five courses on the Bethpage property alone','New York City on the same trip'],
    watchouts:['Bethpage Black tee times are genuinely hard to get','The famous private clubs are not accessible — plan around that'],
    courses:[
      {name:'Bethpage Black', designer:'A.W. Tillinghast', par:71, tier:2, url:'https://parks.ny.gov', note:'Warning sign at the first tee'},
      {name:'Bethpage Red', designer:'A.W. Tillinghast', par:70, tier:1, url:'https://parks.ny.gov', note:'Excellent and far easier to book'},
      {name:'Bethpage Blue', designer:'Tillinghast / Burbeck', par:72, tier:1, url:'https://parks.ny.gov', note:'The quiet one'},
      {name:'Montauk Downs', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://parks.ny.gov', note:'State park course at the island’s tip'},
      {name:'Shinnecock Hills', designer:'William Flynn', par:70, private:true, note:'Private — US Open venue'},
      {name:'National Golf Links', designer:'C.B. Macdonald', par:73, private:true, note:'Private — the template original'},
      {name:'Bethpage Green', designer:'Devereux Emmet', par:71, tier:1, url:'https://parks.ny.gov', note:'The oldest of the five'},
      {name:'Bethpage Yellow', designer:'Alfred Tull', par:71, tier:1, url:'https://parks.ny.gov', note:'The gentle one'},
      {name:'Eisenhower Park (Red)', designer:'Devereux Emmet', par:72, tier:1, url:'https://www.nassaucountyny.gov', note:'Former PGA Championship venue'},
      {name:'Timber Point', designer:'Colt & Alison', par:72, tier:1, url:'https://www.suffolkcountyny.gov', note:'Great bones, county prices'}
    ],
    lodging:[
      {name:'Long Island hotel (near Bethpage)', type:'Mid', tier:2},
      {name:'Montauk inn', type:'Mid', tier:3},
      {name:'Manhattan hotel', type:'City base', tier:3}
    ]
  },

  /* -------------------------------------------- HAWAII ---- */
  {
    id:'maui', name:'Maui', region:'Hawaii', country:'USA',
    usRegion:'Hawaii', style:'tropical', palette:['#7fc0d4','#c8dcb4','#4f8a52','#dcd8ac'],
    tagline:'Kapalua’s Plantation Course falling toward the Pacific — the Tour’s season opener, playable by anyone.',
    blurb:'The Plantation Course is enormous, downhill and windy, and its 663-yard closing hole is the most fun par 5 most golfers will ever play. Add the three Wailea courses on the drier south shore and Maui becomes the rare destination where the golf and the holiday are equally good.',
    longBlurb:'Kapalua\'s Plantation Course is the most fun most golfers will ever have. Coore and Crenshaw routed it down a hillside above the Pacific with enormous width and greens that gather rather than repel, and the 663-yard closing hole plays downhill and downwind to the point where big hitters can reach it in two. The Tour opens its season here every January for exactly this reason. The trade winds are the constant: they get up around eleven and turn a benign course into a genuine test, so play early. Forty minutes south on the drier side, Wailea has three courses on one road, with Gold the best of them among lava outcrops. Note that West Maui has been rebuilding since the 2023 wildfires — check conditions before travelling, and spend locally while you are there.',
    season:'Year-round · best April – May, September – November',
    seasonMonths:[1,2,3,4,5,6,7,8,9,10,11,12],
    airport:'Kahului (OGG), 45 min to Kapalua',
    gettingThere:'Kahului takes direct flights from the West Coast, but it is a five-hour flight minimum and much longer from the East.',
    priceTier:3, editorScore:8.8, access:'Resort daily-fee; guest rates are meaningfully lower',
    goodFor:['couples', 'families'],
    site:'https://www.gohawaii.com/islands/maui',
    highlights:['Plantation Course hosts the Tour’s January opener','Wailea has three courses on one road','Whale watching from the tee in winter'],
    watchouts:['Trade winds are constant — club accordingly','West Maui is still rebuilding after the 2023 wildfires; check conditions and support local businesses'],
    courses:[
      {name:'Kapalua (Plantation)', designer:'Coore & Crenshaw', par:73, tier:4, url:'https://golfatkapalua.com', note:'The Sentry host'},
      {name:'Kapalua (Bay)', designer:'Palmer / Seay', par:72, tier:3, url:'https://golfatkapalua.com', note:'Oceanfront 5th'},
      {name:'Wailea (Gold)', designer:'Robert Trent Jones Jr.', par:72, tier:3, url:'https://www.waileagolf.com', note:'Best of the Wailea three'},
      {name:'Wailea (Emerald)', designer:'Robert Trent Jones Jr.', par:72, tier:3, url:'https://www.waileagolf.com', note:'Most forgiving'},
      {name:'Ka’anapali (Royal)', designer:'Robert Trent Jones Sr.', par:71, tier:3, url:'https://www.kaanapaligolfcourses.com', note:'Resort classic'},
      {name:'The Dunes at Maui Lani', designer:'Robin Nelson', par:72, tier:2, url:'https://www.dunesatmauilani.com', note:'Genuine sand dunes, central Maui'},
      {name:'Ka’anapali (Kai)', designer:'Robin Nelson', par:70, tier:2, url:'https://www.kaanapaligolfcourses.com', note:'The shorter Ka’anapali course'}
    ],
    lodging:[
      {name:'Ritz-Carlton Kapalua', type:'Luxury', tier:4},
      {name:'Wailea resort hotel', type:'Resort', tier:4},
      {name:'Condo rental', type:'Group split', tier:3}
    ]
  },

  /* --------------------------------------- ADDITIONS ---- */
  {
    id:'san-diego', name:'San Diego', region:'California', country:'USA',
    usRegion:'West', style:'coastal', palette:['#94c1d8','#cbd6b6','#6f9058','#ded6b8'],
    tagline:'Torrey Pines on the cliffs, sixty more courses inland, and weather that never argues.',
    blurb:'A US Open course you can book online for a municipal rate, a beach town that works for non-golfers, and the most reliable golf weather in America. San Diego asks less of a trip than almost anywhere on this list and gives back more than people expect.',
    longBlurb:'Torrey Pines is a municipal course. That fact never stops being remarkable: two US Opens, an annual Tour event, and a clifftop setting above the Pacific, on land owned by the city and bookable online. The South Course is the championship one — longer, tougher, and stretched considerably before 2008 — but plenty of locals prefer the North for its views and its gentler treatment of ordinary golfers. The catch is the tee sheet, which opens on a rolling window and empties immediately; the resort package at the Lodge is the reliable way in. Beyond Torrey, San Diego is deep rather than spectacular: Aviara and Maderas are excellent, Barona Creek plays firm and fast, and Coronado Municipal gives you bay views for less than a cart fee elsewhere. The weather never argues, and non-golfers have an actual city.',
    season:'Year-round · best March – November', seasonMonths:[1,2,3,4,5,6,7,8,9,10,11,12],
    airport:'San Diego (SAN), 20–40 min',
    gettingThere:'San Diego International sits five minutes from downtown, and nothing is more than an hour away once you land.',
    priceTier:2, editorScore:8.5, access:'Torrey Pines is municipal — book online or take a resident with you',
    goodFor:['buddies', 'couples', 'families'],
    site:'https://www.sandiego.org',
    highlights:['Torrey Pines South at a municipal rate','Genuinely year-round golf','Beaches and a real city for the non-golfers'],
    watchouts:['Torrey South tee times go fast — book the moment the window opens','Marine layer can sit on the coast until midday'],
    courses:[
      {name:'Torrey Pines (South)', designer:'Rees Jones / William Bell', par:72, tier:3, url:'https://www.sandiego.gov/torreypines', note:'2008 and 2021 US Open venue'},
      {name:'Torrey Pines (North)', designer:'William Bell / Tom Weiskopf', par:72, tier:2, url:'https://www.sandiego.gov/torreypines', note:'Better views, gentler test'},
      {name:'The Grand Golf Club', designer:'Tom Fazio', par:72, tier:3, url:'https://www.thegranddelmar.com', note:'Resort guests only'},
      {name:'Aviara', designer:'Arnold Palmer', par:72, tier:3, url:'https://www.parkhyattaviara.com', note:'Immaculate, up in Carlsbad'},
      {name:'Maderas', designer:'Johnny Miller / Robert Muir Graves', par:72, tier:3, url:'https://www.maderasgolf.com', note:'Canyon golf inland'},
      {name:'Barona Creek', designer:'Gary Roger Baird', par:72, tier:2, url:'https://www.barona.com', note:'Firm, fast, and a casino attached'},
      {name:'Coronado Municipal', designer:'Jack Daray', par:72, tier:1, url:'https://www.coronado.ca.us', note:'Bay views for muni money'}
    ],
    lodging:[
      {name:'Lodge at Torrey Pines', type:'Luxury', tier:4},
      {name:'La Jolla / Del Mar hotel', type:'Mid', tier:3},
      {name:'Mission Valley hotel', type:'Budget', tier:2}
    ]
  },
  {
    id:'gamble-sands', name:'Gamble Sands', region:'Brewster, Washington', country:'USA',
    usRegion:'West', style:'sand', palette:['#a7c3d6','#d9d4ae','#8d9a54','#e4dab6'],
    tagline:'Sagebrush, sand and enormous fairways above the Columbia River — the friendliest great course in America.',
    blurb:'David McLay Kidd built Gamble Sands as an apology for how hard Tetherow and Castle Course were, and it worked: fairways you cannot miss, greens that feed the ball in, and views for eighty miles. Scarecrow arrived in 2024 and is the harder, wilder sibling.',
    longBlurb:'David McLay Kidd built Tetherow and the Castle Course, got told repeatedly that they were too hard, and responded with Gamble Sands — a deliberate act of generosity. The fairways are enormous, the greens accept and feed the ball toward the hole, and it is close to impossible to lose a ball. The result is a course that great players still find interesting and average players find joyful, which is a genuinely difficult trick. It sits on a bluff above the Columbia River in sagebrush country with views running eighty miles, and the sand is real, so it plays firm all summer. Scarecrow arrived in 2024 as the wilder, more exposed sibling. QuickSands, the fourteen-hole short course, is the thing people go home talking about. Nothing else is within half an hour, so stay on site.',
    season:'May – October', seasonMonths:[4,5,6,7,8,9,10],
    airport:'Wenatchee (EAT), 1h · Seattle (SEA), 3h30 drive',
    gettingThere:'Most people fly to Seattle and drive three and a half hours over the Cascades. Wenatchee is closer but thinly served.',
    priceTier:2, editorScore:9.0, access:'Public — stay on site at the Inn or the Cabins',
    goodFor:['buddies', 'architecture'],
    site:'https://www.gamblesands.com',
    highlights:['Two full courses plus one of the best short courses anywhere','Wide enough that everyone in the group enjoys it','Superb value for the quality'],
    watchouts:['A long way from a major airport','Very hot in midsummer'],
    courses:[
      {name:'Gamble Sands', designer:'David McLay Kidd', par:72, tier:2, url:'https://www.gamblesands.com', note:'Wide, fast and joyful'},
      {name:'Scarecrow', designer:'David McLay Kidd', par:72, tier:2, url:'https://www.gamblesands.com', note:'Opened 2024 — bolder and tougher'},
      {name:'QuickSands', designer:'David McLay Kidd', par:37, tier:1, url:'https://www.gamblesands.com', note:'14-hole short course, play it twice'},
      {name:'The Cradle at Sands', designer:'David McLay Kidd', par:3, tier:1, url:'https://www.gamblesands.com', note:'Putting course by the clubhouse'}
    ],
    lodging:[
      {name:'The Inn at Gamble Sands', type:'Resort', tier:2},
      {name:'The Cabins', type:'Group split', tier:2}
    ]
  },
  {
    id:'coeur-dalene', name:'Coeur d’Alene', region:'Idaho', country:'USA',
    usRegion:'West', style:'mountain', palette:['#9cbcd4','#c9d4b4','#5f8250','#d8d0b0'],
    tagline:'The floating green, a lake steamer to the first tee, and pine forest in every direction.',
    blurb:'Coeur d’Alene Resort has the most photographed gimmick in golf — a par 3 to an island green that is moved by cable to a different yardage each day — and the rest of the course is far better than the gimmick suggests. Circling Raven up the road is the serious golf.',
    longBlurb:'The floating green is a gimmick and it is also completely delightful. The 14th at Coeur d\'Alene Resort sits on a moveable island anchored in the lake, repositioned each morning between about 100 and 175 yards, and you take a small boat out to putt. You are handed a certificate if you find the green. What surprises people is that the rest of the course is genuinely good — Scott Miller routed it through pine forest above the water, the conditioning is immaculate, and a forecaddie and the boat ride from the resort dock are included. Twenty minutes south, Circling Raven is the serious golf: 620 acres of wetland and pine with no houses, at roughly half the price. The town is a proper lake resort, which makes this one of the easier trips to sell to a partner.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Spokane (GEG), 45 min',
    gettingThere:'Fly into Spokane and drive 45 minutes east. The resort runs a boat from the dock to the first tee.',
    priceTier:3, editorScore:8.4, access:'Resort — public, guests get the tee sheet first',
    goodFor:['couples', 'buddies', 'families'],
    site:'https://www.cdaresort.com',
    highlights:['The world’s only floating green','Forecaddie and boat ride included at the resort','Lake town that works for a mixed group'],
    watchouts:['Short season — book high summer early','Resort golf is priced accordingly'],
    courses:[
      {name:'Coeur d’Alene Resort', designer:'Scott Miller', par:71, tier:3, url:'https://www.cdaresort.com', note:'The floating 14th'},
      {name:'Circling Raven', designer:'Gene Bates', par:72, tier:2, url:'https://www.cdacasino.com', note:'620 acres, 30 minutes south'},
      {name:'The Idaho Club', designer:'Jack Nicklaus', par:72, tier:2, url:'https://www.theidahoclub.com', note:'Up at Sandpoint'},
      {name:'Gozzer Ranch', designer:'Tom Fazio', par:72, private:true, note:'Private — one of the best in the northwest'},
      {name:'Black Rock', designer:'Jim Engh', par:72, private:true, note:'Private — dramatic and divisive'}
    ],
    lodging:[
      {name:'The Coeur d’Alene Resort', type:'Resort', tier:3},
      {name:'Downtown hotel', type:'Mid', tier:2},
      {name:'Lake rental house', type:'Group split', tier:2}
    ]
  },
  {
    id:'paynes-valley', name:'Payne’s Valley', region:'Big Cedar Lodge, Missouri', country:'USA',
    usRegion:'Midwest', style:'mountain', palette:['#a4c2ce','#cdd6ac','#6c9048','#dcd6ac'],
    tagline:'Five courses in the Ozarks from Tiger, Coore & Crenshaw, Fazio, Player and Nicklaus.',
    blurb:'Johnny Morris spent Bass Pro money turning a stretch of Missouri hillside into the densest collection of famous architects in America. Payne’s Valley is Tiger Woods’ first public design and finishes with a par 3 in a limestone cave. It should not work, and it entirely does.',
    longBlurb:'Johnny Morris made a fortune with Bass Pro Shops and spent a chunk of it turning Ozark hillside into the densest concentration of famous architects anywhere in America. Payne\'s Valley is Tiger Woods\' first public design, named for Payne Stewart, and it is wide, playable and far less severe than his reputation would suggest — then it finishes with a nineteenth hole played into a limestone cave with a waterfall behind the green. It should be ridiculous. It is one of the best days out in American golf. The purist\'s pick is Ozarks National, where Coore and Crenshaw worked the ridgelines with their usual restraint. Add a Fazio, a Gary Player short course and a Nicklaus par-3 course over the lake and the property holds five genuinely distinct rounds.',
    season:'April – November', seasonMonths:[4,5,6,7,8,9,10,11],
    airport:'Branson (BKG), 20 min · Springfield (SGF), 1h',
    gettingThere:'Springfield is the practical airport; Branson is closer but has limited service. Everything on site is a shuttle ride apart.',
    priceTier:3, editorScore:8.6, access:'Resort — guests of Big Cedar Lodge',
    goodFor:['buddies', 'families', 'architecture'],
    site:'https://bigcedar.com',
    highlights:['Tiger Woods’ first public course','A 19th hole in a limestone cave','Five very different courses on one property'],
    watchouts:['Everything is resort-priced','Spread out — you will use the shuttles'],
    courses:[
      {name:'Payne’s Valley', designer:'Tiger Woods / TGR Design', par:72, tier:3, url:'https://bigcedar.com', note:'The cave hole finishes it'},
      {name:'Ozarks National', designer:'Coore & Crenshaw', par:71, tier:3, url:'https://bigcedar.com', note:'The connoisseur’s pick here'},
      {name:'Buffalo Ridge Springs', designer:'Tom Fazio', par:71, tier:2, url:'https://bigcedar.com', note:'Bison on the property'},
      {name:'Mountain Top', designer:'Gary Player', par:39, tier:2, url:'https://bigcedar.com', note:'13-hole short course, walking only'},
      {name:'Top of the Rock', designer:'Jack Nicklaus', par:27, tier:2, url:'https://bigcedar.com', note:'Par-3 course over the lake'}
    ],
    lodging:[
      {name:'Big Cedar Lodge', type:'Resort', tier:3},
      {name:'Cabins and cottages', type:'Group split', tier:2}
    ]
  },
  {
    id:'lake-tahoe', name:'Lake Tahoe', region:'California & Nevada', country:'USA',
    usRegion:'West', style:'mountain', palette:['#8fbdd6','#c7d5b4','#5b7f4e','#d7d0ae'],
    tagline:'Golf at 6,200 feet with the lake below — the ball goes forever and nobody minds the walk.',
    blurb:'Tahoe’s summer is short and glorious. Edgewood runs down to the shoreline on the Nevada side, the Truckee courses sit up among the pines, and the altitude adds ten percent to everything you hit. Pair it with a lake house and it stops being only a golf trip.',
    longBlurb:'Tahoe\'s golf season is barely five months and that scarcity is part of the appeal. You are playing at over six thousand feet, where the ball carries roughly ten percent further and everyone in the group spends the first round flying greens and refusing to accept why. Edgewood is the headline, on the Nevada shore, finishing with three holes that run along the water and a par 5 that plays straight at the lake. The Truckee courses on the north side are quieter and more wooded — Coyote Moon has no houses on it at all, which in a resort town is close to a miracle. What makes this trip different from the desert ones is that the golf is only half of it: the lake, the hiking and the towns are genuinely worth building days around, so a mixed group does well here.',
    season:'June – October', seasonMonths:[6,7,8,9,10],
    airport:'Reno-Tahoe (RNO), 45 min',
    gettingThere:'Reno is 45 minutes from the north shore and well connected. Sacramento and the Bay Area are both drivable.',
    priceTier:3, editorScore:8.3, access:'Mostly public and resort daily-fee',
    goodFor:['couples', 'families', 'buddies'],
    site:'https://www.visitlaketahoe.com',
    highlights:['Edgewood’s closing stretch on the lake','Altitude makes everyone feel longer','Superb non-golf summer town'],
    watchouts:['Season is barely five months','July and August book out with holidaymakers'],
    courses:[
      {name:'Edgewood Tahoe', designer:'George Fazio', par:72, tier:3, url:'https://www.edgewoodtahoe.com', note:'The lakeside 16th, 17th and 18th'},
      {name:'Coyote Moon', designer:'Brad Bell', par:72, tier:3, url:'https://www.coyotemoongolf.com', note:'Not a single house on it'},
      {name:'Old Greenwood', designer:'Jack Nicklaus', par:72, tier:3, url:'https://www.tahoemountainclub.com', note:'Tall pines, Truckee'},
      {name:'Gray’s Crossing', designer:'Peter Jacobsen / Jim Hardy', par:72, tier:2, url:'https://www.tahoemountainclub.com', note:'More open than Old Greenwood'},
      {name:'Incline Village (Championship)', designer:'Robert Trent Jones Sr.', par:72, tier:2, url:'https://www.inclinevillage.org', note:'High above the north shore'},
      {name:'Martis Camp', designer:'Tom Fazio', par:72, private:true, note:'Private — the best in the basin'}
    ],
    lodging:[
      {name:'Edgewood Tahoe Lodge', type:'Luxury', tier:4},
      {name:'Truckee / Northstar hotel', type:'Mid', tier:3},
      {name:'Lake rental house', type:'Group split', tier:3}
    ]
  },
  {
    id:'st-george', name:'St. George', region:'Utah', country:'USA',
    usRegion:'West', style:'desert', palette:['#dcb489','#e8cb9e','#a8703f','#f0dcb4'],
    tagline:'Red rock desert golf on the edge of Zion, at half the price of Scottsdale.',
    blurb:'Southern Utah is what Arizona would be if it were quieter and cheaper. Sand Hollow’s clifftop stretch runs along the edge of a red rock canyon and is as spectacular as anything in the desert, and you can play it for well under a Scottsdale rate. Zion is an hour away.',
    longBlurb:'Southern Utah is what Arizona would be if it were quieter, emptier and about half the price. The red rock is the whole point — Navajo sandstone in colours that photograph like a filter has been applied, with black lava flows cutting through it. Sand Hollow is the reason to make the trip: holes 10 through 13 run along the rim of a canyon with a drop on one side and nothing but red rock for miles, and it costs a fraction of a comparable desert round in Scottsdale. Entrada plays across genuine lava fields on the back nine. The town is small, the courses are close together, and Zion National Park is an hour up the road if anyone wants a day away from golf. Summer is genuinely unplayable, so aim for spring or autumn.',
    season:'March – May, September – November', seasonMonths:[2,3,4,5,9,10,11],
    airport:'St. George (SGU), 15 min · Las Vegas (LAS), 2h drive',
    gettingThere:'St. George has a small airport; most people fly to Las Vegas and drive two hours up the interstate.',
    priceTier:1, editorScore:8.2, access:'Public and municipal throughout',
    goodFor:['buddies', 'biggroup', 'couples'],
    site:'https://www.greaterzion.com',
    highlights:['Sand Hollow’s canyon-edge holes','Genuinely cheap for the quality','Zion National Park an hour away'],
    watchouts:['Brutally hot June to August','Small airport — most trips start in Las Vegas'],
    courses:[
      {name:'Sand Hollow (Championship)', designer:'John Fought', par:72, tier:2, url:'https://www.sandhollowresort.com', note:'The clifftop stretch is the reason to come'},
      {name:'Sand Hollow (Links)', designer:'John Fought', par:34, tier:1, url:'https://www.sandhollowresort.com', note:'Nine holes, links-style'},
      {name:'Coral Canyon', designer:'Keith Foster', par:72, tier:2, url:'https://www.coralcanyongolf.com', note:'Red rock and lava'},
      {name:'Entrada at Snow Canyon', designer:'Johnny Miller', par:72, tier:2, url:'https://www.golfentrada.com', note:'Lava fields on the back nine'},
      {name:'Copper Rock', designer:'Rick Smith', par:72, tier:2, url:'https://www.copperrockgolf.com', note:'Epson Tour host'},
      {name:'Sky Mountain', designer:'Jeff Hardin', par:72, tier:1, url:'https://www.skymountaingolf.com', note:'Best-value views in Utah'},
      {name:'Green Spring', designer:'Gene Bates', par:71, tier:1, url:'https://www.washingtoncity.org', note:'The famous par-3 sixth over the ravine'}
    ],
    lodging:[
      {name:'Sand Hollow villas', type:'Group split', tier:2},
      {name:'St. George hotel', type:'Mid', tier:1},
      {name:'Zion-area lodge', type:'Mid', tier:2}
    ]
  }
];

/* ---------- curated example trips ---------- */
const EXAMPLE_TRIPS = [
  {
    id:'bandon-buddies', title:'The Bandon Buddies Trip', destinationId:'bandon-dunes',
    nights:3, travelers:4, level:'Classic',
    summary:'Six rounds in four days, walking every step. The trip every golf group should do once.',
    tips:'Fly into North Bend if you can stomach the connection — it saves four hours of driving. Book the twilight replay rounds; they are the best value on the property.',
    days:[
      {label:'Day 1', course:'Bandon Dunes', teeTime:'13:20', lodging:'Chrome Lake / Grove Cottages', notes:'Land, drop bags, afternoon loop. Punchbowl and a beer after.'},
      {label:'Day 2', course:'Pacific Dunes', teeTime:'08:00', lodging:'Chrome Lake / Grove Cottages', notes:'Morning Pacific, afternoon replay on Old Macdonald.'},
      {label:'Day 3', course:'Sheep Ranch', teeTime:'09:10', lodging:'Chrome Lake / Grove Cottages', notes:'Cliff holes all morning. The Preserve in the evening light.'},
      {label:'Day 4', course:'Bandon Trails', teeTime:'07:40', lodging:'—', notes:'Early round, then drive to the airport.'}
    ]
  },
  {
    id:'pebble-pilgrimage', title:'Pebble Beach Pilgrimage', destinationId:'monterey',
    nights:3, travelers:4, level:'Bucket list',
    summary:'Three resort courses and one glorious municipal, built around the round you have wanted since you started playing.',
    tips:'Stay on property — it is the only way to guarantee a Pebble tee time, and it lets you book 18 months out. Play Spyglass first while your nerves are still intact, and finish at Pacific Grove for the best-value sunset on the peninsula.',
    days:[
      {label:'Day 1', course:'Spyglass Hill', teeTime:'11:40', lodging:'Inn at Spanish Bay', notes:'Land at MRY, straight to the first tee. Five dune holes to open.'},
      {label:'Day 2', course:'The Links at Spanish Bay', teeTime:'09:20', lodging:'Inn at Spanish Bay', notes:'Bagpiper walks the course at sunset. Dinner in Carmel.'},
      {label:'Day 3', course:'Pebble Beach Golf Links', teeTime:'10:10', lodging:'Inn at Spanish Bay', notes:'The main event. Take a caddie — it is worth every cent.'},
      {label:'Day 4', course:'Pacific Grove Municipal', teeTime:'08:00', lodging:'—', notes:'The poor man’s Pebble, and a fitting last round. Then home.'}
    ]
  },
  {
    id:'sandhills-weekend', title:'Sandhills Long Weekend', destinationId:'pinehurst',
    nights:3, travelers:4, level:'Easy win',
    summary:'Four Donald Ross-flavoured rounds without ever needing the car after you arrive.',
    tips:'Play No. 2 on day three, once your speed on the greens has adjusted. Finish every evening on The Cradle — it is the best 40 minutes of the trip.',
    days:[
      {label:'Day 1', course:'Mid Pines', teeTime:'13:00', lodging:'The Manor Inn', notes:'Arrive, warm up on a genuine Ross classic.'},
      {label:'Day 2', course:'Pinehurst No. 4', teeTime:'09:20', lodging:'The Manor Inn', notes:'Sandy and wide. Cradle at 5pm.'},
      {label:'Day 3', course:'Pinehurst No. 2', teeTime:'08:40', lodging:'The Manor Inn', notes:'The main event. Take a caddie.'},
      {label:'Day 4', course:'Pine Needles', teeTime:'08:00', lodging:'—', notes:'Early round then RDU.'}
    ]
  },
  {
    id:'grand-strand', title:'The Grand Strand Value Run', destinationId:'myrtle-beach',
    nights:3, travelers:8, level:'Big group',
    summary:'Four good rounds at the lowest cost per round in America, with room for eight without anyone complaining.',
    tips:'Book through a package operator rather than course by course — it is usually far cheaper and they handle the tee sheet. Put the two Strantz courses back to back in the middle of the trip; they are the reason to come.',
    days:[
      {label:'Day 1', course:'Tidewater', teeTime:'13:10', lodging:'Oceanfront condo', notes:'Land at MYR, check into the condo, afternoon marsh views.'},
      {label:'Day 2', course:'True Blue', teeTime:'09:00', lodging:'Oceanfront condo', notes:'Wild and sandy. Murrells Inlet for dinner.'},
      {label:'Day 3', course:'Caledonia Golf & Fish Club', teeTime:'08:40', lodging:'Oceanfront condo', notes:'Best course on the Strand. Beer on the porch after.'},
      {label:'Day 4', course:'Barefoot Resort (Love)', teeTime:'08:00', lodging:'—', notes:'Quick last round, then the airport.'}
    ]
  },
  {
    id:'straits-run', title:'Straits & River — Kohler in Three', destinationId:'kohler',
    nights:2, travelers:4, level:'Championship',
    summary:'Two Pete Dye championship courses and a warm-up, from one hotel, in 48 hours.',
    tips:'The Straits requires a caddie and walking — book it for the middle day when your legs are freshest. If you can add a fourth day, Erin Hills is an hour south and worth the detour.',
    days:[
      {label:'Day 1', course:'Blackwolf Run (River)', teeTime:'13:00', lodging:'Inn on Woodlake', notes:'Fly into MKE, drive an hour, afternoon round along the Sheboygan.'},
      {label:'Day 2', course:'Whistling Straits (Straits)', teeTime:'09:30', lodging:'Inn on Woodlake', notes:'Ryder Cup course. Caddie required, walking only.'},
      {label:'Day 3', course:'Whistling Straits (Irish)', teeTime:'08:20', lodging:'—', notes:'Inland sibling, then back to Milwaukee.'}
    ]
  },
  {
    id:'desert-escape', title:'Desert Escape — 72 Hours in Scottsdale', destinationId:'scottsdale',
    nights:3, travelers:8, level:'Big group',
    summary:'The easiest trip to organise for eight people who want sun in February.',
    tips:'Rent a house with a pool instead of hotel rooms — for eight people it is far cheaper and the evenings are better. Book afternoon tee times; mornings are cold until March.',
    days:[
      {label:'Day 1', course:'We-Ko-Pa (Saguaro)', teeTime:'12:40', lodging:'Rental house with pool', notes:'Land at PHX, drive 40 minutes, tee off.'},
      {label:'Day 2', course:'TPC Scottsdale (Stadium)', teeTime:'10:00', lodging:'Rental house with pool', notes:'Stand in the 16th amphitheatre. Old Town after dark.'},
      {label:'Day 3', course:'Troon North (Monument)', teeTime:'09:30', lodging:'Rental house with pool', notes:'Boulder-lined desert classic.'},
      {label:'Day 4', course:'Grayhawk (Raptor)', teeTime:'08:00', lodging:'—', notes:'Quick round then a late flight home.'}
    ]
  },
  {
    id:'sand-two-nights', title:'Streamsong in Two Nights', destinationId:'streamsong',
    nights:2, travelers:4, level:'Short break',
    summary:'Three top-100 courses in 48 hours — the most efficient golf trip in America.',
    tips:'Fly into Tampa mid-morning and you can play 18 the same day. Walk with a caddie on Red and Blue; Black has its own clubhouse, so plan the drive between.',
    days:[
      {label:'Day 1', course:'Streamsong Blue', teeTime:'13:00', lodging:'The Lodge', notes:'Land TPA, 80-minute drive, afternoon round.'},
      {label:'Day 2', course:'Streamsong Red', teeTime:'08:30', lodging:'The Lodge', notes:'Morning Red, afternoon Roundabout, sunset drinks on the roof.'},
      {label:'Day 3', course:'Streamsong Black', teeTime:'08:00', lodging:'—', notes:'Play Black, drive straight to the airport.'}
    ]
  },
  {
    id:'cascade-swing', title:'The Cascade Swing', destinationId:'central-oregon',
    nights:3, travelers:4, level:'Summer escape',
    summary:'Four high-desert rounds under the Cascades, with cool mornings and no humidity anywhere.',
    tips:'You are at 3,600 feet — the ball goes about seven percent further, and everyone over-clubs on day one. Crosswater is resort-guest only, so line the Sunriver night up with that tee time rather than the other way round.',
    days:[
      {label:'Day 1', course:'Tetherow', teeTime:'14:00', lodging:'Downtown Bend hotel', notes:'Land at RDM, twenty minutes to the first tee. Firm fescue and a brewery afterwards.'},
      {label:'Day 2', course:'Juniper Preserve (Nicklaus)', teeTime:'09:40', lodging:'Downtown Bend hotel', notes:'Juniper and lava rock. The old Pronghorn — same course, new name.'},
      {label:'Day 3', course:'Crosswater at Sunriver', teeTime:'10:20', lodging:'Sunriver Resort', notes:'Move down to Sunriver. Wetlands and the Deschutes running through it.'},
      {label:'Day 4', course:'Black Butte Ranch (Big Meadow)', teeTime:'08:00', lodging:'—', notes:'Mountain parkland with the Three Sisters behind the greens. Then home.'}
    ]
  },
  {
    id:'coachella-winter', title:'Coachella Valley Winter Break', destinationId:'palm-springs',
    nights:3, travelers:4, level:'Winter sun',
    summary:'Four rounds in shirtsleeves in February, ninety minutes from LA and about half the price of Scottsdale.',
    tips:'Save the Stadium Course for day three — its island green at 17 is much less frightening once you have your desert eye in. Do not book before 9am in December or January; the valley is genuinely cold until the sun clears the mountains.',
    days:[
      {label:'Day 1', course:'Desert Willow (Firecliff)', teeTime:'13:20', lodging:'Indian Wells hotel', notes:'Best municipal in the valley and a gentle opener.'},
      {label:'Day 2', course:'PGA West (Nicklaus Tournament)', teeTime:'09:00', lodging:'Indian Wells hotel', notes:'Fairer than the Stadium and a good warm-up for it.'},
      {label:'Day 3', course:'PGA West (Stadium)', teeTime:'09:40', lodging:'La Quinta Resort & Club', notes:'Pete Dye at his most theatrical. Move over to La Quinta after.'},
      {label:'Day 4', course:'La Quinta Resort (Mountain)', teeTime:'08:20', lodging:'—', notes:'Holes cut straight into the rock. Twenty minutes to PSP afterwards.'}
    ]
  },
  {
    id:'vegas-blowout', title:'The Strip and the Desert', destinationId:'las-vegas',
    nights:3, travelers:4, level:'Blowout',
    summary:'One genuinely extravagant round, two sensible ones, and dinner on the Strip every night.',
    tips:'Shadow Creek needs an MGM stay, and the rate includes the limo out there — book it for the night you switch hotels. Paiute is forty minutes into the desert and about a fifth of the price; it is the better golf and everyone says so afterwards.',
    days:[
      {label:'Day 1', course:'Bali Hai', teeTime:'13:30', lodging:'Mid-Strip resort', notes:'Palms and black lava rock, ten minutes from the airport. Easiest arrival day in golf.'},
      {label:'Day 2', course:'Paiute (Snow Mountain)', teeTime:'08:40', lodging:'Mid-Strip resort', notes:'Drive out into the desert. Pete Dye, no houses, no noise.'},
      {label:'Day 3', course:'Shadow Creek', teeTime:'10:00', lodging:'Bellagio / Wynn', notes:'The Fazio fantasy. Switch to the MGM property the night before.'},
      {label:'Day 4', course:'Rio Secco', teeTime:'08:00', lodging:'—', notes:'Butch Harmon’s base, out in the canyons. Late flight home.'}
    ]
  },
  {
    id:'lido-pilgrimage', title:'Sand Valley and The Lido', destinationId:'sand-valley',
    nights:3, travelers:4, level:'Architecture',
    summary:'Four courses on Wisconsin sand, including the hole-for-hole resurrection of golf’s most famous lost course.',
    tips:'Ask about Lido access when you book the room, not afterwards — it is guest-limited and the answer changes by season. Walk everything; the sand is firm and the caddies here are good company.',
    days:[
      {label:'Day 1', course:'Mammoth Dunes', teeTime:'13:40', lodging:'Cottages (4–8 guests)', notes:'Enormously wide. A good place to remember you can hit driver.'},
      {label:'Day 2', course:'Sand Valley', teeTime:'08:30', lodging:'Cottages (4–8 guests)', notes:'The original Coore & Crenshaw course. Sandbox in the late afternoon.'},
      {label:'Day 3', course:'The Lido', teeTime:'09:20', lodging:'Cottages (4–8 guests)', notes:'The main event — Macdonald’s lost masterpiece, rebuilt from survey drawings.'},
      {label:'Day 4', course:'Sedge Valley', teeTime:'08:00', lodging:'—', notes:'A par 68 that plays like heathland. Then CWA and home.'}
    ]
  },
  {
    id:'michigan-loop', title:'Bluffs, Dunes and The Loop', destinationId:'northern-michigan',
    nights:4, travelers:4, level:'Road trip',
    summary:'Five rounds across northern Michigan, finishing on the only reversible course in America.',
    tips:'The Loop runs clockwise one day and anticlockwise the next — check which way it is pointing before you book, then play the direction you have not seen photographs of. Cherry season peaks in July and the towns get busy with it.',
    days:[
      {label:'Day 1', course:'The Highlands (Arthur Hills)', teeTime:'14:00', lodging:'Boyne resort lodge', notes:'Land at TVC, drive north, easy opener at Boyne.'},
      {label:'Day 2', course:'Bay Harbor (Links / Quarry)', teeTime:'09:30', lodging:'Boyne resort lodge', notes:'Clifftop quarry holes above Little Traverse Bay.'},
      {label:'Day 3', course:'Arcadia Bluffs (Bluffs)', teeTime:'10:40', lodging:'Traverse City hotel', notes:'Two hundred feet above Lake Michigan. The reason people come here.'},
      {label:'Day 4', course:'Arcadia Bluffs (South)', teeTime:'08:20', lodging:'Forest Dunes cottage', notes:'Its Chicago Golf Club homage, then a drive east to Roscommon.'},
      {label:'Day 5', course:'The Loop (Black / Red)', teeTime:'08:00', lodging:'—', notes:'One plot of land, two golf courses. Then back to TVC.'}
    ]
  },
  {
    id:'sandhills-pilgrimage', title:'Nebraska Sandhills Pilgrimage', destinationId:'nebraska-sandhills',
    nights:3, travelers:4, level:'Remote',
    summary:'Four rounds on the best sand in America, four hours from anywhere and completely worth it.',
    tips:'Sand Hills Golf Club and CapRock are private — do not build the trip around getting on them, and you will have a wonderful time. Fill the tank every single time you pass a station, and download your maps before you leave the interstate.',
    days:[
      {label:'Day 1', course:'The Prairie Club (Dunes)', teeTime:'14:20', lodging:'The Prairie Club lodge', notes:'Fly to Valentine or drive from Denver. Public, and better than it has any right to be.'},
      {label:'Day 2', course:'The Prairie Club (Pines)', teeTime:'09:00', lodging:'The Prairie Club lodge', notes:'Canyon-edge holes above the Snake River.'},
      {label:'Day 3', course:'Dismal River (White)', teeTime:'10:00', lodging:'Dismal River cabin', notes:'Two hours south through the dunes. Doak at his most minimal.'},
      {label:'Day 4', course:'Dismal River (Red)', teeTime:'08:00', lodging:'—', notes:'The Nicklaus course, then the long drive back to a flight.'}
    ]
  },
  {
    id:'ocean-course-week', title:'The Ocean Course Week', destinationId:'kiawah',
    nights:3, travelers:4, level:'Championship',
    summary:'Three gentle Kiawah rounds and then the hardest resort course in America, with Charleston up the road.',
    tips:'Build up to the Ocean Course rather than opening with it — it is a much better day when your ball-striking has settled. It is walking-only before noon and the caddie is worth every cent. Cassique is private, so ignore it.',
    days:[
      {label:'Day 1', course:'Osprey Point', teeTime:'13:00', lodging:'Island villa rental', notes:'Land at CHS, an hour to the island, lagoons and live oaks all afternoon.'},
      {label:'Day 2', course:'Turtle Point', teeTime:'09:20', lodging:'Island villa rental', notes:'Three holes right on the beach. Dinner in Charleston.'},
      {label:'Day 3', course:'The Ocean Course', teeTime:'09:50', lodging:'Island villa rental', notes:'Ten holes on the Atlantic. Take the caddie and keep the ball low.'},
      {label:'Day 4', course:'Oak Point', teeTime:'08:00', lodging:'—', notes:'A relaxed last round on the way off the island.'}
    ]
  },
  {
    id:'lowcountry-weekend', title:'Lowcountry Long Weekend', destinationId:'hilton-head',
    nights:3, travelers:4, level:'Easy win',
    summary:'Four Lowcountry rounds, a bike instead of a car, and the lighthouse hole to finish.',
    tips:'Harbour Town books months ahead, so start there and build the rest around it. Once you have checked in, leave the car alone — the island runs on bike paths and everything is fifteen minutes by pedal.',
    days:[
      {label:'Day 1', course:'Palmetto Dunes (RTJ Oceanfront)', teeTime:'13:40', lodging:'Sea Pines villa', notes:'The island’s only oceanfront hole. Gentle start.'},
      {label:'Day 2', course:'Heron Point', teeTime:'09:10', lodging:'Sea Pines villa', notes:'Pete Dye at his most playable, ten minutes from the villa.'},
      {label:'Day 3', course:'Harbour Town Golf Links', teeTime:'10:20', lodging:'Sea Pines villa', notes:'Tiny greens, trees in the way, lighthouse at 18. The main event.'},
      {label:'Day 4', course:'May River at Palmetto Bluff', teeTime:'08:30', lodging:'—', notes:'Thirty minutes inland, walking with caddies, then SAV.'}
    ]
  },
  {
    id:'seaside-three', title:'Seaside in Three', destinationId:'sea-island',
    nights:2, travelers:4, level:'Polished',
    summary:'Three courses, one island, and the best service in American golf.',
    tips:'Seaside in the afternoon wind is a completely different course from Seaside in the morning — book it late if you want the full links experience. The Performance Center is open to guests and worth an hour before you play.',
    days:[
      {label:'Day 1', course:'Retreat', teeTime:'13:30', lodging:'The Inn at Sea Island', notes:'Where the locals play. Land at BQK or drive up from JAX.'},
      {label:'Day 2', course:'Plantation', teeTime:'09:00', lodging:'The Lodge at Sea Island', notes:'Rebuilt in 2019, live oaks throughout. Move over to the Lodge.'},
      {label:'Day 3', course:'Seaside', teeTime:'08:40', lodging:'—', notes:'Plays like a links when the Atlantic wind is up. Then home.'}
    ]
  },
  {
    id:'orlando-mixed', title:'Orlando for a Mixed Group', destinationId:'orlando',
    nights:3, travelers:8, level:'Families welcome',
    summary:'Four easy rounds, a villa with a pool, and enough to do that the non-golfers stay happy.',
    tips:'Take a villa at Reunion rather than hotel rooms — for eight people it is cheaper, and there is a pool for whoever is not playing. Play mornings from June onwards; the afternoon storms arrive like clockwork.',
    days:[
      {label:'Day 1', course:'Shingle Creek', teeTime:'13:00', lodging:'Reunion Resort villa', notes:'Twenty minutes from MCO. Land, check in, tee off.'},
      {label:'Day 2', course:'Reunion Resort (Watson)', teeTime:'08:40', lodging:'Reunion Resort villa', notes:'Best of Reunion’s three, and you can walk to the first tee.'},
      {label:'Day 3', course:'Grand Cypress (New)', teeTime:'09:20', lodging:'Reunion Resort villa', notes:'Nicklaus’ St Andrews homage — double greens, stone walls, actual pot bunkers.'},
      {label:'Day 4', course:'Orange County National (Panther Lake)', teeTime:'08:00', lodging:'—', notes:'Enormous practice facility. Warm up properly, then fly home.'}
    ]
  },
  {
    id:'trail-in-four', title:'The Trail in Four', destinationId:'rtj-trail',
    nights:3, travelers:8, level:'Best value',
    summary:'Four big Robert Trent Jones courses across Alabama for less than one round at Pebble.',
    tips:'Buy the trail card before you go. Grand National’s Lake and Links courses are the two best on the whole trail and they share a clubhouse — play them back to back rather than splitting them up.',
    days:[
      {label:'Day 1', course:'Oxmoor Valley (Ridge)', teeTime:'13:20', lodging:'Renaissance Ross Bridge', notes:'Land at BHM, twenty minutes out. Severe elevation change to open.'},
      {label:'Day 2', course:'Ross Bridge', teeTime:'09:00', lodging:'Renaissance Ross Bridge', notes:'One of the longest courses in the world. Play it forward.'},
      {label:'Day 3', course:'Grand National (Lake)', teeTime:'09:40', lodging:'Marriott Grand National', notes:'Ninety minutes to Opelika. Half the holes touch the water.'},
      {label:'Day 4', course:'Grand National (Links)', teeTime:'08:00', lodging:'—', notes:'Its equal, most days. Then ATL or BHM for the flight.'}
    ]
  },
  {
    id:'bethpage-bargain', title:'Bethpage and the Island', destinationId:'long-island',
    nights:3, travelers:4, level:'Bargain',
    summary:'Four rounds on New York State parkland, including the most famous municipal course on earth.',
    tips:'Bethpage tee times open on a rolling window through the state reservation system and go instantly — set an alarm. The overnight queue in the car park is a real and time-honoured strategy. Shinnecock and National Golf Links are private; admire them from the road.',
    days:[
      {label:'Day 1', course:'Bethpage Blue', teeTime:'13:40', lodging:'Long Island hotel (near Bethpage)', notes:'The quiet one on the property. Land at JFK and go straight there.'},
      {label:'Day 2', course:'Bethpage Red', teeTime:'08:20', lodging:'Long Island hotel (near Bethpage)', notes:'Tillinghast, and far easier to book than its famous sibling.'},
      {label:'Day 3', course:'Bethpage Black', teeTime:'07:10', lodging:'Long Island hotel (near Bethpage)', notes:'The warning sign at the first tee is not a joke. 2025 Ryder Cup venue.'},
      {label:'Day 4', course:'Montauk Downs', teeTime:'09:00', lodging:'—', notes:'Two hours east to the tip of the island. State park golf, ocean views.'}
    ]
  },
  {
    id:'maui-two-coasts', title:'Kapalua and Wailea', destinationId:'maui',
    nights:5, travelers:4, level:'Golf and holiday',
    summary:'Five rounds across both coasts of Maui, built so nobody has to choose between golf and a holiday.',
    tips:'The trade winds get up after about eleven, so put the Plantation Course early — it is a long walk downwind and a long fight back. West Maui is still rebuilding after the 2023 wildfires; check conditions before you travel and spend your money locally while you are there.',
    days:[
      {label:'Day 1', course:'Ka’anapali (Royal)', teeTime:'13:30', lodging:'Condo rental', notes:'Land at OGG, drive up the west coast, gentle resort opener.'},
      {label:'Day 2', course:'Kapalua (Bay)', teeTime:'09:00', lodging:'Condo rental', notes:'The oceanfront 5th plays straight across the water.'},
      {label:'Day 3', course:'Kapalua (Plantation)', teeTime:'08:40', lodging:'Condo rental', notes:'The Tour’s season opener. Enormous, downhill, and the 18th is pure joy.'},
      {label:'Day 4', course:'Wailea (Emerald)', teeTime:'10:00', lodging:'Wailea resort hotel', notes:'Drive south to the dry side. The forgiving one of the three.'},
      {label:'Day 5', course:'Wailea (Gold)', teeTime:'08:20', lodging:'Wailea resort hotel', notes:'Lava outcrops and the best of the Wailea set. Whales offshore in winter.'},
      {label:'Day 6', course:'—', teeTime:'', lodging:'—', notes:'Beach in the morning, then the flight home.'}
    ]
  },
  {
    id:'socal-easy', title:'San Diego, the Easy One', destinationId:'san-diego',
    nights:3, travelers:4, level:'Low effort',
    summary:'Four rounds including a US Open course, and nobody has to drive more than forty minutes.',
    tips:'Torrey Pines South tee times open on a rolling window and vanish immediately — set an alarm, or book the resort package at the Lodge which includes guaranteed access. Play the North first; it is the better warm-up and the better views.',
    days:[
      {label:'Day 1', course:'Coronado Municipal', teeTime:'13:30', lodging:'La Jolla / Del Mar hotel', notes:'Land at SAN, twenty minutes over the bridge. Bay views for muni money.'},
      {label:'Day 2', course:'Torrey Pines (North)', teeTime:'09:20', lodging:'La Jolla / Del Mar hotel', notes:'Clifftop warm-up. Lunch in La Jolla after.'},
      {label:'Day 3', course:'Torrey Pines (South)', teeTime:'08:40', lodging:'La Jolla / Del Mar hotel', notes:'The main event. Two US Opens have been won here.'},
      {label:'Day 4', course:'Maderas', teeTime:'08:00', lodging:'—', notes:'Canyon golf inland, then a late flight home.'}
    ]
  },
  {
    id:'sands-two-course', title:'Gamble Sands in Three', destinationId:'gamble-sands',
    nights:2, travelers:4, level:'Worth the drive',
    summary:'Two full courses and the best short course in the country, on sand above the Columbia River.',
    tips:'Stay on site — there is nothing else within half an hour, and the Cabins split well between four. Play QuickSands in the evening with a beer; it is the most fun ninety minutes of the trip and nobody keeps score.',
    days:[
      {label:'Day 1', course:'Gamble Sands', teeTime:'14:00', lodging:'The Cabins', notes:'Drive over from Seattle, drop bags, afternoon loop. Fairways you genuinely cannot miss.'},
      {label:'Day 2', course:'Scarecrow', teeTime:'09:00', lodging:'The Cabins', notes:'The 2024 course — bolder, tougher, more exposed. QuickSands at six.'},
      {label:'Day 3', course:'Gamble Sands', teeTime:'08:20', lodging:'—', notes:'Replay the original with everything you learned, then the long drive back.'}
    ]
  },
  {
    id:'floating-green', title:'The Floating Green', destinationId:'coeur-dalene',
    nights:3, travelers:4, level:'Something different',
    summary:'A boat ride to the first tee, an island green that moves, and pine forest golf up the road.',
    tips:'The resort course includes a forecaddie and the boat — take the earliest tee time you can, because the lake is glass before ten. Circling Raven is the better golf and half the price; do not skip it because it lacks the gimmick.',
    days:[
      {label:'Day 1', course:'Circling Raven', teeTime:'13:40', lodging:'Downtown hotel', notes:'Fly into Spokane, drive 45 minutes. Six hundred acres and nobody on it.'},
      {label:'Day 2', course:'Coeur d’Alene Resort', teeTime:'09:10', lodging:'The Coeur d’Alene Resort', notes:'Boat to the first tee. The 14th is moved to a new yardage each morning.'},
      {label:'Day 3', course:'The Idaho Club', teeTime:'10:00', lodging:'The Coeur d’Alene Resort', notes:'Nicklaus course up at Sandpoint, an hour north through the trees.'},
      {label:'Day 4', course:'Circling Raven', teeTime:'08:00', lodging:'—', notes:'Replay before the drive back to Spokane.'}
    ]
  },
  {
    id:'ozarks-five', title:'The Ozarks Architect Tour', destinationId:'paynes-valley',
    nights:3, travelers:4, level:'Architecture',
    summary:'Tiger, Coore & Crenshaw, Fazio and Player in four days, all on one property.',
    tips:'Ozarks National is the best golf here and Payne’s Valley is the best day out — play them on consecutive mornings and argue about it over dinner. The cave hole after Payne’s Valley’s 18th is not a real hole and is absolutely worth doing.',
    days:[
      {label:'Day 1', course:'Buffalo Ridge Springs', teeTime:'13:20', lodging:'Big Cedar Lodge', notes:'Land at Springfield, drive an hour. Fazio, with bison in the fields.'},
      {label:'Day 2', course:'Ozarks National', teeTime:'09:00', lodging:'Big Cedar Lodge', notes:'Coore & Crenshaw across the ridges. The connoisseur’s round.'},
      {label:'Day 3', course:'Payne’s Valley', teeTime:'09:40', lodging:'Big Cedar Lodge', notes:'Tiger’s first public design, finishing in a limestone cave.'},
      {label:'Day 4', course:'Mountain Top', teeTime:'08:30', lodging:'—', notes:'Thirteen short holes on foot, then home.'}
    ]
  },
  {
    id:'tahoe-summer', title:'Tahoe in Summer', destinationId:'lake-tahoe',
    nights:4, travelers:4, level:'Golf and lake',
    summary:'Four mountain rounds at 6,200 feet, with a lake to jump in afterwards.',
    tips:'Everything flies about ten percent further up here — take a club less all week and stop being surprised. Book Edgewood for a morning; the afternoon wind comes up the lake and the closing three holes stop being fun.',
    days:[
      {label:'Day 1', course:'Gray’s Crossing', teeTime:'14:00', lodging:'Truckee / Northstar hotel', notes:'Fly into Reno, 45 minutes up. High, open and a gentle start.'},
      {label:'Day 2', course:'Coyote Moon', teeTime:'09:30', lodging:'Truckee / Northstar hotel', notes:'Not a single house on the property. All pines and granite.'},
      {label:'Day 3', course:'Old Greenwood', teeTime:'09:00', lodging:'Truckee / Northstar hotel', notes:'Nicklaus among the tall trees. Afternoon on the lake.'},
      {label:'Day 4', course:'Edgewood Tahoe', teeTime:'08:20', lodging:'Edgewood Tahoe Lodge', notes:'Round the south shore. The last three holes run along the water.'},
      {label:'Day 5', course:'Incline Village (Championship)', teeTime:'08:00', lodging:'—', notes:'High above the north shore, then back to Reno.'}
    ]
  },
  {
    id:'red-rock-value', title:'Red Rock on a Budget', destinationId:'st-george',
    nights:3, travelers:8, level:'Best value',
    summary:'Four desert rounds among red rock canyons for less than one round in Scottsdale.',
    tips:'Fly into Las Vegas and drive the two hours — it is cheaper and easier than St. George’s own airport. Sand Hollow’s clifftop stretch is holes 10 to 13; take a camera and do not rush them. Zion is an hour away if anyone wants a day off.',
    days:[
      {label:'Day 1', course:'Sky Mountain', teeTime:'13:30', lodging:'St. George hotel', notes:'Drive up from Vegas, warm up on the cheapest views in Utah.'},
      {label:'Day 2', course:'Coral Canyon', teeTime:'09:20', lodging:'Sand Hollow villas', notes:'Red rock and old lava flows.'},
      {label:'Day 3', course:'Sand Hollow (Championship)', teeTime:'09:00', lodging:'Sand Hollow villas', notes:'The main event. Holes 10 through 13 run along the canyon rim.'},
      {label:'Day 4', course:'Entrada at Snow Canyon', teeTime:'08:00', lodging:'—', notes:'Lava fields on the back nine, then the drive back to LAS.'}
    ]
  }
];

/* ============================================================
   PARKED — international destinations
   Not rendered. To bring one back, give it a `usRegion`
   replacement (or add an "International" option to the region
   filter) and move it into DESTINATIONS above.
   ============================================================ */
const PARKED_INTERNATIONAL = [
  { id:'st-andrews',        name:'St Andrews & Fife',  region:'Scotland' },
  { id:'sw-ireland',        name:'Southwest Ireland',  region:'Kerry & Clare, Ireland' },
  { id:'cabot-cape-breton', name:'Cabot Cape Breton',  region:'Nova Scotia, Canada' },
  { id:'algarve',           name:'The Algarve',        region:'Portugal' },
  { id:'melbourne-sandbelt',name:'Melbourne Sandbelt', region:'Victoria, Australia' },
  { id:'barnbougle',        name:'Barnbougle',         region:'Tasmania, Australia' },
  { id:'los-cabos',         name:'Los Cabos',          region:'Baja California Sur, Mexico' }
];

/* ---------- helpers ---------- */
const DEST_BY_ID = Object.fromEntries(DESTINATIONS.map(d => [d.id, d]));
const TRIP_BY_ID   = Object.fromEntries(EXAMPLE_TRIPS.map(t => [t.id, t]));
const TRIP_BY_DEST = Object.fromEntries(EXAMPLE_TRIPS.map(t => [t.destinationId, t]));
const PRICE_LABEL = {1:'$', 2:'$$', 3:'$$$', 4:'$$$$'};
const PRICE_WORD  = {1:'Budget', 2:'Moderate', 3:'Premium', 4:'Splurge'};

