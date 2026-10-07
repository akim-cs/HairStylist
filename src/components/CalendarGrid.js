import React from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const buildDays = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = firstDay - 1; i >= 0; i--) days.push({ day: daysInPrevMonth - i, isOtherMonth: true });
  for (let d = 1; d <= daysInMonth; d++) days.push({ day: d, isOtherMonth: false });
  for (let d = 1; d <= 42 - days.length; d++) days.push({ day: d, isOtherMonth: true });
  return days;
};

const CalendarGrid = ({
  currentDate,
  selectedDate,
  onSelectDate,
  onChangeMonth,
  isBlocked = () => false,
  isPartial = () => false,
  disablePast = true,
  disableBlocked = true,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = buildDays(currentDate);

  return (
    <>
      <div className="calendar-header">
        <button className="calendar-nav" onClick={() => onChangeMonth(-1)}>← Previous</button>
        <div className="calendar-month">
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button className="calendar-nav" onClick={() => onChangeMonth(1)}>Next →</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="calendar-day-header">{d}</div>
        ))}
        {days.map((dayData, i) => {
          const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayData.day);
          const dateKey = dayDate.toDateString();
          const isPast = !dayData.isOtherMonth && dayDate < today;
          const blocked = !dayData.isOtherMonth && isBlocked(dateKey);
          const partial = !dayData.isOtherMonth && isPartial(dateKey);
          const isSelected =
            !isPast &&
            !dayData.isOtherMonth &&
            selectedDate &&
            selectedDate.getDate() === dayData.day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();
          const disabled =
            dayData.isOtherMonth ||
            (disablePast && isPast) ||
            (disableBlocked && blocked);

          return (
            <button
              key={i}
              className={[
                'calendar-day',
                dayData.isOtherMonth ? 'other-month' : '',
                isSelected ? 'selected' : '',
                isPast ? 'day-past' : (blocked ? 'day-blocked' : ''),
                partial ? 'day-partial' : '',
              ].join(' ')}
              onClick={() => !disabled && onSelectDate(dayDate)}
              disabled={disabled}
            >
              {dayData.day}
              {partial && <span className="day-dot" />}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;
