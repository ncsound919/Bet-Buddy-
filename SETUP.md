# Bet Buddy - Complete Setup Guide

This guide will help you set up Bet Buddy from scratch, including all necessary Firebase, Stripe, and third-party integrations.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher): [Download here](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **Git**: [Download here](https://git-scm.com/)
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** with Android Emulator
- **Expo Go** app on your phone (optional, for testing on real devices)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/ncsound919/Bet-Buddy-.git
cd Bet-Buddy-

# Install dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

## Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Give it a name like "Bet-Buddy"
4. Disable Google Analytics (optional)

### 2.2 Register Your App

1. In Firebase Console, click the web icon (</>) to add a web app
2. Register app with nickname "Bet Buddy Web"
3. Copy the Firebase configuration object

### 2.3 Enable Authentication

1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** authentication
   - You'll need to set up OAuth consent screen in Google Cloud Console
   - Add authorized domains (your app's domain)

### 2.4 Create Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Start in **production mode** (we'll add rules next)
3. Choose a location close to your users

### 2.5 Set Up Firestore Security Rules

Go to **Firestore Database** > **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own bets
    match /bets/{betId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Insights are read-only for users
    match /insights/{insightId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 2.6 Set Up Cloud Storage

1. Go to **Storage** > **Get started**
2. Start in **production mode**
3. Choose same location as Firestore

### 2.7 Storage Security Rules

Go to **Storage** > **Rules** and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /bet-slips/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2.8 Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase config:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 3: Stripe Setup (Payment Processing)

### 3.1 Create Stripe Account

1. Sign up at [Stripe](https://stripe.com/)
2. Complete account verification
3. Get your API keys from Dashboard

### 3.2 Install Stripe Firebase Extension

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select: Functions, Hosting (optional)

# Install Stripe extension
firebase ext:install stripe/firestore-stripe-payments
```

Follow the prompts to configure:
- Stripe API Secret Key (test mode)
- Customer and subscription collections
- Sync new users to Stripe

### 3.3 Configure Stripe Webhook

1. In Stripe Dashboard, go to **Developers** > **Webhooks**
2. Add endpoint: `https://us-central1-YOUR-PROJECT.cloudfunctions.net/handleStripeWebhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
4. Copy the webhook signing secret
5. Add to `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Step 4: Google Cloud Vision API (OCR)

### 4.1 Enable Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** > **Library**
4. Search for "Cloud Vision API"
5. Click **Enable**

### 4.2 Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Restrict the key to Cloud Vision API
4. Add to `.env`:
   ```
   GOOGLE_CLOUD_VISION_API_KEY=your-key
   ```

## Step 5: SendGrid Setup (Email Notifications)

### 5.1 Create SendGrid Account

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Verify your sender email
3. Create an API key

### 5.2 Configure SendGrid

Add to `.env`:
```
SENDGRID_API_KEY=SG.your-api-key
```

### 5.3 Create Email Templates

In SendGrid Dashboard:
1. Go to **Email API** > **Dynamic Templates**
2. Create templates for:
   - Weekly summary
   - New insight notification
   - Welcome email

## Step 6: Deploy Firebase Functions

```bash
cd functions

# Build TypeScript
npm run build

# Deploy to Firebase
firebase deploy --only functions
```

## Step 7: Run the App

### Development Mode

```bash
# Start Expo development server
npm start

# Or specific platforms:
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

### Test on Physical Device

1. Install **Expo Go** from App Store or Play Store
2. Scan the QR code from your terminal
3. App will load on your device

## Step 8: Testing

### Run Tests

```bash
npm test
```

### Test Payment Flow

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and CVC

## Step 9: Building for Production

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android

```bash
# Build for Android
eas build --platform android
```

### Web

```bash
# Build for web
expo build:web

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Common Issues and Solutions

### Firebase Connection Issues

- **Error**: "Firebase: Error (auth/network-request-failed)"
- **Solution**: Check your internet connection and Firebase config in `.env`

### Expo Go Not Loading

- **Error**: "Unable to resolve module"
- **Solution**: Clear cache with `expo start -c`

### TypeScript Errors

- **Error**: "Cannot find module"
- **Solution**: Run `npm install` and restart TypeScript server in your editor

### iOS Simulator Issues

- **Error**: "Could not connect to development server"
- **Solution**: 
  1. Open iOS Settings > Developer > Clear Trusted Computers
  2. Restart both simulator and Metro bundler

### Android Build Failures

- **Error**: Build fails with Gradle errors
- **Solution**: 
  1. Update Android SDK tools
  2. Clear Gradle cache: `cd android && ./gradlew clean`

## Environment Variables Reference

Complete `.env` file template:

```bash
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

# Stripe Configuration
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# SendGrid Configuration
SENDGRID_API_KEY=

# Google Cloud Vision API
GOOGLE_CLOUD_VISION_API_KEY=
```

## Next Steps

After setup is complete:

1. **Test the complete user flow**
   - Sign up with email
   - Add a bet manually
   - Check dashboard updates
   - View generated insights

2. **Customize branding**
   - Update app icon: `assets/images/icon.png`
   - Update splash screen: `assets/images/splash.png`
   - Modify theme colors in `src/theme/theme.ts`

3. **Configure app.json**
   - Update bundle identifiers
   - Set correct version numbers
   - Configure permissions

4. **Set up monitoring**
   - Firebase Crashlytics
   - Firebase Performance Monitoring
   - Firebase Analytics

5. **Prepare for launch**
   - Test on multiple devices
   - Get beta testers feedback
   - Prepare app store listings
   - Create privacy policy and terms of service

## Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/ncsound919/Bet-Buddy-/issues)
2. Review Firebase Console logs
3. Check Expo documentation
4. Contact support (if available)

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

---

**Happy coding! 🚀**
