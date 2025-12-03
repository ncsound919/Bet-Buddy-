# Bet Buddy - Quick Start Guide

Get up and running with Bet Buddy in minutes!

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Expo CLI**: `npm install -g expo-cli`
- **Git**: For version control

Optional:
- **iOS Simulator** (Mac only): Xcode from Mac App Store
- **Android Studio**: For Android emulator

## Quick Setup (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/ncsound919/Bet-Buddy-.git
cd Bet-Buddy-
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials (see Firebase Setup below).

### 4. Start the Development Server

```bash
npm start
```

This will start the Expo development server. You'll see a QR code in your terminal.

### 5. Run on Your Device

**Option A: Physical Device**
1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code with your camera (iOS) or Expo Go app (Android)

**Option B: Simulator**
- Press `i` for iOS simulator (Mac only)
- Press `a` for Android emulator

🎉 **Done!** The app should now be running.

## Firebase Setup (Optional but Recommended)

To use authentication and database features, set up Firebase:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "bet-buddy" (or your choice)
4. Disable Google Analytics (optional for development)
5. Click "Create project"

### 2. Register Your App

1. In Firebase console, click the web icon (</>) to add a web app
2. Enter app nickname: "Bet Buddy Web"
3. Don't enable Firebase Hosting (yet)
4. Click "Register app"

### 3. Copy Configuration

Copy the Firebase config values to your `.env` file:

```bash
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 4. Enable Authentication

1. In Firebase console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method

### 5. Create Firestore Database

1. In Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred location
5. Click "Enable"

### 6. Restart the App

```bash
# Stop the server (Ctrl+C)
npm start
```

Now authentication and database features will work!

## Common Commands

```bash
# Start development server
npm start

# Run on iOS simulator (Mac only)
npm run ios

# Run on Android emulator
npm run android

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Fix linting issues
npm run lint:fix
```

## Project Structure Overview

```
bet-buddy/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/         # Screen components (pages)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # External service integrations
│   ├── utils/           # Utility functions
│   ├── styles/          # Theme and global styles
│   └── assets/          # Images, icons, fonts
├── tests/
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
└── App.js              # Root component
```

## Making Your First Change

### Example: Add a New Insight

1. Open `src/services/insights.js`
2. Find the `generateInsights` function
3. Add a new insight:

```javascript
if (stats.totalBets > 10) {
  insights.push({
    title: '🎯 Experienced Bettor',
    message: `You've placed ${stats.totalBets} bets! You're building a solid history.`,
  })
}
```

4. Save the file
5. The app will automatically reload with your change!

### Example: Create a New Component

1. Create `src/components/MyComponent.js`:

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const Container = styled.View`
  padding: 16px;
  background: #1a1a1a;
  border-radius: 8px;
`

export const MyComponent = ({ title }) => (
  <Container>
    <styled.Text style={{ color: '#fff' }}>{title}</styled.Text>
  </Container>
)

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
}
```

2. Import and use it in a screen:

```javascript
import { MyComponent } from 'src/components/MyComponent'

// In your screen component
<MyComponent title="Hello, World!" />
```

## Testing Your Changes

Always test your changes before committing:

```bash
# Run all tests
npm test

# Test specific file
npm test validators.test.js

# Run linter
npm run lint
```

## Troubleshooting

### "Module not found" errors
```bash
# Clear cache and restart
rm -rf node_modules
npm install
npm start -- --clear
```

### Firebase connection issues
- Check your `.env` file has correct Firebase credentials
- Ensure Firebase Authentication and Firestore are enabled in console
- Verify your computer has internet connection

### Expo Go not connecting
- Ensure your phone and computer are on the same WiFi network
- Try scanning the QR code again
- Restart the Expo development server

### App crashes on startup
- Check terminal for error messages
- Ensure all dependencies are installed: `npm install`
- Try clearing cache: `npm start -- --clear`

## Next Steps

1. **Read the Documentation**
   - [README.md](./README.md) - Project overview
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture

2. **Explore the Code**
   - Start with `App.js`
   - Check out `src/screens/Dashboard.js`
   - Look at `src/components/InsightCard.js`

3. **Build a Feature**
   - Pick an issue from GitHub Issues
   - Create a feature branch: `git checkout -b feature/my-feature`
   - Make your changes
   - Submit a pull request

4. **Join the Community**
   - Star the repository on GitHub
   - Report bugs or suggest features
   - Contribute code improvements

## Useful Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Styled Components](https://styled-components.com/)
- [Jest Testing](https://jestjs.io/docs/getting-started)

## Getting Help

- **Issues**: Check [GitHub Issues](https://github.com/ncsound919/Bet-Buddy-/issues)
- **Discussions**: Start a discussion on GitHub
- **Code Review**: Submit a PR and ask for feedback

## Development Tips

1. **Hot Reload**: Changes automatically reload in Expo
2. **Debug Menu**: Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
3. **Console Logs**: View in terminal or React Native Debugger
4. **Component Inspector**: Press `Cmd+D` → "Show Element Inspector"

## Ready to Build?

You're all set! Start exploring the codebase and building amazing features. 

Happy coding! 🚀
Get up and running with Bet Buddy in 10 minutes!

## 1. Prerequisites (2 minutes)

Install these if you haven't already:
```bash
# Node.js (v18+)
node --version  # Should be 18 or higher

# Expo CLI
npm install -g expo-cli
```

## 2. Clone & Install (3 minutes)

```bash
# Clone repository
git clone https://github.com/ncsound919/Bet-Buddy-.git
cd Bet-Buddy-

# Install dependencies
npm install
```

## 3. Firebase Setup (3 minutes)

### Quick Firebase Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" → Name it "BetBuddy-Dev" → Create
3. Click web icon (</>) → Register app
4. Copy the config values

### Configure Environment:
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your Firebase config
nano .env  # or use your favorite editor
```

Paste your Firebase config:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key-here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

### Enable Firebase Services:
In Firebase Console:
- **Authentication** → Enable Email/Password
- **Firestore Database** → Create database (start in test mode)
- **Storage** → Get started

## 4. Start Development Server (1 minute)

```bash
npm start
```

## 5. Open App (1 minute)

Choose your platform:
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your phone

## That's It! 🎉

You should now see the Bet Buddy login screen.

### Test Account
Create a test account:
- Email: test@example.com
- Password: test123

## Quick Commands

```bash
# Start app
npm start

# Run on specific platform
npm run ios       # iOS
npm run android   # Android
npm run web       # Web

# Testing
npm test          # Run tests
npm run lint      # Lint code
npm run type-check # TypeScript check
```

## What's Next?

1. **Explore the app**: Create an account and add your first bet
2. **Read the docs**: Check out [README.md](README.md) for full features
3. **Customize**: Edit theme in `src/theme/theme.ts`
4. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) when ready

## Common Issues

### "Cannot connect to Metro bundler"
```bash
# Clear cache and restart
expo start -c
```

### "Firebase error"
- Check your `.env` file has correct values
- Ensure Firebase services are enabled in console

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Need Help?

- 📖 [Full Setup Guide](SETUP.md)
- 🏗️ [Architecture Docs](ARCHITECTURE.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 🤝 [Contributing](CONTRIBUTING.md)

---

**Happy coding! Start tracking your bets and learning from your patterns!** 🎯
