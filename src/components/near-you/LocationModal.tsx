import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  X, 
  Navigation, 
  ChevronRight, 
  Building2, 
  Landmark, 
  Compass, 
  Check, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { 
  CITIES_LOCATION_DATA, 
  INDIAN_STATES_HIERARCHY, 
  searchLocations 
} from '../../data/locationNewsData';
import { CityLocation } from '../../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { 
    userLocation, 
    setUserLocation, 
    requestGPSLocation 
  } = useNews();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateId, setSelectedStateId] = useState<string>('madhya-pradesh');
  const [isLocating, setIsLocating] = useState(false);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchLocations(searchQuery);
  }, [searchQuery]);

  const handleSelectCity = (city: CityLocation) => {
    setUserLocation(city);
    onClose();
  };

  const handleGPSClick = async () => {
    setIsLocating(true);
    await requestGPSLocation();
    setIsLocating(false);
    onClose();
  };

  // Popular quick select cities
  const popularCities: CityLocation[] = [
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

  const activeState = INDIAN_STATES_HIERARCHY.find(s => s.id === selectedStateId) || INDIAN_STATES_HIERARCHY[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Hyperlocal Intelligence</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 font-display">
                  Select Your City & District
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Currently tuned to <strong className="text-zinc-800 dark:text-zinc-200">{userLocation.name}</strong>, {userLocation.state}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auto GPS Detection Banner & Search Field */}
            <div className="p-6 py-4 bg-zinc-50/70 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city, district or state (e.g., Siwan, Bhopal, Pune, Indore)..."
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all shadow-xs"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* GPS Auto-Detect Button */}
                <button
                  onClick={handleGPSClick}
                  disabled={isLocating}
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" />
                      <span>Use My GPS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Select Chips */}
              {!searchQuery && (
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 shrink-0 mr-1">
                    Quick Pick:
                  </span>
                  {popularCities.slice(0, 8).map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCity(city)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        userLocation.id === city.id
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/60'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Body - Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Search Results Display */}
              {searchQuery ? (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">
                    Matching Locations ({searchResults.length})
                  </h3>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-10 px-4">
                      <MapPin className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                        No locations matching "{searchQuery}"
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Try searching for popular hubs like Bhopal, Siwan, Indore, Patna, Mumbai, Pune, or Delhi.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResults.map((city) => {
                        const isSelected = userLocation.id === city.id;
                        return (
                          <div
                            key={city.id}
                            onClick={() => handleSelectCity(city)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                              isSelected
                                ? 'bg-rose-50/60 dark:bg-rose-950/40 border-rose-500/80 ring-2 ring-rose-500/20'
                                : 'bg-white dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-rose-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                                <MapPin className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    {city.name}
                                  </span>
                                  {city.hindiName && (
                                    <span className="text-xs text-zinc-400 font-medium">
                                      ({city.hindiName})
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                  {city.district} District • {city.state}
                                </p>
                              </div>
                            </div>

                            {isSelected ? (
                              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-transform group-hover:translate-x-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* State & District Hierarchy Explorer */
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                      Browse by State & District Hierarchy
                    </h3>
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>State ➔ District ➔ City</span>
                    </span>
                  </div>

                  {/* State selector tabs */}
                  <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
                    {INDIAN_STATES_HIERARCHY.map((state) => {
                      const isActive = selectedStateId === state.id;
                      return (
                        <button
                          key={state.id}
                          onClick={() => setSelectedStateId(state.id)}
                          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                              : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                          }`}
                        >
                          <Landmark className="w-3.5 h-3.5" />
                          <span>{state.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700/20 dark:bg-zinc-300/20 font-black">
                            {state.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active State's Districts & Cities Cards */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-rose-500" />
                          <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                            {activeState.name} Districts ({activeState.districts.length})
                          </h4>
                        </div>
                        <span className="text-xs text-zinc-500 font-medium">
                          Capital: <strong>{activeState.capital}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {activeState.districts.map((dist) => {
                          // Check if we have dedicated city data for any city in this district
                          const matchedCity = Object.values(CITIES_LOCATION_DATA).find(
                            c => c.district.toLowerCase() === dist.name.toLowerCase() ||
                                 dist.cities.some(cityName => cityName.toLowerCase() === c.name.toLowerCase())
                          );

                          const isCurrentLoc = matchedCity && userLocation.id === matchedCity.id;

                          return (
                            <div
                              key={dist.id}
                              onClick={() => {
                                if (matchedCity) {
                                  handleSelectCity(matchedCity);
                                }
                              }}
                              className={`p-3 rounded-xl border transition-all ${
                                matchedCity
                                  ? 'cursor-pointer hover:border-rose-500 hover:shadow-xs'
                                  : 'opacity-70 cursor-default'
                              } ${
                                isCurrentLoc
                                  ? 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300'
                                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                  {dist.name} District
                                </span>
                                {matchedCity && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live Local News Available" />
                                )}
                              </div>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                {dist.cities.join(', ')}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Hyperlocal editions available across India</span>
              </span>

              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
