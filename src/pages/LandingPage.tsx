import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  RocketLaunchIcon,
  StarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const features = [
    {
      name: 'Génération IA',
      description: 'Créez des stratégies de trading sophistiquées en décrivant simplement votre idée à notre IA.',
      icon: SparklesIcon,
    },
    {
      name: 'Backtesting Puissant',
      description: 'Testez vos stratégies sur des données historiques avec des métriques détaillées.',
      icon: ChartBarIcon,
    },
    {
      name: 'Marketplace',
      description: 'Vendez vos stratégies performantes ou achetez celles d\'autres traders.',
      icon: RocketLaunchIcon,
    },
  ];

  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: '/mois',
      features: [
        '3 stratégies générées par mois',
        'Backtesting illimité',
        'Accès au marketplace',
        'Support communautaire',
      ],
      cta: 'Commencer gratuitement',
      highlighted: false,
    },
    {
      name: 'Premium',
      price: '29€',
      period: '/mois',
      features: [
        'Stratégies illimitées',
        'Analytics avancés',
        'Priorisation IA',
        'Support prioritaire',
        'Alertes en temps réel',
        'Export MetaTrader',
      ],
      cta: 'Essayer Premium',
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TQ</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                TradeQuantic<span className="text-blue-600">.ai</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              L'assistant de trading
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                quantitatif intelligent
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Générez, testez et monétisez vos stratégies de trading avec l'aide de l'intelligence artificielle. 
              Même sans connaissances en programmation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Commencer gratuitement
              </Link>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors text-lg">
                Voir la démo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour trader
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète qui démocratise le trading quantitatif
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre plan
            </h2>
            <p className="text-xl text-gray-600">
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-opacity-20'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-75">{plan.period}</span>
                  </div>
                  <Link
                    to="/register"
                    className={`block w-full py-3 px-6 rounded-lg font-semibold transition-colors mb-6 ${
                      plan.highlighted
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à révolutionner votre trading ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de traders qui utilisent déjà TradeQuantic.ai
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg inline-block"
            >
              Commencer maintenant
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TQ</span>
              </div>
              <span className="font-bold text-xl">
                TradeQuantic<span className="text-blue-400">.ai</span>
              </span>
            </div>
            <p className="text-gray-400">
              © 2024 TradeQuantic.ai. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 