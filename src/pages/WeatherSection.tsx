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
  Navigation,
  RefreshCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { WeatherData, WeatherForecastDay, Article } from '../types';
import { CITIES_WEATHER, WEATHER_CLIMATE_NEWS } from '../data/weatherData';
import { fetchLiveWeather } from '../services/weatherApi';
import { WeatherIconRenderer } from '../components/beyond-news/WeatherCard';
import { useNews } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';

interface WeatherSectionProps {
  onShare: (article: Article) => void;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({ onShare }) => {
  const { showToast } = useNews();
  const [selectedCity, setSelectedCity] = useState<string>('Bhopal');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cityList = ['Bhopal', 'Indore', 'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'London', 'New York', 'Tokyo'];

  const loadWeather = async (cityName: string, lat?: number, lon?: number) => {
    try {
      if (!weather) setLoading(true);
      else setRefreshing(true);

      const data = await fetchLiveWeather(cityName, lat, lon);
      setWeather(data);
      setSelectedCity(data.city);
    } catch (e) {
      console.error('Weather error:', e);
      showToast('Could not fetch weather data', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedCity);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      loadWeather(searchQuery.trim());
      setSearchQuery('');
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
        loadWeather('Current Location', pos.coords.latitude, pos.coords.longitude);
        showToast('Detected local coordinates!', 'success');
      },
      () => {
        showToast('Could not fetch GPS location', 'error');
        setRefreshing(false);
      }
    );
  };

  const getAqiColor = (status: WeatherData['aqiStatus']) => {
    switch (status) {
      case 'Good':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Moderate':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Unhealthy':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Hazardous':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-sky-500/10 to-blue-500/20 text-sky-600 dark:text-sky-400 rounded-2xl border border-sky-500/20 shadow-2xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              Hyperlocal Weather & Climate Radar
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              Live Radar
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Real-time conditions, 24-hour barometrics, 7-day extended forecasts, and environmental reporting.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleGPSDetect}
            disabled={refreshing}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-500" />
            <span>Use GPS</span>
          </button>

          <button
            onClick={() => loadWeather(selectedCity)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* City Switcher & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <span className="text-[11px] font-black uppercase text-zinc-400 shrink-0 mr-1 ml-2">
            Metros:
          </span>
          {cityList.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
            return (
              <button
                key={city}
                onClick={() => loadWeather(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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

        {/* Global search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any world city..."
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-sky-500 shadow-2xs"
          />
        </form>
      </div>

      {/* Main Weather Hero Bento */}
      {loading && !weather ? (
        <div className="p-16 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80">
          <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mx-auto mb-2" />
          <p className="text-xs font-bold text-zinc-500">Loading satellite forecast...</p>
        </div>
      ) : weather ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Conditions Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center space-x-2 text-sky-200 text-xs font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{weather.city}, {weather.country}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black">
                    {weather.condition}
                  </h2>
                </div>
                <div className="flex items-center space-x-3">
                  <WeatherIconRenderer iconName={weather.icon} className="w-14 h-14" />
                </div>
              </div>

              <div className="flex items-baseline space-x-3 my-4">
                <span className="text-6xl sm:text-7xl font-black tracking-tight">
                  {weather.temperature}°C
                </span>
                <span className="text-lg text-sky-200 font-bold">
                  Feels like {weather.feelsLike}°C
                </span>
              </div>

              {/* Environmental metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/20 text-xs">
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3">
                  <span className="text-sky-200 block text-2xs mb-1">Humidity</span>
                  <div className="flex items-center space-x-1.5 font-black text-sm">
                    <Droplets className="w-4 h-4 text-sky-200" />
                    <span>{weather.humidity}%</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3">
                  <span className="text-sky-200 block text-2xs mb-1">Wind Speed</span>
                  <div className="flex items-center space-x-1.5 font-black text-sm">
                    <Wind className="w-4 h-4 text-sky-200" />
                    <span>{weather.windSpeed} km/h</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3">
                  <span className="text-sky-200 block text-2xs mb-1">UV Index</span>
                  <div className="flex items-center space-x-1.5 font-black text-sm">
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span>{weather.uvIndex} (Moderate)</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3">
                  <span className="text-sky-200 block text-2xs mb-1">Air Quality (AQI)</span>
                  <div className="flex items-center space-x-1.5 font-black text-sm">
                    <ShieldAlert className="w-4 h-4 text-sky-200" />
                    <span>{weather.aqi} - {weather.aqiStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 24-Hour Timeline Bar */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-4 h-4 text-sky-500" />
                <h3 className="font-black text-sm text-zinc-900 dark:text-zinc-100">
                  Hourly Predictions
                </h3>
              </div>

              <div className="space-y-3">
                {weather.forecast[0] && (
                  <div className="text-xs text-zinc-500 mb-2 font-medium">
                    Sunrise {weather.sunrise} • Sunset {weather.sunset}
                  </div>
                )}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {['06:00', '12:00', '18:00', '21:00'].map((time, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/50">
                      <span className="text-[10px] text-zinc-400 font-bold block">{time}</span>
                      <CloudSun className="w-5 h-5 text-amber-500 mx-auto my-1" />
                      <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                        {Math.round(weather.temperature + (idx === 1 ? 2 : idx === 3 ? -3 : 0))}°
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 mt-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-sky-700 dark:text-sky-300">
                    <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Barometric Pressure: 1012 hPa (Stable)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Outlook */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                5-Day Extended Weather Outlook
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {weather.forecast.map((day: WeatherForecastDay, idx: number) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs text-center hover:border-sky-500/40 transition-all"
                >
                  <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 block">
                    {day.day}
                  </span>
                  <span className="text-2xs text-zinc-400 block mb-2">
                    {day.date}
                  </span>
                  <div className="flex justify-center my-2">
                    <WeatherIconRenderer iconName={day.icon} className="w-8 h-8" />
                  </div>
                  <span className="text-2xs font-bold text-zinc-600 dark:text-zinc-400 block line-clamp-1">
                    {day.condition}
                  </span>
                  <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs font-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center space-x-2">
                    <span>{day.tempMax}°</span>
                    <span className="text-zinc-400 font-normal">{day.tempMin}°</span>
                  </div>
                  {day.precipitationChance > 0 && (
                    <span className="text-3xs text-sky-500 font-bold block mt-1">
                      🌧️ {day.precipitationChance}% rain
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Climate & Environmental News */}
      <div>
        <div className="flex items-center space-x-2 mb-5">
          <Radio className="w-5 h-5 text-sky-600" />
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            Weather & Climate Wire
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {WEATHER_CLIMATE_NEWS.map((article) => (
            <NewsCard key={article.id} article={article} onShare={onShare} />
          ))}
        </div>
      </div>
    </div>
  );
};
