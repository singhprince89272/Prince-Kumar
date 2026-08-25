import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, History, Sparkles, TrendingUp, Filter, SlidersHorizontal } from 'lucide-react';
import { SortByOption } from '../types';
import { useNews } from '../context/NewsContext';
import { useActivity } from '../context/ActivityContext';
import { TRENDING_TAGS } from '../data/fallbackNews';

interface SearchBarProps {
  onSearch?: (query: string, sortBy: SortByOption) => void;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, autoFocus = false }) => {
  const { searchQuery, setSearchQuery, searchHistory, addToSearchHistory, navigateToSearch } = useNews();
  const { logActivity } = useActivity();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [sortBy, setSortBy] = useState<SortByOption>('publishedAt');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalQuery(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = localQuery.trim();
    if (query) {
      logActivity('search_query', `Search: ${query}`, 'general', undefined, { query });
      addToSearchHistory(query);
      if (onSearch) {
        onSearch(query, sortBy);
      } else {
        navigateToSearch(query);
      }
      setIsFocused(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setLocalQuery(tag);
    logActivity('search_query', `Tag: ${tag}`, 'general', undefined, { query: tag });
    addToSearchHistory(tag);
    if (onSearch) {
      onSearch(tag, sortBy);
    } else {
      navigateToSearch(tag);
    }
    setIsFocused(false);
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto my-6 z-20">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className={`absolute left-4.5 transition-colors duration-200 pointer-events-none ${isFocused ? 'text-rose-600 dark:text-rose-500' : 'text-zinc-400'}`}>
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search by keywords, companies, leaders, science, AI..."
          autoFocus={autoFocus}
          className={`w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-2 rounded-2xl py-3.5 pl-12 pr-28 text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none transition-all duration-300 shadow-sm ${
            isFocused
              ? 'border-rose-600 dark:border-rose-500 ring-4 ring-rose-500/15 shadow-lg shadow-rose-500/10'
              : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        />

        <div className="absolute right-3 flex items-center space-x-1.5">
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-rose-600/25 transition-all cursor-pointer"
          >
            Search
          </motion.button>
        </div>
      </form>

      {/* Instant Suggestions & Recent Searches Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4.5 shadow-2xl z-30 space-y-4"
          >
            {/* Trending Suggestions */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                <span>Trending Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onMouseDown={() => handleTagClick(tag)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-600 dark:hover:text-rose-400 transition-all font-bold cursor-pointer hover:scale-105"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {searchHistory.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center space-x-1.5">
                    <History className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Recent Searches</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {searchHistory.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={() => handleTagClick(item)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

