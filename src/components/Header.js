import React from 'react';

const Header = () => {
  return (
    <header className="hero">
      <p className="hero-eyebrow">Hairstylist & Barber</p>
      <h1 className="hero-name">Andy Kim</h1>
      <p className="hero-bio">
        Modern cuts, clean fades, and precision layering —<br />
        every appointment tailored to you.
      </p>
      <a href="#booking" className="hero-cta">Book an Appointment →</a>
    </header>
  );
};

export default Header;
