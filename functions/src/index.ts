import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

/**
 * Create Stripe Checkout Session for Pro subscription
 */
export const createCheckoutSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { userId } = data;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Bet Buddy Pro',
            description: 'Unlimited bets, insights, and advanced features'
          },
          unit_amount: 500, // $5.00
          recurring: {
            interval: 'month'
          }
        },
        quantity: 1
      }],
      success_url: `${data.returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${data.returnUrl}?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId
      }
    });

    return { sessionId: session.id, url: session.url };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Handle successful Stripe payment webhook
 */
export const handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        // Update user to Pro status
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        await admin.firestore().collection('users').doc(userId).update({
          isPro: true,
          proExpiresAt: admin.firestore.Timestamp.fromDate(expirationDate),
          stripeSubscriptionId: session.subscription,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      // Find user by subscription ID and remove Pro status
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .where('stripeSubscriptionId', '==', subscription.id)
        .get();

      for (const doc of usersSnapshot.docs) {
        await doc.ref.update({
          isPro: false,
          proExpiresAt: null,
          stripeSubscriptionId: null,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      break;
    }
  }

  res.json({ received: true });
});

/**
 * Send weekly summary email to users
 * Scheduled to run every Monday at 9 AM
 */
export const sendWeeklySummary = functions.pubsub
  .schedule('0 9 * * 1')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    const db = admin.firestore();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Get all users who have weekly notifications enabled
    const usersSnapshot = await db.collection('users')
      .where('settings.notifications.weekly', '==', true)
      .get();

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();

      // Get user's bets from the past week
      const betsSnapshot = await db.collection('bets')
        .where('userId', '==', userId)
        .where('date', '>=', oneWeekAgo)
        .get();

      if (betsSnapshot.empty) continue;

      const bets = betsSnapshot.docs.map(doc => doc.data());
      const totalBets = bets.length;
      const wins = bets.filter(b => b.result === 'WIN').length;
      const winRate = wins / totalBets;
      const totalProfit = bets.reduce((sum, bet) => sum + (bet.profit || 0), 0);

      // Send email (implementation depends on email service)
      console.log(`Sending weekly summary to ${userData.email}:`, {
        totalBets,
        wins,
        winRate,
        totalProfit
      });

      // TODO: Integrate with SendGrid or Firebase Email Extension
    }

    return null;
  });

/**
 * Process OCR for bet slip image
 */
export const processBetSlipOCR = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  
  if (!filePath || !filePath.includes('bet-slips/')) {
    return;
  }

  // TODO: Integrate with Google Vision API
  // 1. Download image from Storage
  // 2. Send to Vision API for text detection
  // 3. Parse betting information
  // 4. Create bet record in Firestore
  // 5. Notify user

  console.log('Processing OCR for:', filePath);
  return null;
});

/**
 * Update user statistics when a bet is settled
 */
export const updateUserStatsOnBetSettle = functions.firestore
  .document('bets/{betId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Check if bet was just settled
    if (before.result === 'PENDING' && after.result !== 'PENDING') {
      const userId = after.userId;
      const userRef = admin.firestore().collection('users').doc(userId);

      // Get all settled bets for this user
      const betsSnapshot = await admin.firestore().collection('bets')
        .where('userId', '==', userId)
        .where('result', 'in', ['WIN', 'LOSS'])
        .get();

      const bets = betsSnapshot.docs.map(doc => doc.data());
      const totalBets = bets.length;
      const totalWins = bets.filter(b => b.result === 'WIN').length;
      const totalLosses = bets.filter(b => b.result === 'LOSS').length;
      const totalProfit = bets.reduce((sum, bet) => sum + (bet.profit || 0), 0);
      const avgOdds = bets.reduce((sum, bet) => sum + bet.odds, 0) / totalBets;

      // Calculate current streak
      const sortedBets = bets.sort((a, b) => b.date.toMillis() - a.date.toMillis());
      let currentStreak = 0;
      const streakType = sortedBets[0]?.result;
      
      for (const bet of sortedBets) {
        if (bet.result === streakType) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Update user stats
      await userRef.update({
        'stats.totalBets': totalBets,
        'stats.totalWins': totalWins,
        'stats.totalLosses': totalLosses,
        'stats.totalProfit': totalProfit,
        'stats.currentStreak': currentStreak,
        'stats.avgOdds': avgOdds,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    return null;
  });
