import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  Compass, 
  SlidersHorizontal, 
  Bookmark, 
  ArrowRight,
  Flame,
  Radio,
  Layers
} from 'lucide-react';
import { Article } from '../types';
import { POPULAR_TOPICS } from '../data/followedTopicsData';
import { useNews } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';
import { fetchTopHeadlines } from '../services/newsApi';
import { FALLBACK_ARTICLES } from '../data/fallbackNews';

interface FollowingFeedProps {
  articles?: Article[];
  onShare: (article: Article) => void;
}

export const FollowingFeed: React.FC<FollowingFeedProps> = ({ articles: initialArticles, onShare }) => {
  const { 
    followedTopics, 
    toggleFollowTopic, 
    isTopicFollowed, 
    followAllRecommendedTopics,
    navigateToHome,
    country
  } = useNews();

  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [activeFilterTopic, setActiveFilterTopic] = useState<string>('all');

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

  // Filter articles based on followed topics
  const followedTopicObjs = POPULAR_TOPICS.filter(t => followedTopics.includes(t.id));
  
  // Aggregate all keywords from followed topics
  const allFollowedKeywords = followedTopicObjs.flatMap(t => t.keywords);

  const personalizedArticles = articles.filter(article => {
    if (followedTopics.length === 0) return false;

    // Check match against active filter topic specifically if not 'all'
    if (activeFilterTopic !== 'all') {
      const specificTopic = POPULAR_TOPICS.find(t => t.id === activeFilterTopic);
      if (!specificTopic) return false;
      const haystack = `${article.title} ${article.description} ${article.content || ''} ${article.category || ''}`.toLowerCase();
      return specificTopic.keywords.some(kw => haystack.includes(kw.toLowerCase()));
    }

    // Match any followed topic
    const haystack = `${article.title} ${article.description} ${article.content || ''} ${article.category || ''}`.toLowerCase();
    return allFollowedKeywords.some(kw => haystack.includes(kw.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500/10 to-purple-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-500/20 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              Personalized Following Feed
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {followedTopics.length} followed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            A curated stream of stories strictly tuned to the topics, industries, and niches you follow.
          </p>
        </div>

        {followedTopics.length < POPULAR_TOPICS.length && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={followAllRecommendedTopics}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-all cursor-pointer border border-indigo-500/20 shadow-2xs self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Follow All Trending</span>
          </motion.button>
        )}
      </div>

      {/* Topic Selection Bar */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Customize Followed Topics
          </span>
          <span className="text-2xs text-zinc-400">
            Click any tag to toggle your subscription
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {POPULAR_TOPICS.map((topic) => {
            const isFollowed = isTopicFollowed(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => toggleFollowTopic(topic.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isFollowed
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <span>{topic.emoji}</span>
                <span>{topic.name}</span>
                {isFollowed ? (
                  <Check className="w-3.5 h-3.5 ml-1 text-emerald-400 dark:text-emerald-600" />
                ) : (
                  <Plus className="w-3.5 h-3.5 ml-1 text-zinc-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feed Filters */}
      {followedTopics.length > 0 && (
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveFilterTopic('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilterTopic === 'all'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            🔥 All Followed ({personalizedArticles.length})
          </button>
          {followedTopicObjs.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveFilterTopic(topic.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilterTopic === topic.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <span>{topic.emoji}</span>
              <span>{topic.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Feed Content */}
      {followedTopics.length === 0 ? (
        <div className="text-center py-20 px-4 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl my-8 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
            Build Your Personalized Topic Feed
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6 font-medium">
            Select the topics you are interested in above to start receiving an algorithmically tailored news stream.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={followAllRecommendedTopics}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <span>Follow All 10 Recommended Topics</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      ) : personalizedArticles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl my-8">
          <Layers className="w-12 h-12 mx-auto mb-3 text-zinc-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            No live stories matching this topic filter right now
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Try choosing another topic or viewing all headlines.
          </p>
          <button
            onClick={() => setActiveFilterTopic('all')}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
          >
            Reset Topic Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personalizedArticles.map((article) => (
            <NewsCard key={article.id} article={article} onShare={onShare} />
          ))}
        </div>
      )}
    </div>
  );
};
