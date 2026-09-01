import { Speedometer } from './Speedometer';

export function ExternalHUD() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '20px' }}>
      {/* Left: Minimal Route */}
      <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '4px', borderLeft: '2px solid #f39c12' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>CHENNAI → BENGALURU</span>
      </div>

      {/* Right: Minimal Speed */}
      <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '8px 16px', borderRadius: '8px' }}>
        <Speedometer size="small" />
      </div>
      
      {/* Bottom Center: Minimal Hints */}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
        [V] SWITCH VIEW
      </div>
    </div>
  );
}
