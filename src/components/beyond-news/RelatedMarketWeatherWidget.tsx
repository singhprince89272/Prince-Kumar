import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  CloudSun, 
  ArrowRight, 
  BarChart2, 
  Sparkles,
  MapPin,
  Coins
} from 'lucide-react';
import { Article, StockQuote } from '../../types';
import { ALL_STOCKS } from '../../services/marketApi';
import { useNews } from '../../context/NewsContext';
import { StockChartModal } from './StockChartModal';

interface RelatedMarketWeatherWidgetProps {
  article: Article;
}

export const RelatedMarketWeatherWidget: React.FC<RelatedMarketWeatherWidgetProps> = ({ article }) => {
  const { navigateToBeyondNews, navigateToWeather, navigateToMarkets } = useNews();
  const [selectedStockForChart, setSelectedStockForChart] = useState<StockQuote | null>(null);

  if (!article) return null;

  const contentToScan = `${article.title || ''} ${article.description || ''} ${article.content || ''}`.toLowerCase();

  // Scan for matched stocks
  const matchedStocks: StockQuote[] = [];
  for (const stock of ALL_STOCKS) {
    if (stock.category === 'index') continue;
    const symMatch = contentToScan.includes(stock.symbol.toLowerCase());
    const nameKeywords = stock.name.toLowerCase().split(' ').filter(w => w.length > 3);
    const nameMatch = nameKeywords.some(kw => contentToScan.includes(kw));

    if (symMatch || nameMatch) {
      if (!matchedStocks.find(s => s.symbol === stock.symbol)) {
        matchedStocks.push(stock);
      }
    }
  }

  // Scan for matched weather keywords & cities
  const weatherKeywords = ['weather', 'monsoon', 'rain', 'rainfall', 'storm', 'heatwave', 'temperature', 'flood', 'cyclone', 'climate'];
  const cityKeywords: Record<string, string> = {
    mumbai: 'Mumbai',
    delhi: 'New Delhi',
    bhopal: 'Bhopal',
    bengaluru: 'Bengaluru',
    bangalore: 'Bengaluru',
    london: 'London',
    tokyo: 'Tokyo',
    dubai: 'Dubai'
  };

  const hasWeatherTopic = weatherKeywords.some(kw => contentToScan.includes(kw));
  let matchedCity: string | null = null;
  for (const [key, cityName] of Object.entries(cityKeywords)) {
    if (contentToScan.includes(key)) {
      matchedCity = cityName;
      break;
    }
  }

  // If no match found, don't display
  if (matchedStocks.length === 0 && !hasWeatherTopic && !matchedCity) {
    return null;
  }

  return (
    <>
      <div className="my-6 p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/90 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Contextual Intelligence & Live Data
            </span>
          </div>

          <button
            onClick={navigateToBeyondNews}
            className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Beyond News Hub</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Matched Stocks */}
          {matchedStocks.slice(0, 2).map((stock) => {
            const isPos = stock.change >= 0;
            return (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStockForChart(stock)}
                className="p-3 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-rose-500/40 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 transition-colors">
                      {stock.symbol}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase">
                      {stock.exchange}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 line-clamp-1">
                    {stock.name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100">
                    {stock.currency === 'INR' ? '₹' : '$'}{stock.price.toLocaleString()}
                  </div>
                  <div
                    className={`flex items-center justify-end text-[10px] font-bold ${
                      isPos ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPos ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                    <span>{isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Matched Weather */}
          {(hasWeatherTopic || matchedCity) && (
            <div
              onClick={navigateToWeather}
              className="p-3 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-sky-500/40 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20">
                  <CloudSun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 transition-colors">
                    {matchedCity ? `Live Weather: ${matchedCity}` : 'Live Weather Outlook'}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Forecast & real-time radar data
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 flex items-center space-x-0.5">
                <span>View</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          )}
        </div>
      </div>

      <StockChartModal
        stock={selectedStockForChart}
        isOpen={Boolean(selectedStockForChart)}
        onClose={() => setSelectedStockForChart(null)}
      />
    </>
  );
};
