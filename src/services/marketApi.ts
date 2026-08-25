import { StockQuote } from '../types';

export interface MarketIndexOverview {
  nifty50: StockQuote;
  sensex: StockQuote;
  bankNifty: StockQuote;
  nasdaq: StockQuote;
  lastUpdated: string;
}

export interface StockHistoricalDataPoint {
  date: string;
  price: number;
  volume: number;
}

// Master list of searchable stocks
export const ALL_STOCKS: StockQuote[] = [
  // Indices
  {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50 National Stock Exchange',
    price: 25420.80,
    change: 182.40,
    changePercent: 0.72,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 25480.00,
    low24h: 25290.50,
    volume: '284.5M',
    marketCap: '₹340.2T',
    peRatio: 22.8,
    sparkline: [25290, 25340, 25310, 25390, 25370, 25400, 25420.8],
    category: 'index'
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX 30 Benchmark',
    price: 83540.20,
    change: 508.60,
    changePercent: 0.61,
    currency: 'INR',
    exchange: 'BSE',
    high24h: 83690.00,
    low24h: 83120.00,
    volume: '142.1M',
    marketCap: '₹415.8T',
    peRatio: 24.1,
    sparkline: [83120, 83280, 83200, 83450, 83390, 83510, 83540.2],
    category: 'index'
  },
  {
    symbol: 'BANK NIFTY',
    name: 'NIFTY Bank Banking Sector Index',
    price: 56120.40,
    change: -102.30,
    changePercent: -0.18,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 56350.00,
    low24h: 55980.00,
    volume: '98.4M',
    marketCap: '₹120.5T',
    peRatio: 16.4,
    sparkline: [56280, 56320, 56190, 56050, 56180, 56090, 56120.4],
    category: 'index'
  },
  {
    symbol: 'NASDAQ',
    name: 'NASDAQ Composite Index',
    price: 19840.50,
    change: 145.20,
    changePercent: 0.74,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 19910.00,
    low24h: 19720.00,
    volume: '840.2M',
    marketCap: '$28.4T',
    peRatio: 31.2,
    sparkline: [19720, 19780, 19810, 19790, 19830, 19840.5],
    category: 'index'
  },

  // Indian Popular Stocks
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: 2984.50,
    change: 35.40,
    changePercent: 1.20,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 2998.00,
    low24h: 2950.00,
    volume: '7.8M',
    marketCap: '₹20.19T',
    peRatio: 28.4,
    sparkline: [2950, 2962, 2955, 2975, 2980, 2984.5],
    category: 'indian'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 4120.00,
    change: -16.50,
    changePercent: -0.40,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 4160.00,
    low24h: 4105.00,
    volume: '2.1M',
    marketCap: '₹14.91T',
    peRatio: 31.8,
    sparkline: [4150, 4135, 4140, 4115, 4128, 4120],
    category: 'indian'
  },
  {
    symbol: 'HDFC BANK',
    name: 'HDFC Bank Ltd',
    price: 1745.20,
    change: 13.80,
    changePercent: 0.80,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 1754.00,
    low24h: 1732.00,
    volume: '11.4M',
    marketCap: '₹13.28T',
    peRatio: 18.6,
    sparkline: [1732, 1738, 1742, 1740, 1748, 1745.2],
    category: 'indian'
  },
  {
    symbol: 'INFOSYS',
    name: 'Infosys Ltd',
    price: 1890.60,
    change: 9.40,
    changePercent: 0.50,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 1905.00,
    low24h: 1878.00,
    volume: '4.9M',
    marketCap: '₹7.85T',
    peRatio: 27.2,
    sparkline: [1878, 1885, 1882, 1894, 1888, 1890.6],
    category: 'indian'
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    price: 1260.40,
    change: 14.20,
    changePercent: 1.14,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 1268.00,
    low24h: 1245.00,
    volume: '8.2M',
    marketCap: '₹8.87T',
    peRatio: 17.9,
    sparkline: [1245, 1252, 1258, 1255, 1264, 1260.4],
    category: 'indian'
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Passenger & EV Ltd',
    price: 1045.80,
    change: 22.40,
    changePercent: 2.19,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 1054.00,
    low24h: 1022.00,
    volume: '9.4M',
    marketCap: '₹3.86T',
    peRatio: 14.8,
    sparkline: [1022, 1030, 1038, 1042, 1048, 1045.8],
    category: 'indian'
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Telecom',
    price: 1680.30,
    change: 18.50,
    changePercent: 1.11,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 1692.00,
    low24h: 1660.00,
    volume: '4.5M',
    marketCap: '₹9.65T',
    peRatio: 52.4,
    sparkline: [1660, 1668, 1675, 1672, 1684, 1680.3],
    category: 'indian'
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited Conglomerate',
    price: 492.10,
    change: -2.30,
    changePercent: -0.47,
    currency: 'INR',
    exchange: 'NSE',
    high24h: 496.00,
    low24h: 490.50,
    volume: '6.7M',
    marketCap: '₹6.15T',
    peRatio: 29.1,
    sparkline: [495, 494, 493, 491, 493, 492.1],
    category: 'indian'
  },

  // Global Tech Giants
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 242.80,
    change: 3.10,
    changePercent: 1.29,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 244.50,
    low24h: 239.80,
    volume: '48.2M',
    marketCap: '$3.68T',
    peRatio: 34.2,
    sparkline: [239.8, 241.2, 240.5, 243.0, 242.1, 242.8],
    category: 'tech'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation AI Hardware',
    price: 138.40,
    change: 4.80,
    changePercent: 3.59,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 140.20,
    low24h: 134.10,
    volume: '82.5M',
    marketCap: '$3.41T',
    peRatio: 58.4,
    sparkline: [134.1, 135.8, 137.2, 136.9, 139.1, 138.4],
    category: 'tech'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 428.60,
    change: -1.80,
    changePercent: -0.42,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 432.00,
    low24h: 426.50,
    volume: '18.9M',
    marketCap: '$3.18T',
    peRatio: 33.1,
    sparkline: [431, 429, 430, 427, 429, 428.6],
    category: 'tech'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc. Automotive & AI',
    price: 342.10,
    change: 14.50,
    changePercent: 4.43,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 348.00,
    low24h: 328.50,
    volume: '64.2M',
    marketCap: '$1.09T',
    peRatio: 88.6,
    sparkline: [328.5, 334.0, 338.2, 336.5, 345.0, 342.1],
    category: 'tech'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. (Google)',
    price: 184.20,
    change: 2.10,
    changePercent: 1.15,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 186.00,
    low24h: 182.40,
    volume: '22.4M',
    marketCap: '$2.28T',
    peRatio: 23.8,
    sparkline: [182.4, 183.5, 184.8, 183.9, 185.1, 184.2],
    category: 'tech'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 218.40,
    change: 1.90,
    changePercent: 0.88,
    currency: 'USD',
    exchange: 'NASDAQ',
    high24h: 220.50,
    low24h: 216.20,
    volume: '26.8M',
    marketCap: '$2.30T',
    peRatio: 42.1,
    sparkline: [216.2, 217.4, 218.8, 217.9, 219.0, 218.4],
    category: 'tech'
  }
];

export async function fetchMarketOverview(): Promise<MarketIndexOverview> {
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const nifty50 = ALL_STOCKS.find((s) => s.symbol === 'NIFTY 50')!;
  const sensex = ALL_STOCKS.find((s) => s.symbol === 'SENSEX')!;
  const bankNifty = ALL_STOCKS.find((s) => s.symbol === 'BANK NIFTY')!;
  const nasdaq = ALL_STOCKS.find((s) => s.symbol === 'NASDAQ')!;

  return {
    nifty50,
    sensex,
    bankNifty,
    nasdaq,
    lastUpdated: timeStr
  };
}

export function searchStocks(query: string): StockQuote[] {
  if (!query || query.trim() === '') {
    return ALL_STOCKS.filter((s) => s.category !== 'index');
  }

  const q = query.toLowerCase().trim();
  return ALL_STOCKS.filter(
    (s) =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.exchange.toLowerCase().includes(q)
  );
}

export function getStockBySymbol(symbol: string): StockQuote | undefined {
  const norm = symbol.toUpperCase().trim();
  return ALL_STOCKS.find((s) => s.symbol.toUpperCase() === norm);
}

// Generate realistic historical data points for line chart
export function generateStockHistoricalData(
  stock: StockQuote,
  timeframe: '1D' | '1W' | '1M' | '6M' | '1Y'
): StockHistoricalDataPoint[] {
  const basePrice = stock.price;
  const points: StockHistoricalDataPoint[] = [];

  let count = 24; // default points
  let volatility = 0.008;

  switch (timeframe) {
    case '1D':
      count = 20;
      volatility = 0.004;
      for (let i = 0; i < count; i++) {
        const hour = 9 + Math.floor(i * 0.35);
        const min = (i * 20) % 60;
        const timeLabel = `${hour}:${min < 10 ? '0' : ''}${min}`;
        const offsetRatio = (i - count) * (stock.changePercent / (count * 100));
        const noise = (Math.sin(i * 1.5) + (i % 3 - 1) * 0.5) * volatility * basePrice;
        const price = Number((basePrice - stock.change + offsetRatio * basePrice + noise).toFixed(2));
        points.push({
          date: timeLabel,
          price: Math.max(1, price),
          volume: Math.floor(10000 + Math.random() * 50000)
        });
      }
      points[points.length - 1].price = basePrice;
      break;

    case '1W':
      count = 7;
      volatility = 0.015;
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
      for (let i = 0; i < count; i++) {
        const factor = 1 - ((count - 1 - i) * (stock.changePercent / 100) * 0.8) + (Math.sin(i) * 0.01);
        points.push({
          date: days[i],
          price: Number((basePrice * factor).toFixed(2)),
          volume: Math.floor(200000 + Math.random() * 500000)
        });
      }
      points[points.length - 1].price = basePrice;
      break;

    case '1M':
      count = 15;
      volatility = 0.03;
      for (let i = 0; i < count; i++) {
        const dayNum = i * 2 + 1;
        const factor = 1 - ((count - 1 - i) * 0.006) + (Math.cos(i * 0.8) * 0.015);
        points.push({
          date: `Day ${dayNum}`,
          price: Number((basePrice * factor).toFixed(2)),
          volume: Math.floor(300000 + Math.random() * 600000)
        });
      }
      points[points.length - 1].price = basePrice;
      break;

    case '6M':
      count = 12;
      const months6 = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Now'];
      for (let i = 0; i < count; i++) {
        const factor = 0.88 + (i / count) * 0.14 + (Math.sin(i * 0.9) * 0.025);
        points.push({
          date: months6[i] || `M${i + 1}`,
          price: Number((basePrice * factor).toFixed(2)),
          volume: Math.floor(1000000 + Math.random() * 2000000)
        });
      }
      points[points.length - 1].price = basePrice;
      break;

    case '1Y':
      count = 12;
      const months12 = ['Q1', 'Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'Latest'];
      for (let i = 0; i < count; i++) {
        const factor = 0.78 + (i / count) * 0.24 + (Math.cos(i * 0.7) * 0.03);
        points.push({
          date: months12[i] || `Q${i + 1}`,
          price: Number((basePrice * factor).toFixed(2)),
          volume: Math.floor(1500000 + Math.random() * 3000000)
        });
      }
      points[points.length - 1].price = basePrice;
      break;
  }

  return points;
}
