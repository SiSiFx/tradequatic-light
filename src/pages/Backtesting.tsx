import { useState } from 'react';
import { PriceChart } from '../components/charts/PriceChart';
import { Calendar, Clock, Settings } from 'lucide-react';

const mockPriceData = [
  { time: '2024-01-01', open: 100, high: 105, low: 98, close: 103, volume: 1000 },
  { time: '2024-01-02', open: 103, high: 108, low: 102, close: 107, volume: 1200 },
  { time: '2024-01-03', open: 107, high: 110, low: 105, close: 106, volume: 800 },
];

export function Backtesting() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [dateRange, setDateRange] = useState('1M');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-semibold">Strategy Backtesting</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <Clock className="w-5 h-5 text-gray-500" />
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-transparent border-none focus:ring-0"
            >
              <option value="1M">1 Minute</option>
              <option value="5M">5 Minutes</option>
              <option value="15M">15 Minutes</option>
              <option value="1H">1 Hour</option>
              <option value="4H">4 Hours</option>
              <option value="1D">1 Day</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none focus:ring-0"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="ALL">All Time</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <PriceChart data={mockPriceData} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Net Profit</p>
                <p className="text-xl font-semibold text-success-500">+$1,234.56</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                <p className="text-xl font-semibold">67.8%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Profit Factor</p>
                <p className="text-xl font-semibold">2.14</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Max Drawdown</p>
                <p className="text-xl font-semibold text-red-500">-15.3%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Trade Analysis</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Trades</p>
                <p className="text-xl font-semibold">156</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Trade Duration</p>
                <p className="text-xl font-semibold">2.3 days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Profit per Trade</p>
                <p className="text-xl font-semibold text-success-500">+$7.91</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}