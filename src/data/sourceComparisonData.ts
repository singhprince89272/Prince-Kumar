import { SourceComparisonEvent } from '../types';

export const SOURCE_COMPARISONS: SourceComparisonEvent[] = [
  {
    id: 'ai-global-treaty',
    eventTitle: 'Global AI Safety Accords: Nations Agree on Sovereign Compute and Safety Safeguards',
    eventSummary: 'Over 40 countries and major AI research labs reach consensus on mandatory red-teaming protocols, provenance watermarking, and safety audits for models exceeding 10^26 FLOP training thresholds.',
    topicCategory: 'technology',
    date: 'August 2026',
    consensusPoints: [
      'Universal agreement on watermarking synthetic audio and video media',
      'Mandatory reporting of catastrophic risk evaluations before public deployment',
      'Joint international research consortium to study agentic misalignment risks'
    ],
    divergentPoints: [
      'Disagreement over open-source model weights liability and licensing restrictions',
      'Developing vs. developed economies split on sovereign datacenter energy subsidies',
      'Debate between preemptive regulatory licensing vs. post-market tort liability'
    ],
    perspectives: [
      {
        sourceName: 'Reuters',
        logoBadge: 'REU',
        biasRating: 'Center',
        tone: 'Neutral',
        headline: 'Global Envoys Seal Landmark Compute Framework for Frontier AI Systems',
        angleSnippet: 'Focuses on geopolitical consensus, diplomatic negotiations between US, EU, and Asian delegations, and statutory timelines for cross-border enforcement.',
        keyPoints: [
          '42 nations sign binding declaration on compute reporting threshold',
          'Enforcement mechanism relies on national civil aviation and telecommunications models',
          'Treaty avoids punitive export barriers on open-research foundation weights'
        ],
        readTime: '4 min',
        articleUrl: 'https://news.google.com/search?q=Global+AI+Safety+Accords+Reuters'
      },
      {
        sourceName: 'BBC World',
        logoBadge: 'BBC',
        biasRating: 'Center',
        tone: 'Analytical',
        headline: 'AI Safety Summit: Hope for Humanity or Unenforceable Ambition?',
        angleSnippet: 'Emphasizes civic society concerns, public anxiety over labor displacement, and the ethical dilemma of corporate self-policing vs independent testing bodies.',
        keyPoints: [
          'Independent audit institutes given inspection powers inside frontier compute clusters',
          'Civil rights organizations raise concerns over facial recognition surveillance exemptions',
          'UK and European regulators pledge dedicated consumer ombudsman offices'
        ],
        readTime: '5 min',
        articleUrl: 'https://news.google.com/search?q=AI+Safety+Summit+BBC'
      },
      {
        sourceName: 'The Hindu',
        logoBadge: 'TH',
        biasRating: 'Center',
        tone: 'Analytical',
        headline: 'Global South Demands Equal Access to Frontier AI and Sovereign Compute Grids',
        angleSnippet: 'Spotlights the perspective of emerging economies advocating for democratized AI infrastructure, local language LLM support, and affordable compute access.',
        keyPoints: [
          'India advocates for AI for All philosophy embedded into multilateral accords',
          'Call to avoid digital colonialism where compute remains concentrated in few Western labs',
          'Inclusion of Indic language benchmarks into global safety standards'
        ],
        readTime: '4 min',
        articleUrl: 'https://news.google.com/search?q=AI+Safety+Global+South+The+Hindu'
      },
      {
        sourceName: 'TechCrunch',
        logoBadge: 'TC',
        biasRating: 'Tech/Financial Focus',
        tone: 'Optimistic',
        headline: 'How the New AI Accords Protect Startups While Regulating Hyperscalers',
        angleSnippet: 'Assesses the commercial impact on venture capital, indie developers, and open-source model ecosystems, highlighting safe harbor exemptions for sub-tier startups.',
        keyPoints: [
          'Tiered compliance thresholds spare early-stage startups and universities from heavy audits',
          'VC sentiment rebounds as regulatory certainty removes investment overhang',
          'Accelerated demand predicted for third-party AI red-teaming security vendors'
        ],
        readTime: '3 min',
        articleUrl: 'https://news.google.com/search?q=AI+Accord+Startups+TechCrunch'
      }
    ]
  },
  {
    id: 'central-banks-rate-cuts',
    eventTitle: 'Central Banks Pivot to Monetary Easing as Inflation Cools Across Major Economies',
    eventSummary: 'The Federal Reserve, European Central Bank, and Asian central banks calibrate interest rate trajectories, aiming for soft landings amidst resilient consumer spending.',
    topicCategory: 'business',
    date: 'August 2026',
    consensusPoints: [
      'Headline inflation across G20 economies has largely reverted toward target 2-4% bands',
      'Borrowing costs for mortgage and corporate debt will steadily decline over next 18 months',
      'Labor markets remain historically resilient despite restrictive tightening cycle'
    ],
    divergentPoints: [
      'Hawks warn about lingering services inflation and wage growth sticky points',
      'Doves argue delaying rate cuts risks undue stress on commercial real estate and regional banks',
      'Currencies fluctuate based on the pace and magnitude of regional rate divergence'
    ],
    perspectives: [
      {
        sourceName: 'Bloomberg',
        logoBadge: 'BLM',
        biasRating: 'Tech/Financial Focus',
        tone: 'Analytical',
        headline: 'Global Liquidity Wave: Bond Yields Fall as Central Banks Synchronize Rate Easing',
        angleSnippet: 'Focuses on capital markets, equity valuation multiples, private credit shifts, and hedge fund positioning in sovereign debt markets.',
        keyPoints: [
          'Global bond index logs strongest monthly performance in two years',
          'Corporate refinancing pipelines swell as investment-grade spreads compress',
          'Tech growth stocks rally on lower discount rate calculations'
        ],
        readTime: '5 min',
        articleUrl: 'https://news.google.com/search?q=Central+Banks+Rate+Cuts+Bloomberg'
      },
      {
        sourceName: 'The Wall Street Journal',
        logoBadge: 'WSJ',
        biasRating: 'Right-Leaning',
        tone: 'Critical',
        headline: 'The Inflation Hangover: Why Lower Rates Wont Instantly Fix Consumer Sentiment',
        angleSnippet: 'Examines price stickiness in housing, groceries, insurance, and household debt burdens accumulated over three years of elevated prices.',
        keyPoints: [
          'Cumulative inflation since 2021 remains 22% higher across consumer baskets',
          'Credit card delinquencies remain elevated among lower-income brackets',
          'Caution against aggressive rate cuts triggering second-wave commodity spikes'
        ],
        readTime: '6 min',
        articleUrl: 'https://news.google.com/search?q=Inflation+Interest+Rates+WSJ'
      },
      {
        sourceName: 'Financial Times',
        logoBadge: 'FT',
        biasRating: 'Center',
        tone: 'Neutral',
        headline: 'Central Banking at the Crossroads: Managing Growth Without Reigniting Price Bubbles',
        angleSnippet: 'In-depth policy breakdown of central bank balance sheet unwinding (quantitative tightening) alongside interest rate policy.',
        keyPoints: [
          'Quantitative tightening continues quietly in background to trim bloated reserves',
          'Fiscal deficits in major democracies limit monetary policy independence',
          'Emerging market central banks gain headroom to boost domestic infrastructure loans'
        ],
        readTime: '5 min',
        articleUrl: 'https://news.google.com/search?q=Central+Banks+FT'
      }
    ]
  }
];
