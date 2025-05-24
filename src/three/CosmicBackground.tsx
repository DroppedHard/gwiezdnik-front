import { Stars } from '@react-three/drei';

export default function CosmicBackground() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Stars radius={100} depth={60} count={7000} factor={4} fade speed={1} />
    </>
  );
}