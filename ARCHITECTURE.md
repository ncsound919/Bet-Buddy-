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
