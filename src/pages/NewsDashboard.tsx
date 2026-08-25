import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  Layers, 
  Compass, 
  BookOpen, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowUpRight,
  PieChart as PieIcon,
  Activity,
  Globe2,
  CheckCircle2
} from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';
import { useActivity } from '../context/ActivityContext';
import { POPULAR_TOPICS } from '../data/followedTopicsData';
import { NewsCard } from '../components/NewsCard';
import { fetchTopHeadlines } from '../services/newsApi';
import { FALLBACK_ARTICLES } from '../data/fallbackNews';

interface NewsDashboardProps {
  articles?: Article[];
  onShare: (article: Article) => void;
}

export const NewsDashboard: React.FC<NewsDashboardProps> = ({ articles: initialArticles, onShare }) => {
  const { openArticle, navigateToCategory, navigateToFollowing, navigateToMarkets, country } = useNews();
  const { stats } = useActivity();
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);

  useEffect(() => {
    if (!initialArticles || initialArticles.length === 0) {
      fetchTopHeadlines('general', country, 1).then(res => {
        if (res.articles && res.articles.length > 0) {
          setArticles(res.articles);
        } else {
          setArticles(FALLBACK_ARTICLES);
        }
      }).catch(() => {
        setArticles(FALLBACK_ARTICLES);
      });
    }
  }, [country, initialArticles]);

  // Compute category statistics
  const categoryCounts: Record<string, number> = {};
  articles.forEach(a => {
    const cat = a.category || 'general';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const topStories = articles.filter(a => a.isBreaking || a.isTrending).slice(0, 4);

  const trendingTopics = [...POPULAR_TOPICS]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-rose-500/10 to-amber-500/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20 shadow-2xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              News Pulse & Analytics Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Real-time editorial pulse, category heatmaps, and reading intelligence.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Wire Live: {articles.length} Stories Indexed</span>
          </span>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Top Headlines</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {articles.filter(a => a.isBreaking).length}
          </div>
          <p className="text-2xs text-rose-500 font-bold mt-1">
            Breaking updates in rotation
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Your Read Count</span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {stats.totalArticlesRead}
          </div>
          <p className="text-2xs text-indigo-500 font-bold mt-1">
            {stats.activeStreakDays} day reading streak 🔥
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Categories</span>
            <Layers className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {Object.keys(categoryCounts).length}
          </div>
          <p className="text-2xs text-amber-500 font-bold mt-1">
            Full spectrum global coverage
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Global Sources</span>
            <Globe2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
            18+
          </div>
          <p className="text-2xs text-emerald-500 font-bold mt-1">
            Verified publishing outlets
          </p>
        </div>
      </div>

      {/* Grid: Trending Topics Heatmap + Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                Trending Topic Radar & Momentum
              </h2>
            </div>
            <button
              onClick={navigateToFollowing}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Manage Feed</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {trendingTopics.map((topic, i) => (
              <div
                key={topic.id}
                onClick={navigateToFollowing}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{topic.emoji}</span>
                    <span className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {topic.name}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-3xs font-black bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                    Score {topic.trendingScore}
                  </span>
                </div>
                <p className="text-2xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2 font-medium">
                  {topic.tagline}
                </p>
                <div className="flex items-center justify-between text-3xs text-zinc-400 font-bold">
                  <span>{(topic.followersCount / 1000).toFixed(1)}k followers</span>
                  <span className="text-rose-500">#{i + 1} Trending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <div className="flex items-center space-x-2 mb-5">
            <PieIcon className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
              Coverage Breakdown
            </h2>
          </div>

          <div className="space-y-3.5">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const percentage = Math.round((count / articles.length) * 100);
              return (
                <div
                  key={cat}
                  onClick={() => navigateToCategory(cat as any)}
                  className="cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="capitalize text-zinc-700 dark:text-zinc-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {cat}
                    </span>
                    <span className="text-zinc-400">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Breaking & Top Stories */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              Today's Key Developments
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Curated by NewsHub Editors</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topStories.map((article) => (
            <NewsCard key={article.id} article={article} onShare={onShare} />
          ))}
        </div>
      </div>
    </div>
  );
};
