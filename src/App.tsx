import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Calendar3D } from 'three/calendar3d';
import { CosmicBackground } from 'three/background';

export default function App() {
  const currDay = new Date();
  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <Calendar3D year={currDay.getFullYear()} month={currDay.getMonth()} />
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
