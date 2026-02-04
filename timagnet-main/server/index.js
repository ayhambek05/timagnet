import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Stripe from 'stripe';
import { randomUUID } from 'crypto';
import { saveOrder, getOrder, deleteOrder } from './orderStorage.js';
import { sendOrderEmails } from './emailService.js';

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Warning: STRIPE_SECRET_KEY is not set. Payment features will not work.');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  console.warn('Warning: STRIPE_WEBHOOK_SECRET is not set. Webhooks will not work securely.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com", "https://ajax.googleapis.com", "https://widget.mondialrelay.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://maps.googleapis.com", "https://widget.mondialrelay.com"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all requests (or just /api if preferred)
app.use('/api', limiter);

// Middleware
// Configure CORS to allow requests from your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins by default or use env var
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Email Transporter Configuration
let transporter;

const smtpPass = process.env.SMTP_PASS_B64 
  ? Buffer.from(process.env.SMTP_PASS_B64, 'base64').toString('utf-8') 
  : process.env.SMTP_PASS;

if (smtpPass) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'contact@timagnet.com',
      pass: smtpPass,
    },
  });

  // Verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log('SMTP Connection Error:', error);
    } else {
      console.log('SMTP Server is ready to take our messages');
    }
  });
} else {
  console.warn('Warning: SMTP_PASS is not set. Emails will be logged to console (JSON Transport).');
  transporter = nodemailer.createTransport({
    jsonTransport: true
  });
}

// Stripe Webhook Endpoint
// This needs to be defined BEFORE express.json() because it needs the raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (endpointSecret) {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
        // WARNING: Only for development without webhook secret. INSECURE.
        console.warn('⚠️  Webhook received without signature verification (STRIPE_WEBHOOK_SECRET not set).');
        event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      console.log(`Payment successful for order ${orderId}. Retrieving order details...`);
      const orderData = await getOrder(orderId);

      if (orderData) {
        try {
          console.log('Sending confirmation emails...');
          await sendOrderEmails(orderData, transporter, __dirname);
          console.log('Emails sent. Cleaning up order storage...');
          await deleteOrder(orderId);
        } catch (emailError) {
          console.error('Error sending emails in webhook:', emailError);
        }
      } else {
        console.error(`Order data not found for orderId: ${orderId}`);
      }
    } else {
      console.error('No orderId found in session metadata.');
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});


app.use(express.json({ limit: '200mb' })); // Increase limit for base64 images if sent as JSON
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// Configure Multer for handling file uploads (if we decide to send as FormData)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per file
});


const PROMO_CODES = {
  'MAGNET5': 0.05,
  'MAGNET10': 0.10,
  'MAGNET15': 0.15,
  'ADMIN99': 0.99
};

// API Routes
app.post('/api/order', upload.array('images'), async (req, res) => {
  try {
    const orderData = req.body;
    
    // Generate a unique Order ID
    const orderId = randomUUID();

    // Save order data to temporary storage
    await saveOrder(orderId, orderData);

    let successUrl, cancelUrl;
    let sessionUrl;
    const frontendUrl = process.env.FRONTEND_URL || req.headers.origin || 'http://localhost:5173';

    if (stripe) {
      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Commande Ti\'Magnet',
                description: `Commande pour ${orderData.customerName}`,
              },
              unit_amount: Math.round(orderData.totalPrice * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${frontendUrl}/success`,
        cancel_url: `${frontendUrl}/cart`,
        customer_email: orderData.customerEmail,
        metadata: {
          orderId: orderId // Pass the Order ID to metadata
        }
      });
      sessionUrl = session.url;
      
      console.log(`Order ${orderId} created. Waiting for payment...`);
      // DO NOT send emails here. They will be sent by the webhook upon payment success.

    } else {
      console.log('Stripe not configured. Simulating successful payment for dev/test.');
      // In dev mode without Stripe, redirect directly to success page and send emails immediately
      sessionUrl = `${frontendUrl}/success`;
      
      console.log('Sending immediate confirmation (Dev Mode)...');
      await sendOrderEmails(orderData, transporter, __dirname);
      await deleteOrder(orderId); // Cleanup immediately since no webhook will fire
    }

    res.status(200).json({ 
      success: true, 
      message: 'Order placed successfully!',
      paymentUrl: sessionUrl 
    });

  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ success: false, message: 'Failed to process order.', error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: `"Ti'Magnet Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    if (info.message) {
        console.log('JSON Transport:', info.message.toString());
    }

    // Confirmation email to the user
    const userMailOptions = {
      from: `"Ti'Magnet" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmation de réception - Ti'Magnet`,
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
        <p>Notre équipe va traiter votre demande dans les plus brefs délais.</p>
        <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">
          <h3>Récapitulatif de votre message :</h3>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <br>
        <p>Cordialement,<br>L'équipe Ti'Magnet</p>
      `,
    };

    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('Confirmation sent: %s', userInfo.messageId);
    if (userInfo.message) {
        console.log('JSON Transport (User):', userInfo.message.toString());
    }

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

app.get('/api/health', (req, res) => {
  res.send('Ti\'Magnet API Server Running');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
