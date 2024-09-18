import React, { ChangeEvent, useState, useEffect } from 'react';

interface CustomDatePickerProps {
  onChange: (date: Date) => void;
  value: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onChange, value }) => {
  const [date, setDate] = useState<Date>(value || new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const days = Array.from(
      { length: getDaysInMonth(date.getMonth(), date.getFullYear()) },
      (_, i) => i + 1
    );
    setDaysInMonth(days);
  }, [date]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newDate = new Date(date);
    const { name, value: inputValue } = e.target;

    switch (name) {
      case 'day':
        newDate.setDate(parseInt(inputValue));
        break;
      case 'month':
        const newMonth = months.indexOf(inputValue);
        newDate.setMonth(newMonth);
        // Adjust the day if it exceeds the number of days in the new month
        const daysInNewMonth = getDaysInMonth(newMonth, newDate.getFullYear());
        if (newDate.getDate() > daysInNewMonth) {
          newDate.setDate(daysInNewMonth);
        }
        break;
      case 'year':
        const newYear = parseInt(inputValue);
        newDate.setFullYear(newYear);
        // Adjust the day for February in case of leap year changes
        if (newDate.getMonth() === 1) {
          const daysInNewFebruary = getDaysInMonth(1, newYear);
          if (newDate.getDate() > daysInNewFebruary) {
            newDate.setDate(daysInNewFebruary);
          }
        }
        break;
    }

    setDate(newDate);
    onChange(newDate);
  };

  return (
    <div className="flex space-x-2">
      <select
        name="day"
        value={date.getDate()}
        onChange={handleChange}
        className="p-2 border rounded w-20"
      >
        {daysInMonth.map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
      <select
        name="month"
        value={months[date.getMonth()]}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        {months.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
      <input
        type="number"
        name="year"
        value={date.getFullYear()}
        onChange={handleChange}
        className="p-2 border rounded w-20"
      />
    </div>
  );
};

export default CustomDatePicker;