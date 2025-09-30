import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDBcHgEOYMS_Fwq2qXWBhP_uADt8N4szg",
  authDomain: "hairstylist-f7b96.firebaseapp.com",
  projectId: "hairstylist-f7b96",
  storageBucket: "hairstylist-f7b96.firebasestorage.app",
  messagingSenderId: "406149207191",
  appId: "1:406149207191:web:61d1b7308a9b58f49305d2",
  measurementId: "G-CVQZWFY5YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics only in production
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

export { db, analytics }; 