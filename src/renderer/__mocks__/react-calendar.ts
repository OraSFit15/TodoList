import React from 'react';

interface CalendarProps {
  onChange?: (date: Date) => void;
  value?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ onChange, value }) => {
  return React.createElement('div', {
    'data-testid': 'mock-calendar',
    onClick: () => onChange && onChange(new Date())
  }, 'Mock Calendar');
};

export default Calendar;
