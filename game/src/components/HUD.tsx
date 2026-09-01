import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { CabHUD } from './ui/CabHUD';
import { ExternalHUD } from './ui/ExternalHUD';

export function HUD() {
  const cameraView = useGameStore(state => state.cameraView);
  const hudVisibility = useGameStore(state => state.hudVisibility);
  const activeMenu = useGameStore(state => state.activeMenu);

  // Global UI keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = useGameStore.getState();
      const key = e.key.toLowerCase();

      // Train Controls
      if (key === 'w') {
        state.setThrottle(Math.min(1, state.train.throttle + 0.1));
        state.setBrake(0);
      }
      if (key === 's') {
        state.setBrake(Math.min(1, state.train.brake + 0.1));
        state.setThrottle(0);
      }

      // UI Toggles
      if (key === 'h') {
        const next = state.hudVisibility === 'FULL' ? 'REDUCED' : (state.hudVisibility === 'REDUCED' ? 'OFF' : 'FULL');
        state.setHudVisibility(next);
      }
      if (key === 'escape') {
        state.setActiveMenu(state.activeMenu === 'PAUSE' ? 'NONE' : 'PAUSE');
      }
      
      // Camera Toggle
      if (key === 'v') {
        const views: Array<'cab' | 'front' | 'rear' | 'chase'> = ['cab', 'front', 'rear', 'chase'];
        const currentIdx = views.indexOf(state.cameraView);
        const nextIdx = (currentIdx + 1) % views.length;
        state.setCameraView(views[nextIdx]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // UI rendering logic
  if (hudVisibility === 'OFF') return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      
      {/* HUD Content based on camera context */}
      {cameraView === 'cab' ? <CabHUD /> : <ExternalHUD />}

      {/* Menus / Overlays */}
      {activeMenu === 'PAUSE' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#111', padding: '40px 60px', borderLeft: '4px solid #f39c12', borderRadius: '4px' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#ccc', letterSpacing: '4px' }}>PAUSED</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => useGameStore.getState().setActiveMenu('NONE')} style={{ padding: '10px 20px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}>RESUME</button>
              <button style={{ padding: '10px 20px', background: '#222', color: '#888', border: 'none', cursor: 'pointer', textAlign: 'left' }}>SETTINGS</button>
              <button style={{ padding: '10px 20px', background: '#222', color: '#888', border: 'none', cursor: 'pointer', textAlign: 'left' }}>QUIT TO MENU</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
