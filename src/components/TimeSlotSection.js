import React from 'react';
import TimeSlotGrid from './TimeSlotGrid';

const TimeSlotSection = ({ label, slots, onSlotClick, action, hint }) => (
  <div className="booking-info">
    {action ? (
      <div className="slot-section-header">
        <h3>{label}</h3>
        {action}
      </div>
    ) : (
      <h3>{label}</h3>
    )}
    <TimeSlotGrid slots={slots} onSlotClick={onSlotClick} />
    {hint && <p className="slot-section-hint">{hint}</p>}
  </div>
);

export default TimeSlotSection;
