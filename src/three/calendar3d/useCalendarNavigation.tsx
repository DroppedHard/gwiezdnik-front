import { useEffect, useRef } from 'react';
import { useModal } from 'services/context';

export function useCalendarNavigation(changeMonth: (delta: number) => void) {
  const { isVisible } = useModal(); // 👈 Use modal visibility
  const changeMonthRef = useRef(changeMonth);
  const modalOpenRef = useRef(isVisible);

  useEffect(() => {
    changeMonthRef.current = changeMonth;
  }, [changeMonth]);

  useEffect(() => {
    modalOpenRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    let lastScroll = 0;

    const handleKey = (e: KeyboardEvent) => {
      if (modalOpenRef.current) return;

      if (e.key === 'ArrowDown') changeMonthRef.current(1);
      else if (e.key === 'ArrowUp') changeMonthRef.current(-1);
    };

    const handleWheel = (e: WheelEvent) => {
      if (modalOpenRef.current) return;

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
