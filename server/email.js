const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const emailFrom = process.env.EMAIL_FROM || 'noreply@tavolapro.com';

let isConfigured = false;
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
  isConfigured = true;
  console.log('SendGrid initialized.');
} else {
  console.warn('SendGrid API key missing. Email endpoints will return 503.');
}

const sendEmail = async (req, res) => {
  if (!isConfigured) return res.status(503).json({ error: 'SendGrid non configurato: aggiungi SENDGRID_API_KEY' });
  
  const { to, subject, html } = req.body;
  if (!to || !subject || !html) return res.status(400).json({ error: 'Missing required fields: to, subject, html' });

  try {
    const msg = {
      to,
      from: emailFrom,
      subject,
      html,
    };
    await sgMail.send(msg);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('SendGrid Error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendEmail };