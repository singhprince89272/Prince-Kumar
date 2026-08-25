import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNews } from '../context/NewsContext';
import { fetchEverything } from '../services/newsApi';
import { Article, SortByOption } from '../types';
import { SearchBar } from '../components/SearchBar';
import { NewsGrid } from '../components/NewsGrid';
import { ErrorMessage } from '../components/ErrorMessage';
import { Search as SearchIcon, SlidersHorizontal, RefreshCw, ArrowDown, Sparkles } from 'lucide-react';
import { TRENDING_TAGS } from '../data/fallbackNews';

interface SearchProps {
  onShare: (article: Article) => void;
}

export const Search: React.FC<SearchProps> = ({ onShare }) => {
  const { searchQuery, setSearchQuery, viewLayout, navigateToSearch } = useNews();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState<SortByOption>('publishedAt');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (query: string, sort: SortByOption = sortBy, pageNum = 1, isLoadMore = false) => {
    if (!query || query.trim() === '') {
      setArticles([]);
      setTotalResults(0);
      return;
    }

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const res = await fetchEverything(query.trim(), sort, pageNum, 12);
      
      if (res.articles && res.articles.length > 0) {
        if (isLoadMore) {
          setArticles(prev => [...prev, ...res.articles]);
        } else {
          setArticles(res.articles);
        }
        setTotalResults(res.totalResults || res.articles.length);
        setHasMore(res.articles.length >= 8);
      } else {
        if (!isLoadMore) {
          setArticles([]);
          setTotalResults(0);
        }
        setHasMore(false);
      }
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.message || 'Error executing search');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
      performSearch(searchQuery, sortBy, 1, false);
    }
  }, [searchQuery, sortBy]);

  const handleSortChange = (newSort: SortByOption) => {
    setSortBy(newSort);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(searchQuery, sortBy, nextPage, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Header Bar */}
      <SearchBar onSearch={(q, s) => {
        setSearchQuery(q);
        setSortBy(s);
      }} />

      {/* Results Header */}
      {searchQuery && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
                <SearchIcon className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                Search Results for <span className="text-rose-600 dark:text-rose-400">"{searchQuery}"</span>
              </h1>
            </div>
            {!loading && (
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Showing {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              </p>
            )}
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortByOption)}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 rounded-xl px-3.5 py-2 outline-none focus:border-rose-500 cursor-pointer shadow-2xs"
            >
              <option value="publishedAt">Latest First</option>
              <option value="relevancy">Most Relevant</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => performSearch(searchQuery, sortBy, 1, false)}
        />
      )}

      {/* Grid */}
      <NewsGrid
        articles={articles}
        loading={loading}
        layout={viewLayout}
        onShare={onShare}
        emptyTitle={searchQuery ? `No articles matching "${searchQuery}"` : "Enter a search query to begin"}
        emptySubtitle="Try searching for broad terms like AI, space, markets, clean energy, or select from trending topics."
      />

      {/* Load More */}
      {!loading && hasMore && articles.length >= 8 && (
        <div className="mt-12 text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 hover:from-rose-600 hover:to-red-600 dark:hover:from-rose-600 dark:hover:to-red-600 text-white dark:text-zinc-900 dark:hover:text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg shadow-zinc-950/10 hover:shadow-rose-600/30 transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Loading more results...</span>
              </>
            ) : (
              <>
                <span>Load More Results</span>
                <ArrowDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};

