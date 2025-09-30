# Webhook Setup Guide (Alternative to EmailJS)

This guide shows you how to set up webhook notifications using Zapier or IFTTT, which can be easier to set up than EmailJS.

## Option 1: Zapier Setup (Recommended)

### Step 1: Create Zapier Account
1. Go to [Zapier.com](https://zapier.com)
2. Sign up for a free account
3. Create a new Zap

### Step 2: Set Up Webhook Trigger
1. Choose "Webhooks by Zapier" as the trigger
2. Select "Catch Hook"
3. Copy the webhook URL provided
4. Update `src/services/webhookService.js` with your webhook URL

### Step 3: Add Email Action
1. Add "Email by Zapier" as the action
2. Configure to send to `andykimcs@gmail.com`
3. Set up email template with the data from the webhook

### Step 4: Add Second Email Action
1. Add another "Email by Zapier" action
2. Configure to send to the client's email (from webhook data)
3. Set up confirmation email template

## Option 2: IFTTT Setup

### Step 1: Create IFTTT Account
1. Go to [IFTTT.com](https://ifttt.com)
2. Sign up for a free account
3. Create a new Applet

### Step 2: Set Up Webhook Trigger
1. Choose "Webhooks" as the trigger
2. Select "Receive a web request"
3. Note the event name (e.g., "appointment_booking")
4. Get your webhook key from IFTTT settings

### Step 3: Add Email Action
1. Add "Email" as the action
2. Configure email template
3. Use the webhook data in your email

## Quick Setup with Zapier

Here's a step-by-step Zapier setup:

### 1. Create the Zap
- **Trigger**: Webhooks by Zapier → Catch Hook
- **Action 1**: Email by Zapier → Send Email
- **Action 2**: Email by Zapier → Send Email

### 2. Configure Trigger
1. Copy the webhook URL
2. Update `src/services/webhookService.js`:
```javascript
const zapierWebhookUrl = 'YOUR_ZAPIER_WEBHOOK_URL';
```

### 3. Configure Action 1 (Stylist Notification)
- **To**: andykimcs@gmail.com
- **Subject**: New Appointment Booking - {{client_name}}
- **Body**:
```
Hi Andy,

You have a new appointment booking:

Client: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Instagram: {{client_instagram}}

Date: {{appointment_date}}
Time: {{appointment_time}}

Booked at: {{booking_timestamp}}
```

### 4. Configure Action 2 (Client Confirmation)
- **To**: {{client_email}}
- **Subject**: Appointment Confirmation - {{appointment_date}}
- **Body**:
```
Hi {{client_name}},

Your appointment with Andy Kim has been confirmed!

Date: {{appointment_date}}
Time: {{appointment_time}}

Please arrive 5 minutes before your scheduled time.

Contact: andykimcs@gmail.com
Instagram: @_kimandy

Best regards,
Andy Kim
```

## Testing

1. Start your React app: `npm start`
2. Book an appointment
3. Check both email addresses
4. Check Zapier/IFTTT logs for any errors

## Advantages of Webhook Approach

- **No coding required** for email templates
- **Visual interface** for setting up email rules
- **Multiple actions** possible (email, SMS, Slack, etc.)
- **Easy to modify** without touching code
- **Reliable delivery** through established services

## Troubleshooting

### Common Issues:
1. **Webhook not receiving data**
   - Check the webhook URL is correct
   - Verify the payload format matches what Zapier/IFTTT expects

2. **Emails not sending**
   - Check Zapier/IFTTT logs
   - Verify email service is connected
   - Check email sending limits

3. **Data not appearing in emails**
   - Verify the field names match between webhook payload and email template
   - Test the webhook with sample data first

### Testing Webhook:
You can test your webhook URL with curl:
```bash
curl -X POST https://hooks.zapier.com/hooks/catch/YOUR_ID/ \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test Client",
    "client_email": "test@example.com",
    "appointment_date": "Monday, January 1, 2024",
    "appointment_time": "2:00 PM"
  }'
```

## Cost Considerations

- **Zapier**: Free tier includes 100 tasks/month
- **IFTTT**: Free tier includes 5 applets
- **EmailJS**: Free tier includes 200 emails/month

For a small business, the free tiers should be sufficient. 