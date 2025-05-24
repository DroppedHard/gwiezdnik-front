// App.jsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CosmicBackground from './three/CosmicBackground';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
