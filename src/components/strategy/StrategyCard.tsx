import { BarChart2, Star, TrendingUp } from 'lucide-react';

interface StrategyCardProps {
  strategy: {
    name: string;
    description: string;
    performance: {
      winRate: number;
      profitFactor: number;
      trades: number;
    };
    rating: number;
  };
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">{strategy.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
          <span className="text-sm font-medium">{strategy.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">{strategy.description}</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Win Rate</span>
          </div>
          <p className="font-semibold">{strategy.performance.winRate}%</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <BarChart2 className="w-4 h-4" />
            <span>Profit Factor</span>
          </div>
          <p className="font-semibold">{strategy.performance.profitFactor}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Trades</span>
          </div>
          <p className="font-semibold">{strategy.performance.trades}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium">
          View Details
        </button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium">
          Backtest
        </button>
      </div>
    </div>
  );
}