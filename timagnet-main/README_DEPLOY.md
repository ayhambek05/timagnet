# Deployment Guide for Hostinger (timagnet.com)

This guide explains how to deploy your application to Hostinger.

## Prerequisites
- A Hostinger Hosting Plan that supports Node.js.
- Access to the Hostinger hPanel.

## 1. Prepare Files
The following files/folders need to be uploaded to your hosting:
- `app.js` (The entry point created for Hostinger)
- `package.json`
- `package-lock.json`
- `server/` (The backend code)
- `dist/` (The built frontend code - **Make sure to upload this folder!**)
- `.env` (Environment variables)

**Note:** Do NOT upload `node_modules`. You will install dependencies on the server.

## 2. Configuration on Hostinger
1. Log in to **Hostinger hPanel**.
2. Go to **Websites** -> **Manage** (for timagnet.com).
3. Search for **Node.js** in the sidebar or "Advanced" section.
4. Create a new Node.js application:
   - **Node.js Version**: Select the latest supported LTS version (e.g., 18 or 20).
   - **Application Mode**: Production.
   - **Application Root**: Enter the path where you will upload your files (e.g., `public_html` or a subfolder like `public_html/app`).
   - **Application Startup File**: `app.js`
5. Click **Create**.

## 3. Upload Files
1. Use the **File Manager** (or FTP) to navigate to the **Application Root** you specified.
2. Upload the files listed in step 1 (`app.js`, `package.json`, `server/`, `dist/`, `.env`).
3. Ensure the structure looks like this:
   ```
   /public_html
     /app.js
     /package.json
     /server/
       index.js
       ...
     /dist/
       index.html
       assets/
       ...
     /.env
   ```

## 4. Install Dependencies
1. Go back to the **Node.js** section in hPanel.
2. Click the **NPM Install** button. This will read `package.json` and install the required libraries.

## 5. Environment Variables
Ensure your `.env` file on the server has the correct settings.
```env
SMTP_HOST=smtp.titan.email
SMTP_PORT=465
SMTP_USER=contact@timagnet.com
SMTP_PASS_B64=...
PORT=3001
```
*Note: Hostinger might override the PORT automatically, which is fine as the code uses `process.env.PORT`.*

## 6. Restart Server
1. Click **Restart** in the Node.js section.
2. Visit `timagnet.com`. Your app should be live!

## Troubleshooting
- If you see a "404" or "403" error, ensure `dist/index.html` exists and `app.js` is correctly pointing to `server/index.js`.
- If the API doesn't work, check the console logs (if available) or try hitting `/api/health` to verify the backend is running.
