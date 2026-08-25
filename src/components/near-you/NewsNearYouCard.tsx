import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Building, 
  Landmark, 
  Globe2, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  Bookmark, 
  Share2, 
  AlertCircle, 
  Wind, 
  Thermometer, 
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { LocationModal } from './LocationModal';
import { CITIES_LOCATION_DATA } from '../../data/locationNewsData';
import { Article } from '../../types';

export const NewsNearYouCard: React.FC = () => {
  const { 
    userLocation, 
    setUserLocation, 
    requestGPSLocation, 
    isLocationPromptDismissed, 
    dismissLocationPrompt,
    openArticle,
    toggleBookmark,
    isBookmarked,
    navigateToNearYou,
    showToast
  } = useNews();

  const [activeTier, setActiveTier] = useState<'city' | 'district' | 'state' | 'national'>('city');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);

  const handleGPSPrompt = async () => {
    setIsLocatingGPS(true);
    await requestGPSLocation();
    setIsLocatingGPS(false);
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

  // Get active tier's articles
  const getTierArticles = (): Article[] => {
    switch (activeTier) {
      case 'city':
        return userLocation.cityArticles || [];
      case 'district':
        return userLocation.districtArticles.length > 0 
          ? userLocation.districtArticles 
          : userLocation.cityArticles;
      case 'state':
        return userLocation.stateArticles.length > 0 
          ? userLocation.stateArticles 
          : userLocation.cityArticles;
      case 'national':
        return userLocation.nationalArticles.length > 0 
          ? userLocation.nationalArticles 
          : userLocation.cityArticles;
      default:
        return userLocation.cityArticles;
    }
  };

  const activeArticles = getTierArticles();
  const leadArticle = activeArticles[0] || userLocation.cityArticles[0];
  const secondaryArticles = activeArticles.slice(1, 3);

  // Popular quick select cities
  const quickCities = [
    CITIES_LOCATION_DATA.bhopal,
    CITIES_LOCATION_DATA.indore,
    CITIES_LOCATION_DATA.ujjain,
    CITIES_LOCATION_DATA.jabalpur,
    CITIES_LOCATION_DATA.siwan,
    CITIES_LOCATION_DATA.patna,
    CITIES_LOCATION_DATA.mumbai,
    CITIES_LOCATION_DATA.pune,
    CITIES_LOCATION_DATA.delhi,
    CITIES_LOCATION_DATA.bengaluru,
  ].filter(Boolean);

  return (
    <section id="news-near-you-card" className="w-full my-8">
      {/* 1. Location Permission / Discovery Bar */}
      <AnimatePresence>
        {!isLocationPromptDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 border border-rose-500/20 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs"
          >
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0 shadow-xs">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                  Allow NewsHub to show news near you?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Get hyperlocal news from your city, district and state automatically.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleGPSPrompt}
                disabled={isLocatingGPS}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{isLocatingGPS ? 'Detecting...' : 'Allow GPS'}</span>
              </button>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="px-3.5 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer"
              >
                Pick City
              </button>
              <button
                onClick={dismissLocationPrompt}
                className="px-2.5 py-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-semibold"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main News Near You Frame */}
      <div className="bg-white dark:bg-zinc-900/90 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-xl overflow-hidden">
        {/* Frame Top Header */}
        <div className="p-6 sm:p-7 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-b from-zinc-50/80 to-transparent dark:from-zinc-900/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                  <span>Hyperlocal Broadcast</span>
                </span>
                <span className="text-xs text-zinc-400 font-bold">•</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                  Country ➔ State ➔ District ➔ City
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
                  📍 News Near You
                </h2>
                <span className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400">
                  {userLocation.name}, {userLocation.state}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Get the latest news from your city, district and state.
              </p>
            </div>

            {/* Location Indicators & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Local weather / AQI pill */}
              <div className="flex items-center space-x-3 px-3.5 py-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/80 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{userLocation.currentTemp || '30°C'}</span>
                </div>
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                  <Wind className="w-3.5 h-3.5" />
                  <span>AQI {userLocation.aqi || 85}</span>
                </div>
              </div>

              {/* Change Location Button */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-black transition-all shadow-xs cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Change Location</span>
              </button>

              {/* View Full Near You Hub Button */}
              <button
                onClick={navigateToNearYou}
                className="flex items-center space-x-1 px-3 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/80 text-xs font-black transition-all cursor-pointer"
              >
                <span>Full Hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Quick City Switcher Row */}
          <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
              Popular Cities:
            </span>
            {quickCities.map((city) => {
              const isSelected = userLocation.id === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setUserLocation(city)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {city.name}
                  <span className="text-[10px] ml-1 opacity-70">({city.stateCode})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Multi-Tiered Tab Switcher (City -> District -> State -> India) */}
        <div className="px-6 sm:px-7 pt-4 bg-zinc-50/50 dark:bg-zinc-950/40 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {[
              {
                id: 'city',
                label: `📰 Local News (${userLocation.name})`,
                shortLabel: `${userLocation.name} City`,
                icon: MapPin,
                count: userLocation.cityArticles?.length || 0
              },
              {
                id: 'district',
                label: `🏛️ ${userLocation.district} District`,
                shortLabel: `${userLocation.district} Dist`,
                icon: Building,
                count: userLocation.districtArticles?.length || 0
              },
              {
                id: 'state',
                label: `🗺️ ${userLocation.state}`,
                shortLabel: userLocation.state,
                icon: Landmark,
                count: userLocation.stateArticles?.length || 0
              },
              {
                id: 'national',
                label: `🇮🇳 India (National Context)`,
                shortLabel: 'India',
                icon: Globe2,
                count: userLocation.nationalArticles?.length || 0
              }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTier === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTier(tab.id as any)}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap mb-3 ${
                    isActive
                      ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-md border border-zinc-200/80 dark:border-zinc-700'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-400'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Active Tier News Grid */}
        <div className="p-6 sm:p-7">
          {/* Civic Alerts Banner if available */}
          {userLocation.civicAlerts && userLocation.civicAlerts.length > 0 && activeTier === 'city' && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {userLocation.civicAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start space-x-3"
                >
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300">
                        {alert.badge}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-medium">{alert.time}</span>
                    </div>
                    <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {alert.title}
                    </h5>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 line-clamp-1">
                      {alert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lead & Secondary Articles Layout */}
          {leadArticle ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Featured Local Story */}
              <div 
                onClick={() => openArticle(leadArticle)}
                className="lg:col-span-7 group cursor-pointer rounded-2xl p-5 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800">
                    <img
                      src={leadArticle.urlToImage || 'https://images.unsplash.com/photo-1590496793907-4589d81d227f?auto=format&fit=crop&w=1200&q=80'}
                      alt={leadArticle.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-md">
                        {activeTier === 'city' ? `Local • ${userLocation.name}` : activeTier === 'district' ? 'District Desk' : activeTier === 'state' ? 'State Capital' : 'National'}
                      </span>
                      {leadArticle.isBreaking && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md animate-pulse">
                          Breaking
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Headline & Description */}
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{leadArticle.source.name}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{leadArticle.readTimeMinutes || 3} min read</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                    {leadArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                    {leadArticle.description}
                  </p>

                  {/* Key points bullets if available */}
                  {leadArticle.keyPoints && leadArticle.keyPoints.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-1.5">
                      {leadArticle.keyPoints.slice(0, 2).map((pt, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-600 dark:text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer bar */}
                <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleBookmark(leadArticle)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isBookmarked(leadArticle.id)
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border-rose-200 dark:border-rose-800'
                          : 'bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-800'
                      }`}
                      title="Bookmark story"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleShare(leadArticle, e)}
                      className="p-2 rounded-xl bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
                      title="Share story"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Local Stories List */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                {secondaryArticles.length > 0 ? (
                  secondaryArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => openArticle(art)}
                      className="group cursor-pointer p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start space-x-3.5">
                        <img
                          src={art.urlToImage || 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80'}
                          alt={art.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 group-hover:scale-103 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 text-[11px] text-zinc-400 mb-1">
                            <span className="font-bold text-zinc-700 dark:text-zinc-300">{art.source.name}</span>
                            <span>•</span>
                            <span>{art.readTimeMinutes || 3} min read</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                            {art.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1">
                          <span>Read</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>

                        <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleBookmark(art)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                          >
                            <Bookmark className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60">
                    <p className="text-xs text-zinc-500">More stories loading for this tier...</p>
                  </div>
                )}

                {/* Explore Full Location Hub CTA Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 text-white flex items-center justify-between shadow-lg shadow-rose-600/20">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black">
                      Explore All {userLocation.name} & {userLocation.state} News
                    </h4>
                    <p className="text-[11px] text-rose-100 mt-0.5">
                      Civic updates, tehsils, court verdicts & local development
                    </p>
                  </div>
                  <button
                    onClick={navigateToNearYou}
                    className="p-2.5 rounded-xl bg-white text-rose-600 hover:bg-rose-50 font-black text-xs shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                No articles found for this tier
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Try switching to Local News or selecting a different city.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </section>
  );
};
