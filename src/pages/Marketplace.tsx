import { useState } from 'react';
import { StrategyCard } from '../components/strategy/StrategyCard';
import { Search, Filter } from 'lucide-react';

const mockStrategies = [
  {
    name: 'Advanced RSI Divergence',
    description: 'Identifies potential trend reversals using RSI divergence with multiple timeframe confirmation.',
    performance: {
      winRate: 68.5,
      profitFactor: 2.34,
      trades: 234,
    },
    rating: 4.8,
  },
  {
    name: 'Volume Profile Strategy',
    description: 'Uses volume profile analysis to identify key support and resistance levels for trade entries.',
    performance: {
      winRate: 72.1,
      profitFactor: 2.87,
      trades: 156,
    },
    rating: 4.9,
  },
  {
    name: 'Multi-Timeframe Momentum',
    description: 'Combines momentum indicators across multiple timeframes for high-probability trade setups.',
    performance: {
      winRate: 65.3,
      profitFactor: 2.15,
      trades: 312,
    },
    rating: 4.6,
  },
];

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-semibold">Strategy Marketplace</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search strategies..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStrategies.map((strategy) => (
          <StrategyCard key={strategy.name} strategy={strategy} />
        ))}
      </div>
    </div>
  );
}