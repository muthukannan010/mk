import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Catenary() {
  const poleCount = 100;
  const poleSpacing = 40;
  
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const supportRef = useRef<THREE.InstancedMesh>(null);
  
  useMemo(() => {
    if (!meshRef.current || !supportRef.current) return;
    const dummy = new THREE.Object3D();
    const supportDummy = new THREE.Object3D();
    
    for (let i = 0; i < poleCount; i++) {
      const z = (i - poleCount/2) * poleSpacing;
      
      // Vertical Pole
      dummy.position.set(-2.5, 3.5, z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Horizontal Support
      supportDummy.position.set(-1.25, 6.2, z);
      supportDummy.rotation.z = Math.PI / 2;
      supportDummy.updateMatrix();
      supportRef.current.setMatrixAt(i, supportDummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    supportRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* Catenary Poles */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, poleCount]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 7]} />
        <meshStandardMaterial color="#777777" metalness={0.6} roughness={0.4} />
      </instancedMesh>
      
      {/* Catenary Horizontal Supports */}
      <instancedMesh ref={supportRef} args={[undefined, undefined, poleCount]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.5]} />
        <meshStandardMaterial color="#777777" metalness={0.6} roughness={0.4} />
      </instancedMesh>

      {/* Overhead Contact Wire */}
      <mesh position={[0, 6.2, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, poleCount * poleSpacing]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>
      
      {/* Catenary Support Wire */}
      <mesh position={[0, 7.0, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, poleCount * poleSpacing]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>
    </group>
  );
}
