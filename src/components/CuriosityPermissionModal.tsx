import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Sliders, 
  Eye, 
  Lock, 
  Flame, 
  Clock, 
  Compass, 
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { useNews } from '../context/NewsContext';
import { CURIOSITY_TOPICS } from '../data/curiosities';

export const CuriosityPermissionModal: React.FC = () => {
  const { 
    preferences, 
    completeOnboarding, 
    isCuriosityModalOpen, 
    setIsCuriosityModalOpen 
  } = useActivity();
  const { showToast } = useNews();

  const [selectedTopics, setSelectedTopics] = useState<string[]>(preferences.curiosityTopics);
  const [trackingConsent, setTrackingConsent] = useState<boolean>(preferences.trackingConsent);
  const [dailyGoal, setDailyGoal] = useState<number>(preferences.dailyReadingGoalMinutes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTopics.length === CURIOSITY_TOPICS.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(CURIOSITY_TOPICS.map(t => t.id));
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await completeOnboarding(trackingConsent, selectedTopics, dailyGoal);
    setIsSubmitting(false);
    showToast(
      trackingConsent 
        ? 'Curiosity preferences & activity tracking updated!' 
        : 'Curiosities saved (Activity tracking disabled).', 
      'success'
    );
  };

  if (!isCuriosityModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 text-white overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold w-fit border border-white/20">
                <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Editorial Personalization & Privacy</span>
              </div>

              <button
                onClick={() => setIsCuriosityModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
              What news are you curious about?
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm font-medium mt-1 max-w-lg leading-relaxed">
              Select the subjects you love and configure your activity tracking preferences for curated dispatch feeds.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Tracking Permission & Consent Toggle */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                      <span>Enable Smart Reading & Activity Tracking</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full">
                        Subscriber Privacy
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      Allows NewsHub to track read articles, audio listens, and topic affinities to deliver tailored morning recommendations.
                    </p>
                  </div>
                </div>

                {/* Consent Switch */}
                <button
                  type="button"
                  onClick={() => setTrackingConsent(!trackingConsent)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    trackingConsent ? 'bg-rose-600' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      trackingConsent ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span>Private & encrypted. Never sold to third-party ad networks.</span>
                </span>
                <span className="font-bold text-rose-500">
                  {trackingConsent ? 'Active & Opted-In' : 'Disabled (No Tracking)'}
                </span>
              </div>
            </div>

            {/* Curiosity Topics Multi-Select Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <span>Select Your News Curiosities</span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Choose at least 1 or more areas of interest ({selectedTopics.length} selected)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                >
                  {selectedTopics.length === CURIOSITY_TOPICS.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CURIOSITY_TOPICS.map((topic) => {
                  const isSelected = selectedTopics.includes(topic.id);
                  return (
                    <motion.button
                      key={topic.id}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleTopic(topic.id)}
                      className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-start space-x-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/60 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-2xl shrink-0 p-1.5 rounded-xl bg-white dark:bg-zinc-900 shadow-2xs border border-zinc-200/50 dark:border-zinc-800/50">
                        {topic.emoji}
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-black truncate ${
                            isSelected ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-900 dark:text-zinc-100'
                          }`}>
                            {topic.label}
                          </p>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                          {topic.tagline}
                        </p>
                      </div>

                      {/* Selection Checkmark Indicator */}
                      <div className={`absolute top-3.5 right-3.5 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-rose-600 text-white shadow-xs' 
                          : 'border border-zinc-300 dark:border-zinc-700 opacity-40 group-hover:opacity-80'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Daily Reading Goal Preference */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Daily Reading Digest Goal
                  </span>
                </div>
                <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                  {dailyGoal} mins / day
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 30].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyGoal(mins)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                      dailyGoal === mins
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-6 bg-zinc-100/80 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsCuriosityModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            >
              Skip For Now
            </button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleSave}
              disabled={isSubmitting || selectedTopics.length === 0}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-600/30 flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>Save & Personalize Feed</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
