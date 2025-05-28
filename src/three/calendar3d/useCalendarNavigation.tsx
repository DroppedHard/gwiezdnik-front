import { useEffect, useRef } from 'react';

export function useCalendarNavigation(changeMonth: (delta: number) => void) {
  const changeMonthRef = useRef(changeMonth);

  useEffect(() => {
    changeMonthRef.current = changeMonth;
  }, [changeMonth]);

  useEffect(() => {
    let lastScroll = 0;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') changeMonthRef.current(1);
      else if (e.key === 'ArrowUp') changeMonthRef.current(-1);
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll < 500) return;
      lastScroll = now;
      changeMonthRef.current(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener('keydown', handleKey);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}
