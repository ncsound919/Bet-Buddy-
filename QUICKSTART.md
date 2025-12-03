# Bet Buddy - Quick Start Guide

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
