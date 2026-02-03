# Stripe Webhook Setup Guide

To test payments and email confirmations locally, you need to forward Stripe webhooks to your local server.

## 1. Install Stripe CLI
If you haven't already, install the Stripe CLI: https://docs.stripe.com/stripe-cli

## 2. Login
Open a terminal and run:
```bash
stripe login
```
Follow the browser prompts to authenticate.

## 3. Start Listening (Corrected Command)
Your local server is running on port **3001** and the webhook endpoint is **/api/webhook**.

Run this command in a separate terminal window:
```bash
stripe listen --forward-to localhost:3001/api/webhook
```

## 4. Get the Webhook Secret
When you start listening, Stripe will output a signing secret that looks like this:
```
> Ready! You are using Stripe API Version [date]. Your webhook signing secret is whsec_...
```

**Copy this `whsec_...` key** and add it to your `.env` file:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 5. Trigger a Test Event
To simulate a successful payment, open another terminal and run:
```bash
stripe trigger checkout.session.completed
```
*Note: We use `checkout.session.completed` because that is the event that contains the order metadata we need.*

## Troubleshooting
- If you see `404 Not Found` in the stripe listen output, check that your server is running (`npm run server`) and you are forwarding to the correct path `/api/webhook`.
- If you see signature verification errors, ensure the `STRIPE_WEBHOOK_SECRET` in your `.env` matches the one shown in the `stripe listen` output.
