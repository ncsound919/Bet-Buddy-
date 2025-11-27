# Bet Buddy Tools

A comprehensive collection of open-source utility tools for betting analysis and data management. All tools are implemented using vanilla TypeScript with **no external dependencies** to keep the application lightweight and maintainable.

## 🎯 Overview

These tools add powerful functionality to Bet Buddy without bloat or overreach. Each tool is focused, efficient, and available through both backend API endpoints and frontend components.

## 🛠️ Available Tools

### 1. 📷 Screenshot OCR (Azure Computer Vision)

Extract betting odds from screenshots automatically using Azure Computer Vision.

**Features:**
- Upload betting screenshots (DraftKings, FanDuel, etc.)
- Automatically extract odds in multiple formats (American, Decimal, Fractional)
- Parse and convert extracted odds to decimal format
- Confidence scoring for extraction accuracy
- Works with Android apps via file upload

**API Endpoints:**
- `POST /api/ocr/extract` - Upload and extract odds from screenshot
- `GET /api/ocr/status` - Check if Azure credentials are configured

**Setup:**
1. Create an Azure Computer Vision resource at [Azure Portal](https://portal.azure.com/)
2. Copy your endpoint and key
3. Add to backend `.env` file:
   ```
   AZURE_VISION_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
   AZURE_VISION_KEY=your-subscription-key
   ```

**Example Usage:**
```bash
curl -X POST http://localhost:3001/api/ocr/extract \
  -F "image=@screenshot.jpg"

# Response:
# {
#   "success": true,
#   "extractedOdds": [
#     {"text": "+150", "value": 150, "format": "american", "confidence": 0.9}
#   ],
#   "parsedOdds": [
#     {"original": "+150", "decimal": 2.5, "format": "american"}
#   ],
#   "confidence": 0.9
# }
```

**Note:** Requires Azure subscription. Free tier includes 5,000 transactions/month.

### 2. 📊 Odds Calculator

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

### 3. 📈 Statistics Engine

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

### 4. ✅ Data Validator

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

### 5. 💾 Data Exporter

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

### 6. 🎨 Data Formatter

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

### 7. 💰 Bankroll Manager

Manage your betting bankroll responsibly with stake sizing tools and responsible gambling features.

**Features:**
- Calculate suggested stakes using fractional Kelly Criterion
- Calculate flat stakes based on risk tolerance
- Set and check betting limits (daily, weekly, monthly)
- Calculate stop-loss and take-profit levels
- Get responsible gambling tips and resources
- Evaluate betting sessions for tilt detection

**API Endpoints:**
- `POST /api/tools/bankroll/suggested-stake` - Calculate optimal stake using Kelly Criterion
- `POST /api/tools/bankroll/flat-stake` - Calculate fixed percentage stake
- `POST /api/tools/bankroll/unit-size` - Calculate unit size for tracking
- `POST /api/tools/bankroll/check-limits` - Check if stake exceeds limits
- `POST /api/tools/bankroll/stop-levels` - Get stop-loss and take-profit levels
- `GET /api/tools/bankroll/responsible-gambling` - Get tips and resources
- `POST /api/tools/bankroll/evaluate-session` - Evaluate session for breaks

**Example Usage:**
```bash
# Calculate suggested stake
curl -X POST http://localhost:3001/api/tools/bankroll/suggested-stake \
  -H "Content-Type: application/json" \
  -d '{
    "bankroll": 1000,
    "odds": 2.0,
    "estimatedWinProbability": 0.55,
    "riskTolerance": "moderate"
  }'

# Response:
# {
#   "suggestedStake": 25.00,
#   "maxStake": 40.00,
#   "minStake": 1.00,
#   "riskLevel": "moderate",
#   "reasoning": "Based on 50% Kelly Criterion with moderate risk profile."
# }

# Calculate stop levels
curl -X POST http://localhost:3001/api/tools/bankroll/stop-levels \
  -H "Content-Type: application/json" \
  -d '{"bankroll": 1000, "riskTolerance": "moderate"}'

# Response:
# {
#   "stopLoss": 800,
#   "stopLossPercentage": 20,
#   "takeProfit": 1300,
#   "takeProfitPercentage": 30,
#   "recommendations": [...]
# }
```

### 8. 📚 Educational Resources

Comprehensive betting education through the frontend, including:

**Topics Covered:**
- Understanding Betting Odds (decimal, American, fractional)
- Types of Bets (moneyline, spreads, totals, parlays, props, futures)
- Bankroll Management 101
- The Kelly Criterion
- Finding Value Bets
- Common Betting Mistakes to Avoid
- Responsible Gambling Guide
- Line Shopping for Best Odds

**Access:**
Available in the frontend at the "Learn" tab with searchable, categorized guides.

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

## 📦 Dependencies

These tools are implemented with minimal dependencies:

**Core Tools (1-5):** Pure TypeScript with no external dependencies
- ✅ **Zero bloat** - No unnecessary dependencies
- ✅ **Fast performance** - No overhead from external libraries
- ✅ **Easy maintenance** - Pure TypeScript code

**Screenshot OCR (Tool 6):** Azure Computer Vision integration
- `@azure/cognitiveservices-computervision` - Azure SDK for OCR
- `@azure/ms-rest-js` - Azure authentication
- `multer` - File upload handling

Benefits:
- ✅ **Accurate OCR** - Industry-leading text recognition
- ✅ **Microsoft 365 ecosystem** - Integrates with Azure
- ✅ **Free tier available** - 5,000 transactions/month
- ✅ **Enterprise ready** - Scalable and reliable

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
