# Bet Buddy Deployment Guide

This guide covers deploying Bet Buddy to production environments.

## Prerequisites

Before deploying, ensure you have:
- Completed all setup steps in [SETUP.md](SETUP.md)
- Tested the app thoroughly in development
- Firebase project configured for production
- Stripe account in live mode
- Apple Developer account (for iOS)
- Google Play Developer account (for Android)

## Pre-Deployment Checklist

- [ ] All features tested and working
- [ ] Environment variables configured for production
- [ ] Firebase security rules tested
- [ ] Stripe webhooks configured
- [ ] App icons and splash screens created
- [ ] Privacy policy and terms of service prepared
- [ ] App store assets ready (screenshots, descriptions)
- [ ] Analytics and monitoring configured

## Firebase Deployment

### 1. Deploy Cloud Functions

```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Build TypeScript
npm run build

# Deploy to Firebase
firebase deploy --only functions

# Deploy specific function (if needed)
firebase deploy --only functions:functionName
```

**Important**: Set environment variables for functions:
```bash
firebase functions:config:set stripe.secret_key="sk_live_..."
firebase functions:config:set sendgrid.api_key="SG...."
firebase functions:config:set vision.api_key="AIza..."
```

### 2. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 3. Deploy Storage Rules

```bash
firebase deploy --only storage
```

### 4. Deploy Firestore Indexes

Create `firestore.indexes.json` for complex queries:
```json
{
  "indexes": [
    {
      "collectionGroup": "bets",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "date", "order": "DESCENDING" }
      ]
    }
  ]
}
```

Deploy indexes:
```bash
firebase deploy --only firestore:indexes
```

## Mobile App Deployment

### iOS Deployment

#### 1. Prerequisites

- macOS with Xcode installed
- Apple Developer Program membership ($99/year)
- Expo account

#### 2. Configure app.json

```json
{
  "expo": {
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.betbuddy.app",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSCameraUsageDescription": "Bet Buddy needs camera access to scan bet slips",
        "NSPhotoLibraryUsageDescription": "Bet Buddy needs photo library access to upload bet slips"
      }
    }
  }
}
```

#### 3. Build with EAS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS
eas build:configure

# Create production build
eas build --platform ios --profile production
```

#### 4. Submit to App Store

```bash
# Submit to App Store
eas submit --platform ios

