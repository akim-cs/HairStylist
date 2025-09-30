import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, bookingDetails, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        instagram: ''
      });
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        instagram: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${!isOpen ? 'hidden' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={handleClose} disabled={isLoading}>
          &times;
        </button>
        
        <h2>Book Your Appointment</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#4a4a4a' }}>
          {bookingDetails}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="client-name">Full Name *</label>
            <input
              type="text"
              id="client-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="client-email">Email *</label>
            <input
              type="email"
              id="client-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="client-phone">Phone Number</label>
            <input
              type="tel"
              id="client-phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="client-instagram">Instagram Handle</label>
            <input
              type="text"
              id="client-instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="@username"
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="book-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm Booking'}
          </button>
          
          {isLoading && (
            <div className="loading show">
              Processing your booking...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingModal; 