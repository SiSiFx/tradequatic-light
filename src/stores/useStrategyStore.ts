import { create } from 'zustand';
import { Strategy, BacktestResult, AIRequest, AIResponse } from '../types';
import { api } from '../services/api';

interface StrategyState {
  strategies: Strategy[];
  currentStrategy: Strategy | null;
  backtestResults: BacktestResult[];
  isLoading: boolean;
  error: string | null;
}

interface StrategyActions {
  loadStrategies: (params?: any) => Promise<void>;
  loadStrategy: (id: string) => Promise<void>;
  createStrategy: (strategy: Omit<Strategy, 'id' | 'author' | 'downloads' | 'rating' | 'createdAt' | 'updatedAt'>) => Promise<Strategy>;
  updateStrategy: (id: string, updates: Partial<Strategy>) => Promise<void>;
  deleteStrategy: (id: string) => Promise<void>;
  duplicateStrategy: (id: string) => Promise<Strategy>;
  generateStrategy: (request: AIRequest) => Promise<AIResponse>;
  runBacktest: (config: any) => Promise<BacktestResult>;
  loadBacktestHistory: (strategyId?: string) => Promise<void>;
  setCurrentStrategy: (strategy: Strategy | null) => void;
  clearError: () => void;
}

export const useStrategyStore = create<StrategyState & StrategyActions>((set, get) => ({
  strategies: [],
  currentStrategy: null,
  backtestResults: [],
  isLoading: false,
  error: null,

  loadStrategies: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getStrategies(params);
      if (response.success && response.data) {
        set({ strategies: response.data.data, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement des stratégies',
        isLoading: false 
      });
    }
  },

  loadStrategy: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getStrategy(id);
      if (response.success && response.data) {
        set({ currentStrategy: response.data, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement de la stratégie',
        isLoading: false 
      });
    }
  },

  createStrategy: async (strategy) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.createStrategy(strategy);
      if (response.success && response.data) {
        const newStrategy = response.data;
        set(state => ({ 
          strategies: [...state.strategies, newStrategy],
          isLoading: false 
        }));
        return newStrategy;
      }
      throw new Error('Erreur lors de la création de la stratégie');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la création de la stratégie',
        isLoading: false 
      });
      throw error;
    }
  },

  updateStrategy: async (id: string, updates: Partial<Strategy>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.updateStrategy(id, updates);
      if (response.success && response.data) {
        const updatedStrategy = response.data;
        set(state => ({ 
          strategies: state.strategies.map(s => s.id === id ? updatedStrategy : s),
          currentStrategy: state.currentStrategy?.id === id ? updatedStrategy : state.currentStrategy,
          isLoading: false 
        }));
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour de la stratégie',
        isLoading: false 
      });
    }
  },

  deleteStrategy: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.deleteStrategy(id);
      if (response.success) {
        set(state => ({ 
          strategies: state.strategies.filter(s => s.id !== id),
          currentStrategy: state.currentStrategy?.id === id ? null : state.currentStrategy,
          isLoading: false 
        }));
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la suppression de la stratégie',
        isLoading: false 
      });
    }
  },

  duplicateStrategy: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.duplicateStrategy(id);
      if (response.success && response.data) {
        const duplicatedStrategy = response.data;
        set(state => ({ 
          strategies: [...state.strategies, duplicatedStrategy],
          isLoading: false 
        }));
        return duplicatedStrategy;
      }
      throw new Error('Erreur lors de la duplication de la stratégie');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la duplication de la stratégie',
        isLoading: false 
      });
      throw error;
    }
  },

  generateStrategy: async (request: AIRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.generateStrategy(request);
      if (response.success && response.data) {
        set({ isLoading: false });
        return response.data;
      }
      throw new Error('Erreur lors de la génération de la stratégie');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors de la génération de la stratégie',
        isLoading: false 
      });
      throw error;
    }
  },

  runBacktest: async (config) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.runBacktest(config);
      if (response.success && response.data) {
        const result = response.data;
        set(state => ({ 
          backtestResults: [...state.backtestResults, result],
          isLoading: false 
        }));
        return result;
      }
      throw new Error('Erreur lors du backtest');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du backtest',
        isLoading: false 
      });
      throw error;
    }
  },

  loadBacktestHistory: async (strategyId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getBacktestHistory(strategyId);
      if (response.success && response.data) {
        set({ backtestResults: response.data, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erreur lors du chargement de l\'historique',
        isLoading: false 
      });
    }
  },

  setCurrentStrategy: (strategy: Strategy | null) => {
    set({ currentStrategy: strategy });
  },

  clearError: () => {
    set({ error: null });
  },
})); 