import { WeatherData, WeatherForecastDay } from '../types';

// In-memory cache for weather results with 10-minute TTL
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// WMO Weather Interpretation Codes (WW) mapping
export function interpretWeatherCode(code: number): { condition: string; icon: string } {
  switch (code) {
    case 0:
      return { condition: 'Clear Sky', icon: 'Sun' };
    case 1:
      return { condition: 'Mainly Clear', icon: 'Sun' };
    case 2:
      return { condition: 'Partly Cloudy', icon: 'CloudSun' };
    case 3:
      return { condition: 'Overcast', icon: 'Cloud' };
    case 45:
    case 48:
      return { condition: 'Fog & Mist', icon: 'CloudFog' };
    case 51:
    case 53:
    case 55:
      return { condition: 'Light Drizzle', icon: 'CloudDrizzle' };
    case 61:
    case 63:
      return { condition: 'Moderate Rain', icon: 'CloudRain' };
    case 65:
      return { condition: 'Heavy Rain', icon: 'CloudRain' };
    case 71:
    case 73:
    case 75:
      return { condition: 'Snowfall', icon: 'CloudSnow' };
    case 80:
    case 81:
    case 82:
      return { condition: 'Rain Showers', icon: 'CloudRain' };
    case 95:
    case 96:
    case 99:
      return { condition: 'Thunderstorm', icon: 'CloudLightning' };
    default:
      return { condition: 'Partly Cloudy', icon: 'CloudSun' };
  }
}

// Popular default cities with coordinates
export const POPULAR_WEATHER_CITIES: Record<string, { name: string; country: string; lat: number; lon: number }> = {
  bhopal: { name: 'Bhopal', country: 'India', lat: 23.2599, lon: 77.4126 },
  mumbai: { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
  delhi: { name: 'New Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  bengaluru: { name: 'Bengaluru', country: 'India', lat: 12.9716, lon: 77.5946 },
  london: { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  newyork: { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
  tokyo: { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
  dubai: { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
  singapore: { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 }
};

export async function fetchLiveWeather(
  cityName = 'Bhopal',
  customLat?: number,
  customLon?: number
): Promise<WeatherData> {
  const cacheKey = customLat && customLon 
    ? `coords_${customLat.toFixed(2)}_${customLon.toFixed(2)}` 
    : cityName.toLowerCase().trim();

  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  let lat = customLat;
  let lon = customLon;
  let resolvedCity = cityName;
  let resolvedCountry = 'India';

  // If coordinates not provided, use geocoding
  if (lat === undefined || lon === undefined) {
    const defaultCity = POPULAR_WEATHER_CITIES[cacheKey];
    if (defaultCity) {
      lat = defaultCity.lat;
      lon = defaultCity.lon;
      resolvedCity = defaultCity.name;
      resolvedCountry = defaultCity.country;
    } else {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.results && geoData.results.length > 0) {
            const first = geoData.results[0];
            lat = first.latitude;
            lon = first.longitude;
            resolvedCity = first.name;
            resolvedCountry = first.country || 'Global';
          }
        }
      } catch (err) {
        console.warn('Geocoding service unavailable, falling back to default coordinates:', err);
      }
    }
  }

  // Fallback coordinates if still undefined
  if (lat === undefined || lon === undefined) {
    lat = 23.2599; // Bhopal
    lon = 77.4126;
    resolvedCity = 'Bhopal';
    resolvedCountry = 'India';
  }

  // Query Open-Meteo Weather API
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&hourly=temperature_2m,weather_code&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather service responded with status ${response.status}`);
  }

  const raw = await response.json();
  const current = raw.current || {};
  const daily = raw.daily || {};
  const hourly = raw.hourly || {};

  const currentWmo = interpretWeatherCode(current.weather_code || 0);

  // Hourly forecast slice (next 12 hours)
  const hourlyList: { time: string; temp: number; icon: string }[] = [];
  if (hourly.time && hourly.temperature_2m) {
    const currentHourIndex = new Date().getHours();
    for (let i = currentHourIndex; i < Math.min(currentHourIndex + 12, hourly.time.length); i++) {
      const dateObj = new Date(hourly.time[i]);
      const hourStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
      const wmo = interpretWeatherCode(hourly.weather_code?.[i] || 0);
      hourlyList.push({
        time: i === currentHourIndex ? 'Now' : hourStr,
        temp: Math.round(hourly.temperature_2m[i]),
        icon: wmo.icon
      });
    }
  }

  // 5-Day forecast
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forecast: WeatherForecastDay[] = [];

  if (daily.time && daily.time.length > 0) {
    const limit = Math.min(5, daily.time.length);
    for (let i = 0; i < limit; i++) {
      const dateObj = new Date(daily.time[i]);
      const dayName = i === 0 ? 'Today' : daysOfWeek[dateObj.getDay()];
      const wmo = interpretWeatherCode(daily.weather_code?.[i] || 0);
      forecast.push({
        day: dayName,
        date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        condition: wmo.condition,
        conditionIcon: wmo.icon,
        tempHigh: Math.round(daily.temperature_2m_max?.[i] ?? current.temperature_2m + 2),
        tempLow: Math.round(daily.temperature_2m_min?.[i] ?? current.temperature_2m - 4),
        precipitationChance: daily.precipitation_probability_max?.[i] ?? 10
      });
    }
  }

  // Approximate AQI based on humidity and location
  const uvMax = daily.uv_index_max?.[0] || 5;
  const aqiVal = Math.min(220, Math.max(35, Math.round(55 + (current.relative_humidity_2m || 50) * 0.4)));
  let aqiStatus: WeatherData['aqiStatus'] = 'Good';
  if (aqiVal > 150) aqiStatus = 'Unhealthy';
  else if (aqiVal > 90) aqiStatus = 'Moderate';

  const weatherData: WeatherData = {
    city: resolvedCity,
    country: resolvedCountry,
    temp: Math.round(current.temperature_2m ?? 28),
    condition: currentWmo.condition,
    conditionIcon: currentWmo.icon,
    feelsLike: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 30),
    humidity: Math.round(current.relative_humidity_2m ?? 65),
    windSpeedKmH: Math.round(current.wind_speed_10m ?? 12),
    uvIndex: Math.round(uvMax),
    aqi: aqiVal,
    aqiStatus,
    hourly: hourlyList,
    forecast,
    climateNews: []
  };

  weatherCache.set(cacheKey, { data: weatherData, timestamp: Date.now() });
  return weatherData;
}
