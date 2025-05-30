import { useState, useCallback, useMemo } from 'react';
import { Calendar3D } from './Calendar3D';
import { useCalendarNavigation } from './useCalendarNavigation';
import { useThree } from '@react-three/fiber';
import { UserDisplay } from 'three/components';

export function Calendar3DWrapper() {
  const initDate = new Date();
  const [year, setYear] = useState(initDate.getFullYear());
  const [month, setMonth] = useState(initDate.getMonth() + 1);
  const { size } = useThree();

  const changeMonth = useCallback(
    (delta: number) => {
      const newDate = new Date(year, month - 1 + delta);
      setYear(newDate.getFullYear());
      setMonth(newDate.getMonth() + 1);
    },
    [year, month]
  );

  useCalendarNavigation(changeMonth);

  const calendarScale = useMemo(() => {
    const baseWidth = 7 * 80 + 6 * 16;
    const margin = 32;
    const available = size.width - margin;

    return Math.min(1, available / baseWidth);
  }, [size.width]);

  return (
    <>
      <UserDisplay scale={calendarScale} />
      <Calendar3D
        year={year}
        month={month}
        day={month === initDate.getMonth() + 1 ? initDate.getDate() : undefined}
        onSetDate={(newYear, newMonth) => {
          setYear(newYear);
          setMonth(newMonth);
        }}
        scale={calendarScale}
      />
    </>
  );
}
