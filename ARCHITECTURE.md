# Bet Buddy Architecture

## Overview

Bet Buddy follows a clean, layered architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App.js                               │
│                   (Error Boundary)                           │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │    ThemeProvider      │
                └───────────┬───────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼─────────┐                   ┌────────▼────────┐
│    Screens      │                   │   Components    │
├─────────────────┤                   ├─────────────────┤
│ - Login         │──────┐            │ - BetEntryForm  │
│ - Signup        │      │            │ - BetDashboard  │
│ - Onboarding    │      │            │ - InsightCard   │
│ - Dashboard     │      │            │ - ChartView     │
│ - BetDetail     │      │            └────────┬────────┘
│ - Settings      │      │                     │
└─────────────────┘      │                     │
                         │                     │
                    ┌────▼─────────────────────▼────┐
                    │         Hooks                 │
                    ├───────────────────────────────┤
                    │ - useAuth                     │
                    │ - useBets                     │
                    │ - useInsights                 │
                    └────┬──────────────────────┬───┘
                         │                      │
        ┌────────────────▼─────┐       ┌───────▼────────┐
        │     Services         │       │     Utils      │
        ├──────────────────────┤       ├────────────────┤
        │ - firebase.js        │       │ - validators   │
        │ - ocr.js             │       │ - formatters   │
        │ - insights.js        │       │ - constants    │
        └──────────┬───────────┘       └────────────────┘
                   │
        ┌──────────▼───────────┐
        │   External Services  │
        ├──────────────────────┤
        │ - Firebase Auth      │
        │ - Firestore DB       │
        │ - Firebase Storage   │
        │ - OCR APIs           │
        └──────────────────────┘
```

## Layer Descriptions

### 1. App Layer
- **App.js**: Root component with global error boundary
- **ThemeProvider**: Provides theme context to all components
- Handles top-level app configuration

### 2. Presentation Layer

#### Screens
User-facing screens that compose the app navigation:
- **Login/Signup**: Authentication flows
- **Onboarding**: First-time user experience
- **Dashboard**: Main view with bets and insights
- **BetDetail**: Individual bet management
- **Settings**: User preferences and account management

#### Components
Reusable UI components:
- **BetEntryForm**: Form for creating/editing bets
- **BetDashboard**: List view of all bets
- **InsightCard**: Display analytics insights
- **ChartView**: Statistical visualizations

### 3. Business Logic Layer

#### Hooks
Custom React hooks for state and business logic:
- **useAuth**: Authentication state and methods
- **useBets**: Bet CRUD operations and real-time updates
- **useInsights**: Analytics and insights generation

### 4. Service Layer

#### Services
External service integrations:
- **firebase.js**: Firebase initialization and configuration
- **ocr.js**: Image processing and bet slip scanning
- **insights.js**: Analytics algorithms and ML logic

#### Utils
Pure utility functions:
- **validators.js**: Input validation functions
- **formatters.js**: Data formatting utilities
- **constants.js**: Application constants

### 5. External Services
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database
- **Firebase Storage**: File storage
- **OCR APIs**: Optical character recognition

## Data Flow

### 1. User Authentication Flow
```
Login Screen → useAuth hook → firebase.js → Firebase Auth
     ↓
User State Updated
     ↓
Dashboard Screen
```

### 2. Bet Creation Flow
```
BetEntryForm → validateBetEntry (validators.js)
     ↓
useBets.addBet → firebase.js → Firestore
     ↓
Real-time listener updates bet list
     ↓
BetDashboard displays updated bets
```

### 3. Insights Generation Flow
```
useBets provides bet data
     ↓
useInsights → insights.js (calculateStats, generateInsights)
     ↓
InsightCard displays insights
```

## State Management

### Local State
- Component-specific state using React `useState`
- Form state in BetEntryForm, Login, Signup

### Global State
- Authentication state via `useAuth` hook
- Bets collection via `useBets` hook with Firestore real-time listeners
- Insights computed from bets via `useInsights` hook

### No Redux
- Context API used only when needed (ThemeProvider)
- Custom hooks provide state management
- Firestore provides real-time data synchronization

## Styling Architecture

### Theme System
```
theme.js (central theme definition)
     ↓
ThemeProvider (App.js)
     ↓
styled-components (access theme via props)
     ↓
