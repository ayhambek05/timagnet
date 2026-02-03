
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Testing Email Configuration...');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.titan.email',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'contact@timagnet.com',
    pass: process.env.SMTP_PASS_B64 ? Buffer.from(process.env.SMTP_PASS_B64, 'base64').toString('utf-8') : process.env.SMTP_PASS,
  },
});

async function sendTestEmail() {
  try {
    // 1. Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP Connection verified successfully!');

    // 2. Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Ti'Magnet Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself to test
      subject: "Test Email from Local Environment",
      text: "If you receive this, your email configuration is working correctly!",
      html: "<b>If you receive this, your email configuration is working correctly!</b>"
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log(`Check inbox for ${process.env.SMTP_USER}`);

  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error);
  }
}

sendTestEmail();
