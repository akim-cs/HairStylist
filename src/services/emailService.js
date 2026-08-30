import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

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