Components styled with theme values
```

### Global Styles
- **theme.js**: Colors, spacing, fonts, shadows
- **globals.js**: Reusable styled components
- Component-specific styles in each component file

## Testing Strategy

### Unit Tests
- **validators.test.js**: Input validation logic
- **formatters.test.js**: Data formatting functions
- **insights.test.js**: Analytics calculations

### Integration Tests
- User authentication flows
- Bet CRUD operations
- End-to-end user journeys

### Test Infrastructure
- Jest for test runner
- React Native Testing Library for component tests
- Mock Firebase services for testing

## Security Layers

### 1. Input Validation
- Frontend validation in `validators.js`
- Sanitization of user input
- Type checking with PropTypes

### 2. Authentication
- Firebase Authentication
- Secure token management
- Session handling

### 3. Database Security
- Firestore security rules
- User data isolation
- Row-level security

### 4. Secrets Management
- Environment variables (`.env`)
- No secrets in code
- Cloud secret manager for production

## Scalability Considerations

### Performance
- Real-time updates with Firestore listeners
- Lazy loading of components
- Optimized re-renders with React.memo (when needed)

### Database
- Indexed queries in Firestore
- Pagination for large datasets
- Efficient query patterns

### Code Organization
- Modular architecture
- Clear separation of concerns
- Easy to add new features without impacting existing code

## Development Workflow

```
Developer writes code
     ↓
ESLint checks code style
     ↓
Prettier formats code
     ↓
Jest runs tests
     ↓
Git commit (conventional format)
     ↓
GitHub Actions CI/CD
     ↓
Code review
     ↓
Merge to dev/main
```

## Key Design Principles

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **DRY (Don't Repeat Yourself)**: Reusable components and utilities
3. **Single Responsibility**: Each file/function does one thing well
4. **Testability**: Pure functions and mockable dependencies
5. **Type Safety**: PropTypes for runtime type checking
6. **Error Handling**: Comprehensive error boundaries and try/catch
7. **Accessibility**: WCAG AA compliance
8. **Security First**: Input validation, secrets management
9. **Documentation**: Inline comments and comprehensive docs
10. **Maintainability**: Clear patterns and coding standards

## Future Enhancements

### Planned Features
- Machine learning models for bet predictions
- Social features (share bets with friends)
- Advanced analytics and reporting
- Push notifications for bet updates
- Integration with sportsbooks APIs

### Technical Improvements
- TypeScript migration for type safety
- GraphQL for more efficient data fetching
- Offline support with local storage
- Performance monitoring with Sentry
- A/B testing framework
This document describes the technical architecture of Bet Buddy.

## Overview

Bet Buddy is a mobile-first application built with React Native and Expo, backed by Firebase services. The app helps users track their sports betting history and provides personalized insights to improve their betting strategy.

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client Layer                       │
│  ┌─────────────────────────────────────────────┐   │
│  │        React Native (Expo)                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │   iOS    │  │ Android  │  │   Web    │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│                 Firebase Services                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │   Auth   │  │Firestore │  │ Storage  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │Functions │  │Analytics │  │ Hosting  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│              Third-Party Services                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Stripe  │  │SendGrid  │  │ Vision   │          │
│  │ Payments │  │  Email   │  │   API    │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack

- **Framework**: React Native 0.73
- **Runtime**: Expo 50
- **Language**: TypeScript 5.3
- **UI Library**: React Native Paper 5.12
- **Navigation**: React Navigation 6
- **State Management**: 
  - Zustand (global state)
  - React Query (server state)
- **Styling**: StyleSheet API with theme system

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Generic components (buttons, inputs)
│   ├── bet/             # Bet-specific components
│   └── insight/         # Insight-specific components
│
├── screens/             # Screen components
│   ├── auth/            # Authentication screens
│   ├── onboarding/      # First-time user experience
│   ├── dashboard/       # Main dashboard
│   ├── bets/            # Bet management screens
│   ├── insights/        # Insights and analytics
│   └── profile/         # User profile and settings
│
├── services/            # Business logic layer
│   ├── firebase.ts      # Firebase initialization
│   ├── authService.ts   # Authentication logic
│   ├── betService.ts    # Bet CRUD operations
│   ├── insightsService.ts # Insights generation
│   └── paymentService.ts  # Payment processing
│
├── models/              # TypeScript types and interfaces
│   ├── User.ts          # User data model
│   ├── Bet.ts           # Bet data model
│   └── Insight.ts       # Insight data model
│
├── navigation/          # Navigation configuration
│   ├── AppNavigator.tsx # Authenticated app navigation
│   └── AuthNavigator.tsx # Authentication flow navigation
│
├── utils/               # Helper functions
│   └── calculations.ts  # Betting calculations
│
├── theme/               # Styling and theming
│   └── theme.ts         # Theme configuration
│
└── constants/           # App-wide constants
    └── limits.ts        # Feature limits and tiers
```

