import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CloudSun, 
  TrendingUp, 
  Coins, 
  ArrowRightLeft, 
  Zap, 
  Search, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { WeatherCard } from './beyond-news/WeatherCard';
import { MarketCard } from './beyond-news/MarketCard';
import { MetalsCard } from './beyond-news/MetalsCard';
import { CurrencyCard } from './beyond-news/CurrencyCard';
import { CryptoCard } from './beyond-news/CryptoCard';
import { StockSearch } from './beyond-news/StockSearch';
import { MoreInfoCard } from './beyond-news/MoreInfoCard';

interface BeyondNewsProps {
  isStandalonePage?: boolean;
}

export const BeyondNews: React.FC<BeyondNewsProps> = ({ isStandalonePage = false }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'weather' | 'stocks' | 'metals' | 'currency' | 'crypto' | 'search'>('all');

  const scrollToSearch = () => {
    setActiveFilter('search');
    const el = document.getElementById('beyond-news-search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`w-full ${isStandalonePage ? 'py-8' : 'py-10 border-t border-zinc-200/80 dark:border-zinc-800/80 my-8'}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Essential Live Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
            Beyond News
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            More information you need, beyond the latest headlines. Real-time weather, financial markets, precious metals, exchange rates, and crypto radar.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center space-x-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'all', label: 'All Feeds', icon: Layers },
            { id: 'weather', label: 'Weather', icon: CloudSun },
            { id: 'stocks', label: 'Stocks', icon: TrendingUp },
            { id: 'metals', label: 'Gold & Silver', icon: Coins },
            { id: 'currency', label: 'Currency', icon: ArrowRightLeft },
            { id: 'crypto', label: 'Crypto', icon: Zap },
            { id: 'search', label: 'Search Equities', icon: Search }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="space-y-6">
        {/* Bento Grid with Cards */}
        {(activeFilter === 'all' || activeFilter === 'weather' || activeFilter === 'stocks' || activeFilter === 'metals' || activeFilter === 'currency' || activeFilter === 'crypto') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* 1. Weather Card */}
            {(activeFilter === 'all' || activeFilter === 'weather') && (
              <WeatherCard className={activeFilter === 'weather' ? 'md:col-span-2 lg:col-span-3' : ''} />
            )}

            {/* 2. Market Overview Card */}
            {(activeFilter === 'all' || activeFilter === 'stocks') && (
              <MarketCard
                onOpenSearch={scrollToSearch}
                className={activeFilter === 'stocks' ? 'md:col-span-2 lg:col-span-3' : ''}
              />
            )}

            {/* 3. Metals Card */}
            {(activeFilter === 'all' || activeFilter === 'metals') && (
              <MetalsCard className={activeFilter === 'metals' ? 'md:col-span-2 lg:col-span-3' : ''} />
            )}

            {/* 4. Currency Card */}
            {(activeFilter === 'all' || activeFilter === 'currency') && (
              <CurrencyCard className={activeFilter === 'currency' ? 'md:col-span-2 lg:col-span-3' : ''} />
            )}

            {/* 5. Crypto Card */}
            {(activeFilter === 'all' || activeFilter === 'crypto') && (
              <CryptoCard className={activeFilter === 'crypto' ? 'md:col-span-2 lg:col-span-3' : ''} />
            )}
          </div>
        )}

        {/* 6. Equities Search & Historical Charts */}
        {(activeFilter === 'all' || activeFilter === 'search' || activeFilter === 'stocks') && (
          <div id="beyond-news-search-section">
            <StockSearch />
          </div>
        )}

        {/* 7. Looking for more information? Resource links */}
        <MoreInfoCard />
      </div>
    </section>
  );
};
