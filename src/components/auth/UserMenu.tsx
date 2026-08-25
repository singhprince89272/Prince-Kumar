import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  Mail, 
  ShieldCheck, 
  Send,
  ChevronDown,
  Sparkles,
  Flame,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNews } from '../../context/NewsContext';
import { useActivity } from '../../context/ActivityContext';

export const UserMenu: React.FC = () => {
  const { user, isEmailVerified, logout, resendVerification } = useAuth();
  const { bookmarks, navigateToBookmarks, showToast } = useNews();
  const { preferences, stats, setIsCuriosityModalOpen, setIsActivityModalOpen } = useActivity();
  const [isOpen, setIsOpen] = useState(false);
  const [resending, setResending] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResend = async () => {
    setResending(true);
    const res = await resendVerification();
    setResending(false);
    if (res.success) {
      showToast('Verification email resent! Please check your inbox.', 'success');
    } else {
      showToast(res.error || 'Failed to resend email.', 'error');
    }
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    showToast('Signed out of NewsHub', 'info');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Subscriber';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer shadow-2xs group"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
            {initial}
          </div>
          {isEmailVerified ? (
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white dark:ring-zinc-900">
              <CheckCircle2 className="w-2.5 h-2.5" />
            </span>
          ) : (
            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 ring-2 ring-white dark:ring-zinc-900 animate-pulse">
              <AlertCircle className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 max-w-[100px]">
            {displayName}
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-0.5 -mt-0.5">
            <span>Verified</span>
          </span>
        </div>

        <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-transform duration-200" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-3 z-50 text-xs"
          >
            {/* Header info */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl mb-2 border border-zinc-100 dark:border-zinc-800/80">
              <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm truncate">
                {displayName}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 truncate text-[11px] mt-0.5 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-zinc-400 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </p>

              {/* Verified Badge */}
              <div className="mt-2.5 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Account Status
                </span>
                {isEmailVerified ? (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-black">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Email Verified</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-black">
                    <AlertCircle className="w-3 h-3" />
                    <span>Unverified</span>
                  </span>
                )}
              </div>
            </div>

            {/* If unverified, show prompt to resend */}
            {!isEmailVerified && (
              <div className="mb-2 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400 space-y-1.5">
                <p className="text-[11px] font-medium leading-tight">
                  Your email is not verified yet. Please check your inbox.
                </p>
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full py-1.5 bg-amber-600 text-white font-bold rounded-lg text-[10px] flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-2.5 h-2.5" />
                  <span>{resending ? 'Sending...' : 'Resend Link'}</span>
                </button>
              </div>
            )}

            {/* Menu Items */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  setIsCuriosityModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>News Curiosities & Topics</span>
                </span>
                <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full text-[10px] font-black">
                  {preferences.curiosityTopics.length} Topics
                </span>
              </button>

              <button
                onClick={() => {
                  setIsActivityModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Reading Activity & Privacy</span>
                </span>
                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-[10px] font-black">
                  {stats.activeStreakDays}d Streak
                </span>
              </button>

              <button
                onClick={() => {
                  navigateToBookmarks();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4 text-rose-500" />
                  <span>My Saved Library</span>
                </span>
                <span className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-[10px] font-bold">
                  {bookmarks.length}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
