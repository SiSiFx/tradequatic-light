import React, { useState } from 'react';
import { SparklesIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStrategyStore } from '../stores/useStrategyStore';
import toast from 'react-hot-toast';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('forex');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [indicators, setIndicators] = useState<string[]>([]);
  const [generatedStrategy, setGeneratedStrategy] = useState<any>(null);
  
  const { generateStrategy, isLoading } = useStrategyStore();

  const availableIndicators = [
    'RSI', 'MACD', 'Moving Average', 'Bollinger Bands', 'Stochastic',
    'ADX', 'ATR', 'Volume', 'Fibonacci', 'Support/Resistance'
  ];

  const handleIndicatorToggle = (indicator: string) => {
    setIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Veuillez décrire votre stratégie');
      return;
    }

    try {
      const response = await generateStrategy({
        prompt,
        context: {
          market: selectedMarket,
          timeframe: selectedTimeframe,
          indicators,
          riskLevel,
        }
      });
      
      setGeneratedStrategy(response);
      toast.success('Stratégie générée avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la génération');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <SparklesIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Générateur de Stratégies IA
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Décrivez votre idée de trading et notre IA créera une stratégie PineScript complète
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Configuration de la stratégie</h2>
            
            {/* Strategy Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Décrivez votre stratégie de trading
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Je veux une stratégie qui achète quand le RSI est en survente et que le prix casse une résistance..."
              />
            </div>

            {/* Market Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marché
              </label>
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="stocks">Actions</option>
                <option value="indices">Indices</option>
              </select>
            </div>

            {/* Timeframe */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Période
              </label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1m">1 minute</option>
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
                <option value="1h">1 heure</option>
                <option value="4h">4 heures</option>
                <option value="1d">1 jour</option>
              </select>
            </div>

            {/* Risk Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau de risque
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setRiskLevel(level)}
                    className={`py-2 px-4 rounded-lg font-medium ${
                      riskLevel === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'low' ? 'Faible' : level === 'medium' ? 'Moyen' : 'Élevé'}
                  </button>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Indicateurs préférés (optionnel)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableIndicators.map((indicator) => (
                  <button
                    key={indicator}
                    onClick={() => handleIndicatorToggle(indicator)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium ${
                      indicators.includes(indicator)
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {indicator}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Générer la stratégie
                </>
              )}
            </button>
          </div>

          {/* Generated Strategy */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Stratégie générée</h2>
            
            {generatedStrategy ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {generatedStrategy.strategy.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {generatedStrategy.strategy.description}
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Confiance IA:</strong> {generatedStrategy.confidence}%
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Code PineScript</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {generatedStrategy.strategy.pineScript}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Explication</h4>
                  <p className="text-gray-600 text-sm">
                    {generatedStrategy.strategy.explanation}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
                    Sauvegarder
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                    Tester
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <SparklesIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune stratégie générée
                </h3>
                <p className="text-gray-500">
                  Remplissez le formulaire et cliquez sur "Générer" pour créer votre stratégie
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator; 