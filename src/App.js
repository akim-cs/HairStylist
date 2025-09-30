import React from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Calendar from './components/Calendar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <Portfolio />
      <Calendar />
      <Footer />
    </div>
  );
}

export default App; 