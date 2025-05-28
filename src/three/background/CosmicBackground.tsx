import { Stars } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function CosmicBackground() {
  const starsRef = useRef<THREE.Group>(null);

  // useFrame((_, delta) => {
  //   // if (starsRef.current) {
  //   //   starsRef.current.rotation.y += delta * 0.01;
  //   // }
  // });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <group ref={starsRef}>
        <Stars radius={100} depth={60} count={12000} factor={7} fade speed={1} />
      </group>
    </>
  );
}
