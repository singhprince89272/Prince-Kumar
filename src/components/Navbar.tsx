import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  TrendingUp, 
  Flame, 
  Compass, 
  Globe,
  Radio,
  Share2,
  Sparkles,
  BarChart3,
  CloudSun,
  Clock,
  Scale,
  Layers,
  MapPin
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { CATEGORIES } from './CategoryNav';
import { NewsCategory } from '../types';
import { UserMenu } from './auth/UserMenu';
import { NotificationsCenter } from './NotificationsCenter';
import { useAuth } from '../context/AuthContext';
import { useActivity } from '../context/ActivityContext';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    bookmarks, 
    navigateToHome, 
    navigateToBookmarks, 
    navigateToCategory, 
    navigateToSearch,
    navigateToFollowing,
    navigateToDashboard,
    navigateToMarkets,
    navigateToWeather,
    navigateToTimeline,
    navigateToSources,
    navigateToBeyondNews,
    navigateToNearYou,
    userLocation,
    activeCategory,
    view
  } = useNews();
  const { 
    preferences, 
    stats, 
    setIsCuriosityModalOpen, 
    setIsActivityModalOpen 
  } = useActivity();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigateToSearch(quickSearch.trim());
      setQuickSearch('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (cat: NewsCategory) => {
    navigateToCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-zinc-950/85 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo with Live Red Pulse Emblem */}
          <div className="flex items-center space-x-5">
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-3 group cursor-pointer focus:outline-none text-left"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 group-hover:shadow-rose-500/35 transition-all duration-300">
                  <Newspaper className="w-5 h-5" />
                </div>
                {/* Live glowing beacon */}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 border-2 border-white dark:border-zinc-900" />
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                    News<span className="text-rose-600 dark:text-rose-500">Hub</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    Live
                  </span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest -mt-0.5">
                  Global Wire & Dispatch
                </span>
              </div>
            </button>

            {/* Desktop Quick Nav Links */}
            <nav className="hidden xl:flex items-center space-x-1 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              <button
                onClick={navigateToHome}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  view === 'home'
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                Top Stories
              </button>
              <button
                onClick={navigateToFollowing}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  view === 'following'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Following</span>
              </button>
              <button
                onClick={navigateToDashboard}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  view === 'dashboard'
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={navigateToMarkets}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  view === 'markets'
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Finance & Stocks</span>
              </button>
              <button
                onClick={navigateToWeather}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  view === 'weather'
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <CloudSun className="w-3.5 h-3.5 text-sky-500" />
                <span>Weather</span>
              </button>
              <button
                onClick={navigateToTimeline}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  view === 'timeline'
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-violet-500" />
                <span>Timelines</span>
              </button>
              <button
                onClick={navigateToSources}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  view === 'sources'
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-amber-500" />
                <span>Compare</span>
              </button>
              <button
                onClick={navigateToBeyondNews}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  view === 'beyond-news'
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Beyond News</span>
              </button>
              <button
                onClick={navigateToNearYou}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  view === 'near-you'
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Near You</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-rose-500/15 text-rose-600 dark:text-rose-400 rounded-md font-bold">
                  {userLocation.name}
                </span>
              </button>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Search Input for Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center group">
              <Search className="w-4 h-4 absolute left-3.5 text-zinc-400 group-focus-within:text-rose-500 pointer-events-none transition-colors" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search headlines..."
                className="w-36 lg:w-48 bg-zinc-100/80 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-9.5 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:w-60 focus:border-rose-500 outline-none transition-all duration-300 shadow-2xs"
              />
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications Center with Bell & Unread Counter */}
            <NotificationsCenter />

            {/* Bookmarks Button with Badge Pulse */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={navigateToBookmarks}
              title="Saved Bookmarks"
              className={`relative p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
                view === 'bookmarks'
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs ring-2 ring-white dark:ring-zinc-900">
                  {bookmarks.length > 9 ? '9+' : bookmarks.length}
                </span>
              )}
            </motion.button>

            {/* Dark / Light Mode Switcher */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 sm:p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl transition-all duration-200 shadow-2xs cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </motion.button>

            {/* User Profile & Auth Status Menu */}
            <UserMenu />

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Expanded */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSearchSubmit}
              className="md:hidden pb-3 pt-1"
            >
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Search headlines, topics, companies..."
                  autoFocus
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-rose-500 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 text-zinc-400 hover:text-zinc-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Feature Modules Row */}
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
              Features & Hubs
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { navigateToFollowing(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'following' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Following Feed</span>
              </button>
              <button
                onClick={() => { navigateToDashboard(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'dashboard' ? 'bg-rose-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-rose-400" />
                <span>News Dashboard</span>
              </button>
              <button
                onClick={() => { navigateToMarkets(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'markets' ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Finance & Stocks</span>
              </button>
              <button
                onClick={() => { navigateToWeather(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'weather' ? 'bg-sky-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <CloudSun className="w-4 h-4 text-sky-400" />
                <span>Weather</span>
              </button>
              <button
                onClick={() => { navigateToTimeline(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'timeline' ? 'bg-violet-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <Clock className="w-4 h-4 text-violet-400" />
                <span>Timelines</span>
              </button>
              <button
                onClick={() => { navigateToSources(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'sources' ? 'bg-amber-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Source Compare</span>
              </button>
              <button
                onClick={() => { navigateToBeyondNews(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  view === 'beyond-news' ? 'bg-rose-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Beyond News</span>
              </button>
              <button
                onClick={() => { navigateToNearYou(); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer col-span-2 ${
                  view === 'near-you' ? 'bg-rose-600 text-white' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>📍 News Near You ({userLocation.name}, {userLocation.state})</span>
              </button>
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pt-2 mb-2">
              Browse News Desks
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id && view === 'category';
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`flex items-center space-x-2.5 p-3 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsCuriosityModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Curiosities ({preferences.curiosityTopics.length})</span>
                </button>

                <button
                  onClick={() => {
                    setIsActivityModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Activity ({stats.activeStreakDays}d)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


