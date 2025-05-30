import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Calendar3DWrapper } from 'three/calendar3d';
import { CosmicBackground } from 'three/background';

export default function App() {
  return (
    <div className="app-container">
      <Canvas>
        <Calendar3DWrapper />
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
