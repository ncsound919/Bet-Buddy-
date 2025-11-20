import { doc, updateDoc } from 'firebase/firestore';
import { getFirebaseDb } from './firebase';

export class PaymentService {
  /**
   * Initiate Stripe payment for Pro subscription
   * In production, this would call a Firebase Cloud Function that creates a Stripe Checkout session
   */
  static async createCheckoutSession(userId: string): Promise<string> {
    // This is a placeholder - in production, you would:
    // 1. Call a Firebase Cloud Function
    // 2. That function creates a Stripe Checkout Session
    // 3. Returns the session URL
    
    // Example Firebase Function call:
    // const functions = getFirebaseFunctions();
    // const createCheckout = httpsCallable(functions, 'createCheckoutSession');
    // const result = await createCheckout({ userId });
    // return result.data.url;

    console.warn('Payment integration pending - requires Stripe API keys and backend setup');
    throw new Error('Payment system not yet configured');
  }

  /**
   * Handle successful payment webhook
   * This would be called by a Firebase Cloud Function triggered by Stripe webhook
   */
  static async handlePaymentSuccess(userId: string, subscriptionId: string): Promise<void> {
    const db = getFirebaseDb();
    const userRef = doc(db, 'users', userId);

    // Set Pro status and expiration date (30 days from now)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    await updateDoc(userRef, {
      isPro: true,
      proExpiresAt: expirationDate,
      stripeSubscriptionId: subscriptionId,
      updatedAt: new Date()
    });
  }

  /**
   * Cancel Pro subscription
   */
  static async cancelSubscription(userId: string, subscriptionId: string): Promise<void> {
    // This would call a Firebase Cloud Function that cancels the Stripe subscription
    // const functions = getFirebaseFunctions();
    // const cancelSub = httpsCallable(functions, 'cancelSubscription');
    // await cancelSub({ userId, subscriptionId });

    const db = getFirebaseDb();
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      isPro: false,
      proExpiresAt: null,
      stripeSubscriptionId: null,
      updatedAt: new Date()
    });
  }

  /**
   * Check if user's Pro subscription is active
   */
  static isProActive(proExpiresAt?: Date): boolean {
    if (!proExpiresAt) return false;
    return new Date() < proExpiresAt;
  }
}
