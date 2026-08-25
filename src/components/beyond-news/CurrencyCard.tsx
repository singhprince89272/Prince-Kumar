import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRightLeft, 
  RefreshCw, 
  DollarSign, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { 
  fetchLiveExchangeRates, 
  calculateConversion, 
  ExchangeRatesData, 
  CURRENCY_METADATA 
} from '../../services/currencyApi';

interface CurrencyCardProps {
  className?: string;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ className = '' }) => {
  const [exchangeData, setExchangeData] = useState<ExchangeRatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Converter state
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');

  const loadData = async () => {
    try {
      if (!exchangeData) setLoading(true);
      else setRefreshing(true);

      const data = await fetchLiveExchangeRates();
      setExchangeData(data);
    } catch (err) {
      console.error('Failed to load currency rates:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const convertedValue = exchangeData
    ? calculateConversion(amount, fromCurrency, toCurrency, exchangeData.rates)
    : 0;

  const keyPairs = exchangeData?.ratesList.slice(0, 4) || [];

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
            <div className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Currency Exchange
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Live Forex
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-400">
                Real-time foreign exchange conversions
              </p>
            </div>
          </div>

          <button
            onClick={loadData}
            disabled={refreshing}
            title="Refresh exchange rates"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-indigo-500' : ''}`} />
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="py-6 space-y-3 animate-pulse">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
              <div className="h-14 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
            </div>
            <div className="h-24 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl" />
          </div>
        )}

        {/* Content */}
        {!loading && exchangeData && (
          <div className="pt-4 space-y-4">
            {/* Quick Conversion Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
              {keyPairs.map((item) => (
                <div
                  key={item.code}
                  className="p-2.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center space-x-1">
                      <span>{item.flag}</span>
                      <span>{item.code} → INR</span>
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-100 mt-1">
                    {item.symbol}1 = <span className="text-indigo-600 dark:text-indigo-400">₹{item.rateToINR}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Calculator Section */}
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                Instant Currency Converter
              </span>

              {/* Amount Input and Currency Selectors */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount === 0 ? '' : amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-500"
                    placeholder="Amount"
                  />
                </div>

                <div className="flex items-center space-x-1.5">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-2.5 text-xs font-black text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                  >
                    {Object.keys(CURRENCY_METADATA).map((code) => (
                      <option key={code} value={code}>
                        {CURRENCY_METADATA[code].flag} {code}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleSwap}
                    title="Swap Currencies"
                    className="p-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
                  </button>

                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-2.5 text-xs font-black text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                  >
                    {Object.keys(CURRENCY_METADATA).map((code) => (
                      <option key={code} value={code}>
                        {CURRENCY_METADATA[code].flag} {code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Result Pill */}
              <div className="flex items-center justify-between p-2.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                <span className="text-xs text-indigo-900/80 dark:text-indigo-300 font-medium">
                  {amount} {fromCurrency} =
                </span>
                <span className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 font-display">
                  {CURRENCY_METADATA[toCurrency]?.symbol || ''} {convertedValue.toLocaleString()} {toCurrency}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer with Last Updated & External Source Link */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
        <span>Last updated: {exchangeData?.lastUpdated || 'Today'}</span>
        <a
          href="https://www.xe.com/currencyconverter/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
        >
          <span>XE Live Rates</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
