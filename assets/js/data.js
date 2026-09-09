/* ============================================================
   The Annual Golf Trip — destination + trip dataset
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

const US_REGIONS = ['West', 'Southwest', 'Midwest', 'Southeast', 'Northeast', 'Hawaii'];

const DESTINATIONS = [
  /* ---------------------------------------------- WEST ---- */
  {
    id:'bandon-dunes', name:'Bandon Dunes', region:'Oregon', country:'USA',
    usRegion:'West', style:'links', palette:['#8fb8d6','#c9d8b8','#7e9455','#d9cba4'],
    tagline:'Five walking-only links laid over Pacific clifftop dunes — the purest golf trip in America.',
    blurb:'A remote stretch of southern Oregon coast turned into a golf pilgrimage site. Every course is walking-only with caddies, the wind is a genuine hazard, and there is nothing to do but play, eat and play again. The archetypal buddies trip.',
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'North Bend (OTH), 30 min · Eugene (EUG), 2h45',
    travelEase:4, travelNote:'North Bend is tiny and weather-prone. Most people fly to Eugene or Portland and drive — budget most of a day each way.',
    priceTier:3, editorScore:9.7, seedScore:4.8, seedVotes:412,
    access:'Resort — public, guests get priority tee times',
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
    season:'April – October', seasonMonths:[4,5,6,7,8,9,10],
    airport:'Monterey (MRY), 20 min · San Jose (SJC), 1h20',
    travelEase:2, travelNote:'Monterey has limited service; San Jose is 80 minutes and much better connected.',
    priceTier:4, editorScore:9.2, seedScore:4.5, seedVotes:531,
    access:'Pebble tee times require a resort stay for guaranteed access',
    goodFor:['buddies', 'couples', 'architecture'],
    site:'https://www.pebblebeach.com',
    highlights:['Bucket-list par 3s at 7 and 17','Resort package guarantees Pebble access','Carmel-by-the-Sea is a real town, not a resort strip'],
    watchouts:['Highest green fees in North America','Summer marine fog can erase the views'],
    courses:[
      {name:'Pebble Beach Golf Links', designer:'Neville & Grant', par:72, tier:4, url:'https://www.pebblebeach.com', note:'Resort guests book 18 months out'},
      {name:'Spyglass Hill', designer:'Robert Trent Jones Sr.', par:72, tier:4, url:'https://www.pebblebeach.com', note:'First five holes in the dunes'},
      {name:'The Links at Spanish Bay', designer:'Jones Jr. / Watson', par:72, tier:3, url:'https://www.pebblebeach.com', note:'Bagpiper at sunset'},
      {name:'Bayonet / Black Horse', designer:'Gen. Robert McClure', par:72, tier:2, url:'https://www.bayonetblackhorse.com', note:'Best value on the peninsula'},
      {name:'Pacific Grove Municipal', designer:'Egan / Chandler', par:70, tier:1, url:'https://www.playpacificgrove.com', note:'"The poor man’s Pebble"'}
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
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Redmond (RDM), 20 min · Portland (PDX), 3h drive',
    travelEase:2, travelNote:'Redmond is a small but reliable regional airport 20 minutes from Bend.',
    priceTier:2, editorScore:8.3, seedScore:4.4, seedVotes:132,
    access:'Mix of public and resort-guest courses',
    goodFor:['buddies', 'couples', 'families'],
    site:'https://www.visitbend.com',
    highlights:['Cool, dry summer conditions','Short drives between courses','Genuinely good non-golf options'],
    watchouts:['Some courses are resort-guest only','Wildfire smoke can affect late summer'],
    courses:[
      {name:'Juniper Preserve (Nicklaus)', designer:'Jack Nicklaus', par:72, tier:3, url:'https://juniperpreserve.com', note:'Formerly Pronghorn; resort guests'},
      {name:'Crosswater at Sunriver', designer:'Bob Cupp', par:72, tier:3, url:'https://www.sunriverresort.com', note:'Resort guests only'},
      {name:'Tetherow', designer:'David McLay Kidd', par:72, tier:2, url:'https://www.tetherow.com', note:'Fescue and firm ground'},
      {name:'Brasada Canyons', designer:'Peter Jacobsen', par:72, tier:2, url:'https://www.brasada.com', note:'Canyon holes, big views'},
      {name:'Black Butte Ranch (Big Meadow)', designer:'Robert Muir Graves', par:72, tier:2, url:'https://www.blackbutteranch.com', note:'Classic mountain parkland'}
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
    season:'November – April', seasonMonths:[11,12,1,2,3,4],
    airport:'Palm Springs (PSP), 20 min · LAX, 2h30 drive',
    travelEase:1, travelNote:'Direct into Palm Springs, or drive out from LA in about two and a half hours.',
    priceTier:2, editorScore:8.2, seedScore:4.2, seedVotes:380,
    access:'Public and resort daily-fee throughout',
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
      {name:'SilverRock', designer:'Arnold Palmer', par:72, tier:2, url:'https://www.silverrock.org', note:'Good value, big mountain backdrop'}
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
    season:'November – April', seasonMonths:[11,12,1,2,3,4],
    airport:'Phoenix Sky Harbor (PHX), 25 min',
    travelEase:1, travelNote:'Phoenix is a major hub with direct flights from almost everywhere, 25 minutes from the courses.',
    priceTier:2, editorScore:8.4, seedScore:4.3, seedVotes:449,
    access:'Almost entirely public / resort daily-fee',
    goodFor:['buddies', 'biggroup'],
    site:'https://www.experiencescottsdale.com',
    highlights:['Easiest logistics of any destination here','Huge range of price points','Nightlife actually exists'],
    watchouts:['Peak-season rates triple','Target golf — not everyone’s taste'],
    courses:[
      {name:'TPC Scottsdale (Stadium)', designer:'Weiskopf / Morrish', par:71, tier:3, url:'https://tpc.com/scottsdale', note:'The 16th amphitheatre'},
      {name:'We-Ko-Pa (Saguaro)', designer:'Coore & Crenshaw', par:71, tier:2, url:'https://www.wekopa.com', note:'Walkable, no houses'},
      {name:'We-Ko-Pa (Cholla)', designer:'Scott Miller', par:72, tier:2, url:'https://www.wekopa.com', note:'Big desert views'},
      {name:'Troon North (Monument)', designer:'Weiskopf / Morrish', par:72, tier:3, url:'https://www.troonnorthgolf.com', note:'Boulder-strewn classic'},
      {name:'Grayhawk (Raptor)', designer:'Tom Fazio', par:72, tier:3, url:'https://www.grayhawkgolf.com', note:'NCAA championship host'}
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
    season:'October – May', seasonMonths:[10,11,12,1,2,3,4,5],
    airport:'Harry Reid (LAS), 15 min to most courses',
    travelEase:1, travelNote:'One of the best-connected airports in the country, 15 minutes from most tee times.',
    priceTier:3, editorScore:8.0, seedScore:4.1, seedVotes:410,
    access:'Shadow Creek and Wynn require a linked resort stay',
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
      {name:'Rio Secco', designer:'Rees Jones', par:72, tier:2, nolink:true, note:'Butch Harmon’s home base'}
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
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Central Wisconsin (CWA), 45 min · Madison (MSN), 1h45',
    travelEase:3, travelNote:'Central Wisconsin is a small regional airport; most people fly to Madison or Milwaukee and drive two hours.',
    priceTier:2, editorScore:9.1, seedScore:4.6, seedVotes:158,
    access:'Resort — public; The Lido is guest-access limited',
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
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Milwaukee (MKE), 1h · Chicago O’Hare (ORD), 2h30',
    travelEase:2, travelNote:'Milwaukee is an easy hour away; Chicago adds another ninety minutes.',
    priceTier:3, editorScore:8.7, seedScore:4.4, seedVotes:221,
    access:'Resort — public, guests get preferred rates',
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
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'Traverse City (TVC), 30 min · Grand Rapids (GRR), 2h30',
    travelEase:3, travelNote:'Traverse City is easy in summer, thinner the rest of the year — and the courses are spread over a two-hour radius.',
    priceTier:2, editorScore:8.5, seedScore:4.5, seedVotes:164,
    access:'All listed courses are public / resort daily-fee',
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
      {name:'The Highlands (Arthur Hills)', designer:'Arthur Hills', par:72, tier:2, url:'https://www.boyne.com', note:'Best value up north'}
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
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'North Platte (LBF) · Valentine (VTN) · Denver (DEN), 5h drive',
    travelEase:4, travelNote:'There is no easy way in. Fly to North Platte or Valentine on a small plane, or drive five hours from Denver.',
    priceTier:2, editorScore:9.0, seedScore:4.7, seedVotes:84,
    access:'Sand Hills GC and CapRock are PRIVATE — Prairie Club is public',
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
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Raleigh-Durham (RDU), 1h15 · Fayetteville (FAY), 50 min',
    travelEase:2, travelNote:'Raleigh-Durham is a good airport and a straightforward 75-minute drive.',
    priceTier:3, editorScore:9.3, seedScore:4.6, seedVotes:377,
    access:'Resort — public, stay-and-play packages',
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
      {name:'The Cradle', designer:'Gil Hanse', par:27, tier:1, url:'https://www.pinehurst.com', note:'Nine short holes, replay all day'}
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
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Charleston (CHS), 55 min',
    travelEase:2, travelNote:'Charleston is well connected and just under an hour from the island.',
    priceTier:3, editorScore:8.8, seedScore:4.4, seedVotes:262,
    access:'Ocean Course prioritises resort guests',
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
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Myrtle Beach (MYR), 20 min · Charleston (CHS), 2h',
    travelEase:1, travelNote:'Myrtle Beach has plenty of seasonal direct service and the courses start 20 minutes away.',
    priceTier:1, editorScore:8.0, seedScore:4.2, seedVotes:520,
    access:'Entirely public — book through a package operator',
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
      {name:'TPC Myrtle Beach', designer:'Tom Fazio', par:72, tier:2, url:'https://www.tpcmyrtlebeach.com', note:'Best conditioned on the Strand'}
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
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Hilton Head (HHH), 15 min · Savannah (SAV), 45 min',
    travelEase:2, travelNote:'Hilton Head’s own airport is small; Savannah is 45 minutes and far cheaper.',
    priceTier:2, editorScore:8.4, seedScore:4.4, seedVotes:298,
    access:'Resort daily-fee; Harbour Town books well ahead',
    goodFor:['families', 'couples', 'biggroup'],
    site:'https://www.seapines.com',
    highlights:['RBC Heritage host every April','Palmetto Bluff is worth the 30-minute drive','Bike everywhere — no car needed once you arrive'],
    watchouts:['Harbour Town rates spike around the tournament','Island traffic in peak summer'],
    courses:[
      {name:'Harbour Town Golf Links', designer:'Pete Dye / Jack Nicklaus', par:71, tier:3, url:'https://www.seapines.com', note:'The lighthouse 18th'},
      {name:'May River at Palmetto Bluff', designer:'Jack Nicklaus', par:72, tier:3, url:'https://www.palmettobluff.com', note:'Walking with caddies'},
      {name:'Atlantic Dunes', designer:'Davis Love III', par:72, tier:2, url:'https://www.seapines.com', note:'Sea Pines’ rebuilt third course'},
      {name:'Heron Point', designer:'Pete Dye', par:72, tier:2, url:'https://www.seapines.com', note:'Dye at his most playable'},
      {name:'Palmetto Dunes (RTJ Oceanfront)', designer:'Robert Trent Jones Sr.', par:72, tier:2, url:'https://www.palmettodunes.com', note:'The only oceanfront hole on the island'}
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
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Brunswick (BQK), 25 min · Jacksonville (JAX), 1h20',
    travelEase:3, travelNote:'Brunswick is small, so most people fly into Jacksonville and drive 80 minutes.',
    priceTier:3, editorScore:8.7, seedScore:4.6, seedVotes:173,
    access:'Resort guests and members',
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
    season:'October – April', seasonMonths:[10,11,12,1,2,3,4],
    airport:'Tampa (TPA), 1h20 · Orlando (MCO), 1h30',
    travelEase:2, travelNote:'Tampa is a major hub, then an 80-minute drive into empty cattle country.',
    priceTier:2, editorScore:8.9, seedScore:4.4, seedVotes:203,
    access:'Resort — public, best rates for overnight guests',
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
    season:'October – April', seasonMonths:[10,11,12,1,2,3,4],
    airport:'Orlando (MCO), 20–40 min',
    travelEase:1, travelNote:'Cheap direct flights from nearly anywhere, and the courses are 20 to 40 minutes out.',
    priceTier:2, editorScore:7.9, seedScore:4.0, seedVotes:356,
    access:'Mostly public / resort; Bay Hill needs a lodge stay',
    goodFor:['families', 'biggroup'],
    site:'https://www.visitorlando.com',
    highlights:['Cheapest flights of any destination here','Non-golfers have plenty to do','Pairs naturally with a Streamsong overnight'],
    watchouts:['Afternoon thunderstorms most summer days','A lot of forgettable resort golf — choose carefully'],
    courses:[
      {name:'Bay Hill Club & Lodge', designer:'Dick Wilson / Arnold Palmer', par:72, tier:3, url:'https://www.bayhill.com', note:'Lodge guests only'},
      {name:'Grand Cypress (New)', designer:'Jack Nicklaus', par:72, tier:2, url:'https://golfgrandcypress.com', note:'St Andrews homage'},
      {name:'Reunion Resort (Watson)', designer:'Tom Watson', par:72, tier:2, url:'https://www.reunionresort.com', note:'Best of Reunion’s three'},
      {name:'Shingle Creek', designer:'Arnold Palmer Design', par:72, tier:2, url:'https://www.shinglecreekgolf.com', note:'Convenient and solid'},
      {name:'Orange County National (Panther Lake)', designer:'Ritson / Harman', par:72, tier:2, url:'https://www.ocngolf.com', note:'Great practice facility'}
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
    season:'March – May, September – November', seasonMonths:[3,4,5,9,10,11],
    airport:'Birmingham (BHM) · Montgomery (MGM) · Atlanta (ATL), 2h',
    travelEase:2, travelNote:'Birmingham and Montgomery are easy enough, Atlanta is two hours — but the trail itself means an hour of driving between sites.',
    priceTier:1, editorScore:7.8, seedScore:4.1, seedVotes:187,
    access:'Fully public — trail card gets you on everything',
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
      {name:'Highland Oaks', designer:'Robert Trent Jones Sr.', par:72, tier:1, url:'https://www.rtjgolf.com', note:'Deep value in the south of the state'}
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
    season:'May – October', seasonMonths:[5,6,7,8,9,10],
    airport:'JFK, 45 min · LaGuardia (LGA), 1h',
    travelEase:1, travelNote:'JFK and LaGuardia put you 45 minutes from Bethpage. Nothing on this list is easier to reach.',
    priceTier:1, editorScore:8.6, seedScore:4.4, seedVotes:226,
    access:'Bethpage via NY State reservation system or the walk-up line',
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
      {name:'National Golf Links', designer:'C.B. Macdonald', par:73, private:true, note:'Private — the template original'}
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
    season:'Year-round · best April – May, September – November',
    seasonMonths:[1,2,3,4,5,6,7,8,9,10,11,12],
    airport:'Kahului (OGG), 45 min to Kapalua',
    travelEase:3, travelNote:'Kahului takes direct flights from the West Coast, but it is a five-hour flight minimum and much longer from the East.',
    priceTier:3, editorScore:8.8, seedScore:4.6, seedVotes:241,
    access:'Resort daily-fee; guest rates are meaningfully lower',
    goodFor:['couples', 'families'],
    site:'https://www.gohawaii.com/islands/maui',
    highlights:['Plantation Course hosts the Tour’s January opener','Wailea has three courses on one road','Whale watching from the tee in winter'],
    watchouts:['Trade winds are constant — club accordingly','West Maui is still rebuilding after the 2023 wildfires; check conditions and support local businesses'],
    courses:[
      {name:'Kapalua (Plantation)', designer:'Coore & Crenshaw', par:73, tier:4, url:'https://golfatkapalua.com', note:'The Sentry host'},
      {name:'Kapalua (Bay)', designer:'Palmer / Seay', par:72, tier:3, url:'https://golfatkapalua.com', note:'Oceanfront 5th'},
      {name:'Wailea (Gold)', designer:'Robert Trent Jones Jr.', par:72, tier:3, url:'https://www.waileagolf.com', note:'Best of the Wailea three'},
      {name:'Wailea (Emerald)', designer:'Robert Trent Jones Jr.', par:72, tier:3, url:'https://www.waileagolf.com', note:'Most forgiving'},
      {name:'Ka’anapali (Royal)', designer:'Robert Trent Jones Sr.', par:71, tier:3, url:'https://www.kaanapaligolfcourses.com', note:'Resort classic'}
    ],
    lodging:[
      {name:'Ritz-Carlton Kapalua', type:'Luxury', tier:4},
      {name:'Wailea resort hotel', type:'Resort', tier:4},
      {name:'Condo rental', type:'Group split', tier:3}
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

/* how much of a hassle it is to get there, 1 = easiest */
const TRAVEL_WORD = {1:'Easy to reach', 2:'Straightforward', 3:'Takes some doing', 4:'A proper mission'};
const TRAVEL_SHORT= {1:'Easy', 2:'Straightforward', 3:'Some effort', 4:'A mission'};
