# Bet Buddy Tools

A comprehensive collection of open-source utility tools for betting analysis and data management. All tools are implemented using vanilla TypeScript with **no external dependencies** to keep the application lightweight and maintainable.

## 🎯 Overview

These tools add powerful functionality to Bet Buddy without bloat or overreach. Each tool is focused, efficient, and available through both backend API endpoints and frontend components.

## 🛠️ Available Tools

### 1. 📊 Odds Calculator

Convert between different odds formats and calculate potential returns and profits.

**Features:**
- Convert between decimal, fractional, and American odds formats
- Calculate implied probability from odds
- Calculate potential returns from stake and odds
- Calculate profit from stake and odds

**API Endpoints:**
- `POST /api/tools/odds/convert/decimal` - Convert decimal odds to all formats
- `POST /api/tools/odds/convert/american` - Convert American odds to all formats
- `POST /api/tools/odds/convert/fractional` - Convert fractional odds to all formats
- `POST /api/tools/odds/calculate-return` - Calculate total return
- `POST /api/tools/odds/calculate-profit` - Calculate profit

**Example Usage:**
```bash
curl -X POST http://localhost:3001/api/tools/odds/convert/decimal \
  -H "Content-Type: application/json" \
  -d '{"decimal": 2.5}'

# Response:
# {
#   "decimal": 2.5,
#   "fractional": "3/2",
#   "american": 150,
#   "impliedProbability": 40
# }
```

### 2. 📈 Statistics Engine

Calculate comprehensive betting performance metrics and advanced statistics.

**Features:**
- Calculate win rate, ROI, profit/loss
- Track winning and losing streaks
- Calculate Kelly Criterion for optimal bet sizing
- Calculate expected value of bets
- Analyze performance over time periods

**API Endpoints:**
- `POST /api/tools/statistics/calculate` - Calculate comprehensive statistics
- `POST /api/tools/statistics/kelly-criterion` - Calculate Kelly Criterion
- `POST /api/tools/statistics/expected-value` - Calculate expected value

**Example Usage:**
```bash
curl -X POST http://localhost:3001/api/tools/statistics/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "bets": [
      {"stake": 10, "odds": 2.0, "won": true},
      {"stake": 10, "odds": 2.5, "won": false},
      {"stake": 10, "odds": 1.5, "won": true}
    ]
  }'

# Response includes:
# - totalBets, totalStake, totalReturns, profit
# - roi, winRate, averageStake, averageOdds
# - longestWinStreak, longestLoseStreak, currentStreak
```

### 3. ✅ Data Validator

Validate betting data before saving to ensure data integrity.

**Features:**
- Validate stake amounts (min/max ranges)
- Validate odds in different formats
- Validate dates (no future dates)
- Validate bet results (won/lost)
- Comprehensive error messages

**API Endpoints:**
- `POST /api/tools/validate/stake` - Validate stake amount
- `POST /api/tools/validate/odds` - Validate odds value
- `POST /api/tools/validate/bet` - Validate complete bet data

**Example Usage:**
```bash
curl -X POST http://localhost:3001/api/tools/validate/bet \
  -H "Content-Type: application/json" \
  -d '{
    "stake": 50,
    "odds": 2.0,
    "result": true,
    "date": "2024-01-01"
  }'

# Response:
# {
#   "isValid": true,
#   "errors": []
# }
```

### 4. 💾 Data Exporter

Export betting data in multiple formats for analysis or backup.

**Supported Formats:**
- CSV (Comma-Separated Values)
- JSON (JavaScript Object Notation)
- JSON Lines (one JSON object per line)
- TSV (Tab-Separated Values)
- HTML (table format)
- Markdown (table format)

**API Endpoint:**
- `POST /api/tools/export` - Export data in specified format

**Example Usage:**
```bash
curl -X POST http://localhost:3001/api/tools/export \
  -H "Content-Type: application/json" \
  -d '{
    "bets": [
      {"date": "2024-01-01", "stake": 10, "odds": 2.0, "result": true, "profit": 10}
    ],
    "format": "csv"
  }'

# Response (CSV):
# date,stake,odds,result,profit
# 2024-01-01,10,2,true,10
```

### 5. 🎨 Data Formatter

Format data for display with proper localization and styling.

