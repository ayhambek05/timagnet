
## 7. Setup Stripe Webhooks (Live Mode)
To ensure orders are confirmed automatically when users pay online:

1.  **Deploy your site** following the steps above.
2.  Go to the [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks).
3.  Click **Add Endpoint**.
4.  **Endpoint URL**: `https://timagnet.com/api/webhook`
    *   *Make sure to use `https://`*
5.  **Events to send**: Select `checkout.session.completed`.
6.  Click **Add endpoint**.
7.  **Copy the Signing Secret** (`whsec_...`) from the top right of the new webhook page.
8.  Go back to **Hostinger hPanel**.
9.  Add the new variable to your Environment Variables:
    ```env
    STRIPE_WEBHOOK_SECRET=whsec_...
    FRONTEND_URL=https://timagnet.com
    ```
10. **Restart** your Node.js application in Hostinger.

## Important Note on Storage
This application uses **local file storage** (`server/temp_orders/`) to temporarily hold order details while waiting for payment.
- **On Hostinger (VPS/Shared Node)**: This works fine as the disk is persistent.
- **On Vercel/Netlify**: This WILL NOT work properly because files are deleted after the request ends.
**Stick to Hostinger** or a standard VPS for this configuration.
