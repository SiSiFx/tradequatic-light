import { 
  Strategy, 
  BacktestConfig, 
  BacktestResult, 
  AIRequest, 
  AIResponse, 
  MarketplaceItem, 
  User,
  ApiResponse,
  PaginatedResponse,
  MarketData
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class APIClient {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur API');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request('/auth/profile');
  }

  // AI Strategy Generation
  async generateStrategy(request: AIRequest): Promise<ApiResponse<AIResponse>> {
    return this.request('/ai/generate-strategy', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async improveStrategy(strategyId: string, feedback: string): Promise<ApiResponse<AIResponse>> {
    return this.request('/ai/improve-strategy', {
      method: 'POST',
      body: JSON.stringify({ strategyId, feedback }),
    });
  }

  // Strategies
  async getStrategies(params?: {
    page?: number;
    limit?: number;
    search?: string;
    tags?: string[];
    author?: string;
  }): Promise<ApiResponse<PaginatedResponse<Strategy>>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.tags) searchParams.set('tags', params.tags.join(','));
    if (params?.author) searchParams.set('author', params.author);

    return this.request(`/strategies?${searchParams}`);
  }

  async getStrategy(id: string): Promise<ApiResponse<Strategy>> {
    return this.request(`/strategies/${id}`);
  }

  async createStrategy(strategy: Omit<Strategy, 'id' | 'author' | 'downloads' | 'rating' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Strategy>> {
    return this.request('/strategies', {
      method: 'POST',
      body: JSON.stringify(strategy),
    });
  }

  async updateStrategy(id: string, updates: Partial<Strategy>): Promise<ApiResponse<Strategy>> {
    return this.request(`/strategies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteStrategy(id: string): Promise<ApiResponse<void>> {
    return this.request(`/strategies/${id}`, {
      method: 'DELETE',
    });
  }

  async duplicateStrategy(id: string): Promise<ApiResponse<Strategy>> {
    return this.request(`/strategies/${id}/duplicate`, {
      method: 'POST',
    });
  }

  // Backtesting
  async runBacktest(config: BacktestConfig): Promise<ApiResponse<BacktestResult>> {
    return this.request('/backtest/run', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async getBacktestResult(id: string): Promise<ApiResponse<BacktestResult>> {
    return this.request(`/backtest/${id}`);
  }

  async getBacktestHistory(strategyId?: string): Promise<ApiResponse<BacktestResult[]>> {
    const params = strategyId ? `?strategyId=${strategyId}` : '';
    return this.request(`/backtest/history${params}`);
  }

  // Market Data
  async getMarketData(symbol: string, timeframe: string, from: string, to: string): Promise<ApiResponse<MarketData>> {
    const params = new URLSearchParams({
      symbol,
      timeframe,
      from,
      to,
    });
    return this.request(`/market-data?${params}`);
  }

  async getSymbols(): Promise<ApiResponse<string[]>> {
    return this.request('/market-data/symbols');
  }

  // Marketplace
  async getMarketplace(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'popularity' | 'price' | 'rating' | 'recent';
  }): Promise<ApiResponse<PaginatedResponse<MarketplaceItem>>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString());
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);

    return this.request(`/marketplace?${searchParams}`);
  }

  async purchaseStrategy(strategyId: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    return this.request('/marketplace/purchase', {
      method: 'POST',
      body: JSON.stringify({ strategyId }),
    });
  }

  async publishStrategy(strategyId: string, price: number): Promise<ApiResponse<MarketplaceItem>> {
    return this.request('/marketplace/publish', {
      method: 'POST',
      body: JSON.stringify({ strategyId, price }),
    });
  }

  // Export
  async exportToPineScript(strategyId: string): Promise<ApiResponse<{ script: string; fileName: string }>> {
    return this.request(`/export/pinescript/${strategyId}`);
  }

  async exportToWebhook(strategyId: string, config: any): Promise<ApiResponse<{ webhookUrl: string }>> {
    return this.request(`/export/webhook/${strategyId}`, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }
}

export const api = new APIClient(); 