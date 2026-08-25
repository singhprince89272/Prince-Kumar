import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Flame, 
  Sparkles, 
  Layers, 
  SunMedium, 
  TrendingUp, 
  CloudSun,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { NotificationType } from '../types';

export const NotificationsCenter: React.FC = () => {
  const { 
    notifications, 
    unreadNotifsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearNotifications,
    navigateToFollowing,
    navigateToMarkets,
    navigateToWeather,
    navigateToHome
  } = useNews();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getNotifIcon = (type: NotificationType) => {
    switch (type) {
      case 'breaking':
        return <Flame className="w-4 h-4 text-rose-500" />;
      case 'followed_topic':
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
      case 'daily_digest':
        return <SunMedium className="w-4 h-4 text-amber-500" />;
      case 'market_alert':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'weather_alert':
        return <CloudSun className="w-4 h-4 text-sky-500" />;
      default:
        return <Bell className="w-4 h-4 text-zinc-500" />;
    }
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    setIsOpen(false);

    if (notif.type === 'followed_topic') {
      navigateToFollowing();
    } else if (notif.type === 'market_alert') {
      navigateToMarkets();
    } else if (notif.type === 'weather_alert') {
      navigateToWeather();
    } else {
      navigateToHome();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications & News Alerts"
        className="relative p-2 sm:p-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer border border-zinc-200/50 dark:border-zinc-700/50 shadow-2xs"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
        {unreadNotifsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-600 text-[10px] font-black text-white shadow-sm ring-2 ring-white dark:ring-zinc-950 animate-pulse">
            {unreadNotifsCount}
          </span>
        )}
      </motion.button>

      {/* Notifications Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="font-black text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                  News Alerts & Updates
                </span>
                {unreadNotifsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-2xs font-black bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                    {unreadNotifsCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-1">
                {unreadNotifsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    title="Mark all as read"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-2xs font-bold flex items-center space-x-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Read all</span>
                  </button>
                )}
                <button
                  onClick={clearNotifications}
                  title="Clear all"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1 p-2 bg-zinc-100/50 dark:bg-zinc-950/30 overflow-x-auto no-scrollbar border-b border-zinc-100 dark:border-zinc-800/60">
              {[
                { id: 'all', label: 'All' },
                { id: 'breaking', label: '🚨 Breaking' },
                { id: 'followed_topic', label: '🤖 Topics' },
                { id: 'daily_digest', label: '☀️ Digest' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    filter === tab.id
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {filteredNotifs.length === 0 ? (
                <div className="py-10 text-center text-zinc-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-bold">No notifications here</p>
                  <p className="text-2xs text-zinc-500 mt-0.5">You are fully caught up with the wire!</p>
                </div>
              ) : (
                filteredNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3.5 transition-colors cursor-pointer flex items-start space-x-3 ${
                      notif.read
                        ? 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 opacity-75'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-50/80 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 shadow-2xs shrink-0 mt-0.5">
                      {getNotifIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-xs font-black truncate ${notif.read ? 'text-zinc-800 dark:text-zinc-200' : 'text-rose-600 dark:text-rose-400'}`}>
                          {notif.title}
                        </span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-2xs text-zinc-600 dark:text-zinc-300 leading-snug line-clamp-2">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-1.5 text-3xs text-zinc-400">
                        <span>
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="flex items-center space-x-0.5 text-rose-500 font-bold">
                          <span>View</span>
                          <ChevronRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigateToFollowing();
                }}
                className="text-2xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                Manage your followed topics & preferences →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
