import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Flame, 
  BookOpen, 
  Radio, 
  Search, 
  Bookmark, 
  Clock, 
  ShieldCheck, 
  Trash2, 
  Download, 
  Sparkles, 
  Sliders, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Lock
} from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { useNews } from '../context/NewsContext';
import { CURIOSITY_TOPICS } from '../data/curiosities';
import { formatTimeAgo } from './NewsCard';

export const ActivityDashboardModal: React.FC = () => {
  const { 
    preferences, 
    activityLogs, 
    stats, 
    updateTrackingConsent, 
    clearActivityHistory, 
    exportActivityData,
    isActivityModalOpen, 
    setIsActivityModalOpen,
    setIsCuriosityModalOpen
  } = useActivity();
  const { showToast } = useNews();

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'privacy'>('overview');
  const [filterType, setFilterType] = useState<string>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isActivityModalOpen) return null;

  const handleClearHistory = async () => {
    await clearActivityHistory();
    setConfirmClear(false);
    showToast('All activity logs wiped clean.', 'info');
  };

  const filteredLogs = activityLogs.filter(log => {
    if (filterType === 'all') return true;
    return log.type === filterType;
  });

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'read_article':
        return <BookOpen className="w-4 h-4 text-rose-500" />;
      case 'listen_audio':
        return <Radio className="w-4 h-4 text-amber-500" />;
      case 'search_query':
        return <Search className="w-4 h-4 text-blue-500" />;
      case 'bookmark':
        return <Bookmark className="w-4 h-4 text-emerald-500" />;
      default:
        return <Activity className="w-4 h-4 text-purple-500" />;
    }
  };

  const getActionBadgeLabel = (type: string) => {
    switch (type) {
      case 'read_article': return 'Read Article';
      case 'listen_audio': return 'Audio Wire';
      case 'search_query': return 'Search';
      case 'bookmark': return 'Bookmark';
      case 'category_browse': return 'Category';
      default: return 'Action';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-tr from-rose-600 to-red-600 rounded-2xl shadow-md text-white">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight">
                    Subscriber Activity & Intelligence
                  </h2>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    preferences.trackingConsent 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-700 text-zinc-300'
                  }`}>
                    {preferences.trackingConsent ? 'Tracking Active' : 'Tracking Paused'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Your reading telemetry, category affinities & curiosity insights
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsActivityModalOpen(false)}
              className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 pt-3 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-3 text-xs font-black transition-all cursor-pointer border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                Telemetry & Affinities
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`pb-3 px-3 text-xs font-black transition-all cursor-pointer border-b-2 flex items-center space-x-1.5 ${
                  activeTab === 'timeline'
                    ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <span>Activity Stream</span>
                <span className="px-1.5 py-0.2 bg-zinc-200 dark:bg-zinc-800 rounded-full text-[10px]">
                  {activityLogs.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`pb-3 px-3 text-xs font-black transition-all cursor-pointer border-b-2 ${
                  activeTab === 'privacy'
                    ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                Privacy & Data Controls
              </button>
            </div>

            <button
              onClick={() => {
                setIsActivityModalOpen(false);
                setIsCuriosityModalOpen(true);
              }}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1 mb-2 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Curiosities ({preferences.curiosityTopics.length})</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 custom-scrollbar">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Key Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Stories Read</span>
                      <BookOpen className="w-4 h-4 text-rose-500" />
                    </div>
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      {stats.totalArticlesRead}
                    </p>
                    <span className="text-[10px] text-zinc-500">~{stats.totalReadingMinutes} mins time</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Audio Wire</span>
                      <Radio className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      {stats.totalAudioListened}
                    </p>
                    <span className="text-[10px] text-zinc-500">Listened broadcasts</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Curiosity Topics</span>
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      {preferences.curiosityTopics.length}
                    </p>
                    <span className="text-[10px] text-zinc-500">Active subjects</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Reading Streak</span>
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      {stats.activeStreakDays} <span className="text-xs font-bold text-zinc-500">Days</span>
                    </p>
                    <span className="text-[10px] text-emerald-500 font-bold">Daily Streak Active</span>
                  </div>
                </div>

                {/* Selected Curiosities Grid */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                      <span>Your Active Curiosity Subscriptions</span>
                    </h3>
                    <span className="text-[11px] font-bold text-rose-500">
                      Curiosity Match Score: {stats.curiosityMatchScore}%
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {preferences.curiosityTopics.map((topicId) => {
                      const topic = CURIOSITY_TOPICS.find(t => t.id === topicId);
                      if (!topic) return null;
                      return (
                        <div
                          key={topic.id}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center space-x-2 text-xs font-bold text-zinc-800 dark:text-zinc-200"
                        >
                          <span>{topic.emoji}</span>
                          <span>{topic.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category Affinity Breakdown Bars */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                    <span>Reading Category Distribution</span>
                  </h3>

                  {Object.keys(stats.categoryAffinities).length > 0 ? (
                    <div className="space-y-2.5">
                      {Object.entries(stats.categoryAffinities).map(([cat, pct]) => (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold capitalize">
                            <span className="text-zinc-700 dark:text-zinc-300">{cat} Desk</span>
                            <span className="text-rose-600 dark:text-rose-400">{pct}%</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(5, pct)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500 py-3 text-center">
                      Read more news stories to see your personalized category affinity distribution chart.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-4">
                {/* Timeline Filters */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {['all', 'read_article', 'listen_audio', 'search_query', 'bookmark'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                        filterType === type
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      {type === 'all' ? 'All Activity' : getActionBadgeLabel(type)}
                    </button>
                  ))}
                </div>

                {/* Timeline Stream */}
                {filteredLogs.length > 0 ? (
                  <div className="space-y-2.5">
                    {filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start justify-between space-x-3 text-xs"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shrink-0">
                            {getActionIcon(log.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                                {log.title}
                              </span>
                              {log.category && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                  {log.category}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-0.5">
                              {getActionBadgeLabel(log.type)} • {formatTimeAgo(log.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <Activity className="w-8 h-8 text-zinc-400 mx-auto opacity-50" />
                    <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No activity recorded yet</p>
                    <p className="text-xs text-zinc-500">
                      As you explore articles, listen to audio wire, or search headlines, your activity stream will populate here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                {/* Tracking Consent Switch */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Activity Logging Permission</span>
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      When turned off, NewsHub stops recording your reading history and telemetry immediately.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !preferences.trackingConsent;
                      updateTrackingConsent(next);
                      showToast(next ? 'Activity tracking activated' : 'Activity tracking paused', 'info');
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      preferences.trackingConsent ? 'bg-rose-600' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        preferences.trackingConsent ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Export Data Action */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                      <Download className="w-4 h-4 text-blue-500" />
                      <span>Export Your Activity Data</span>
                    </h4>
                    <p className="text-xs text-zinc-500">
                      Download a structured JSON archive of all your reading logs and curiosity settings.
                    </p>
                  </div>

                  <button
                    onClick={exportActivityData}
                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                </div>

                {/* Wipe History Action */}
                <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Wipe All Activity History</span>
                    </h4>
                    <p className="text-xs text-zinc-500">
                      Permanently erase all tracked reading logs, search history, and telemetry from your device.
                    </p>
                  </div>

                  {confirmClear ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleClearHistory}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Confirm Wipe
                      </button>
                      <button
                        onClick={() => setConfirmClear(false)}
                        className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmClear(true)}
                      className="px-4 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All History</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-zinc-100/80 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>NewsHub Subscriber Privacy Protocol v1.4</span>
            </span>

            <button
              onClick={() => setIsActivityModalOpen(false)}
              className="px-5 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
