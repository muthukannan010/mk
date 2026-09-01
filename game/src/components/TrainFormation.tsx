import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';
import { Train as Locomotive } from './Train';
import { Coach } from './Coach';

export function TrainFormation() {
  const groupRef = useRef<THREE.Group>(null);
  
  // 5 coaches for testing
  const coachCount = 5;
  const locomotiveLength = 19; // WAP-7 is ~19m long
  const coachLength = 24.5; // LHB Coach length + couplers

  useFrame(() => {
    if (groupRef.current) {
      const position = useGameStore.getState().train.position;
      groupRef.current.position.z = position;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Locomotive is at z = 0 relative to the formation */}
      <Locomotive isStatic={true} />
      
      {/* Coaches trail behind the locomotive */}
      {Array.from({ length: coachCount }).map((_, index) => {
        // First coach starts right after the locomotive
        // Locomotive center is 0. Back of loco is approx -9.5m.
        // Front of first coach is -9.5m. Center of first coach is -9.5m - 12.25m = -21.75m.
        const offset = - (locomotiveLength / 2) - (coachLength / 2) - (index * coachLength);
        return <Coach key={index} positionOffset={offset} />;
      })}
    </group>
  );
}
