import { AppNotification } from '../types';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'breaking',
    title: '🚨 Breaking News Alert',
    message: 'NIFTY & SENSEX reach landmark high as foreign investment surges in technology and infrastructure sectors.',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false,
    urgency: 'high',
    articleId: 'market-news-1'
  },
  {
    id: 'notif-2',
    type: 'followed_topic',
    title: '🤖 Topic Update: AI & Machine Learning',
    message: 'Next-generation reasoning models showcase breakthroughs in autonomous multi-turn software verification.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: false,
    topicId: 'ai-machine-learning'
  },
  {
    id: 'notif-3',
    type: 'daily_digest',
    title: '☀️ Daily Morning Digest',
    message: 'Catch up on 5 key stories: Global AI safety accords, ISRO mission updates, renewable grid storage, and market rallies.',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    read: true
  },
  {
    id: 'notif-4',
    type: 'weather_alert',
    title: '🌤️ Weather Forecast Advisory',
    message: 'Pleasant weather and moderate air quality forecasted across major metropolitan corridors this week.',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    read: true
  }
];
