# 🎲 Bet Buddy

A comprehensive betting helper application with tools for analysis, bankroll management, and education. Learn from your own bets and make more informed betting decisions.

## ✨ Features

### 📊 Data Analysis Tools
- **Odds Calculator**: Convert between decimal, American, and fractional odds
- **Statistics Engine**: Track win rate, ROI, streaks, and performance metrics
- **Kelly Criterion Calculator**: Calculate optimal bet sizing based on edge

### 💰 Bankroll Management
- **Stake Calculator**: Suggested stakes based on Kelly Criterion or flat betting
- **Risk Tolerance Settings**: Conservative, moderate, or aggressive profiles
- **Betting Limits**: Set and track daily, weekly, and monthly limits
- **Stop-Loss & Take-Profit**: Automatic level calculations

### 📚 Educational Resources
- Comprehensive guides on betting basics
- Types of bets explained (moneyline, spreads, parlays, etc.)
- Strategy guides (Kelly Criterion, finding value, line shopping)
- Responsible gambling resources and tips

### 🛠️ Additional Tools
- **Screenshot OCR**: Extract odds from betting app screenshots (Azure Computer Vision)
- **Data Validator**: Validate betting data before saving
- **Data Exporter**: Export data to CSV, JSON, HTML, Markdown
- **Data Formatter**: Format currency, percentages, dates, and odds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ncsound919/Bet-Buddy-.git
cd Bet-Buddy-

# Install all dependencies
npm run install:all
```

### Development

```bash
# Start backend (Terminal 1)
npm run dev:backend

# Start frontend (Terminal 2)
npm run dev:frontend
```

- Backend API: http://localhost:3001
- Frontend: http://localhost:5173

### Build

```bash
npm run build:all
```

## 📖 API Documentation

See [TOOLS.md](TOOLS.md) for detailed API documentation and examples.

### Quick API Examples

```bash
# Convert odds
curl -X POST http://localhost:3001/api/tools/odds/convert/decimal \
  -H "Content-Type: application/json" \
  -d '{"decimal": 2.5}'

# Calculate suggested stake
curl -X POST http://localhost:3001/api/tools/bankroll/suggested-stake \
  -H "Content-Type: application/json" \
  -d '{"bankroll": 1000, "odds": 2.0, "estimatedWinProbability": 0.55, "riskTolerance": "moderate"}'

# Calculate statistics
curl -X POST http://localhost:3001/api/tools/statistics/calculate \
  -H "Content-Type: application/json" \
  -d '{"bets": [{"stake": 10, "odds": 2.0, "won": true}]}'
```

## 🎰 Parlay Formula Tool (Python)

Batch daily odds into `slate.csv`, then run portfolio builds and TapSpeak summaries.

### Files
- `slate.csv` — your collected odds for the day
- `config.json` — parameters for payout targets and ticket counts
- `main.py` — runs selection, builds moonshot and spray tickets

### Usage
```bash
python main.py
```

### CSV Schema: `slate.csv`
```
leg_id,sport,game,market,selection,decimal_odds,model_prob
L1,NBA,MIL@WAS,ML,Bucks,1.28,0.83
L2,NBA,UTA@LAC,ML,Clippers,1.29,0.80
```

## ⚠️ Responsible Gambling

Bet Buddy promotes responsible gambling. Features include:
- Betting limit tracking
- Session evaluation for tilt detection
- Educational resources on responsible gambling
- Links to help resources (NCPG, GamCare, Gamblers Anonymous)

**Remember:** Betting should be entertainment, not a source of income. Never bet more than you can afford to lose.

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## 📄 License

MIT
