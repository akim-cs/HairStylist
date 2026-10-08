import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingModal from './BookingModal';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  bookingDetails: 'Saturday, Oct 11 at 2:00 PM',
};

describe('BookingModal', () => {
  it('renders nothing when closed', () => {
    render(<BookingModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Book Your Appointment')).not.toBeInTheDocument();
  });

  it('renders the form when open', () => {
    render(<BookingModal {...defaultProps} />);
    expect(screen.getByText('Book Your Appointment')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('displays the booking details', () => {
    render(<BookingModal {...defaultProps} />);
    expect(screen.getByText('Saturday, Oct 11 at 2:00 PM')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(<BookingModal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('updates name field on input', () => {
    render(<BookingModal {...defaultProps} />);
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Jane Doe' } });
    expect(nameInput.value).toBe('Jane Doe');
  });
});
