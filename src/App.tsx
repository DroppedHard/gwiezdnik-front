import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Calendar3D } from 'three/calendar3d';
import { CosmicBackground } from 'three/background';
import { UserDisplay } from 'three/components';
import { useModal } from 'services/context';
import LoginForm from 'components/LoginForm';

export default function App() {
  const currDay = new Date();
  const { showModal } = useModal();

  const user = { name: null }; // Replace with auth logic

  const handleClick = () => {
    if (user) {
      console.log('Show profile');
    } else {
      console.log('Trigger login');
    }
  };

  const loggg = () => showModal(<LoginForm />);

  return (
    <div className="relative w-full h-screen">
      <Canvas>
        <UserDisplay text={user.name ? user.name : 'Sign In'} onClick={loggg} />
        <Calendar3D year={currDay.getFullYear()} month={currDay.getMonth()} />
        <Suspense fallback={null}>
          <CosmicBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
