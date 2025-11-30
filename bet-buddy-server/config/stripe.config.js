// Stripe configuration for payment processing
// Install: npm install stripe

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const STRIPE_CONFIG = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}

const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      'Track up to 10 bets',
      'Basic analytics',
      'Manual bet entry',
    ],
  },
  premium_monthly: {
    name: 'Premium Monthly',
    price: 9.99,
    priceId: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
    interval: 'month',
    features: [
      'Unlimited bet tracking',
      'Advanced analytics',
      'Custom insights',
      'OCR bet entry',
      'Export data',
      'Priority support',
    ],
  },
  premium_yearly: {
    name: 'Premium Yearly',
    price: 99.99,
    priceId: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID,
    interval: 'year',
    features: [
      'Unlimited bet tracking',
      'Advanced analytics',
      'Custom insights',
      'OCR bet entry',
      'Export data',
      'Priority support',
    ],
  },
}

// Create checkout session
async function createCheckoutSession(userId, planId, successUrl, cancelUrl) {
  /*
  const plan = SUBSCRIPTION_PLANS[planId]
  
  if (!plan || !plan.priceId) {
    throw new Error('Invalid subscription plan')
  }
  
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    client_reference_id: userId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      planId,
    },
  })
  
  return session
  */
  
  throw new Error('Stripe not configured')
}

// Create customer portal session
async function createPortalSession(customerId, returnUrl) {
  /*
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  
  return session
  */
  
  throw new Error('Stripe not configured')
}

// Handle webhook events
async function handleWebhookEvent(event) {
  /*
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful subscription
      const session = event.data.object
      // Update user subscription in database
      break
      
    case 'customer.subscription.updated':
      // Handle subscription updates
      break
      
    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      break
      
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  */
}

module.exports = {
  STRIPE_CONFIG,
  SUBSCRIPTION_PLANS,
  createCheckoutSession,
  createPortalSession,
  handleWebhookEvent,
  // stripe,
}
