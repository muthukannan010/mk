import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

export function Train() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const position = useGameStore.getState().train.position;
      groupRef.current.position.z = position;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Locomotive Body (Indian WAP-4 / WAP-7 style placeholder) */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 3.5, 18]} />
        <meshStandardMaterial color="#cc2222" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Roof Equipment */}
      <mesh position={[0, 4.1, -4]} castShadow>
        <boxGeometry args={[1, 0.4, 2]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* Front Cab Window */}
      <mesh position={[0, 2.5, 9.05]} castShadow>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Bogies (Front & Rear) */}
      <group position={[0, 0.5, 5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.9, 1, 4]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
      
      <group position={[0, 0.5, -5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.9, 1, 4]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </group>
  );
}
