import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Track() {
  const sleeperCount = 1000;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Setup instanced positions for sleepers
  useMemo(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < sleeperCount; i++) {
      dummy.position.set(0, 0.1, i * 2 - 1000);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* Ground/Ballast base */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 4000]} />
        <meshStandardMaterial color="#6a635a" roughness={0.9} />
      </mesh>
      
      {/* Rails (Continuous extruded boxes for performance) */}
      <mesh position={[-0.8, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.08, 0.15, 4000]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.08, 0.15, 4000]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Instanced Sleepers */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, sleeperCount]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.15, 0.25]} />
        <meshStandardMaterial color="#4a423a" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
