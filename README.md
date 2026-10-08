# Andy Kim - Hairstylist Website

A React-based website for Andy Kim, a professional hairstylist, featuring a portfolio showcase and appointment booking system.

## Features

- **Portfolio Showcase**: Display of hairstyling work with hover effects
- **Interactive Calendar**: Monthly calendar for appointment booking with past-date blocking
- **Real-time Booking**: Firebase Firestore integration — booked slots update live across all sessions
- **Email Notifications**: Automatic notification to the stylist on every booking via EmailJS
- **Admin Dashboard**: Password-protected portal at `/admin` for managing availability by day and time slot

## Tech Stack

- **Frontend**: React 18
- **Styling**: CSS3 with custom properties (warm cream editorial palette)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication (Google OAuth, admin-only)
- **Email**: EmailJS
- **Deployment**: Vercel

## Environment Variables

Create a `.env` file in the project root with the following:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_ADMIN_EMAIL=your_email@example.com
```

These same variables must be added to Vercel under **Project Settings → Environment Variables**.

## Local Development

```bash
npm install
npm start
```

## Project Structure

```
src/
├── components/
│   ├── Header.js           # Stylist name, bio, and pricing
│   ├── Portfolio.js        # Portfolio image grid
│   ├── Calendar.js         # Client booking calendar
│   ├── AdminDashboard.js   # Admin availability manager
│   ├── CalendarGrid.js     # Shared calendar grid component
│   ├── TimeSlotSection.js  # Shared time slot section component
│   ├── TimeSlotGrid.js     # Shared time slot pill grid
│   └── BookingModal.js     # Appointment booking form
├── services/
│   └── emailService.js     # EmailJS notification on booking
├── firebase.js             # Firebase configuration
├── App.js                  # Main application component
├── index.js                # React entry point
└── index.css               # Global styles

public/
├── images/                 # Portfolio images
└── index.html              # HTML template
```

## Firebase

- **Firestore**: Stores appointment bookings (`appointments`) and barber-blocked slots (`availability`)
- **Auth**: Google sign-in restricted to the admin email address
- **Real-time listeners**: `onSnapshot` keeps availability and bookings in sync

## Firestore Security Rules

Deploy via `firebase deploy --only firestore:rules` or paste into Firebase Console → Firestore → Rules.

- `appointments`: public read/write (clients book, slots display live)
- `availability`: public read, write restricted to authenticated admin email
