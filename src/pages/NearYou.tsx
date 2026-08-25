import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Building2, 
  Landmark, 
  Globe, 
  Sparkles, 
  Clock, 
  Share2, 
  Bookmark, 
  Filter, 
  ChevronRight, 
  ChevronDown,
  Layers, 
  Thermometer, 
  Wind, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Radio,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { LocationModal } from '../components/near-you/LocationModal';
import { 
  CITIES_LOCATION_DATA, 
  INDIAN_STATES_HIERARCHY, 
  searchLocations 
} from '../data/locationNewsData';
import { Article, CityLocation } from '../types';

export const NearYou: React.FC = () => {
  const { 
    userLocation, 
    setUserLocation, 
    requestGPSLocation, 
    openArticle, 
    toggleBookmark, 
    isBookmarked,
    navigateToHome,
    showToast 
  } = useNews();

  const [activeTier, setActiveTier] = useState<'city' | 'district' | 'state' | 'national'>('city');
  const [selectedSubTopic, setSelectedSubTopic] = useState<'all' | 'infrastructure' | 'civic' | 'health' | 'education'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showHierarchyDrawer, setShowHierarchyDrawer] = useState(false);
  const [selectedStateHierarchy, setSelectedStateHierarchy] = useState<string>(userLocation.state.toLowerCase().replace(/\s+/g, '-'));

  const handleGPSClick = async () => {
    setIsLocating(true);
    await requestGPSLocation();
    setIsLocating(false);
  };

  const handleShare = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url || window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(article.url || window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  // Search results for inline location lookup
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchLocations(searchQuery);
  }, [searchQuery]);

  // Filter articles based on active tier and topic
  const currentArticles = useMemo(() => {
    let list: Article[] = [];
    if (activeTier === 'city') {
      list = userLocation.cityArticles || [];
    } else if (activeTier === 'district') {
      list = userLocation.districtArticles.length > 0 ? userLocation.districtArticles : userLocation.cityArticles;
    } else if (activeTier === 'state') {
      list = userLocation.stateArticles.length > 0 ? userLocation.stateArticles : userLocation.cityArticles;
    } else {
      list = userLocation.nationalArticles.length > 0 ? userLocation.nationalArticles : userLocation.cityArticles;
    }

    if (selectedSubTopic === 'all') return list;

    return list.filter(art => {
      const text = `${art.title} ${art.description} ${art.content || ''}`.toLowerCase();
      if (selectedSubTopic === 'infrastructure') {
        return text.includes('metro') || text.includes('road') || text.includes('bridge') || text.includes('corridor') || text.includes('train') || text.includes('airport') || text.includes('highway');
      }
      if (selectedSubTopic === 'civic') {
        return text.includes('corporation') || text.includes('collector') || text.includes('administration') || text.includes('portal') || text.includes('clean') || text.includes('smart') || text.includes('water');
      }
      if (selectedSubTopic === 'health') {
        return text.includes('hospital') || text.includes('health') || text.includes('aiims') || text.includes('care') || text.includes('medical') || text.includes('clinic');
      }
      if (selectedSubTopic === 'education') {
        return text.includes('school') || text.includes('startup') || text.includes('job') || text.includes('college') || text.includes('tech') || text.includes('skill');
      }
      return true;
    });
  }, [activeTier, userLocation, selectedSubTopic]);

  // Popular quick select cities
  const popularCities = [
    CITIES_LOCATION_DATA.bhopal,
    CITIES_LOCATION_DATA.indore,
    CITIES_LOCATION_DATA.ujjain,
    CITIES_LOCATION_DATA.jabalpur,
    CITIES_LOCATION_DATA.siwan,
    CITIES_LOCATION_DATA.patna,
    CITIES_LOCATION_DATA.gaya,
    CITIES_LOCATION_DATA.mumbai,
    CITIES_LOCATION_DATA.pune,
    CITIES_LOCATION_DATA.nagpur,
    CITIES_LOCATION_DATA.delhi,
    CITIES_LOCATION_DATA.bengaluru,
    CITIES_LOCATION_DATA.lucknow,
    CITIES_LOCATION_DATA.jaipur,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 overflow-x-auto no-scrollbar">
        <button
          onClick={navigateToHome}
          className="flex items-center space-x-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer shrink-0"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-zinc-400">India</span>
        <span>/</span>
        <span className="text-zinc-400">{userLocation.state}</span>
        <span>/</span>
        <span className="text-zinc-400">{userLocation.district} District</span>
        <span>/</span>
        <span className="font-bold text-rose-600 dark:text-rose-400 shrink-0">
          📍 {userLocation.name} Local
        </span>
      </nav>

      {/* 2. Page Header & Location Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 text-white p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden border border-zinc-800">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              <span>Hyperlocal News Desk</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white">
                📍 {userLocation.name}
              </h1>
              {userLocation.hindiName && (
                <span className="text-2xl sm:text-3xl font-bold text-zinc-400">
                  ({userLocation.hindiName})
                </span>
              )}
              <span className="px-3 py-1 rounded-xl bg-zinc-800 text-xs font-bold text-zinc-300 border border-zinc-700">
                {userLocation.stateCode} • {userLocation.district} Dist
              </span>
            </div>

            <p className="text-sm sm:text-base text-zinc-300">
              {userLocation.tagline || 'Essential local news, governance updates, civic issues, and cultural happenings.'}
            </p>

            {/* Weather & Live stats bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-zinc-200">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span className="font-bold">{userLocation.currentTemp || '30°C'}</span>
                <span className="text-zinc-400">({userLocation.weatherCondition || 'Clear'})</span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-zinc-200">
                <Wind className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">Air Quality: {userLocation.aqi || 85}</span>
                <span className="text-emerald-400">({userLocation.aqiStatus || 'Good'})</span>
              </div>

              {userLocation.population && (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-zinc-400">
                  <span>Pop: {userLocation.population}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Change Location</span>
            </button>

            <button
              onClick={handleGPSClick}
              disabled={isLocating}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 font-bold text-xs border border-zinc-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <Navigation className="w-3.5 h-3.5 text-rose-400" />
              <span>{isLocating ? 'Detecting GPS...' : 'Auto GPS Detect'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search & Quick City Filter Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Instant Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Indian city, district or state..."
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            />
          </div>

          {/* Toggle State/District Hierarchy Explorer */}
          <button
            onClick={() => setShowHierarchyDrawer(!showHierarchyDrawer)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-black transition-all cursor-pointer shrink-0"
          >
            <Building2 className="w-4 h-4 text-rose-500" />
            <span>State & District Tree</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showHierarchyDrawer ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Instant Search Results Dropdown */}
        {searchQuery && (
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-400 mb-2">Matching Locations ({searchResults.length}):</h4>
            {searchResults.length === 0 ? (
              <p className="text-xs text-zinc-500 py-2">No matching city or district found for "{searchQuery}".</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {searchResults.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setUserLocation(city);
                      setSearchQuery('');
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      userLocation.id === city.id
                        ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{city.name}</div>
                    <div className="text-[10px] text-zinc-500">{city.district} • {city.stateCode}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Pick City Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 shrink-0">
            Quick Cities:
          </span>
          {popularCities.map((city) => {
            const isSelected = userLocation.id === city.id;
            return (
              <button
                key={city.id}
                onClick={() => setUserLocation(city)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/60'
                }`}
              >
                {city.name}
                <span className="text-[10px] ml-1 opacity-75 font-normal">({city.stateCode})</span>
              </button>
            );
          })}
        </div>

        {/* Expandable Hierarchy Browser */}
        <AnimatePresence>
          {showHierarchyDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4"
            >
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
                {INDIAN_STATES_HIERARCHY.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStateHierarchy(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedStateHierarchy === st.id
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                    }`}
                  >
                    {st.name} ({st.code})
                  </button>
                ))}
              </div>

              {/* Districts of selected state */}
              {(() => {
                const curState = INDIAN_STATES_HIERARCHY.find(s => s.id === selectedStateHierarchy) || INDIAN_STATES_HIERARCHY[0];
                return (
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60">
                    <div className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-3">
                      {curState.name} Districts & Hubs ({curState.districts.length} Districts)
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {curState.districts.map((dist) => {
                        const matchedCity = Object.values(CITIES_LOCATION_DATA).find(
                          c => c.district.toLowerCase() === dist.name.toLowerCase() ||
                               dist.cities.some(name => name.toLowerCase() === c.name.toLowerCase())
                        );

                        return (
                          <div
                            key={dist.id}
                            onClick={() => {
                              if (matchedCity) {
                                setUserLocation(matchedCity);
                                setShowHierarchyDrawer(false);
                              }
                            }}
                            className={`p-3 rounded-xl border transition-all ${
                              matchedCity
                                ? 'bg-white dark:bg-zinc-800 hover:border-rose-500 cursor-pointer shadow-2xs'
                                : 'bg-zinc-100/50 dark:bg-zinc-900/40 opacity-70 border-zinc-200 dark:border-zinc-800 cursor-default'
                            }`}
                          >
                            <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                              {dist.name} District
                            </div>
                            <div className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">
                              {dist.cities.join(', ')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Tier Tabs (Country ➔ State ➔ District ➔ City) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        {/* Tier Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            {
              id: 'city',
              label: `📍 ${userLocation.name} City`,
              icon: MapPin,
              count: userLocation.cityArticles?.length || 0
            },
            {
              id: 'district',
              label: `🏛️ ${userLocation.district} District`,
              icon: Building2,
              count: userLocation.districtArticles?.length || 0
            },
            {
              id: 'state',
              label: `🗺️ ${userLocation.state} State`,
              icon: Landmark,
              count: userLocation.stateArticles?.length || 0
            },
            {
              id: 'national',
              label: `🇮🇳 National (India)`,
              icon: Globe,
              count: userLocation.nationalArticles?.length || 0
            }
          ].map((tier) => {
            const Icon = tier.icon;
            const isActive = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tier.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Topic Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'infrastructure', label: 'Metro & Roads' },
            { id: 'civic', label: 'Civic & Admin' },
            { id: 'health', label: 'Health' },
            { id: 'education', label: 'Tech & Jobs' }
          ].map((sub) => {
            const isActive = selectedSubTopic === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubTopic(sub.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Civic Alerts Banner */}
      {userLocation.civicAlerts && userLocation.civicAlerts.length > 0 && activeTier === 'city' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userLocation.civicAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3.5"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    {alert.badge}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{alert.time}</span>
                </div>
                <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                  {alert.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Articles Grid */}
      {currentArticles.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <MapPin className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
            No articles found for this topic filter
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Try switching to "All Topics" or selecting a different tier above.
          </p>
          <button
            onClick={() => setSelectedSubTopic('all')}
            className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Reset Topic Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => (
            <motion.article
              key={article.id}
              onClick={() => openArticle(article)}
              whileHover={{ y: -4 }}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <img
                    src={article.urlToImage || 'https://images.unsplash.com/photo-1590496793907-4589d81d227f?auto=format&fit=crop&w=800&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-zinc-950/80 backdrop-blur-md text-white border border-white/20">
                      {article.locationTier === 'city' ? userLocation.name : article.locationTier === 'district' ? `${userLocation.district} Dist` : article.locationTier === 'state' ? userLocation.state : 'National'}
                    </span>
                    {article.isBreaking && (
                      <span className="px-2 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-red-600 text-white animate-pulse">
                        Breaking
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{article.source.name}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTimeMinutes || 4} min read</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Bullet Key Points */}
                  {article.keyPoints && article.keyPoints.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
                      {article.keyPoints.slice(0, 2).map((pt, i) => (
                        <div key={i} className="flex items-start space-x-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <span className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 mt-2">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Coverage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>

                <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleBookmark(article)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isBookmarked(article.id)
                        ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                        : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                    }`}
                    title="Bookmark article"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleShare(article, e)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Share article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
};
