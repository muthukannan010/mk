import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

interface TrainProps {
  isStatic?: boolean;
}

export function Train({ isStatic = false }: TrainProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!isStatic && groupRef.current) {
      const position = useGameStore.getState().train.position;
      groupRef.current.position.z = position;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Locomotive Body (WAP-7 style proxy) */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 3.5, 19]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.4} metalness={0.2} /> {/* White/Light Grey WAP-7 */}
      </mesh>
      
      {/* Yellow/Red Front/Back Accent */}
      <mesh position={[0, 1.0, 9.51]} castShadow>
        <boxGeometry args={[3.0, 0.5, 0.05]} />
        <meshStandardMaterial color="#f0b323" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.0, -9.51]} castShadow>
        <boxGeometry args={[3.0, 0.5, 0.05]} />
        <meshStandardMaterial color="#cc2222" roughness={0.5} />
      </mesh>

      {/* Roof Equipment */}
      <mesh position={[0, 4.2, -4]} castShadow>
        <boxGeometry args={[1.5, 0.5, 3]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* Pantograph base */}
      <mesh position={[0, 4.2, 4]} castShadow>
        <boxGeometry args={[1, 0.2, 2]} />
        <meshStandardMaterial color="#cc2222" />
      </mesh>
      
      {/* Front Cab Window */}
      <mesh position={[0, 2.8, 9.51]} castShadow>
        <planeGeometry args={[2.5, 1]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Bogies (Front & Rear) */}
      <group position={[0, 0.5, 5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.1, 1, 4.5]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
      
      <group position={[0, 0.5, -5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.1, 1, 4.5]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </group>
  );
}
