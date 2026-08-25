import { CityLocation, StateDistrictHierarchy } from '../types';

export const INDIAN_STATES_HIERARCHY: StateDistrictHierarchy[] = [
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    code: 'MP',
    capital: 'Bhopal',
    districts: [
      { id: 'bhopal-dist', name: 'Bhopal', cities: ['Bhopal', 'Berasia', 'Kolar'] },
      { id: 'indore-dist', name: 'Indore', cities: ['Indore', 'Mhow', 'Sanwer', 'Depalpur'] },
      { id: 'ujjain-dist', name: 'Ujjain', cities: ['Ujjain', 'Nagda', 'Mahidpur', 'Tarana'] },
      { id: 'jabalpur-dist', name: 'Jabalpur', cities: ['Jabalpur', 'Sihora', 'Patan', 'Panagar'] },
      { id: 'gwalior-dist', name: 'Gwalior', cities: ['Gwalior', 'Dabra', 'Bhitarwar'] },
      { id: 'rewa-dist', name: 'Rewa', cities: ['Rewa', 'Mauganj', 'Hanumana'] },
      { id: 'sagar-dist', name: 'Sagar', cities: ['Sagar', 'Bina', 'Khurai'] }
    ]
  },
  {
    id: 'bihar',
    name: 'Bihar',
    code: 'BR',
    capital: 'Patna',
    districts: [
      { id: 'patna-dist', name: 'Patna', cities: ['Patna', 'Danapur', 'Phulwari Sharif', 'Fatwah'] },
      { id: 'siwan-dist', name: 'Siwan', cities: ['Siwan', 'Maharajganj', 'Mairwa', 'Andar', 'Raghunathpur'] },
      { id: 'gaya-dist', name: 'Gaya', cities: ['Gaya', 'Bodh Gaya', 'Sherghati', 'Tekari'] },
      { id: 'muzaffarpur-dist', name: 'Muzaffarpur', cities: ['Muzaffarpur', 'Kanti', 'Motipur'] },
      { id: 'bhagalpur-dist', name: 'Bhagalpur', cities: ['Bhagalpur', 'Kahalgaon', 'Naugachhia'] },
      { id: 'nalanda-dist', name: 'Nalanda', cities: ['Bihar Sharif', 'Rajgir', 'Hilsa'] }
    ]
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    code: 'MH',
    capital: 'Mumbai',
    districts: [
      { id: 'mumbai-city-dist', name: 'Mumbai City', cities: ['Mumbai', 'Colaba', 'Dadar', 'Bandra', 'Andheri'] },
      { id: 'pune-dist', name: 'Pune', cities: ['Pune', 'Pimpri-Chinchwad', 'Baramati', 'Talegaon'] },
      { id: 'nagpur-dist', name: 'Nagpur', cities: ['Nagpur', 'Kamptee', 'Umred', 'Katol'] },
      { id: 'thane-dist', name: 'Thane', cities: ['Thane', 'Kalyan', 'Dombivli', 'Navi Mumbai'] },
      { id: 'nashik-dist', name: 'Nashik', cities: ['Nashik', 'Malegaon', 'Sinnar'] },
      { id: 'chhatrapati-sambhajinagar-dist', name: 'Chhatrapati Sambhajinagar', cities: ['Aurangabad', 'Paithan', 'Gangapur'] }
    ]
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    code: 'DL',
    capital: 'New Delhi',
    districts: [
      { id: 'new-delhi-dist', name: 'New Delhi', cities: ['New Delhi', 'Connaught Place', 'Chanakyapuri'] },
      { id: 'south-delhi-dist', name: 'South Delhi', cities: ['Saket', 'Hauz Khas', 'Vasant Kunj'] },
      { id: 'noida-gb-nagar', name: 'Gautam Buddha Nagar', cities: ['Noida', 'Greater Noida'] },
      { id: 'gurugram-dist', name: 'Gurugram', cities: ['Gurugram', 'Manesar', 'Sohna'] }
    ]
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    code: 'KA',
    capital: 'Bengaluru',
    districts: [
      { id: 'bengaluru-urban', name: 'Bengaluru Urban', cities: ['Bengaluru', 'Whitefield', 'Electronic City', 'Yelahanka'] },
      { id: 'mysuru-dist', name: 'Mysuru', cities: ['Mysuru', 'Nanjangud', 'Hunsur'] },
      { id: 'dharwad-dist', name: 'Dharwad', cities: ['Hubballi', 'Dharwad', 'Navalgund'] }
    ]
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    code: 'UP',
    capital: 'Lucknow',
    districts: [
      { id: 'lucknow-dist', name: 'Lucknow', cities: ['Lucknow', 'Malihabad', 'Mohanlalganj'] },
      { id: 'varanasi-dist', name: 'Varanasi', cities: ['Varanasi', 'Pindra', 'Shivpur'] },
      { id: 'kanpur-dist', name: 'Kanpur Nagar', cities: ['Kanpur', 'Bilhaur', 'Ghatampur'] },
      { id: 'agra-dist', name: 'Agra', cities: ['Agra', 'Fatehabad', 'Kiraoli'] }
    ]
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    code: 'GJ',
    capital: 'Gandhinagar',
    districts: [
      { id: 'ahmedabad-dist', name: 'Ahmedabad', cities: ['Ahmedabad', 'Sanand', 'Dholka'] },
      { id: 'surat-dist', name: 'Surat', cities: ['Surat', 'Bardoli', 'Mandvi'] },
      { id: 'vadodara-dist', name: 'Vadodara', cities: ['Vadodara', 'Padra', 'Karjan'] }
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    code: 'RJ',
    capital: 'Jaipur',
    districts: [
      { id: 'jaipur-dist', name: 'Jaipur', cities: ['Jaipur', 'Amer', 'Chomu', 'Sanganer'] },
      { id: 'jodhpur-dist', name: 'Jodhpur', cities: ['Jodhpur', 'Bilara', 'Osian'] },
      { id: 'udaipur-dist', name: 'Udaipur', cities: ['Udaipur', 'Mavli', 'Salumbar'] }
    ]
  }
];

