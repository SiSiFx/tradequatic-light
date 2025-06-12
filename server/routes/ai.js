import express from 'express';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const openaiApiKey = process.env.OPENAI_API_KEY;
/** @type {import('openai').default | null} */
let openai = null;
if (openaiApiKey) {
  openai = new OpenAI({ apiKey: openaiApiKey });
}

// Mock AI strategy generation
router.post('/generate-strategy', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt requis pour générer une stratégie'
      });
    }
    
    // If OpenAI key provided, call real model
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a PineScript trading strategy generator. Given a user description, produce a PineScript v5 strategy with summary and list of parameters.'
          },
          {
            role: 'user',
            content: `Description: ${prompt}\nContext: ${JSON.stringify(context)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 700
      });

      const raw = completion.choices[0]?.message?.content || '';
      const strategyId = uuidv4();

      // naive split
      const [summary, ...codeParts] = raw.split('```');
      const pineScript = codeParts.join('```');

      const response = {
        strategy: {
          name: `AI Strategy ${strategyId.substring(0, 5)}`,
          description: summary.trim(),
          pineScript,
          parameters: [],
          explanation: summary.trim()
        },
        confidence: 85,
        suggestions: ['Review parameters', 'Backtest before trading live']
      };

      return res.json({ success: true, data: response });
    }

    // Fallback to mock if no OpenAI key
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockStrategy = generateMockStrategy(prompt, context);
    return res.json({ success: true, data: mockStrategy });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération de la stratégie'
    });
  }
});

// Improve existing strategy
router.post('/improve-strategy', async (req, res) => {
  try {
    const { strategyId, feedback } = req.body;
    
    if (!strategyId || !feedback) {
      return res.status(400).json({
        success: false,
        error: 'ID de stratégie et feedback requis'
      });
    }
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const improvedStrategy = {
      strategy: {
        name: 'Stratégie Améliorée',
        description: 'Version améliorée basée sur vos commentaires',
        pineScript: `// Improved Strategy
//@version=5
strategy("Improved Strategy", overlay=true)

// Enhanced parameters based on feedback
length = input(21, "Period")
multiplier = input(2.0, "Multiplier")

// Improved logic
basis = ta.sma(close, length)
dev = multiplier * ta.stdev(close, length)
upper = basis + dev
lower = basis - dev

// Better entry conditions
long_condition = ta.crossover(close, lower) and rsi > 30
short_condition = ta.crossunder(close, upper) and rsi < 70

if long_condition
    strategy.entry("Long", strategy.long)
if short_condition
    strategy.entry("Short", strategy.short)`,
        parameters: [
          {
            name: 'length',
            type: 'number',
            defaultValue: 21,
            min: 10,
            max: 50,
            description: 'Période pour le calcul'
          }
        ],
        explanation: 'Cette version améliorée intègre vos suggestions pour une meilleure performance.'
      },
      confidence: 87,
      suggestions: [
        'Testez avec différentes périodes',
        'Ajoutez un stop loss',
        'Considérez les conditions de marché'
      ]
    };
    
    res.json({
      success: true,
      data: improvedStrategy
    });
  } catch (error) {
    console.error('AI improvement error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'amélioration de la stratégie'
    });
  }
});

