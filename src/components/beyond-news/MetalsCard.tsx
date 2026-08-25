import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ShieldCheck, 
  Info,
  ExternalLink,
  Award
} from 'lucide-react';
import { fetchLivePreciousMetals, MetalsOverviewData } from '../../services/metalsApi';

interface MetalsCardProps {
  className?: string;
}

export const MetalsCard: React.FC<MetalsCardProps> = ({ className = '' }) => {
  const [metalsData, setMetalsData] = useState<MetalsOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'24k' | '22k'>('24k');

  const loadData = async () => {
    try {
      if (!metalsData) setLoading(true);
      else setRefreshing(true);

      const data = await fetchLivePreciousMetals();
      setMetalsData(data);
    } catch (err) {
      console.error('Failed to load metals data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentGold = metalsData ? (activeTab === '24k' ? metalsData.gold24k : metalsData.gold22k) : null;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Precious Metals
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Live
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-400">
                Gold & Silver Bullion Spot Benchmark
              </p>
            </div>
          </div>

          <button
            onClick={loadData}
            disabled={refreshing}
            title="Refresh bullion rates"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="py-6 space-y-3 animate-pulse">
            <div className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
          </div>
        )}

        {/* Content */}
        {!loading && metalsData && currentGold && (
          <div className="pt-4 space-y-4">
            {/* Gold Highlight Box */}
            <div className="p-4 bg-gradient-to-br from-amber-50/80 via-yellow-50/30 to-amber-100/20 dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-950 rounded-2xl border border-amber-200/80 dark:border-amber-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs shadow-amber-500/50" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                    Gold ({activeTab === '24k' ? '24K - 99.9%' : '22K - 91.6%'})
                  </span>
                </div>

                {/* 24K vs 22K Purity Switcher */}
                <div className="flex items-center space-x-1 p-0.5 bg-amber-200/60 dark:bg-zinc-800 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setActiveTab('24k')}
                    className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      activeTab === '24k'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                    }`}
                  >
                    24K
                  </button>
                  <button
                    onClick={() => setActiveTab('22k')}
                    className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      activeTab === '22k'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                    }`}
                  >
                    22K
                  </button>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 font-display">
                    ₹{currentGold.priceINR.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                    {currentGold.unit} • ${Math.round(currentGold.priceUSD).toLocaleString()}/oz
                  </div>
                </div>

                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{currentGold.changePercent}%</span>
                </div>
              </div>
            </div>

            {/* Silver Highlight Box */}
            <div className="p-4 bg-gradient-to-br from-slate-50/80 via-zinc-50/40 to-slate-100/20 dark:from-zinc-900/60 dark:via-zinc-900 dark:to-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-xs" />
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-300">
                    Silver (99.9% Fine)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-zinc-400">
                  ${metalsData.silver.priceUSD}/oz
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 font-display">
                    ₹{metalsData.silver.priceINR.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                    {metalsData.silver.unit}
                  </div>
                </div>

                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{metalsData.silver.changePercent}%</span>
                </div>
              </div>
            </div>

            {/* Hallmark note */}
            <div className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 text-[11px] text-zinc-500 dark:text-zinc-400">
              <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>BIS Hallmarked rates indicative of major Indian bullion markets.</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer with Last Updated & External Source Link */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
        <span>Last updated: {metalsData?.lastUpdated || 'Today'}</span>
        <a
          href="https://www.goodreturns.in/gold-rates/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-amber-600 dark:text-amber-400 hover:underline font-bold"
        >
          <span>IBJA Gold Rates</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
