import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to set these up at emailjs.com
// REPLACE THESE PLACEHOLDER VALUES WITH YOUR ACTUAL EMAILJS CONFIGURATION:
const EMAILJS_CONFIG = {
  serviceId: 'your_service_id', // Replace with your EmailJS service ID (e.g., 'service_abc123')
  templateId: 'your_template_id', // Replace with your EmailJS template ID (e.g., 'template_xyz789')
  userId: 'your_user_id', // Replace with your EmailJS user ID (Public Key)
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.userId);

export const sendBookingNotifications = async (bookingData) => {
  try {
    // Send notification to stylist (Andy)
    await sendStylistNotification(bookingData);
    
    // Send confirmation to client
    await sendClientConfirmation(bookingData);
    
    console.log('Email notifications sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email notifications:', error);
    throw error;
  }
};

const sendStylistNotification = async (bookingData) => {
  const templateParams = {
    to_name: 'Andy Kim',
    to_email: 'andykimcs@gmail.com',
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
    message: `New appointment booking from ${bookingData.name}`
  };

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams
  );
};

const sendClientConfirmation = async (bookingData) => {
  const templateParams = {
    to_name: bookingData.name,
    to_email: bookingData.email,
    stylist_name: 'Andy Kim',
    stylist_email: 'andykimcs@gmail.com',
    stylist_instagram: '@_kimandy',
    appointment_date: new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    appointment_time: bookingData.time,
    booking_timestamp: new Date(bookingData.timestamp).toLocaleString(),
    message: `Your appointment with Andy Kim has been confirmed`
  };

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    'client_confirmation_template_id', // You'll need a separate template for client emails
    templateParams
  );
};

// Alternative: Simple webhook-based notification (if you prefer not to use EmailJS)
export const sendWebhookNotification = async (bookingData) => {
  try {
    // Example webhook URL - replace with your own service
    const webhookUrl = 'https://your-webhook-service.com/appointment';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `New appointment booking from ${bookingData.name}`,
        appointment: bookingData,
        notification_type: 'new_booking',
        stylist_email: 'andykimcs@gmail.com',
        client_email: bookingData.email
      })
    });
    
    if (response.ok) {
      console.log('Webhook notification sent successfully');
      return true;
    } else {
      console.error('Webhook notification failed');
      return false;
    }
  } catch (error) {
    console.error('Error sending webhook notification:', error);
    return false;
  }
}; 