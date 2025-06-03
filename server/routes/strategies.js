import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database for strategies
const strategies = new Map();

// Mock strategies
const mockStrategies = [
  {
    id: uuidv4(),
    name: 'RSI Divergence Strategy',
    description: 'Stratégie basée sur les divergences RSI pour identifier les retournements de tendance',
    pineScript: `// RSI Divergence Strategy
//@version=5
strategy("RSI Divergence", overlay=true)

// Parameters
rsi_length = input(14, "RSI Length")
rsi_overbought = input(70, "RSI Overbought")
rsi_oversold = input(30, "RSI Oversold")

// Calculate RSI
rsi = ta.rsi(close, rsi_length)

// Entry conditions
long_condition = rsi < rsi_oversold and ta.crossover(rsi, rsi_oversold)
short_condition = rsi > rsi_overbought and ta.crossunder(rsi, rsi_overbought)

// Execute trades
if long_condition
    strategy.entry("Long", strategy.long)
if short_condition
    strategy.entry("Short", strategy.short)`,
    parameters: [
      {
        name: 'rsi_length',
        type: 'number',
        defaultValue: 14,
        min: 5,
        max: 50,
        description: 'Période du RSI'
      },
      {
        name: 'rsi_overbought',
        type: 'number',
        defaultValue: 70,
        min: 60,
        max: 90,
        description: 'Niveau de surachat RSI'
      }
    ],
    author: {
      id: 'demo-user',
      name: 'Utilisateur Demo'
    },
    isPublic: true,
    downloads: 156,
    rating: 4.2,
    tags: ['RSI', 'Divergence', 'Reversal'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

mockStrategies.forEach(strategy => {
  strategies.set(strategy.id, strategy);
});

// Get all strategies
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, search, tags, author } = req.query;
    
    let filteredStrategies = Array.from(strategies.values());
    
    // Apply filters
    if (search) {
      filteredStrategies = filteredStrategies.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (tags) {
      const tagArray = tags.split(',');
      filteredStrategies = filteredStrategies.filter(s =>
        tagArray.some(tag => s.tags.includes(tag))
      );
    }
    
    if (author) {
      filteredStrategies = filteredStrategies.filter(s => s.author.id === author);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedStrategies = filteredStrategies.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        data: paginatedStrategies,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(limit),
          total: filteredStrategies.length,
          totalPages: Math.ceil(filteredStrategies.length / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get strategies error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du chargement des stratégies'
    });
  }
});

// Get strategy by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const strategy = strategies.get(id);
    
    if (!strategy) {
      return res.status(404).json({
        success: false,
        error: 'Stratégie non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: strategy
    });
  } catch (error) {
    console.error('Get strategy error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du chargement de la stratégie'
    });
  }
});

// Create new strategy
router.post('/', (req, res) => {
  try {
    const { name, description, pineScript, parameters, tags, isPublic } = req.body;
    
    if (!name || !description || !pineScript) {
      return res.status(400).json({
        success: false,
        error: 'Nom, description et code PineScript requis'
      });
    }
    
    const strategyId = uuidv4();
    const strategy = {
      id: strategyId,
      name,
      description,
      pineScript,
      parameters: parameters || [],
      author: {
        id: 'demo-user', // In production, get from authenticated user
        name: 'Utilisateur Demo'
      },
      isPublic: isPublic || false,
      downloads: 0,
      rating: 0,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    strategies.set(strategyId, strategy);
    
    res.status(201).json({
      success: true,
      data: strategy
    });
  } catch (error) {
    console.error('Create strategy error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de la stratégie'
    });
  }
});

// Update strategy
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const strategy = strategies.get(id);
    
    if (!strategy) {
      return res.status(404).json({
        success: false,
        error: 'Stratégie non trouvée'
      });
    }
    
    const updatedStrategy = {
      ...strategy,
      ...req.body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    strategies.set(id, updatedStrategy);
    
    res.json({
      success: true,
      data: updatedStrategy
    });
  } catch (error) {
    console.error('Update strategy error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour de la stratégie'
    });
  }
});

// Delete strategy
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (!strategies.has(id)) {
      return res.status(404).json({
        success: false,
        error: 'Stratégie non trouvée'
      });
    }
    
    strategies.delete(id);
    
    res.json({
      success: true,
      message: 'Stratégie supprimée avec succès'
    });
  } catch (error) {
    console.error('Delete strategy error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression de la stratégie'
    });
  }
});

// Duplicate strategy
router.post('/:id/duplicate', (req, res) => {
  try {
    const { id } = req.params;
    const originalStrategy = strategies.get(id);
    
    if (!originalStrategy) {
      return res.status(404).json({
        success: false,
        error: 'Stratégie non trouvée'
      });
    }
    
    const duplicatedId = uuidv4();
    const duplicatedStrategy = {
      ...originalStrategy,
      id: duplicatedId,
      name: `${originalStrategy.name} (Copie)`,
      downloads: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    strategies.set(duplicatedId, duplicatedStrategy);
    
    res.status(201).json({
      success: true,
      data: duplicatedStrategy
    });
  } catch (error) {
    console.error('Duplicate strategy error:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la duplication de la stratégie'
    });
  }
});

export default router; 