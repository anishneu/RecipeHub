// backend/src/routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');

// Endpoint to send an email
router.post('/send', async (req, res) => {
  const { recipientEmail, subject, text } = req.body;
  try {
    await sendEmail(recipientEmail, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
