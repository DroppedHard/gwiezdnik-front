import { useLayoutEffect, useRef, useState } from 'react';

interface DayBoxProps {
  day: number | null;
  selected: boolean;
  onSelect: () => void;
}

declare global {
  interface Window {
    __daybox_mouse_listener__?: boolean;
  }
}

const mouse = { x: 0, y: 0 };

// Set up global mouse tracking only once (module-scoped)
if (typeof window !== 'undefined' && !window.__daybox_mouse_listener__) {
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  (window as Window).__daybox_mouse_listener__ = true;
}

export default function DayBox({ day, selected, onSelect }: DayBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    let frame: number;

    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouse.x - centerX;
        const dy = mouse.y - centerY;

        const factor = 10;
        const maxAngle = 15;

        setTilt({
          x: Math.max(-maxAngle, Math.min(maxAngle, (-dy / rect.height) * factor)),
          y: Math.max(-maxAngle, Math.min(maxAngle, (dx / rect.width) * factor)),
        });
      }

      frame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frame);
  }, []);

  const baseColor = selected
    ? 'rgba(128, 90, 213, 0.5)' // purple
    : hovered
      ? 'rgba(255,255,255,0.15)' // brighter on hover
      : 'rgba(255,255,255,0.08)';

  const borderColor = selected
    ? 'rgba(168, 85, 247, 1)' // purple
    : hovered
      ? 'rgba(255,255,255,0.3)'
      : 'rgba(255,255,255,0.2)';

  return (
    <div
      ref={ref}
      onClick={() => day && onSelect()}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
        width: '80px',
        height: '80px',
        background: day ? baseColor : 'transparent',
        border: day ? `1px solid ${borderColor}` : 'none',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2em',
        color: '#fff',
        backdropFilter: 'blur(6px)',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        cursor: day ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        userSelect: 'none',
      }}
    >
      {day ?? ''}
    </div>
  );
}
