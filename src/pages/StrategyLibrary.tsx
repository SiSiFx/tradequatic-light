import { useState } from 'react';
import { StrategyCard } from '../components/strategy/StrategyCard';
import { Plus, FolderOpen } from 'lucide-react';

const mockStrategies = [
  {
    name: 'MA Crossover Strategy',
    description: 'Simple yet effective moving average crossover strategy with customizable parameters.',
    performance: {
      winRate: 63.2,
      profitFactor: 1.95,
      trades: 187,
    },
    rating: 4.2,
  },
  {
    name: 'RSI Momentum',
    description: 'RSI-based momentum strategy with overbought/oversold conditions and trend confirmation.',
    performance: {
      winRate: 58.7,
      profitFactor: 1.78,
      trades: 245,
    },
    rating: 4.0,
  },
];

export function StrategyLibrary() {
  const [activeFolder, setActiveFolder] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-semibold">My Strategies</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg">
            <Plus className="w-5 h-5" />
            <span>New Strategy</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <FolderOpen className="w-5 h-5" />
            <span>New Folder</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeFolder === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveFolder('all')}
        >
          All Strategies
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeFolder === 'favorites'
              ? 'bg-primary-500 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveFolder('favorites')}
        >
          Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStrategies.map((strategy) => (
          <StrategyCard key={strategy.name} strategy={strategy} />
        ))}
      </div>
    </div>
  );
}