### Component Architecture

```
App.tsx (Root)
├── QueryClientProvider (React Query)
├── PaperProvider (UI Theme)
└── NavigationContainer
    ├── AuthNavigator (Not authenticated)
    │   ├── LoginScreen
    │   ├── SignUpScreen
    │   └── OnboardingScreen
    │
    └── AppNavigator (Authenticated)
        └── BottomTabNavigator
            ├── DashboardScreen
            ├── BetEntryScreen
            ├── InsightsScreen
            └── ProfileScreen
```

### State Management Strategy

1. **Local Component State**: useState for UI-only state
2. **Global State (Zustand)**: User preferences, app-wide settings
3. **Server State (React Query)**: API data, caching, synchronization
4. **Navigation State**: React Navigation manages navigation state

### Data Flow

```
User Action
    ↓
Component Handler
    ↓
Service Layer (Business Logic)
    ↓
Firebase SDK (API Call)
    ↓
Firestore/Auth/Storage
    ↓
Response
    ↓
Update UI State
    ↓
Re-render Component
```

## Backend Architecture

### Firebase Services

#### 1. Authentication
- **Purpose**: User identity management
- **Providers**: Email/Password, Google Sign-In
- **Features**: 
  - User registration and login
  - Password reset
  - Session management

#### 2. Firestore Database
- **Purpose**: NoSQL document database
- **Collections**:
  ```
  users/
    {userId}/
      email: string
      displayName: string
      isPro: boolean
      settings: object
      stats: object
      
  bets/
    {betId}/
      userId: string
      sport: string
      betType: string
      odds: number
      stake: number
      result: string
      profit: number
      date: timestamp
      
  insights/ (optional, can be generated on-demand)
    {insightId}/
      userId: string
      type: string
      title: string
      description: string
      data: object
  ```

#### 3. Cloud Storage
- **Purpose**: File storage for bet slip images
- **Structure**:
  ```
  bet-slips/
    {userId}/
      {betId}-{timestamp}.jpg
  ```

#### 4. Cloud Functions
- **Purpose**: Backend logic and integrations
- **Functions**:
  - `createCheckoutSession`: Stripe payment initiation
  - `handleStripeWebhook`: Process payment events
  - `sendWeeklySummary`: Scheduled email notifications
  - `processBetSlipOCR`: OCR image processing
  - `updateUserStatsOnBetSettle`: Auto-update user statistics

### Database Schema

#### Users Collection

```typescript
{
  id: string,                    // Auto-generated
  email: string,
  displayName?: string,
  photoURL?: string,
  isPro: boolean,
  proExpiresAt?: Timestamp,
  stripeSubscriptionId?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  settings: {
    notifications: {
      weekly: boolean,
      insights: boolean,
      trends: boolean
    },
    privacy: {
      leaderboardOptIn: boolean
    }
  },
  stats: {
    totalBets: number,
    totalWins: number,
    totalLosses: number,
    totalProfit: number,
    currentStreak: number,
    longestStreak: number,
    avgOdds: number
  }
}
```

#### Bets Collection

```typescript
{
  id: string,
  userId: string,               // Foreign key to users
  sport: string,
  betType: 'SPREAD' | 'MONEYLINE' | 'OVER_UNDER' | 'PROP' | 'PARLAY',
  description: string,
  odds: number,                 // American odds format
  stake: number,                // USD
  result: 'WIN' | 'LOSS' | 'PUSH' | 'PENDING',
  profit?: number,              // Calculated
  date: Timestamp,
  settledAt?: Timestamp,
  notes?: string,
  teams?: {
    home: string,
    away: string
  },
  slipImageUrl?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // Bets are private to the user
    match /bets/{betId} {
      allow create: if isSignedIn() && 
        request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isSignedIn() && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /bet-slips/{userId}/{fileName} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
  }
}
```

