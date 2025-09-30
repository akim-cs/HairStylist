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

// Alternative: Simple email service using a public API (for testing)
export const sendSimpleEmailNotification = async (bookingData) => {
  try {
    // This is a placeholder for a simple email service
    // You can replace this with any email API service
    
    const emailPayload = {
      to: ['andykimcs@gmail.com', bookingData.email],
      subject: `New Appointment Booking - ${bookingData.name}`,
      message: `
        New appointment booking:
        
        Client: ${bookingData.name}
        Email: ${bookingData.email}
        Phone: ${bookingData.phone || 'Not provided'}
        Instagram: ${bookingData.instagram || 'Not provided'}
        
        Date: ${new Date(bookingData.date).toLocaleDateString()}
        Time: ${bookingData.time}
        
        Booked at: ${new Date(bookingData.timestamp).toLocaleString()}
      `
    };
    
    // Replace this with your preferred email service API
    const response = await fetch('https://your-email-service.com/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify(emailPayload)
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}; 

// Test function to verify webhook is working
export const testWebhookNotification = async () => {
  const testData = {
    name: 'Test Client',
    email: 'test@example.com',
    phone: '555-1234',
    instagram: '@testuser',
    date: new Date().toDateString(),
    time: '2:00 PM',
    timestamp: new Date().toISOString(),
    status: 'confirmed'
  };
  
  console.log('Testing webhook notification...');
  const result = await sendWebhookNotification(testData);
  console.log('Test result:', result);
  return result;
}; 