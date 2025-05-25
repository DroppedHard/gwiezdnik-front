import { Html } from '@react-three/drei';

interface MonthTitle3DProps {
  year: number;
  month: number; // 1-based
  position?: [x: number, y: number, z: number];
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function MonthTitle({ year, month, position = [0, 6, 0] }: MonthTitle3DProps) {
  const monthName = MONTH_NAMES[month - 1] ?? 'Unknown';

  return (
    <Html
      position={position}
      center
      transform
      distanceFactor={10}
      zIndexRange={[0, 10]}
      style={{
        fontSize: '1.8rem',
        fontWeight: 600,
        color: 'white',
        textShadow: '0 0 10px rgba(255,255,255,0.4)',
        backdropFilter: 'blur(6px)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {monthName} {year}
    </Html>
  );
}
