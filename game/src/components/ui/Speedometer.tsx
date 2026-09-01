import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';

interface SpeedometerProps {
  size?: 'small' | 'large';
  limit?: number;
}

export function Speedometer({ size = 'large', limit = 110 }: SpeedometerProps) {
  const speedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe((state) => {
      const speed = Math.abs(state.train.velocity) * 3.6;
      if (speedRef.current) speedRef.current.innerText = speed.toFixed(0);
    });
    return () => unsubscribe();
  }, []);

  if (size === 'small') {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <div ref={speedRef} style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace' }}>0</div>
        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>km/h</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '4px' }}>SPEED</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <div ref={speedRef} style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, fontFamily: 'monospace', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>0</div>
        <div style={{ fontSize: '1rem', color: '#aaa', fontWeight: 600 }}>km/h</div>
      </div>
      <div style={{ marginTop: '8px', color: '#ffb703', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
        LIMIT {limit}
      </div>
    </div>
  );
}
