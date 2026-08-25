import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Milestone, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  Share2, 
  Layers, 
  Radio,
  Bookmark
} from 'lucide-react';
import { StoryTimeline } from '../types';
import { STORY_TIMELINES } from '../data/timelinesData';
import { useNews } from '../context/NewsContext';

export const NewsTimeline: React.FC = () => {
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(STORY_TIMELINES[0].id);
  const { showToast } = useNews();

  const activeTimeline = STORY_TIMELINES.find(t => t.id === selectedTimelineId) || STORY_TIMELINES[0];

  const handleShareTimeline = () => {
    if (navigator.share) {
      navigator.share({
        title: activeTimeline.title,
        text: activeTimeline.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Timeline link copied to clipboard!', 'success');
    }
  };

  const getImpactBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'High':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-violet-500/10 to-purple-500/20 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-500/20 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              Interactive Story Timelines
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              Deep Historical Context
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Track how defining global events, tech revolutions, and space missions evolved milestone by milestone.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleShareTimeline}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs self-start sm:self-center"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Timeline</span>
        </motion.button>
      </div>

      {/* Story Selector Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {STORY_TIMELINES.map((timeline) => (
          <button
            key={timeline.id}
            onClick={() => setSelectedTimelineId(timeline.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedTimelineId === timeline.id
                ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-600/30'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {timeline.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950 text-white shadow-xl min-h-[220px] flex flex-col justify-end p-6 sm:p-8">
        <img
          src={activeTimeline.bannerImage}
          alt={activeTimeline.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-black text-violet-400 uppercase tracking-wider mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-950/80 border border-violet-500/30">
              {activeTimeline.status} Series
            </span>
            <span>•</span>
            <span>Updated {activeTimeline.lastUpdated}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mb-2">
            {activeTimeline.title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-medium">
            {activeTimeline.tagline}
          </p>
        </div>
      </div>

      {/* Vertical Timeline Nodes */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-violet-500/30 ml-4 sm:ml-6 space-y-8 my-8">
        {activeTimeline.events.map((ev, index) => (
          <div key={ev.id} className="relative group">
            {/* Timeline Node Icon Circle */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border-2 border-violet-600 flex items-center justify-center shadow-md">
              <span className="w-2 h-2 rounded-full bg-violet-600 group-hover:scale-150 transition-transform" />
            </div>

            {/* Event Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-violet-400 dark:hover:border-violet-600 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                    {ev.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-2xs font-bold bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                    {ev.tag}
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-3xs font-black border ${getImpactBadge(ev.impactLevel)}`}>
                  {ev.impactLevel} Impact
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 mb-2">
                {ev.headline}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium mb-3">
                {ev.summary}
              </p>

              <div className="flex items-center justify-between text-2xs text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span>Verified Source: <strong className="text-zinc-700 dark:text-zinc-300">{ev.source}</strong></span>
                <span className="text-violet-500 font-bold">Milestone #{index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
