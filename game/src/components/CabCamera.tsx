import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

interface CabCameraProps {
  view: 'cab' | 'chase';
}

export function CabCamera({ view }: CabCameraProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const lookAtPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    const position = useGameStore.getState().train.position;
    const speed = useGameStore.getState().train.velocity;

    if (view === 'cab') {
      // Position inside the cab (front of the train)
      targetPosition.current.set(0, 3.5, position + 7);
      
      // Simulate subtle head bobbing based on speed
      const bobbing = Math.sin(performance.now() * 0.005) * (Math.abs(speed) * 0.002);
      targetPosition.current.y += bobbing;
      
      lookAtPosition.current.set(0, 3.5, position + 20); // Look ahead
    } else {
      // Chase camera
      targetPosition.current.set(8, 8, position - 15);
      lookAtPosition.current.set(0, 2, position + 5);
    }

    // Smoothly interpolate camera position
    camera.position.lerp(targetPosition.current, 0.1);
    camera.lookAt(lookAtPosition.current);
  });

  return null;
}
