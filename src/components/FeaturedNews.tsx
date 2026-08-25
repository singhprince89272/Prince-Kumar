import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, BookOpen, Bookmark, BookmarkCheck, ArrowRight, TrendingUp, Flame } from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';
import { getCategoryBadgeStyle, formatTimeAgo } from './NewsCard';
import { CATEGORY_PLACEHOLDERS } from '../data/fallbackNews';

interface FeaturedNewsProps {
  articles: Article[];
  onShare?: (article: Article) => void;
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ articles, onShare }) => {
  const { openArticle, toggleBookmark, isBookmarked } = useNews();
  const [heroImageError, setHeroImageError] = useState(false);

  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  const isMainBookmarked = isBookmarked(mainArticle.id);
  const heroFallback = CATEGORY_PLACEHOLDERS[mainArticle.category?.toLowerCase() || 'general'] || CATEGORY_PLACEHOLDERS.general;
  const heroImage = heroImageError || !mainArticle.urlToImage ? heroFallback : mainArticle.urlToImage;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl shadow-2xs border border-rose-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Featured Dispatch & Headlines
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Article (8 cols on desktop) */}
        <div
          onClick={() => openArticle(mainArticle)}
          className="lg:col-span-8 group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 text-white min-h-[440px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-8 shadow-xl shadow-rose-950/10 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 border border-zinc-800/80 hover:border-rose-500/40"
        >
          {/* Background Image & Gradient with Zoom */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={heroImage}
              alt={mainArticle.title}
              onError={() => setHeroImageError(true)}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-black/30" />
          </div>

          {/* Top badges */}
          <div className="relative z-10 flex items-center justify-between w-full mb-auto pb-6">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-black px-3 py-1 rounded-full backdrop-blur-md border ${getCategoryBadgeStyle(mainArticle.category)} uppercase tracking-wider`}>
                {mainArticle.category || 'Featured'}
              </span>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-rose-600 text-white uppercase tracking-wider shadow-md shadow-rose-600/40 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Lead Story</span>
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(mainArticle);
              }}
              className={`p-3 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                isMainBookmarked
                  ? 'bg-rose-600 text-white shadow-rose-600/40'
                  : 'bg-black/50 text-white hover:bg-black/80 hover:scale-105'
              }`}
            >
              {isMainBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </motion.button>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 space-y-3.5 max-w-3xl">
            <div className="flex items-center space-x-3 text-xs text-zinc-300 font-bold">
              <span className="text-white font-extrabold">{mainArticle.source.name}</span>
              <span>•</span>
              <span className="flex items-center text-zinc-300">
                <Clock className="w-3.5 h-3.5 mr-1 text-rose-400" />
                {formatTimeAgo(mainArticle.publishedAt)}
              </span>
              <span>•</span>
              <span className="flex items-center text-zinc-300">
                <BookOpen className="w-3.5 h-3.5 mr-1 text-rose-400" />
                {mainArticle.readTimeMinutes || 4} min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight group-hover:text-rose-200 transition-colors tracking-tight">
              {mainArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-200 line-clamp-2 leading-relaxed font-normal">
              {mainArticle.description}
            </p>

            <div className="pt-3 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-zinc-300">
                {mainArticle.author ? `By ${mainArticle.author}` : mainArticle.source.name}
              </span>
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-rose-600 backdrop-blur-md text-white text-xs font-bold transition-all shadow-md group-hover:shadow-rose-600/30">
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Headline Sidebar (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center space-x-2 text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Trending Wire</span>
          </div>

          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            {sideArticles.map((article, idx) => {
              const bookmarked = isBookmarked(article.id);
              const fallback = CATEGORY_PLACEHOLDERS[article.category?.toLowerCase() || 'general'] || CATEGORY_PLACEHOLDERS.general;
              const img = article.urlToImage || fallback;

              return (
                <div
                  key={article.id || idx}
                  onClick={() => openArticle(article)}
                  className="group/item flex space-x-3.5 p-3.5 bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-rose-500/40 dark:hover:border-rose-500/40 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-xs text-[10px] font-black text-white border border-white/10">
                      #{idx + 2}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
                        <span className="font-bold truncate max-w-[90px] text-zinc-800 dark:text-zinc-200">{article.source.name}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover/item:text-rose-600 dark:group-hover/item:text-rose-400 line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                      <span className="capitalize font-bold text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">{article.category || 'General'}</span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article);
                        }}
                        className={`p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${
                          bookmarked ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100'
                        }`}
                      >
                        {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

