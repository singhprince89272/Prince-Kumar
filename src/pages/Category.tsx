import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNews } from '../context/NewsContext';
import { fetchTopHeadlines } from '../services/newsApi';
import { Article, NewsCategory } from '../types';
import { NewsGrid } from '../components/NewsGrid';
import { ErrorMessage } from '../components/ErrorMessage';
import { CATEGORIES } from '../components/CategoryNav';
import { RefreshCw, ArrowDown, Sparkles } from 'lucide-react';

interface CategoryProps {
  onShare: (article: Article) => void;
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  general: 'Crucial global developments, diplomatic relations, and pressing international headlines.',
  business: 'Financial markets, macroeconomic analysis, venture capital, and enterprise corporate movements.',
  technology: 'Artificial intelligence breakthroughs, semiconductor innovations, cyber infrastructure, and consumer tech.',
  sports: 'Tournament standings, match results, transfers, athletics, and international sporting championships.',
  entertainment: 'Film industry festivals, cinema releases, streaming debuts, music, and pop-culture trends.',
  health: 'Medical immunology research, biotechnology breakthroughs, clinical trials, and public health.',
  science: 'Astrophysics, space exploration, quantum mechanics discoveries, and environmental conservation.',
  india: 'High-growth tech innovation, space missions, financial rail advancements, and national governance from India.'
};

export const Category: React.FC<CategoryProps> = ({ onShare }) => {
  const { activeCategory, country, viewLayout } = useNews();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategoryMeta = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  const Icon = activeCategoryMeta.icon;

  const loadCategoryNews = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const res = await fetchTopHeadlines(activeCategory, country, pageNum, 12);
      
      if (res.articles && res.articles.length > 0) {
        if (isLoadMore) {
          setArticles(prev => [...prev, ...res.articles]);
        } else {
          setArticles(res.articles);
        }
        setHasMore(res.articles.length >= 8);
      } else {
        if (!isLoadMore) setArticles([]);
        setHasMore(false);
      }
    } catch (err: any) {
      console.error('Failed to load category news:', err);
      setError(err.message || 'Error loading category feed');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadCategoryNews(1, false);
  }, [activeCategory, country]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCategoryNews(nextPage, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-gradient-to-br from-rose-500/10 to-red-500/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20 shadow-2xs">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                Category Feed
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 capitalize">
                {activeCategoryMeta.label}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2.5 max-w-2xl font-medium">
            {CATEGORY_DESCRIPTIONS[activeCategory] || 'Stay updated with top stories and continuous dispatches.'}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => loadCategoryNews(1, false)}
          title="Refresh Category"
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all self-start sm:self-center cursor-pointer hover:shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </motion.button>
      </div>

      {/* Error state */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => loadCategoryNews(1, false)}
        />
      )}

      {/* Grid */}
      <NewsGrid
        articles={articles}
        loading={loading}
        layout={viewLayout}
        onShare={onShare}
        emptyTitle={`No articles in ${activeCategoryMeta.label}`}
        emptySubtitle="Check back shortly or explore other categories."
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
                <span>Loading more stories...</span>
              </>
            ) : (
              <>
                <span>Load More {activeCategoryMeta.label}</span>
                <ArrowDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};

