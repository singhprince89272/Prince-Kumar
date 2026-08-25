import { CuriosityTopic } from '../types';

export const CURIOSITY_TOPICS: CuriosityTopic[] = [
  {
    id: 'ai_tech',
    label: 'Artificial Intelligence & Deep Tech',
    tagline: 'LLMs, autonomous robotics, quantum computing & chips',
    categoryMatch: ['technology', 'science'],
    keywords: ['ai', 'artificial intelligence', 'robotics', 'model', 'quantum', 'chip', 'semiconductor', 'software', 'nvidia', 'openai', 'google', 'apple', 'meta'],
    emoji: '🤖',
    color: 'from-violet-500 to-indigo-600',
    gradient: 'hover:border-violet-500/50'
  },
  {
    id: 'markets_finance',
    label: 'Global Markets & Macro Economy',
    tagline: 'Wall Street, interest rates, crypto, banking & commodities',
    categoryMatch: ['business'],
    keywords: ['market', 'stock', 'inflation', 'fed', 'economy', 'crypto', 'bitcoin', 'bank', 'earnings', 'nasdaq', 'investor', 'revenue', 'dollar', 'gold'],
    emoji: '📈',
    color: 'from-emerald-500 to-teal-600',
    gradient: 'hover:border-emerald-500/50'
  },
  {
    id: 'geopolitics_world',
    label: 'Geopolitics & Global Diplomacy',
    tagline: 'International summits, trade pacts, defense & treaties',
    categoryMatch: ['general'],
    keywords: ['summit', 'treaty', 'diplomacy', 'un', 'president', 'prime minister', 'defense', 'election', 'minister', 'foreign', 'nato', 'security'],
    emoji: '🌍',
    color: 'from-blue-500 to-cyan-600',
    gradient: 'hover:border-blue-500/50'
  },
  {
    id: 'space_science',
    label: 'Space Exploration & Discoveries',
    tagline: 'NASA, ISRO, James Webb telescope & fundamental physics',
    categoryMatch: ['science', 'technology'],
    keywords: ['space', 'nasa', 'isro', 'telescope', 'galaxy', 'planet', 'mars', 'lunar', 'astronomy', 'physics', 'orbit', 'rocket', 'spacex'],
    emoji: '🚀',
    color: 'from-fuchsia-500 to-pink-600',
    gradient: 'hover:border-fuchsia-500/50'
  },
  {
    id: 'climate_energy',
    label: 'Clean Energy & Climate Innovation',
    tagline: 'Solar grids, electric vehicles, nuclear fusion & ecology',
    categoryMatch: ['science', 'general', 'technology'],
    keywords: ['climate', 'energy', 'solar', 'wind', 'battery', 'electric', 'ev', 'carbon', 'green', 'environment', 'nuclear', 'fusion', 'grid'],
    emoji: '🌿',
    color: 'from-green-500 to-emerald-600',
    gradient: 'hover:border-green-500/50'
  },
  {
    id: 'india_growth',
    label: 'India & Emerging Economies',
    tagline: 'Digital public infrastructure, manufacturing & policy shifts',
    categoryMatch: ['india', 'business', 'technology'],
    keywords: ['india', 'delhi', 'mumbai', 'bengaluru', 'isro', 'upi', 'rbi', 'rupee', 'parliament', 'asia', 'growth', 'infrastructure'],
    emoji: '🇮🇳',
    color: 'from-amber-500 to-orange-600',
    gradient: 'hover:border-amber-500/50'
  },
  {
    id: 'health_biotech',
    label: 'Health, Medicine & Longevity',
    tagline: 'Gene editing, clinical breakthroughs, oncology & wellness',
    categoryMatch: ['health', 'science'],
    keywords: ['health', 'medicine', 'vaccine', 'treatment', 'cancer', 'therapy', 'dna', 'biology', 'fda', 'clinical', 'doctor', 'hospital', 'longevity'],
    emoji: '🏥',
    color: 'from-rose-500 to-red-600',
    gradient: 'hover:border-rose-500/50'
  },
  {
    id: 'culture_cinema',
    label: 'Culture, Cinema & Gaming',
    tagline: 'Streaming entertainment, film festivals, arts & game studios',
    categoryMatch: ['entertainment'],
    keywords: ['movie', 'film', 'oscar', 'music', 'game', 'gaming', 'actor', 'director', 'hollywood', 'streaming', 'netflix', 'festival', 'series'],
    emoji: '🎬',
    color: 'from-purple-500 to-rose-600',
    gradient: 'hover:border-purple-500/50'
  },
  {
    id: 'sports_tournaments',
    label: 'Premier Sports & Championships',
    tagline: 'Champions League, Cricket World Cup, Formula 1 & Olympics',
    categoryMatch: ['sports'],
    keywords: ['cricket', 'football', 'soccer', 'match', 'tournament', 'championship', 'formula 1', 'f1', 'tennis', 'olympics', 'league', 'goal', 'score'],
    emoji: '🏏',
    color: 'from-sky-500 to-blue-600',
    gradient: 'hover:border-sky-500/50'
  }
];
