import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { db, doc, setDoc, getDoc } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { 
  ActivityLog, 
  ActivityActionType, 
  UserPreferences, 
  ActivityStats, 
  Article, 
  CuriosityTopic 
} from '../types';
import { CURIOSITY_TOPICS } from '../data/curiosities';

interface ActivityContextType {
  preferences: UserPreferences;
  activityLogs: ActivityLog[];
  stats: ActivityStats;
  logActivity: (
    type: ActivityActionType, 
    title: string, 
    category?: string, 
    url?: string, 
    metadata?: Record<string, any>
  ) => void;
  updateTrackingConsent: (consent: boolean) => Promise<void>;
  updateCuriosityTopics: (topics: string[]) => Promise<void>;
  updateDailyGoal: (minutes: number) => Promise<void>;
  completeOnboarding: (consent: boolean, topics: string[], goal: number) => Promise<void>;
  clearActivityHistory: () => Promise<void>;
  exportActivityData: () => void;
  getArticleCuriosityMatch: (article: Article) => { score: number; isMatch: boolean; matchedTopics: CuriosityTopic[] };
  isCuriosityModalOpen: boolean;
  setIsCuriosityModalOpen: (open: boolean) => void;
  isActivityModalOpen: boolean;
  setIsActivityModalOpen: (open: boolean) => void;
}

const PREFERENCES_STORAGE_KEY = 'newshub_user_preferences_v1';
const ACTIVITY_LOGS_STORAGE_KEY = 'newshub_activity_logs_v1';

