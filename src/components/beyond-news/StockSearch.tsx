import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  BarChart2, 
  X,
  Filter,
  Check
} from 'lucide-react';
import { StockQuote } from '../../types';
import { searchStocks, ALL_STOCKS } from '../../services/marketApi';
import { StockChartModal } from './StockChartModal';

export const StockSearch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'indian' | 'tech' | 'index'>('all');
  const [selectedStockForChart, setSelectedStockForChart] = useState<StockQuote | null>(null);

  const filteredResults = searchStocks(searchTerm).filter((stock) => {
    if (selectedCategory === 'all') return true;
    return stock.category === selectedCategory;
  });

  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-6 shadow-sm ${className}`}>
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Search className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
              Global & Indian Equities Search
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Instant valuation metrics, price trends, and historical charting
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'All Equities' },
              { id: 'indian', label: 'NSE / BSE' },
              { id: 'tech', label: 'US Tech' },
              { id: 'index', label: 'Indices' }
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Field with Instant Previews */}
      <div className="pt-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company or ticker (e.g. Reliance, TCS, Apple, NVDA, SENSEX)..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-10 pr-10 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-rose-500 outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center space-x-2 mt-2.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-zinc-400 shrink-0">Popular:</span>
          {['Reliance', 'TCS', 'HDFC Bank', 'Infosys', 'Apple', 'NVIDIA', 'Tesla', 'Sensex'].map((s) => (
            <button
              key={s}
              onClick={() => setSearchTerm(s)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-400 hover:text-rose-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Grid */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredResults.length === 0 ? (
          <div className="col-span-full py-8 text-center text-zinc-400 text-xs">
            No equity found matching "{searchTerm}". Try searching for popular tickers like RELIANCE, AAPL, or TCS.
          </div>
        ) : (
          filteredResults.map((stock) => {
            const isPos = stock.change >= 0;
            return (
              <motion.div
                key={stock.symbol}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedStockForChart(stock)}
                className="p-3.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-rose-500/40 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          {stock.symbol}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
                          {stock.exchange}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 line-clamp-1 mt-0.5">
                        {stock.name}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-zinc-900 dark:text-zinc-100">
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
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-200/40 dark:border-zinc-800/40 text-[10px] text-zinc-400 font-medium">
                  <span>Cap: {stock.marketCap}</span>
                  <span className="inline-flex items-center space-x-1 text-rose-600 dark:text-rose-400 group-hover:underline font-bold">
                    <span>View Chart</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Chart Modal */}
      <StockChartModal
        stock={selectedStockForChart}
        isOpen={Boolean(selectedStockForChart)}
        onClose={() => setSelectedStockForChart(null)}
      />
    </div>
  );
};
