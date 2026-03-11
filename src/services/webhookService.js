// Webhook-based notification service
// This can be used with Zapier, IFTTT, or any webhook service

export const sendWebhookNotification = async (bookingData) => {
  try {
    // Option 1: Zapier Webhook (RECOMMENDED - Easiest to set up)
    // Set up a Zapier webhook and replace this URL
    // Go to zapier.com, create a new Zap with "Webhooks by Zapier" as trigger
    // Then add "Email by Zapier" actions for both stylist and client notifications
    // REPLACE THIS URL WITH YOUR ACTUAL ZAPIER WEBHOOK URL:
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/23695225/u3if46b/';
    
    // Option 2: IFTTT Webhook
    // Set up an IFTTT webhook and replace this URL
    // const iftttWebhookUrl = 'https://maker.ifttt.com/trigger/appointment_booking/with/key/YOUR_KEY';
    
    // Option 3: Custom webhook service
    // const customWebhookUrl = 'https://your-webhook-service.com/appointment';
    
    const webhookUrl = zapierWebhookUrl; // Change this to your preferred service
    
    const payload = {
      // For Zapier - these field names will be available in your Zapier email templates
      client_name: bookingData.name,
      client_email: bookingData.email,
      client_phone: bookingData.phone || 'Not provided',
      client_instagram: bookingData.instagram || 'Not provided',
      appointment_date: new Date(bookingData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      appointment_time: bookingData.time,
      booking_timestamp: new Date(bookingData.timestamp).toLocaleString(),
      stylist_email: 'andykimcs@gmail.com',
      
      // For IFTTT (uncomment if using IFTTT)
      // value1: bookingData.name,
      // value2: `${new Date(bookingData.date).toLocaleDateString()} at ${bookingData.time}`,
      // value3: bookingData.email
    };
    
    console.log('Sending webhook notification with payload:', payload);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('Webhook notification sent successfully');
      return true;
    } else {
      console.error('Webhook notification failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending webhook notification:', error);
    return false;
  }
}; 