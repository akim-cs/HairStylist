import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import TimeSlotSection from './TimeSlotSection';
import CalendarGrid from './CalendarGrid';

const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];


const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'availability'), (snap) => {
      const avail = {};
      snap.forEach((d) => { avail[d.id] = d.data(); });
      setAvailability(avail);
    });
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (ADMIN_EMAIL && result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        alert('Access denied. Only the barber can access this page.');
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        console.error('Sign-in error:', err);
      }
    }
  };

  const handleSignOut = () => signOut(auth);

  const getDateKey = (date) => date.toDateString();

  const getBlockedTimes = (dateKey) =>
    availability[dateKey]?.blockedTimes || [];

  const isSlotBlocked = (dateKey, time) =>
    getBlockedTimes(dateKey).includes(time);

  const isDayFullyBlocked = (dateKey) =>
    TIME_SLOTS.every((t) => getBlockedTimes(dateKey).includes(t));

  const isDayPartiallyBlocked = (dateKey) => {
    const blocked = getBlockedTimes(dateKey);
    return blocked.length > 0 && blocked.length < TIME_SLOTS.length;
  };

  const saveAvailability = async (dateKey, blockedTimes) => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'availability', dateKey), { blockedTimes });
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const toggleTimeSlot = (time) => {
    if (!selectedDate) return;
    const key = getDateKey(selectedDate);
    const current = getBlockedTimes(key);
    const next = current.includes(time)
      ? current.filter((t) => t !== time)
      : [...current, time];
    saveAvailability(key, next);
  };

  const toggleEntireDay = () => {
    if (!selectedDate) return;
    const key = getDateKey(selectedDate);
    const shouldBlockAll = !isDayFullyBlocked(key);
    saveAvailability(key, shouldBlockAll ? [...TIME_SLOTS] : []);
  };

  const changeMonth = (dir) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + dir);
      return next;
    });
    setSelectedDate(null);
  };

  if (authLoading) {
    return <div className="admin-loading">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <p className="admin-login-eyebrow">Barber Portal</p>
          <h1 className="admin-login-title">Andy Kim</h1>
          <p className="admin-login-sub">Sign in to manage your availability</p>
          <button className="admin-google-btn" onClick={handleSignIn}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const selectedKey = selectedDate ? getDateKey(selectedDate) : null;
  const dayFullyBlocked = selectedKey ? isDayFullyBlocked(selectedKey) : false;

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <span className="admin-topbar-title">Andy Kim · Admin</span>
        <div className="admin-topbar-right">
          <span className="admin-topbar-email">{user.email}</span>
          <button className="admin-signout-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>

      <div className="admin-body">
        <div className="admin-header">
          <h2 className="admin-title">Availability Manager</h2>
          <p className="admin-subtitle">Click a date to block or open time slots</p>
        </div>

        <div className="admin-calendar-wrap">
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onChangeMonth={changeMonth}
            isBlocked={isDayFullyBlocked}
            isPartial={isDayPartiallyBlocked}
            disablePast={false}
            disableBlocked={false}
          />

          <div className="admin-legend">
            <span className="admin-legend-item">
              <span className="admin-legend-swatch admin-legend-blocked" /> Fully blocked
            </span>
            <span className="admin-legend-item">
              <span className="admin-legend-swatch admin-legend-partial" /> Partially blocked
            </span>
          </div>
        </div>

        {selectedDate && (
          <TimeSlotSection
            label={selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            slots={TIME_SLOTS.map(time => ({
              time,
              faded: isSlotBlocked(selectedKey, time),
              disabled: saving,
            }))}
            onSlotClick={toggleTimeSlot}
            action={
              <button
                className={`admin-toggle-day-btn ${dayFullyBlocked ? 'admin-toggle-day-unblock' : ''}`}
                onClick={toggleEntireDay}
                disabled={saving}
              >
                {dayFullyBlocked ? 'Unblock All' : 'Block All Day'}
              </button>
            }
            hint={saving ? 'Saving…' : 'Click a slot to toggle availability.'}
          />
        )}

        {!selectedDate && (
          <div className="booking-info">
            <p>Select a date to manage its time slots.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
