import { StoryTimeline } from '../types';

export const STORY_TIMELINES: StoryTimeline[] = [
  {
    id: 'ai-reasoning-race',
    title: 'The Frontier AI Race: From Chatbots to Autonomous Agentic Super-Reasoners',
    tagline: 'How large models evolved from conversational text predictors into autonomous systems capable of complex math, coding, and scientific research.',
    category: 'technology',
    bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    status: 'Developing',
    lastUpdated: 'Just now',
    events: [
      {
        id: 'ai-e1',
        date: 'Nov 2022',
        headline: 'ChatGPT Launches & Sparks the Consumer GenAI Boom',
        summary: 'OpenAI releases ChatGPT to the public, acquiring 100 million monthly active users in record time and triggering global investment across tech giants.',
        impactLevel: 'Critical',
        tag: 'Breakthrough',
        source: 'Wired & TechCrunch'
      },
      {
        id: 'ai-e2',
        date: 'Dec 2023',
        headline: 'Multimodal Gemini & Claude Expand Beyond Text to Video, Audio & Code',
        summary: 'Google unveils Gemini with native multimodality, processing 1M+ token context windows capable of analyzing entire codebases, audio libraries, and video footage simultaneously.',
        impactLevel: 'High',
        tag: 'Architecture',
        source: 'Google DeepMind'
      },
      {
        id: 'ai-e3',
        date: 'May 2024',
        headline: 'Global AI Safety Accords & EU AI Act Enforcement Begins',
        summary: 'World leaders and leading AI labs sign binding safety frameworks addressing copyright, high-risk automated decision making, and watermarking.',
        impactLevel: 'Medium',
        tag: 'Regulation',
        source: 'Reuters Policy'
      },
      {
        id: 'ai-e4',
        date: 'Late 2024 - 2025',
        headline: 'Test-Time Compute & Chain-of-Thought Reasoning Models Arrive',
        summary: 'New model generations (o1, Gemini Flash Thinking, DeepSeek) leverage reinforcement learning to think through problems before answering, solving PhD-level math and coding challenges.',
        impactLevel: 'Critical',
        tag: 'Reasoning',
        source: 'Nature & ArXiv'
      },
      {
        id: 'ai-e5',
        date: '2026 (Current Milestone)',
        headline: 'Autonomous Coding & Agentic Ecosystems Enter Enterprise Production',
        summary: 'Software development shifts from manual boilerplate to collaborative agent swarms, executing multi-turn refactors, container testing, and CI/CD pipelines autonomously.',
        impactLevel: 'Critical',
        tag: 'Agents & Superintelligence',
        source: 'Financial Times & IEEE'
      }
    ]
  },
  {
    id: 'india-space-moon-mars',
    title: 'India Space Odyssey: Chandrayaan, Aditya-L1 to Gaganyaan Human Spaceflight',
    tagline: 'Tracking the milestones of ISRO as India became the 4th nation on the moon and readies indigenous human spaceflight.',
    category: 'science',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    status: 'Ongoing',
    lastUpdated: '2 days ago',
    events: [
      {
        id: 'space-e1',
        date: 'Aug 23, 2023',
        headline: 'Chandrayaan-3 Lands on Moon Lunar South Pole',
        summary: 'Vikram lander and Pragyan rover successfully execute soft landing on the uncharted lunar south pole, confirming presence of sulfur and ice signatures.',
        impactLevel: 'Critical',
        tag: 'Historic Landing',
        source: 'ISRO Press'
      },
      {
        id: 'space-e2',
        date: 'Sep 2, 2023',
        headline: 'Aditya-L1 Solar Observatory Launches to Lagrange Point 1',
        summary: 'Indias first dedicated solar mission enters halo orbit 1.5 million kilometers from Earth to continuously monitor coronal mass ejections and space weather.',
        impactLevel: 'High',
        tag: 'Solar Mission',
        source: 'The Hindu Science'
      },
      {
        id: 'space-e3',
        date: '2024 - 2025',
        headline: 'Gaganyaan Test Vehicle Abort & Human-Rated LVM3 Approvals',
        summary: 'ISRO completes series of crew escape and parachute safety trials, qualifying environmental life support modules with astronaut-designate pilots.',
        impactLevel: 'High',
        tag: 'Human Flight',
        source: 'PTI News'
      },
      {
        id: 'space-e4',
        date: '2026 (Current Phase)',
        headline: 'Uncrewed Vyommitra Flight & Bharatiya Antariksh Station Blueprint',
        summary: 'Vyommitra humanoid robot launches on precursor orbital test flight preceding sovereign space station orbital module deployments.',
        impactLevel: 'Critical',
        tag: 'Station & Crew',
        source: 'ISRO Official'
      }
    ]
  },
  {
    id: 'global-clean-energy-transition',
    title: 'The Great Energy Transition: Battery Gigafactories to Global Grid Decarbonization',
    tagline: 'How solar economics, sodium-ion batteries, and high-voltage DC interconnects are reshaping the geopolitical energy map.',
    category: 'business',
    bannerImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    status: 'Developing',
    lastUpdated: '1 day ago',
    events: [
      {
        id: 'energy-e1',
        date: '2022 - 2023',
        headline: 'Solar Becomes Cheapest Electricity Source in Human History',
        summary: 'Levelized cost of utility-scale solar drops below $0.03 per kWh globally, outcompeting fossil fuels even without subsidies across sunbelt nations.',
        impactLevel: 'High',
        tag: 'Cost Parity',
        source: 'IEA Report'
      },
      {
        id: 'energy-e2',
        date: '2024',
        headline: 'Grid Battery Storage Capacity Exceeds 100 GWh Worldwide',
        summary: 'Lithium iron phosphate (LFP) and initial sodium-ion stationary storage systems stabilize power grids against duck-curve demand surges.',
        impactLevel: 'High',
        tag: 'Storage',
        source: 'BloombergNEF'
      },
      {
        id: 'energy-e3',
        date: '2025',
        headline: 'Solid-State Battery Prototypes Enter Commercial Pilot Testing',
        summary: 'Automakers achieve 1,000 km range per charge with 12-minute 80% fast-charging capability, mitigating cold-weather range degradation.',
        impactLevel: 'Critical',
        tag: 'Automotive',
        source: 'Automotive News'
      },
      {
        id: 'energy-e4',
        date: '2026 (Present Day)',
        headline: 'Cross-Continent HVDC Subsea Power Cables Connect Renewable Corridors',
        summary: 'Mega-grid interlinks transfer surplus desert solar power across continents into nocturnal peak zones, creating 24/7 clean baseload power.',
        impactLevel: 'High',
        tag: 'Smart Grids',
        source: 'Financial Times'
      }
    ]
  }
];
