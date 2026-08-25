import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Briefcase, 
  Cpu, 
  Trophy, 
  Film, 
  HeartPulse, 
  Atom, 
  MapPin,
  Navigation,
  TrendingUp,
  CloudSun,
  LayoutGrid,
  List
} from 'lucide-react';
import { NewsCategory } from '../types';
import { useNews } from '../context/NewsContext';

interface CategoryNavProps {
  showViewToggle?: boolean;
}

export const CATEGORIES: { id: NewsCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'general', label: 'Top Stories', icon: Globe },
  { id: 'india', label: 'India News', icon: MapPin },
  { id: 'near-you', label: '📍 Near You', icon: Navigation },
  { id: 'finance', label: '📈 Finance & Stocks', icon: TrendingUp },
  { id: 'weather', label: '🌤️ Weather', icon: CloudSun },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'technology', label: 'Technology', icon: Cpu },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'entertainment', label: 'Entertainment', icon: Film },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'science', label: 'Science', icon: Atom },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({ showViewToggle = true }) => {
  const { 
    activeCategory, 
    navigateToCategory, 
    navigateToNearYou,
    navigateToMarkets,
    navigateToWeather,
    view,
    viewLayout, 
    setViewLayout, 
    country, 
    setCountry,
    userLocation
  } = useNews();

  const handleCategoryClick = (catId: NewsCategory) => {
    if (catId === 'near-you') {
      navigateToNearYou();
    } else if (catId === 'finance') {
      navigateToMarkets();
    } else if (catId === 'weather') {
      navigateToWeather();
    } else {
      navigateToCategory(catId);
    }
  };

  return (
    <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 sticky top-16 sm:top-18 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Horizontal Category Scroll with Animated Selection Capsule */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = 
              (cat.id === 'near-you' && view === 'near-you') || 
              (cat.id === 'finance' && view === 'markets') ||
              (cat.id === 'weather' && view === 'weather') ||
              (activeCategory === cat.id && view === 'category');

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors duration-200 cursor-pointer min-h-[38px] ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {/* Animated active background pill with layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="category-pill-bg"
                    className="absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 rounded-full shadow-xs shadow-rose-500/25"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                <span className="relative z-10 flex items-center space-x-2">
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`} />
                  <span>
                    {cat.id === 'near-you' ? `📍 Near You (${userLocation.name})` : cat.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* View mode toggle & quick country selector */}
        {showViewToggle && (
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {/* Country quick selector */}
            <div className="flex items-center bg-zinc-200/60 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 p-1 rounded-xl text-xs font-bold shadow-2xs">
              <button
                onClick={() => setCountry('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  country === 'all'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Global
              </button>
              <button
                onClick={() => setCountry('in')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  country === 'in'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                India 🇮🇳
              </button>
              <button
                onClick={() => setCountry('us')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  country === 'us'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                US 🇺🇸
              </button>
            </div>

            {/* Layout switch */}
            <div className="flex items-center bg-zinc-200/60 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 p-1 rounded-xl space-x-0.5 shadow-2xs">
              <button
                onClick={() => setViewLayout('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewLayout === 'grid'
                    ? 'bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('compact')}
                title="Compact List View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewLayout === 'compact'
                    ? 'bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

