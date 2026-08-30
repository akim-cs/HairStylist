# Andy Kim - Hairstylist Website

A React-based website for Andy Kim, a professional hairstylist, featuring a portfolio showcase and appointment booking system.

## Features

- **Portfolio Showcase**: Display of hairstyling work with hover effects
- **Interactive Calendar**: Monthly calendar for appointment booking
- **Real-time Booking**: Firebase Firestore integration — booked slots update live across all sessions
- **Email Notifications**: Automatic notification to the stylist on every booking via EmailJS

## Tech Stack

- **Frontend**: React 18
- **Styling**: CSS3 with custom animations
- **Database**: Firebase Firestore
- **Email**: EmailJS
- **Deployment**: Vercel

## Environment Variables

Create a `.env` file in the project root with the following:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
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
│   ├── Header.js         # Stylist name and bio
│   ├── Portfolio.js      # Portfolio images
│   ├── Calendar.js       # Booking calendar with Firebase integration
│   └── BookingModal.js   # Appointment booking form
├── services/
│   └── emailService.js   # EmailJS notification on booking
├── firebase.js           # Firebase configuration
├── App.js                # Main application component
├── index.js              # React entry point
└── index.css             # Global styles

public/
├── images/               # Portfolio images
└── index.html            # HTML template
```

## Firebase

- **Firestore**: Stores appointment bookings (`appointments` collection)
- **Real-time listeners**: `onSnapshot` keeps booked slots in sync
- **Analytics**: Enabled in production only

## Firestore Security Rules

The `appointments` collection allows:
- `read`: public (needed to display available slots)
- `create`: public (needed to book an appointment)
- `update` / `delete`: denied
