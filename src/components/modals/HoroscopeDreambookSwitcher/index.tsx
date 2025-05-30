import { useState } from 'react';
import HoroscopeModal from './HoroscopeModal';
import DreambookModal from './DreambookModal';

type ModalSwitcherProps = {
  year: number;
  month: number;
  day: number;
};

export default function DreambookModalSwitcher({ year, month, day }: ModalSwitcherProps) {
  const [activeTab, setActiveTab] = useState<'horoscope' | 'dreambook'>('horoscope');

  const containerStyle: React.CSSProperties = {
    margin: '0 auto',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  };

  const toggleButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>
          {activeTab === 'horoscope' ? 'Horoscope' : 'Dreambook'} – {year}-
          {month > 9 ? month : '0' + month}-{day > 9 ? day : '0' + day}
        </h3>
        <button
          onClick={() => setActiveTab(activeTab === 'horoscope' ? 'dreambook' : 'horoscope')}
          style={toggleButtonStyle}
        >
          {activeTab === 'horoscope' ? 'Dreambook' : 'Horoscope'}
        </button>
      </div>

      <div>
        {activeTab === 'horoscope' ? (
          <HoroscopeModal year={year} month={month} day={day} />
        ) : (
          <DreambookModal year={year} month={month} day={day} />
        )}
      </div>
    </div>
  );
}
