import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { StrategyGenerator } from '../pages/StrategyGenerator';
import { Backtesting } from '../pages/Backtesting';
import { StrategyLibrary } from '../pages/StrategyLibrary';
import { StrategyCustomization } from '../pages/StrategyCustomization';
import { Marketplace } from '../pages/Marketplace';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/generate" element={<StrategyGenerator />} />
      <Route path="/backtest" element={<Backtesting />} />
      <Route path="/library" element={<StrategyLibrary />} />
      <Route path="/customize" element={<StrategyCustomization />} />
      <Route path="/marketplace" element={<Marketplace />} />
    </Routes>
  );
}