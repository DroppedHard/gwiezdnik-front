import { MONTH_NAMES_ARRAY } from 'utils/strings';

export type MonthYearPickerProps = {
  selectedYear: number;
  selectedMonth: number;
  hideModal: () => void;
  onSetDate?: (year: number, month: number) => void;
};

export default function MonthYearPicker({
  selectedMonth,
  selectedYear,
  onSetDate,
  hideModal,
}: MonthYearPickerProps) {
  // TODO fix this to look better
  return (
    <>
      <h2>Pick Month & Year</h2>
      <select value={selectedMonth} onChange={(e) => (selectedMonth = parseInt(e.target.value))}>
        {MONTH_NAMES_ARRAY.map((name, i) => (
          <option key={i + 1} value={i + 1}>
            {name}
          </option>
        ))}
      </select>
      <input
        type="number"
        defaultValue={selectedYear}
        onChange={(e) => (selectedYear = parseInt(e.target.value))}
        style={{ marginLeft: '1rem' }}
      />
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => {
            onSetDate?.(selectedYear, selectedMonth);
            hideModal();
          }}
        >
          Confirm
        </button>
        <button onClick={hideModal} style={{ marginLeft: '1rem' }}>
          Cancel
        </button>
      </div>
    </>
  );
}
