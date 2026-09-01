import { Speedometer } from './Speedometer';
import { useGameStore } from '../../store/gameStore';
import { useEffect, useRef } from 'react';

export function CabHUD() {
  const throttleRef = useRef<HTMLSpanElement>(null);
  const brakeRef = useRef<HTMLSpanElement>(null);

  // High-frequency updates for throttle/brake
  useEffect(() => {
    const unsubscribe = useGameStore.subscribe((state) => {
      const throttle = state.train.throttle * 100;
      const brake = state.train.brake * 100;
      if (throttleRef.current) throttleRef.current.innerText = throttle.toFixed(0) + '%';
      if (brakeRef.current) brakeRef.current.innerText = brake.toFixed(0) + '%';
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
      
      {/* TOP ROW: Route / Context */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left: Route Strip */}
        <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '8px 16px', borderRadius: '4px', borderLeft: '3px solid #f39c12', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', color: '#ccc', fontWeight: 600, letterSpacing: '1px' }}>SERVICE 12613</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>CHENNAI → BENGALURU</span>
        </div>
        
        {/* Right: Environment Info */}
        <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '8px 16px', borderRadius: '4px', textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>10:22 AM</div>
          <div style={{ fontSize: '0.75rem', color: '#ccc' }}>CLEAR ☁</div>
        </div>
      </div>

      {/* BOTTOM THIRD: Driving Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '20px' }}>
        
        {/* Left: Signal Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '2px' }}>NEXT SIGNAL</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#22cc66', boxShadow: '0 0 10px #22cc66' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px' }}>CLEAR</span>
          </div>
          <span style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: 600 }}>680 m</span>
        </div>

        {/* Center: Speed */}
        <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', padding: '40px 60px 20px', borderRadius: '50%', transform: 'translateY(40px)' }}>
          <Speedometer size="large" limit={110} />
        </div>

        {/* Right: Next Stop */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '2px' }}>NEXT STOP</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f39c12' }}>JOLARPETTAI JN</span>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#aaa', fontWeight: 600 }}>
            <span>24 km</span>
            <span>ETA 10:35</span>
          </div>
        </div>
      </div>

      {/* BOTTOM EDGE: Subtle Control Readouts & Hints */}
      <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>
        <div>THROTTLE <span ref={throttleRef} style={{ color: '#22cc66' }}>0%</span></div>
        <div>BRAKE <span ref={brakeRef} style={{ color: '#cc2222' }}>0%</span></div>
        <div style={{ opacity: 0.5 }}>[H] HUD | [M] MAP | [V] CAMERAS | [ESC] MENU</div>
      </div>

    </div>
  );
}
