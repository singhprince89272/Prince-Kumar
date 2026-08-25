import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  BarChart3, 
  Clock, 
  Calendar,
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';
import { StockQuote } from '../../types';
import { generateStockHistoricalData, StockHistoricalDataPoint } from '../../services/marketApi';

interface StockChartModalProps {
  stock: StockQuote | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StockChartModal: React.FC<StockChartModalProps> = ({ stock, isOpen, onClose }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '6M' | '1Y'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<StockHistoricalDataPoint | null>(null);

  if (!isOpen || !stock) return null;

  const isPositive = stock.change >= 0;
  const historyData = generateStockHistoricalData(stock, timeframe);

  const prices = historyData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // SVG Chart Dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingTop = 25;
  const paddingBottom = 30;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const chartWidth = svgWidth - paddingX * 2;

  // Compute SVG polyline points
  const pointsString = historyData
    .map((d, i) => {
      const x = paddingX + (i / (historyData.length - 1)) * chartWidth;
      const normalizedY = (d.price - minPrice) / priceRange;
      const y = paddingTop + (1 - normalizedY) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  // Compute SVG gradient fill area
  const areaString = `${pointsString} ${paddingX + chartWidth},${svgHeight - paddingBottom} ${paddingX},${svgHeight - paddingBottom}`;

  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  const fillColor = isPositive ? 'url(#greenGradient)' : 'url(#redGradient)';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {stock.exchange}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {stock.category === 'index' ? 'Benchmark Index' : 'Equity Stock'}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  Live Feed
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50">
                {stock.name} ({stock.symbol})
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price Header & Interactive Stat Bar */}
          <div className="p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Current Market Price
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50">
                    {stock.currency === 'INR' ? '₹' : '$'}
                    {hoveredPoint ? hoveredPoint.price.toLocaleString() : stock.price.toLocaleString()}
                  </span>
                  <div
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-black ${
                      isPositive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>
                      {isPositive ? '+' : ''}
                      {stock.change.toFixed(2)} ({isPositive ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeframe Switcher Tabs */}
              <div className="flex items-center space-x-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                {(['1D', '1W', '1M', '6M', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setTimeframe(tf);
                      setHoveredPoint(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      timeframe === tf
                        ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="relative bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-3 overflow-hidden">
              {hoveredPoint && (
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs space-y-0.5 z-10">
                  <div className="text-zinc-400 text-[10px] uppercase font-bold">{hoveredPoint.date}</div>
                  <div className="font-black text-zinc-900 dark:text-zinc-100">
                    {stock.currency === 'INR' ? '₹' : '$'}{hoveredPoint.price.toLocaleString()}
                  </div>
                </div>
              )}

              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-44 sm:h-52 overflow-visible"
              >
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                <line
                  x1={paddingX}
                  y1={paddingTop}
                  x2={paddingX + chartWidth}
                  y2={paddingTop}
                  stroke="currentColor"
                  className="text-zinc-200 dark:text-zinc-800"
                  strokeDasharray="4 4"
                />
                <line
                  x1={paddingX}
                  y1={paddingTop + chartHeight / 2}
                  x2={paddingX + chartWidth}
                  y2={paddingTop + chartHeight / 2}
                  stroke="currentColor"
                  className="text-zinc-200 dark:text-zinc-800"
                  strokeDasharray="4 4"
                />
                <line
                  x1={paddingX}
                  y1={svgHeight - paddingBottom}
                  x2={paddingX + chartWidth}
                  y2={svgHeight - paddingBottom}
                  stroke="currentColor"
                  className="text-zinc-200 dark:text-zinc-800"
                />

                {/* Area Fill */}
                <polygon points={areaString} fill={fillColor} />

                {/* Main Stroke Line */}
                <polyline
                  points={pointsString}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points on hover */}
                {historyData.map((d, i) => {
                  const x = paddingX + (i / (historyData.length - 1)) * chartWidth;
                  const normalizedY = (d.price - minPrice) / priceRange;
                  const y = paddingTop + (1 - normalizedY) * chartHeight;
                  const isCurrent = hoveredPoint?.date === d.date;

                  return (
                    <g key={i} className="cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent ? 6 : 4}
                        fill={isCurrent ? strokeColor : '#ffffff'}
                        stroke={strokeColor}
                        strokeWidth={isCurrent ? 3 : 2}
                        onMouseEnter={() => setHoveredPoint(d)}
                        className="transition-all"
                      />
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {historyData.length > 0 && (
                  <>
                    <text
                      x={paddingX}
                      y={svgHeight - 10}
                      fontSize="10"
                      fill="currentColor"
                      className="text-zinc-400"
                    >
                      {historyData[0].date}
                    </text>
                    <text
                      x={paddingX + chartWidth / 2}
                      y={svgHeight - 10}
                      fontSize="10"
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-zinc-400"
                    >
                      {historyData[Math.floor(historyData.length / 2)].date}
                    </text>
                    <text
                      x={paddingX + chartWidth}
                      y={svgHeight - 10}
                      fontSize="10"
                      textAnchor="end"
                      fill="currentColor"
                      className="text-zinc-400"
                    >
                      {historyData[historyData.length - 1].date}
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Fundamentals & 24h Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">24H High</span>
                <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {stock.currency === 'INR' ? '₹' : '$'}{stock.high24h.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">24H Low</span>
                <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {stock.currency === 'INR' ? '₹' : '$'}{stock.low24h.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Market Cap</span>
                <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {stock.marketCap}
                </div>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">P/E Ratio</span>
                <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {stock.peRatio}x
                </div>
              </div>
            </div>

            {/* Disclaimer & External Search link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400">
              <div className="flex items-center space-x-1.5 text-zinc-400">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Market data may be delayed by up to 15 minutes.</span>
              </div>
              <a
                href={
                  stock.exchange === 'NSE' || stock.exchange === 'BSE'
                    ? `https://www.google.com/finance/quote/${stock.symbol}:${stock.exchange}`
                    : `https://www.google.com/finance/quote/${stock.symbol}:NASDAQ`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-rose-600 dark:text-rose-400 hover:underline font-bold"
              >
                <span>Full Google Finance Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
