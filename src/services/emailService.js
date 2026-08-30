import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_4p6a9da';
const TEMPLATE_ID = '3y2lt68';
const PUBLIC_KEY = 'FnC4HOFKz77CDny3R';

export const sendBookingNotification = async (bookingData) => {
  const templateParams = {
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
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
