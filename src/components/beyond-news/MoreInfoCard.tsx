import React from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Compass, 
  CloudSun, 
  TrendingUp, 
  Coins, 
  ArrowRightLeft, 
  Zap, 
  ShieldCheck,
  Globe2
} from 'lucide-react';

export const MoreInfoCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const resourceLinks = [
    {
      category: 'Weather & Radar',
      icon: CloudSun,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      title: 'Get detailed weather information',
      description: 'Satellite imagery, Doppler radar & IMD / AccuWeather forecasts',
      links: [
        { name: 'AccuWeather Global Radar', url: 'https://www.accuweather.com/' },
        { name: 'India Meteorological Dept (IMD)', url: 'https://mausam.imd.gov.in/' }
      ]
    },
    {
      category: 'Stock Market & Securities',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      title: 'View detailed market data & filings',
      description: 'Official exchange books, corporate filings & Yahoo Finance',
      links: [
        { name: 'National Stock Exchange (NSE)', url: 'https://www.nseindia.com/' },
        { name: 'Yahoo Finance Global Markets', url: 'https://finance.yahoo.com/' }
      ]
    },
    {
      category: 'Bullion & Hallmark Rates',
      icon: Coins,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      title: 'Check latest gold prices & hallmark rates',
      description: 'India Bullion & Jewellers Association (IBJA) & GoodReturns',
      links: [
        { name: 'IBJA Official Bullion Rates', url: 'https://ibjarates.com/' },
        { name: 'GoodReturns Hallmark Gold', url: 'https://www.goodreturns.in/gold-rates/' }
      ]
    },
    {
      category: 'Forex & Reserve Currency',
      icon: ArrowRightLeft,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      title: 'Check live currency exchange rates',
      description: 'Central bank benchmark reference rates & XE Currency tables',
      links: [
        { name: 'XE Currency Real-Time Converter', url: 'https://www.xe.com/currencyconverter/' },
        { name: 'Reserve Bank of India (RBI Forex)', url: 'https://www.rbi.org.in/' }
      ]
    },
    {
      category: 'Crypto & Digital Assets',
      icon: Zap,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      title: 'Explore global cryptocurrency tracking',
      description: 'On-chain volumes, coin rankings & liquidity stats',
      links: [
        { name: 'CoinMarketCap Analytics', url: 'https://coinmarketcap.com/' },
        { name: 'CoinGecko Global Feed', url: 'https://www.coingecko.com/' }
      ]
    }
  ];

  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-7 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-50 font-display">
              Looking for more information?
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Verified third-party portals, exchange feeds & official sources
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[11px] font-bold text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Verified Reference Links</span>
        </div>
      </div>

      {/* External Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        {resourceLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="p-4 bg-zinc-50/70 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-xl border ${item.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    {item.category}
                  </span>
                </div>

                <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-2.5">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Direct clickable links */}
              <div className="pt-3 mt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 space-y-1.5">
                {item.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline transition-colors group"
                  >
                    <span className="truncate pr-2">{link.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
