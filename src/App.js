import React from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Calendar from './components/Calendar';
import AdminDashboard from './components/AdminDashboard';

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="container">
      <Header />
      <Portfolio />
      <Calendar />
    </div>
  );
}

export default App;
