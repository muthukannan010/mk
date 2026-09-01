

export function EnvironmentScene() {
  return (
    <group>
      {/* Terrain Base */}
      <mesh position={[0, -0.2, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1000, 4000]} />
        <meshStandardMaterial color="#4f6e42" roughness={1} />
      </mesh>
    </group>
  );
}
