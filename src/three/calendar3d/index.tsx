import { Html } from '@react-three/drei';
import { useMemo, useState } from 'react';
import * as THREE from 'three';
import DayBox from './DayBox';
import { MonthTitle } from './MonthTitle';

interface Calendar3DProps {
  year: number;
  month: number; // 1-based (Jan = 1)
  sunBased?: boolean;
}

export function Calendar3D({ year, month, sunBased }: Calendar3DProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const calendar = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month - 1, 0).getDate();
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
    <group position={new THREE.Vector3(0, 0, -5)}>
      <MonthTitle year={year} month={month} />
      {calendar.map((day, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const x = col * cellSize - offsetX;
        const y = -row * cellSize + offsetY;
        return (
          <group key={index} position={[x, y, 0]}>
            <Html transform occlude>
              <DayBox
                day={day}
                selected={selectedDay === day}
                onSelect={() => setSelectedDay(day!)}
              />
            </Html>
          </group>
        );
      })}
    </group>
  );
}
