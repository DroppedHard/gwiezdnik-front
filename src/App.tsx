import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Calendar3DWrapper } from 'three/calendar3d';
import { CosmicBackground } from 'three/background';
import { UserDisplay } from 'three/components';

export default function App() {
  const currDay = new Date();

  return (
    <div className="app-container">
      <Canvas>
        <UserDisplay />
        <Calendar3DWrapper initialYear={currDay.getFullYear()} initialMonth={currDay.getMonth()} />
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
