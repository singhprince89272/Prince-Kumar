export type NewsCategory = 
  | 'general'
  | 'business'
  | 'technology'
  | 'sports'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'india'
  | 'near-you'
  | 'finance'
  | 'weather';

export type CountryCode = 'us' | 'in' | 'gb' | 'all';

export type SortByOption = 'publishedAt' | 'relevancy' | 'popularity';

export interface ArticleSource {
  id: string | null;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: ArticleSource;
  author: string | null;
  category?: string;
  readTimeMinutes?: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  keyPoints?: string[];
  viewsCount?: number;
  commentsCount?: number;
  locationTier?: 'city' | 'district' | 'state' | 'national';
  locationName?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  page?: number;
  pageSize?: number;
}

export type ActiveView = 
  | 'home'
  | 'category'
  | 'search'
  | 'article'
  | 'bookmarks'
  | 'dashboard'
  | 'markets'
  | 'weather'
  | 'timeline'
  | 'sources'
  | 'following'
  | 'beyond-news'
  | 'near-you'
  | '404';

export type ViewLayout = 'grid' | 'compact' | 'magazine';

// Precious Metals Types
export interface PreciousMetalRate {
  id: string;
  name: string;
  symbol: string;
  purity: string;
  priceINR: number;
  priceUSD: number;
  unit: string;
  change: number;
  changePercent: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'neutral';
}

// Currency Exchange Types
export interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  symbol: string;
  rateToINR: number;
  rateToUSD: number;
  change24h?: number;
}

// Crypto Quote Types
export interface CryptoQuote {
  id: string;
  symbol: string;
  name: string;
  icon?: string;
  priceUSD: number;
  priceINR: number;
  change24h: number;
  changePercent24h: number;
  marketCapUSD: number;
  volume24hUSD: number;
  sparkline?: number[];
  lastUpdated: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

// Comments & Discussion Types
export interface CommentReply {
  id: string;
  commentId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userReaction?: 'like' | 'dislike' | null;
}

export interface ArticleComment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userReaction?: 'like' | 'dislike' | null;
  replies: CommentReply[];
  isReported?: boolean;
  isPinned?: boolean;
}

// Followed Topics Types
export interface FollowableTopic {
  id: string;
  name: string;
  tagline: string;
  category: string;
  keywords: string[];
  emoji: string;
  followersCount: number;
  trendingScore: number;
  color: string;
}

// Notifications Types
export type NotificationType = 'breaking' | 'followed_topic' | 'daily_digest' | 'market_alert' | 'weather_alert';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  articleId?: string;
  topicId?: string;
  linkUrl?: string;
  urgency?: 'high' | 'normal';
}

// Stock & Markets Types
export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  exchange: string;
  high24h: number;
  low24h: number;
  volume: string;
  marketCap: string;
  peRatio: number;
  sparkline: number[];
  category: 'index' | 'tech' | 'indian' | 'global' | 'crypto';
}

// Weather Section Types
export interface WeatherForecastDay {
  day: string;
  date: string;
  condition: string;
  conditionIcon: string;
  tempHigh: number;
  tempLow: number;
  precipitationChance: number;
}

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  condition: string;
  conditionIcon: string;
  feelsLike: number;
  humidity: number;
  windSpeedKmH: number;
  uvIndex: number;
  aqi: number;
  aqiStatus: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  hourly: { time: string; temp: number; icon: string }[];
  forecast: WeatherForecastDay[];
  climateNews: Article[];
}

// Timeline Types
export interface TimelineEvent {
  id: string;
  date: string;
  time?: string;
  headline: string;
  summary: string;
  impactLevel: 'Critical' | 'High' | 'Medium';
  tag: string;
  source: string;
  sourceUrl?: string;
  image?: string;
}

export interface StoryTimeline {
  id: string;
  title: string;
  tagline: string;
  category: string;
  bannerImage: string;
  status: 'Developing' | 'Ongoing' | 'Concluded';
  lastUpdated: string;
  events: TimelineEvent[];
}

// Source Comparison Types
export interface SourcePerspective {
  sourceName: string;
  logoBadge: string;
  biasRating: 'Center' | 'Left-Leaning' | 'Right-Leaning' | 'Tech/Financial Focus';
  tone: 'Neutral' | 'Critical' | 'Optimistic' | 'Analytical';
  headline: string;
  angleSnippet: string;
  keyPoints: string[];
  readTime: string;
  articleUrl: string;
}

export interface SourceComparisonEvent {
  id: string;
  eventTitle: string;
  eventSummary: string;
  topicCategory: string;
  date: string;
  perspectives: SourcePerspective[];
  consensusPoints: string[];
  divergentPoints: string[];
}

export type ActivityActionType = 
  | 'read_article'
  | 'listen_audio'
  | 'search_query'
  | 'bookmark'
  | 'share'
  | 'category_browse';

export interface ActivityLog {
  id: string;
  type: ActivityActionType;
  title: string;
  category?: string;
  url?: string;
  timestamp: string;
  readDurationSeconds?: number;
  metadata?: Record<string, any>;
}

export interface CuriosityTopic {
  id: string;
  label: string;
  tagline: string;
  categoryMatch: string[];
  keywords: string[];
  emoji: string;
  color: string;
  gradient: string;
}

export interface UserPreferences {
  trackingConsent: boolean;
  curiosityTopics: string[];
  dailyReadingGoalMinutes: number;
  hasCompletedOnboarding: boolean;
  lastUpdated: string;
}

export interface ActivityStats {
  totalArticlesRead: number;
  totalAudioListened: number;
  totalSearches: number;
  totalBookmarks: number;
  totalReadingMinutes: number;
  activeStreakDays: number;
  categoryAffinities: Record<string, number>;
  curiosityMatchScore: number;
}

// Location News Hierarchy Types
export interface CivicAlert {
  id: string;
  type: 'infrastructure' | 'weather' | 'governance' | 'metro' | 'traffic' | 'health';
  title: string;
  description: string;
  time: string;
  badge: string;
}

export interface CityLocation {
  id: string;
  name: string;
  hindiName?: string;
  district: string;
  state: string;
  stateCode: string;
  country: string;
  lat: number;
  lon: number;
  tagline: string;
  population?: string;
  currentTemp?: string;
  weatherCondition?: string;
  aqi?: number;
  aqiStatus?: string;
  civicAlerts?: CivicAlert[];
  cityArticles: Article[];
  districtArticles: Article[];
  stateArticles: Article[];
  nationalArticles: Article[];
}

export interface StateDistrictHierarchy {
  id: string;
  name: string;
  code: string;
  capital: string;
  districts: {
    id: string;
    name: string;
    cities: string[];
  }[];
}

