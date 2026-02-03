import path from 'path';

export const sendOrderEmails = async (orderData, transporter, __dirname) => {
    const { 
      items,
      totalPrice, 
      deliveryFee,
      deliveryOption, 
      customerEmail, 
      customerName,
      customerPhone,
      customerAddress,
      promoCode,
      discountAmount,
      // Legacy fields
      productName, 
      quantity, 
      imagesData 
    } = orderData;

    // Normalize items
    let orderItems = [];
    if (items && Array.isArray(items)) {
      orderItems = items;
    } else if (productName) {
      orderItems = [{
        productName,
        quantity,
        price: totalPrice,
        imagesData: imagesData
      }];
    }

    let attachments = [];
    let itemsHtml = '';

    // Process items for email and attachments
    orderItems.forEach((item, itemIndex) => {
      const qty = parseInt(item.quantity) || 0;

      itemsHtml += `
        <div style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0 0 4px 0; font-weight: bold; color: #111827;">${item.productName} <span style="font-weight: normal; color: #6b7280;">(${item.dimensions || 'Standard'})</span></p>
          <table width="100%" style="font-size: 14px; color: #4b5563;">
            <tr>
              <td>Quantité: ${qty}</td>
              <td align="right">${item.price} €</td>
            </tr>
          </table>
        </div>
      `;

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
              <p style="color: #374151; margin-bottom: 24px;">Nous avons bien reçu votre commande et le paiement a été validé.</p>
              
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
              
              <p style="color: #374151; font-size: 14px; text-align: center;">Votre commande est en cours de traitement.</p>
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

    console.log('Sending email to owner...');
    await transporter.sendMail(ownerMailOptions);
    
    console.log('Sending confirmation to customer...');
    await transporter.sendMail(customerMailOptions);
};
