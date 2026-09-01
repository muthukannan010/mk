

interface CoachProps {
  positionOffset: number;
}

export function Coach({ positionOffset }: CoachProps) {
  // LHB Coach approximate dimensions: length 24m, width 3.24m, height 4m
  return (
    <group position={[0, 0, positionOffset]}>
      {/* Main Body */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 3.8, 24]} />
        <meshStandardMaterial color="#34689c" roughness={0.3} metalness={0.4} /> {/* LHB Blue */}
      </mesh>
      
      {/* Windows (Left & Right stripes) */}
      <mesh position={[-1.61, 2.7, 0]} castShadow>
        <boxGeometry args={[0.05, 0.8, 22]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[1.61, 2.7, 0]} castShadow>
        <boxGeometry args={[0.05, 0.8, 22]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Grey stripe */}
      <mesh position={[-1.61, 2.0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.2, 24]} />
        <meshStandardMaterial color="#dcdcdc" roughness={0.6} />
      </mesh>
      <mesh position={[1.61, 2.0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.2, 24]} />
        <meshStandardMaterial color="#dcdcdc" roughness={0.6} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 4.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.2, 24]} />
        <meshStandardMaterial color="#555555" roughness={0.7} />
      </mesh>

      {/* Bogies */}
      <group position={[0, 0.5, 8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.0, 1, 3.5]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
      <group position={[0, 0.5, -8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.0, 1, 3.5]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
      
      {/* Vestibule connections */}
      <mesh position={[0, 2.5, 12.2]} castShadow>
        <boxGeometry args={[2.5, 3.2, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.5, -12.2]} castShadow>
        <boxGeometry args={[2.5, 3.2, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}
