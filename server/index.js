const express = require('express');
const cors = require('cors');
const { createCheckoutSession, handleWebhook } = require('./stripe');
const { sendEmail } = require('./email');
const { supabaseAdmin } = require('./supabase');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Webhook route needs raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', services: { 
    supabase: !!supabaseAdmin, 
    stripe: !!process.env.STRIPE_SECRET_KEY, 
    sendgrid: !!process.env.SENDGRID_API_KEY 
  }});
});

// Stripe Routes
app.post('/api/checkout', createCheckoutSession);

// SendGrid Routes
app.post('/api/email/send', sendEmail);

// Generic API endpoints (Empty by default, ready for Supabase integration)
app.get('/api/menu', async (req, res) => {
  if (!supabaseAdmin) return res.json([]); // Empty state if no DB
  try {
    const { data, error } = await supabaseAdmin.from('menu_items').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reservations', async (req, res) => {
  if (!supabaseAdmin) return res.json([]);
  try {
    const { data, error } = await supabaseAdmin.from('reservations').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});