

export function Station() {
  return (
    <group position={[5, 0, 0]}>
      {/* Platform */}
      <mesh position={[0, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 1.5, 400]} />
        <meshStandardMaterial color="#888888" roughness={0.9} />
      </mesh>
      
      {/* Platform Edge Line */}
      <mesh position={[-1.8, 1.51, 0]} receiveShadow>
        <boxGeometry args={[0.2, 0.02, 400]} />
        <meshStandardMaterial color="#eeee33" roughness={0.8} />
      </mesh>

      {/* Station Building Proxy */}
      <mesh position={[4, 3, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 6, 40]} />
        <meshStandardMaterial color="#e0d6c8" roughness={1.0} />
      </mesh>

      {/* Station Roof / Canopy */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[0, 0, -180 + i * 40]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 4]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow>
            <boxGeometry args={[5, 0.2, 20]} />
            <meshStandardMaterial color="#335577" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Station Sign (Fictional/Test) */}
      <group position={[0, 3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 1, 3]} />
          <meshStandardMaterial color="#f0b323" />
        </mesh>
        <mesh position={[-0.06, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.8, 0.8]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </group>
    </group>
  );
}
