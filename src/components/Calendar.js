import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import BookingModal from './BookingModal';
import CalendarGrid from './CalendarGrid';
import TimeSlotSection from './TimeSlotSection';
import { sendBookingNotification } from '../services/emailService';

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [blockedSlots, setBlockedSlots] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState('');

  // One-time load then real-time listener for appointments
  useEffect(() => {
    const appointmentsRef = collection(db, 'appointments');
    const unsubscribe = onSnapshot(appointmentsRef, (snapshot) => {
      const booked = new Set();
      snapshot.forEach((doc) => {
        const data = doc.data();
        booked.add(`${data.date}-${data.time}`);
      });
      setBookedSlots(booked);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'availability'), (snapshot) => {
      const blocked = {};
      snapshot.forEach((doc) => { blocked[doc.id] = doc.data().blockedTimes || []; });
      setBlockedSlots(blocked);
    });
    return () => unsubscribe();
  }, []);

  const isDayFullyBlocked = (dateKey) =>
    TIME_SLOTS.every(t => (blockedSlots[dateKey] || []).includes(t));

  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + direction);
      return next;
    });
    setSelectedDate(null);
  };

  const openBookingModal = (dateKey, time) => {
    setSelectedTime(time);
    const formattedDate = new Date(dateKey).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    setBookingDetails(`${formattedDate} at ${time}`);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
    setSelectedTime(null);
    setBookingDetails('');
  };

  const handleBookingSubmit = async (formData) => {
    try {
      const bookingData = {
        ...formData,
        date: selectedDate.toDateString(),
        time: selectedTime,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
      };
      const docRef = await addDoc(collection(db, 'appointments'), bookingData);
      console.log("Appointment booked with ID: ", docRef.id);
      try {
        await sendBookingNotification(bookingData);
        alert('Appointment booked successfully! Andy has been notified and will contact you shortly.');
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        alert('Appointment booked successfully! However, there was an issue sending the notification email. Please contact Andy directly.');
      }
      closeBookingModal();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert('Sorry, there was an error booking your appointment. Please try again.');
    }
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;
    const dateKey = selectedDate.toDateString();

    if (isDayFullyBlocked(dateKey)) {
      return (
        <div className="booking-info">
          <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>No availability on this date.</p>
        </div>
      );
    }

    const slots = TIME_SLOTS.map(time => {
      const unavailable = bookedSlots.has(`${dateKey}-${time}`) || (blockedSlots[dateKey] || []).includes(time);
      return { time, faded: unavailable, disabled: unavailable };
    });

    return (
      <TimeSlotSection
        label={`Available Times for ${selectedDate.toLocaleDateString()}`}
        slots={slots}
        onSlotClick={(time) => openBookingModal(dateKey, time)}
      />
    );
  };

  return (
    <>
      <section className="calendar-section" id="booking">
        <h2 className="section-title">Book an Appointment</h2>
        <p className="section-subtitle">Select a date & time</p>

        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onChangeMonth={changeMonth}
          isBlocked={isDayFullyBlocked}
          disablePast={true}
          disableBlocked={true}
        />

        {selectedDate ? renderTimeSlots() : (
          <div className="booking-info">
            <p>Select a date to view available time slots</p>
          </div>
        )}
      </section>

      <BookingModal
        isOpen={showModal}
        onClose={closeBookingModal}
        bookingDetails={bookingDetails}
        onSubmit={handleBookingSubmit}
      />
    </>
  );
};

export default Calendar;