function generateMockStrategy(prompt, context) {
  const promptLower = prompt.toLowerCase();
  
  // Determine strategy type based on keywords
  let strategyType = 'trend';
  let indicators = ['SMA'];
  let confidence = 75;
  
  if (promptLower.includes('rsi')) {
    indicators.push('RSI');
    confidence += 5;
  }
  if (promptLower.includes('macd')) {
    indicators.push('MACD');
    confidence += 5;
  }
  if (promptLower.includes('bollinger')) {
    indicators.push('Bollinger Bands');
    strategyType = 'mean_reversion';
    confidence += 10;
  }
  if (promptLower.includes('scalping') || promptLower.includes('court terme')) {
    strategyType = 'scalping';
    confidence += 5;
  }
  
  // Adjust confidence based on context
  if (context?.riskLevel === 'low') confidence += 5;
  if (context?.indicators?.length > 0) confidence += context.indicators.length * 2;
  
  const strategies = {
    trend: {
      name: 'Stratégie de Suivi de Tendance IA',
      description: 'Stratégie générée par IA pour suivre les tendances du marché avec des signaux d\'entrée optimisés',
      pineScript: `// AI Generated Trend Following Strategy
//@version=5
strategy("AI Trend Strategy", overlay=true)

// Parameters
fast_length = input(12, "Fast MA Length")
slow_length = input(26, "Slow MA Length")
rsi_length = input(14, "RSI Length")

// Indicators
fast_ma = ta.sma(close, fast_length)
slow_ma = ta.sma(close, slow_length)
rsi = ta.rsi(close, rsi_length)

// Entry conditions
long_condition = ta.crossover(fast_ma, slow_ma) and rsi > 50
short_condition = ta.crossunder(fast_ma, slow_ma) and rsi < 50

// Execute trades
if long_condition
    strategy.entry("Long", strategy.long)
if short_condition
    strategy.entry("Short", strategy.short)

// Plot indicators
plot(fast_ma, color=color.blue, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")`,
      parameters: [
        {
          name: 'fast_length',
          type: 'number',
          defaultValue: 12,
          min: 5,
          max: 50,
          description: 'Période de la moyenne mobile rapide'
        },
        {
          name: 'slow_length',
          type: 'number',
          defaultValue: 26,
          min: 20,
          max: 100,
          description: 'Période de la moyenne mobile lente'
        }
      ]
    },
    mean_reversion: {
      name: 'Stratégie de Retour à la Moyenne IA',
      description: 'Stratégie IA pour profiter des retours à la moyenne avec Bollinger Bands',
      pineScript: `// AI Generated Mean Reversion Strategy
//@version=5
strategy("AI Mean Reversion", overlay=true)

// Parameters
bb_length = input(20, "Bollinger Bands Length")
bb_mult = input(2.0, "Bollinger Bands Multiplier")
rsi_length = input(14, "RSI Length")

// Bollinger Bands
basis = ta.sma(close, bb_length)
dev = bb_mult * ta.stdev(close, bb_length)
upper = basis + dev
lower = basis - dev

// RSI
rsi = ta.rsi(close, rsi_length)

// Entry conditions
long_condition = close <= lower and rsi < 30
short_condition = close >= upper and rsi > 70

// Exit conditions
long_exit = close >= basis
short_exit = close <= basis

// Execute trades
if long_condition
    strategy.entry("Long", strategy.long)
if short_condition
    strategy.entry("Short", strategy.short)

if long_exit
    strategy.close("Long")
if short_exit
    strategy.close("Short")

// Plot Bollinger Bands
plot(basis, color=color.orange, title="BB Basis")
plot(upper, color=color.red, title="BB Upper")
plot(lower, color=color.green, title="BB Lower")`,
      parameters: [
        {
          name: 'bb_length',
          type: 'number',
          defaultValue: 20,
          min: 10,
          max: 50,
          description: 'Période des Bollinger Bands'
        }
      ]
    },
    scalping: {
      name: 'Stratégie de Scalping IA',
      description: 'Stratégie IA optimisée pour le scalping avec signaux rapides',
      pineScript: `// AI Generated Scalping Strategy
//@version=5
strategy("AI Scalping", overlay=true)

// Parameters
ema_fast = input(5, "Fast EMA")
ema_slow = input(13, "Slow EMA")
rsi_length = input(7, "RSI Length")

// Indicators
ema_f = ta.ema(close, ema_fast)
ema_s = ta.ema(close, ema_slow)
rsi = ta.rsi(close, rsi_length)

// Entry conditions
long_condition = ta.crossover(ema_f, ema_s) and rsi > 40
short_condition = ta.crossunder(ema_f, ema_s) and rsi < 60

// Quick exits for scalping
long_exit = ta.crossunder(ema_f, ema_s) or rsi > 80
short_exit = ta.crossover(ema_f, ema_s) or rsi < 20

// Execute trades
if long_condition
    strategy.entry("Long", strategy.long)
if short_condition
    strategy.entry("Short", strategy.short)

if long_exit
    strategy.close("Long")
if short_exit
    strategy.close("Short")

// Plot EMAs
plot(ema_f, color=color.blue, title="Fast EMA")
plot(ema_s, color=color.red, title="Slow EMA")`,
      parameters: [
        {
          name: 'ema_fast',
          type: 'number',
          defaultValue: 5,
          min: 3,
          max: 15,
          description: 'Période EMA rapide'
        }
      ]
    }
  };
  
  const selectedStrategy = strategies[strategyType];
  
  return {
    strategy: {
      ...selectedStrategy,
      explanation: `Cette stratégie a été générée en analysant votre demande: "${prompt}". Elle utilise ${indicators.join(', ')} pour ${strategyType === 'trend' ? 'suivre les tendances' : strategyType === 'mean_reversion' ? 'profiter des retours à la moyenne' : 'faire du scalping'}.`
    },
    confidence: Math.min(confidence, 95),
    suggestions: [
      'Testez la stratégie sur différentes périodes',
      'Ajustez les paramètres selon votre tolérance au risque',
      'Considérez l\'ajout d\'un stop loss',
      'Backtestez sur des données historiques avant utilisation'
    ]
  };
}

export default router; 