# Or manually:
# 1. Download .ipa from EAS
# 2. Upload via Xcode or Application Loader
# 3. Fill out App Store Connect listing
# 4. Submit for review
```

#### 5. App Store Listing

Required materials:
- App name: "Bet Buddy"
- Subtitle: "Learn from your bets"
- Description (see template below)
- Keywords: betting, sports, analytics, tracking
- Screenshots (6.5", 5.5" iPhone; 12.9" iPad)
- App icon (1024x1024)
- Privacy policy URL
- Support URL

### Android Deployment

#### 1. Configure app.json

```json
{
  "expo": {
    "android": {
      "package": "com.betbuddy.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#1976D2"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

#### 2. Build with EAS

```bash
# Create production build
eas build --platform android --profile production

# Or create APK for testing
eas build --platform android --profile preview
```

#### 3. Submit to Google Play

```bash
# Submit to Google Play
eas submit --platform android

# Or manually:
# 1. Download .aab from EAS
# 2. Upload to Google Play Console
# 3. Fill out store listing
# 4. Submit for review
```

#### 4. Play Store Listing

Required materials:
- App name: "Bet Buddy"
- Short description (80 chars max)
- Full description (see template below)
- Screenshots (phone, 7" tablet, 10" tablet)
- Feature graphic (1024x500)
- App icon (512x512)
- Privacy policy URL
- Content rating

## Web Deployment

### 1. Build for Web

```bash
# Build web version
expo build:web

# Or
npx expo export:web
```

### 2. Deploy to Firebase Hosting

```bash
# Initialize Firebase Hosting (first time only)
firebase init hosting

# Select:
# - Build directory: web-build
# - Single-page app: Yes
# - Automatic builds: No

# Deploy
firebase deploy --only hosting
```

### 3. Custom Domain (Optional)

```bash
# Add custom domain in Firebase Console
firebase hosting:channel:deploy production --only hosting
```

Configure DNS:
- Type: A
- Name: @
- Value: (Firebase provides IP)

## Environment Configuration

### Production Environment Variables

Create `.env.production`:
```bash
# Firebase (Production)
EXPO_PUBLIC_FIREBASE_API_KEY=your-prod-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-prod-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-prod-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-prod-storage-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-prod-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-prod-app-id

# Stripe (Live mode)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SendGrid (Production)
SENDGRID_API_KEY=SG....

# Google Cloud Vision
GOOGLE_CLOUD_VISION_API_KEY=AIza...
```

### Switch Environments

```bash
# Development
expo start

# Production
NODE_ENV=production expo start --no-dev --minify
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Test user registration
- [ ] Test login flow
- [ ] Add a bet manually
- [ ] Test OCR upload (if available)
- [ ] Verify insights generation
- [ ] Test payment flow (real transaction)
- [ ] Check email notifications
- [ ] Verify analytics tracking

### 2. Monitor

Set up monitoring:
```bash
# View function logs
firebase functions:log

# View Firestore usage
# Check Firebase Console > Usage and billing

# Monitor crashes
# Firebase Console > Crashlytics
```

### 3. Set Up Alerts

Configure alerts in Firebase Console:
- High error rate
- Low performance
- Budget alerts
- Quota warnings

## Rollback Procedure

If issues arise after deployment:

### Rollback Functions
```bash
# List function versions
firebase functions:list

# Rollback to previous version
firebase rollback --only functions
```

### Rollback Mobile App
```bash
# Create hotfix build
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit expedited review
eas submit --platform ios
eas submit --platform android
```

### Rollback Web
```bash
# List hosting versions
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback
```

## Monitoring and Maintenance

### Key Metrics to Monitor

1. **Performance**
   - App crash rate (< 1%)
   - API response times (< 500ms)
   - Function execution time

2. **Usage**
   - Daily/Monthly active users
   - Feature adoption rates
   - Conversion rate (Free → Pro)

3. **Costs**
   - Firebase reads/writes
   - Function invocations
   - Storage usage
   - Stripe fees

### Regular Maintenance Tasks

**Weekly**:
- Review error logs
- Check user feedback
- Monitor performance metrics

**Monthly**:
- Review Firebase costs
- Analyze user engagement
- Check for dependency updates
- Review app store ratings

**Quarterly**:
- Security audit
- Performance optimization
- Feature usage analysis
- User survey

## App Store Listing Templates

### iOS App Store Description

```
Bet Buddy - Learn from Your Own Bets

TRACK • LEARN • IMPROVE

Bet Buddy helps you become a smarter sports bettor by tracking your bets and providing personalized insights based on your actual betting patterns.

FEATURES:

✓ Quick Bet Entry
• Log bets in seconds with our simple form
• Upload bet slips with OCR (coming soon)
• Track all your sports: NFL, NBA, MLB, NHL, and more

✓ Smart Dashboard
• See your win rate, profit, and current streak at a glance
• Beautiful charts and visualizations
• Track your bankroll in real-time

✓ Personalized Insights
• Learn what's working and what's not
• Get actionable tips after just 3 bets
• Understand your betting patterns

✓ Pro Features ($5/month)
• Unlimited bets and insights
• Advanced trend analysis
• Custom filters and exports
• Detailed weekly reports
• Anonymous leaderboard

PRIVACY:
Your data is private and secure. We never share your betting information.

SUPPORT:
Questions? Contact us at support@betbuddy.app

Download Bet Buddy today and start learning from every bet!

---

Terms of Service: https://betbuddy.app/terms
Privacy Policy: https://betbuddy.app/privacy
```

### Google Play Description

Similar to iOS but can be longer. Include:
- What's New section
- Feature highlights
- Screenshots with captions
- Video preview (optional but recommended)

## Support and Updates

### Version Numbering

Use Semantic Versioning:
- Major.Minor.Patch (e.g., 1.0.0)
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Update Schedule

- **Critical bugs**: Hotfix within 24 hours
- **Bug fixes**: Weekly patch releases
- **New features**: Monthly minor releases
- **Major updates**: Quarterly

## Troubleshooting Deployment Issues

### Common Issues

**Build Fails**
```bash
# Clear cache
expo start -c
rm -rf node_modules
npm install

# Check for outdated dependencies
npm outdated
```

**Functions Not Working**
```bash
# Check logs
firebase functions:log --only functionName

# Verify environment variables
firebase functions:config:get
```

**App Store Rejection**
- Review Apple's guidelines
- Check for compliance issues
- Test on actual devices
- Ensure all assets are correct

## Success Criteria

Deployment is successful when:
- [ ] App is live on iOS and Android stores
- [ ] Web version is accessible
- [ ] All critical features working
- [ ] No critical bugs reported
- [ ] Monitoring and alerts active
- [ ] First 100 users onboarded successfully

---

**Congratulations on deploying Bet Buddy! 🚀**

For issues or questions, refer to:
- [Architecture Documentation](ARCHITECTURE.md)
- [Setup Guide](SETUP.md)
- [Contributing Guidelines](CONTRIBUTING.md)
