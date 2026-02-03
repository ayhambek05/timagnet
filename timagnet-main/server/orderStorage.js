import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORAGE_DIR = path.join(__dirname, 'temp_orders');

// Ensure storage directory exists
try {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
} catch (err) {
  console.error('Failed to create storage directory:', err);
}

export const saveOrder = async (orderId, orderData) => {
  const filePath = path.join(STORAGE_DIR, `${orderId}.json`);
  await fs.writeFile(filePath, JSON.stringify(orderData, null, 2));
  return filePath;
};

export const getOrder = async (orderId) => {
  const filePath = path.join(STORAGE_DIR, `${orderId}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const deleteOrder = async (orderId) => {
  const filePath = path.join(STORAGE_DIR, `${orderId}.json`);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    // Ignore error if file doesn't exist
  }
};
