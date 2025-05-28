import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Calendar3DWrapper } from 'three/calendar3d';
import { CosmicBackground } from 'three/background';
import { UserDisplay } from 'three/components';
import { useModal } from 'services/context';
import LoginForm from 'components/modals/LoginForm';

export default function App() {
  const currDay = new Date();
  const { showModal } = useModal();

  const user = { name: null };

  const loggg = () => showModal(<LoginForm />);

  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <UserDisplay text={user.name ? user.name : 'Sign In'} onClick={loggg} />
        <Calendar3DWrapper initialYear={currDay.getFullYear()} initialMonth={currDay.getMonth()} />
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
