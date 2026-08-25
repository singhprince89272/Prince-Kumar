import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Article, 
  NewsCategory, 
  CountryCode, 
  ActiveView, 
  ViewLayout, 
  ToastMessage,
  AppNotification,
  NotificationType,
  CityLocation
} from '../types';
import { INITIAL_NOTIFICATIONS } from '../data/notificationsData';
import { CITIES_LOCATION_DATA, findNearestCity } from '../data/locationNewsData';

interface NewsContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  view: ActiveView;
  setView: (view: ActiveView) => void;
  activeCategory: NewsCategory;
  setActiveCategory: (cat: NewsCategory) => void;
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  bookmarks: Article[];
  toggleBookmark: (article: Article) => void;
  isBookmarked: (articleId: string) => boolean;
  clearBookmarks: () => void;
  recentlyViewed: Article[];
  addToRecentlyViewed: (article: Article) => void;
  viewLayout: ViewLayout;
  setViewLayout: (layout: ViewLayout) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Followed Topics
  followedTopics: string[];
  toggleFollowTopic: (topicId: string) => void;
  isTopicFollowed: (topicId: string) => boolean;
  followAllRecommendedTopics: () => void;
  
  // Notifications
  notifications: AppNotification[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Location / Near You state
  userLocation: CityLocation;
  setUserLocation: (city: CityLocation) => void;
  setUserCityById: (cityId: string) => void;
  requestGPSLocation: () => Promise<boolean>;
  isLocationPromptDismissed: boolean;
  dismissLocationPrompt: () => void;

  // Navigation helpers
  openArticle: (article: Article) => void;
  navigateToCategory: (category: NewsCategory) => void;
  navigateToSearch: (query: string) => void;
  navigateToHome: () => void;
  navigateToBookmarks: () => void;
  navigateToDashboard: () => void;
  navigateToMarkets: () => void;
  navigateToWeather: () => void;
  navigateToTimeline: () => void;
  navigateToSources: () => void;
  navigateToFollowing: () => void;
  navigateToBeyondNews: () => void;
  navigateToNearYou: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('newshub_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('newshub_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Navigation and routing state
  const [view, setView] = useState<ActiveView>('home');
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('general');
  const [country, setCountry] = useState<CountryCode>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid');

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('newshub_bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('newshub_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  // Followed Topics persistence
  const [followedTopics, setFollowedTopics] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('newshub_followed_topics');
        return saved ? JSON.parse(saved) : ['ai-machine-learning', 'cricket-world-sports', 'stock-market-finance', 'space-astronomy'];
      } catch (e) {
        console.error('Failed to parse followed topics:', e);
      }
    }
    return ['ai-machine-learning', 'cricket-world-sports', 'stock-market-finance', 'space-astronomy'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('newshub_followed_topics', JSON.stringify(followedTopics));
    } catch (e) {
      console.error('Failed to save followed topics:', e);
    }
  }, [followedTopics]);

  const toggleFollowTopic = (topicId: string) => {
    setFollowedTopics(prev => {
      const isFollowing = prev.includes(topicId);
      if (isFollowing) {
        showToast('Unfollowed topic', 'info');
        return prev.filter(id => id !== topicId);
      } else {
        showToast('Topic added to your personalized feed!', 'success');
        return [...prev, topicId];
      }
    });
  };

  const isTopicFollowed = (topicId: string) => followedTopics.includes(topicId);

  const followAllRecommendedTopics = () => {
    setFollowedTopics(['ai-machine-learning', 'cricket-world-sports', 'stock-market-finance', 'semiconductors-chips', 'electric-vehicles-clean-energy', 'space-astronomy', 'india-growth-economy']);
    showToast('Following all trending topics!', 'success');
  };

  // Notifications persistence
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('newshub_notifications');
        return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
      } catch (e) {
        console.error('Failed to parse notifications:', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('newshub_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications:', e);
    }
  }, [notifications]);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notification inbox cleared', 'info');
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Search history persistence
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('newshub_search_history');
        return saved ? JSON.parse(saved) : ['AI Reasoning', 'Space Exploration', 'Clean Energy', 'India Tech'];
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
    return ['AI Reasoning', 'Space Exploration', 'Clean Energy', 'India Tech'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('newshub_search_history', JSON.stringify(searchHistory));
    } catch (e) {
      console.error('Failed to save search history:', e);
    }
  }, [searchHistory]);

  const addToSearchHistory = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setSearchHistory(prev => [trimmed, ...prev.filter(item => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Recently viewed persistence
  const [recentlyViewed, setRecentlyViewed] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('newshub_recently_read');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Failed to parse recently viewed:', e);
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('newshub_recently_read', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error('Failed to save recently viewed:', e);
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = (article: Article) => {
    setRecentlyViewed(prev => [article, ...prev.filter(a => a.id !== article.id)].slice(0, 10));
  };

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleBookmark = (article: Article) => {
    const exists = bookmarks.some(b => b.id === article.id || (b.url && b.url === article.url));
    if (exists) {
      setBookmarks(prev => prev.filter(b => b.id !== article.id && b.url !== article.url));
      showToast('Removed from saved bookmarks', 'info');
    } else {
      setBookmarks(prev => [article, ...prev]);
      showToast('Article saved to bookmarks!', 'success');
    }
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some(b => b.id === articleId);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    showToast('All bookmarks cleared', 'info');
  };

  // Navigation helpers
  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    addToRecentlyViewed(article);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (cat: NewsCategory) => {
    setActiveCategory(cat);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSearch = (query: string) => {
    setSearchQuery(query);
    if (query) addToSearchHistory(query);
    setView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBookmarks = () => {
    setView('bookmarks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMarkets = () => {
    setView('markets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWeather = () => {
    setView('weather');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTimeline = () => {
    setView('timeline');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSources = () => {
    setView('sources');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToFollowing = () => {
    setView('following');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBeyondNews = () => {
    setView('beyond-news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Location State with localStorage persistence
  const [userLocation, setUserLocationState] = useState<CityLocation>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedId = localStorage.getItem('newshub_selected_city');
        if (savedId && CITIES_LOCATION_DATA[savedId]) {
          return CITIES_LOCATION_DATA[savedId];
        }
      } catch (e) {
        console.error('Failed to parse saved city:', e);
      }
    }
    return CITIES_LOCATION_DATA.bhopal;
  });

  const [isLocationPromptDismissed, setIsLocationPromptDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('newshub_loc_prompt_dismissed') === 'true';
    }
    return false;
  });

  const setUserLocation = (city: CityLocation) => {
    setUserLocationState(city);
    try {
      localStorage.setItem('newshub_selected_city', city.id);
      localStorage.setItem('newshub_loc_prompt_dismissed', 'true');
      setIsLocationPromptDismissed(true);
    } catch (e) {
      console.error(e);
    }
    showToast(`Location set to ${city.name}, ${city.state}`, 'success');
  };

  const setUserCityById = (cityId: string) => {
    const found = CITIES_LOCATION_DATA[cityId.toLowerCase()];
    if (found) {
      setUserLocation(found);
    }
  };

  const dismissLocationPrompt = () => {
    setIsLocationPromptDismissed(true);
    try {
      localStorage.setItem('newshub_loc_prompt_dismissed', 'true');
    } catch (e) {}
  };

  const requestGPSLocation = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearest = findNearestCity(latitude, longitude);
          setUserLocation(nearest);
          showToast(`Detected nearest hub: ${nearest.name}, ${nearest.state}!`, 'success');
          resolve(true);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          showToast('Could not access GPS location. Please select your city manually.', 'info');
          resolve(false);
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    });
  };

  const navigateToNearYou = () => {
    setView('near-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NewsContext.Provider
      value={{
        theme,
        toggleTheme,
        view,
        setView,
        activeCategory,
        setActiveCategory,
        country,
        setCountry,
        searchQuery,
        setSearchQuery,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory,
        selectedArticle,
        setSelectedArticle,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        recentlyViewed,
        addToRecentlyViewed,
        viewLayout,
        setViewLayout,
        toasts,
        showToast,
        removeToast,
        
        followedTopics,
        toggleFollowTopic,
        isTopicFollowed,
        followAllRecommendedTopics,
        
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        addNotification,

        userLocation,
        setUserLocation,
        setUserCityById,
        requestGPSLocation,
        isLocationPromptDismissed,
        dismissLocationPrompt,

        openArticle,
        navigateToCategory,
        navigateToSearch,
        navigateToHome,
        navigateToBookmarks,
        navigateToDashboard,
        navigateToMarkets,
        navigateToWeather,
        navigateToTimeline,
        navigateToSources,
        navigateToFollowing,
        navigateToBeyondNews,
        navigateToNearYou
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

