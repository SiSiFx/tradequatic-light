import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  SparklesIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../stores/useAuthStore';
import { useStrategyStore } from '../stores/useStrategyStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { strategies, loadStrategies, isLoading } = useStrategyStore();

  useEffect(() => {
    loadStrategies();
  }, [loadStrategies]);

  const stats = [
    {
      name: 'Stratégies créées',
      value: strategies.length,
      icon: SparklesIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Performance moyenne',
      value: '12.3%',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Revenus du mois',
      value: '€0',
      icon: CurrencyDollarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Backtests',
      value: '0',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const recentStrategies = strategies.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.name} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Voici un aperçu de vos activités de trading
          </p>
        </div>

        {/* Plan Usage */}
        {user?.plan === 'free' && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Plan Gratuit</h3>
                <p className="text-blue-700">
                  {user.strategiesUsed} / {user.maxStrategies} stratégies utilisées ce mois
                </p>
                <div className="w-64 bg-blue-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(user.strategiesUsed / user.maxStrategies) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Link
                to="/settings"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Passer à Premium
              </Link>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Generate Strategy */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-8 w-8 mr-3" />
              <h3 className="text-xl font-semibold">Générer une nouvelle stratégie</h3>
            </div>
            <p className="text-blue-100 mb-4">
              Décrivez votre idée de trading et laissez notre IA créer une stratégie complète.
            </p>
            <Link
              to="/generate"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Commencer
            </Link>
          </div>

          {/* Backtest */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-8 w-8 mr-3" />
              <h3 className="text-xl font-semibold">Tester une stratégie</h3>
            </div>
            <p className="text-green-100 mb-4">
              Analysez la performance de vos stratégies sur des données historiques.
            </p>
            <Link
              to="/backtest"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Backtester
            </Link>
          </div>
        </div>

        {/* Recent Strategies */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Stratégies récentes</h3>
              <Link
                to="/strategies"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir toutes
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Chargement...</p>
            </div>
          ) : recentStrategies.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentStrategies.map((strategy) => (
                <div key={strategy.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{strategy.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{strategy.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {strategy.tags[0]}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(strategy.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/strategies/${strategy.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Aucune stratégie</h4>
              <p className="text-gray-500 mb-4">
                Créez votre première stratégie avec notre générateur IA
              </p>
              <Link
                to="/generate"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Créer une stratégie
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;