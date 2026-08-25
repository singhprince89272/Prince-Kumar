import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  Globe, 
  Zap, 
  RefreshCw,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Coins,
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { StockQuote, Article } from '../types';
import { STOCK_QUOTES, MARKET_NEWS_ARTICLES } from '../data/stocksData';
import { useNews } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';
import { MetalsCard } from '../components/beyond-news/MetalsCard';
import { CurrencyCard } from '../components/beyond-news/CurrencyCard';
import { CryptoCard } from '../components/beyond-news/CryptoCard';
import { StockSearch } from '../components/beyond-news/StockSearch';
import { StockChartModal } from '../components/beyond-news/StockChartModal';

interface StockMarketsProps {
  onShare: (article: Article) => void;
}

export const StockMarkets: React.FC<StockMarketsProps> = ({ onShare }) => {
  const { showToast } = useNews();
  const [activeTab, setActiveTab] = useState<'all' | 'index' | 'indian' | 'tech'>('all');
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStockForChart, setSelectedStockForChart] = useState<StockQuote | null>(null);

  const filteredStocks = STOCK_QUOTES.filter((s) => {
    const matchesTab = activeTab === 'all' || s.category === activeTab;
    const matchesSearch =
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.exchange.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Market quotes updated with live tick feeds', 'success');
    }, 600);
  };

  const nifty = STOCK_QUOTES.find(s => s.symbol === 'NIFTY 50');
  const sensex = STOCK_QUOTES.find(s => s.symbol === 'SENSEX');
  const nasdaq = STOCK_QUOTES.find(s => s.symbol === 'NASDAQ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500/10 to-teal-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/20 shadow-2xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
              Finance & Stock Markets Center
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Tickers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Real-time equity benchmarks, Indian NSE/BSE large-caps, precious metals bullion, currency forex matrix, and crypto assets.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Live Quotes</span>
        </motion.button>
      </div>

      {/* Index Spotlight Banners (NIFTY, SENSEX, NASDAQ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[nifty, sensex, nasdaq].filter(Boolean).map((index) => {
          const isUp = (index?.change || 0) >= 0;
          return (
            <div
              key={index!.symbol}
              onClick={() => setSelectedStockForChart(index!)}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden cursor-pointer hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-zinc-400">
                  {index!.exchange} Benchmark
                </span>
                <span className={`inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-black ${
                  isUp 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                }`}>
                  {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{isUp ? '+' : ''}{index!.changePercent.toFixed(2)}%</span>
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {index!.price.toLocaleString()}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                <span>{index!.name}</span>
                <span className={isUp ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                  {isUp ? '+' : ''}{index!.change.toFixed(2)} {index!.currency}
                </span>
              </div>

              {/* Sparkline visualization */}
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-end justify-between h-8 gap-1">
                {index!.sparkline.map((val, idx) => {
                  const min = Math.min(...index!.sparkline);
                  const max = Math.max(...index!.sparkline);
                  const heightPercent = Math.max(20, Math.round(((val - min) / (max - min || 1)) * 100));
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-t-xs transition-all ${
                        isUp ? 'bg-emerald-500/40 hover:bg-emerald-500' : 'bg-rose-500/40 hover:bg-rose-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Stock Screener */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Instruments' },
              { id: 'index', label: '📈 Major Indices' },
              { id: 'indian', label: '🇮🇳 Indian Equities (NSE/BSE)' },
              { id: 'tech', label: '💻 Global Tech Giants' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stock symbol or name..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Stock Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStocks.map((stock) => {
            const isUp = stock.change >= 0;
            return (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStockForChart(stock)}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs hover:border-emerald-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 transition-colors">
                      {stock.symbol}
                    </span>
                    <span className="text-2xs text-zinc-400 block truncate max-w-[150px]">
                      {stock.name}
                    </span>
                  </div>
                  <span className={`inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-md text-xs font-bold ${
                    isUp 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                  }`}>
                    {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>

                <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 my-1">
                  {stock.currency === 'INR' ? '₹' : '$'}{stock.price.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-2 text-2xs text-zinc-500 dark:text-zinc-400 pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className="text-zinc-400 block">24h High/Low</span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">
                      {stock.high24h} / {stock.low24h}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Market Cap</span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">
                      {stock.marketCap}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bullion, Forex Currency & Crypto Multi-Asset Hub */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            Bullion, Currency Converter & Crypto Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <MetalsCard />
          <CurrencyCard />
          <CryptoCard />
        </div>
      </section>

      {/* Equity Technical Charting & Analysis */}
      <section>
        <StockSearch />
      </section>

      {/* Market News Section */}
      <section>
        <div className="flex items-center space-x-2 mb-5">
          <Activity className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
            Market News & Earnings Wire
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKET_NEWS_ARTICLES.map((article) => (
            <NewsCard key={article.id} article={article} onShare={onShare} />
          ))}
        </div>
      </section>

      {/* Modal for Chart View */}
      {selectedStockForChart && (
        <StockChartModal
          stock={selectedStockForChart}
          isOpen={!!selectedStockForChart}
          onClose={() => setSelectedStockForChart(null)}
        />
      )}
    </div>
  );
};
