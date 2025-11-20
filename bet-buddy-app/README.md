# Bet Buddy App (Frontend)

Mobile application for tracking and analyzing sports betting performance.

## Features

- **Authentication**: User login and signup
- **Bet Entry**: Manual bet entry with form validation
- **OCR Integration**: Image-based bet entry (premium feature)
- **Dashboard**: Overview of betting performance
- **Insights**: Analytics and statistics
- **Profile Management**: User settings and preferences
- **Premium Subscription**: Upgrade flow with Stripe integration

## Project Structure

```
/bet-buddy-app/
  /src/
    /components/      # Reusable UI components
    /screens/         # Screen components for navigation
    /hooks/           # Custom React hooks
    /services/        # API and external service integrations
    /utils/           # Utility functions
    /contexts/        # React Context providers
    /styles/          # Theme and global styles
    /assets/          # Images and icons
    /tests/           # Unit and integration tests
  App.js              # Root component
  index.js            # Entry point
  routes.js           # Navigation configuration
  package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
cd bet-buddy-app
npm install
```

### Running the App

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Development

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix
```

## Deployment

### Web (PWA)

Deploy to Firebase Hosting, Netlify, or Vercel:

```bash
expo build:web
# Deploy the web-build directory
```

### Mobile

```bash
# Android
expo build:android

# iOS
expo build:ios
```

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Key Dependencies

- **React Native**: Mobile framework
- **Expo**: Development and build toolchain
- **React Navigation**: Navigation library
- **Firebase**: Backend services (Auth, Firestore, Storage)

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Submit a pull request

## License

MIT
