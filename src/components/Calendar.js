import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import BookingModal from './BookingModal';
import { sendBookingNotifications } from '../services/emailService';
import { sendWebhookNotification } from '../services/webhookService';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState('');

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Load booked appointments from Firebase
  useEffect(() => {
    const loadBookedAppointments = async () => {
      try {
        const appointmentsRef = collection(db, 'appointments');
        const snapshot = await getDocs(appointmentsRef);
        
        const booked = new Set();
        snapshot.forEach((doc) => {
          const data = doc.data();
          const slotKey = `${data.date}-${data.time}`;
          booked.add(slotKey);
        });
        
        setBookedSlots(booked);
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    };

    loadBookedAppointments();
  }, []);

  // Set up real-time listener for appointments
  useEffect(() => {
    const appointmentsRef = collection(db, 'appointments');
    const unsubscribe = onSnapshot(appointmentsRef, (snapshot) => {
      const booked = new Set();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const slotKey = `${data.date}-${data.time}`;
        booked.add(slotKey);
      });
      setBookedSlots(booked);
    });

    return () => unsubscribe();
  }, []);

  const renderCalendar = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isOtherMonth: true
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isOtherMonth: false
      });
    }

    // Add next month's leading days
    const totalCells = days.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isOtherMonth: true
      });
    }

    return days;
  };

  const selectDate = (day) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
  };

  const showTimeSlots = () => {
    if (!selectedDate) return null;

    const dateKey = selectedDate.toDateString();
    
    return (
      <div className="booking-info">
        <h3>Available Times for {selectedDate.toLocaleDateString()}</h3>
        <div className="time-slots">
          {timeSlots.map(time => {
            const slotKey = `${dateKey}-${time}`;
            const isBooked = bookedSlots.has(slotKey);
            
            return (
              <button
                key={time}
                className={`time-slot ${isBooked ? 'booked' : ''}`}
                onClick={() => !isBooked && openBookingModal(dateKey, time)}
                disabled={isBooked}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const openBookingModal = (date, time) => {
    setSelectedTime(time);
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setBookingDetails(`${formattedDate} at ${time}`);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
    setSelectedTime(null);
    setBookingDetails('');
  };

  const changeMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
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

      // Save to Firebase
      const docRef = await addDoc(collection(db, 'appointments'), bookingData);
      console.log("Appointment booked with ID: ", docRef.id);
      
      // Send webhook notification (primary method)
      try {
        await sendWebhookNotification(bookingData);
        alert('Appointment booked successfully! Andy has been notified and will contact you shortly.');
      } catch (webhookError) {
        console.error("Webhook notification failed:", webhookError);
        
        // Fallback to email notifications
        try {
          await sendBookingNotifications(bookingData);
          alert('Appointment booked successfully! Confirmation emails have been sent to both you and Andy.');
        } catch (emailError) {
          console.error("Email notification also failed:", emailError);
          alert('Appointment booked successfully! However, there was an issue sending notifications. Please contact Andy directly.');
        }
      }
      
      closeBookingModal();
      
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert('Sorry, there was an error booking your appointment. Please try again.');
    }
  };

  const calendarDays = renderCalendar();

  return (
    <>
      <section className="calendar-section">
        <h2 className="section-title">Book an Appointment</h2>
        
        <div className="calendar-header">
          <button className="calendar-nav" onClick={() => changeMonth(-1)}>
            ← Previous
          </button>
          <div className="calendar-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button className="calendar-nav" onClick={() => changeMonth(1)}>
            Next →
          </button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-day-header">Sun</div>
          <div className="calendar-day-header">Mon</div>
          <div className="calendar-day-header">Tue</div>
          <div className="calendar-day-header">Wed</div>
          <div className="calendar-day-header">Thu</div>
          <div className="calendar-day-header">Fri</div>
          <div className="calendar-day-header">Sat</div>
          
          {calendarDays.map((dayData, index) => (
            <button
              key={index}
              className={`calendar-day ${dayData.isOtherMonth ? 'other-month' : ''} ${
                selectedDate && 
                selectedDate.getDate() === dayData.day && 
                selectedDate.getMonth() === currentDate.getMonth() && 
                selectedDate.getFullYear() === currentDate.getFullYear() 
                  ? 'selected' 
                  : ''
              }`}
              onClick={() => !dayData.isOtherMonth && selectDate(dayData.day)}
              disabled={dayData.isOtherMonth}
            >
              {dayData.day}
            </button>
          ))}
        </div>

        {selectedDate ? showTimeSlots() : (
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