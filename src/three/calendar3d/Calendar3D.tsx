import { Html } from '@react-three/drei';
import DreambookModalSwitcher from 'components/modals/HoroscopeDreambookSwitcher';
import { useMemo } from 'react';
import { useModal } from 'services/context';
import DayBox from './DayBox';
import { MonthTitle } from './MonthTitle';

interface Calendar3DProps {
  year: number;
  month: number;
  day?: number;
  sunBased?: boolean;
  onSetDate: (year: number, month: number) => void;
  scale?: number; // 💡 add scale prop
}

export function Calendar3D({ year, month, day, sunBased, onSetDate, scale = 1 }: Calendar3DProps) {
  const { showModal } = useModal();

  const displayOptions = (day: number) => {
    showModal(<DreambookModalSwitcher year={year} month={month} day={day} />);
  };

  const calendar = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1);
    const totalDays = new Date(year, month, 0).getDate();
    const startDay = sunBased ? firstDay.getDay() : (firstDay.getDay() + 6) % 7;

    const cells: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let i = 1; i <= totalDays; i++) cells.push(i);

    return cells;
  }, [year, month, sunBased]);

  const columns = 7;
  const cellSize = 2;
  const rows = Math.ceil(calendar.length / columns);
  const offsetX = ((columns - 1) * cellSize) / 2;
  const offsetY = ((rows - 1) * cellSize) / 2;

  return (
    <group scale={[scale, scale, scale]} position={[0, 0, -5]}>
      <MonthTitle year={year} month={month} onSetDate={onSetDate} />
      {calendar.map((dayNum, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const x = col * cellSize - offsetX;
        const y = -row * cellSize + offsetY;
        return (
          <group key={index} position={[x, y, 0]}>
            <Html transform occlude zIndexRange={[0, 10]}>
              <DayBox
                day={dayNum}
                selected={day === dayNum}
                displayOptions={() => displayOptions(dayNum!)}
              />
            </Html>
          </group>
        );
      })}
    </group>
  );
}
