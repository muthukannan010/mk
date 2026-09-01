import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

export function CabCamera() {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const lookAtPosition = useRef(new THREE.Vector3());

  // Set up keyboard listeners for camera switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = useGameStore.getState();
      switch (e.key) {
        case '1': state.setCameraView('cab'); break;
        case '2': state.setCameraView('front'); break;
        case '3': state.setCameraView('rear'); break;
        case '4': state.setCameraView('chase'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame(() => {
    const state = useGameStore.getState();
    const position = state.train.position;
    const speed = state.train.velocity;
    const view = state.cameraView;

    if (view === 'cab') {
      targetPosition.current.set(0, 3.5, position + 7);
      const bobbing = Math.sin(performance.now() * 0.005) * (Math.abs(speed) * 0.002);
      targetPosition.current.y += bobbing;
      lookAtPosition.current.set(0, 3.5, position + 20);
    } else if (view === 'front') {
      targetPosition.current.set(5, 4, position + 15);
      lookAtPosition.current.set(0, 2, position);
    } else if (view === 'rear') {
      targetPosition.current.set(5, 4, position - 150); // Far back to see coaches
      lookAtPosition.current.set(0, 2, position - 50);
    } else if (view === 'chase') {
      targetPosition.current.set(12, 10, position - 30);
      lookAtPosition.current.set(0, 3, position + 10);
    }

    camera.position.lerp(targetPosition.current, 0.1);
    
    // Smoothly interpolate lookat as well
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookAt.lerp(lookAtPosition.current, 0.1);
    camera.lookAt(currentLookAt);
  });

  return null;
}
