import { useState } from 'react';
import { MONTH_NAMES_ARRAY } from 'utils/strings';
import { formStyles } from 'utils/styles';

export type MonthYearPickerProps = {
  selectedYear: number;
  selectedMonth: number;
  hideModal: () => void;
  onSetDate: (year: number, month: number) => void;
};

export default function MonthYearPicker({
  selectedMonth,
  selectedYear,
  onSetDate,
  hideModal,
}: MonthYearPickerProps) {
  const [month, setMonth] = useState(selectedMonth);
  const [year, setYear] = useState(selectedYear);

  const handleConfirm = () => {
    onSetDate(year, month);
    hideModal();
  };

  return (
    <form style={formStyles.form}>
      <h2 style={formStyles.title}>Pick Month & Year</h2>

      <div style={formStyles.selectWrapper}>
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          style={formStyles.select}
        >
          {MONTH_NAMES_ARRAY.map((name, i) => (
            <option key={i + 1} value={i + 1} style={formStyles.selectOption}>
              {name}
            </option>
          ))}
        </select>
        <span style={formStyles.arrow}>▼</span>
      </div>

      <input
        type="number"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
        style={formStyles.input}
      />

      <button type="button" onClick={handleConfirm} style={formStyles.button}>
        Confirm
      </button>
    </form>
  );
}
