import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';
import { Train } from './components/Train';
import { Track } from './components/Track';
import { CabCamera } from './components/CabCamera';
import { HUD } from './components/HUD';
import { simulation } from './engine/TrainSimulation';

// Component to run simulation independent of mesh rendering
function SimulationLoop() {
  useFrame((state) => {
    // Pass timestamp in ms to simulation
    simulation.update(performance.now());
  });
  return null;
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas shadows camera={{ position: [10, 5, -15], fov: 60 }}>
        {/* Environment & Lighting */}
        <Sky sunPosition={[100, 20, 100]} turbidity={0.3} rayleigh={0.5} />
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[50, 50, 50]} 
          castShadow 
          intensity={1.5} 
          shadow-mapSize={[2048, 2048]} 
          shadow-camera-far={200}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <fog attach="fog" args={['#aaccff', 50, 500]} />
        
        {/* Core Game Loop */}
        <SimulationLoop />
        <CabCamera view="cab" />

        
        {/* Entities */}
        <Train />
        <Track />
      </Canvas>

      {/* React UI Overlay */}
      <HUD />
    </div>
  );
}

export default App;
