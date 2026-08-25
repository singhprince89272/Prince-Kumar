import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  RefreshCw, 
  BarChart3, 
  Search, 
  ArrowRight,
  Info,
  ExternalLink
} from 'lucide-react';
import { StockQuote } from '../../types';
import { fetchMarketOverview, ALL_STOCKS, MarketIndexOverview } from '../../services/marketApi';
import { StockChartModal } from './StockChartModal';

interface MarketCardProps {
  className?: string;
  onOpenSearch?: () => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ className = '', onOpenSearch }) => {
  const [marketData, setMarketData] = useState<MarketIndexOverview | null>(null);
  const [popularStocks, setPopularStocks] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStockForChart, setSelectedStockForChart] = useState<StockQuote | null>(null);
  const [stockTab, setStockTab] = useState<'indian' | 'global'>('indian');

  const loadData = async () => {
    try {
      if (!marketData) setLoading(true);
      else setRefreshing(true);

      const overview = await fetchMarketOverview();
      setMarketData(overview);
      
      const filtered = ALL_STOCKS.filter((s) => s.category !== 'index');
      setPopularStocks(filtered);
    } catch (err) {
      console.error('Failed to load market overview:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const displayedStocks = popularStocks.filter((s) =>
    stockTab === 'indian' ? s.category === 'indian' : s.category === 'tech'
  ).slice(0, 5);

  return (
    <>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className={`relative bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${className}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Market Overview
                  </h3>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Live
                  </span>
                </div>
                <p className="text-[11px] font-medium text-zinc-400">
                  National & global benchmarks, large-caps
                </p>
              </div>
            </div>

            <button
              onClick={loadData}
              disabled={refreshing}
              title="Refresh quotes"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-500' : ''}`} />
            </button>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="py-6 space-y-4 animate-pulse">
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-10 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl" />
                <div className="h-10 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl" />
                <div className="h-10 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl" />
              </div>
            </div>
          )}

          {/* Market Content */}
          {!loading && marketData && (
            <div className="pt-4 space-y-4">
              {/* Indices Ticker Trio */}
              <div className="grid grid-cols-3 gap-2">
                {/* NIFTY 50 */}
                <div
                  onClick={() => setSelectedStockForChart(marketData.nifty50)}
                  className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/30 cursor-pointer transition-all group"
                >
                  <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase">
                    NIFTY 50
                  </div>
                  <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5 group-hover:text-emerald-600 transition-colors">
                    {marketData.nifty50.price.toLocaleString()}
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    <span>+{marketData.nifty50.changePercent}%</span>
                  </div>
                </div>

                {/* SENSEX */}
                <div
                  onClick={() => setSelectedStockForChart(marketData.sensex)}
                  className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/30 cursor-pointer transition-all group"
                >
                  <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase">
                    SENSEX
                  </div>
                  <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5 group-hover:text-emerald-600 transition-colors">
                    {marketData.sensex.price.toLocaleString()}
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    <span>+{marketData.sensex.changePercent}%</span>
                  </div>
                </div>

                {/* BANK NIFTY */}
                <div
                  onClick={() => setSelectedStockForChart(marketData.bankNifty)}
                  className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-rose-500/30 cursor-pointer transition-all group"
                >
                  <div className="text-[10px] font-black tracking-wider text-zinc-500 uppercase">
                    BANK NIFTY
                  </div>
                  <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5 group-hover:text-rose-600 transition-colors">
                    {marketData.bankNifty.price.toLocaleString()}
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                    <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                    <span>{marketData.bankNifty.changePercent}%</span>
                  </div>
                </div>
              </div>

              {/* Popular Stocks Section with Tab Switch */}
              <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/70">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    Popular Stocks
                  </span>
                  <div className="flex items-center space-x-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold">
                    <button
                      onClick={() => setStockTab('indian')}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        stockTab === 'indian'
                          ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                          : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                      Indian
                    </button>
                    <button
                      onClick={() => setStockTab('global')}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        stockTab === 'global'
                          ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                          : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                      Global Tech
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {displayedStocks.map((stock) => {
                    const isPos = stock.change >= 0;
                    return (
                      <div
                        key={stock.symbol}
                        onClick={() => setSelectedStockForChart(stock)}
                        className="flex items-center justify-between py-2 px-3 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all cursor-pointer group"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {stock.symbol}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-medium">
                              {stock.exchange}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[130px] sm:max-w-[160px]">
                            {stock.name}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-black text-zinc-900 dark:text-zinc-100">
                            {stock.currency === 'INR' ? '₹' : '$'}{stock.price.toLocaleString()}
                          </div>
                          <div
                            className={`flex items-center justify-end text-[10px] font-bold ${
                              isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isPos ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                            <span>
                              {isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Delayed Data notice & Search Trigger */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
          <div className="flex items-center space-x-1">
            <Info className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="text-[10px]">Market data may be delayed.</span>
          </div>

          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
            >
              <span>Search Stocks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Stock Details & Interactive Chart Modal */}
      <StockChartModal
        stock={selectedStockForChart}
        isOpen={Boolean(selectedStockForChart)}
        onClose={() => setSelectedStockForChart(null)}
      />
    </>
  );
};
