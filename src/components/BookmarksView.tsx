import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bookmark, 
  Trash2, 
  Search, 
  Download, 
  Compass, 
  FolderX, 
  SlidersHorizontal,
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';
import { NewsCard } from './NewsCard';

interface BookmarksViewProps {
  onShare: (article: Article) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onShare }) => {
  const { bookmarks, clearBookmarks, navigateToHome, showToast } = useNews();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredBookmarks = bookmarks.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()) ||
      article.source.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCat === 'all' || article.category?.toLowerCase() === selectedCat.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    if (bookmarks.length === 0) return;
    const jsonStr = JSON.stringify(bookmarks, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newshub-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Bookmarks exported to JSON file', 'success');
  };

  const categories = ['all', ...Array.from(new Set(bookmarks.map((b) => b.category?.toLowerCase() || 'general')))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-rose-500/10 to-red-500/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20 shadow-2xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              Saved Articles & Library
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              {bookmarks.length} saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Articles and stories saved locally on your device for offline reference and deep reading.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex items-center space-x-2.5 self-start sm:self-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={clearBookmarks}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer border border-rose-500/20"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar for Bookmarks */}
      {bookmarks.length > 0 && (
        <div className="my-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved articles..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-rose-500 transition-colors shadow-2xs"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-20 px-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl my-8 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-500/10 to-red-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/20 shadow-xs">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
            No Saved Articles Yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6 font-medium">
            Click the bookmark icon on any article across NewsHub to save it here for later reading.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={navigateToHome}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-600/25 transition-all cursor-pointer"
          >
            <span>Explore Top Headlines</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl my-8">
          <FolderX className="w-12 h-12 mx-auto mb-3 text-zinc-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            No matching bookmarks
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Try adjusting your search query or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBookmarks.map((article) => (
            <NewsCard key={article.id} article={article} onShare={onShare} />
          ))}
        </div>
      )}
    </div>
  );
};

