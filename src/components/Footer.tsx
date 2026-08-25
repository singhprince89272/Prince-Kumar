import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Mail, ArrowRight, Check, Heart, Globe, Shield, Clock } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { CATEGORIES } from './CategoryNav';
import { NewsCategory } from '../types';

export const Footer: React.FC = () => {
  const { 
    navigateToCategory, 
    navigateToHome, 
    navigateToFollowing,
    navigateToDashboard,
    navigateToMarkets,
    navigateToWeather,
    navigateToTimeline,
    navigateToSources,
    showToast 
  } = useNews();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to NewsHub Daily Briefing!', 'success');
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-zinc-50/90 dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-xs transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Newsletter Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-2.5 text-left focus:outline-none cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white font-bold shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                News<span className="text-rose-600 dark:text-rose-500">Hub</span>
              </span>
            </button>

            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm font-medium">
              Your premier gateway for verified global headlines, breaking market insights, technology breakdowns, and regional reporting with audio narration.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-black text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-2">
                Daily Morning Briefing
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-rose-500 transition-colors shadow-2xs"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs flex items-center space-x-1 shadow-sm shadow-rose-600/30 transition-all shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <span>Join</span>}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Popular Desks
            </h4>
            <ul className="space-y-2 font-medium">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateToCategory(cat.id)}
                    className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Features & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Explore NewsHub
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={navigateToFollowing}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                >
                  Following Topics Feed
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToDashboard}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                >
                  Pulse & Analytics Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToMarkets}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                >
                  Stock Markets & Indices
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToWeather}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                >
                  Weather & Climate Center
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToTimeline}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                >
                  Story Timelines
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToSources}
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left cursor-pointer"
                >
                  Multi-Source Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Newsroom Standards
            </h4>
            <ul className="space-y-2 text-zinc-500 dark:text-zinc-400 font-medium">
              <li className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Source Index</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-rose-500" />
                <span>Global Multi-Region Wire</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>Real-Time Updates</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 dark:text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} NewsHub. Real-time news aggregation portal.</p>
          <div className="flex items-center space-x-4">
            <span>Powered by News API & Multi-Source Live Feeds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

