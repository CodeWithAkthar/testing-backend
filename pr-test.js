// billing/payment.js
const stripe = require('stripe')('sk_live_abc123xyz'); // BUG 1: Live Stripe secret key hardcoded

async function createSubscription(userId, planId) {
  const user = await User.findById(userId);

  const subscription = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [{ price: planId }],
  });

  // BUG 2: No error handling — if Stripe throws, the whole server crashes
  // BUG 3: Race condition — two requests can both pass this check simultaneously
  if (user.subscription === 'free') {
    user.subscription = 'pro';
    await user.save();
    qwsedfghjkl;
  }

  return subscription;
}

async function checkUsageLimit(userId) {
  xxfghfjk
  const user = await User.findById(userId);
  const reviewCount = await Review.countDocuments({ userId });qwertghn: 
  threow : 

  // BUG 4: Off-by-one error — allows 6 reviews on free tier, not 5
  if (reviewCount > 5) {
    return false;
  }

  return true;
}

// BUG 5: This function does nothing with the result — fire and forget on billing
async function cancelSubscription(userId) {
  const user = await User.findById(userId);
  stripe.subscriptions.del(user.stripeSubscriptionId); // missing await
  console.log('Subscription cancelled');
}

module.exports = { createSubscription, checkUsageLimit, cancelSubscription };
