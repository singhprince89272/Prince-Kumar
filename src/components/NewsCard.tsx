import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, BookmarkCheck, Clock, Share2, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { Article, ViewLayout } from '../types';
import { useNews } from '../context/NewsContext';
import { useActivity } from '../context/ActivityContext';
import { CATEGORY_PLACEHOLDERS } from '../data/fallbackNews';

interface NewsCardProps {
  article: Article;
  layout?: ViewLayout;
  onShare?: (article: Article) => void;
}

export const getCategoryBadgeStyle = (category?: string) => {
  switch (category?.toLowerCase()) {
    case 'technology':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    case 'business':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    case 'sports':
      return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
    case 'entertainment':
      return 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20';
    case 'health':
      return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
    case 'science':
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    case 'india':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    default:
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
  }
};

export const formatTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(seconds) || seconds < 0) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch (e) {
    return 'Recent';
  }
};

export const NewsCard: React.FC<NewsCardProps> = ({ article, layout = 'grid', onShare }) => {
  const { openArticle, toggleBookmark, isBookmarked } = useNews();
  const { logActivity, getArticleCuriosityMatch, preferences } = useActivity();
  const bookmarked = isBookmarked(article.id);
  const [imageError, setImageError] = useState(false);

  const curiosityMatch = getArticleCuriosityMatch(article);

  const fallbackImage = CATEGORY_PLACEHOLDERS[article.category?.toLowerCase() || 'general'] || CATEGORY_PLACEHOLDERS.general;
  const displayImage = imageError || !article.urlToImage ? fallbackImage : article.urlToImage;

  const handleCardClick = () => {
    logActivity('read_article', article.title, article.category, article.url);
    openArticle(article);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    logActivity('bookmark', article.title, article.category, article.url);
    toggleBookmark(article);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    logActivity('share', article.title, article.category, article.url);
    if (onShare) {
      onShare(article);
    }
  };

  // Compact List Layout
  if (layout === 'compact') {
    return (
      <div
        onClick={handleCardClick}
        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-rose-500/40 dark:hover:border-rose-500/40 rounded-2xl cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 space-y-3 sm:space-y-0"
      >
        <div className="flex items-center space-x-4 flex-1 pr-4">
          <div className="w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 relative bg-zinc-100 dark:bg-zinc-800">
            <img
              src={displayImage}
              alt={article.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeStyle(article.category)} uppercase tracking-wider`}>
                {article.category || 'General'}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-bold">
                {article.source.name}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center">
                <Clock className="w-3 h-3 mr-1 inline" />
                {formatTimeAgo(article.publishedAt)}
              </span>
              {curiosityMatch.isMatch && curiosityMatch.matchedTopics[0] && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{curiosityMatch.matchedTopics[0].emoji} {curiosityMatch.score}% Match</span>
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 transition-colors leading-snug">
              {article.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleBookmarkClick}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              bookmarked
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 shadow-xs'
                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleShareClick}
            title="Share"
            className="p-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 rounded-xl transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  // Standard / Magazine Card Layout with Image Zoom & Rich Hover
  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col h-full bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-500/30 dark:hover:border-rose-500/30 shadow-2xs backdrop-blur-xs"
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative w-full h-52 sm:h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={displayImage}
          alt={article.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-0.5 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Category & Breaking tag */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5 z-10">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-md border shadow-xs ${getCategoryBadgeStyle(article.category)} uppercase tracking-wider`}>
            {article.category || 'General'}
          </span>
          {article.isBreaking && (
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-rose-600 text-white uppercase tracking-wider shadow-sm shadow-rose-600/50 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Breaking</span>
            </span>
          )}
        </div>

        {/* Quick action buttons with spring bounce */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={handleBookmarkClick}
            title={bookmarked ? 'Saved' : 'Save story'}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
              bookmarked
                ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-white/40'
                : 'bg-black/50 text-white hover:bg-black/75 hover:scale-105'
            }`}
          >
            {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={handleShareClick}
            title="Share"
            className="p-2 bg-black/50 hover:bg-black/75 text-white rounded-full backdrop-blur-md shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Read time badge bottom right */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white/95 flex items-center space-x-1 z-10">
          <BookOpen className="w-3 h-3 text-rose-400" />
          <span>{article.readTimeMinutes || 3} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Source and Date */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]">
              {article.source.name}
            </span>
            <span className="flex items-center text-zinc-400 dark:text-zinc-500 shrink-0">
              <Clock className="w-3 h-3 mr-1 text-rose-500/70" />
              {formatTimeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Curiosity Topic Match Pill */}
          {curiosityMatch.isMatch && curiosityMatch.matchedTopics[0] && (
            <div className="flex items-center space-x-1.5 py-0.5">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-black border border-rose-500/20">
                <Sparkles className="w-2.5 h-2.5 text-rose-500" />
                <span>{curiosityMatch.matchedTopics[0].emoji} Matches Your Curiosity ({curiosityMatch.score}%)</span>
              </span>
            </div>
          )}

          {/* Title with News Headline Typography */}
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 transition-colors leading-snug tracking-tight">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Bottom Bar: Read More & Author */}
        <div className="pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate max-w-[160px]">
            {article.author ? `By ${article.author}` : article.source.name}
          </span>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Read Story</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

