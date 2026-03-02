import React from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="container">
      <Header />
      <section className="main-content">
        <Portfolio />
        <Calendar />
      </section>
    </div>
  );
}

export default App; 