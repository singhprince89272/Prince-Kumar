import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNews } from '../context/NewsContext';
import { useActivity } from '../context/ActivityContext';
import { fetchTopHeadlines } from '../services/newsApi';
import { Article } from '../types';
import { BreakingNews } from '../components/BreakingNews';
import { FeaturedNews } from '../components/FeaturedNews';
import { NewsGrid } from '../components/NewsGrid';
import { NewsCard } from '../components/NewsCard';
import { SearchBar } from '../components/SearchBar';
import { BeyondNews } from '../components/BeyondNews';
import { NewsNearYouCard } from '../components/near-you/NewsNearYouCard';
import { HomeFinanceSection } from '../components/home/HomeFinanceSection';
import { HomeWeatherSection } from '../components/home/HomeWeatherSection';
import { ErrorMessage } from '../components/ErrorMessage';
import { FeaturedSkeleton } from '../components/Loader';
import { CURIOSITY_TOPICS } from '../data/curiosities';
import { Sparkles, TrendingUp, RefreshCw, ArrowDown, Newspaper, Radio, Sliders, ShieldCheck, Compass } from 'lucide-react';

interface HomeProps {
  onShare: (article: Article) => void;
}

export const Home: React.FC<HomeProps> = ({ onShare }) => {
  const { country, viewLayout } = useNews();
  const { 
    preferences, 
    setIsCuriosityModalOpen, 
    setIsActivityModalOpen, 
    getArticleCuriosityMatch,
    stats 
  } = useActivity();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHeadlines = async (pageNum = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const res = await fetchTopHeadlines('general', country, pageNum, 12);
      
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
      console.error('Failed to load headlines:', err);
      setError(err.message || 'Error loading latest headlines');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadHeadlines(1, false);
  }, [country]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadHeadlines(nextPage, true);
  };

  // Filter articles matching user curiosities
  const curiosityMatchedArticles = articles.filter(art => {
    const match = getArticleCuriosityMatch(art);
    return match.isMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Bar */}
      <SearchBar />

      {/* Breaking News Ticker */}
      {articles.length > 0 && <BreakingNews articles={articles} />}

      {/* Error state */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => loadHeadlines(1, false)}
        />
      )}

      {/* News Curiosity & Activity Banner Spotlight */}
      <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-rose-600/15 via-purple-600/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-wider border border-rose-500/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Curiosity Engine Active</span>
              </span>
              <span className="text-xs text-zinc-400">
                • {preferences.curiosityTopics.length} Focus Areas • Streak: <strong className="text-orange-400">{stats.activeStreakDays}d</strong>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Curated According to Your News Curiosities
            </h3>

            {/* Active Curiosity Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {preferences.curiosityTopics.slice(0, 4).map((topicId) => {
                const topic = CURIOSITY_TOPICS.find(t => t.id === topicId);
                if (!topic) return null;
                return (
                  <span
                    key={topic.id}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-[11px] font-bold text-zinc-200"
                  >
                    <span>{topic.emoji}</span>
                    <span>{topic.label.split('&')[0]}</span>
                  </span>
                );
              })}
              {preferences.curiosityTopics.length > 4 && (
                <span className="px-2 py-1 rounded-xl bg-zinc-800 text-[11px] font-bold text-zinc-400">
                  +{preferences.curiosityTopics.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCuriosityModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer border border-white/10"
            >
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              <span>Change Curiosities</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsActivityModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30 flex items-center space-x-1.5 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>My Activity ({stats.totalArticlesRead} Read)</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Loading state for hero */}
      {loading ? (
        <FeaturedSkeleton />
      ) : (
        articles.length > 0 && (
          <FeaturedNews articles={articles} onShare={onShare} />
        )
      )}

      {/* 📍 News Near You Homepage Card */}
      <NewsNearYouCard />

      {/* Latest News Feed Stream */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl shadow-2xs border border-rose-500/20">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                Latest News Stream
              </h2>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => loadHeadlines(1, false)}
            title="Refresh Feed"
            className="flex items-center space-x-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </motion.button>
        </div>

        {/* News Grid (skipping first 4 which are featured in hero) */}
        <NewsGrid
          articles={articles.length > 4 ? articles.slice(4) : articles}
          loading={loading}
          layout={viewLayout}
          onShare={onShare}
          emptyTitle="No additional news articles"
          emptySubtitle="Check back in a few minutes for new developing stories."
        />

        {/* Load More Button / Pagination */}
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
                  <span>Fetching stories...</span>
                </>
              ) : (
                <>
                  <span>Load More Stories</span>
                  <ArrowDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </section>

      {/* 📈 Finance & Stock Markets Dedicated Section */}
      <HomeFinanceSection />

      {/* 🌤️ Live Weather & Climate Dedicated Section */}
      <HomeWeatherSection />
    </div>
  );
};

