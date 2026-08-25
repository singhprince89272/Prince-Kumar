import { Article, NewsApiResponse, NewsCategory, SortByOption } from '../types';
import { FALLBACK_ARTICLES, CATEGORY_PLACEHOLDERS } from '../data/fallbackNews';

const CLIENT_API_KEY = (import.meta as any).env?.VITE_NEWS_API_KEY || '';

// Clean and normalize incoming raw articles from NewsAPI or server
export function normalizeArticle(raw: any, defaultCategory: string = 'general'): Article {
  const category = raw.category || defaultCategory;
  const imageFallback = CATEGORY_PLACEHOLDERS[category.toLowerCase()] || CATEGORY_PLACEHOLDERS.general;

  // Generate deterministic ID if missing
  const id = raw.id || (raw.url ? encodeURIComponent(raw.url.slice(-40)) : `article-${Math.random().toString(36).substring(2, 9)}`);

  // Calculate estimated reading time
  const fullText = `${raw.title || ''} ${raw.description || ''} ${raw.content || ''}`;
  const words = fullText.trim().split(/\s+/).length;
  const readTimeMinutes = Math.max(2, Math.ceil(words / 60));

  // Extract key bullet points if missing
  let keyPoints: string[] = raw.keyPoints || [];
  if (!keyPoints || keyPoints.length === 0) {
    if (raw.description && raw.description.length > 30) {
      keyPoints = [
        raw.description,
        'Key updates and context from industry stakeholders and reporters.',
        'Continuous analysis and verified developments regarding the story.'
      ];
    } else {
      keyPoints = [
        'Breaking developments published by verified newsroom sources.',
        'Key contextual highlights and regional impact metrics.',
        'Official statements and regulatory updates.'
      ];
    }
  }

  return {
    id,
    title: raw.title || 'Untitled Story',
    description: raw.description || 'No description available for this headline.',
    content: raw.content || raw.description || 'Full story content available at the publisher link below.',
    url: raw.url || '#',
    urlToImage: raw.urlToImage && raw.urlToImage.startsWith('http') ? raw.urlToImage : imageFallback,
    publishedAt: raw.publishedAt || new Date().toISOString(),
    source: {
      id: raw.source?.id || null,
      name: raw.source?.name || 'NewsHub Bureau'
    },
    author: raw.author || (raw.source?.name ? `${raw.source.name} Staff` : 'News Bureau'),
    category,
    readTimeMinutes,
    isBreaking: !!raw.isBreaking || raw.title?.toLowerCase().includes('break') || false,
    isTrending: !!raw.isTrending || false,
    keyPoints
  };
}

export async function fetchTopHeadlines(
  category: NewsCategory = 'general',
  country: string = 'all',
  page: number = 1,
  pageSize: number = 12,
  searchQuery: string = ''
): Promise<NewsApiResponse> {
  try {
    // 1. Try server proxy endpoint first
    const params = new URLSearchParams({
      category: category === 'india' ? 'general' : category,
      country: category === 'india' ? 'in' : (country === 'all' ? '' : country),
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(searchQuery ? { q: searchQuery } : {})
    });

    const response = await fetch(`/api/news/top-headlines?${params.toString()}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        return {
          status: 'ok',
          totalResults: data.totalResults || data.articles.length,
          page,
          pageSize,
          articles: data.articles.map((a: any) => normalizeArticle(a, category))
        };
      }
    }
  } catch (err) {
    console.warn('[newsApi] Server proxy failed or offline, attempting direct/fallback:', err);
  }

  // 2. Direct client fetch if VITE_NEWS_API_KEY is available in client env
  if (CLIENT_API_KEY) {
    try {
      const isIndia = category === 'india';
      const actualCategory = isIndia ? 'general' : category;
      const actualCountry = isIndia ? 'in' : (country === 'all' ? 'us' : country);

      const url = `https://newsapi.org/v2/top-headlines?country=${actualCountry}&category=${actualCategory}&page=${page}&pageSize=${pageSize}&apiKey=${CLIENT_API_KEY}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`;
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok' && data.articles) {
          return {
            status: 'ok',
            totalResults: data.totalResults,
            page,
            pageSize,
            articles: data.articles
              .filter((a: any) => a.title && a.title !== '[Removed]')
              .map((a: any) => normalizeArticle(a, category))
          };
        }
      }
    } catch (e) {
      console.warn('[newsApi] Direct client fetch failed:', e);
    }
  }

  // 3. Fallback to rich curated local dataset
  let filtered = [...FALLBACK_ARTICLES];

  if (category && category !== 'general') {
    filtered = filtered.filter(a => a.category?.toLowerCase() === category.toLowerCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q) ||
      a.source.name.toLowerCase().includes(q)
    );
  }

  // If no articles match the strict filter, provide general ones rather than empty
  if (filtered.length === 0 && !searchQuery) {
    filtered = FALLBACK_ARTICLES;
  }

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    status: 'ok',
    totalResults: filtered.length,
    page,
    pageSize,
    articles: paginated.map(a => normalizeArticle(a, category))
  };
}

export async function fetchEverything(
  query: string,
  sortBy: SortByOption = 'publishedAt',
  page: number = 1,
  pageSize: number = 12
): Promise<NewsApiResponse> {
  if (!query || query.trim() === '') {
    return fetchTopHeadlines('general', 'all', page, pageSize);
  }

  try {
    const params = new URLSearchParams({
      q: query,
      sortBy,
      page: page.toString(),
      pageSize: pageSize.toString()
    });

    const response = await fetch(`/api/news/everything?${params.toString()}`);
    if (response.ok) {
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        return {
          status: 'ok',
          totalResults: data.totalResults || data.articles.length,
          page,
          pageSize,
          articles: data.articles.map((a: any) => normalizeArticle(a, 'general'))
        };
      }
    }
  } catch (err) {
    console.warn('[newsApi] Everything endpoint fetch failed:', err);
  }

  // Direct client fetch fallback
  if (CLIENT_API_KEY) {
    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sortBy}&page=${page}&pageSize=${pageSize}&apiKey=${CLIENT_API_KEY}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok' && data.articles) {
          return {
            status: 'ok',
            totalResults: data.totalResults,
            page,
            pageSize,
            articles: data.articles
              .filter((a: any) => a.title && a.title !== '[Removed]')
              .map((a: any) => normalizeArticle(a, 'general'))
          };
        }
      }
    } catch (e) {
      console.warn('[newsApi] Direct everything client fetch error:', e);
    }
  }

  // Local search in fallback database
  const q = query.toLowerCase();
  const matched = FALLBACK_ARTICLES.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.description.toLowerCase().includes(q) ||
    a.content.toLowerCase().includes(q) ||
    a.source.name.toLowerCase().includes(q) ||
    a.category?.toLowerCase().includes(q)
  );

  const start = (page - 1) * pageSize;
  const paginated = matched.slice(start, start + pageSize);

  return {
    status: 'ok',
    totalResults: matched.length,
    page,
    pageSize,
    articles: paginated.map(a => normalizeArticle(a, 'general'))
  };
}

export async function fetchTrendingNews(): Promise<Article[]> {
  const result = await fetchTopHeadlines('general', 'all', 1, 6);
  return result.articles;
}