export const CITIES_LOCATION_DATA: Record<string, CityLocation> = {
  bhopal: {
    id: 'bhopal',
    name: 'Bhopal',
    hindiName: 'भोपाल',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    stateCode: 'MP',
    country: 'India',
    lat: 23.2599,
    lon: 77.4126,
    tagline: 'City of Lakes & Green Capital',
    population: '2.4 Million',
    currentTemp: '29°C',
    weatherCondition: 'Partly Cloudy',
    aqi: 94,
    aqiStatus: 'Satisfactory',
    civicAlerts: [
      {
        id: 'bp-alert-1',
        type: 'metro',
        title: 'Bhopal Metro Phase-2 Priority Corridor Testing Underway',
        description: 'Trial runs between Subhash Nagar and Karond Circle slated for completion ahead of public commissioning.',
        time: '2 hours ago',
        badge: 'Metro Alert'
      },
      {
        id: 'bp-alert-2',
        type: 'infrastructure',
        title: 'Upper Lake Catchment Beautification Drive Approved',
        description: 'Bhopal Municipal Corporation allocates ₹45 Cr for eco-restoration and lakefront promenade revamp.',
        time: '5 hours ago',
        badge: 'Civic Project'
      }
    ],
    cityArticles: [
      {
        id: 'bhopal-art-1',
        title: 'Bhopal Metro Line-1 Extension: New Stations & Multi-Modal Transit Hub Approved by MP Cabinet',
        description: 'The Madhya Pradesh cabinet has cleared ₹2,800 crore funding for expanding the Bhopal Metro to connect airport road and outer ring transit corridors.',
        content: 'In a major infrastructural breakthrough, the Madhya Pradesh Cabinet chaired by the Chief Minister greenlit the revised phase expansion for the Bhopal Metro Rail Project. The new alignment will add 8 underground and elevated stations connecting Raja Bhoj Airport with Karond, TT Nagar, and AIIMS Bhopal. Smart ticketing and feeder electric bus integration will be operational by year-end.',
        url: 'https://news.mp.gov.in/bhopal-metro-expansion',
        urlToImage: 'https://images.unsplash.com/photo-1590496793907-4589d81d227f?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        source: { id: 'mp-times', name: 'Bhopal Chronicle' },
        author: 'Alok Saxena',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        isTrending: true,
        locationTier: 'city',
        locationName: 'Bhopal',
        keyPoints: [
          '₹2,800 crore earmarked for Phase-1 extension to Raja Bhoj International Airport',
          '8 high-capacity multi-modal stations designed with rooftop solar arrays',
          'Automated AI-managed traffic signaling on Hoshangabad and Link Roads'
        ]
      },
      {
        id: 'bhopal-art-2',
        title: 'Bhopal Smart City Rolls Out 100 New Electric AC Feeder Buses for Upper Lake & New Market Routes',
        description: 'Urban mobility receives a zero-emission boost as BMC deploys high-frequency e-buses equipped with live GPS tracking in the citizen mobile app.',
        content: 'Bhopal City Link Limited (BCLL) has introduced 100 newly procured electric low-floor AC buses across 12 high-density routes. The buses feature CCTV surveillance, panic buttons, wheelchair accessibility, and dynamic passenger information systems synced with digital bus stop shelters.',
        url: 'https://news.mp.gov.in/bhopal-ebus-rollout',
        urlToImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        source: { id: 'central-news', name: 'Central India Post' },
        author: 'Pooja Verma',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'city',
        locationName: 'Bhopal',
        keyPoints: [
          '100 electric AC buses deployed on Kolar, BHEL, MP Nagar, and Old City routes',
          'Flat concession fares for students and senior citizens via digital smartcards',
          'Solar-powered charging depots commissioned at Misrod and ISBT'
        ]
      },
      {
        id: 'bhopal-art-3',
        title: 'Bhopal AIIMS Inaugurates Advanced Robotic Surgery Center & 200-Bed Pediatric Super-Speciality Wing',
        description: 'Healthcare access in Central India achieves milestone with cutting-edge robotic surgical suites providing affordable high-end care.',
        content: 'AIIMS Bhopal has inaugurated a dedicated Institute of Robotic Surgery along with a newly constructed pediatric trauma center. The facility will cater to patients across Madhya Pradesh, reducing referral times and offering precision oncology and cardiothoracic procedures under Ayushman Bharat.',
        url: 'https://news.mp.gov.in/aiims-bhopal-super-speciality',
        urlToImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        source: { id: 'health-desk', name: 'MP Health Journal' },
        author: 'Dr. Vivek Shrivastava',
        category: 'near-you',
        readTimeMinutes: 5,
        locationTier: 'city',
        locationName: 'Bhopal',
        keyPoints: [
          'State-of-the-art multi-quadrant robotic surgical consoles installed',
          'Free surgical packages for eligible families under universal health cover',
          'Tele-ICU connectivity established with 20 community health centers across MP'
        ]
      }
    ],
    districtArticles: [
      {
        id: 'bhopal-dist-art-1',
        title: 'Bhopal District Administration Launches One-Stop E-Governance Portal for Land Records & Civic Licences',
        description: 'District Collector announces complete digitization of mutation registers and property verification to eliminate administrative bottlenecks.',
        content: 'The Bhopal District Administration has rolled out a unified portal that digitizes land records across all 7 tehsils including Berasia, Kolar, and Huzur. Citizens can now obtain certified Khasra-Khatoni copies, trade licenses, and domicile certificates within 48 hours without visiting government offices.',
        url: 'https://bhopal.nic.in/district-portal-launch',
        urlToImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        source: { id: 'bhopal-gazette', name: 'District Collectorate Desk' },
        author: 'Rajeev Sharma',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'district',
        locationName: 'Bhopal District'
      },
      {
        id: 'bhopal-dist-art-2',
        title: 'Rural Water Supply Scheme Under Jal Jeevan Mission Achieves 98% Tap Coverage in Berasia & Phanda Blocks',
        description: 'Over 240 villages in rural Bhopal district receive 24x7 treated piped drinking water supply with smart water meters.',
        content: 'District authorities confirmed that the second phase of community filtration plants in rural pockets has been commissioned. Water quality monitoring labs equipped with mobile testing kits have been deployed across primary schools and Anganwadis.',
        url: 'https://bhopal.nic.in/jal-jeevan-coverage',
        urlToImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f156f?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
        source: { id: 'mp-rural', name: 'MP Vikas Varta' },
        author: 'Sunita Meena',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'district',
        locationName: 'Bhopal District'
      }
    ],
    stateArticles: [
      {
        id: 'mp-state-art-1',
        title: 'Madhya Pradesh Cabinet Approves ₹15,000 Cr Industrial Corridor & Green Energy Solar Mega-Parks in Malwa & Bundelkhand',
        description: 'New industrial policy offers single-window clearance, capital subsidies, and logistics subsidies to attract semiconductor and EV manufacturing units.',
        content: 'The Madhya Pradesh Government has announced an ambitious industrial roadmap aimed at generating over 3 lakh skilled jobs over the next three years. The state will set up mega solar energy hubs in Rewa, Agar Malwa, and Shajapur while upgrading logistics freight corridors connecting Indore, Bhopal, and Jabalpur.',
        url: 'https://mp.gov.in/industrial-corridor-boost',
        urlToImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        source: { id: 'mp-patrika', name: 'MP State Wire' },
        author: 'Hemant Chouhan',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'state',
        locationName: 'Madhya Pradesh'
      },
      {
        id: 'mp-state-art-2',
        title: 'MP Ladli Behna & Youth Skilling Scheme Expanded: Monthly Support & Apprenticeship Stipends Credited',
        description: 'Chief Minister transfers direct benefit assistance to 1.29 crore women and announces 50,000 industrial apprenticeship slots with stipend support.',
        content: 'During a state-level conference in Ujjain, the Chief Minister transferred ₹1,250 directly into the bank accounts of beneficiaries under the welfare initiative. The Department of Technical Education also launched modern drone technology and AI skilling labs across all 55 district polytechnics.',
        url: 'https://mp.gov.in/welfare-schemes-transfer',
        urlToImage: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        source: { id: 'dainik-mp', name: 'Madhya Pradesh Samachar' },
        author: 'Neelam Tiwari',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'state',
        locationName: 'Madhya Pradesh'
      }
    ],
    nationalArticles: [
      {
        id: 'nat-art-1',
        title: 'India Boosts National High-Speed Rail Network & Multi-Modal Freight Logistics Infrastructure',
        description: 'Union Cabinet sanctions ₹48,000 crore for next-generation Vande Bharat corridors, dedicated freight lines, and inland waterways expansion.',
        content: 'The Ministry of Railways and Road Transport announced major milestones in the National Infrastructure Pipeline. High-speed rail connections connecting central hubs with western ports will reduce transit freight duration by 40%, cementing India position in global supply chains.',
        url: 'https://pib.gov.in/national-logistics-corridor',
        urlToImage: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        source: { id: 'pib-india', name: 'Press Information Bureau' },
        author: 'National Bureau',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'national',
        locationName: 'India'
      }
    ]
  },

  indore: {
    id: 'indore',
    name: 'Indore',
    hindiName: 'इंदौर',
    district: 'Indore',
    state: 'Madhya Pradesh',
    stateCode: 'MP',
    country: 'India',
    lat: 22.7196,
    lon: 75.8577,
    tagline: 'Cleanest City & Commercial Powerhouse of MP',
    population: '3.3 Million',
    currentTemp: '31°C',
    weatherCondition: 'Sunny',
    aqi: 72,
    aqiStatus: 'Good',
    civicAlerts: [
      {
        id: 'ind-alert-1',
        type: 'metro',
        title: 'Indore Metro Super Corridor Passenger Trials Open to Public Next Month',
        description: 'MPMRCL completes safety certification for Yellow Line ring route spanning Gandhi Nagar to Super Corridor.',
        time: '3 hours ago',
        badge: 'Metro Update'
      }
    ],
    cityArticles: [
      {
        id: 'indore-art-1',
        title: 'Indore Wins Cleanest City Award for 8th Consecutive Year with 100% Waste-to-BioCNG Utilization',
        description: 'Swachh Survekshan honors Indore Municipal Corporation for pioneering zero-landfill smart segregation, mechanical sweeping, and automated AI air monitoring.',
        content: 'Indore has cemented its historic national record as India cleanest city for the eighth year in a row. The city 550-tonne daily Bio-CNG plant at Devguradia now powers over 200 public buses and generates green revenue for the municipal corporation.',
        url: 'https://indore.nic.in/cleanest-city-award',
        urlToImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        source: { id: 'indore-bulletin', name: 'Indore Times' },
        author: 'Manish Patidar',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        isTrending: true,
        locationTier: 'city',
        locationName: 'Indore',
        keyPoints: [
          '100% household segregation into 6 distinct categories including e-waste and sanitary waste',
          'Bio-CNG plant generates 19,000 kg fuel daily to power local public transit',
          'Over 400 km of mechanical dust-free night road cleaning'
        ]
      },
      {
        id: 'indore-art-2',
        title: 'Indore IT Super Corridor Welcomes 5 New Global Tech Centers; 15,000 New Software Jobs Announced',
        description: 'Leading multinational IT majors expand campus footprint in Indore Special Economic Zone near TCS and Infosys campuses.',
        content: 'Indore emergence as a premier tier-2 technology hub reached another high as five global capability centers signed MoUs with the MP Industrial Development Corporation to set up AI research, cloud engineering, and cybersecurity hubs on the Super Corridor.',
        url: 'https://indore.nic.in/tech-corridor-expansion',
        urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        source: { id: 'malwa-herald', name: 'Malwa Business Herald' },
        author: 'Rachna Gupta',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'city',
        locationName: 'Indore'
      }
    ],
    districtArticles: [
      {
        id: 'indore-dist-art-1',
        title: 'Pithampur Automotive Cluster to Set Up India First Open-Access Battery Testing & EV Validation Lab',
        description: 'Located in Indore-Dhar industrial zone, the ₹350 Cr facility will accelerate electric vehicle manufacturing in Central India.',
        content: 'The state industry department and NATRAX announced the commissioning of high-speed crash testing and battery thermal testing tracks in Pithampur, reducing certification turnaround times for EV manufacturers.',
        url: 'https://mp.gov.in/pithampur-ev-lab',
        urlToImage: 'https://images.unsplash.com/photo-1558441719-646b22ad440c?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        source: { id: 'auto-wire', name: 'MP Industrial Express' },
        author: 'Sanjay Jain',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'district',
        locationName: 'Indore District'
      }
    ],
    stateArticles: [],
    nationalArticles: []
  },

  ujjain: {
    id: 'ujjain',
    name: 'Ujjain',
    hindiName: 'उज्जैन',
    district: 'Ujjain',
    state: 'Madhya Pradesh',
    stateCode: 'MP',
    country: 'India',
    lat: 23.1765,
    lon: 75.7885,
    tagline: 'Spiritual Capital & Mahakal Lok City',
    population: '0.6 Million',
    currentTemp: '30°C',
    weatherCondition: 'Clear',
    aqi: 68,
    aqiStatus: 'Good',
    civicAlerts: [
      {
        id: 'uj-alert-1',
        type: 'infrastructure',
        title: 'Simhastha 2028 Infrastructure Masterplan: ₹10,000 Cr Projects Approved',
        description: 'Kshipra riverfront retaining walls, 4-lane bypass rings, and helipad terminals cleared by High-Level Committee.',
        time: '1 hour ago',
        badge: 'Simhastha 2028'
      }
    ],
    cityArticles: [
      {
        id: 'ujjain-art-1',
        title: 'Mahakal Lok Phase 2 Expansion Inaugurated: Heritage Skywalk & Solar Pilgrim Shuttles Launched',
        description: 'New 2.5 km heritage pilgrim corridor connects Ramghat, Triveni Museum, and Mahakaleshwar Temple with automated crowd analytics.',
        content: 'With tourist footfalls crossing 3.5 crore annually, the Ujjain Smart City project has commissioned the second phase of Shri Mahakal Mahalok. The expansion features Vedic observatory gardens, automated zero-emission e-rickshaws, and multi-tier underground parking for 5,000 vehicles.',
        url: 'https://ujjain.nic.in/mahakal-lok-phase2',
        urlToImage: 'https://images.unsplash.com/photo-1600100397608-f010f44336aa?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        source: { id: 'ujjain-varta', name: 'Avantika News' },
        author: 'Pandit Gopal Sharma',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        locationTier: 'city',
        locationName: 'Ujjain'
      }
    ],
    districtArticles: [
      {
        id: 'ujjain-dist-art-1',
        title: 'Nagda Industrial Smart Water Purification Plant Commissioned by District Administration',
        description: 'Chambal river industrial effluent treatment unit upgraded with zero-liquid discharge technology.',
        content: 'The industrial area in Nagda tehsil of Ujjain district has installed automated effluent monitors directly synced with Central Pollution Control Board servers.',
        url: 'https://ujjain.nic.in/nagda-effluent-plant',
        urlToImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        source: { id: 'ujjain-varta', name: 'Avantika News' },
        author: 'Kunal Sen',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'district',
        locationName: 'Ujjain District'
      }
    ],
    stateArticles: [],
    nationalArticles: []
  },

  jabalpur: {
    id: 'jabalpur',
    name: 'Jabalpur',
    hindiName: 'जबलपुर',
    district: 'Jabalpur',
    state: 'Madhya Pradesh',
    stateCode: 'MP',
    country: 'India',
    lat: 23.1815,
    lon: 79.9864,
    tagline: 'Cultural Capital & Bhedaghat Marble City',
    population: '1.5 Million',
    currentTemp: '28°C',
    weatherCondition: 'Pleasant',
    aqi: 80,
    aqiStatus: 'Satisfactory',
    cityArticles: [
      {
        id: 'jabalpur-art-1',
        title: 'Jabalpur-Bhedaghat Narmada Riverfront Ropeway & Eco-Tourism Circuit Cleared by Tourism Ministry',
        description: 'New cable car project over Dhuandhar waterfall and Marble Rocks to offer panoramic views with zero ecological disturbance.',
        content: 'The Ministry of Tourism in collaboration with MP Tourism Board has sanctioned the mega eco-tourism masterplan for Bhedaghat and Tilwara Ghat in Jabalpur. The project introduces solar-powered catamarans, illuminated evening marble tours, and bio-fenced riverwalk trails.',
        url: 'https://jabalpur.nic.in/bhedaghat-ropeway-project',
        urlToImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
        source: { id: 'narmada-post', name: 'Jabalpur Samachar' },
        author: 'Anurag Kashyap',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'city',
        locationName: 'Jabalpur'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  siwan: {
    id: 'siwan',
    name: 'Siwan',
    hindiName: 'सीवान',
    district: 'Siwan',
    state: 'Bihar',
    stateCode: 'BR',
    country: 'India',
    lat: 26.2196,
    lon: 84.3567,
    tagline: 'Land of Dr. Rajendra Prasad & Emerging Commercial Hub',
    population: '0.8 Million',
    currentTemp: '32°C',
    weatherCondition: 'Sunny & Warm',
    aqi: 112,
    aqiStatus: 'Moderate',
    civicAlerts: [
      {
        id: 'siw-alert-1',
        type: 'infrastructure',
        title: 'Siwan-Gopalganj 4-Lane Highway Bypass Nearing Final Phase',
        description: 'Road Construction Department expedites overbridge construction at Chapra-Siwan railway crossing.',
        time: '2 hours ago',
        badge: 'Highway Alert'
      },
      {
        id: 'siw-alert-2',
        type: 'health',
        title: 'Siwan Sadar Hospital Upgraded to 300-Bed Super-Specialty Center',
        description: 'New emergency trauma ICU, dialysis units, and CT-scan diagnostics made fully operational.',
        time: '6 hours ago',
        badge: 'Healthcare'
      }
    ],
    cityArticles: [
      {
        id: 'siwan-art-1',
        title: 'Siwan Sadar Hospital 300-Bed Modernization Completed: Free Dialysis & 24x7 Trauma Unit Opened',
        description: 'Bihar Health Department inaugurates upgraded medical infrastructure in Siwan, providing advanced tertiary healthcare for Saran division.',
        content: 'Residents of Siwan and surrounding towns no longer need to travel to Patna or Gorakhpur for specialized healthcare. The newly expanded Siwan Sadar Hospital features a 20-bed ICU, 10-unit hemodialysis ward, automated blood bank, and digital telemedicine link with PMCH Patna.',
        url: 'https://siwan.nic.in/sadar-hospital-upgrade',
        urlToImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        source: { id: 'siwan-darpan', name: 'Siwan News Network' },
        author: 'Rameshwar Pandey',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        isTrending: true,
        locationTier: 'city',
        locationName: 'Siwan',
        keyPoints: [
          '300-bed capacity with dedicated pediatric and maternity emergency blocks',
          'Free diagnostic tests and medicines under Bihar State Health Mission',
          'High-speed ambulance network connected with GPS monitoring'
        ]
      },
      {
        id: 'siwan-art-2',
        title: 'Siwan Railway Station Revamp Under Amrit Bharat Scheme: Modern Lounges & Second Entry Gate',
        description: 'North Eastern Railway invests ₹42 crore to modernize Siwan Junction with escalators, solar panels, and expanded platforms.',
        content: 'Siwan Junction is undergoing a comprehensive architectural transformation. The new entrance building reflects the heritage of Dr. Rajendra Prasad birthplace at Ziradei, complemented with Wi-Fi lounges, executive waiting halls, and 24x7 multi-tier parking.',
        url: 'https://siwan.nic.in/amrit-bharat-station',
        urlToImage: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
        source: { id: 'bihar-times', name: 'Bihar Jagran' },
        author: 'Dhananjay Singh',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'city',
        locationName: 'Siwan'
      },
      {
        id: 'siwan-art-3',
        title: 'Ziradei Heritage Museum & Rural Innovation Hub Inaugurated in Memory of First President',
        description: 'Dr. Rajendra Prasad ancestral home in Siwan district developed into national memorial with digital library and skill incubator.',
        content: 'The Department of Art and Culture, Bihar, has opened the expanded memorial museum at Ziradei. The complex houses rare letters, photographs, and speeches of India first President, along with an interactive youth skill incubator training local artisans.',
        url: 'https://siwan.nic.in/ziradei-memorial',
        urlToImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 380).toISOString(),
        source: { id: 'saran-sandesh', name: 'Saran Sandesh' },
        author: 'Amitabh Kumar',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'city',
        locationName: 'Siwan'
      }
    ],
    districtArticles: [
      {
        id: 'siwan-dist-art-1',
        title: 'Siwan District Administration Mandates Smart Cane-Payment System for Sugar Mills & Farmers',
        description: 'District Magistrate issues directives for direct DBT transfers within 14 days to over 35,000 sugarcane growers across Siwan and Maharajganj.',
        content: 'To safeguard farmer interests, the Siwan District Collectorate has integrated sugar mill weighbridges with a central monitoring portal. Farmers receive instant SMS receipts and transparent payment disbursements.',
        url: 'https://siwan.nic.in/sugarcane-dbt-portal',
        urlToImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        source: { id: 'siwan-collectorate', name: 'District Information Office' },
        author: 'Sanjeev Mishra',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'district',
        locationName: 'Siwan District'
      }
    ],
    stateArticles: [
      {
        id: 'bihar-state-art-1',
        title: 'Bihar Government Announces ₹22,000 Cr Infrastructure Package for North & South Bihar Connectivity',
        description: 'New 6-lane bridges over Ganga, Gandak, and Kosi rivers along with expressway corridors to link Patna with border districts.',
        content: 'The Bihar Cabinet has sanctioned key connectivity projects under the Bihar Vikas Mission. The expressway network will reduce travel time between Saran, Siwan, Gopalganj, and Patna to under 2 hours, boosting trade and agricultural transport.',
        url: 'https://bihar.gov.in/infrastructure-corridors',
        urlToImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
        source: { id: 'patna-daily', name: 'Patna Daily' },
        author: 'Saurabh Sinha',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'state',
        locationName: 'Bihar'
      }
    ],
    nationalArticles: [
      {
        id: 'nat-art-2',
        title: 'Central Government Enhances PM Kisan Samman Nidhi & Farmer Credit Infrastructure',
        description: 'Over 9 crore agricultural families across India receive quarterly direct benefit installment with simplified digital Kisan Credit Cards.',
        content: 'The Ministry of Agriculture confirmed seamless credit access for rural farmers, introducing satellite-based crop damage assessments and automated insurance claim settlements.',
        url: 'https://pib.gov.in/pm-kisan-benefits',
        urlToImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
        source: { id: 'pib-india', name: 'Press Information Bureau' },
        author: 'National Bureau',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'national',
        locationName: 'India'
      }
    ]
  },

  patna: {
    id: 'patna',
    name: 'Patna',
    hindiName: 'पटना',
    district: 'Patna',
    state: 'Bihar',
    stateCode: 'BR',
    country: 'India',
    lat: 25.5941,
    lon: 85.1376,
    tagline: 'Historic Pataliputra & State Capital',
    population: '2.5 Million',
    currentTemp: '33°C',
    weatherCondition: 'Hazy Sun',
    aqi: 145,
    aqiStatus: 'Moderate',
    civicAlerts: [
      {
        id: 'pat-alert-1',
        type: 'metro',
        title: 'Patna Metro Underground Tunneling Accelerates on Corridor 2',
        description: 'Tunnel Boring Machine (TBM) reaches Patna Junction subterranean station site on schedule.',
        time: '1 hour ago',
        badge: 'Metro Progress'
      }
    ],
    cityArticles: [
      {
        id: 'patna-art-1',
        title: 'Patna Ganga Marine Drive (JP Ganga Path) Phase-3 Extension Opened to Digha & Fatuha',
        description: 'The scenic expressway along the Ganges reduces cross-city transit time from 90 minutes to just 20 minutes.',
        content: 'Chief Minister inaugurated the extended 22-km stretch of the JP Ganga Path. The high-speed riverfront expressway features LED streetlights, recreational promenades, cycling tracks, and direct connectivity to AIIMS Patna and Patna Medical College Hospital.',
        url: 'https://patna.nic.in/ganga-marine-drive',
        urlToImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        source: { id: 'patna-times', name: 'Patna Chronicle' },
        author: 'Abhinav Jha',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        isTrending: true,
        locationTier: 'city',
        locationName: 'Patna',
        keyPoints: [
          '22 km seamless riverfront expressway connecting East and West Patna',
          'Four dedicated access flyovers to emergency hospital corridors',
          'Pollution-free e-rickshaw tourist zones along Ganga ghats'
        ]
      },
      {
        id: 'patna-art-2',
        title: 'Patna IT City & Startup Hub in Bihta Approves 40 New AI and Fintech Ventures',
        description: 'Bihar Startup Policy registers record growth with seed grants and incubation support at IIT Patna and NIT Patna.',
        content: 'The state technology mission has allocated 50 acres in the Bihta Knowledge City for IT and electronics hardware startups. State-of-the-art incubation labs and seed funding up to ₹10 lakh per startup have been disbursed to 40 selected student-led ventures.',
        url: 'https://patna.nic.in/bihta-startup-hub',
        urlToImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
        source: { id: 'bihar-express', name: 'Bihar Tech Journal' },
        author: 'Sweta Kumari',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'city',
        locationName: 'Patna'
      }
    ],
    districtArticles: [
      {
        id: 'patna-dist-art-1',
        title: 'Patna District Collectorate Deploys Drone Surveillance for Agricultural Flood Mapping',
        description: 'Disaster management team integrates satellite radar data to safeguard standing paddy crops in Mokama and Danapur tal areas.',
        content: 'Patna District Administration has established a round-the-clock emergency operations center to coordinate water drainage, canal desilting, and relief distribution across all 6 subdivisions.',
        url: 'https://patna.nic.in/drone-flood-monitoring',
        urlToImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        source: { id: 'patna-collectorate', name: 'Patna Collectorate Bulletin' },
        author: 'Vikash Ranjan',
        category: 'near-you',
        readTimeMinutes: 3,
        locationTier: 'district',
        locationName: 'Patna District'
      }
    ],
    stateArticles: [],
    nationalArticles: []
  },

  gaya: {
    id: 'gaya',
    name: 'Gaya',
    hindiName: 'गया',
    district: 'Gaya',
    state: 'Bihar',
    stateCode: 'BR',
    country: 'India',
    lat: 24.7914,
    lon: 85.0002,
    tagline: 'Holy City of Enlightenment & Heritage',
    population: '0.5 Million',
    currentTemp: '31°C',
    weatherCondition: 'Sunny',
    aqi: 98,
    aqiStatus: 'Satisfactory',
    cityArticles: [
      {
        id: 'gaya-art-1',
        title: 'Bodh Gaya Buddhist Cultural Center & International Convention Complex Inaugurated',
        description: 'New 2,000-seat acoustic auditorium, meditation parks, and multi-lingual translation booths open for global pilgrims.',
        content: 'The Ministry of Culture and Bihar Tourism have unveiled the Mahabodhi Cultural Center. The facility will host international Buddhist conclaves and features zero-carbon solar architecture, an eco-museum, and direct electric shuttle services to Gaya International Airport.',
        url: 'https://gaya.nic.in/bodhgaya-convention-center',
        urlToImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
        source: { id: 'magadh-times', name: 'Magadh Times' },
        author: 'Bhikshu Anand',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        locationTier: 'city',
        locationName: 'Gaya'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  mumbai: {
    id: 'mumbai',
    name: 'Mumbai',
    hindiName: 'मुंबई',
    district: 'Mumbai City',
    state: 'Maharashtra',
    stateCode: 'MH',
    country: 'India',
    lat: 19.0760,
    lon: 72.8777,
    tagline: 'Financial Capital & City of Dreams',
    population: '13.5 Million',
    currentTemp: '30°C',
    weatherCondition: 'Humid & Breezy',
    aqi: 88,
    aqiStatus: 'Satisfactory',
    civicAlerts: [
      {
        id: 'mum-alert-1',
        type: 'metro',
        title: 'Mumbai Metro Line 3 (Aqua Line) Phase 2 Linking BKC to Cuffe Parade Ready for Inauguration',
        description: 'Underground high-frequency train services reduce South Mumbai to Suburbs commute to 35 mins.',
        time: '1 hour ago',
        badge: 'Metro 3'
      },
      {
        id: 'mum-alert-2',
        type: 'infrastructure',
        title: 'Coastal Road Northward Extension to Versova Commences Work',
        description: 'Twin underwater tunnels and bridge spans to ease Western Express Highway congestion.',
        time: '4 hours ago',
        badge: 'Coastal Road'
      }
    ],
    cityArticles: [
      {
        id: 'mumbai-art-1',
        title: 'Mumbai Coastal Road Full Corridor Opened to 24x7 Traffic: Commute Time Slashed by 70%',
        description: 'The iconic 10.5 km high-speed coastal freeway connecting Marine Drive to Worli and Bandra-Worli Sea Link is now operational day and night.',
        content: 'The Brihanmumbai Municipal Corporation (BMC) has opened all arms and interchanges of the Mumbai Coastal Road (Dharmveer Swarajya Rakshak Chhatrapati Sambhaji Maharaj Marg). Commuters can now drive from Marine Drive to Worli in under 9 minutes. The project includes 70 hectares of green seaside promenades and underground parking for 1,800 cars.',
        url: 'https://mumbai.gov.in/coastal-road-open',
        urlToImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        source: { id: 'mumbai-mirror', name: 'Mumbai Express' },
        author: 'Kunal Deshmukh',
        category: 'near-you',
        readTimeMinutes: 5,
        isBreaking: true,
        isTrending: true,
        locationTier: 'city',
        locationName: 'Mumbai',
        keyPoints: [
          'Speed limit set at 80 km/h with AI-based speed radar monitoring',
          '70 hectares of reclaimed green open space with 8.5 km jogging promenade',
          'Direct underground tunnel linkage beneath Malabar Hill'
        ]
      },
      {
        id: 'mumbai-art-2',
        title: 'Bandra-Kurla Complex (BKC) Financial District Launches Multi-Modal Underground Hyper-Subway',
        description: 'MMRDA integrates bullet train terminal, underground metro, and luxury business centers with automated walkways.',
        content: 'BKC infrastructure receives another global upgrade with the commissioning of the subterranean pedestrian skywalk network. Air-conditioned walkways with moving travelators now connect the Diamond Bourse, ICICI Towers, Jio World Centre, and Metro Line 3 stations.',
        url: 'https://mmrda.maharashtra.gov.in/bkc-subway',
        urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
        source: { id: 'financial-mumbai', name: 'Dalal Street Gazette' },
        author: 'Priya Kulkarni',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'city',
        locationName: 'Mumbai'
      }
    ],
    districtArticles: [
      {
        id: 'mumbai-dist-art-1',
        title: 'BMC Unveils ₹59,000 Cr Mega Budget: Focus on Deep-Clean Drives, Health Clinics, and Flyovers',
        description: 'Municipal Commissioner announces allocation for 250 Hinduhridaysamrat Balasaheb Thackeray Aapla Dawakhana clinics and road concretization.',
        content: 'The municipal budget earmarks significant funds for flood-mitigation pumping stations in Mahim and Hindmata, along with smart air-purifier towers across 15 high-density suburban intersections.',
        url: 'https://portal.mcgm.gov.in/budget-highlights',
        urlToImage: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        source: { id: 'bmc-bulletin', name: 'BMC News Desk' },
        author: 'Aditya Patil',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'district',
        locationName: 'Mumbai District'
      }
    ],
    stateArticles: [
      {
        id: 'mh-state-art-1',
        title: 'Maharashtra Clears ₹1.2 Lakh Cr Foreign Direct Investments in Semiconductor & EV Fab Parks in Pune & Raigad',
        description: 'State cabinet approves high-power committee incentives for mega electronics manufacturing facilities creating 50,000 engineering jobs.',
        content: 'The Maharashtra Government has signed definitive agreements with global semiconductor consortiums to set up advanced packaging and wafer fabrication facilities in Talegaon and Dighi Port SEZ.',
        url: 'https://maharashtra.gov.in/fdi-semiconductor-investments',
        urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
        source: { id: 'maha-satta', name: 'Maharashtra Varta' },
        author: 'Nitin Sawant',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'state',
        locationName: 'Maharashtra'
      }
    ],
    nationalArticles: []
  },

  pune: {
    id: 'pune',
    name: 'Pune',
    hindiName: 'पुणे',
    district: 'Pune',
    state: 'Maharashtra',
    stateCode: 'MH',
    country: 'India',
    lat: 18.5204,
    lon: 73.8567,
    tagline: 'Oxford of the East & Auto-Tech Capital',
    population: '4.2 Million',
    currentTemp: '27°C',
    weatherCondition: 'Pleasant Breeze',
    aqi: 65,
    aqiStatus: 'Good',
    cityArticles: [
      {
        id: 'pune-art-1',
        title: 'Pune Metro Extends Reach to Ramwadi & Katraj: Hinjawadi-Shivajinagar Elevated Line on Fast Track',
        description: 'Maha Metro records 1.5 lakh daily commuters as new interchange terminals streamline tech worker commutes.',
        content: 'Pune public transit is scaling rapidly. The automated driverless metro trials on Line 3 connecting Hinjawadi IT Park to Shivajinagar will commence by next quarter, offering a traffic-free 30-minute transit for techies.',
        url: 'https://punemetrorail.org/ramwadi-katraj-expansion',
        urlToImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
        source: { id: 'pune-herald', name: 'Pune Herald' },
        author: 'Chinmay Joshi',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        locationTier: 'city',
        locationName: 'Pune'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  nagpur: {
    id: 'nagpur',
    name: 'Nagpur',
    hindiName: 'नागपुर',
    district: 'Nagpur',
    state: 'Maharashtra',
    stateCode: 'MH',
    country: 'India',
    lat: 21.1458,
    lon: 79.0882,
    tagline: 'Orange City & Heart of India Logistics',
    population: '2.9 Million',
    currentTemp: '32°C',
    weatherCondition: 'Clear & Warm',
    aqi: 74,
    aqiStatus: 'Good',
    cityArticles: [
      {
        id: 'nagpur-art-1',
        title: 'Nagpur MIHAN Cargo SEZ Welcomes Global Aerospace MRO Hub; Multi-Modal Airport Revamp Cleared',
        description: 'New Boeing and Airbus certified maintenance hangars make Nagpur the central aviation repair destination of South Asia.',
        content: 'The Multi-Modal International Cargo Hub and Airport at Nagpur (MIHAN) is expanding its second runway and aircraft taxiway to support wide-body freight cargo aircraft and defense overhaul facilities.',
        url: 'https://nagpur.nic.in/mihan-aviation-hub',
        urlToImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
        source: { id: 'vidarbha-times', name: 'Nagpur Post' },
        author: 'Prashant Bisen',
        category: 'near-you',
        readTimeMinutes: 4,
        locationTier: 'city',
        locationName: 'Nagpur'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  delhi: {
    id: 'delhi',
    name: 'New Delhi',
    hindiName: 'नई दिल्ली',
    district: 'New Delhi',
    state: 'Delhi NCR',
    stateCode: 'DL',
    country: 'India',
    lat: 28.6139,
    lon: 77.2090,
    tagline: 'National Capital of India',
    population: '16.8 Million',
    currentTemp: '34°C',
    weatherCondition: 'Sunny',
    aqi: 168,
    aqiStatus: 'Moderate',
    civicAlerts: [
      {
        id: 'del-alert-1',
        type: 'metro',
        title: 'Delhi Metro Phase 4 Golden Line (Aerocity to Tughlakabad) Completes Key Tunneling',
        description: 'DMRC confirms driverless train sets with automatic obstacle detection arriving for trials.',
        time: '2 hours ago',
        badge: 'Metro Phase 4'
      }
    ],
    cityArticles: [
      {
        id: 'delhi-art-1',
        title: 'Delhi NCR Rolls Out Integrated Common Mobility Smart Card for Metro, RRTS, and Electric DTC Buses',
        description: 'Single tap-and-pay card enables seamless transfers across Delhi Metro, Namo Bharat Rapid Rail, and 4,000 city electric buses.',
        content: 'Transport Minister unveiled the unified National Common Mobility Card (NCMC) integration across all transit operators in the National Capital Region. Commuters can also use smartphone NFC and UPI QR codes at all fare gates.',
        url: 'https://delhi.gov.in/common-mobility-pass',
        urlToImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        source: { id: 'delhi-daily', name: 'Capital News Desk' },
        author: 'Rohit Aggarwal',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        isTrending: true,
        locationTier: 'city',
        locationName: 'New Delhi'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  bengaluru: {
    id: 'bengaluru',
    name: 'Bengaluru',
    hindiName: 'बेंगलुरु',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    stateCode: 'KA',
    country: 'India',
    lat: 12.9716,
    lon: 77.5946,
    tagline: 'Silicon Valley of India & Garden City',
    population: '11.2 Million',
    currentTemp: '26°C',
    weatherCondition: 'Scattered Showers',
    aqi: 55,
    aqiStatus: 'Good',
    cityArticles: [
      {
        id: 'blr-art-1',
        title: 'Bengaluru Namma Metro Yellow Line Commences Full Operations to Electronic City',
        description: 'New 19 km driverless corridor takes over 2 lakh tech workers off Hosur Road traffic daily.',
        content: 'BMRCL has operationalized the automated Yellow Line connecting RV Road with Bommasandra via Silk Board and Electronic City. The metro line features AI-assisted crowd management and rooftop solar power supplying 40% station energy.',
        url: 'https://bmrcl.co.in/yellow-line-launch',
        urlToImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        source: { id: 'deccan-herald', name: 'Bengaluru Wire' },
        author: 'Deepa Hegde',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        locationTier: 'city',
        locationName: 'Bengaluru'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  lucknow: {
    id: 'lucknow',
    name: 'Lucknow',
    hindiName: 'लखनऊ',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    stateCode: 'UP',
    country: 'India',
    lat: 26.8467,
    lon: 80.9462,
    tagline: 'City of Nawabs & State Capital of UP',
    population: '3.4 Million',
    currentTemp: '32°C',
    weatherCondition: 'Warm Sun',
    aqi: 110,
    aqiStatus: 'Moderate',
    cityArticles: [
      {
        id: 'lko-art-1',
        title: 'Lucknow-Kanpur Expressway Nearing Completion: Travel Time Slashed to 35 Minutes',
        description: '6-lane access-controlled greenfield expressway to transform Lucknow-Kanpur twin-city commercial corridor.',
        content: 'NHAI confirmed that 90% of viaducts and blacktopping on the 63 km Lucknow-Kanpur Expressway have concluded. The expressway connects Amausi Airport with Unnao and Ganga barrage.',
        url: 'https://lucknow.nic.in/lko-kanpur-expressway',
        urlToImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
        source: { id: 'avadh-times', name: 'Lucknow Samachar' },
        author: 'Tariq Siddiqui',
        category: 'near-you',
        readTimeMinutes: 4,
        isBreaking: true,
        locationTier: 'city',
        locationName: 'Lucknow'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  },

  jaipur: {
    id: 'jaipur',
    name: 'Jaipur',
    hindiName: 'जयपुर',
    district: 'Jaipur',
    state: 'Rajasthan',
    stateCode: 'RJ',
    country: 'India',
    lat: 26.9124,
    lon: 75.7873,
    tagline: 'The Pink City & UNESCO World Heritage Capital',
    population: '3.9 Million',
    currentTemp: '33°C',
    weatherCondition: 'Sunny',
    aqi: 82,
    aqiStatus: 'Satisfactory',
    cityArticles: [
      {
        id: 'jai-art-1',
        title: 'Jaipur Walled City UNESCO Heritage Restoration: Electric Heritage Buggies & Facade Preservation',
        description: 'Smart City Mission transforms Hawa Mahal, Johari Bazar, and Badi Chaupar with underground cables and pedestrian tourist plazas.',
        content: 'Jaipur historic walled city has unveiled restored terracotta facades and smart LED illumination across historic gates. New zero-emission electric buggies offer guided audio tours in 12 global languages.',
        url: 'https://jaipur.rajasthan.gov.in/heritage-revamp',
        urlToImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
        source: { id: 'rajasthan-patrika', name: 'Pink City Herald' },
        author: 'Mahesh Rathore',
        category: 'near-you',
        readTimeMinutes: 3,
        isBreaking: true,
        locationTier: 'city',
        locationName: 'Jaipur'
      }
    ],
    districtArticles: [],
    stateArticles: [],
    nationalArticles: []
  }
};

// Calculate closest city using Haversine formula
export function findNearestCity(lat: number, lon: number): CityLocation {
  let closestCity = CITIES_LOCATION_DATA.bhopal;
  let minDistance = Infinity;

  Object.values(CITIES_LOCATION_DATA).forEach((city) => {
    const dLat = (city.lat - lat) * (Math.PI / 180);
    const dLon = (city.lon - lon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) *
        Math.cos(city.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // Earth radius in KM

    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  });

  return closestCity;
}

// Search across cities, districts, states
export function searchLocations(query: string): CityLocation[] {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) return Object.values(CITIES_LOCATION_DATA);

  return Object.values(CITIES_LOCATION_DATA).filter((loc) => {
    return (
      loc.name.toLowerCase().includes(cleanQ) ||
      loc.district.toLowerCase().includes(cleanQ) ||
      loc.state.toLowerCase().includes(cleanQ) ||
      (loc.hindiName && loc.hindiName.includes(cleanQ)) ||
      loc.tagline.toLowerCase().includes(cleanQ)
    );
  });
}
