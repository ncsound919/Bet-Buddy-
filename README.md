# Bet Buddy 🎯

**Learn from your own bets** - A fast, learning-focused bet improvement app.

Bet Buddy helps you track your sports betting history and provides personalized insights to improve your betting strategy. Not just stats—daily personalized learning that makes improving easy.

## 🌟 Features

### Free Tier
- ✅ Manual bet entry with easy form
- ✅ OCR bet slip upload (5 slips/month)
- ✅ Dashboard with last 10 bets
- ✅ Basic stats: win rate, profit, best bet type
- ✅ One instant learning tip per day
- ✅ Weekly email summary
- ✅ Limit: 20 bets per month

### Pro Tier ($5/month)
- ⭐ **Unlimited everything** - bets, OCR uploads, insights
- ⭐ Advanced trend explorer with custom filters
- ⭐ "Pin & compare" formulas
- ⭐ ROI analysis by bet type
- ⭐ Custom trend alerts
- ⭐ All-time data with dynamic filters
- ⭐ Anonymous leaderboard (opt-in)
- ⭐ Detailed weekly breakdowns
- ⭐ Custom data exports

## 📱 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator, or Expo Go app on your phone

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ncsound919/Bet-Buddy-.git
   cd Bet-Buddy-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (Required)
   
   Create a `.env` file in the root directory with your Firebase credentials:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your device/emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 🏗️ Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper (Material Design)
- **Navigation**: React Navigation
- **State Management**: Zustand + React Query
- **Backend**: Firebase
  - Authentication (Email, Google Sign-In)
  - Firestore Database
  - Cloud Storage
  - Cloud Functions
- **Payments**: Stripe (via Firebase Functions)
- **OCR**: Google Vision API
- **Email**: SendGrid or Firebase Functions

## 📁 Project Structure

```
Bet-Buddy-/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   │   ├── auth/          # Login, signup
│   │   ├── onboarding/    # First-time user tour
│   │   ├── dashboard/     # Main dashboard
│   │   ├── bets/          # Bet entry & management
│   │   ├── insights/      # Insights feed
│   │   └── profile/       # User profile & settings
│   ├── services/          # Business logic & API
│   │   ├── firebase.ts    # Firebase initialization
│   │   ├── authService.ts # Authentication
│   │   ├── betService.ts  # Bet CRUD operations
│   │   ├── insightsService.ts # Insights generation
│   │   └── paymentService.ts  # Stripe integration
│   ├── models/            # TypeScript interfaces
│   ├── navigation/        # Navigation setup
│   ├── utils/             # Helper functions
│   ├── theme/             # Styling & theme
│   └── constants/         # App constants
├── assets/                # Images, fonts
├── App.tsx                # Root component
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## 🔧 Development

### Running Tests
```bash
npm test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 🚀 Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

### Web
```bash
npm run web
expo build:web
```

## 🔐 Firebase Setup

1. Create a Firebase project at https://firebase.google.com
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database with these collections:
   - `users` - User profiles and settings
   - `bets` - Betting history
   - `insights` - Generated insights (optional)
4. Set up Firebase Storage for bet slip images
5. Deploy Cloud Functions for:
   - Stripe payment processing
   - Weekly email summaries
   - OCR processing

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /bets/{betId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 💳 Payment Integration

1. Create a Stripe account
2. Set up Stripe in Firebase:
   ```bash
   firebase ext:install stripe/firestore-stripe-payments
   ```
3. Configure webhook endpoints in Stripe Dashboard
4. Update Cloud Functions to handle subscription events

## 📧 Email Setup

### Using SendGrid
1. Create SendGrid account
2. Add API key to Firebase Functions config
3. Configure email templates

### Using Firebase Functions
See `functions/src/email.ts` for implementation examples

## 📱 Google Vision OCR Setup

1. Enable Google Vision API in Google Cloud Console
2. Add API key to Firebase Functions
3. Configure image processing in `functions/src/ocr.ts`

## 🎯 User Flow

1. **Sign up** (1 min, Google/Apple, no credit card)
2. **Intro tour** - Learn how to use the app
3. **Add first bet** - Manual or OCR upload
4. **View dashboard** - See stats and today's lesson
5. **Get insights** - After 3 bets, patterns emerge
6. **Upgrade prompt** - See value, upgrade to Pro

## 🛣️ Roadmap

### Week 1-2: MVP Foundation ✅
- [x] Project setup and architecture
- [x] Authentication (Email, Google)
- [x] Bet entry and management
- [x] Dashboard with core metrics
- [x] Basic insights engine

### Week 3-4: Pro Features
- [ ] OCR integration (Google Vision)
- [ ] Stripe payment flow
- [ ] Advanced trend analysis
- [ ] Email notification system
- [ ] Leaderboard system

### Week 5-6: Polish & Launch
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Beta testing with real users
- [ ] App Store & Play Store submission
- [ ] Marketing website

### Future Enhancements
- [ ] Machine learning for better insights
- [ ] Social features & sharing
- [ ] Live bet tracking integration
- [ ] Multi-currency support
- [ ] Dark mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React Native Paper for beautiful Material Design components
- Firebase for reliable backend infrastructure
- Expo for simplified mobile development

## 📞 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for sports betting enthusiasts who want to learn and improve.**
