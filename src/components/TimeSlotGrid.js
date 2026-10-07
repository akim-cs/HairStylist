import React from 'react';

const TimeSlotGrid = ({ slots, onSlotClick }) => (
  <div className="time-slots">
    {slots.map(({ time, faded, disabled }) => (
      <button
        key={time}
        className={`time-slot${faded ? ' slot-faded' : ''}`}
        onClick={() => onSlotClick(time)}
        disabled={disabled}
      >
        {time}
      </button>
    ))}
  </div>
);

export default TimeSlotGrid;
