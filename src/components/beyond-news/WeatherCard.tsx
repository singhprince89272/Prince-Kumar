import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CloudSun, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudSnow, 
  Droplets, 
  Wind, 
  Thermometer, 
  MapPin, 
  RefreshCw, 
  Search, 
  Navigation, 
  AlertCircle,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { WeatherData, WeatherForecastDay } from '../../types';
import { fetchLiveWeather, POPULAR_WEATHER_CITIES } from '../../services/weatherApi';

// Helper to render matching Lucide icon
export const WeatherIconRenderer: React.FC<{ iconName: string; className?: string }> = ({ iconName, className = 'w-6 h-6' }) => {
  switch (iconName) {
    case 'Sun':
      return <Sun className={`${className} text-amber-500`} />;
    case 'Cloud':
      return <Cloud className={`${className} text-zinc-400`} />;
    case 'CloudRain':
      return <CloudRain className={`${className} text-sky-500`} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={`${className} text-sky-400`} />;
    case 'CloudFog':
      return <CloudFog className={`${className} text-zinc-400`} />;
    case 'CloudLightning':
      return <CloudLightning className={`${className} text-purple-500`} />;
    case 'CloudSnow':
      return <CloudSnow className={`${className} text-indigo-300`} />;
    case 'CloudSun':
    default:
      return <CloudSun className={`${className} text-amber-500`} />;
  }
};

export const WeatherCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [city, setCity] = useState('Bhopal');
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');

  const loadWeather = async (targetCity = city, lat?: number, lon?: number) => {
    try {
      if (!weather) setLoading(true);
      else setRefreshing(true);
      setError(null);

      const data = await fetchLiveWeather(targetCity, lat, lon);
      setWeather(data);
      setCity(data.city);
      setLastUpdatedTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    } catch (err: any) {
      console.error('Weather loading error:', err);
      setError('Weather information unavailable for this location.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      loadWeather(searchInput.trim());
      setSearchInput('');
      setShowSearch(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setRefreshing(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        loadWeather('My Location', latitude, longitude);
      },
      (err) => {
        console.warn('Geolocation permission error:', err);
        setRefreshing(false);
        setError('Location permission denied or unavailable. You can search any city instead.');
      },
      { timeout: 8000 }
    );
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${className}`}
    >
      {/* Card Header & City Controls */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <CloudSun className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Weather Wire
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  Live
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-400">
                Hyperlocal conditions & 5-day forecast
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {/* Geolocation Button */}
            <button
              onClick={handleUseCurrentLocation}
              title="Use current GPS location"
              className="p-2 rounded-xl text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>

            {/* City Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              title="Search city"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => loadWeather(city)}
              disabled={refreshing}
              title="Refresh weather"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-sky-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search City Dropdown Input */}
        {showSearch && (
          <form onSubmit={handleSearchSubmit} className="pt-3 pb-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Type city (e.g. Bhopal, Mumbai, London)..."
                autoFocus
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-9 pr-16 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-sky-500 outline-none"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Go
              </button>
            </div>
            {/* Quick Popular City Chips */}
            <div className="flex items-center space-x-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5">
              {['Bhopal', 'Mumbai', 'New Delhi', 'Bengaluru', 'London', 'Dubai'].map((cName) => (
                <button
                  key={cName}
                  type="button"
                  onClick={() => {
                    setCity(cName);
                    loadWeather(cName);
                    setShowSearch(false);
                  }}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 whitespace-nowrap cursor-pointer transition-colors"
                >
                  {cName}
                </button>
              ))}
            </div>
          </form>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="py-6 space-y-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
              </div>
              <div className="w-14 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-6 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{error}</p>
            <button
              onClick={() => loadWeather('Bhopal')}
              className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              Reset to Bhopal
            </button>
          </div>
        )}

        {/* Live Weather Content */}
        {!loading && !error && weather && (
          <div className="pt-4 space-y-5">
            {/* Main Temperature & Condition Row */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{weather.city}, {weather.country}</span>
                </div>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
                    {weather.temp}°C
                  </span>
                </div>
                <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">
                  {weather.condition}
                </div>
                <div className="text-[11px] font-medium text-zinc-400 mt-0.5">
                  Feels like {weather.feelsLike}°C • Today {weather.forecast[0]?.tempHigh ?? weather.temp + 2}° / {weather.forecast[0]?.tempLow ?? weather.temp - 4}°
                </div>
              </div>

              {/* Large Condition Icon with subtle gradient glow */}
              <div className="p-3.5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-sky-500/10 to-indigo-500/10 border border-sky-500/15 flex items-center justify-center shadow-xs">
                <WeatherIconRenderer iconName={weather.conditionIcon} className="w-10 h-10" />
              </div>
            </div>

            {/* Environmental Metric Pills */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 text-center">
                <div className="flex items-center justify-center space-x-1 text-sky-500 text-[10px] font-bold uppercase">
                  <Droplets className="w-3 h-3" />
                  <span>Humidity</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {weather.humidity}%
                </div>
              </div>

              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 text-center">
                <div className="flex items-center justify-center space-x-1 text-teal-500 text-[10px] font-bold uppercase">
                  <Wind className="w-3 h-3" />
                  <span>Wind</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {weather.windSpeedKmH} km/h
                </div>
              </div>

              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 text-center">
                <div className="flex items-center justify-center space-x-1 text-amber-500 text-[10px] font-bold uppercase">
                  <Sun className="w-3 h-3" />
                  <span>UV Index</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {weather.uvIndex} <span className="text-[10px] font-normal text-zinc-400">/ 11</span>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast Grid / Mini List */}
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/70">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>5-Day Forecast</span>
                </span>
                <span>High / Low</span>
              </div>

              <div className="space-y-1.5">
                {weather.forecast.slice(0, 5).map((fDay, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors text-xs"
                  >
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 w-12">
                      {fDay.day}
                    </span>

                    <div className="flex items-center space-x-2 flex-1 px-3">
                      <WeatherIconRenderer iconName={fDay.conditionIcon} className="w-4 h-4" />
                      <span className="text-zinc-500 dark:text-zinc-400 text-[11px] truncate max-w-[120px]">
                        {fDay.condition}
                      </span>
                    </div>

                    <div className="font-bold text-zinc-900 dark:text-zinc-100 text-right space-x-1.5">
                      <span className="text-zinc-900 dark:text-zinc-100">{fDay.tempHigh}°</span>
                      <span className="text-zinc-400 font-normal">{fDay.tempLow}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer with Last Updated & External Source Link */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
        <span>Last updated: {lastUpdatedTime || 'Just now'}</span>
        <a
          href={`https://www.accuweather.com/en/search-locations?query=${encodeURIComponent(city)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-sky-600 dark:text-sky-400 hover:underline font-bold"
        >
          <span>AccuWeather Radar</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
