import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { sendOrderEmails } from './emailService.js';
import { deleteOrder } from './orderStorage.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_DIR = path.join(__dirname, 'temp_orders');

// Transporter setup
const smtpPass = process.env.SMTP_PASS_B64 
  ? Buffer.from(process.env.SMTP_PASS_B64, 'base64').toString('utf-8') 
  : process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'contact@timagnet.com',
      pass: smtpPass,
    },
});

async function processStuckOrders() {
    try {
        console.log('Checking for stuck orders in:', STORAGE_DIR);
        // Verify connection configuration
        try {
            await transporter.verify();
            console.log('✅ SMTP Connection verified successfully');
        } catch (error) {
            console.error('❌ SMTP Connection Error:', error);
            return;
        }

        const files = await fs.readdir(STORAGE_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        if (jsonFiles.length === 0) {
            console.log('No stuck orders found.');
            return;
        }

        console.log(`Found ${jsonFiles.length} stuck orders. Processing...`);

        for (const file of jsonFiles) {
            const filePath = path.join(STORAGE_DIR, file);
            const orderId = path.basename(file, '.json');
            
            console.log(`Processing order: ${orderId}`);
            
            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const orderData = JSON.parse(fileContent);
                
                console.log(`Sending email for order ${orderId} to ${orderData.customerEmail}...`);
                await sendOrderEmails(orderData, transporter, __dirname);
                
                console.log(`Email sent successfully. Deleting order file...`);
                await deleteOrder(orderId);
                console.log(`Order ${orderId} processed and removed.`);
                
            } catch (err) {
                console.error(`Failed to process order ${orderId}:`, err);
            }
        }
    } catch (err) {
        console.error('Error reading orders directory:', err);
    }
}

processStuckOrders();
