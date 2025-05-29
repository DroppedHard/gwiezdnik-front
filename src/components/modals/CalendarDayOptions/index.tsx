import { useState } from 'react';
import { useFetchDateHoroscope, useFetchHoroscope } from 'services/hooks/HoroscopeFetcher';
import { formStyles } from 'utils/styles';
import { PERIOD_OPTIONS } from 'utils/strings';
import { HoroscopePeriod } from 'utils/types';
import { useUser } from 'services/context';

type HoroscopeOptionalModalProps = {
  year: number;
  month: number;
  day: number;
};

export default function HoroscopeOptionalModal({ year, month, day }: HoroscopeOptionalModalProps) {
  const [period, setPeriod] = useState<HoroscopePeriod>('day');
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { user } = useUser();
  const isToday = (() => {
    const now = new Date();
    return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
  })();

  const horoscope = useFetchHoroscope(user?.sign!, period, isToday && triggerFetch);

  const dateHoroscope = useFetchDateHoroscope(user?.sign!, `${year}-${month + 1}-${day}`, !isToday);

  const handleFetchClick = () => {
    setTriggerFetch(true);
  };

  return (
    <div style={formStyles.form}>
      {isToday ? (
        <>
          <h2 style={formStyles.title}>Select time period:</h2>
          <div style={formStyles.selectWrapper}>
            <select
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value as HoroscopePeriod);
                setTriggerFetch(false);
              }}
              style={formStyles.select}
            >
              {Object.entries(PERIOD_OPTIONS).map(([name], i) => (
                <option key={i} value={name} style={formStyles.selectOption}>
                  {name}
                </option>
              ))}
            </select>
            <span style={formStyles.arrow}>▼</span>
          </div>

          <button
            onClick={handleFetchClick}
            style={formStyles.button}
            disabled={horoscope.isFetching}
          >
            Get Horoscope
          </button>

          {horoscope.data && (
            <div style={{ color: 'white', fontSize: '14px', marginTop: '1rem' }}>
              <strong>Result:</strong>
              <p>{horoscope.data.horoscope}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 style={formStyles.title}>Horoscope for {`${year}-${month + 1}-${day}`}:</h2>
          {dateHoroscope.isLoading && <p style={{ color: 'white' }}>Loading...</p>}
          {dateHoroscope.error && (
            <p style={{ color: 'red' }}>Error fetching horoscope: {dateHoroscope.error.message}</p>
          )}
          {dateHoroscope.data && (
            <div style={{ color: 'white', fontSize: '14px', marginTop: '1rem' }}>
              <strong>Result:</strong>
              <p>{dateHoroscope.data.horoscope}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
