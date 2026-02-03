import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.titan.email',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'contact@timagnet.com',
    pass: process.env.SMTP_PASS_B64 ? Buffer.from(process.env.SMTP_PASS_B64, 'base64').toString('utf-8') : process.env.SMTP_PASS,
  },
});

async function sendTestEmail() {
  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP Connection verified successfully!');

    const logoPath = path.join(__dirname, '../src/assets/logo/timagnet.png');
    console.log('Logo path:', logoPath);

    const attachments = [
        {
            filename: 'timagnet.png',
            path: logoPath,
            cid: 'logo'
        }
    ];

    console.log('Sending test email to:', process.env.SMTP_USER);
    
    // Copying the exact HTML structure from server/index.js
    const customerMailOptions = {
        from: `"Ti'Magnet" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, // Sending to self for testing
        subject: `TEST: Confirmation de commande - Ti'Magnet`,
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
              
              <p style="color: #374151; margin-bottom: 24px;">Bonjour <strong>TEST USER</strong>,</p>
              <p style="color: #374151; margin-bottom: 24px;">Nous avons bien reçu votre commande et nous vous en remercions. Voici le récapitulatif :</p>
              
              <p>... Details Placeholder ...</p>
              
              <h3 style="color: #111827; font-size: 18px; margin-bottom: 16px;">Votre Panier</h3>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 0 16px; margin-bottom: 24px;">
                <p>... Items Placeholder ...</p>
              </div>
              
              <div style="text-align: right; margin-bottom: 32px;">
                <p style="margin: 5px 0; color: #6b7280;">Frais de livraison: 0 €</p>
                <p style="margin: 5px 0; font-size: 20px; font-weight: bold; color: #111827;">Total: 100 €</p>
              </div>
              
              <!-- Warning Box -->
              <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <div style="display: flex; align-items: start;">
                  <div style="flex-grow: 1;">
                    <p style="margin: 0; color: #991b1b; font-weight: bold; font-size: 16px; margin-bottom: 4px;">⚠️ Note Importante</p>
                    <p style="margin: 0; color: #b91c1c; font-size: 14px; line-height: 1.5;">
                      Si aucune demande de modification n'est effectuée par email ou par téléphone dans un délai de <strong>2 heures</strong> suivant cette commande, celle-ci sera considérée comme confirmée et sera exécutée.
                    </p>
                  </div>
                </div>
              </div>

              <p style="color: #374151; font-size: 14px; text-align: center;">Nous traiterons votre commande dans les plus brefs délais.</p>
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

    const info = await transporter.sendMail(customerMailOptions);

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);

  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error);
  }
}

sendTestEmail();
