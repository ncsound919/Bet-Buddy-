# Changelog

All notable changes to Bet Buddy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-20

### 🎉 Initial MVP Release

#### Added

**Authentication & User Management**
- Email/password authentication
- Google Sign-In integration setup
- User profile creation with default settings
- User session management
- Profile display with statistics

**Onboarding**
- Multi-step onboarding tour introducing app features
- Welcome screen explaining app benefits
- Skip functionality for returning users

**Bet Management**
- Manual bet entry with comprehensive form
- Support for 12+ sports (NFL, NBA, MLB, NHL, NCAA Football, NCAA Basketball, Soccer, UFC/MMA, Boxing, Tennis, Golf, Other)
- 6 bet types: Spread, Moneyline, Over/Under, Prop, Parlay, Teaser
- American odds format support
- Bet result tracking (Win, Loss, Push, Pending)
- Automatic profit/loss calculation
- Bet notes and descriptions
- Recent bets display on dashboard

**Dashboard**
- Real-time statistics: total bets, win rate, profit, current streak
- Last 5 bets quick view
- Motivational messages based on performance
- Pro upgrade card for free users
- Pull-to-refresh functionality
- Color-coded profit/loss indicators

**Insights Engine**
- Rule-based betting pattern analysis
- Best bet type identification (minimum 3 bets)
- Sport performance analysis
- Odds pattern detection (favorites vs underdogs performance)
- Profit trend analysis (recent 5 bets vs overall)
- Actionable recommendations for improvement
- Visual insight cards with data metrics

**User Profile & Settings**
- User statistics display (total bets, wins, profit)
- Notification preferences (weekly summary, insight alerts)
- Privacy settings (leaderboard opt-in for Pro users)
- Referral system UI with shareable codes
- Pro status badge display
- Sign out with confirmation

**Free vs Pro Tier**
- Free tier: 20 bets/month, 5 OCR/month, last 10 bets view, 1 insight/day
- Pro tier: Unlimited everything, advanced features
- $5/month subscription pricing
- Feature gating based on subscription status
- Upgrade prompts throughout the app

**Firebase Integration**
- Authentication service with email/password and OAuth
- Firestore database for user and bet data
- Cloud Storage configuration for bet slip images
- Real-time data synchronization
- Security rules for data protection

**Firebase Cloud Functions**
- Stripe checkout session creation
- Payment webhook handling
- Weekly email summary (scheduled for Mondays 9 AM)
- OCR processing trigger for uploaded images
- Automatic user statistics updates
- Subscription management (creation/cancellation)

**Payment Processing**
- Stripe integration setup
- Pro subscription checkout flow
- Payment success handling
- Subscription expiration tracking
- Cancel subscription functionality

**Utilities & Calculations**
- American odds profit calculation
- Win rate, total profit, ROI calculations
- Win/loss streak tracking
- Odds and currency formatting
- Implied probability conversion
- Bet grouping by time period

**Documentation**
- Comprehensive README with features and quick start
- Detailed SETUP guide with step-by-step instructions
- ARCHITECTURE documentation of system design
- DEPLOYMENT guide for iOS, Android, and web
- CONTRIBUTING guidelines for developers
- QUICKSTART guide for 10-minute setup
- FEATURES checklist of all functionality
- Environment variable examples

**Developer Experience**
- TypeScript for type safety
- ESLint and TypeScript configuration
- Jest testing framework setup
- React Native Paper UI components
- React Navigation for routing
- Path aliases for clean imports
- Hot reloading support

### Technical Stack
- React Native 0.73 with Expo 50
- TypeScript 5.3
- Firebase (Auth, Firestore, Functions, Storage)
- Stripe for payments
- React Native Paper for UI
- React Navigation 6
- Zustand + React Query for state management

### Known Limitations
- OCR functionality prepared but requires Google Vision API setup
- Email notifications configured but require SendGrid integration
- Google Sign-In configured but needs OAuth credentials
- Leaderboard and social features planned for future release

### Security
- Firebase security rules implemented
- Environment variables for sensitive data
- Input validation on all forms
- User data isolation (users can only access their own data)
- Secure payment processing via Stripe

## [Unreleased]

### Planned for v1.1.0
- [ ] Complete OCR integration with Google Vision API
- [ ] Email notifications via SendGrid
- [ ] Advanced charts and trend explorer
- [ ] Custom date range filters
- [ ] Data export functionality (CSV, PDF)

### Planned for v1.2.0
- [ ] Anonymous leaderboard with real data
- [ ] Social sharing features
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Biometric authentication

### Planned for v2.0.0
- [ ] Machine learning-based insights
- [ ] Betting platform integrations (DraftKings, FanDuel)
- [ ] Live bet tracking
- [ ] Bet recommendations engine
- [ ] Multi-currency support

## How to Upgrade

When new versions are released:

1. Pull latest changes: `git pull origin main`
2. Update dependencies: `npm install`
3. Check for breaking changes in this changelog
4. Update environment variables if needed
5. Run migrations (if any): `npm run migrate`
6. Rebuild app: `npm run build`

## Support

For issues or questions about releases:
- Check [GitHub Issues](https://github.com/ncsound919/Bet-Buddy-/issues)
- Review documentation in the repo
- Contact support team

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes
