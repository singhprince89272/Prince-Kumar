import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Info, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { CryptoQuote } from '../../types';
import { fetchLiveCryptoMarkets } from '../../services/cryptoApi';

interface CryptoCardProps {
  className?: string;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ className = '' }) => {
  const [cryptoList, setCryptoList] = useState<CryptoQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState<'USD' | 'INR'>('USD');

  const loadData = async () => {
    try {
      if (cryptoList.length === 0) setLoading(true);
      else setRefreshing(true);

      const quotes = await fetchLiveCryptoMarkets();
      setCryptoList(quotes);
    } catch (err) {
      console.error('Failed to load crypto markets:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
            <div className="p-2 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Crypto Radar
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  24/7
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-400">
                Top market cap digital assets
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Currency Toggle */}
            <div className="flex items-center space-x-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold">
              <button
                onClick={() => setDisplayCurrency('USD')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  displayCurrency === 'USD'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setDisplayCurrency('INR')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  displayCurrency === 'INR'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                INR
              </button>
            </div>

            <button
              onClick={loadData}
              disabled={refreshing}
              title="Refresh crypto rates"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-violet-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="py-6 space-y-2.5 animate-pulse">
            <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
          </div>
        )}

        {/* Content */}
        {!loading && cryptoList.length > 0 && (
          <div className="pt-4 space-y-2">
            {cryptoList.slice(0, 5).map((coin) => {
              const isPos = coin.changePercent24h >= 0;
              const formattedPrice =
                displayCurrency === 'USD'
                  ? `$${coin.priceUSD.toLocaleString()}`
                  : `₹${coin.priceINR.toLocaleString()}`;

              return (
                <div
                  key={coin.id}
                  className="flex items-center justify-between py-2 px-3 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    {coin.icon ? (
                      <img
                        src={coin.icon}
                        alt={coin.name}
                        className="w-6 h-6 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center font-bold text-[10px] text-violet-600">
                        {coin.symbol[0]}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {coin.name}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-zinc-900 dark:text-zinc-100">
                      {formattedPrice}
                    </div>
                    <div
                      className={`flex items-center justify-end text-[10px] font-bold ${
                        isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isPos ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                      <span>
                        {isPos ? '+' : ''}{coin.changePercent24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Card Footer with Disclaimer & External Source Link */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
        <div className="flex items-center space-x-1">
          <Info className="w-3 h-3 text-zinc-400 shrink-0" />
          <span className="text-[10px]">Cryptocurrency data for information only.</span>
        </div>
        <a
          href="https://coinmarketcap.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-violet-600 dark:text-violet-400 hover:underline font-bold"
        >
          <span>CoinMarketCap</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