**Features:**
- Format currency with symbols and locales
- Format percentages with decimal precision
- Format odds in different styles
- Format dates and times (absolute and relative)
- Format large numbers with abbreviations (K, M, B)
- Format profit/loss with color indicators
- Format ROI with trend indicators

**API Endpoints:**
- `POST /api/tools/format/currency` - Format currency
- `POST /api/tools/format/percentage` - Format percentage
- `POST /api/tools/format/odds` - Format odds
- `POST /api/tools/format/date` - Format date

**Example Usage:**
```bash
curl -X POST http://localhost:3001/api/tools/format/currency \
  -H "Content-Type: application/json" \
  -d '{"amount": 1234.56, "currency": "USD"}'

# Response:
# {
#   "original": 1234.56,
#   "formatted": "$1,234.56"
# }
```

## 🚀 Getting Started

### Backend API

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Access the tools API at `http://localhost:3001/api/tools`

3. View available endpoints:
```bash
curl http://localhost:3001/api/tools | jq .
```

### Frontend Demo

1. Start the frontend:
```bash
cd frontend
npm run dev
```

2. Open `http://localhost:5173` in your browser

3. Use the interactive demo to test all tools

## 💡 Usage in Your Code

### Backend (TypeScript/Node.js)

```typescript
import {
  convertFromDecimal,
  calculateReturn,
  calculateStatistics,
  validateBet,
  exportToCSV,
  formatCurrency
} from './utils';

// Convert odds
const odds = convertFromDecimal(2.5);
console.log(odds); // { decimal: 2.5, fractional: "3/2", american: 150, ... }

// Calculate return
const totalReturn = calculateReturn(100, 2.5);
console.log(totalReturn); // 250

// Calculate statistics
const stats = calculateStatistics(bets);
console.log(stats.roi); // 62.5

// Validate bet
const validation = validateBet({ stake: 50, odds: 2.0, result: true });
console.log(validation.isValid); // true

// Export data
const csv = exportToCSV(bets);
console.log(csv); // CSV formatted string

// Format currency
const formatted = formatCurrency(1234.56, 'USD');
console.log(formatted); // "$1,234.56"
```

### Frontend (React/TypeScript)

```typescript
// Use the API endpoints
const response = await fetch('http://localhost:3001/api/tools/odds/convert/decimal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ decimal: 2.5 })
});
const data = await response.json();
console.log(data);
```

## 🔒 Security

All tools include input validation and error handling:
- Stake amounts must be positive and within reasonable limits
- Odds values must be valid for their format
- Dates cannot be in the future
- All user input is sanitized before processing

## 📦 No Dependencies

These tools are implemented using only:
- **TypeScript** - Type safety
- **Standard JavaScript APIs** - No external libraries
- **Node.js built-ins** - For backend functionality
- **React** - For frontend components (already in the project)

This approach ensures:
- ✅ **Zero bloat** - No unnecessary dependencies
- ✅ **Fast performance** - No overhead from external libraries
- ✅ **Easy maintenance** - Pure TypeScript code
- ✅ **Full control** - Complete understanding of functionality
- ✅ **No licensing issues** - MIT license compatible

## 🧪 Testing

Test the tools using the included demo:

1. Start both backend and frontend servers
2. Open the demo at `http://localhost:5173`
3. Click through each tool tab to test functionality
4. View results in the results panel

Or test via command line:
```bash
# Test odds conversion
curl -X POST http://localhost:3001/api/tools/odds/convert/decimal \
  -H "Content-Type: application/json" \
  -d '{"decimal": 2.5}'

# Test statistics
curl -X POST http://localhost:3001/api/tools/statistics/calculate \
  -H "Content-Type: application/json" \
  -d '{"bets": [{"stake": 10, "odds": 2.0, "won": true}]}'
```

## 📖 API Reference

For a complete list of all endpoints and their parameters, make a GET request to:
```bash
curl http://localhost:3001/api/tools
```

## 🤝 Contributing

These tools are designed to be:
- **Focused** - Each tool does one thing well
- **Independent** - No dependencies between tools
- **Extensible** - Easy to add new tools following the same pattern

To add a new tool:
1. Create a new file in `backend/src/utils/`
2. Export functions from `backend/src/utils/index.ts`
3. Add API routes in `backend/src/routes/tools.ts`
4. Add frontend demo in `frontend/src/components/ToolsDemo.tsx`

## 📄 License

MIT - Same as the main Bet Buddy project
