import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight, Radio } from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';

interface BreakingNewsProps {
  articles: Article[];
}

export const BreakingNews: React.FC<BreakingNewsProps> = ({ articles }) => {
  const { openArticle } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const breakingStories = articles.slice(0, 5);

  useEffect(() => {
    if (isPaused || breakingStories.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, breakingStories.length]);

  if (breakingStories.length === 0) return null;

  const currentArticle = breakingStories[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? breakingStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingStories.length);
  };

  return (
    <div className="w-full bg-zinc-950/90 backdrop-blur-md text-white rounded-2xl p-2.5 sm:p-3 mb-8 shadow-lg shadow-rose-950/15 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
      {/* Subtle red aura */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-rose-600/10 blur-xl pointer-events-none" />

      {/* Badge & Ticker Item */}
      <div className="flex items-center space-x-3 w-full sm:w-auto flex-1 min-w-0 relative z-10">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-black uppercase tracking-wider shrink-0 shadow-md shadow-rose-600/30">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Flame className="w-3.5 h-3.5" />
          <span>Breaking</span>
        </div>

        <div
          onClick={() => openArticle(currentArticle)}
          className="flex items-center space-x-2 flex-1 min-w-0 cursor-pointer group"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentArticle.id || currentIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-rose-400 truncate transition-colors"
            >
              {currentArticle.title}
            </motion.span>
          </AnimatePresence>

          <span className="text-[11px] font-bold text-zinc-400 shrink-0 hidden md:inline">
            ({currentArticle.source.name})
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-rose-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-1 self-end sm:self-center shrink-0 relative z-10">
        <span className="text-xs text-zinc-400 font-mono mr-2">
          {currentIndex + 1}/{breakingStories.length}
        </span>
        <button
          onClick={() => setIsPaused(!isPaused)}
          title={isPaused ? 'Resume' : 'Pause'}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={handlePrev}
          title="Previous"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          title="Next"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

