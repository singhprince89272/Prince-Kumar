import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  ArrowRightLeft, 
  Zap, 
  Search, 
  Layers, 
  ArrowRight, 
  BarChart3, 
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { MarketCard } from '../beyond-news/MarketCard';
import { MetalsCard } from '../beyond-news/MetalsCard';
import { CurrencyCard } from '../beyond-news/CurrencyCard';
import { CryptoCard } from '../beyond-news/CryptoCard';
import { StockSearch } from '../beyond-news/StockSearch';
import { useNews } from '../../context/NewsContext';
import { STOCK_QUOTES } from '../../data/stocksData';

export const HomeFinanceSection: React.FC = () => {
  const { navigateToMarkets } = useNews();
  const [activeFinanceTab, setActiveFinanceTab] = useState<'all' | 'stocks' | 'metals' | 'currency' | 'crypto'>('all');

  const scrollToSearch = () => {
    setActiveFinanceTab('stocks');
    const el = document.getElementById('home-finance-search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tickerIndices = [
    { symbol: 'NIFTY 50', price: '22,485.60', change: '+124.30 (+0.56%)', isUp: true },
    { symbol: 'SENSEX', price: '73,950.80', change: '+380.20 (+0.52%)', isUp: true },
    { symbol: 'NASDAQ', price: '18,120.40', change: '+94.15 (+0.52%)', isUp: true },
    { symbol: 'S&P 500', price: '5,310.25', change: '+18.60 (+0.35%)', isUp: true },
    { symbol: 'GOLD 24K', price: '₹72,450/10g', change: '+₹320 (+0.44%)', isUp: true },
    { symbol: 'SILVER', price: '₹84,200/kg', change: '+₹650 (+0.78%)', isUp: true },
    { symbol: 'USD / INR', price: '₹83.42', change: '-0.08 (-0.10%)', isUp: false },
    { symbol: 'BITCOIN', price: '$64,820', change: '+2.4%', isUp: true },
  ];

  return (
    <section id="home-finance-section" className="w-full my-10 py-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Financial & Market Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <span>📈 Finance, Stock Markets & Bullion Center</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Real-time equity indices (NSE / BSE / Wall St), bullion gold & silver rates, foreign exchange currency matrix, and crypto tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={navigateToMarkets}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>Explore Full Finance Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Market Ticker Tape */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-zinc-900 text-zinc-100 p-2.5 shadow-inner border border-zinc-800">
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-0.5">
          <span className="flex items-center space-x-1 text-[11px] font-black uppercase text-emerald-400 shrink-0 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
            LIVE TICKER
          </span>

          {tickerIndices.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 shrink-0 text-xs font-mono">
              <span className="font-bold text-zinc-300">{item.symbol}</span>
              <span className="text-white font-black">{item.price}</span>
              <span className={`text-[11px] font-bold ${item.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.change}
              </span>
              <span className="text-zinc-700 font-normal">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center space-x-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 overflow-x-auto no-scrollbar max-w-full mb-6">
        {[
          { id: 'all', label: 'All Finance Widgets', icon: Layers },
          { id: 'stocks', label: 'Stocks & Equities', icon: TrendingUp },
          { id: 'metals', label: 'Gold & Silver Bullion', icon: Coins },
          { id: 'currency', label: 'Currency Converter', icon: ArrowRightLeft },
          { id: 'crypto', label: 'Crypto Radar', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFinanceTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFinanceTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* 1. Stock Market Card */}
        {(activeFinanceTab === 'all' || activeFinanceTab === 'stocks') && (
          <MarketCard
            onOpenSearch={scrollToSearch}
            className={activeFinanceTab === 'stocks' ? 'md:col-span-2 lg:col-span-3' : ''}
          />
        )}

        {/* 2. Gold & Silver Bullion Card */}
        {(activeFinanceTab === 'all' || activeFinanceTab === 'metals') && (
          <MetalsCard
            className={activeFinanceTab === 'metals' ? 'md:col-span-2 lg:col-span-3' : ''}
          />
        )}

        {/* 3. Foreign Exchange Currency Card */}
        {(activeFinanceTab === 'all' || activeFinanceTab === 'currency') && (
          <CurrencyCard
            className={activeFinanceTab === 'currency' ? 'md:col-span-2 lg:col-span-3' : ''}
          />
        )}

        {/* 4. Crypto Radar Card */}
        {(activeFinanceTab === 'all' || activeFinanceTab === 'crypto') && (
          <CryptoCard
            className={activeFinanceTab === 'crypto' ? 'md:col-span-2 lg:col-span-3' : ''}
          />
        )}
      </div>

      {/* Interactive Stock Search & Technical Charts */}
      {(activeFinanceTab === 'all' || activeFinanceTab === 'stocks') && (
        <div id="home-finance-search-section" className="mt-6">
          <StockSearch />
        </div>
      )}
    </section>
  );
};
