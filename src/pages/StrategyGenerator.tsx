import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export function StrategyGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedStrategy(`//@version=5
indicator("MA Crossover Strategy", overlay=true)

// Input parameters
fastLength = input(10, "Fast MA Length")
slowLength = input(20, "Slow MA Length")

// Calculate moving averages
fastMA = ta.sma(close, fastLength)
slowMA = ta.sma(close, slowLength)

// Generate signals
longCondition = ta.crossover(fastMA, slowMA)
shortCondition = ta.crossunder(fastMA, slowMA)

// Plot signals
plotshape(longCondition, "Buy Signal", shape.triangleup, location.belowbar, color.green)
plotshape(shortCondition, "Sell Signal", shape.triangledown, location.abovebar, color.red)

// Plot moving averages
plot(fastMA, "Fast MA", color.blue)
plot(slowMA, "Slow MA", color.red)`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">AI Strategy Generator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Describe your trading strategy idea in natural language, and our AI will generate a complete PineScript strategy for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Strategy Description
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Example: Generate a strategy that buys when the fast moving average crosses above the slow moving average, and sells when it crosses below."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Generate Strategy
              </>
            )}
          </button>
        </form>
      </div>

      {generatedStrategy && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Generated PineScript</h2>
            <button
              onClick={() => navigator.clipboard.writeText(generatedStrategy)}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
            >
              Copy Code
            </button>
          </div>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{generatedStrategy}</code>
          </pre>
        </div>
      )}
    </div>
  );
}