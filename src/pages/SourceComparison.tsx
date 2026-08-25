import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Share2, 
  Radio, 
  Sparkles, 
  Eye,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SOURCE_COMPARISONS } from '../data/sourceComparisonData';
import { useNews } from '../context/NewsContext';

export const SourceComparison: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(SOURCE_COMPARISONS[0].id);
  const { showToast } = useNews();

  const activeEvent = SOURCE_COMPARISONS.find(e => e.id === selectedEventId) || SOURCE_COMPARISONS[0];

  const getBiasBadgeColor = (bias: string) => {
    switch (bias) {
      case 'Center':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Tech/Financial Focus':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Right-Leaning':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Left-Leaning':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300';
    }
  };

  const getToneBadgeColor = (tone: string) => {
    switch (tone) {
      case 'Optimistic':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300';
      case 'Critical':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300';
      case 'Analytical':
        return 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/10 to-orange-500/20 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-500/20 shadow-2xs">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              Multi-Source Angle & Bias Comparison
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Balanced Reporting
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Compare how global, regional, and domain-specialist publishers frame the exact same major story.
          </p>
        </div>
      </div>

      {/* Event Selection Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {SOURCE_COMPARISONS.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedEventId(comp.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedEventId === comp.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/30'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {comp.eventTitle.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Event Overview Banner */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-black uppercase text-amber-600 dark:text-amber-400 mb-2">
          <span>Global Event Dossier</span>
          <span>•</span>
          <span>{activeEvent.date}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-3">
          {activeEvent.eventTitle}
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium mb-6">
          {activeEvent.eventSummary}
        </p>

        {/* Consensus & Divergence Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs mb-2.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cross-Outlet Consensus Points</span>
            </div>
            <ul className="space-y-2">
              {activeEvent.consensusPoints.map((pt, i) => (
                <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2.5">
              <AlertCircle className="w-4 h-4" />
              <span>Divergent Framing & Slant Nuances</span>
            </div>
            <ul className="space-y-2">
              {activeEvent.divergentPoints.map((pt, i) => (
                <li key={i} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">⚠️</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Side-by-Side Source Perspectives Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              Source Perspectives Breakdown ({activeEvent.perspectives.length} Outlets)
            </h3>
          </div>
          <span className="text-2xs text-zinc-400 font-medium">Independent analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeEvent.perspectives.map((source, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div>
                {/* Source Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-black text-xs shadow-2xs">
                      {source.logoBadge}
                    </span>
                    <div>
                      <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 block">
                        {source.sourceName}
                      </span>
                      <span className="text-3xs text-zinc-400">{source.readTime} read</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-3xs font-black border ${getBiasBadgeColor(source.biasRating)}`}>
                      {source.biasRating}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-3xs font-bold ${getToneBadgeColor(source.tone)}`}>
                      {source.tone} Tone
                    </span>
                  </div>
                </div>

                {/* Headline as framed by this outlet */}
                <h4 className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
                  "{source.headline}"
                </h4>

                {/* Editorial Angle */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl mb-4 text-xs text-zinc-600 dark:text-zinc-300 italic border border-zinc-100 dark:border-zinc-800">
                  Angle: {source.angleSnippet}
                </div>

                {/* Key Points Covered */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-2xs font-bold uppercase text-zinc-400 block mb-1">
                    Emphasized Data Points
                  </span>
                  {source.keyPoints.map((kp, kIdx) => (
                    <div key={kIdx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full Coverage Action */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-2xs text-zinc-400">Coverage verified</span>
                <a
                  href={source.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>Search on Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
