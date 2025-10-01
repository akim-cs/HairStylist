# Andy Kim - Hairstylist Website

A modern React-based website for Andy Kim, a professional hairstylist, featuring portfolio showcase and appointment booking functionality.

## Features

- **Portfolio Showcase**: Display of hairstyling work with hover effects
- **Interactive Calendar**: Monthly calendar for appointment booking
- **Real-time Booking**: Firebase integration for live appointment management
- **Email Notifications**: Automatic notifications to both stylist and client upon booking
- **Responsive Design**: Mobile-friendly layout
- **Social Media Integration**: Instagram and email links

## Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: CSS3 with custom animations
- **Backend**: Firebase Firestore
- **Build Tool**: Create React App

## Firebase Dependencies

The project uses Firebase v10.7.1 with the following compatible services:
- Firebase App
- Firestore Database
- Firebase Analytics (production only)

## Email Notifications

The booking system includes automatic email notifications:
- **Stylist Notification**: Sent to andykimcs@gmail.com with client details
- **Client Confirmation**: Sent to the client's email with appointment details

### Setup Options:
1. **EmailJS** (Recommended): See `EMAILJS_SETUP.md` for detailed instructions
2. **Webhook Services** (Zapier/IFTTT): See `WEBHOOK_SETUP.md` for quick setup
3. **Custom Backend**: Integrate with your preferred email service

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project (already configured)

### Installation & Running

1. ```
   npm install
   ```

2. ```bash
   npm start
   ```

3. ```bash
   npm run build
   ```

## Firebase Configuration

The Firebase configuration is already set up in `src/firebase.js` with the following services:

- **Firestore Database**: For storing appointment bookings
- **Real-time listeners**: For live updates of booked slots
- **Analytics**: For production usage tracking

### Database Structure

The Firestore database uses the following collection:

**appointments**
```javascript
{
  name: string,           // Client's full name
  email: string,          // Client's email
  phone: string,          // Client's phone (optional)
  instagram: string,      // Instagram handle (optional)
  date: string,           // Appointment date (toDateString format)
  time: string,           // Appointment time slot
  timestamp: string,      // ISO timestamp of booking
  status: string          // Booking status (default: 'confirmed')
}
```

## Project Structure

```
src/
├── components/
│   ├── Header.js         # Stylist name and bio
│   ├── Portfolio.js      # Portfolio images
│   ├── Calendar.js       # Booking calendar with Firebase integration
│   ├── BookingModal.js   # Appointment booking form
│   └── Footer.js         # Social media links
├── firebase.js           # Firebase configuration
├── App.js               # Main application component
├── index.js             # React entry point
└── index.css            # Global styles

public/
├── images/              # Portfolio images
└── index.html           # HTML template
```
