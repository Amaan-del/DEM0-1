import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = Number(process.env.PORT || 3001);
app.use(express.json({ limit: '20kb' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone = '', subject = 'General enquiry', message, website = '' } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot for simple bot filtering
  if (![name, email, message].every((v) => typeof v === 'string' && v.trim()) ||
      name.length > 120 || email.length > 254 || message.length > 5000 || phone.length > 40) {
    return res.status(400).json({ error: 'Please provide a name, valid email, and message.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO', 'MAIL_FROM'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) return res.status(503).json({ error: 'Contact form email is not configured yet. Please use the email or phone listed on this page.' });
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.CONTACT_TO,
      replyTo: { name: name.trim(), address: email.trim() },
      subject: `Saakhuvan enquiry: ${String(subject).slice(0, 120)}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim() || 'Not provided'}\nTopic: ${String(subject).slice(0, 120)}\n\n${message.trim()}`
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    return res.status(502).json({ error: 'We could not send your message right now. Please email or call us directly.' });
  }
});

app.listen(port, () => console.log(`Contact service listening on http://localhost:${port}`));
