import { useState, useCallback } from 'react';
import { Calendar3D } from './Calendar3D';
import { useCalendarNavigation } from './useCalendarNavigation';

export function Calendar3DWrapper({
  initialYear,
  initialMonth,
}: {
  initialYear: number;
  initialMonth: number;
}) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

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
      onSetDate={(newYear, newMonth) => {
        setYear(newYear);
        setMonth(newMonth);
      }}
    />
  );
}
