import { WeatherData, Article } from '../types';

export const CITIES_WEATHER: Record<string, WeatherData> = {
  mumbai: {
    city: 'Mumbai',
    country: 'India',
    temp: 31,
    condition: 'Partly Sunny',
    conditionIcon: '🌤️',
    feelsLike: 36,
    humidity: 78,
    windSpeedKmH: 14,
    uvIndex: 8,
    aqi: 68,
    aqiStatus: 'Moderate',
    hourly: [
      { time: '06:00', temp: 27, icon: '🌅' },
      { time: '09:00', temp: 29, icon: '🌤️' },
      { time: '12:00', temp: 32, icon: '☀️' },
      { time: '15:00', temp: 31, icon: '🌤️' },
      { time: '18:00', temp: 29, icon: '🌇' },
      { time: '21:00', temp: 28, icon: '🌙' },
      { time: '00:00', temp: 27, icon: '✨' }
    ],
    forecast: [
      { day: 'Today', date: 'Aug 25', condition: 'Partly Sunny', conditionIcon: '🌤️', tempHigh: 32, tempLow: 26, precipitationChance: 20 },
      { day: 'Tue', date: 'Aug 26', condition: 'Scattered Showers', conditionIcon: '🌦️', tempHigh: 30, tempLow: 25, precipitationChance: 65 },
      { day: 'Wed', date: 'Aug 27', condition: 'Thunderstorms', conditionIcon: '⛈️', tempHigh: 29, tempLow: 24, precipitationChance: 80 },
      { day: 'Thu', date: 'Aug 28', condition: 'Light Rain', conditionIcon: '🌧️', tempHigh: 30, tempLow: 25, precipitationChance: 45 },
      { day: 'Fri', date: 'Aug 29', condition: 'Mostly Sunny', conditionIcon: '🌤️', tempHigh: 31, tempLow: 26, precipitationChance: 15 }
    ],
    climateNews: []
  },
  delhi: {
    city: 'New Delhi',
    country: 'India',
    temp: 34,
    condition: 'Hazy Sun',
    conditionIcon: '☀️',
    feelsLike: 38,
    humidity: 58,
    windSpeedKmH: 9,
    uvIndex: 9,
    aqi: 142,
    aqiStatus: 'Unhealthy',
    hourly: [
      { time: '06:00', temp: 28, icon: '🌅' },
      { time: '09:00', temp: 31, icon: '☀️' },
      { time: '12:00', temp: 35, icon: '☀️' },
      { time: '15:00', temp: 34, icon: '🌤️' },
      { time: '18:00', temp: 32, icon: '🌇' },
      { time: '21:00', temp: 30, icon: '🌙' },
      { time: '00:00', temp: 29, icon: '✨' }
    ],
    forecast: [
      { day: 'Today', date: 'Aug 25', condition: 'Hazy Sun', conditionIcon: '☀️', tempHigh: 35, tempLow: 28, precipitationChance: 10 },
      { day: 'Tue', date: 'Aug 26', condition: 'Hot & Clear', conditionIcon: '☀️', tempHigh: 36, tempLow: 29, precipitationChance: 10 },
      { day: 'Wed', date: 'Aug 27', condition: 'Isolated Rain', conditionIcon: '🌦️', tempHigh: 33, tempLow: 27, precipitationChance: 40 },
      { day: 'Thu', date: 'Aug 28', condition: 'Cloudy', conditionIcon: '☁️', tempHigh: 32, tempLow: 26, precipitationChance: 25 },
      { day: 'Fri', date: 'Aug 29', condition: 'Sunny', conditionIcon: '☀️', tempHigh: 35, tempLow: 27, precipitationChance: 5 }
    ],
    climateNews: []
  },
  bengaluru: {
    city: 'Bengaluru',
    country: 'India',
    temp: 26,
    condition: 'Pleasant Breeze',
    conditionIcon: '⛅',
    feelsLike: 26,
    humidity: 62,
    windSpeedKmH: 18,
    uvIndex: 6,
    aqi: 42,
    aqiStatus: 'Good',
    hourly: [
      { time: '06:00', temp: 20, icon: '🌅' },
      { time: '09:00', temp: 23, icon: '⛅' },
      { time: '12:00', temp: 27, icon: '⛅' },
      { time: '15:00', temp: 26, icon: '🌦️' },
      { time: '18:00', temp: 23, icon: '🌇' },
      { time: '21:00', temp: 21, icon: '🌙' },
      { time: '00:00', temp: 20, icon: '✨' }
    ],
    forecast: [
      { day: 'Today', date: 'Aug 25', condition: 'Breezy & Mild', conditionIcon: '⛅', tempHigh: 27, tempLow: 20, precipitationChance: 30 },
      { day: 'Tue', date: 'Aug 26', condition: 'Evening Showers', conditionIcon: '🌦️', tempHigh: 26, tempLow: 19, precipitationChance: 70 },
      { day: 'Wed', date: 'Aug 27', condition: 'Passing Showers', conditionIcon: '🌦️', tempHigh: 25, tempLow: 19, precipitationChance: 55 },
      { day: 'Thu', date: 'Aug 28', condition: 'Partly Cloudy', conditionIcon: '⛅', tempHigh: 27, tempLow: 20, precipitationChance: 20 },
      { day: 'Fri', date: 'Aug 29', condition: 'Sunny Spells', conditionIcon: '🌤️', tempHigh: 28, tempLow: 21, precipitationChance: 15 }
    ],
    climateNews: []
  },
  newyork: {
    city: 'New York',
    country: 'United States',
    temp: 24,
    condition: 'Clear Sky',
    conditionIcon: '☀️',
    feelsLike: 24,
    humidity: 50,
    windSpeedKmH: 12,
    uvIndex: 7,
    aqi: 35,
    aqiStatus: 'Good',
    hourly: [
      { time: '06:00', temp: 18, icon: '🌅' },
      { time: '09:00', temp: 21, icon: '☀️' },
      { time: '12:00', temp: 25, icon: '☀️' },
      { time: '15:00', temp: 24, icon: '🌤️' },
      { time: '18:00', temp: 22, icon: '🌇' },
      { time: '21:00', temp: 19, icon: '🌙' },
      { time: '00:00', temp: 17, icon: '✨' }
    ],
    forecast: [
      { day: 'Today', date: 'Aug 25', condition: 'Clear Sky', conditionIcon: '☀️', tempHigh: 25, tempLow: 17, precipitationChance: 0 },
      { day: 'Tue', date: 'Aug 26', condition: 'Mostly Sunny', conditionIcon: '🌤️', tempHigh: 26, tempLow: 18, precipitationChance: 10 },
      { day: 'Wed', date: 'Aug 27', condition: 'Afternoon Rain', conditionIcon: '🌧️', tempHigh: 23, tempLow: 16, precipitationChance: 60 },
      { day: 'Thu', date: 'Aug 28', condition: 'Cool & Crisp', conditionIcon: '⛅', tempHigh: 22, tempLow: 15, precipitationChance: 15 },
      { day: 'Fri', date: 'Aug 29', condition: 'Sunny', conditionIcon: '☀️', tempHigh: 25, tempLow: 17, precipitationChance: 5 }
    ],
    climateNews: []
  },
  london: {
    city: 'London',
    country: 'United Kingdom',
    temp: 19,
    condition: 'Overcast & Drizzle',
    conditionIcon: '🌧️',
    feelsLike: 18,
    humidity: 75,
    windSpeedKmH: 21,
    uvIndex: 4,
    aqi: 28,
    aqiStatus: 'Good',
    hourly: [
      { time: '06:00', temp: 14, icon: '🌫️' },
      { time: '09:00', temp: 16, icon: '☁️' },
      { time: '12:00', temp: 19, icon: '🌧️' },
      { time: '15:00', temp: 18, icon: '🌧️' },
      { time: '18:00', temp: 17, icon: '🌥️' },
      { time: '21:00', temp: 15, icon: '🌙' },
      { time: '00:00', temp: 13, icon: '✨' }
    ],
    forecast: [
      { day: 'Today', date: 'Aug 25', condition: 'Light Drizzle', conditionIcon: '🌧️', tempHigh: 19, tempLow: 13, precipitationChance: 75 },
      { day: 'Tue', date: 'Aug 26', condition: 'Breezy & Cloudy', conditionIcon: '☁️', tempHigh: 20, tempLow: 14, precipitationChance: 40 },
      { day: 'Wed', date: 'Aug 27', condition: 'Sunny Intervals', conditionIcon: '🌤️', tempHigh: 21, tempLow: 13, precipitationChance: 20 },
      { day: 'Thu', date: 'Aug 28', condition: 'Scattered Showers', conditionIcon: '🌦️', tempHigh: 18, tempLow: 12, precipitationChance: 65 },
      { day: 'Fri', date: 'Aug 29', condition: 'Pleasant Sun', conditionIcon: '🌤️', tempHigh: 22, tempLow: 14, precipitationChance: 10 }
    ],
    climateNews: []
  },
  tokyo: {
    city: 'Tokyo',
    country: 'Japan',
    temp: 28,
    condition: 'Humid & Sunny',
    conditionIcon: '🌤️',
    feelsLike: 31,
    humidity: 70,
    windSpeedKmH: 11,
    uvIndex: 8,
    aqi: 32,
    aqiStatus: 'Good',
    hourly: [
      { time: '06:00', temp: 24, icon: '🌅' },
      { time: '09:00', temp: 26, icon: '🌤️' },
      { time: '12:00', temp: 29, icon: '☀️' },
      { time: '15:00', temp: 28, icon: '🌤️' },
      { time: '18:00', temp: 26, icon: '🌇' },
      { time: '21:00', temp: 25, icon: '🌙' },
      { time: '00:00', temp: 24, icon: '✨' }
    ],
    forecast: [
      { day: 'Today', date: 'Aug 25', condition: 'Warm & Fair', conditionIcon: '🌤️', tempHigh: 29, tempLow: 23, precipitationChance: 20 },
      { day: 'Tue', date: 'Aug 26', condition: 'Typhoon Outer Bands', conditionIcon: '🌧️', tempHigh: 27, tempLow: 22, precipitationChance: 85 },
      { day: 'Wed', date: 'Aug 27', condition: 'Clearing Skies', conditionIcon: '🌤️', tempHigh: 30, tempLow: 24, precipitationChance: 30 },
      { day: 'Thu', date: 'Aug 28', condition: 'Bright Sun', conditionIcon: '☀️', tempHigh: 31, tempLow: 24, precipitationChance: 10 },
      { day: 'Fri', date: 'Aug 29', condition: 'Mostly Sunny', conditionIcon: '🌤️', tempHigh: 29, tempLow: 23, precipitationChance: 15 }
    ],
    climateNews: []
  }
};

