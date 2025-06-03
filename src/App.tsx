import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/useAuthStore';

// Layout Components
import Header from './components/layout/Header';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import AIGenerator from './pages/AIGenerator';
import StrategiesPage from './pages/StrategiesPage';
import StrategyDetails from './pages/StrategyDetails';
import BacktestPage from './pages/BacktestPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Main App Layout component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const { loadProfile, token } = useAuthStore();

  useEffect(() => {
    // Auto-load user profile if token exists
    if (token) {
      loadProfile();
    }
  }, [token, loadProfile]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/generate" element={
              <ProtectedRoute>
                <AppLayout>
                  <AIGenerator />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/strategies" element={
              <ProtectedRoute>
                <AppLayout>
                  <StrategiesPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/strategies/:id" element={
              <ProtectedRoute>
                <AppLayout>
                  <StrategyDetails />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/backtest" element={
              <ProtectedRoute>
                <AppLayout>
                  <BacktestPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketplace" element={
              <ProtectedRoute>
                <AppLayout>
                  <MarketplacePage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;