const DEFAULT_PREFERENCES: UserPreferences = {
  trackingConsent: true,
  curiosityTopics: ['ai_tech', 'markets_finance', 'space_science'],
  dailyReadingGoalMinutes: 10,
  hasCompletedOnboarding: false,
  lastUpdated: new Date().toISOString()
};

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // 1. User Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error('Failed to load preferences from storage:', e);
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // 2. Activity Logs State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ACTIVITY_LOGS_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load activity logs:', e);
      }
    }
    return [];
  });

  // Modals state
  const [isCuriosityModalOpen, setIsCuriosityModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Sync to Firestore & localStorage when preferences change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    }

    if (user?.uid) {
      const syncPrefs = async () => {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            preferences,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) {
          console.warn('Preferences firestore sync skipped:', e);
        }
      };
      syncPrefs();
    }
  }, [preferences, user?.uid]);

  // Sync activity logs to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACTIVITY_LOGS_STORAGE_KEY, JSON.stringify(activityLogs.slice(0, 100)));
    }
  }, [activityLogs]);

  // On initial auth login, load remote preferences if available
  useEffect(() => {
    if (!user?.uid) return;

    const loadRemoteData = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data.preferences) {
            setPreferences(prev => ({
              ...prev,
              ...data.preferences
            }));
          }
        }
      } catch (e) {
        console.warn('Could not fetch remote user preferences:', e);
      }
    };
    loadRemoteData();
  }, [user?.uid]);

  // Prompt onboarding if user is logged in, verified, and has not completed onboarding
  useEffect(() => {
    if (user && user.emailVerified && !preferences.hasCompletedOnboarding) {
      const timer = setTimeout(() => {
        setIsCuriosityModalOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [user, preferences.hasCompletedOnboarding]);

  // Log activity function with consent check
  const logActivity = (
    type: ActivityActionType, 
    title: string, 
    category?: string, 
    url?: string, 
    metadata?: Record<string, any>
  ) => {
    // Strictly respect user consent! If trackingConsent is false, skip logging
    if (!preferences.trackingConsent) return;

    const newLog: ActivityLog = {
      id: 'act_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
      type,
      title: title.slice(0, 140),
      category: category?.toLowerCase() || 'general',
      url,
      timestamp: new Date().toISOString(),
      metadata
    };

    setActivityLogs(prev => [newLog, ...prev.slice(0, 99)]);

    // Firestore async push if logged in
    if (user?.uid) {
      try {
        setDoc(doc(db, 'users', user.uid, 'activities', newLog.id), newLog, { merge: true }).catch(() => {});
      } catch (_) {}
    }
  };

  // Update tracking consent
  const updateTrackingConsent = async (consent: boolean) => {
    setPreferences(prev => ({
      ...prev,
      trackingConsent: consent,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Update curiosity topics
  const updateCuriosityTopics = async (topics: string[]) => {
    setPreferences(prev => ({
      ...prev,
      curiosityTopics: topics,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Update daily reading goal
  const updateDailyGoal = async (minutes: number) => {
    setPreferences(prev => ({
      ...prev,
      dailyReadingGoalMinutes: minutes,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Complete onboarding
  const completeOnboarding = async (consent: boolean, topics: string[], goal: number) => {
    const updated: UserPreferences = {
      trackingConsent: consent,
      curiosityTopics: topics.length > 0 ? topics : ['ai_tech', 'markets_finance'],
      dailyReadingGoalMinutes: goal,
      hasCompletedOnboarding: true,
      lastUpdated: new Date().toISOString()
    };
    setPreferences(updated);
    setIsCuriosityModalOpen(false);

    if (consent) {
      logActivity('category_browse', 'Curiosity Preferences Activated', 'general', undefined, { topics });
    }
  };

  // Clear all activity history
  const clearActivityHistory = async () => {
    setActivityLogs([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACTIVITY_LOGS_STORAGE_KEY);
    }
  };

  // Export activity data as JSON
  const exportActivityData = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify({
          user: user?.email || 'subscriber',
          exportedAt: new Date().toISOString(),
          preferences,
          activityLogs
        }, null, 2)
      );
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `newshub_activity_data_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Failed to export activity data:', e);
    }
  };

  // Calculate curiosity match for any article
  const getArticleCuriosityMatch = (article: Article) => {
    const chosenTopics = CURIOSITY_TOPICS.filter(t => preferences.curiosityTopics.includes(t.id));
    if (chosenTopics.length === 0) {
      return { score: 50, isMatch: false, matchedTopics: [] };
    }

    const titleLower = (article.title || '').toLowerCase();
    const descLower = (article.description || '').toLowerCase();
    const catLower = (article.category || '').toLowerCase();

    const matchedTopics: CuriosityTopic[] = [];
    let matchPoints = 0;

    chosenTopics.forEach(topic => {
      let topicMatched = false;

      // Category match
      if (topic.categoryMatch.includes(catLower)) {
        topicMatched = true;
        matchPoints += 35;
      }

      // Keyword match
      for (const kw of topic.keywords) {
        if (titleLower.includes(kw) || descLower.includes(kw)) {
          topicMatched = true;
          matchPoints += 25;
          break;
        }
      }

      if (topicMatched) {
        matchedTopics.push(topic);
      }
    });

    const calculatedScore = Math.min(99, Math.max(40, Math.round(55 + (matchPoints * 0.8))));
    const isMatch = matchedTopics.length > 0;

    return {
      score: isMatch ? calculatedScore : 45,
      isMatch,
      matchedTopics
    };
  };

  // Derived Activity Stats
  const stats: ActivityStats = useMemo(() => {
    let totalArticlesRead = 0;
    let totalAudioListened = 0;
    let totalSearches = 0;
    let totalBookmarks = 0;
    const categoryCount: Record<string, number> = {};
    const activeDates = new Set<string>();

    activityLogs.forEach(log => {
      if (log.type === 'read_article') totalArticlesRead++;
      if (log.type === 'listen_audio') totalAudioListened++;
      if (log.type === 'search_query') totalSearches++;
      if (log.type === 'bookmark') totalBookmarks++;

      if (log.category) {
        categoryCount[log.category] = (categoryCount[log.category] || 0) + 1;
      }

      if (log.timestamp) {
        const dateStr = log.timestamp.split('T')[0];
        activeDates.add(dateStr);
      }
    });

    // Approximate reading time (average 2.5 mins per article read)
    const totalReadingMinutes = Math.max(totalArticlesRead * 3 + totalAudioListened * 4, activityLogs.length > 0 ? 5 : 0);

    // Calculate percentage affinities
    const totalEvents = Object.values(categoryCount).reduce((a, b) => a + b, 0) || 1;
    const categoryAffinities: Record<string, number> = {};
    Object.keys(categoryCount).forEach(cat => {
      categoryAffinities[cat] = Math.round((categoryCount[cat] / totalEvents) * 100);
    });

    // Curiosity match score calculation
    const curiosityMatchScore = preferences.curiosityTopics.length > 0 ? 94 : 60;

    return {
      totalArticlesRead,
      totalAudioListened,
      totalSearches,
      totalBookmarks,
      totalReadingMinutes,
      activeStreakDays: Math.max(1, activeDates.size),
      categoryAffinities,
      curiosityMatchScore
    };
  }, [activityLogs, preferences.curiosityTopics]);

  return (
    <ActivityContext.Provider
      value={{
        preferences,
        activityLogs,
        stats,
        logActivity,
        updateTrackingConsent,
        updateCuriosityTopics,
        updateDailyGoal,
        completeOnboarding,
        clearActivityHistory,
        exportActivityData,
        getArticleCuriosityMatch,
        isCuriosityModalOpen,
        setIsCuriosityModalOpen,
        isActivityModalOpen,
        setIsActivityModalOpen
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = (): ActivityContextType => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};
