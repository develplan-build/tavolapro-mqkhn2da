const Stripe = require('stripe');
require('dotenv').config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe = null;

if (stripeSecretKey) {
  stripe = Stripe(stripeSecretKey);
  console.log('Stripe initialized.');
} else {
  console.warn('Stripe secret key missing. Payment endpoints will return 503.');
}

const createCheckoutSession = async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe non configurato: aggiungi STRIPE_SECRET_KEY' });
  
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl || `${req.headers.origin}/app?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/pricing`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const handleWebhook = async (req, res) => {
  if (!stripe) return res.status(503).send('Stripe non configurato');
  
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);
      // Here you would typically update the user's subscription status in Supabase
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log('Subscription deleted:', subscription.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};

module.exports = { createCheckoutSession, handleWebhook };