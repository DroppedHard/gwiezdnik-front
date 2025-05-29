import { useState, useCallback } from 'react';
import { Calendar3D } from './Calendar3D';
import { useCalendarNavigation } from './useCalendarNavigation';

export function Calendar3DWrapper() {
  const initDate = new Date();
  const [year, setYear] = useState(initDate.getFullYear());
  const [month, setMonth] = useState(initDate.getMonth());

  const changeMonth = useCallback(
    (delta: number) => {
      const newDate = new Date(year, month - 1 + delta);
      setYear(newDate.getFullYear());
      setMonth(newDate.getMonth() + 1);
    },
    [year, month]
  );

  useCalendarNavigation(changeMonth);

  return (
    <Calendar3D
      year={year}
      month={month}
      day={month === initDate.getMonth() ? initDate.getDate() : undefined}
      onSetDate={(newYear, newMonth) => {
        setYear(newYear);
        setMonth(newMonth);
      }}
    />
  );
}
