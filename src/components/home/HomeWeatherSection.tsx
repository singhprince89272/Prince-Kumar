import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Sun, 
  MapPin, 
  Thermometer, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  Search,
  ArrowRight,
  Radio,
  Sparkles,
  Navigation,
  RefreshCw,
  Layers
} from 'lucide-react';
import { WeatherData, WeatherForecastDay } from '../../types';
import { fetchLiveWeather, POPULAR_WEATHER_CITIES } from '../../services/weatherApi';
import { WeatherIconRenderer } from '../beyond-news/WeatherCard';
import { useNews } from '../../context/NewsContext';

export const HomeWeatherSection: React.FC = () => {
  const { navigateToWeather, showToast } = useNews();
  const [selectedCity, setSelectedCity] = useState<string>('Bhopal');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const loadCityWeather = async (cityName: string, lat?: number, lon?: number) => {
    try {
      if (!weather) setLoading(true);
      else setRefreshing(true);

      const data = await fetchLiveWeather(cityName, lat, lon);
      setWeather(data);
      setSelectedCity(data.city);
    } catch (e) {
      console.error('Weather error:', e);
      showToast('Could not load weather for selected city', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCityWeather(selectedCity);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      loadCityWeather(searchQuery.trim());
      setSearchQuery('');
      setIsSearching(false);
    }
  };

  const handleGPSDetect = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }
    setRefreshing(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadCityWeather('Current Location', pos.coords.latitude, pos.coords.longitude);
        showToast('Detected local weather coordinates!', 'success');
      },
      () => {
        showToast('Could not fetch GPS location', 'error');
        setRefreshing(false);
      }
    );
  };

  const popularCities = ['Bhopal', 'Indore', 'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'London', 'New York', 'Tokyo'];

  return (
    <section id="home-weather-section" className="w-full my-10 py-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Atmospheric & Forecast Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <span>🌤️ Hyperlocal Weather & Climate Radar</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Live temperatures, 5-day forecasts, air quality index, hourly barometrics, and extreme climate tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleGPSDetect}
            disabled={refreshing}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
            title="Auto GPS Location"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden sm:inline">Use GPS</span>
          </button>

          <button
            onClick={navigateToWeather}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black shadow-md shadow-sky-600/20 transition-all cursor-pointer"
          >
            <span>Explore Full Weather Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick City Switcher & Search Strip */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-black uppercase text-zinc-400 shrink-0 mr-1 ml-2">
            Locations:
          </span>
          {popularCities.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
            return (
              <button
                key={city}
                onClick={() => loadCityWeather(city)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200/60 dark:border-zinc-700/60'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>

        {/* Inline Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any global city..."
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-1.5 pl-8 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-sky-500"
          />
        </form>
      </div>

      {/* Weather Content Bento Display */}
      {loading && !weather ? (
        <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80">
          <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mx-auto mb-2" />
          <p className="text-xs font-bold text-zinc-500">Connecting to atmospheric radar...</p>
        </div>
      ) : weather ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Weather Hero Card (7 Cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Background Atmosphere Blur */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sky-200 text-xs font-black uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-sky-300" />
                  <span>{weather.city}, {weather.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20">
                    Live Broadcast
                  </span>
                  <button
                    onClick={() => loadCityWeather(selectedCity)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Refresh Live Weather"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-3">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl sm:text-6xl font-black font-display tracking-tight">
                      {weather.temperature}°C
                    </span>
                    <span className="text-sm font-bold text-sky-200">
                      Feels like {weather.feelsLike}°C
                    </span>
                  </div>
                  <div className="text-lg font-bold text-sky-100 mt-1 flex items-center space-x-2">
                    <WeatherIconRenderer iconName={weather.icon} className="w-6 h-6 inline-block" />
                    <span>{weather.condition}</span>
                  </div>
                </div>

                {/* Min / Max & Sunrise info */}
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-xs space-y-1 text-sky-100">
                  <div className="flex items-center justify-between space-x-4">
                    <span>High / Low:</span>
                    <strong className="text-white">{weather.highTemp}°C / {weather.lowTemp}°C</strong>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <span>Sunrise / Sunset:</span>
                    <strong className="text-white">{weather.sunrise} / {weather.sunset}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="relative z-10 grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <Wind className="w-4 h-4 text-sky-200 mx-auto mb-1" />
                <div className="text-[10px] text-sky-200 uppercase font-black">Wind Speed</div>
                <div className="text-sm font-black text-white">{weather.windSpeed} km/h</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <Droplets className="w-4 h-4 text-sky-200 mx-auto mb-1" />
                <div className="text-[10px] text-sky-200 uppercase font-black">Humidity</div>
                <div className="text-sm font-black text-white">{weather.humidity}%</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <Sun className="w-4 h-4 text-amber-300 mx-auto mb-1" />
                <div className="text-[10px] text-sky-200 uppercase font-black">UV Index</div>
                <div className="text-sm font-black text-white">{weather.uvIndex} (Moderate)</div>
              </div>
            </div>
          </div>

          {/* Air Quality & 5-Day Outlook (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Air Quality Index Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Air Quality Index (AQI)
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {weather.aqiStatus}
                </span>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                  {weather.aqi}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {weather.aqiDescription || 'Air quality is satisfactory and poses little to no risk.'}
                </span>
              </div>
            </div>

            {/* 5-Day Forecast mini-strip */}
            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  5-Day Climate Outlook
                </h4>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 cursor-pointer" onClick={navigateToWeather}>
                  Full Radar ➔
                </span>
              </div>

              <div className="space-y-2">
                {weather.forecast.slice(0, 4).map((day: WeatherForecastDay, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs"
                  >
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 w-16">
                      {day.day}
                    </span>
                    <div className="flex items-center space-x-2 flex-1 px-2">
                      <WeatherIconRenderer iconName={day.icon} className="w-4 h-4" />
                      <span className="text-zinc-500 text-[11px] line-clamp-1">{day.condition}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-bold shrink-0">
                      <span className="text-zinc-900 dark:text-zinc-100">{day.tempMax}°</span>
                      <span className="text-zinc-400 font-normal">{day.tempMin}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
