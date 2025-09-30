# EmailJS Setup Guide

This guide will help you set up EmailJS to send email notifications when appointments are booked.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Templates

### Template 1: Stylist Notification

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Name it "Stylist Notification"
4. Use this template:

**Subject:** New Appointment Booking - {{client_name}}

**Content:**
```
Hi Andy,

You have a new appointment booking:

Client Details:
- Name: {{client_name}}
- Email: {{client_email}}
- Phone: {{client_phone}}
- Instagram: {{client_instagram}}

Appointment Details:
- Date: {{appointment_date}}
- Time: {{appointment_time}}
- Booked at: {{booking_timestamp}}

Please confirm this appointment with the client.

Best regards,
Your Booking System
```

5. Save the template and note the **Template ID** (e.g., `template_xyz789`)

### Template 2: Client Confirmation

1. Create another template named "Client Confirmation"
2. Use this template:

**Subject:** Appointment Confirmation - {{appointment_date}}

**Content:**
```
Hi {{to_name}},

Your appointment with Andy Kim has been confirmed!

Appointment Details:
- Date: {{appointment_date}}
- Time: {{appointment_time}}
- Stylist: {{stylist_name}}

Contact Information:
- Email: {{stylist_email}}
- Instagram: {{stylist_instagram}}

Please arrive 5 minutes before your scheduled time. If you need to reschedule or cancel, please contact Andy at least 24 hours in advance.

We look forward to seeing you!

Best regards,
Andy Kim
```

3. Save the template and note the **Template ID**

## Step 4: Get Your User ID

1. In your EmailJS dashboard, go to "Account" → "API Keys"
2. Copy your **Public Key** (User ID)

## Step 5: Update the Code

Update the `src/services/emailService.js` file with your actual IDs:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'your_actual_service_id', // Replace with your Service ID
  templateId: 'your_stylist_template_id', // Replace with Stylist Notification Template ID
  userId: 'your_actual_user_id', // Replace with your Public Key
};
```

Also update the client confirmation template ID in the `sendClientConfirmation` function:

```javascript
return emailjs.send(
  EMAILJS_CONFIG.serviceId,
  'your_client_template_id', // Replace with Client Confirmation Template ID
  templateParams
);
```

## Step 6: Test the Setup

1. Start your React app: `npm start`
2. Try booking an appointment
3. Check both email addresses for notifications

## Alternative: Using a Different Email Service

If you prefer not to use EmailJS, you can:

### Option 1: Use a Webhook Service
- Set up a webhook endpoint (using services like Zapier, IFTTT, or your own server)
- Update the `sendWebhookNotification` function in `emailService.js`
- The webhook can then send emails using your preferred service

### Option 2: Use Firebase Functions
- Create a Firebase Function that triggers when a new document is added to the appointments collection
- The function can send emails using services like SendGrid, Mailgun, or Nodemailer

### Option 3: Use a Backend Service
- Set up a simple backend (Node.js, Python, etc.)
- Create an API endpoint that handles email sending
- Call this endpoint from your React app

## Troubleshooting

### Common Issues:

1. **"Service not found" error**
   - Make sure your Service ID is correct
   - Ensure your email service is properly connected

2. **"Template not found" error**
   - Verify your Template IDs are correct
   - Check that templates are published (not in draft mode)

3. **"User ID not found" error**
   - Use your Public Key, not Private Key
   - Make sure your account is verified

4. **Emails not sending**
   - Check your email service's sending limits
   - Verify your email service is active
   - Check the browser console for errors

### Testing:

1. Use EmailJS's test feature in the dashboard
2. Check the browser console for error messages
3. Verify all IDs are correctly copied

## Security Notes

- Never expose your EmailJS Private Key in client-side code
- The Public Key (User ID) is safe to use in client-side code
- Consider rate limiting to prevent spam
- Monitor your email sending limits

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Community: https://community.emailjs.com/
- For technical issues, check the browser console and EmailJS dashboard logs 