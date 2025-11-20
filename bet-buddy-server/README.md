# Bet Buddy Server (Backend)

Backend API for the Bet Buddy application, providing RESTful endpoints for bet tracking, analytics, and user management.

## Features

- **Authentication**: User signup, login, and session management
- **Bet Management**: CRUD operations for bets
- **Insights**: Analytics and performance insights
- **OCR Integration**: Image-based bet entry
- **Notifications**: Push notifications for bet updates
- **Subscription Management**: Stripe integration for premium features

## Project Structure

```
/bet-buddy-server/
  /functions/         # API endpoint handlers
    index.js          # Main Express app
    auth.js           # Authentication endpoints
    bets.js           # Bet CRUD endpoints
    insights.js       # Analytics endpoints
    ocr.js            # OCR processing endpoints
    notifications.js  # Notification endpoints
  /models/            # Data models
    bet.model.js      # Bet model
    user.model.js     # User model
    insight.model.js  # Insight model
  /utils/             # Utility functions
    logger.js         # Logging utility
    validators.js     # Input validation
    formatters.js     # Data formatting
  /config/            # Configuration files
    firebase.config.js  # Firebase setup
    stripe.config.js    # Stripe payment setup
    ocr.config.js       # OCR service setup
  /tests/             # Unit and integration tests
  package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for Firestore/Auth)
- Stripe account (for payments)

### Installation

```bash
cd bet-buddy-server
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
# Server
PORT=5000
NODE_ENV=development
LOG_LEVEL=INFO

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Authentication
JWT_SECRET=your_jwt_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_PREMIUM_MONTHLY_PRICE_ID=your_monthly_price_id
STRIPE_PREMIUM_YEARLY_PRICE_ID=your_yearly_price_id

# OCR
OCR_PROVIDER=google_vision
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
GOOGLE_CLOUD_PROJECT_ID=your_project_id
```

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Firebase emulators (for local development)
npm run serve
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Bets

- `POST /api/bet` - Create new bet
- `GET /api/bets/:userId` - Get user's bets
- `GET /api/bet/:betId` - Get specific bet
- `PUT /api/bet/:betId` - Update bet
- `DELETE /api/bet/:betId` - Delete bet

### Insights

- `GET /api/insights/:userId` - Get user insights
- `POST /api/insights/:userId/refresh` - Refresh insights

### OCR

- `POST /api/ocr/upload` - Upload and process image
- `POST /api/ocr/create-bet` - Create bet from OCR data

### Notifications

- `POST /api/notifications/send` - Send notification
- `POST /api/notifications/subscribe` - Subscribe to notifications
- `POST /api/notifications/unsubscribe` - Unsubscribe from notifications

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Deployment

### Firebase Functions

```bash
# Initialize Firebase
firebase init functions

# Deploy to Firebase
npm run deploy
```

### Other Platforms

The application can also be deployed to:
- Heroku
- AWS Lambda
- Google Cloud Run
- Vercel (Serverless Functions)

## Development

### Code Style

Follow the existing code style and use ESLint:

```bash
npm run lint
npm run lint:fix
```

### Adding New Endpoints

1. Create a new router file in `/functions/`
2. Define your routes using Express Router
3. Import and use the router in `functions/index.js`
4. Add appropriate tests in `/tests/`

### Database Integration

The models are currently placeholders. Implement the database logic based on your choice:
- **Firestore**: Use Firebase Admin SDK
- **MongoDB**: Use Mongoose
- **PostgreSQL**: Use Sequelize or Prisma

## Security

- All endpoints should validate input
- Implement authentication middleware
- Use environment variables for secrets
- Sanitize user input to prevent injection attacks
- Rate limit API endpoints

## Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Submit a pull request

## License

MIT
