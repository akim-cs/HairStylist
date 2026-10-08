import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the stylist name', () => {
    render(<Header />);
    expect(screen.getByText('Andy Kim')).toBeInTheDocument();
  });

  it('renders the booking CTA link', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /book an appointment/i });
    expect(link).toHaveAttribute('href', '#booking');
  });

  it('renders the flat rate price', () => {
    render(<Header />);
    expect(screen.getByText(/\$35 flat rate/i)).toBeInTheDocument();
  });
});
