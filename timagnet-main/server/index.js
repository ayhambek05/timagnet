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

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Warning: STRIPE_SECRET_KEY is not set. Payment features will not work.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Security Middleware
app.use(helmet()); // Set security HTTP headers

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
// In production, replace '*' with your actual domain, e.g., 'https://your-domain.com'
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins by default or use env var
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images if sent as JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure Multer for handling file uploads (if we decide to send as FormData)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per file
});

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

const PROMO_CODES = {
  'MAGNET5': 0.05,
  'MAGNET10': 0.10,
  'MAGNET15': 0.15
};

// API Routes
app.post('/api/order', upload.array('images'), async (req, res) => {
  try {
    const { 
      items, // Array of items from CartPage
      totalPrice, 
      deliveryFee,
      deliveryOption, 
      customerEmail, 
      customerName,
      customerPhone,
      customerAddress,
      promoCode,
      discountAmount,
      // Legacy fields (optional support)
      productName, 
      quantity, 
      imagesData 
    } = req.body;

    // Normalize items: if 'items' exists use it, otherwise construct single item from legacy fields
    let orderItems = [];
    if (items && Array.isArray(items)) {
      orderItems = items;
    } else if (productName) {
      orderItems = [{
        productName,
        quantity,
        price: totalPrice, // Approx
        imagesData: imagesData
      }];
    }

    let attachments = [];
    let itemsHtml = '';

    // Process items for email and attachments
    orderItems.forEach((item, itemIndex) => {
      // Ensure quantity is an integer
      const quantity = parseInt(item.quantity) || 0;

      // Add to HTML summary
      itemsHtml += `
        <div style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0 0 4px 0; font-weight: bold; color: #111827;">${item.productName} <span style="font-weight: normal; color: #6b7280;">(${item.dimensions || 'Standard'})</span></p>
          <table width="100%" style="font-size: 14px; color: #4b5563;">
            <tr>
              <td>Quantité: ${quantity}</td>
              <td align="right">${item.price} €</td>
            </tr>
          </table>
        </div>
      `;

      // Handle images for this item
      if (item.imagesData && Array.isArray(item.imagesData)) {
        item.imagesData.forEach((dataUrl, imgIndex) => {
          if (!dataUrl) return;
          
          const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            attachments.push({
              filename: `item-${itemIndex + 1}-img-${imgIndex + 1}.${matches[1].split('/')[1]}`,
              content: Buffer.from(matches[2], 'base64')
            });
          }
        });
      }
    });

    // Add Logo to attachments
    const logoPath = path.join(__dirname, '../src/assets/logo/Ti\'Magnet.png');
    attachments.push({
      filename: 'Ti\'Magnet.png',
      path: logoPath,
      cid: 'logo'
    });

    // Parse address
    let addressObj = customerAddress;
    if (typeof customerAddress === 'string') {
        try {
            addressObj = JSON.parse(customerAddress);
        } catch (e) {
            addressObj = {};
        }
    }

    const deliveryLabel = deliveryOption === 'mondial_relay' ? 'Mondial Relay' : 'Livraison à domicile';

    let addressHtml = `
        <div style="margin-top: 10px; font-size: 14px; color: #4b5563;">
            <p style="margin: 2px 0;">${addressObj.name || customerName}</p>
            <p style="margin: 2px 0;">${addressObj.street}</p>
            <p style="margin: 2px 0;">${addressObj.postalCode} ${addressObj.city}</p>
            <p style="margin: 2px 0;">${addressObj.province}</p>
        </div>
    `;

    if (addressObj.relayPointId) {
        addressHtml += `
            <div style="margin-top: 15px; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 4px;">
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #166534;">📍 Point Relais Mondial Relay</p>
                <p style="margin: 2px 0; font-size: 13px;"><strong>${addressObj.relayPointName}</strong></p>
                <p style="margin: 2px 0; font-size: 13px;">${addressObj.relayPointAddress}</p>
                <p style="margin: 2px 0; font-size: 12px; color: #6b7280;">ID: ${addressObj.relayPointId}</p>
            </div>
        `;
    }

    const commonDetailsHtml = `
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 16px; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Informations Client</h3>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${customerEmail}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Téléphone:</strong> ${customerPhone}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Mode de livraison:</strong> ${deliveryLabel}</p>
            ${addressHtml}
        </div>
    `;

    // Email to Owner
    const ownerMailOptions = {
      from: `"Ti'Magnet Order System" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nouvelle Commande: ${customerName}`,
      html: `
        <h2>Nouvelle Commande Reçue</h2>
        
        ${commonDetailsHtml}
        
        <h3>Récapitulatif de la commande</h3>
        ${itemsHtml}
        
        <div style="margin-top: 20px; border-top: 2px solid #333; padding-top: 10px;">
          <p><strong>Frais de livraison:</strong> ${deliveryFee || 0} €</p>
          ${discountAmount > 0 ? `<p><strong>Réduction (${promoCode}):</strong> -${discountAmount} €</p>` : ''}
          <p><strong>Prix Total:</strong> ${totalPrice} €</p>
        </div>
        
        <p>Voir les images jointes pour la commande.</p>
      `,
      attachments: attachments,
    };

    // Email to Customer
    const customerMailOptions = {
      from: `"Ti'Magnet" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: `Confirmation de commande - Ti'Magnet`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with Logo -->
            <div style="background-color: #000000; padding: 24px; text-align: center;">
              <img src="cid:logo" alt="Ti'Magnet" style="height: 40px; width: auto;">
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px;">
              <h2 style="margin-top: 0; color: #111827; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 24px;">Merci pour votre commande !</h2>
              
              <p style="color: #374151; margin-bottom: 24px;">Bonjour <strong>${customerName}</strong>,</p>
              <p style="color: #374151; margin-bottom: 24px;">Nous avons bien reçu votre commande. <strong>Veuillez procéder au paiement pour valider votre commande.</strong></p>
              
              ${commonDetailsHtml}
              
              <h3 style="color: #111827; font-size: 18px; margin-bottom: 16px;">Votre Panier</h3>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 0 16px; margin-bottom: 24px;">
                ${itemsHtml}
              </div>
              
              <div style="text-align: right; margin-bottom: 32px;">
                <p style="margin: 5px 0; color: #6b7280;">Frais de livraison: ${deliveryFee || 0} €</p>
                ${discountAmount > 0 ? `<p style="margin: 5px 0; color: #166534;">Réduction (${promoCode}): -${discountAmount} €</p>` : ''}
                <p style="margin: 5px 0; font-size: 20px; font-weight: bold; color: #111827;">Total: ${totalPrice} €</p>
              </div>
              
              <p style="color: #374151; font-size: 14px; text-align: center;">Une fois le paiement effectué, votre commande sera traitée.</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">L'équipe Ti'Magnet</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Une question ? Contactez-nous à <a href="mailto:contact@timagnet.com" style="color: #111827; text-decoration: underline;">contact@timagnet.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments,
    };

    let sessionUrl;

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
                description: `Commande pour ${customerName}`,
              },
              unit_amount: Math.round(totalPrice * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin || 'http://localhost:5173'}/success`,
        cancel_url: `${req.headers.origin || 'http://localhost:5173'}/cart`,
        customer_email: customerEmail,
      });
      sessionUrl = session.url;
    } else {
      console.log('Stripe not configured. Simulating successful payment for dev/test.');
      // In dev mode without Stripe, redirect directly to success page
      sessionUrl = `${req.headers.origin || 'http://localhost:5173'}/success`;
    }

    // Send emails
    console.log('Sending email to owner...');
    await transporter.sendMail(ownerMailOptions);
    
    console.log('Sending confirmation to customer...');
    await transporter.sendMail(customerMailOptions);

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
