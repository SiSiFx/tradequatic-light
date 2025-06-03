import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Brain, 
  History, 
  Library, 
  Settings, 
  ShoppingBag 
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart2 },
  { name: 'Generate Strategy', href: '/generate', icon: Brain },
  { name: 'Backtesting', href: '/backtest', icon: History },
  { name: 'Strategy Library', href: '/library', icon: Library },
  { name: 'Customize', href: '/customize', icon: Settings },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">TQ.ai</span>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium',
                location.pathname === item.href
                  ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}