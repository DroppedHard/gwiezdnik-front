import { Html } from '@react-three/drei';
import MonthYearPicker from 'components/modals/MonthYearPicker';
import { useModal } from 'services/context';
import { MONTH_NAMES_ARRAY } from 'utils/strings';

interface MonthTitleProps {
  year: number;
  month: number;
  position?: [x: number, y: number, z: number];
  onSetDate: (year: number, month: number) => void;
}

export function MonthTitle({ year, month, position = [0, 6, 0], onSetDate }: MonthTitleProps) {
  const { showModal, hideModal } = useModal();
  const monthName = MONTH_NAMES_ARRAY[month - 1] ?? 'Unknown';

  const openPicker = () => {
    let selectedYear = year;
    let selectedMonth = month;

    showModal(
      <MonthYearPicker
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        hideModal={hideModal}
        onSetDate={onSetDate}
      />
    );
  };

  return (
    <Html
      position={position}
      center
      transform
      distanceFactor={10}
      zIndexRange={[0, 10]}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '1.8rem',
        fontWeight: 600,
        color: 'white',
        textShadow: '0 0 10px rgba(255,255,255,0.4)',
        backdropFilter: 'blur(6px)',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
    >
      <span onClick={openPicker} style={{ cursor: 'pointer' }}>
        {monthName} {year}
      </span>
    </Html>
  );
}