export const WEATHER_CLIMATE_NEWS: Article[] = [
  {
    id: 'weather-news-1',
    title: 'Monsoon Patterns and Renewable Energy: India Deploys Advanced Doppler Radar Network',
    description: 'Meteorological department deploys AI-assisted forecasting and 15 new high-resolution radars to optimize agricultural yields and solar-wind grid routing.',
    content: 'The Indian Meteorological Department (IMD) in coordination with climate tech researchers has inaugurated a next-generation radar network capable of predictive precipitation modeling down to 2km grid accuracy.',
    url: 'https://news.google.com/search?q=India+Monsoon+Doppler+Radar',
    urlToImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1000&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    source: { id: 'the-hindu', name: 'The Hindu' },
    author: 'Kavita Menon',
    category: 'science',
    readTimeMinutes: 4,
    keyPoints: [
      'New radar mesh enhances cyclone and thunderstorm early warning windows by 36 hours',
      'Solar grid controllers utilize predictive cloud-cover feeds to balance power storage',
      'Farmer advisory apps receive hyperlocal multilingual weather advisories'
    ]
  },
  {
    id: 'weather-news-2',
    title: 'Global Climate Summits Target Urban Heat Island Mitigation with Reflective Infrastructure',
    description: 'Megacities from Tokyo to New York mandate cool roofs, green corridors, and permeable pavements as average summer indices test infrastructure resilience.',
    content: 'Urban planners are turning to passive cooling techniques and smart canopy expansions to reduce metropolitan surface temperatures by up to 3.5 degrees Celsius during peak summer periods.',
    url: 'https://news.google.com/search?q=Urban+Heat+Island+Cool+Roofs',
    urlToImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    source: { id: 'nature-climate', name: 'Nature Climate' },
    author: 'Liam Vance',
    category: 'science',
    readTimeMinutes: 5,
    keyPoints: [
      'Reflective rooftop coatings deflect 85% of solar radiation back into atmosphere',
      'Urban green corridors significantly enhance biodiversity and natural airflow',
      'Municipal programs offer property tax credits for eco-friendly building retrofits'
    ]
  }
];
