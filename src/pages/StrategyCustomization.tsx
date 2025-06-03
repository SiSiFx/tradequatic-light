import { useState } from 'react';
import { Save, Play, Code, Settings2 } from 'lucide-react';

export function StrategyCustomization() {
  const [activeTab, setActiveTab] = useState('visual');
  const [parameters, setParameters] = useState({
    fastLength: 10,
    slowLength: 20,
    stopLoss: 2,
    takeProfit: 3,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-semibold">Customize Strategy</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg">
            <Play className="w-5 h-5" />
            <span>Test Strategy</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg">
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'visual'
              ? 'border-primary-500 text-primary-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('visual')}
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            <span>Visual Editor</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === 'code'
              ? 'border-primary-500 text-primary-500'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('code')}
        >
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            <span>Code Editor</span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'visual' ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Strategy Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fast Length
                  </label>
                  <input
                    type="number"
                    value={parameters.fastLength}
                    onChange={(e) =>
                      setParameters({ ...parameters, fastLength: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slow Length
                  </label>
                  <input
                    type="number"
                    value={parameters.slowLength}
                    onChange={(e) =>
                      setParameters({ ...parameters, slowLength: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stop Loss (%)
                  </label>
                  <input
                    type="number"
                    value={parameters.stopLoss}
                    onChange={(e) =>
                      setParameters({ ...parameters, stopLoss: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Take Profit (%)
                  </label>
                  <input
                    type="number"
                    value={parameters.takeProfit}
                    onChange={(e) =>
                      setParameters({ ...parameters, takeProfit: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{`//@version=5
strategy("MA Crossover Strategy", overlay=true)

// Input parameters
fastLength = input(${parameters.fastLength}, "Fast MA Length")
slowLength = input(${parameters.slowLength}, "Slow MA Length")
stopLoss = input(${parameters.stopLoss}, "Stop Loss %")
takeProfit = input(${parameters.takeProfit}, "Take Profit %")

// Calculate moving averages
fastMA = ta.sma(close, fastLength)
slowMA = ta.sma(close, slowLength)

// Generate signals
longCondition = ta.crossover(fastMA, slowMA)
shortCondition = ta.crossunder(fastMA, slowMA)

// Execute trades
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.close("Long")

// Plot moving averages
plot(fastMA, "Fast MA", color=color.blue)
plot(slowMA, "Slow MA", color=color.red)`}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Strategy Info</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">MA Crossover Strategy</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                <p className="font-medium">A simple moving average crossover strategy with customizable parameters for entry and exit conditions.</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Modified</p>
                <p className="font-medium">March 1, 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>
            <div className="space-y-4">
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
        </div>
      </div>
    </div>
  );
}