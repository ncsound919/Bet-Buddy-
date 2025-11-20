# Bet Buddy 🎲

> Learn from your own bets - Track, analyze, and improve your betting strategy

## Overview

Bet Buddy is a mobile application designed to help sports bettors track their betting history, analyze performance patterns, and make data-driven decisions to improve their betting strategy. Built with React Native and Expo, it provides a seamless experience across iOS, Android, and web platforms.

## Features

- 📊 **Bet Tracking**: Record all your sports bets with detailed information
- 📈 **Performance Analytics**: View comprehensive statistics and insights
- 🎯 **Smart Insights**: Get AI-powered recommendations based on your betting patterns
- 🔐 **Secure Authentication**: Firebase-based user authentication
- 🌙 **Dark Mode**: Built-in dark theme for comfortable viewing
- ♿ **Accessibility**: WCAG AA compliant

## Project Structure

```
bet-buddy/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BetEntryForm.js
│   │   ├── BetDashboard.js
│   │   ├── InsightCard.js
│   │   └── ChartView.js
│   ├── screens/             # Screen components
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Onboarding.js
│   │   ├── Dashboard.js
│   │   ├── BetDetail.js
│   │   └── Settings.js
│   ├── services/            # External service integrations
│   │   ├── firebase.js      # Auth, DB, storage setup
│   │   ├── ocr.js           # OCR integrations
│   │   └── insights.js      # Rules and ML logic
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useBets.js
│   │   └── useInsights.js
│   ├── utils/               # Utility functions
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── assets/              # Images, icons, fonts
│   └── styles/              # Theme and global styles
│       ├── theme.js
│       └── globals.js
├── tests/
│   ├── unit/               # Unit tests
│   └── integration/        # Integration tests
├── App.js                  # Root component with error boundary
├── app.json                # Expo configuration
├── package.json            # Dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ncsound919/Bet-Buddy-.git
cd Bet-Buddy-
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Add your Firebase configuration to `.env`
   - Enable Authentication and Firestore in Firebase console

### Running the App

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Development

### Coding Standards

- **Naming Conventions**:
  - Components: `PascalCase` (e.g., `BetEntryForm`)
  - Functions/Variables: `camelCase` (e.g., `getInsightData`)
  - Files: Match component name (e.g., `BetEntryForm.js`)

- **Component Guidelines**:
  - One component per file
  - Use PropTypes for type checking
  - Pure functions where possible
  - No side effects in components—use hooks or service layer

- **Imports**:
  - Use absolute imports: `import { BetEntryForm } from 'src/components/BetEntryForm'`

### State Management

- React Context or Redux only if passing state through >3 levels
- Custom hooks for business logic
- Service layer for external API calls

### Error Handling

- All async operations use try/catch
- Global error boundary at App.js level
- User feedback for all actions (success, error, loading)
- Never silent fail

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

All new features must include:
- Unit tests for utils, hooks, and services
- Integration tests for forms and user flows

### Linting and Formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Database Schema

### Bet Document (Firestore)

```javascript
{
  userId: string,
  betType: string,        // 'moneyline', 'spread', 'parlay'
  teams: [string],
  odds: number,
  stake: number,
  result: string,         // 'win', 'loss', 'pending'
  payout: number,
  date: timestamp,
  notes: string          // optional
}
```

## Branching Strategy

- `main`: Stable releases
- `dev`: In-progress features
- `feature/xyz`: One feature per branch

### Commit Convention

Use conventional commit format:
```
feat: add odds input to bet form
fix: correct win rate calculation
docs: update README with setup instructions
```

## Deployment

### Staging
- Test merges to staging Firebase project
- Use Expo for mobile preview

### Production
- Build with `expo build:android` or `expo build:ios`
- Submit to App Store / Play Store

## Security & Compliance

- ✅ No secrets/keys in repo (use .env and cloud secret manager)
- ✅ Input validation on frontend and backend
- ✅ GDPR: All data is user-deleteable on request
- ✅ Payments: Stripe/Play billing only, no card storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Requirements

- At least one reviewer approval
- All CI checks passing
- Code follows style guidelines
- Tests included for new features

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ by the Bet Buddy team
