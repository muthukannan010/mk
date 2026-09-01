import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';
import { TrainFormation } from './components/TrainFormation';
import { Track } from './components/Track';
import { CabCamera } from './components/CabCamera';
import { HUD } from './components/HUD';
import { Station } from './components/Station';
import { Catenary } from './components/Catenary';
import { EnvironmentScene } from './components/Environment';
import { simulation } from './engine/TrainSimulation';

// Component to run simulation independent of mesh rendering
function SimulationLoop() {
  useFrame(() => {
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
        <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.8} />
        <Environment preset="park" />
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[50, 80, 20]} 
          castShadow 
          intensity={1.8} 
          shadow-mapSize={[2048, 2048]} 
          shadow-camera-far={200}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <fog attach="fog" args={['#b0c4de', 80, 600]} />
        
        {/* Core Game Loop */}
        <SimulationLoop />
        <CabCamera />

        {/* World Entities */}
        <EnvironmentScene />
        <Station />
        <Catenary />
        <Track />
        
        {/* Train Entity */}
        <TrainFormation />
      </Canvas>

      {/* React UI Overlay */}
      <HUD />
    </div>
  );
}

export default App;
