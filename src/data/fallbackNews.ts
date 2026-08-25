import { Article, NewsCategory } from '../types';

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 'breaking-ai-quantum-leap-2026',
    title: 'Next-Generation Neural Architectures Achieve Breakthrough in Real-Time Reasoning & Edge Inference',
    description: 'Researchers unveil ultra-efficient multimodal models capable of executing complex scientific reasoning locally on consumer hardware without cloud dependencies.',
    content: `A collaborative initiative between top global computer science institutes and leading research labs has published groundbreaking benchmarks demonstrating next-generation neural architectures running full-chain scientific reasoning locally.

Unlike traditional large language models that require massive server racks and gigawatts of data center electricity, the new architecture compresses active memory footprint by 82% while enhancing symbolic and mathematical accuracy.

"We are witnessing a monumental transition from brute-force scale to precision algorithmic efficiency," stated Dr. Elena Rostova, lead investigator at the European Center for Advanced AI. "Devices ranging from smartphones to medical diagnostic equipment can now deliberate through multi-step hypotheses in milliseconds."

Key industry analysts anticipate rapid adoption across autonomous robotics, privacy-first healthcare devices, and localized industrial automation systems over the next fiscal quarters.`,
    url: 'https://techcrunch.com',
    urlToImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Marcus Vance',
    category: 'technology',
    readTimeMinutes: 4,
    isBreaking: true,
    isTrending: true,
    keyPoints: [
      '82% reduction in memory footprint without loss of reasoning capability',
      'Enables true local AI execution on edge consumer devices and IoT',
      'Massive reduction in carbon footprint compared to cloud LLM clusters',
      'Anticipated deployment in surgical diagnostics and autonomous transport'
    ]
  },
  {
    id: 'india-space-chandrayaan-deepspace',
    title: 'ISRO Announces Advanced Lunar Outpost and Solar Probe Mission Milestones',
    description: 'India space agency outlines ambitious next-phase milestones including permanent lunar orbit stations, deep-space optical communication, and joint global science missions.',
    content: `The Indian Space Research Organisation (ISRO) has officially unveiled its roadmap for the upcoming decade, confirming scheduled progress on automated lunar resource mapping and interplanetary probes.

Addressing delegates at the International Aerospace Summit in Bengaluru, senior scientists demonstrated successful telemetry checks on high-speed laser optical communications designed to transmit gigabit-per-second scientific payloads from deep space back to ground stations.

The program also strengthens collaborative scientific protocols with international space agencies for asteroid sample returns and continuous climate monitoring of Earth's atmosphere.

"India's space exploration paradigm emphasizes cost efficiency, indigenous technology synthesis, and open scientific data dissemination for humanity," the mission director declared during the briefing.`,
    url: 'https://timesofindia.indiatimes.com',
    urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    source: { id: 'the-times-of-india', name: 'Times of India' },
    author: 'Priya Narayanan',
    category: 'india',
    readTimeMinutes: 5,
    isBreaking: true,
    isTrending: true,
    keyPoints: [
      'New gigabit optical laser communication proven in ground-station trials',
      'Permanent lunar mapping array scheduled for deployment next year',
      'Joint asteroid sample-return collaboration with international partners',
      'Major push for indigenous propulsion and renewable spacecraft avionics'
    ]
  },
  {
    id: 'global-markets-green-energy-rally',
    title: 'Global Markets Rally as Clean Energy Investments Surpass $2 Trillion Milestone',
    description: 'Equities surge across international exchanges as institutional investors pour record capital into solid-state battery manufacturing and next-gen solar grids.',
    content: `Global financial markets registered strong gains across European, Asian, and American trading desks today following economic reports confirming global clean energy capital expenditures crossed the landmark $2 trillion mark ahead of scheduled projections.

Renewable energy infrastructure suppliers and energy storage developers led broad index rallies, supported by accelerated commercial deployments of solid-state grid batteries and perovskite solar cells with record conversion efficiency.

Central banks and development funds emphasized that sustainable infrastructure projects have achieved cost parity with fossil counterparts, creating self-reinforcing economic incentives for sovereign wealth funds.

"We have passed the tipping point where clean infrastructure is simply the superior economic decision regardless of regulatory subsidies," commented a chief macro strategist at Goldman Sachs.`,
    url: 'https://bloomberg.com',
    urlToImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    source: { id: 'bloomberg', name: 'Bloomberg' },
    author: 'Sarah Jenkins',
    category: 'business',
    readTimeMinutes: 3,
    isTrending: true,
    keyPoints: [
      'Global clean energy capex tops $2T annually for the first time',
      'Perovskite solar commercial efficiency climbs to record 29.4%',
      'Sovereign funds accelerate capital allocation to grid-scale batteries',
      'Broad market indices up 1.8% across major international exchanges'
    ]
  },
  {
    id: 'sports-champions-league-thriller',
    title: 'Champions League Quarter-Final: Dramatic 94th-Minute Volley Seals Historic Comeback',
    description: 'In one of the most thrilling matches in European football history, an underdog squad overturns a three-goal deficit in extra time to secure a semi-final spot.',
    content: `Football enthusiasts were treated to an unforgettable evening of high-stakes drama as underdog contenders stunned stadium spectators with three second-half goals and a sensational 94th-minute volley from 25 yards out.

The thrilling 4-3 aggregate victory propelled the team into the UEFA Champions League semi-finals for the first time in over four decades. Tactical substitutions in the 70th minute revitalized the midfield pressing game, catching the tournament favorites off guard.

Managerial press conferences praised the squad's relentless conditioning and composure under severe pressure.

"When you believe in the collective blueprint and refuse to concede an inch, magical moments become reality," the winning captain exclaimed in an emotional post-match interview.`,
    url: 'https://espn.com',
    urlToImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    source: { id: 'espn', name: 'ESPN' },
    author: 'David Thorne',
    category: 'sports',
    readTimeMinutes: 3,
    isTrending: true,
    keyPoints: [
      'Underdogs overcome 3-0 first-leg deficit to win 4-3 on aggregate',
      'Sensational 94th-minute volley from 25 yards outside the box',
      'First Champions League semi-final qualification in 42 years',
      'Man of the match awarded to 21-year-old substitute playmaker'
    ]
  },
  {
    id: 'health-mrna-cancer-vaccine-trials',
    title: 'Personalized mRNA Oncology Therapies Show 88% Success in Phase III Clinical Trials',
    description: 'Groundbreaking clinical trial results demonstrate custom-tailored mRNA vaccines effectively preventing tumor recurrence across multiple aggressive cancer strains.',
    content: `Medical researchers at leading oncology centers in London, Boston, and Tokyo have released definitive Phase III trial data showing personalized mRNA vaccines preventing cancer recurrence in 88% of high-risk patients.

The therapy works by sequencing an individual patient's biopsy to identify unique neoantigens, then engineering an mRNA payload within 48 hours to train the patient's immune cytotoxic T-cells to eradicate microscopic remnants.

Health authorities are expediting fast-track regulatory reviews to enable clinical availability in participating hospital networks before year-end.

"This is the holy grail of precision immunology," said Dr. Aris Thorne. "Instead of blanket chemotherapy, we are equipping the human body's own defense system with pinpoint radar targeting."`,
    url: 'https://nature.com',
    urlToImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Dr. Evelyn Claire',
    category: 'health',
    readTimeMinutes: 4,
    isBreaking: false,
    isTrending: true,
    keyPoints: [
      '88% prevention rate of aggressive recurrence in Phase III cohort',
      'Rapid 48-hour turn-around from genetic biopsy to custom mRNA synthesis',
      'Minimal systemic side effects compared to traditional chemotherapy',
      'Fast-track approval submissions initiated across FDA, EMA, and CDSCO'
    ]
  },
  {
    id: 'science-james-webb-exoplanet-biosignatures',
    title: 'James Webb Telescope Detects Atmospheric Water Vapor and Biosignature Gases on Habitable Zone World',
    description: 'Astronomers identify atmospheric methane, carbon dioxide, and sulfur isotopes on LHS 1140b, a super-Earth located 48 light-years away in the constellation Cetus.',
    content: `Deep transmission spectroscopic data captured by the James Webb Space Telescope (JWST) has confirmed the existence of a substantial nitrogen-rich atmosphere on LHS 1140b, an exoplanet orbiting within its star's temperate habitable zone.

The planetary radius and density measurements indicate an ocean world covered with a global liquid water ocean under a temperate sky. Spectrograms revealed distinct absorption spikes corresponding to atmospheric methane and dimethyl sulfide candidates.

Astrophysicists emphasize that while further observational cycles are required to rule out non-biological geochemical sources, this represents humanity's most compelling candidate for extraterrestrial biosignatures discovered to date.

"For generations we have stared into the night sky wondering if habitable oceans exist beyond our solar system. Today, spectroscopic physics is providing an astonishing answer," noted the lead observatory scientist.`,
    url: 'https://bbc.com/news',
    urlToImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'Clara Oswald',
    category: 'science',
    readTimeMinutes: 5,
    keyPoints: [
      'Confirmed liquid water atmosphere on super-Earth 48 light-years distant',
      'JWST NIRSpec instrument captures distinct biosignature isotope signatures',
      'Planetary temperature supports liquid ocean and moderate greenhouse balance',
      'Extended 100-hour observation campaign scheduled for next astronomical cycle'
    ]
  },
  {
    id: 'entertainment-cannes-film-festival-ai-masterpiece',
    title: 'Cannes Film Festival Stunned by Indie Director Cinema Fusion Blending Handcrafted Sets and Generative VFX',
    description: 'A captivating psychological sci-fi drama garners a 12-minute standing ovation, hailed as a defining cinematic landmark bridging human storytelling with revolutionary visual computing.',
    content: `The 79th Cannes Film Festival witnessed an electrifying world premiere this evening as director Maya Lin unveiled 'Echoes of Chronos', an ambitious cinematic work that seamlessly melded physical 70mm analog film cinematography with bespoke generative neural VFX pipelines.

Audience members gave the production a standing ovation lasting twelve continuous minutes, with critics hailing the film's philosophical narrative and visual poetry.

Unlike uninspired synthetic graphics, the production utilized custom open-source visual models trained strictly on the director's own hand-painted concept sketches and miniature set photography.

"This is not about replacing artists with computers; it is about giving independent visionaries the canvas of a $200 million studio on an indie budget," Lin remarked on the red carpet.`,
    url: 'https://variety.com',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    source: { id: 'the-verge', name: 'The Verge' },
    author: 'Julian Croft',
    category: 'entertainment',
    readTimeMinutes: 3,
    keyPoints: [
      '12-minute standing ovation at prestigious Cannes world premiere',
      'Hybrid production pipeline uniting 70mm analog film and neural effects',
      'Artistic models strictly trained on the director own concept paintings',
      'Worldwide theatrical and streaming distribution rights acquired in record bidding'
    ]
  },
  {
    id: 'general-global-cybersecurity-treaty-signed',
    title: '54 Nations Ratify Comprehensive Global Cybersecurity & Infrastructure Protection Treaty',
    description: 'International delegates in Geneva formalize binding norms banning cyberattacks against civilian healthcare, energy grids, and air traffic control systems.',
    content: `Diplomats from 54 member nations concluded historic negotiations in Geneva today by signing the International Convention on Critical Infrastructure Cyber Defense.

The treaty establishes legally binding international protocols prohibiting state-sponsored digital espionage or destructive attacks directed at civilian emergency systems, hospitals, water supplies, and electrical distribution grids.

An autonomous multilateral verification council supported by open-source cryptographic forensics will monitor compliance and issue publicly transparent threat attribution bulletins.

"In an interconnected century, the safety of civilian infrastructure is indivisible. This treaty provides an essential safeguard for the modern digital age," stated the UN High Commissioner during the signing ceremony.`,
    url: 'https://reuters.com',
    urlToImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Alain Dubois',
    category: 'general',
    readTimeMinutes: 4,
    keyPoints: [
      '54 countries sign binding agreement safeguarding civilian digital networks',
      'Explicit prohibition on attacking hospitals, power grids, and air control',
      'Independent cryptographic forensics agency established for attribution',
      'Implementation protocols take effect within 90 calendar days'
    ]
  },
  {
    id: 'india-digital-rupee-upi-expansion',
    title: 'India UPI and Digital Rupee Cross 18 Billion Monthly Transactions, Expanding to 22 Global Countries',
    description: 'Unified Payments Interface achieves historic volume milestone as seamless cross-border QR code settlement goes live across Europe, Middle East, and Southeast Asia.',
    content: `India digital payment ecosystem has reached another monumental threshold, with the National Payments Corporation of India (NPCI) reporting a staggering 18.2 billion transactions processed in the last 30-day billing cycle.

Simultaneously, bilateral linkages enabling instant zero-fee traveler payments with domestic UPI apps have officially launched in France, the UAE, Singapore, Japan, and the United Kingdom.

Financial technology analysts point to the interoperable instant architecture as a worldwide benchmark for modern real-time financial rail modernization.

"The democratization of frictionless digital commerce has empowered over 60 million small street vendors and entrepreneurs across every district of India," noted the Reserve Bank of India fintech director.`,
    url: 'https://ndtv.com',
    urlToImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    source: { id: 'ndtv', name: 'NDTV' },
    author: 'Rohan Deshmukh',
    category: 'india',
    readTimeMinutes: 3,
    keyPoints: [
      '18.2 billion monthly transactions registered across UPI network',
      'Cross-border traveler payments live across 22 foreign countries',
      '60+ million small merchants integrated into zero-friction settlement',
      'Central Bank Digital Currency (CBDC) pilot reaches 5 million active wallets'
    ]
  },
  {
    id: 'tech-quantum-computing-chip-silicon',
    title: 'Silicon-Spin Quantum Processors Surpass 99.9% Two-Qubit Gate Fidelity at Scale',
    description: 'Semiconductor breakthrough allows quantum chips to be manufactured in standard commercial silicon fabs at room temperature tolerances.',
    content: `Quantum computing hardware has crossed an indispensable commercial threshold today as silicon-spin quantum processors demonstrated 99.94% gate fidelity across multi-qubit fault-tolerant arrays.

Critically, the fabrication technique utilizes standard CMOS semiconductor manufacturing equipment already operational in major commercial silicon foundries, paving the way for cost-effective mass production.

Engineers demonstrated the chip executing complex quantum chemistry simulations modeling nitrogenase enzyme catalysts for zero-emission fertilizer production.

"By building quantum processors directly onto standard industrial silicon wafers, we bypass millions of dollars in custom boutique hardware," highlighted the chief technology officer.`,
    url: 'https://wired.com',
    urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    source: { id: 'wired', name: 'Wired' },
    author: 'Kevin Scott',
    category: 'technology',
    readTimeMinutes: 4,
    keyPoints: [
      '99.94% gate fidelity achieved on silicon-spin qubit architecture',
      'Fully compatible with existing commercial CMOS semiconductor fabs',
      'Successfully modeled complex enzyme catalysts for clean chemistry',
      'First commercial developer test-kits shipping to university labs'
    ]
  },
  {
    id: 'sports-olympic-cricket-los-angeles',
    title: 'Olympic Cricket Format Announced for LA 2028: Fast-Paced T20 Tournament to Feature Top 8 Nations',
    description: 'International Olympic Committee reveals competition structure, venue designs, and qualification pathways for cricket historic Olympic return in California.',
    content: `The International Olympic Committee (IOC) alongside the International Cricket Council (ICC) has formalized tournament arrangements for cricket return to the Olympic Games at LA 2028.

The competition will feature an 8-team men and women Twenty20 tournament staged at an ultramodern pop-up cricket stadium in Southern California equipped with drop-in hybrid pitches.

Broadcast executives project record global viewership exceeding 3 billion cumulative viewers across the subcontinent, North America, the Caribbean, and Australasia.

"Cricket inclusion brings the passion of over two billion worldwide supporters into the Olympic movement," declared IOC leadership during the Los Angeles coordination commission press briefing.`,
    url: 'https://espncricinfo.com',
    urlToImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    source: { id: 'espn', name: 'ESPN Cricinfo' },
    author: 'Samir Ghosh',
    category: 'sports',
    readTimeMinutes: 3,
    keyPoints: [
      '8-nation men and women T20 tournaments confirmed for LA 2028',
      'State-of-the-art pop-up stadium with drop-in hybrid pitches in California',
      'Anticipated 3+ billion global cumulative broadcast audience',
      'Official qualification roadmap starts with Continental Championships'
    ]
  },
  {
    id: 'business-ai-semiconductor-market-growth',
    title: 'Next-Gen High-Bandwidth Memory Architecture Slashes Data Center Power Consumption by 40%',
    description: 'Leading memory manufacturers announce commercial shipment of 3D-stacked optical memory modules designed for hyperscale AI compute clusters.',
    content: `Leading semiconductor manufacturers have commenced volume shipments of 3D-stacked optical high-bandwidth memory (HBM4) modules, providing data centers with a 40% reduction in thermal and electrical power dissipation.

The breakthrough integrates silicon photonics interconnects directly onto the memory die, replacing energy-intensive copper traces with high-speed micro-lasers.

Cloud providers have placed immediate priority orders to combat grid energy constraints that have previously slowed the construction of sustainable hyperscale compute campuses.

"Optical interconnects unlock unprecedented memory bandwidth while keeping enterprise energy bills within carbon-neutral commitments," stated an industry senior analyst.`,
    url: 'https://wsj.com',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
    source: { id: 'the-wall-street-journal', name: 'Wall Street Journal' },
    author: 'Teresa Sterling',
    category: 'business',
    readTimeMinutes: 4,
    keyPoints: [
      '40% reduction in power consumption for AI cloud infrastructure',
      'Silicon photonics micro-lasers replace copper interconnect traces',
      'Enables 3.2 Terabytes/sec throughput per individual accelerator package',
      'Shipments underway to major hyperscale cloud infrastructure providers'
    ]
  }
];

export const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  general: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  health: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  science: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
  india: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
};

export const TRENDING_TAGS = [
  'Artificial Intelligence',
  'Quantum Computing',
  'Space Exploration',
  'Clean Energy',
  'India Tech & UPI',
  'Champions League',
  'Global Markets',
  'Cancer Immunotherapy',
  'LA 2028 Olympics'
];