## Third-Party Integrations

### Stripe Payment Processing

**Flow**:
1. User clicks "Upgrade to Pro"
2. Frontend calls `createCheckoutSession` Cloud Function
3. Function creates Stripe Checkout Session
4. User redirected to Stripe payment page
5. User completes payment
6. Stripe sends webhook to `handleStripeWebhook`
7. Function updates user's Pro status in Firestore
8. Frontend auto-updates via Firestore listener

### Google Vision API (OCR)

**Flow**:
1. User uploads bet slip image
2. Image uploaded to Cloud Storage
3. Storage trigger invokes `processBetSlipOCR` function
4. Function sends image to Vision API
5. Vision API returns detected text
6. Function parses text for betting info
7. Function creates bet record in Firestore
8. User notified of new bet

### SendGrid Email Service

**Flow**:
1. Scheduled function `sendWeeklySummary` runs (every Monday 9 AM)
2. Function queries users with weekly notifications enabled
3. For each user, fetch bets from past week
4. Calculate weekly statistics
5. Send email via SendGrid API with stats and insights
6. Log delivery status

## Insights Engine

### Rule-Based Analysis (MVP)

The insights engine analyzes betting patterns using simple rules:

1. **Best Bet Type**: Identifies bet type with highest win rate (min 3 bets)
2. **Sport Performance**: Finds most profitable sport
3. **Odds Analysis**: Compares performance on favorites vs underdogs
4. **Profit Trend**: Analyzes recent 5 bets vs overall performance

### Future: ML-Based Insights

Planned enhancements:
- Pattern recognition using machine learning
- Predictive models for bet outcomes
- Personalized recommendations
- Anomaly detection

## Performance Considerations

### Optimization Strategies

1. **Data Fetching**:
   - Use pagination for large datasets
   - Implement infinite scroll for bet history
   - Cache frequently accessed data

2. **Image Handling**:
   - Compress images before upload
   - Use thumbnails for list views
   - Lazy load images

3. **Analytics**:
   - Calculate insights on-demand for free users
   - Pre-compute insights for Pro users
   - Cache insights with TTL

4. **Firestore Optimization**:
   - Use composite indexes for complex queries
   - Batch writes when possible
   - Limit real-time listeners

### Scalability

- **Horizontal Scaling**: Firebase auto-scales
- **Cost Management**: 
  - Free tier limits for non-paying users
  - Efficient queries to minimize reads
  - CDN for static assets

## Security

### Data Protection

1. **Authentication**: Firebase Auth with secure tokens
2. **Authorization**: Firestore security rules
3. **Data Encryption**: At rest and in transit (Firebase default)
4. **API Keys**: Environment variables, never committed
5. **User Privacy**: Data isolated per user, opt-in features

### Compliance

- **GDPR**: User data deletion capability
- **CCPA**: Data export functionality
- **PCI DSS**: Stripe handles payment data (PCI compliant)

## Monitoring and Analytics

### Firebase Analytics
- User engagement metrics
- Screen view tracking
- Feature usage statistics
- Conversion funnel analysis

### Error Tracking
- Firebase Crashlytics for crash reports
- Custom error logging for Cloud Functions
- Performance monitoring

### Key Metrics
- Daily/Monthly Active Users (DAU/MAU)
- Conversion rate (Free → Pro)
- Average bets per user
- Win rate distribution
- Churn rate

## Deployment

### Continuous Integration/Deployment

```
Git Push
    ↓
GitHub Actions (future)
    ↓
├── Run Tests
├── Lint Code
├── Type Check
└── Build
    ↓
├── Deploy Functions → Firebase
├── Deploy Web → Firebase Hosting
└── Build Mobile → EAS Build (Expo)
    ↓
App Stores (iOS/Android)
```

### Environments

1. **Development**: Local with Firebase emulators
2. **Staging**: Firebase project with test data
3. **Production**: Production Firebase project

## Future Architecture Enhancements

1. **Microservices**: Separate services for analytics, notifications
2. **Real-time Features**: Live betting updates, live chat
3. **Machine Learning**: Advanced insights, predictions
4. **GraphQL**: Replace REST with GraphQL API
5. **Progressive Web App**: Full offline support
6. **Multi-region**: Deploy to multiple regions for lower latency

---

This architecture provides a solid foundation for Bet Buddy's MVP and is designed to scale as the user base grows.
