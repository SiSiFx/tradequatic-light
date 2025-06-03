// Types pour l'utilisateur et l'authentification
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  strategiesUsed: number;
  maxStrategies: number;
  createdAt: string;
  updatedAt: string;
}

// Types pour les stratégies de trading
export interface Strategy {
  id: string;
  name: string;
  description: string;
  pineScript: string;
  parameters: StrategyParameter[];
  backtest?: BacktestResult;
  author: {
    id: string;
    name: string;
  };
  isPublic: boolean;
  price?: number;
  downloads: number;
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StrategyParameter {
  name: string;
  type: 'number' | 'boolean' | 'string' | 'select';
  defaultValue: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  description: string;
}

// Types pour le backtesting
export interface BacktestConfig {
  strategyId: string;
  symbol: string;
  timeframe: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  commission: number;
  slippage: number;
  parameters?: Record<string, any>;
}

export interface BacktestResult {
  id: string;
  strategyId: string;
  config: BacktestConfig;
  performance: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    avgWinningTrade: number;
    avgLosingTrade: number;
  };
  equity: Array<{
    date: string;
    value: number;
  }>;
  trades: Trade[];
  createdAt: string;
}

export interface Trade {
  id: string;
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  side: 'long' | 'short';
  pnl: number;
  pnlPercent: number;
  commission: number;
}

// Types pour l'IA
export interface AIRequest {
  prompt: string;
  context?: {
    market?: string;
    timeframe?: string;
    indicators?: string[];
    riskLevel?: 'low' | 'medium' | 'high';
  };
}

export interface AIResponse {
  strategy: {
    name: string;
    description: string;
    pineScript: string;
    parameters: StrategyParameter[];
    explanation: string;
  };
  confidence: number;
  suggestions: string[];
}

// Types pour le marketplace
export interface MarketplaceItem {
  id: string;
  strategy: Strategy;
  seller: {
    id: string;
    name: string;
    rating: number;
    sales: number;
  };
  price: number;
  sales: number;
  reviews: Review[];
  featured: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Types pour les données de marché
export interface MarketData {
  symbol: string;
  timeframe: string;
  data: OHLC[];
}

export interface OHLC {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Types pour les notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Types pour l'API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
