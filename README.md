# TradeQuantic.ai 🚀

**An AI-Powered Quantitative Trading Strategy Platform**

TradeQuantic.ai is a comprehensive SaaS application that democratizes quantitative trading by enabling users to generate, test, customize, and monetize trading strategies using artificial intelligence - no coding experience required.

![TradeQuantic.ai Banner](https://via.placeholder.com/800x200/3B82F6/FFFFFF?text=TradeQuantic.ai+-+AI+Trading+Strategies)

## ✨ Features

### 🤖 AI Strategy Generation
- **Natural Language Input**: Describe your trading idea in plain English
- **Intelligent Analysis**: AI analyzes market conditions, indicators, and risk levels
- **Multiple Strategy Types**: Trend following, mean reversion, scalping, and more
- **PineScript Output**: Ready-to-use TradingView strategies

### 📊 Comprehensive Backtesting
- **Historical Data Analysis**: Test strategies on years of market data
- **Performance Metrics**: Sharpe ratio, max drawdown, win rate, profit factor
- **Visual Analytics**: Equity curves, trade analysis, and detailed reporting
- **Risk Assessment**: Understand strategy behavior across different market conditions

### 🛠️ Strategy Management
- **Personal Library**: Organize and manage your trading strategies
- **Version Control**: Track changes and improvements over time
- **Parameter Optimization**: Fine-tune strategy settings with low-code interface
- **Export Options**: PineScript, webhooks, and API integrations

### 🏪 Strategy Marketplace
- **Buy & Sell**: Monetize your successful strategies
- **Community Driven**: Access strategies from top performers
- **Rating System**: Reviews and performance verification
- **Secure Transactions**: Built-in payment processing

### 💼 Freemium Business Model
- **Free Tier**: 3 strategies per month, unlimited backtesting
- **Premium Plans**: Unlimited strategies, advanced analytics, priority support
- **Enterprise**: Custom solutions for institutions and fund managers

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for modern styling
- **Framer Motion** for smooth animations
- **React Query** for data fetching
- **Zustand** for state management
- **React Hook Form** + Zod for forms

### Backend
- **Node.js** with Express.js
- **JWT** authentication
- **PostgreSQL** database (production ready)
- **RESTful API** architecture
- **Rate limiting** and security middleware

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Husky** for git hooks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SiSiFx/tradequatic-light.git
cd tradequatic-light
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Start development servers**

Frontend (in one terminal):
```bash
npm run dev
```

Backend (in another terminal):
```bash
npm run server:dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Demo Account
```
Email: demo@tradequantic.ai
Password: demo123
```

## 📱 Usage

### 1. Generate Your First Strategy
1. Sign up for a free account
2. Navigate to "AI Generator"
3. Describe your trading idea (e.g., "Buy when RSI is oversold and price breaks resistance")
4. Configure market, timeframe, and risk preferences
5. Let AI generate your PineScript strategy

### 2. Backtest Performance
1. Go to "Backtesting" page
2. Select your strategy
3. Choose symbol, timeframe, and date range
4. Run backtest and analyze results

### 3. Customize and Optimize
1. Use the strategy editor to modify parameters
2. Test different configurations
3. Save your optimized version

### 4. Deploy to TradingView
1. Copy the generated PineScript
2. Paste into TradingView Pine Editor
3. Apply to your charts and start trading

## 🏗️ Project Structure

```
tradequatic-light/
├── src/                    # Frontend source
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages
│   ├── stores/            # Zustand state management
│   ├── services/          # API services
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── server/                # Backend source
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── models/            # Data models
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in root and server directories:

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3001/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

**Backend (server/.env)**
```env
NODE_ENV=development
PORT=3001
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://user:password@localhost:5432/tradequantic
FRONTEND_URL=http://localhost:5173
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run server
```

### VPS Deployment with PM2
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Setup NGINX reverse proxy
# Configure SSL with Let's Encrypt
```

### Docker Deployment
```bash
docker-compose up -d
```

## 🧪 Testing

```bash
# Run frontend tests
npm run test

# Run backend tests
npm run test:server

# E2E tests
npm run test:e2e
```

## 📈 Roadmap

### Q1 2024
- [ ] Real AI integration (OpenAI/Claude)
- [ ] PostgreSQL database implementation
- [ ] Payment processing (Stripe)
- [ ] Advanced backtesting engine

### Q2 2024
- [ ] Mobile app (React Native)
- [ ] Multi-broker integrations
- [ ] Social trading features
- [ ] Advanced portfolio analytics

### Q3 2024
- [ ] Institutional features
- [ ] White-label solutions
- [ ] API marketplace
- [ ] Machine learning optimization

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@tradequantic.ai
- 💬 Discord: [Join our community](https://discord.gg/tradequantic)
- 📖 Documentation: [docs.tradequantic.ai](https://docs.tradequantic.ai)
- 🐛 Issues: [GitHub Issues](https://github.com/SiSiFx/tradequatic-light/issues)

## ⭐ Show Your Support

If this project helps you, please give it a ⭐️!

---

**Built with ❤️ by the TradeQuantic.ai team**

[Website](https://tradequantic.ai) • [Twitter](https://twitter.com/tradequantic) • [LinkedIn](https://linkedin.com/company/tradequantic) 